import { Time } from "../../../framework/Time";
import { GameVoManager } from "../../../manager/GameVoManager";
import { Util } from "../../../utils/Util";
import { Manager } from "../../../manager/Manager";
import { Cfg } from "../../../config/Cfg";
import { SignCfg } from "../../../config/SignCfg";

const { ccclass, property } = cc._decorator;
let iconbgcolor = ['#3a353d', '#0c7edb', '#e98e48'];
@ccclass
export default class SignItem extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property([cc.Node])
    bgList: cc.Node[] = [];

    @property(cc.Node)
    signedNode: cc.Node = null;

    @property(cc.Node)
    iconBg: cc.Node = null;

    _round: number = 1;
    _signCfg: SignCfg;

    start() {

    }

    updateState(signday, curday) {
        this.getCfgSign(curday);
        this.showItemInfo();
        let state = 0;
        if (signday % 7 > curday) {
            state = 0;
        } else if (signday % 7 < curday) {
            state = 1;
        } else if (signday % 7 == curday) {
            let date = new Date(Time.serverTimeMs);
            if (date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay) {
                state = 2;
            } else {
                state = 1;
            }
        }
        this.bgList[0].active = state == 0;
        this.bgList[1].active = state == 1;
        this.bgList[2].active = state == 2;
        this.bgList[3].active = state == 0;
        this.signedNode.active = state == 0;
        this.iconBg.color = cc.Color.WHITE.fromHEX(iconbgcolor[state]);
    }

    getCfgSign(curday) {
        if (GameVoManager.getInstance.myUserVo.signDay >= 7) {
            this._signCfg = Cfg.Sign.get(7 + curday + 1);
            this._round = 2;
        } else {
            this._signCfg = Cfg.Sign.get(1 + curday);
            this._round = 1;
        }
    }

    //awardType 0 金币 1 武器 2道具, 3钻石
    showItemInfo() {
        let sprite = this.node.getChildByName("itemSprite").getComponent(cc.Sprite);
        let lb_num = this.node.getChildByName("itemSprite").getChildByName("num").getComponent(cc.Label);
        if (this._signCfg.awardType == 0) {
            Manager.spAtlas.getResIcon("gold_small").then((res) => {
                this.setAsyncSprite(sprite, res);
            })
            lb_num.string = `${this._signCfg.awardCount}`;
        } else if (this._signCfg.awardType == 1) {
            Manager.spAtlas.getWeaponIcon(this._signCfg.awardID).then((res) => {
                this.setAsyncSprite(sprite, res);
            })
        } else if (this._signCfg.awardType == 2) {
            Manager.spAtlas.getToolIcon(this._signCfg.awardID).then((res) => {
                this.setAsyncSprite(sprite, res);
            })
        } else if (this._signCfg.awardType == 3) {
            let lb_num = this.node.getChildByName("itemSprite").getChildByName("num").getComponent(cc.Label);
            Manager.spAtlas.getResIcon("diamond_small").then((res) => {
                this.setAsyncSprite(sprite, res);
            })
            lb_num.string = `${this._signCfg.awardCount}`;
        }
        if (this._round == 2) {
            this.node.getChildByName("itemSprite").scale = 1.0;
            this.node.getChildByName("itemSprite").getChildByName("num").active = true;
        }
    }

    setAsyncSprite(sprite: cc.Sprite, res: cc.SpriteFrame) {
        if (this.node && sprite) {
            sprite.spriteFrame = res;
        }
    }
    // update (dt) {}
}
