import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import TipsLoadingModel from "./TipsLoadingModel";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";

export default class TipsLoadingController extends MVC.BaseController {
    private static _instance: TipsLoadingController = null;

    private _data: TipsLoadingModel = new TipsLoadingModel();

    constructor(){
        super('TipsLoadingController');
        this.changeListener(true);
        TipsLoadingController._instance = this;
    }

    getData(){
        return this._data;
    }

    static getInstance(){
        if(!this._instance){
            this._instance = new TipsLoadingController();
        }
        return this._instance;
    }

    changeListener(enable: boolean){
        Notifier.changeListener(enable, ListenID.TipsLoading_Show, this.showLoading, this);
        Notifier.changeListener(enable, ListenID.TipsLoading_Hide, this.hideLoading, this);
    }

    showLoading(data: {text: string, showPoint?: boolean}){
        if(data){
            this._data.setText(data.text);
            this._data.setIsShowPoint(data.showPoint);
        }
        UIManager.Open(Common_UIPath.TipsLoadingView, MVC.eTransition.Default, MVC.eUILayer.Tips);
    }

    hideLoading(){
        UIManager.Close(Common_UIPath.TipsLoadingView);
    }
}
