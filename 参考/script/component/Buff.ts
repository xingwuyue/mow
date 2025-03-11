import { MovingEntity } from "./MovingEntity";
import { Agent } from "./Agent";
import { AttackVo } from "../common/Common_Define";
export namespace Buff {
    export enum BuffType {
        NONE = 0,
        INVICIBLE = 0x00002,//无敌
        SPEED = 0x00004, //速度增加减少
        BLOOD = 0x00008,  //血量
        ICE = 0x00010,    //冰冻减速
        SKILL_SPEED = 0x00020,   //双倍伤害
        SKILL_BLOOD = 0x00040, //双倍收益
        SKILL_INVICIBLE = 0x00080,//技能无敌
        SKILL_THUNDER = 0x00100,//雷击
        SKILL_POISION = 0x00200,//毒雾持续伤害
        SKILL_FIRE = 0x00400,//火持续伤害
        SKILL_ICE = 0x00800,//冰持续减速
        SKILL_DAMAGE = 0x01000,//辐射buff
    }

    export abstract class BuffItem<T extends MovingEntity> {
        protected _buffTime: number = 0;
        protected _curBuffTime: number = 0;
        protected _buffType: BuffType;
        protected _buffValue: number = 0;
        protected _param: any;
        public setBuffTime(time: number) {
            this._buffTime = time;
        }
        public getBuffTime() { return this._buffTime; }

        public getCurBuffTime() {
            return this._curBuffTime;
        }

        public setBuffType(buff: BuffType) {
            this._buffType = buff;
        }

        public setParam(param) { this._param = param; }

        public Enter(entity: T, reenter: boolean = false) { entity.OnBuff(this._buffType) };

        /**
         * 需实现创建createBuffByType
         * @param entity 
         * @param dt 
         */
        public abstract Execute(entity: T, dt): boolean;

        public Exit(entity: T) { entity.OffBuff(this._buffType) };

    }

    export interface BuffMap<T extends MovingEntity> {
        [key: number]: BuffItem<T>;
    }

    export class BuffManager<T extends MovingEntity> {
        private _bufflist: BuffMap<T> = {};
        private _entity: T;
        public constructor(entity: T) {
            this._entity = entity;
        }
        public addBuff(buffType: BuffType, param: any) {
            if (!this._bufflist[buffType]) {
                let BuffItem = this.createBuffByType(buffType);
                this._bufflist[buffType] = BuffItem;
                this._bufflist[buffType].setParam(param);
                this._bufflist[buffType].Enter(this._entity)
            } else {
                this._bufflist[buffType].setParam(param);
                this._bufflist[buffType].Exit(this._entity);
                this._bufflist[buffType].Enter(this._entity, true);
            }
        }

        public update(dt) {
            for (let k in this._bufflist) {
                if (this._bufflist[k]) {
                    let boo = this._bufflist[k].Execute(this._entity, dt);
                    if (!boo) {//退出
                        this._entity.OffBuff(Number(k));
                        this._bufflist[k].Exit(this._entity);
                        delete this._bufflist[k];
                    }
                }
            }
        }

        public clearBuff(type = BuffType.NONE) {
            if (type == BuffType.NONE) {
                this._bufflist = {};
                this._entity.resetBuffType();
            }
            else {
                if (this._bufflist[type]) {
                    this._entity.OffBuff(type);
                    this._bufflist[type] = null;
                }
            }
        }

        public createBuffByType(type: BuffType): BuffItem<T> {
            let buffItem;
            switch (type) {
                case BuffType.NONE:
                    buffItem = new NoneBuff();
                    break;
                case BuffType.INVICIBLE:
                    buffItem = new InvicibleBuff();
                    break;
                case BuffType.BLOOD:
                    buffItem = new BloodBuff();
                    break;
                case BuffType.ICE:
                    buffItem = new IceBuff();
                    break;
                case BuffType.SPEED:
                    buffItem = new MoveSpeedBuff();
                    break;
                case BuffType.SKILL_SPEED:
                    buffItem = new SkillSpeedBuff();
                    break;
                case BuffType.SKILL_BLOOD:
                    buffItem = new SkillBloodBuff();
                    break;
                case BuffType.SKILL_INVICIBLE:
                    buffItem = new SkillInvincibleBuff();
                    break;
                case BuffType.SKILL_THUNDER:
                    buffItem = new SKillThunderBuff();
                    break;
                case BuffType.SKILL_POISION:
                    buffItem = new SkillPoisonBuff();
                    break;
                case BuffType.SKILL_FIRE:
                    buffItem = new SkillFireBuff();
                    break;
                case BuffType.SKILL_ICE:
                    buffItem = new SkillIceBuff();
                    break;
                case BuffType.SKILL_DAMAGE:
                    buffItem = new SkillRadiusDamageBuff();
                    break;
                default:
                    buffItem = new NoneBuff();
                    break;
            }
            if (buffItem) buffItem.setBuffType(type);
            return buffItem;
        }
    }
    export class NoneBuff extends BuffItem<Agent>{
        public Enter(entity: Agent) {
            // throw new Error("Method not implemented.");
        } public Execute(entity: Agent, dt: any): boolean {
            // throw new Error("Method not implemented.");
            return true;
        }
        public Exit(entity: Agent) {
            // throw new Error("Method not implemented.");
        }


    }
    export class InvicibleBuff extends BuffItem<Agent>{
        public invincibleDelta: number = 0;//无敌持续时间
        public loopDeltaTime: number = 0;    //触发效果时间间隔
        public isloop: number = 0;//无敌次数 -1为循环无敌
        public incd: number = 0;
        public Enter(entity: Agent, reenter: boolean = false) {
            super.Enter(entity);
            let inviciinfo = this._param;
            this.isloop = inviciinfo.isloop;
            this.invincibleDelta = reenter ? GameMaxOf(this.invincibleDelta, inviciinfo.invincibleDelta) : inviciinfo.invincibleDelta;
            this.loopDeltaTime = reenter ? GameMaxOf(this.loopDeltaTime, inviciinfo.loopDeltaTime) : inviciinfo.loopDeltaTime;
            this._curBuffTime = 0;
            this.incd = 0;
            entity.invincibleBuffEnter();
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this.isloop) {
                if (this.incd <= 0 && this._curBuffTime >= this.invincibleDelta) {
                    this.incd = this.loopDeltaTime;
                    entity.OffBuff(this._buffType);
                    entity.setInvicibleVisible(false);
                }
                if (this.incd > 0) {
                    this.incd -= dt;
                    if (this.incd <= 0) {
                        this._curBuffTime = 0;
                        entity.OnBuff(this._buffType);
                        entity.setInvicibleVisible(true);
                    }
                }
                return true;
            } else {
                if (this._curBuffTime >= this.invincibleDelta) {
                    entity.OffBuff(this._buffType);
                    entity.setInvicibleVisible(false);
                    return false;
                }
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
            entity.setInvicibleVisible(false);
        }
    }

    export class SkillInvincibleBuff extends BuffItem<Agent>{
        public invincibleDelta: number = 0;//无敌持续时间
        public loopDeltaTime: number = 0;    //触发效果时间间隔
        public isloop: number = 0;//无敌次数 -1为循环无敌
        public incd: number = 0;
        public Enter(entity: Agent) {
            super.Enter(entity);
            let inviciinfo = this._param;
            this.isloop = inviciinfo.isloop;
            this.invincibleDelta = inviciinfo.invincibleDelta;
            this.loopDeltaTime = inviciinfo.loopDeltaTime;
            this._curBuffTime = 0;
            this.incd = 0;
            entity.invincibleBuffEnter();
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this.isloop) {
                if (this.incd <= 0 && this._curBuffTime >= this.invincibleDelta) {
                    this.incd = this.loopDeltaTime;
                    entity.OffBuff(this._buffType);
                    entity.setInvicibleVisible(false);
                }
                if (this.incd > 0) {
                    this.incd -= dt;
                    if (this.incd <= 0) {
                        this._curBuffTime = 0;
                        entity.OnBuff(this._buffType);
                        entity.setInvicibleVisible(true);
                    }
                }
                return true;
            } else {
                if (this._curBuffTime >= this.invincibleDelta) {
                    entity.OffBuff(this._buffType);
                    entity.setInvicibleVisible(false);
                    return false;
                }
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
            entity.setInvicibleVisible(false);
        }

    }

    export class MoveSpeedBuff extends BuffItem<Agent>{
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this._buffTime = this._param.buffTime;
            entity.MaxSpeed = entity.MaxSpeed + this._param.buffValue;
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this._curBuffTime >= this._buffTime) {
                entity.MaxSpeed = entity.MaxSpeed - this._param.buffValue;
                return false;
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
        }


    }

    export class BloodBuff extends BuffItem<Agent>{
        public Enter(entity: Agent) {
            super.Enter(entity);
            entity.addBlood(this._param.buffValue);
        }
        public Execute(entity: Agent, dt: any): boolean {
            return false;
        }
    }

    export class IceBuff extends BuffItem<Agent>{
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this._buffTime = this._param.buffTime;
            entity.showIce();
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this._curBuffTime >= this._buffTime) {
                return false;
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
            entity.hideIce();
        }
    }

    export class SkillSpeedBuff extends BuffItem<Agent>{
        private isloop: boolean = false;
        private speedrange: number = 0;
        private speedvalue: number = 0;
        private speedtime: number = 0;
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this._buffTime = this._param.buffTime;
            this.isloop = this._param.isloop;
            this.speedrange = this._param.buffRange;
            this.speedvalue = this._param.buffValue;
            this.speedtime = this._param.addbuffTime;
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this._curBuffTime >= this._buffTime) {
                this._curBuffTime = 0;
                entity.doAddSpeedExcute(this.speedrange, this.speedvalue, this.speedtime);
                return this.isloop;
            } else
                return true;
        }

    }

    export class SkillBloodBuff extends BuffItem<Agent>{
        private isloop: boolean = false;
        private bloodrange: number = 0;
        private bloodvalue: number = 0;
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this._buffTime = this._param.buffTime;
            this.isloop = this._param.isloop;
            this.bloodrange = this._param.buffRange;
            this.bloodvalue = this._param.buffValue;
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this._curBuffTime >= this._buffTime) {
                this._curBuffTime = 0;
                entity.doAddBloodExcute(this.bloodrange, this.bloodvalue);
                return this.isloop;
            } else
                return true;
        }

    }

    export class SKillThunderBuff extends BuffItem<Agent>{
        public hurtRatio: number = 0;
        public range: number = 0;
        public thunderNum = 1;
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this._buffTime = this._param.buffTime;
            this.hurtRatio = this._param.buffValue;
            this.range = this._param.range;
            this.thunderNum = this._param.thunderNum;
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this._curBuffTime >= this._buffTime) {
                this._curBuffTime = 0;
                entity.doThunderKill(this.hurtRatio, this.range,this.thunderNum);
            }
            return true;
        }

    }
    export class SkillPoisonBuff extends BuffItem<Agent>{
        public deltaRatio: number = 0;
        public delta: number = 0;
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this.delta = 0;
            this._buffTime = this._param.buffTime;
            this.deltaRatio = this._param.deltaTime;
            this._buffValue = this._param.buffValue;
            entity.showPoisionEffect();
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            this.delta += dt;
            if (this.delta >= this.deltaRatio) {
                this.delta = 0;
                entity.behit({ hurt: this._buffValue, hitPos: entity.Pos, bulletType: 0, insId: 0 }, 30);
            }
            if (this._curBuffTime >= this._buffTime) {
                return false;
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
            entity.hidePoisionEffect();
        }
    }

    export class SkillFireBuff extends BuffItem<Agent>{
        public deltaRatio: number = 0;
        public delta: number = 0;
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this.delta = 0;
            this._buffTime = this._param.buffTime;
            this.deltaRatio = this._param.deltaTime;
            this._buffValue = this._param.buffValue;
            entity.showFireEffect();
        }
        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            this.delta += dt;
            if (this.delta >= this.deltaRatio) {
                this.delta = 0;
                entity.behit({ hurt: this._buffValue, hitPos: entity.Pos, bulletType: 0, insId: 0 }, 31);
            }
            if (this._curBuffTime >= this._buffTime) {
                return false;
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
            entity.hideFireEffect();
        }

    }

    export class SkillIceBuff extends BuffItem<Agent>{
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = 0;
            this._buffTime = this._param.buffTime;
            this._buffValue = this._param.buffValue;
            entity.MaxSpeed -= entity.movespeed * this._buffValue;
            entity.showIce();
        }

        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this._curBuffTime >= this._buffTime) {
                return false;
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
            entity.MaxSpeed += entity.movespeed * this._buffValue;
            entity.hideIce();
        }
    }

    export class SkillRadiusDamageBuff extends BuffItem<Agent>{
        public Enter(entity: Agent) {
            super.Enter(entity);
            this._curBuffTime = this._param.buffTime;
            this._buffTime = this._param.buffTime;
            this._buffValue = this._param.buffValue;
        }

        public Execute(entity: Agent, dt: any): boolean {
            this._curBuffTime += dt;
            if (this._curBuffTime >= this._buffTime) {
                entity.behit({ hurt: this._buffValue, hitPos: entity.Pos, bulletType: 0, insId: 0 }, 1);
                this._curBuffTime = 0;
            }
            return true;
        }
        public Exit(entity: Agent) {
            super.Exit(entity);
        }

    }
}
