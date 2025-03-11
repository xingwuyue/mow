import { MVC } from "../../framework/MVC";
import NoticeModel from "./NoticeModel";
import NoticeController from "./NoticeController";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NoticeView extends MVC.BaseView {
    @property(cc.Label)
    lblText: cc.Label = null;

    private _data: NoticeModel = NoticeModel.getInstance();

    changeListener(){}
    onOpen(){
        NoticeController.getInstance().updateData();
        this.onFlush();
    }
    onClose(){
        Manager.audio.playAudio(501, AudioType.UI);
        super.onClose();
    }

    onFlush(type: string = 'all'){
        if(!this.node.active) return;
        switch(type){
            case 'all': {
                this._updateLblText();
                break;
            }
        }
    }

    private _updateLblText(){
        if(this.lblText){
            let text = this._data.getText();
            this.lblText.string = text;
        }
    }
}
