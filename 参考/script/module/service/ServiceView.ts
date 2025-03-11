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

@ccclass
export default class ServiveView extends MVC.BaseView {

    @property(cc.Sprite)
    codeSprite: cc.Sprite = null;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GoldEffect_End, this.goldEffectEnd, this);
        Notifier.changeListener(enable, ListenID.Servive_Close, this.onClose, this);
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);

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
        this.onOpenCustomService();
    }

    public onOpenCustomService() {

    }

    callFunc() {
        if (!GameVoManager.getInstance.myUserVo.serviceReward) {
            GameVoManager.getInstance.myUserVo.serviceReward = 1;
            AlertManager.showNormalTips("成功领取100钻石！");
            GameVoManager.getInstance.setDiamond(100);
            Notifier.send(ListenID.Game_UpdateDiamond);
            Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(0, 594), 0.1, 0, 2);
            GameVoManager.getInstance.saveData();
        } else {
            super.onClose();
            Notifier.send(ListenID.Close_InviteAndService);
        }
    }

    goldEffectEnd() {
        super.onClose();
        Notifier.send(ListenID.Close_InviteAndService);
    }

}
