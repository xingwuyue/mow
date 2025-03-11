import BtnRewardMultController from "./BtnRewardMultController";
import BtnRewardMultModel from "./BtnRewardMultModel";
import { Util } from "../../../utils/Util";
import { Manager } from "../../../manager/Manager";
import { AudioType } from "../../../manager/AudioManager";
import { Cfg } from "../../../config/Cfg";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { GameVoManager } from "../../../manager/GameVoManager";
import { CallID } from "../../../CallID";

const { ccclass, property } = cc._decorator;
let ePos = cc.Enum({
    "draw": 1,
    "result": 2,
    "menu": 3,
    "extra": 4,
    "relive": 5,
});

@ccclass
export default class BtnRewardMultView extends cc.Component {
    @property({ type: ePos })
    type: number = 1;

    @property(cc.Sprite)
    rewardIcon: cc.Sprite = null;

    @property(cc.Label)
    lblGold: cc.Label = null;

    @property(cc.Node)
    drawNode: cc.Node = null;

    @property(cc.Node)
    videoNode: cc.Node = null;

    @property(cc.Label)
    text: cc.Label = null;

    @property(cc.Node)
    selectNode: cc.Node = null;

    @property([cc.SpriteFrame])
    rewardIconSpFrameArr: Array<cc.SpriteFrame> = [];

    private _data: BtnRewardMultModel = BtnRewardMultModel.getInstance();
    private _ctrl: BtnRewardMultController = BtnRewardMultController.getInstance();

    private _rewardCB: Function = null;

    private _isRewardState: boolean = false;

    public _select: boolean = true;

    init(data: { gold: number, callBack?: Function, isOpenDraw?: boolean, text?: string }) {
        this._ctrl.init({ type: this.type, gold: data.gold || 0, isOpenDraw: data.isOpenDraw });
        // if(this.selectNode){
        //     this.selectNode.active = GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes && this.type != 5 ? true : false;
        //     this._select = this.selectNode.active;
        //     this.selectNode.getChildByName("toggle").getChildByName("checkmark").active = this._select;
        //     this.videoNode.getChildByName("layout").getChildByName("icon_video").active = !this._select;
        // }
        this._rewardCB = data.callBack;
        this._isRewardState = false;
        this.onFlush();
        if (this.text) {
            this.text.string = data.text;
        }
        // this.checkShareSwitch();
    }

    refreshSelect() {
        // if(this.selectNode){
        //     this.selectNode.active = GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes && this.type != 5 ? true : false;
        //     this._select = this.selectNode.active;
        //     this.selectNode.getChildByName("toggle").getChildByName("checkmark").active = this._select;
        //     this.videoNode.getChildByName("layout").getChildByName("icon_video").active = !this._select;
        // }
    }

    refreshBtnStatus(data: { gold: number, callBack?: Function, isOpenDraw?: boolean, text?: string }) {
        this._ctrl.refreshBtnStatus({ type: this.type, gold: data.gold || 0, isOpenDraw: data.isOpenDraw });
        this._rewardCB = data.callBack;
        this._isRewardState = false;
        this.onFlush('rewardIcon');
        if (this.text) {
            this.text.string = data.text;
        }
    }

    checkShareSwitch() {
        let isShow = true;
        this.node.active = isShow;
    }

    onReward() {
        Manager.audio.playAudio(501, AudioType.UI);
        // if(this._isRewardState) return;
        // if (this.type == 2) {
        //     let boo = Notifier.call(CallID.ResultIsCloseing);
        //     if (boo) return;
        // }
        // this._isRewardState = true;
        // this._ctrl.onReward({ callBack: this._rewardCB }).then(() => {
        //     this._isRewardState = false;
        // }).catch(() => {
        //     this._isRewardState = false;
        // });
        // if (this.type == 5 && this._ctrl._multRewardType != 3) {
        //     Notifier.send(ListenID.Stop_CountDown);
        // }
        Notifier.send(ListenID.Sign_Double);
    }

    onBackLife() {
        if (this.type == 2) {
            let boo = Notifier.call(CallID.ResultIsCloseing);
            if (boo) return;
        }
        this._isRewardState = true;
        this._ctrl.onReward({ callBack: this._rewardCB }).then(() => {
            this._isRewardState = false;
        }).catch(() => {
            this._isRewardState = false;
        });
        if (this.type == 5 && this._ctrl._multRewardType != 3) {
            Notifier.send(ListenID.Stop_CountDown);
        }
    }

    onFlush(type: string = 'all') {
        switch (type) {
            case 'all': {
                this._updateRewwardIcon();
                this._updateLblGold();
                this._updateGoldImage();
                this._updateReawrdTypeNode();
                this._updateImgMul();
                this._updateBtnRelive();
                break;
            }
            case 'rewardIcon': {
                this._updateRewwardIcon();
                break;
            }

        }
    }

    private _updateRewwardIcon() {
        if (this.rewardIcon) {
            let type = this._data.getRewardType();
            type = type == 1 || type == 2 ? 2 : type;
            let spFrame = this.rewardIconSpFrameArr[type - 1];
            if (spFrame) {
                this.rewardIcon.spriteFrame = spFrame;
            }
        }
        // if (this.type == 5) {
        //     if (this._ctrl._multRewardType == 5) {
        //         let cfg = Cfg.Strike.get(5)
        //         this.videoNode.getChildByName("lbdiamond").active = true;
        //         this.videoNode.getChildByName("lbdiamond").getComponent(cc.Label).string = `${cfg.diamondCount[1]}`;
        //         this.videoNode.getChildByName("layout").y = 10;
        //         this.videoNode.getChildByName("lbdiamond").color = (cfg.diamondCount[1] <= GameVoManager.getInstance.myUserVo.diamond) ? cc.Color.WHITE.fromHEX("#FFFFFF") : cc.Color.WHITE.fromHEX("#FF0000");
        //     } else {
        //         this.videoNode.getChildByName("lbdiamond").active = false;
        //         this.videoNode.getChildByName("layout").y = 0;
        //     }
        // }
    }

    private _updateLblGold() {
        let g = this._data.getGold();
        if (this.lblGold) {
            let m = this._data.getMultNum();
            let gStr = Util.goldFormat(g * m);
            this.lblGold.string = gStr;
        }

    }

    private _updateGoldImage() {
        for (let i = 1; i <= 5; ++i) {
            let spG = cc.find('scale/g' + i, this.node);
            if (spG) {
                let canDraw = this._data.getIsOpenDrawView();
                spG.active = canDraw;
                // spG.stopAllActions();
                // let y = spG.y;
                // spG.active = canDraw;
                // this.scheduleOnce(() => {
                //     spG.runAction(cc.repeatForever(cc.sequence(cc.moveTo(1, cc.v2(spG.x, y + 5)), cc.moveTo(1.5, cc.v2(spG.x, y - 5)))));
                // }, Math.random());
            }
        }
    }

    private _updateReawrdTypeNode() {
        let canDraw = this._data.getIsOpenDrawView();
        if (this.drawNode) {
            this.drawNode.active = canDraw;
            // if(this.drawNode.active && this.selectNode){
            //     this.selectNode.active = false;
            //     this._select = this.selectNode.active;
            //     this.videoNode.getChildByName("layout").getChildByName("icon_video").active = !this._select;
            // }
        }
        if (this.videoNode) {
            this.videoNode.active = !canDraw;
        }
    }

    private _updateImgMul() {
        if (!this.videoNode) return;
        let imgMul = cc.find("text_sbjl", this.videoNode);
        if (!imgMul) return;
        let imgMulSp = imgMul.getComponent(cc.Sprite);
        if (!imgMulSp) return;
        let mulNum = this._data.getMultNum();
        let spName = "text_sbjl";
        let getSpFunc: Function = null;
        if (mulNum == 6) {
            spName = "text_lbjl";
            getSpFunc = Manager.spAtlas.getMember.bind(Manager.spAtlas);
        } else {
            getSpFunc = Manager.spAtlas.getResult.bind(Manager.spAtlas);
        }
        getSpFunc && getSpFunc(spName).then((spFrame: cc.SpriteFrame) => {
            imgMulSp.spriteFrame = spFrame;
        });
    }

    private _updateBtnRelive() {
        let find = cc.find;
        // let btnRelive = find('BtnRewardMult', this.node);
        // if(!btnRelive) return;
        let videoNode = find('scale/videoNode', this.node);
        if (!videoNode) return;

        let isMember = GameVoManager.getInstance.getIsMember() && this._data.getRewardType() == 5;
        let imgLight = find('light_yellow', videoNode);
        if (imgLight) {
            imgLight.active = false;
        }

        let iconVideo = find('layout/icon_video', videoNode);
        if (iconVideo) {
            iconVideo.active = !isMember || this._data.getVipCount() <= 0;
        }

        let imgText = find('layout/text_mxfh', videoNode);
        if (imgText) {
            imgText.active = !isMember;
            // imgText.active = false;
        }

        if (isMember) {
            let imgText1 = find('imgText1', videoNode);
            if (imgText1) {
                imgText1.active = isMember;
            } else {
                let vipCount = this._data.getVipCount();
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
                lblNode.position = cc.v2(90, -28);
                let lbl: cc.Label = lblNode.addComponent(cc.Label);
                lbl.fontSize = 26;
                lbl.string = vipCount + "";
                Manager.loader.LoadAssetAsync("lblFont", "font/number", cc.Font, (name: string, resource: cc.Font, asset: string) => {
                    lbl.font = resource;
                }, null);
            }
        }
    }

    onSelectClick() {
        this._select = !this._select;
        this.videoNode.getChildByName("layout").getChildByName("icon_video").active = !this._select;
        let type = this._select ? 1 : 2;
        this._data.setRewardType(type);
    }
}

