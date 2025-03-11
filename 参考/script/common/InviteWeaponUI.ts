import { MVC } from "../framework/MVC";
import { WXSDK } from "../sdk/WXSDK";
import { Manager } from "../manager/Manager";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { ShareCode, Common_UIPath } from "./Common_Define";
import { GameVoManager } from "../manager/GameVoManager";
import { UIManager } from "../framework/UIManager";
import { Cfg } from "../config/Cfg";
import { NotifyID } from "../framework/NotifyID";
import { AlertManager } from "../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InviteWeaponUI extends MVC.BaseView {

    @property(cc.Node)
    btn_close: cc.Node = null;

    @property(cc.Sprite)
    headList: cc.Sprite[] = [];

    @property(cc.SpriteFrame)
    resSpriteFrame: cc.SpriteFrame[] = [];

    _inviteList = [];

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.bannerResize, this);
    }

    bannerResize() {
        this.btn_close.position = cc.v2(0, WXSDK.bannerY);
        this.btn_close.active = true;
    }

    openCallBack() {

        cc.find("img_yqxq", this.node).getComponent(cc.Sprite).spriteFrame = this.resSpriteFrame[0];
        cc.find("btn_share/layout/text", this.node).getComponent(cc.Sprite).spriteFrame = this.resSpriteFrame[2];
        cc.find("btn_share/layout/icon_video", this.node).active = true;
        cc.find("close", this.node).getComponent(cc.Sprite).spriteFrame = this.resSpriteFrame[3];
        this.headList.forEach(sprite => {
            sprite.spriteFrame = this.resSpriteFrame[1];
            sprite.node.getChildByName("num").active = true;
        });
        cc.find("label", this.node).active = false;
        this.initHeadMark();

    }

    initHeadImg() {
        for (let i = 0; i < this._inviteList.length; i++) {
            let headUrl = this._inviteList[i].mark;
            if (headUrl && headUrl != "") {
                cc.loader.load(headUrl + "?a=a.jpg", (err, tex) => {
                    this.headList[i].spriteFrame = new cc.SpriteFrame(tex);
                })
            }
        }
    }

    initHeadMark() {
        for (let i = 0; i < GameVoManager.getInstance.myUserVo.weaponVideoCount; i++) {
            if (this.headList[i]) {
                let node = this.headList[i].node;
                node.getChildByName("mark").active = true;
            }
        }
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.HideBanner);
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        Notifier.send(ListenID.ShowBanner, 3);
    }

    onShareClick() {
        Manager.audio.playAudio(501);
        this.callFunc();
        Notifier.send(ListenID.Bubble_Weapon_Video_Success);
    }

    callFunc() {
        GameVoManager.getInstance.myUserVo.weaponVideoCount++;
        let msg = "";
        if (GameVoManager.getInstance.myUserVo.weaponVideoCount == 1) {
            msg = "再看四次视频即可获得!";
        } else if (GameVoManager.getInstance.myUserVo.weaponVideoCount == 2) {
            msg = "再看三次视频即可获得!";
        } else if (GameVoManager.getInstance.myUserVo.weaponVideoCount == 3) {
            msg = "再看二次视频即可获得!";
        } else if (GameVoManager.getInstance.myUserVo.weaponVideoCount == 4) {
            msg = "还剩最后一次视频，获得钻石!";
        }
        this.initHeadMark();
        if (GameVoManager.getInstance.myUserVo.weaponVideoCount >= 5) {
            super.close();
            GameVoManager.getInstance.setDiamond(388);
            UIManager.Open(Common_UIPath.RewardUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, { goodsId: 2, goodsNum: 388 });
            Notifier.send(ListenID.Hide_InviteWeaponIcon);
            // }
        } else {
            AlertManager.showNormalTips(msg, MVC.eUILayer.Tips, 1.5);
        }
        GameVoManager.getInstance.saveData();
    }
}
