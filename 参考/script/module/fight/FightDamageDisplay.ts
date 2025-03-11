
import { MVC } from "../../framework/MVC";

export class FightDamageDisplay {
    public static _instance: FightDamageDisplay;
    private _root: cc.Node;
    private _objectPool: cc.NodePool;
    public constructor() {
        this._objectPool = new cc.NodePool();
    }
    public static get getInstance(): FightDamageDisplay {
        if (FightDamageDisplay._instance == null) {
            FightDamageDisplay._instance = new FightDamageDisplay();
        }
        return FightDamageDisplay._instance;
    }
    private hurtCountList = {};
    private hurtpos: number = 100;
    public resetCount() {
        this.hurtCountList = {};
    }
    public showHurt(num: number, pos: cc.Vec2, parent: cc.Node, monid: number, isBaoji: boolean = false, isDirectKill: boolean = false, param:any = null) {
        let node = this._objectPool.get();
        if (!node) {
            MVC.ComponentHandler.loadAssetHandler("DamageDisplay", "ui/hurt", cc.Prefab, (name: string, asset: object, assetspath: string, args): void => {
                let prefab: cc.Node = asset as cc.Node;
                if (prefab == null) {
                    cc.error(".loadCallback GameObject null:" + name);
                    return;
                }
                let node: cc.Node = cc.instantiate<cc.Node>(prefab);
                this._showHurt(node, num, pos, parent, monid, isBaoji, isDirectKill,param);
            }, null, null);
        } else {
            this._showHurt(node, num, pos, parent, monid, isBaoji, isDirectKill,param);
        }
    }
    private vec: cc.Vec2 = cc.v2(0, 100);
    private _showHurt(node: cc.Node, num: number, pos: cc.Vec2, parent: cc.Node, monid: number, isBaoji: boolean = false, isDirectKill: boolean = false, param:any = null): void {
        if (!this.hurtCountList[monid]) {
            this.hurtCountList[monid] = 0;
        }
        this.hurtCountList[monid] += 1;
        if (this.hurtCountList[monid] > 7) {
            this.hurtCountList[monid] = 7;
        }
        node.setParent(parent);
        node.position = pos;
        node.y += (this.hurtCountList[monid] - 1) * 25;
        if (monid == 0) {
            node.color = num >= 0 ? cc.Color.WHITE.fromHEX("#8fd900") : cc.Color.WHITE;
        } else {
            if(param){
                if(param.type == 30){
                    node.color = cc.Color.WHITE.fromHEX("#b178ff");
                }else if(param.type == 31){
                    node.color = cc.Color.WHITE.fromHEX("#ff8c1c");
                }
            }else{
                node.color = num >= 0 ? cc.Color.WHITE.fromHEX("#8fd900") : cc.Color.WHITE.fromHEX("#e25744");
            }
        }
        let scale = 1;
        node.opacity = 255;
        node.scale = 0.1;
        if (isBaoji) {
            node.getComponent(cc.Label).string = `#${Math.abs(num)}`;
            node.color = cc.Color.WHITE.fromHEX("#ff9921");
            scale = 2;
            let action1 = cc.moveBy(0.3, this.vec);
            let action3 = cc.scaleTo(0.2, scale);
            let action = cc.spawn(action1, action3);
            let action2 = cc.fadeOut(0.3);
            let action4 = cc.scaleTo(0.2, 1.7);
            node.runAction(cc.sequence(action, action4, action2, cc.callFunc(() => {
                this.hurtCountList[monid]--;
                if (this.hurtCountList[monid] < 0) {
                    this.hurtCountList[monid] = 0;
                }
                this._objectPool.put(node);
            })));
        } else if (isDirectKill) {
            node.getComponent(cc.Label).string = '!';
            node.color = cc.Color.WHITE;
            scale = 1.5;
            let action1 = cc.moveBy(0.3, this.vec);
            let action3 = cc.scaleTo(0.2, scale);
            let action = cc.spawn(action1, action3);
            let action2 = cc.fadeOut(0.3);
            let action4 = cc.scaleTo(0.2, 1.7);
            node.runAction(cc.sequence(action, action4, action2, cc.callFunc(() => {
                this.hurtCountList[monid]--;
                if (this.hurtCountList[monid] < 0) {
                    this.hurtCountList[monid] = 0;
                }
                this._objectPool.put(node);
            })));
        }
        else {
            if (monid == 0) {
                scale = 2;
            }
            if (monid == 0 && num == 0) {
                node.color = cc.Color.WHITE;
                node.getComponent(cc.Label).string = '$';
                scale = 1.5;
            } else {
                let str = "";
                if (num > 0) str = "+";
                node.getComponent(cc.Label).string = `${str}${num}`;
            }

            let action1 = cc.moveBy(0.4, this.vec);
            let action3 = cc.scaleTo(0.4, scale).easing(cc.easeOut(3.0));
            let action = cc.spawn(action1, action3);
            let action2 = cc.fadeOut(0.3);
            node.runAction(cc.sequence(action, action2, cc.callFunc(() => {
                this.hurtCountList[monid]--;
                if (this.hurtCountList[monid] < 0) {
                    this.hurtCountList[monid] = 0;
                }
                this._objectPool.put(node);
            })));
        }
        // this.hurtpos = -this.hurtpos;
    }
}
