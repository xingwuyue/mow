import { MVC } from "../../framework/MVC";
import { Cfg } from "../../config/Cfg";
import { Util } from "../../utils/Util";
import { Const } from "../../config/Const";
declare interface dropMap {
    [key: number]: {
        allWeight: number,
        droplist: number[][],
    }
}

declare interface AllDropMap {
    [key: number]: dropMap;
}

export class DropModel extends MVC.BaseModel {
    private static _instance: DropModel = null;
    public constructor() {
        super();
        if (DropModel._instance == null) {
            DropModel._instance = this;
        }
    }
    public reset(): void {

    }

    private packages: AllDropMap = {};
    public static get getInstance(): DropModel {
        if (DropModel._instance == null) {
            DropModel._instance = new DropModel();
        }
        return DropModel._instance;
    }

    public initDropPool(id: number) {
        let packages: dropMap = {};
        if (id != 0) {
            if (this.packages[id]) return;
            let data = Cfg.DropPool.filter({ poolId: id });
            if (data.length <= 0) {
                console.warn("no goods in ", id);
                return;
            }
            else {
                let len = data.length;
                for (let i = 0; i < len; i++) {
                    let packid = data[i].packId;
                    if (packages[packid]) {
                        // if (data[i].goodsNum > 0) {
                        packages[packid].allWeight += data[i].weight;
                        let packweight = packages[packid].allWeight;
                        packages[packid].droplist.push([data[i].type, data[i].goodsId, data[i].goodsNum, packweight]);
                        // }
                    } else {
                        packages[packid] = {
                            allWeight: data[i].weight,
                            droplist: [[data[i].type, data[i].goodsId, data[i].goodsNum, data[i].weight]],
                        }
                    }
                }
            }
        }
        return packages;
    }

    public getRewardByDropPoolId(id: number) {
        if (!this.packages[id]) {
            this.packages[id] = this.initDropPool(id);
        }
        let goodslist = [];
        let index = 0;
        let packages = this.packages[id];
        for (let dropKey in packages) {
            let drop = packages[dropKey];
            if (drop.allWeight > 0) {
                let ad = Util.random(1, drop.allWeight);
                let droplist = drop.droplist;
                let s = 0;
                let e = droplist.length - 1;
                index = Math.floor((s + e) / 2);
                while (s < e && ad != droplist[index][3]) {
                    if (droplist[index][3] > ad) {
                        e = index - 1;
                    } else {
                        s = index + 1;
                    }
                    index = Math.floor((s + e) / 2);
                }
                index = cc.misc.clampf(index, 0, droplist.length - 1);
                if (droplist[index][3] < ad) {
                    if (index < droplist.length - 1) {
                        index += 1;
                    }
                }
                if (droplist[index][2])
                    goodslist.push(droplist[index]);
            }
        }
        return goodslist;
    }
}
