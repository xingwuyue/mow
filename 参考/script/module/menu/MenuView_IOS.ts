import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameVoManager } from "../../manager/GameVoManager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, FunUnlockTipsData, GameFunID, GameFunUnlockType, Guide } from "../../common/Common_Define";
import { Const } from "../../config/Const";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import { Time } from "../../framework/Time";
import { Util } from "../../utils/Util";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { Cfg } from "../../config/Cfg";
import { MenuController } from "./MenuController";
import { UIRole, UIRoleManager } from "../../component/UIRole";
import { SceneManager } from "../../manager/SceneManager";
import { CallID } from "../../CallID";
import MenuModel from "./MenuModel";
import EquipModel from "../equip/EquipModel";
import BoxModel from "../box/BoxModel";
import FunOpen from "../funopen/FunOpen";
import FunUnlockTipsController from "../tips/FunUnlockTips/FunUnlockTipsController";
import TechnologyModel from "../technology/TechnologyModel";

const { ccclass, property } = cc._decorator;
declare let wx;
let angle = 30;
let isSelectLevel = false;
@ccclass
export default class MenuView_IOS extends MVC.BaseView {
    @property(cc.Animation)
    powerAnimation: cc.Animation = null;

    @property(cc.Node)
    btnInvite: cc.Node = null;

    @property(cc.Node)
    btnInviteWeapon: cc.Node = null;

    @property(cc.Node)
    playerNode: cc.Node = null;

    @property(cc.Node)
    bottom: cc.Node = null;

    @property(cc.Node)
    mapNode: cc.Node = null;

    @property(cc.Node)
    chapterNode: cc.Node = null;

    @property(cc.Label)
    levelText: cc.Label = null;

    @property([cc.Sprite])
    levelbgList: cc.Sprite[] = [];

    @property([cc.Label])
    levelTextList: cc.Label[] = [];

    @property(cc.SpriteFrame)
    passSp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    nopassSp: cc.SpriteFrame = null;

    @property(cc.Button)
    btnStart: cc.Button = null;

    @property(cc.Node)
    btnRank: cc.Node = null;

    @property(cc.Node)
    btnRewardTask: cc.Node = null;

    @property(cc.Node)
    btnEcological: cc.Node = null;

    @property(cc.Node)
    btnTech: cc.Node = null;

    @property(cc.RichText)
    announceMsg: cc.RichText = null;

    public _start: boolean = false;
    public uiRole: UIRole = null;


    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GoldEffect_Show, this.goldEffectShow, this);
        Notifier.changeListener(enable, ListenID.Close_FreeWeapon, this.closeFreeWeapon, this);
        Notifier.changeListener(enable, ListenID.Hide_InviteWeaponIcon, this.updateWeaponBubble, this);
        Notifier.changeListener(enable, ListenID.Game_OpenUIList, this.openUIList, this);
        Notifier.changeCall(enable, CallID.Game_IsStart, this.isStart, this);
        Notifier.changeListener(enable, ListenID.MainDraw_GetEquip, this.updateHighEquipVisible, this);
        Notifier.changeListener(enable, ListenID.Menu_SelectChapter, this.selectChapter, this);
        Notifier.changeListener(enable, ListenID.Menu_ShowAnnounce, this.showAnnounce, this);
        Notifier.changeListener(enable, ListenID.Menu_AnnounceClick, this.clickAnnounce, this);
        Notifier.changeListener(enable, ListenID.Role_GetExp, this.onRoleExpGet, this);
        this.powerAnimation.on("finished", this.onPowerFinish, this);
    }

    public isStart() {
        return this._start;
    }
    /*
     * 打开界面回调，每次打开只调用一次
     */
    public cheatNode: cc.Node = null;
    public touchmove: cc.Node = null;
    public chapterAllNum: number = 0;
    public onOpen(args: any): void {
        super.onOpen(args);
        this.chapterAllNum = Cfg.Chapter.filter({}).length;
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.MainView;
        this.initNode();
        this.fixUI();
        UIRoleManager.getUIRole((node) => {
            if (this.playerNode && cc.isValid(this.playerNode)) {
                this.uiRole = new UIRole();
                this.uiRole.init(node);
                node.scale = 1;
                this.playerNode.addChild(node);
            }
        })
        this.checkGunInfo();
        this.btnHideOrShow();
        // this.reissueSignReward();
        this.setBossBtnState();
        this.postGameScore();
        this.checkoutPayInfo();
        Notifier.send(ListenID.GetShareTimes);         //获取今日分享次数
        this.rigisterRemind();
        this.initLevelProg();
        this.registerTouch();

        Notifier.send(ListenID.Game_SetCurrencyVis, true);
        this.onFlush();
        if (GameVoManager.getInstance.myUserVo.showUnLockPartIndex) {
            Notifier.send(ListenID.Equip_OpenUnLockPartView, GameVoManager.getInstance.myUserVo.showUnLockPartIndex)
            GameVoManager.getInstance.myUserVo.showUnLockPartIndex = 0;
        }

        Notifier.send(ListenID.Log_Event, { event_name: "into_homepage" });
        this.updateHighEquipVisible();
        this.initOpenList();
        this.openUIList();
        UIManager.Open(Common_UIPath.CurrencyUI, 0, MVC.eUILayer.PopupDown);
        Notifier.send(ListenID.On_Open_Menu);

        this.setPersonInfo();
        this.checkChapterInfo();
        this.showBtn();
        // this.rigisterFunUnlockTipsCheck();
    }

    openCallBack() {
        // this.rigisterGuideCheck();
    }

    public showBtn() {
        let chapter = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let chapterId = (chapter[1] == chapter[2]) ? chapter[0] : chapter[0] - 1;
        let ecolog_unlockId = Cfg.UnlockSystem.get(GameFunID.Ecological).unlockLevel;
        let tech_unlockId = Cfg.UnlockSystem.get(GameFunID.Technology).unlockLevel;
        if (chapterId >= ecolog_unlockId) {
            this.btnEcological.getChildByName("Background").getChildByName("icon_gray").active = false;
        }
        if (chapterId >= tech_unlockId) {
            this.btnTech.getChildByName("Background").getChildByName("icon_gray").active = false;
        }
    }

    public checkChapterInfo() {
        let this1 = this;
        let call = (lv) => {
            this1._start = true;
            let chapterinfo = Util.levelToChapterId(lv);

            SceneManager.getInstance().changeToGameScene(() => {
                Notifier.send(ListenID.Scene_StartLoadMap, chapterinfo[0]);
                this1._start = false;
                this1.onClose();
            }, () => {
                Notifier.send(ListenID.Fight_Start, 0, lv);
                if (lv < GameVoManager.getInstance.myUserVo.topLevel)
                    Notifier.send(ListenID.Log_Event, { event_name: "level_redoChallenge", counter: 1 });
            })
        }
        GameVoManager.getInstance.stateVo.chapterInfo = null;
        let a = Manager.storage.getObject<any>(Const.STORAGE_CHAPTER_INFO, {});
        if (a && a.topLevel) {
            AlertManager.showAlert(AlertType.SELECT, {
                reasonDesc: `上次挑战未完成`,
                wayDesc: "是否继续挑战？",
                confirmText: "继续战斗",
                cancelText: "放弃",
                confirm: () => {
                    GameVoManager.getInstance.stateVo.chapterInfo = a;
                    call(a.topLevel);
                },
                cancel: () => {
                    Manager.storage.delete(Const.STORAGE_CHAPTER_INFO);
                }
            })
        }
    }

    public checkoutPayInfo() {

    }

    @property(cc.Label)
    private nickName: cc.Label = null;

    public setPersonInfo() {
        let roleVO = GameVoManager.getInstance.myUserVo;
        this.nickName.string = Util.normalName(roleVO.nickName, 3);
        let btnInfo = cc.find(`btnInfo`, this.node);
        if (btnInfo) {
            let prog = cc.find(`expProgressBar`, btnInfo);
            let bar = cc.find(`bar`, prog);
            let lblLevel = cc.find(`imgPro6/lblLevel`, prog);
            let curLv = roleVO.roleLv;
            let curExp = roleVO.curExp;
            let nextLvCfg = Cfg.RoleLevel.get(curLv + 1);
            let max = nextLvCfg ? nextLvCfg.exp : 1;
            max = max == 0 ? 1 : max;
            bar.getComponent(cc.Sprite).fillRange = curExp / max;
            lblLevel.getComponent(cc.Label).string = curLv + ``;
        }
    }

    onRoleExpGet() {
        console.log("====onRoleExpGet=======")
        this.setPersonInfo();
    }

    /** UI打开列表，一个个有顺序的打开 */
    public openList: Function[] = [];
    public initOpenList() {
        /** 打开功能解锁 优先级：1 */
        this.openList.push(this.rigisterFunUnlockTipsCheck.bind(this));
        this.openList.push(this.checkUnlockChapter.bind(this));
        this.openList.push(this.rigisterGuideCheck.bind(this));
        // if (GameVoManager.getInstance.stateVo.isUpdateReward > 0) {
        //     this.openList.push(() => {
        //         UIManager.Open(Common_UIPath.UpdateRewardView, MVC.eTransition.Default, MVC.eUILayer.Tips);
        //     });
        // }

        // /** 打开计时金币 优先级：2 */
        // let isshow = Notifier.call(CallID.Offline_CanShow);
        // if (isshow > 0) {
        //     this.openList.push(() => {
        //         UIManager.Open(Common_UIPath.TimeGold, MVC.eTransition.Default, MVC.eUILayer.Tips);
        //     });
        // }

        /** 打开主界面转盘 优先级：3 */
        // if (GameVoManager.getInstance.myUserVo.topLevel == 1 && !GameVoManager.getInstance.myUserVo.showMainDraw) {
        //     this.openList.push(() => {
        //         Manager.audio.playAudio(501);
        //         UIManager.Open(Common_UIPath.MainDrawUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, null, false, 3);
        //         Notifier.send(ListenID.Log_Event, { event_name: "home_draw" });
        //     });
        //     GameVoManager.getInstance.myUserVo.showMainDraw = true;
        // }
        // /** 打开签到 优先级：4 */
        // if (GameVoManager.getInstance.stateVo.startCount == 0 && GameVoManager.getInstance.myUserVo.topLevel >= Cfg.UnlockSystem.get(GameFunID.Sign).unlockLevel && GameVoManager.getInstance.gameSwitchVo.sign) {
        //     let date = new Date(Time.serverTimeMs);
        //     if (date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay) {
        //         this.openList.push(() => {
        //             Notifier.send(ListenID.MoreGold_Open);
        //         })
        //         GameVoManager.getInstance.stateVo.startCount++;
        //     }
        // }

        /** 打开BOSS战 优先级：5 */
        // let boss_open = Manager.storage.getBool("boss_open");
        // let bossFunIsOpen = Cfg.UnlockSystem.get(GameFunID.Boss).unlockLevel == GameVoManager.getInstance.myUserVo.topLevel;
        // if (!boss_open && bossFunIsOpen) {
        //     this.openList.push(() => {
        //         Notifier.send(ListenID.ShowBossRank);
        //     });
        //     Manager.storage.setBool("boss_open", true);
        // }
    }

    checkUnlockChapter() {
        if (GameVoManager.getInstance.myUserVo.showUnlockChapter) {
            let id = GameVoManager.getInstance.myUserVo.showUnlockChapter;
            Notifier.send(ListenID.Fight_OpenUnLockChapterView, id);
            GameVoManager.getInstance.myUserVo.showUnlockChapter = 0;
        } else {
            Notifier.send(ListenID.Game_OpenUIList);
        }
    }
    public openUIList() {
        let cb = this.openList.shift();
        cb && cb();
    }

    public onSignOpen() {
        // if (GameVoManager.getInstance.stateVo.startCount == 0 && GameVoManager.getInstance.myUserVo.topLevel >= 3 && GameVoManager.getInstance.gameSwitchVo.sign) {
        //     let date = new Date(Time.serverTimeMs);
        //     if (date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay) {
        //         Notifier.send(ListenID.MoreGold_Open);
        //         GameVoManager.getInstance.stateVo.startCount++;
        //     }
        // }
    }

    public onBtnSignClick() {
        Manager.audio.playAudio(501, AudioType.UI);
        Notifier.send(ListenID.MoreGold_Open);
    }

    /** 功能解锁检查 */
    public rigisterFunUnlockTipsCheck() {
        let generateTipsData = (funID: number, node: cc.Node, type: number, value: number): FunUnlockTipsData => {
            return {
                funID: funID,
                node: node,
                unlockType: type,
                value: value,
            }
        }
        // let btnRank = this.getBtnRank();
        // btnRank.active = FunOpen.getInstance().getFunIsOpen(Common_UIPath.RankUI);
        this.btnRewardTask.active = FunOpen.getInstance().getFunIsOpen(Common_UIPath.RewardTaskView);

        /** 转盘解锁检测 */
        let btnMainDraw = this.getBtnDrawNode();
        let funIsOpen = FunOpen.getInstance().getFunIsOpen("MainDraw");
        let drawTipsData = generateTipsData(GameFunID.MainDraw, btnMainDraw, Cfg.UnlockSystem.get(GameFunID.MainDraw).unlockType, Cfg.UnlockSystem.get(GameFunID.MainDraw).unlockLevel);
        Notifier.send(ListenID.Rigister_FunUnlock, drawTipsData);
        btnMainDraw.active = funIsOpen;
        // if (FunUnlockTipsController.getInstance().isUnlocking) return;
        /** 强化解锁检测 */
        let btnEquip = this.getBtnEquipIconNode();
        let equipUpgradeFunID = GameFunID.EquipUpgrade;
        let equipUpgradeTipsData = generateTipsData(equipUpgradeFunID, btnEquip, Cfg.UnlockSystem.get(equipUpgradeFunID).unlockType, Cfg.UnlockSystem.get(equipUpgradeFunID).unlockLevel);
        Notifier.send(ListenID.Rigister_FunUnlock, equipUpgradeTipsData);

        // if (FunUnlockTipsController.getInstance().isUnlocking) return;
        /** 熔炼解锁检测 */
        let equipSmeltFunID = GameFunID.EquipSmelt;
        let equipSmeltTipsData = generateTipsData(equipSmeltFunID, btnEquip, Cfg.UnlockSystem.get(equipSmeltFunID).unlockType, Cfg.UnlockSystem.get(equipSmeltFunID).unlockLevel);
        Notifier.send(ListenID.Rigister_FunUnlock, equipSmeltTipsData);

        // if (FunUnlockTipsController.getInstance().isUnlocking) return;
        /**悬赏解锁检测 */
        let rewardTaskFunID = GameFunID.RewardTask;
        let rewardTaskTipsData = generateTipsData(rewardTaskFunID, this.btnRewardTask, Cfg.UnlockSystem.get(rewardTaskFunID).unlockType, Cfg.UnlockSystem.get(rewardTaskFunID).unlockLevel);
        Notifier.send(ListenID.Rigister_FunUnlock, rewardTaskTipsData);

        // if (FunUnlockTipsController.getInstance().isUnlocking) return;
        /** boss战解锁检测 */
        let btnBoss = this.getBtnBoss();
        let bossFunID = GameFunID.Boss;
        let bossTipsData = generateTipsData(bossFunID, btnBoss, Cfg.UnlockSystem.get(bossFunID).unlockType, Cfg.UnlockSystem.get(bossFunID).unlockLevel);
        Notifier.send(ListenID.Rigister_FunUnlock, bossTipsData);

        // if (FunUnlockTipsController.getInstance().isUnlocking) return;
        /**排行榜解锁检测 */
        // let rankTipsData = generateTipsData(GameFunID.Rank, btnRank, Cfg.UnlockSystem.get(GameFunID.Rank).unlockType, Cfg.UnlockSystem.get(GameFunID.Rank).unlockLevel);
        // Notifier.send(ListenID.Rigister_FunUnlock, rankTipsData);

        // if (FunUnlockTipsController.getInstance().isUnlocking) return;
        /** 生态研究解锁检测 */
        // let ecologicalFunID = GameFunID.Ecological;
        // let ecologicalTipsData = generateTipsData(ecologicalFunID, this.btnEcological, Cfg.UnlockSystem.get(ecologicalFunID).unlockType, Cfg.UnlockSystem.get(ecologicalFunID).unlockLevel);
        // Notifier.send(ListenID.Rigister_FunUnlock, ecologicalTipsData);

        // let techFunID = GameFunID.Technology;
        // let techFunIDTipsData = generateTipsData(techFunID, cc.find(`btnTechnology`, this.node), Cfg.UnlockSystem.get(techFunID).unlockType, Cfg.UnlockSystem.get(techFunID).unlockLevel);
        // Notifier.send(ListenID.Rigister_FunUnlock, techFunIDTipsData);

        /** 这句保证最后执行 */
        setTimeout(() => {
            if (!FunUnlockTipsController.getInstance().isUnlocking) {
                Notifier.send(ListenID.Game_OpenUIList);
            }
        }, 200);
    }

    /** 注册新手引导按钮 */
    public rigisterGuideCheck() {
        let btnEquip = this.getBtnEquipIconNode();
        for (let i = 0; i < 6; ++i) {
            let guideData: Guide.GuideItemData = {
                node: btnEquip,
                tag: 10000 + (i + 1) * 100,
                tagLayer: this.uiLayer,
                callBack: () => {
                    this.onOpenEquipView();
                }
            }
            Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);
        }

        // btnEquip = this.getBtnEquipIconNode();
        // let guideData: Guide.GuideItemData = {
        //     node: btnEquip,
        //     tag: 10101,
        //     tagLayer: this.uiLayer,
        //     callBack: () => {
        //         this.onOpenEquipView();
        //     }
        // }
        // Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);

        /** 开始按钮 */
        let startData: Guide.GuideItemData = {
            node: this.btnStart.node,
            tag: 10001,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onStartGame();
                Notifier.send(ListenID.Close_Guide);
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, startData);

        /** 生态系统 */
        let ecolGuideData: Guide.GuideItemData = {
            node: cc.find(`btnEcological`, this.node),
            tag: 11001,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onOpenEological();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, ecolGuideData);

        /** 科技系统 */
        let techGuideData: Guide.GuideItemData = {
            node: cc.find(`btnTechnology`, this.node),
            tag: 11501,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onOpenTechnologyView();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, techGuideData);

        Notifier.send(ListenID.Guide_Check_Condition);
    }

    public getBtnDrawNode() {
        return cc.find("btnDraw", this.node);
    }

    public getBtnRank() {
        // return this.btnRank;
    }

    public getBtnEquipIconNode() {
        return cc.find("bottom/btnEquip/Background/guide", this.node);
    }

    public getBtnBoss() {
        return cc.find("btnBoss", this.node);
    }

    public chapterName: cc.Sprite;
    public fightTipsNode: cc.Node;
    public lockStage: cc.Node;
    public guideleft: cc.Node;
    public guideright: cc.Node;
    public highequip: cc.Node;
    public initNode() {
        this.chapterName = this.chapterNode.getChildByName("chapName").getComponent(cc.Sprite);
        this.fightTipsNode = this.levelbgList[0].node.parent.getChildByName("tips");
        this.lockStage = this.chapterNode.getChildByName("lock");
        this.guideright = this.bottom.getChildByName("guideright");
        this.guideleft = this.bottom.getChildByName("guideleft");
        this.touchmove = this.bottom.getChildByName("touchmove");
        let btnDraw = cc.find("btnDraw", this.node);
        this.highequip = btnDraw.getChildByName("highequip");
    }

    public updateHighEquipVisible() {
        this.highequip.active = !GameVoManager.getInstance.myUserVo.isGetMainDraw;
    }

    public testMapNode() {
        let vec = cc.v2(0, 1195);
        for (let i = 0; i < 6; i++) {
            let a = vec.rotate(Util.AngleToRadinas(i * 30));
            console.log('i=', a);
        }
    }

    public registerTouch() {
        this.touchmove.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.touchmove.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    public startx: number = 0;
    public touchCount: number = 0;
    public touchStart(event: cc.Event.EventTouch) {
        if (!this.touchCount) {
            this.touchCount = 1;
            this.startx = event.getLocationX();
        }
    }

    public touchEnd(event: cc.Event.EventTouch) {
        if (this.touchCount == 1) {
            let x = event.getLocationX();
            let dis = this.startx - x;
            if (dis > 70 || dis < -70) {
                this.onClickMapGuide(null, dis > 0 ? 2 : 1);
            }
            this.touchCount = 0;
        }
    }

    private bg: cc.Node = null;
    public fixUI() {
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.cheatNode = this.node.getChildByName("chest");
        this.bg = this.node.getChildByName("bg");
        if (this.bg) {
            Util.resizeNode(this.bg);
        }
        if (this.cheatNode) {
            this.cheatNode.active = false;
        }
        this.bottom.y = -size.height * 0.5;
    }

    // 红点提示注册
    rigisterRemind() {
        MenuController.getInstance().rigisterRemind({
            name: "MenuDraw",
            node: this.btnInvite,
            checkFunc: () => {
                return Const.MainDrawTimes - GameVoManager.getInstance.myUserVo.mainDrawTimes;
            }
        });
        MenuController.getInstance().rigisterRemind({
            name: "btnEquip",
            node: cc.find("bottom/btnEquip/Background/icon", this.node),
            hideNum: true,
            type: 1,
            checkFunc: () => {
                let bool = EquipModel.getInstance.getEquipRemind();
                return Number(bool);
            }
        });
        MenuController.getInstance().rigisterRemind({
            name: "btnShop",
            node: cc.find("bottom/btnBox/Background/icon", this.node),
            hideNum: true,
            type: 1,
            checkFunc: () => {
                let bool = false;
                for (let i = 1; i <= 2; ++i) {
                    bool = bool || (BoxModel.getInstance.getBoxState(i) == 1);
                }
                return Number(bool);
            }
        });
        MenuController.getInstance().rigisterRemind({
            name: "btnRewardTask",
            node: this.btnRewardTask,
            hideNum: true,
            type: 2,
            checkFunc: () => {
                let num = Notifier.call(CallID.RewardTask_GetAllNumberReward);
                return [!GameVoManager.getInstance.myUserVo.openDailyView, num];
            },
        });
        MenuController.getInstance().rigisterRemind({
            name: "btnEcological",
            node: this.btnEcological,
            checkFunc: () => {
                return Notifier.call(CallID.Get_EcologicalPoint);
            },
        });
        MenuController.getInstance().rigisterRemind({
            name: "btnTechnology",
            node: cc.find("btnTechnology", this.node),
            offsetY: 10,
            checkFunc: () => {
                let techModel = TechnologyModel.getInstance();
                let num = 0;
                // if (!techModel.notFirstOpenView){
                num = techModel.canUpgradeNum;
                // }
                return num;
            },
        });
    }

    private _checkFunOpenByPlatform() {
        // let data = {
        //     wx: [this.btnCollect, this.btnRank]
        //     // wx: [this.btnRank, this.btnWelfare, this.btnInvite, this.btnCustomService, this.btnCollect]
        // }
        // FunOpen.getInstance().showBtnArrayByPlatform(data);

        let isIos = false;
        console.log(`***** is ios: ${isIos} *****`);
        if (isIos) {
            UIManager.Open(Common_UIPath.MenuIOSBtnView, MVC.eTransition.Default, MVC.eUILayer.Panel);
        }
        Notifier.send(ListenID.Menu_Open, true);
    }

    /**检测会员枪是否过期 */
    public checkGunInfo() {
        let data = Cfg.Weapon.get(GameVoManager.getInstance.myUserVo.defaultGunId);
        if (data && data.unlockWay[0] == 8 && !GameVoManager.getInstance.getIsMember()) {
            GameVoManager.getInstance.myUserVo.defaultGunId = Const.DefaultGunId;
        }
    }

    public getOffset(): number {
        let systemSize = wx.getSystemInfoSync();
        let designAspect = 720 / 1280;
        let designHeight = systemSize.windowWidth / designAspect;
        //高度黑边
        let offset = (systemSize.windowHeight - designHeight) * 0.5;
        return offset
    }

    public selectChapterId: number = 1;
    public selectStageIndex: number = 0;
    public chapterInfo: any = null;
    public initLevelProg() {
        let chapterInfo = MenuModel.getInstance.getCurChapterInfo();
        this.chapterInfo = chapterInfo;
        this.mapNode.rotation = angle * (this.chapterAllNum - chapterInfo.chapterId);
        this.selectChapterId = chapterInfo.chapterId;
        Manager.spAtlas.getChapterName(this.selectChapterId).then(res => {
            this.chapterName && (this.chapterName.spriteFrame = res);
        });
        this.levelText.string = `${chapterInfo.passStage}/${chapterInfo.chapterNum}`;
        this.lockStage.active = false;
        this.updateStage(chapterInfo);
        this.updateMapNodeState(chapterInfo.chapterId);
        this.updateMapGuide();
    }

    public updateChapterState(id: number) {
        let chapterInfo = MenuModel.getInstance.getChapterInfoById(id);
        this.chapterInfo = chapterInfo;
        // this.selectChapterId = chapterInfo.chapterId;
        Manager.spAtlas.getChapterName(this.selectChapterId).then(res => {
            this.chapterName && (this.chapterName.spriteFrame = res);
        });
        this.levelText.string = `${chapterInfo.passStage}/${chapterInfo.chapterNum}`;
        this.lockStage.active = !chapterInfo.unLock;
        this.levelbgList[0].node.parent.active = false;
        this.updateStage(chapterInfo);
        this.updateMapGuide();
    }
    public updateStage(chapterInfo) {
        // let levellen = this.levelTextList.length;
        // this.selectStageIndex = -1;
        // for (let i = 0; i < levellen; i++) {
        //     this.levelTextList[i].string = `${chapterInfo.startStage + i}`;
        //     this.levelbgList[i].spriteFrame = chapterInfo.startStage + i <= chapterInfo.passStage ? this.passSp : this.nopassSp;
        //     if (chapterInfo.startStage + i == chapterInfo.passStage + 1) {
        //         this.selectStageIndex = i;
        //         this.levelTextList[i].node.y = 10;
        //         this.levelbgList[i].node.y = 10;
        //     } else {
        //         this.levelTextList[i].node.y = 0;
        //         this.levelbgList[i].node.y = 0;
        //     }
        // }
        // if (this.selectStageIndex == -1) {
        //     this.selectStageIndex = levellen - 1;
        //     this.levelTextList[this.selectStageIndex].node.y = 10;
        //     this.levelbgList[this.selectStageIndex].node.y = 10;
        // }
        // this.fightTipsNode.x = this.levelbgList[this.selectStageIndex].node.x;
    }

    public updateMapGuide() {

        this.guideright.active = this.selectChapterId < Cfg.Chapter.filter({}).length;;
        this.guideleft.active = this.selectChapterId > 1;
    }

    public updateMapNodeState(id) {
        let len = this.mapNode.childrenCount;
        for (let i = 0; i < len; i++) {
            // let btndrop = this.mapNode.children[i].getChildByName("btnDrop");
            let lock = this.mapNode.children[i].getChildByName("Lock");
            // btndrop.active = i + 1 <= id;
            lock.active = i + 1 > id;
            this.mapNode.children[i].color = lock.active ? cc.Color.BLACK.fromHEX("#7D7D7D") : cc.Color.WHITE;
        }
    }

    public btnHideOrShow() {
        // this.btnInviteWeapon.active = GameVoManager.getInstance.myUserVo.topLevel >= 5 ? true : false;
        this.btnInviteWeapon.active = false;
        if (this.btnInviteWeapon.active) {
            this.btnInviteWeapon.getComponent(cc.Animation).play();
        }
        let btnBoss = this.getBtnBoss();
        btnBoss.active = FunOpen.getInstance().getFunIsOpen(`Boss`);
        let btnBossBG = cc.find(`imgboss1`, this.node);
        let btnBossBG1 = cc.find(`imgboss`, this.node);
        btnBossBG.active = btnBoss.active;
        btnBossBG1.active = btnBoss.active;

        // if (GameVoManager.getInstance.myUserVo.topLevel == 1 && !GameVoManager.getInstance.myUserVo.showMainDraw) {
        //     this.onOpenDrawView();
        //     GameVoManager.getInstance.myUserVo.showMainDraw = true;
        // }
    }

    //上报排行榜分数
    public postGameScore() {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        if (this._isClosed) return;
        super.onClose();
        UIRoleManager.recycleUIRole(this.uiRole);
        try {
            this.powerAnimation.off("finished", this.onPowerFinish, this);
        } catch (error) {
            console.error(error);
        }

        UIManager.Close(Common_UIPath.MenuIOSBtnView);
        this.unscheduleAllCallbacks();
        Notifier.send(ListenID.Menu_Open, false);
        Notifier.send(ListenID.On_Close_Menu);
    }

    public onStartGame() {
        if (GameVoManager.getInstance.myUserVo.showunLockBoss) return;
        if (!this.chapterInfo.unLock) {
            AlertManager.showNormalTips("请通关上一个章节解锁章节");
            return;
        }
        if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
            AlertManager.showAlert(AlertType.SELECT, {
                reasonDesc: `体力不足，无法挑战`,
                wayDesc: "是否前往购买体力？",
                confirmText: "是",
                cancelText: "否",
                confirm: () => {
                    this.onOpenBoxView();
                    this.onClose();
                },
            })
            return;
        }
        if (this._start || this.scrolling) return;
        let a = function () {
            GameVoManager.getInstance.setPower(5, 3);
            Manager.audio.playAudio(501, AudioType.UI);
            this.powerAnimation.play("playerPower");
            this._start = true;
            Notifier.send(ListenID.HideBanner);
            Notifier.send(ListenID.Log_Event, { event_name: "home_start" });
            if (GameVoManager.getInstance.myUserVo.isFirstStart) {
                GameVoManager.getInstance.myUserVo.isFirstStart = false;
                GameVoManager.getInstance.saveData();
                Notifier.send(ListenID.Log_Event, { event_name: "first_home_start" });
            }
            if (isSelectLevel) {
                Notifier.send(ListenID.Log_Event, { event_name: "level_select_challenge" });
                isSelectLevel = false;
            }
        }.bind(this);
        let num = Notifier.call(CallID.Equip_GetEquipBagNum);
        if (num >= 100) {
            AlertManager.showAlert(AlertType.SELECT, {
                reasonDesc: `背包中装备数量已满100个`,
                wayDesc: "是否前往熔炼装备获取金币？",
                confirmText: "熔炼装备",
                cancelText: "否",
                confirm: () => {
                    this.onClose();
                    Notifier.send(ListenID.Equip_OpenEquipSmeltView);
                },
                cancel: () => {
                    a();
                }
            })
        } else {
            a();
        }

        // HD_MODULE.getPlatform().postEvent("home_game_start", "playerID", HDDefaultUserInfo.open_id);
    }

    public closeFreeWeapon(args: number = 0) {
        if (args == 0) {
            AlertManager.showNormalTips(`恭喜你获得试用武器！`);
        }
        GameVoManager.getInstance.setPower(5, 3);
        Manager.audio.playAudio(501, AudioType.UI);
        this.powerAnimation.play("playerPower");
        this._start = true;
        Notifier.send(ListenID.HideBanner);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'home_start', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "home_start" });
    }

    public onPowerFinish() {
        let this1 = this;
        let data = Cfg.Chapter.get(this.selectChapterId);
        let lv = data.startLevel + 1;
        SceneManager.getInstance().changeToGameScene(() => {
            Notifier.send(ListenID.Scene_StartLoadMap, this.selectChapterId);
            this1._start = false;
            this1.onClose();
        }, () => {
            Notifier.send(ListenID.Fight_Start, 0, lv);
            if (lv < GameVoManager.getInstance.myUserVo.topLevel)
                Notifier.send(ListenID.Log_Event, { event_name: "level_redoChallenge", counter: 1 });
        })
        // Notifier.send(ListenID.Fight_Start, 0);
    }

    public onOpenDrawView() {
        if (this._start) return;
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Open(Common_UIPath.MainDrawUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, null, false, 3);
        Notifier.send(ListenID.Log_Event, { event_name: "home_draw" });
    }

    public onOpenSettingView() {
        // Notifier.send(ListenID.Setting_Open);
        UIManager.Open(Common_UIPath.SettingView_IOS, MVC.eTransition.Scale);
        Manager.audio.playAudio(501, AudioType.UI)
    }

    public onOpenShop() {
        // HD_MODULE.getNet().postGameEvent({ event_name: 'home_shop', counter: 1 });
        if (this._start) return;
        Notifier.send(ListenID.Log_Event, { event_name: "gunPage_access" });
        Notifier.send(ListenID.Shop_Open, 1);
        Manager.audio.playAudio(501, AudioType.UI);
    }

    public onOpenEological() {
        Manager.audio.playAudio(501, AudioType.UI);
        let chapter = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let chapterId = (chapter[1] == chapter[2]) ? chapter[0] : chapter[0] - 1;
        let unlockId = Cfg.UnlockSystem.get(GameFunID.Ecological).unlockLevel;
        if (chapterId < unlockId) {
            AlertManager.showNormalTips(`通过第${unlockId}章解锁`);
            return
        }
        if (this._start) return;
        Notifier.send(ListenID.Log_Event, { event_name: "ecological_access" });
        Notifier.send(ListenID.Open_EcologicalView);
    }

    public onOpenPersonInfo() {
        if (this._start) return;
        Notifier.send(ListenID.Person_OpenView);
        Manager.audio.playAudio(501, AudioType.UI);
    }

    public onAddGold() {
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Open(Common_UIPath.ExchangeDiamondUI);
    }

    public onExchangePower() {
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Open(Common_UIPath.ExchangePowerUI);
    }

    public onOpenMoreGold(target, customdata: number) {
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Scale, MVC.eUILayer.Popup, customdata, null, 1);
        Notifier.send(ListenID.Log_Event, { event_name: "home_moregold" });
    }

    public onOpenCollect(target, customdata: number) {
        Manager.audio.playAudio(501, AudioType.UI);
        let isIos = false;
        if (isIos) {
            UIManager.Open(Common_UIPath.MemberUI, MVC.eTransition.Scale, MVC.eUILayer.Popup);
        } else {
            if (GameVoManager.getInstance.myUserVo.collectReward) {
                // if (this.getDiamondIcon.active) {
                //     this.getDiamondIcon.active = false;
                // }
                UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
            } else {
                let i = 1;

                UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, i);
            }
        }
    }

    public onOpenService() {
        if (this._start) return;
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Open(Common_UIPath.InviteAndServiceUI, MVC.eTransition.Default, MVC.eUILayer.Tips, 0);
        // UIManager.Open(Common_UIPath.GetExtraReward);
    }

    public openCheat() {
        UIManager.Open(Common_UIPath.CheatUI);
    }

    public openInviteWeapon() {
        Manager.audio.playAudio(501);
        if (this._start) return;
        UIManager.Open(Common_UIPath.InviteWeaponUI, MVC.eTransition.Default, MVC.eUILayer.Tips);
    }

    public onOpenRank() {
        // HD_MODULE.getNet().postGameEvent({ event_name: 'rank', counter: 1 });
        Manager.audio.playAudio(501);
        if (this._start) return;
        Notifier.send(ListenID.Log_Event, { event_name: "rankPage_access" });

        Notifier.send(ListenID.Rank_showRank);
        this.onClose();

    }

    public onOpenRewardTask() {
        Manager.audio.playAudio(501);
        if (this._start) return;
        Notifier.send(ListenID.Log_Event, { event_name: "taskPage_access" });
        Notifier.send(ListenID.RewardTask_OpenMainView);
    }

    public onOpenBoss() {
        Manager.audio.playAudio(501);
        if (this._start) return;
        if (GameVoManager.getInstance.myUserVo.topLevel >= 15) {
            Notifier.send(ListenID.ShowBossRank);
            this.onClose();
            // UIManager.Open(Common_UIPath.BossRankUI);
        } else {
            AlertManager.showNormalTips("头目战需通关第15关后解锁!");
        }
    }

    public setBossBtnState() {
        let node = this.node;//.getChildByName("bossNode");
        let bossbtn = node.getChildByName('btnBoss');
        let fire = bossbtn.getChildByName('fire');
        let imgboss: cc.Node = node.getChildByName('imgboss');
        let anim: cc.Animation = node.getChildByName('actionnode').getComponent(cc.Animation);
        // let btnBoss: cc.Node = this.node.getChildByName('btnBoss');
        let imgbossBG: cc.Node = cc.find('imgboss1', node);
        let wtz = bossbtn.getChildByName('wtz');
        let ytz = bossbtn.getChildByName('ytz');
        let wjs = bossbtn.getChildByName('lblUnlock');
        let boo = GameVoManager.getInstance.myUserVo.topLevel >= 15;
        wjs.getComponent(cc.Label).string = (15 - GameVoManager.getInstance.myUserVo.topLevel) + "关后解锁";
        wjs.active = !boo;
        fire.active = boo;
        imgboss.getComponent(cc.Sprite).setState(boo ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
        imgbossBG.getComponent(cc.Sprite).setState(boo ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
        // imgbossBG.getComponent(cc.Button).enabled = boo;
        // imgbossBG.getComponent(cc.Sprite).setState(boo ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
        wtz.active = boo && !GameVoManager.getInstance.myUserVo.isChallenge;
        ytz.active = boo && !!GameVoManager.getInstance.myUserVo.isChallenge;
        if (GameVoManager.getInstance.myUserVo.showunLockBoss) {
            imgboss.active = false;
            fire.active = false;
            anim.play();
            setTimeout(() => {
                imgboss.active = true;
                fire.active = boo;
                GameVoManager.getInstance.myUserVo.showunLockBoss = false;
            }, 600)
        } else {
            anim.node.active = false;
            fire.active = boo;
        }
    }

    public goldEffectShow(type?: number) {
        if (type == 1) {                          //飞金币
            Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(-317, 594), 0.1, 0, 1);
        } else if (type == 2) {                    //飞钻石
            Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(0, 594), 0.1, 0, 2);
        } else {
            Util.showGoldEffect(this.node, 10, cc.v2(-283, -12), cc.v2(-317, 594), 0.1, 0, 1);
            // let goldFormat = Util.goldFormat(GameVoManager.getInstance.myUserVo.goldRewardNum);
            // this.rewardNum.string = goldFormat;
        }
    }

    public inviteList() {
        GameVoManager.getInstance.myUserVo.inviteCount = 3;
        let count = 3;
        if (count >= 3) {
            if (!GameVoManager.getInstance.myUserVo.weaponList[103]) {
                UIManager.Open(Common_UIPath.RewardUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, Cfg.Weapon.get(103));
                GameVoManager.getInstance.myUserVo.weaponList[103] = [0, 0, 0];
                GameVoManager.getInstance.saveData();
                Notifier.send(ListenID.Shop_UnLock, [], [103]);
                this.btnInviteWeapon.active = false;
            }
        }
    }

    public initWeaponLockNode() {
    }

    public showYouZiDsp() {
    }
    // 补发签到（超过7天没领道具）
    // public reissueSignReward() {
    //     if (GameVoManager.getInstance.myUserVo.signDay > 7) {
    //         if (!GameVoManager.getInstance.myUserVo.dropList[3001]) {
    //             GameVoManager.getInstance.myUserVo.dropList[3001] = 1;
    //         }
    //         if (!GameVoManager.getInstance.myUserVo.dropList[4003]) {
    //             GameVoManager.getInstance.myUserVo.dropList[4003] = 1;
    //         }
    //         if (!GameVoManager.getInstance.myUserVo.weaponList[117]) {
    //             GameVoManager.getInstance.myUserVo.weaponList[117] = [0, 0, 0];
    //         }
    //     }
    // }

    // 新手指引是否完成
    public guideCompelete(): boolean {
        return true
    }

    update(dt) {
        // if (this.scrolling) {
        //     this.mapNode.rotation = Math.lerp(this.mapNode.rotation, this.targetRotation, dt + 0.2);
        // }
    }

    onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                // this._updateDiamondElement();
                this._checkFunOpenByPlatform();
                // this.updateRemind();
                this.updateWeaponBubble();
                // this.checkSwitch();
                break;
            }
            case `drawRemind`: this.updateDrawRemind(); break;
            case `shopRemind`: this.updateShopRemind(); break;
            case `welfareRemind`: this.updateWelfareRemind(); break;
        }
    }

    private _updateDiamondElement() {
        let btnAdd = cc.find("diamondBg/btnAddDiamond", this.node);
        if (btnAdd) {
            let funIsOpen = true;
            btnAdd.active = funIsOpen;
        }
    }

    //红点提示刷新
    updateDrawRemind() {
        let find = cc.find;
        let btnDraw = find("btnDraw", this.node);
        // cc.log("***** remindDraw *****", GameVoManager.getInstance.myUserVo.mainDrawTimes);
        if (btnDraw) {
            let imgDrawRemind = cc.find("Background/remind", btnDraw);
            imgDrawRemind.active = GameVoManager.getInstance.myUserVo.mainDrawTimes < Const.MainDrawTimes;
        }
    }

    //商店红点
    updateShopRemind(active?: number) {
        // let find = cc.find;
        // let btnShop = find("btnShop", this.node);
        // // cc.log("***** remindShop *****", GameVoManager.getInstance.myUserVo.mainDrawTimes);
        // if(btnShop){
        //     let imgShopRemind = cc.find("Background/remind", btnShop);
        //     cc.log("***** remindShop *****", imgShopRemind);
        //     imgShopRemind.active = GameVoManager.getInstance.myUserVo.unlockNewWeapon;
        //     // if(active != und)
        //     imgShopRemind.active = active == -1 ? false : imgShopRemind.active;
        // }
    }

    updateWelfareRemind() {
        // let date = new Date(Time.serverTimeMs);
        // let canReward = date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay;
        // let imgShopRemind = cc.find("Background/remind", this.btnWelfare);
        // imgShopRemind.active = canReward;
    }

    checkSwitch() {
        // let switchData = Cfg.Switch.getAll();
        // let btnDraw = this.node.getChildByName("btnDraw");
        // btnDraw.active = switchData[2].value != 0;
    }

    updateWeaponBubble() {
        // let isShow = GameVoManager.getInstance.myUserVo.weaponVideoCount < 5;
        let isShow = false;
        this.btnInviteWeapon.active = isShow;
    }

    onClickStage(event, custom_data) {
        if (this.scrolling) return;
        let num = Number(custom_data);
        if (this.chapterInfo.passStage + 1 < this.chapterInfo.startStage + num) {
            return;
        } else {
            this.levelTextList[this.selectStageIndex].node.y = 0;
            this.levelbgList[this.selectStageIndex].node.y = 0;
            this.selectStageIndex = num;
            this.levelTextList[this.selectStageIndex].node.y = 10;
            this.levelbgList[this.selectStageIndex].node.y = 10;
            this.fightTipsNode.x = this.levelbgList[this.selectStageIndex].node.x;
            Notifier.send(ListenID.Log_Event, { event_name: "level_select" });
            isSelectLevel = true;
        }
    }

    onClickDoprItem(event, custom_data) {
        if (this._start) return;
        let num = Number(custom_data);
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Equip_OpenDropPreView, num);
        Notifier.send(ListenID.Log_Event, { event_name: "chapter" + num + "_equipPreview" });
    }

    public scrolling: boolean = false;
    public tempSelectChapid: number = 0;
    public targetRotation: number = 0;
    onClickMapGuide(event, custom_data) {
        let num = Number(custom_data);
        if (this.scrolling || this._start) return;
        let dir = num == 1 ? -1 : 1;
        let chapid = cc.misc.clampf(this.selectChapterId + dir, 1, this.chapterAllNum);
        if (chapid == this.selectChapterId) return;
        this.tempSelectChapid = chapid;
        this.startScrollMap();
    }

    startScrollMap() {
        this.targetRotation = angle * (this.chapterAllNum - this.tempSelectChapid);
        this.scrolling = true;
        let action = cc.sequence(cc.rotateTo(0.6, this.targetRotation).easing(cc.easeBackOut()), cc.callFunc(() => {
            this.scrolling = false;
            this.selectChapterId = this.tempSelectChapid;
            this.updateChapterState(this.selectChapterId);
        }))
        action.setTag(1);
        this.mapNode.runAction(action);
    }

    public onOpenBoxView() {
        if (this._start) return;
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Box_OpenBoxView);
        Notifier.send(ListenID.Log_Event, { event_name: "storePage_access" });
    }

    public onOpenEquipView() {
        if (this._start) return;
        // Manager.audio.playAudio(501);
        Notifier.send(ListenID.Equip_OpenEquipView);
        Notifier.send(ListenID.Log_Event, { event_name: "equipPage_access" });
        this.onClose();
    }

    public onOpenTechnologyView() {
        Manager.audio.playAudio(501);
        let chapter = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let chapterId = (chapter[1] == chapter[2]) ? chapter[0] : chapter[0] - 1;
        let unlockId = Cfg.UnlockSystem.get(GameFunID.Technology).unlockLevel;
        if (chapterId < unlockId) {
            AlertManager.showNormalTips(`通过第${unlockId}章解锁`);
            return
        }
        if (this._start) return;
        Notifier.send(ListenID.Technoloty_OpenView);
    }

    public selectChapter(chapterId) {
        if (chapterId == this.selectChapterId) return;
        this.tempSelectChapid = chapterId;
        if (this.mapNode.getActionByTag(1)) {
            this.mapNode.stopActionByTag(1);
        }
        this.startScrollMap();
    }

    public showAnnounce(str) {
        this.announceMsg.node.parent.parent.active = false;
        return;
        this.announceMsg.node.stopAllActions();
        this.announceMsg.string = "";
        this.announceMsg.string = str;
        this.announceMsg
        this.announceMsg.node.x = 191;
        this.announceMsg.node.runAction(cc.sequence(cc.moveBy(6.0, -this.announceMsg.node.width - 385, 0), cc.callFunc(() => {
            if (this.announceMsg && this.announceMsg.node.parent) this.announceMsg.node.parent.parent.active = false;
        })));
    }

    public clickAnnounce(number) {
        if (number == GameFunID.Box) {//宝箱
            this.onOpenBoxView();
        } else if (number == GameFunID.MainDraw) {//转盘
            this.onOpenDrawView();
        } else if (number == GameFunID.Boss) {//头目战
            this.onOpenBoss();
        }
    }
}
