import { MVC } from "../../framework/MVC";
import { Manager } from "../../manager/Manager";
import { ShareCode } from "../../common/Common_Define";
import { Const } from "../../config/Const";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameVoManager } from "../../manager/GameVoManager";
import { Util } from "../../utils/Util";
import { AlertManager } from "../../alert/AlertManager";
import NetAdapter from "../../adpapter/NetAdapter";

const { ccclass, property } = cc._decorator;

let codeToReward = {
    "LR0101HD59688": 100,
    "LR0101HD88888": 100,
    "LR01HD3141592": 500,
}

@ccclass
export default class ServiceView_IOS extends MVC.BaseView {

    @property(String)
    copyString: string = "";

    @property(cc.EditBox)
    codeEditbox: cc.EditBox = null;

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, ListenID.GoldEffect_End, this.goldEffectEnd, this);
        Notifier.changeListener(enable, ListenID.Servive_Close, this.onClose, this);
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        Manager.storage.setBool(Const.STORAGE_MENU_FULI, true);
        // this.initUrlCode();
        // Notifier.send(ListenID.ShowBanner, 4);
    }

    public onBtnCopy() {
        AlertManager.showNormalTips("复制公众号成功!");

    }

    public onQQCopy() {
        AlertManager.showNormalTips("复制QQ群号成功!");

    }

    public onBtnExchange() {
        let code = this.codeEditbox.string;
        if (codeToReward[code]) {
            let isExchange = GameVoManager.getInstance.myUserVo.giftCode[code];
            if (!isExchange) {
                GameVoManager.getInstance.myUserVo.giftCode[code] = true;
                GameVoManager.getInstance.setDiamond(codeToReward[code]);
                Notifier.send(ListenID.Game_UpdateCurrencyEffect, 2, codeToReward[code]);
                AlertManager.showNormalTips("兑换成功!");
            } else {
                AlertManager.showNormalTips("兑换码已使用!");
            }
        } else if (code == "") {
            AlertManager.showNormalTips("请输入兑换码!");
        } else {
            AlertManager.showNormalTips("兑换码无效!");
        }
    }

    public initUrlCode() {
        this.checkFunOpen();
    }

    checkFunOpen() {
        // let btnService = this.node.getChildByName('btn_service');
        // btnService && (btnService.active = false);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        // Notifier.send(ListenID.HideBanner);
    }

    public onService() {
        Manager.audio.playAudio(501);
        // this.onOpenCustomService();
        AlertManager.showNormalTips("复制成功!");
    }

    public onOpenCustomService() {
    }

    callFunc() {
    }

    goldEffectEnd() {
        super.onClose();
        Notifier.send(ListenID.Close_InviteAndService);
    }

}
