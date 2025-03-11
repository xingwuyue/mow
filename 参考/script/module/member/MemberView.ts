import { MVC } from "../../framework/MVC";
import MemberController from "./MemberController";
import { GameVoManager } from "../../manager/GameVoManager";
import MemberModel from "./MemberModel";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { AlertManager } from "../../alert/AlertManager";
import { Time } from "../../framework/Time";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MemberView extends MVC.BaseView {
    @property(cc.Label)
    lblDate: cc.Label = null;

    @property(cc.Button)
    btnBuy: cc.Button = null;

    @property(cc.Node)
    imgLeave: cc.Node = null;

    private _isMember: boolean = false;
    private _data: MemberModel = null;
    private _iap = null;

    changeListener() { }

    onLoad() {
        this._data = MemberController.getInstance().getData();
        // if(!this._iap){
        //     this._iap = sdkbox.IAP.init(null);
        // }
    }

    onOpen() {
        this.onFlush();
    }

    setInfo() {
        this.onFlush();
    }

    onBtnClose() {
        MemberController.instance.closeView();
    }

    onBtnDisplayAnim() {
        UIManager.Open(Common_UIPath.WeaponDisplayUI, MVC.eTransition.Default, MVC.eUILayer.Tips);
    }

    onBtnBuy() {
        let closeLoadingView = () => {
            this.scheduleOnce(() => {
                Notifier.send(ListenID.TipsLoading_Hide);
            }, 1);
        }

        let buy = () => {
            // Notifier.send(ListenID.TipsLoading_Show, {text: '购买中', showPoint: true});
        }
        let check = () => {
            // Notifier.send(ListenID.TipsLoading_Show, {text: '验证中', showPoint: true});

        }
        let suc = () => {
            MemberController.getInstance().onBuyMemberSuc().then(() => {
                // Notifier.send(ListenID.TipsLoading_Show, {text: '购买成功', showPoint: false});
                // this.onFlush();
                // closeLoadingView();
            });
        }
        let fail = () => {
            // Notifier.send(ListenID.TipsLoading_Show, {text: '购买失败', showPoint: false});
            closeLoadingView();
        }

        let cancel = () => {
            // Notifier.send(ListenID.TipsLoading_Show, {text: '订单取消', showPoint: false});
            // closeLoadingView();
        }
        let isPur = () => {
            // Notifier.send(ListenID.TipsLoading_Show, {text: '已拥有商品', showPoint: false});
            // closeLoadingView();
        }

        // if(!HD_MODULE.getPlatform().getTokenIsExpire()){
        //     iap();
        // }else{
        //     HD_MODULE.getPlatform().silenceLogin(() => {
        //         if(GameVoManager.getInstance.stateVo.isGetData)
        //             iap();
        //         else
        //             AlertManager.showNormalTips("网络错误,请重新登陆,且保证本地时间正确");
        //     }, () => {
        //         AlertManager.showNormalTips("网络错误,请重新登陆,且保证本地时间正确");
        //     });
        // }
    }

    onFlush(type: string = 'all') {
        this._isMember = GameVoManager.getInstance.getIsMember();
        if (this.node.active) {
            switch (type) {
                case 'all': {
                    this._updateLblDate();
                    this._updateBtnBuy();
                    this._updateLeave();
                    break;
                }
            }
        }
    }

    private _updateLeave() {
        if (this.imgLeave) {
            this.imgLeave.active = this._isMember;
        }
    }

    private _updateLblDate() {
        if (this.lblDate) {
            let sTime = this._data.getMemberStartTime();
            let eTime = this._data.getMemberEndTime();
            Time.getServetTime().then((timeMs: number) => {
                let lTime = eTime - timeMs;
                this.lblDate.node.active = this._isMember;
                this.lblDate.string = Math.ceil((lTime - 1) / 1000 / 86400) + '';
            });
        }
    }

    private _updateBtnBuy() {
        if (this.btnBuy) {
            // this.btnBuy.interactable = !this._isMember;
        }
    }
}
