import FightModel from "../FightModel";
import { Manager } from "../../../manager/Manager";
import { Cfg } from "../../../config/Cfg";
import { Notifier } from "../../../framework/Notifier";
import { NotifyID } from "../../../framework/NotifyID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuffUI extends cc.Component {

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null;

    @property(cc.ProgressBar)
    cdMask: cc.ProgressBar = null;

    @property(cc.Label)
    buffName: cc.Label = null;

    start() {
        Notifier.changeListener(true, NotifyID.Game_Update, this.updateReal, this);
    }


    public startBuff: boolean = false;
    private buffTime: number = 0;
    startCd(type: number, id: number, buffTime: number) {
        if (type == 2) {//武器
            let data = Cfg.Weapon.get(id);
            if (data) {
                this.buffName.string = data.name;
            } else {
                this.buffName.string = "";
            }
            Manager.spAtlas.getWeaponIcon(id).then(res => {
                this.itemSprite.spriteFrame = res;
            });
            this.buffTime = buffTime;
            this.time = 0;
            this.startBuff = true;
            this.cdMask.progress = 0;
        }else{
            let data = Cfg.Drop.get(id);
            if (data) {
                this.buffName.string = data.name;
            } else {
                this.buffName.string = "";
            }
            Manager.spAtlas.getToolIcon(id).then(res => {
                this.itemSprite.spriteFrame = res;
            });
            this.buffTime = buffTime;
            this.time = 0;
            this.startBuff = true;
            this.cdMask.progress = 0;
        }
    }

    private time: number = 0;
    updateReal(dt) {
        if (!FightModel.getInstance.isPause && this.startBuff) {
            this.time += dt;
            this.cdMask.progress = (1 - this.time / this.buffTime);
            if (this.time >= this.buffTime) {
                this.startBuff = false;
                this.node.active = false;
            }
        }
    }

    stopCd() {
        this.startBuff = false;
        this.node.active = false;
    }

    onDestroy(){
        Notifier.changeListener(false, NotifyID.Game_Update, this.updateReal, this);
    }

}
