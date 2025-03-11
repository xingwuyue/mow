import { Util } from "../../utils/Util";
import { GameVoManager } from "../../manager/GameVoManager";

const { ccclass, property } = cc._decorator;

export declare interface BossRankItemVo {
    avatarUrl: string;
    nickName: string;
    score: number,
    open_id: string,
}

@ccclass
export default class BossRankItem extends cc.Component {

    @property(cc.Node)
    rankIconNum: cc.Node = null;

    // @property(cc.Node)


    public levelText: cc.Label = null;
    public playHead: cc.Node = null;
    public rankText: cc.Label = null;
    public playName: cc.Label = null;
    public itemID: number = 0;
    bg: cc.Node;
    start() {

    }

    init(index: number, data: BossRankItemVo, rank: string) {
        this.itemID = index;
        if (!this.playHead) {
            this.playHead = this.node.getChildByName("playHead");
        }
        if (!this.levelText) {
            this.levelText = this.node.getChildByName("levelText").getComponent(cc.Label);
        }
        if (!this.rankText) {
            this.rankText = this.node.getChildByName("rankText").getComponent(cc.Label);
        }
        if (!this.playName) {
            this.playName = this.node.getChildByName("playName").getComponent(cc.Label);
        }
        if (!this.bg) {
            this.bg = this.node.getChildByName("bg");
        }

        let ranknum = Number(rank);
        if (!isNaN(ranknum) && ranknum <= 3) {
            this.rankText.node.active = false;
            this.rankIconNum.active = true;
            for (let i = 0; i < 3; i++) {
                this.rankIconNum.children[i].active = i == (ranknum - 1);
            }
        } else {
            this.rankText.node.active = true;
            this.rankIconNum.active = false;
        }

        if (data) {
            let iself = true;
            this.bg.color = iself ? cc.Color.WHITE.fromHEX('#a96f6c') : cc.Color.WHITE.fromHEX('#6a5150');
            this.rankText.string = rank;
            Util.setSprite(this.playHead, data.avatarUrl);
            let playername = iself ? GameVoManager.getInstance.myUserVo.nickName : data.nickName;
            this.playName.string = Util.normalName(playername || "name", 6);
            this.levelText.string = `${data.score}`;
            // try {
            //     if (data.avatarUrl != '' && data.avatarUrl.indexOf("http") != -1) {
            //         Util.setAvatarSprite(this.playHead, data.avatarUrl + "?a=a.jpg");
            //         this.playHead.active = true;
            //     } else {
            //         this.playHead.active = false;
            //     }
            // }
            // catch (error) {
            //     // console.log(error);
            // }
        } else {
            this.bg.color = cc.Color.WHITE.fromHEX('#6a5150');
            this.rankText.string = rank;
            this.playName.string = "虚位以待";
            this.levelText.string = `${0}`;
        }
    }

    // update (dt) {}
}
