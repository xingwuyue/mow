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
import { Const } from "../../config/Const";
import GroupModel from "./GroupModel";
import { Util } from "../../utils/Util";
import { AudioType } from "../../manager/AudioManager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, ShareCode } from "../../common/Common_Define";

const { ccclass, property } = cc._decorator;



@ccclass
export default class GroupView extends MVC.BaseView {

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
    fullLevelNode: cc.Node = null;

    // @property(cc.Node)
    // btnUpdgrade2: cc.Node = null;

    // @property(cc.Node)
    // limitedSpecialText: cc.Node = null;

    // @property(cc.Node)
    // starList: cc.Node = null;

    // @property(cc.Sprite)
    // weaponHotType: cc.Sprite = null;

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
    _guideStep6: boolean = false;

    _controArrow: boolean = false;

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
    }

    private _rigisterGuideNodeTag() {
        let userData = GameVoManager.getInstance.myUserVo;
        // if ((!Manager.storage.getNumber("guide_step_1") && userData.topLevel == 2 && userData.roleLvs[0] == 0)) {
        //     let btnRole = cc.find("node/toggle0", this.node);
        //     Notifier.send(ListenID.Guide_RigisterNodeTag, {
        //         node: btnRole, tag: 10001, callBack: () => {
        //             this.onClickToggle(null, "0");
        //         }
        //     });
        // }
        // if (!Manager.storage.getNumber("guide_step_5") && userData.topLevel == 5 && userData.defaultGunId == 105) {
        //     let btnWeapon = cc.find("node/toggle1", this.node);
        //     Notifier.send(ListenID.Guide_RigisterNodeTag, {
        //         node: btnWeapon, tag: 10002, callBack: () => {
        //             this.onClickToggle(null, "1");
        //         }
        //     });
        // }
    }

    private _rigisterGuideNodeTag1() {
        let userData = GameVoManager.getInstance.myUserVo;
        // if (!Manager.storage.getNumber("guide_step_1") && userData.topLevel == 2 && userData.roleLvs[0] == 0) {
        //     let upgrade_0 = cc.find("node/detail0/bg/attPanel/btnUpgrade0", this.node);
        //     Notifier.send(ListenID.Guide_RigisterNodeTag, {
        //         node: upgrade_0, tag: 10101, callBack: () => {
        //             this.onUpgradeClick(null, 0);
        //             Notifier.send(ListenID.Show_WeaponLockNode);
        //         }
        //     });
        //     this._guideStep1 = true;
        // }
        // if (!Manager.storage.getNumber("guide_step_5") && userData.topLevel == 5 && userData.defaultGunId == 105) {
        //     let weaponNode = this.gunList[3];
        //     Notifier.send(ListenID.Guide_RigisterNodeTag, {
        //         node: weaponNode, tag: 10204, callBack: () => {
        //             // console.log("=============新武器", Cfg.Weapon.find({ sortIndex: 10 }).id)
        //             this.onSelected(Cfg.Weapon.find({ sortIndex: 10 }).id, 1);
        //             Notifier.send(ListenID.Show_WeaponLockNode);
        //         }
        //     });
        // }
        this.guideUpgrade();
    }

    guideUpgrade() {
        // if (this._guideStep1) {
        //     let btn = this.btnList[0];
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
    }

    public showWeaponUpgrade(data: number = 1) {
        if (data == 1) {
            this.onSelected(GameVoManager.getInstance.myUserVo.defaultGunId, 0);
            this.tips_left.active = true;
            this.tips_right.active = false;
            if (this._lastPage == 1 && this._showPanel) {
                this.scorllToDefaultPos();
                return;
            }

        } else {
            this.tips_left.active = false;
            this.tips_right.active = false;
        }
        this.fullWeaponNode.active = false;
        this.upgradeFire.active = false;
        this.newWeapon.active = false;
        this.fullLevelNode.active = false;
        this._curPage = data;
        this.scrollView.active = data == 1;
        this.setBgHeightByType(1);
        this.changeBtnPic(this._curPage, true);
        if (this._curPage != this._lastPage && this._lastPage != undefined) {
            this.changeBtnPic(this._curPage, true);
            this.changeBtnPic(this._lastPage, false);
            this.datailAction(2);
        } else {
            // if (this._showPanel) {
            //     this.datailAction(0);
            // } else {
            this.datailAction(1);
            // }
            this.showPageUI();
            this.refreshGroup();
        }
        this.updateAttribute();
        this._lastPage = this._curPage;
    }

    public onSelected(id, index) {
        if (index == this.gunList.length) {
            this.onMoreClick();
        } else {
            if (GameVoManager.getInstance.myUserVo.fullWeapon == id) {
                GameVoManager.getInstance.myUserVo.fullCapacity = GameVoManager.getInstance.myUserVo.fullWeapon;
                GameVoManager.getInstance.myUserVo.fullWeapon = 0;
                this.fullLevelNode.active = false;
                this.refreshSelect(id, index);

                if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
                    AlertManager.showNormalTips("体力不足！无法进入游戏");
                } else {
                    Notifier.send(ListenID.Close_FreeWeapon);
                } GameVoManager.getInstance.myUserVo.fullCapacity = GameVoManager.getInstance.myUserVo.fullWeapon;
                GameVoManager.getInstance.myUserVo.fullWeapon = 0;
                this.fullLevelNode.active = false;
                this.refreshSelect(id, index);

                if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
                    AlertManager.showNormalTips("体力不足！无法进入游戏");
                } else {
                    Notifier.send(ListenID.Close_FreeWeapon);
                }

                return;
            } else {
                this.refreshSelect(id, index);
            }
        }
    }

    public refreshSelect(id, index) {
        console.log("refreshSelect", id, !!GameVoManager.getInstance.myUserVo.weaponList[id])
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
                this.gunList[i].getComponent(GroupItem).updateSelected();
            }
            Notifier.send(ListenID.Change_Weapon);
            this.updateAttribute();
        } else {
            let cfg = Cfg.Weapon.get(id);
            console.log("cfg", cfg.unlockWay, !GameVoManager.getInstance.getIsMember())
            if (cfg.unlockWay[0] == 1) {
                AlertManager.showNormalTips(`第${cfg.unlockWay[1]}关胜利解锁！`)
            } else if (cfg.unlockWay[0] == 3) {
                AlertManager.showNormalTips(`签到第${cfg.unlockWay[1]}天解锁！`)
            } else if (cfg.unlockWay[0] == 7) {
                Notifier.send(ListenID.Shop_Open);
            } else if (cfg.unlockWay[0] == 8) {
                if (!GameVoManager.getInstance.getIsMember()) {
                    UIManager.Open(Common_UIPath.MemberUI, MVC.eTransition.Scale, MVC.eUILayer.Tips);
                }
            } else if (cfg.unlockWay[0] == 9) {
                UIManager.Open(Common_UIPath.MainDrawUI, MVC.eTransition.Scale, MVC.eUILayer.Tips);
            } else if (cfg.unlockWay[0] == 10) {
                UIManager.Open(Common_UIPath.InviteWeaponUI);
            } else if (cfg.unlockWay[0] == 11) {
                Notifier.send(ListenID.Shop_Open);
            }
        }
        if (this._curPage == 1) {
            this.refreshGroup();
        }
    }
    public updateGroup(indexlist, idlist) {
        let len = this.gunList.length;
        for (let i = 0; i < len; i++) {
            this.gunList[i].getComponent(GroupItem).updateUnLock(idlist[0]);
        }
    }

    public updateGroupGold(type) {
        if (type && type == 2) return;
        this.updateToggleBtn();
        this.refreshGroup();
    }

    public unlockNewWeapon() {
        this.newWeapon.active = GameVoManager.getInstance.myUserVo.unlockNewWeapon && this.guideCompelete();
    }

    // 满级试用
    public showFullWeapon() {
        this.fullLevelNode.active = false;
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
            this.fullLevelNode.active = true;
            // //console.log("GameVoManager.getInsta", GameVoManager.getInstance.myUserVo.fullWeapon, key);
        } else {
            this.fullWeaponNode.active = false;
            GameVoManager.getInstance.myUserVo.fullWeapon = 0;
        }
        // //console.log("showFullWeapon", GameVoManager.getInstance.myUserVo.fullWeapon);
    }

    //升级火力更强力
    public showUpgradeFire() {
        // if (GameVoManager.getInstance.stateVo.levelFailTimes >= Const.failWeaponUpgradeTimes) {
        if (GameVoManager.getInstance.myUserVo.gold >= Util.getUpgradeFireGold() && this.guideCompelete()) {
            this.upgradeFire.active = true;
        }
        // }
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        if (!this.fullWeaponNode)
            this.fullWeaponNode = this.panelNode.getChildByName("fullWeapon");
        if (!this.upgradeFire)
            this.upgradeFire = this.panelNode.getChildByName("upgradeFire");
        let offset = 0;
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.panelNode.y = -size.height * 0.5 + offset;
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
            this.gunList[i].getComponent(GroupItem).initInfo(gundata[i].id, i, gundata[i]);
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
                    this.gunList[id].getComponent(GroupItem).updateUnLock(unlockid);
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
            } else if (index == 1) {   //暴击
                limitLabel && (limitLabel.active = false);
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
        if (this._showPanel)
            this.onClickToggle(null, this._curPage + "");
        this._controArrow = false;
    }

    public onUpgradeClick(target, customdata: number) {
        Manager.audio.playAudio(510, AudioType.UI, 0);
        let gold = 0;
        let allgold = GameVoManager.getInstance.myUserVo.gold;
        if (this._curPage == 0) {
            if (customdata == 0) {         //火力
                gold = Util.getUpgradeFireGold();

            } else if (customdata == 1) {   //暴击
                gold = Util.getUpgradeLifeGold();

            }
        } else if (this._curPage == 1) {
            let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
            if (customdata == 0) {         //射速
                gold = Util.getUpgradeSpeedGold();

            } else if (customdata == 1) {   //火力成长
                let lv = GameVoManager.getInstance.myUserVo.weaponList[gunId][1];
                gold = Util.getWeaponHotUpgradeGoldByLevel(lv);

            } else if (customdata == 2) {//特性成长

            }
        } else if (this._curPage == 2) {
            if (customdata == 0) {         //计时收益
                gold = Util.getUpgradeTimeGold();

            } else if (customdata == 1) {   //杀怪收益
                gold = Util.getUpgradeKillGold();

            }
        }
        let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
        if (gold > allgold) {
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

            }
            return;
        } else {
            if (this._curPage == 0 && customdata == 0) {
                GameVoManager.getInstance.myUserVo.roleLvs[0] += 1;

            } else if (this._curPage == 0 && customdata == 1) {
                GameVoManager.getInstance.myUserVo.roleLvs[1] += 1;

            } else if (this._curPage == 1 && customdata == 0) {
                GameVoManager.getInstance.myUserVo.weaponList[gunId][0] += 1;

            } else if (this._curPage == 1 && customdata == 1) {
                let firelv = GameVoManager.getInstance.myUserVo.roleLvs[0] || 0;
                if (firelv <= GameVoManager.getInstance.myUserVo.weaponList[gunId][1]) {
                    AlertManager.showNormalTips("人物火力等级不足");
                    return;
                } else {
                    GameVoManager.getInstance.myUserVo.weaponList[gunId][1] += 1;
                }
            }
            else if (this._curPage == 2 && customdata == 0) {
                GameVoManager.getInstance.myUserVo.goldRewardLvs[0] += 1;

            } else if (this._curPage == 2 && customdata == 1) {
                GameVoManager.getInstance.myUserVo.goldRewardLvs[1] += 1;

            }
            if (this._curPage == 1 && customdata == 2) {
                GameVoManager.getInstance.setDiamond(-gold, 2);
            } else {
                GameVoManager.getInstance.setGold(-gold, 2);
            }
            this.refreshGroup();
        }

        this.showUpgradeAnima();
        this.updateToggleBtn();
        this.updateAttribute();
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
        this.fullWeaponNode.active = false;
        this.fullLevelNode.active = data == "1" && this.fullWeaponNode.active ? true : false;
        this.newWeapon.active = false;
        if (data == "0") {
            this._curPage = 0;
            this.scrollView.active = false;
            this.tips_left.active = false;
            this.tips_right.active = false;
            // this.limitedSpecialText.parent.active = false;
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
        } else {
            this._curPage = 2;
            this.scrollView.active = false;
            this.tips_left.active = false;
            this.tips_right.active = false;
            // this.limitedSpecialText.parent.active = false;
            this.setBgHeightByType(2);
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
        this.datailAction(actionNum).then(() => {
            this._rigisterGuideNodeTag1();
        });
        this._controArrow = true;
        this.updateArrow();
        this.updateAttribute();
        this._lastPage = this._curPage;
    }

    changeBtnPic(index: number, choose: boolean) {
        this.toggleList[index].getChildByName("Background").active = !choose;
        this.toggleList[index].getChildByName("checkmark").active = choose;
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

            let dt = 0.10;
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
                            if (this.scrollView)
                                this.scrollView.active = false;
                        }
                        if (curtemp == 1 && lasttemp != 1) {
                            if (this.scrollView)
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
                upgradeIcon.active = showRedPoint;
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
                upgradeIcon.active = showRedPoint;
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
                upgradeIcon.active = showRedPoint;
                if (showRedPoint) {
                    let action = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1.7), cc.scaleTo(0.2, 1.7, 1.1)));
                    action.setTag(1);
                    upgradeIcon.runAction(action);
                }
            }
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
                cur_0 = Util.RolePowerAndLifeByLevel(lv_0).toFixed(1);
                cur_1 = Util.RoleDoubleHitByLevel(lv_1);
            } else if (this._curPage == 1) {
                let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
                lv_0 = GameVoManager.getInstance.myUserVo.weaponList[gunId][0] + 1;
                lv_1 = GameVoManager.getInstance.myUserVo.weaponList[gunId][1] + 1;
                if (GameVoManager.getInstance.myUserVo.fullCapacity == gunId) {
                    lv_0 = Const.maxShootSpeedLv;
                    // lv_1 = Const.fireHotLv;
                }
                cur_0 = Util.WeaponSpeedAndPowerByLevel(lv_0).toFixed(1);
                cur_1 = Util.WeaponSpeedAndPowerByLevel(lv_1).toFixed(1);
                // this.setSpecial(gunId);
            }
            let per = this._curPage == 0 ? "" : "%";
            this.attList[0].getChildByName("lb_cur").getComponent(cc.Label).string = Util.numFormat(Number(cur_0)) + "%";
            this.attList[1].getChildByName("lb_cur").getComponent(cc.Label).string = Util.numFormat(Number(cur_1)) + per;
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
            if (GameVoManager.getInstance.myUserVo.fullWeapon == items[i].getComponent(GroupItem)._idx) {
                this.fullLevelNode.x = viewPos.x - 360;
            }
            if (viewPos.x < -90 || viewPos.x > 800) {
                items[i].getComponent(GroupItem).showNode(false);
            } else {
                items[i].getComponent(GroupItem).showNode(true);
            }
        }

        this.lastContentPosX = this.gunContent.x;
    }

    public setBgHeightByType(type: number) {
        // if (type == 0 || type == 2) {
        if (this.nameList[0]) {
            this.nameList[0].parent.parent.parent.height = 200;
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
        // let weapondata = Cfg.Weapon.get(gunId);
        // if (!weapondata || weapondata.effectType == 0) {
        //     this.limitedSpecialText.getComponent(cc.Label).string = "后续开放";
        //     this.limitedSpecialText.active = true;
        //     this.btnUpdgrade2.active = false;
        //     let childlen = this.starList.childrenCount;
        //     for (let i = 0; i < childlen; i++) {
        //         this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        //     }
        //     let node = this.weaponHotType.node.parent.getChildByName("hotText");
        //     this.weaponHotType.node.active = false;
        //     node.active = true;
        // } else {
        //     Manager.spAtlas.getSpecialProIcon(Util.getSpecialWeaponHotStringByType(weapondata.effectType)).then(res => {
        //         this.weaponHotType.spriteFrame = res;
        //     })
        //     let node = this.weaponHotType.node.parent.getChildByName("hotText");
        //     node.active = false;
        //     this.weaponHotType.node.active = true;
        //     let childlen = this.starList.childrenCount;
        //     let weaponinfo = GameVoManager.getInstance.myUserVo.weaponList[gunId];
        //     if (!weaponinfo) {
        //         for (let i = 0; i < childlen; i++) {
        //             this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        //         }
        //     } else {
        //         for (let i = 0; i < childlen; i++) {
        //             if (i < weaponinfo[2])
        //                 this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
        //             else
        //                 this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        //         }
        //     }
        // }
    }

    // 新手指引是否完成
    public guideCompelete(): boolean {
        let userData = GameVoManager.getInstance.myUserVo;
        if (userData.topLevel > 5) {
            return true;
        }
        if (!Manager.storage.getNumber("guide_step_1") && userData.topLevel == 2 && userData.roleLvs[0] == 0) {
            return false;
        } else if (!Manager.storage.getNumber("guide_step_5") && userData.topLevel == 5 && userData.defaultGunId == 105) {
            return false;
        }
        return true
    }
}
