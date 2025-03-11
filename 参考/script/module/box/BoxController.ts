import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { NotifyID } from "../../framework/NotifyID";
import { GameVoManager } from "../../manager/GameVoManager";
import BoxModel from "./BoxModel";
import { AlertManager } from "../../alert/AlertManager";
import { Cfg } from "../../config/Cfg";
import { Time } from "../../framework/Time";

/*
 * desc
 */
export class BoxController extends MVC.BaseController {
    private _model: BoxModel;
    public constructor() {
        super("BoxController");
        this._model = BoxModel.getInstance;
        this.changeListener(true);
        this.isInit = false;
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Box_OpenBoxView, this.onOpenBoxView, this);
        Notifier.changeListener(enable, NotifyID.Game_Update, this.updateModel, this);
        Notifier.changeListener(enable, ListenID.Login_Finish, this.initTime, this);
        Notifier.changeListener(enable, ListenID.Box_OpenBoxOpenView, this.onOpenBoxOpenView, this);
        Notifier.changeListener(enable, ListenID.Pay_CallBack, this.onPayCall, this);
        Notifier.changeListener(enable, ListenID.Box_CheckRepairPay, this.checkRepairPay, this);
        Notifier.changeListener(enable, ListenID.Box_OpenDirectPayView, this.onOpenDirectPayView, this);
        //    Notifier.changeListener(enable, ListenID.Game_RefreshTime, this.refreshTime, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }

    public onOpenBoxView() {
        UIManager.Open(Common_UIPath.BoxView, MVC.eTransition.Default, MVC.eUILayer.Panel);
    }

    public onOpenBoxOpenView(args) {
        UIManager.Open(Common_UIPath.BoxOpenView, MVC.eTransition.Default, MVC.eUILayer.Popup, args);
    }

    private isInit: boolean = false;
    public initTime() {
        this.isInit = true;
    }

    public updateModel(dt) {
        if ((GameVoManager.getInstance.stateVo.isGetData) && this.isInit) {
            this._model.updateFreeTime(dt);
        }
    }

    public onPayCall(code, bnoid, orderid, productid, msg) {
        // console.log("onPayCall",code, bnoid, orderid, productid, msg)
        Notifier.send(ListenID.TipsLoading_Hide);
        if (code == 2) {//支付成功
            let data = Cfg.Store.get(productid);
            if (!data) {
                AlertManager.showNormalTips("商品Id有误:", productid);
                return;
            }
            let diamonnum = data.commodity[0];
            if (BoxModel.getInstance.isFirstReward(productid)) {
                diamonnum += data.firstAward;
            }
            GameVoManager.getInstance.setDiamond(diamonnum);
            BoxModel.getInstance.setFirstRewardSign(productid);
            // GameVoManager.getInstance.setOrderSuccess(orderid, productid, Math.ceil(Time.serverTimeMs / 1000));
            GameVoManager.getInstance.savePayData();
            UIManager.Open(Common_UIPath.RewardUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, { goodsId: 2, goodsNum: diamonnum });
            Notifier.send(ListenID.Pay_Finish);
        } else if (code == 1) {//支付错误
            AlertManager.showNormalTips(msg);
        } else if (code == 4) {//支付取消
            AlertManager.showNormalTips("支付已取消");
        } else if (code == 8) {//支付未知
            AlertManager.showNormalTips("支付异常", MVC.eUILayer.Loading, 2);
        }
    }
    public checkRepairPay() {

    }

    public onOpenDirectPayView() {
        UIManager.Open("ui/box/PayDirectView", MVC.eTransition.Scale, MVC.eUILayer.Popup);
    }
}