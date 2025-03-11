import { MVC } from "../../framework/MVC";
import { Util } from "../../utils/Util";
import { Manager } from "../../manager/Manager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BossAlert extends MVC.BaseView {
    @property(cc.Label)
    desc: cc.Label = null;

    @property(cc.Node)
    btnClose: cc.Node = null;

    private cbConfirm: Function = null;
    start() {

    }
    // 设置事件监听
    protected changeListener(enable: boolean): void {

    };

    public onOpen(args: any) {
        super.onOpen(args);
        let level = args.level;
        if (level) {
            let chapids = Util.levelToChapterId(level);
            this.desc.string = `需通关第${chapids[0]}章${chapids[1]}波`;
        } else {
            this.desc.node.parent.active = false;
        }
        this.cbConfirm = args && args.errorcb;
        this.scheduleOnce(() => {
            this.btnClose.active = true;
            this.btnClose.scale = 0;
            this.btnClose.runAction(cc.scaleTo(0.3, 1));
        }, 0.3)
    }

    public onClose() {
        super.onClose();
        Manager.audio.playAudio(501);
        this.cbConfirm && this.cbConfirm();
    }

    public onClickFram1e(event) {
        // let delta = this.node.convertToNodeSpaceAR(event.getLocation());
        // if (delta.sub(this.btnClose.position).mag() <= 50) {
        //     // this.onClose();
        // }
    }
    // update (dt) {}
}
