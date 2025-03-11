import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, IPhysics2DContact, 
    Sprite, instantiate, Prefab, Vec2, physics, Rect, CircleCollider2D, PhysicsSystem2D } from 'cc';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property({ type: Prefab, tooltip: '命中特效预制体' })
    public hitEffectPrefab: Prefab = null;

    @property({ tooltip: '子弹速度' })
    public speed: number = 500;

    @property({ tooltip: '子弹伤害' })
    public damage: number = 100;

    @property({ tooltip: '销毁时间' })
    public lifeTime: number = 2;

    private _direction: Vec3 = new Vec3();
    

    public init(direction: Vec3) {
        this._direction.set(direction);
    }

    update(deltaTime: number) {
        // 每帧更新子弹位置
        const moveAmount = this.speed * deltaTime;
        const currentPos = this.node.getPosition();
        this.node.setPosition(
            currentPos.x + this._direction.x * moveAmount,
            currentPos.y + this._direction.y * moveAmount,
            currentPos.z
        );

        // 使用圆形检测敌人
        const collider = this.getComponent(CircleCollider2D);
        if (collider) {
            const point = new Vec2(currentPos.x, currentPos.y);
            const results = PhysicsSystem2D.instance.testPoint(point);
            
            for (const result of results) {
                if (result.group === 4) {
                    const enemy = result.getComponent(Enemy);
                    if (enemy) {
                        enemy.takeDamage(this.damage);
                        
                        // 创建命中特效
                        if (this.hitEffectPrefab) {
                            const hitEffect = instantiate(this.hitEffectPrefab);
                            hitEffect.parent = this.node.parent;
                            hitEffect.setWorldPosition(enemy.node.getWorldPosition());
                            
                            hitEffect.getComponent(Sprite)?.scheduleOnce(() => {
                                hitEffect.destroy();
                            }, 2);
                        }
                        
                        this.node.destroy();
                        break;
                    }
                }
            }
        }
    }

    start() {
        // 初始化碰撞体
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.enabled = true;
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onBeginContact, this);
        }

        // 确保物理系统已启用
        if (!PhysicsSystem2D.instance.enable) {
            PhysicsSystem2D.instance.enable = true;
        }

        // 自动销毁
        this.scheduleOnce(() => this.node.destroy(), this.lifeTime);
    }


    onDestroy() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.off(Contact2DType.PRE_SOLVE, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只对敌人产生反应
        if (otherCollider.group === 4) {
            const enemy = otherCollider.getComponent(Enemy);
            if (enemy) {
                // 对敌人造成伤害
                enemy.takeDamage(this.damage);
                
                // 创建命中特效
                if (this.hitEffectPrefab) {
                    const hitEffect = instantiate(this.hitEffectPrefab);
                    hitEffect.parent = this.node.parent;
                    hitEffect.setWorldPosition(enemy.node.getWorldPosition());
                    
                    // 2秒后销毁特效
                    hitEffect.getComponent(Sprite).scheduleOnce(() => {
                        hitEffect.destroy();
                    }, 0.3);
                }
            }
            // 销毁子弹
            this.node.destroy();
        }
    }
}