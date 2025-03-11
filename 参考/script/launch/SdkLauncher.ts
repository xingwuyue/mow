import { Const } from "../config/Const";
import { Notifier } from "../framework/Notifier";
import { GameVoManager } from "../manager/GameVoManager";
import { AlertManager, AlertType } from "../alert/AlertManager";
import { Time } from "../framework/Time";
import NetAdapter from "../adpapter/NetAdapter";
import { ListenID } from "../ListenID";
import { BulletManager } from "../manager/BulletManager";
import { RoleManager } from "../manager/RoleManager";
import { ToolManager } from "../manager/ToolManager";
import { Cfg } from "../config/Cfg";
import { ShareCode, Common_UIPath } from "../common/Common_Define";
import { Manager } from "../manager/Manager";
import { Util } from "../utils/Util";
import { UIManager } from "../framework/UIManager";
import FightModel from "../module/fight/FightModel";
import { UserVo } from "../shareData/UserVo";

export class SdkLauncher {
    private launchDesc: cc.Label = null;
    private progress: cc.ProgressBar = null;
    private _progressNum: number = 0;
    public constructor(launchDesc?: cc.Label, progress?: cc.ProgressBar) {
        this.launchDesc = launchDesc;
        this.progress = progress;
        this._progressNum = 10;
        this.setSdkInfo();
        this.loadShareTemplates();
        let data = Cfg.Intensify.filter({});
        GameVoManager.getInstance.myUserVo.equipUpgradeMaxLevel = data.length;
        this.login();
    }

    public get progressNum(): number {
        return this._progressNum > 100 ? 100 : this._progressNum;
    }
    public setSdkInfo() {
        Notifier.send(ListenID.Login_Start);
    }

    login() {
        this.loadOther();
        this.loadData();
    }

    async loadData() {
        Notifier.send(ListenID.Log_Event, { event_name: "loadstart" });
        await Promise.all([this.loadGameSwitchConfig(), this.loadActor(), this.loadTime(), this.loadUserData(), this.loadBullet(), this.loadDrop(), this.loadTool(), this.loadMusic(), this.loadScene(), this.loadEquipDrop(), this.loadBuffEffect()]);
        if (this.progress) { this.progress.progress = 1; this.launchDesc.string = "100%" }
        this.checkLogin().then(() => {
            this.initData();
        }).catch(err => {

        })
    }

    async loadTime() {
        // console.log("***** Js SDKLauncher loadTime *****");
        return new Promise((resolve, reject) => {

            cc.log("***** Js SDKLauncher loadtime fail *****");
            this.progress.progress += 0.1;
            this._progressNum = Math.floor(this.progress.progress * 100);
            this.launchDesc.string = `${this.progressNum}%`;
            let time = Date.now();
            Time.setServerTime(time);
            resolve();
        })
    }

    /**加载被动分享模板 */
    loadShareTemplates() {

    }

    /**加载游戏开关控制 */
    async loadGameSwitchConfig() {
        return new Promise((resolve, reject) => {
            this.progress.progress += 0.1;
            this._progressNum = Math.floor(this.progress.progress * 100);
            this.launchDesc.string = `${this.progressNum}%`;
            resolve();
        })
    }

    /**加载用户数据 */
    async loadUserData() {
        return new Promise((resolve, reject) => {
            let data = {};
            data = this.checkUserData(data);
            GameVoManager.getInstance.myUserVo.updatetUserVo(data);
            if(typeof(GameVoManager.getInstance.myUserVo.guideFlag) != "number"){
                GameVoManager.getInstance.myUserVo.guideFlag = 999;
            }
            GameVoManager.getInstance.stateVo.curLevel = GameVoManager.getInstance.myUserVo.topLevel + 1;
            GameVoManager.getInstance.stateVo.isGetData = true;
            Notifier.send(ListenID.Login_User);
            this.progress.progress += 0.1;
            this._progressNum = Math.floor(this.progress.progress * 100);
            this.launchDesc.string = `${this.progressNum}%`;
            resolve();
        });
    }

    async loadActor() {
        return new Promise((resolve, reject) => {
            let data = Cfg.Monster.filter({});
            let len = data.length;
            let curcomplete = 0;
            let per = 0.1 / len;

            for (let i = 0; i < len; i++) {
                let value = data[i];
                cc.loader.loadRes(value.monResPath, cc.Prefab, (err, res) => {
                    curcomplete++;
                    this.progress.progress += per;
                    this._progressNum = Math.floor(this.progress.progress * 100);
                    this.launchDesc.string = `${this.progressNum}%`;
                    if (err) {
                        cc.log("***** Js SDKLauncher loadActor Error *****");
                        cc.error(err);
                    } else {
                        // console.log("***** Js SDKLauncher loadActor Success *****", this.launchDesc.string);
                        RoleManager.getInstance.addMonsterPrefabByType(value.id, res);
                    }

                    if (curcomplete >= len) {
                        // console.log("***** Js SDKLauncher loadActor Success *****");
                        resolve();
                    }
                })
            }

        })
    }

    async loadBuffEffect() {
        let data = [{ resPath: 'actor/fireBuff', id: 1 }, { resPath: 'actor/poisionBuff', id: 2 }];
        return new Promise((resolve, reject) => {
            let curcomplete = 0;
            let len = data.length;
            let per = 0.05 / len;
            for (let i = 0; i < len; i++) {
                let value = data[i];
                cc.loader.loadRes(value.resPath, cc.Prefab, (err, res) => {
                    curcomplete++;
                    this.progress.progress += per;
                    this._progressNum = Math.floor(this.progress.progress * 100);
                    this.launchDesc.string = `${this.progressNum}%`;
                    if (err) {
                        cc.log("***** Js SDKLauncher loadActor Error *****");
                        cc.error(err);
                    } else {
                        // console.log("***** Js SDKLauncher loadActor Success *****", this.launchDesc.string);
                        RoleManager.getInstance.addBuffPrefabByType(value.id, res);
                    }
                    if (curcomplete >= len) {
                        // console.log("***** Js SDKLauncher loadActor Success *****");
                        resolve();
                    }
                })
            }
        })
    }

    async loadBullet() {
        return new Promise((resolve, reject) => {
            // console.log("***** Js SDKLauncher loadBullet *****");
            let data = Cfg.Bullet.filter({});
            let len = data.length;
            let curcomplete = 0;

            for (let i = 0; i < len; i++) {
                let value = data[i];
                cc.loader.loadRes(value.bulletPath, cc.Prefab, (err, res) => {
                    curcomplete++;
                    if (err) {
                        // console.log("***** Js SDKLauncher loadBullet Error *****", JSON.stringify(err));
                        cc.error(err);
                    } else {
                        // console.log("***** Js SDKLauncher loadBullet Success *****");
                        BulletManager.getInstance.addBullePrefabByType(value.id, res);
                    }
                    this.progress.progress += (0.1 / len);
                    this._progressNum = Math.floor(this.progress.progress * 100);
                    this.launchDesc.string = `${this.progressNum}%`;
                    if (curcomplete >= len) {
                        resolve();
                    }
                })
            }
        });
    }
    async loadDrop() {
        return new Promise((resolve, reject) => {
            // console.log("***** Js SDKLauncher loadDrop *****");

            cc.loader.loadRes("drop/tool", cc.Prefab, (error: Error, resource: cc.Prefab) => {
                this.progress.progress += 0.05;
                this._progressNum = Math.floor(this.progress.progress * 100);
                this.launchDesc.string = `${this.progressNum}%`;
                if (error) {
                    console.log("***** Js SDKLauncher loadDrop Error *****", JSON.stringify(error));
                    resolve();
                    cc.error(error);
                    return;
                }
                ToolManager.getInstance.addToolPrefabByType(resource);
                resolve();
            })
        });
    }

    async loadEquipDrop() {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes("drop/drop", cc.Prefab, (error: Error, resource: cc.Prefab) => {
                if (error) {
                    resolve();
                    cc.error(error);
                    return;
                }
                ToolManager.getInstance.addEquipToolPrefab(resource);
                resolve();
            })
        });
    }

    async loadTool() {
        let data = Cfg.Drop.filter({ needPreLoad: 1 });
        let len = data.length;
        let curcomplete = 0;
        let per = (0.1 / len)
        // console.log("***** Js SDKLauncher loadTool *****");
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                let value = data[i];
                cc.loader.loadRes(value.toolEffectpath, cc.Prefab, (err, res) => {
                    curcomplete++;
                    if (err) {
                        console.log("***** Js SDKLauncher loadTool Error *****", JSON.stringify(err));

                        cc.error(err);
                    } else {
                        // console.log("***** Js SDKLauncher loadTool Success *****");
                        ToolManager.getInstance.addRealToolPrefabByType(value.id, res);
                    }
                    this.progress.progress += per;
                    this._progressNum = Math.floor(this.progress.progress * 100);
                    this.launchDesc.string = `${this.progressNum}%`;
                    if (curcomplete >= len) {
                        resolve();
                    }
                })
            }
        });
    }

    async loadMusic() {
        let data = [{ path: 'audio/fire605', id: 605 }, { path: 'audio/fire105', id: 105 }];//Cfg.Sound.filter({});
        let len = data.length;
        let curcomplete = 0;
        let per = 0.1 / len;

        // console.log("***** Js SDKLauncher loadMusic *****");
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                let value = data[i];
                cc.loader.loadRes(value.path, cc.AudioClip, (err, res) => {
                    curcomplete++;
                    if (err) {
                        console.log("***** Js SDKLauncher loadMusic Error *****", JSON.stringify(err));
                        cc.error(err);
                    } else {
                        // console.log("***** Js SDKLauncher loadMusic Success *****");
                        Manager.audio.setAudioClip(value.id, res);
                    }
                    this.progress.progress += per;
                    this._progressNum = Math.floor(this.progress.progress * 100);
                    this.launchDesc.string = `${this.progressNum}%`;
                    if (curcomplete >= len) {
                        resolve();
                    }
                })
            }
        })
    }

    async loadScene() {
        return new Promise((resolve, reject) => {
            // console.log("***** Js SDKLauncher loadScene *****");
            cc.director.preloadScene(Const.GAME_SCENENAME, (curcomplete, totalcount) => {
                this.progress.progress += 0.1 * (1 / totalcount);
                this._progressNum = Math.floor(this.progress.progress * 100);
                this.launchDesc.string = `${this.progressNum}%`;
            }, () => {
                resolve();
            });
        })
    }

    public loadOther() {
        Util.loadPrefab("ui/deadEffect").then((res) => {
            let node = cc.instantiate(res);
            FightModel.getInstance.putDeadEffectNode(node);
        });
        Util.loadPrefab("ui/warning").then((res => {
            BulletManager.getInstance.addWarningPrefab(res);
        }))
        UIManager.PreLoadView(Common_UIPath.ResultNewUI, null, () => {
        });
        UIManager.PreLoadView(Common_UIPath.FightUI, null, () => {
        });
        UIManager.PreLoadView(Common_UIPath.MenuUI, null, () => {
        });
        UIManager.PreLoadView(Common_UIPath.GroupUI, null, () => {
        });
        UIManager.PreLoadView(Common_UIPath.GetDiamondUI, null, () => {
        });
    }

    public checkLogin(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        })
    }

    public checkUserData(data: any) {
        let localdata = GameVoManager.getInstance.getLocalData();
        return localdata;
    }

    public initData() {
        let date = new Date(Time.serverTimeMs);
        let curday = date.getDate();
        let userData = GameVoManager.getInstance.myUserVo;
        if (GameVoManager.getInstance.myUserVo.firstLoginTime <= 0) {
            GameVoManager.getInstance.myUserVo.firstLoginTime = Time.serverTimeMs;
        }
        GameVoManager.getInstance.resetGun();
        if (curday != userData.day) {
            userData.day = curday;
            userData.inviteNum = 0;
            userData.serviceReward = 0;
            userData.shareUnLock = 0;
            userData.showNewBieGuide = true;
            userData.drawShare = 0;
            userData.drawVideo = 0;
            userData.resultShare = 0;
            userData.resultVideo = 0;
            userData.exchangeVideo = 0;
            userData.shareTimes = 0;
            userData.videoTimes = 0;
            userData.useFreeGoldTimes = 0;
            userData.useFreeDiamondTimes = 0;
            userData.mainDrawTimes = 0;
            userData.successTipsisCheck = 0;
            userData.isChallenge = 0;
            userData.useTreasureBoxNum = 0;
            userData.boxDayLimited = 0;
            Manager.storage.setNumber("reliveVideo", 0);
            Manager.storage.setNumber("reliveDiamond", 0);
            Manager.storage.setNumber("reliveShare", 0);
            Manager.storage.setBool(`notFirstOpenDay`, false);
            Manager.storage.setString(Const.STORAGE_STORE_GOLD, "");
            Manager.storage.setString(Const.STORAGE_STORE_POWER, "");
            Manager.storage.setString(Const.STORAGE_STORE_BOX, "");
            GameVoManager.getInstance.myUserVo.dailyTaskTimes = 0;
            GameVoManager.getInstance.myUserVo.openDailyView = false;
            Notifier.send(ListenID.SecondDay);
            Object.keys(userData.ecologicalStudyList).forEach(key => {
                userData.ecologicalStudyList[key][2] = 0;
            })
        }
        else if (GameVoManager.getInstance.myUserVo.dailyTaskData.length <= 2) {
            Notifier.send(ListenID.RewardTask_RefreshDailyTask);
        }

        if (GameVoManager.getInstance.myUserVo.boxfreeTimes[0] == 0) {
            GameVoManager.getInstance.myUserVo.boxfreeTimes[0] = Time.serverTimeMs + 1200000;
        }
        if (GameVoManager.getInstance.myUserVo.boxfreeTimes[1] == 0) {
            GameVoManager.getInstance.myUserVo.boxfreeTimes[1] = Time.serverTimeMs + 86400000;
        }

        // this.checkGun();
        if (!GameVoManager.getInstance.myUserVo.isSetName) {
            Notifier.send(ListenID.Person_OpenCreateView, () => {
                Notifier.send(ListenID.Login_Finish);
            });
        } else {
            Notifier.send(ListenID.Login_Finish);
        }

    }

    public checkGun() {
        GameVoManager.getInstance.resetGun();
    }

}
