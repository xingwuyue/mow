import { GameVoManager } from "../manager/GameVoManager";
import { Manager } from "../manager/Manager";
import { Const } from "../config/Const";
import { Util } from "../utils/Util";
import { Common_UIPath } from "../common/Common_Define";
import { ListenID } from "../ListenID";
import { Notifier } from "../framework/Notifier";
import { Cfg } from "../config/Cfg";

/**
 * UI角色类
 */
export class UIRole {

    private _role: cc.Node = null;
    private weaponIcon: cc.Node = null;
    private weaponId: number = 0;
    public constructor() {
    }

    public init(node: cc.Node) {
        if (node) {
            this._role = node;
            this.weaponIcon = cc.find("weaponNode/weapon", this._role);
            this.setWeaponPos();
        }
        this.changeListener(true);
    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Change_Weapon, this.setWeaponPos, this);
    }

    public setRoleNode(node: cc.Node) {
        this.init(node);
    }

    public get node() {
        return this._role;
    }

    public destroy() {
        this.changeListener(false);
        this._role = null;
    }

    public setWeaponPos() {
        if (!this.weaponIcon) return;
        let id = GameVoManager.getInstance.myUserVo.defaultGunId;
        if (this.weaponId == id) return;
        this.weaponId = id;
        let info = Const.MainWeaponPos[id];
        let modelid: number | string = id;
        if (!info) {
            let data = Cfg.Weapon.get(id);
            if (!data) return;
            modelid = data.resPath.substring(6);
            info = Const.MainWeaponPos[modelid];
            if (!info) return;
        }
        this.weaponIcon.position = cc.v2(info.pos.x, info.pos.y);
        this.weaponIcon.scale = info.scale;
        this.weaponIcon.scaleX = -this.weaponIcon.scaleX;
        this.weaponIcon.rotation = info.rotate;
        Manager.spAtlas.getWeaponIcon(modelid).then((res) => {
            this.weaponIcon.getComponent(cc.Sprite).spriteFrame = res;
        })
    }
}

export class UIRoleManager {
    private static _nodePool: cc.NodePool = null;
    public static getUIRole(callback: Function) {
        let node: cc.Node = null;
        if (!UIRoleManager._nodePool) {
            UIRoleManager._nodePool = new cc.NodePool();
        }
        node = UIRoleManager._nodePool.get();
        if (!node) {
            Util.loadPrefab(Common_UIPath.UIRolePath).then(res => {
                node = res;
                callback && callback(node);
            })
        } else {
            callback && callback(node);
        }
    }

    public static recycleUIRole(uirole: UIRole) {
        if (!UIRoleManager._nodePool) {
            UIRoleManager._nodePool = new cc.NodePool();
        }
        if (uirole) {
            UIRoleManager._nodePool.put(uirole.node);
            uirole.destroy();
        }
    }
}
