import { MVC } from "../../framework/MVC";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import NoticeModel from "./NoticeModel";


export default class NoticeController extends MVC.BaseController {
    private static _instance: NoticeController = null;

    private _data: NoticeModel = NoticeModel.getInstance();

    static getInstance() {
        if (!this._instance) {
            this._instance = new NoticeController();
        }
        return this._instance;
    }

    constructor() {
        super("NoticeController");
        NoticeController._instance = this;
        // Notifier.addListener(ListenID.Menu_Login, this.onLogin.bind(this), this);
    }

    updateData() {
        let version = "1.0.0";
        let text = "欢迎回来，猎手!#n本次更新内容如下：#n游戏功能#n1.新增游戏公告。#n2.新增钻石货币，可以兑换获得更多金币哦。#n3.新增全新枪械，光能枪！#n优化内容#n1.调整主页及其他页面UI。#n2.调整人物、武器、金币成长属性。#n3.调整游戏关卡部分表现。#n4.调整武器作战效果。#n5.优化游戏性能。";

        // let config = Cfg.Notice.getAll();
        // if(config){
        //     let info = config[1];
        //     if(info){
        //         version = info.ver;
        //         text = info.text;
        //         text = text.replace(RegExp("#n", "g"), "\n");
        //     }
        // }

        this._data.setText(text);
        this._data.setVersion(version);
    }

    onLogin() {
        this.updateData();
        let version = this._data.getVersion();
        let localVersion = localStorage.getItem('noticeLoc');
        localStorage.setItem('noticeLoc', version);

        let userExInfo;
        let show = false;

        if (userExInfo) {
            show = !userExInfo.new_user;
        }
        (version == localVersion) || (show && this.openView());
    }

    openView() {
        UIManager.Open(Common_UIPath.NoticeUI, MVC.eTransition.Default, MVC.eUILayer.Tips);
    }
}
