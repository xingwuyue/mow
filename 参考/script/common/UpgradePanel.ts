import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
import { GameVoManager } from "../manager/GameVoManager";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { WeaponCfg } from "../config/WeaponCfg";
import { Cfg } from "../config/Cfg";
import { Util } from "../utils/Util";
import { Const } from "../config/Const";
import { AlertManager } from "../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpgradePanel extends MVC.BaseView {

    @property(cc.Label)
    lb_name: cc.Label = null;

    @property(cc.Sprite)
    weaponSprite: cc.Sprite = null;

    @property(cc.Label)
    dqhl: cc.Label = null;

    @property(cc.Label)
    tjhl: cc.Label = null;

    @property(cc.Label)
    dqss: cc.Label = null;

    @property(cc.Label)
    tjss: cc.Label = null;

    @property(cc.Node)
    dqssNode: cc.Node = null;

    @property(cc.Node)
    tjssNode: cc.Node = null;

    @property(cc.Node)
    dqsmNode: cc.Node = null;

    @property(cc.Node)
    tjsmNode: cc.Node = null;

    @property(cc.Node)
    checkSign: cc.Node = null;

    @property(cc.Label)
    leftCost: cc.Label = null;

    @property(cc.Label)
    rightCost: cc.Label = null;

    _btnRight: number = 1;  // 1射速  2生命

    protected changeListener(enable: boolean): void {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this.initUI();
    }

    public initUI() {
        GameVoManager.getInstance.myUserVo.successTips = 0;//清零
        let weapon = Cfg.Weapon.get(GameVoManager.getInstance.myUserVo.defaultGunId);
        this.lb_name.string = weapon.name;
        Manager.spAtlas.getWeaponIcon(weapon.id).then((res) => {
            if (this.weaponSprite)
                this.weaponSprite.spriteFrame = res;
        });
        let lv_power = GameVoManager.getInstance.myUserVo.roleLvs[0] + 1;
        let lv_life = GameVoManager.getInstance.myUserVo.roleLvs[1] + 1;
        let lv_speed = 0;
        if (GameVoManager.getInstance.myUserVo.weaponList[GameVoManager.getInstance.myUserVo.defaultGunId]) {
            lv_speed = GameVoManager.getInstance.myUserVo.weaponList[GameVoManager.getInstance.myUserVo.defaultGunId][0] + 1;
        }
        let dq_power = Util.RolePowerAndLifeByLevel(lv_power).toFixed(1);
        this.dqhl.string = Util.numFormat(Number(dq_power)) + "%";
        this.checkSign.active = !!GameVoManager.getInstance.myUserVo.successTipsisCheck;
        let tj_power = Util.RolePowerAndLifeByLevel(lv_power + this.randNum()).toFixed(1);
        this.tjhl.string = Util.numFormat(Number(tj_power)) + "%";
        this.leftCost.string = `${Util.goldFormat(Util.getUpgradeFireGold())}`;

        if (lv_speed < Const.maxShootSpeedLv) {
            let dqsp = Util.WeaponSpeedAndPowerByLevel(lv_speed).toFixed(1);
            this.dqss.string = Util.numFormat(Number(dqsp)) + "%";
            this.dqssNode.active = true;
            this.tjssNode.active = true;
            this.dqsmNode.active = false;
            this.tjsmNode.active = false;
            this._btnRight = 1;
            let tushesu: number = 0;
            if (lv_speed > 47) {
                tushesu = 50;
            } else {
                tushesu = lv_speed + this.randNum();
            }
            let tj_speed = Util.WeaponSpeedAndPowerByLevel(tushesu).toFixed(1);
            this.tjss.string = Util.numFormat(Number(tj_speed)) + "%";
            this.rightCost.string = `${Util.goldFormat(Util.getUpgradeSpeedGold())}`;
        } else {
            this._btnRight = 2;
            this.dqssNode.active = false;
            this.tjssNode.active = false;
            this.dqsmNode.active = true;
            this.tjsmNode.active = true;
            let cursm = Util.RoleDoubleHitByLevel(lv_life);
            this.dqss.string = Util.numFormat(Number(cursm));
            let dq_sm = Util.RoleDoubleHitByLevel(lv_life + this.randNum());
            this.tjss.string = Util.numFormat(Number(dq_sm));
            this.rightCost.string = `${Util.goldFormat(Util.getUpgradeLifeGold())}`;
        }
    }

    public randNum() {
        return Math.ceil((Math.random() * 3));
    }

    onLeftClick() {
        Notifier.send(ListenID.Show_WeaponUpgrade, 0);
        this.onClose();
    }

    onRightClick() {
        let index = this._btnRight == 2 ? 0 : 1;
        Notifier.send(ListenID.Show_WeaponUpgrade, index);
        this.onClose();
    }

    onSelectClick() {
        GameVoManager.getInstance.myUserVo.successTipsisCheck = !!GameVoManager.getInstance.myUserVo.successTipsisCheck ? 0 : 1;
        this.checkSign.active = !!GameVoManager.getInstance.myUserVo.successTipsisCheck;
    }

    onStartClick() {
        if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
            AlertManager.showNormalTips(`体力不足，无法挑战`);
            return;
        }
        Notifier.send(ListenID.Close_FreeWeapon, 2);
        this.onClose();
    }

}
