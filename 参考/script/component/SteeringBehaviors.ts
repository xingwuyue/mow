import { MovingEntity } from "./MovingEntity";
import { BaseGameEntity } from "./BaseGameEntity";
import { Const } from "../config/Const";
import { MonsterMap } from "../manager/RoleManager";
//the radius of the constraining circle for the wander behavior
const WanderRad = 1.2;
//distance the wander circle is projected in front of the agent
const WanderDist = 2.0;
//the maximum amount of displacement along the circle each frame
const WanderJitterPerSec = 80.0;
//used in path following
const WaypointSeekDist = 20;

enum BehaviorType {
    none = 0x00000,
    seek = 0x00002,
    flee = 0x00004,
    arrive = 0x00008,
    wander = 0x00010,
    cohesion = 0x00020,
    separation = 0x00040,
    allignment = 0x00080,
    obstacle_avoidance = 0x00100,
    wall_avoidance = 0x00200,
    follow_path = 0x00400,
    pursuit = 0x00800,
    evade = 0x01000,
    interpose = 0x02000,
    hide = 0x04000,
    flock = 0x08000,
    offset_pursuit = 0x10000,
};

enum Deceleration {
    slow = 3,
    normal = 2,
    fast = 1,
}


export class SteeringBehavior<T extends MovingEntity>{
    private behaviorType: BehaviorType;
    private m_Vehicle: T;
    private m_SteeringForce: cc.Vec2;
    private m_TargetAgent1: MovingEntity;
    private m_TargetAgent2: MovingEntity;

    //the current target
    private m_Target: cc.Vec2;

    // utilized in obstacle avoidance
    private m_DBoxLength: number;

    private m_WallDetectionFeelerLength: number;

    private m_WanderTarget: cc.Vec2;
    private m_WanderJitter: number;
    private m_WanderRadius: number;
    private m_WanderDistance: number;

    private m_ViewDistance: number;
    private m_WaypointSeekDistSq: number;
    //any offset used for formations or offset pursuit
    private m_Offset: cc.Vec2;

    private m_Flags: number;

    private m_Deceleration: Deceleration;

    private m_CellSpaceOn: boolean;

    private m_Feelers: number;

    //this function tests if a specific bit of m_Flags is set
    private On(bt: BehaviorType) { return (this.m_Flags & bt) == bt; }

    private AccumulateForce(ForceToAdd: cc.Vec2): boolean {
        let mag = this.m_SteeringForce.mag();
        let remain = this.m_Vehicle.MaxForce - mag;
        if (remain <= 0.0) return false;
        let toadd = ForceToAdd.mag();
        if (toadd < remain) {
            this.m_SteeringForce.addSelf(ForceToAdd);
        } else {
            this.m_SteeringForce.addSelf(ForceToAdd.normalize().mul(remain));
        }
        return true;
    }

    //creates the antenna utilized by the wall avoidance behavior
    private CreateFeelers() {

    }
    /* .......................................................

                    BEGIN BEHAVIOR DECLARATIONS

    .......................................................*/

    private Seek(TargetPos: cc.Vec2) {
        let DesiredVelocity = TargetPos.sub(this.m_Vehicle.Pos).normalize().mul(this.m_Vehicle.MaxSpeed);
        return (DesiredVelocity.sub(this.m_Vehicle.Velocity));
    }

    private Flee(TargetPos: cc.Vec2) {
        return cc.Vec2.ZERO;
    }

    private Arrive(TargetPos: cc.Vec2, dece: Deceleration) {
        return cc.Vec2.ZERO;
    }

    private Pursuit(evader: MovingEntity) {
        let ToEvader = evader.Pos.sub(this.m_Vehicle.Pos);
        let RelativeHeading = this.m_Vehicle.Heading.dot(evader.Heading);
        if ((ToEvader.dot(this.m_Vehicle.Heading) > 0) && (RelativeHeading < -0.95)) {
            return this.Seek(evader.Pos);
        }
        let LookAheadTime = ToEvader.mag() / (this.m_Vehicle.MaxSpeed + evader.Speed);

        return this.Seek(evader.Pos.add(evader.Velocity.mul(LookAheadTime)));
    }

    private OffsetPursuit(agent: T, offset: cc.Vec2) {
        return cc.Vec2.ZERO;
    }

    private Evade(agent: T) {
        return cc.Vec2.ZERO;
    }

    private Wander() {
        return cc.Vec2.ZERO;
    }

    private ObstacleAvoidance(obstacles: Array<BaseGameEntity>) {
        return cc.Vec2.ZERO;
    }

    private WallAvoidance(walls: Array<any>) {
        return cc.Vec2.ZERO;
    }

    private FollowPath() {
        return cc.Vec2.ZERO;
    }

    private Interpose(angent1: T, anget2: T) {
        return cc.Vec2.ZERO;
    }

    private Hide(hunter: T, obstacles: Array<BaseGameEntity>) {
        return cc.Vec2.ZERO;
    }

    // -- Group Behaviors -- //
    private Cohesion(agents: Array<T>) {//集合
        return cc.Vec2.ZERO;
    }

    private Separation(agents: Array<T> | MonsterMap) {//分散
        let SteeringForce: cc.Vec2 = cc.Vec2.ZERO;
        for (const key in agents) {
            let agent = agents[key];
            if (agent.Id !== this.m_Vehicle.Id && !agent.isDead) {
                let toAgent = this.m_Vehicle.Pos.sub(agent.Pos);
                let len = toAgent.mag();
                if (len < Const.disBewteenMon + agent.BRadius && len > 0) {
                    SteeringForce = SteeringForce.add(toAgent.div(len));
                }
            }
        }
        SteeringForce.mulSelf(50);
        return SteeringForce;
    }

    private Alignment(agents: Array<T>) {//对齐
        return cc.Vec2.ZERO;
    }

    /* .......................................................

                       END BEHAVIOR DECLARATIONS

    .......................................................*/

    private CalculatePrioritized() {//计算方法
        let force;
        // if(this.On(BehaviorType.wall_avoidance)){
        // force = this.WallAvoidance()
        // }
        // if(!this.isSpacePartitioningOn()){

        // }
        if (this.On(BehaviorType.separation)) {
            force = this.Separation(this.m_Vehicle.world.getAgentList());
            if (!this.AccumulateForce(force)) return this.m_SteeringForce;
        }
        // if (this.On(BehaviorType.seek)) {
        //     force = this.Seek(this.m_Target);
        //     if (!this.AccumulateForce(force)) return this.m_SteeringForce;
        // }
        if (this.On(BehaviorType.pursuit)) {
            if (this.m_TargetAgent1) {
                force = this.Pursuit(this.m_TargetAgent1);
                force.mulSelf(2);
                if (!this.AccumulateForce(force)) return this.m_SteeringForce;
            }
        }
        return this.m_SteeringForce;
    }

    //获取隐藏点
    private GetHidingPosition(posOb: cc.Vec2, radiusOb: number, posHunter: cc.Vec2) {
        return cc.Vec2.ZERO;
    }

    public constructor(agent: T) {
        this.m_Vehicle = agent;
        this.m_CellSpaceOn = false;
        this.m_Feelers = 3;
        this.m_Deceleration = Deceleration.fast;
        this.m_TargetAgent1 = null;
        this.m_TargetAgent2 = null;
        this.m_Flags = 0;
        this.m_WanderRadius = 20;
        let theta = Math.random() * Math.PI * 2;
        this.m_SteeringForce
        this.m_WanderTarget = cc.v2(this.m_WanderRadius * Math.cos(theta), this.m_WanderRadius * Math.sin(theta));

    }


    public Calculate() {
        this.m_SteeringForce = cc.Vec2.ZERO;

        // if (!this.isSpacePartitioningOn()) {
        //     if (this.On(BehaviorType.separation)) {
        //         //标记邻居
        //         this.m_Vehicle.world.TagVechiclesWithInViewRange(this.m_Vehicle, Const.disBewteenMon);
        //     }
        // }

        this.CalculatePrioritized();
        return this.m_SteeringForce;
    }

    public ForwardComponent() {

    }

    public SideComponent() {

    }

    public SetTarget(t: cc.Vec2) { this.m_Target = t; }

    public SetTargetAgent1(agent1: MovingEntity) { this.m_TargetAgent1 = agent1; }
    public SetTargetAgent2(agent2: MovingEntity) { this.m_TargetAgent2 = agent2; }

    public SetOffset(offset: cc.Vec2) { this.m_Offset = offset; }
    public GetOffset() { return this.m_Offset };
    public Force() { return this.m_SteeringForce; }
    public ToggleSpacePartitioningOnOff() { this.m_CellSpaceOn = !this.m_CellSpaceOn; }
    public isSpacePartitioningOn() { return this.m_CellSpaceOn; }

    public FleeOn() { this.m_Flags |= BehaviorType.flee; }
    public SeekOn() { this.m_Flags |= BehaviorType.seek; }
    public ArriveOn() { this.m_Flags |= BehaviorType.arrive; }
    public WanderOn() { this.m_Flags |= BehaviorType.wander; }
    public PursuitOn(v: MovingEntity) { this.m_Flags |= BehaviorType.pursuit; this.m_TargetAgent1 = v; }
    public EvadeOn(v: MovingEntity) { this.m_Flags |= BehaviorType.evade; this.m_TargetAgent1 = v; }
    public CohesionOn() { this.m_Flags |= BehaviorType.cohesion; }
    public SeparationOn() { this.m_Flags |= BehaviorType.separation; }
    public AlignmentOn() { this.m_Flags |= BehaviorType.allignment; }
    public ObstacleAvoidanceOn() { this.m_Flags |= BehaviorType.obstacle_avoidance; }
    public WallAvoidanceOn() { this.m_Flags |= BehaviorType.wall_avoidance; }
    public FollowPathOn() { this.m_Flags |= BehaviorType.follow_path; }
    public InterposeOn(v1: MovingEntity, v2: MovingEntity) { this.m_Flags |= BehaviorType.interpose; this.m_TargetAgent1 = v1; this.m_TargetAgent2 = v2; }
    public HideOn(v: MovingEntity) { this.m_Flags |= BehaviorType.hide; this.m_TargetAgent1 = v; }
    public OffsetPursuitOn(v1: MovingEntity, offset: cc.Vec2) { this.m_Flags |= BehaviorType.offset_pursuit; this.m_Offset = offset; this.m_TargetAgent1 = v1; }
    public FlockingOn() { this.CohesionOn(); this.AlignmentOn(); this.SeparationOn(); this.WanderOn(); }

    public FleeOff() { if (this.On(BehaviorType.flee)) this.m_Flags ^= BehaviorType.flee; }
    public SeekOff() { if (this.On(BehaviorType.seek)) this.m_Flags ^= BehaviorType.seek; }
    public ArriveOff() { if (this.On(BehaviorType.arrive)) this.m_Flags ^= BehaviorType.arrive; }
    public WanderOff() { if (this.On(BehaviorType.wander)) this.m_Flags ^= BehaviorType.wander; }
    public PursuitOff() { if (this.On(BehaviorType.pursuit)) this.m_Flags ^= BehaviorType.pursuit; }
    public EvadeOff() { if (this.On(BehaviorType.evade)) this.m_Flags ^= BehaviorType.evade; }
    public CohesionOff() { if (this.On(BehaviorType.cohesion)) this.m_Flags ^= BehaviorType.cohesion; }
    public SeparationOff() { if (this.On(BehaviorType.separation)) this.m_Flags ^= BehaviorType.separation; }
    public AlignmentOff() { if (this.On(BehaviorType.allignment)) this.m_Flags ^= BehaviorType.allignment; }
    public ObstacleAvoidanceOff() { if (this.On(BehaviorType.obstacle_avoidance)) this.m_Flags ^= BehaviorType.obstacle_avoidance; }
    public WallAvoidanceOff() { if (this.On(BehaviorType.wall_avoidance)) this.m_Flags ^= BehaviorType.wall_avoidance; }
    public FollowPathOff() { if (this.On(BehaviorType.follow_path)) this.m_Flags ^= BehaviorType.follow_path; }
    public InterposeOff() { if (this.On(BehaviorType.interpose)) this.m_Flags ^= BehaviorType.interpose; }
    public HideOff() { if (this.On(BehaviorType.hide)) this.m_Flags ^= BehaviorType.hide; }
    public OffsetPursuitOff() { if (this.On(BehaviorType.offset_pursuit)) this.m_Flags ^= BehaviorType.offset_pursuit; }
    public FlockingOff() { this.CohesionOff(); this.AlignmentOff(); this.SeparationOff(); this.WanderOff(); }

    public isFleeOn() { return this.On(BehaviorType.flee); }
    public isSeekOn() { return this.On(BehaviorType.seek); }
    public isArriveOn() { return this.On(BehaviorType.arrive); }
    public isWanderOn() { return this.On(BehaviorType.wander); }
    public isPursuitOn() { return this.On(BehaviorType.pursuit); }
    public isEvadeOn() { return this.On(BehaviorType.evade); }
    public isCohesionOn() { return this.On(BehaviorType.cohesion); }
    public isSeparationOn() { return this.On(BehaviorType.separation); }
    public isAlignmentOn() { return this.On(BehaviorType.allignment); }
    public isObstacleAvoidanceOn() { return this.On(BehaviorType.obstacle_avoidance); }
    public isWallAvoidanceOn() { return this.On(BehaviorType.wall_avoidance); }
    public isFollowPathOn() { return this.On(BehaviorType.follow_path); }
    public isInterposeOn() { return this.On(BehaviorType.interpose); }
    public isHideOn() { return this.On(BehaviorType.hide); }
    public isOffsetPursuitOn() { return this.On(BehaviorType.offset_pursuit); }

    public DBoxLength() { return this.m_DBoxLength; }
    public GetFeelers() { return this.m_Feelers; }

    public WanderJitter() { return this.m_WanderJitter; }
    public WanderDistance() { return this.m_WanderDistance; }
    public WanderRadius() { return this.m_WanderRadius; }


}