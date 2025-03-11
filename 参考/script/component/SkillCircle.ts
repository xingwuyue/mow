import { Const } from "../config/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillCircle extends cc.Component {

    @property(cc.Node)
    circle1: cc.Node = null;

    @property(cc.Node)
    circle2: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    public toolType: number = 0;
    onLoad() {
        this.circle2.colliderComponent = this;
        this.circle1.group = Const.GroupBomb;
        this.circle2.group = Const.GroupBomb;
        this.circle1.colliderComponent = this;
    }
    public skillParam: number[] = [];
    public skillId:number = 0;
    public init(param: any, skillId:number) {
        this.circle1.y = -param[2];
        this.circle2.y = param[2];
        this.skillParam = param;
        this.skillId = skillId;
    }

    start() {

    }

    // update (dt) {}
}
