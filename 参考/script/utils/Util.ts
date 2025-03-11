import { MVC } from "../framework/MVC";
import { WXSDK } from "../sdk/WXSDK";
import { GameVoManager } from "../manager/GameVoManager";
import { UIManager } from "../framework/UIManager";
import { Const } from "../config/Const";
import { Cfg } from "../config/Cfg";
import { BulletManager } from "../manager/BulletManager";
import { BulletVo, Bullet } from "../component/Bullet";
import FightModel from "../module/fight/FightModel";
import { ToolManager } from "../manager/ToolManager";
import { BombVo, Bomb } from "../component/Bomb";
import { Notifier } from "../framework/Notifier";
import { CallID } from "../CallID";

declare var wx: any;

/**
 * 通用工具类
 */
export class Util {
    public static isWeChat() {
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    }

    /**
     * 获取夹角角度
     * @param originPoint 
     * @param endPoint 
     */
    public static getAngle(originPoint: cc.Vec2, endPoint: cc.Vec2): number {
        if (endPoint.x == 0 && endPoint.y == 0) return 0;
        let radina = endPoint.signAngle(originPoint);
        let angle = 180 / (Math.PI / radina);
        return angle;
    }

    /**
     * 角度转弧度
     * @param angle 角度
     */
    public static AngleToRadinas(angle): number {
        return angle * (Math.PI / 180);
    }

    public static RadinasToAngle(radius): number {
        return radius * 180 / (Math.PI);
    }

    public static pDistance(p1: cc.Vec2, p2: cc.Vec2): number {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static getAngleByVec2(vec: cc.Vec2): number {
        let direction = 0 < vec.x ? 1 : -1;
        let z = vec.mag();
        if (z == 0) return 0;
        let cos = vec.y / z;
        let radina = Math.acos(cos);
        let angle = 180 / (Math.PI / radina);
        return angle * direction;
    }

    /**
    * 为节点或sprite设置SpriteFrame
    * @param {string|cc.Node|cc.Sprite} obj node，sprite或其路径
    * @param {string } imageUrl 资源路径
    * @param {callback} 回调
    */
    static setSprite2(obj, imageUrl: string, callback: Function = null) {
        if (!obj) {
            cc.error("请传入正确的节点名称");
            return;
        }
        if (!imageUrl) {
            cc.error("请传入正确的资源路径");
            return;
        }
        var spr;
        if (obj instanceof cc.Sprite)                       //参数为Sprite
            spr = obj;
        else if (obj instanceof cc.Node)                    //参数为Node
            spr = obj.getComponent(cc.Sprite);
        else if (Object.prototype.toString.call(obj) === "[object String]")//参数为string(sprite所在Node的路径)
            spr = cc.find(obj).getComponent(cc.Sprite);
        else {
            cc.error("传入节点资源类型不正确");
            return;
        }
        if (!spr) {

            cc.error("未找到正确的Sprite");
            return;
        }
        if (!spr || !spr.spriteFrame)
            return;
        var opacity = spr.node.opacity;
        spr.node.opacity = 0;

        let methodName = "load";
        if (imageUrl.indexOf("http") != 0)
            methodName += "Res";
        cc.loader[methodName]({ url: imageUrl, type: 'jpg' }, function (err, obj) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            spr.spriteFrame = new cc.SpriteFrame(obj);
            spr.node.opacity = opacity;
            if (callback) {
                callback()
            }
        });
    }

    /**
     * 为节点或sprite设置图片显示
     * @param {cc.Sprite | cc.Node} spriteOrNode 需要显示图片的节点或其sprite组件
     * @param {*} imgUrl 网络图片路径
     * @param {callback} 回调
     */
    public static setSprite(spriteOrNode, imgUrl, callback: Function = null) {
        if (!Util.isWeChat()) {
            this.setSprite2(spriteOrNode, imgUrl, callback)
            return;
        }
        if (!imgUrl) {
            return;
        }

        let sprite = null;
        if (spriteOrNode instanceof cc.Sprite)
            sprite = spriteOrNode;
        else if (spriteOrNode instanceof cc.Node)
            sprite = spriteOrNode.getComponent(cc.Sprite);

        if (!sprite)
            throw new Error("CommonUtil.setSprite:  无法找到正确的Sprite");

        let image = wx.createImage();
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            if (callback) {
                callback()
            }
        };
        image.src = imgUrl;
    }

    //设置本地图片
    public static setNodePic(node: cc.Node, url: string) {
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }

    public static random(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min));
    }

    /**加载资源 */
    public static loadPrefab(path: string): Promise<cc.Node> {
        return new Promise((resolve, reject) => {
            let names = path.split(`/`);
            MVC.ComponentHandler.loadAssetHandler(names[names.length - 1], path, cc.Prefab, (name: string, assets: object, assetspath: string, args: any) => {
                let prefab: cc.Node = assets as cc.Node;
                if (prefab == null) {
                    cc.error(".loadCallback GameObject null:" + name);
                    reject(null);
                }
                else {
                    let node: cc.Node = cc.instantiate<cc.Node>(prefab);
                    resolve(node)
                }
            }, null, null);
        });
    }

    /** 
     * 时间格式化
     * @param time 时间ms值
     * @param showMilli 是否显示毫秒
     * @param useChinese 是否使用中文
     */
    public static getTimeFormat(time: number, showMilli: boolean = false, useChinese: boolean = false): string {
        let millSeconds = time % 1000;
        let miliSecondsStr = millSeconds.toString();
        if (miliSecondsStr.length < 2) {
            miliSecondsStr = "00" + miliSecondsStr;
        } else if (miliSecondsStr.length < 3) {
            miliSecondsStr = "0" + miliSecondsStr;
        }

        let seconds = Math.floor(time / 1000) % 60;
        let secondsStr = seconds.toString();
        if (secondsStr.length < 2) {
            secondsStr = "0" + secondsStr;
        }

        let minutes = Math.floor((time / 1000) / 60) % 60;
        let minutesStr = minutes.toString();
        if (minutesStr.length < 2) {
            minutesStr = "0" + minutesStr;
        }

        let hour = Math.floor(((time / 1000) / 60) / 60);
        let hourStr = hour.toString();
        if (hourStr.length < 2) {
            hourStr = "0" + hourStr;
        }
        let retStr = " " + hourStr + ":" + minutesStr + ":" + secondsStr;
        if (showMilli) {
            retStr += ("." + miliSecondsStr);
        }
        //
        if (useChinese) {
            retStr = "";
            if (hour != 0) {
                retStr += (hour.toString() + "时");
            }
            if (minutes != 0) {
                retStr += (minutes.toString() + "分");
            }
            if (seconds != 0) {
                retStr += (seconds.toString() + "秒");
            }
            if (showMilli && millSeconds != 0) {
                retStr += (millSeconds.toString() + "毫秒");
            }
        }
        return retStr;
    }

    /**type 1 */
    public static timeFormat(time: number, type: number = 1): string {
        if (time < 0) return "";
        let str = "";
        if (type == 1) {/**%d分%秒 */
            let min = Math.floor(time / 60);
            let sec = time % 60;
            str = `${min}分${sec}秒`;
        } else if (type == 2) {
            let minute = time / 60 >> 0;
            str += (minute < 10 ? "0" : "") + minute + ":";
            let second = Math.ceil(time % 60);
            str += (second < 10 ? "0" : "") + second;
        }
        return str;
    }

    /**
     * 
     * @param time 毫秒
     */
    public static timeFormatToArray(time: number): Array<number> {
        if (time <= 500) return [0, 0, 0];
        else {
            let realtime = Math.ceil(time / 1000);
            let day = Math.floor(realtime / 86400);
            realtime = realtime - day * 86400;
            let hour = Math.floor(realtime / 3600);
            realtime = realtime - hour * 3600;
            let min = Math.floor(realtime / 60);
            return [day, hour, min];
        }
    }

    /**格式化名字 */
    public static normalName(name: string, index: number = 5): string {
        let realname = name;
        if (name.length > index) {
            realname = name.substr(0, index) + "..."
        }
        return realname;
    }

    /**
     * cocos中的坐标转为微信中的坐标位置
     * @param pos 坐标位置
     */
    /*public static cocosToWxPos(pos: cc.Vec2): cc.Vec2 {
        //cocos中的宽高
        let size = cc.director.getWinSize();
        let systemInfo = WXSDK.SystemInfo;
        let ratioW = systemInfo.screenWidth / size.width;
        let ratioH = systemInfo.screenHeight / size.height;
        let centerX = systemInfo.screenWidth >> 1;
        let centerY = systemInfo.screenHeight >> 1;
        let X = centerX + pos.x * ratioW;
        let Y = centerY - pos.y * ratioH;
        return cc.v2(X, Y);
    }

    public static wxToCocosPos(pos: cc.Vec2): cc.Vec2 {
        let info = WXSDK.SystemInfo;
        let size = cc.director.getScene().getComponentInChildren(cc.Canvas).designResolution;
        let ratio: number = 1;
        if (info.screenHeight / info.screenWidth > 15.95 / 9) {
            ratio = size.width / info.screenWidth;
        }
        else {
            ratio = size.height / info.screenHeight;
        }
        let center = cc.v2(info.screenWidth >> 1, info.screenHeight >> 1);
        let result = cc.v2(0, 0);
        result.x = pos.x - center.x;
        result.y = pos.y - center.y;
        result.x *= ratio;
        result.y *= -ratio;
        let ratio2 = 1;
        if (info.screenHeight / info.screenWidth > 16 / 9) {
            ratio2 = info.screenHeight / info.screenWidth / (size.height / size.width);
            result.y *= ratio2;
        }
        else {
            ratio2 = info.screenWidth / info.screenHeight / (size.width / size.height);
            result.x *= ratio2;
        }

        return result;
    }*/

    /**
     * @description 打开分享失败弹窗
     * @author 吴建奋
     * @static
     * @memberof GameTool
     */
    public static showShareFailTips() {
        UIManager.Open("common/ShareFailTips", MVC.eTransition.Default, MVC.eUILayer.Tips);
    }

    /**
     * @desc 从给定整数范围内生成n个不重复的随机数 n不能超过给定范围
     * @param {Number} min 
     * @param {Number} max 
     */
    public static getRandomSDiff(min, max, n) {
        if (max - min + 1 <= n) {
            let list = [];
            for (let i = min; i <= max; i++) {
                list.push(i)
            }
            return list;
        }
        let originalArray = new Array();
        let len = max - min + 1;
        for (let i = 0; i < len; i++) {
            originalArray[i] = min + i;
        }
        let randomArray = new Array();
        for (let i = 0; i < n; i++) {
            let t = this.random(0, len - 1 - i)
            randomArray[i] = originalArray[t];
            var temp = originalArray[len - 1 - i];
            originalArray[len - 1 - i] = originalArray[t];
            originalArray[t] = temp;
        }
        return randomArray;
    }

    public static randomArray(array) {
        let randomArray = new Array();
        let tt = array;
        let len = array.length
        for (let i = 0; i < len; i++) {
            let t = this.random(0, len - 1 - i)
            randomArray[i] = tt[t];
            var temp = tt[len - 1 - i];
            tt[len - 1 - i] = tt[t];
            tt[t] = temp;
        }
        return randomArray;
    }

    /**
     * 根据生命等级获取人物血量
     * @param lv 生命等级
     */
    public static getMainRoleHpByLevel(lv: number) {
        let hp = Const.RoleHP * (Math.pow(1.1, lv) + 0.2 * lv);
        hp = Math.ceil(hp);
        return hp;
    }

    /**
     * 
     * @param baseattack 基础攻击值
     * @param lv 火力等级
     */
    public static getMainRoleHurtByLevel(baseattack: number, lv: number) {
        let attack = baseattack * (Math.pow(1.1, lv) + 0.2 * lv);
        attack = Math.ceil(attack);
        return attack;
    }

    /**
     * 计算武器射速
     * @param basespeed 基础射速
     * @param lv 射速等级
     */
    public static getMainRoleGunSpeedByLevel(basespeed: number, lv: number) {
        let speed = basespeed / (lv * 0.04 / (1 + lv * 0.02) + 1);
        return speed;
    }

    /**
     * 计算武器弹夹容量
     * @param basespeed 基础容量
     * @param lv 容量等级
     */
    public static getMainRoleGunCapacityByLevel(basecapacity: number, lv: number) {
        let capacity = basecapacity * (lv * 0.04 / (1 + lv * 0.02) + 1);
        capacity = Math.ceil(capacity);
        return capacity;
    }

    /**
     * 计算伤害加成后的伤害
     * @param hurt 伤害
     * @param lv 加成等级
     */
    public static getWeaponsHotRatioByLevel(hurt: number, lv: number): number {
        let realhurt = Math.ceil(hurt * (lv * 0.04 / (1 + 0.02 * lv) + 1));
        return realhurt;
    }

    /**
     * 根据关卡等级获取怪物血量
     * @param baseHp 基础血量
     * @param lv 关卡等级
     */
    public static getMonsterHpByLevel(baseHp: number, lv: number) {
        let hp = baseHp * (Math.pow(1.09, lv) + 0.2 * lv);
        hp = Math.ceil(hp);
        return hp;
    }

    /**
     * 根据关卡等级获取怪物攻击力
     * @param baseAttack 基础攻击
     * @param lv 关卡等级
     */
    public static getMonsterAttackByLevel(baseAttack: number, lv: number) {
        let attack = baseAttack * (Math.pow(1.09, lv) + 0.2 * lv);
        attack = Math.ceil(attack);
        return attack;
    }

    /**
     * 根据收益等级获取杀怪掉落金币数
     * @param basereward 基础金币
     * @param lv 收益等级
     */
    public static getMonsterDropGoldByLevel(basereward: number, lv: number) {
        let _t = Math.pow(1.03, GameVoManager.getInstance.myUserVo.topLevel) * 65 - 1000;
        let _t1 = _t > 0 ? _t : 0;
        let gold = basereward * (Math.pow(1.098, lv) * 0.05 + 4 + lv) + _t1;
        gold = Math.ceil(gold);
        return gold;
    }

    //收益金币公式
    public static EarningByLevel(level: number) {
        let _t = Math.pow(1.03, GameVoManager.getInstance.myUserVo.topLevel) * 15 - 250;
        let _t1 = _t > 0 ? _t : 0;
        let gold = (Math.pow(1.099, level) * 0.02 + level + 5) + _t1;
        gold = Math.ceil(gold);
        return gold;
    }

    // 人物火力、生命百分比显示
    public static RolePowerAndLifeByLevel(level: number) {
        let n = Number(Math.pow(1.1, level) + 0.2 * level) * 100
        return n;
    }
    // 人物暴击
    public static RoleDoubleHitByLevel(level: number) {
        let n = level * 20;
        return n;
    }
    // 人物暴击率
    public static RoleDoubilePerByStage(level: number) {
        let lv = GameVoManager.getInstance.myUserVo.roleLvs[1];
        let per = (lv + 20) * 0.4 / (52 + level);
        return per;
    }

    // 武器射速、火力加成百分比显示
    public static WeaponSpeedAndPowerByLevel(level: number) {
        let n = (Number((level * 0.04 / (1 + level * 0.02) + 1) * 100));
        return n;
    }

    // 升级火力消耗金币公式
    public static getUpgradeFireGold() {
        let lv = GameVoManager.getInstance.myUserVo.roleLvs[0];
        let gold = Math.ceil(Math.pow(1.1, lv) * 200 + lv * 100);
        return gold
    }

    // 升级生命-暴击消耗金币公式
    public static getUpgradeLifeGold() {
        let lv = GameVoManager.getInstance.myUserVo.roleLvs[1];
        let gold = Math.ceil(Math.pow(1.1, lv) * 120);
        return gold
    }

    // 升级射速消耗金币公式
    public static getUpgradeSpeedGold() {
        let gunId = GameVoManager.getInstance.myUserVo.defaultGunId;
        let lv = GameVoManager.getInstance.myUserVo.weaponList[gunId][0];
        let gold = Math.ceil(Math.pow(1.25, lv) * 100 + Math.pow(1.6, lv) / 10);
        return gold
    }

    //升级火力加成消耗金币公式
    public static getWeaponHotUpgradeGoldByLevel(lv: number) {
        return Math.ceil(Math.pow(1.25, lv) * 120);
    }

    // 升级计时消耗金币公式
    public static getUpgradeTimeGold() {
        let lv = GameVoManager.getInstance.myUserVo.goldRewardLvs[0];
        let gold = Math.ceil(Math.pow(1.1, lv) * 80) + lv * 80;
        return gold
    }

    // 升级杀怪消耗金币公式
    public static getUpgradeKillGold() {
        let lv = GameVoManager.getInstance.myUserVo.goldRewardLvs[1];
        let gold = Math.ceil(Math.pow(1.1, lv) * 100) + lv * 100;
        return gold
    }

    // 主界面转盘金币获取公式
    public static getDrawGold() {
        let _t = (Math.pow(1.03, GameVoManager.getInstance.myUserVo.topLevel) * 65 - 1000) * 150;
        let _t1 = _t > 0 ? _t : 0;
        let gold = (Math.pow(1.098, GameVoManager.getInstance.myUserVo.goldRewardLvs[1]) * 8 + GameVoManager.getInstance.myUserVo.goldRewardLvs[1] * 160) + 1000 + _t1;
        gold = Math.ceil(gold);
        return gold;
    }

    //金币格式化
    public static goldFormat(gold: number): string {
        if (gold <= 0) return "0";
        if (gold < 1000) {
            return String(Math.floor(gold));
        } else if (gold >= 1000 && gold < 1000000) {
            return (gold / 1000).toFixed(1) + "k";
        } else if (gold >= 1000000 && gold < 1000000000) {
            return (gold / 1000000).toFixed(1) + "m";
        } else if (gold >= 1000000000 && gold < 1000000000000) {
            return (gold / 1000000000).toFixed(1) + "b";
        } else if (gold >= 1000000000000 && gold < 1000000000000000) {
            return (gold / 1000000000000).toFixed(1) + 't';
        } else if (gold >= 1000000000000000 && gold < 1000000000000000000) {
            return (gold / 1000000000000000).toFixed(1) + 'A';
        } else {
            return (gold / 1000000000000000000).toFixed(1) + 'B';
        }
    }

    //数字格式化
    public static numFormat(num: number): string {
        if (num <= 0) return "0";
        if (num < 1000) {
            return String(Math.floor(num));
        } else if (num >= 1000 && num < 1000000) {
            return (num / 1000).toFixed(1) + "k";
        } else if (num >= 1000000 && num < 1000000000) {
            return (num / 1000000).toFixed(1) + "m";
        } else if (num >= 1000000000 && num < 1000000000000) {
            return (num / 1000000000).toFixed(1) + "b";
        } else if (num >= 1000000000000 && num < 1000000000000000) {
            return (num / 1000000000000).toFixed(1) + 't';
        } else if (num >= 1000000000000000 && num < 1000000000000000000) {
            return (num / 1000000000000000).toFixed(1) + 'A';
        } else {
            return (num / 1000000000000000000).toFixed(1) + 'B';
        }
    }

    //数字格式化
    public static numFormat1(num: number): string {
        if (num <= 0) return "0";
        if (num < 1000000) {
            return String(Math.ceil(num));
        } else if (num >= 1000000 && num < 1000000000) {
            return (num / 1000000).toFixed(1) + "m";
        } else if (num >= 1000000000 && num < 1000000000000) {
            return (num / 1000000000).toFixed(1) + "b";
        } else if (num >= 1000000000000 && num < 1000000000000000) {
            return (num / 1000000000000).toFixed(1) + 't';
        } else if (num >= 1000000000000000 && num < 1000000000000000000) {
            return (num / 1000000000000000).toFixed(1) + 'A';
        } else {
            return (num / 1000000000000000000).toFixed(1) + 'B';
        }
    }

    public static _goldN: cc.Node = null;
    public static showGoldEffect(parent: cc.Node, goodsNum: number | string, nodePos: cc.Vec2, targetPos: cc.Vec2, offsetTime: number = 0, delayTime: number = 100, iconType: number = 1) {
        if (!Util._goldN) {
            setTimeout(async function () {
                if (!parent) return
                Util.loadPrefab('tool/goldeffect').then((node) => {
                    Util._goldN = cc.instantiate(node);
                    node.parent = parent;
                    node.position = nodePos;
                    node.getComponent('GoldEffect').playEffect(goodsNum, targetPos, offsetTime, 0, iconType)
                })
            }, delayTime)
        } else {
            let node = cc.instantiate(Util._goldN);
            node.parent = parent;
            node.position = nodePos;
            node.getComponent('GoldEffect').stopEffect();
            node.getComponent('GoldEffect').playEffect(goodsNum, targetPos, offsetTime, 0, iconType);
        }
    }

    public static fireToolBullet(id, startPos: cc.Vec2, belongto: number) {
        let toolCfg = Cfg.Drop.get(id);
        if (!toolCfg) return;
        let normalvect = cc.v2(0, 1);
        let twopai = 2 * Math.PI;
        let num = /*awake.extraInfo[weaponinfp[2]]*/0 + toolCfg.bulletNum;
        let hurt = toolCfg.hurt;
        // hurt = Util.getWeaponsHotRatioByLevel(hurt, weaponinfp[1]);
        // let doubleper = Util.RoleDoubilePerByStage(GameVoManager.getInstance.myUserVo.topLevel + 1) * 1000;

        for (let i = 0; i < num; i++) {
            // let a = Util.random(0, 1000);
            // let dhit = a > doubleper ? 1 : 2;
            let endpos = normalvect.rotate(twopai / num * i);
            endpos = endpos.mul(1000);
            let bullet = BulletManager.getInstance.popBulletNodeByType(toolCfg.bulletId);
            if (bullet) {
                bullet.position = startPos;
                let bulvo: BulletVo = { hurt: hurt, radius: 0, bulletType: toolCfg.bulletId, belongto: belongto, canCross: true, hitEffecId: 0 };
                let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                bullet.setParent(FightModel.getInstance.bulletParent);
                bul.isTool = true;
                bul.moveSpeed(2000);
                bul.setTargetPos(bullet.position.add(endpos));
            }
        }
        // Manager.audio.playAudio(toolCfg.id, AudioType.Tool);
    }

    public static createBlackHole(pos, id) {
        let bomb = ToolManager.getInstance.popToolEffectNodeByType(id);
        let data = Cfg.Drop.get(id);
        if (bomb) {
            bomb.position = pos;
            let bombvo: BombVo = { hurt: 0, radius: 0, toolType: data.id }
            let bom: Bomb = ToolManager.getInstance.addToolEffect(bomb, bombvo);
            bomb.setParent(FightModel.getInstance.bombParent);
            bom.startAttack();
            // Manager.audio.playAudio(data.id, AudioType.Tool);
        }
    }

    public static getSpecialWeaponHotStringByType(type: number): string {
        let str = "";
        if (type == 1) {//离子枪 迸裂
            str = "text_bl";
        } else if (type == 2) {//掠夺
            str = "text_ld";
        } else if (type == 3) {//贯穿
            str = "text_gc";
        } else if (type == 4) {//散射
            str = "text_ss";
        } else if (type == 5) {//光能
            str = "text_gn";
        } else if (type == 6) {//暴击
            str = "text_bj";
        }
        return str
    }

    //用于生成uuid
    private static S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    public static guid() {
        return (Util.S4() + Util.S4() + "-" + Util.S4() + "-" + Util.S4() + "-" + Util.S4() + "-" + Util.S4() + Util.S4() + Util.S4());
    }

    /**
     * 获取真实关卡等级
     * @param level 等级
     */
    public static getRealLevel(level: number) {
        let reallevel = level;
        if (level > Const.loopStageRange[1]) {
            reallevel = (level + 14) % (Const.loopStageRange[1] - Const.loopStageRange[0] + 1);
            reallevel += Const.loopStageRange[0];
        }
        return reallevel;
    }

    /**
     * 适配分辨率
     */
    public static resizeNode(node: cc.Node) {
        if (node && cc.isValid(node)) {
            let size = cc.view.getCanvasSize();
            if (size.height / size.width <= 1.6) {
                node.scale = size.height / size.width;
            }
        }
    }

    public static setAvatarSprite(spriteOrNode, imgUrl, callback: Function = null) {
        Util.setSprite(spriteOrNode, imgUrl, callback);
    }

    public static levelToChapterId(level: number) {
        let data = Cfg.Chapter.filter({});
        let len = data.length;
        let chapterId = 1;
        let sublevel = 0;
        let maxpart = 30;
        let levelnum = level;
        for (let i = 0; i < len; i++) {
            levelnum = levelnum - data[i].attackCount;
            if (levelnum <= 0) {
                chapterId = i + 1;
                sublevel = levelnum + data[i].attackCount;
                maxpart = data[i].attackCount;
                break;
            }
        }
        return [chapterId, sublevel, maxpart];
    }

    public static levelToPassChapter(level: number){
        let chapterInfo = this.levelToChapterId(level);
        if (chapterInfo[1] == chapterInfo[2]){
            chapterInfo[0]++;
        }
        return chapterInfo;
    }

    public static isChapterLastLevel(level: number) {
        let list = Util.levelToChapterId(level);
        return list[1] == list[2];
    }

    public static adapterNodeX(node: cc.Node) {
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        node.x = size.width / Const.designWidth * node.x;
    }
    public static adapterNodeY(node: cc.Node) {
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        node.y = size.height / Const.designHeight * node.y;
    }
    /** 十进制转二进制 */
    public static numberToBinary(num: number) {
        return num.toString(2);
    }

    public static replacePosStr(strObj: string, pos: number, replacetext: string) {
        if (!strObj || !strObj.length) return;
        //从右往左，下标1开始
        pos = strObj.length - pos + 1;
        var str = strObj.substr(0, pos - 1) + replacetext + strObj.substring(pos, strObj.length);
        return str;
    }

    public static getStringByteNum(str: string) {
        let len = 0;
        const reqexp = /[\u4e00-\u9fa5]/;//中文
        if (str) {
            for (let i = 0; i < str.length; i++) {
                if (reqexp.test(str[i])) {
                    len += 2;
                } else {
                    len += 1;
                }
            }
        }
        return len;
    }
}
