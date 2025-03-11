import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
import { GameVoManager } from "../manager/GameVoManager";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ReliveTipsUI extends MVC.BaseView {

    protected changeListener(enable: boolean): void {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
		
    }

    public onReliveClick(){
        super.close();
        Notifier.send(ListenID.Fight_Pause, false);
        Notifier.send(ListenID.Fight_ReliveSuccess, 1);
    }
}
