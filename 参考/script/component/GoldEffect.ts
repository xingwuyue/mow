import { Util } from "../utils/Util";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";

const { ccclass, property } = cc._decorator

@ccclass
export default class GoldEffect extends cc.Component {

    @property(cc.SpriteFrame)
    iconSpriteFrame: cc.SpriteFrame[] = [];

    _allcoinPos: cc.Vec2[] = []
    _coinList: cc.Node[] = [];
    start() { }

    playEffect(goodsNum: number | string = 0, targetPos: cc.Vec2, offsetTime: number = 0, moveTime: number = 0, iconType = 1) {
        targetPos = cc.v2(targetPos.x - this.node.x, targetPos.y - this.node.y);
        if (!this._allcoinPos[0]) {
            let i = 0
            this.node.children.forEach(coin => {
                // if (iconType == 1) {
                if (coin && coin.name == "coin") {
                    coin.name = '' + i
                    i++
                    let pos = cc.v2(coin.x, coin.y)
                    coin.opacity = 255;
                    coin.getComponent(cc.Sprite).spriteFrame = this.iconSpriteFrame[iconType - 1];
                    this._allcoinPos.push(pos)
                    this._coinList.push(coin);
                }
                // } 
                // else if (iconType == 2) {
                //     if (coin && coin.name != 'goldNum' && coin.name != "coin") {
                //         coin.name = '' + i
                //         i++
                //         let pos = cc.v2(coin.x, coin.y)
                //         coin.opacity = 255;
                //         this._allcoinPos.push(pos)
                //         this._coinList.push(coin);
                //     }
                // }
            })
        }
        let goldNum = this.node.getChildByName('goldNum');
        goldNum.stopAllActions()
        goldNum.y = 0
        goldNum.opacity = 255
        goldNum.getComponent(cc.Label).string = '+' + Util.goldFormat(Number(goodsNum));
        if (!goodsNum) {
            goldNum.active = false;
        } else {
            goldNum.active = true;
            let coin = goldNum.getChildByName("coin").getComponent(cc.Sprite);
            coin.spriteFrame = this.iconSpriteFrame[iconType - 1];
            goldNum.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, 200)), cc.fadeTo(0.1, 0)))
        }
        let endNum = 0;
        let maxC = this._coinList.length
        for (let y = 0; y < maxC; y++) {
            let coin = this.node.getChildByName(y + '')
            if (coin && coin.name != 'goodsNum') {
                let ranx = Math.floor(Math.random() * 300 - 150)
                let rany = Math.floor(Math.random() * 300 - 150)
                let rant = Math.abs(Math.random() - 0.5)
                if (rant < 0.2) {
                    rant += 0.1
                }
                rant += offsetTime + moveTime;
                coin.stopAllActions()
                coin.setScale(0.3)
                coin.opacity = 18
                coin.x = 0
                coin.y = 0
                coin.runAction(
                    cc.sequence(
                        cc.spawn(
                            cc.scaleTo(0.2 + offsetTime / 2, 0.65),
                            cc.fadeTo(0.2 + offsetTime / 2, 255),
                            cc.moveTo(0.2 + offsetTime, cc.v2(this._allcoinPos[y].x + ranx, this._allcoinPos[y].y + rany))
                        ),
                        cc.moveTo(rant, targetPos),
                        cc.scaleTo(0.2, 1.2, 1.2),
                        cc.fadeOut(0.1),
                        cc.callFunc(() => {
                            endNum++;
                            if (endNum >= maxC) {
                                Notifier.send(ListenID.GoldEffect_End);
                            }
                            if (endNum == 1) {
                                Manager.audio.playAudio(511);
                            }
                        })
                    )
                )
            }
        }
    }

    stopEffect() {
        this.node.children.forEach(coin => {
            if (coin) {
                coin.stopAllActions()
                coin.opacity = 0
            }
        })
        this._coinList = [];
    }

    // update (dt) {}
}
