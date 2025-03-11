import { _decorator, Component, Node, Vec3, CircleCollider2D, Contact2DType, Collider2D, 
         IPhysics2DContact, RigidBody2D, Vec2, ERigidBody2DType } from 'cc';
import { EnemyManager } from './EnemyManager';
import { PlayerCombat } from './PlayerCombat';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property({ tooltip: '血量' })
    public maxHealth: number = 100;

    @property({ tooltip: '移动速度' })
    public moveSpeed: number = 250;

    @property({ tooltip: '攻击力' })
    public attackPower: number = 25;

    @property({ tooltip: '攻击间隔(秒)' })
    public attackInterval: number = 1;

    @property({ tooltip: '安全距离' })
    private _safeDistance: number = 100;

    private _isAttacking: boolean = false;
    private _canAttack: boolean = true;
    private _currentDirection: Vec3 = new Vec3();
    private _collider: CircleCollider2D | null = null;
    private _currentHealth: number = 0;
    private _isColliding: boolean = false;
    private _playerCombat: PlayerCombat | null = null;

    onLoad() {
        this._collider = this.getComponent(CircleCollider2D);
        if (this._collider) {
            this._collider.group = 4;
            this._collider.enabled = true;
            this._collider.sensor = true; // 设置为传感器，不参与物理模拟
            this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            this._safeDistance = this._collider.radius * 2;
        }

        // 设置刚体属性
        const rigidbody = this.getComponent(RigidBody2D);
        if (rigidbody) {
            rigidbody.type = ERigidBody2DType.Dynamic;
            rigidbody.fixedRotation = true;  // 防止旋转
            rigidbody.linearDamping = 0;     // 没有阻尼
            rigidbody.gravityScale = 0;      // 无重力
            rigidbody.enabledContactListener = true;
        }

        // 添加到 EnemyManager
        EnemyManager.instance.addEnemy(this.node);
        // 初始化血量
        this._currentHealth = this.maxHealth;

         // 获取玩家的 PlayerCombat 组件
         const playerNode = EnemyManager.instance.getPlayerNode();
         if (playerNode) {
             this._playerCombat = playerNode.getComponent(PlayerCombat);
         }
     }

    onDestroy() {
        if (this._collider) {
            this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        // 从 EnemyManager 移除
        if (EnemyManager.instance) {
            EnemyManager.instance.removeEnemy(this.node);
        }
    }

    update(dt: number) {
        const startTime = performance.now();
        const playerNode = EnemyManager.instance.getPlayerNode();
        if (!playerNode || this._isColliding) return;

        const currentPos = this.node.getWorldPosition();
        const targetPos = playerNode.worldPosition;
        
        Vec3.subtract(this._currentDirection, targetPos, currentPos);
        this._currentDirection.normalize();
    
        // 更新旋转
        const angle = Math.atan2(this._currentDirection.y, this._currentDirection.x);
        this.node.angle = angle * 180 / Math.PI + 90 + 180;
    
        // 平滑移动
        const moveAmount = this.moveSpeed * dt;
        const newPos = new Vec3(
            currentPos.x + this._currentDirection.x * moveAmount,
            currentPos.y + this._currentDirection.y * moveAmount,
            currentPos.z
        );
        this.node.setWorldPosition(newPos);
        const endTime = performance.now();
        //console.log(`Update time: ${endTime - startTime}ms`);
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 检查碰撞对象是否有 PlayerCombat 组件
        const playerCombat = otherCollider.node.getComponent(PlayerCombat);
        if (playerCombat) {
            this._isColliding = true;
            if (this._canAttack) {
                this.attack(playerCombat);  // 将 playerCombat 传递给 attack 方法
            }
        }
    }

    private onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.getComponent('PlayerCombat')) {
            this._isColliding = false;
        }
    }

    private attack(playerCombat: PlayerCombat) {
        this._canAttack = false;
        
        // 直接对玩家造成伤害
        playerCombat.takeDamage(this.attackPower);
        console.log(`Enemy attacked player, damage: ${this.attackPower}`);
        
        // 攻击间隔后重置攻击状态
        this.scheduleOnce(() => {
            this._canAttack = true;
            // 检查玩家是否仍在碰撞范围内
            if (this._isColliding && playerCombat.node.isValid) {
                this.attack(playerCombat);
            }
        }, this.attackInterval);
    }

    public takeDamage(damage: number) {
        this._currentHealth -= damage;
        if (this._currentHealth <= 0) {
            this.node.destroy();
        }
    }

    // 获取当前血量百分比（用于血条显示）
    public getHealthPercent(): number {
        return this._currentHealth / this.maxHealth;
    }
}