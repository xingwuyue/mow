import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ZiJieRecord extends MVC.BaseView {

    @property(cc.Node)
    btnZiJieRecord: cc.Node = null;

    protected changeListener(enable: boolean): void {

    }

    public onOpen(args) {
        super.onOpen(args);
    }

    public onClose() {
        super.onClose();
    }

    public onClickRecord() {

    }
    update(dt) { }
}
