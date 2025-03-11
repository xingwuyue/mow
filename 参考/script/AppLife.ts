
import { GameVoManager } from "./manager/GameVoManager";
import { AlertManager } from "./alert/AlertManager";
import NetAdapter from "./adpapter/NetAdapter";
import { Const } from "./config/Const";
import { Time } from "./framework/Time";
import { Notifier } from "./framework/Notifier";
import { ListenID } from "./ListenID";
import { NotifyID } from "./framework/NotifyID";
import { WXSDK } from "./sdk/WXSDK";
import { Manager } from "./manager/Manager";
NetAdapter.Init();
let ishided: boolean = false;

cc.game.on(cc.game.EVENT_SHOW, function (res) {
    console.log('## 回到游戏')
    Notifier.send(NotifyID.App_Pause, false);
}.bind(this), this);

cc.game.on(cc.game.EVENT_HIDE, function (res) {
    console.log('## 隐藏游戏')
    GameVoManager.getInstance.saveData();
    Notifier.send(NotifyID.App_Pause, true);
}.bind(this), this);
