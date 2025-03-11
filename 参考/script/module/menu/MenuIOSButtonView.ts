import { MVC } from "../../framework/MVC";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import { Util } from "../../utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuIOSButtonView extends MVC.BaseView {
    @property(cc.Node)
    btnVIP: cc.Node = null;

    changeListener() { }

    onOpen() {
        this.checkSwitch();
        Util.adapterNodeX(this.btnVIP);
    }
    onBtnMember() {
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Open(Common_UIPath.MemberUI, MVC.eTransition.Scale, MVC.eUILayer.Popup);
    }

    onBtnRewardVideo() {
        console.log("------MenuIOSButtonView激励视频-----");

    }

    checkSwitch() {
        // let switchData = Cfg.Switch.getAll();
        // this.btnVIP.active = switchData && switchData[1].value != 0;
    }
}
