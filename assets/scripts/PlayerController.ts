import { _decorator, Component, Node, Vec2, Vec3, input, Input, EventTouch, CCFloat, Graphics, Color, Prefab, instantiate, Camera, CCBoolean } from 'cc';
import { Bullet } from './Bullet';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    // 移动相关属性
    @property({ type: CCFloat, tooltip: '停止距离阈值' })
    public stopDistance: number = 10;

    @property({ type: CCFloat, tooltip: '角色移动速度 (单位/秒)' })
    public moveSpeed: number = 200;

    @property({ type: CCFloat, tooltip: '角色旋转速度 (度/秒)' })
    public rotationSpeed: number = 360;

    // 战斗相关属性
    @property({ type: CCFloat, tooltip: '角色血量' })
    public health: number = 100;

    @property({ type: CCFloat, tooltip: '攻击范围' })
    public attackRange: number = 360;

    @property({ type: CCFloat, tooltip: '射击频率(秒)' })
    public shootInterval: number = 0.1;

    @property({ type: CCFloat, tooltip: '弹夹容量' })
    public maxAmmo: number = 10;

    @property({ type: CCFloat, tooltip: '换弹时长(秒)' })
    public reloadTime: number = 1;

    @property({ type: Prefab, tooltip: '子弹预制体' })
    public bulletPrefab: Prefab | null = null;

    @property({ type: CCFloat, tooltip: '接触检测范围' })
    public contactRadius: number = 20;

    @property({ type: [Prefab], tooltip: '敌人预制体列表' })
    public enemyPrefabs: Prefab[] = [];

    @property({ tooltip: '是否启用调试模式' })
    public debugMode: boolean = false;

    @property({ type: Graphics })
    private _attackRangeGraphics: Graphics | null = null;
    // 私有属性
    private _isReloading: boolean = false;
    private _lastShootTime: number = 0;
    private _currentAmmo: number = 10;
    private _nearestEnemy: Node | null = null;
    private _isTouching: boolean = false;
    private _touchPos: Vec2 = new Vec2();
    private _targetAngle: number = 0;
    private _currentAngle: number = 0;
    private _moveDirection: Vec3 = new Vec3();
    private _debugGraphics: Graphics | null = null;
    @property({ type: CCFloat, tooltip: '地图边界宽度' })
    private mapWidth: number = 4444;
    @property({ type: CCFloat, tooltip: '地图边界高度' })
    private mapHeight: number = 6666;
    onLoad() {
        try {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
            input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

            if (this.debugMode) {
                this._debugGraphics = this.getComponent(Graphics);
                if (!this._debugGraphics) {
                    this._debugGraphics = this.addComponent(Graphics);
                }
            }

            this._attackRangeGraphics = this.getComponent(Graphics);
            if (!this._attackRangeGraphics) {
                const graphicsNode = new Node('AttackRangeGraphics');
                graphicsNode.parent = this.node;
                this._attackRangeGraphics = graphicsNode.addComponent(Graphics);
                this._attackRangeGraphics.strokeColor = new Color(255, 0, 0, 255);
                this._attackRangeGraphics.lineWidth = 2;
            }
        } catch (error) {
            console.error('PlayerController 初始化失败:', error);
        }
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    update(deltaTime: number) {
        this.handleMovementAndRotation(deltaTime);
        this.handleCombat(deltaTime);
        this.handleDebugDraw();
        this.drawAttackRange();
    }
    private shoot() {
        if (!this._nearestEnemy || !this.bulletPrefab) return;
    
        const startPos = this.node.worldPosition;
        const targetPos = this._nearestEnemy.worldPosition;
        // 计算子弹到目标的方向
        const direction = new Vec3(
            targetPos.x - startPos.x,
            targetPos.y - startPos.y,
            0
        ).normalize();
    
        // 从玩家位置偏移一定距离生成子弹
        const offsetDistance = 50;
        const spawnPos = new Vec3(
            startPos.x + direction.x * offsetDistance,
            startPos.y + direction.y * offsetDistance,
            0
        );
    
        const bullet = instantiate(this.bulletPrefab);
        bullet.parent = this.node.parent;
        bullet.setWorldPosition(spawnPos);
        // 设置子弹朝向
        const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
        bullet.angle = angle - 90;  // -90是因为子弹sprite默认朝上
    
        const bulletComp = bullet.getComponent(Bullet);
        if (bulletComp) {
            bulletComp.init(direction);
        }
    }

    private drawAttackRange() {
        if (!this._attackRangeGraphics) return;
        this._attackRangeGraphics.clear();
        this._attackRangeGraphics.circle(0, 0, this.attackRange);
        this._attackRangeGraphics.stroke();
    }

    private onTouchStart(event: EventTouch) {
        this._isTouching = true;
        this.updateTouchInfo(event);
    }

    private onTouchMove(event: EventTouch) {
        this.updateTouchInfo(event);
    }

    private onTouchEnd() {
        this._isTouching = false;
        this._moveDirection.set(Vec3.ZERO);
    }

    private updateTouchInfo(event: EventTouch) {
        const camera = this.node.scene.getComponentInChildren(Camera);
        if (!camera) return;

        const touchPos = event.getUILocation();
        const worldPos = new Vec3();
        camera.screenToWorld(new Vec3(touchPos.x, touchPos.y, 0), worldPos);
        this._touchPos.set(worldPos.x, worldPos.y);

        const nodePos = this.node.getWorldPosition();
        const dx = worldPos.x - nodePos.x;
        const dy = worldPos.y - nodePos.y;

        this._targetAngle = (Math.atan2(dx, dy) * 180 / Math.PI);
        if (this._targetAngle < 0) {
            this._targetAngle += 360;
        }
        
        this._moveDirection.x = dx;
        this._moveDirection.y = dy;
        this._moveDirection.normalize();
    }
    private handleMovementAndRotation(deltaTime: number) {
        // 移动需要触控
        if (this._isTouching) {
            this.handleMovement(deltaTime);
        }
        // 旋转不需要触控条件
        this.handleRotation(deltaTime);
    }
    private handleRotation(deltaTime: number) {
        if (this._nearestEnemy && this.isEnemyInRange(this._nearestEnemy)) {
            const enemyPos = this._nearestEnemy.worldPosition;
            const myPos = this.node.worldPosition;
            const dx = enemyPos.x - myPos.x;
            const dy = enemyPos.y - myPos.y;
            this._targetAngle = (Math.atan2(dx, dy) * 180 / Math.PI);
        }

        let angleDiff = this._targetAngle - this._currentAngle;
        if (angleDiff > 180) angleDiff -= 360;
        else if (angleDiff < -180) angleDiff += 360;
        
        const rotationAmount = this.rotationSpeed * deltaTime;
        if (Math.abs(angleDiff) > rotationAmount) {
            this._currentAngle += Math.sign(angleDiff) * rotationAmount;
        } else {
            this._currentAngle = this._targetAngle;
        }

        if (this._currentAngle >= 360) {
            this._currentAngle -= 360;
        } else if (this._currentAngle < 0) {
            this._currentAngle += 360;
        }

        this.node.angle = -this._currentAngle;
    }
    private handleMovement(deltaTime: number) {
        const nodePos = this.node.getWorldPosition();
        const distance = Math.sqrt(
            Math.pow(this._touchPos.x - nodePos.x, 2) + 
            Math.pow(this._touchPos.y - nodePos.y, 2)
        );
    
        if (distance > this.stopDistance) {
            const moveAmount = this.moveSpeed * deltaTime;
            const newPos = this.node.position.clone();
            const nextX = newPos.x + this._moveDirection.x * moveAmount;
            const nextY = newPos.y + this._moveDirection.y * moveAmount;
            // 分别处理 X 和 Y 方向的移动，允许单方向移动
            newPos.x = Math.abs(nextX) <= this.mapWidth/2 ? nextX : newPos.x;
            newPos.y = Math.abs(nextY) <= this.mapHeight/2 ? nextY : newPos.y;
            this.node.setPosition(newPos);
        }
    }
    private handleCombat(deltaTime: number) {
        const enemies = this.node.scene.children.filter(node => {
            const enemy = node.getComponent(Enemy);
            return enemy && !enemy.isDead();
        });
    
        if (enemies) {
            const playerPos = this.node.worldPosition;
            for (const enemy of enemies) {
                const distance = Vec3.distance(playerPos, enemy.worldPosition);
                if (distance <= this.contactRadius) {
                    console.log('玩家被敌人接触!');
                    this.health -= 10;
                    if (this.health <= 0) {
                        console.log('玩家死亡');
                    }
                }
            }
        }
    
        if (this._isReloading) {
            if (Date.now() - this._lastShootTime >= this.reloadTime * 1000) {
                this._isReloading = false;
                this._currentAmmo = this.maxAmmo;
            }
            return;
        }
    
        this.findNearestEnemy();
        if (this._nearestEnemy && this.isEnemyInRange(this._nearestEnemy)) {
            this.tryShoot();
        }
    }
    private findNearestEnemy() {
        const getAllNodes = (node: Node): Node[] => {
            let nodes: Node[] = [node];
            node.children.forEach(child => {
                nodes = nodes.concat(getAllNodes(child));
            });
            return nodes;
        };
    const allNodes = getAllNodes(this.node.scene);
    const enemies = allNodes.filter(node => {
        const enemy = node.getComponent(Enemy);
        return enemy && !enemy.isDead();
    });
    if (!enemies || enemies.length === 0) {
        this._nearestEnemy = null;
        return;
    }
    let nearest = enemies[0];
    let minDistance = Vec3.distance(this.node.worldPosition, nearest.worldPosition);
    for (const enemy of enemies) {
        const distance = Vec3.distance(this.node.worldPosition, enemy.worldPosition);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = enemy;
        }
    }
    this._nearestEnemy = nearest;
    }
    private isEnemyInRange(enemyNode: Node): boolean {
        if (!enemyNode || !enemyNode.position) {
            return false;
        }
        const enemy = enemyNode.getComponent(Enemy);
        if (!enemy || enemy.isDead()) {
            return false;
        }
        const distance = Vec3.distance(this.node.position, enemyNode.position);
        return distance <= this.attackRange;
    }
    private tryShoot() {
        const now = Date.now();
        if (now - this._lastShootTime < this.shootInterval * 1000) return;

        if (this._currentAmmo <= 0) {
            this._isReloading = true;
            this._lastShootTime = now;
            return;
        }

        this.shoot();
        this._currentAmmo--;
        this._lastShootTime = now;
    }

    private handleDebugDraw() {
        if (!this.debugMode || !this._debugGraphics || !this._isTouching) return;
        
        this._debugGraphics.clear();
        this._debugGraphics.strokeColor = Color.GREEN;
        this._debugGraphics.lineWidth = 2;
        this._debugGraphics.moveTo(0, 0);
        this._debugGraphics.lineTo(
            this._moveDirection.x * 100,
            this._moveDirection.y * 100
        );
        this._debugGraphics.stroke();
    }
}