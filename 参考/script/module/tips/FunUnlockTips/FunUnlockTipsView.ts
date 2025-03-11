import { MVC } from "../../../framework/MVC";
import { FunUnlockTipsData, GameFunID } from "../../../common/Common_Define";
import { Manager } from "../../../manager/Manager";
import FunUnlockTipsModel from "./FunUnlockTipsModel";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { Cfg } from "../../../config/Cfg";
import FunUnlockTipsController from "./FunUnlockTipsController";

const {ccclass, property} = cc._decorator;

let spNameTable = {
    [GameFunID.WeaponLib]:              "",
    [GameFunID.Sign]:                   "img_fun_qd",
    [GameFunID.EquipUpgrade]:           "img_fun_qh",
    [GameFunID.EquipSmelt]:             "img_fun_rl",
    [GameFunID.RewardTask]:             "img_fun_xs",
    [GameFunID.MainDraw]:               "img_fun_zp",
    [GameFunID.Boss]:                   "img_fun_boss",
    [GameFunID.Rank]:                   "img_fun_ph",
    [GameFunID.Ecological]:             "img_fun_st",
    [GameFunID.Technology]:             "img_fun_kj"
}

/**
 * 功能解锁tips
 */
@ccclass
export default class FunUnlockTipsView extends MVC.BaseView {
    /** 静止层 */
    @property(cc.Node)
    staticLayer: cc.Node = null;

    /** 功能玩法图标 */
    @property(cc.Sprite)
    imgFunIcon: cc.Sprite = null;

    /** 知道了按钮 */
    @property(cc.Button)
    btnOK: cc.Button = null;

    /** 解锁文字描述 */
    @property(cc.Label)
    lblFunName: cc.Label = null;

    // private _unlockNode: cc.Node = null;
    private _checkInfo: FunUnlockTipsData = null;

    changeListener(){}

    onOpen(param: FunUnlockTipsData){
        if(param){
            this._checkInfo = param;
            // this._unlockNode = param.node;
            this.resetView();
        }
    }

    onLoad(){
        // this.test();
    }

    test(){
        // this._unlockNode = cc.find("testNode", this.node);
    }

    /** 重置视图元素 */
    resetView(){
        this.staticLayer.active = true;
        this.btnOK.interactable = true;
        this.imgFunIcon.node.stopAllActions();
        this.imgFunIcon.node.position = cc.v2(5, 65);
        this.imgFunIcon.node.scale = 1;
        this.imgFunIcon.node.active = true;
        this.onFlush();
    }

    /** 图标动作 */
    runFunIconMoveToAction(endPos: cc.Vec2): Promise<any>  {
        return new Promise((resolve) => {
            let node = this.imgFunIcon.node;
            let distance = endPos.sub(node.position).mag();
            let speed = 300;
            node.stopAllActions();
            let moveTime = distance / speed * 0.3;
            node.runAction(cc.sequence(cc.delayTime(0.2), cc.scaleTo(moveTime, 0.3)));
            node.runAction(cc.sequence(cc.delayTime(0.2), cc.moveTo(moveTime, endPos), cc.callFunc(() => {
                resolve();
                node.active = false;
            })));
        });
    }

    onBtnOKClick() {
        Manager.audio.playAudio(501);
        this.btnOK.interactable = false;
        this.staticLayer.active = false;
        let wpos = this._checkInfo.node.parent.convertToWorldSpaceAR(this._checkInfo.node.position);
        let lpos = this.node.parent.convertToNodeSpaceAR(wpos);
        this.runFunIconMoveToAction(lpos).then(() => {
            this._checkInfo.node.active = true;
            this.onClose();
            Notifier.send(ListenID.On_FunUnlock, this._checkInfo.funID);
        });
    }

    onClose(){
        super.onClose();
        FunUnlockTipsController.getInstance().isUnlocking = false;
        FunUnlockTipsController.getInstance().checkFunUnlock();
    }

    onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this._updateImgFunIcon();
                this._updateLblFunName();
                break;
            }
        }
    }

    private _updateImgFunIcon(){
        if (!this._checkInfo) return;
        let spName = spNameTable[this._checkInfo.funID];
        Manager.spAtlas.getFunUnlock(spName).then((spFrame) => {
            this.imgFunIcon.spriteFrame = spFrame;
        }).catch(() => {
            console.error("***** FunUnlockTipsView: _updateImgFunIcon err *****", spName);
        });
    }

    private _updateLblFunName(){
        let info = Cfg.UnlockSystem.get(this._checkInfo.funID);
        if (info){
            let name = info.name;
            this.lblFunName.string = "解锁" + name + "功能";
        }
    }
}
