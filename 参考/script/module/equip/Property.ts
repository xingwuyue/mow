import { GameVoManager } from "../../manager/GameVoManager"
import { Cfg } from "../../config/Cfg"

export class PropertyDefine {
    //属性id对应属性名字
    public static equipIndexToName = {
        1: "攻击",
        2: "防御",
        3: "生命",
        4: "暴击等级",
        5: "闪避等级",
        6: "攻击增加",
        7: "防御增加",
        8: "生命增加",
        9: "暴击率增加",
        10: "暴击伤害增加",
        11: "闪避率增加",
    }

    //属性id对应属性key
    public static equipIndexToKey = {
        1: "attack",
        2: "defense",
        3: "hp",
        4: "violentLv",
        5: "missLv",
        6: "attackRatio",
        7: "defenseRatio",
        8: "hpRatio",
        9: "violentRatio",
        10: "violentHurtRatio",
        11: "missRatio",
    }

    //属性key对应属性id
    public static equipKeyToIndex = {
        "attack": 1,
        "defense": 2,
        "hp": 3,
        "violentLv": 4,
        "missLv": 5,
        "attackRatio": 6,
        "defenseRatio": 7,
        "hpRatio": 8,
        "violentRatio": 9,
        "violentHurtRatio": 10,
        "missRatio": 11,
    }

    public static equipIndexToPower = {
        1: 4,
        2: 8,
        3: 1,
        4: 7,
        5: 10,
        6: 20,
        7: 20,
        8: 20,
        9: 20,
        10: 20,
        11: 30,
    }

    public static equipKeyToPower = {
        "attack": 4,
        "defense": 8,
        "hp": 1,
        "violentLv": 7,
        "missLv": 10,
        "attackRatio": 20,
        "defenseRatio": 20,
        "hpRatio": 20,
        "violentRatio": 20,
        "violentHurtRatio": 20,
        "missRatio": 30,
    }

    public static equipKeyIsRatio = {
        "attack": 0,
        "defense": 0,
        "hp": 0,
        "violentLv": 0,
        "missLv": 0,
        "attackRatio": 1,
        "defenseRatio": 1,
        "hpRatio": 1,
        "violentRatio": 1,
        "violentHurtRatio": 1,
        "missRatio": 1,
    }

    public static equipIndexIsRatio = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
    }


    public static partIndexToKeyName = {
        0: "weaponNerve",
        1: "muzzleNerve",
        2: "armorNerve",
        3: "pendantNerve",
    }

    public static partIndexToCostName = {
        0: "weaponIntensifyGold",
        1: "muzzleIntensifyGold",
        2: "armorIntensifyGold",
        3: "pendantIntensifyGold",
    }

    public static partIndexToLockName = {
        0: "weaponIntensifyUnlock",
        1: "armorIntensifyUnlock",
        2: "armorIntensifyUnlock",
        3: "pendantIntensifyUnlock",
    }

    public static nosetKey = {
        "partIndex": 1,
        "intensifyLv": 1,
    }
}

export class PropertyVO {
    attack: number = 0;//攻击
    defense: number = 0;//防御
    hp: number = 0;//生命
    violentLv: number = 0;//暴击等级
    missLv: number = 0;//闪避等级
    attackRatio: number = 0;//攻击增加
    defenseRatio: number = 0;//防御增加
    hpRatio: number = 0;//生命增加
    violentRatio: number = 0;//暴击率增加
    violentHurtRatio: number = 0;//暴击伤害增加
    missRatio: number = 0;//闪避率增加
    intensifyLv: number = 0;
    partIndex: number = 0;//部位
    public constructor(property?: number[]) {
        this.resetProperty(property);
    }

    public clone() {
        let pro = new PropertyVO();
        Object.getOwnPropertyNames(pro).forEach(function (key) {
            if (this.hasOwnProperty(key)) {
                pro[key] = this[key];
            }
        }.bind(this));
        return pro;
    }
    public getHp() {
        return this.hp * (1 + this.hpRatio / 100);
    }

    public getDefense() {
        let defense = this.defense;
        defense = (this.defense * (1 + this.defenseRatio / 100));
        return defense;
    }

    /**计算受伤伤害 */
    public calDamage(hurt: number) {
        let realhurt = hurt;
        realhurt = hurt - this.getDefense();
        if (realhurt < 1) realhurt = 1;
        return realhurt;
    }
    //闪避概率 = 闪避等级*0.1 /（当前关卡数 + 闪避等级*0.1 + 150） + 闪避率%
    public getMissRatio(stageLv: number) {
        let missratio = this.missLv * 0.1 / (stageLv + this.missLv * 0.1 + 150) + this.missRatio / 100;
        return missratio;
    }
    //暴击概率  =  暴击等级*0.1 /（当前关卡数 + 暴击等级*0.1 + 100） + 暴击率%
    public getViolentRatio(stageLv: number) {
        let violentratio = this.violentLv * 0.1 / (stageLv + this.violentLv * 0.1 + 100) + this.violentRatio / 100;
        return violentratio;
    }
    //暴击伤害 = （150% + 暴击伤害%）* 原始伤害
    public getViolentNum(hurt: number) {
        let num = hurt * (1.5 + this.violentHurtRatio / 100);
        return num
    }

    public getNormalAttack(defense: number) {
        return this.attack * (1 + this.attackRatio / 100) - defense;
    }


    public getAttack() {
        return this.attack * (1 + this.attackRatio / 100);
    }

    /**获取战斗力 */
    public getBattle(): number {
        let battle = 0;
        for (let key in PropertyDefine.equipKeyToPower) {
            let value = this[key];
            if (value) {
                battle += value * PropertyDefine.equipKeyToPower[key];
            }
        }
        return battle;
    }

    public setPartAndLevel(part: number, level: number) {
        if (level == this.intensifyLv) return;
        if (this.intensifyLv > 0) {
            const data = Cfg.Intensify.get(this.intensifyLv);
            let uppros = data[PropertyDefine.partIndexToKeyName[this.partIndex]];
            let len = uppros.length / 2;
            for (let i = 0; i < len; i++) {
                let key = PropertyDefine.equipIndexToKey[uppros[2 * i]];
                let value = uppros[2 * i + 1];
                this[key] -= value;
            }
        }
        this.intensifyLv = level;
        this.partIndex = part;
        if (this.intensifyLv > 0) {
            if (this.intensifyLv > GameVoManager.getInstance.myUserVo.equipUpgradeMaxLevel) {
                this.intensifyLv = GameVoManager.getInstance.myUserVo.equipUpgradeMaxLevel;
            }
            const newdata = Cfg.Intensify.get(this.intensifyLv);
            let newuppros = newdata[PropertyDefine.partIndexToKeyName[this.partIndex]];
            let newlen = newuppros.length / 2;
            for (let i = 0; i < newlen; i++) {
                let key = PropertyDefine.equipIndexToKey[newuppros[2 * i]];
                let value = newuppros[2 * i + 1];
                this[key] += value;
            }
        }
    }

    public resetZero() {
        this.attack = 0;//攻击
        this.defense = 0;//防御
        this.hp = 0;//生命
        this.violentLv = 0;//暴击等级
        this.missLv = 0;//闪避等级
        this.attackRatio = 0;//攻击增加
        this.defenseRatio = 0;//防御增加
        this.hpRatio = 0;//生命增加
        this.violentRatio = 0;//暴击率增加
        this.violentHurtRatio = 0;//暴击伤害增加
        this.missRatio = 0;//闪避率增加
        this.intensifyLv = 0;
    }

    public resetProperty(property: number[]) {
        if (property) {
            for (let i = 0; i < property.length; ++i) {
                let propertyName = PropertyDefine.equipIndexToKey[i + 1];
                if (propertyName)
                    this[PropertyDefine.equipIndexToKey[i + 1]] = property[i];
            }
        }
        this.intensifyLv = 0;
        this.partIndex = 0;
    }

    public addPropertySelf(property: PropertyVO) {
        Object.getOwnPropertyNames(this).forEach(function (key) {
            if (property.hasOwnProperty(key) && !PropertyDefine.nosetKey[key]) {
                this[key] += property[key];
            }
        }.bind(this));
        return this;
    }

    public reducePropertySelf(property: PropertyVO) {
        Object.getOwnPropertyNames(this).forEach(function (key) {
            if (property.hasOwnProperty(key) && !PropertyDefine.nosetKey[key]) {
                this[key] -= property[key];
            }
        }.bind(this));
        return this;
    }

    public toString() {
        let str = "";
        Object.getOwnPropertyNames(this).forEach(function (key) {
            if (this.hasOwnProperty(key)) {
                str += `${key}:${this[key]} `;
            }
        }.bind(this));
        return str;
    }
}
