import { MVC } from "../../framework/MVC";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import DrawController from "./DrawController";
import DrawModel from "./DrawModel";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";

const { ccclass, property } = cc._decorator;
/**
 * @description 抽奖视图
 * @author CaiLeSi
 * @data 2019-04-26
 */
@ccclass
export default class DrawView_IOS extends MVC.BaseView {
    @property(cc.Node)
    disc: cc.Node = null;

    @property(cc.Sprite)
    drawTypeImg: cc.Sprite = null;

    @property(cc.Node)
    light: cc.Node = null;

    @property([cc.SpriteFrame])
    btnTypeSpFrameArr: Array<cc.SpriteFrame> = [];

    private _data: DrawModel = DrawModel.getInstance();

    private _isDrawing: boolean = false;

    private angleRandom: number = 0;

    changeListener(b: boolean) {

    }

    onOpen() {
        super.onOpen();
        Notifier.send(ListenID.ShowBanner, 1);
        DrawController.getInstance().init();
        this._isDrawing = false;
        this.disc && (this.disc.rotation = 0);
        this.light.active = false;
        this.onFlush();
        // HD_MODULE.getNet().postGameEvent({ event_name: 'super_reward', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "super_reward" });
    }

    onClose() {
        console.log('999999', this._isDrawing);
        if (this._isDrawing) return
        super.onClose();
        Manager.audio.playAudio(501, AudioType.UI);
        Notifier.send(ListenID.HideBanner);
    }

    onDraw() {
        console.log('是否正在抽奖', this._isDrawing);
        Manager.audio.playAudio(501, AudioType.UI);
        if (this._isDrawing) return;
        let self = this;
        DrawController.getInstance().onDraw().then(() => {
            self._isDrawing = true;
        }).catch(() => {
            self._isDrawing = false;
        });
        // HD_MODULE.getNet().postGameEvent({ event_name: 'draw', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "draw" });

    }

    runDiscAction() {
        if (this.disc) {
            this._isDrawing = true;
            Manager.audio.playAudio(512, AudioType.UI);
            let ag = this._data.getAngle();
            this.disc.stopAllActions();
            this.disc.rotation = this.disc.rotation % 360;
            this.disc.rotation = this.disc.rotation > 180 ? this.disc.rotation - 360 : this.disc.rotation;
            this.disc.runAction(cc.sequence(cc.rotateBy((360 - Math.abs(this.disc.rotation % 360)) / 360, 360 - this.disc.rotation), cc.callFunc(() => {
                this.angleRandom = 45 * Math.random();
                this.disc.runAction(cc.sequence(cc.rotateBy(3, 360 * 10 + ag - 90 + this.angleRandom).easing(cc.easeCubicActionOut()), cc.callFunc(() => {
                    this._runLightAction();
                }), cc.delayTime(0.6), cc.callFunc(() => {
                    this.scheduleOnce(() => {
                        this._isDrawing = false;
                        Manager.audio.playAudio(513, AudioType.UI);
                        DrawController.getInstance().onDrawAnimEnd();
                        this.onClose();
                    }, 0.7);
                })));
            })).easing(cc.easeCubicActionIn()));
        }
    }

    onFlush(type: string = 'all') {
        if (!this.node.active) return;
        switch (type) {
            case 'all': {
                this._updateDrawTypeImg();
                break;
            }
        }
    }

    private _updateDrawTypeImg() {
        if (this.drawTypeImg) {
            let t = this._data.getDrawType();
            let spFrame = this.btnTypeSpFrameArr[t - 1];
            if (spFrame) {
                this.drawTypeImg.spriteFrame = spFrame;
            }
        }
    }

    private _runLightAction() {
        if (this.light) {
            this.light.active = true;
            let ag = this.angleRandom - 22.5;
            this.light.rotation = ag;
            this.light.runAction(cc.blink(0.6, 3));
        }
    }
}
