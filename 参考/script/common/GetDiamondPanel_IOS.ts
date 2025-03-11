import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import { GameVoManager } from "../manager/GameVoManager";
import { ShareCode, Common_UIPath } from "./Common_Define";
import { Util } from "../utils/Util";
import { AudioType } from "../manager/AudioManager";
import { NotifyID } from "../framework/NotifyID";
import { WXSDK } from "../sdk/WXSDK";
import { UIManager } from "../framework/UIManager";
import { AlertManager } from "../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetDiamondPanel_IOS extends MVC.BaseView {
    @property(cc.Label)
    desc: cc.Label = null;

    @property(cc.Label)
    lb_num: cc.Label = null;

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null;

    @property(cc.Sprite)
    close_chest: cc.Sprite = null;

    @property(cc.Sprite)
    open_chest: cc.Sprite = null;

    @property(cc.Node)
    btn_again: cc.Node = null;

    @property(cc.Node)
    ui: cc.Node = null;

    @property(cc.Button)
    btnBGClose: cc.Button = null;

    @property(cc.SpriteFrame)
    boxIcon: cc.SpriteFrame[] = [];

    _data = null;
    _animationFinish: boolean = false;

    _konwNode: cc.Node = null;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GoldEffect_End, this.onClose, this);
        Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.bannerResize, this);
        Notifier.changeListener(enable, ListenID.Close_GetDiamondPanel, this.close, this);
    }

    bannerResize() {
        if (!GameVoManager.getInstance.gameSwitchVo.banner) return
        // this.schedule(()=>{
        //     this._konwNode.position = cc.v2(0, WXSDK.bannerY);
        // }, 0.5)
    }

    /**
     * 
     * @param args {type:0钻石，1武器，2道具, 3宝箱开启， num:数量|id}
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this._data = args;
        Manager.audio.playAudio(501, AudioType.UI);
        this.initInfo();
        this.animationFinish();
        // this._konwNode = cc.find("ui/konwBtn", this.node);
        // this._konwNode.position = (GameVoManager.getInstance.gameSwitchVo.banner && !GameVoManager.getInstance.myUserVo.boxBannerClick) ? cc.v2(0, -600) : cc.v2(0, -350);
        this.scheduleOnce(() => {
            Notifier.send(ListenID.ShowBanner, 1, "box", false);
        }, 1);
        this.btnBGClose.enabled = false;

        this.initIOS_UI();
    }

    initIOS_UI() {
        let btnKnow = cc.find("ui/knowBtn", this.node);
        if (btnKnow) {
            btnKnow.active = false;
        }
    }

    public animationFinish() {
        this.node.getComponent(cc.Animation).on("finished", () => {
            this._animationFinish = true;
            this.btnBGClose.enabled = true;
            if (this._data.type == 3 && this._data.boxData)
                this.goldEffectShow(this._data.boxData.type);
        }, this)
    }

    initInfo() {
        this.btn_again.active = this._data.type == 3 && GameVoManager.getInstance.myUserVo.treasureBox > 0 ? true : false;
        if (this._data.type == 0) {
            Manager.spAtlas.getDiamondIcon("img_zs").then((res) => {
                this.itemSprite && (this.itemSprite.spriteFrame = res);
            })
            Manager.spAtlas.getDiamondIcon("img_chest_zs").then((res) => {
                this.close_chest && (this.close_chest.spriteFrame = res);
            })
            Manager.spAtlas.getDiamondIcon("img_chest_zs2").then((res) => {
                this.open_chest && (this.open_chest.spriteFrame = res);
            })
            this.lb_num.node.active = true;
            this.lb_num.string = `${this._data.id}`;
            GameVoManager.getInstance.setDiamond(this._data.id);
        } else if (this._data.type == 1 || this._data.type == 2) {
            this.lb_num.node.active = false;
            if (this._data.type == 1) {
                GameVoManager.getInstance.myUserVo.unlockNewWeapon = this._data.id;
                Manager.spAtlas.getWeaponIcon(this._data.id).then((res) => {
                    this.itemSprite && (this.itemSprite.spriteFrame = res);
                })
                let obj = Cfg.Weapon.get(this._data.id);
                this.lb_num.node.parent.getChildByName("label").getComponent(cc.Label).string = obj.name;
                if (!GameVoManager.getInstance.myUserVo.weaponList[this._data.id]) {
                    GameVoManager.getInstance.myUserVo.weaponList[this._data.id] = [0, 0];
                }
                Manager.spAtlas.getDiamondIcon("img_chest_wq").then((res) => {
                    this.close_chest && (this.close_chest.spriteFrame = res);
                })
                Manager.spAtlas.getDiamondIcon("img_chest_wq2").then((res) => {
                    this.open_chest && (this.open_chest.spriteFrame = res);
                })
            }
            if (this._data.type == 2) {
                let obj = Cfg.Drop.get(this._data.id);
                if (obj.toolType == 2) {
                    Manager.spAtlas.getWeaponIcon(obj.weaponId).then((res) => {
                        this.itemSprite.spriteFrame = res;
                    })
                } else {
                    Manager.spAtlas.getToolIcon(obj.id).then((res) => {
                        this.itemSprite.spriteFrame = res;
                    })
                }
                this.lb_num.node.parent.getChildByName("label").getComponent(cc.Label).string = obj.name;
                if (!GameVoManager.getInstance.myUserVo.dropList[this._data.id]) {
                    GameVoManager.getInstance.myUserVo.dropList[this._data.id] = 1;
                }
                Manager.spAtlas.getDiamondIcon("img_chest_dj").then((res) => {
                    this.close_chest.spriteFrame = res;
                })
                Manager.spAtlas.getDiamondIcon("img_chest_dj2").then((res) => {
                    this.open_chest.spriteFrame = res;
                })
            }
        } else if (this._data.type == 3) {
            this.close_chest && (this.close_chest.spriteFrame = this.boxIcon[0]);
            this.open_chest && (this.open_chest.spriteFrame = this.boxIcon[1]);
            this.initOpenBoxUI();
        }
    }

    public initOpenBoxUI() {
        let args = this._data.boxData;
        if (args.type == 1 || args.type == 2 || args.type == 3 || args.type == 4) {
            Manager.spAtlas.getResIcon(args.icon).then((res) => {
                this.itemSprite.spriteFrame = res;
            })
            if (args.type == 1) {
                let goldStr = Util.goldFormat(args.num);
                this.desc.string = `${args.text}`;
                this.lb_num.string = `x${goldStr}`;
            } else {
                this.desc.string = `${args.text}`;
                this.lb_num.string = `x${args.num}`;
            }
        } else if (args.type == 5) {
            Manager.spAtlas.getWeaponIcon(args.num).then((res) => {
                this.itemSprite.spriteFrame = res;
            })
            this.desc.string = `${args.text}`;
            this.lb_num.string = `x${1}`;
        }
    }

    public btnKnow() {
        if (this._data.boxData) {
            super.onClose();
        } else {
            if (false && Cfg.Barrier.get(GameVoManager.getInstance.myUserVo.topLevel) && GameVoManager.getInstance.gameSwitchVo.extraReward) {
                Manager.audio.playAudio(501, AudioType.UI);
                this.ui.active = false;
                UIManager.Open(Common_UIPath.GetExtraReward);
            } else {
                this.onClose();
            }
        }
    }

    onOpenAgain() {
        super.onClose();
        if (GameVoManager.getInstance.myUserVo.treasureBox <= 0) {
            AlertManager.showNormalTips("宝箱不足！");
            return
        }
        Notifier.send(ListenID.Open_TreasureBox);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        if (!this._animationFinish) return
        try {
            this.node.getComponent(cc.Animation).off("finished", () => {
                this._animationFinish = true;
            }, this)
        } catch (error) {
            console.error(error);
        }
        super.onClose();
        Manager.audio.playAudio(501, AudioType.UI);
        if (this._data.type != 3) {
            Notifier.send(ListenID.GetRewardClose, 0, { isWin: this._data.isWin });
            Notifier.send(ListenID.HideBanner);
        }
    }


    // update (dt) {}
    public goldEffectShow(type?: number) {
        if (type == 1) { //飞金币
            Util.showGoldEffect(this.node, 10, cc.v2(0, 290), cc.v2(-317, 594), 0.1, 0, 1);
        } else if (type == 2) { //飞钻石
            Util.showGoldEffect(this.node, 10, cc.v2(0, 290), cc.v2(0, 594), 0.1, 0, 2);
        } else if (type == 4) { //飞碎片
            Util.showGoldEffect(this.node, 10, cc.v2(0, 290), cc.v2(-256, 460), 0.1, 0, 3);
        }
    }
}
