import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { TaskCfg } from "../../config/TaskCfg";
import { Cfg } from "../../config/Cfg";
import { Util } from "../../utils/Util";
import { GameVoManager } from "../../manager/GameVoManager";
import { TaskType, TaskSubType } from "../../common/Common_Define";


export default class RewardTaskModel extends MVC.BaseModel {
    private static _instance: RewardTaskModel = null;
    public dailyRefreshMaxTimes: number = 4;
    public dailyTaskNum: number = 3;
    private _dailyCfg: TaskCfg[] = [];
    private _taskProgressAdapter: TaskProgressAdapter;
    private rewardNodePool: cc.NodePool = null;
    private rewardCell: cc.Node = null;

    public allRewardNum: number = 0;
    public dailyRewardNum: number = 0;
    public stageRewardNum: number = 0;
    public battleRewardNum: number = 0;
    public constructor() {
        super();
        if (RewardTaskModel._instance == null) {
            RewardTaskModel._instance = this;
        }
        this.rewardNodePool = new cc.NodePool();
        this._taskProgressAdapter = new TaskProgressAdapter();
    }
    public reset(): void {

    }

    public updateAllRewardNum() {
        // this.allRewardNum = this.dailyRewardNum + this.stageRewardNum + this.battleRewardNum;
        this.allRewardNum = this.stageRewardNum + this.battleRewardNum;
    }

    public initTaskInfo() {
        let taskstagedata = Cfg.Task.filter({ type: 2 });
        let taskstagelen = taskstagedata.length;
        for (let i = 0; i < taskstagelen; i++) {
            let data = taskstagedata[i];
            if (!this.checkNewTask(data.id) && data.father != 1) {
                this.logTaskId(data.id);
                GameVoManager.getInstance.myUserVo.stageTaskData.push({ taskId: data.id, taskCurProg: 0, taskState: 0 });
                GameVoManager.getInstance.myUserVo.taskLogList[data.id] = 1;
                this._updateStageProgress(TaskSubType.WinTarget, [GameVoManager.getInstance.myUserVo.topLevel, 1]);
            }
        }

        let taskdata = Cfg.Task.filter({ type: 3 });
        let tasklen = taskdata.length;
        for (let i = 0; i < tasklen; i++) {
            let data = taskdata[i];
            if (!this.checkNewTask(data.id) && data.father != 1) {
                this.logTaskId(data.id);
                GameVoManager.getInstance.myUserVo.battleTaskData.push({ taskId: data.id, taskCurProg: 0, taskState: 0 });
                if (data.definition == TaskSubType.StrengTarget) {
                    this._updateBattleProgress(TaskSubType.StrengTarget, [GameVoManager.getInstance.myUserVo.equipPartLevel[data.task[1] - 1], 1, data.task[1]]);
                } else if (data.definition == TaskSubType.BattleTarget) {
                    this._updateBattleProgress(TaskSubType.BattleTarget, GameVoManager.getInstance.getBattle());
                }
            }
        }
        this.battleRewardNum = 0;
        this.stageRewardNum = 0;
        this.dailyRewardNum = 0;
        let data = GameVoManager.getInstance.myUserVo.battleTaskData;
        let datalen = data.length;
        for (let i = 0; i < datalen; i++) {
            if (data[i].taskState == 1) {
                this.battleRewardNum++;
            }
        }
        let sdata = GameVoManager.getInstance.myUserVo.stageTaskData;
        datalen = sdata.length;
        for (let i = 0; i < datalen; i++) {
            if (sdata[i].taskState == 1) {
                this.stageRewardNum++;
            }
        }

        let ddata = GameVoManager.getInstance.myUserVo.dailyTaskData;
        datalen = ddata.length;
        for (let i = 0; i < datalen; i++) {
            if (ddata[i].taskState == 1) {
                this.dailyRewardNum++;
            }
        }
        this.updateAllRewardNum();
    }

    public checkNewTask(id) {
        return !!GameVoManager.getInstance.myUserVo.taskLogList[id];
    }

    public setRewardCell(node) {
        if (!this.rewardCell) {
            this.rewardCell = cc.instantiate(node);
        }
    }

    public getRewardNode() {
        let node = this.rewardNodePool.get();
        if (!node) node = cc.instantiate(this.rewardCell);
        return node;
    }

    public recycleRewardNode(node) {
        this.rewardNodePool.put(node);
    }

    public static get getInstance(): RewardTaskModel {
        if (RewardTaskModel._instance == null) {
            RewardTaskModel._instance = new RewardTaskModel();
        }
        return RewardTaskModel._instance;
    }

    public dailyTaskAllFinish() {
        let isfinish = true;
        for (let i = 0; i < GameVoManager.getInstance.myUserVo.dailyTaskData.length; i++) {
            if (GameVoManager.getInstance.myUserVo.dailyTaskData[i].taskState != 2) {
                isfinish = false;
                break;
            }
        }
        return isfinish;
    }

    private _allWeight: number = 0;
    public refreshDailyTask() {
        let allweight;
        if (this._dailyCfg.length <= 0) {
            allweight = 0;
            this._dailyCfg = Cfg.Task.filter({ type: TaskType.Daily });
            let len = this._dailyCfg.length;
            for (let i = 1; i < len; i++) {
                allweight += this._dailyCfg[i].weight;
            }
            this._allWeight = allweight;
        } else {
            allweight = this._allWeight;
        }
        let ignoreNum = 0;

        for (let k = 0; k < this.dailyTaskNum; k++) {
            let random = Util.random(1, allweight);
            let len = this._dailyCfg.length - ignoreNum;
            let isfind = false;
            for (let i = 0; i < len; i++) {
                if (random <= this._dailyCfg[i].weight) {
                    let data = this._dailyCfg[i];
                    GameVoManager.getInstance.myUserVo.dailyTaskData[k] = { taskId: data.id, taskState: 0, taskCurProg: 0 };
                    [this._dailyCfg[i], this._dailyCfg[len - 1]] = [this._dailyCfg[len - 1], this._dailyCfg[i]];
                    ignoreNum++;
                    isfind = true;
                    break;
                }
                random -= this._dailyCfg[i].weight;
            }
            if (!isfind) {
                let data = this._dailyCfg[len - 1];
                ignoreNum++;
                GameVoManager.getInstance.myUserVo.dailyTaskData[k] = { taskId: data.id, taskState: 0, taskCurProg: 0 };
            }
        }
        this.sortTask(TaskType.Daily);
        this.dailyRewardNum = 0;
        this.updateAllRewardNum();
        Notifier.send(ListenID.RewardTask_RefreshDailyTaskFinish);
    }

    public getAllDailyTaskData() {
        return GameVoManager.getInstance.myUserVo.dailyTaskData;
    }

    public getCurRefreshTimes() {
        return GameVoManager.getInstance.myUserVo.dailyTaskTimes;
    }

    public addCurRefreshTimes(num: number) {
        GameVoManager.getInstance.myUserVo.dailyTaskTimes += num;
    }

    /**
     * 根据下标获取每日任务数据
     * @param index 下标
     */
    public getDailyTaskDataByIndex(index: number) {
        return GameVoManager.getInstance.myUserVo.dailyTaskData[index];
    }

    public getStageTaskList() {
        return GameVoManager.getInstance.myUserVo.stageTaskData;
    }
    public getStageTaskDataByIndex(index: number) {
        return GameVoManager.getInstance.myUserVo.stageTaskData[index];
    }

    public getBattleTaskList() {
        return GameVoManager.getInstance.myUserVo.battleTaskData;
    }
    public getBattleTaskDataByIndex(index: number) {
        return GameVoManager.getInstance.myUserVo.battleTaskData[index];
    }


    /**
     * 根据任务id获取对应任务的目标数量
     * @param id 任务id
     */
    public getTaskTargetProgById(id: number) {
        return this._taskProgressAdapter.calTargetNumById(id);
    }

    public getTaskDescById(id: number) {
        let taskdata = Cfg.Task.get(id);
        if (!taskdata) return "";
        else return taskdata.desc;
    }

    public getTaskRewardById(id: number) {
        let taskdata = Cfg.Task.get(id);
        let rewardlist = [];
        if (!taskdata) return rewardlist;
        else {
            let toplevel = GameVoManager.getInstance.myUserVo.topLevel;
            let chapid = Util.levelToChapterId(toplevel);
            if (taskdata.goldAward.length > 0) {
                rewardlist.push(1);
                rewardlist.push(taskdata.goldAward.length < chapid[0] ? taskdata.goldAward[0] : taskdata.goldAward[chapid[0] - 1]);
            }
            if (taskdata.diamondAward.length > 0) {
                rewardlist.push(2);
                rewardlist.push(taskdata.diamondAward.length < chapid[0] ? taskdata.diamondAward[0] : taskdata.diamondAward[chapid[0] - 1]);
            }
            if (taskdata.powerAward.length > 0) {
                rewardlist.push(3);
                rewardlist.push(taskdata.powerAward.length < chapid[0] ? taskdata.powerAward[0] : taskdata.powerAward[chapid[0] - 1]);
            }
            if (taskdata.equipAward.length > 0) {
                rewardlist.push(4);
                rewardlist.push(taskdata.equipAward.length < chapid[0] ? taskdata.equipAward[0] : taskdata.equipAward[chapid[0] - 1]);
            }
            return rewardlist;
        }
    }

    public setDailyTaskStateByIndex(index: number, taskState: number) {
        GameVoManager.getInstance.myUserVo.dailyTaskData[index].taskState = taskState;
        if (taskState == 2) {
            this.dailyRewardNum--;
            if (this.dailyRewardNum < 0) this.dailyRewardNum = 0;
            this.updateAllRewardNum();
        }
    }

    public getDailyTaskStateByIndex(index) {
        return GameVoManager.getInstance.myUserVo.dailyTaskData[index].taskState;
    }

    public setStageTaskStateByIndex(index: number, taskState) {
        GameVoManager.getInstance.myUserVo.stageTaskData[index].taskState = taskState;
        if (taskState == 2) {//已完成，增加新任务
            this.stageRewardNum--;
            if (this.stageRewardNum < 0) this.stageRewardNum = 0;
            this.updateAllRewardNum();
            this.addSubTask(GameVoManager.getInstance.myUserVo.stageTaskData[index].taskId, TaskType.Stage);
        }
    }

    public getStageTaskStateByIndex(index) {
        return GameVoManager.getInstance.myUserVo.stageTaskData[index].taskState;
    }

    public setBattleTaskStateByIndex(index: number, taskState) {
        GameVoManager.getInstance.myUserVo.battleTaskData[index].taskState = taskState;
        if (taskState == 2) {//已完成，增加新任务
            this.battleRewardNum--;
            if (this.battleRewardNum < 0) this.battleRewardNum = 0;
            this.updateAllRewardNum();
            this.addSubTask(GameVoManager.getInstance.myUserVo.battleTaskData[index].taskId, TaskType.Battle);
        }
    }
    public getBattleTaskStateByIndex(index) {
        return GameVoManager.getInstance.myUserVo.battleTaskData[index].taskState;
    }

    public addSubTask(taskid: number, taskType: TaskType) {
        let taskdata = Cfg.Task.get(taskid);
        if (taskdata.nextTask) {
            let data = Cfg.Task.get(taskdata.nextTask);
            if (!this.checkNewTask(data.id)) {
                this.logTaskId(data.id);
                if (taskType == TaskType.Stage) {
                    GameVoManager.getInstance.myUserVo.stageTaskData.push({ taskId: data.id, taskState: 0, taskCurProg: 0 });
                    this._updateStageProgress(TaskSubType.WinTarget, [GameVoManager.getInstance.myUserVo.topLevel, 1]);
                } else if (taskType == TaskType.Battle) {
                    GameVoManager.getInstance.myUserVo.battleTaskData.push({ taskId: data.id, taskCurProg: 0, taskState: 0 });
                    if (data.definition == TaskSubType.StrengTarget) {
                        this._updateBattleProgress(TaskSubType.StrengTarget, [GameVoManager.getInstance.myUserVo.equipPartLevel[data.task[1] - 1], 1, data.task[1]]);
                    } else if (data.definition == TaskSubType.BattleTarget) {
                        this._updateBattleProgress(TaskSubType.BattleTarget, GameVoManager.getInstance.getBattle());
                    }
                }
            }
        }
    }

    public logTaskId(id) {
        GameVoManager.getInstance.myUserVo.taskLogList[id] = 1;
    }

    public sortTask(taskType: TaskType) {
        let sortindex = [1, 0, 2];
        if (taskType == TaskType.Daily) {
            GameVoManager.getInstance.myUserVo.dailyTaskData.sort((a, b) => {
                if (sortindex[a.taskState] == sortindex[b.taskState]) {
                    return a.taskId - b.taskId;
                }
                else return sortindex[a.taskState] - sortindex[b.taskState];
            });
        } else if (taskType == TaskType.Stage) {
            GameVoManager.getInstance.myUserVo.stageTaskData.sort((a, b) => {
                if (sortindex[a.taskState] == sortindex[b.taskState]) {
                    return a.taskId - b.taskId;
                }
                else return sortindex[a.taskState] - sortindex[b.taskState];
            });
        } else if (taskType == TaskType.Battle) {
            GameVoManager.getInstance.myUserVo.battleTaskData.sort((a, b) => {
                if (sortindex[a.taskState] == sortindex[b.taskState]) {
                    return a.taskId - b.taskId;
                }
                else return sortindex[a.taskState] - sortindex[b.taskState];
            });
        }
    }

    public getRewardWayById(id: number) {
        let data = Cfg.Task.get(id);
        if (!data) return [];
        else return data.url;
    }
    /**
     * 更新任务进度
     * @param subType 任务子类型
     * @param param 额外任务参数
     */
    public updateTaskProgress(subType: TaskSubType, param: any) {
        // this._updateDailyProgress(subType, param);
        this._updateStageProgress(subType, param);
        this._updateBattleProgress(subType, param);
    }

    public _updateDailyProgress(subType: TaskSubType, param: any) {
        let len = GameVoManager.getInstance.myUserVo.dailyTaskData.length;
        let ischange = false;
        for (let i = 0; i < len; i++) {
            let data = GameVoManager.getInstance.myUserVo.dailyTaskData[i];
            if (data.taskState >= 1) continue;
            let newdata = this._taskProgressAdapter.calProgress(subType, data.taskId, param);
            if (newdata) {
                if (newdata.isAddUp)
                    GameVoManager.getInstance.myUserVo.dailyTaskData[i].taskCurProg += newdata.taskCurProg;
                else {
                    GameVoManager.getInstance.myUserVo.dailyTaskData[i].taskCurProg = newdata.taskCurProg;
                }
                if (GameVoManager.getInstance.myUserVo.dailyTaskData[i].taskCurProg >= newdata.taskTargetProg) {
                    GameVoManager.getInstance.myUserVo.dailyTaskData[i].taskState = 1;
                    ischange = true;
                    this.dailyRewardNum++;
                    this.updateAllRewardNum();
                }
            }
        }
        if (ischange) {
            GameVoManager.getInstance.saveDailyTaskData();
        }
    }

    public _updateStageProgress(subType: TaskSubType, param: any) {
        let len = GameVoManager.getInstance.myUserVo.stageTaskData.length;
        let ischange = false;
        for (let i = 0; i < len; i++) {
            let data = GameVoManager.getInstance.myUserVo.stageTaskData[i];
            if (data.taskState >= 1) continue;
            let newdata = this._taskProgressAdapter.calProgress(subType, data.taskId, param);
            if (newdata) {
                if (newdata.isAddUp)
                    GameVoManager.getInstance.myUserVo.stageTaskData[i].taskCurProg += newdata.taskCurProg;
                else {
                    GameVoManager.getInstance.myUserVo.stageTaskData[i].taskCurProg = newdata.taskCurProg;
                }
                if (GameVoManager.getInstance.myUserVo.stageTaskData[i].taskCurProg >= newdata.taskTargetProg) {
                    GameVoManager.getInstance.myUserVo.stageTaskData[i].taskState = 1;
                    ischange = true;
                    this.stageRewardNum++;
                    this.updateAllRewardNum();
                }
            }
        }
        if (ischange) {
            GameVoManager.getInstance.saveStageTaskData();
        }
    }

    public _updateBattleProgress(subType: TaskSubType, param: any) {
        let len = GameVoManager.getInstance.myUserVo.battleTaskData.length;
        let ischange = false;
        for (let i = 0; i < len; i++) {
            let data = GameVoManager.getInstance.myUserVo.battleTaskData[i];
            if (data.taskState >= 1) continue;
            let newdata = this._taskProgressAdapter.calProgress(subType, data.taskId, param);
            if (newdata) {
                if (newdata.isAddUp)
                    GameVoManager.getInstance.myUserVo.battleTaskData[i].taskCurProg += newdata.taskCurProg;
                else {
                    GameVoManager.getInstance.myUserVo.battleTaskData[i].taskCurProg = newdata.taskCurProg;
                }
                if (GameVoManager.getInstance.myUserVo.battleTaskData[i].taskCurProg >= newdata.taskTargetProg) {
                    GameVoManager.getInstance.myUserVo.battleTaskData[i].taskState = 1;
                    GameVoManager.getInstance.myUserVo.battleTaskData[i].taskCurProg = newdata.taskTargetProg;
                    ischange = true;
                    this.battleRewardNum++;
                    this.updateAllRewardNum();
                }
            }
        }
        if (ischange) {
            GameVoManager.getInstance.saveBattleTaskData();
        }
    }
}

class TaskProgressAdapter {
    public constructor() {

    }

    /**
     * 
     * @param subtype 
     * @param taskId 
     * @param param WinTarget[关卡id，数量]
     *              StrengTarget[当前强化等级，数量，部位下标]
     *              SmeltReward 金币数量
     *              KillTarget[模式类型1|2，怪物类型0|1|2，数量]
     *              ResumeHp 回复血量
     *              ToolReward 拾取道具数量
     *              EquipReward [模式类型1|2，部位，品质，品阶，数量]
     *              DrawTarget [转盘类型1|2，数量]
     *              BoxTarget [宝箱类型0|1|2，数量]
     *              BoxBuy [商品类型1|2，数量]
     *              SuitUpTarget [部位，品质，品阶，数量]
     *              BattleTarget 总战力
     */
    public calProgress(subtype: TaskSubType, taskId: number, param: any) {
        let taskdata = Cfg.Task.get(taskId);
        if (!taskdata || taskdata.definition != subtype) return null;
        let targetnum = this.calTargetNumById(taskId);
        let newdata = { taskTargetProg: targetnum, taskCurProg: 0, isAddUp: true };

        if (subtype == TaskSubType.WinTarget) {
            if (taskdata.task[0] == 1 && taskdata.task[1] <= param[0]) {
                newdata.taskCurProg = 1;
            } else if (taskdata.task[0] == 2) {
                newdata.taskCurProg = param[1];
            }
        } else if (subtype == TaskSubType.StrengTarget) {
            if (taskdata.task[1] == 0 || taskdata.task[1] == param[2]) {//准确部位
                if (taskdata.task[0] == 1 && param[0] >= taskdata.task[2]) {
                    newdata.taskCurProg = 1;
                } else if (taskdata.task[0] == 2) {
                    newdata.taskCurProg = param[1];
                }
            }
        } else if (subtype == TaskSubType.SmeltReward) {
            newdata.taskCurProg = param;
        } else if (subtype == TaskSubType.KillTarget) {
            if (taskdata.task[0] == param[0] && (taskdata.task[1] == 0 || taskdata.task[1] == param[1])) {
                newdata.taskCurProg = param[2];
            }
        } else if (subtype == TaskSubType.ResumeHp) {
            newdata.taskCurProg = param;
        } else if (subtype == TaskSubType.ToolReward) {
            newdata.taskCurProg = param;
        } else if (subtype == TaskSubType.EquipReward) {
            if (taskdata.task[0] == param[0] && (taskdata.task[1] == 0 || taskdata.task[1] == param[1]) && (taskdata.task[2] == 0 || taskdata.task[2] == param[2])
                && (taskdata.task[3] == 0 || taskdata.task[3] == param[3])) {
                newdata.taskCurProg = param[4];
            }
        } else if (subtype == TaskSubType.DrawTarget) {
            if (taskdata.task[0] == param[0]) {
                newdata.taskCurProg = param[1];
            }
        } else if (subtype == TaskSubType.BoxTarget) {
            if (taskdata.task[0] == 0 || taskdata.task[0] == param[0]) {
                newdata.taskCurProg = param[1];
            }
        } else if (subtype == TaskSubType.BoxBuy) {
            if (taskdata.task[0] == param[0]) {
                newdata.taskCurProg = param[1];
            }
        } else if (subtype == TaskSubType.SuitUpTarget) {
            if ((taskdata.task[0] == 0 || taskdata.task[0] == param[0]) && (taskdata.task[0] == 0 || taskdata.task[1] == param[1]) && (taskdata.task[2] == 0 || taskdata.task[2] == param[2])) {
                newdata.taskCurProg = param[3];
            }
        } else if (subtype == TaskSubType.BattleTarget) {
            newdata.taskCurProg = param;
            newdata.isAddUp = false;
        }
        return newdata;
    }

    public calTargetNumById(id: number) {
        let taskdata = Cfg.Task.get(id);
        let targetpro = 1;
        if (!taskdata) return targetpro;
        let subtype = taskdata.definition;
        if (subtype == TaskSubType.WinTarget) {
            targetpro = taskdata.task[0] == 1 ? 1 : taskdata.task[1];
        } else if (subtype == TaskSubType.StrengTarget) {
            targetpro = taskdata.task[0] == 1 ? 1 : taskdata.task[2];
        } else if (subtype == TaskSubType.SmeltReward) {
            targetpro = taskdata.task[0];
        } else if (subtype == TaskSubType.KillTarget) {
            targetpro = taskdata.task[2];
        } else if (subtype == TaskSubType.ResumeHp) {
            targetpro = taskdata.task[0];
        } else if (subtype == TaskSubType.ToolReward) {
            targetpro = taskdata.task[0];
        } else if (subtype == TaskSubType.EquipReward) {
            targetpro = taskdata.task[4];
        } else if (subtype == TaskSubType.DrawTarget) {
            targetpro = taskdata.task[1];
        } else if (subtype == TaskSubType.BoxTarget) {
            targetpro = taskdata.task[1];
        } else if (subtype == TaskSubType.BoxBuy) {
            targetpro = taskdata.task[1];
        } else if (subtype == TaskSubType.SuitUpTarget) {
            targetpro = taskdata.task[3];
        } else if (subtype == TaskSubType.BattleTarget) {
            targetpro = taskdata.task[0];
        }
        return targetpro;
    }
}