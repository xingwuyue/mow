import { _decorator, Component, Node, Vec3, CCFloat, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property({ type: CCFloat, tooltip: '碰撞半径' })
    public collisionRadius: number = 20;

    @property({ type: CCFloat, tooltip: '敌人血量' })
    public health: number = 20;

    @property({ type: CCFloat, tooltip: '敌人移动速度' })
    public moveSpeed: number = 20;

    @property({ type: CCFloat, tooltip: '敌人攻击力' })
    public attackPower: number = 10;

    @property({ type: CCFloat, tooltip: '敌人攻击范围' })
    public attackRange: number = 2;

    @property({ type: CCFloat, tooltip: '敌人攻击角度(度)' })
    public attackAngle: number = 60;

    @property({ type: CCFloat, tooltip: '敌人攻击间隔(秒)' })
    public attackInterval: number = 0.8;

    public target: Node | null = null;
    public isElite: boolean = false;

    private _lastAttackTime: number = 0;

    private _isDead: boolean = false;
    private _deathTime: number = 0;

    @property({ type: CCFloat, tooltip: '避障检测半径' })
    public avoidanceRadius: number = 40;

    @property({ type: CCFloat, tooltip: '避障力度' })
    public avoidanceForce: number = 0.5;

    update(deltaTime: number) {
        if (this._isDead) {
            this.node.destroy();
            return;
        }
    
        if (!this.target) return;
    
        const targetPos = this.target.worldPosition;
        const myPos = this.node.worldPosition;
        
        // 计算朝向目标的基础方向
        const baseDirection = Vec3.subtract(new Vec3(), targetPos, myPos).normalize();
        
        // 获取避障力并大幅降低其影响
        const avoidanceForce = this.calculateAvoidanceForce();
        avoidanceForce.multiplyScalar(0.1); // 将避障力降低到很小
        
        // 增加基础方向的权重
        baseDirection.multiplyScalar(2.0); // 加强追踪力度
        
        // 合并方向，确保基础方向占主导
        const direction = Vec3.add(new Vec3(), baseDirection, avoidanceForce).normalize();
        
        const distance = Vec3.distance(targetPos, myPos);
        const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
        this.node.angle = angle - 90;
    
        // 只要不在攻击范围内就持续移动
        if (distance > this.attackRange) {
            const moveAmount = this.moveSpeed * deltaTime;
            const newPos = new Vec3(
                myPos.x + direction.x * moveAmount,
                myPos.y + direction.y * moveAmount,
                0
            );
            this.node.setWorldPosition(newPos);
        } else {
            // 在攻击范围内时尝试攻击
            this.tryAttack();
        }
    }

    private calculateAvoidanceForce(): Vec3 {
        const avoidanceForce = new Vec3();
        const myPos = this.node.worldPosition;
        
        const enemies = this.node.parent?.getComponentsInChildren(Enemy) || [];
        
        for (const enemy of enemies) {
            if (enemy === this || enemy.isDead()) continue;
            
            const enemyPos = enemy.node.worldPosition;
            const distance = Vec3.distance(myPos, enemyPos);
            
            if (distance < this.avoidanceRadius && distance > 0) {
                const away = Vec3.subtract(new Vec3(), myPos, enemyPos).normalize();
                const force = (this.avoidanceRadius - distance) / this.avoidanceRadius;
                away.multiplyScalar(force * this.avoidanceForce);
                avoidanceForce.add(away);
            }
        }
        
        return avoidanceForce;
    }

    private tryAttack() {
        const now = Date.now();
        if (now - this._lastAttackTime >= this.attackInterval * 1000) {
            this.attack();
            this._lastAttackTime = now;
        }
    }

    private attack() {
        if (!this.target) return;

        const targetPos = this.target.worldPosition;
        const myPos = this.node.worldPosition;
        const direction = Vec3.subtract(new Vec3(), targetPos, myPos);
        const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;

        // 检查目标是否在攻击角度范围内
        const halfAngle = this.attackAngle / 2;
        const currentAngle = (angle + 360) % 360;
        const forwardAngle = (this.node.angle + 360) % 360;
        const angleDiff = Math.abs(currentAngle - forwardAngle);

        if (angleDiff <= halfAngle || angleDiff >= 360 - halfAngle) {
            // 在攻击角度内，造成伤害
            console.log('Enemy attacking!');
            // TODO: 调用玩家受伤方法
        }
    }

    public takeDamage(damage: number) {
        if (this._isDead) return;
        
        this.health -= damage;
        if (this.health <= 0) {
            this._isDead = true;
            this._deathTime = Date.now();
            // 可以在这里添加死亡动画或效果
        }
    }

    // 精英怪设置
    public setElite() {
        if (this.isElite) {
            this.health *= 2;
            this.attackPower *= 1.5;
            this.moveSpeed *= 0.8;
            // TODO: 可以在这里设置精英怪的外观
        }
    }
    public isDead(): boolean {
        return this._isDead;
    }
    onLoad() {
        console.log('Enemy onLoad - 节点信息:', {
            name: this.node.name,
            position: this.node.position,
            parent: this.node.parent?.name,
            active: this.node.active
        });
    
        const collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.enabled = true;
            // 设置敌人的碰撞组为3（ENEMY组）
            //collider.group = 3;
            collider.sensor = false;
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('Enemy collision detected with:', otherCollider.node.name);
    }
    private onDeath() {
            // 立即销毁敌人节点
            this.node.destroy();
        }
}