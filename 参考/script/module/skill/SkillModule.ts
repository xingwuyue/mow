import { Agent } from "../../component/Agent";
import { MainRole } from "../../component/MainRole";
import { Cfg } from "../../config/Cfg";
import { SkillCfg } from "../../config/SkillCfg";
import { DropCfg } from "../../config/DropCfg";
import { BulletManager } from "../../manager/BulletManager";
import { Const } from "../../config/Const";
import { Bullet, BulletVo } from "../../component/Bullet";
import FightModel from "../fight/FightModel";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import { ToolManager } from "../../manager/ToolManager";
import { BombVo, Bomb } from "../../component/Bomb";
import RadiusDamage from "../../component/RadiusDamage";
import SkillCircle from "../../component/SkillCircle";


export class BaseSkill<agent extends Agent> {
    protected skillId: number = 0;   //技能id
    protected _param: number[] = []; //技能效果
    protected skillCfg: SkillCfg;
    protected composeNum: number = 0;    //当前可叠加次数
    protected _owner: agent;
    public isdouble: boolean = false;
    public index: number = -1;
    public load() { }//装配技能

    public unload() { }//卸载技能

    public excute() { }//释放类技能触发执行

    public getOwner(): agent {
        return this._owner;
    }

    public getSkillId(): number {
        return this.skillId;
    }

    /**
     * 
     * @param skillId 技能id
     * @param owner 拥有者
     * @param isdouble 是否双倍效果
     */
    public constructor(skillId: number, owner: agent, isdouble: boolean = false) {
        this.skillId = skillId;
        this._owner = owner;
        this.skillCfg = Cfg.Skill.get(this.skillId);
        this._param = this.skillCfg.param;
        this.isdouble = isdouble;
    }
}

/**
 * 武器速度变化
 */
export class SkillGunSpeed extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.addGunSpeedRadio(ratio);
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.addGunSpeedRadio(-ratio);
    }
}

/**
 * 武器伤害变化
 */
export class SkillGunHurt extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.getGunInfo().setHurtRatio(ratio);
    }
    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.getGunInfo().setHurtRatio(-ratio);
    }
}

/**
 * 弹道+1
 */

export class SkillTrajectory extends BaseSkill<MainRole>{
    public load() {
        let weaponinfo = this._owner.getGunInfo().getWeaponInfo();
        let a = this._param[0];
        if (weaponinfo && weaponinfo.weaponType == 1) {
            a = this._param[1];
        }
        this._owner.getGunInfo().setExtraStcarRatio(a);
        this._owner.getGunInfo().setExtraSingNum(1);
    }

    public unload() {
        let weaponinfo = this._owner.getGunInfo().getWeaponInfo();
        let a = this._param[0];
        if (weaponinfo && weaponinfo.weaponType == 1) {
            a = this._param[1];
        }
        this._owner.getGunInfo().setExtraStcarRatio(-a);
        this._owner.getGunInfo().setExtraSingNum(-1);
    }
}


/**
 * 毒药子弹
 */
export class SkillPoisonBullet extends BaseSkill<MainRole>{
    public deltaTime: number = 0;
    public load() {
        this.deltaTime = this._param[1];
        let data = this._owner.getGunInfo().skillList[this.skillId];
        if (!data) {
            this._owner.getGunInfo().skillList[this.skillId] = { time: this.deltaTime, value: this._param[0] }
        } else {
            this._owner.getGunInfo().skillList[this.skillId].value += this._param[0];
        }
    }

    public unload() {
        delete this._owner.getGunInfo().skillList[this.skillId];
    }
}

/**
 * 火焰子弹
 */
export class SkillFireBullet extends BaseSkill<MainRole>{
    public deltaTime: number = 0;
    public load() {
        this.deltaTime = this._param[1];
        let data = this._owner.getGunInfo().skillList[this.skillId];
        if (!data) {
            this._owner.getGunInfo().skillList[this.skillId] = { time: this.deltaTime, value: this._param[0] }
        } else {
            this._owner.getGunInfo().skillList[this.skillId].value += this._param[0];
        }
    }

    public unload() {
        delete this._owner.getGunInfo().skillList[this.skillId];
    }
}

/**
 * 冰冻子弹
 */
export class SkillIceBullet extends BaseSkill<MainRole>{
    public deltaTime: number = 0;
    public load() {
        this.deltaTime = this._param[1];
        let data = this._owner.getGunInfo().skillList[this.skillId];
        if (!data) {
            this._owner.getGunInfo().skillList[this.skillId] = { time: this.deltaTime, value: this._param[0] }
        } else {
            this._owner.getGunInfo().skillList[this.skillId].value += this._param[0];
        }
    }

    public unload() {
        delete this._owner.getGunInfo().skillList[this.skillId];
    }
}

/**
 * 镜像射击
 */
export class SkillMapping extends BaseSkill<MainRole>{
    public load() {
        this._owner.getGunInfo().setMapping(true);
    }
    public unload() {
        this._owner.getGunInfo().setMapping(false);
    }
}

/**
 * 加速换弹
 */
export class SkillReloadGun extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.addGunReloadSpeed(ratio);
    }
    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.addGunReloadSpeed(-ratio);
    }
}

/**
 * 换弹保护
 */
export class SkillReloadInvinci extends BaseSkill<MainRole>{
    public load() {
        this._owner.setProtectedInReload(true);
    }

    public unload() {
        this._owner.setProtectedInReload(false);
    }
}

/**
 * 扩容弹夹
 */
export class SkillCharger extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.getGunInfo().setExtraBulletRatio(ratio);
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.getGunInfo().setExtraBulletRatio(-ratio);
    }
}

/**
 * 倍镜
 */
export class SkillMirrors extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.setSkillViolentRatio(ratio);
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.setSkillViolentRatio(-ratio);
    }
}

/**
 * 增加移速
 */
export class SkillMoveSpeed extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.moveSpeedRatio += ratio;
        this._owner.MaxSpeed = this._owner._moveSpeed * this._owner.moveSpeedRatio;
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.moveSpeedRatio -= ratio;
        this._owner.MaxSpeed = this._owner._moveSpeed * this._owner.moveSpeedRatio;
    }
}

/**
 * 血量上限
 */
export class SkillHpMax extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.addhpMaxRatio(ratio);
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.addhpMaxRatio(-ratio);
    }
}

/**
 * 回复血量
 */
export class SkillRecoverHp extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.setBloodBuff(Math.ceil(ratio * 100));
    }

    public unload() {

    }
}

/**
 * 技能无敌
 */
export class SkillInvincible extends BaseSkill<MainRole>{
    public load() {
        this._owner.setSkillInvicibleBuff(this._param[1], this._param[0]);
    }

    public unload() {
        this._owner.removeSkillInvicibleBuff();
    }
}

/**
 * 快速反应
 */
export class SkillFast extends BaseSkill<MainRole>{
    private skillDelta: number = 0;
    private speedRatio: number = 0;
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this.speedRatio = ratio;
        this._owner.beHitFast = this.index;
        this.skillDelta = this._param[1];
    }

    public excute() {
        this._owner.setSpeedBuff(this._owner.MaxSpeed * this.speedRatio, this.skillDelta);
    }

    public unload() {
        this._owner.beHitFast = -1;
    }
}

/**
 * 嗜血
 */
export class SkillBloodthirsty extends BaseSkill<MainRole>{
    public bloodRatio: number = 0;
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.bloodThirstyIndex = this.index;
        this.bloodRatio = ratio;
        this.excute();
    }

    public excute() {
        this._owner.extraSkillHurtRatio = 1 + (1 - this._owner.curHp / this._owner.allHp) * this.bloodRatio;
    }

    public unload() {
        this._owner.bloodThirstyIndex = -1;
        this._owner.extraSkillHurtRatio = 1;
    }
}

/**
 * 辐射
 */
export class SkillRadiusDamage extends BaseSkill<MainRole>{
    public load() {
        let da = ToolManager.getInstance.popToolEffectNodeByType(6003);
        if (da) {
            da.position = cc.Vec2.ZERO;
            if (this._owner.node) {
                let parent = this._owner.node.getChildByName("attackRange");
                if (parent.childrenCount <= 0) {
                    da.setParent(parent);
                }
                da.getComponent(RadiusDamage).init(this._param[0], this._param[1], this._param[2]);
            }

        }
    }

    public unload() {
        if (this._owner.node) {
            let parent = this._owner.node.getChildByName("attackRange");
            parent.removeAllChildren();
        }
    }
}

/**
 * 环绕冰球
 */
export class SkillCircleIce extends BaseSkill<MainRole>{
    public actionnode: cc.Node = null;
    public load() {
        this.actionnode = ToolManager.getInstance.popToolEffectNodeByType(6004);
        if (this.actionnode) {
            this.actionnode.position = cc.Vec2.ZERO;
            if (this._owner.skillBullet) {
                let parent = this._owner.skillBullet;
                this.actionnode.getComponent(SkillCircle).toolType = 6004;
                this.actionnode.getComponent(SkillCircle).init(this._param, this.skillId);
                this._owner.percircleSpeedRatio = this._param[1];
                this.actionnode.setParent(parent);
            }
        }
    }

    public unload() {
        ToolManager.getInstance.pushToolEffectNodeByType(6004, this.actionnode);
    }
}

/**
 * 环绕火球
 */
export class SkillCircleFire extends BaseSkill<MainRole>{
    public actionnode: cc.Node = null;
    public load() {
        this.actionnode = ToolManager.getInstance.popToolEffectNodeByType(6005);
        if (this.actionnode) {
            this.actionnode.position = cc.Vec2.ZERO;
            if (this._owner.skillBullet) {
                let parent = this._owner.skillBullet;
                this.actionnode.setParent(parent);
                this.actionnode.getComponent(SkillCircle).toolType = 6005;
                this._owner.percircleSpeedRatio = this._param[1];
                this.actionnode.getComponent(SkillCircle).init(this._param, this.skillId);
            }

        }
    }

    public unload() {
        ToolManager.getInstance.pushToolEffectNodeByType(6005, this.actionnode);
    }
}

/**
 * 环绕毒球
 */
export class SkillCirclePoision extends BaseSkill<MainRole>{
    public actionnode: cc.Node = null;
    public load() {
        this.actionnode = ToolManager.getInstance.popToolEffectNodeByType(6006);
        if (this.actionnode) {
            this.actionnode.position = cc.Vec2.ZERO;
            if (this._owner.skillBullet) {
                let parent = this._owner.skillBullet;
                this.actionnode.setParent(parent);
                this.actionnode.getComponent(SkillCircle).toolType = 6006;
                this._owner.percircleSpeedRatio = this._param[1];
                this.actionnode.getComponent(SkillCircle).init(this._param, this.skillId);
            }

        }
    }

    public unload() {
        ToolManager.getInstance.pushToolEffectNodeByType(6006, this.actionnode);
    }
}

/**
 * 吸血
 */
export class SkillSuckBlood extends BaseSkill<MainRole>{
    public load() {
        this._owner.skillSuck = this.index;
        let ratio = this.isdouble ? this._param[1] * 2 : this._param[1];
        this._owner.setSkillSuckBlood(ratio * 100, this._param[0] * 100);
    }

    public excute() {

    }

    public unload() {
        let ratio = this.isdouble ? this._param[1] * 2 : this._param[1];
        this._owner.skillSuck = -1;
        this._owner.setSkillSuckBlood(-ratio * 100, -this._param[0] * 100);

    }
}

/**
 * 增强药水
 */
export class SkillStreng extends BaseSkill<MainRole>{
    public load() {
        let ratio = this._param[0];
        this._owner.addhpMaxRatio(-ratio);
        let hurtratio = this.isdouble ? this._param[1] * 2 : this._param[1];
        this._owner.getGunInfo().setHurtRatio(hurtratio);
        let missratio = this.isdouble ? this._param[2] * 2 : this._param[2];
        this._owner.setSkillMissRatio(missratio);
    }

    public unload() {
        // let ratio = this._param[0];
        // this._owner.addhpMaxRatio(-ratio);
        // let hurtratio = this.isdouble ? this._param[1] * 2 : this._param[1];
        // this._owner.getGunInfo().setHurtRatio(hurtratio);
        // let missratio = this.isdouble ? this._param[2] * 2 : this._param[2];
        // this._owner.setSkillMissRatio(missratio);
    }
}

/**
 * 增强闪避
 */
export class SkillMiss extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.setSkillMissRatio(ratio);
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.setSkillMissRatio(-ratio);
    }
}

/**
 * 雷击
 */
export class SkillThunder extends BaseSkill<MainRole>{
    public load() {
        let time = this.isdouble ? this._param[1] * 0.5 : this._param[1];
        this._owner.setThunderBuff(this._param[0], time, this._param[2]);
    }

    public unload() {
        this._owner.removeSkillThunderBuff();
    }
}

/**
 * 赏金猎人
 */
export class SkillGold extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 0.5 : this._param[0];
        this._owner.setSkillDoubleRewardRatio(ratio * 100);
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 0.5 : this._param[0];
        this._owner.setSkillDoubleRewardRatio(-ratio * 100);
    }
}

/**
 * 弹开敌人
 */
export class SkillRebound extends BaseSkill<MainRole>{
    public attackRange: number = 0;
    public reboundDis: number = 0;
    public load() {
        this.attackRange = this._param[1];
        this.reboundDis = this._param[0];
        this._owner.skillReboundIndex = this.index;
    }

    public excute() {
        let speed = ToolManager.getInstance.popToolEffectNodeByType(5001);
        if (speed) {
            speed.position = this._owner.Pos;
            let bombvo: BombVo = { showDamage: 0, hurt: 0, radius: this.attackRange, toolType: 5001 }
            let bom: Bomb = ToolManager.getInstance.addToolEffect(speed, bombvo);
            speed.setParent(FightModel.getInstance.bombParent);
            bom.startAttack();
            Manager.audio.playAudio(5001, AudioType.Tool);
        }
        this._owner.kickMonsterAss(this.reboundDis, this.attackRange);
    }

    public unload() {
        this._owner.skillReboundIndex = -1;
    }
}

/**
 * 反伤
 */
export class SkillThorns extends BaseSkill<MainRole>{
    public toolId: number = 0;
    public toolCfg: DropCfg = null;
    public hurt: number = 0;
    public hurtRatio: number = 0;
    public load() {
        this._owner.skillThornsIndex = this.index;
        this.toolId = this._param[1];
        this.toolCfg = Cfg.Drop.get(this.toolId);
        this.hurt = this._owner.property.getAttack();
        this.hurtRatio = this._param[0];
    }

    public excute() {
        if (!this.toolCfg) return;
        let normalvect = cc.v2(0, 1);
        let twopai = 2 * Math.PI;
        for (let i = 0; i < this.toolCfg.bulletNum; i++) {
            let endpos = normalvect.rotate(twopai / this.toolCfg.bulletNum * i);
            endpos = endpos.mul(1000);
            let bullet = BulletManager.getInstance.popBulletNodeByType(this.toolCfg.bulletId);
            if (bullet) {
                bullet.position = this._owner.Pos;
                let bulvo: BulletVo = { showDamage: this.hurt, hurt: this.hurt, radius: 0, bulletType: this.toolCfg.bulletId, belongto: Const.BulletBelong.MY_BULLET, canCross: true, hitEffecId: 0 };
                bulvo.hurtRatio = this._owner.getGunHurtRatio();
                bulvo.extraHurtRatio = this._owner.getGunInfo().getBulletHurtRandom() * this.hurtRatio;
                let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                bullet.setParent(FightModel.getInstance.bulletParent);
                bul.moveSpeed(1000);
                bul.setTargetPos(bullet.position.add(endpos));
            }
        }
        Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
    }

    public unload() {
        this._owner.skillThornsIndex = -1;
    }
}

/**
 * 铀子弹
 */
export class SkillKill extends BaseSkill<MainRole>{
    public load() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.setKillRatio(ratio * 100);
    }

    public unload() {
        let ratio = this.isdouble ? this._param[0] * 2 : this._param[0];
        this._owner.setKillRatio(-ratio * 100);
    }
}

