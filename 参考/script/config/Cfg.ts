import { BarrierCfgReader } from "./BarrierCfg";
import { BattleLevelCfgReader } from "./BattleLevelCfg";
import { BossCfgReader } from "./BossCfg";
import { BulletCfgReader } from "./BulletCfg";
import { ChapterCfgReader } from "./ChapterCfg";
import { DialCfgReader } from "./DialCfg";
import { DropPoolCfgReader } from "./DropPoolCfg";
import { DropPreviewCfgReader } from "./DropPreviewCfg";
import { DropCfgReader } from "./DropCfg";
import { EcologicalCfgReader } from "./EcologicalCfg";
import { EquipUnlockCfgReader } from "./EquipUnlockCfg";
import { EquipCfgReader } from "./EquipCfg";
import { EventCfgReader } from "./EventCfg";
import { GuideCfgReader } from "./GuideCfg";
import { HandbookCfgReader } from "./HandbookCfg";
import { IntensifyCfgReader } from "./IntensifyCfg";
import { MonsterCfgReader } from "./MonsterCfg";
import { NickNameCfgReader } from "./NickNameCfg";
import { RemouldCfgReader } from "./RemouldCfg";
import { RoleLevelCfgReader } from "./RoleLevelCfg";
import { ShieldCfgReader } from "./ShieldCfg";
import { SignCfgReader } from "./SignCfg";
import { SkillPoolCfgReader } from "./SkillPoolCfg";
import { SkillCfgReader } from "./SkillCfg";
import { SoundCfgReader } from "./SoundCfg";
import { StoreCfgReader } from "./StoreCfg";
import { SurpriseCfgReader } from "./SurpriseCfg";
import { TaskCfgReader } from "./TaskCfg";
import { UnlockSystemCfgReader } from "./UnlockSystemCfg";
import { WeaponCfgReader } from "./WeaponCfg";


import LZString = require("../common/lzstring");
import { Const } from "./Const";
class _Cfg {
    
    private _Barrier = new BarrierCfgReader();
    public get Barrier() : BarrierCfgReader {
        return this._Barrier;
    }
    private _BattleLevel = new BattleLevelCfgReader();
    public get BattleLevel() : BattleLevelCfgReader {
        return this._BattleLevel;
    }
    private _Boss = new BossCfgReader();
    public get Boss() : BossCfgReader {
        return this._Boss;
    }
    private _Bullet = new BulletCfgReader();
    public get Bullet() : BulletCfgReader {
        return this._Bullet;
    }
    private _Chapter = new ChapterCfgReader();
    public get Chapter() : ChapterCfgReader {
        return this._Chapter;
    }
    private _Dial = new DialCfgReader();
    public get Dial() : DialCfgReader {
        return this._Dial;
    }
    private _DropPool = new DropPoolCfgReader();
    public get DropPool() : DropPoolCfgReader {
        return this._DropPool;
    }
    private _DropPreview = new DropPreviewCfgReader();
    public get DropPreview() : DropPreviewCfgReader {
        return this._DropPreview;
    }
    private _Drop = new DropCfgReader();
    public get Drop() : DropCfgReader {
        return this._Drop;
    }
    private _Ecological = new EcologicalCfgReader();
    public get Ecological() : EcologicalCfgReader {
        return this._Ecological;
    }
    private _EquipUnlock = new EquipUnlockCfgReader();
    public get EquipUnlock() : EquipUnlockCfgReader {
        return this._EquipUnlock;
    }
    private _Equip = new EquipCfgReader();
    public get Equip() : EquipCfgReader {
        return this._Equip;
    }
    private _Event = new EventCfgReader();
    public get Event() : EventCfgReader {
        return this._Event;
    }
    private _Guide = new GuideCfgReader();
    public get Guide() : GuideCfgReader {
        return this._Guide;
    }
    private _Handbook = new HandbookCfgReader();
    public get Handbook() : HandbookCfgReader {
        return this._Handbook;
    }
    private _Intensify = new IntensifyCfgReader();
    public get Intensify() : IntensifyCfgReader {
        return this._Intensify;
    }
    private _Monster = new MonsterCfgReader();
    public get Monster() : MonsterCfgReader {
        return this._Monster;
    }
    private _NickName = new NickNameCfgReader();
    public get NickName() : NickNameCfgReader {
        return this._NickName;
    }
    private _Remould = new RemouldCfgReader();
    public get Remould() : RemouldCfgReader {
        return this._Remould;
    }
    private _RoleLevel = new RoleLevelCfgReader();
    public get RoleLevel() : RoleLevelCfgReader {
        return this._RoleLevel;
    }
    private _Shield = new ShieldCfgReader();
    public get Shield() : ShieldCfgReader {
        return this._Shield;
    }
    private _Sign = new SignCfgReader();
    public get Sign() : SignCfgReader {
        return this._Sign;
    }
    private _SkillPool = new SkillPoolCfgReader();
    public get SkillPool() : SkillPoolCfgReader {
        return this._SkillPool;
    }
    private _Skill = new SkillCfgReader();
    public get Skill() : SkillCfgReader {
        return this._Skill;
    }
    private _Sound = new SoundCfgReader();
    public get Sound() : SoundCfgReader {
        return this._Sound;
    }
    private _Store = new StoreCfgReader();
    public get Store() : StoreCfgReader {
        return this._Store;
    }
    private _Surprise = new SurpriseCfgReader();
    public get Surprise() : SurpriseCfgReader {
        return this._Surprise;
    }
    private _Task = new TaskCfgReader();
    public get Task() : TaskCfgReader {
        return this._Task;
    }
    private _UnlockSystem = new UnlockSystemCfgReader();
    public get UnlockSystem() : UnlockSystemCfgReader {
        return this._UnlockSystem;
    }
    private _Weapon = new WeaponCfgReader();
    public get Weapon() : WeaponCfgReader {
        return this._Weapon;
    }

    private keyjs = {}

    async initByMergeJson() {
        //cc.log("Cfg.initByMergeJson start:" + new Date().getTime());
        return new Promise((resolve, reject)=>{
            cc.loader.loadRes("config/GameJsonCfg", cc.JsonAsset, function (error: Error, resource: cc.JsonAsset) {
                if (error) {
                    cc.error("Cfg.initByMergeJson error", error);
                    reject();
                    return;
                }
                const json = resource.json;
                for (const key in json) {
                    if (!this.hasOwnProperty("_" + key)) {
                        cc.warn("Cfg.initByMergeJson null, " + key);
                        continue;
                    }
                    //cc.log("Cfg.initByMergeJson " + key);

                    let reader = this["_" + key];
                    reader.initByMap(json[key]);
                }
                resolve();

                //cc.log("Cfg.initByMergeJson finish:" + new Date().getTime());
            }.bind(this));
        });
    }

    async initBySingleJson() {
        //cc.log("Cfg.initBySingleJson start:" + new Date().getTime());
        return new Promise((resolve, reject)=>{
            cc.loader.loadResDir("config", function (error: Error, resources: cc.JsonAsset[], urls: string[]) {
                if (error) {
                    cc.error("Cfg.initBySingleJson error", error);
                    reject();
                    return;
                }
                for (let index = 0; index < resources.length; index++) {
                    const element = resources[index];
                    const key = element.name;
                    if (!this.hasOwnProperty("_" + key)) {
                        cc.warn("Cfg.initBySingleJson null, " + key);
                        continue;
                    }
                    //cc.log("Cfg.initBySingleJson " + key);

                    let reader = this["_" + key];
                    reader.initByMap(element.json);
                }
                resolve();

                //cc.log("Cfg.initBySingleJson finish:" + new Date().getTime());
            }.bind(this));
        });
    }

    private static cfgLoadNum: number = 0;
    async initRemoteJson(filename: string, test?: cc.Label, pro?: cc.ProgressBar) {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let url = Const.JsonRemoteUrl + filename + ".json";
                cc.loader.load(url, function (err, obj) {
                    if (err) {
                        cc.loader.loadRes("config/" + filename, cc.JsonAsset, function (err, obj2) {
                            if (err) {
                                reject("err");
                            }
                            const key = obj2.name;
                            if (!this1.hasOwnProperty("_" + key)) {
                                cc.warn("Cfg.initRemoteJson null, " + key);
                                reject("err");
                            }
    
                            let reader = this1["_" + key];
                            reader.initByMap(obj2.json);
                            _Cfg.cfgLoadNum += 1;
                            if (test) test.string = `${_Cfg.cfgLoadNum > 10 ? 10 : _Cfg.cfgLoadNum}%`;
                            if(pro) pro.progress = (_Cfg.cfgLoadNum > 10 ? 10:_Cfg.cfgLoadNum) / 100;
                            resolve();
    
                        })
                    } else {
                        if (!this1.hasOwnProperty("_" + filename)) {
                            cc.warn("Cfg.initRemoteJson null, " + filename);
                            reject("err");
                        }
    
                        let reader = this1["_" + filename];
                        reader.initByMap(obj);
                        resolve();
                        _Cfg.cfgLoadNum += 1;
                        if (test) test.string = `${_Cfg.cfgLoadNum > 10 ? 10 : _Cfg.cfgLoadNum}%`;
                        if(pro) pro.progress = (_Cfg.cfgLoadNum > 10 ? 10:_Cfg.cfgLoadNum) / 100;
                    }
                });
        })
    }
    
    async initLocalJson(filename: string, test?: cc.Label, pro?: cc.ProgressBar) {
        let this1 = this;
        return new Promise((resolve, reject) => {
            cc.loader.loadRes("config/" + filename, cc.JsonAsset, function (err, obj2) {
                if (err) {
                    reject("err");
                }
                const key = obj2.name;
                if (!this1.hasOwnProperty("_" + key)) {
                    cc.warn("Cfg.initLocalJson null, " + key);
                    reject("err");
                }

                let reader = this1["_" + key];
                reader.initByMap(obj2.json);
                _Cfg.cfgLoadNum += 1;
                if (test) test.string = `${_Cfg.cfgLoadNum > 10 ? 10 : _Cfg.cfgLoadNum}%`;
                if (pro) pro.progress = (_Cfg.cfgLoadNum > 10 ? 10 : _Cfg.cfgLoadNum) / 100;
                resolve();

            })
        })
    }

    async initRemoteConfig(filename: string, test?: cc.Label, pro?: cc.ProgressBar) {
        let this1 = this;
        return new Promise((resolve, reject) => {
            let url = Const.JsonRemoteUrl + filename + ".config";

                resolve();
        })
    }

    initLocalConfig(filename: string, test?: cc.Label, pro?: cc.ProgressBar) {
        let reader = this["_" + filename];
        let jsondata = this.keyjs[filename];
        if (reader && jsondata) {
            reader.initByMap(jsondata);
        }
        _Cfg.cfgLoadNum += 1;
        if (test) test.string = `${_Cfg.cfgLoadNum > 10 ? 10 : _Cfg.cfgLoadNum}%`;
        if (pro) pro.progress = (_Cfg.cfgLoadNum > 10 ? 10 : _Cfg.cfgLoadNum) / 100;
    }

    public HasTag(t : any, tag : number) : boolean {
        if (t.tags == null) {
            return false;
        }
        return t.tags.indexOf(tag) >= 0;
    }

    public selectArray<T>(cfg, field : string, index : number, defaultVal : T) : T {
        const array = cfg[field];
        if (array == null) {
            return defaultVal;
        }
        const val = array[index] as T;
        return val || defaultVal;
    }
}

export const Cfg = new _Cfg();