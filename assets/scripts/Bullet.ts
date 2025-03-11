import { _decorator, Component, Node, Vec3, CCFloat, BoxCollider2D, Collider2D, Contact2DType, IPhysics2DContact, UITransform, Rect, instantiate, Prefab } from 'cc';
import { Enemy } from './Enemy';
import { HitEffect } from './HitEffect';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property({ type: CCFloat, tooltip: '子弹伤害' })
    public damage: number = 50;

    @property({ type: CCFloat, tooltip: '子弹飞行速度' })
    public speed: number = 500;  // 增加速度使子弹更快

    @property({ type: CCFloat, tooltip: '子弹销毁时间(秒)' })
    public lifeTime: number = 1;

    private _direction: Vec3 = new Vec3();
    private _spawnTime: number = 0;

    // 简化为只接收方向向量
    public init(direction: Vec3) {
        this._direction = direction;
        this._spawnTime = Date.now();
    }

    private _transform: UITransform | null = null;

    onLoad() {
        // 获取 UITransform 组件
        this._transform = this.getComponent(UITransform);
        if (!this._transform) {
            this._transform = this.addComponent(UITransform);
        }
        
        // 设置子弹的尺寸
        this._transform.setContentSize(20, 20);
    }

    update(deltaTime: number) {
        if (Date.now() - this._spawnTime > this.lifeTime * 1000) {
            this.node.destroy();
            return;
        }

        // 增加移动速度
        const moveAmount = this.speed * deltaTime * 2;  // 将速度翻倍
        const currentPos = this.node.position;
        const newPos = new Vec3(
            currentPos.x + this._direction.x * moveAmount,
            currentPos.y + this._direction.y * moveAmount,
            0
        );
        
        this.node.setPosition(newPos);
        this.checkCollision();
    }

    @property({ type: Prefab, tooltip: '击中特效预制体' })
    public hitEffectPrefab: Prefab | null = null;

    private checkCollision() {
        if (!this._transform) return;
    
        const bulletPos = this.node.worldPosition;
        const bulletBBox = new Rect(
            bulletPos.x - 15,
            bulletPos.y - 15,
            30,
            30
        );
    
        const enemies = this.node.parent?.getComponentsInChildren(Enemy) || [];
        
        for (const enemy of enemies) {
            if (enemy.isDead()) continue;
    
            const enemyNode = enemy.node;
            const enemyPos = enemyNode.worldPosition;
            const enemyBBox = new Rect(
                enemyPos.x - 25,
                enemyPos.y - 25,
                50,
                50
            );
    
            if (bulletBBox.intersects(enemyBBox)) {
                // 创建击中特效
                if (this.hitEffectPrefab) {
                    const effect = instantiate(this.hitEffectPrefab);
                    effect.parent = this.node.parent;
                    const effectPos = new Vec3(bulletPos.x, bulletPos.y, 0);
                    effect.setWorldPosition(effectPos);
                    
                    // 添加特效控制组件
                    effect.addComponent(HitEffect);
                }
    
                enemy.takeDamage(this.damage);
                this.node.destroy();
                break;
            }
        }
    }
}