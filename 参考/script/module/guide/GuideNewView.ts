import { MVC } from "../../framework/MVC";
import GuideNewModel from "./GuideNewModel";
import GuideNewController from "./GuideNewController";
import { Util } from "../../utils/Util";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Const } from "../../config/Const";
import { GameVoManager } from "../../manager/GameVoManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GuideNewView extends MVC.BaseView {
    @property(cc.Node)
    spArrow: cc.Node = null;

    @property(cc.Node)
    guideBlock: cc.Node = null;

    @property(cc.Node)
    btnEvent: cc.Node = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Label)
    lb_text: cc.Label = null;

    @property(cc.Node)
    guideLayer: cc.Node = null;

    @property(cc.Node)
    dialogLayer: cc.Node = null;

    @property(cc.Label)
    lblDialog: cc.Label = null;

    @property(cc.Node)
    anyKey: cc.Node = null;

    _data: GuideNewModel = null;

    endPos: cc.Vec2 = cc.v2(0, 0);

    _target: cc.Node = null;
    _callBack: Function = null;
    _blockW: number = 0;
    _blockH: number = 0;
    _isClickEvent: boolean = false;
    _isDialog: boolean = false;
    _isBtnGuide: boolean = false;
    _waitTime: number = 0;
    _anyKeyShow: boolean = false;

    changeListener(enable: boolean){
        Notifier.changeListener(enable, ListenID.UI_Close, this.onUIClose, this);        
    }

    onLoad(){
        this._data = GuideNewController.instance.getData();

    }

    onOpen(){
        this.changeListener(true);
        this.setInfo();
        this.btnEvent.on(cc.Node.EventType.TOUCH_START, this.onEventTouch, this);
        // this.btnEvent._touchListener.setSwallowTouches(false);
        // GameVoManager.getInstance.addEquip(10001);
    }

    onUIClose(data: {closeGuide: boolean}){
        if(data){
            let closeGuide = data.closeGuide;
            if(closeGuide){
                GuideNewController.getInstance().closeGuideView();
            }
        }
    }

    onClose(){
        super.onClose();
        this.btnEvent.off(cc.Node.EventType.TOUCH_START, this.onEventTouch, this);
        this._data.setIsGuideing(false);
    }

    setInfo(){
        let tag = this._data.getCurNodeTag();
        let info = this._data.getNodeInfoByTag(tag);
        let guideType = this._data.getGuideType();
        this._data.setIsGuideing(true);
        this._waitTime = 0;
        cc.log(this._data,tag,info,guideType);
        if (info) {
            this._target = info.node;
            this._callBack = info.callBack;
            if (info.node && info.node.name){
                this.btnEvent.width = info.node.width + 20;
                this.btnEvent.height = info.node.height + 20;
            }
        }
        if (guideType == Const.GuideType.Dialog) {
            this.showDialog(this._data.getTips());
        }else{
            if (!this._target || !this._target.parent) return;
            this.showGuide();
            // this.node.parent = this._target.parent;
            this.lb_text.node.parent.active = false;
            this.setArrowAnimPlay(false);
            this.onFlush();
        // this.schedule(this.updateFunc, 0.5);
        }
    }

    showDialog(text: string){
        this._isDialog = true;
        this.guideLayer.active = !this._isDialog;
        this.dialogLayer.active = this._isDialog;

        let imgDialogBG = cc.find(`img2`, this.dialogLayer);
        let anyKeyNode = cc.find(`anyKey`, this.dialogLayer);
        this.lblDialog.string = ``;

        // anyKeyNode.active = false;
        this._anyKeyShow = false;
        imgDialogBG.scaleX = 0;
        this.guideBlock.width = 0;
        this.guideBlock.height = 1;
        imgDialogBG.stopAllActions();
        this.lblDialog.node.stopAllActions();

        imgDialogBG.runAction(cc.sequence(cc.scaleTo(0.4, 1, 1), cc.callFunc(() => {
            this.lblDialog.string = text;
            this.lblDialog.node.y = 70;
            this.lblDialog.node.runAction(cc.sequence(cc.moveTo(0.2, 40, 52), cc.callFunc(() => {
                // anyKeyNode.active = true;
                this._anyKeyShow = true;
            })));
        })));
    }

    showGuide(){
        this._isDialog = false;
        this.guideLayer.active = !this._isDialog;
        this.dialogLayer.active = this._isDialog;
    }

    onEventTouch(event: cc.Event){
        // event.currentTarget._touchListener.setSwallowTouches(false);
        this.onBtnTouch(null, `2`);
    }

    onTouchBG(){
        // this.showDialog(`哈哈哈哈`);
        // this.showGuide();
        // if(this._isDialog){

        // }else{

        // }
        cc.log(`-----> nextId1`, this._data.getGuideId());
        if (this.getCanNext()){
            if (!this._isBtnGuide) {
                if (this._isDialog) {
                    GuideNewController.getInstance().onNextGuide();
                    // if (!this._isBtnGuide)
                    // else{
                    //     this._isBtnGuide = false;
                    // }
                } else {
                    this._isBtnGuide = false;
                }
            } else {
                this._isBtnGuide = false;
            }
        }
    }

    onBtnTouch(event: cc.Event, custom){
        if (!this.getCanNext()) return;
        if(custom == "2" || custom == "1"){
            this._isClickEvent = true;
            this._isBtnGuide = true;
            this._target = null;
            this._callBack && this._callBack();
            // this.scheduleOnce(() => {
            GuideNewController.getInstance().onNextGuide();
            this._isClickEvent = false;
            this._isBtnGuide = false;
            // }, 0);
            // this.scheduleOnce(() => {

            // });
            // this._showText();
        }
    }

    // openCallBack(){
    //     this.node.active = false;
    // }

    setArrowAnimPlay(isPlay: boolean){
        let anim = this.spArrow.getComponent(cc.Animation);
        if(!anim) return
        isPlay ? anim.play() : anim.stop();
    }

    onFlush(type: string = 'all'){
        if(!this.node.active) return;
        switch(type){
            case 'all': {
                // this._updateBlockEff();
                this._updateBlockPos();
                this._updateBlockSize();
                this._updateBtnEventPos();
                break;
            }
        }
    }

    private _updateBlockEff(){
        let guideId = this._data.getGuideId();
        if(guideId){
            let showEff = this._data.getShowEff();
            if(showEff){
                this.guideBlock.width = 720;
                this.guideBlock.height = 720; 
            }
        }
        if(this.spArrow){
            // this.spArrow.active = false;
        }
    }

    updateArrow(){
        if(this.spArrow){
            // this.spArrow.stopAllActions();
            // this.btnEvent.stopAllActions();
            // let arrowEndPos = this.endPos.sub(cc.v2(-20, 70))
            // this.spArrow.position = arrowEndPos;
            // let dt = 0.6;
            // let dir = this._data.getArrowDir();
            // if(dir == 1 || dir == 2){
            //     this.spArrow.rotation = dir == 1 ? 180 : 0;
            //     this.spArrow.position = dir == 1 ? cc.v2(arrowEndPos.x - 40, arrowEndPos.y + 150) : arrowEndPos;
            //     this.spArrow.runAction(cc.repeatForever(cc.sequence(cc.moveBy(dt, cc.v2(0, 20)), cc.moveBy(dt, cc.v2(0, - 20)))));
            // }else {
            //     this.spArrow.rotation = dir == 3 ? 90 : 270;
            //     this.spArrow.position = dir == 3 ? cc.v2(arrowEndPos.x - 70, arrowEndPos.y + 30) : cc.v2(arrowEndPos.x + 30, arrowEndPos.y + 70);
            //     this.spArrow.runAction(cc.repeatForever(cc.sequence(cc.moveBy(dt, cc.v2(20, 0)), cc.moveBy(dt, cc.v2(- 20, 0)))));
            // }
            // this.btnEvent.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(dt, 0.95), cc.scaleTo(dt, 1.05))));
        }
    }

    private _updateBtnEventPos(){
        if(this.btnEvent){
            this.btnEvent.position = this.endPos;
            // this.btnEvent.width = 0;
            // this.btnEvent.height = 0;
            // if(this._target){
            //     this.btnEvent.width = this._target.width;
            //     this.btnEvent.height = this._target.height;
            // }
        }
    }

    private _updateBlockPos(){
        if (this._target){
            let pWorld = this._target.parent.convertToWorldSpaceAR(this._target.position);
            let locPos = this.node.convertToNodeSpaceAR(pWorld);
            // if(GuideNewController.getInstance()._nextId == 18){     //特殊处理
            //     locPos.y += 80;
            // }
            this.endPos = locPos;
        }
    }

    private _updateBlockSize(){
        if(!this._target) return;
        let rectSize = this._data.getRectSize();
        let w = rectSize[0];
        let h = rectSize[1];
        let x = rectSize[2];
        let y = rectSize[3];
        // if(GuideNewController.getInstance()._nextId == 18){     //特殊处理
        //     this._target.width = 170;
        //     this._target.height = 130;
        // }
        // this._blockH = h ? h : this._target.height;
        // this._blockW = w ? w : this._target.width;
        this._blockH = h ? h : 150;
        this._blockW = w ? w : 250;
        this.endPos.x = x ? x : this.endPos.x;
        this.endPos.y = y ? y : this.endPos.y;
    }

    private _showText(){
        // if (this.lb_text){
        //     this.lb_text.string = this._data.getTips();
        //     let pos = this._data.gettipsPos();
        //     let offsetX = pos[0];
        //     let offsetY = pos[1];
        //     this.lb_text.node.parent.x = this.endPos.x + offsetX;
        //     this.lb_text.node.parent.y = this.endPos.y + 70 + offsetY;
        //     this.lb_text.node.parent.active = false;
        // }
    }

    update(dt){
        //** 指引方块大小变化 */
        this._waitTime += dt;
        let anyKeyNode = cc.find(`anyKey`, this.dialogLayer);
        anyKeyNode.active = this._anyKeyShow && this.getCanNext();
        if(this._data.getWaitTime() > 0){
            if (anyKeyNode.active){
                GuideNewController.getInstance().onNextGuide();
            }
        }
        if (!cc.isValid(this._target)) {
            if (!this._isDialog) {
                this.setInfo();
            }
            return;
        }
        // let delta = 40;
        // if (this.guideBlock.width != this._target.width) {
        //     this.guideBlock.width -= delta * (this.guideBlock.width > this._target.width ? 1 : -1);
        //     if (Math.abs(this.guideBlock.width - this._target.width) < delta) {
        //         this.guideBlock.width = this._target.width;
        //     }
        // }
        // if (this.guideBlock.height != this._target.height) {
        //     this.guideBlock.height -= delta * (this.guideBlock.height > this._target.height ? 1 : -1);
        //     if (Math.abs(this.guideBlock.height - this._target.height) < delta) {
        //         // this.guideBlock.height = this._target.height;
        //     }
        // }

        /** 指引方块位置变化 */
        if(this.spArrow.position.x != this.endPos.x || this.spArrow.y != this.endPos.y){
            let speed = 30;
            let dir = this.endPos.sub(this.spArrow.position).normalize();
            this.spArrow.x += speed * dir.x;
            this.spArrow.y += speed * dir.y;
            this.mask.x -= speed * dir.x;
            this.mask.y -= speed * dir.y;
            this.guideBlock.x += speed * dir.x;
            this.guideBlock.y += speed * dir.y;
            if(this.endPos.sub(this.spArrow.position).mag() <= speed + 10){
                this.spArrow.position = this.endPos;
                this.mask.x = -this.endPos.x;
                this.mask.y = -this.endPos.y;
                // this.btnEvent.width = this._blockW;
                // this.btnEvent.height = this._blockH;
                this.guideBlock.width = this._target.width;
                this.guideBlock.height = this._target.height;
                this.guideBlock.x = this.endPos.x;
                this.guideBlock.y = this.endPos.y;

                if(this.spArrow){
                    this.spArrow.active = true;
                    this.updateArrow();
                    this.setArrowAnimPlay(true);
                    this._showText();
                }
            }
        }
        if (this.spArrow.position.x == this.endPos.x && this.spArrow.y == this.endPos.y){
            // this._showText();
            if (cc.isValid(this._target) && this.guideBlock){
                this.guideBlock.width = this._target.width;
                this.guideBlock.height = this._target.height;
                this.guideBlock.x = this.endPos.x;
                this.guideBlock.y = this.endPos.y;
            }
        }

    }

    getCanNext(){
        return this._waitTime >= this._data.getWaitTime();
    }
}
