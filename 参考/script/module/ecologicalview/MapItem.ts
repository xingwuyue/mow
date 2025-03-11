import { Util } from "../../utils/Util";
import { Manager } from "../../manager/Manager";
import { GameVoManager } from "../../manager/GameVoManager";

const { ccclass, property } = cc._decorator;

const namelist = ["圣地海岸", "废墟乐园", "幽深密林", "熔山孤地", "放逐海谷", "边陲遗岛"]

@ccclass
export default class MapItem extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;
    @property(cc.Sprite)
    icon_gray: cc.Sprite = null;
    @property(cc.Node)
    unlock: cc.Node = null;
    @property(cc.Node)
    lock: cc.Node = null;
    @property(cc.Label)
    lbname: cc.Label = null;
    @property(cc.Node)
    percent: cc.Node = null;

    initUI(index: number) {
        let chapter = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let idx = index + 1;
        if (chapter[1] == chapter[2]) {
            this.icon_gray.node.active = idx > chapter[0] + 1;
            this.unlock.active = idx <= chapter[0];
            this.lock.active = idx > chapter[0] + 1;
            this.percent.color = idx <= chapter[0] ? cc.Color.GREEN : cc.Color.GRAY;
        } else {
            this.icon_gray.node.active = idx > chapter[0];
            this.unlock.active = idx <= chapter[0] - 1;
            this.lock.active = idx > chapter[0];
            this.percent.color = idx <= chapter[0] - 1 ? cc.Color.GREEN : cc.Color.GRAY;
        }
        Manager.spAtlas.getEcological("map_" + index).then((res) => {
            this.icon.spriteFrame = res;
        })
        Manager.spAtlas.getEcological("map_gray_" + index).then((res) => {
            this.icon_gray.spriteFrame = res;
        })
        this.lbname.string = namelist[index];
    }

}
