import { MVC } from "../framework/MVC";

const { ccclass, property } = cc._decorator;
@ccclass
export default class LoadingView extends MVC.BaseView {
    public changeListener(enable) {

    }

    private _args: any;
    public onOpen(args) {
        super.onOpen(args);
        this._args = args;
	
		
    }

    public setInfo(args) {

    }

    public onClose() {
        super.onClose();
    }

    public onActionInFinish() {
        if (this._args && this._args.openCb) {
            this._args.openCb();
        }
    }

    public onActionReady() {
        if (this._args && this._args.closeCb) {
            this._args.closeCb();
        }
    }

    public onActionOutFinish() {
        this.node.active = false;
    }
}
