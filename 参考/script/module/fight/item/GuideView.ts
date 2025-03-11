import { MVC } from "../../../framework/MVC";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { Manager } from "../../../manager/Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideView extends MVC.BaseView {

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, ListenID.Fight_KillNumChange, this.updateNum, this);
    }
    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        Manager.audio.playAudio(514);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClickFrame, this);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
    }

    protected onClickFrame() {
        this.onClose();
        Notifier.send(ListenID.Fight_Start,0);
    }
}