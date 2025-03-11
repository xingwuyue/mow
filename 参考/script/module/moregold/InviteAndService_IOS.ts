import { MVC } from "../../framework/MVC";
import SignPanel from "./sign/SignPanel";
import InvitePanel from "./invite/InvitePanel";
import { Manager } from "../../manager/Manager";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { AudioType } from "../../manager/AudioManager";
import { WXSDK } from "../../sdk/WXSDK";
import { NotifyID } from "../../framework/NotifyID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InviteAndService_IOS extends MVC.BaseView {

    _invitePanel: boolean = false;
    _servicePanel: boolean = false;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Close_InviteAndService, this.onClose, this);
        Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.resizeBtnPos, this);
    }

    /*
     * 打开界面回调，每次打开只调用一
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        Notifier.send(ListenID.ShowBanner, 5);
        this.onService();
    }

    resizeBtnPos() {
        let closeNode = cc.find("know", this.node);
        closeNode.position = cc.v2(closeNode.x, WXSDK.bannerY);
        closeNode.active = true;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        super.onClose();
        Notifier.send(ListenID.Servive_Close);
        Notifier.send(ListenID.HideBanner);
        // HD_MODULE.getPlatform().setLoadingVisible(false);
        // if(this._invitePanel){
        //     Notifier.send(ListenID.Invite_Close);
        // }
        // if(this._servicePanel){
        //     Notifier.send(ListenID.Servive_Close);
        // }
    }

    // public onClickTab(toggle: cc.Toggle, customData: any) {
    //     Manager.audio.playAudio(501);
    //     if(toggle.node.name == "toggle0"){
    //         this.onInvite();
    //     }else{
    //         this.onService();
    //         HD_MODULE.getPlatform().setLoadingVisible(false);
    //     }
    // }

    public onService() {
        // if(this._invitePanel){
        //     Notifier.send(ListenID.Invite_Close);
        // }
        // this._servicePanel = true;
        UIManager.Open(Common_UIPath.ServiceUI, MVC.eTransition.Default, MVC.eUILayer.Tips);
    }

    // public onInvite() {
    //     if(this._servicePanel){
    //         Notifier.send(ListenID.Servive_Close);
    //     }
    //     this._invitePanel = true;
    //     HD_MODULE.getNet().postGameEvent({ event_name: 'invite_menu', counter: 1 });
    //     HD_MODULE.getPlatform().setLoadingVisible(true);
    //     UIManager.Open(Common_UIPath.InviteUI);
    // }
}
