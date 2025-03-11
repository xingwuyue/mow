import { MVC } from "../../../framework/MVC";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { Manager } from "../../../manager/Manager";
import { RoleManager } from "../../../manager/RoleManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimationGuideView extends MVC.BaseView {

    @property(cc.Node)
    btn_close: cc.Node = null;

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, ListenID.Fight_KillNumChange, this.updateNum, this);
    }
    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        Manager.audio.playAudio(514);
        Notifier.send(ListenID.Fight_Pause, true);

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        RoleManager.getInstance.mainRole.cheat = false;
        Notifier.send(ListenID.Fight_Pause, false);
        Notifier.send(ListenID.Log_Event, { event_name: "Watching_menu" });
    }

    public showBtnClose() {
        if (this.btn_close.opacity < 255) {
            this.btn_close.opacity = 255;
            this.btn_close.getComponent(cc.Button).interactable = true;
        }
    }
}