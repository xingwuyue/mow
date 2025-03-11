import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HitEffect')
export class HitEffect extends Component {
    start() {
        // 0.1秒后销毁节点
        setTimeout(() => {
            if (this.node && this.node.isValid) {
                this.node.destroy();
            }
        }, 100);
    }
}