import { MVC } from "../../../framework/MVC";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { UIManager } from "../../../framework/UIManager";
import { Common_UIPath } from "../../../common/Common_Define";
import { RoleManager } from "../../../manager/RoleManager";
import { Manager } from "../../../manager/Manager";
import { GameVoManager } from "../../../manager/GameVoManager";
import { AudioType } from "../../../manager/AudioManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseView extends MVC.BaseView {

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, ListenID.Fight_KillNumChange, this.updateNum, this);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        if (this._isClosed) return;
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Fight_Pause, false);
    }

    public onOpen(args: any): void {
        super.onOpen(args);
        Notifier.send(ListenID.Fight_Pause, true);
    }

    public onkeepGo() {
        this.onClose();
        // HD_MODULE.getNet().postGameEvent({ event_name: 'continue', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "continue" });
    }

    public onRestartClick() {
        Notifier.send(ListenID.Fight_Restart);
        this.onClose();
        // HD_MODULE.getNet().postGameEvent({ event_name: 'again', counter: 1 });
    }

    public onSettingOpen() {
        Manager.audio.playAudio(501);
        UIManager.Open(Common_UIPath.SettingUI, MVC.eTransition.Scale, MVC.eUILayer.Popup);
    }

    public onGoHome() {
        Manager.audio.stopAudio(AudioType.Laser);
        GameVoManager.getInstance.stateVo.levelFailTimes = 0;
        Notifier.send(ListenID.Game_FightBackToHome);
        this.onClose();
        // HD_MODULE.getNet().postGameEvent({ event_name: 'stop_home', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "stop_home" });
    }
}
