import { GameVoManager } from "../../../manager/GameVoManager";
import FightModel from "../../fight/FightModel";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";

const { ccclass, property } = cc._decorator;

/**
 * @description 关卡进度条组件(预制体可复用)
 * @author 蔡乐斯
 * @class LevelProgressView
 * @data 2019-04-26
 */
@ccclass
export default class LevelProgressView extends cc.Component {
    @property(cc.Label)
    lblPreLv: cc.Label = null;

    @property(cc.Label)
    lblCurLv: cc.Label = null;

    @property(cc.Label)
    lblNextLv1: cc.Label = null;

    @property(cc.Label)
    lblNextLv2: cc.Label = null;

    @property(cc.Node)
    arrow1: cc.Node = null;

    @property(cc.Label)
    lblLeave: cc.Label = null;

    @property(cc.Node)
    progMask: cc.Node = null;

    curLv: number = 0;

    onEnable() {
        this.curLv = FightModel.getInstance.curLevel;
        this.onFlush();
        Notifier.changeListener(true, ListenID.Login_User, this.onUserLoginCallBack, this);
    }

    onDisable() {
        Notifier.changeListener(false, ListenID.Login_User, this.onUserLoginCallBack, this);
    }

    onUserLoginCallBack() {
        this.onFlush();
    }

    onFlush(type: string = 'all', param?: { lv: number }) {
        if (!this.node.active) return;
        switch (type) {
            case 'all': {
                this._updateLblPreLv(param);
                this._updateLblCruLv(param);
                this._updateLblNextLv1(param);
                this._updateLblNextLv2(param);
                this._updateArrow1(param);
                this._updateLblLeave();
                this._updateProgMask();
                break;
            }
        }
    }

    private _updateLblPreLv(param?: { lv: number }) {
        if (this.lblPreLv) {
            let lv = (param ? param.lv : this.curLv) - 1;
            this.lblPreLv.string = lv + "";
            this.lblPreLv.node.parent.active = lv > 0;
        }
    }

    private _updateLblCruLv(param?: { lv: number }) {
        if (this.lblCurLv) {
            let lv = (param ? param.lv : this.curLv);
            this.lblCurLv.string = lv + "";
            this.lblCurLv.node.parent.active = lv > 0;
        }
    }

    private _updateLblNextLv1(param?: { lv: number }) {
        if (this.lblNextLv1) {
            let lv = (param ? param.lv : this.curLv) + 1;
            this.lblNextLv1.string = lv + "";
            this.lblNextLv1.node.parent.active = lv > 0;
            if (lv <= GameVoManager.getInstance.myUserVo.topLevel) {
                this.lblNextLv1.node.parent.getComponent(cc.Button).interactable = true;
            } else {
                this.lblNextLv1.node.parent.getComponent(cc.Button).interactable = false;
            }
        }
    }

    private _updateLblNextLv2(param?: { lv: number }) {
        if (this.lblNextLv2) {
            let lv = (param ? param.lv : this.curLv) + 2;
            this.lblNextLv2.string = lv + "";
            this.lblNextLv2.node.parent.active = lv > 0;
        }
    }

    private _updateArrow1(param?: { lv: number }) {
        if (this.arrow1) {
            let lv = (param ? param.lv : this.curLv) - 1;
            this.arrow1.active = lv > 0;
        }
    }

    private _updateLblLeave() {
        if (this.lblLeave) {
            let cur = FightModel.getInstance.killNum;
            let max = FightModel.getInstance.allMonster;
            let per = (cur / max);
            this.lblLeave.string = `${Math.ceil((1 - per) * 100)}%`;
        }
    }

    private _updateProgMask() {
        if (this.progMask) {
            let cur = FightModel.getInstance.killNum;
            let max = FightModel.getInstance.allMonster;
            let per = (cur / max);
            this.progMask.width = 264 * per;
        }
    }
}
