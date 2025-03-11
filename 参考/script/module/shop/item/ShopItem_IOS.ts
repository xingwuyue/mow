import { WeaponCfg } from "../../../config/WeaponCfg";
import { DropCfg } from "../../../config/DropCfg";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { GameVoManager } from "../../../manager/GameVoManager";
import { Manager } from "../../../manager/Manager";
import { Const } from "../../../config/Const";
import { AlertManager } from "../../../alert/AlertManager";
import { UIManager } from "../../../framework/UIManager";
import { Common_UIPath, ShareCode } from "../../../common/Common_Define";
import { MVC } from "../../../framework/MVC";

let iconbgcolor = ['#3a353d', '#0c7edb', '#e98e48', '#A383FF'];

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem_IOS extends cc.Component {

    private _type: number = 0;//0武器  1道具item
    private _data: WeaponCfg | DropCfg;

    @property(cc.Label)
    itemName: cc.Label = null;

    @property([cc.Node])
    bgList: cc.Node[] = [];

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Node)
    grayBg: cc.Node = null;

    @property(cc.Node)
    iconBg: cc.Node = null;

    @property(cc.Node)
    btnBuy: cc.Node = null;

    @property(cc.Node)
    btnUpgrade: cc.Node = null;

    @property(cc.Node)
    btnTry: cc.Node = null;

    @property(cc.Node)
    btnAway: cc.Node = null;

    @property(cc.Node)
    btnExchange: cc.Node = null;

    @property(cc.Node)
    chipNode: cc.Node = null;

    @property(cc.Label)
    lb_tips: cc.Label = null;

    @property(cc.Label)
    lb_desc: cc.Label = null;

    private _index: number = 0;
    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    init(index: number, type: number, weaponcfg: WeaponCfg, toolCfg: DropCfg) {
        this._index = index;
        this._type = type;
        if (type == 0 || type == 1) {
            this._data = weaponcfg;
            this.itemName.string = this._data.name;
            Manager.spAtlas.getWeaponIcon(this._data.id).then((res) => {
                this.setPic(res);
            })
        } else if (type == 2) {
            this._data = toolCfg;
            this.itemName.string = this._data.name;
            if (this._data.toolType == 2) {
                Manager.spAtlas.getWeaponIcon(this._data.weaponId).then((res) => {
                    this.setPic(res);
                })
            } else {
                Manager.spAtlas.getToolIcon(this._data.id).then((res) => {
                    this.setPic(res);
                })
            }
        }
        this.updateInfo(type);
    }

    public setPic(res) {
        this.icon.spriteFrame = res;
        let ratio = this.icon.node.height / this.icon.node.width;
        this.icon.node.width = cc.misc.clampf(this.icon.node.width, 50, 150);
        this.icon.node.height = this.icon.node.width * ratio;
    }

    public onClick() {
        if (this.grayBg.active) return
        Notifier.send(ListenID.Shop_SelectItem, this._index, this._type);
        Manager.audio.playAudio(501);
    }

    public onUpgrade() {
        GameVoManager.getInstance.myUserVo.defaultGunId = this._data.id;
        Notifier.send(ListenID.Shop_Close);
    }

    /**
     * 
     * @param type 0 钻石 1普通武器 2道具
     */
    public updateInfo(type: number) {
        this.bgList[0].active = type == 1 || type == 2;
        this.bgList[1].active = type == 0 || this._data.unlockWay[0] == 11 || this._data.unlockWay[0] == 8;
        if (type == 0 || type == 1) {
            this.bgList[2].active = this._data.id == GameVoManager.getInstance.myUserVo.defaultGunId;
            this.grayBg.active = !(GameVoManager.getInstance.myUserVo.weaponList[this._data.id] || this._data.id == GameVoManager.getInstance.myUserVo.defaultGunId);
        } else {
            this.grayBg.active = !GameVoManager.getInstance.myUserVo.dropList[this._data.id];
            this.bgList[2].active = false;
        }
        if (this.bgList[0].active) {
            this.iconBg.color = cc.Color.WHITE.fromHEX(iconbgcolor[1]);
        } else if (this.bgList[1].active) {
            this.iconBg.color = cc.Color.WHITE.fromHEX(iconbgcolor[3]);
        } else {
            this.iconBg.color = cc.Color.WHITE.fromHEX(iconbgcolor[0]);
        }
        if (this.bgList[2].active) {
            this.iconBg.color = cc.Color.WHITE.fromHEX(iconbgcolor[2]);
        }
        this.lb_tips.node.active = !(GameVoManager.getInstance.myUserVo.weaponList[this._data.id] || GameVoManager.getInstance.myUserVo.dropList[this._data.id]);
        this.lb_desc.node.active = type == 2 && GameVoManager.getInstance.myUserVo.dropList[this._data.id];
        if (type == 0 || type == 1) {
            this.btnTry.active = !GameVoManager.getInstance.myUserVo.weaponList[this._data.id];
            if (this.btnTry.active) {
                this.btnTry.getChildByName("try").active = (this._data.unlockWay[0] == 9 || this._data.unlockWay[0] == 10) ? false : true;
                this.btnTry.getChildByName("get").active = (this._data.unlockWay[0] == 9 || this._data.unlockWay[0] == 10) ? true : false;
            }
            this.btnAway.active = (!!GameVoManager.getInstance.myUserVo.weaponList[this._data.id] && GameVoManager.getInstance.gameSwitchVo.gunAway) ? true : false;
            this.btnUpgrade.active = (!!GameVoManager.getInstance.myUserVo.weaponList[this._data.id] && !GameVoManager.getInstance.gameSwitchVo.gunAway) ? true : false;;
            this.showIOSUI();
        }
        if (this.lb_desc.node.active) {
            let data = this._data as DropCfg;
            this.lb_desc.string = data.intro;
        }
        this.updateMemberWeapon();
        this.showLabelTips();
    }

    public showIOSUI() {

    }

    public showLabelTips() {
        if (this._data.unlockWay[0] == 1) {
            this.lb_tips.string = this._data.unlockWay[1] + "关后解锁";
        } else if (this._data.unlockWay[0] == 3) {
            this.lb_tips.string = "签到解锁";
        } else if (this._data.unlockWay[0] == 4) {
            this.lb_tips.string = "分享解锁";
        } else if (this._data.unlockWay[0] == 5) {
            this.lb_tips.string = "视频解锁";
        } else if (this._data.unlockWay[0] == 7) {
            this.lb_tips.node.active = false;
            this.btnBuy.active = !GameVoManager.getInstance.myUserVo.weaponList[this._data.id];
            this.btnBuy.getChildByName("Background").getChildByName("lb_num").getComponent(cc.Label).string = `${this._data.unlockWay[1]}`;
        } else if (this._data.unlockWay[0] == 8) {
            this.lb_tips.string = "会员解锁";
        } else if (this._data.unlockWay[0] == 9) {
            this.lb_tips.string = "转盘解锁";
        } else if (this._data.unlockWay[0] == 10) {
            this.lb_tips.string = `邀请${this._data.unlockWay[1]}人解锁！`;
        }
    }

    public onBtnBuy() {
        if (GameVoManager.getInstance.myUserVo.diamond >= this._data.unlockWay[1]) {
            Manager.audio.playAudio(509);
            GameVoManager.getInstance.myUserVo.weaponList[this._data.id] = [0, 0, 0];
            GameVoManager.getInstance.setDiamond(-this._data.unlockWay[1]);
            this.grayBg.active = false;
            this.btnBuy.active = false;
            this.btnUpgrade.active = true;
            this.iconBg.color = cc.Color.WHITE.fromHEX(iconbgcolor[3]);
            this.bgList[2].active = true;
            // AlertManager.showNormalTips("购买成功!");
            Notifier.send(ListenID.Shop_UnLock, [this._index], [this._data.id])
            // HD_MODULE.getNet().postGameEvent({ event_name: `weapon_${this._data.id}`, counter: 1 });
            UIManager.Open(Common_UIPath.RewardUI, MVC.eTransition.Scale, MVC.eUILayer.Popup, this._data as WeaponCfg);

        } else {
            UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
        }
    }

    public onBtnTry() {
        console.log("***** way:", this._data.unlockWay[0]);

        if (this._data.unlockWay[0] == 9) {
            UIManager.Open(Common_UIPath.MainDrawUI, MVC.eTransition.Scale, MVC.eUILayer.Tips);
            return
        }
        if (this._data.unlockWay[0] == 10) {
            UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
            return
        }
        // if(GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes){
        //     HD_MODULE.getPlatform().openShareByShareTemplateRand(ShareCode.gunTry, {
        //         success: () => {
        //             GameVoManager.getInstance.myUserVo.shareTimes ++;
        //             this.tryCallFunc();
        //         },
        //         fail: () => {}
        //     });
        // }else{
        this.tryCallFunc();
        // }
    }

    public onBtnAway() {

    }

    public onExchange() {
        console.log("***** way:", this._data.unlockWay[0]);

        if (GameVoManager.getInstance.myUserVo.weaponChip >= this._data.unlockWay[1]) {
            GameVoManager.getInstance.myUserVo.weaponList[this._data.id] = [0, 0, 0];
            // GameVoManager.getInstance.myUserVo.weaponChip -= this._data.unlockWay[1];
            GameVoManager.getInstance.addWeaponChip(-this._data.unlockWay[1]);
            GameVoManager.getInstance.saveData();
            UIManager.Open(Common_UIPath.RewardUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, this._data);
            Notifier.send(ListenID.Shop_Close, 1);
        } else {
            AlertManager.showNormalTips("碎片不足！")
        }
    }

    public tryCallFunc() {
        // HD_MODULE.getNet().postGameEvent({ event_name: 'gunTry', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "gunTry" });
        if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
            AlertManager.showNormalTips("体力不足！无法进入游戏");
        } else {
            GameVoManager.getInstance.myUserVo.freeWeaponId = this._data.id;
            Notifier.send(ListenID.Close_FreeWeapon);
            Notifier.send(ListenID.Shop_Close, 1);
            Notifier.send(ListenID.Free_Weapon_Video_Success);
            Notifier.send(ListenID.Log_Event, { event_name: "video_gunTry" });

            // Notifier.send(ListenID.Shop_Box_Video_Success);
        }
    }


    public updateMemberWeapon() {
        let member = GameVoManager.getInstance.getIsMember();
        if (this._type == 0 && member) {
            this.bgList[0].active = false;
            this.bgList[1].active = true;
            this.bgList[2].active = this._data.id == GameVoManager.getInstance.myUserVo.defaultGunId;
            this.grayBg.active = false;
            this.iconBg.color = cc.Color.WHITE.fromHEX(iconbgcolor[3]);
            this.btnUpgrade.active = !!GameVoManager.getInstance.myUserVo.weaponList[this._data.id];
        }
    }

    public get Id(): number {
        return this._data.id;
    }

    public updateState() {
        this.updateInfo(this._type);
    }

    public refreshItemChip() {
        if (this.chipNode.active) {
            this.chipNode.getChildByName("lb_num").getComponent(cc.Label).string = `${GameVoManager.getInstance.myUserVo.weaponChip}/${this._data.unlockWay[1]}`;
            if (!GameVoManager.getInstance.myUserVo.weaponList[this._data.id] && this._data.unlockWay[0] == 11 && GameVoManager.getInstance.myUserVo.weaponChip >= this._data.unlockWay[1]) {
                this.btnExchange.active = true;
                this.btnTry.active = false;
            }
        }
    }
}
