import { Notifier } from "../framework/Notifier";
import Tool from "../component/Tool";
import { ListenID } from "../ListenID";
import { Const } from "../config/Const";
import { MVC } from "../framework/MVC";
import { ObjectPool } from "../framework/collections/ObjectPool";
import { Bomb, BombVo } from "../component/Bomb";
import FightModel from "../module/fight/FightModel";
import { GameVoManager } from "./GameVoManager";
import EquipDrop from "../component/EquipDrop";

declare interface BombMap {
    [key: number]: Bomb
}
declare interface ToolMap {
    [key: number]: cc.Node
}


let generateToolTag = (function genTag() {
    var tag = 1;
    function a() { tag += 1; return tag; };
    return a;
})();

export class ToolManager {
    private static _instance: ToolManager = null;
    private toolNodePool: cc.NodePool = null;
    private equipDropNodePool: cc.NodePool = null;
    private toolPrefabs: cc.Prefab = null;
    private equipDropPrefabs: cc.Prefab = null;
    private toolEffectNodePool: cc.NodePool[] = null;
    private toolRealPrefabs: cc.Prefab[] = null;
    private bombPool: ObjectPool<Bomb>;
    private curToolNum: number = 0;
    public isPause: number = 0;
    public static get getInstance(): ToolManager {
        if (ToolManager._instance == null) {
            ToolManager._instance = new ToolManager();
        }
        return ToolManager._instance;
    }

    /**道具列表 */
    private _toolList: ToolMap = {};
    private _equipDropList: ToolMap = {};
    private _toolEffectList: BombMap = {};
    public constructor() {
        this._toolList = {};
        this.toolNodePool = new cc.NodePool();
        this.equipDropNodePool = new cc.NodePool();
        this.toolPrefabs = null;
        this.equipDropPrefabs = null;
        this.toolRealPrefabs = [];
        this.toolEffectNodePool = [];
        this.isPause = 0;
        this.bombPool = new ObjectPool<Bomb>(function () {
            return new Bomb();
        })

        this.changeListener(true);
    }

    public changeListener(enable: boolean) {
        Notifier.changeListener(enable, ListenID.Fight_RecycleTool, this.removeToolIcon, this);
        Notifier.changeListener(enable, ListenID.Fight_RecycleBomb, this.removeToolEffect, this);
        Notifier.changeListener(enable, ListenID.Fight_RecycleObj, this.fightEnd, this);
        Notifier.changeListener(enable, ListenID.Game_FightBackToHome, this.fightEnd, this);
        Notifier.changeListener(enable, ListenID.Fight_End, this.checkBoxDrop, this);
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.gamePause, this);
    }

    public gamePause(boo: boolean) {
        if (boo) {
            this.isPause++;
        } else {
            this.isPause--;
        }
        if (this.isPause <= 0) {
            this.isPause = 0;
            for (let key in this._toolList) {
                let tool = this._toolList[key];
                if (tool && tool.getComponent(Tool).toolKindType != 12) {
                    tool.getComponent(Tool).resumeNodeAction();
                }
            }
        } else {
            for (let key in this._toolList) {
                let tool = this._toolList[key];
                if (tool && tool.getComponent(Tool).toolKindType != 12) {
                    tool.getComponent(Tool).pauseNodeAction();
                }
            }
        }
    }
    
    public addToolPrefabByType(prefab: cc.Prefab) {
        this.toolPrefabs = prefab;
        if (!this.toolNodePool) {
            this.toolNodePool = new cc.NodePool();
        }
        for (let i = 0; i < 2; i++) {
            let node = cc.instantiate(prefab);
            this.toolNodePool.put(node);
        }
    }

    public addEquipToolPrefab(prefab: cc.Prefab) {
        if (!this.equipDropNodePool) {
            this.equipDropNodePool = new cc.NodePool();
        }
        this.equipDropPrefabs = prefab;
    }

    public addRealToolPrefabByType(type: number, prefab: cc.Prefab) {
        this.toolRealPrefabs[type] = prefab;
        let node = cc.instantiate(prefab);
        this.pushToolEffectNodeByType(type, node);
    }

    /**
    * 增加一个道具vo
    * @param node 
    * @param monVo 
    */
    public addTool(type: number) {
        if (this.curToolNum >= Const.ToolMaxNum) return null;
        this.curToolNum++;
        let id = generateToolTag();
        let tool = this.popToolNodeByType(type);
        if (!tool) return null;
        tool.getComponent(Tool).init(id, type);
        this._toolList[id] = tool;
        return tool;
    }

    public addToolEffect(node: cc.Node, bombvo: BombVo) {
        let id = generateToolTag();
        let bomb = this.bombPool.pop();
        bombvo.insId = id;
        bomb.init(id, node, bombvo);
        this._toolEffectList[id] = bomb;
        return bomb;
    }

    public addEquipDrop(equipId: number, equipnum: number) {
        let id = generateToolTag();
        let equip = this.popEquipDrop();
        if (!equip) return null;
        equip.getComponent(EquipDrop).init(id, equipId, equipnum);
        // this._equipDropList[id] = equip;
        return equip;
    }

    public popEquipDrop() {
        if (!this.equipDropNodePool) {
            this.equipDropNodePool = new cc.NodePool();
        }
        let node = this.equipDropNodePool.get();
        if (!node) {
            if (!this.equipDropPrefabs) return null;
            node = cc.instantiate(this.equipDropPrefabs);
        }
        return node;
    }

    public popToolNodeByType(id: number): cc.Node {
        if (!this.toolNodePool) {
            this.toolNodePool = new cc.NodePool();
        }
        let node = this.toolNodePool.get();
        if (!node) {
            if (!this.toolPrefabs) {
                MVC.ComponentHandler.loadAssetHandler('tool', `drop/tool`, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                    }
                    else {
                        this.toolPrefabs = prefab;
                    }
                }, null, null);
                return null;
            } else {
                node = cc.instantiate(this.toolPrefabs);
            }
        }
        return node;
    }

    public pushToolEffectNodeByType(id, node: cc.Node) {
        if (!this.toolEffectNodePool[id]) {
            this.toolEffectNodePool[id] = new cc.NodePool();
        }
    }

    public popToolEffectNodeByType(id: number): cc.Node {
        if (!this.toolEffectNodePool[id]) {
            this.toolEffectNodePool[id] = new cc.NodePool();
        }
        let node = this.toolEffectNodePool[id].get();
        if (!node) {
            if (!this.toolRealPrefabs[id]) {
                MVC.ComponentHandler.loadAssetHandler('toolEffect' + id, `tool/toolEffect${id}`, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                    }
                    else {
                        this.toolRealPrefabs[id] = prefab;
                    }
                }, null, null);
                return null;
            } else {
                node = cc.instantiate(this.toolRealPrefabs[id]);
            }
        }
        return node;
    }

    public getTrapById(type: number): cc.Node {
        let node = this.popToolEffectNodeByType(type);
        let tool = node.getComponent(Tool);
        let id = generateToolTag();
        tool && tool.init(id, type);
        return node;
    }
    public recycleTrapByType(id: number, node: cc.Node) {
        if (this.toolEffectNodePool[id])
            this.toolEffectNodePool[id].put(node);
    }

    public recycleEquyipDrop(id: number, node: cc.Node) {
        if (this.equipDropNodePool) {
            this.equipDropNodePool.put(node);
        }
    }

    public removeToolIcon(insId: number, type: number) {
        let tool = this._toolList[insId];
        if (tool) {
            this.curToolNum--;
            this.toolNodePool.put(tool);
            delete this._toolList[insId];
        } else {
            console.error("insId removeTool fail", insId);
        }
    }

    public removeToolEffect(insId: number, type: number) {
        let bomb = this._toolEffectList[insId];
        if (bomb) {
            this.toolEffectNodePool[type].put(bomb.node);
            this.bombPool.push(bomb);
            delete this._toolEffectList[insId];
        } else {
            console.error("insId removeBombo fail", insId);
        }
    }

    public fightEnd() {
        for (let key in this._toolList) {
            let tool = this._toolList[key];
            if (tool) {
                this.curToolNum--;
                this.toolNodePool.put(tool);
                delete this._toolList[key];
            }
        }
        FightModel.getInstance.bombParent.removeAllChildren();
        let len = FightModel.getInstance.warnParent.childrenCount;
        for (let i = 0; i < len; i++) {
            FightModel.getInstance.warnParent.children[i].active = false;
        }
        // for (let kee in this._toolEffectList) {
        //     let bomb = this._toolEffectList[kee];
        //     if (bomb) {
        //         if (bomb.toolType != 5005)
        //             this.toolEffectNodePool[bomb.toolType].put(bomb.node);
        //         this.bombPool.push(bomb);
        //         delete this._toolEffectList[kee];
        //     } else {
        //         console.error("insId removeBombo fail", kee);
        //     }
        // }
    }

    public checkBoxDrop() {
        for (let key in this._toolList) {
            let tool = this._toolList[key];
            if (tool && tool.getComponent(Tool).toolKindType == 12) {
                if (FightModel.getInstance.fightType == 1) {
                    GameVoManager.getInstance.myUserVo.bossBox += 1;
                    GameVoManager.getInstance.myUserVo.treasureBox += 1;
                    GameVoManager.getInstance.myUserVo.boxDayLimited += 1;
                } else {
                    GameVoManager.getInstance.myUserVo.stageboxNum += 1;
                }
                Notifier.send(ListenID.Fight_ShowFlyGold, tool.position, 3);
                this.toolNodePool.put(tool);
                delete this._toolList[key];
            }
        }
    }
}
