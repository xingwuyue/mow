import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { Cfg } from "../../config/Cfg";
import { WeaponCfg } from "../../config/WeaponCfg";
import { GameVoManager } from "../../manager/GameVoManager";
import GroupItem from "./item/GroupItem";
import { AlertManager } from "../../alert/AlertManager";
import { ListenID } from "../../ListenID";
import { Manager } from "../../manager/Manager";
import DetialPanel from "../shop/item/DetialPanel";
import { Const } from "../../config/Const";
import GroupModel from "./GroupModel";
import { Util } from "../../utils/Util";
import { AudioType } from "../../manager/AudioManager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, ShareCode } from "../../common/Common_Define";
import NetAdapter from "../../adpapter/NetAdapter";
import GroupItem_IOS from "./item/GroupItem_IOS";

const { ccclass, property } = cc._decorator;



@ccclass
export default class GroupView_IOS extends MVC.BaseView {

    @property(cc.Node)
    panelNode: cc.Node = null;

    // @property(cc.Node)
    // detialPanel: cc.Node = null;

    @property(cc.Node)
    gunContent: cc.Node = null;

    @property(cc.Prefab)
    gunItem: cc.Prefab = null;

    @property(cc.Node)
    scrollView: cc.Node = null;

    @property(cc.Node)
    newWeapon: cc.Node = null;

    @property(cc.Node)
    tips_left: cc.Node = null;

    @property(cc.Node)
    tips_right: cc.Node = null;

    @property([cc.Node])
    btnList: cc.Node[] = [];

    @property([cc.Label])
    lvList: cc.Label[] = [];

    @property([cc.Node])
    nameList: cc.Node[] = [];

    @property([cc.Node])
    attList: cc.Node[] = [];

    @property([cc.Node])
    toggleList: cc.Node[] = [];

    @property(cc.Node)
    btnUpdgrade2: cc.Node = null;

    @property(cc.Node)
    limitedSpecialText: cc.Node = null;

    @property(cc.Node)
    starList: cc.Node = null;

    @property(cc.Sprite)
    weaponHotType: cc.Sprite = null;

    @property([cc.Node])
    canUpgradeArr: Array<cc.Node> = [];

    @property([cc.SpriteFrame])
    canUpgradeSpFrameArr: Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    canUpgrade: cc.Node = null;

    private gunList: cc.Node[] = [];
    private fullWeaponNode: cc.Node = null;
    private upgradeFire: cc.Node = null;
    spaceX: number = 0; // 每个物品之间的X间距
    spaceY: number = 10; // 每个物品之间的Y间距
    goodsItemWidth: number = 124; //每个物品宽度
    goodsItemHeight: number = 156;//每个物品高度
    bufferZone: number = 400;

    _curPage: number;  //当前分页 0 人物 1 武器 2 收益
    _lastPage: number;
    _showPanel: boolean = false;
    _showScroll: boolean = false;
    _gunData: WeaponCfg[];
    _guideWeapon: cc.Node = null;

    _guideStep1: boolean = false;
    _guideStep2: boolean = false;
    _guideStep4: boolean = false;
    // _guideStep5: boolean = false;
    _guideStep6: boolean = false;

    _controArrow: boolean = false;

    _preSelIndex: number = -1;
    _curSelIndex: number = -1;
    _canUpgradeIndex: number = -1;
    _isClickGroup: boolean = false;
    // newWeapon

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Group_UpdateSelected, this.onSelected, this);
        Notifier.changeListener(enable, ListenID.Shop_UnLock, this.updateGroup, this);
        Notifier.changeListener(enable, ListenID.Game_UpdateGold, this.updateGroupGold, this);
        // Notifier.changeListener(enable, ListenID.Game_UpdateDiamond, this.updateGroupGold, this);
        Notifier.changeListener(enable, ListenID.Show_WeaponUpgrade, this.showWeaponUpgrade, this);
        Notifier.changeListener(enable, ListenID.UnlockNewWeapon, this.unlockNewWeapon, this);
        Notifier.changeListener(enable, ListenID.Login_User, this._onUserLoginCallBack, this);
        Notifier.changeListener(enable, ListenID.Guide_Step1_Compelete, this.guideOneCompelete, this);
    }

    public openCallBack() {
        Notifier.send(ListenID.GroupView_Open);
        this._rigisterGuideNodeTag();
        this.updateCanUpgradeNodeByArray();
    }
    public needguideweapon: boolean = false;
    public needguidefire: boolean = false;
    public showguide: boolean = false;
    private _rigisterGuideNodeTag() {
        // ||(!Manager.storage.getNumber("guide_step_4") && userData.topLevel == 4 && userData.roleLvs[1] == 0)
        // if ((!Manager.storage.getNumber("guide_step_1") && userData.topLevel == 2 && userData.roleLvs[0] == 0)) {
        //     let btnRole = cc.find("node/toggle0", this.node);
        //     Notifier.send(ListenID.Guide_RigisterNodeTag, {
        //         node: btnRole, tag: 10001, callBack: () => {
        //             this.onClickToggle(null, "0");
        //         }
        //     });
        // }
        // ||(!Manager.storage.getNumber("guide_step_2") && userData.topLevel == 4 && userData.weaponList["105"][0] == 0)
        // if (!Manager.storage.getNumber("guide_step_5") && userData.topLevel == 5 && userData.defaultGunId == 105) {
        //     let btnWeapon = cc.find("node/toggle1", this.node);
        //     Notifier.send(ListenID.Guide_RigisterNodeTag, {
        //         node: btnWeapon, tag: 10002, callBack: () => {
        //             this.onClickToggle(null, "1");
        //         }
        //     });
        // }
        // if (!Manager.storage.getNumber("guide_step_6") && userData.topLevel == 6 && userData.goldRewardLvs[1] == 0) {
        //     let btnTime = cc.find("node/toggle2", this.node);
        //     Notifier.send(ListenID.Guide_RigisterNodeTag, {
        //         node: btnTime, tag: 10003, callBack: () => {
        //             this.onClickToggle(null, "2");
        //         }
        //     });
        // }
        let userData = GameVoManager.getInstance.myUserVo;
        if (!GameVoManager.getInstance.myUserVo.guideChangeGun && GameVoManager.getInstance.myUserVo.unlockNewWeapon > 0 && userData.defaultGunId == 105) {
            this.needguideweapon = true;
            GameVoManager.getInstance.myUserVo.guideChangeGun = 1;
            this.head.position = cc.v2(0, 250);
            this.head.active = true;
            this.head.opacity = 0;
            this.head.scale = 1;
            this.head.runAction(cc.sequence(
                cc.spawn(cc.moveTo(0.7, cc.v2(0, 47)), cc.fadeIn(1)),
                cc.callFunc(() => {
                    this.head.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.05), cc.scaleTo(0.5, 0.95))));
                })));
            this.showguide = true;
        } else {
            let showhead = false;
            if (userData.topLevel < Const.upgradeFireLevel) {
                if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeFireGold() && !this.fullWeaponNode.active) {
                    showhead = true;
                } else if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeLifeGold() && !this.fullWeaponNode.active) {
                    showhead = true;
                } else {
                }
                this.needguidefire = showhead;
                if (showhead) {
                    this.head.position = cc.v2(-50, 250);
                    this.head.active = true;
                    this.head.opacity = 0;
                    this.head.scale = 1;
                    this.head.runAction(cc.sequence(
                        cc.spawn(cc.moveTo(0.7, cc.v2(-163, 75)), cc.fadeIn(1)),
                        cc.callFunc(() => {
                            this.head.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.05), cc.scaleTo(0.5, 0.95))));
                        })));
                }
            } else {
                if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeFireGold() && !this.fullWeaponNode.active) {
                } else if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeLifeGold() && !this.fullWeaponNode.active) {
                } else {
                }
            }
        }
    }

    private _rigisterGuideNodeTag1() {
        let userData = GameVoManager.getInstance.myUserVo;
        let targetpos = null;
        if (userData.topLevel < Const.upgradeFireLevel && !this.showguide && this._curPage == 0 && this.needguidefire) {
            this.showguide = true;
            if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeFireGold()) {
                targetpos = cc.v2(242, 270);
            } else if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeLifeGold()) {
                targetpos = cc.v2(242, 200);
            }
            if (targetpos) {
                this.needguidegame = true;
                this.head.stopAllActions();
                this.head.active = true;
                this.head.opacity = 0;
                this.head.scale = 1;
                this.head.runAction(cc.sequence(
                    cc.spawn(cc.moveTo(0.5, targetpos), cc.fadeIn(1)),
                    cc.callFunc(() => {
                        this.head.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.05), cc.scaleTo(0.5, 0.95))));
                    })));
            }
        } else if (this.needguideweapon && this._curPage == 1) {
            this.needguideweapon = false;
            targetpos = cc.v2(0, 400);
            this.head.stopAllActions();
            this.head.active = true;
            this.head.opacity = 0;
            this.head.scale = 1;
            this.head.runAction(cc.sequence(
                cc.spawn(cc.moveTo(0.5, targetpos), cc.fadeIn(1)),
                cc.callFunc(() => {
                    this.head.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.05), cc.scaleTo(0.5, 0.95))));
                })));
        }
    }

    public needguidegame: boolean = false;
    public needguidegame2: boolean = false;
    private _rigisterGuideNodeTag2() {
        if (this.needguidegame && GameVoManager.getInstance.myUserVo.topLevel < Const.upgradeFireLevel) {
            this.needguidegame = false;
            this.head.stopAllActions();
            this.head.active = true;
            this.needguidegame2 = true;
            this.head.opacity = 0;
            this.head.scale = 1;
            this.head.runAction(cc.sequence(
                cc.spawn(cc.moveTo(0.4, cc.v2(0, 400 + this.offsetY)), cc.fadeIn(1)),
                cc.callFunc(() => {
                    this.head.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.05), cc.scaleTo(0.5, 0.95))));
                })));
        }
    }

    guideUpgrade() {
        if (this._guideStep1) {
            let btn = this.btnList[0];
            btn.getChildByName("lessbg").active = false;
            btn.parent.getComponent(cc.Button).interactable = true;
            btn.getChildByName("goldNum").color = cc.Color.WHITE.fromHEX("#FFFFFF");
        }
        // if (this._guideStep1 || this._guideStep2) {
        //     let btn = this.btnList[0];
        //     btn.getChildByName("lessbg").active = false;
        //     btn.parent.getComponent(cc.Button).interactable = true;
        //     btn.getChildByName("goldNum").color = cc.Color.WHITE.fromHEX("#FFFFFF");
        // } else if (this._guideStep4 || this._guideStep6) {
        //     let btn = this.btnList[1];
        //     btn.getChildByName("lessbg").active = false;
        //     btn.parent.getComponent(cc.Button).interactable = true;
        //     btn.getChildByName("goldNum").color = cc.Color.WHITE.fromHEX("#FFFFFF");
        // }
    }

    guideOneCompelete() {
        this._guideStep1 = false;
        this.refreshGroup();
    }

    private _onUserLoginCallBack() {
        this.updateAttribute();
        // this.this.updateGroup
        // this.updateGroup(null);
        for (let i = 0; i < this.gunList.length; i++) {
            this.gunList[i].getComponent(GroupItem_IOS).updateSelected();
        }
    }

    public showWeaponUpgrade() {
        this.onSelected(GameVoManager.getInstance.myUserVo.defaultGunId, 0);
        if (this._lastPage == 1 && this._showPanel) {
            this.scorllToDefaultPos();
            return
        }
        this._curPage = 1;
        this.scrollView.active = true;
        this.setBgHeightByType(1);
        this.changeBtnPic(this._curPage, !this._showPanel);
        if (this._curPage != this._lastPage && this._lastPage != undefined) {
            this.changeBtnPic(this._curPage, true);
            this.changeBtnPic(this._lastPage, false);
            this.datailAction(2);
        } else {
            if (this._showPanel) {
                this.datailAction(0);
            } else {
                this.datailAction(1);
            }
            this.showPageUI();
            this.refreshGroup();
        }
        this.updateAttribute();
        this._lastPage = this._curPage;
    }

    public onSelected(id, index) {
        this.head && (this.head.active = false);
        if (index == this.gunList.length) {
            this.onMoreClick();
        } else {
            if (GameVoManager.getInstance.myUserVo.fullWeapon == id) {
                // if(GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes){
                //     //share
                //     HD_MODULE.getPlatform().openShareByShareTemplateRand(ShareCode.home, {
                //         success: () => {
                //             GameVoManager.getInstance.myUserVo.shareTimes ++;
                //             GameVoManager.getInstance.myUserVo.fullCapacity = GameVoManager.getInstance.myUserVo.fullWeapon;
                //             GameVoManager.getInstance.myUserVo.fullWeapon = 0;
                //             this.refreshSelect(id, index);
                //             HD_MODULE.getNet().postGameEvent({ event_name: 'share_tryfullLevel', counter: 1 });
                //             if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
                //                 AlertManager.showNormalTips("体力不足！无法进入游戏");
                //             }else{
                //                 Notifier.send(ListenID.Close_FreeWeapon);
                //             }
                //         },
                //         fail: () => {}
                //     });
                // }else{
                //showvideo
                GameVoManager.getInstance.myUserVo.fullCapacity = GameVoManager.getInstance.myUserVo.fullWeapon;
                GameVoManager.getInstance.myUserVo.fullWeapon = 0;
                this.refreshSelect(id, index);
                // HD_MODULE.getNet().postGameEvent({ event_name: 'video_tryfullLevel', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "video_tryfullLevel" });
                if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
                    AlertManager.showNormalTips("体力不足！无法进入游戏");
                } else {
                    Notifier.send(ListenID.Close_FreeWeapon);
                }
                // }
                return;
            } else {
                this.refreshSelect(id, index);
                let change_2_weapons = Manager.storage.getString("change_2_weapons");
                if (!change_2_weapons) {
                    Notifier.send(ListenID.Log_Event, { event_name: "change_2_weapons" });
                    Manager.storage.setString("change_2_weapons", "1");
                }
            }
        }
        this.updateCanUpgradeNode(this._curSelIndex);
    }

    public refreshSelect(id, index) {
        if (GameVoManager.getInstance.myUserVo.weaponList[id]) {
            Manager.storage.setBool(String(id), true);
            let data = Cfg.Weapon.get(id);
            if (data && data.unlockWay[0] == 8 && !GameVoManager.getInstance.getIsMember()) {
                UIManager.Open(Common_UIPath.MemberUI, MVC.eTransition.Scale, MVC.eUILayer.Tips);
                return;
            }
            GameVoManager.getInstance.myUserVo.defaultGunId = id;
            let len = this.gunList.length;
            for (let i = 0; i < len; i++) {
                this.gunList[i].getComponent(GroupItem_IOS).updateSelected();
            }
            // this.detialPanel.active = false;
            Notifier.send(ListenID.Change_Weapon);
            this.updateAttribute();
        } else {
            // this.detialPanel.scale = 0;
            // this.detialPanel.active = true;
            // this.detialPanel.getComponent(DetialPanel).showInfo(0, id, -1);
            // this.detialPanel.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
            let cfg = Cfg.Weapon.get(id);
            console.log("cfg", cfg.unlockWay, !GameVoManager.getInstance.getIsMember())
            if (cfg.unlockWay[0] == 1) {
                AlertManager.showNormalTips(`第${cfg.unlockWay[1]}关胜利解锁！`)
            } else if (cfg.unlockWay[0] == 3) {
                AlertManager.showNormalTips(`签到第${cfg.unlockWay[1]}天解锁！`)
            } else if (cfg.unlockWay[0] == 7) {
                // AlertManager.showNormalTips(`${cfg.unlockWay[1]}钻石购买解锁！`)
                Notifier.send(ListenID.Shop_Open);
            } else if (cfg.unlockWay[0] == 8) {
                if (!GameVoManager.getInstance.getIsMember()) {
                    UIManager.Open(Common_UIPath.MemberUI, MVC.eTransition.Scale, MVC.eUILayer.Tips);
                }
            } else if (cfg.unlockWay[0] == 9) {
                // AlertManager.showNormalTips(`转盘解锁！`)
                UIManager.Open(Common_UIPath.MainDrawUI, MVC.eTransition.Scale, MVC.eUILayer.Tips);
            } else if (cfg.unlockWay[0] == 10) {
                // AlertManager.showNormalTips(`邀请${cfg.unlockWay[1]}人解锁！`)
                // UIManager.Open(Common_UIPath.InviteWeaponUI);
            } else if (cfg.unlockWay[0] == 11) {
                Notifier.send(ListenID.Shop_Open, 3);
                // UIManager.Open(Common_UIPath.ShopUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, 0);
            } else if (cfg.unlockWay[0] == 5) {
                UIManager.Open(Common_UIPath.InviteWeaponUI);
            }
        }
        if (this._curPage == 1) {
            this.refreshGroup();
        }
    }
    public updateGroup(indexlist, idlist) {
        let len = this.gunList.length;
        for (let i = 0; i < len; i++) {
            this.gunList[i].getComponent(GroupItem_IOS).updateUnLock(idlist[0]);
        }
    }

    public updateGroupGold(type) {
        if (type && type == 2) return;
        this.updateToggleBtn();
        this.refreshGroup();
    }

    public unlockNewWeapon() {
        this.newWeapon.active = false;
    }

    // 满级试用
    public showFullWeapon() {
        if (GameVoManager.getInstance.stateVo.levelFailTimes >= Const.fullWeaponFailTimes && GameVoManager.getInstance.myUserVo.topLevel >= Const.fullWeaponLevel && (GameVoManager.getInstance.myUserVo.topLevel + 1) % 5 != 0) {
            let data = GameVoManager.getInstance.myUserVo.weaponList;
            let t = []
            for (const k in data) {
                if (Number(k) < 200 && (data[k][0] < 49))
                    if (Cfg.Weapon.get(k)) {
                        t.push(k);
                    }
            }
            if (!t.length) return
            if (this.newWeapon.active) this.newWeapon.active = false;
            if (this.upgradeFire.active) this.upgradeFire.active = false;
            this.fullWeaponNode.active = true;
            let key = Util.random(0, t.length);
            GameVoManager.getInstance.myUserVo.fullWeapon = t[key];
            let weaponinfo = Cfg.Weapon.get(t[key]);
            if (!weaponinfo) {
                GameVoManager.getInstance.myUserVo.fullWeapon = GameVoManager.getInstance.myUserVo.defaultGunId;
            } else if (weaponinfo.unlockWay[0] == 8 && !GameVoManager.getInstance.getIsMember()) {//会员特殊判断
                GameVoManager.getInstance.myUserVo.fullWeapon = GameVoManager.getInstance.myUserVo.defaultGunId;
            }
            // //console.log("GameVoManager.getInsta", GameVoManager.getInstance.myUserVo.fullWeapon, key);
        } else {
            this.fullWeaponNode.active = false;
            GameVoManager.getInstance.myUserVo.fullWeapon = 0;
        }
    }

    //升级火力更强力
    public showUpgradeFire() {
        this.upgradeFire.active = true;
        // if (GameVoManager.getInstance.stateVo.levelFailTimes >= Const.failWeaponUpgradeTimes) {
        //     if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeFireGold()) {
        //         this.upgradeFire.active = true;
        //     }
        // }
    }
    public head: cc.Node = null;
    /*
     * 打开界面回调，每次打开只调用一次
     */
    public offsetY: number = 0;
    public onOpen(args: any): void {
        super.onOpen(args);
        if (!this.fullWeaponNode)
            this.fullWeaponNode = this.panelNode.getChildByName("fullWeapon");
        if (!this.upgradeFire)
            this.upgradeFire = this.panelNode.getChildByName("upgradeFire");

        if (!this.head) {
            this.head = this.panelNode.getChildByName("head");
        }
        let offset = 0;
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.panelNode.y = -size.height * 0.5 + offset;
        this.offsetY = -640 - this.panelNode.y;
        let gundata = Cfg.Weapon.filter({ showPos: 0 });
        gundata.sort((a: WeaponCfg, b: WeaponCfg): number => {
            let a1 = GameVoManager.getInstance.myUserVo.weaponList[a.sortIndex] || [0];
            let a2 = GameVoManager.getInstance.myUserVo.weaponList[b.sortIndex] || [0];
            if (a1 && a2) {
                return a.sortIndex - b.sortIndex;
            } else return a2[0] - a1[0];
        });
        this._gunData = gundata;
        let id = 0;
        let unlockid = GroupModel.getInstance.unlockId;
        this.unlockNewWeapon();
        this.showUpgradeFire();
        this.showFullWeapon();
        for (let i = 0; i < gundata.length; i++) {
            // if (i >= gundata.length) {
            // break
            // return
            // node.getChildByName("showNode").active = false;
            // node.getChildByName("bgmore").active = true;
            // node.getComponent(GroupItem)._index = i;
            // } else {
            if (!this.gunList[i]) {
                let node = cc.instantiate(this.gunItem);
                this.gunList.push(node);
                node.setParent(this.gunContent);
            }
            this.gunList[i].getComponent(GroupItem_IOS).initInfo(gundata[i].id, i, gundata[i]);
            if (unlockid <= 0 && GameVoManager.getInstance.myUserVo.defaultGunId == gundata[i].id) {
                id = i;
            }
            else if (unlockid > 0 && unlockid == gundata[i].id) {
                id = i;
            }
            if (GameVoManager.getInstance.myUserVo.fullWeapon == gundata[i].id) {
                id = i;
            }
            // }
        }

        if (id > 0) {
            let scrollview = this.gunContent.parent.parent.getComponent(cc.ScrollView);
            scrollview.scrollToPercentHorizontal(id / gundata.length, 0.1);
            if (unlockid > 0) {
                this.scheduleOnce(() => {
                    this.gunList[id].getComponent(GroupItem_IOS).updateUnLock(unlockid);
                }, 0.3);
            }
        }
        this.updateToggleBtn();
        this.refreshGroup();
    }

    getGunIndex(): number {
        let index = 0;
        for (let i = 0; i < this._gunData.length; i++) {
            if (GameVoManager.getInstance.myUserVo.fullWeapon == this._gunData[i].id) {
                index = i;
                break;
            }
            if (GameVoManager.getInstance.myUserVo.defaultGunId == this._gunData[i].id) {
                index = i;
            }
        }
        return index;
    }


    public refreshGroup() {
        let list = [];
        if (this._curPage == 0) {
            list = [GameVoManager.getInstance.myUserVo.roleLvs[0] + 1, GameVoManager.getInstance.myUserVo.roleLvs[1] + 1];
        } else if (this._curPage == 1) {
            let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
            list = [GameVoManager.getInstance.myUserVo.weaponList[gunId][0] + 1, GameVoManager.getInstance.myUserVo.weaponList[gunId][1] + 1, GameVoManager.getInstance.myUserVo.weaponList[gunId][2]];
        } else if (this._curPage == 2) {
            list = [GameVoManager.getInstance.myUserVo.goldRewardLvs[0] + 1, GameVoManager.getInstance.myUserVo.goldRewardLvs[1] + 1];
        }
        for (let i = 0; i < list.length; i++) {
            if (this.lvList[i])
                this.lvList[i].string = `${list[i]}`;
            this.updateBtn(i);
        }
    }

    public updateBtn(index: number) {
        if (!this.btnList[index]) return;
        let lessbg = this.btnList[index].getChildByName("lessbg");
        let icon = this.btnList[index].getChildByName("icon");
        let goldNum = this.btnList[index].getChildByName("goldNum");
        let limited = this.btnList[index].getChildByName("limited");
        let upgradeIcon = this.btnList[index].getChildByName("upgradeIcon");
        let limitLabel = this.btnList[index].getChildByName("limitLabel");
        limitLabel && (limitLabel.active = false);
        let gold: number = Const.upgradeHurCost;
        let allgold = GameVoManager.getInstance.myUserVo.gold;
        if (this._curPage == 0) {

            if (index == 0) {         //火力
                gold = Util.getUpgradeFireGold();
            } else if (index == 1) {   //生命
                // limitLabel && (limitLabel.active = false);
                gold = Util.getUpgradeLifeGold();
            }
        } else if (this._curPage == 1) {
            let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
            let showLimit = false;
            if (index == 0) {         //射速
                let lv = GameVoManager.getInstance.myUserVo.weaponList[gunId][0];
                gold = Util.getUpgradeSpeedGold();
                if (GameVoManager.getInstance.myUserVo.fullCapacity == gunId) {
                    lv = Const.maxShootSpeedLv - 1;
                }
                if (lv >= Const.maxShootSpeedLv - 1) {
                    showLimit = true;
                    this.lvList[0].string = `${Const.maxShootSpeedLv}`;
                }
            } else if (index == 1) {   //火力加成
                let lv = GameVoManager.getInstance.myUserVo.weaponList[gunId][1];
                gold = Util.getWeaponHotUpgradeGoldByLevel(lv);
                let firelv = GameVoManager.getInstance.myUserVo.roleLvs[0] || 0;
                if (firelv <= GameVoManager.getInstance.myUserVo.weaponList[gunId][1]) {
                    showLimit = true;
                }
            } else if (index == 2) { //特性成长
            }
            if (showLimit) {
                if (this._curPage == 1 && index == 1) {
                    limitLabel && (limitLabel.active = true);
                    lessbg.active = true;
                    upgradeIcon.active = false;
                    icon.active = false;
                    goldNum.active = false;
                    limited.active = false;
                } else {
                    this.btnList[index].parent.getComponent(cc.Button).interactable = false;
                    lessbg.active = true;
                    upgradeIcon.active = false;
                    icon.active = false;
                    goldNum.active = false;
                    limited.active = true;
                    limitLabel && (limitLabel.active = false);
                }
            } else {
                this.btnList[index].parent.getComponent(cc.Button).interactable = true;
                let goldFormat = Util.goldFormat(gold);
                goldNum.getComponent(cc.Label).string = goldFormat;
                goldNum.color = gold <= allgold ? cc.Color.WHITE.fromHEX("#FFFFFF") : cc.Color.WHITE.fromHEX("#e25744");
                lessbg.active = false;
                icon.active = true;
                goldNum.active = true;
                limited.active = false;
                // limitLabel && (limitLabel.active = false);
                upgradeIcon.stopActionByTag(1);
                upgradeIcon.active = allgold >= gold;
                if (upgradeIcon) {
                    let action = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1.7), cc.scaleTo(0.2, 1.7, 1.1)));
                    action.setTag(1);
                    upgradeIcon.runAction(action);
                }
            }
        } else if (this._curPage == 2) {
            if (index == 0) {         //计时收益
                gold = Util.getUpgradeTimeGold();
            } else if (index == 1) {   //杀怪收益
                gold = Util.getUpgradeKillGold();
            }
        }

        if (this._curPage == 0 || this._curPage == 2) {
            lessbg.active = false;
            let goldFormat = Util.goldFormat(gold);
            goldNum.getComponent(cc.Label).string = goldFormat;
            goldNum.color = gold > allgold ? cc.Color.WHITE.fromHEX("#e25744") : cc.Color.WHITE.fromHEX("#FFFFFF");
            this.btnList[index].parent.getComponent(cc.Button).interactable = true; //gold <= allgold
            icon.active = true;
            goldNum.active = true;
            limited.active = false;
            upgradeIcon.stopActionByTag(1);
            upgradeIcon.active = allgold >= gold;
            if (upgradeIcon) {
                let action = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1.7), cc.scaleTo(0.2, 1.7, 1.1)));
                action.setTag(1);
                upgradeIcon.runAction(action);
            }
        }
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        // if (this._showPanel)
        //     this.onClickToggle(null, this._curPage + "");
        this._controArrow = false;
    }

    public onUpgradeClick(target, customdata: number) {
        Manager.audio.playAudio(510, AudioType.UI, 0);
        let gold = 0;
        let allgold = GameVoManager.getInstance.myUserVo.gold;
        if (this._curPage == 0) {
            if (customdata == 0) {         //火力
                gold = Util.getUpgradeFireGold();
                // HD_MODULE.getNet().postGameEvent({ event_name: 'firepower', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "firepower" });
            } else if (customdata == 1) {   //生命
                gold = Util.getUpgradeLifeGold();
                // HD_MODULE.getNet().postGameEvent({ event_name: 'lifevolume', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "lifevolume" });
            }
            this._rigisterGuideNodeTag2();
        } else if (this._curPage == 1) {
            let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
            if (customdata == 0) {         //射速
                gold = Util.getUpgradeSpeedGold();
                // HD_MODULE.getNet().postGameEvent({ event_name: 'firingrate', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "firingrate" });
            } else if (customdata == 1) {   //火力成长
                let lv = GameVoManager.getInstance.myUserVo.weaponList[gunId][1];
                gold = Util.getWeaponHotUpgradeGoldByLevel(lv);
                Notifier.send(ListenID.Log_Event, { event_name: "weaponpower" });
            } else if (customdata == 2) {//特性成长

            }
        } else if (this._curPage == 2) {
            if (customdata == 0) {         //计时收益
                gold = Util.getUpgradeTimeGold();
                // HD_MODULE.getNet().postGameEvent({ event_name: 'timegold', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "timegold" });
            } else if (customdata == 1) {   //杀怪收益
                gold = Util.getUpgradeKillGold();
                // HD_MODULE.getNet().postGameEvent({ event_name: 'huntinggold', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "huntinggold" });
            }
        }

        //免费升级指引
        if (this._guideStep1 || this._guideStep2 || this._guideStep4 || this._guideStep6) {
            if (this._curPage == 0 && customdata == 0) {
                GameVoManager.getInstance.myUserVo.roleLvs[0] += 1;
            } else if (this._curPage == 0 && customdata == 1) {
                GameVoManager.getInstance.myUserVo.roleLvs[1] += 1;
            } else if (this._curPage == 1 && customdata == 0) {
                let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                GameVoManager.getInstance.myUserVo.weaponList[gunId][0] += 1;
            } else if (this._curPage == 1 && customdata == 1) {
                let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                GameVoManager.getInstance.myUserVo.weaponList[gunId][1] += 1;
            }
            else if (this._curPage == 1 && customdata == 2) {
                let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                GameVoManager.getInstance.myUserVo.weaponList[gunId][2] += 1;
            }
            else if (this._curPage == 2 && customdata == 0) {
                GameVoManager.getInstance.myUserVo.goldRewardLvs[0] += 1;
            } else if (this._curPage == 2 && customdata == 1) {
                GameVoManager.getInstance.myUserVo.goldRewardLvs[1] += 1;
            }
            this.refreshGroup();
            this.guideUpgrade();
        } else {
            let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
            if (gold > allgold) {
                // AlertManager.showNormalTips(this._curPage == 1 && customdata == 2 ? "钻石不足" : "金币不足");
                // if (this._curPage == 1 && customdata == 1) {
                //     let firelv = GameVoManager.getInstance.myUserVo.roleLvs[0] || 0;
                //     let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                //     if (firelv <= GameVoManager.getInstance.myUserVo.weaponList[gunId][1]) {
                //         AlertManager.showNormalTips("人物火力等级不足");
                //         return;
                //     }
                // }
                if (this._curPage == 1 && customdata == 1) {
                    let firelv = GameVoManager.getInstance.myUserVo.roleLvs[0] || 0;
                    if (firelv <= GameVoManager.getInstance.myUserVo.weaponList[gunId][1]) {
                        AlertManager.showNormalTips("人物火力等级不足");
                    }
                }
                if (Const.FreeGoldTimes > GameVoManager.getInstance.myUserVo.useFreeGoldTimes && GameVoManager.getInstance.gameSwitchVo.freeGold) {
                    UIManager.Open(Common_UIPath.GetFreeGold, MVC.eTransition.Default, MVC.eUILayer.Tips, gold);
                } else {
                    UIManager.Open(Common_UIPath.ExchangeDiamondUI);
                    // HD_MODULE.getNet().postGameEvent({ event_name: 'goldexchangeui', counter: 1 });
                    Notifier.send(ListenID.Log_Event, { event_name: "goldexchangeui" });
                }
                return
            } else {
                if (this._curPage == 0 && customdata == 0) {
                    GameVoManager.getInstance.myUserVo.roleLvs[0] += 1;
                    // HD_MODULE.getNet().postGameEvent({ event_name: 'Upfirepower', counter: 1 });
                    Notifier.send(ListenID.Log_Event, { event_name: "Upfirepower" });
                    // HD_MODULE.getPlatform().postEvent("role_level_up", "playerID", HDDefaultUserInfo.open_id);
                    Notifier.send(ListenID.Role_Level_Up);
                    let roleLv = GameVoManager.getInstance.myUserVo.roleLvs[0]
                    if (roleLv == 1) {
                        Notifier.send(ListenID.Log_Event, { event_name: "first_Upfirepower" });
                    } else if (roleLv == 2) {
                        Notifier.send(ListenID.Log_Event, { event_name: "second_Upfirepower" });
                    }
                } else if (this._curPage == 0 && customdata == 1) {
                    GameVoManager.getInstance.myUserVo.roleLvs[1] += 1;
                    // HD_MODULE.getNet().postGameEvent({ event_name: 'Uplifevolume', counter: 1 });
                    Notifier.send(ListenID.Log_Event, { event_name: "Uplifevolume" });
                    // HD_MODULE.getPlatform().postEvent("role_baoji_up", "playerID", HDDefaultUserInfo.open_id);
                    Notifier.send(ListenID.Role_Baoji_Up);
                } else if (this._curPage == 1 && customdata == 0) {
                    GameVoManager.getInstance.myUserVo.weaponList[gunId][0] += 1;
                    // HD_MODULE.getNet().postGameEvent({ event_name: 'Upfiringrate', counter: 1 });
                    Notifier.send(ListenID.Log_Event, { event_name: "Upfiringrate" });
                    Notifier.send(ListenID.Log_Event, { event_name: "Upfiringrate_weapon_" + gunId });
                    // HD_MODULE.getPlatform().postEvent("role_speed_up", "playerID", HDDefaultUserInfo.open_id);
                    Notifier.send(ListenID.Role_Speed_Up);
                } else if (this._curPage == 1 && customdata == 1) {
                    let firelv = GameVoManager.getInstance.myUserVo.roleLvs[0] || 0;
                    if (firelv <= GameVoManager.getInstance.myUserVo.weaponList[gunId][1]) {
                        AlertManager.showNormalTips("人物火力等级不足");
                        return;
                    } else {
                        GameVoManager.getInstance.myUserVo.weaponList[gunId][1] += 1;
                        // HD_MODULE.getNet().postGameEvent({ event_name: 'Upweaponpower', counter: 1 });
                        Notifier.send(ListenID.Log_Event, { event_name: "Upweaponpower" });
                        Notifier.send(ListenID.Log_Event, { event_name: "Upweaponpower_weapon_" + gunId });
                        // HD_MODULE.getPlatform().postEvent("role_power_up", "playerID", HDDefaultUserInfo.open_id);
                        Notifier.send(ListenID.Role_Power_Up);

                    }
                }
                // else if (this._curPage == 1 && customdata == 2) {
                //     let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                //     GameVoManager.getInstance.myUserVo.weaponList[gunId][2] += 1;
                // }
                else if (this._curPage == 2 && customdata == 0) {
                    GameVoManager.getInstance.myUserVo.goldRewardLvs[0] += 1;
                    // HD_MODULE.getNet().postGameEvent({ event_name: 'Uptimegold', counter: 1 });
                    Notifier.send(ListenID.Log_Event, { event_name: "Uptimegold" });
                    // HD_MODULE.getPlatform().postEvent("role_timegold_up", "playerID", HDDefaultUserInfo.open_id);
                    Notifier.send(ListenID.Role_TimeGold_Up);


                } else if (this._curPage == 2 && customdata == 1) {
                    GameVoManager.getInstance.myUserVo.goldRewardLvs[1] += 1;
                    // HD_MODULE.getNet().postGameEvent({ event_name: 'Uphuntinggold', counter: 1 });
                    Notifier.send(ListenID.Log_Event, { event_name: "Uphuntinggold" });
                    // HD_MODULE.getPlatform().postEvent("role_killgold_up", "playerID", HDDefaultUserInfo.open_id);
                    Notifier.send(ListenID.Role_KillGold_Up);
                }
                if (this._curPage == 1 && customdata == 2) {
                    GameVoManager.getInstance.setDiamond(-gold, 2);
                } else {
                    GameVoManager.getInstance.setGold(-gold, 2);
                }
                this.refreshGroup();
            }
        }
        this.showUpgradeAnima();
        this.updateToggleBtn();
        this.updateAttribute();
        this.updateCanUpgradeNode(this._curSelIndex);
    }

    public showUpgradeAnima() {
        if (this._curPage == 0) {
            Notifier.send(ListenID.Show_PlayerUpgrade);
        } else if (this._curPage == 1) {
            Notifier.send(ListenID.Show_WeaponLight);
        } else if (this._curPage == 2) {
            Notifier.send(ListenID.Show_GoldUpgrade);
        }
    }

    public onClickToggle(event: cc.Event, data: string) {
        if (event) {
            GameVoManager.getInstance.myUserVo.successTips = 0;
        }
        Manager.audio.playAudio(501, AudioType.UI, 0);
        if (this.upgradeFire && this.upgradeFire.active) {
            this.upgradeFire.active = false;
        }
        if (!this.needguidegame2) {
            this.head.active = false;
        }
        let index = 0;
        this._preSelIndex = this._curSelIndex;
        this._isClickGroup = true;
        if (data == "0") {
            this._curPage = 0;
            this.scrollView.active = false;
            this.tips_left.active = false;
            this.tips_right.active = false;
            this.limitedSpecialText.parent.active = false;
            this.setBgHeightByType(0);
        } else if (data == "1") {
            this._curPage = 1;
            this.scrollView.active = true;
            this.tips_left.active = false;
            this.tips_right.active = true;
            // this.limitedSpecialText.parent.active = true;
            this.adjustScrollData();
            if (GameVoManager.getInstance.myUserVo.unlockNewWeapon) {
                GameVoManager.getInstance.myUserVo.unlockNewWeapon = 0;
                this.newWeapon.active = false;
            }
            this.setBgHeightByType(1);
            index = 1;
        } else {
            this._curPage = 2;
            this.scrollView.active = false;
            this.tips_left.active = false;
            this.tips_right.active = false;
            this.limitedSpecialText.parent.active = false;
            this.setBgHeightByType(2);
            index = 2;
        }
        this.changeBtnPic(this._curPage, !this._showPanel);
        let actionNum = 0;
        if (this._curPage != this._lastPage && this._lastPage != undefined) {
            this.changeBtnPic(this._curPage, true);
            this.changeBtnPic(this._lastPage, false);
            actionNum = 2;
        } else {
            actionNum = this._showPanel ? 0 : 1;
            this.showPageUI();
            this.refreshGroup();
        }
        this._curSelIndex = index;
        this.datailAction(actionNum).then(() => {
            this._rigisterGuideNodeTag1();
        });
        this._controArrow = true;
        this.updateArrow();
        this.updateAttribute();
        this._lastPage = this._curPage;
        if (this._curSelIndex == this._preSelIndex) {
            this._curSelIndex = -1;
        };
        this.fullWeaponNode.active = false;
        this.updateCanUpgradeNodeByArray([this._preSelIndex, this._curSelIndex]);

    }

    changeBtnPic(index: number, choose: boolean) {
        this.toggleList[index].getChildByName("Background").active = !choose;
        let chooseNode = this.toggleList[index].getChildByName("checkmark");
        chooseNode.active = choose;
        this.toggleList[index].zIndex = choose ? 1 : 0;
    }

    updateArrow() {
        if (!this._controArrow) return
        for (let i = 0; i < this.toggleList.length; i++) {
            let node = this.toggleList[i].getChildByName("red_point");
            if (node.active && this._curPage != i) {
                node.active = false;
            }
        }
    }

    //0隐藏 1显示 2隐藏显示
    datailAction(type: number): Promise<any> {
        return new Promise((res, rej) => {
            let datail = this.panelNode.getChildByName("detail0");
            datail.stopAllActions();
            if (this._showPanel) {
                datail.opacity = 255;
                datail.position = cc.v2(0, 0);
            } else {
                datail.opacity = 0;
                datail.position = cc.v2(0, -200);
            }

            let dt = 0.12;
            if (type == 0) {
                datail.runAction(cc.sequence(cc.spawn(cc.fadeOut(dt), cc.moveTo(dt, cc.v2(0, -200))), cc.callFunc(() => {
                    if (this.scrollView.active)
                        this.scrollView.active = false;
                })));
                this._showPanel = false;
            } else if (type == 1) {
                datail.runAction(cc.sequence(cc.spawn(cc.fadeIn(dt), cc.moveTo(dt, cc.v2(0, 120)), cc.callFunc(() => {
                    if (this._curPage == 1) {
                        this.scorllToDefaultPos();
                    }
                })), cc.callFunc(() => {
                    res();
                })));
                this._showPanel = true;
            } else if (type == 2) {
                let curtemp = this._curPage;
                let lasttemp = this._lastPage;
                if (curtemp != 1 && lasttemp == 1) {
                    this.scrollView.active = true;
                }
                if (curtemp == 1 && lasttemp != 1) {
                    this.scrollView.active = false;
                }
                datail.runAction(cc.sequence(cc.spawn(cc.fadeOut(dt), cc.moveTo(dt, cc.v2(0, -200))),
                    cc.spawn(cc.fadeIn(dt), cc.moveTo(dt, cc.v2(0, 120)), cc.callFunc(() => {
                        this.showPageUI();
                        this.refreshGroup();
                        if (curtemp != 1 && lasttemp == 1) {
                            this.scrollView.active = false;
                        }
                        if (curtemp == 1 && lasttemp != 1) {
                            this.scrollView.active = true;
                            this.scorllToDefaultPos();
                        }
                    }))));
                this._showPanel = true;
            }
        })
    }

    scorllToDefaultPos() {
        let scrollview = this.gunContent.parent.parent.getComponent(cc.ScrollView);
        let index = this.getGunIndex();
        if (index > 1 && index < this.gunList.length - 2) {
            scrollview.scrollToPercentHorizontal(index / this.gunList.length, 0.1);
        } else if (index <= 1) {
            scrollview.scrollToLeft(0.1);
        } else {
            scrollview.scrollToRight(0.1);
        }
    }

    showPageUI() {
        for (let i = 0; i < this.nameList.length; i++) {
            if (this._curPage == 0) {
                if (i == 0 || i == 1) {
                    this.nameList[i].active = true;
                } else {
                    this.nameList[i].active = false;
                }
            } else if (this._curPage == 1) {
                if (i == 2 || i == 3) {
                    this.nameList[i].active = true;
                } else {
                    this.nameList[i].active = false;
                }
            } else {
                if (i == 4 || i == 5) {
                    this.nameList[i].active = true;
                } else {
                    this.nameList[i].active = false;
                }
            }
        }
    }

    updateToggleBtn() {
        for (let i = 0; i < this.toggleList.length; i++) {
            if (i == 0) {
                let showRedPoint = false;
                let roleLvs = GameVoManager.getInstance.myUserVo.roleLvs;
                let gold_0 = Util.getUpgradeFireGold();
                let gold_1 = Util.getUpgradeLifeGold();
                if (gold_0 <= GameVoManager.getInstance.myUserVo.gold) {
                    showRedPoint = true;
                }
                if (gold_1 <= GameVoManager.getInstance.myUserVo.gold) {
                    showRedPoint = true;
                }
                let upgradeIcon = this.toggleList[i].getChildByName("red_point");
                upgradeIcon.stopActionByTag(1);
                upgradeIcon.active = false;
                if (showRedPoint) {
                    let action = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1.7), cc.scaleTo(0.2, 1.7, 1.1)));
                    action.setTag(1);
                    upgradeIcon.runAction(action);
                }
            } else if (i == 1) {
                let showRedPoint = false;
                let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                let weaponLvs = GameVoManager.getInstance.myUserVo.weaponList[gunId];
                let gold_0 = Util.getUpgradeSpeedGold();
                let gold_1 = Util.getWeaponHotUpgradeGoldByLevel(weaponLvs[1]);
                if (weaponLvs[0] >= Const.maxShootSpeedLv - 1 && weaponLvs[1] >= Const.fireHotLv - 1) {
                    showRedPoint = false;
                } else {
                    if (gold_0 <= GameVoManager.getInstance.myUserVo.gold) {
                        showRedPoint = true;
                    }
                    if (gold_1 <= GameVoManager.getInstance.myUserVo.gold) {
                        showRedPoint = true;
                    }
                }
                let upgradeIcon = this.toggleList[i].getChildByName("red_point");
                upgradeIcon.stopActionByTag(1);
                upgradeIcon.active = false;
                if (showRedPoint) {
                    let action = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1.7), cc.scaleTo(0.2, 1.7, 1.1)));
                    action.setTag(1);
                    upgradeIcon.runAction(action);
                }
            } else if (i == 2) {
                let showRedPoint = false;
                let goldRewardLvs = GameVoManager.getInstance.myUserVo.goldRewardLvs;
                let gold_0 = Util.getUpgradeTimeGold();
                let gold_1 = Util.getUpgradeKillGold();
                if (gold_0 <= GameVoManager.getInstance.myUserVo.gold) {
                    showRedPoint = true;
                }
                if (gold_1 <= GameVoManager.getInstance.myUserVo.gold) {
                    showRedPoint = true;
                }
                let upgradeIcon = this.toggleList[i].getChildByName("red_point");
                upgradeIcon.stopActionByTag(1);
                upgradeIcon.active = false;
                if (showRedPoint) {
                    let action = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1.7), cc.scaleTo(0.2, 1.7, 1.1)));
                    action.setTag(1);
                    upgradeIcon.runAction(action);
                }
            }
            this.toggleList[i].zIndex = i == this._curSelIndex ? 1 : 0;
        }
        this.updateArrow();
    }

    updateAttribute() {
        if (this._curPage == 0 || this._curPage == 1) {
            let lv_0: number;
            let lv_1: number;
            let cur_0;
            let cur_1;
            this.attList[0].active = true;
            this.attList[1].active = true;
            this.attList[2].active = false;
            this.attList[3].active = false;
            this.attList[4].active = false;
            if (this._curPage == 0) {
                lv_0 = GameVoManager.getInstance.myUserVo.roleLvs[0] + 1;
                lv_1 = GameVoManager.getInstance.myUserVo.roleLvs[1] + 1;
                cur_0 = (Number(Math.pow(1.1, lv_0) + 0.2 * lv_0) * 100).toFixed(1);
                cur_1 = (Number(Math.pow(1.1, lv_1) + 0.2 * lv_1) * 100).toFixed(1);
            } else if (this._curPage == 1) {
                let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                lv_0 = GameVoManager.getInstance.myUserVo.weaponList[gunId][0] + 1;
                lv_1 = GameVoManager.getInstance.myUserVo.weaponList[gunId][1] + 1;
                if (GameVoManager.getInstance.myUserVo.fullCapacity == gunId) {
                    lv_0 = Const.maxShootSpeedLv;
                    // lv_1 = Const.fireHotLv;
                }
                cur_0 = (Number((lv_0 * 0.04 / (1 + lv_0 * 0.02) + 1) * 100)).toFixed(1);
                cur_1 = (Number((lv_1 * 0.04 / (1 + lv_1 * 0.02) + 1) * 100)).toFixed(1);
                // this.setSpecial(gunId);
            }
            this.attList[0].getChildByName("lb_cur").getComponent(cc.Label).string = Util.numFormat(Number(cur_0)) + "%";
            this.attList[1].getChildByName("lb_cur").getComponent(cc.Label).string = Util.numFormat(Number(cur_1)) + "%";
        } else if (this._curPage == 2) {
            this.attList[0].active = false;
            this.attList[1].active = false;
            this.attList[2].active = true;
            this.attList[3].active = true;
            this.attList[4].active = true;
            let lv_0: number;
            let lv_1: number;
            lv_0 = GameVoManager.getInstance.myUserVo.goldRewardLvs[0] + 1;
            lv_1 = GameVoManager.getInstance.myUserVo.goldRewardLvs[1] + 1;
            let cur_online = (Number(Util.EarningByLevel(lv_0)) * 10 / 20).toFixed(1);
            let cur_offline = (Number(cur_online) / 10).toFixed(1);
            let cur_1 = (Number(Util.getMonsterDropGoldByLevel(1, lv_1))).toFixed(1);
            this.attList[2].getChildByName("lb_cur").getComponent(cc.Label).string = Util.numFormat(Number(cur_online)) + "/s";
            this.attList[3].getChildByName("lb_cur").getComponent(cc.Label).string = Util.numFormat(Number(cur_offline)) + "/s";
            this.attList[4].getChildByName("lb_cur").getComponent(cc.Label).string = Util.numFormat(Number(cur_1));
        }
    }

    onMoreClick() {
        Notifier.send(ListenID.Shop_Open);
    }


    getPositionInView(item: cc.Node) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.gunContent.parent.parent.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }


    // private scrolling:boolean = false;
    scrollEvent(sender: cc.ScrollView, event: cc.ScrollView.EventType) {
        switch (event) {
            case cc.ScrollView.EventType.SCROLLING:
                this.adjustScrollData();
                break;
            case cc.ScrollView.EventType.SCROLL_ENDED:
                break;
            case cc.ScrollView.EventType.SCROLL_TO_LEFT:
                this.tips_left.active = false;
                this.tips_right.active = true;
                break;
            case cc.ScrollView.EventType.SCROLL_TO_RIGHT:
                this.tips_left.active = true;
                this.tips_right.active = false;
                break;
        }
    }

    lastContentPosX: number = -330; //用于滚动时候记录上次的contentx坐标 用于标记向左还是向右滚
    /**
     * 调整滚动物品位置
     */
    adjustScrollData() {
        let items = this.gunList;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (viewPos.x < -90 || viewPos.x > 800) {
                items[i].getComponent(GroupItem_IOS).showNode(false);
            } else {
                items[i].getComponent(GroupItem_IOS).showNode(true);
            }
        }

        this.lastContentPosX = this.gunContent.x;
        this.head && (this.head.active = false);
    }

    public setBgHeightByType(type: number) {
        // if (type == 0 || type == 2) {
        let h = type == 1 ? 330 : 200;
        if (this.nameList[0]) {
            this.nameList[0].parent.parent.parent.height = h;
            this.nameList[0].parent.parent.y = 0;
        }
        // } else if (type == 1) {
        //     if (this.nameList[0]) {
        //         this.nameList[0].parent.parent.parent.height = 266;
        //         this.nameList[0].parent.parent.y = 72;
        //     }
        // }
    }

    public setSpecial(gunId) {
        let weapondata = Cfg.Weapon.get(gunId);
        if (!weapondata || weapondata.effectType == 0) {
            this.limitedSpecialText.getComponent(cc.Label).string = "后续开放";
            this.limitedSpecialText.active = true;
            this.btnUpdgrade2.active = false;
            let childlen = this.starList.childrenCount;
            for (let i = 0; i < childlen; i++) {
                this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
            }
            let node = this.weaponHotType.node.parent.getChildByName("hotText");
            this.weaponHotType.node.active = false;
            node.active = true;
        } else {
            Manager.spAtlas.getSpecialProIcon(Util.getSpecialWeaponHotStringByType(weapondata.effectType)).then(res => {
                this.weaponHotType.spriteFrame = res;
            })
            let node = this.weaponHotType.node.parent.getChildByName("hotText");
            node.active = false;
            this.weaponHotType.node.active = true;
            let childlen = this.starList.childrenCount;
            let weaponinfo = GameVoManager.getInstance.myUserVo.weaponList[gunId];
            if (!weaponinfo) {
                for (let i = 0; i < childlen; i++) {
                    this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                }
            } else {
                for (let i = 0; i < childlen; i++) {
                    if (i < weaponinfo[2])
                        this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
                    else
                        this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                }
            }
        }
    }

    updateCanUpgradeNode(index: number) {
        if (index != 0) return; //三个气泡改成一个
        // if(this.canUpgradeArr){
        let canUpgradeNode = this.canUpgrade;
        this.canUpgrade.zIndex = 2;
        this._canUpgradeIndex = -1;
        if (canUpgradeNode) {
            let canUpgrade = false;
            let canReplace = false;
            let haveNewWepon = GameVoManager.getInstance.myUserVo.unlockNewWeapon > 0;// this.getHaveNewWeapon();
            let playerGold = GameVoManager.getInstance.myUserVo.gold;
            switch (index) {
                case 0: {
                    if (haveNewWepon) {
                        this._canUpgradeIndex = 1;
                        canReplace = true;
                    } else {
                        let cost1 = Util.getUpgradeFireGold();
                        let cost2 = Util.getUpgradeLifeGold();
                        canUpgrade = playerGold >= cost1 || playerGold >= cost2;
                        if (canUpgrade) {
                            this._canUpgradeIndex = 0;
                        } else {
                            let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                            let weaponLvs = GameVoManager.getInstance.myUserVo.weaponList[gunId];
                            let cost1 = Util.getUpgradeSpeedGold();
                            let cost2 = Util.getWeaponHotUpgradeGoldByLevel(weaponLvs[1]);
                            let isMax = weaponLvs[0] >= Const.maxShootSpeedLv - 1 && weaponLvs[1] >= Const.fireHotLv - 1;
                            canUpgrade = playerGold >= cost1 || playerGold >= cost2;
                            canUpgrade = canUpgrade && !isMax;
                            if (canUpgrade) {
                                this._canUpgradeIndex = 1;
                            } else {
                                let cost1 = Util.getUpgradeTimeGold();
                                let cost2 = Util.getUpgradeKillGold();
                                canUpgrade = playerGold >= cost1 || playerGold >= cost2;
                                if (canUpgrade) {
                                    this._canUpgradeIndex = 2;
                                }
                                // this._canUpgradeIndex = (canUpgrade && this._canUpgradeIndex != 0 && this._canUpgradeIndex != 1) ? 2 : this._canUpgradeIndex;
                            }
                        }
                        // this._canUpgradeIndex = canUpgrade ? 0 : this._canUpgradeIndex;
                    }

                    break;
                }
                // case 1: {
                //     let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                //     let weaponLvs = GameVoManager.getInstance.myUserVo.weaponList[gunId];
                //     let cost1 = Util.getUpgradeSpeedGold();
                //     let cost2 = Util.getWeaponHotUpgradeGoldByLevel(weaponLvs[1]);
                //     let isMax = weaponLvs[0] >= Const.maxShootSpeedLv - 1 && weaponLvs[1] >= Const.fireHotLv - 1;
                //     canUpgrade = playerGold >= cost1 || playerGold >= cost2;
                //     canUpgrade = canUpgrade && !isMax;
                //     canReplace = haveNewWepon;
                //     this._canUpgradeIndex = (canUpgrade && this._canUpgradeIndex != 0) ? 1 : this._canUpgradeIndex;
                //     break;
                // }
                // case 2: {
                //     let cost1 = Util.getUpgradeTimeGold();
                //     let cost2 = Util.getUpgradeKillGold();
                //     canUpgrade = playerGold >= cost1 || playerGold >= cost2;
                //     this._canUpgradeIndex = (canUpgrade && this._canUpgradeIndex != 0 && this._canUpgradeIndex != 1) ? 2 : this._canUpgradeIndex;
                //     break;
                // }
            }
            let isShow = (this._canUpgradeIndex != -1) || canReplace;
            // canUpgradeNode.active = true;
            canUpgradeNode.active = isShow && !this._isClickGroup && !this.fullWeaponNode.active;
            if (isShow) {
                let x = this._canUpgradeIndex == 0 ? -189 : (this._canUpgradeIndex == 1 ? 90 : 233);
                canUpgradeNode.x = x;
                // canUpgradeNode.x = index == this._curSelIndex ? 103 : 80;
                if (this.canUpgradeSpFrameArr) {
                    // let spFrame = canReplace ? this.canUpgradeSpFrameArr[1] : this.canUpgradeSpFrameArr[0];
                    let spTextFrame = canReplace ? this.canUpgradeSpFrameArr[3] : this.canUpgradeSpFrameArr[2];
                    // canUpgradeNode.getComponent(cc.Sprite).spriteFrame = spFrame;
                    let imgText = cc.find("canUpgrade/imgText", canUpgradeNode);
                    imgText.getComponent(cc.Sprite).spriteFrame = spTextFrame;
                }
            }
        }
        // }
    }

    updateCanUpgradeNodeByArray(arr: Array<number> = [0, 1, 2]) {
        this.updateCanUpgradeNode(0);

        // for(let i = 0; i < arr.length; ++i){
        //     this.updateCanUpgradeNode(arr[i]);
        // }
    }

    getHaveNewWeapon() {
        let isNew = false;
        let userVo = GameVoManager.getInstance.myUserVo;
        let weaponList = userVo.weaponList
        for (let i in weaponList) {
            if (!Manager.storage.getBool(String(i))) {
                isNew = true;
                break;
            }
        }
        return isNew;
    }
}
