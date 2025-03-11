import { Manager } from "./Manager";

declare interface AtlasMap {
    [key: string]: cc.SpriteAtlas;
}

export class SpriteAtlasManager {
    public constructor() {

    }

    private _spriteatlas: AtlasMap = {};
    public getWeaponIcon(id: string | number): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["weaponIcon"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("weaponIcon", "icon/weaponIcon", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["weaponIcon"] = resource;
                    resolve(resource.getSpriteFrame("weapon" + id));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame("weapon" + id));
            }
        });
    }
    public getToolIcon(id: string | number): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["toolIcon"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("toolIcon", "icon/toolIcon", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["toolIcon"] = resource;
                    resolve(resource.getSpriteFrame("drop" + id));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame("drop" + id));
            }
        });
    }

    public getToolNameSprite(id: string | number): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["toolIcon"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("toolIcon", "icon/toolIcon", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["toolIcon"] = resource;
                    resolve(resource.getSpriteFrame("dname" + id));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame("dname" + id));
            }
        });
    }

    public getDiamondIcon(id: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["getDiamond"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("getDiamond", "getDiamond/diamond", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["getDiamond"] = resource;
                    resolve(resource.getSpriteFrame(id))
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(id));
            }
        });
    }

    public getMonsterBuffIcon(id: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["monList"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("monList", "actor/monList", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["monList"] = resource;
                    resolve(resource.getSpriteFrame(id))
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(id));
            }
        });
    }

    public getSpecialProIcon(id: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["mainPlayer"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("mainPlayer", "ui/menu/mainPlayer", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["mainPlayer"] = resource;
                    resolve(resource.getSpriteFrame(id))
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(id));
            }
        });
    }


    public getMember(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("member", "ui/member/0member", spName).then(resolve).catch(reject);
        });
    }

    public getResult(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("result", "ui/result/resultView", spName).then(resolve).catch(reject);
        });
    }

    public getIOSMenu(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("menu", "ui/menu/menu", spName).then(resolve).catch(reject);
        });
    }

    public getCommon(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("menu", "ui/common/commonUI", spName).then(resolve).catch(reject);
        });
    }

    public getMenu(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("menu", "ui/menu/menu", spName).then(resolve).catch(reject);
        });
    }

    public getMainDraw(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("draw", "ui/draw/maindraw", spName).then(resolve).catch(reject);
        });
    }

    public getItem(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("equip", "ui/equip/equip", spName).then(resolve).catch(reject);
        });
    }

    public getEcological(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("ecological", "ui/ecological/ecological", spName).then(resolve).catch(reject);
        });
    }

    public getFunUnlock(spName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this._getSpriteFrame("fununlocktips", "ui/tips/fununlocktips/fununlocktips", spName).then(resolve).catch(reject);
        });
    }
    /** 
     * @author cls
     * @description 图集中获取精灵帧,如果图集没被加载，则加载图集再获取
     */
    private async _getSpriteFrame(atlasName: string, atlasPath: string, spFrameName: string): Promise<cc.SpriteFrame> {
        let _this = this;
        return new Promise((resolve, reject) => {
            let atlas = _this._spriteatlas[atlasName];
            if (atlas) {
                resolve(atlas.getSpriteFrame(spFrameName));
            } else {
                Manager.loader.LoadAssetAsync(atlasName, atlasPath, cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    _this._spriteatlas[atlasName] = resource;
                    resolve(resource.getSpriteFrame(spFrameName))
                }, _this, "");
            }
        })
    }
    public getResIcon(id: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["resIcon"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("resIcon", "icon/resIcon", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["resIcon"] = resource;
                    resolve(resource.getSpriteFrame(id));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(id));
            }
        });
    }

    /**获取章节名字 */
    public getChapterName(id: number): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["newMenu"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("newMenu", "ui/menu/NewMenu", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["newMenu"] = resource;
                    resolve(resource.getSpriteFrame("title" + id));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame("title" + id));
            }
        });
    }

    public getEquipDropIcon(spName: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["equipDropIcon"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("equipDropIcon", "icon/equipDropIcon", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["equipDropIcon"] = resource;
                    resolve(resource.getSpriteFrame(spName));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(spName));
            }
        });
    }

    public getEquipPartIcon(spName: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["equipIntensify"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("equipIntensify", "ui/equip/equipIntensify", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["equipIntensify"] = resource;
                    resolve(resource.getSpriteFrame(spName));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(spName));
            }
        });
    }

    public getEquipIcon(spName: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["equip"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("equip", "ui/equip/equip", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["equip"] = resource;
                    resolve(resource.getSpriteFrame(spName));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(spName));
            }
        });
    }

    public getSkillIcon(id: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["skillIcon"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("skillIcon", "icon/skillIcon", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["skillIcon"] = resource;
                    resolve(resource.getSpriteFrame(id));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(id));
            }
        });
    }

    public getEventIcon(id: string): Promise<cc.SpriteFrame> {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let spriteAtlas = this1._spriteatlas["eventIcon"];
            if (spriteAtlas == null) {
                Manager.loader.LoadAssetAsync("eventIcon", "icon/eventIcon", cc.SpriteAtlas, (name: string, resource: cc.SpriteAtlas, asset: string) => {
                    this1._spriteatlas["eventIcon"] = resource;
                    resolve(resource.getSpriteFrame(id));
                }, this1, "");
            } else {
                resolve(spriteAtlas.getSpriteFrame(id));
            }
        });
    }
}
