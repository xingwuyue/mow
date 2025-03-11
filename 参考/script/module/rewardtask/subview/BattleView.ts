import RewardTaskItem from "../RewardTaskItem";
import RewardTaskModel from "../RewardTaskModel";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { AlertManager } from "../../../alert/AlertManager";
import { Manager } from "../../../manager/Manager";
import { TaskType, Common_UIPath } from "../../../common/Common_Define";
import { CallID } from "../../../CallID";
import { Const } from "../../../config/Const";
import { GameVoManager } from "../../../manager/GameVoManager";
import { UIManager } from "../../../framework/UIManager";
import { MVC } from "../../../framework/MVC";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BattleView extends cc.Component {

    @property(cc.Node)
    taskContent: cc.Node = null;

    start() {
        this.changeListener(true);
    }

    public taskItemList: RewardTaskItem[] = [];
    public itemHeight: number = 152;
    public totalCount: number = 0; // how many items we need for the whole list
    public spawnCount: number = 5;
    public spacing: number = 14; // space between each item
    public bufferZone: number = 400;
    public lastContentPosY = 0;

    public changeListener(enable) {

    }

    public isInit = false;
    public updateView(itemPrefab: cc.Prefab) {
        if (!this.isInit) {
            let data = RewardTaskModel.getInstance.getBattleTaskList();
            this.totalCount = data.length;
            if (this.totalCount < this.spawnCount) {
                this.totalCount = this.spawnCount;
            }
            this.taskContent.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
            for (let i = 0; i < this.spawnCount; i++) {
                let item = cc.instantiate(itemPrefab);
                item.active = true;
                this.taskContent.addChild(item);
                item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                let itemdata = item.getComponent(RewardTaskItem);
                this.taskItemList.push(itemdata);
                itemdata.updateInfo(i, TaskType.Battle);
            }
            this.isInit = true;
        }
    }

    onReward(taskType: TaskType, id) {
        if (taskType == TaskType.Battle) {
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
            }
            RewardTaskModel.getInstance.sortTask(TaskType.Battle);
            GameVoManager.getInstance.saveBattleTaskData();
            if (goodlist.length > 0) {
                UIManager.Open(Common_UIPath.RewardTaskUI, MVC.eTransition.Scale, MVC.eUILayer.Popup, goodlist);
            }
            for (let i = 0; i < this.taskItemList.length; i++) {
                this.taskItemList[i].updateInfoSelf();
            }
        }
    }

    public onRewardAll() {
        let currencylist = [0, 0, 0, 0];
        let goodlist = [];
        let data = RewardTaskModel.getInstance.getBattleTaskList();
        let len = data.length;
        let lognum = 0;
        for (let i = 0; i < len; i++) {
            let taskdata = RewardTaskModel.getInstance.getBattleTaskDataByIndex(i);
            if (taskdata.taskState == 1) {
                lognum++;
                RewardTaskModel.getInstance.setBattleTaskStateByIndex(i, 2);
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
        RewardTaskModel.getInstance.sortTask(TaskType.Battle);
        GameVoManager.getInstance.saveBattleTaskData();
        if (goodlist.length > 0) {
            UIManager.Open(Common_UIPath.RewardTaskUI, MVC.eTransition.Scale, MVC.eUILayer.Popup, goodlist);
        }
        for (let i = 0; i < this.taskItemList.length; i++) {
            this.taskItemList[i].updateInfoSelf();
        }
        if (lognum > 0) {
            Notifier.send(ListenID.Log_Event, { event_name: "fightingTask_Award", counter: lognum });
        }
    }
    private updateRankTime = 0.1;
    update(dt) {
        this.updateRankTime -= dt;
        if (this.isInit && this.updateRankTime <= 0) {
            this.adjustScrollData();
            this.updateRankTime = 0.1;
        }
    }
    /**
     * 调整滚动物品位置
     */
    adjustScrollData() {
        let items = this.taskItemList;
        let buffer = this.bufferZone;
        let isDown = this.taskContent.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemHeight + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i].node);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].node.y + offset < 0) {
                    items[i].node.y = items[i].node.y + offset;
                    let item = items[i];
                    let itemId = item.taskIndex - items.length;
                    item.updateInfo(itemId, TaskType.Battle);
                }
            } else {
                if (viewPos.y > buffer && items[i].node.y - offset > -this.taskContent.height) {
                    items[i].node.y = items[i].node.y - offset;
                    let item = items[i];
                    let itemId = item.taskIndex + items.length;
                    item.updateInfo(itemId, TaskType.Battle);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.taskContent.y;
    }

    getPositionInView(item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.taskContent.parent.parent.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    onDestroy() {
        this.changeListener(false);
    }
    // update (dt) {}
}
