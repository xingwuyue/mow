import { MVC } from "../../framework/MVC";
import { Manager } from "../../manager/Manager";

const {ccclass, property} = cc._decorator;

let monsterTransform = [
    {x: -251, y: 62, rotation: 96},
    {x: -183, y: -65, rotation: 69},
    {x: -157, y: 16, rotation: 109},
    {x: -99, y: -42, rotation: 85},
    {x: -28, y: -126, rotation: 61}
];

let find = cc.find;

@ccclass
export default class WeaponDisplay extends MVC.BaseView {
    @property(cc.Node)
    actorNode: cc.Node = null;

    @property(cc.Node)
    bullect: cc.Node = null;

    private _monsterList: Array<cc.Node> = [];
    private _isPlay = false;

    changeListener(){}

    onOpen(){
        this._isPlay = false;
        this._initStage();
        this.scheduleOnce(() => {
            this._showWeaponAction(122);
        }, 0.3);
    }

    private _initStage(){
        for(let i = 1; i <= 5; ++i){
            let monster = find("m" + i, this.actorNode);
            let transform = monsterTransform[i - 1];
            monster.x = transform.x;
            monster.y = transform.y;
            monster.rotation = transform.rotation;
            monster.scale = 1;
            this._monsterList[i - 1] = monster;
        }
    }

    private _showWeaponAction(weaponID: number){
        this._isPlay = true;
        let anim = this.bullect.getComponent(cc.Animation) as cc.Animation;
        anim.on('finished', this._onAnimFinished, this);
        switch(weaponID){
            case 122: {//黑洞
                anim.play(weaponID.toString());
                let effectiveTime = 50 / 60;
                this.scheduleOnce(() => {
                    for(let i = 0; i < 5; ++i){
                        let m = this._monsterList[i];
                        let duration = 0.4;
                        m.runAction(cc.moveTo(duration, this.bullect.position));
                        m.runAction(cc.rotateBy(duration, 180));
                        m.runAction(cc.scaleTo(duration, 0));
                    }
                }, effectiveTime);
            }
        }
    }

    public onReplay(){
        if(this._isPlay) return;
        this._initStage();
        this._showWeaponAction(122);
    }

    private _onAnimFinished(){
        this._isPlay = false;
        this.scheduleOnce(() => {
            this.onReplay();
        }, 1.5);
        let anim = this.bullect.getComponent(cc.Animation) as cc.Animation;
        anim.off('finished', this._onAnimFinished, this);
    }
}
