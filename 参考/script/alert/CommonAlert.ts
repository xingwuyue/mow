import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonAlert extends MVC.BaseView {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.RichText)
    desc: cc.RichText = null;

    private cbConfirm:Function = null;
    start() {

    }
    // 设置事件监听
    protected changeListener(enable: boolean): void {

    };

    public onOpen(args: any) {
        super.onOpen(args);
        this.title.string = args.title ? args.title : "提示";
        this.desc.string = args.desc ? args.desc : "";
        this.cbConfirm = args && args.errorcb;
    }

    public onClose() {
        super.onClose();
        this.cbConfirm && this.cbConfirm();

    }
    // update (dt) {}
}
