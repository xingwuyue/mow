import { MVC } from "../../framework/MVC";
import { Cfg } from "../../config/Cfg";
import { EventCfg } from "../../config/EventCfg";
import { Manager } from "../../manager/Manager";
import { AlertManager } from "../../alert/AlertManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Util } from "../../utils/Util";
import FightModel from "../fight/FightModel";
import EventModel from "./EventModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EventView extends MVC.BaseView {

    @property(cc.Label)
    confirm1: cc.Label = null;

    @property(cc.Label)
    confirm2: cc.Label = null;

    @property(cc.RichText)
    content: cc.RichText = null;

    @property(cc.Node)
    videoIcon: cc.Node = null;

    @property(cc.Node)
    goodsItem: cc.Node = null;

    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        Notifier.send(ListenID.Fight_Pause, true);
        super.onOpen(args);
        this.setInfo(args);
    }

    private _state: number = 0;//0 问答 1结果
    private _cfgdata: EventCfg;
    private selectIndex: String = "A";
    private _rewardList: Array<number>;
    public setInfo(args) {
        let eventid = args.id || 1;
        this._cfgdata = Cfg.Event.get(eventid);
        EventModel.getInstance.setTiggerId(eventid);
        this._state = 0;
        this.updateInfo(this._state);
    }

    public updateInfo(state: number = 0) {
        if (state == 0) {
            this.content.string = this._cfgdata.eventText;
            this.confirm1.string = this._cfgdata.optionA;
            this.confirm2.string = this._cfgdata.optionB;
            this.videoIcon.active = false;
            this.goodsItem.parent.parent.active = false;
            this.updateBtn();
        } else if (state == 1) {
            this.content.string = this._cfgdata['resultText' + this.selectIndex];
            this.confirm1.string = '接受';
            let adveffect = this._cfgdata['advEffect' + this.selectIndex];
            this.confirm2.node.parent.parent.parent.active = adveffect != 1;//1无广告
            this.videoIcon.active = adveffect != 1;
            let rewardlist = this._cfgdata['result' + this.selectIndex];
            let rewardicon = this._cfgdata['resultIcon' + this.selectIndex];
            this._rewardList = rewardlist;
            this.updateReward(rewardlist, rewardicon);
            if (adveffect == 2) {
                this.confirm2.string = "效果翻倍";
            } else if (adveffect == 3) {
                this.confirm2.string = "不接受";
            }
            this.updateBtn();
        }
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Fight_Pause, false);
        super.onClose();
    }

    public btnConfirm1() {
        if (this._state == 0) {
            this.selectIndex = "A";
            this._state = 1;
            Manager.audio.playAudio(501);
            this.updateInfo(this._state);
        } else {//normal
            let resulttips = this._cfgdata['result' + this.selectIndex + 'Tips'];
            AlertManager.showNormalTips(resulttips);
            this.onReward();
            this.onClose();
        }
    }

    public btnConfirm2() {
        if (this._state == 0) {
            this.selectIndex = "B";
            this._state = 1;
            Manager.audio.playAudio(501);
            this.updateInfo(this._state);
        } else {
            let adveffect = this._cfgdata['advEffect' + this.selectIndex];
            if (adveffect == 2) {//效果翻倍
                let resulttips = this._cfgdata['Effect' + this.selectIndex + 'Tips'];
                this.onReward(true);
                Notifier.send(ListenID.Log_Event, { event_name: "event_double_video" });
                AlertManager.showNormalTips(resulttips);
                this.onClose();
            } else {//3 不接受
                this.onReward(true);
                Notifier.send(ListenID.Log_Event, { event_name: "event_cancel_video" });
                this.onClose();
            }
        }
    }

    public onReward(isdouble: boolean = false) {
        let list = this._rewardList;
        let len = list.length;
        for (let i = 0; i < len; i++) {
            let data = list[i];
            if (data[0] == 1) {
                Notifier.send(ListenID.Fight_AddSkill, data[1], isdouble);
            } else if (data[0] == 2) {//试用武器
                Notifier.send(ListenID.Fight_TryEquip, data[1], isdouble ? data[2] * 2 : data[2]);
            } else if (data[0] == 3) {
                if (data[1] == 1) {
                    let gold = data[2];
                    if (isdouble) { gold += data[2] };
                    if (data[2] < 0) {
                        gold = Math.ceil(FightModel.getInstance.goldInCome * data[2] / 100);
                    }
                    FightModel.getInstance.goldInCome += gold;
                    Notifier.send(ListenID.Fight_GetGold, gold);
                } else if (data[1] == 2) {
                    let diamondInCome = data[2];
                    if (isdouble) { diamondInCome += data[2] };
                    FightModel.getInstance.diamondInCome += diamondInCome;
                }
            }

        }
    }

    public updateBtn() {
        if (this._state == 0) {
            this.confirm1.node.parent.parent.y = -198;
            this.confirm2.node.parent.parent.parent.y = -336;
        } else {
            this.confirm1.node.parent.parent.y = -275;
            this.confirm2.node.parent.parent.parent.y = -413;
        }
    }

    public updateReward(list: Array<number>, iconlist: Array<string>) {
        let len = list.length;
        if (len <= 0) {
            this.goodsItem.parent.parent.active = false;
        } else {
            this.goodsItem.parent.parent.active = true;
            this.updateRewardIcon(this.goodsItem, list[0], iconlist[0]);
            for (let i = 1; i < len; i++) {
                let node = cc.instantiate(this.goodsItem);
                node.parent = this.goodsItem.parent;
                this.updateRewardIcon(node, list[i], iconlist[i]);
            }
        }
    }
    public updateRewardIcon(node: cc.Node, rewardinfo, icon: string) {
        let iconsp = node.getChildByName("icon").getComponent(cc.Sprite);
        let goodsName = node.getChildByName("goodsName").getComponent(cc.Label);
        let goodsNum = node.getChildByName("goodsNum").getComponent(cc.Label);
        let type = rewardinfo[0];
        Manager.spAtlas.getEventIcon(icon).then(res => {
            iconsp && (iconsp.spriteFrame = res);
        })
        if (type == 1) {//skill
            let skillinfo = Cfg.Skill.get(rewardinfo[1]);
            if (skillinfo) {
                goodsName.string = skillinfo.skillName;
                goodsNum.node.active = false;
            }
        } else if (type == 2) {//试用武器
            let gun = Cfg.Equip.get(rewardinfo[1]);
            if (gun) {
                goodsName.string = gun.name;
                goodsNum.node.active = false;
            }
        } else if (type == 3) {//货币
            goodsName.string = rewardinfo[1] == 1 ? "金币" : "钻石";
            goodsNum.node.active = true;
            if (rewardinfo[2] > 0) {
                goodsNum.string = `+${Util.goldFormat(rewardinfo[2])}`
            } else {
                goodsNum.string = rewardinfo[2] + "%";
            }
        }

    }
}
