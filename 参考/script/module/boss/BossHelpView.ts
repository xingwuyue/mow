import { MVC } from "../../framework/MVC";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BossHelpView extends MVC.BaseView {
    @property(cc.Label)
    lblText: cc.Label = null;

    changeListener() { }
    onOpen() {

    }
    onClose() {
        super.onClose();
    }
}
