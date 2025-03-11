import { Util } from "../utils/Util";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
declare interface NodeMap {
    [key: number]: cc.NodePool,
}
/**
 * 地图管理
 */
export class MapManager {
    private mapBgPath = "scene/map";
    private decoratePath = "scene/decorate";
    private curMapId: number = 0;
    private bgList: NodeMap = cc.js.createMap();
    private decList: NodeMap = cc.js.createMap();
    public constructor() {

    }

    public setMapByChapterId(chapterId: number, bgParent: cc.Node, decParent?: cc.Node) {
        if (this.curMapId == chapterId) {
            Notifier.send(ListenID.Map_addMapBgSuccess, this.curMapId, false);
            return;
        }
        if (bgParent && bgParent.children[0]) {
            this.recycleBgByChapterId(this.curMapId, bgParent.children[0])
        }
        if (decParent && decParent.children[0]) {
            this.recycleDecorateByChapterId(this.curMapId, decParent.children[0]);
        }
        this.curMapId = chapterId;
        this.createMapBgByChapterId(chapterId, (node) => {
            bgParent.addChild(node);
            Notifier.send(ListenID.Map_addMapBgSuccess, this.curMapId, true);
        });
        this.createMapDecorateByChapterId(chapterId, (node) => {
            decParent && (decParent.addChild(node));
            Notifier.send(ListenID.Map_addMapDecorateSuccess, this.curMapId);
        })
    }
//weixin ： vip-v66666
    public createMapBgByChapterId(id: number, cb?: Function) {
        if (!this.bgList[id]) {
            this.bgList[id] = new cc.NodePool();
        }
        let node = this.bgList[id].get();
        if (!node) {
            Util.loadPrefab(this.mapBgPath + "/bg" + id).then(res => {
                cb && cb(res);
            })
        } else {
            cb && cb(node);
        }
    }

    public createMapDecorateByChapterId(id: number, cb?: Function) {
        if (!this.decList[id]) {
            this.decList[id] = new cc.NodePool();
        }
        let node = this.decList[id].get();
        if (!node) {
            Util.loadPrefab(this.decoratePath + "/decorate" + id).then(res => {
                cb && cb(res);
            })
        } else {
            cb && cb(node);
        }
    }

    public recycleBgByChapterId(id, bgNode: cc.Node) {
        if (!this.bgList[id]) {
            this.bgList[id] = new cc.NodePool();
        }
        this.bgList[id].put(bgNode);
    }
    public recycleDecorateByChapterId(id, decNode: cc.Node) {
        if (!this.decList[id]) {
            this.decList[id] = new cc.NodePool();
        }
        this.decList[id].put(decNode);
    }
}
