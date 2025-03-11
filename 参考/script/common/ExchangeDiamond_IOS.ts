import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import { GameVoManager } from "../manager/GameVoManager";
import { Util } from "../utils/Util";
import { AlertManager } from "../alert/AlertManager";
import { AudioType } from "../manager/AudioManager";
import { UIManager } from "../framework/UIManager";
import { Common_UIPath } from "./Common_Define";
import { WXSDK } from "../sdk/WXSDK";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExchangeDiamond_IOS extends MVC.BaseView {

    @property(cc.Label)
    diamondNum: cc.Label = null;

    @property(cc.Label)
    goldNum: cc.Label = null;

    @property(cc.Label)
    tips_gold: cc.Label = null;

    @property(cc.Node)
    getDiamondBtn: cc.Node = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    _exchangeNum = 10;
    _ten: boolean = false;
    _mut: number = 1;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GetInviteReward, this.initInfo, this);
        // Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.bannerResize, this);

    }

    bannerResize() {
        this.btn_close.position = cc.v2(0, WXSDK.bannerY);
        this.btn_close.active = true;
    }

    public onOpen(args: any): void {
        super.onOpen(args);
        this.initInfo();
        Notifier.send(ListenID.ShowBanner, 0);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'home_gold', counter: 1 });
    }

    public initInfo() {
        this.getDiamondBtn.active = false;
        if (GameVoManager.getInstance.myUserVo.diamond >= 10) {
            this._exchangeNum = this._exchangeNum * this._mut < GameVoManager.getInstance.myUserVo.diamond ? this._exchangeNum * this._mut : Math.floor(GameVoManager.getInstance.myUserVo.diamond / 10) * 10;
            this.diamondNum.string = `${this._exchangeNum}`;
            let gold = this.exchangeFunc() * this._exchangeNum / 10;
            let formatGold = Util.goldFormat(gold);
            this.goldNum.string = `${formatGold}`;
        } else {
            this.diamondNum.string = "0";
            this.goldNum.string = "0";
            this._exchangeNum = 0;
        }
        let gold = this.exchangeFunc();
        let formatGold = Util.goldFormat(gold);
        this.tips_gold.string = `${formatGold}`;
    }

    openCallBack() {

    }

    public onAdd() {
        Manager.audio.playAudio(501, AudioType.UI);
        let _max = Math.floor(GameVoManager.getInstance.myUserVo.diamond / 10);
        let _cur = Math.floor(this._exchangeNum / 10);
        if (_max - _cur >= 1) {
            this._exchangeNum = this._exchangeNum + 10 * this._mut < GameVoManager.getInstance.myUserVo.diamond ? this._exchangeNum + 10 * this._mut : _max * 10;;
            this.diamondNum.string = `${this._exchangeNum}`;
            let gold = Math.floor(this._exchangeNum / 10) * this.exchangeFunc();
            let formatGold = Util.goldFormat(gold);
            this.goldNum.string = `${formatGold}`;
        } else {
            UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
        }
    }

    public onSub() {
        Manager.audio.playAudio(501, AudioType.UI);
        if (GameVoManager.getInstance.myUserVo.diamond >= 10) {
            this._exchangeNum = this._exchangeNum - 10 * this._mut < 10 ? 10 : this._exchangeNum - 10 * this._mut;
        } else {
            this._exchangeNum = 0;
        }
        this.diamondNum.string = `${this._exchangeNum}`;
        let gold = Math.floor(this._exchangeNum / 10) * this.exchangeFunc();
        let formatGold = Util.goldFormat(gold);
        this.goldNum.string = `${formatGold}`;
    }

    public onExchange() {
        Manager.audio.playAudio(501, AudioType.UI);
        if (GameVoManager.getInstance.myUserVo.diamond <= 9) {
            UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
            return
        }
        let gold = Math.floor(this._exchangeNum / 10) * this.exchangeFunc();
        let formatGold = Util.goldFormat(gold);
        this.goldNum.string = `${formatGold}`;
        GameVoManager.getInstance.setGold(gold);
        GameVoManager.getInstance.setDiamond(-this._exchangeNum);
        Util.showGoldEffect(this.node, 10, cc.v2(-124.5, 87), cc.v2(-317, 594), 0.1, 0, 1);
        Notifier.send(ListenID.Log_Event, { event_name: "exchange_coin", counter: this._exchangeNum / 10 });
        this._exchangeNum = 10;
        this.initInfo();
        // HD_MODULE.getNet().postGameEvent({ event_name: `exchange_coin`, counter: 1 });
    }

    onButtonTen() {
        this._ten = !this._ten;
        this._mut = this._ten ? 10 : 1;
        if (this._ten) {
            this.initInfo();
        }
    }

    // public goldEffectEnd(){
    //     this.initInfo();
    // }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501, AudioType.UI);
        super.onClose();
        Notifier.send(ListenID.HideBanner);
    }

    public onGetDiamond() {
        // if(!HD_MODULE.getPlatform().getIsHaveVideo()){
        //     AlertManager.showNormalTips("暂无视频！");
        //     return
        // }
        Manager.audio.playAudio(501, AudioType.UI);
        GameVoManager.getInstance.myUserVo.exchangeVideo = 1;
        this.getDiamondBtn.active = false;
        Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(0, 594), 0.1, 0, 2);
        GameVoManager.getInstance.setDiamond(50);
        GameVoManager.getInstance.saveData();
    }

    //10钻石 =（1.05^离线等级*1080+离线等级*72+1.05^掉落等级*400+1600+掉落等级*400+1.1^关卡数*200）/5 金币
    public exchangeFunc(): number {
        let _offlineLv = GameVoManager.getInstance.myUserVo.goldRewardLvs[0] + 1;
        let _dropLv = GameVoManager.getInstance.myUserVo.goldRewardLvs[1] + 1;
        let _pass = GameVoManager.getInstance.myUserVo.topLevel;
        let _n = Number(((Math.pow(1.05, _offlineLv) * 1080 + _offlineLv * 72 + Math.pow(1.05, _dropLv) * 400 + 1600 + _dropLv * 400 + Math.pow(1.05, _pass) * 1000) / 5).toFixed(0));
        return _n
    }
}
