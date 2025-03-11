import RewardTaskItem from "../RewardTaskItem";
import RewardTaskModel from "../RewardTaskModel";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { AlertManager, AlertType } from "../../../alert/AlertManager";
import { Manager } from "../../../manager/Manager";
import { TaskType, Common_UIPath } from "../../../common/Common_Define";
import { CallID } from "../../../CallID";
import { Const } from "../../../config/Const";
import { GameVoManager } from "../../../manager/GameVoManager";
import { UIManager } from "../../../framework/UIManager";
import { MVC } from "../../../framework/MVC";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DailyView extends cc.Component {

    @property([RewardTaskItem])
    taskItem: RewardTaskItem[] = [];

    @property(cc.Button)
    btnRefresh: cc.Button = null;

    @property(cc.Label)
    refreshText: cc.Label = null;

    @property(cc.Node)
    videoicon: cc.Node = null;

    @property(cc.Label)
    btnname: cc.Label = null;

    start() {
        this.changeListener(true);
    }

    public changeListener(enable) {
        Notifier.changeListener(enable, ListenID.RewardTask_RefreshDailyTaskFinish, this.updateView, this);
    }

    public updateView() {
        this.updateRefreshTimes();
        for (let i = 0; i < this.taskItem.length; i++) {
            this.updateTaskItem(i);
        }
    }

    public updateRefreshTimes() {
        let curtimes = RewardTaskModel.getInstance.getCurRefreshTimes();
        this.videoicon.active = curtimes > 0;
        let maxtimes = RewardTaskModel.getInstance.dailyRefreshMaxTimes;
        if (curtimes <= 0) {
            this.refreshText.string = `可刷新次数：1`;
            this.btnname.string = "免费刷新任务";
        } else {
            this.refreshText.string = `可刷新次数：${maxtimes - curtimes}`;
            this.btnname.string = "刷新任务";
        }
        this.btnRefresh.interactable = curtimes < maxtimes;
    }

    public updateTaskItem(index) {
        this.taskItem[index].updateInfo(index, TaskType.Daily);
    }

    public onRefresh() {
        Manager.audio.playAudio(501);
        let isfinish = RewardTaskModel.getInstance.dailyTaskAllFinish();
        if (!isfinish) {
            AlertManager.showAlert(AlertType.SELECT, {
                reasonDesc: "刷新将重置每日悬赏任务,请及时领取奖励",
                wayDesc: "是否确定刷新悬赏",
                confirmText: "确定",
                cancelText: "否",
                confirm: () => {
                    let curtimes = RewardTaskModel.getInstance.getCurRefreshTimes();
                    let isfreerefresh = curtimes <= 0;
                    if (!isfreerefresh) {
                        RewardTaskModel.getInstance.addCurRefreshTimes(1);
                        RewardTaskModel.getInstance.refreshDailyTask();
                        Notifier.send(ListenID.Log_Event, { event_name: "everydayTask_refresh" });
                        AlertManager.showNormalTips("刷新任务成功!");
                    } else {
                        AlertManager.showNormalTips("刷新任务成功!");
                        RewardTaskModel.getInstance.addCurRefreshTimes(1);
                        RewardTaskModel.getInstance.refreshDailyTask();
                    }
                },
            })
        } else {
            let curtimes = RewardTaskModel.getInstance.getCurRefreshTimes();
            let isfreerefresh = curtimes <= 0;
            if (!isfreerefresh) {
                RewardTaskModel.getInstance.addCurRefreshTimes(1);
                RewardTaskModel.getInstance.refreshDailyTask();
                Notifier.send(ListenID.Log_Event, { event_name: "everydayTask_refresh" });
                AlertManager.showNormalTips("刷新任务成功!");
            } else {
                AlertManager.showNormalTips("刷新任务成功!");
                RewardTaskModel.getInstance.addCurRefreshTimes(1);
                RewardTaskModel.getInstance.refreshDailyTask();
            }
        }
    }

    onReward(taskType: TaskType, id) {
        if (taskType == TaskType.Daily) {
            let rewardlist = RewardTaskModel.getInstance.getTaskRewardById(id);
            let updatelen = rewardlist.length / 2;
            let goodlist = [];
            for (let i = 0; i < updatelen; i++) {
                let id = rewardlist[2 * i];
                let goodsNum = rewardlist[2 * i + 1];
                if (id <= 3) {
                    if (id == 1) {
                        GameVoManager.getInstance.setGold(goodsNum)
                    } else if (id == 2) {
                        GameVoManager.getInstance.setDiamond(goodsNum)
                    } else if (id == 3) {
                        GameVoManager.getInstance.setPower(goodsNum)
                    }
                    setTimeout(() => { Notifier.send(ListenID.Game_UpdateCurrencyEffect, id, goodsNum) }, i * 300);
                } else if (id == 4) {
                    let goodslist = Notifier.call(CallID.Drop_GetDropPoolRewardById, goodsNum);
                    let goodsLen = goodslist.length;
                    for (let i = 0; i < goodsLen; i++) {
                        let goodsNum = goodslist[i][2];
                        let goodsTypeId = goodslist[i][1];
                        goodlist.push({ goodsId: goodsTypeId, goodsNum })
                        GameVoManager.getInstance.addEquip(goodsTypeId);
                    }

                }
                if (goodlist.length > 0) {
                    UIManager.Open(Common_UIPath.RewardTaskUI, MVC.eTransition.Scale, MVC.eUILayer.Popup, goodlist);
                }
            }
            RewardTaskModel.getInstance.sortTask(TaskType.Daily);
            GameVoManager.getInstance.saveDailyTaskData();
            for (let i = 0; i < this.taskItem.length; i++) {
                this.updateTaskItem(i);
            }
        }
    }

    public onRewardAll() {
        console.log("onRewardAll");
        let currencylist = [0, 0, 0, 0];
        let goodlist = [];
        let lognum = 0;
        for (let i = 0; i < this.taskItem.length; i++) {
            let taskdata = RewardTaskModel.getInstance.getDailyTaskDataByIndex(i);
            if (taskdata.taskState == 1) {
                lognum++;
                RewardTaskModel.getInstance.setDailyTaskStateByIndex(i, 2);
                let rewardlist = RewardTaskModel.getInstance.getTaskRewardById(taskdata.taskId);
                let updatelen = rewardlist.length / 2;
                for (let i = 0; i < updatelen; i++) {
                    let id = rewardlist[2 * i];
                    let goodsNum = rewardlist[2 * i + 1];
                    if (id <= 3) {
                        if (id == 1) {
                            GameVoManager.getInstance.setGold(goodsNum)
                        } else if (id == 2) {
                            GameVoManager.getInstance.setDiamond(goodsNum)
                        } else if (id == 3) {
                            GameVoManager.getInstance.setPower(goodsNum)
                        }
                        currencylist[id] += goodsNum;
                    } else if (id == 4) {
                        let goodslist = Notifier.call(CallID.Drop_GetDropPoolRewardById, goodsNum);
                        let goodsLen = goodslist.length;
                        for (let i = 0; i < goodsLen; i++) {
                            let goodsNum = goodslist[i][2];
                            let goodsTypeId = goodslist[i][1];
                            goodlist.push({ goodsId: goodsTypeId, goodsNum })
                            GameVoManager.getInstance.addEquip(goodsTypeId);
                        }
                    }
                }
            }
        }
        if (lognum <= 0) {
            AlertManager.showNormalTips("无可领取奖励！");
            return;
        }
        for (let i = 1; i < currencylist.length; i++) {
            if (currencylist[i]) {
                setTimeout(() => { Notifier.send(ListenID.Game_UpdateCurrencyEffect, i, currencylist[i]) }, (i - 1) * 300);
            }
        }
        if (goodlist.length > 0) {
            UIManager.Open(Common_UIPath.RewardTaskUI, MVC.eTransition.Scale, MVC.eUILayer.Popup, goodlist);
        }
        RewardTaskModel.getInstance.sortTask(TaskType.Daily);
        GameVoManager.getInstance.saveDailyTaskData();
        for (let i = 0; i < this.taskItem.length; i++) {
            this.updateTaskItem(i);
        }
        if (lognum > 0) {
            Notifier.send(ListenID.Log_Event, { event_name: "everydayTask_Award", counter: lognum });
        }
    }

    onDestroy() {
        this.changeListener(false);
    }
    // update (dt) {}
}
