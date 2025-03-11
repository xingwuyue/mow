import { TaskDataVo } from "../../shareData/UserVo";
import RewardTaskModel from "./RewardTaskModel";
import { Util } from "../../utils/Util";
import ItemCell from "../../component/itemscroll/ItemCell";
import { TaskType } from "../../common/Common_Define";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { AlertManager } from "../../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardTaskItem extends cc.Component {

    @property([cc.Node])
    taskStateNode: cc.Node[] = [];

    @property(cc.Label)
    taskDesc: cc.Label = null;

    @property(cc.Label)
    taskProgText: cc.Label = null;

    @property(cc.Node)
    rewardListNode: cc.Node = null;

    @property(cc.Node)
    progress: cc.Node = null;

    start() {
        let handler = new cc.Component.EventHandler();
        handler.target = this.node;
        handler.component = "RewardTaskItem";
        handler.handler = "onGoTo";
        this.taskStateNode[0].getComponent(cc.Button).clickEvents.push(handler);

        let handler2 = new cc.Component.EventHandler();
        handler2.target = this.node;
        handler2.component = "RewardTaskItem";
        handler2.handler = "onGetReward";
        this.taskStateNode[1].getComponent(cc.Button).clickEvents.push(handler2);
    }

    private progWidth = 173;
    public taskIndex: number = 0;
    private taskTargetProg: number = 0;
    private taskType: TaskType = TaskType.Daily;
    private _taskData: TaskDataVo = null;
    public rewardList: cc.Node[] = [];

    updateInfo(index, type: TaskType) {
        this.taskIndex = index;
        this.taskType = type;
        if (type == TaskType.Daily) {
            this._taskData = RewardTaskModel.getInstance.getDailyTaskDataByIndex(index);
            if (!this._taskData) return;
        } else if (type == TaskType.Stage) {
            this._taskData = RewardTaskModel.getInstance.getStageTaskDataByIndex(index);
            if (!this._taskData) return;
        } else if (type == TaskType.Battle) {
            this._taskData = RewardTaskModel.getInstance.getBattleTaskDataByIndex(index);
            if (!this._taskData) return;
        }
        this.taskTargetProg = RewardTaskModel.getInstance.getTaskTargetProgById(this._taskData.taskId);
        let curprog = this._taskData.taskCurProg > this.taskTargetProg ? this.taskTargetProg : this._taskData.taskCurProg;
        this.taskProgText.string = `${Util.numFormat(curprog)}/${Util.numFormat(this.taskTargetProg)}`;
        this.progress.width = cc.misc.clampf(curprog / this.taskTargetProg * this.progWidth, 0, this.progWidth);
        this.taskDesc.string = RewardTaskModel.getInstance.getTaskDescById(this._taskData.taskId);
        let rewardlist = RewardTaskModel.getInstance.getTaskRewardById(this._taskData.taskId);
        this.updateRewardList(rewardlist);
        this.setState(this._taskData.taskState);
    }

    updateInfoSelf() {
        this.updateInfo(this.taskIndex, this.taskType);
    }

    public updateRewardList(rewardlist) {
        if (rewardlist.length && rewardlist.length > 0) {
            let updatelen = rewardlist.length / 2;
            let dellen = this.rewardList.length - updatelen;
            for (let i = 0; i < updatelen; i++) {
                if (!this.rewardList[i]) {
                    let node = RewardTaskModel.getInstance.getRewardNode();
                    this.rewardList[i] = node;
                    node.parent = this.rewardListNode;
                    node.active = true;
                }
                let goodsNum = rewardlist[2 * i] == 4 ? 1 : rewardlist[2 * i + 1];
                this.rewardList[i].getComponent(ItemCell).initItem({
                    index: -1,
                    itemID: rewardlist[2 * i],
                    goodsNum: goodsNum,
                    step: 0,
                })
            }
            for (let j = 0; j < dellen; j++) {
                let node = this.rewardList.pop();
                RewardTaskModel.getInstance.recycleRewardNode(node);
            }
        }
    }

    public setState(state) {
        for (let i = 0; i < this.taskStateNode.length; i++) {
            this.taskStateNode[i].active = i == state;
        }
    }

    public onGetReward() {
        if (!this._taskData) {
            AlertManager.showNormalTips("数据为空，无法完成");
            return;
        }
        if (this.taskType == TaskType.Daily) {
            RewardTaskModel.getInstance.setDailyTaskStateByIndex(this.taskIndex, 2);
            Notifier.send(ListenID.Log_Event, { event_name: "everydayTask_Award", counter: 1 });
        } else if (this.taskType == TaskType.Stage) {
            RewardTaskModel.getInstance.setStageTaskStateByIndex(this.taskIndex, 2);
            Notifier.send(ListenID.Log_Event, { event_name: "levelTask_Award", counter: 1 });
        } else if (this.taskType == TaskType.Battle) {
            RewardTaskModel.getInstance.setBattleTaskStateByIndex(this.taskIndex, 2);
            Notifier.send(ListenID.Log_Event, { event_name: "fightingTask_Award", counter: 1 });
        }
        Notifier.send(ListenID.RewardTask_OnReward, this.taskType, this._taskData.taskId);
    }

    public onGoTo() {
        if (!this._taskData) {
            AlertManager.showNormalTips("数据为空，无法跳转");
            return;
        }
        Notifier.send(ListenID.RewardTask_ToGetReward, this._taskData.taskId);
    }

    onDestroy() {

    }
}
