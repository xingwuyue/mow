/**
 *
 *
 *                                                    __----~~~~~~~~~~~------___
 *                                   .  .   ~~//====......          __--~ ~~
 *                   -.            \_|//     |||\\  ~~~~~~::::... /~
 *                ___-==_       _-~o~  \/    |||  \\            _/~~-
 *        __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *    _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *  .~       .~       |   \\ -_    /  /-   /   ||      \   /
 * /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 * |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *          '         ~-|      /|    |-~\~~       __--~~
 *                      |-~~-_/ |    |   ~\_   _-~            /\
 *                           /  \     \__   \/~                \__
 *                       _--~ _/ | .-~~____--~-/                  ~~==.
 *                      ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                 -_     ~\      ~~---l__i__i__i--~~_/
 *                                 _-~-__   ~)  \--______________--~~
 *                               //.-~~~-~_--~- |-------~~~~~~~~
 *                                      //.-~~~--\
 *                               神兽保佑
 *                              代码无BUG!
 */
const { ccclass, property } = cc._decorator;

import { NetLauncher } from "./NetLauncher";
import { ModuleLauncher } from "./ModuleLauncher";
import { Manager } from "../manager/Manager";
import { UILanuncher } from "./UILauncher";
import { SdkLauncher } from "./SdkLauncher";
import { Cfg } from "../config/Cfg";
import { Notifier } from "../framework/Notifier";
import { Time } from "../framework/Time";
import { ListenID } from "../ListenID";
import { GameVoManager } from "../manager/GameVoManager";
import { Util } from "../utils/Util";
import NetAdapter from "../adpapter/NetAdapter";
import { AlertManager, AlertType } from "../alert/AlertManager";
import { HotUpdateMgr, HotUpdateCode } from "../module/update/HotUpdateMgr";

@ccclass
export default class Launcher extends cc.Component {

    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    @property(cc.Label)
    text: cc.Label = null;

    @property(cc.Label)
    progressText: cc.Label = null;

    @property(cc.Label)
    version: cc.Label = null;

    _login: boolean = false;

    private _hotUpdateMgr: HotUpdateMgr;

    onLoad() {
        cc.game.addPersistRootNode(this.node);
    }
    start() {
        let canvas = cc.director.getScene().children[1];
        let node = canvas.getChildByName("bg");
        Util.resizeNode(node);
        this.isStartLoad = false;
        new UILanuncher();
        let needcheck = false;
        if (!needcheck) { this.startLogin(); }
    }
    login() {
        let this1 = this;
        this1.loadConfig();
    }
    private count: number = 0;
    private downtime: number = 0.5;
    private isStartLoad: boolean = false;
    moveon() {
        try {
            if (this.text) {
                this.count %= 6;
                this.text.string = this.getString(".", this.count);
                ++this.count;
                this.downtime = 0.5;
            } else {
                this.downtime = 99999;
            }
        } catch (error) {
            this.downtime = 999999;
        }
    }

    startLogin() {
        this.isStartLoad = true;
        this.login();
    }
    getString(str, count) {
        let newstr = "加载中";
        let a = str;
        for (let i = 0; i < count; i++) {
            a += str;
        }
        newstr += a;
        return newstr;
    }

    update(dt: number) {
        Time.update(dt);
        Manager.loader.Update(dt);
        // this._net.Update(dt);
        if (this.isStartLoad) {
            this.downtime -= dt;
            if (this.downtime <= 0) {
                this.moveon();
            }
        }
    }

    onStartGame(event) {
        event.target.getComponent(cc.Animation).stop();
        Notifier.send(ListenID.Login_Finish);
    }

    //加载配置
    async loadConfig() {
        this.progress.progress = 0;
        GameVoManager.getInstance.myUserVo.loadState = 0;
        GameVoManager.getInstance.stateVo.loadTime = new Date().valueOf();
        GameVoManager.getInstance.myUserVo.loadState = 1;
        await Promise.all([
            Cfg.initLocalJson("Barrier", this.progressText, this.progress),
            Cfg.initLocalJson("Drop", this.progressText, this.progress),
            Cfg.initLocalJson("Monster", this.progressText, this.progress),
            Cfg.initLocalJson("Weapon", this.progressText, this.progress),
            Cfg.initLocalJson("Dial", this.progressText, this.progress),
            Cfg.initLocalJson("Boss", this.progressText, this.progress),
            Cfg.initLocalJson("Intensify", this.progressText, this.progress),
            Cfg.initLocalJson("DropPool", this.progressText, this.progress),
            Cfg.initLocalJson("DropPreview", this.progressText, this.progress),
            Cfg.initLocalJson("EquipUnlock", this.progressText, this.progress),
            Cfg.initLocalJson("Store", this.progressText, this.progress),
            Cfg.initLocalJson("Equip", this.progressText, this.progress),
            Cfg.initLocalJson("Surprise", this.progressText, this.progress),
            // Cfg.initLocalJson("Guide", this.progressText, this.progress),
            Cfg.initLocalJson("UnlockSystem", this.progressText, this.progress),
            Cfg.initLocalJson("Task", this.progressText, this.progress),
            Cfg.initLocalJson("Event", this.progressText, this.progress),
            Cfg.initLocalJson("Remould", this.progressText, this.progress),
            Cfg.initLocalJson("Ecological", this.progressText, this.progress),

        ]); //等待所有数据返回
        this.showDebug();
        //在启动模块
        new ModuleLauncher();
        // 启动SDK
        new SdkLauncher(this.progressText, this.progress);

    }

    showDebug() {

    }
}
