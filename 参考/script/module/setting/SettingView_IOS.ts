import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { CallID } from "../../CallID";
import FightModel from "../fight/FightModel";
import { Manager } from "../../manager/Manager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { AlertManager } from "../../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingView extends MVC.BaseView {

    @property(cc.Toggle)
    musicToggle: cc.Toggle = null;

    @property(cc.Toggle)
    audioToggle: cc.Toggle = null;

    @property(cc.Toggle)
    shakeToggle: cc.Toggle = null;

    @property(cc.Toggle)
    hurtToggle: cc.Toggle = null;

    @property(cc.Label)
    lblCustomServer: cc.Label = null;

    @property(cc.Label)
    lblUserId: cc.Label = null;

    private _customServer: string = "";
    private _userId: string = "";
    private _pasteBtnId: string = "";

    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        let muteMusic: boolean = Notifier.call(CallID.Setting_IsMuteMusic);
        this.musicToggle.isChecked = muteMusic;
        let muteaudio: boolean = Notifier.call(CallID.Setting_IsMuteAudio);
        this.audioToggle.isChecked = muteaudio;
        let muteshake: boolean = Notifier.call(CallID.Setting_IsBlockShake);
        this.shakeToggle.isChecked = muteshake;
        let hurtShow: boolean = Notifier.call(CallID.Setting_IsHurtShow);
        this.hurtToggle.isChecked = hurtShow;
        if (FightModel.getInstance.isFighting) {
            Notifier.send(ListenID.Fight_Pause, true);
        }

        this.onFlush();
        Notifier.send(ListenID.ShowBanner);
    }

    public start() {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        super.onClose();
        // UIManager.Close(Common_UIPath.SettingUI);
        if (FightModel.getInstance.isFighting) {
            Notifier.send(ListenID.Fight_Pause, false);
        }
        Notifier.send(ListenID.HideBanner);
    }

    private onClickMusic(target: cc.Toggle) {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Setting_MuteMusic, target.isChecked);
    }

    private onClickAudio(target: cc.Toggle) {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Setting_MuteAudio, target.isChecked);
    }

    private onClickShake(target: cc.Toggle) {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Setting_BlockShake, target.isChecked);
    }

    private onClickHurt(target: cc.Toggle) {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Setting_HurtShow, target.isChecked);
    }

    onBtnNoticeClick() {
        Manager.audio.playAudio(501);
        UIManager.Open(Common_UIPath.NoticeUI, MVC.eTransition.Default, MVC.eUILayer.Tips);
    }

    /** 复制到剪贴板(原生平台可用) */
    uiPasteBoard(e, d) {
        let str = '';
        if (this._pasteBtnId == d) return;
        if (d == `1`) {
            str = this._customServer;
        } else {
            str = "HDDefaultUserInfo.open_id";
        }
        this._pasteBtnId == d;//不能一重复点复制，会卡死

        AlertManager.showNormalTips("复制到剪贴板成功");
    }

    onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                this._updateLblCustomServer();
                this._updateLblUserId();
                break;
            }
        }
    }

    private _updateLblCustomServer() {
        if (this.lblCustomServer) {
            let str = this.lblCustomServer.string;
            // this.lblCustomServer.string = str;
            this._customServer = str;
        }
    }

    private _updateLblUserId() {
        if (this.lblUserId) {
            let str = "HDDefaultUserInfo.nick_name";
            this.lblUserId.string = str;
            this._userId = str;
        }
    }
}
