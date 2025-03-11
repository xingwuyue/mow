import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import { NotifyID } from "../../framework/NotifyID";
import { GameVoManager } from "../../manager/GameVoManager";
import { ShareCode, Common_UIPath, GameFunID, TaskSubType } from "../../common/Common_Define";
import { UIManager } from "../../framework/UIManager";
import { Cfg } from "../../config/Cfg";
import { SurpriseCfg } from "../../config/SurpriseCfg";
import { Util } from "../../utils/Util";
import { AlertManager } from "../../alert/AlertManager";
import { WXSDK } from "../../sdk/WXSDK";
import { Const } from "../../config/Const";
import { CallID } from "../../CallID";

const { ccclass, property } = cc._decorator;
/**
 * @description 抽奖视图
 * @author CaiLeSi
 * @data 2019-04-26
 */
@ccclass
export default class MainDrawView_IOS extends MVC.BaseView {
    @property(cc.Node)
    disc: cc.Node = null;

    @property(cc.Node)
    icon_share: cc.Node = null;

    @property(cc.Node)
    icon_video: cc.Node = null;

    @property(cc.Node)
    icon_free: cc.Node = null;

    @property(cc.Node)
    icon_choujiang: cc.Node = null;

    @property(cc.Node)
    light: cc.Node = null;

    @property(cc.Label)
    lb_num: cc.Label = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    @property(cc.Node)
    btnExchange: cc.Node = null;


    _isDrawing: boolean = false;
    _isDraw: boolean = false;
    _drawData: SurpriseCfg[] = [];
    _index: number = 0;


    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.bannerResize, this);
    }

    bannerResize() {
        this.btn_close.position = cc.v2(0, WXSDK.bannerY);
        this.btn_close.active = true;
    }

    onOpen() {
        super.onOpen();
        // this.disc && (this.disc.rotation = 0);
        this.refreshItem();
        // Notifier.send(ListenID.ShowBanner, 3);
    }

    refreshItem() {
        // if (HD_MODULE.getPlatform().isIOS() || HD_MODULE.getPlatform().isAndroid()) {
        //     // this.btnExchange.active = true;
        //     this.btnExchange.getChildByName("lb_chip").getComponent(cc.Label).string = `${GameVoManager.getInstance.myUserVo.weaponChip}`;
        // }
        this._drawData = this.filterData();
        this._isDrawing = false;
        this.light.active = false;
        this.lb_num.string = `${Const.MainDrawTimes - GameVoManager.getInstance.myUserVo.mainDrawTimes}/${Const.MainDrawTimes}`;
        if (GameVoManager.getInstance.myUserVo.mainDrawTimes) {
            this.icon_share.active = GameVoManager.getInstance.myUserVo.shareTimes >= GameVoManager.getInstance.myUserVo.totalShareTimes ? false : true;
            this.icon_video.active = !this.icon_share.active;
        } else {
            this.icon_share.active = false;
            this.icon_video.active = false;
        }
        this.icon_free.active = GameVoManager.getInstance.myUserVo.mainDrawTimes == 0 ? true : false;
        if (this.icon_share.active || this.icon_video.active) {
            this.icon_choujiang.position = cc.v2(40, 2);
        } else {
            this.icon_choujiang.position = cc.v2(0, 2);
        }
        this.initDrawItem();
    }

    initDrawItem() {
        for (let i = 0; i < this._drawData.length; i++) {
            let item = this.disc.children[i];
            let data = this._drawData[i];
            // if(data.awardType == 1 || data.awardType == 2 || data.awardType == 3 || data.awardType == 5){        
            //     Manager.spAtlas.getResIcon(data.iocn).then((res) => {
            //         item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = res;
            //     })
            //     this.initDrawItemNum(i, item);
            // }else if(data.awardType == 4){
            //     if(GameVoManager.getInstance.myUserVo.weaponList[data.awardCardinal]){
            //         data = Cfg.Surprise.get(data.next);
            //         this._drawData[i] = data;
            //         if(data.awardType == 1 || data.awardType == 2 || data.awardType == 3 || data.awardType == 5){        
            //             Manager.spAtlas.getResIcon(data.iocn).then((res) => {
            //                 item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = res;
            //             })
            //         }
            //     }else{
            //         Manager.spAtlas.getWeaponIcon(data.awardCardinal).then((res) => {
            //             item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = res;
            //         })
            //     }
            //     this.initDrawItemNum(i, item);
            // }
            let loadIconFun = Manager.spAtlas.getResIcon.bind(Manager.spAtlas);
            let name = data.iocn;
            let scale = 1;
            let x = -145;
            let y = 140;
            if (data.awardType == 4) {
                if (GameVoManager.getInstance.myUserVo.isGetMainDraw) {
                    data = Cfg.Surprise.get(data.next);
                    name = data.iocn;
                    this._drawData[i] = data;
                } else {
                    loadIconFun = Manager.spAtlas.getMainDraw.bind(Manager.spAtlas);
                    name = data.iocn;
                    scale = 0.6;
                    y = 130;
                    x = -130;
                }
            }
            loadIconFun(name).then((res) => {
                this.disc.getChildByName("icon" + (i + 1)).getComponent(cc.Sprite).spriteFrame = res;
                this.disc.getChildByName("icon" + (i + 1)).scale = scale;
                if (i == 7) {
                    this.disc.getChildByName("icon" + (i + 1)).x = x;
                    this.disc.getChildByName("icon" + (i + 1)).y = y;
                }
            })
            this.initDrawItemNum(i, this.disc);
        }
    }

    initDrawItemNum(index: number, item: cc.Node) {
        let data = this._drawData[index];
        let str = "";
        if (data.awardType == 1) {
            let gold = data.awardCardinal;
            let goldStr = Util.goldFormat(gold);
            str = goldStr;
        } else if (data.awardType == 2) {
            str = data.awardCardinal + "";
        } else if (data.awardType == 3) {
            let gold = Notifier.call(CallID.Offline_GetRewardByTime, data.awardCardinal * 3600);
            let goldStr = Util.goldFormat(gold);
            str = goldStr;
        } else if (data.awardType == 4) {
            str = "";
        }
        else {
            str = data.text;
        }
        item.getChildByName("label" + (index + 1)).getComponent(cc.Label).string = str;
    }

    onClose() {
        if (this._isDrawing || this._isClosed) return;
        super.onClose();
        Manager.audio.playAudio(501, AudioType.UI);
        // Notifier.send(ListenID.HideBanner);
        Notifier.send(ListenID.MainDrawClose);
        Notifier.send(ListenID.Log_Event, { event_name: "home_draw_close" });
    }

    onDraw() {
        this._isDraw = false;
        // Notifier.send(ListenID.Main_Draw_Video_Success);

        Manager.audio.playAudio(501, AudioType.UI);
        if (GameVoManager.getInstance.myUserVo.mainDrawTimes >= Const.MainDrawTimes) {
            AlertManager.showNormalTips("今日次数已用完!");
            return
        }
        if (this._isDrawing) return;
        if (GameVoManager.getInstance.myUserVo.mainDrawTimes == 0) {
            this.runDiscAction();
            return
        }
        if (this.icon_share.active) {
            GameVoManager.getInstance.myUserVo.shareTimes++;
            this.runDiscAction();
        } else if (this.icon_video.active) {
            this.runDiscAction();
            Notifier.send(ListenID.Main_Draw_Video_Success);
        }
    }

    runDiscAction() {
        if (this.disc) {
            this._isDrawing = true;
            Manager.audio.playAudio(512, AudioType.UI);
            this._index = this.randomItemIndex();
            this.disc.stopAllActions();
            this.disc.rotation = this.disc.rotation % 360;
            this.disc.rotation = this.disc.rotation > 180 ? this.disc.rotation - 360 : this.disc.rotation;
            this.disc.runAction(cc.sequence(cc.rotateBy((360 - Math.abs(this.disc.rotation % 360)) / 360, 360 - this.disc.rotation), cc.callFunc(() => {
                this.disc.runAction(cc.sequence(cc.rotateBy(3, 360 * 10 - (this._index) * 45).easing(cc.easeCubicActionOut()), cc.callFunc(() => {
                    this._runLightAction();
                }), cc.delayTime(0.6), cc.callFunc(() => {
                    this.scheduleOnce(() => {
                        this.runDiscEnd();
                    }, 0.7);
                })));
            })).easing(cc.easeCubicActionIn()));
        }
    }

    runDiscEnd() {
        if (this._isDraw) return;
        this._isDraw = true;
        // HD_MODULE.getNet().postGameEvent({ event_name: 'home_draw_success', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "home_draw_success" });
        let isFirstDraw = GameVoManager.getInstance.myUserVo.isFirstDraw;
        if (isFirstDraw) {
            isFirstDraw = false;
            Notifier.send(ListenID.Log_Event, { event_name: "first_home_draw_success" });
        }
        this._isDrawing = false;
        Manager.audio.playAudio(513, AudioType.UI);
        let data = this._drawData[this._index];
        GameVoManager.getInstance.myUserVo.mainDrawTimes++;
        Notifier.send(ListenID.MainDrawEnd);
        if (data.awardType == 1) {
            let gold = data.awardCardinal;
            GameVoManager.getInstance.setGold(gold);
            this.goldEffectShow(1);
            let goldStr = Util.goldFormat(gold);
            AlertManager.showNormalTips(`恭喜获得${goldStr}金币！`)
        } else if (data.awardType == 2) {
            GameVoManager.getInstance.setDiamond(data.awardCardinal);
            this.goldEffectShow(2);
            AlertManager.showNormalTips(`恭喜获得${data.awardCardinal}钻石！`)
        } else if (data.awardType == 3) {
            let gold = Notifier.call(CallID.Offline_GetRewardByTime, data.awardCardinal * 3600);
            GameVoManager.getInstance.setGold(gold);
            let goldStr = Util.goldFormat(gold);
            AlertManager.showNormalTips(`恭喜获得${goldStr}金币！`)
            this.goldEffectShow(1);
        } else if (data.awardType == 4) {
            if (!GameVoManager.getInstance.myUserVo.isGetMainDraw) {
                UIManager.Open(Common_UIPath.RewardUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, { goodsId: data.awardCardinal, goodsNum: 1 });
                GameVoManager.getInstance.myUserVo.isGetMainDraw = 1;
                GameVoManager.getInstance.addEquip(data.awardCardinal);
                let equipdata = Cfg.Equip.get(data.awardCardinal);
                if (equipdata && equipdata.quality >= 4) {
                    Notifier.send(ListenID.Announce_AddMessage, GameVoManager.getInstance.myUserVo.nickName, GameFunID.MainDraw, equipdata.name);
                }
                Notifier.send(ListenID.MainDraw_GetEquip);
            }
        } else if (data.awardType == 5) {
            AlertManager.showNormalTips(`恭喜获得${data.text}！`);
            // GameVoManager.getInstance.myUserVo.weaponChip += data.awardCardinal;
            GameVoManager.getInstance.addWeaponChip(data.awardCardinal);
        }
        GameVoManager.getInstance.saveData();
        Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.DrawTarget, [2, 1]);
        this.refreshItem();
    }

    public goldEffectShow(type?: number) {
        if (type == 1) {                          //飞金币
            // Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(-317, 594), 0.1, 0, 1);
            Notifier.send(ListenID.Game_UpdateCurrencyEffect, 1, 0);
        } else if (type == 2) {                    //飞钻石
            // Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(0, 594), 0.1, 0, 2);
            Notifier.send(ListenID.Game_UpdateCurrencyEffect, 2, 0);
        }
    }

    filterData() {
        let chapidlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let count = 0;
        if (GameVoManager.getInstance.myUserVo.mainDrawTimes < 6) {
            count = 0;
        } else if (GameVoManager.getInstance.myUserVo.mainDrawTimes >= 6 && GameVoManager.getInstance.myUserVo.mainDrawTimes < 11) {
            count = 6;
        } else if (GameVoManager.getInstance.myUserVo.mainDrawTimes >= 11) {
            count = 11;
        }

        let drawData = Cfg.Surprise.filter({ lotteryCcount: count, chapter: chapidlist[0] });
        drawData.sort((a: SurpriseCfg, b: SurpriseCfg): number => {
            return a.id - b.id
        });
        return drawData;
    }

    randomItemIndex() {
        let _r = Util.random(1, 1000);
        let _t: number = 0;
        for (let i = 0; i < this._drawData.length; i++) {
            let data = this._drawData[i];
            if (_r < data.weight + _t && _r >= _t) {
                return i;
            }
            _t += data.weight;
        }
        return this._drawData.length - 1;
    }

    private _runLightAction() {
        if (this.light) {
            this.light.active = true;
            this.light.runAction(cc.blink(0.6, 3));
        }
    }

    onExchangeChip() {
        this.onClose();
        UIManager.Open(Common_UIPath.ShopUI, MVC.eTransition.Scale, MVC.eUILayer.Panel, 1);
    }
}
