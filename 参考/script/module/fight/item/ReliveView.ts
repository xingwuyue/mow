import { MVC } from "../../../framework/MVC";
import { ShareCode } from "../../../common/Common_Define";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { GameVoManager } from "../../../manager/GameVoManager";
import { AlertManager } from "../../../alert/AlertManager";
import { Manager } from "../../../manager/Manager";
import LevelProgressView from "../../component/progress/LevelProgressView";
import BtnRewardMultView from "../../component/button/BtnRewardMultView";
import { Const } from "../../../config/Const";

const { ccclass, property } = cc._decorator;

let animDelayTime = 0.5;
@ccclass
export default class ReliveView extends MVC.BaseView {

    // @property(cc.Node)
    // btnShare: cc.Node = null;

    @property(cc.Node)
    btnDiamond: cc.Node = null;

    @property(cc.Node)
    btnSkip: cc.Node = null;

    @property(cc.Node)
    prog: cc.Node = null;

    @property(cc.Node)
    progMid: cc.Node = null;

    // @property(cc.Node)
    // btnVideo: cc.Node = null;

    @property(cc.Sprite)
    progMidBar: cc.Sprite = null;

    @property(cc.Node)
    reliveBtn: cc.Node = null;

    reliveTime: number = 6;
    timerAct: boolean = false;
    isShowVideo: boolean = false;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Stop_CountDown, this.stopCount, this);
        Notifier.changeListener(enable, ListenID.Resume_CountDown, this.resumeCount, this);
    }

    stopCount() {
        this.isShowVideo = true;
    }

    resumeCount() {
        this.isShowVideo = false;
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this.reliveBtn.getComponent(BtnRewardMultView).init({ gold: 0, callBack: this.onRelive.bind(this) })
        this.btnDiamond.active = GameVoManager.getInstance.myUserVo.diamond >= Const.ReliveDiamond;
        // this.btnShare.active = GameVoManager.getInstance.gameSwitchVo.relive;
        this.btnSkip.active = false;
        this.timerAct = false;
        this.reliveTime = 6;

        // this.scheduleOnce(() => {
        // this.btnSkip.active = true;
        // let h = HD_MODULE.getPlatform().getSysInfo().screenHeight;
        // if(!h)
        //     h = 640;
        // this.btnSkip.y = 310 - (h);
        // }, 2)
        this.onFlush();
        // HD_MODULE.getPlatform().showBannerByIndex(0);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        super.onClose();
        // HD_MODULE.getPlatform().hideBanner();
    }

    public onBtnDiamond() {
        this.onRelive();
        GameVoManager.getInstance.setDiamond(-Const.ReliveDiamond);
    }

    onSkipRelive() {
        this.isShowVideo = true;
        this.onClose();
        Notifier.send(ListenID.Fight_Pause, false);
        Notifier.send(ListenID.Fight_End, false);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'revive_end', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "revive_end" });
    }

    public onGoldRelive() {
        // Manager.audio.playAudio(501);
        // if (Const.ReliveGold <= GameVoManager.getInstance.myUserVo.gold) {
        //     // GameVoManager.getInstance.myUserVo.gold -= Const.ReliveGold;
        //     // Notifier.send(ListenID.Game_UpdateGold, -Const.ReliveGold);
        //     GameVoManager.getInstance.setGold(-Const.ReliveGold);
        //     Notifier.send(ListenID.Fight_Pause, false);
        //     Notifier.send(ListenID.Fight_ReliveSuccess);
        //     AlertManager.showNormalTips('复活成功，继续战斗吧！');
        //     this.onClose();
        // } else {
        //     AlertManager.showNormalTips('金币不足');
        // }
        // HD_MODULE.getNet().postGameEvent({ event_name: 'revive_gold', counter: 1 });
    }

    public onShareRelive() {
        Manager.audio.playAudio(501);
        let this1 = this;
        this1.onRelive();
    }

    public onVideoRelive() {
        Manager.audio.playAudio(501);
        if (this.isShowVideo) return;
        this.isShowVideo = true;
        this.isShowVideo = false;
        this.onRelive();
        Notifier.send(ListenID.Relive_Video_Success);
    }

    public onRelive() {
        this.onClose();
        Notifier.send(ListenID.Fight_Pause, false);
        Notifier.send(ListenID.Fight_ReliveSuccess);
        AlertManager.showNormalTips('复活成功，继续战斗吧！');
    }

    public onFlush(type: string = 'all') {
        if (!this.node.active) return;
        switch (type) {
            case 'all': {
                this._updateProgBar();
                this._updateProgMid();
                // this._updateBtnVideo();
                // this._updateBtnRelive();
                break;
            }
        }
    }

    private _updateProgBar() {
        if (this.prog) {
            this.prog.getComponent(LevelProgressView).onFlush();
        }
    }

    private _updateProgMid() {
        if (this.progMid) {
            this.progMid.scale = 0;
            this.progMid.stopAllActions();

            this.scheduleOnce(() => {
                this.progMid.runAction(cc.sequence(cc.scaleTo(0.2, 1, 1), cc.callFunc(() => {
                    this.timerAct = true;
                })));
            }, animDelayTime);
        }
    }

    private _updateBtnVideo() {

    }

    public update(dt) {
        if (this.isShowVideo) return;
        if (this.timerAct) {
            if (this.reliveTime > 0) {
                this.reliveTime -= dt;
            }
        }
        if (this.reliveTime > 0) {
            if (this.progMidBar) {
                this.progMidBar.fillRange = (this.reliveTime) / 6;
            }
        }

        if (this.reliveTime <= 0) {
            this.reliveTime = 0;
            this.onSkipRelive();
        }
        let lbl1 = cc.find('progMidLabel', this.progMid);
        if (lbl1) {
            lbl1.getComponent(cc.Label).string = Math.ceil(this.reliveTime) + "";
        }
    }

    private _updateBtnRelive() {
        let find = cc.find;
        let btnRelive = find('BtnRewardMult', this.node);
        if (!btnRelive) return;
        let videoNode = find('scale/videoNode', btnRelive);
        if (!videoNode) return;

        let isMember = GameVoManager.getInstance.getIsMember();

        let imgLight = find('light_yellow', videoNode);
        if (imgLight) {
            imgLight.active = false;
        }

        let iconVideo = find('icon_video', videoNode);
        if (iconVideo) {
            iconVideo.active = !isMember;
        }

        let imgText = find('text_mxfh', videoNode);
        if (imgText) {
            imgText.active = !isMember;
        }

        if (isMember) {
            let imgText1 = find('imgText1', videoNode);
            if (imgText1) {
                imgText1.active = isMember;
            } else {
                // let vipCount = 
                let node = new cc.Node();
                node.name = "imgText1";
                node.parent = videoNode;
                node.position = cc.v2();
                let sp = node.addComponent(cc.Sprite);
                Manager.spAtlas.getMember('text_zjfh').then((spFrame: cc.SpriteFrame) => {
                    sp.spriteFrame = spFrame;
                });

                let lblNode = new cc.Node();
                lblNode.parent = node;
                lblNode.position = cc.v2(90, -30);
                let lbl: cc.Label = lblNode.addComponent(cc.Label);
                lbl.fontSize = 26;
                lbl.string = 5 + "";
                Manager.loader.LoadAssetAsync("lblFont", "font/number", cc.Font, (name: string, resource: cc.Font, asset: string) => {
                    lbl.font = resource;
                }, null);
            }
        }
    }
}
