import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { RoleManager } from "../../manager/RoleManager";
import { AttackVo, Common_UIPath, TaskSubType } from "../../common/Common_Define";
import FightModel from "./FightModel";
import { UIManager } from "../../framework/UIManager";
import { GameVoManager } from "../../manager/GameVoManager";
import { Time } from "../../framework/Time";
import NetAdapter from "../../adpapter/NetAdapter";
import { Manager } from "../../manager/Manager";
import { ToolManager } from "../../manager/ToolManager";
import { CallID } from "../../CallID";
import { Const } from "../../config/Const";
import { Util } from "../../utils/Util";
import { Cfg } from "../../config/Cfg";
import { ResultData } from "../result/ResultNewController";

/*
 * desc
 */
export class FightController extends MVC.BaseController {
    private _model: FightModel;
    public constructor() {
        super("FightController");
        this.changeListener(true);
        this._model = FightModel.getInstance;
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Fight_MonAttack, this.handlerAttack, this);
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.gamePause, this);
        Notifier.changeListener(enable, ListenID.Fight_Start, this.gameStart, this);
        Notifier.changeListener(enable, ListenID.Fight_End, this.gameEnd, this);
        Notifier.changeListener(enable, ListenID.Game_UpdateGold, this.calGold, this);
        Notifier.changeListener(enable, ListenID.Fight_ShowGuide, this.showNewBigGuide, this);
        Notifier.changeListener(enable, ListenID.Game_FightBackToHome, this.onBackHome, this);
        Notifier.changeListener(enable, ListenID.Fight_KeepBoss, this.gameKeepBoss, this);
        Notifier.changeCall(enable, CallID.Fight_GetMonCapacity, this.getMonCapacity, this);
        Notifier.changeListener(enable, ListenID.Fight_OpenUnLockChapterView, this.onOpenUnlockChapterView, this);
        Notifier.changeListener(enable, ListenID.Fight_UpdateStep, this.updatePassStep, this);
        Notifier.changeListener(enable, ListenID.Role_CostPower, this.onRoleCostPower, this);
        // Notifier.changeListener(enable, ListenID.Fight_SaveLocalChapterInfo, this.saveChapterInfo, this);
    }

    public updatePassStep(steplevel) {
        Notifier.send(ListenID.FightToBoss, false);
        this.stepPass(true, steplevel)
    }

    public stepPass(boo, steplevel) {
        if (FightModel.getInstance.fightType == 0) {
            let str = 'SUCCESS';
            if (boo) {
                Notifier.send(ListenID.Log_Event, { event_name: "level_" + FightModel.getInstance.curLevel + "_victory" });
            } else {
                str = 'FAIL';
            }
            let costtime = Math.ceil(Time.gameTime * 1000);
            if (boo) {
                if (FightModel.getInstance.curLevel > GameVoManager.getInstance.myUserVo.topLevel) {//当前等级
                    GameVoManager.getInstance.myUserVo.topLevel += 1;
                    GameVoManager.getInstance.saveData();
                    let userinfo = {
                        nickName: GameVoManager.getInstance.myUserVo.nickName, topLevel: GameVoManager.getInstance.myUserVo.topLevel,
                        equipPart: GameVoManager.getInstance.myUserVo.equipPart, equipPartLevel: GameVoManager.getInstance.myUserVo.equipPartLevel,
                        battle: GameVoManager.getInstance.getBattle(),
                    };
                    let d = { type: "newlevel", cycle: "forever", score: GameVoManager.getInstance.myUserVo.topLevel, data: JSON.stringify(userinfo) };
                    NetAdapter.postRankData(d);
                }
                Notifier.send(ListenID.Log_Event, { event_name: "level_win" });
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.WinTarget, [FightModel.getInstance.curLevel, 1]);
            }
        } else {

        }
    }


    //**处理子弹碰撞 */
    public handlerAttack(hurt: number) {
        RoleManager.getInstance.mainRole.reduceBlood(hurt);
    }

    public gamePause(boo: boolean) {
        if (boo) {
            FightModel.getInstance.isPause++;
        } else {
            FightModel.getInstance.isPause--
        }
        if (FightModel.getInstance.isPause < 0) {
            FightModel.getInstance.isPause = 0;
        }
    }

    public gameEnd(boo) {
        let levelUp = this.countExp();
        if (UIManager.getNodeByName(Common_UIPath.PauseUI)) {
            UIManager.Close(Common_UIPath.PauseUI);
        }
        Manager.storage.delete(Const.STORAGE_CHAPTER_INFO);
        if (FightModel.getInstance.fightType == 0) {
            // let data = FightModel.getInstance.getUnLockData();
            // GameVoManager.getInstance.myUserVo.passCurLevel = boo;
            /**        结算奖励                 */
            // if (FightModel.getInstance.goldInCome) {
            //     GameVoManager.getInstance.setGold(FightModel.getInstance.goldInCome);
            // }
            if (FightModel.getInstance.diamondInCome) {
                GameVoManager.getInstance.setDiamond(FightModel.getInstance.diamondInCome);
            }
            let len = FightModel.getInstance.rewardList.length;
            for (let i = 0; i < len; i++) {
                GameVoManager.getInstance.addEquip(FightModel.getInstance.rewardList[i]);
            }
            /************************************** */
            let str = 'SUCCESS';
            if (boo) {
                // GameVoManager.getInstance.stateVo.levelFailTimes = 0;//胜利清零
                Notifier.send(ListenID.Log_Event, { event_name: "level_" + FightModel.getInstance.curLevel + "_victory" });
            } else {
                str = 'FAIL';
                // GameVoManager.getInstance.stateVo.levelFailTimes += 1;//失败累计次数
            }
            Manager.audio.stopAllGunSources();
            let curlevel = boo ? FightModel.getInstance.curLevel : FightModel.getInstance.curLevel - 1;
            let isNew = curlevel > GameVoManager.getInstance.myUserVo.tempTopLevel;
            if (boo) {
                if (FightModel.getInstance.curLevel > GameVoManager.getInstance.myUserVo.topLevel) {//当前等级
                    GameVoManager.getInstance.myUserVo.topLevel += 1;
                    GameVoManager.getInstance.setPower(FightModel.getInstance.chapterCfg.powerCount, 2);
                    // if (GameVoManager.getInstance.myUserVo.topLevel == 15) {
                    //     GameVoManager.getInstance.myUserVo.showunLockBoss = true;
                    // }
                    if (Util.isChapterLastLevel(GameVoManager.getInstance.myUserVo.topLevel)) {
                        let list = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
                        let data = Cfg.Chapter.filter({});
                        if (list[0] + 1 <= data.length) {
                            GameVoManager.getInstance.myUserVo.showUnlockChapter = list[0] + 1;
                        }
                    }
                    let partIndex = Notifier.call(CallID.Equip_GetUnLockPart);
                    if (partIndex) {
                        GameVoManager.getInstance.myUserVo.showUnLockPartIndex = partIndex;
                    }
                    GameVoManager.getInstance.saveData();
                    let userinfo = {
                        nickName: GameVoManager.getInstance.myUserVo.nickName, topLevel: GameVoManager.getInstance.myUserVo.topLevel,
                        equipPart: GameVoManager.getInstance.myUserVo.equipPart, equipPartLevel: GameVoManager.getInstance.myUserVo.equipPartLevel,
                        battle: GameVoManager.getInstance.getBattle(),
                    };
                    let d = { type: "newlevel", cycle: "forever", score: GameVoManager.getInstance.myUserVo.topLevel, data: JSON.stringify(userinfo) };
                    NetAdapter.postRankData(d);
                }
                Notifier.send(ListenID.Log_Event, { event_name: "level_win" });
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.WinTarget, [FightModel.getInstance.curLevel, 1]);
            }
            let chapter = Util.levelToChapterId(FightModel.getInstance.curLevel);
            Notifier.send(ListenID.Fight_Result, {
                isFirst: boo && FightModel.getInstance.curLevel > GameVoManager.getInstance.myUserVo.tempTopLevel,
                isNew: isNew,
                levelUp: levelUp,
                coin: FightModel.getInstance.goldInCome,
                killNum: FightModel.getInstance.killNum,
                rewardList: FightModel.getInstance.rewardList,
                curLevel: boo ? FightModel.getInstance.curLevel : (FightModel.getInstance.curLevel - 1 < 0 ? 0 : FightModel.getInstance.curLevel - 1),
                chapterId: chapter[0],
            } as ResultData);
            // Time.delay(0.8, () => {
            // if (data.length > 0 && boo) {
            //     UIManager.Open(Common_UIPath.GetDiamondUI, MVC.eTransition.Default, MVC.eUILayer.Panel, { type: data[0], id: data[1], isWin: boo });
            // } else {
            // if (data.length > 0) {//解锁道具
            //     if (data[0] == 2) {
            //         if (!GameVoManager.getInstance.myUserVo.dropList[data[1]]) {
            //             GameVoManager.getInstance.myUserVo.dropList[data[1]] = 1;
            //         }
            //     }
            // }
            // Notifier.send(ListenID.Fight_Result, {isFirst: true, isNew: true, levelUp: true});
            // }
            // })
        } else {
            Time.delay(0.8, () => {
                Notifier.send(ListenID.Fight_RecycleObj);
                RoleManager.getInstance.resetGame();
                ToolManager.getInstance.fightEnd();
                UIManager.Close(Common_UIPath.FightUI);
                Notifier.send(ListenID.ShowBossRank, 1);
                FightModel.getInstance.goldInCome = 0;
                RoleManager.getInstance.mainRole.node.position = cc.Vec2.ZERO;
                // Notifier.send(ListenID.Log_Event, { event_name: "bossCombat_level_victory", counter: FightModel.getInstance.curLevel - 1 });
            });
        }
    }

    countExp() {
        let levelUp = false;
        // let roleVO = GameVoManager.getInstance.myUserVo;
        let exp = FightModel.getInstance.costPower * 10;
        // let lv = roleVO.roleLv;
        // let curLvCfg = Cfg.RoleLevel.get(lv);
        // roleVO.curExp += exp;
        // roleVO.allExp += exp;
        levelUp = GameVoManager.getInstance.addExp(exp);
        // if (nextLvCfg.exp && roleVO.curExp >= nextLvCfg.exp) {
        // while (true) {
        //     let nextLvCfg = Cfg.RoleLevel.get(lv + 1);
        //     if (nextLvCfg) {
        //         let cur = roleVO.curExp - nextLvCfg.exp;
        //         if (cur >= 0) {
        //             lv++;
        //             roleVO.curExp = cur;
        //             levelUp = true;
        //         } else {
        //             break;
        //         }
        //     } else {
        //         break;
        //     }
        // }
        // if (roleVO.roleLv != lv) {
        //     roleVO.roleLv = lv;
        //     GameVoManager.getInstance.saveAllData();
        // }
        // }
        // Notifier.send(ListenID.Role_GetExp, exp);
        return levelUp;
    }

    public gameStart() {
        if (GameVoManager.getInstance.stateVo.chapterInfo) {
            FightModel.getInstance.goldInCome = GameVoManager.getInstance.stateVo.chapterInfo.goldInCome;
            FightModel.getInstance.diamondInCome = GameVoManager.getInstance.stateVo.chapterInfo.diamondInCome;
        } else {
            FightModel.getInstance.goldInCome = 0;
            FightModel.getInstance.diamondInCome = 0;
        }
    }

    public calGold(gold: number, type: number) {
        if (type && type == 1) {//杀怪收入
            if (FightModel.getInstance.fightType != 0) {
                FightModel.getInstance.goldInCome += gold;
                GameVoManager.getInstance.myUserVo.bossGold += gold;
            }
        }
    }

    public showNewBigGuide() {
        UIManager.Open(Common_UIPath.GuideUI, MVC.eTransition.Default, MVC.eUILayer.Tips, {
            errorcb: () => {
                Notifier.send(ListenID.Game_FightBackToHome);
            }
        });
    }

    public onBackHome() {
        FightModel.getInstance.goldInCome = 0;
        Manager.audio.stopAllGunSources();
    }

    public gameKeepBoss(boo) {
        GameVoManager.getInstance.myUserVo.lastBossRank = FightModel.getInstance.curLevel;
        GameVoManager.getInstance.myUserVo.isChallenge = 1;
        if (GameVoManager.getInstance.myUserVo.topBossRank < FightModel.getInstance.curLevel) {
            GameVoManager.getInstance.myUserVo.topBossRank = FightModel.getInstance.curLevel;
        }
        GameVoManager.getInstance.saveData();
        let userinfo = {
            nickName: GameVoManager.getInstance.myUserVo.nickName, topLevel: GameVoManager.getInstance.myUserVo.topLevel,
            equipPart: GameVoManager.getInstance.myUserVo.equipPart, equipPartLevel: GameVoManager.getInstance.myUserVo.equipPartLevel,
            battle: GameVoManager.getInstance.getBattle(),
        };
        let d = { type: "bosslevel", cycle: "forever", score: FightModel.getInstance.curLevel, data: JSON.stringify(userinfo) };
        NetAdapter.postRankData(d);
        let time = FightModel.getInstance.bossWaitTime;
        let bossData = Cfg.Boss.get(FightModel.getInstance.curLevel + 1);
        if (bossData) {
            if (bossData.openLevel > GameVoManager.getInstance.myUserVo.topLevel) {
                //下一阶段需要通关
                FightModel.getInstance.isFighting = false;
                Notifier.send(ListenID.Boss_FightEnd, true);
                Time.delay(0.8, () => {
                    Notifier.send(ListenID.Boss_OpenAlert, {
                        level: bossData.openLevel, errorcb: () => {
                            Notifier.send(ListenID.Fight_RecycleObj);
                            RoleManager.getInstance.resetGame();
                            ToolManager.getInstance.fightEnd();
                            UIManager.Close(Common_UIPath.FightUI);
                            Notifier.send(ListenID.ShowBossRank, 1);
                            FightModel.getInstance.goldInCome = 0;
                            RoleManager.getInstance.mainRole.node.position = cc.Vec2.ZERO;
                        }
                    })
                });
            } else {
                FightModel.getInstance.initBossCfg(FightModel.getInstance.curLevel + 1);
                Notifier.send(ListenID.Fight_DownTime, time);
            }
        } else {
            //已经达到最大阶段上限
            FightModel.getInstance.isFighting = false;
            Notifier.send(ListenID.Boss_FightEnd, true);
            Time.delay(0.8, () => {
                Notifier.send(ListenID.Boss_OpenAlert, {
                    level: 0, errorcb: () => {
                        Notifier.send(ListenID.Fight_RecycleObj);
                        RoleManager.getInstance.resetGame();
                        ToolManager.getInstance.fightEnd();
                        UIManager.Close(Common_UIPath.FightUI);
                        Notifier.send(ListenID.ShowBossRank, 1);
                        FightModel.getInstance.goldInCome = 0;
                        RoleManager.getInstance.mainRole.node.position = cc.Vec2.ZERO;
                    }
                })
            });
        }

    }

    public getMonCapacity(): number {
        return this._model.monsterCapacity;
    }

    public onOpenUnlockChapterView(id) {
        UIManager.Open('ui/common/UnLockChapterUI', MVC.eTransition.Scale, MVC.eUILayer.Popup, id);
    }

    onRoleCostPower(num: number) {
        num = num ? num : 0;
        FightModel.getInstance.costPower = num;
    }

    saveChapterInfo() {
        // FightModel.getInstance.saveTempChapterInfo();
    }
}