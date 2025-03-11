import { BaseGameEntity } from "./BaseGameEntity";
import { C2DMatrix } from "./common/C2DMatrix";
import { GameWorld } from "./GameWorld";
import { Buff } from "./Buff";

export class MovingEntity extends BaseGameEntity {
    //速度
    protected m_Velocity: cc.Vec2;

    //朝向
    protected m_Heading: cc.Vec2;

    //垂直朝向
    protected m_Side: cc.Vec2;

    protected m_Mass: number;    //质量

    protected m_MaxSpeed: number;

    protected m_MaxForce: number;

    protected m_MaxTurnRate: number;

    protected _normalDir: cc.Vec2 = cc.v2(0, 1);

    protected _isDead: boolean = false;

    protected attackRange: number = 500;//攻击范围

    protected _gameWorld: GameWorld;

    protected buffType: Buff.BuffType = 0;

    public OnBuff(bufftype: Buff.BuffType): void { this.buffType |= bufftype };
    public OffBuff(bufftype: Buff.BuffType): void { if (this.IsInBuff(bufftype)) this.buffType ^= bufftype; }
    public IsInBuff(bufftype: Buff.BuffType): boolean { return (this.buffType & bufftype) == bufftype; }
    public resetBuffType() { this.buffType = 0 };
    protected changeListener(enable: boolean) {

    }

    public constructor(MaxSpeed: number = 1, MaxForce: number = 1000, MaxTurnRate: number = Math.PI * 2) {
        super(BaseGameEntity.GetNextVaildID());
        this.m_Velocity = cc.Vec2.ZERO;
        this.m_Heading = cc.Vec2.ZERO;
        this.m_Side = this.m_Heading.Perp();
        this.m_MaxSpeed = MaxSpeed;
        this.m_MaxTurnRate = MaxTurnRate;
        this.m_MaxForce = MaxForce;
        this._gameWorld = GameWorld.Instance;
        this.buffType = 0;
    }

    public get Velocity() { return this.m_Velocity; }
    public set Velocity(val: cc.Vec2) { this.m_Velocity = val; }

    public get Mass() { return this.m_Mass };
    public get Side() { return this.m_Side; }

    public get MaxSpeed() { return this.m_MaxSpeed; }
    public set MaxSpeed(new_speed: number) { this.m_MaxSpeed = new_speed; }

    public get MaxForce() { return this.m_MaxForce; }
    public set MaxForce(mf: number) { this.m_MaxForce = mf; }

    public get IsSpeedMaxedOut() { return this.m_MaxSpeed * this.m_MaxSpeed >= this.m_Velocity.magSqr(); }
    public get Speed() { return this.m_Velocity.mag(); }
    public get SpeedSqr() { return this.m_Velocity.magSqr(); }
    public get Heading() { return this.m_Heading; }
    public set Heading(h: cc.Vec2) {
        if (h.magSqr() < 0.000001) { return; }
        this.m_Heading = h;
        this.m_Side = this.m_Heading.Perp();
    }
    public RotateHeadingToFacePosition(target: cc.Vec2) {
        let toTarget: cc.Vec2 = target.sub(this.m_Position);
        let dot = this.m_Heading.dot(toTarget);
        dot = cc.misc.clampf(dot, -1, 1);
        let angle = Math.acos(dot);
        if (angle < 0.00001) return true;
        if (angle > this.m_MaxTurnRate) angle = this.m_MaxTurnRate;
        let RotationMatrix = C2DMatrix.NormalMatrix;
        RotationMatrix.Rotate(angle * this.m_Heading.Sign(toTarget));
        this.m_Heading = RotationMatrix.TransformVector2Ds(this.m_Heading);
        this.m_Velocity = RotationMatrix.TransformVector2Ds(this.m_Velocity);

        this.m_Side = this.m_Heading.Perp();
    }

    public get MaxTurnRate() { return this.m_MaxTurnRate; }
    public set MaxTurnRate(val: number) { this.m_MaxTurnRate = val; }

    public get isDead(): boolean {
        return this._isDead;
    }
    public get world() { return this._gameWorld; }
}
