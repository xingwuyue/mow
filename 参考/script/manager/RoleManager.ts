import { MainRole, MainRoleVo } from "../component/MainRole";
import { Monster, MonsterVo } from "../component/Monster";
import { ObjectPool } from "../framework/collections/ObjectPool";
import { Notifier } from "../framework/Notifier";
import { NotifyID } from "../framework/NotifyID";
import { ListenID } from "../ListenID";
import { Watcher } from "../framework/Watcher";
import { Time } from "../framework/Time";
import { MVC } from "../framework/MVC";
import FightModel from "../module/fight/FightModel";
import { AttackVo, TaskSubType } from "../common/Common_Define";
import { MonsterCfg } from "../config/MonsterCfg";
import { Util } from "../utils/Util";
import { GameVoManager } from "./GameVoManager";
// import { Agent } from "../component/Agent";
import { Cfg } from "../config/Cfg";
import { Const } from "../config/Const";
import { Agent } from "../component/Agent";
import { MovingEntity } from "../component/MovingEntity";
import { ToolManager } from "./ToolManager";
import { BombVo, Bomb } from "../component/Bomb";

export declare interface MonsterMap {
    [key: number]: Monster

}
// declare interface AgentMap {
//     [key: number]: Agent;
// }
/*
 * 负责管理角色（敌人，玩家的产生，回收等）
 */

let generateRoleTag = (function genTag() {
    var tag = 1;
    function a() { tag += 1; return tag; };
    return a;
})();

export class RoleManager {
    private static _instance: RoleManager = null;
    private monsterNodePool: cc.NodePool[] = null;
    private buffNodePool: cc.NodePool[] = null;
    private monsterPool: ObjectPool<Monster>;
    // private _agentList: AgentMap = {};
    private monPrefabs: cc.Prefab[] = [];
    private buffPrefabs: cc.Prefab[] = [];
    private _bronList: any[] = [];
    private _bronNumList: number[] = [];
    public static get getInstance(): RoleManager {
        if (RoleManager._instance == null) {
            RoleManager._instance = new RoleManager();
        }
        return RoleManager._instance;
    }

    /**怪物列表 */
    public _monsterList: MonsterMap = cc.js.createMap();

    /**主角 */
    private _mainRole: MainRole = null;

    /**射击区域 */
    private fightRect: cc.Rect = null;
    private bossRect: cc.Rect = null;
    // private agentPool: ObjectPool<Agent>;
    /**可视区域 */
    private viewRect: cc.Rect = null;
    /**移动摄像机 */
    private _mainCamera: cc.Camera = null;
    public isPause: number = 0;
    public allmonster: number = 0;
    public constructor() {
        this._monsterList = {};
        this.monPrefabs = [];
        this.buffPrefabs = [];
        this.monsterNodePool = [];
        this.buffNodePool = [];
        this.monsterPool = new ObjectPool<Monster>(function () {
            return new Monster();
        });
        // this.agentPool = new ObjectPool<Agent>(function () {
        //     return new Agent();
        // })
        this.isPause = 0;
        this._mainRole = new MainRole();
        this.fightRect = new cc.Rect(0, 0, 960, 1700);
        this.bossRect = new cc.Rect(0, 0, 400, 400);
        this.changeListener(true);
    }


    public get mainRole(): MainRole {
        return this._mainRole;
    }

    public changeListener(enable: boolean) {
        Notifier.changeListener(enable, NotifyID.Game_Update, this.update, this);
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.gamePause, this);
        Notifier.changeListener(enable, ListenID.Fight_TryEquip, this.tryEquip, this);
    }
    private time = 0;
    private bronTime = 0;
    public vibrateNum = 0;
    private vibrateTime = 0;
    private hurtTimeCd: number = 1;
    public update(dt) {
        if (this.isPause > 0) return;
        if (this._mainRole) {
            this._mainRole.update(dt);
        }
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            monster.update(dt);
        }
        if (this._isFighting) {
            this.time += dt;
            this.hurtTimeCd -= dt;
            if (this.hurtTimeCd <= 0) {
                this.hurtTimeCd = 1;
                this._mainRole.hitCount = 0;
            }
            this.vibrateTime += dt;
            if (this.time > 0.1) {
                this.findClosedMonster();
                this.time = 0;
            }
            if (this.vibrateTime > 0.16) {
                this.vibrateNum = 0;
            }
        }
    }


    public recycleAgent(intd) {
        // if (this._agentList[intd]) {
        //     this.agentPool.push(this._agentList[intd]);
        //     delete this._agentList[intd];
        // }
    }

    public addAgent(pos: cc.Vec2, gunId: number, liveTime: number) {
        // let id = generateRoleTag();
        // let agent = this.agentPool.pop();
        // agent.setLiveTime(liveTime);
        // agent.init(id, pos, gunId);
        // this._agentList[id] = agent;
    }

    private _isFighting: boolean = false;

    public get isFighting(): boolean {
        return this._isFighting;
    }
    public set isFighting(boo: boolean) {
        this._isFighting = boo
        if (!boo) {
            this._mainRole.setFireInfo(-1, cc.Vec2.ZERO);
        }
    }


    public pushMonToBronList(monnode: cc.Node, monInfo: MonsterCfg) {
        this._bronList.push({ node: monnode, info: monInfo });
    }
    public pushMonToBronInfo(num: number) {
        if (num > 0) {
            this._bronNumList.push(num);
        }
    }

    /**
     * 设置主角信息
     * @param node 
     * @param roleVo 
     */
    public setMainRoleInfo(node: cc.Node, state: number = 0) {
        this._mainRole.init(0, node, state)
    }

    /**
     * 
     * @param camera 摄像机
     */
    public setMainCamera(camera: cc.Camera) {
        this._mainCamera = camera;
    }
    /**
     * 增加一个怪物vo
     * @param node 
     * @param monVo 
     */
    public addMonster(node: cc.Node, monVo: MonsterVo): Monster {
        let id = generateRoleTag();
        let monster = this.monsterPool.pop();
        monVo.insId = id;
        monster.init(id, node, monVo);
        this._monsterList[id] = monster;
        this.allmonster++;
        return monster;
    }

    public addMonsterPrefabByType(type: number, prefab: cc.Prefab) {
        this.monPrefabs[type] = prefab;
        // if (type <= 305) {
        //     for (let i = 0; i < 1; i++) {
        //         let node = cc.instantiate(prefab);
        //         this.pushMonsterNode(type, node);
        //     }
        // }
    }
    public popMonsterNode(id: number = 1): cc.Node {
        if (!this.monsterNodePool[id]) {
            this.monsterNodePool[id] = new cc.NodePool();
        }
        let node = this.monsterNodePool[id].get();
        if (!node) {
            if (!this.monPrefabs[id]) {
                let data = Cfg.Monster.get(id);
                if (!data) return null;
                MVC.ComponentHandler.loadAssetHandler('enemy' + id, data.monResPath, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                    }
                    else {
                        this.monPrefabs[id] = prefab;
                    }
                }, null, null);
                return null;
            } else {
                node = cc.instantiate(this.monPrefabs[id]);
            }
        }
        return node;
    }
    public pushMonsterNode(id, node: cc.Node) {
        if (!this.monsterNodePool[id]) {
            this.monsterNodePool[id] = new cc.NodePool();
        }
        this.monsterNodePool[id].put(node);
    }
    public addBuffPrefabByType(type: number, prefab: cc.Prefab) {
        this.buffPrefabs[type] = prefab;
    }
    public popBuffEffectNode(id: number = 1): cc.Node {
        if (!this.buffNodePool[id]) {
            this.buffNodePool[id] = new cc.NodePool();
        }
        let node = this.buffNodePool[id].get();
        if (!node) {
            node = cc.instantiate(this.buffPrefabs[id]);
        }
        return node;
    }

    public pushBuffEffectNode(id, node: cc.Node) {
        if (!this.buffNodePool[id]) {
            this.buffNodePool[id] = new cc.NodePool();
        }
        this.buffNodePool[id].put(node);
    }



    public killMonNumber: number = 0;
    public removeMonster(insId: number, type: number) {
        let monster = this._monsterList[insId];
        if (monster) {
            try {
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.KillTarget, [FightModel.getInstance.fightType == 0 ? 1 : 2, monster.isBoss() ? 2 : 1, 1]);
                this.killMonNumber++;
                /*if (FightModel.getInstance.boxDropList[this.killMonNumber]) {
                    Notifier.send(ListenID.Fight_AddTool, 6002, 0, monster.Pos, this.killMonNumber);
                } else {
                    if (FightModel.getInstance.fightType == 0 && this.killMonNumber % FightModel.getInstance.levelCfg.dropTool == 0) {
                        Notifier.send(ListenID.Fight_AddTool, 0, 0, monster.Pos, this.killMonNumber);
                    }
                    if (monster.resId == '302') {//buff怪
                        if (monster.monsterVoCfg.dropPool.length > 0) {
                            let len = monster.monsterVoCfg.dropPool.length;
                            let pool = [];
                            for (let i = 0; i < len; i++) {
                                if (GameVoManager.getInstance.myUserVo.dropList[monster.monsterVoCfg.dropPool[i]]) {
                                    pool.push(monster.monsterVoCfg.dropPool[i]);
                                }
                            }
                            let index = Util.random(0, pool.length);
                            let id = pool[index];
                            Notifier.send(ListenID.Fight_AddTool, id, 0, monster.Pos, this.killMonNumber);
                        }
                    }
                }*/
            } catch (error) {
                console.error(error);
            }
            this.allmonster--;
            this._mainRole.triggerSuckBlood();//触发吸血
            if (FightModel.getInstance.fightType == 0) {
                FightModel.getInstance.checkDropKill(this.allmonster, monster.Pos.clone());

            } else {
                if (this.allmonster <= 0) {
                    FightModel.getInstance.checkDropItem(monster.Pos.clone());
                }
            }
            this.monsterNodePool[type].put(monster.node);
            monster.node = null;
            this.monsterPool.push(monster);
            delete this._monsterList[insId];
            // if (FightModel.getInstance.curStepRemnantMon == 1 && RoleManager.getInstance.isFighting && FightModel.getInstance.curStep == FightModel.getInstance.allStep && FightModel.getInstance.fightType == 0) {
            //     Time.setScale(0.1, 1.3, true);
            // }
            FightModel.getInstance.killNum = this.killMonNumber;
        } else {
            console.error("remove fail monsterid", insId);
        }
    }

    public gamePause(boo: boolean) {
        if (boo) {
            this.isPause++;
        } else {
            this.isPause--;
        }
        if (this.isPause < 0) {
            this.isPause = 0;
        } else {
            this._mainRole.pauseFireAudio();
        }
    }

    public tryEquip(equipid: number, times: number) {
        this._mainRole.setTryEquip(true, equipid, times);
    }

    public resetKillNumber() {
        this.killMonNumber = 0;
        FightModel.getInstance._killNum = this.killMonNumber;
    }

    private _watcher: Watcher = null;
    public registerFindMon() {
        // this._watcher = Time.delay(0.3, this.findClosedMonster, null, RoleManager._instance, -1);
    }

    unregisterFindMon() {
        // this._watcher.Cancal();
        // delete this._watcher;
        // this._watcher = null;
    }

    private firstMonId: number = -1;
    private minDis: number = 4000;
    /**
     * 找最近的怪物
     */
    public findClosedMonster() {
        // this.minDis = 1 << 20;
        this.firstMonId = -1;
        // let allmonster: number = 0;
        // let deadmon: number = 0;
        // let inarea: number = 0;
        let spos: cc.Vec2 = this._mainRole.Pos;
        let range = this._mainRole.attackRanges[0];
        this.minDis = range * range;
        // let pos = this._mainCamera ? this._mainCamera.node.position : spos;
        // this.fightRect.x = pos.x - range[0];
        // this.fightRect.y = pos.y - range[1];
        // this.fightRect.width = range[0] * 2;
        // this.fightRect.height = range[1] * 2;
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead) {
                // if (monster.isBoss()) {
                // this.bossRect.width = monster.node.width * monster.bodyNode.scale;
                // this.bossRect.height = monster.node.height * monster.bodyNode.scale;
                // this.bossRect.x = monster.node.x - this.bossRect.width * 0.5;
                // this.bossRect.y = monster.node.y - this.bossRect.height * 0.5;
                // if (this.fightRect.intersects(this.bossRect)) {
                let dis = spos.sub(monster.Pos).mag();
                dis -= monster.BRadius/* * 0.5*/;//真实边沿距离需要添加包围盒半径
                if (dis <= this.minDis && dis <= range) {
                    this.minDis = dis;
                    this.firstMonId = monster.Id;
                }
                // }
                // } else {
                //     // if (this.fightRect.contains(monster.Pos)) {//矩形aabb检测
                //     let dis = spos.sub(monster.Pos).mag();
                //     if (dis <= this.minDis && dis < range) {
                //         this.minDis = dis;
                //         this.firstMonId = monster.Id;
                //     }
                // }
                // }
            }
        }
        let mon = this._monsterList[this.firstMonId];
        FightModel.getInstance.targetId = this.firstMonId;
        this._mainRole.setFireInfo(this.firstMonId, mon && mon.Pos, this.minDis);
    }

    public resetGame() {
        this.destroyAllMonster();
        this.resetKillNumber();
        let len = this._bronList.length;
        for (let i = 0; i < len; i++) {
            let moninfo = this._bronList.pop();
            if (moninfo && moninfo.node) {
                moninfo.node.destroy();
            }
        }
        this.mainRole.clearSkill();
        this._bronNumList = [];
        this._bronList = [];
        this.allmonster = 0;
    }

    public destroyAllMonster() {
        this.allmonster = 0;
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            monster.node.destroy();
            monster.node = null;
            this.monsterPool.push(monster);
            delete this._monsterList[key];
        }
        // for (const key2 in this._agentList) {
        //     let agent = this._agentList[key2];
        //     this.agentPool.push(agent);
        //     delete this._agentList[key2];
        // }
    }

    public findClosedMonsterByPos(pos: cc.Vec2, insId: number = 0, width: number = 40) {
        let mon: Monster = null;
        let maxdis = 300000000;
        let spos: cc.Vec2 = pos;
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead) {
                let dis = spos.sub(monster.Pos).magSqr();
                if (dis < maxdis && monster.Id != insId && dis > width) {
                    maxdis = dis;
                    mon = monster;
                }
            }
        }
        return mon;
    }

    public tagNeighbors(entity: MovingEntity, dis: number) {
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            monster.UnTag();
            if (!monster.isDead && entity.Id != monster.Id) {
                let to = monster.Pos.sub(entity.Pos);
                let range = dis + monster.BRadius;
                if (to.magSqr() < range * range) {
                    monster.Tag();
                }
            }
        }
    }

    public AttackOtherMonster(startPos: cc.Vec2, radius: number, vo: AttackVo, selfid: number) {
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead && selfid != monster.Id) {
                if (monster.Pos.sub(startPos).magSqr() <= radius * radius) {
                    let dir = startPos.sub(monster.Pos)
                    let test = vo;
                    test.hitPos = monster.Pos;
                    test.hitDir = dir;
                    monster.hitBack = vo.hitBack;
                    monster.behit(vo, 1);
                }
            }
        }
    }

    public AttackAllInRange(startPos: cc.Vec2, radius: number, vo: AttackVo, selfid: number) {
        let raduissq = radius * radius;
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead && selfid != monster.Id) {
                if (monster.Pos.sub(startPos).magSqr() <= raduissq) {
                    let test = vo;
                    test.hitPos = monster.Pos;
                    monster.behit(vo, 1);
                }
            }
        }
        if (this._mainRole.Pos.sub(startPos).magSqr() <= raduissq) {
            this._mainRole.behit(vo, 1);
        }
    }

    /**加速的 */
    public addSpeedToMonster(startPos: cc.Vec2, radius: number, speed: number, time: number, selfid: number) {
        let raduissq = radius * radius;
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead && selfid != monster.Id) {
                if (monster.Pos.sub(startPos).magSqr() <= raduissq) {
                    monster.setSpeedBuff(speed, time);
                }
            }
        }
    }
    /**加血的 */
    public addBloodToMonster(startPos: cc.Vec2, radius: number, blood: number, selfid: number) {
        let raduissq = radius * radius;
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead && selfid != monster.Id) {
                if (monster.Pos.sub(startPos).magSqr() <= raduissq) {
                    monster.setBloodBuff(blood);
                }
            }
        }
    }

    /**冰冻 */
    public iceAllMonster(time: number) {
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead) {
                monster.setIceBuff(time);
            }
        }
    }

    public isNoMonster(): boolean {
        let num = 0;
        for (const key in this._monsterList) {
            num++;
        }
        if (num <= 0) {
            return true;
        } else {
            return false;
        }
    }

    public getAttackRealHurtByRole(defense: number, isViolent: boolean = true, hurtRatio: number = 1, extraHurtRatio: number = 1) {
        let hurt = this._mainRole.property.getAttack() - defense + Const.NormalAttack;
        hurt *= hurtRatio;
        if (isViolent) {
            hurt = this._mainRole.property.getViolentNum(hurt);
        }
        hurt *= extraHurtRatio;
        hurt *= this._mainRole.extraSkillHurtRatio;
        if (hurt < 1) hurt = 1;

        return Math.ceil(hurt);
    }

    public getOtherRealHurt(defense: number, toolHurt: number, isViolent: boolean = true, hurtRatio: number = 1) {
        let hurt = toolHurt * this._mainRole.property.getAttack() - defense + Const.NormalAttack;
        hurt *= hurtRatio;
        if (isViolent) {
            hurt = this._mainRole.property.getViolentNum(hurt);
        }
        hurt *= this._mainRole.extraSkillHurtRatio;
        if (hurt < 1) hurt = 1;
        return Math.ceil(hurt);
    }

    public thunderAttack(param: any) {
        //{range,ratio,extraAttack,attack:this.property.getAttack(),gunRatio:this.gunObject.getHurtRatio()}
        let range = param.range;
        range = range * range;
        let pushkey = [];
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            if (!monster.isDead && monster.Pos.sub(this.mainRole.Pos).magSqr() <= range) {
                pushkey.push(key);
            }
        }
        if (pushkey.length > 0) {
            let attacklist = Util.getRandomSDiff(0, pushkey.length - 1, param.thunderNum);
            for (let i = 0; i < attacklist.length; i++) {
                let index = attacklist[i];
                let monster = this._monsterList[pushkey[index]];
                let attack = this.getAttackRealHurtByRole(monster.property.getDefense(), false, param.gunRatio, param.extraAttack);
                attack *= param.ratio;
                let speed = ToolManager.getInstance.popToolEffectNodeByType(6007);
                if (speed) {
                    speed.position = monster.Pos;
                    let bombvo: BombVo = { showDamage: 0, hurt: 0, radius: 1, toolType: 6007 }
                    let bom: Bomb = ToolManager.getInstance.addToolEffect(speed, bombvo);
                    speed.setParent(FightModel.getInstance.bulletParent);
                    bom.startAttack();
                }
                monster.behit({ insId: -1, showDamage: attack, hurt: attack, doubleReward: 0, doubleHit: false, hitPos: monster.Pos, bulletType: 0 }, 15)
            }

        }
    }

    public kickMonsterAss(dis: number, range: number) {
        let testrange = range * range;
        for (const key in this._monsterList) {
            let monster = this._monsterList[key];
            let dir = monster.Pos.sub(this.mainRole.Pos);
            if (!monster.isDead && dir.magSqr() <= testrange) {
                monster.bekickAss(dis, dir);
            }
        }
    }
}
