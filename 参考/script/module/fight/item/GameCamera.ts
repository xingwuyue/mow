import { Time } from "../../../framework/Time";
import { Const } from "../../../config/Const";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { NotifyID } from "../../../framework/NotifyID";
import FightModel from "../FightModel";

export class GameCamera {

    private _gameCamera: cc.Camera;
    private _targetNode: cc.Node;

    private targetPos: cc.Vec2 = cc.Vec2.ZERO;
    private offset: number = 0;//适配全面屏
    private tempOffset: number = 0;
    private zoomScaleX: number = 0;
    private zoomScaleY: number = 0;
    private targetZoom: number = 0.7;
    private canvassize: cc.Size;
    private radio: number = 0;
    private _startShake: boolean = false;
    private realdesignWidth:number = 0;
    public constructor(camera: cc.Camera, targetNode: cc.Node) {
        this._gameCamera = camera;
        this._targetNode = targetNode;
        this.canvassize = cc.view.getCanvasSize();
        let height = cc.winSize.height;
        this.radio = this.canvassize.height / this.canvassize.width;

        let realheight = Const.designWidth * this.radio;
        this.offset = (realheight - height) * 0.5;
        this.realdesignWidth = Const.designWidth;
        if (this.radio <= 1.5) {
            let realwidth = Const.designHeight * this.canvassize.width / this.canvassize.height;
            this.offset = (realwidth - cc.winSize.width) * 0.5;
            this.realdesignWidth = realwidth;
        }

        this.tempOffset = this.offset;
        Notifier.changeListener(true, ListenID.Fight_Start, this.startZoom, this);
        Notifier.changeListener(true, ListenID.Fight_Restart, this.startZoom, this);
        Notifier.changeListener(true, NotifyID.Time_Scale, this.endZoom, this);
        Notifier.changeListener(true, ListenID.Fight_ShowShake, this.startShake, this);
    }

    private _offset: cc.Vec2 = cc.v2(0, 0);
    private dir: number = 0;
    private shakeTime: number = 0;
    /** 摄像机跟随目标平滑移动 */
    public lateUpdate(deltaTime: number) {
        if (this.startzoom) {
            this._gameCamera.zoomRatio = Math.lerp(this._gameCamera.zoomRatio, this.targetZoom, Time.deltaTime + 0.05);
            this._gameCamera.zoomRatio = cc.misc.clampf(this._gameCamera.zoomRatio, 0.7, 1);
            this.zoomScaleX = (1 - this._gameCamera.zoomRatio) * Const.mapWidth * 0.25;
            this.zoomScaleY = this.zoomScaleX * this.radio;
            this.offset = this.tempOffset + this.zoomScaleY;
            if (Math.abs(this._gameCamera.zoomRatio - this.targetZoom) <= 0.01) this.startzoom = false;
        }
        this.targetPos.x = Math.lerp(this.targetPos.x, this._targetNode.x, Time.deltaTime + 0.05);
        // this.targetPos.x = cc.misc.clampf(this.targetPos.x, -Const.designWidth + this.zoomScaleX, Const.designWidth - this.zoomScaleX);
        this.targetPos.y = Math.lerp(this.targetPos.y, this._targetNode.y, Time.deltaTime + 0.05);
        // this.targetPos.y = cc.misc.clampf(this.targetPos.y, -960 + this.offset, 960 - this.offset);
        if (this._startShake) {
            this.shakeTime -= Time.deltaTime;
            if (this.shakeTime >= 0.12)
                this.shakeByDir(0);
            else if (this.shakeTime >= 0.09) {
                this.shakeByDir(1);
            } else if (this.shakeTime >= 0.06) {
                this.shakeByDir(2);
            } else if (this.shakeTime >= 0.03) {
                this.shakeByDir(3);
            } else if (this.shakeTime >= 0.) {
                this.shakeByDir(4);
            } else {
                this._startShake = false;
            }
            this.targetPos.addSelf(this._offset);
        }
        this._gameCamera.node.position = this.targetPos;
    }

    private startzoom: boolean = false;

    public startZoom() {
        this.targetZoom = 0.7;
        this.startzoom = true;
    }

    public endZoom(scale) {
        if (scale == 1 && !FightModel.getInstance.isFighting) {
            this.targetZoom = 1;
            this.startzoom = true;
        }
    }

    public startShake() {
        this._startShake = true;
        this._offset = cc.Vec2.ZERO;
        this.dir == 0;
        this.shakeTime = 0.15;
    }

    public shakeByDir(dir: number) {
        let num = 30;
        let extraTime = 0.1;
        if (dir == 0) {
            this._offset.x = Math.lerp(this._offset.x, -num, Time.deltaTime + extraTime);
            this._offset.y = Math.lerp(this._offset.y, -num, Time.deltaTime + extraTime);
        } else if (dir == 1) {
            this._offset.x = Math.lerp(this._offset.x, -num, Time.deltaTime + extraTime);
            this._offset.y = Math.lerp(this._offset.y, num, Time.deltaTime + extraTime);
        } else if (dir == 2) {
            this._offset.x = Math.lerp(this._offset.x, num, Time.deltaTime + extraTime);
            this._offset.y = Math.lerp(this._offset.y, -num, Time.deltaTime + extraTime);
        } else if (dir == 3) {
            this._offset.x = Math.lerp(this._offset.x, num, Time.deltaTime + extraTime);
            this._offset.y = Math.lerp(this._offset.y, num, Time.deltaTime + extraTime);
        } else if (dir == 4) {
            this._offset.x = Math.lerp(this._offset.x, 0, Time.deltaTime + extraTime);
            this._offset.y = Math.lerp(this._offset.y, 0, Time.deltaTime + extraTime);
        }
    }
}
