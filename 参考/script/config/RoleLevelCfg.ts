import { TConfig } from "./TConfig";


export interface RoleLevelCfg extends IConfig {level:number;exp:number;}



export class RoleLevelCfgReader extends TConfig<RoleLevelCfg> {
    protected _name : string = "RoleLevel";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "level": 1,
        "exp": 0
    },
    "2": {
        "level": 2,
        "exp": 10
    },
    "3": {
        "level": 3,
        "exp": 10
    },
    "4": {
        "level": 4,
        "exp": 10
    },
    "5": {
        "level": 5,
        "exp": 30
    },
    "6": {
        "level": 6,
        "exp": 10
    },
    "7": {
        "level": 7,
        "exp": 10
    },
    "8": {
        "level": 8,
        "exp": 10
    },
    "9": {
        "level": 9,
        "exp": 10
    },
    "10": {
        "level": 10,
        "exp": 20
    },
    "11": {
        "level": 11,
        "exp": 20
    },
    "12": {
        "level": 12,
        "exp": 20
    },
    "13": {
        "level": 13,
        "exp": 20
    },
    "14": {
        "level": 14,
        "exp": 30
    },
    "15": {
        "level": 15,
        "exp": 30
    },
    "16": {
        "level": 16,
        "exp": 30
    },
    "17": {
        "level": 17,
        "exp": 40
    },
    "18": {
        "level": 18,
        "exp": 40
    },
    "19": {
        "level": 19,
        "exp": 50
    },
    "20": {
        "level": 20,
        "exp": 50
    },
    "21": {
        "level": 21,
        "exp": 60
    },
    "22": {
        "level": 22,
        "exp": 70
    },
    "23": {
        "level": 23,
        "exp": 80
    },
    "24": {
        "level": 24,
        "exp": 90
    },
    "25": {
        "level": 25,
        "exp": 100
    },
    "26": {
        "level": 26,
        "exp": 110
    },
    "27": {
        "level": 27,
        "exp": 120
    },
    "28": {
        "level": 28,
        "exp": 130
    },
    "29": {
        "level": 29,
        "exp": 140
    },
    "30": {
        "level": 30,
        "exp": 160
    },
    "31": {
        "level": 31,
        "exp": 180
    },
    "32": {
        "level": 32,
        "exp": 200
    },
    "33": {
        "level": 33,
        "exp": 220
    },
    "34": {
        "level": 34,
        "exp": 240
    },
    "35": {
        "level": 35,
        "exp": 260
    },
    "36": {
        "level": 36,
        "exp": 280
    },
    "37": {
        "level": 37,
        "exp": 300
    },
    "38": {
        "level": 38,
        "exp": 320
    },
    "39": {
        "level": 39,
        "exp": 340
    },
    "40": {
        "level": 40,
        "exp": 360
    },
    "41": {
        "level": 41,
        "exp": 400
    },
    "42": {
        "level": 42,
        "exp": 440
    },
    "43": {
        "level": 43,
        "exp": 480
    },
    "44": {
        "level": 44,
        "exp": 520
    },
    "45": {
        "level": 45,
        "exp": 560
    },
    "46": {
        "level": 46,
        "exp": 600
    },
    "47": {
        "level": 47,
        "exp": 640
    },
    "48": {
        "level": 48,
        "exp": 680
    },
    "49": {
        "level": 49,
        "exp": 720
    },
    "50": {
        "level": 50,
        "exp": 760
    },
    "51": {
        "level": 51,
        "exp": 800
    },
    "52": {
        "level": 52,
        "exp": 840
    },
    "53": {
        "level": 53,
        "exp": 880
    },
    "54": {
        "level": 54,
        "exp": 920
    },
    "55": {
        "level": 55,
        "exp": 960
    },
    "56": {
        "level": 56,
        "exp": 1000
    },
    "57": {
        "level": 57,
        "exp": 1050
    },
    "58": {
        "level": 58,
        "exp": 1100
    },
    "59": {
        "level": 59,
        "exp": 1150
    },
    "60": {
        "level": 60,
        "exp": 1200
    },
    "61": {
        "level": 61,
        "exp": 1250
    },
    "62": {
        "level": 62,
        "exp": 1300
    },
    "63": {
        "level": 63,
        "exp": 1350
    },
    "64": {
        "level": 64,
        "exp": 1400
    },
    "65": {
        "level": 65,
        "exp": 1450
    },
    "66": {
        "level": 66,
        "exp": 1500
    },
    "67": {
        "level": 67,
        "exp": 1550
    },
    "68": {
        "level": 68,
        "exp": 1600
    },
    "69": {
        "level": 69,
        "exp": 1650
    },
    "70": {
        "level": 70,
        "exp": 1700
    },
    "71": {
        "level": 71,
        "exp": 1750
    },
    "72": {
        "level": 72,
        "exp": 1800
    },
    "73": {
        "level": 73,
        "exp": 1850
    },
    "74": {
        "level": 74,
        "exp": 1900
    },
    "75": {
        "level": 75,
        "exp": 1950
    },
    "76": {
        "level": 76,
        "exp": 2000
    },
    "77": {
        "level": 77,
        "exp": 2200
    },
    "78": {
        "level": 78,
        "exp": 2400
    },
    "79": {
        "level": 79,
        "exp": 2600
    },
    "80": {
        "level": 80,
        "exp": 2800
    },
    "81": {
        "level": 81,
        "exp": 3000
    },
    "82": {
        "level": 82,
        "exp": 3200
    },
    "83": {
        "level": 83,
        "exp": 3400
    },
    "84": {
        "level": 84,
        "exp": 3600
    },
    "85": {
        "level": 85,
        "exp": 3800
    },
    "86": {
        "level": 86,
        "exp": 4000
    },
    "87": {
        "level": 87,
        "exp": 4200
    },
    "88": {
        "level": 88,
        "exp": 4400
    },
    "89": {
        "level": 89,
        "exp": 4600
    },
    "90": {
        "level": 90,
        "exp": 4800
    },
    "91": {
        "level": 91,
        "exp": 5000
    },
    "92": {
        "level": 92,
        "exp": 6000
    },
    "93": {
        "level": 93,
        "exp": 7000
    },
    "94": {
        "level": 94,
        "exp": 8000
    },
    "95": {
        "level": 95,
        "exp": 9000
    },
    "96": {
        "level": 96,
        "exp": 10000
    },
    "97": {
        "level": 97,
        "exp": 15000
    },
    "98": {
        "level": 98,
        "exp": 20000
    },
    "99": {
        "level": 99,
        "exp": 50000
    }
});
    }
}