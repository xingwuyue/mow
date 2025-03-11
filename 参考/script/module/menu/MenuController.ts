import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, RemindData } from "../../common/Common_Define";
import { CallID } from "../../CallID";
import MenuModel from "./MenuModel";
/*
 * desc
 */
export class MenuController extends MVC.BaseController {
    private static _instance: MenuController = null;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new MenuController();
        }
        return this._instance;
    }

    public constructor() {
        super("MenuController");
        this.changeListener(true);
        MenuController._instance = this;
    }

    public reset(): void {

    }
    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Menu_CloseMainView, this.onCloseMainView, this);
        Notifier.changeListener(enable, ListenID.Menu_OpenMainView, this.onOpenMainView, this);
        Notifier.changeCall(enable, CallID.Menu_GetChapterInfo, this.getChapterInfo, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }

    public rigisterRemind(param: RemindData) {
        Notifier.send(ListenID.Rigister_Remind, param);
    }

    public onCloseMainView() {
        UIManager.Close(Common_UIPath.MenuUI);
    }

    public onOpenMainView() {
        UIManager.Open(Common_UIPath.MenuUI);
    }

    public getChapterInfo(id) {
        return MenuModel.getInstance.getChapterInfoById(id);
    }
}