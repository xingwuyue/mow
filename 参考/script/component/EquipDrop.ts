import { Cfg } from "../config/Cfg";
import { Manager } from "../manager/Manager";
import { Util } from "../utils/Util";
import { RoleManager } from "../manager/RoleManager";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { ToolManager } from "../manager/ToolManager";

const { ccclass, property } = cc._decorator;

let colorquality = [
    '#FFFFFF',
    '#FFFFFF',
    '#60ff00',
    '#0018ff',
    '#f000ff',
]

@ccclass
export default class EquipDrop extends cc.Component {

    @property(cc.Sprite)
    body: cc.Sprite = null;

    @property(cc.Sprite)
    bodylight: cc.Sprite = null;

    @property(cc.Node)
    purelight: cc.Node = null;

    @property(cc.Node)
    shadow: cc.Node = null;

    @property(cc.Node)
    goldIcon: cc.Node = null;

    @property(cc.Node)
    diamondIcon:cc.Node = null;

    private normalVec: cc.Vec2 = cc.v2(0, 1);
    private InsId: number = 0;
    private toTarget: boolean = false;
    public init(ind: number, equipId: number, num: number) {
        this.InsId = ind;
        this.purelight.active = false;
        this.toTarget = false;
        let data = Cfg.Equip.get(equipId);
        if (data) {
            this.purelight.active = data.quality >= 4;
            let bodyname = data.resIcon;
            if (equipId == 1) {
                this.goldIcon.active = true;
                this.diamondIcon.active = false;
                this.bodylight.spriteFrame = null;
                this.body.node.active = false;
            }
            else if (equipId == 2) {
                this.goldIcon.active = false;
                this.diamondIcon.active = true;
                this.bodylight.spriteFrame = null;
                this.body.node.active = false;
            }
            else {
                let droplistname = data.resIcon + "_1";
                Manager.spAtlas.getEquipDropIcon(droplistname).then(res => {
                    this.bodylight && (this.bodylight.spriteFrame = res);
                });
                this.goldIcon.active = false;
                this.diamondIcon.active = false;
                this.body.node.active = true;
                this.bodylight.node.color = cc.Color.WHITE.fromHEX(colorquality[data.quality] || '#FFFFFF');
                Manager.spAtlas.getEquipDropIcon(bodyname).then(res => {
                    this.body && (this.body.spriteFrame = res);
                });
            }
            this.startClosePlayer = false;
        }
    }

    // public getCoinName(num) {
    //     if (num <= 100) {
    //         return "icon_coin1";
    //     } else if (num <= 200) {
    //         return "icon_coin2";
    //     } else {
    //         return "icon_coin3";
    //     }
    // }
    private startClosePlayer: boolean = false;
    public startAction() {
        let dis = Util.random(20, 400);
        let a = Util.random(1, 2 * Math.PI * 1000);
        a = a / 1000;
        let newvec = this.normalVec.mul(dis).rotate(a);
        let targetVec = this.node.position.add(newvec);
        if (this.purelight.active) {
            this.purelight.runAction(cc.repeat(cc.sequence(cc.fadeTo(0.5, 76), cc.fadeTo(0.5, 255)), 10));
        }
        this.bodylight.node.runAction(cc.repeat(cc.sequence(cc.fadeTo(0.5, 76), cc.fadeTo(0.5, 255)), 10));
        let time = dis / 1200;
        this.node.runAction(cc.sequence(cc.moveTo(time, targetVec), cc.callFunc(() => {
            this.toTarget = true;
        }), cc.delayTime(4), cc.callFunc(() => {
            this.startClosePlayer = true;
        })));
    }

    public update(dt) {
        if (this.startClosePlayer) {
            let disVec = RoleManager.getInstance.mainRole.node.position.sub(this.node.position);
            let dislen = disVec.mag();
            disVec.normalizeSelf();
            let speed = disVec.mul(2000);
            this.node.position = this.node.position.add(speed.mul(dt));
            if (dislen <= 25) {
                this.startClosePlayer = false;
                this.purelight.stopAllActions();
                this.bodylight.node.stopAllActions();
                this.node.stopAllActions();
                ToolManager.getInstance.recycleEquyipDrop(this.InsId, this.node);
            }
        } else if (this.toTarget) {
            let disVec = RoleManager.getInstance.mainRole.node.position.sub(this.node.position);
            if (disVec.mag() <= 200) {
                this.startClosePlayer = true;
            }
        }
    }
}
