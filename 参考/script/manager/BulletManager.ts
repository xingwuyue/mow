import { Notifier } from "../framework/Notifier";
import { NotifyID } from "../framework/NotifyID";
import { ObjectPool } from "../framework/collections/ObjectPool";
import { Bullet, BulletVo } from "../component/Bullet";
import { ListenID } from "../ListenID";
import { MVC } from "../framework/MVC";
declare interface BulletMap {
    [key: number]: Bullet
}
/*
 * 负责管理角色（敌人，玩家的产生，回收等）
 */

let generateBulletTag = (function genTag() {
    var tag = 1;
    function a() { tag += 1; return tag; };
    return a;
})();

export class BulletManager {
    private static _instance: BulletManager = null;
    private bulletNodePool: cc.NodePool[] = null;
    private warningNodePool: cc.NodePool = null;
    private bulletPrefabs: cc.Prefab[] = null;
    private bulletPool: ObjectPool<Bullet>;
    private warningPrefab: cc.Node = null;
    private isPause: number = 0;
    public static get getInstance(): BulletManager {
        if (BulletManager._instance == null) {
            BulletManager._instance = new BulletManager();
        }
        return BulletManager._instance;
    }

    /**子弹列表 */
    public _bulletList: BulletMap = {};


    public constructor() {
        this._bulletList = {};
        this.bulletNodePool = [];
        this.bulletPrefabs = [];
        this.bulletPool = new ObjectPool<Bullet>(function () {
            return new Bullet();
        });
        this.warningNodePool = new cc.NodePool();
        this.changeListener(true);
    }

    public changeListener(enable: boolean) {
        Notifier.changeListener(enable, NotifyID.Game_Update, this.update, this);
        Notifier.changeListener(enable, ListenID.Fight_RecycleBullet, this.removeBullet, this);
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.gamePause, this);
        Notifier.changeListener(enable, ListenID.Fight_RecycleObj, this.fightEnd, this);
        Notifier.changeListener(enable, ListenID.Game_FightBackToHome, this.fightEnd, this);
    }


    public gamePause(boo: boolean) {
        if (boo) {
            this.isPause++;
        } else {
            this.isPause--;
        }
    }

    public update(dt) {
        if (this.isPause > 0) return;
        for (const key in this._bulletList) {
            let bullet = this._bulletList[key];
            if (bullet && !bullet.isDead)
                bullet.update(dt);
        }
    }


    public addBullePrefabByType(type: number, prefab: cc.Prefab) {
        this.bulletPrefabs[type] = prefab;
        // if (type == 5 || type == 34) {
        //     // for (let i = 0; i < 10; i++) {
        //     let node = cc.instantiate(prefab);
        //     this.pushBulletNodeByType(type, node);
        //     // }
        // }
    }

    public addWarningPrefab(prefab: cc.Node) {
        this.warningPrefab = prefab;
        // for (let i = 0; i < 3; i++) {
        this.warningNodePool.put(cc.instantiate(prefab));
        // }
    }

    public pushBulletNodeByType(id, node: cc.Node) {
        if (!this.bulletNodePool[id]) {
            this.bulletNodePool[id] = new cc.NodePool();
        }
        this.bulletNodePool[id].put(node);
    }

    /**
    * 增加一个子弹vo
    * @param node 
    * @param monVo 
    */
    public addBullet(node: cc.Node, bulletVo: BulletVo): Bullet {
        let id = generateBulletTag();
        let Bullet = this.bulletPool.pop();
        bulletVo.insId = id;
        Bullet.init(id, node, bulletVo);
        this._bulletList[id] = Bullet;
        return Bullet;
    }

    public popBulletNodeByType(id: number = 1): cc.Node {
        if (!this.bulletNodePool[id]) {
            this.bulletNodePool[id] = new cc.NodePool();
        }
        let node = this.bulletNodePool[id].get();
        if (!node) {
            if (!this.bulletPrefabs[id]) {
                MVC.ComponentHandler.loadAssetHandler('bullet' + id, `bullet/bullet${id}`, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                    }
                    else {
                        this.bulletPrefabs[id] = prefab;
                    }
                }, null, null);
                return null;
            } else {
                node = cc.instantiate(this.bulletPrefabs[id]);
            }
        }
        return node;
    }

    public popWarningNode(): cc.Node {
        let node = this.warningNodePool.get();
        if (!node) {
            if (!this.warningPrefab) {
                MVC.ComponentHandler.loadAssetHandler('warning', `ui/warning`, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                    let prefab: cc.Prefab = assets as cc.Prefab;
                    if (prefab == null) {
                        cc.error(".loadCallback GameObject null:" + name);
                    }
                    else {
                        this.warningPrefab = cc.instantiate(prefab);
                    }
                }, null, null);
                return null;
            }
            else {
                node = cc.instantiate(this.warningPrefab);
            }
        }
        return node;
    }

    public removeBullet(insId: number) {
        let bullet = this._bulletList[insId];
        if (bullet) {
            // bullet.resetStreak();
            this.bulletNodePool[bullet.bulletType].put(bullet.node);
            bullet.node = null;
            this.bulletPool.push(bullet);
            delete this._bulletList[insId];
        } else {
            console.error("insId remove fail", insId);
        }
    }

    public fightEnd(boo) {
        for (let key in this._bulletList) {
            let bullet = this._bulletList[key];
            if (bullet) {
                // bullet.resetStreak();
                this.bulletNodePool[bullet.bulletType].put(bullet.node);
                bullet.node = null;
                this.bulletPool.push(bullet);
                delete this._bulletList[key];
            } else {
                console.error("insId remove fail", key);
            }
        }
    }
}