import { RoleManager } from "../../manager/RoleManager";
import { BulletManager } from "../../manager/BulletManager";
import { Const } from "../../config/Const";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameCamera } from "./item/GameCamera";
import FightModel from "./FightModel";
import { UIManager } from "../../framework/UIManager";
import { Manager } from "../../manager/Manager";
import { ToolManager } from "../../manager/ToolManager";
import { Common_UIPath } from "../../common/Common_Define";
import { MVC } from "../../framework/MVC";
import { Cfg } from "../../config/Cfg";
import { GameVoManager } from "../../manager/GameVoManager";
import { DecorateItem } from "./item/DecorateItem";
import { FightDamageDisplay } from "./FightDamageDisplay";
import { CallID } from "../../CallID";
import { Time } from "../../framework/Time";
import { MonsterVo, Monster } from "../../component/Monster";
import { Util } from "../../utils/Util";
import { SceneManager } from "../../manager/SceneManager";
import { AlertManager } from "../../alert/AlertManager";
import { GameWorld } from "../../component/GameWorld";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FightScene extends cc.Component {

    public changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Fight_Start, this.startGame, this);
        Notifier.changeListener(enable, ListenID.Fight_End, this.endGame, this);
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.gamePause, this);
        Notifier.changeListener(enable, ListenID.Fight_AddTool, this.addTool, this);
        Notifier.changeListener(enable, ListenID.Fight_ReliveSuccess, this.reliveGame, this);
        Notifier.changeListener(enable, ListenID.Fight_Restart, this.reStart, this);
        Notifier.changeListener(enable, ListenID.Game_FightBackToHome, this.backHome, this);
        Notifier.changeListener(enable, ListenID.Fight_StartNextStep, this.showNextStep, this);
        Notifier.changeListener(enable, ListenID.Fight_SHOWEFFECT, this.showEffect, this);
        Notifier.changeListener(enable, ListenID.Fight_SHOWEFFECT_NUM, this.showEffectNum, this);
        Notifier.changeListener(enable, ListenID.Fight_BloodWarn, this.showBloodWarn, this);
        Notifier.changeListener(enable, ListenID.Fight_KeepBoss, this.gameKeepBoss, this);
        // Notifier.changeListener(enable, ListenID.Fight_ShowShake, this.shakeCamera, this);
        Notifier.changeListener(enable, ListenID.Menu_Open, this.openMenu, this);
        Notifier.changeListener(enable, ListenID.Fight_DownTimeFinish, this.downTimeFinish, this);
        Notifier.changeListener(enable, ListenID.Map_addMapBgSuccess, this.addMapBgSuccess, this);
        Notifier.changeListener(enable, ListenID.Map_addMapDecorateSuccess, this.addMapDecorateCb, this);
        Notifier.changeListener(enable, ListenID.Scene_StartLoadMap, this.startLoadMap, this);
        Notifier.changeListener(enable, ListenID.Fight_AddEquipDrop, this.addEquipDropList, this);
        Notifier.changeListener(enable, ListenID.Alert_TipsShow, this.showNormalTips, this);
        Notifier.changeListener(enable, ListenID.Boss_FightEnd, this.endGame, this);
        Notifier.changeListener(enable, ListenID.Fight_StartNextAfterAnim, this.startNextAfterAnim, this);
        Notifier.changeListener(enable, ListenID.FightToBoss, this.fightToBoss, this);
        Notifier.changeListener(enable, ListenID.Fight_ShowBossWarn, this.showLevelWarn, this);
    }

    private gamePanel: cc.Node = null;
    private bulletPanel: cc.Node = null;
    private toolPanel: cc.Node = null;
    private mainRole: cc.Node = null;
    private startBtn: cc.Node = null;
    private roleCamera: cc.Camera = null;

    private gameCamera: GameCamera;
    private handShankBg: cc.Node = null;
    private handShank: cc.Node = null;
    private effectPanel: cc.Node = null;
    private hitPosNode: cc.Node = null;
    private reliveBoom: cc.Node = null;
    private gameState: number = 0;
    private hurtPanel: cc.Node = null;
    private warn: cc.Node = null;
    private levelWarn: cc.Node = null;
    private bglist: cc.Node = null;
    private decorateItem: cc.Node = null;
    private decorateMg: DecorateItem = null;
    onLoad() {
        // Manager.map
        this.changeListener(true);
    }

    start() {
        this.initScene();
        Manager.audio.playMusic(508, true);
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    }



    public showNormalTips(str) {
        AlertManager.showNormalTips(str);
    }
    public dropPanel;
    private realSize: cc.Size;
    private battleWall: cc.Animation;
    initScene() {
        GameVoManager.getInstance.myUserVo.levelStartState = 10;
        this.gamePanel = this.node.getChildByName("gamePanel");
        this.bulletPanel = this.node.getChildByName("bulletPanel");
        this.toolPanel = this.node.getChildByName("toolPanel");
        this.effectPanel = this.node.getChildByName("effectPanel");
        this.hurtPanel = this.node.getChildByName("hurtNumPanel");
        this.warn = this.node.getChildByName("warn");
        this.levelWarn = this.node.getChildByName("warn2");
        let battlepanel = this.node.getChildByName("battlePanel");
        this.battleWall = battlepanel.children[0].getComponent(cc.Animation);
        this.battleWall.node.active = false;
        let size: cc.Size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.realSize = size;
        this.warn.height = size.height - 5; this.warn.width = size.width - 5;
        this.warn.active = false;
        this.levelWarn.height = size.height - 5; this.levelWarn.width = size.width - 5;
        this.levelWarn.active = false;
        this.mainRole = this.gamePanel.getChildByName("player");
        this.roleCamera = this.node.getChildByName("Main Camera").getComponent(cc.Camera);
        this.handShankBg = cc.find("control/bg", this.node);
        this.handShank = this.handShankBg.getChildByName("circle");
        this.reliveBoom = this.node.getChildByName("reliveBoom");
        this.reliveBoom.scale = 0;
        this.reliveBoom.active = false;
        let footmark = this.gamePanel.getChildByName("footdecorate");
        let footmarkParent = this.gamePanel.getChildByName("footMark");
        this.bglist = this.node.getChildByName("bglist");
        this.decorateItem = this.node.getChildByName("decorate");
        let list = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        Manager.map.setMapByChapterId(list[0], this.bglist, this.decorateItem);
        this.handShankBg.active = false;
        this.handShankBg.parent.active = true;
        this.gameCamera = new GameCamera(this.roleCamera, this.mainRole);
        FightModel.getInstance.bulletParent = this.bulletPanel;
        FightModel.getInstance.bulletMonParent = this.node.getChildByName("bulletMonPanel");
        FightModel.getInstance.warnParent = this.node.getChildByName("warnPanel");
        FightModel.getInstance.specialEffectNode = this.effectPanel.getChildByName("specialHit");
        this.dropPanel = this.node.getChildByName("dropPanel");
        FightModel.getInstance.footMarkNode = footmark;
        FightModel.getInstance.footmarkParent = footmarkParent;
        FightModel.getInstance.bombParent = this.node.getChildByName("bombPanel");
        FightModel.getInstance.gamePanel = this.gamePanel;
        // RoleManager.getInstance.setMainRoleInfo(this.mainRole);
        RoleManager.getInstance.setMainCamera(this.roleCamera);
        GameVoManager.getInstance.myUserVo.curLogLevel = GameVoManager.getInstance.myUserVo.topLevel;
        GameVoManager.getInstance.stateVo.curLevel = GameVoManager.getInstance.myUserVo.topLevel + 1;
        // FightModel.getInstance.initLevelCfg(GameVoManager.getInstance.stateVo.curLevel);
        // RoleManager.getInstance.mainRole.setGunInfo(GameVoManager.getInstance.myUserVo.defaultGunId);
        this.registerTouchOperate();

        // if (FightModel.getInstance.isNeedOpenMenuUI || HD_MODULE.getPlatform().isIOS())
        UIManager.Open(Common_UIPath.MenuUI, 0, MVC.eUILayer.Panel, null);
        // else {
        // GameVoManager.getInstance.setPower(5, 3);
        // GameVoManager.getInstance.myUserVo.lvUid = Util.guid();
        // Notifier.send(ListenID.Fight_Start, 0);
        // if (GameVoManager.getInstance.myUserVo.topLevel == 0) {
        //     GameVoManager.getInstance.myUserVo.levelStartState = 1;
        //     Notifier.send(ListenID.Fight_ShowGuide);
        //     GameVoManager.getInstance.myUserVo.lvUid = Util.guid();
        // } else {
        //     GameVoManager.getInstance.myUserVo.lvUid = Util.guid();
        //     Notifier.send(ListenID.Fight_Start, 0);
        // }
        // }
    }

    /**注册触摸事件 */
    private registerTouchOperate() {
        this.gamePanel.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.gamePanel.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.gamePanel.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // this.gamePanel.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private shootPos: cc.Vec2 = cc.Vec2.ZERO;
    private startPos: cc.Vec2 = cc.Vec2.ZERO;
    private touchCount: number = 0;
    private catchRocker: boolean = false;
    public onTouchStart(event: cc.Event.EventTouch) {
        if (this.gameState != 1 || FightModel.getInstance.isPause > 0) return;
        // if (this.touchCount == 0) {
        let delta = this.handShankBg.parent.convertToNodeSpaceAR(event.getLocation());
        this.handShankBg.active = true;
        // if (this.handShankBg.position.sub(delta).mag() <= Const.OperateDis) {
        this.catchRocker = true;
        this.schedule(this.onRoleMove, 0.02);
        // this.setRockerPos(delta);
        this.startPos = delta;
        this.handShankBg.position = delta;
        // }
        // //console.log(delta, this.handShankBg.position.sub(delta).mag());
        // }
        this.touchCount++;
    }
    public onTouchMove(event: cc.Event.EventTouch) {
        if (this.gameState != 1 || FightModel.getInstance.isPause > 0) return;
        if (this.catchRocker) {
            let delta = this.handShankBg.parent.convertToNodeSpaceAR(event.getLocation());
            this.setRockerPos(delta);
        }
    }

    public onTouchEnd(event: cc.Event.EventTouch) {
        if (this.gameState != 1 || FightModel.getInstance.isPause > 0) return;
        this.touchCount--;
        if (this.touchCount <= 0) {
            this.touchCount = 0;
            this.resetRocker();
            Notifier.send(ListenID.Fight_RoleStand);
            // this.handShankBg.active = false;
        }
    }

    public startGame(type, lv) {
        this.startopenguide = 0;
        FightModel.getInstance.fightType = type;
        FightDamageDisplay.getInstance.resetCount();
        this.handShankBg.active = true;
        RoleManager.getInstance.resetGame();
        GameVoManager.getInstance.myUserVo.tempTopLevel = GameVoManager.getInstance.myUserVo.topLevel;
        if (type == 0) {
            GameVoManager.getInstance.stateVo.curLevel = lv;
            GameVoManager.getInstance.myUserVo.lvstartTime = Time.serverTimeMs;
            FightModel.getInstance.initChapterCfg(GameVoManager.getInstance.stateVo.curLevel);
            GameVoManager.getInstance.myUserVo.stageboxNum = 0;
        } else {
            Time.startGameTimeLog();
            FightModel.getInstance.initBossCfg(lv);
            GameVoManager.getInstance.myUserVo.lastBossRank = GameVoManager.getInstance.myUserVo.topBossRank;
            GameVoManager.getInstance.myUserVo.bossGold = 0;
            GameVoManager.getInstance.myUserVo.bossDiamond = 0;
            GameVoManager.getInstance.myUserVo.bossReward = [];
        }
        Notifier.send(ListenID.Announce_LogStartNum, 1);
        this.checkMon = 0;
        RoleManager.getInstance.setMainRoleInfo(this.mainRole);
        let gunid = GameVoManager.getInstance.myUserVo.defaultGunId;
        RoleManager.getInstance.mainRole.setGunInfo(gunid);
        RoleManager.getInstance.mainRole.getGunInfo().initSkillInfo();
        RoleManager.getInstance.mainRole.isCanReliVe = true;
        let chapterinfo = GameVoManager.getInstance.stateVo.chapterInfo;
        if (chapterinfo && chapterinfo.skillList) {
            let idlist = chapterinfo.skillList;
            let doublelist = chapterinfo.skillIdDoubleList;
            for (let i = 0; i < idlist.length; i++) {
                Notifier.send(ListenID.Fight_AddSkill, idlist[i], doublelist[i]);
            }
        }
        if (chapterinfo && chapterinfo.curHp) {
            RoleManager.getInstance.mainRole.setCurHp(chapterinfo.curHp);
        }
        if (chapterinfo && chapterinfo.topLevel % 5 == 0) {
        } else {
            this.schedule(this.onAddMonster, 1);
        }
        // if (GameVoManager.getInstance.stateVo.curLevel == 1 && GameVoManager.getInstance.gameSwitchVo.animationGuide) {
        //     RoleManager.getInstance.mainRole.cheat = true;
        //     this.startopenguide = 1.5;
        // } else {
        //     RoleManager.getInstance.mainRole.cheat = false;
        // }
        if (GameVoManager.getInstance.myUserVo.roleLv >= 1 && !chapterinfo) {
            Notifier.send(ListenID.Skill_OpenSelectView, { isfirst: true });
        }
        this.gameState = 1;
        RoleManager.getInstance.isFighting = true;
        FightModel.getInstance.isFighting = true;
        UIManager.Close(Common_UIPath.MenuUI);
        Notifier.send(ListenID.Game_SetCurrencyVis, false);
        UIManager.Open(Common_UIPath.FightUI, MVC.eTransition.Scale, MVC.eUILayer.Panel);
        if (chapterinfo && !!chapterinfo.needLearn) {
            Notifier.send(ListenID.Skill_OpenSelectView);
        }

        Notifier.send(ListenID.Guide_Check_Condition);
    }

    public onOpenGuide() {
        UIManager.Open(Common_UIPath.AnimationGuideView, MVC.eTransition.Default, MVC.eUILayer.Popup)
    }
    public startopenguide = 0;
    public endGame(boo: boolean) {
        this.gameState = 2;
        this.touchCount = 0;
        this.warn.active = false;
        RoleManager.getInstance.isFighting = false;
        FightModel.getInstance.isFighting = false;
        GameVoManager.getInstance.myUserVo.resultNum++;
        this.unschedule(this.onAddMonster);
        Notifier.send(ListenID.Fight_RoleStand);
        // this.handShankBg.active = false;
        this.resetRocker();
    }

    public gameKeepBoss(boo) {
        this.unschedule(this.onAddMonster);
    }
    public downTimeFinish() {
        // this.onAddMonster();
        // Notifier.send(ListenID.Fight_MonsterWarn, 2);
        Time.startGameTimeLog();
        Notifier.send(ListenID.Announce_LogStartNum, 1);
        this.schedule(this.onAddMonster, 1);
    }

    public addMapDecorateCb(id) {
        if (!this.decorateMg) {
            this.decorateMg = new DecorateItem(this.decorateItem.children[0]);
        } else {
            this.decorateMg.resetNode(this.decorateItem.children[0]);
        }
    }

    public addMapBgSuccess() {
        SceneManager.getInstance().closeLoading();
    }

    public startLoadMap(id: number) {
        if (id) {
            Manager.map.setMapByChapterId(id, this.bglist, this.decorateItem);
        } else {
            let list = Util.levelToChapterId(GameVoManager.getInstance.stateVo.curLevel - 1);
            Manager.map.setMapByChapterId(list[0], this.bglist, this.decorateItem);
        }
    }

    private isPause: number = 0;
    public gamePause(boo: boolean) {
        if (boo) {
            this.isPause++;
        } else {
            this.isPause--;
        }
        if (this.isPause > 0) {
            this.resetRocker();
            Notifier.send(ListenID.Fight_RoleStand);
            // this.handShankBg.active = false;
            this.touchCount = 0;
            let state = this.battleWall.getAnimationState("battlewall");
            if (this.battleWall.node.active && state.isPlaying) {
                this.battleWall.pause();
            }
        } else {
            this.touchCount = 0;
            this.isPause = 0;
            let state = this.battleWall.getAnimationState("battlewall");
            if (this.battleWall.node.active && state.isPaused) {
                this.battleWall.resume();
            }
        }
    }

    public addTool(directid: number, type: number, pos: cc.Vec2, killnumber: number) {
        if (this.gameState != 1) return;
        let id = directid;
        if (directid == 0)
            id = FightModel.getInstance.getToolTypeRandom(type, killnumber);
        if (id) {
            let tool = ToolManager.getInstance.addTool(id);
            if (!tool) return;
            tool.position = pos;
            tool.setParent(this.toolPanel);
        } else {
            console.error("addTool fail id", id);
        }
    }

    public addEquipDropList(equipList: Array<number>, pos: cc.Vec2, goodsNum: Array<number>) {
        if (this.gameState != 1) return;
        let len = equipList.length;
        for (let i = 0; i < len; i++) {
            let equipdrop = ToolManager.getInstance.addEquipDrop(equipList[i], goodsNum[i]);
            if (!equipdrop) return;
            equipdrop.position = pos;
            equipdrop.setParent(this.dropPanel);
            equipdrop.getComponent("EquipDrop").startAction();
        }
    }

    public reliveGame(args?: number) {
        Manager.audio.playAudio(502);
        // if (!args) {
        //     this.reliveBoom.active = true;
        //     this.reliveBoom.scale = 0;
        //     this.reliveBoom.opacity = 255;
        //     this.reliveBoom.runAction(cc.sequence(cc.scaleTo(1, 6).easing(cc.easeIn(2.0)), cc.fadeOut(0.05), cc.callFunc(() => {
        //         this.reliveBoom.active = false;
        //     })));
        //     this.reliveBoom.position = this.mainRole.position;
        // }
        this.touchCount = 0;
        Notifier.send(ListenID.Fight_RoleStand);
        // this.handShankBg.active = false;
        console.log("reliveGame");
        RoleManager.getInstance.mainRole.rebron();
        RoleManager.getInstance.mainRole.setInvicibleBuff(5);
        // HD_MODULE.NET.logGameRun({ uid: GameVoManager.getInstance.myUserVo.lvUid });
    }

    public reStart() {
        // RoleManager.getInstance.isFighting = false;
        // FightModel.getInstance.isFighting = false;
        // this.unschedule(this.onAddMonster);
        // this.shootPos = cc.Vec2.ZERO;
        // this.mainRole.position = cc.Vec2.ZERO;
        // // this.handShankBg.active = false;
        // ToolManager.getInstance.fightEnd();
        // this.startGame(FightModel.getInstance.fightType);
    }

    public backHome() {
        this.touchCount = 0;
        RoleManager.getInstance.isFighting = false;
        FightModel.getInstance.isFighting = false;
        this.gameState = 2;
        this.warn.active = false;
        RoleManager.getInstance.resetGame();
        ToolManager.getInstance.fightEnd();
        if (FightModel.getInstance.fightType == 0) {
            FightModel.getInstance.initLevelCfg(GameVoManager.getInstance.stateVo.curLevel);
        } else {
            FightModel.getInstance.initBossCfg(GameVoManager.getInstance.myUserVo.topBossRank + 1);
        }
        this.unschedule(this.onAddMonster);
        this.unschedule(this.onOpenGuide);
        UIManager.Close(Common_UIPath.FightUI);
        UIManager.Open(Common_UIPath.MenuUI, MVC.eTransition.Scale, MVC.eUILayer.Panel, null);
        this.mainRole.position = cc.Vec2.ZERO;
        this.showBattleBossWar(false);
    }

    public showNextStep(curStep: number, allStep) {
        this.unschedule(this.onAddMonster);
        Notifier.send(ListenID.Fight_MonsterWarn, 0, curStep);
        this.checkMon = 0;
        // if (curStep == allStep && (FightModel.getInstance.curLevel % 5 == 0 || FightModel.getInstance.curLevel == 2)) {
        //     Notifier.send(ListenID.Fight_MonsterWarn, 1);
        //     this.showLevelWarn();
        // } else {
        //     Notifier.send(ListenID.Fight_MonsterWarn, 0);
        // }

        // this.onAddMonster();
        // this.schedule(this.onAddMonster, 1);
        // if (this.warn.getActionByTag(1)) {
        //     this.warn.stopActionByTag(1);
        // }
        // if (FightModel.getInstance.curLevel <= 5) {
        //     setTimeout(() => {
        //         Notifier.send(ListenID.Fight_ShowNomalTips, FightModel.getInstance.curBronDirs);
        //     }, 50)
        // }

    }

    public startNextAfterAnim(curStep) {
        // this.onAddMonster();
        this.schedule(this.onAddMonster, 1);
    }

    public fightToBoss(boss) {
        if (boss) {
            RoleManager.getInstance.mainRole.Pos = cc.v2(0, 0);
        }
        this.showBattleBossWar(boss);
    }

    public showBattleBossWar(boo) {
        if (boo) {
            GameWorld.Instance.setWorldRange(Const.BossRangeMin, Const.BossRangeMax);
            setTimeout(() => {
                this.battleWall.node.active = true;
                this.battleWall.play("battlewall");
            }, 400);
        } else {
            if (this.battleWall.node.active) {
                this.battleWall.play("battlewallReverse");
                setTimeout(() => {
                    this.battleWall.node.active = false;
                }, 800);
            }
            GameWorld.Instance.setWorldRange(Const.MonsterBronRangeMin, Const.MonsterBronRangeMax);
        }
    }

    public onRoleMove() {
        RoleManager.getInstance.mainRole.onMove(this.shootPos);
    }

    //怪物出现
    private checkMon: number = 0;
    public onAddMonster() {
        if (RoleManager.getInstance.allmonster >= Const.MonsterNum || FightModel.getInstance.isPause > 0
            || FightModel.getInstance.curStepRemnantMon <= 0) {
            return;
        }
        let bornNum = FightModel.getInstance.bornNum;
        let canBornNum = Const.MonsterNum - RoleManager.getInstance.allmonster;
        if (canBornNum < bornNum) {
            bornNum = canBornNum;
        }
        let camera = this.roleCamera.node.position;
        for (let i = 0; i < bornNum; i++) {
            let monlist = FightModel.getInstance.getMonsterRandom();
            if (!monlist[0]) {
                this.checkMon++;
                if (this.checkMon >= 3) {
                    this.checkMon = 0;
                    if (!this.checkSceneMon() && FightModel.getInstance.curStepRemnantMon > 0) {
                        FightModel.getInstance.skilCurStep();
                    }
                }
                break;
            }
            if (FightModel.getInstance.fightType == 0) {
                let monInfo = Cfg.Monster.get(monlist[0]);
                if (!monInfo) { continue; }
                let monnode = RoleManager.getInstance.popMonsterNode(monlist[0]);
                if (monnode) {
                    monnode.position = cc.v2(camera.x + monlist[1][0], camera.y + monlist[1][1]);
                    const rect = monnode.getBoundingBox();
                    let offsetbron = cc.v2(rect.width * 0.5, rect.height * 0.5);
                    monnode.setParent(FightModel.getInstance.gamePanel);
                    let monVo: MonsterVo = { monsterVoCfg: monInfo };
                    let mon: Monster = RoleManager.getInstance.addMonster(monnode, monVo);
                    if (FightModel.getInstance.curStep % 5 == 0) {
                        // mon.Pos = cc.v2(0, 450);
                        let index = Util.random(0, 4);
                        let pos = Const.BossBronPos[index];
                        mon.Pos = cc.v2(pos[0], pos[1]);
                    } else {
                        mon.Pos = mon.Pos.clampf(GameWorld.Instance.BottomLeft.add(offsetbron), GameWorld.Instance.TopRight.sub(offsetbron));
                    }
                    mon.moveTo(this.mainRole.position);
                    this.showEffect(1, 1000, monnode.position);
                }
            } else {
                let monid = monlist[0][0];
                let mongunlist = monlist[0][1];
                let mondropbox = monlist[0][2];
                let hp = monlist[0][4];
                let monInfo = Cfg.Monster.get(monid);
                if (!monInfo) { continue; }
                let monnode = RoleManager.getInstance.popMonsterNode(monid);
                if (monnode) {
                    monnode.position = cc.v2(camera.x + monlist[1][0], camera.y + monlist[1][1]);
                    const rect = monnode.getBoundingBox();
                    let offsetbron = cc.v2(rect.width * 0.5, rect.height * 0.5);
                    if (FightModel.getInstance.curStep % 5 == 0) {
                        monnode.position = cc.v2(0, 450);
                    } else {
                        monnode.position = monnode.position.clampf(Const.MonsterBronRangeMin.add(offsetbron), Const.MonsterBronRangeMax.sub(offsetbron));
                    }
                    monnode.setParent(FightModel.getInstance.gamePanel);
                    let monVo: MonsterVo = { monsterVoCfg: monInfo, extarInfo: { guns: mongunlist, dropBox: mondropbox, monHp: hp } };
                    let mon: Monster = RoleManager.getInstance.addMonster(monnode, monVo);
                    mon.moveTo(this.mainRole.position);
                    this.showEffect(1, 1000, monnode.position);
                }
            }
        }
    }

    public onSetQte() {
        Notifier.send(ListenID.Fight_StartQte);
    }

    /**
     * 展示特效
     * @param type 特效类型 0枪受击
     * @param id 特效id
     * @param pos 位置
     */
    public showEffect(type: number, id: number, pos: cc.Vec2) {
        if (type == 10) {
            FightModel.getInstance.popDeadNode(node => {
                node.setParent(this.effectPanel);
                node.setSiblingIndex(1 << 10);
                node.position = pos;
            }, () => {

            });
        } else if (type == 11) {
            FightModel.getInstance.popBoomNode(node => {
                node.setParent(this.effectPanel);
                // node.setSiblingIndex(1 << 10);
                let hitpos = this.effectPanel.convertToNodeSpace(pos);
                node.position = hitpos;
            }, () => {

            });
        } else if (type == 12) {
            let node = ToolManager.getInstance.popToolEffectNodeByType(id);
            if (node) {
                node.setParent(this.effectPanel);
                node.setSiblingIndex(1 << 10);
                node.position = pos;
            }
        } else if (type == 13) {
            FightModel.getInstance.popBoomNode2(node => {
                node.setParent(this.effectPanel);
                // node.setSiblingIndex(1 << 10);
                let hitpos = this.effectPanel.convertToNodeSpace(pos);
                node.position = hitpos;
                let anim = node.getComponent(cc.Animation);
                anim.play();
                anim.on('finished', () => {
                    FightModel.getInstance.putBoomEffectNode2(node);
                }, null);
            }, () => {

            });
        } else if (type == 14) {//陷阱
            let node = ToolManager.getInstance.getTrapById(id);
            if (node) {
                node.setParent(FightModel.getInstance.bombParent);
                node.position = pos;
                node.getComponent("Tool").startAttack();
            } else {
                console.error('陷阱node error');
            }
        } else if (type == 15) {//雷击

        }
        else {
            if (id == 0 || typeof (id) == 'undefined') return;
            let hitpos = pos;
            if (type == 0) {
                hitpos = this.effectPanel.convertToNodeSpace(pos);
            }
            let node = FightModel.getInstance.popEffectNode();
            let anim = node.addComponent(cc.Animation);
            Manager.anim.getHitAnimationClip(`hit${id}`).then((res) => {
                if (!res) return;
                try {
                    anim.on('finished', () => {
                        node.removeComponent(cc.Animation);
                        FightModel.getInstance.pushEffectNode(node);
                    }, null);
                } catch (error) {
                }

                anim.addClip(res);
                anim.play(res.name);
                node.setParent(this.effectPanel);
                node.position = hitpos;
            });
        }
    }
    public showEffectNum(hurt: number, pos: cc.Vec2, monid: number, isBaoji: boolean = false, isDirectKill: boolean = false, param: any = null) {
        FightDamageDisplay.getInstance.showHurt(hurt, pos, this.hurtPanel, monid, isBaoji, isDirectKill, param);
    }

    public showBloodWarn() {
        let this1 = this;
        this.warn.stopAllActions();
        this.warn.active = true;
        this.warn.opacity = 255;
        this.warn.runAction(cc.sequence(cc.repeat(cc.sequence(cc.fadeTo(0.4, 155), cc.fadeTo(0.4, 255)), 3), cc.callFunc(() => {
            this1.warn.active = false;
        })));
    }
    public showLevelWarn() {
        if (this.levelWarn.getActionByTag(1)) {
            this.levelWarn.stopActionByTag(1);
        }
        this.levelWarn.active = true;
        let action = cc.sequence(cc.repeat(cc.sequence(cc.fadeTo(0.3, 220), cc.fadeTo(0.3, 50)), 4), cc.callFunc(() => {
            this.levelWarn.active = false;
        }));
        action.setTag(1);
        this.levelWarn.runAction(action);
    }

    /**设置摇杆坐标，适配屏幕 */
    public setRockerInfo() {
        let size: cc.Size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.handShankBg.position = cc.v2(0, -0.5 * size.height + 250);
    };

    public setRockerPos(delta: cc.Vec2) {
        let pos = delta.sub(this.startPos);
        this.handShankBg.position = delta;//pos;
        this.shootPos = pos.normalize();
        let len = pos.mag();
        let shankPos = cc.Vec2.ZERO.sub(this.shootPos.mul(cc.misc.clampf(pos.mag(), 0, 88)));
        this.handShank.position = shankPos;
        if (len >= 88) {
            let bgpos = delta.sub(this.shootPos.mul(88));
            this.startPos = bgpos;
        }
    }
    /**重置摇杆 */
    public resetRocker() {
        this.handShank.position = cc.Vec2.ZERO;
        this.unschedule(this.onRoleMove);
        this.shootPos = cc.Vec2.ZERO;
        this.startPos = cc.Vec2.ZERO;
        this.catchRocker = false;
        this.handShankBg.x = 0;
        this.handShankBg.y = -500;
    }

    public updateCameraCulling() {
        if (RoleManager.getInstance.mainRole.node) {
            const zoom = 0.7;
            const width = this.realSize.width / zoom;
            const height = this.realSize.height / zoom;
            const cameraRect = cc.rect(this.roleCamera.node.x - width * 0.7, this.roleCamera.node.y - height * 0.7, width * 1.4, height * 1.4);
            // const bglist = this.bglist.children;
            // const bglistlen = this.bglist.childrenCount;
            /** 背景剔除*/
            // for (let i = 0; i < bglistlen; i++) {
            //     const bgrect = bglist[i].getBoundingBox();
            //     const interseccted = cc.Intersection.rectRect(cameraRect, bgrect);
            //     bglist[i].active = interseccted;
            // }
            /**怪物剔除 */
            const monsterlist = RoleManager.getInstance._monsterList;
            for (const t in monsterlist) {
                if (monsterlist[t].node) {
                    const monrect = monsterlist[t].node.getBoundingBox();
                    const interseccted = cc.Intersection.rectRect(cameraRect, monrect);
                    monsterlist[t].node.active = interseccted;
                }
            }
            /**子弹剔除 */
            const bulletlist = BulletManager.getInstance._bulletList;
            for (const t in bulletlist) {
                if (bulletlist[t].node) {
                    const bulletrect = bulletlist[t].node.getBoundingBox();
                    if (bulletlist[t].bulletType != 20 && bulletlist[t].bulletType != 35) {
                        const interseccted = cc.Intersection.rectRect(cameraRect, bulletrect);
                        bulletlist[t].node.active = interseccted;
                    }
                }
            }
        }
    }

    private audioTime = 0;
    update(dt) {
        this.audioTime += dt;
        if (this.audioTime >= Const.audioLimitTime) {
            this.audioTime = 0;
            Manager.audio.audionum = 0;
            Manager.audio.audioHitNum = 0;
            Manager.audio.audioUINum = 0;
            GameVoManager.getInstance.stateVo.shakeCount = 0;
        }
        if (FightModel.getInstance.isPause <= 0) {
            this.updateCameraCulling();
            // if (this.startopenguide > 0) {
            //     this.startopenguide -= dt;
            //     if (this.startopenguide <= 0) {
            //         if (this.gameState == 1) {
            //             this.onOpenGuide();
            //         }
            //     }
            // }
        }
    }

    lateUpdate(dt) {
        this.gameCamera && this.gameCamera.lateUpdate(dt);
    }

    onDestroy() {
        this.changeListener(false);
    }

    openMenu(boo) {
        // console.log('this.bglist', this.bglist);
        this.bglist.active = !boo;
        this.decorateItem && (this.decorateItem.active = !boo);
        this.gamePanel.active = !boo;
    }

    public checkSceneMon() {
        return RoleManager.getInstance.allmonster > 0;
    }
}
