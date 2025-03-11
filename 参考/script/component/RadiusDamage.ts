import { Const } from "../config/Const";
import { Monster } from "./Monster";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RadiusDamage extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    sprite: cc.Node = null;

    public toolType = 6003;
    onLoad() {
        this.node.colliderComponent = this;
        this.node.group = Const.GroupBomb;
    }

    start() {

    }
    private _hurt: number = 0;   //伤害值
    public get hurt(): number {
        return this._hurt;
    }

    public hurtRatio: number = 0;
    public deltaTime: number = 0;
    public damageRange: number = 0;
    public init(attackRatio: number, deltaTime: number, range: number) {
        this.hurtRatio = attackRatio;
        this.deltaTime = deltaTime;
        this.damageRange = range;
        this.sprite.width = range * 2;
        this.sprite.height = range * 2;
        this.node.getComponent(cc.CircleCollider).radius = this.damageRange;
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionEnter(other, self) {
        if (other.node.group == Const.GroupMonster) {
            let mon: Monster = other.node.colliderComponent;
            mon.setSkillRaduisDamageBuff(this.hurtRatio, this.deltaTime);
        }
    }

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionStay(other, self: cc.Collider) {

    }

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionExit(other: cc.Collider, self: cc.Collider) {
        if (other.node.group == Const.GroupMonster) {
            let mon: Monster = other.node.colliderComponent;
            mon.clearRaduisDamageBuff();
        }
    }

    // update (dt) {}
}
