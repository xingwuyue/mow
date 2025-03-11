import { MVC } from "../../framework/MVC";
import { Util } from "../../utils/Util";
import { Const } from "../../config/Const";
import { BarrierCfg } from "../../config/BarrierCfg";
import { Cfg } from "../../config/Cfg";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameVoManager } from "../../manager/GameVoManager";
import { RoleManager } from "../../manager/RoleManager";
import { Time } from "../../framework/Time";
import { Manager } from "../../manager/Manager";
import { BossCfg } from "../../config/BossCfg";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { CallID } from "../../CallID";
import { ChapterCfg } from "../../config/ChapterCfg";

declare interface BossMap {
    [key: number]: any

}

declare interface dropMap {
    [key: number]: {
        allWeight: number,
        droplist: number[][],
    }
}

export default class FightModel extends MVC.BaseModel {

    private static _instance: FightModel = null;
    public borderX: number[] = [];
    public borderY: number[] = [];

    public levelCfg: BarrierCfg = null;
    public bossCfg: BossCfg = null;
    public bornNum: number = 0;//产怪数量
    public _killNum: number = 0;
    public isFighting: boolean = false;
    public goldInCome: number = 0;//当局收入
    public diamondInCome: number = 0;    //当局钻石收入
    public rewardList: Array<number> = [];
    public isPause: number = 0;
    public dropToolNum: number = 0;
    public stepData: any = null;
    public curStep: number = 0;      //当前波数
    public allStep: number = 0;      //总波数
    public curStepMonNum: number = 0;
    public curStepRemnantMon: number = 0;    //当前波数剩余怪物
    public allMonster: number = 0;   //当局所有怪物
    public curLevel: number = 0;
    public effectNodePool: cc.NodePool = null;
    private monsterBornlist = [[0, 985], [-90, 985], [-180, 985], [-270, 985], [-360, 985], [90, 985], [180, 985], [270, 985], [360, 985], [600, 805], [600, 605], [600, 405], [600, 205], [600, 5], [600, -205], [600, -405], [600, -605], [600, -805], [0, -985], [-90, -985], [-180, -985], [-270, -985], [-360, -985], [90, -985], [180, -985], [270, -985], [360, -985], [-600, 805], [-600, 605], [-600, 405], [-600, 205], [-600, 5], [-600, -205], [-600, -405], [-600, -605], [-600, -805]];
    private monsterBorn = [];
    public gamePanel: cc.Node = null;
    public warnParent: cc.Node = null;
    public fightType: number = 0;
    public targetId: number = 0;
    public bossWaitTime: number = 0;
    public costPower: number = 0; //当前消耗体力

    public fireMode: boolean = false;
    public get killNum(): number {
        return this._killNum;
    }

    public constructor() {
        super();
        if (FightModel._instance == null) {
            FightModel._instance = this;
        }
        this.effectNodePool = new cc.NodePool();
        this.maxFightLevel = Cfg.BattleLevel.filter({}).length;
        this.fireMode = false;
        this.borderY[0] = -1600;
        this.borderY[1] = 1600;
        this.borderX[0] = -1080;
        this.borderX[1] = 1080;
        this.monsterBorn[0] = this.monsterBornlist;
        this.monsterBorn[1] = [[0, 985], [-90, 985], [-180, 985], [-270, 985], [-360, 985], [90, 985], [180, 985], [270, 985], [360, 985]];
        this.monsterBorn[2] = [[600, 805], [600, 605], [600, 405], [600, 205], [600, 5], [600, -205], [600, -405], [600, -605], [600, -805]];
        this.monsterBorn[3] = [[0, -985], [-90, -985], [-180, -985], [-270, -985], [-360, -985], [90, -985], [180, -985], [270, -985], [360, -985]];
        this.monsterBorn[4] = [[-600, 805], [-600, 605], [-600, 405], [-600, 205], [-600, 5], [-600, -205], [-600, -405], [-600, -605], [-600, -805]];

    }

    public reset(): void {

    }

    public static get getInstance(): FightModel {
        if (FightModel._instance == null) {
            FightModel._instance = new FightModel();
        }
        return FightModel._instance;
    }

    public bulletParent: cc.Node = null;

    public bulletMonParent: cc.Node = null;

    public bombParent: cc.Node = null;

    public effectNode: cc.Node = null;
    public specialEffectNode: cc.Node = null;
    private bornPos = [];
    private monsterIdList = [];
    private logKillNum: number = 0;
    public set killNum(num) {//根据击杀数量控制产怪个数
        if (this._killNum == num) return;
        this._killNum = num;
        if (this.isFighting) {
            FightModel.getInstance.curStepRemnantMon -= 1;
            Notifier.send(ListenID.Fight_KillNumChange, this._killNum, this.allMonster);
            if (this.curStepRemnantMon <= 0) {//剩余怪物少于0且是最后一波了，胜利
                let passstep = this.curStep;
                if (this.curStep < this.allStep) {
                    Notifier.send(ListenID.Fight_UpdateStep, this.chapterCfg.startLevel + passstep);
                }
                this.curStep++;
                if (this.curStep > this.allStep) {
                    if (this.fightType == 0) {
                        Notifier.send(ListenID.Fight_End, true);
                    } else {
                        Notifier.send(ListenID.Fight_KeepBoss, true);
                    }
                } else {
                    if (this.fightType == 0) {
                        let addexp = this.addexp;
                        this.saveTempChapterInfo(addexp);
                        Notifier.send(ListenID.Fight_GetExpAnimation, this.addexp);
                        let evenid = this.popEventId();
                        if (evenid) {
                            setTimeout(() => {
                                Notifier.send(ListenID.Event_OpenView, { id: evenid });
                            }, 300);
                        }
                        this.initLevelCfg(this.chapterCfg.startLevel + this.curStep);
                    } else {
                        this.randomMonInfo();//重新生成下一波怪物
                    }
                    Notifier.send(ListenID.Fight_StartNextStep, this.curStep, this.allStep);
                }
            }

            if (this.fightType == 0) {
                if (this._killNum == this.logKillNum) {
                    Notifier.send(ListenID.Log_Event, { event_name: "level_" + FightModel.getInstance.curLevel + "_monster_50%" });
                }
            }
        }
    }

    public skilCurStep() {
        let passstep = this.curStep;
        Notifier.send(ListenID.Fight_UpdateStep, this.chapterCfg.startLevel + passstep);
        this.curStep++;
        if (this.curStep > this.allStep) {
            if (this.fightType == 0) {
                Notifier.send(ListenID.Fight_End, true);
            } else {
                Notifier.send(ListenID.Fight_KeepBoss, true);
            }
        } else {
            Notifier.send(ListenID.Fight_StartNextStep, this.curStep, this.allStep);
            this.randomMonInfo();//重新生成下一波怪物
        }
        Notifier.send(ListenID.Fight_KillNumChange, this._killNum, this.allMonster);
    }

    private randomLevelInfo() {
        this.randomMonInfo(this.fightType);
    }

    private toolDropIndex: number = 0;
    private toolDropPool: number[] = [];
    private tDropList: number[] = [];
    public randomDropInfo() {
        this.toolDropIndex = 0;
        // let pool = this.levelCfg.toolPool;
        this.toolDropPool = [];
        // let len = pool.length;
        // for (let i = 0; i < len; i++) {
        //     if (GameVoManager.getInstance.myUserVo.dropList[pool[i]]) {
        //         this.toolDropPool.push(pool[i]);
        //     }
        // }
        this.tDropList = Util.getRandomSDiff(0, this.toolDropPool.length - 1, this.toolDropPool.length);
    }
    public curBronDirs: number[] = [];
    public monstList: number[] = [];
    public bossIdList: BossMap = {};
    public randomMonInfo(type: number = 0) {
        this.monIndex = 0;
        this.monstList = [];
        this.bornPos = [];
        if (type == 0) {
            let data = this.bronData;
            this.monsterIdList = [];
            this.bornIndex = 0;
            let len = 40;
            let bronlen = data.length;
            if (bronlen <= 2) {//all
                for (let k = 0; k < len; k++) {
                    let index = Util.random(0, this.monsterBornlist.length);
                    this.bornPos.push(this.monsterBornlist[index]);
                }
                this.curBronDirs = [1, 2, 3, 4];
            } else {
                let a = [];
                this.curBronDirs = [];
                for (let j = 2; j < bronlen; j++) {
                    a.push.apply(a, this.monsterBorn[data[j]]);
                    this.curBronDirs.push(data[j]);
                }
                for (let k = 0; k < len; k++) {
                    let index = Util.random(0, a.length);
                    this.bornPos.push(a[index]);
                }
            }
            if (data[0].length % 2 != 0) {
                console.error("Barrion Error monster not match")
            }
            let monlistlen = data[0].length / 2;
            for (let i = 0; i < monlistlen; i++) {
                let monlen = data[0][i * 2 + 1];
                this.monstList.push(data[0][i * 2]);
                for (let j = 0; j < monlen; j++) {
                    this.monsterIdList.push(data[0][i * 2]);
                }
            }
            this.monsterIdList = Util.randomArray(this.monsterIdList);
            this.curStepMonNum = this.monsterIdList.length;
            this.curStepRemnantMon = this.curStepMonNum;
            let allmon = this.curStepMonNum;
            this.allMonster = allmon;
            this.logKillNum = Math.floor(this.allMonster / 2);
        } else {//boss战
            let data = this.stepData;
            this.bossIdList = [];
            this.bornNum = data.length;
            this.curBronDirs = [];
            for (let i = 0; i < data.length; i++) {
                this.monstList.push(data[i][0]);
                this.bossIdList[data[i][0]] = data[i];
                let a = Util.random(0, this.monsterBorn[data[i][3]].length);
                this.bornPos.push(this.monsterBorn[data[i][3]][a]);
            }
            this.curStepMonNum = this.bornNum;
            this.curStepRemnantMon = this.curStepMonNum;
        }
        Notifier.send(ListenID.Fight_MonsterInfoList, this.monstList);
    }

    private bornIndex: number = 0;
    private monIndex: number = 0;
    public getMonsterRandom() {
        if (this.bornIndex >= this.bornPos.length) {
            this.bornIndex = 0;
        }
        if (this.fightType == 0) {
            if (this.monsterIdList.length <= this.monIndex) {
                return [];
            }

            let data = [this.monsterIdList[this.monIndex], this.bornPos[this.bornIndex]];
            this.monIndex++;
            this.bornIndex++;

            if (!data[0]) {
                console.error("error brondata");
            }
            return data;
        } else {
            if (this.monstList.length <= this.monIndex) {
                return [];
            }
            let bossid = this.monstList[this.monIndex];
            let bossdata = this.bossIdList[bossid];
            let data = [bossdata, this.bornPos[this.bornIndex]];
            if (!data[0]) {
                console.error("error brondata");
            }
            this.monIndex++;
            this.bornIndex++;
            return data;
        }
    }

    public getDefaultMonster() {
        return [this.monsterIdList[0], this.bornPos[0]];
    }

    private firstDrop: boolean = true;
    public boxDropList: any = {};
    public monsterCapacity: number = 1;
    public dropMonId: number = 0;
    public dropMonNum: number = 0;
    public dropPoolId: number = 0;
    public chapterId: number = 0;
    public chapterCfg: ChapterCfg;
    public bronData: any;
    public addexp: number = 0;
    public eventId: number[] = [];
    public initLevelCfg(level: number) {
        let data = Cfg.Barrier.get(level);
        if (!data) {
            data = Cfg.Barrier.get(GameVoManager.getInstance.stateVo.stepNum);
            if (!data) return;
        } else {
        }
        this.curLevel = level;
        Time.startGameTimeLog();
        Notifier.send(ListenID.Log_Event, { event_name: "level_" + this.curLevel + "_access" });
        this.levelCfg = data;
        this.monsterCapacity = data.monCapaticy;
        this.stepData = this.levelCfg.bronRule;
        let random = Util.random(0, this.stepData.length);
        this.bronData = this.stepData[random];
        this.bornNum = this.bronData[1];
        this.dropMonNum = 0;
        this.firstDrop = (GameVoManager.getInstance.myUserVo.topLevel < level && data.firstDropId) ? true : false;
        if (this.firstDrop) {
            this.initDropPool(data.firstDropId);
        }
        let expindex = Util.random(0, this.levelCfg.attackExp.length);
        this.addexp = this.levelCfg.attackExp[expindex];
        this.initDropPool(data.normalDropId);
        this.boxDropList = {};
        this.randomMonInfo();

        let idlist = Notifier.call(CallID.Event_GetNotiggerList, this.levelCfg.eventID);
        let len = idlist.length;
        if (len > 0) {
            let index = Util.random(0, len);
            this.eventId.push(idlist[index]);
        }
    }

    popEventId() {
        let id = this.eventId.shift();
        return id || 0;
    }


    public saveTempChapterInfo(addexp) {
        let curFightLevel = this.curFightLevel;
        let fightLevelExp = this.fightLevelExp + addexp;
        let needLearn: number = 0;
        if (fightLevelExp >= FightModel.getInstance.maxLevelExp && FightModel.getInstance.curFightLevel < FightModel.getInstance.maxFightLevel) {
            curFightLevel += 1;
            needLearn = 1;
        }
        let a = { topLevel: this.chapterCfg.startLevel + this.curStep, goldInCome: this.goldInCome, diamondInCome: this.diamondInCome, rewardList: this.rewardList, skillList: RoleManager.getInstance.mainRole.skillIdList, skillIdDoubleList: RoleManager.getInstance.mainRole.skillIdDoubleList, curFightLevel: curFightLevel, fightLevelExp: fightLevelExp, curHp: RoleManager.getInstance.mainRole.curHp, needLearn: needLearn };
        Manager.storage.setObject(Const.STORAGE_CHAPTER_INFO, a);
    }

    public curFightLevel: number = 1;
    public maxFightLevel: number;
    public fightLevelExp: number = 0;//战斗经验值
    public maxLevelExp: number = 0;
    public lastStepExp: number = 0;
    public initChapterCfg(level: number) {
        let ldata = Util.levelToChapterId(level);
        this._killNum = 0;
        this.chapterId = ldata[0];

        this.chapterCfg = Cfg.Chapter.get(this.chapterId);
        this.maxFightLevel = this.chapterCfg.battleLvMax;
        this.curFightLevel = 1;
        this.fightLevelExp = 0;
        let chapterinfo = GameVoManager.getInstance.stateVo.chapterInfo;
        if (chapterinfo) {
            this.curFightLevel = chapterinfo.curFightLevel;
            this.fightLevelExp = chapterinfo.fightLevelExp;
            this.curStep = level - this.chapterCfg.startLevel;
            this.rewardList = chapterinfo.rewardList;
            Notifier.send(ListenID.Role_CostPower, Const.PowerCost);
        } else {
            this.curFightLevel = 1;
            this.fightLevelExp = 0;
            this.curStep = 1;
            this.rewardList = [];
        }
        this.eventId = [];
        this.allStep = this.chapterCfg.attackCount;
        this.updateMaxLevelExp();
        this.initLevelCfg(this.chapterCfg.startLevel + this.curStep);
    }

    public getFightExp() {
        return [this.fightLevelExp, this.maxLevelExp, this.lastStepExp];
    }

    public isFullLevel() {
        return this.curFightLevel >= this.maxFightLevel;
    }

    public updateMaxLevelExp() {
        let reallevel = 0;
        if (this.curFightLevel + 1 > this.maxFightLevel) {
            reallevel = this.maxFightLevel;
        } else {
            reallevel = this.curFightLevel + 1;
        }
        let data = Cfg.BattleLevel.get(reallevel);
        this.maxLevelExp = data.battleExp;
        data = Cfg.BattleLevel.get(this.curFightLevel);
        if (data) { this.lastStepExp = data.battleExp; }
    }

    public initBossCfg(level: number) {
        let data = Cfg.Boss.get(level);
        if (!data) {
            AlertManager.showNormalTips("头目战关卡初始化失败 ", level);
            return;
        }
        this.curLevel = data.id;
        this.rewardList = [];
        this.boxDropList = {};
        this.firstDrop = false;
        this.bossCfg = data;
        this.allStep = 1;
        this.curStep = 1;
        this.stepData = this.bossCfg.bronRule;
        this._killNum = 0;
        this.bossWaitTime = data.bosstime;
        this.monsterCapacity = data.monCapaticy;
        this.dropPoolId = data.normalDropId;
        this.bornNum = this.stepData[this.curStep - 1].length;
        let allmon = this.stepData.length;
        this.allMonster = allmon;
        RoleManager.getInstance.killMonNumber = 0;
        this.randomMonInfo(this.fightType);
    }

    public getToolTypeRandom(type: number, killnumber?: number) {
        let id = 0;
        // if (this.firstDrop) {
        //     this.firstDrop = false;
        //     return this.levelCfg.toolPool[0];
        // }
        // if (this.toolDropPool.length > 0) {
        //     id = this.toolDropPool[this.tDropList[this.toolDropIndex]];
        //     this.toolDropIndex++;
        //     if (this.toolDropIndex >= this.tDropList.length) {
        //         this.toolDropIndex = 0;
        //     }
        // }
        return id;
    }

    public popEffectNode(): cc.Node {
        let node = this.effectNodePool.get();
        if (!node) {
            node = cc.instantiate(this.specialEffectNode);
        }
        return node;
    }

    public pushEffectNode(node: cc.Node) {
        this.effectNodePool.put(node);
    }

    public footmarkParent: cc.Node = null;
    public footMarkNode: cc.Node = null;
    private footNodePool: cc.NodePool = null;
    public popFootMarkNode(): cc.Node {
        if (!this.footNodePool)
            this.footNodePool = new cc.NodePool();
        let node = this.footNodePool.get();
        if (!node) {
            node = cc.instantiate(this.footMarkNode);
        }
        return node;
    }

    public putFootMarkNode(node: cc.Node) {
        this.footNodePool.put(node);
    }

    private deadNodePool: cc.NodePool = null;
    public deadEffectNode: cc.Prefab = null;
    public popDeadNode(sucess: Function, fail) {
        if (!this.deadNodePool) {
            this.deadNodePool = new cc.NodePool();
        }
        let node = this.deadNodePool.get();
        if (!node) {
            if (this.deadEffectNode) {
                node = cc.instantiate(this.deadEffectNode);
                sucess(node);
            } else {
                MVC.ComponentHandler.loadAssetHandler('node', `ui/deadEffect`, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                        fail && fail(prefab)
                    }
                    else {
                        this.deadEffectNode = prefab;
                        sucess(cc.instantiate(this.deadEffectNode));
                    }
                }, null, null);
            }
        } else {
            sucess(node);
        }
    }
    public putDeadEffectNode(node: cc.Node) {
        if (!this.deadNodePool) {
            this.deadNodePool = new cc.NodePool();
        }
        this.deadNodePool.put(node);
    }

    private goldnodePool: cc.NodePool = null;
    public goldnode: cc.Node = null;
    public popGoldIconNode() {
        if (!this.goldnodePool) {
            this.goldnodePool = new cc.NodePool();
        }
        let goldnode = this.goldnodePool.get();
        if (!goldnode) {
            return cc.instantiate(this.goldnode);
        }
        return goldnode;
    }
    public putGoldIconNode(node) {
        this.goldnodePool.put(node);
    }
    private boxnodePool: cc.NodePool = null;
    public boxnode: cc.Node = null;
    public popBoxIconNode() {
        if (!this.boxnodePool) {
            this.boxnodePool = new cc.NodePool();
        }
        let boxnode = this.boxnodePool.get();
        if (!boxnode) {
            return cc.instantiate(this.boxnode);
        }
        return boxnode;
    }
    public putBoxIconNode(node) {
        this.boxnodePool.put(node);
    }


    public setSlowAction() {
        if (this.curStepRemnantMon == 1 && !RoleManager.getInstance.mainRole.isDead) {
            Time.setScale(0.1, 0.5, false);
        }
    }

    private boomNodePool: cc.NodePool = null;
    public boomEffectNode: cc.Prefab = null;
    public popBoomNode(sucess: Function, fail) {
        if (!this.boomNodePool) {
            this.boomNodePool = new cc.NodePool();
        }
        let node = this.boomNodePool.get();
        if (!node) {
            if (this.boomEffectNode) {
                node = cc.instantiate(this.boomEffectNode);
                sucess(node);
            } else {
                MVC.ComponentHandler.loadAssetHandler('node', `ui/boomEffect`, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                        fail && fail(prefab)
                    }
                    else {
                        this.boomEffectNode = prefab;
                        sucess(cc.instantiate(this.boomEffectNode));
                    }
                }, null, null);
            }
        } else {
            sucess(node);
        }
    }
    public putBoomEffectNode(node: cc.Node) {
        this.boomNodePool.put(node);
    }

    private boomNodePool2: cc.NodePool = null;
    public boomEffectNode2: cc.Prefab = null;
    public popBoomNode2(sucess: Function, fail) {
        if (!this.boomNodePool2) {
            this.boomNodePool2 = new cc.NodePool();
        }
        let node = this.boomNodePool2.get();
        if (!node) {
            if (this.boomEffectNode2) {
                node = cc.instantiate(this.boomEffectNode2);
                sucess(node);
            } else {
                MVC.ComponentHandler.loadAssetHandler('node', `ui/boomEffect2`, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                        fail && fail(prefab)
                    }
                    else {
                        this.boomEffectNode2 = prefab;
                        sucess(cc.instantiate(this.boomEffectNode2));
                    }
                }, null, null);
            }
        } else {
            sucess(node);
        }
    }
    public putBoomEffectNode2(node: cc.Node) {
        this.boomNodePool2.put(node);
    }

    public getUnLockData(): any[] {
        // let weapon: any = FightModel.getInstance.levelCfg.unLockTool[0];
        // if (weapon.length > 0) {
        //     let data = Cfg.Drop.get(weapon[0]);
        //     if (data && data.toolType == 2) {//武器
        //         if (data.weaponId == 201 || data.weaponId == 202) {
        //             return [2, data.id]
        //         } else
        //             return [1, data.weaponId];
        //     } else if (data) {
        //         return [2, data.id];
        //     }
        // } else {
        //     if (FightModel.getInstance.levelCfg.currencyType == 2) {
        //         return [0, FightModel.getInstance.levelCfg.diamondCount];
        //     }
        // }
        return [];
    }

    public get isNeedOpenMenuUI(): boolean {
        let boo = !GameVoManager.getInstance.stateVo.isNewUser;
        GameVoManager.getInstance.stateVo.isNewUser = false;
        Manager.storage.setNumber(Const.STORAGE_NEWUSER, 1);
        return boo;
    }

    public initDropPool(id: number) {
        if (id != 0) {
            Notifier.send(ListenID.Drop_InitDropPoolById, id);
        }
    }

    public checkDropKill(monNum: number, pos: cc.Vec2) {
        // if (this.dropMonId == monId && this.dropMonNum > 0) {
        //     this.dropMonNum--;
        //     // let index = 0;
        //     if (this.dropMonNum <= 0) {
        if (monNum > 0) {
            this.checkDropItem(pos, this.levelCfg.normalDropId);
        } else {

            this.checkDropItem(pos, this.firstDrop ? this.levelCfg.firstDropId : this.levelCfg.normalDropId);
        }
        // }
        // }

    }

    public checkDropItem(pos: cc.Vec2, dropid?: number) {
        let goodslist = [];
        let droplist = [];
        let dropnum = [];
        if (!dropid) dropid = this.levelCfg.normalDropId;
        goodslist = Notifier.call(CallID.Drop_GetDropPoolRewardById, dropid);
        let goodsLen = goodslist.length;
        let gold = 0;
        let diamond = 0;
        let quality = [0, 0, 0, 0];
        let isdouble = RoleManager.getInstance.mainRole.isDoubleReward();
        for (let i = 0; i < goodsLen; i++) {
            let goodsType: Const.dropType = goodslist[i][0];
            let goodsNum = goodslist[i][2];
            let goodsTypeId = goodslist[i][1];
            if (goodsType == Const.dropType.Gold) {
                if (goodsTypeId == 1) {
                    gold += goodsNum;
                    droplist.push(1);
                    dropnum.push(goodsNum);
                    if (isdouble) {
                        gold += goodsNum;
                        droplist.push(1);
                        dropnum.push(goodsNum);
                    }
                } else if (goodsTypeId == 2) {
                    diamond += goodsNum;
                    droplist.push(2);
                    dropnum.push(goodsNum);
                    if (isdouble) {
                        diamond += goodsNum;
                        droplist.push(2);
                        dropnum.push(goodsNum);
                    }
                }
            } else if (goodsType == Const.dropType.Equip) {
                for (let k = 0; k < goodsNum; k++) {
                    droplist.push(goodsTypeId);
                    dropnum.push(1);
                    // GameVoManager.getInstance.addEquip(goodsTypeId);
                    // let equipdata = Cfg.Equip.get(goodsTypeId);
                    // if (this.fightType == 1) {
                    //     GameVoManager.getInstance.myUserVo.bossReward.push(goodsTypeId);
                    //     if (equipdata.quality >= 4) {
                    //         Notifier.send(ListenID.Announce_AddMessage, GameVoManager.getInstance.myUserVo.nickName, GameFunID.Boss, equipdata.name);
                    //     }
                    // }
                    // quality[equipdata.quality - 1]++;
                    this.rewardList.push(goodsTypeId);
                    // Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.EquipReward, [this.fightType == 0 ? 1 : 2, equipdata.part, equipdata.quality, equipdata.level, 1]);
                }
            }
        }
        if (gold) {
            if (this.fightType == 0) {
                this.goldInCome += gold;
            }
            else if (this.fightType == 1) {
                GameVoManager.getInstance.myUserVo.bossGold += gold;
                GameVoManager.getInstance.setGold(gold);
            }
            Notifier.send(ListenID.Fight_GetGold, gold);
        }
        if (diamond) {
            if (this.fightType == 1) {
                GameVoManager.getInstance.myUserVo.bossDiamond += diamond;
                GameVoManager.getInstance.setDiamond(diamond);
            } else {
                this.diamondInCome += diamond;
            }
        }
        if (goodsLen > 0) {
            Notifier.send(ListenID.Fight_AddEquipDrop, droplist, pos, dropnum);
        }
        if (quality[0]) {
            Notifier.send(ListenID.Log_Event, { event_name: "level_gainWhiteEquipz", counter: quality[0] });
        }
        if (quality[1]) {
            Notifier.send(ListenID.Log_Event, { event_name: "level_gainGreenEquipz", counter: quality[1] });
        }
        if (quality[2]) {
            Notifier.send(ListenID.Log_Event, { event_name: "level_gainBlueEquipz", counter: quality[2] });
        }
        if (quality[3]) {
            Notifier.send(ListenID.Log_Event, { event_name: "level_gainvioletEquipz", counter: quality[3] });
        }
    }
}