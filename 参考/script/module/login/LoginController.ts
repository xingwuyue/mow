import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { Common_HttpInterface, Common_UIPath } from "../../common/Common_Define";
import NetAdapter from "../../adpapter/NetAdapter";
import { ListenID } from "../../ListenID";
import { Const } from "../../config/Const";
import { Cfg } from "../../config/Cfg";
import { GameVoManager } from "../../manager/GameVoManager";
import { Manager } from "../../manager/Manager";

export class LoginController extends MVC.BaseController {
    public constructor() {
        super("LoginController");
        this.changeListener(true);
    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Login_Start, this.onLoginStart, this);
        Notifier.changeListener(enable, ListenID.Login_Finish, this.onLoginFinish, this);
        // Notifier.changeListener(enable, ListenID.Login_User, this.onLoginFinish, this);
    }

    public login(openid: string, nickName: string = "", avatarUrl: string = "") {
        return NetAdapter.httpPost(Common_HttpInterface.UserLogin, { openid: openid, nick_name: nickName, avatar_url: avatarUrl });
    }
    private onLoginStart(): void {

    }

    private onLoginFinish(): void {
        let data = Cfg.Barrier.filter({})
        GameVoManager.getInstance.stateVo.stepNum = data.length;
        GameVoManager.getInstance.stateVo.isNewUser = !Manager.storage.getNumber(Const.STORAGE_NEWUSER, 0);
        // let self = this;
        // let checkLogin = () => {
        //     if (HD_MODULE.getPlatform().isWeChat() || !cc.sys.isNative || GameVoManager.getInstance.stateVo.isGetData || HD_MODULE.getPlatform().isAndroid())
        //         this.loadResSuc();//).catch(this.loadResFai.bind(this));
        //     else {
        //         setTimeout(() => {
        //             checkLogin();
        //         }, 2000);
        //     }
        // }
        // checkLogin();
        this.loadResSuc();
        // if(appConfig.platform_id == 7){
        // }

    }

    // loadRes(): Promise<any> {
    //     return new Promise((rec, rej) => {
    //         rec()
    //     });
    // }

    loadResSuc() {
        // HD_MODULE.PLATFORM.showVideoByIndex(1, false);
        cc.director.loadScene(Const.GAME_SCENENAME, () => {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'loadend', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "loadend" });
            GameVoManager.getInstance.myUserVo.loadState = 2;
        });
    }

    loadResFai() {
        this.loadResSuc();
    }
}
