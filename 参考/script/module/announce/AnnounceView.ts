import { MVC } from "../../framework/MVC";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnnounceView extends MVC.BaseView {
    protected changeListener(enable : boolean) : void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }
    
    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any) : void {
        super.onOpen(args);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose() : void {
        super.onClose();
    }
}
