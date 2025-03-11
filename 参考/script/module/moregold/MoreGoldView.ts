import { MVC } from "../../framework/MVC";
import SignPanel from "./sign/SignPanel";
import InvitePanel from "./invite/InvitePanel";
import { Manager } from "../../manager/Manager";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { WXSDK } from "../../sdk/WXSDK";
import { NotifyID } from "../../framework/NotifyID";
import { Time } from "../../framework/Time";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { Const } from "../../config/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoreGoldView extends MVC.BaseView {

    @property(cc.Node)
    bg2: cc.Node = null;

    @property(cc.Node)
    signPanel: cc.Node = null;

    @property(cc.Node)
    scPanel: cc.Node = null;

    @property(cc.Node)
    freeDiamondPanel: cc.Node = null;

    @property(cc.Node)
    know: cc.Node = null;

    // @property(cc.Node)
    // getSign: cc.Node = null;

    @property(cc.Toggle)
    toggle0: cc.Toggle = null;

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    @property(cc.Toggle)
    toggle2: cc.Toggle = null;

    @property(cc.Toggle)
    toggle3: cc.Toggle = null;

    @property(cc.Node)
    point: cc.Node = null;

    @property(cc.Node)
    point3: cc.Node = null;

    _args = null;
    _invitePanel: boolean = false;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Close_MoreGoldPanel, this.onClose, this);
        Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.resizeBtnPos, this);
        Notifier.changeListener(enable, ListenID.GetSignReward, this.getSignReward, this);
    }

    getSignReward() {
        // this.know.active = true;
    }

    /*
     * 打开界面回调，每次打开只调用一
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this._args = args;

        this.initUI(args);
        this.showDesc();
        this.showPoint();
        Notifier.send(ListenID.ShowBanner, 0);

        this.bg2.height = args == 3 ? 520 : 793;
        this.point3.active = GameVoManager.getInstance.myUserVo.useFreeDiamondTimes < Const.FreeDiamondTimes ? true : false;
    }

    showPoint() {
        let date = new Date(Time.serverTimeMs);
        this.point.active = date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay ? true : false;
    }

    openCallBack() {
        if (this._args == 2) {
            this.toggle2.isChecked = true;
            this.onInvite();
        }
    }

    initUI(args) {
        if (args == 0) {
            this.signPanel.active = true;
            this.signPanel.getComponent(SignPanel).updateItemList();
            this.toggle0.isChecked = true;
        } else if (args == 1) {
            this.scPanel.active = true;
            this.toggle1.isChecked = true;
        } else if (args == 3) {
            this.freeDiamondPanel.active = true;
            this.toggle3.isChecked = true;
        }
        this.checkFunOpen();
    }

    initIOS_UI() {

    }

    checkFunOpen() {
        let titletoggle = this.node.getChildByName('TitletoggleContainer');
        if (titletoggle) {
            this.toggle0.isChecked = true;
            let btnShare = titletoggle.getChildByName('toggle2');
            let btnCollect = titletoggle.getChildByName('toggle1');
            let btnArr = [btnShare, btnCollect];

            for (let i = 0; i < btnArr.length; ++i) {
                let btn = btnArr[i];
                if (btn) {
                    btn.active = false;
                    (btn.getComponent(cc.Toggle) as cc.Toggle).isChecked = false;
                }
            }

            // let btnSign = titletoggle.getChildByName('toggle0');
            // (btnSign.getComponent(cc.Toggle) as cc.Toggle).isChecked = true;
        }
        // this.signPanel.active = true;
        // let btnClose 
    }

    showDesc() {
        if (this.scPanel.active) {

            this.scPanel.getChildByName("desc_wechat").active = true;
            this.scPanel.getChildByName("desc_qq").active = false;

        }
    }

    resizeBtnPos() {
        // this.getSign.position = cc.v2(this.getSign.x, WXSDK.bannerY);
        // this.know.position = cc.v2(this.know.x, WXSDK.bannerY);
        // let date = new Date(Time.serverTimeMs);
        // if (this._args == 0 && date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay) {
        //     this.getSign.active = true;
        // } else {
        //     this.know.active = true;
        // }
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        super.onClose();
        Notifier.send(ListenID.HideBanner);
        if (this._invitePanel) {
            Notifier.send(ListenID.Invite_Close);
        }
        Notifier.send(ListenID.Refresh_Select);
    }

    public onClickTab(toggle: cc.Toggle, customData: any) {
        Manager.audio.playAudio(501);
        this.signPanel.active = toggle.node.name == "toggle0";
        this.scPanel.active = toggle.node.name == "toggle1";
        this.freeDiamondPanel.active = toggle.node.name == "toggle3";
        this.bg2.height = toggle.node.name == "toggle3" ? 520 : 793;
        this.showDesc();
        if (toggle.node.name == "toggle0") {
            this.signPanel.getComponent(SignPanel).updateItemList();
        } else if (toggle.node.name == "toggle1") {

        } else if (toggle.node.name == "toggle2") {
            this.onInvite();
        } else if (toggle.node.name == "toggle3") {
            // this.freeDiamondPanel.getComponent(GetFreeDiamond).initUI();
        }
        if (toggle.node.name == "toggle0" || toggle.node.name == "toggle1" || toggle.node.name == "toggle3") {
            if (this._invitePanel) {
                Notifier.send(ListenID.Invite_Close);
            }
        }
        let date = new Date(Time.serverTimeMs);
        if (toggle.node.name == "toggle0" && date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay) {
            // this.getSign.active = true;
            // this.know.active = false;
        } else {
            // this.getSign.active = false;
            // // this.know.active = true;
            // this.getSign.active = false;
        }
    }

    public onInvite() {
        this._invitePanel = true;
        UIManager.Open(Common_UIPath.InviteUI, MVC.eTransition.Default, MVC.eUILayer.Popup);
    }
}
