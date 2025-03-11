import { Util } from "../../utils/Util";
import { Manager } from "../../manager/Manager";
import { GameVoManager } from "../../manager/GameVoManager";
import { Cfg } from "../../config/Cfg";
import { EcologicalCfg } from "../../config/EcologicalCfg";
import { Time } from "../../framework/Time";
import { Const } from "../../config/Const";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { AlertManager } from "../../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EcologicalItem extends cc.Component {

    @property(cc.Label)
    lbname: cc.Label = null;
    @property(cc.Label)
    lbdesc: cc.Label = null;
    @property(cc.Label)
    locktips: cc.Label = null;
    @property(cc.Label)
    lbtime: cc.Label = null;
    @property(cc.Node)
    btnYellow: cc.Node = null;
    @property(cc.Node)
    btnGreen: cc.Node = null;
    @property(cc.Node)
    progressNode: cc.Node = null;
    @property(cc.Sprite)
    bar: cc.Sprite = null;
    @property(cc.Node)
    gray: cc.Node = null;
    @property(cc.Node)
    rewardList: cc.Node[] = [];

    index: number = 0;
    mut: number = 1;
    cfgData: EcologicalCfg = null;
    rewardData = [];

    onDestroy() {
        this.unschedule(this.updateEcologicalStudy);
    }

    initUI(index: number, data = null) {
        this.unschedule(this.updateEcologicalStudy);
        this.index = index;
        let chapter = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let chapterId = (chapter[1] == chapter[2]) ? chapter[0] : chapter[0] - 1;
        this.mut = 1 + this.getAddPercent() * 0.01;
        let cfg = Cfg.Ecological.get(index + 1);
        this.cfgData = cfg;
        this.lbname.string = cfg.name;
        this.lbdesc.string = cfg.desc;
        if (chapterId >= cfg.unlockChapters) {
            if (data) {
                if (data[3] == 0) {     // 未进行
                    this.btnYellow.active = true;
                    this.btnGreen.active = false;
                    this.progressNode.active = false;
                } else if (data[3] == 1) {  // 进行中
                    this.btnYellow.active = false;
                    this.btnGreen.active = false;
                    this.progressNode.active = true;
                    let servertime = Time.serverTimeMs;
                    let studyTime = data[1] - (servertime - data[0]) / 1000;
                    if (studyTime <= 0) {
                        this.btnYellow.active = false;
                        this.btnGreen.active = true;
                        this.progressNode.active = false;
                        GameVoManager.getInstance.myUserVo.ecologicalStudyList[this.index][3] = 2;
                    } else {
                        this.tempTime = Number(((servertime - data[0]) / 1000).toFixed(0));
                        this.lbtime.string = Util.getTimeFormat(studyTime * 1000);
                        this.bar.fillStart = studyTime / data[1];
                        this.schedule(this.updateEcologicalStudy, 1);
                    }
                } else if (data[3] == 2) {   //完成
                    this.btnYellow.active = false;
                    this.btnGreen.active = true;
                    this.progressNode.active = false;
                }
            } else {
                this.btnYellow.active = true;
                this.btnGreen.active = false;
                this.progressNode.active = false;
            }
            this.locktips.node.active = false;
            this.gray.active = false;
        } else {
            this.locktips.node.active = true;
            this.gray.active = true;
            this.locktips.string = `通过第${cfg.unlockChapters}章解锁`;
            this.btnYellow.active = false;
            this.btnGreen.active = false;
            this.progressNode.active = false;
        }
        let rewardData = this.getRewardData(cfg, chapterId);
        this.rewardData = rewardData;
        this.initRewardItem(rewardData);
    }

    refreshTempTime(data){
        if(data && data[3] == 1){
            let servertime = Time.serverTimeMs;
            this.tempTime = Number(((servertime - data[0]) / 1000).toFixed(0));
        }
    }

    getAddPercent(): number {
        let chapter = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let chapterId = (chapter[1] == chapter[2]) ? chapter[0] : chapter[0] - 1;
        let percent = 0;
        for (let i = 1; i < chapterId + 1; i++) {
            percent += Cfg.Chapter.get(i).ecologicAlawardAdd;
        }
        return percent;
    }

    getRewardData(data: EcologicalCfg, chapterId: number) {
        let rewardData = [];
        if (data.goldAward && data.goldAward.length > 0) {
            rewardData.push(["coin_0", Const.rewardType.gold, data.goldAward[chapterId]]); //1
        }
        if (data.powerAward && data.powerAward.length > 0) {
            rewardData.push(["coin_1", Const.rewardType.power, data.powerAward[chapterId]]);//3
        }
        if (data.diamondAward && data.diamondAward.length > 0) {
            rewardData.push(["coin_2", Const.rewardType.diamond, data.diamondAward[chapterId]]);//2
        }
        if (data.scienceAward && data.scienceAward.length > 0) {
            rewardData.push(["coin_3", Const.rewardType.science, data.scienceAward[chapterId]]);//4
        }
        if (data.expAward && data.expAward.length > 0) {
            rewardData.push(["coin_4", Const.rewardType.exp, data.expAward[chapterId]]);//5
        }
        return rewardData;
    }

    initRewardItem(rewardData) {
        this.rewardList.forEach((item, index) => {
            if (rewardData[index]) {
                Manager.spAtlas.getEcological(rewardData[index][0]).then(res => {
                    item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = res;
                })
                item.getChildByName("lbnum").getComponent(cc.Label).string = Util.goldFormat(rewardData[index][2]);
            } else {
                item.active = false;
            }
        })
    }

    onBtnYellow() {
        Manager.audio.playAudio(501);
        this.btnYellow.active = false;
        this.progressNode.active = true;
        this.bar.fillStart = 1;
        let ecologicalStudyList = GameVoManager.getInstance.myUserVo.ecologicalStudyList;
        let studyTime = 0;
        let index = this.index;
        if (!ecologicalStudyList[index]) {
            let servertime = Time.serverTimeMs;
            studyTime = this.cfgData.specialTimePrice && this.cfgData.specialTimePrice.length > 0 ? this.cfgData.specialTimePrice[1] : this.cfgData.timePrice;
            this.lbtime.string = Util.getTimeFormat(studyTime * 1000);
            ecologicalStudyList[index] = [servertime, studyTime, 1, 1];
        } else {
            if (this.cfgData.specialTimePrice && this.cfgData.specialTimePrice.length > 0) {
                if (ecologicalStudyList[index][2] < this.cfgData.specialTimePrice[0]) {
                    studyTime = this.cfgData.specialTimePrice[1];
                    this.lbtime.string = Util.getTimeFormat(studyTime * 1000);
                } else {
                    studyTime = this.cfgData.timePrice;
                    this.lbtime.string = Util.getTimeFormat(studyTime * 1000);
                }
            } else {
                studyTime = this.cfgData.timePrice;
                this.lbtime.string = Util.getTimeFormat(studyTime * 1000);
            }
            let servertime = Time.serverTimeMs;
            ecologicalStudyList[index] = [servertime, studyTime, ecologicalStudyList[index][2] + 1, 1];
        }
        this.schedule(this.updateEcologicalStudy, 1);
        GameVoManager.getInstance.saveEcologicalData();
        Notifier.send(ListenID.Log_Event, { event_name: `ecological_${this.index + 1}_start` });
    }

    onBtnGreen() {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Open_EcologicalRewardView, { data: this.rewardData, mut: this.mut });
        GameVoManager.getInstance.myUserVo.ecologicalPoint--;
        if (GameVoManager.getInstance.myUserVo.ecologicalPoint < 0) {
            GameVoManager.getInstance.myUserVo.ecologicalPoint = 0;
        }
        GameVoManager.getInstance.myUserVo.ecologicalStudyList[this.index][3] = 0;
        this.btnGreen.active = false;
        this.btnYellow.active = true;
        GameVoManager.getInstance.saveEcologicalData();
        Notifier.send(ListenID.Log_Event, { event_name: `ecological_${this.index + 1}_end` });
    }

    onClickGray() {
        AlertManager.showNormalTips(`通过第${this.cfgData.unlockChapters}章解锁`);
    }

    private tempTime = 0;
    updateEcologicalStudy() {
        this.tempTime++;
        let studyTime = GameVoManager.getInstance.myUserVo.ecologicalStudyList[this.index][1];
        let time = studyTime - this.tempTime > 0 ? studyTime - this.tempTime : 0;
        this.lbtime.string = Util.getTimeFormat(time * 1000);
        this.bar.fillStart = time / studyTime;
    }

    finishEcologicalStudy() {
        this.progressNode.active = false;
        this.btnGreen.active = true;
        GameVoManager.getInstance.myUserVo.ecologicalPoint++;
    }

    private time: number = 0;
    private userVo = GameVoManager.getInstance.myUserVo;
    update(dt) {
        if (!this.userVo.ecologicalStudyList[this.index]) return
        this.time += dt;
        if (this.time < 1) return
        this.time = 0;
        if (this.userVo.ecologicalStudyList[this.index][3] == 1) {
            if ((Time.serverTimeMs - this.userVo.ecologicalStudyList[this.index][0]) / 1000 >= this.userVo.ecologicalStudyList[this.index][1]) {     // 完成
                this.userVo.ecologicalStudyList[this.index][3] = 2;
                this.finishEcologicalStudy();
                this.tempTime = 0;
                this.unschedule(this.updateEcologicalStudy);
            }
        }
    }
}
