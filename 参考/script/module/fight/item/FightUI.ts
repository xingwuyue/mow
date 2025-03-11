import { MVC } from "../../../framework/MVC";
import { UIManager } from "../../../framework/UIManager";
import { Common_UIPath } from "../../../common/Common_Define";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { GameVoManager } from "../../../manager/GameVoManager";
import { RoleManager } from "../../../manager/RoleManager";
import FightModel from "../FightModel";
import { Manager } from "../../../manager/Manager";
import { Util } from "../../../utils/Util";
import { NotifyID } from "../../../framework/NotifyID";
import BuffUI from "./BuffUI";
import { Cfg } from "../../../config/Cfg";
import { Time } from "../../../framework/Time";
import { CallID } from "../../../CallID";
import { AudioType } from "../../../manager/AudioManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FightUI extends MVC.BaseView {
    @property(cc.Node)
    progressbar: cc.Node = null;

    @property(cc.ProgressBar)
    qteprogress: cc.ProgressBar = null;

    @property(cc.Label)
    goldNumText: cc.Label = null;

    @property(cc.Sprite)
    gunIcon: cc.Sprite = null;

    @property(cc.Node)
    qtepoint: cc.Node = null;

    @property(cc.Label)
    gunNum: cc.Label = null;

    @property(cc.Node)
    moreMonCome: cc.Node = null;

    @property(cc.Node)
    moreBossCome: cc.Node = null;

    // @property([cc.Node])
    // monTips: cc.Node[] = [];

    @property(cc.Label)
    bloodNumLabel: cc.Label = null;

    @property([cc.Node])
    bloodMasks: cc.Node[] = [];

    @property(cc.Node)
    bossBloodNode: cc.Node = null;

    @property(cc.Label)
    stepInfo: cc.Label = null;

    @property(cc.Label)
    monNum: cc.Label = null;

    @property(cc.Label)
    roleLevel: cc.Label = null;

    @property(cc.Node)
    fullLevel: cc.Node = null;

    @property(cc.Label)
    nextStepLabel: cc.Label = null;

    @property(cc.Label)
    topStep: cc.Label = null;

    @property(cc.Label)
    trynum: cc.Label = null;

    private targetNum: number = 0;
    private curNum: number = 0;
    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Fight_KillNumChange, this.updateNum, this);
        // Notifier.changeListener(enable, ListenID.Game_UpdateGold, this.updateGold, this);
        Notifier.changeListener(enable, ListenID.Fight_GetGold, this.updateGold, this);
        // Notifier.changeListener(enable, ListenID.Fight_ShowFlyGold, this.flyGold, this);
        Notifier.changeListener(enable, NotifyID.Time_Scale, this.timeScae, this);
        // Notifier.changeListener(enable, ListenID.Fight_ShowBuffUI, this.addBuffUI, this);
        Notifier.changeListener(enable, ListenID.Fight_MonsterWarn, this.monsterWarn, this);
        // Notifier.changeListener(enable, ListenID.Fight_ShowImproveUI, this.showImprove, this);
        Notifier.changeListener(enable, ListenID.Fight_End, this.fightEnd, this);
        // Notifier.changeListener(enable, ListenID.Fight_QTE_STATE, this.setGunState, this);
        // Notifier.changeListener(enable, ListenID.Fight_ShowNomalTips, this.showMonTips, this);
        Notifier.changeListener(enable, ListenID.Fight_ShowBossBlood, this.showBossBlood, this);
        // Notifier.changeListener(enable, ListenID.Fight_MonsterInfoList, this.showMonInfo, this);
        Notifier.changeListener(enable, ListenID.Fight_DownTime, this.downTime, this);
        Notifier.changeListener(enable, ListenID.Fight_GunUpdate, this.updateGun, this);
        Notifier.changeListener(enable, ListenID.Fight_GunCD, this.gunCd, this);
        Notifier.changeListener(enable, ListenID.Fight_GetExpAnimation, this.addRoleExp, this);
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.gamePause, this);
        Notifier.changeListener(enable, ListenID.Fight_ChangeGun, this.changeGun, this);
        Notifier.changeListener(enable, ListenID.Fight_TryEquipUpdate, this.updateTryEquip, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this.setInfo(args);
        this.uiadapter();
    }

    public uiadapter() {
        // Util.adapterNodeX(this.goldIcon.parent);
        // Util.adapterNodeX(this.monTips[1]);
        // Util.adapterNodeX(this.monTips[3]);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        for (const k in this.buffList) {
            this.buffList[k].getComponent(BuffUI).stopCd();
            this.buffList[k].destroy();
        }
        this.unscheduleAllCallbacks();
        super.onClose();
    }
    private gold: number = 0;
    private goldIcon: cc.Node = null;
    private flyParent: cc.Node = null;
    private goldpos = cc.Vec2.ZERO;
    public cheatNode: cc.Node = null;
    private richText: cc.RichText = null;
    private bossCome: cc.Node = null;
    private bossStage: cc.Label = null;
    private downTimeText: cc.Label = null;
    // private boxNum: number = 0;
    // private boxNumText: cc.Label = null;
    protected setInfo(args: any) {
        // for (let i = 0; i < 4; i++) {
        //     this.monTips[i].active = false;
        // }
        this.cheatNode = this.node.getChildByName("chest");
        this.richText = this.node.getChildByName("richtext").getComponent(cc.RichText);
        if (this.cheatNode) {
            this.cheatNode.active = false;
            this.richText && (this.richText.node.active = false/*appConfig.env != Environment.release*/);
        }
        this.bossCome = this.node.getChildByName('Bossstage');
        this.bossStage = this.bossCome.getChildByName('stage').getComponent(cc.Label);
        this.downTimeText = this.node.getChildByName('downTimeText').getComponent(cc.Label);
        this.downTimeText.node.active = false;
        this.showMonInfo();
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        // this.monTips[2].y = -0.5 * size.height + 100;
        this.targetNum = FightModel.getInstance.allMonster;
        this.curNum = 0;
        let per = this.curNum / this.targetNum;
        this.progressbar.parent.width = per * this.progressbar.width;
        if (FightModel.getInstance.fightType != 0) {
            this.monsterWarn(2);
        }
        if (GameVoManager.getInstance.stateVo.chapterInfo) {
            this.gold = GameVoManager.getInstance.stateVo.chapterInfo.goldInCome;
        }
        this.bossStage.string = `${FightModel.getInstance.curLevel}`;
        this.goldNumText.string = `${Util.goldFormat(this.gold)}`;
        let guninfo = RoleManager.getInstance.mainRole.getGunInfo();
        this.changeGun(guninfo.getGunTypeId(), guninfo.getGunAllBulletNum());
        this.updateTryEquip(0, 0);
        this.showBossBlood(false, 10, 10);
        if (!this.goldIcon) {
            this.goldIcon = this.goldNumText.node.parent.getChildByName("goldIcon");
        }
        this.goldpos = this.goldIcon.parent.position.sub(cc.v2(55, 0));
        if (!this.flyParent) {
            this.flyParent = this.node.getChildByName("fly");
        }
        if (!FightModel.getInstance.goldnode) {
            FightModel.getInstance.goldnode = cc.instantiate(this.goldIcon);
        }
        this.moreBossCome.active = !1;
        // if (FightModel.getInstance.curLevel <= 5) {
        //     this.showMonTips(FightModel.getInstance.curBronDirs);
        // }
        this.anim = null;
        this.updateStepInfo();
        this.updateNum(0, 0);
        this.updateTopStep();
        this.updateRoleLevel();
        let chapterinfo = GameVoManager.getInstance.stateVo.chapterInfo;
        if (chapterinfo && chapterinfo.topLevel % 5 == 0) {
            let ldata = Util.levelToChapterId(chapterinfo.topLevel);
            let data = Cfg.Chapter.get(ldata[0]);
            this.startNextStep(chapterinfo.topLevel - data.startLevel);
        }
    }

    public updateStepInfo() {
        this.stepInfo.string = `${FightModel.getInstance.curStep}/${FightModel.getInstance.allStep}`;
    }

    public updateTopStep() {
        let chapterinfo = Notifier.call(CallID.Menu_GetChapterInfo, FightModel.getInstance.chapterId);
        this.topStep.string = `历史最高:${chapterinfo.passStage}波`;
    }

    public startaddexp: number = 0;
    // private addexp: number = 0;
    private perexp: number = 0;
    public addRoleExp(exp) {
        this.startaddexp = 1;
        // this.addexp = exp;
        if (exp <= 50) {
            this.startaddexp = exp;
            this.perexp = 1;
        } else {
            this.perexp = exp / 50;
            this.startaddexp = 50;
        }
    }

    public updateRoleLevelAnim(exp) {
        FightModel.getInstance.fightLevelExp += exp;
        if (((FightModel.getInstance.fightLevelExp >= FightModel.getInstance.maxLevelExp) || Math.abs((FightModel.getInstance.fightLevelExp - FightModel.getInstance.maxLevelExp)) < 0.01) && FightModel.getInstance.curFightLevel < FightModel.getInstance.maxFightLevel) {
            //升级 打开技能面板
            FightModel.getInstance.curFightLevel += 1;
            FightModel.getInstance.updateMaxLevelExp();
            if (FightModel.getInstance.curFightLevel <= FightModel.getInstance.maxFightLevel && FightModel.getInstance.isFighting)
                Notifier.send(ListenID.Skill_OpenSelectView);
        }
        this.updateRoleLevel();
    }

    public updateRoleLevel() {
        if (FightModel.getInstance.isFullLevel()) {
            this.roleLevel.node.active = false;
            this.fullLevel.active = true;
            this.progressbar.parent.width = this.progressbar.width;
        } else {
            this.roleLevel.node.active = true;
            this.fullLevel.active = false;
            this.roleLevel.string = `Lv.${FightModel.getInstance.curFightLevel}`;
            let expinfo = FightModel.getInstance.getFightExp();
            this.progressbar.parent.width = this.progressbar.width * (expinfo[0] - expinfo[2]) / ((expinfo[1] - expinfo[2]) || 1);
        }
    }

    public onOpenPauseView() {
        Manager.audio.playAudio(501);
        if (this.noscaling && !RoleManager.getInstance.mainRole.isDead) {
            UIManager.Open(Common_UIPath.PauseNewUI, MVC.eTransition.Default, MVC.eUILayer.Popup, null, false);
            Notifier.send(ListenID.Log_Event, { event_name: "stop" });
        }
    }

    public onOpenCheatView() {
        UIManager.Open(Common_UIPath.CheatUI);
    }

    public updateNum(cur, all) {
        // this.curNum = cur;
        // let per = (this.curNum / all);
        // this.progressbar.parent.width = per * this.progressbar.width;
        // let perent = Math.ceil((1 - per) * 100);
        // if (perent <= 0) perent = 0;
        this.monNum.string = `${FightModel.getInstance.curStepRemnantMon}`;
    }

    public updateGold(gold) {
        this.gold += gold;
        this.goldNumText.string = `${Util.goldFormat(this.gold)}`;
    }

    public changeGun(typeid: number, bullet: number) {
        this.updateGun(bullet, bullet);
        this.qtepoint.active = false;
        let res = Cfg.Weapon.get(typeid);
        let realid = res.resPath.substring(6);
        Manager.spAtlas.getWeaponIcon(realid).then((res) => {
            this.gunIcon.spriteFrame = res;
            let ratio = this.gunIcon.node.height / this.gunIcon.node.width;
            this.gunIcon.node.width = cc.misc.clampf(this.gunIcon.node.width, 0, 82);
            this.gunIcon.node.height = this.gunIcon.node.width * ratio;
        })
    }

    public updateTryEquip(cur, all) {
        if (cur == 0) {
            this.trynum.node.parent.active = false;
        } else {
            this.trynum.node.parent.active = true;
            this.trynum.string = `${cur}/${all}`;
        }
    }

    public updateGun(cur, all) {
        this.gunNum.string = `${all}/${cur}`;
        this.qteprogress.progress = cur / all;
        this.qtepoint.position = this.normalVec.rotate(-2 * this.qteprogress.progress * Math.PI);
    }

    public gunCd(time) {
        this.qteprogress.progress = 0;
        this.qteTime = time;
        this.curcdtime = 0;
        this.qtepoint.active = true;
        this.startQteCoolDown = true;
    }

    public flyGold(startPos: cc.Vec2, type: number = 0) {
        let start = startPos.sub(RoleManager.getInstance.mainRole.node.position);
        start.mulSelf(0.7);
        if (type && type == 1) {
            Util.showGoldEffect(this.flyParent, 10, start, this.goldpos, 0.1);
        } else if (type && type == 2) {
            let haha = function (node: cc.Node, index: number) {
                if (node) {
                    node.setParent(this.flyParent);
                    node.position = start.add(cc.v2(index * 60, 0));
                    node.scale = 0.8;
                    let dis = this.goldpos.sub(start).mag();
                    node.runAction(cc.sequence(cc.bezierTo(dis / 800, [start, start.add(cc.v2(-100 + (index * 50), -300)), this.goldpos]), cc.callFunc(() => {
                        FightModel.getInstance.putGoldIconNode(node);
                    })));
                }
            }.bind(this)
            for (let i = 0; i < 2; i++) {
                let node = FightModel.getInstance.popGoldIconNode();
                haha(node, i);
            }
        } else if (type == 0) {
            let node = FightModel.getInstance.popGoldIconNode();
            if (node) {
                node.setParent(this.flyParent);
                node.position = start;
                node.scale = 0.8;
                let dis = this.goldpos.sub(start).mag();
                node.runAction(cc.sequence(cc.bezierTo(dis / 800, [start, start.add(cc.v2(-100, -300)), this.goldpos]), cc.callFunc(() => {
                    FightModel.getInstance.putGoldIconNode(node);
                })));
            }
        } else if (type == 3) {

        }
    }

    private noscaling: boolean = true;
    public timeScae(scale) {
        this.noscaling = scale == 1;
    }
    private buffList: any = {};
    private curBuffId: number = 0;
    public addBuffUI(type: number, buffid: number, bufftime: number) {
        // if (!this.buffList[buffid]) {
        //     let node = cc.instantiate(this.buffNode);
        //     node.setParent(this.buffNode.parent);
        //     this.buffList[buffid] = node;
        // }
        // this.buffList[buffid].active = true;
        // this.buffList[buffid].getComponent(BuffUI).startCd(type, buffid, bufftime);
        // if (type == 2 && this.curBuffId != buffid) {
        //     if (this.buffList[this.curBuffId]) {
        //         this.buffList[this.curBuffId].getComponent(BuffUI).stopCd();
        //     }
        //     this.curBuffId = buffid;
        // }
    }
    private isPause: number = 0;
    public gamePause(boo: boolean) {
        if (boo) {
            this.isPause++;
        } else {
            this.isPause--;
        }
        if (this.isPause <= 0) {
            this.isPause = 0;
            if (this.anim) {
                let anim = this.anim as any;
                let state = this.anim.getAnimationState(anim._defaultClip.name);
                if (state.isPaused)
                    this.anim.resume()
            };
        } else {
            if (this.anim) {
                let anim = this.anim as any;
                let state = this.anim.getAnimationState(anim._defaultClip.name);
                if (state.isPlaying)
                    this.anim.pause()
            };
        }
    }

    private anim: cc.Animation = null;
    public monsterWarn(type: number, curStep?: number) {
        if (type == 0) {
            this.nextStepLabel.string = `${curStep}`;
            let time = 0;
            if ((curStep - 1) % 5 == 0) {
                time = 800;
            }
            setTimeout(() => {
                let state = this.moreMonCome.getComponent(cc.Animation);
                this.moreMonCome.getComponent(cc.Animation).play();
                this.anim = state;
                let a = () => {
                    this.anim = null;
                    this.startNextStep(curStep);
                    state.off("finished", a);
                }
                state.on("finished", a);
            }, time)


        } else if (type == 1) {
            this.moreBossCome.active = !0;
            this.moreBossCome.getComponent(cc.Animation).play();
            Manager.audio.playAudio(515, AudioType.Laser);
            let logStr = "level_" + FightModel.getInstance.curLevel + "_enemy_assault";
            Notifier.send(ListenID.Log_Event, { event_name: logStr });
        } else {
            this.bossCome.active = !0;
            this.bossCome.getComponent(cc.Animation).play();
            Manager.audio.playAudio(515, AudioType.Laser);
        }
    }

    public startNextStep(curStep) {
        this.updateStepInfo();
        this.updateNum(0, 0);
        if (curStep % 5 == 0) {//boss
            this.moreBossCome.active = !0;
            let state = this.moreBossCome.getComponent(cc.Animation);
            this.moreBossCome.getComponent(cc.Animation).play();
            this.anim = state;
            let a = () => {
                this.anim = null;
                Notifier.send(ListenID.Fight_StartNextAfterAnim, curStep);
                Notifier.send(ListenID.FightToBoss, true);
                state.off("finished", a);
            }
            state.on("finished", a);
            Notifier.send(ListenID.Fight_ShowBossWarn);
            Manager.audio.playAudio(515, AudioType.Laser);
        } else {
            Notifier.send(ListenID.Fight_StartNextAfterAnim, curStep);
        }
    }

    public onClickImprove() {

    }

    public fightEnd(boo) {
        if (boo) {
            let per = 1;
            this.progressbar.parent.width = per * this.progressbar.width;
        }
        for (const k in this.buffList) {
            this.buffList[k].getComponent(BuffUI).stopCd();
        }
    }

    private startQteCoolDown: boolean = false;
    private qteTime: number = 0;
    private curcdtime: number = 0;
    private normalVec: cc.Vec2 = cc.v2(0, 37);
    public setGunState(state: number, time?: number) {

    }

    showMonTips(dir: number[]) {
        // let a = 0, b = 0;
        // for (let i = 0; i < dir.length; i++) {
        //     this.monTips[dir[i] - 1].active = true;
        //     dir[i] % 2 == 0 ? (a = 1, b = 0) : (a = 0, b = 1);
        //     this.monTips[dir[i] - 1].runAction(cc.repeat(cc.sequence(cc.moveBy(0.5, a * 25, b * 25), cc.moveBy(0.5, -25 * a, -25 * b)), 5))
        // }
        // this.scheduleOnce(() => {
        //     for (let i = 0; i < 4; i++) {
        //         this.monTips[i].active = false;
        //     }
        // }, 5.)
    }

    private firstShowBossBlood: boolean = false;
    public showBossBlood(vis: boolean, curhp: number, allhp: number) {
        this.bossBloodNode.active = vis;
        this.fullLevel.parent.active = !vis;
        if (vis) {
            if (this.firstShowBossBlood) {
                this.firstShowBossBlood = false;
                this.bossBloodNode.scale = 0;
                this.bossBloodNode.runAction(cc.scaleTo(0.5, 0.8))
            }
        } else {
            this.firstShowBossBlood = true;
        }

        let ratio = curhp / allhp;
        if (ratio > 0.6) {
            this.bloodNumLabel && (this.bloodNumLabel.string = `x3`);
        } else if (ratio > 0.3) {
            this.bloodNumLabel && (this.bloodNumLabel.string = `x2`);
        } else if (ratio > 0) {
            this.bloodNumLabel && (this.bloodNumLabel.string = `x1`);
        } else {
            this.bloodNumLabel && (this.bloodNumLabel.string = `x0`);
        }
        this.bloodMasks[0] && (this.bloodMasks[0].width = cc.misc.clampf((ratio - 0.6) / 0.4 * 483, 0, 483));
        this.bloodMasks[1] && (this.bloodMasks[1].width = cc.misc.clampf((ratio - 0.3) / 0.3 * 483, 0, 483));
        this.bloodMasks[2] && (this.bloodMasks[2].width = cc.misc.clampf(ratio / 0.3 * 483, 0, 483));
    }
    public showMonInfo() {
        let data = FightModel.getInstance.monstList;
        if (data && data.length > 0) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                let id = data[i];
                let moninfo = Cfg.Monster.get(id);
                let hp = moninfo.hp * FightModel.getInstance.monsterCapacity;
                str += `${moninfo.id}-${moninfo.monName}:${hp}<br/>`;
            }
            this.richText.string = str;
        } else {
            this.richText.string = "";
        }
    }

    public getRoleInfo() {
        let a = RoleManager.getInstance.mainRole.getGunInfo().getHurtRange();
        let str = `人物攻击：${RoleManager.getInstance.mainRole.property.getAttack()}<br/>hurtRatio：${RoleManager.getInstance.mainRole.getGunHurtRatio()}<br/>血量：${RoleManager.getInstance.mainRole.curHp}-${RoleManager.getInstance.mainRole.allHp}<br/>枪伤害范围${a[0]}-${a[1]}<br/>射速间隔：${RoleManager.getInstance.mainRole.getGunDelta()}<br/>暴击率${RoleManager.getInstance.mainRole.getViolentRatio()}<br/>闪避率${RoleManager.getInstance.mainRole.getMissRatio()}<br/>必杀率${RoleManager.getInstance.mainRole.getKillRatio()}<br/>移速${RoleManager.getInstance.mainRole.MaxSpeed}`;
        this.richText.string = str;
    }
    public downroletime = 2;
    update(dt) {
        // this.downroletime -= dt;
        // if (this.downroletime <= 0) {
        //     this.downroletime = 2;
        //     this.getRoleInfo();
        // }
        if (this.startQteCoolDown && FightModel.getInstance.isPause <= 0 && FightModel.getInstance.isFighting) {
            this.curcdtime += dt * Time.scale;
            this.qteprogress.progress = this.curcdtime / this.qteTime;
            this.qtepoint.position = this.normalVec.rotate(-2 * this.qteprogress.progress * Math.PI);
            if (this.curcdtime >= this.qteTime) {
                this.startQteCoolDown = false;
                this.qtepoint.active = false;
                // this.setGunState(2);
            }
        }
        if (this.startdowntime && FightModel.getInstance.isPause <= 0 && FightModel.getInstance.isFighting) {
            this.downtime -= dt;
            this.curdowntime += dt;
            if (this.curdowntime >= 1) {
                this.downTimeText.string = `${Number(this.downTimeText.string) - 1}`;
                this.curdowntime = 0;
            }
            if (this.downtime <= 0) {
                this.startdowntime = false;
                this.downTimeText.node.active = false;
                Notifier.send(ListenID.Fight_DownTimeFinish);
            }
        }
        if (this.startaddexp > 0 && FightModel.getInstance.isPause <= 0 && FightModel.getInstance.isFighting) {
            this.startaddexp -= 1;
            this.updateRoleLevelAnim(this.perexp);
        }
    }
    public downtime: number = 0;
    public startdowntime: boolean = false;
    public curdowntime: number = 0;
    public downTime(time) {
        this.bossStage.string = `${FightModel.getInstance.curLevel}`;
        this.downtime = time;
        this.downTimeText.string = `${time}`;
        this.downTimeText.node.active = true;
        this.curdowntime = 0;
        this.startdowntime = true;
        this.monsterWarn(2);
        // Manager.audio.playAudio(510, AudioType.Tool);
    }
}
