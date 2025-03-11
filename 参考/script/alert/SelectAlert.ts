import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SelectAlert extends MVC.BaseView {

    @property(cc.Label)
    reasonDesc: cc.Label = null;

    @property(cc.Label)
    wayDesc: cc.Label = null;

    @property(cc.Label)
    confirmText: cc.Label = null;

    @property(cc.Label)
    cancelText: cc.Label = null;

    // 设置事件监听
    protected changeListener(enable: boolean): void {

    };

    private cbConfirm: Function = null;
    private cbCancel: Function = null;
    public onOpen(args: any) {
        super.onOpen(args);
        this.cbConfirm = args && args.confirm;
        this.cbCancel = args && args.cancel;
        this.reasonDesc.string = args && args.reasonDesc || "";
        this.wayDesc.string = args && args.wayDesc || "";
        this.confirmText.string = args && args.confirmText || "是";
        this.cancelText.string = args && args.cancelText || "否";
    }

    public onClose() {
        super.onClose();

    }

    public onConfirm() {
        this.cbConfirm && this.cbConfirm();
        Manager.audio.playAudio(501);
        this.onClose();
    }

    public onCancel() {
        this.cbCancel && this.cbCancel();
        Manager.audio.playAudio(501);
        this.onClose();

    }
    // update (dt) {}
}
