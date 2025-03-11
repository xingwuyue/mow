import { MVC } from "../framework/MVC";
import { GameVoManager } from "../manager/GameVoManager";
import { Util } from "../utils/Util";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpdateRewardView extends MVC.BaseView {

    @property([cc.Label])
    rewardText: cc.Label[] = [];

    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        // if (GameVoManager.getInstance.stateVo.isUpdateReward == 1) {
        this.rewardText[1].node.parent.active = GameVoManager.getInstance.stateVo.isUpdateReward == 2;
        // }
        let reward = GameVoManager.getInstance.stateVo.isUpdateReward == 2 ? GameVoManager.getInstance.stateVo.rewardDiamond - 500 : GameVoManager.getInstance.stateVo.rewardDiamond;
        this.rewardText[0].string = `${Util.goldFormat(reward)}`;
        this.rewardText[1].string = `500`;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        GameVoManager.getInstance.stateVo.isUpdateReward = 0;
        Notifier.send(ListenID.Game_UpdateCurrencyEffect, 2, GameVoManager.getInstance.stateVo.rewardDiamond);
    }
}
