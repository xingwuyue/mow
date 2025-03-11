import { _decorator, Component, Node, Vec3 } from 'cc';
import { PlayerCombat } from './PlayerCombat';
import { PlayerMovement } from './PlayerMovement';
const { ccclass, property } = _decorator;

@ccclass('PlayerRotation')
export class PlayerRotation extends Component {
    @property({ tooltip: '转向速度' })
    public rotationSpeed: number = 1000;

    private _combat: PlayerCombat = null;
    private _movement: PlayerMovement = null;

    start() {
        this._combat = this.node.getComponent(PlayerCombat);
        this._movement = this.node.parent.getComponent(PlayerMovement);
    }

    update(deltaTime: number) {
        const nearestEnemy = this._combat.getNearestEnemy();
        if (nearestEnemy) {
            this._rotateTowards(nearestEnemy.worldPosition);
        } else if (this._movement.isMoving()) {
            this._rotateTowardsMovement();
        }
    }

    private _rotateTowardsMovement() {
        const moveDir = this._movement.getMoveDirection();
        if (!moveDir) return;
        
        // 计算移动方向的角度
        const angle = Math.atan2(
            moveDir.y,
            moveDir.x
        ) * 180 / Math.PI - 90;

        // 设置节点旋转
        this.node.angle = angle;
    }

    private _rotateTowards(targetPos: Vec3) {
        const currentPos = this.node.getWorldPosition();
        const direction = new Vec3(
            targetPos.x - currentPos.x,
            targetPos.y - currentPos.y,
            0
        );

        // 计算目标角度
        const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI - 90;
        
        // 设置节点旋转
        this.node.angle = angle;
    }
}