import { MVC } from "../../../framework/MVC";
import BtnRewardMultModel from "./BtnRewardMultModel";
import { UIManager } from "../../../framework/UIManager";
import { Common_UIPath, ShareCode } from "../../../common/Common_Define";
import { GameVoManager } from "../../../manager/GameVoManager";
import { Cfg } from "../../../config/Cfg";
import { StrikeCfg } from "../../../config/StrikeCfg";
import { Manager } from "../../../manager/Manager";
import { AlertManager } from "../../../alert/AlertManager";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { Const } from "../../../config/Const";

let RewardType = {
    share: 1,
    video: 2,
    diamond: 3,
    member: 5,
}

let adIndex = 0;

export default class BtnRewardMultController extends MVC.BaseController {
    private static _instance: BtnRewardMultController = null;
    private _btnType: number;
    public _multRewardType: number;

    private _data: BtnRewardMultModel = BtnRewardMultModel.getInstance();
    constructor() {
        super("BtnRewardMultController");
        BtnRewardMultController._instance = this;
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new BtnRewardMultController();
        }
        return this._instance;
    }

    init(data: { type: number, gold: number, isOpenDraw?: boolean }) {
        let cfg = null;// Cfg.Strike.getAll();
        let curCfg: StrikeCfg = null;
        let userData = GameVoManager.getInstance.myUserVo;
        let multRewardType = RewardType.video;
        this._btnType = data.type;
        let vipCount = 0;
        // console.log("***** 按钮类型", this._btnType)
        switch (this._btnType) {
            case 2: {//结算视频ID
                adIndex = 5;
                break;
            }
            case 3: {//计时双倍
                adIndex = 3;
                break;
            }
            case 4: {//签到视频id
                adIndex = 4;
                break;
            }
            case 5: {
                adIndex = 8;
                break;
            }
        }
        if (cfg) {
            curCfg = cfg[data.type];
            if (curCfg) {
                multRewardType = curCfg.rewardType;
                switch (multRewardType) {
                    case RewardType.share: {
                        if (data.type == 3) {
                            let count = Manager.storage.getNumber("menuShare");
                            let isShare = (curCfg.shareCount - count) > 0;
                            multRewardType = isShare ? multRewardType : RewardType.video;
                        } else if (data.type == 4) {
                            break;
                        } else {
                            let isShare = (curCfg.shareCount - userData.resultShare) > 0;
                            multRewardType = isShare ? multRewardType : RewardType.video;
                        }
                        break;
                    }
                    case RewardType.video: {
                        if (data.type == 5) {
                            let count = Manager.storage.getNumber("reliveVideo");
                            if ((curCfg.videoCount - count) > 0) {
                                multRewardType = multRewardType;
                            } else {
                                if (curCfg.diamondCount[0] - Manager.storage.getNumber("reliveDiamond") > 0) {
                                    multRewardType = RewardType.diamond;
                                } else {
                                    multRewardType = RewardType.share;
                                }
                            }
                        } else if (data.type == 3) {
                            let count = Manager.storage.getNumber("menuVideo");
                            if ((curCfg.videoCount - count) > 0) {
                                multRewardType = multRewardType;
                            } else {
                                multRewardType = RewardType.share;
                            }
                        } else if (data.type == 4) {
                            break;
                        } else {
                            let isVideo = (curCfg.videoCount - userData.resultVideo) > 0;
                            multRewardType = isVideo ? multRewardType : RewardType.share;
                        }
                        break;
                    }
                    case RewardType.member: {
                        let isVip = GameVoManager.getInstance.getIsMember();
                        vipCount = curCfg.vipCount - userData.member.relive;
                        console.log("---------isVip", isVip, vipCount, curCfg.vipCount);
                        multRewardType = (isVip && vipCount > 0) ? multRewardType : RewardType.video;
                        break;
                    }
                }
            }
        }
        // console.log("=========信息", this._btnType, multRewardType)
        // console.log("=====复活视频次数======", Manager.storage.getNumber("reliveVideo"))
        // console.log("=====复活钻石次数======", Manager.storage.getNumber("reliveDiamond"))
        // console.log("=======结算视频次数==========", userData.resultVideo)
        let isMember = GameVoManager.getInstance.getIsMember();
        let multNum = isMember ? 6 : 3;
        // console.log("=====计时分享次数======", Manager.storage.getNumber("menuShare"))
        // console.log("=====计时视频次数======", Manager.storage.getNumber("menuVideo"))
        if (data.type == 2 || data.type == 3 || data.type == 4) {
            multRewardType = GameVoManager.getInstance.myUserVo.shareTimes >= GameVoManager.getInstance.myUserVo.totalShareTimes ? 2 : 1;
        }
        // if(data.type == 5){
        //     multRewardType = 2;
        // }
        this._multRewardType = multRewardType;
        this._data.setRewardType(multRewardType);
        this._data.setGold(data.gold);
        this._data.setIsOpenDrawView(data.isOpenDraw);
        this._data.setMultNum(multNum);
        this._data.setCurConfig(curCfg);
        this._data.setVipCount(vipCount);
        // this._data.set
    }
    //分享次数更新后刷新按钮状态
    refreshBtnStatus(data: { type: number, gold: number, isOpenDraw?: boolean }) {
        console.log("==============刷新按钮状态", data.type)
        let multRewardType = null;
        this._btnType = data.type;
        if (data.type == 2 || data.type == 3 || data.type == 4) {
            multRewardType = GameVoManager.getInstance.myUserVo.shareTimes >= GameVoManager.getInstance.myUserVo.totalShareTimes ? 2 : 1;
        }
    }
    setData() {
        if (this._btnType == 5) {
            if (this._multRewardType == 1) {
                if (!Manager.storage.getNumber("reliveShare")) {
                    Manager.storage.setNumber("reliveShare", 1)
                } else {
                    let a: number = Manager.storage.getNumber("reliveShare");
                    a++;
                    Manager.storage.setNumber("reliveShare", a)
                }
            } else if (this._multRewardType == 2) {
                if (!Manager.storage.getNumber("reliveVideo")) {
                    Manager.storage.setNumber("reliveVideo", 1)
                } else {
                    let a: number = Manager.storage.getNumber("reliveVideo");
                    a++;
                    Manager.storage.setNumber("reliveVideo", a)
                }
            } else if (this._multRewardType == 3) {
                if (!Manager.storage.getNumber("reliveDiamond")) {
                    Manager.storage.setNumber("reliveDiamond", 1)
                } else {
                    let a: number = Manager.storage.getNumber("reliveDiamond");
                    a++;
                    Manager.storage.setNumber("reliveDiamond", a)
                }
            }
        } else if (this._btnType == 3) {
            if (this._multRewardType == 1) {
                if (!Manager.storage.getNumber("menuShare")) {
                    Manager.storage.setNumber("menuShare", 1)
                } else {
                    let a: number = Manager.storage.getNumber("menuShare");
                    a++;
                    Manager.storage.setNumber("menuShare", a)
                }
            } else if (this._multRewardType == 2) {
                if (!Manager.storage.getNumber("menuVideo")) {
                    Manager.storage.setNumber("menuVideo", 1)
                } else {
                    let a: number = Manager.storage.getNumber("menuVideo");
                    a++;
                    Manager.storage.setNumber("menuVideo", a);
                }
            }
        }
    }

    resultPost() {
        if (this._btnType == 2 && this._data.getRewardType() == 1) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'triple_Settlement_share', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "triple_Settlement_share" });
        } else if (this._btnType == 2 && this._data.getRewardType() == 2) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'triple_Settlement_video', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "triple_Settlement_video" });
        }
    }

    timeGoldPost() {
        if (this._btnType == 3 && this._data.getRewardType() == 1) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'time_gold_triple_share', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "time_gold_triple_share" });
        } else if (this._btnType == 3 && this._data.getRewardType() == 2) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'time_gold_triple_video', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "time_gold_triple_video" });
        }
    }

    extraPost() {
        if (this._btnType == 4 && this._data.getRewardType() == 1) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'check_double_shard', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "check_double_shard" });
        } else if (this._btnType == 4 && this._data.getRewardType() == 2) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'check_double_video', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "check_double_video" });
        }
    }

    relivePost() {
        if (this._btnType == 5 && this._data.getRewardType() == 1) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'share_relive', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "share_relive" });
        } else if (this._btnType == 5 && this._data.getRewardType() == 2) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'video_relive', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "video_relive" });
        } else if (this._btnType == 5 && this._data.getRewardType() == 3) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'diamond_relive', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "diamond_relive" });
        }
    }

    onReward(data: { callBack: Function }): Promise<any> {
        return new Promise((resolve, reject) => {
            let canDraw = this._data.getIsOpenDrawView();
            if (canDraw) {
                UIManager.Open(Common_UIPath.DrawUI, MVC.eTransition.Scale, MVC.eUILayer.Popup, {});
            } else {
                let drawType = this._data.getRewardType();
                let suc = () => {
                    // let g = this._data.getGold();
                    // let m = this._data.getMultNum();
                    // let userData = GameVoManager.getInstance.myUserVo;
                    // userData.gold += g * m;
                    if (data && data.callBack && this._btnType == 5 && drawType == 3) {
                        let diamondcount = 50;//Cfg.Strike.get(5).diamondCount[1];
                        if (GameVoManager.getInstance.myUserVo.diamond < diamondcount) {
                            AlertManager.showNormalTips("钻石不足！");
                            return
                        } else {
                            GameVoManager.getInstance.setDiamond(-diamondcount);
                        }
                        GameVoManager.getInstance.saveData();
                        resolve();
                    }
                    data && data.callBack && data.callBack(drawType);
                    this.setData();
                    this._data.setIsRewardState(false);

                    this.resultPost();
                    this.timeGoldPost();
                    this.relivePost();
                    this.extraPost();

                    if (this._btnType == 2 || this._btnType == 3 || this._btnType == 4) {
                        if (drawType == RewardType.share) {
                            if (GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes) {
                                GameVoManager.getInstance.myUserVo.shareTimes++;
                            }
                        } else if (drawType == RewardType.video) {
                            if (GameVoManager.getInstance.myUserVo.videoTimes < Const.TotalVideoTimes) {
                                GameVoManager.getInstance.myUserVo.videoTimes++;
                            }
                        }
                    }
                }
                if (drawType == RewardType.share) {
                    suc();
                } else if (drawType == RewardType.video) {
                    // console.log("视频领取=-=-=-", JSON.stringify(Cfg.Adv));
                    // let vId = Cfg.Adv.getAll()[1].advID;
                    // let fai = (err) => {
                    //     if (err) {
                    //         // if (!HD_MODULE.getPlatform().isIOS())
                    //         //     UIManager.Open(Common_UIPath.GetRewardOtherUI, MVC.eTransition.Default, MVC.eUILayer.Tips, { btnType: this._btnType, callBack: data.callBack });
                    //     } else {
                    //         this._data.setIsRewardState(false);
                    //         if (this._btnType == 5) {
                    //             Notifier.send(ListenID.Resume_CountDown);
                    //         }
                    //     }
                    // }
                    // HD_MODULE.getPlatform().showVideo(vId, suc, fai);
                    let eventName = "";
                    if (adIndex == 5) {
                        eventName = "event_3";
                        // Notifier.send(ListenID.Result_Reward_Video_Success);
                    } else if (adIndex == 4) {
                        // Notifier.send(ListenID.Sign_Welfare_Video_Success);
                        eventName = "event_4";
                    } else if (adIndex == 3) {
                        eventName = "event_12";
                    } else if (adIndex == 8) {
                        // Notifier.send(ListenID.Relive_Video_Success);
                        eventName = "event_5";
                    }
                    suc();
                    if (adIndex == 5) {
                        Notifier.send(ListenID.Result_Reward_Video_Success);
                    } else if (adIndex == 4) {
                        Notifier.send(ListenID.Sign_Welfare_Video_Success);
                    } else if (adIndex == 3) {
                        Notifier.send(ListenID.Time_Gold_Video_Success);
                    } else if (adIndex == 8) {
                        Notifier.send(ListenID.Relive_Video_Success);
                    } suc();
                    if (adIndex == 5) {
                        Notifier.send(ListenID.Result_Reward_Video_Success);
                    } else if (adIndex == 4) {
                        Notifier.send(ListenID.Sign_Welfare_Video_Success);
                    } else if (adIndex == 3) {
                        Notifier.send(ListenID.Time_Gold_Video_Success);
                    } else if (adIndex == 8) {
                        Notifier.send(ListenID.Relive_Video_Success);
                    }
                } else if (drawType == RewardType.diamond) {
                    suc();
                } else if (drawType == RewardType.member) {
                    let gameVo = GameVoManager.getInstance;
                    gameVo.myUserVo.member.relive++;
                    suc();
                } else {
                    reject();
                }
            }
        });
    };
}
