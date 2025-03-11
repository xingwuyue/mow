import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import BtnRewardMultView from "../module/component/button/BtnRewardMultView";
import { AudioType } from "../manager/AudioManager";
import { GameVoManager } from "../manager/GameVoManager";
import NetAdapter from "../adpapter/NetAdapter";
import { AlertManager } from "../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetRewardPanel_IOS extends MVC.BaseView {

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null;

    @property(cc.Label)
    goodsName: cc.Label = null;

    @property(cc.Node)
    goldSprite: cc.Node = null;

    @property(cc.Node)
    diamondSprite: cc.Node = null;

    @property(cc.Node)
    btn_extra: cc.Node = null;

    _args: any;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Refresh_ShareTimes, this.refreshBtnStatus, this);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501, AudioType.UI);
    }

    /**
     * 
     * @param args {type:0金币，1武器，2道具，3钻石, num:数量|id}
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this._args = args;
        Manager.audio.playAudio(509);
        this.showExtraBtn(args);
        if (args.type == 0) {
            this.itemSprite.node.active = false;
            this.diamondSprite.active = false;
            this.goldSprite.active = true;
            this.goodsName.string = `金币x${args.num}`;
        } else if (args.type == 1) {
            this.itemSprite.node.active = true;
            this.goldSprite.active = false;
            this.diamondSprite.active = false;
            let data = Cfg.Weapon.get(args.num);
            Manager.spAtlas.getWeaponIcon(args.num).then(res => {
                this.itemSprite.spriteFrame = res;
            });
            if (data) {
                this.goodsName.string = data.name;
            }

        } else if (args.type == 2) {
            this.itemSprite.node.active = true;
            this.goldSprite.active = false;
            this.diamondSprite.active = false;
            let data = Cfg.Drop.get(args.num);
            if (data) {
                this.goodsName.string = data.name;
            }
            Manager.spAtlas.getToolIcon(args.num).then(res => {
                this.itemSprite.spriteFrame = res;
            });
        } else if (args.type == 3) {
            this.itemSprite.node.active = false;
            this.goldSprite.active = false;
            this.diamondSprite.active = true;
            this.goodsName.string = `钻石x${args.num}`;
        }
    }

    showExtraBtn(args: any) {
        if (args.extracount) {
            this.btn_extra.active = true;
            this.btn_extra.getComponent(BtnRewardMultView).init({ gold: args.extracount, callBack: this.onExtraCallFunc.bind(this), text: args.text })
        } else {
            this.btn_extra.active = false;
        }
    }

    onExtraCallFunc() {
        Manager.audio.playAudio(509, AudioType.UI);
        if (!this._args.extracount) return
        if (this._args.extratype == 0) {
            GameVoManager.getInstance.setGold(this._args.extracount);
            let msg = "成功获得金币+" + this._args.extracount;
            AlertManager.showNormalTips(msg);
        } else if (this._args.extratype == 3) {
            GameVoManager.getInstance.setDiamond(this._args.extracount);
            let msg = "成功获得钻石+" + this._args.extracount;
            AlertManager.showNormalTips(msg);
        }
        GameVoManager.getInstance.saveData();
        super.close();
    }

    public refreshBtnStatus() {
        this.btn_extra.getComponent(BtnRewardMultView).refreshBtnStatus({ gold: this._args.extracount, callBack: this.onExtraCallFunc.bind(this), text: this._args.text })
    }

    // update (dt) {}
}
