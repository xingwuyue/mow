import { MVC } from "../../framework/MVC";
import { Const } from "../../config/Const";
import { GameVoManager } from "../../manager/GameVoManager";
import { Manager } from "../../manager/Manager";
import { Util } from "../../utils/Util";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Guide } from "../../common/Common_Define";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EcologicalRewardView extends MVC.BaseView {

    @property(cc.Node)
    rewardItemList: cc.Node[] = [];

    private _args;
    private animaShow = false;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GoldEffect_End, this.onClose, this);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
    }

    public onOpen(args): void {
        this._args = args;
        super.onOpen(args);
        this.initRewardItem(args.data);
    }

    openCallBack() {
        this.rigisterGuideCheck();
    }

    private initRewardItem(rewardData) {
        this.rewardItemList.forEach((item, index) => {
            if (rewardData[index]) {
                Manager.spAtlas.getEcological(rewardData[index][0]).then(res => {
                    item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = res;
                })
                item.getChildByName("lbnum").getComponent(cc.Label).string = Util.goldFormat(rewardData[index][2]);
            } else {
                item.active = false;
            }
        })
    }

    rigisterGuideCheck() {
        /** 领取指引 */
        let btnReward = cc.find(`btn_normal`, this.node);
        let guideData: Guide.GuideItemData = {
            node: btnReward,
            tag: 11302,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onClickNormal();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);
    }

    public onClickNormal() {
        if (this.animaShow) return
        this.animaShow = true;
        Manager.audio.playAudio(501);
        let num = 0;
        this._args.data.forEach(data => {
            switch (data[1]) {
                case Const.rewardType.gold:
                    num = Math.floor(this._args.mut * data[2]);
                    GameVoManager.getInstance.setGold(num);
                    break
                case Const.rewardType.diamond:
                    num = Math.floor(this._args.mut * data[2]);
                    GameVoManager.getInstance.setDiamond(num);
                    break
                case Const.rewardType.power:
                    num = Math.floor(this._args.mut * data[2]);
                    GameVoManager.getInstance.setPower(num);
                    break
                case Const.rewardType.science:
                    num = GameVoManager.getInstance.myUserVo.techP + Math.floor(this._args.mut * data[2]);
                    GameVoManager.getInstance.setTechPoint(num);
                    break
                case Const.rewardType.exp:
                    num = Math.floor(this._args.mut * data[2]);
                    GameVoManager.getInstance.addExp(num);
                    break
            }
        });
        Util.showGoldEffect(this.node, 0, cc.v2(0, 0), cc.v2(-317, 594), 0.1, 0, 1);
        GameVoManager.getInstance.saveEcologicalData();
    }

    public onClickDouble() {
        if (this.animaShow) return
        this.animaShow = true;
        Manager.audio.playAudio(501);
        let args = this._args;
        let double = 2;
        let num = 0;
        args.data.forEach(data => {
            switch (data[1]) {
                case Const.rewardType.gold:
                    num = Math.floor(args.mut * data[2] * double);
                    GameVoManager.getInstance.setGold(num);
                    break
                case Const.rewardType.diamond:
                    num = Math.floor(args.mut * data[2] * double);
                    GameVoManager.getInstance.setDiamond(num);
                    break
                case Const.rewardType.power:
                    num = Math.floor(args.mut * data[2] * double);
                    GameVoManager.getInstance.setPower(num);
                    break
                case Const.rewardType.science:
                    num = GameVoManager.getInstance.myUserVo.techP + Math.floor(args.mut * data[2] * double);
                    GameVoManager.getInstance.setTechPoint(num);
                    break
                case Const.rewardType.exp:
                    num = Math.floor(args.mut * data[2] * double);
                    GameVoManager.getInstance.addExp(num);
                    break
            }
            Util.showGoldEffect(this.node, 0, cc.v2(0, 0), cc.v2(-317, 594), 0.1, 0, 1);
            Notifier.send(ListenID.Log_Event, { event_name: `ecological_video` });
        });
        GameVoManager.getInstance.saveEcologicalData();
    }
}
