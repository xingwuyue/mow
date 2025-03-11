import { _decorator, Component, Node, Vec3, Prefab, instantiate } from 'cc';
import { EnemyManager } from './EnemyManager';
import { Bullet } from './Bullet';
import { PlayerHealthBar } from './PlayerHealthBar';
const { ccclass, property } = _decorator;

@ccclass('PlayerCombat')
export class PlayerCombat extends Component {
    @property({ tooltip: '血量' })
    public health: number = 300;

    // 添加受伤方法
    public takeDamage(damage: number) {
        this.health = Math.max(0, this.health - damage);
        console.log(`玩家受伤，当前血量：${this.health}`);
        // 如果需要，可以在这里添加死亡判断
        if (this.health <= 0) {
            this.node.destroy();
        }
    }

    @property({ tooltip: '攻击范围' })
    public attackRange: number = 360;

    @property({ tooltip: '子弹射击间隔' })
    public shootInterval: number = 0.13;

    @property({ tooltip: '单轮子弹数量' })
    public bulletsPerRound: number = 10;

    @property({ tooltip: '射击CD' })
    public shootCooldown: number = 0.6;

    @property({ type: [Prefab], tooltip: '敌人预制体' })
    public enemyPrefabs: Prefab[] = [];

    @property({ type: Prefab, tooltip: '子弹预制体' })
    public bulletPrefab: Prefab;

    private _isShooting: boolean = false;
    private _isInCooldown: boolean = false;
    private _currentBullets: number = 0;
    private _currentTarget: Node = null;  // 当前目标敌人

    @property({ tooltip: '检测敌人间隔' })
    public checkInterval: number = 0.2;

    // 删除这个属性
    // @property({ type: Prefab, tooltip: '血条预制体' })
    // public healthBarPrefab: Prefab;

    onLoad() {
        // 只保留检查敌人的代码
        this.schedule(this._updateNearestEnemy, this.checkInterval);
        
        // 删除创建血条的代码
        // const healthBar = instantiate(this.healthBarPrefab);
        // healthBar.parent = this.node;
        // healthBar.setPosition(0, -70, 0);
        // healthBar.addComponent(PlayerHealthBar);
    }

    onDestroy() {
        this.unschedule(this._updateNearestEnemy);
    }

    private _updateNearestEnemy() {
        const nearestEnemy = this._findNearestEnemy();
        
        // 如果当前目标无效或找到更近的目标，则更新目标
        if (!this._currentTarget?.isValid || 
            (nearestEnemy && this._isCloserEnemy(nearestEnemy))) {
            this._currentTarget = nearestEnemy;
        }

        // 有目标且未在射击状态时开始射击
        if (this._currentTarget && !this._isShooting) {
            this.startShooting();
        }
    }

    private _isCloserEnemy(newEnemy: Node): boolean {
        const currentPos = this.node.getWorldPosition();
        const currentTargetDist = this._currentTarget ? 
            Vec3.distance(currentPos, this._currentTarget.getWorldPosition()) : 
            Infinity;
        const newEnemyDist = Vec3.distance(currentPos, newEnemy.getWorldPosition());
        return newEnemyDist < currentTargetDist;
    }

    // 寻找范围内最近的敌人
    private _findNearestEnemy(): Node | null {
        const enemies = EnemyManager.instance.getEnemies();
        if (!enemies || enemies.length === 0) return null;

        const currentPos = this.node.getWorldPosition();
        let nearestEnemy = null;
        let minDistance = this.attackRange;

        for (const enemy of enemies) {
            if (!enemy.isValid) continue;
            
            const enemyPos = enemy.getWorldPosition();
            const distance = Vec3.distance(currentPos, enemyPos);
            
            if (distance <= this.attackRange && (nearestEnemy === null || distance < minDistance)) {
                nearestEnemy = enemy;
                minDistance = distance;
            }
        }

        return nearestEnemy;
    }

    // 获取当前目标敌人（供其他组件使用）
    getNearestEnemy(): Node | null {
        return this._currentTarget?.isValid ? this._currentTarget : null;
    }

    canShoot(): boolean {
        return !this._isInCooldown && this._currentTarget?.isValid;
    }

    private _shootBullet() {
        if (this._currentBullets >= this.bulletsPerRound) {
            this._isShooting = false;
            this._startCooldown();
            return;
        }

        if (!this._currentTarget?.isValid) {
            this._isShooting = false;
            return;
        }

        // 创建子弹
        const bullet = instantiate(this.bulletPrefab);
        bullet.parent = this.node.parent.parent; // 设置为 GameCanvas

        // 设置子弹初始位置和方向
        const currentPos = this.node.getWorldPosition();
        bullet.setWorldPosition(currentPos);

        // 计算射击方向
        const targetPos = this._currentTarget.getWorldPosition();
        const direction = new Vec3(
            targetPos.x - currentPos.x,
            targetPos.y - currentPos.y,
            0
        ).normalize();

        // 设置子弹旋转
        const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI - 90;
        bullet.angle = angle;

        // 初始化子弹
        const bulletComp = bullet.getComponent(Bullet);
        if (bulletComp) {
            bulletComp.init(direction);
        }

        this._currentBullets++;
        this.scheduleOnce(() => this._shootBullet(), this.shootInterval);
    }
    private _checkAndShoot() {
        const enemy = this.getNearestEnemy();
        if (enemy && !this._isShooting) {
            this.startShooting();
        }
    }

    startShooting() {
        if (!this.canShoot()) return;

        this._isShooting = true;
        this._currentBullets = 0;
        this._shootBullet();
    }

    
    private _startCooldown() {
        this._isInCooldown = true;
        this.scheduleOnce(() => this._isInCooldown = false, this.shootCooldown);
    }
}