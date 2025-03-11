import { _decorator, Component, Node, Vec2, Vec3, EventTouch, Input, input, 
    CircleCollider2D, RigidBody2D, ERigidBody2DType, Contact2DType, 
    Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    @property({ tooltip: '移动速度' })
    public moveSpeed: number = 300;

    @property({ tooltip: '触控停止范围区间' })
    public stopDistance: number = 50;

    private readonly MAP_BOUNDS = {
        minX: -1666.5,
        maxX: 1666.5,
        minY: -2222,
        maxY: 2222
    };

    private _moveDirection: Vec3 = new Vec3();
    private _isMoving: boolean = false;
    private _collider: CircleCollider2D | null = null;
    private _blockedDirections: Vec2[] = [];

    onEnable() {
        input.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
    }

    private _onTouchStart(event: EventTouch) {
        const touchPos = event.getUILocation();
        this._moveDirection.set(0, 0, 0);
        this._isMoving = false;
    }

    private _onTouchMove(event: EventTouch) {
        const touchPos = event.getUILocation();
        const delta = new Vec2(touchPos.x - event.getStartLocation().x, 
                             touchPos.y - event.getStartLocation().y);
        
        const distance = delta.length();
        if (distance <= this.stopDistance) {
            this._isMoving = false;
            return;
        }

        delta.normalize();
        this._moveDirection.set(delta.x, delta.y, 0);
        this._isMoving = true;
    }

    private _onTouchEnd() {
        this._isMoving = false;
    }

    update(deltaTime: number) {
        if (!this._isMoving) return;

        const currentPos = this.node.getWorldPosition();
        const moveStep = this.moveSpeed * deltaTime;
        
        // 检查是否被阻挡，如果被阻挡则计算可移动的分量
        const moveVec = new Vec2(this._moveDirection.x, this._moveDirection.y);
        for (const blockedDir of this._blockedDirections) {
            const dot = Vec2.dot(moveVec, blockedDir);
            if (dot > 0.7) {  // 调整阈值，使碰撞更自然
                // 计算平行于碰撞面的移动分量
                const parallel = new Vec2(-blockedDir.y, blockedDir.x);
                const parallelDot = Vec2.dot(moveVec, parallel);
                
                // 更新移动方向为平行分量
                this._moveDirection.x = parallel.x * parallelDot;
                this._moveDirection.y = parallel.y * parallelDot;
                this._moveDirection.normalize();
                break;  // 只处理最主要的碰撞
            }
        }
        
        // 计算新位置并限制边界
        const newPos = new Vec3(
            Math.max(this.MAP_BOUNDS.minX, Math.min(this.MAP_BOUNDS.maxX, 
                   currentPos.x + this._moveDirection.x * moveStep)),
            Math.max(this.MAP_BOUNDS.minY, Math.min(this.MAP_BOUNDS.maxY, 
                   currentPos.y + this._moveDirection.y * moveStep)),
            currentPos.z
        );
        
        this.node.setWorldPosition(newPos);
    }

    onLoad() {
        // 获取子节点的碰撞体组件
        this._collider = this.node.getComponentInChildren(CircleCollider2D);
        if (this._collider) {
            this._collider.group = 2;
            this._collider.sensor = false;
            this._collider.enabled = true;
            this._collider.radius = 30;  // 减小碰撞半径
            this._collider.friction = 0;  // 减少摩擦力
            this._collider.restitution = 0;  // 没有弹性
            this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        // 获取刚体组件
        const rigidbody = this.getComponent(RigidBody2D);
        if (rigidbody) {
            rigidbody.enabledContactListener = true;
            rigidbody.fixedRotation = true;
            rigidbody.type = ERigidBody2DType.Dynamic;
            rigidbody.gravityScale = 0;
            rigidbody.linearDamping = 0;
        }
    }

    onDestroy() {
        if (this._collider) {
            this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.getComponent('Enemy')) {
            const currentPos = this.node.getWorldPosition();
            const enemyPos = otherCollider.node.getWorldPosition();
            
            // 计算碰撞方向
            const direction = new Vec2(
                enemyPos.x - currentPos.x,
                enemyPos.y - currentPos.y
            ).normalize();
            
            this._blockedDirections.push(direction);
        }
    }

    private onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.getComponent('Enemy')) {
            this._blockedDirections = [];
        }
    }

    public isMoving(): boolean {
        return this._isMoving;
    }

    public getMoveDirection(): Vec3 {
        return this._moveDirection;
    }
}