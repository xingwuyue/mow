import { AlertManager, AlertType } from "../alert/AlertManager";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";

export interface UserWeaponMap {
    [key: string]: number[];
}

export interface TaskDataVo {
    taskId: number,//任务id
    taskState: number,//任务状态
    taskCurProg: number,
}

export interface Member {
    /** 会员开始时间 */
    memberStartTime: number,
    /** 会员结束时间 */
    memberEndTime: number,
    /** 钻石库存 */
    diamond: number,
    /** 视频再翻倍次数 */
    video: number,
    /** 复活免广告次数 */
    relive: number,
    /** 奖励领取时间 */
    rewardTime: number
}

export interface bagVo {
    [insId: number]: number,
}

export interface TaskLogMap {
    [insId: number]: number,
}

export interface Technology { // {id: lv}
    /** 科技等级 */
    [id: number]: number
}

export class UserVo { //服务端对应下的用户结构信息
    public topLevel: number = 0;
    public weaponList: UserWeaponMap = {
        "105": [0, 0, 0],//[射速等级，火力加成容量等级, 觉醒]
    };
    public dropList = {
        "3004": 1,
    };
    public equipPart: number[] = [20001, 0, 0, 0];
    public equipPartLevel: number[] = [0, 0, 0, 0];
    public bag: bagVo = {};
    public instanceId: number = 1;
    public battle: number = 0;//战斗力
    public boxfreeTimes: number[] = [0, 0];//免费时间

    public weaponChip: number = 0;  // 武器碎片
    public gold: number = 0;
    public diamond: number = 0;
    public treasureBox: number = 0; //宝箱
    public signDay: number = 0;  //已完成签到次数
    public lastSignDay: number = 0; //上次签到的日期(一个月当中的第几天)
    public inviteNum: number = 1;
    public day: number = 0;
    public collectReward: number = 0; //0没进入  1已领取
    public shareUnLock: number = 0;
    public showNewBieGuide: boolean = false;
    public hurtLv: number = 0;       //伤害等级
    public bulletCapacityLv: number = 0;     //弹夹容量等级
    public shootSpeedLv: number = 0;         //射击间隔
    public defaultGunId: number = 105;
    public goldRewardLvs: number[] = [0, 0];      //收益等级[计时收益，杀怪收益]
    public roleLvs: number[] = [0, 0];           //人物升级[火力等级，暴击等级]
    public version: number = 3;                  //数据结构版本
    public goldRewardTime: number = 0;          //金币奖励时间（每20秒保存一次）
    public goldRewardNum: number = 0;           //金币奖励数量
    public drawKill: number = 0;                //转盘杀怪数量
    public drawShare: number = 0;
    public drawVideo: number = 0;
    public resultShare: number = 0;
    public resultVideo: number = 0;
    public serviceReward: number = 0;           //客服奖励
    public exchangeVideo: number = 0;           //金币兑换视频
    public lastGetGoldTime: number = 0;         //上次领取计时奖励时间
    public inviteGetRewardList = [];            //邀请领取列表
    public power: number = 25;                   //体力
    public powerRecoverTime: number = 0;        //上次更新体力时间
    public powerTime: number = 0;               //体力倒计时
    public shareTimes: number = 0;              //今天分享次数
    public videoTimes: number = 0;              //今天视频次数
    public totalShareTimes: number = 0;         //总的分享次数
    public useFreeGoldTimes: number = 0;        //免费金币使用次数
    public useFreeDiamondTimes: number = 0;     //免费钻石使用次数
    public mainDrawTimes: number = 0;           //主界面转盘次数
    public successTips: number = 0;              //过关小诀窍记录次数
    public successTipsisCheck: number = 0;       //是否需要显示过关小诀窍
    public isSecondGame: number = 0;             //是否第二次进入游戏
    public lastBossRank: number = 0;
    public topBossRank: number = 0;             //头目战最高排名
    public bossGold: number = 0;
    public bossDiamond: number = 0;
    public bossReward: any = [];
    public bossBox: number = 0;
    public bossTime: number = 0;
    public isChallenge: number = 0;              //是否已挑战头目战
    public avatarUrl: string = '';
    public nickName: string = '匿名';
    public isAuthorize: number = 0;
    public useTreasureBoxNum: number = 0;       //今日试用宝箱次数
    public weaponVideoCount: number = 0;
    public guideChangeGun: number = 0;
    public boxDayLimited: number = 0;
    public useAllTreasureBoxNum: number = 0;
    public isFirstStart: boolean = true;
    public isFirstDraw: boolean = true;
    public firstLoginTime: number = 0;
    public offlineTime: number = 0;            //离线时间点记录时间
    public giftCode = {};
    public newVersion: number = 1;
    public isGetMainDraw: number = 0;
    public isSetName: number = 0;                //是否已设置了名字
    public saveId: number = 0;
    public roleLv: number = 1;
    public curExp: number = 0;
    public allExp: number = 0;
    public orderInfo = {};
    public payfirst: number[] = [0, 0, 0, 0, 0, 0];

    // public memberTime: number = 1;              //会员
    public member: Member = {
        memberStartTime: 0,
        memberEndTime: 0,
        diamond: 0,
        video: 0,
        relive: 0,
        rewardTime: 0,
    }
    public guideFlag: number = 0;
    public ecologicalStudyList = {};    // 1: [开始时间，持续时间，次数，状态]
    public tech: Technology = {};
    public techP: number = 0;
    public firOpMenu: boolean = true;
    public firEtGame: boolean = true;
    public resultNum: number = 0;
    //----------不保存-----------//
    public tempTime: number = 0;
    public tempEnterTime: number = 0;
    public tempLevelTime: number = 0;
    public tempLevelTime_Gold: number = 0;
    public unlockNewWeapon: number = 0;
    public fullWeapon: number = 0;
    public fullCapacity: number = 0;
    public curViewId: number = 0;
    public passCurLevel: boolean = false;
    public curLogLevel: number = 0;
    public loadState: number = 0;
    public levelStartState: number = 0;
    public lvUid: string = "";
    public lvstartTime: number = 0;
    public boxBannerClick: boolean = false;      //宝箱banner点击
    public resultBannerClick: boolean = false;   //结算banner点击
    public freeWeaponId: number = 0;             //试用枪ID
    public inviteCount: number = 0;              //邀请人数
    public iapList: Object = {};                //订单列表，0或空会删除，1:代表已发货，但未删除
    public showMainDraw: boolean = false;
    public stageboxNum: number = 0;              //当前关卡获得宝箱
    public isNewUser: boolean = true;
    public showunLockBoss: boolean = false;
    public showUnlockChapter: number = 0;
    public equipUpgradeMaxLevel: number = 100;
    public showUnLockPartIndex: number = 0;
    public isFirstUpBattle: boolean = true;
    public dailyTaskTimes: number = 0;       //刷新次数
    public dailyTaskData: TaskDataVo[] = [];
    public stageTaskData: TaskDataVo[] = [];
    public battleTaskData: TaskDataVo[] = [];
    public taskLogList: TaskLogMap = {};//记录已经在任务列表中的任务，后期添加任务直接对比
    public openDailyView: boolean = true;
    public tempTopLevel: number = 0;
    public ecologicalPoint: number = 0;
    //----------不保存-----------//
    public updatetUserVo(res: any): void {
        Object.getOwnPropertyNames(this).forEach(function (key) {
            if (res.hasOwnProperty(key) && key != "version") {
                if (key == 'member') {
                    for (let i in res[key]) {
                        this[key][i] = res[key][i];
                    }
                } else {
                    this[key] = res[key];
                }
            }
        }.bind(this));
    }

    public serializeAll(): string {
        let data = {
            saveId: this.saveId,
            topLevel: this.topLevel,
            dropList: this.dropList,
            gold: this.gold,
            diamond: this.diamond,
            signDay: this.signDay,
            lastSignDay: this.lastSignDay,
            day: this.day,
            defaultGunId: this.defaultGunId,
            drawKill: this.drawKill,
            serviceReward: this.serviceReward,
            exchangeVideo: this.exchangeVideo,
            power: this.power,
            powerRecoverTime: this.powerRecoverTime,
            powerTime: this.powerTime,
            member: this.member,
            useFreeDiamondTimes: this.useFreeDiamondTimes,
            mainDrawTimes: this.mainDrawTimes,
            // topBossRank: this.topBossRank,
            // bossBox: this.bossBox,
            // lastBossRank: this.lastBossRank,
            // bossGold: this.bossGold,
            isChallenge: this.isChallenge,
            avatarUrl: this.avatarUrl,
            nickName: this.nickName,
            isAuthorize: this.isAuthorize,
            isNewUser: this.isNewUser,
            weaponVideoCount: this.weaponVideoCount,
            equipPart: this.equipPart,
            instanceId: this.instanceId,
            giftCode: this.giftCode,
            isFirstStart: this.isFirstStart,
            firstLoginTime: this.firstLoginTime,
            bag: this.bag,
            equipPartLevel: this.equipPartLevel,
            battle: this.battle,
            // offlineTime: this.offlineTime,
            // newVersion: this.newVersion,
            boxfreeTimes: this.boxfreeTimes,
            isGetMainDraw: this.isGetMainDraw,
            bossDiamond: this.bossDiamond,
            bossReward: this.bossReward,
            guideFlag: this.guideFlag,
            isSetName: this.isSetName,
            dailyTaskTimes: this.dailyTaskTimes,
            taskLogList: this.taskLogList,
            // dailyTaskData: this.dailyTaskData,
            stageTaskData: this.stageTaskData,
            battleTaskData: this.battleTaskData,
            roleLv: this.roleLv,
            curExp: this.curExp,
            allExp: this.allExp,
            tech: this.tech,
            payfirst: this.payfirst,
            orderInfo: this.orderInfo,
            ecologicalStudyList: this.ecologicalStudyList,
            techP: this.techP,
            resultNum: this.resultNum,
        }
        let str = "";
        try {
            str = JSON.stringify(data);
            if (str == "{}" || str == null || str == "") {
                AlertManager.showAlert(AlertType.COMMON, { desc: "数据序列化出错" + str + ",请截图反馈给客服" });
                Notifier.send(ListenID.Log_Event, { event_name: "serializeError" });
            }
        } catch (error) {
            AlertManager.showAlert(AlertType.COMMON, { desc: "数据序列化出错" + error + ",请截图反馈给客服" });
            Notifier.send(ListenID.Log_Event, { event_name: "serializeError" });
        }
        return str;
    }
    /**序列化部分数据 */
    public serialize(): object {
        let data = {
            saveId: this.saveId,
            topLevel: this.topLevel,
            dropList: this.dropList,
            gold: this.gold,
            diamond: this.diamond,
            signDay: this.signDay,
            lastSignDay: this.lastSignDay,
            day: this.day,
            defaultGunId: this.defaultGunId,
            drawKill: this.drawKill,
            serviceReward: this.serviceReward,
            exchangeVideo: this.exchangeVideo,
            power: this.power,
            powerRecoverTime: this.powerRecoverTime,
            powerTime: this.powerTime,
            member: this.member,
            useFreeDiamondTimes: this.useFreeDiamondTimes,
            mainDrawTimes: this.mainDrawTimes,
            // topBossRank: this.topBossRank,
            // bossBox: this.bossBox,
            // lastBossRank: this.lastBossRank,
            // bossGold: this.bossGold,
            isChallenge: this.isChallenge,
            avatarUrl: this.avatarUrl,
            nickName: this.nickName,
            isAuthorize: this.isAuthorize,
            isNewUser: this.isNewUser,
            weaponVideoCount: this.weaponVideoCount,
            equipPart: this.equipPart,
            instanceId: this.instanceId,
            giftCode: this.giftCode,
            isFirstStart: this.isFirstStart,
            firstLoginTime: this.firstLoginTime,
            bag: this.bag,
            equipPartLevel: this.equipPartLevel,
            battle: this.battle,
            // offlineTime: this.offlineTime,
            // newVersion: this.newVersion,
            boxfreeTimes: this.boxfreeTimes,
            isGetMainDraw: this.isGetMainDraw,
            bossDiamond: this.bossDiamond,
            bossReward: this.bossReward,
            guideFlag: this.guideFlag,
            isSetName: this.isSetName,
            dailyTaskTimes: this.dailyTaskTimes,
            taskLogList: this.taskLogList,
            roleLv: this.roleLv,
            curExp: this.curExp,
            allExp: this.allExp,
        }
        let newdata = {}
        for (const key in data) {
            newdata[key] = JSON.stringify(data[key]);
        }
        return data;
    }

    public serializeDaily(): object {
        let data = {
            saveId: this.saveId,
            dailyTaskTimes: this.dailyTaskTimes,
            dailyTaskData: this.dailyTaskData,
        }
        let newdata = {}
        for (const key in data) {
            newdata[key] = JSON.stringify(data[key]);
        }
        return data;
    }
    public serializeStage(): object {
        let data = {
            saveId: this.saveId,
            stageTaskData: this.stageTaskData,
            taskLogList: this.taskLogList,
        }
        let newdata = {}
        for (const key in data) {
            newdata[key] = JSON.stringify(data[key]);
        }
        return data;
    }
    public serializeBattle(): object {
        let data = {
            saveId: this.saveId,
            battleTaskData: this.battleTaskData,
            taskLogList: this.taskLogList,
        }
        let newdata = {}
        for (const key in data) {
            newdata[key] = JSON.stringify(data[key]);
        }
        return data;
    }

    public serializePay(): object {
        let data = {
            saveId: this.saveId,
            diamond: this.diamond,
            payfirst: this.payfirst,
            orderInfo: this.orderInfo,
        }
        let newdata = {}
        for (const key in data) {
            newdata[key] = JSON.stringify(data[key]);
        }
        return data;

    }

    public serializeEcological(): object {
        let data = {
            saveId: this.saveId,
            ecologicalStudyList: this.ecologicalStudyList,
            diamond: this.diamond,
            gold: this.gold,
            power: this.power,
            allExp: this.allExp,
            curExp: this.curExp,
            techP: this.techP,
        }
        let newdata = {}
        for (const key in data) {
            newdata[key] = JSON.stringify(data[key]);
        }
        return data;
    }

    public serializeTechnology(): object {
        let data = {
            saveId: this.saveId,
            tech: this.tech,
            techP: this.techP,
            diamond: this.diamond,
            gold: this.gold,
            power: this.power,
        }
        let newdata = {}
        for (const key in data) {
            newdata[key] = JSON.stringify(data[key]);
        }
        return data;
    }
}
