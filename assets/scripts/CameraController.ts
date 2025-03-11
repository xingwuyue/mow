import { _decorator, Component, Node, Vec3, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property({ type: Node, tooltip: '要跟随的目标' })
    public target: Node | null = null;

    @property({ tooltip: '相机跟随速度' })
    public followSpeed: number = 5.0;

    private _camera: Camera | null = null;
    private _currentPos: Vec3 = new Vec3();
    private _targetPos: Vec3 = new Vec3();

    start() {
        this._camera = this.getComponent(Camera);
        if (this.target) {
            const pos = this.target.worldPosition;
            this._currentPos.set(pos.x, pos.y, 1000);
            this.node.setWorldPosition(this._currentPos);
        }
    }

    lateUpdate(deltaTime: number) {
        if (!this.target) return;

        // 获取目标的世界坐标
        const targetWorldPos = this.target.worldPosition;
        this._targetPos.set(targetWorldPos.x, targetWorldPos.y, 1000);
        
        // 使用线性插值实现平滑跟随
        Vec3.lerp(this._currentPos, this._currentPos, this._targetPos, this.followSpeed * deltaTime);
        this.node.setWorldPosition(this._currentPos);
    }
}