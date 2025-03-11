import { TConfig } from "./TConfig";


export interface ShieldCfg extends IConfig {id:number;shieldWord:string;}



export class ShieldCfgReader extends TConfig<ShieldCfg> {
    protected _name : string = "Shield";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "shieldWord": "雨伞运动"
    },
    "2": {
        "id": 2,
        "shieldWord": "占中三子"
    },
    "3": {
        "id": 3,
        "shieldWord": "荣休主教"
    },
    "4": {
        "id": 4,
        "shieldWord": "总统选举"
    },
    "5": {
        "id": 5,
        "shieldWord": "台湾政府"
    },
    "6": {
        "id": 6,
        "shieldWord": "国共合作"
    },
    "7": {
        "id": 7,
        "shieldWord": "两岸法律"
    },
    "8": {
        "id": 8,
        "shieldWord": "荷治"
    },
    "9": {
        "id": 9,
        "shieldWord": "日治"
    },
    "10": {
        "id": 10,
        "shieldWord": "斯普拉特利群岛"
    },
    "11": {
        "id": 11,
        "shieldWord": "东突厥斯坦"
    },
    "12": {
        "id": 12,
        "shieldWord": "穆斯林国家"
    },
    "13": {
        "id": 13,
        "shieldWord": "黑非洲"
    },
    "14": {
        "id": 14,
        "shieldWord": "激进伊斯兰组织"
    },
    "15": {
        "id": 15,
        "shieldWord": "十字军（东征）"
    },
    "16": {
        "id": 16,
        "shieldWord": "哈马斯"
    },
    "17": {
        "id": 17,
        "shieldWord": "乌克兰亲俄武装"
    },
    "18": {
        "id": 18,
        "shieldWord": "乌克兰民兵武装"
    },
    "19": {
        "id": 19,
        "shieldWord": "乌克兰分裂分子"
    },
    "20": {
        "id": 20,
        "shieldWord": "香蕉APP"
    },
    "21": {
        "id": 21,
        "shieldWord": "91porn"
    },
    "22": {
        "id": 22,
        "shieldWord": "pornhub"
    },
    "23": {
        "id": 23,
        "shieldWord": "xvideos"
    },
    "24": {
        "id": 24,
        "shieldWord": "李春城"
    },
    "25": {
        "id": 25,
        "shieldWord": "刘铁男"
    },
    "26": {
        "id": 26,
        "shieldWord": "倪发科"
    },
    "27": {
        "id": 27,
        "shieldWord": "郭永祥"
    },
    "28": {
        "id": 28,
        "shieldWord": "王素毅"
    },
    "29": {
        "id": 29,
        "shieldWord": "李达球"
    },
    "30": {
        "id": 30,
        "shieldWord": "蒋洁敏"
    },
    "31": {
        "id": 31,
        "shieldWord": "季建业"
    },
    "32": {
        "id": 32,
        "shieldWord": "廖少华"
    },
    "33": {
        "id": 33,
        "shieldWord": "陈柏槐"
    },
    "34": {
        "id": 34,
        "shieldWord": "郭有明"
    },
    "35": {
        "id": 35,
        "shieldWord": "陈安众"
    },
    "36": {
        "id": 36,
        "shieldWord": "童名谦"
    },
    "37": {
        "id": 37,
        "shieldWord": "李东生"
    },
    "38": {
        "id": 38,
        "shieldWord": "杨刚"
    },
    "39": {
        "id": 39,
        "shieldWord": "李崇禧"
    },
    "40": {
        "id": 40,
        "shieldWord": "冀文林"
    },
    "41": {
        "id": 41,
        "shieldWord": "祝作利"
    },
    "42": {
        "id": 42,
        "shieldWord": "金道铭"
    },
    "43": {
        "id": 43,
        "shieldWord": "沈培平"
    },
    "44": {
        "id": 44,
        "shieldWord": "姚木根"
    },
    "45": {
        "id": 45,
        "shieldWord": "申维辰"
    },
    "46": {
        "id": 46,
        "shieldWord": "毛小兵"
    },
    "47": {
        "id": 47,
        "shieldWord": "谭栖伟"
    },
    "48": {
        "id": 48,
        "shieldWord": "阳宝华"
    },
    "49": {
        "id": 49,
        "shieldWord": "赵智勇"
    },
    "50": {
        "id": 50,
        "shieldWord": "苏荣"
    },
    "51": {
        "id": 51,
        "shieldWord": "杜善学"
    },
    "52": {
        "id": 52,
        "shieldWord": "令政策"
    },
    "53": {
        "id": 53,
        "shieldWord": "万庆良"
    },
    "54": {
        "id": 54,
        "shieldWord": "徐才厚"
    },
    "55": {
        "id": 55,
        "shieldWord": "谭力"
    },
    "56": {
        "id": 56,
        "shieldWord": "韩先聪"
    },
    "57": {
        "id": 57,
        "shieldWord": "张田欣"
    },
    "58": {
        "id": 58,
        "shieldWord": "武长顺"
    },
    "59": {
        "id": 59,
        "shieldWord": "陈铁新"
    },
    "60": {
        "id": 60,
        "shieldWord": "周永康"
    },
    "61": {
        "id": 61,
        "shieldWord": "陈川平"
    },
    "62": {
        "id": 62,
        "shieldWord": "聂春玉"
    },
    "63": {
        "id": 63,
        "shieldWord": "白云"
    },
    "64": {
        "id": 64,
        "shieldWord": "白恩培"
    },
    "65": {
        "id": 65,
        "shieldWord": "任润厚"
    },
    "66": {
        "id": 66,
        "shieldWord": "潘逸阳"
    },
    "67": {
        "id": 67,
        "shieldWord": "秦玉海"
    },
    "68": {
        "id": 68,
        "shieldWord": "何家成"
    },
    "69": {
        "id": 69,
        "shieldWord": "赵少麟"
    },
    "70": {
        "id": 70,
        "shieldWord": "杨金山"
    },
    "71": {
        "id": 71,
        "shieldWord": "梁滨"
    },
    "72": {
        "id": 72,
        "shieldWord": "隋凤富"
    },
    "73": {
        "id": 73,
        "shieldWord": "朱明国"
    },
    "74": {
        "id": 74,
        "shieldWord": "王敏"
    },
    "75": {
        "id": 75,
        "shieldWord": "韩学键"
    },
    "76": {
        "id": 76,
        "shieldWord": "令计划"
    },
    "77": {
        "id": 77,
        "shieldWord": "孙鸿志"
    },
    "78": {
        "id": 78,
        "shieldWord": "杨卫泽"
    },
    "79": {
        "id": 79,
        "shieldWord": "叶万勇"
    },
    "80": {
        "id": 80,
        "shieldWord": "方文平"
    },
    "81": {
        "id": 81,
        "shieldWord": "马建"
    },
    "82": {
        "id": 82,
        "shieldWord": "陆武成"
    },
    "83": {
        "id": 83,
        "shieldWord": "斯鑫良"
    },
    "84": {
        "id": 84,
        "shieldWord": "许爱民"
    },
    "85": {
        "id": 85,
        "shieldWord": "苑世军"
    },
    "86": {
        "id": 86,
        "shieldWord": "景春华"
    },
    "87": {
        "id": 87,
        "shieldWord": "栗智"
    },
    "88": {
        "id": 88,
        "shieldWord": "仇和"
    },
    "89": {
        "id": 89,
        "shieldWord": "徐建一"
    },
    "90": {
        "id": 90,
        "shieldWord": "徐钢"
    },
    "91": {
        "id": 91,
        "shieldWord": "郭伯雄"
    },
    "92": {
        "id": 92,
        "shieldWord": "余远辉"
    },
    "93": {
        "id": 93,
        "shieldWord": "韩志然"
    },
    "94": {
        "id": 94,
        "shieldWord": "肖天"
    },
    "95": {
        "id": 95,
        "shieldWord": "乐大克"
    },
    "96": {
        "id": 96,
        "shieldWord": "奚晓明"
    },
    "97": {
        "id": 97,
        "shieldWord": "周本顺"
    },
    "98": {
        "id": 98,
        "shieldWord": "张力军"
    },
    "99": {
        "id": 99,
        "shieldWord": "赵黎平"
    },
    "100": {
        "id": 100,
        "shieldWord": "谷春立"
    },
    "101": {
        "id": 101,
        "shieldWord": "杨栋梁"
    },
    "102": {
        "id": 102,
        "shieldWord": "苏树林"
    },
    "103": {
        "id": 103,
        "shieldWord": "白雪山"
    },
    "104": {
        "id": 104,
        "shieldWord": "艾宝俊"
    },
    "105": {
        "id": 105,
        "shieldWord": "吕锡文"
    },
    "106": {
        "id": 106,
        "shieldWord": "孙清云"
    },
    "107": {
        "id": 107,
        "shieldWord": "姚刚"
    },
    "108": {
        "id": 108,
        "shieldWord": "盖如垠"
    },
    "109": {
        "id": 109,
        "shieldWord": "颜世元"
    },
    "110": {
        "id": 110,
        "shieldWord": "刘志勇"
    },
    "111": {
        "id": 111,
        "shieldWord": "曹建方"
    },
    "112": {
        "id": 112,
        "shieldWord": "魏宏"
    },
    "113": {
        "id": 113,
        "shieldWord": "陈雪枫"
    },
    "114": {
        "id": 114,
        "shieldWord": "龚清概"
    },
    "115": {
        "id": 115,
        "shieldWord": "刘礼祖"
    },
    "116": {
        "id": 116,
        "shieldWord": "王保安"
    },
    "117": {
        "id": 117,
        "shieldWord": "贺家铁"
    },
    "118": {
        "id": 118,
        "shieldWord": "刘志庚"
    },
    "119": {
        "id": 119,
        "shieldWord": "王珉"
    },
    "120": {
        "id": 120,
        "shieldWord": "卢子跃"
    },
    "121": {
        "id": 121,
        "shieldWord": "王阳"
    },
    "122": {
        "id": 122,
        "shieldWord": "李嘉"
    },
    "123": {
        "id": 123,
        "shieldWord": "张力夫"
    },
    "124": {
        "id": 124,
        "shieldWord": "苏宏章"
    },
    "125": {
        "id": 125,
        "shieldWord": "杨鲁豫"
    },
    "126": {
        "id": 126,
        "shieldWord": "李成云"
    },
    "127": {
        "id": 127,
        "shieldWord": "张越"
    },
    "128": {
        "id": 128,
        "shieldWord": "孔令中"
    },
    "129": {
        "id": 129,
        "shieldWord": "杨振超"
    },
    "130": {
        "id": 130,
        "shieldWord": "李云峰"
    },
    "131": {
        "id": 131,
        "shieldWord": "田修思"
    },
    "132": {
        "id": 132,
        "shieldWord": "赖德荣"
    },
    "133": {
        "id": 133,
        "shieldWord": "尹海林"
    },
    "134": {
        "id": 134,
        "shieldWord": "郑玉焯"
    },
    "135": {
        "id": 135,
        "shieldWord": "黄兴国"
    },
    "136": {
        "id": 136,
        "shieldWord": "陈树隆"
    },
    "137": {
        "id": 137,
        "shieldWord": "张文雄"
    },
    "138": {
        "id": 138,
        "shieldWord": "吴天君"
    },
    "139": {
        "id": 139,
        "shieldWord": "卢恩光"
    },
    "140": {
        "id": 140,
        "shieldWord": "虞海燕"
    },
    "141": {
        "id": 141,
        "shieldWord": "李立国"
    },
    "142": {
        "id": 142,
        "shieldWord": "窦玉沛"
    },
    "143": {
        "id": 143,
        "shieldWord": "李文科"
    },
    "144": {
        "id": 144,
        "shieldWord": "陈旭"
    },
    "145": {
        "id": 145,
        "shieldWord": "孙怀山"
    },
    "146": {
        "id": 146,
        "shieldWord": "项俊波"
    },
    "147": {
        "id": 147,
        "shieldWord": "杨崇勇"
    },
    "148": {
        "id": 148,
        "shieldWord": "张化为"
    },
    "149": {
        "id": 149,
        "shieldWord": "陈传书"
    },
    "150": {
        "id": 150,
        "shieldWord": "周春雨"
    },
    "151": {
        "id": 151,
        "shieldWord": "魏民洲"
    },
    "152": {
        "id": 152,
        "shieldWord": "刘新齐"
    },
    "153": {
        "id": 153,
        "shieldWord": "曲淑辉"
    },
    "154": {
        "id": 154,
        "shieldWord": "刘善桥"
    },
    "155": {
        "id": 155,
        "shieldWord": "张喜武"
    },
    "156": {
        "id": 156,
        "shieldWord": "王宏江"
    },
    "157": {
        "id": 157,
        "shieldWord": "王三运"
    },
    "158": {
        "id": 158,
        "shieldWord": "周化辰"
    },
    "159": {
        "id": 159,
        "shieldWord": "许前飞"
    },
    "160": {
        "id": 160,
        "shieldWord": "孙政才"
    },
    "161": {
        "id": 161,
        "shieldWord": "杨焕宁"
    },
    "162": {
        "id": 162,
        "shieldWord": "莫建成"
    },
    "163": {
        "id": 163,
        "shieldWord": "李刚"
    },
    "164": {
        "id": 164,
        "shieldWord": "沐华平"
    },
    "165": {
        "id": 165,
        "shieldWord": "何挺"
    },
    "166": {
        "id": 166,
        "shieldWord": "夏崇源"
    },
    "167": {
        "id": 167,
        "shieldWord": "吴爱英"
    },
    "168": {
        "id": 168,
        "shieldWord": "张阳"
    },
    "169": {
        "id": 169,
        "shieldWord": "鲁炜"
    },
    "170": {
        "id": 170,
        "shieldWord": "刘强"
    },
    "171": {
        "id": 171,
        "shieldWord": "张杰辉"
    },
    "172": {
        "id": 172,
        "shieldWord": "冯新柱"
    },
    "173": {
        "id": 173,
        "shieldWord": "季缃绮"
    },
    "174": {
        "id": 174,
        "shieldWord": "房峰辉"
    },
    "175": {
        "id": 175,
        "shieldWord": "李贻煌"
    },
    "176": {
        "id": 176,
        "shieldWord": "刘君"
    },
    "177": {
        "id": 177,
        "shieldWord": "杨晶"
    },
    "178": {
        "id": 178,
        "shieldWord": "王晓光"
    },
    "179": {
        "id": 179,
        "shieldWord": "白向群"
    },
    "180": {
        "id": 180,
        "shieldWord": "蒲波"
    },
    "181": {
        "id": 181,
        "shieldWord": "张少春"
    },
    "182": {
        "id": 182,
        "shieldWord": "曾志权"
    },
    "183": {
        "id": 183,
        "shieldWord": "艾文礼"
    },
    "184": {
        "id": 184,
        "shieldWord": "陈质枫"
    },
    "185": {
        "id": 185,
        "shieldWord": "吴浈"
    },
    "186": {
        "id": 186,
        "shieldWord": "王铁"
    },
    "187": {
        "id": 187,
        "shieldWord": "王尔智"
    },
    "188": {
        "id": 188,
        "shieldWord": "李士祥"
    },
    "189": {
        "id": 189,
        "shieldWord": "靳绥东"
    },
    "190": {
        "id": 190,
        "shieldWord": "努尔·白克力"
    },
    "191": {
        "id": 191,
        "shieldWord": "孟宏伟"
    },
    "192": {
        "id": 192,
        "shieldWord": "邢云"
    },
    "193": {
        "id": 193,
        "shieldWord": "钱引安"
    },
    "194": {
        "id": 194,
        "shieldWord": "缪瑞林"
    },
    "195": {
        "id": 195,
        "shieldWord": "李建华"
    },
    "196": {
        "id": 196,
        "shieldWord": "陈刚"
    },
    "197": {
        "id": 197,
        "shieldWord": "赵正永"
    },
    "198": {
        "id": 198,
        "shieldWord": "张茂才"
    },
    "199": {
        "id": 199,
        "shieldWord": "魏传忠"
    },
    "200": {
        "id": 200,
        "shieldWord": "彭宇行"
    },
    "201": {
        "id": 201,
        "shieldWord": "西藏自由"
    },
    "202": {
        "id": 202,
        "shieldWord": "灭共"
    },
    "203": {
        "id": 203,
        "shieldWord": "民猪"
    },
    "204": {
        "id": 204,
        "shieldWord": "殃视"
    },
    "205": {
        "id": 205,
        "shieldWord": "自由门"
    },
    "206": {
        "id": 206,
        "shieldWord": "博彩"
    },
    "207": {
        "id": 207,
        "shieldWord": "裸照"
    },
    "208": {
        "id": 208,
        "shieldWord": "女上门"
    },
    "209": {
        "id": 209,
        "shieldWord": "蒙汗药"
    },
    "210": {
        "id": 210,
        "shieldWord": "百家乐"
    },
    "211": {
        "id": 211,
        "shieldWord": "仿真枪"
    },
    "212": {
        "id": 212,
        "shieldWord": "古柯碱"
    },
    "213": {
        "id": 213,
        "shieldWord": "杨卫泽"
    },
    "214": {
        "id": 214,
        "shieldWord": "季建业"
    },
    "215": {
        "id": 215,
        "shieldWord": "李嘉"
    },
    "216": {
        "id": 216,
        "shieldWord": "万庆良"
    },
    "217": {
        "id": 217,
        "shieldWord": "321计划"
    },
    "218": {
        "id": 218,
        "shieldWord": "点杀"
    },
    "219": {
        "id": 219,
        "shieldWord": "专业网络推手"
    },
    "220": {
        "id": 220,
        "shieldWord": "猪回民"
    },
    "221": {
        "id": 221,
        "shieldWord": "英拉"
    },
    "222": {
        "id": 222,
        "shieldWord": "南海争端"
    },
    "223": {
        "id": 223,
        "shieldWord": "贸易战"
    },
    "224": {
        "id": 224,
        "shieldWord": "中美"
    },
    "225": {
        "id": 225,
        "shieldWord": "房产税"
    },
    "226": {
        "id": 226,
        "shieldWord": "套路"
    },
    "227": {
        "id": 227,
        "shieldWord": "B视"
    },
    "228": {
        "id": 228,
        "shieldWord": "白痴"
    },
    "229": {
        "id": 229,
        "shieldWord": "笨蛋"
    },
    "230": {
        "id": 230,
        "shieldWord": "绝食"
    },
    "231": {
        "id": 231,
        "shieldWord": "上床求欢"
    },
    "232": {
        "id": 232,
        "shieldWord": "政协领导人"
    },
    "233": {
        "id": 233,
        "shieldWord": "汪洋"
    },
    "234": {
        "id": 234,
        "shieldWord": "张庆黎天皇"
    },
    "235": {
        "id": 235,
        "shieldWord": "谷寿夫"
    },
    "236": {
        "id": 236,
        "shieldWord": "东条英机"
    },
    "237": {
        "id": 237,
        "shieldWord": "广田宏毅"
    },
    "238": {
        "id": 238,
        "shieldWord": "木村兵太郎"
    },
    "239": {
        "id": 239,
        "shieldWord": "板垣征四郎"
    },
    "240": {
        "id": 240,
        "shieldWord": "武藤章"
    },
    "241": {
        "id": 241,
        "shieldWord": "松冈洋右"
    },
    "242": {
        "id": 242,
        "shieldWord": "永野修身"
    },
    "243": {
        "id": 243,
        "shieldWord": "白鸟敏夫"
    },
    "244": {
        "id": 244,
        "shieldWord": "平沼骐一郎"
    },
    "245": {
        "id": 245,
        "shieldWord": "小矶国昭"
    },
    "246": {
        "id": 246,
        "shieldWord": "梅津美治郎"
    },
    "247": {
        "id": 247,
        "shieldWord": "东乡茂德"
    },
    "248": {
        "id": 248,
        "shieldWord": "黄皮猴子"
    },
    "249": {
        "id": 249,
        "shieldWord": "小眼佬"
    },
    "250": {
        "id": 250,
        "shieldWord": "chink"
    },
    "251": {
        "id": 251,
        "shieldWord": "刘奇葆"
    },
    "252": {
        "id": 252,
        "shieldWord": "帕巴拉·格列朗杰"
    },
    "253": {
        "id": 253,
        "shieldWord": "董建华"
    },
    "254": {
        "id": 254,
        "shieldWord": "万钢"
    },
    "255": {
        "id": 255,
        "shieldWord": "何厚烨"
    },
    "256": {
        "id": 256,
        "shieldWord": "卢展工"
    },
    "257": {
        "id": 257,
        "shieldWord": "王正伟"
    },
    "258": {
        "id": 258,
        "shieldWord": "马飚"
    },
    "259": {
        "id": 259,
        "shieldWord": "陈晓光"
    },
    "260": {
        "id": 260,
        "shieldWord": "梁振英"
    },
    "261": {
        "id": 261,
        "shieldWord": "夏宝龙"
    },
    "262": {
        "id": 262,
        "shieldWord": "杨传堂"
    },
    "263": {
        "id": 263,
        "shieldWord": "李斌"
    },
    "264": {
        "id": 264,
        "shieldWord": "巴特尔"
    },
    "265": {
        "id": 265,
        "shieldWord": "汪永清"
    },
    "266": {
        "id": 266,
        "shieldWord": "何立峰"
    },
    "267": {
        "id": 267,
        "shieldWord": "苏辉"
    },
    "268": {
        "id": 268,
        "shieldWord": "郑建邦"
    },
    "269": {
        "id": 269,
        "shieldWord": "辜胜阻"
    },
    "270": {
        "id": 270,
        "shieldWord": "刘新成"
    },
    "271": {
        "id": 271,
        "shieldWord": "何维"
    },
    "272": {
        "id": 272,
        "shieldWord": "邵鸿"
    },
    "273": {
        "id": 273,
        "shieldWord": "高云龙"
    },
    "274": {
        "id": 274,
        "shieldWord": "夏宝龙"
    },
    "275": {
        "id": 275,
        "shieldWord": "2017.11新增政治敏感人物"
    },
    "276": {
        "id": 276,
        "shieldWord": "江泽林"
    },
    "277": {
        "id": 277,
        "shieldWord": "丁来杭"
    },
    "278": {
        "id": 278,
        "shieldWord": "丁学东"
    },
    "279": {
        "id": 279,
        "shieldWord": "丁薛祥"
    },
    "280": {
        "id": 280,
        "shieldWord": "于伟国"
    },
    "281": {
        "id": 281,
        "shieldWord": "于忠福"
    },
    "282": {
        "id": 282,
        "shieldWord": "万立骏"
    },
    "283": {
        "id": 283,
        "shieldWord": "马飚"
    },
    "284": {
        "id": 284,
        "shieldWord": "马兴瑞"
    },
    "285": {
        "id": 285,
        "shieldWord": "王宁"
    },
    "286": {
        "id": 286,
        "shieldWord": "王军"
    },
    "287": {
        "id": 287,
        "shieldWord": "王勇"
    },
    "288": {
        "id": 288,
        "shieldWord": "王晨"
    },
    "289": {
        "id": 289,
        "shieldWord": "王毅"
    },
    "290": {
        "id": 290,
        "shieldWord": "王小洪"
    },
    "291": {
        "id": 291,
        "shieldWord": "王玉普"
    },
    "292": {
        "id": 292,
        "shieldWord": "王正伟"
    },
    "293": {
        "id": 293,
        "shieldWord": "王东明"
    },
    "294": {
        "id": 294,
        "shieldWord": "王东峰"
    },
    "295": {
        "id": 295,
        "shieldWord": "王尔乘"
    },
    "296": {
        "id": 296,
        "shieldWord": "王志民"
    },
    "297": {
        "id": 297,
        "shieldWord": "王志刚"
    },
    "298": {
        "id": 298,
        "shieldWord": "王沪宁"
    },
    "299": {
        "id": 299,
        "shieldWord": "王国生"
    },
    "300": {
        "id": 300,
        "shieldWord": "王建军"
    },
    "301": {
        "id": 301,
        "shieldWord": "王建武"
    },
    "302": {
        "id": 302,
        "shieldWord": "王晓东"
    },
    "303": {
        "id": 303,
        "shieldWord": "王晓晖"
    },
    "304": {
        "id": 304,
        "shieldWord": "王家胜"
    },
    "305": {
        "id": 305,
        "shieldWord": "王蒙徽"
    },
    "306": {
        "id": 306,
        "shieldWord": "尤权"
    },
    "307": {
        "id": 307,
        "shieldWord": "车俊"
    },
    "308": {
        "id": 308,
        "shieldWord": "尹力"
    },
    "309": {
        "id": 309,
        "shieldWord": "巴音朝鲁"
    },
    "310": {
        "id": 310,
        "shieldWord": "巴特尔"
    },
    "311": {
        "id": 311,
        "shieldWord": "艾力更·依明巴海"
    },
    "312": {
        "id": 312,
        "shieldWord": "石泰峰"
    },
    "313": {
        "id": 313,
        "shieldWord": "布小林"
    },
    "314": {
        "id": 314,
        "shieldWord": "卢展工"
    },
    "315": {
        "id": 315,
        "shieldWord": "白春礼"
    },
    "316": {
        "id": 316,
        "shieldWord": "吉炳轩"
    },
    "317": {
        "id": 317,
        "shieldWord": "毕井泉"
    },
    "318": {
        "id": 318,
        "shieldWord": "曲青山"
    },
    "319": {
        "id": 319,
        "shieldWord": "朱生岭"
    },
    "320": {
        "id": 320,
        "shieldWord": "刘奇"
    },
    "321": {
        "id": 321,
        "shieldWord": "刘雷"
    },
    "322": {
        "id": 322,
        "shieldWord": "刘鹤"
    },
    "323": {
        "id": 323,
        "shieldWord": "刘士余"
    },
    "324": {
        "id": 324,
        "shieldWord": "刘万龙"
    },
    "325": {
        "id": 325,
        "shieldWord": "刘奇葆"
    },
    "326": {
        "id": 326,
        "shieldWord": "刘国中"
    },
    "327": {
        "id": 327,
        "shieldWord": "刘国治"
    },
    "328": {
        "id": 328,
        "shieldWord": "刘金国"
    },
    "329": {
        "id": 329,
        "shieldWord": "刘结一"
    },
    "330": {
        "id": 330,
        "shieldWord": "刘振立"
    },
    "331": {
        "id": 331,
        "shieldWord": "刘家义"
    },
    "332": {
        "id": 332,
        "shieldWord": "刘赐贵"
    },
    "333": {
        "id": 333,
        "shieldWord": "刘粤军"
    },
    "334": {
        "id": 334,
        "shieldWord": "齐扎拉"
    },
    "335": {
        "id": 335,
        "shieldWord": "安兆庆"
    },
    "336": {
        "id": 336,
        "shieldWord": "许勤"
    },
    "337": {
        "id": 337,
        "shieldWord": "许又声"
    },
    "338": {
        "id": 338,
        "shieldWord": "许达哲"
    },
    "339": {
        "id": 339,
        "shieldWord": "许其亮"
    },
    "340": {
        "id": 340,
        "shieldWord": "阮成发"
    },
    "341": {
        "id": 341,
        "shieldWord": "孙志刚"
    },
    "342": {
        "id": 342,
        "shieldWord": "孙金龙"
    },
    "343": {
        "id": 343,
        "shieldWord": "孙绍骋"
    },
    "344": {
        "id": 344,
        "shieldWord": "孙春兰"
    },
    "345": {
        "id": 345,
        "shieldWord": "杜家毫"
    },
    "346": {
        "id": 346,
        "shieldWord": "李屹"
    },
    "347": {
        "id": 347,
        "shieldWord": "李希"
    },
    "348": {
        "id": 348,
        "shieldWord": "李斌"
    },
    "349": {
        "id": 349,
        "shieldWord": "李强"
    },
    "350": {
        "id": 350,
        "shieldWord": "李干杰"
    },
    "351": {
        "id": 351,
        "shieldWord": "李小鹏"
    },
    "352": {
        "id": 352,
        "shieldWord": "李凤彪"
    },
    "353": {
        "id": 353,
        "shieldWord": "李玉赋"
    },
    "354": {
        "id": 354,
        "shieldWord": "李传广"
    },
    "355": {
        "id": 355,
        "shieldWord": "李纪恒"
    },
    "356": {
        "id": 356,
        "shieldWord": "李克强"
    },
    "357": {
        "id": 357,
        "shieldWord": "李作成"
    },
    "358": {
        "id": 358,
        "shieldWord": "李尚福"
    },
    "359": {
        "id": 359,
        "shieldWord": "李国英"
    },
    "360": {
        "id": 360,
        "shieldWord": "李桥铭"
    },
    "361": {
        "id": 361,
        "shieldWord": "李晓红"
    },
    "362": {
        "id": 362,
        "shieldWord": "李鸿忠"
    },
    "363": {
        "id": 363,
        "shieldWord": "李锦斌"
    },
    "364": {
        "id": 364,
        "shieldWord": "杨学军"
    },
    "365": {
        "id": 365,
        "shieldWord": "杨洁篪"
    },
    "366": {
        "id": 366,
        "shieldWord": "杨振武"
    },
    "367": {
        "id": 367,
        "shieldWord": "杨晓渡"
    },
    "368": {
        "id": 368,
        "shieldWord": "肖捷"
    },
    "369": {
        "id": 369,
        "shieldWord": "肖亚庆"
    },
    "370": {
        "id": 370,
        "shieldWord": "吴社洲"
    },
    "371": {
        "id": 371,
        "shieldWord": "吴英杰"
    },
    "372": {
        "id": 372,
        "shieldWord": "吴政隆"
    },
    "373": {
        "id": 373,
        "shieldWord": "邱学强"
    },
    "374": {
        "id": 374,
        "shieldWord": "何平"
    },
    "375": {
        "id": 375,
        "shieldWord": "何立峰"
    },
    "376": {
        "id": 376,
        "shieldWord": "应勇"
    },
    "377": {
        "id": 377,
        "shieldWord": "冷溶"
    },
    "378": {
        "id": 378,
        "shieldWord": "汪洋"
    },
    "379": {
        "id": 379,
        "shieldWord": "汪永清"
    },
    "380": {
        "id": 380,
        "shieldWord": "沈金龙"
    },
    "381": {
        "id": 381,
        "shieldWord": "沈晓明"
    },
    "382": {
        "id": 382,
        "shieldWord": "沈跃跃"
    },
    "383": {
        "id": 383,
        "shieldWord": "沈德咏"
    },
    "384": {
        "id": 384,
        "shieldWord": "怀进鹏"
    },
    "385": {
        "id": 385,
        "shieldWord": "宋丹"
    },
    "386": {
        "id": 386,
        "shieldWord": "宋涛"
    },
    "387": {
        "id": 387,
        "shieldWord": "宋秀岩"
    },
    "388": {
        "id": 388,
        "shieldWord": "张军"
    },
    "389": {
        "id": 389,
        "shieldWord": "张又侠"
    },
    "390": {
        "id": 390,
        "shieldWord": "张升民"
    },
    "391": {
        "id": 391,
        "shieldWord": "张庆伟"
    },
    "392": {
        "id": 392,
        "shieldWord": "张庆黎"
    },
    "393": {
        "id": 393,
        "shieldWord": "张纪南"
    },
    "394": {
        "id": 394,
        "shieldWord": "张国清"
    },
    "395": {
        "id": 395,
        "shieldWord": "张春贤"
    },
    "396": {
        "id": 396,
        "shieldWord": "张晓明"
    },
    "397": {
        "id": 397,
        "shieldWord": "张裔炯"
    },
    "398": {
        "id": 398,
        "shieldWord": "陆昊"
    },
    "399": {
        "id": 399,
        "shieldWord": "陈希"
    },
    "400": {
        "id": 400,
        "shieldWord": "陈武"
    },
    "401": {
        "id": 401,
        "shieldWord": "陈豪"
    },
    "402": {
        "id": 402,
        "shieldWord": "陈文清"
    },
    "403": {
        "id": 403,
        "shieldWord": "陈吉宁"
    },
    "404": {
        "id": 404,
        "shieldWord": "陈全国"
    },
    "405": {
        "id": 405,
        "shieldWord": "陈求发"
    },
    "406": {
        "id": 406,
        "shieldWord": "陈宝生"
    },
    "407": {
        "id": 407,
        "shieldWord": "陈润儿"
    },
    "408": {
        "id": 408,
        "shieldWord": "陈敏尔"
    },
    "409": {
        "id": 409,
        "shieldWord": "努尔兰·阿不都满金"
    },
    "410": {
        "id": 410,
        "shieldWord": "苗圩"
    },
    "411": {
        "id": 411,
        "shieldWord": "苗华"
    },
    "412": {
        "id": 412,
        "shieldWord": "苟仲文"
    },
    "413": {
        "id": 413,
        "shieldWord": "范骁骏"
    },
    "414": {
        "id": 414,
        "shieldWord": "林铎"
    },
    "415": {
        "id": 415,
        "shieldWord": "尚宏"
    },
    "416": {
        "id": 416,
        "shieldWord": "金壮龙"
    },
    "417": {
        "id": 417,
        "shieldWord": "周强"
    },
    "418": {
        "id": 418,
        "shieldWord": "周亚宁"
    },
    "419": {
        "id": 419,
        "shieldWord": "郑和"
    },
    "420": {
        "id": 420,
        "shieldWord": "郑卫平"
    },
    "421": {
        "id": 421,
        "shieldWord": "郑晓松"
    },
    "422": {
        "id": 422,
        "shieldWord": "孟祥锋"
    },
    "423": {
        "id": 423,
        "shieldWord": "赵乐际"
    },
    "424": {
        "id": 424,
        "shieldWord": "赵克志"
    },
    "425": {
        "id": 425,
        "shieldWord": "赵宗岐"
    },
    "426": {
        "id": 426,
        "shieldWord": "郝鹏"
    },
    "427": {
        "id": 427,
        "shieldWord": "胡和平"
    },
    "428": {
        "id": 428,
        "shieldWord": "胡泽君"
    },
    "429": {
        "id": 429,
        "shieldWord": "胡春华"
    },
    "430": {
        "id": 430,
        "shieldWord": "咸辉"
    },
    "431": {
        "id": 431,
        "shieldWord": "钟山"
    },
    "432": {
        "id": 432,
        "shieldWord": "信春鹰"
    },
    "433": {
        "id": 433,
        "shieldWord": "侯建国"
    },
    "434": {
        "id": 434,
        "shieldWord": "娄勤俭"
    },
    "435": {
        "id": 435,
        "shieldWord": "洛桑江村"
    },
    "436": {
        "id": 436,
        "shieldWord": "骆惠宁"
    },
    "437": {
        "id": 437,
        "shieldWord": "秦生祥"
    },
    "438": {
        "id": 438,
        "shieldWord": "袁家军"
    },
    "439": {
        "id": 439,
        "shieldWord": "袁誉柏"
    },
    "440": {
        "id": 440,
        "shieldWord": "袁曙宏"
    },
    "441": {
        "id": 441,
        "shieldWord": "聂辰席"
    },
    "442": {
        "id": 442,
        "shieldWord": "栗战书"
    },
    "443": {
        "id": 443,
        "shieldWord": "钱小芊"
    },
    "444": {
        "id": 444,
        "shieldWord": "铁凝"
    },
    "445": {
        "id": 445,
        "shieldWord": "倪岳峰"
    },
    "446": {
        "id": 446,
        "shieldWord": "徐麟"
    },
    "447": {
        "id": 447,
        "shieldWord": "徐乐江"
    },
    "448": {
        "id": 448,
        "shieldWord": "徐安祥"
    },
    "449": {
        "id": 449,
        "shieldWord": "高津"
    },
    "450": {
        "id": 450,
        "shieldWord": "郭声琨"
    },
    "451": {
        "id": 451,
        "shieldWord": "郭树清"
    },
    "452": {
        "id": 452,
        "shieldWord": "唐仁健"
    },
    "453": {
        "id": 453,
        "shieldWord": "黄明"
    },
    "454": {
        "id": 454,
        "shieldWord": "黄守宏"
    },
    "455": {
        "id": 455,
        "shieldWord": "黄坤明"
    },
    "456": {
        "id": 456,
        "shieldWord": "黄树贤"
    },
    "457": {
        "id": 457,
        "shieldWord": "曹建明"
    },
    "458": {
        "id": 458,
        "shieldWord": "龚正"
    },
    "459": {
        "id": 459,
        "shieldWord": "盛斌"
    },
    "460": {
        "id": 460,
        "shieldWord": "雪克来提·扎克尔"
    },
    "461": {
        "id": 461,
        "shieldWord": "鄂竟平"
    },
    "462": {
        "id": 462,
        "shieldWord": "鹿心社"
    },
    "463": {
        "id": 463,
        "shieldWord": "谌贻琴"
    },
    "464": {
        "id": 464,
        "shieldWord": "彭清华"
    },
    "465": {
        "id": 465,
        "shieldWord": "蒋超良"
    },
    "466": {
        "id": 466,
        "shieldWord": "韩正"
    },
    "467": {
        "id": 467,
        "shieldWord": "韩卫国"
    },
    "468": {
        "id": 468,
        "shieldWord": "韩长赋"
    },
    "469": {
        "id": 469,
        "shieldWord": "傅政华"
    },
    "470": {
        "id": 470,
        "shieldWord": "谢伏瞻"
    },
    "471": {
        "id": 471,
        "shieldWord": "楼阳生"
    },
    "472": {
        "id": 472,
        "shieldWord": "蔡奇"
    },
    "473": {
        "id": 473,
        "shieldWord": "蔡名照"
    },
    "474": {
        "id": 474,
        "shieldWord": "雒树刚"
    },
    "475": {
        "id": 475,
        "shieldWord": "黎火辉"
    },
    "476": {
        "id": 476,
        "shieldWord": "潘立刚"
    },
    "477": {
        "id": 477,
        "shieldWord": "穆虹"
    },
    "478": {
        "id": 478,
        "shieldWord": "魏凤和"
    },
    "479": {
        "id": 479,
        "shieldWord": "装逼"
    },
    "480": {
        "id": 480,
        "shieldWord": "草泥马"
    },
    "481": {
        "id": 481,
        "shieldWord": "特么的"
    },
    "482": {
        "id": 482,
        "shieldWord": "撕逼"
    },
    "483": {
        "id": 483,
        "shieldWord": "玛拉戈壁"
    },
    "484": {
        "id": 484,
        "shieldWord": "爆菊"
    },
    "485": {
        "id": 485,
        "shieldWord": "JB"
    },
    "486": {
        "id": 486,
        "shieldWord": "呆逼"
    },
    "487": {
        "id": 487,
        "shieldWord": "本屌"
    },
    "488": {
        "id": 488,
        "shieldWord": "齐B短裙"
    },
    "489": {
        "id": 489,
        "shieldWord": "法克鱿"
    },
    "490": {
        "id": 490,
        "shieldWord": "丢你老母"
    },
    "491": {
        "id": 491,
        "shieldWord": "残废人"
    },
    "492": {
        "id": 492,
        "shieldWord": "独眼龙"
    },
    "493": {
        "id": 493,
        "shieldWord": "瞎子"
    },
    "494": {
        "id": 494,
        "shieldWord": "聋子"
    },
    "495": {
        "id": 495,
        "shieldWord": "傻子"
    },
    "496": {
        "id": 496,
        "shieldWord": "呆子"
    },
    "497": {
        "id": 497,
        "shieldWord": "弱智"
    },
    "498": {
        "id": 498,
        "shieldWord": "哇塞"
    },
    "499": {
        "id": 499,
        "shieldWord": "妈的"
    },
    "500": {
        "id": 500,
        "shieldWord": "PK"
    },
    "501": {
        "id": 501,
        "shieldWord": "TMD"
    },
    "502": {
        "id": 502,
        "shieldWord": "达菲鸡"
    },
    "503": {
        "id": 503,
        "shieldWord": "装13"
    },
    "504": {
        "id": 504,
        "shieldWord": "逼格"
    },
    "505": {
        "id": 505,
        "shieldWord": "蛋疼"
    },
    "506": {
        "id": 506,
        "shieldWord": "傻逼"
    },
    "507": {
        "id": 507,
        "shieldWord": "绿茶婊"
    },
    "508": {
        "id": 508,
        "shieldWord": "你妈的"
    },
    "509": {
        "id": 509,
        "shieldWord": "表砸"
    },
    "510": {
        "id": 510,
        "shieldWord": "屌爆了"
    },
    "511": {
        "id": 511,
        "shieldWord": "买了个婊"
    },
    "512": {
        "id": 512,
        "shieldWord": "已撸"
    },
    "513": {
        "id": 513,
        "shieldWord": "吉跋猫"
    },
    "514": {
        "id": 514,
        "shieldWord": "妈蛋"
    },
    "515": {
        "id": 515,
        "shieldWord": "逗比"
    },
    "516": {
        "id": 516,
        "shieldWord": "我靠"
    },
    "517": {
        "id": 517,
        "shieldWord": "碧莲"
    },
    "518": {
        "id": 518,
        "shieldWord": "碧池"
    },
    "519": {
        "id": 519,
        "shieldWord": "然并卵"
    },
    "520": {
        "id": 520,
        "shieldWord": "日了狗"
    },
    "521": {
        "id": 521,
        "shieldWord": "屁民"
    },
    "522": {
        "id": 522,
        "shieldWord": "吃翔"
    },
    "523": {
        "id": 523,
        "shieldWord": "XX狗"
    },
    "524": {
        "id": 524,
        "shieldWord": "淫家"
    },
    "525": {
        "id": 525,
        "shieldWord": "你妹"
    },
    "526": {
        "id": 526,
        "shieldWord": "浮尸国"
    },
    "527": {
        "id": 527,
        "shieldWord": "滚粗"
    },
    "528": {
        "id": 528,
        "shieldWord": "回回"
    },
    "529": {
        "id": 529,
        "shieldWord": "蛮子"
    },
    "530": {
        "id": 530,
        "shieldWord": "成员国"
    },
    "531": {
        "id": 531,
        "shieldWord": "尖阁群岛"
    },
    "532": {
        "id": 532,
        "shieldWord": "疆独"
    },
    "533": {
        "id": 533,
        "shieldWord": "维独"
    },
    "534": {
        "id": 534,
        "shieldWord": "北朝鲜"
    },
    "535": {
        "id": 535,
        "shieldWord": "NorthKorea"
    },
    "536": {
        "id": 536,
        "shieldWord": "中港"
    },
    "537": {
        "id": 537,
        "shieldWord": "中澳"
    },
    "538": {
        "id": 538,
        "shieldWord": "内港"
    },
    "539": {
        "id": 539,
        "shieldWord": "内澳"
    },
    "540": {
        "id": 540,
        "shieldWord": "梁振英"
    },
    "541": {
        "id": 541,
        "shieldWord": "曾荫权"
    },
    "542": {
        "id": 542,
        "shieldWord": "蒙古医生"
    },
    "543": {
        "id": 543,
        "shieldWord": "激情"
    },
    "544": {
        "id": 544,
        "shieldWord": "双飞母女"
    },
    "545": {
        "id": 545,
        "shieldWord": "自摸"
    },
    "546": {
        "id": 546,
        "shieldWord": "鷄巴"
    },
    "547": {
        "id": 547,
        "shieldWord": "蕩妇"
    },
    "548": {
        "id": 548,
        "shieldWord": "姘头"
    },
    "549": {
        "id": 549,
        "shieldWord": "隂户"
    },
    "550": {
        "id": 550,
        "shieldWord": "天天干"
    },
    "551": {
        "id": 551,
        "shieldWord": "回民猪"
    },
    "552": {
        "id": 552,
        "shieldWord": "Freetibet"
    },
    "553": {
        "id": 553,
        "shieldWord": "世界以利亚福音宣教会"
    },
    "554": {
        "id": 554,
        "shieldWord": "主神教"
    },
    "555": {
        "id": 555,
        "shieldWord": "同一教"
    },
    "556": {
        "id": 556,
        "shieldWord": "灵仙真佛宗"
    },
    "557": {
        "id": 557,
        "shieldWord": "天父的儿女"
    },
    "558": {
        "id": 558,
        "shieldWord": "达米宣教会"
    },
    "559": {
        "id": 559,
        "shieldWord": "徒弟会"
    },
    "560": {
        "id": 560,
        "shieldWord": "新约教会"
    },
    "561": {
        "id": 561,
        "shieldWord": "蓝鲸事件"
    },
    "562": {
        "id": 562,
        "shieldWord": "蓝鲸游戏"
    },
    "563": {
        "id": 563,
        "shieldWord": "恐怖组织招募"
    },
    "564": {
        "id": 564,
        "shieldWord": "废物"
    },
    "565": {
        "id": 565,
        "shieldWord": "死人"
    },
    "566": {
        "id": 566,
        "shieldWord": "约pao"
    },
    "567": {
        "id": 567,
        "shieldWord": "薹獨"
    },
    "568": {
        "id": 568,
        "shieldWord": "搞基"
    },
    "569": {
        "id": 569,
        "shieldWord": "基友"
    },
    "570": {
        "id": 570,
        "shieldWord": "小姐"
    },
    "571": {
        "id": 571,
        "shieldWord": "叫春"
    },
    "572": {
        "id": 572,
        "shieldWord": "龟頭"
    },
    "573": {
        "id": 573,
        "shieldWord": "隂茎"
    },
    "574": {
        "id": 574,
        "shieldWord": "撸管子"
    },
    "575": {
        "id": 575,
        "shieldWord": "处女"
    },
    "576": {
        "id": 576,
        "shieldWord": "站街"
    },
    "577": {
        "id": 577,
        "shieldWord": "浪货"
    },
    "578": {
        "id": 578,
        "shieldWord": "插干"
    },
    "579": {
        "id": 579,
        "shieldWord": "交欢"
    },
    "580": {
        "id": 580,
        "shieldWord": "足交"
    },
    "581": {
        "id": 581,
        "shieldWord": "av"
    },
    "582": {
        "id": 582,
        "shieldWord": "3P"
    },
    "583": {
        "id": 583,
        "shieldWord": "萨德"
    },
    "584": {
        "id": 584,
        "shieldWord": "朴槿惠"
    },
    "585": {
        "id": 585,
        "shieldWord": "松井石根"
    },
    "586": {
        "id": 586,
        "shieldWord": "土肥原贤二"
    },
    "587": {
        "id": 587,
        "shieldWord": "昭和"
    },
    "588": {
        "id": 588,
        "shieldWord": "东伊运"
    },
    "589": {
        "id": 589,
        "shieldWord": "杨尚昆"
    },
    "590": {
        "id": 590,
        "shieldWord": "世维会"
    },
    "591": {
        "id": 591,
        "shieldWord": "活佛"
    },
    "592": {
        "id": 592,
        "shieldWord": "仁波切"
    },
    "593": {
        "id": 593,
        "shieldWord": "中组部"
    },
    "594": {
        "id": 594,
        "shieldWord": "中宣部"
    },
    "595": {
        "id": 595,
        "shieldWord": "统战部"
    },
    "596": {
        "id": 596,
        "shieldWord": "中联部"
    },
    "597": {
        "id": 597,
        "shieldWord": "政法委"
    },
    "598": {
        "id": 598,
        "shieldWord": "国台办"
    },
    "599": {
        "id": 599,
        "shieldWord": "国务院"
    },
    "600": {
        "id": 600,
        "shieldWord": "发改委"
    },
    "601": {
        "id": 601,
        "shieldWord": "中纪委"
    },
    "602": {
        "id": 602,
        "shieldWord": "扫黄打非"
    },
    "603": {
        "id": 603,
        "shieldWord": "唐纳德·特朗普"
    },
    "604": {
        "id": 604,
        "shieldWord": "特朗普"
    },
    "605": {
        "id": 605,
        "shieldWord": "希拉里"
    },
    "606": {
        "id": 606,
        "shieldWord": "希拉里·克林顿"
    },
    "607": {
        "id": 607,
        "shieldWord": "金三胖"
    },
    "608": {
        "id": 608,
        "shieldWord": "鑫胖"
    },
    "609": {
        "id": 609,
        "shieldWord": "阿努纳恰尔邦"
    },
    "610": {
        "id": 610,
        "shieldWord": "钓鱼台列岛"
    },
    "611": {
        "id": 611,
        "shieldWord": "阿克塞钦"
    },
    "612": {
        "id": 612,
        "shieldWord": "间岛"
    },
    "613": {
        "id": 613,
        "shieldWord": "萨哈林岛"
    },
    "614": {
        "id": 614,
        "shieldWord": "丹增嘉措"
    },
    "615": {
        "id": 615,
        "shieldWord": "拉木登珠"
    },
    "616": {
        "id": 616,
        "shieldWord": "大卫教"
    },
    "617": {
        "id": 617,
        "shieldWord": "人民圣殿教"
    },
    "618": {
        "id": 618,
        "shieldWord": "太阳圣殿教"
    },
    "619": {
        "id": 619,
        "shieldWord": "黑魔教"
    },
    "620": {
        "id": 620,
        "shieldWord": "大白兄弟会"
    },
    "621": {
        "id": 621,
        "shieldWord": "奥姆真理教"
    },
    "622": {
        "id": 622,
        "shieldWord": "被立教"
    },
    "623": {
        "id": 623,
        "shieldWord": "被立王"
    },
    "624": {
        "id": 624,
        "shieldWord": "呼喊派"
    },
    "625": {
        "id": 625,
        "shieldWord": "统一教"
    },
    "626": {
        "id": 626,
        "shieldWord": "政治敏感人物国内政要人物"
    },
    "627": {
        "id": 627,
        "shieldWord": "毛泽东"
    },
    "628": {
        "id": 628,
        "shieldWord": "周恩来"
    },
    "629": {
        "id": 629,
        "shieldWord": "刘少奇"
    },
    "630": {
        "id": 630,
        "shieldWord": "朱德"
    },
    "631": {
        "id": 631,
        "shieldWord": "彭德怀"
    },
    "632": {
        "id": 632,
        "shieldWord": "林彪"
    },
    "633": {
        "id": 633,
        "shieldWord": "刘伯承"
    },
    "634": {
        "id": 634,
        "shieldWord": "陈毅"
    },
    "635": {
        "id": 635,
        "shieldWord": "贺龙"
    },
    "636": {
        "id": 636,
        "shieldWord": "聂荣臻"
    },
    "637": {
        "id": 637,
        "shieldWord": "徐向前"
    },
    "638": {
        "id": 638,
        "shieldWord": "罗荣桓"
    },
    "639": {
        "id": 639,
        "shieldWord": "叶剑英"
    },
    "640": {
        "id": 640,
        "shieldWord": "李大钊"
    },
    "641": {
        "id": 641,
        "shieldWord": "陈独秀"
    },
    "642": {
        "id": 642,
        "shieldWord": "孙中山"
    },
    "643": {
        "id": 643,
        "shieldWord": "孙文"
    },
    "644": {
        "id": 644,
        "shieldWord": "孙逸仙"
    },
    "645": {
        "id": 645,
        "shieldWord": "邓小平"
    },
    "646": {
        "id": 646,
        "shieldWord": "陈云"
    },
    "647": {
        "id": 647,
        "shieldWord": "江泽民"
    },
    "648": {
        "id": 648,
        "shieldWord": "李鹏"
    },
    "649": {
        "id": 649,
        "shieldWord": "朱镕基"
    },
    "650": {
        "id": 650,
        "shieldWord": "李瑞环"
    },
    "651": {
        "id": 651,
        "shieldWord": "尉健行"
    },
    "652": {
        "id": 652,
        "shieldWord": "李岚清"
    },
    "653": {
        "id": 653,
        "shieldWord": "胡锦涛"
    },
    "654": {
        "id": 654,
        "shieldWord": "罗干"
    },
    "655": {
        "id": 655,
        "shieldWord": "温家宝"
    },
    "656": {
        "id": 656,
        "shieldWord": "吴邦国"
    },
    "657": {
        "id": 657,
        "shieldWord": "曾庆红"
    },
    "658": {
        "id": 658,
        "shieldWord": "贾庆林"
    },
    "659": {
        "id": 659,
        "shieldWord": "黄菊"
    },
    "660": {
        "id": 660,
        "shieldWord": "吴官正"
    },
    "661": {
        "id": 661,
        "shieldWord": "李长春"
    },
    "662": {
        "id": 662,
        "shieldWord": "吴仪"
    },
    "663": {
        "id": 663,
        "shieldWord": "回良玉"
    },
    "664": {
        "id": 664,
        "shieldWord": "曾培炎"
    },
    "665": {
        "id": 665,
        "shieldWord": "曹刚川"
    },
    "666": {
        "id": 666,
        "shieldWord": "唐家璇"
    },
    "667": {
        "id": 667,
        "shieldWord": "华建敏"
    },
    "668": {
        "id": 668,
        "shieldWord": "陈至立"
    },
    "669": {
        "id": 669,
        "shieldWord": "张德江"
    },
    "670": {
        "id": 670,
        "shieldWord": "俞正声"
    },
    "671": {
        "id": 671,
        "shieldWord": "王乐泉"
    },
    "672": {
        "id": 672,
        "shieldWord": "刘云山"
    },
    "673": {
        "id": 673,
        "shieldWord": "王刚"
    },
    "674": {
        "id": 674,
        "shieldWord": "王兆国"
    },
    "675": {
        "id": 675,
        "shieldWord": "刘淇"
    },
    "676": {
        "id": 676,
        "shieldWord": "贺国强"
    },
    "677": {
        "id": 677,
        "shieldWord": "郭伯雄"
    },
    "678": {
        "id": 678,
        "shieldWord": "胡耀邦"
    },
    "679": {
        "id": 679,
        "shieldWord": "习近平"
    },
    "680": {
        "id": 680,
        "shieldWord": "李克强"
    },
    "681": {
        "id": 681,
        "shieldWord": "张高丽"
    },
    "682": {
        "id": 682,
        "shieldWord": "刘延东"
    },
    "683": {
        "id": 683,
        "shieldWord": "彭丽媛"
    },
    "684": {
        "id": 684,
        "shieldWord": "王岐山"
    },
    "685": {
        "id": 685,
        "shieldWord": "华国锋"
    },
    "686": {
        "id": 686,
        "shieldWord": "刘奇葆"
    },
    "687": {
        "id": 687,
        "shieldWord": "习大大"
    },
    "688": {
        "id": 688,
        "shieldWord": "吴帮国"
    },
    "689": {
        "id": 689,
        "shieldWord": "无帮国"
    },
    "690": {
        "id": 690,
        "shieldWord": "无邦国"
    },
    "691": {
        "id": 691,
        "shieldWord": "无帮过"
    },
    "692": {
        "id": 692,
        "shieldWord": "瘟家宝"
    },
    "693": {
        "id": 693,
        "shieldWord": "假庆林"
    },
    "694": {
        "id": 694,
        "shieldWord": "甲庆林"
    },
    "695": {
        "id": 695,
        "shieldWord": "假青林"
    },
    "696": {
        "id": 696,
        "shieldWord": "离长春"
    },
    "697": {
        "id": 697,
        "shieldWord": "习远平"
    },
    "698": {
        "id": 698,
        "shieldWord": "袭近平"
    },
    "699": {
        "id": 699,
        "shieldWord": "李磕墙"
    },
    "700": {
        "id": 700,
        "shieldWord": "贺过墙"
    },
    "701": {
        "id": 701,
        "shieldWord": "和锅枪"
    },
    "702": {
        "id": 702,
        "shieldWord": "胡主席"
    },
    "703": {
        "id": 703,
        "shieldWord": "习主席"
    },
    "704": {
        "id": 704,
        "shieldWord": "毛主席"
    },
    "705": {
        "id": 705,
        "shieldWord": "毛主度"
    },
    "706": {
        "id": 706,
        "shieldWord": "马凯"
    },
    "707": {
        "id": 707,
        "shieldWord": "王沪宁"
    },
    "708": {
        "id": 708,
        "shieldWord": "许其亮"
    },
    "709": {
        "id": 709,
        "shieldWord": "孙春兰"
    },
    "710": {
        "id": 710,
        "shieldWord": "孙政才"
    },
    "711": {
        "id": 711,
        "shieldWord": "李建国"
    },
    "712": {
        "id": 712,
        "shieldWord": "李源潮"
    },
    "713": {
        "id": 713,
        "shieldWord": "汪洋"
    },
    "714": {
        "id": 714,
        "shieldWord": "张春贤"
    },
    "715": {
        "id": 715,
        "shieldWord": "范长龙"
    },
    "716": {
        "id": 716,
        "shieldWord": "孟建柱"
    },
    "717": {
        "id": 717,
        "shieldWord": "赵乐际"
    },
    "718": {
        "id": 718,
        "shieldWord": "胡春华"
    },
    "719": {
        "id": 719,
        "shieldWord": "栗战书"
    },
    "720": {
        "id": 720,
        "shieldWord": "郭金龙"
    },
    "721": {
        "id": 721,
        "shieldWord": "韩正"
    },
    "722": {
        "id": 722,
        "shieldWord": "蔡英文"
    },
    "723": {
        "id": 723,
        "shieldWord": "国外政要人物"
    },
    "724": {
        "id": 724,
        "shieldWord": "布什"
    },
    "725": {
        "id": 725,
        "shieldWord": "布莱尔"
    },
    "726": {
        "id": 726,
        "shieldWord": "小泉"
    },
    "727": {
        "id": 727,
        "shieldWord": "纯一郎"
    },
    "728": {
        "id": 728,
        "shieldWord": "萨马兰奇"
    },
    "729": {
        "id": 729,
        "shieldWord": "安南"
    },
    "730": {
        "id": 730,
        "shieldWord": "阿拉法特"
    },
    "731": {
        "id": 731,
        "shieldWord": "普京"
    },
    "732": {
        "id": 732,
        "shieldWord": "默克尔"
    },
    "733": {
        "id": 733,
        "shieldWord": "克林顿"
    },
    "734": {
        "id": 734,
        "shieldWord": "里根"
    },
    "735": {
        "id": 735,
        "shieldWord": "尼克松"
    },
    "736": {
        "id": 736,
        "shieldWord": "林肯"
    },
    "737": {
        "id": 737,
        "shieldWord": "杜鲁门"
    },
    "738": {
        "id": 738,
        "shieldWord": "赫鲁晓夫"
    },
    "739": {
        "id": 739,
        "shieldWord": "列宁"
    },
    "740": {
        "id": 740,
        "shieldWord": "斯大林"
    },
    "741": {
        "id": 741,
        "shieldWord": "马克思"
    },
    "742": {
        "id": 742,
        "shieldWord": "恩格斯"
    },
    "743": {
        "id": 743,
        "shieldWord": "金正日"
    },
    "744": {
        "id": 744,
        "shieldWord": "金日成"
    },
    "745": {
        "id": 745,
        "shieldWord": "萨达姆"
    },
    "746": {
        "id": 746,
        "shieldWord": "胡志明"
    },
    "747": {
        "id": 747,
        "shieldWord": "西哈努克"
    },
    "748": {
        "id": 748,
        "shieldWord": "希拉克"
    },
    "749": {
        "id": 749,
        "shieldWord": "撒切尔"
    },
    "750": {
        "id": 750,
        "shieldWord": "阿罗约"
    },
    "751": {
        "id": 751,
        "shieldWord": "曼德拉"
    },
    "752": {
        "id": 752,
        "shieldWord": "卡斯特罗"
    },
    "753": {
        "id": 753,
        "shieldWord": "富兰克林"
    },
    "754": {
        "id": 754,
        "shieldWord": "华盛顿"
    },
    "755": {
        "id": 755,
        "shieldWord": "艾森豪威尔威尔"
    },
    "756": {
        "id": 756,
        "shieldWord": "拿破仑"
    },
    "757": {
        "id": 757,
        "shieldWord": "亚历山大"
    },
    "758": {
        "id": 758,
        "shieldWord": "路易"
    },
    "759": {
        "id": 759,
        "shieldWord": "拉姆斯菲尔德"
    },
    "760": {
        "id": 760,
        "shieldWord": "劳拉"
    },
    "761": {
        "id": 761,
        "shieldWord": "鲍威尔"
    },
    "762": {
        "id": 762,
        "shieldWord": "奥巴马"
    },
    "763": {
        "id": 763,
        "shieldWord": "梅德韦杰夫"
    },
    "764": {
        "id": 764,
        "shieldWord": "金正恩"
    },
    "765": {
        "id": 765,
        "shieldWord": "安倍晋三"
    },
    "766": {
        "id": 766,
        "shieldWord": "唐纳德·特朗普"
    },
    "767": {
        "id": 767,
        "shieldWord": "特朗普"
    },
    "768": {
        "id": 768,
        "shieldWord": "希拉里"
    },
    "769": {
        "id": 769,
        "shieldWord": "希拉里·克林顿"
    },
    "770": {
        "id": 770,
        "shieldWord": "敏感人物名称或代号"
    },
    "771": {
        "id": 771,
        "shieldWord": "本拉登"
    },
    "772": {
        "id": 772,
        "shieldWord": "奥马尔"
    },
    "773": {
        "id": 773,
        "shieldWord": "柴玲"
    },
    "774": {
        "id": 774,
        "shieldWord": "达赖"
    },
    "775": {
        "id": 775,
        "shieldWord": "达赖喇嘛"
    },
    "776": {
        "id": 776,
        "shieldWord": "江青"
    },
    "777": {
        "id": 777,
        "shieldWord": "张春桥"
    },
    "778": {
        "id": 778,
        "shieldWord": "姚文元"
    },
    "779": {
        "id": 779,
        "shieldWord": "王洪文"
    },
    "780": {
        "id": 780,
        "shieldWord": "东条英机"
    },
    "781": {
        "id": 781,
        "shieldWord": "希特勒"
    },
    "782": {
        "id": 782,
        "shieldWord": "墨索里尼"
    },
    "783": {
        "id": 783,
        "shieldWord": "冈村秀树"
    },
    "784": {
        "id": 784,
        "shieldWord": "冈村宁次"
    },
    "785": {
        "id": 785,
        "shieldWord": "高丽朴"
    },
    "786": {
        "id": 786,
        "shieldWord": "赵紫阳"
    },
    "787": {
        "id": 787,
        "shieldWord": "王丹"
    },
    "788": {
        "id": 788,
        "shieldWord": "沃尔开西"
    },
    "789": {
        "id": 789,
        "shieldWord": "李洪志"
    },
    "790": {
        "id": 790,
        "shieldWord": "李大师"
    },
    "791": {
        "id": 791,
        "shieldWord": "赖昌星"
    },
    "792": {
        "id": 792,
        "shieldWord": "马加爵"
    },
    "793": {
        "id": 793,
        "shieldWord": "班禅"
    },
    "794": {
        "id": 794,
        "shieldWord": "额尔德尼"
    },
    "795": {
        "id": 795,
        "shieldWord": "山本五十六"
    },
    "796": {
        "id": 796,
        "shieldWord": "阿扁"
    },
    "797": {
        "id": 797,
        "shieldWord": "阿扁万岁"
    },
    "798": {
        "id": 798,
        "shieldWord": "热那亚"
    },
    "799": {
        "id": 799,
        "shieldWord": "薄熙来"
    },
    "800": {
        "id": 800,
        "shieldWord": "周永康"
    },
    "801": {
        "id": 801,
        "shieldWord": "王立军"
    },
    "802": {
        "id": 802,
        "shieldWord": "令计划"
    },
    "803": {
        "id": 803,
        "shieldWord": "默罕默德"
    },
    "804": {
        "id": 804,
        "shieldWord": "徐才厚"
    },
    "805": {
        "id": 805,
        "shieldWord": "粥永康"
    },
    "806": {
        "id": 806,
        "shieldWord": "轴永康"
    },
    "807": {
        "id": 807,
        "shieldWord": "肘永康"
    },
    "808": {
        "id": 808,
        "shieldWord": "周健康"
    },
    "809": {
        "id": 809,
        "shieldWord": "粥健康"
    },
    "810": {
        "id": 810,
        "shieldWord": "周小康"
    },
    "811": {
        "id": 811,
        "shieldWord": "陈良宇"
    },
    "812": {
        "id": 812,
        "shieldWord": "李登辉"
    },
    "813": {
        "id": 813,
        "shieldWord": "连战"
    },
    "814": {
        "id": 814,
        "shieldWord": "宋楚瑜"
    },
    "815": {
        "id": 815,
        "shieldWord": "吕秀莲"
    },
    "816": {
        "id": 816,
        "shieldWord": "郁慕明"
    },
    "817": {
        "id": 817,
        "shieldWord": "蒋介石"
    },
    "818": {
        "id": 818,
        "shieldWord": "蒋中正"
    },
    "819": {
        "id": 819,
        "shieldWord": "蒋经国"
    },
    "820": {
        "id": 820,
        "shieldWord": "马英九"
    },
    "821": {
        "id": 821,
        "shieldWord": "蔡英文"
    },
    "822": {
        "id": 822,
        "shieldWord": "金三胖"
    },
    "823": {
        "id": 823,
        "shieldWord": "鑫胖"
    },
    "824": {
        "id": 824,
        "shieldWord": "丹增嘉措"
    },
    "825": {
        "id": 825,
        "shieldWord": "拉木登珠"
    },
    "826": {
        "id": 826,
        "shieldWord": "阿鲁纳恰尔邦"
    },
    "827": {
        "id": 827,
        "shieldWord": "回民是猪"
    },
    "828": {
        "id": 828,
        "shieldWord": "中华大陆行政执事站"
    },
    "829": {
        "id": 829,
        "shieldWord": "港独"
    },
    "830": {
        "id": 830,
        "shieldWord": "中华大陆执事站"
    },
    "831": {
        "id": 831,
        "shieldWord": "黄岩岛"
    },
    "832": {
        "id": 832,
        "shieldWord": "香港建国"
    },
    "833": {
        "id": 833,
        "shieldWord": "香港国"
    },
    "834": {
        "id": 834,
        "shieldWord": "南海不属于中国"
    },
    "835": {
        "id": 835,
        "shieldWord": "日本钓鱼岛"
    },
    "836": {
        "id": 836,
        "shieldWord": "中组部"
    },
    "837": {
        "id": 837,
        "shieldWord": "中宣部"
    },
    "838": {
        "id": 838,
        "shieldWord": "统战部"
    },
    "839": {
        "id": 839,
        "shieldWord": "中联部"
    },
    "840": {
        "id": 840,
        "shieldWord": "政法委"
    },
    "841": {
        "id": 841,
        "shieldWord": "国台办"
    },
    "842": {
        "id": 842,
        "shieldWord": "国务院"
    },
    "843": {
        "id": 843,
        "shieldWord": "发改委"
    },
    "844": {
        "id": 844,
        "shieldWord": "中纪委"
    },
    "845": {
        "id": 845,
        "shieldWord": "唐纳德·特朗普"
    },
    "846": {
        "id": 846,
        "shieldWord": "特朗普"
    },
    "847": {
        "id": 847,
        "shieldWord": "希拉里"
    },
    "848": {
        "id": 848,
        "shieldWord": "希拉里·克林顿"
    },
    "849": {
        "id": 849,
        "shieldWord": "金三胖"
    },
    "850": {
        "id": 850,
        "shieldWord": "鑫胖"
    },
    "851": {
        "id": 851,
        "shieldWord": "阿努纳恰尔邦"
    },
    "852": {
        "id": 852,
        "shieldWord": "钓鱼台列岛"
    },
    "853": {
        "id": 853,
        "shieldWord": "阿克塞钦"
    },
    "854": {
        "id": 854,
        "shieldWord": "间岛"
    },
    "855": {
        "id": 855,
        "shieldWord": "萨哈林岛"
    },
    "856": {
        "id": 856,
        "shieldWord": "丹增嘉措"
    },
    "857": {
        "id": 857,
        "shieldWord": "拉木登珠"
    },
    "858": {
        "id": 858,
        "shieldWord": "台湾不是中国的"
    },
    "859": {
        "id": 859,
        "shieldWord": "南海不是中国的"
    },
    "860": {
        "id": 860,
        "shieldWord": "恐怖分子"
    },
    "861": {
        "id": 861,
        "shieldWord": "陈浩天"
    },
    "862": {
        "id": 862,
        "shieldWord": "钓鱼岛是日本的"
    },
    "863": {
        "id": 863,
        "shieldWord": "中组部"
    },
    "864": {
        "id": 864,
        "shieldWord": "中宣部"
    },
    "865": {
        "id": 865,
        "shieldWord": "统战部"
    },
    "866": {
        "id": 866,
        "shieldWord": "中联部"
    },
    "867": {
        "id": 867,
        "shieldWord": "政法委"
    },
    "868": {
        "id": 868,
        "shieldWord": "国台办"
    },
    "869": {
        "id": 869,
        "shieldWord": "国务院"
    },
    "870": {
        "id": 870,
        "shieldWord": "发改委"
    },
    "871": {
        "id": 871,
        "shieldWord": "中纪委"
    },
    "872": {
        "id": 872,
        "shieldWord": "扫黄打非"
    },
    "873": {
        "id": 873,
        "shieldWord": "唐纳德·特朗普"
    },
    "874": {
        "id": 874,
        "shieldWord": "特朗普"
    },
    "875": {
        "id": 875,
        "shieldWord": "希拉里"
    },
    "876": {
        "id": 876,
        "shieldWord": "希拉里·克林顿"
    },
    "877": {
        "id": 877,
        "shieldWord": "大卫教"
    },
    "878": {
        "id": 878,
        "shieldWord": "人民圣殿教"
    },
    "879": {
        "id": 879,
        "shieldWord": "太阳圣殿教"
    },
    "880": {
        "id": 880,
        "shieldWord": "黑魔教"
    },
    "881": {
        "id": 881,
        "shieldWord": "大白兄弟会"
    },
    "882": {
        "id": 882,
        "shieldWord": "奥姆真理教"
    },
    "883": {
        "id": 883,
        "shieldWord": "被立教"
    },
    "884": {
        "id": 884,
        "shieldWord": "被立王"
    },
    "885": {
        "id": 885,
        "shieldWord": "呼喊派"
    },
    "886": {
        "id": 886,
        "shieldWord": "东伊运"
    },
    "887": {
        "id": 887,
        "shieldWord": "杨尚昆"
    },
    "888": {
        "id": 888,
        "shieldWord": "世维会"
    },
    "889": {
        "id": 889,
        "shieldWord": "搞港独台独"
    },
    "890": {
        "id": 890,
        "shieldWord": "汉奸卖国"
    },
    "891": {
        "id": 891,
        "shieldWord": "香港民族党"
    },
    "892": {
        "id": 892,
        "shieldWord": "独立建国"
    },
    "893": {
        "id": 893,
        "shieldWord": "东伊运"
    },
    "894": {
        "id": 894,
        "shieldWord": "杨尚昆"
    },
    "895": {
        "id": 895,
        "shieldWord": "世维会"
    },
    "896": {
        "id": 896,
        "shieldWord": "黄皮猴子"
    },
    "897": {
        "id": 897,
        "shieldWord": "小眼佬"
    },
    "898": {
        "id": 898,
        "shieldWord": "chink"
    },
    "899": {
        "id": 899,
        "shieldWord": "政治敏感词汇"
    },
    "900": {
        "id": 900,
        "shieldWord": "政治"
    },
    "901": {
        "id": 901,
        "shieldWord": "中共"
    },
    "902": {
        "id": 902,
        "shieldWord": "共产党"
    },
    "903": {
        "id": 903,
        "shieldWord": "中组部"
    },
    "904": {
        "id": 904,
        "shieldWord": "中宣部"
    },
    "905": {
        "id": 905,
        "shieldWord": "统战部"
    },
    "906": {
        "id": 906,
        "shieldWord": "中联部"
    },
    "907": {
        "id": 907,
        "shieldWord": "政法委"
    },
    "908": {
        "id": 908,
        "shieldWord": "国台办"
    },
    "909": {
        "id": 909,
        "shieldWord": "国务院"
    },
    "910": {
        "id": 910,
        "shieldWord": "发改委"
    },
    "911": {
        "id": 911,
        "shieldWord": "中纪委"
    },
    "912": {
        "id": 912,
        "shieldWord": "共青团"
    },
    "913": {
        "id": 913,
        "shieldWord": "中央电视台"
    },
    "914": {
        "id": 914,
        "shieldWord": "扫黄打非"
    },
    "915": {
        "id": 915,
        "shieldWord": "南海仲裁"
    },
    "916": {
        "id": 916,
        "shieldWord": "占中"
    },
    "917": {
        "id": 917,
        "shieldWord": "警察"
    },
    "918": {
        "id": 918,
        "shieldWord": "派出所"
    },
    "919": {
        "id": 919,
        "shieldWord": "搞港独台独"
    },
    "920": {
        "id": 920,
        "shieldWord": "汉奸卖国"
    },
    "921": {
        "id": 921,
        "shieldWord": "香港民族党"
    },
    "922": {
        "id": 922,
        "shieldWord": "独立建国"
    },
    "923": {
        "id": 923,
        "shieldWord": "萨德"
    },
    "924": {
        "id": 924,
        "shieldWord": "涉嫌反动"
    },
    "925": {
        "id": 925,
        "shieldWord": "恐怖主义敏感词汇"
    },
    "926": {
        "id": 926,
        "shieldWord": "ISIS"
    },
    "927": {
        "id": 927,
        "shieldWord": "六四"
    },
    "928": {
        "id": 928,
        "shieldWord": "六四运动"
    },
    "929": {
        "id": 929,
        "shieldWord": "美国之音"
    },
    "930": {
        "id": 930,
        "shieldWord": "密宗"
    },
    "931": {
        "id": 931,
        "shieldWord": "民国"
    },
    "932": {
        "id": 932,
        "shieldWord": "民进党"
    },
    "933": {
        "id": 933,
        "shieldWord": "民运"
    },
    "934": {
        "id": 934,
        "shieldWord": "民主"
    },
    "935": {
        "id": 935,
        "shieldWord": "民主潮"
    },
    "936": {
        "id": 936,
        "shieldWord": "摩门教"
    },
    "937": {
        "id": 937,
        "shieldWord": "纳粹"
    },
    "938": {
        "id": 938,
        "shieldWord": "南华早报"
    },
    "939": {
        "id": 939,
        "shieldWord": "南蛮"
    },
    "940": {
        "id": 940,
        "shieldWord": "明慧网"
    },
    "941": {
        "id": 941,
        "shieldWord": "起义"
    },
    "942": {
        "id": 942,
        "shieldWord": "亲民党"
    },
    "943": {
        "id": 943,
        "shieldWord": "瘸腿帮"
    },
    "944": {
        "id": 944,
        "shieldWord": "人民报"
    },
    "945": {
        "id": 945,
        "shieldWord": "法轮功"
    },
    "946": {
        "id": 946,
        "shieldWord": "法轮大法"
    },
    "947": {
        "id": 947,
        "shieldWord": "打倒共产党"
    },
    "948": {
        "id": 948,
        "shieldWord": "台独万岁"
    },
    "949": {
        "id": 949,
        "shieldWord": "圣战"
    },
    "950": {
        "id": 950,
        "shieldWord": "示威"
    },
    "951": {
        "id": 951,
        "shieldWord": "台独"
    },
    "952": {
        "id": 952,
        "shieldWord": "台独分子"
    },
    "953": {
        "id": 953,
        "shieldWord": "台联"
    },
    "954": {
        "id": 954,
        "shieldWord": "台湾民国"
    },
    "955": {
        "id": 955,
        "shieldWord": "台湾岛国"
    },
    "956": {
        "id": 956,
        "shieldWord": "台湾国"
    },
    "957": {
        "id": 957,
        "shieldWord": "台湾独立"
    },
    "958": {
        "id": 958,
        "shieldWord": "太子党"
    },
    "959": {
        "id": 959,
        "shieldWord": "天安门事件"
    },
    "960": {
        "id": 960,
        "shieldWord": "屠杀"
    },
    "961": {
        "id": 961,
        "shieldWord": "新党"
    },
    "962": {
        "id": 962,
        "shieldWord": "新疆独立"
    },
    "963": {
        "id": 963,
        "shieldWord": "新疆分裂"
    },
    "964": {
        "id": 964,
        "shieldWord": "新疆国"
    },
    "965": {
        "id": 965,
        "shieldWord": "疆独"
    },
    "966": {
        "id": 966,
        "shieldWord": "西藏独立"
    },
    "967": {
        "id": 967,
        "shieldWord": "西藏分裂"
    },
    "968": {
        "id": 968,
        "shieldWord": "西藏国"
    },
    "969": {
        "id": 969,
        "shieldWord": "藏独"
    },
    "970": {
        "id": 970,
        "shieldWord": "藏青会"
    },
    "971": {
        "id": 971,
        "shieldWord": "藏妇会"
    },
    "972": {
        "id": 972,
        "shieldWord": "学潮"
    },
    "973": {
        "id": 973,
        "shieldWord": "学运"
    },
    "974": {
        "id": 974,
        "shieldWord": "一党专政"
    },
    "975": {
        "id": 975,
        "shieldWord": "一中一台"
    },
    "976": {
        "id": 976,
        "shieldWord": "两个中国"
    },
    "977": {
        "id": 977,
        "shieldWord": "一贯道"
    },
    "978": {
        "id": 978,
        "shieldWord": "游行"
    },
    "979": {
        "id": 979,
        "shieldWord": "圆满"
    },
    "980": {
        "id": 980,
        "shieldWord": "造反"
    },
    "981": {
        "id": 981,
        "shieldWord": "真善忍"
    },
    "982": {
        "id": 982,
        "shieldWord": "镇压"
    },
    "983": {
        "id": 983,
        "shieldWord": "政变"
    },
    "984": {
        "id": 984,
        "shieldWord": "政治反对派"
    },
    "985": {
        "id": 985,
        "shieldWord": "政治犯"
    },
    "986": {
        "id": 986,
        "shieldWord": "反党"
    },
    "987": {
        "id": 987,
        "shieldWord": "反共"
    },
    "988": {
        "id": 988,
        "shieldWord": "政府"
    },
    "989": {
        "id": 989,
        "shieldWord": "民主党"
    },
    "990": {
        "id": 990,
        "shieldWord": "中国之春"
    },
    "991": {
        "id": 991,
        "shieldWord": "转法轮"
    },
    "992": {
        "id": 992,
        "shieldWord": "自焚"
    },
    "993": {
        "id": 993,
        "shieldWord": "共党"
    },
    "994": {
        "id": 994,
        "shieldWord": "共匪"
    },
    "995": {
        "id": 995,
        "shieldWord": "苏家屯"
    },
    "996": {
        "id": 996,
        "shieldWord": "基地组织"
    },
    "997": {
        "id": 997,
        "shieldWord": "塔利班"
    },
    "998": {
        "id": 998,
        "shieldWord": "东亚病夫"
    },
    "999": {
        "id": 999,
        "shieldWord": "支那"
    },
    "1000": {
        "id": 1000,
        "shieldWord": "高治联"
    },
    "1001": {
        "id": 1001,
        "shieldWord": "高自联"
    },
    "1002": {
        "id": 1002,
        "shieldWord": "专政"
    },
    "1003": {
        "id": 1003,
        "shieldWord": "专制"
    },
    "1004": {
        "id": 1004,
        "shieldWord": "四人帮"
    },
    "1005": {
        "id": 1005,
        "shieldWord": "新闻管制"
    },
    "1006": {
        "id": 1006,
        "shieldWord": "核工业基地"
    },
    "1007": {
        "id": 1007,
        "shieldWord": "核武器"
    },
    "1008": {
        "id": 1008,
        "shieldWord": "铀"
    },
    "1009": {
        "id": 1009,
        "shieldWord": "原子弹"
    },
    "1010": {
        "id": 1010,
        "shieldWord": "氢弹"
    },
    "1011": {
        "id": 1011,
        "shieldWord": "导弹"
    },
    "1012": {
        "id": 1012,
        "shieldWord": "核潜艇"
    },
    "1013": {
        "id": 1013,
        "shieldWord": "大参考"
    },
    "1014": {
        "id": 1014,
        "shieldWord": "小参考"
    },
    "1015": {
        "id": 1015,
        "shieldWord": "国内动态清样"
    },
    "1016": {
        "id": 1016,
        "shieldWord": "东突"
    },
    "1017": {
        "id": 1017,
        "shieldWord": "雪山狮子旗"
    },
    "1018": {
        "id": 1018,
        "shieldWord": "占领中环"
    },
    "1019": {
        "id": 1019,
        "shieldWord": "占中"
    },
    "1020": {
        "id": 1020,
        "shieldWord": "两国论"
    },
    "1021": {
        "id": 1021,
        "shieldWord": "一边一国"
    },
    "1022": {
        "id": 1022,
        "shieldWord": "赤匪"
    },
    "1023": {
        "id": 1023,
        "shieldWord": "香港国"
    },
    "1024": {
        "id": 1024,
        "shieldWord": "卖枪"
    },
    "1025": {
        "id": 1025,
        "shieldWord": "港独"
    },
    "1026": {
        "id": 1026,
        "shieldWord": "中华大陆执事站"
    },
    "1027": {
        "id": 1027,
        "shieldWord": "南海仲裁"
    },
    "1028": {
        "id": 1028,
        "shieldWord": "黄岩岛"
    },
    "1029": {
        "id": 1029,
        "shieldWord": "香港建国"
    },
    "1030": {
        "id": 1030,
        "shieldWord": "阿努纳恰尔邦"
    },
    "1031": {
        "id": 1031,
        "shieldWord": "钓鱼台列岛"
    },
    "1032": {
        "id": 1032,
        "shieldWord": "阿克塞钦"
    },
    "1033": {
        "id": 1033,
        "shieldWord": "间岛"
    },
    "1034": {
        "id": 1034,
        "shieldWord": "萨哈林岛"
    },
    "1035": {
        "id": 1035,
        "shieldWord": "黄皮猴子"
    },
    "1036": {
        "id": 1036,
        "shieldWord": "东亚病夫"
    },
    "1037": {
        "id": 1037,
        "shieldWord": "宗教"
    },
    "1038": {
        "id": 1038,
        "shieldWord": "迷信"
    },
    "1039": {
        "id": 1039,
        "shieldWord": "道教"
    },
    "1040": {
        "id": 1040,
        "shieldWord": "多维"
    },
    "1041": {
        "id": 1041,
        "shieldWord": "佛教"
    },
    "1042": {
        "id": 1042,
        "shieldWord": "佛祖"
    },
    "1043": {
        "id": 1043,
        "shieldWord": "释迦牟尼"
    },
    "1044": {
        "id": 1044,
        "shieldWord": "如来"
    },
    "1045": {
        "id": 1045,
        "shieldWord": "阿弥陀佛"
    },
    "1046": {
        "id": 1046,
        "shieldWord": "观世音"
    },
    "1047": {
        "id": 1047,
        "shieldWord": "普贤"
    },
    "1048": {
        "id": 1048,
        "shieldWord": "文殊"
    },
    "1049": {
        "id": 1049,
        "shieldWord": "地藏"
    },
    "1050": {
        "id": 1050,
        "shieldWord": "河殇"
    },
    "1051": {
        "id": 1051,
        "shieldWord": "回教"
    },
    "1052": {
        "id": 1052,
        "shieldWord": "穆罕默德"
    },
    "1053": {
        "id": 1053,
        "shieldWord": "穆斯林"
    },
    "1054": {
        "id": 1054,
        "shieldWord": "升天"
    },
    "1055": {
        "id": 1055,
        "shieldWord": "圣母"
    },
    "1056": {
        "id": 1056,
        "shieldWord": "耶和华"
    },
    "1057": {
        "id": 1057,
        "shieldWord": "耶稣"
    },
    "1058": {
        "id": 1058,
        "shieldWord": "伊斯兰"
    },
    "1059": {
        "id": 1059,
        "shieldWord": "真主安拉"
    },
    "1060": {
        "id": 1060,
        "shieldWord": "安拉"
    },
    "1061": {
        "id": 1061,
        "shieldWord": "白莲教"
    },
    "1062": {
        "id": 1062,
        "shieldWord": "天主教"
    },
    "1063": {
        "id": 1063,
        "shieldWord": "基督教"
    },
    "1064": {
        "id": 1064,
        "shieldWord": "东正教"
    },
    "1065": {
        "id": 1065,
        "shieldWord": "释迦摩尼"
    },
    "1066": {
        "id": 1066,
        "shieldWord": "大法"
    },
    "1067": {
        "id": 1067,
        "shieldWord": "法轮"
    },
    "1068": {
        "id": 1068,
        "shieldWord": "真理教"
    },
    "1069": {
        "id": 1069,
        "shieldWord": "走向圆满"
    },
    "1070": {
        "id": 1070,
        "shieldWord": "黄大仙"
    },
    "1071": {
        "id": 1071,
        "shieldWord": "风水"
    },
    "1072": {
        "id": 1072,
        "shieldWord": "跳大神"
    },
    "1073": {
        "id": 1073,
        "shieldWord": "神汉"
    },
    "1074": {
        "id": 1074,
        "shieldWord": "神婆"
    },
    "1075": {
        "id": 1075,
        "shieldWord": "大卫教"
    },
    "1076": {
        "id": 1076,
        "shieldWord": "阎王"
    },
    "1077": {
        "id": 1077,
        "shieldWord": "黑白无常"
    },
    "1078": {
        "id": 1078,
        "shieldWord": "牛头马面藏独"
    },
    "1079": {
        "id": 1079,
        "shieldWord": "高丽棒子"
    },
    "1080": {
        "id": 1080,
        "shieldWord": "回回"
    },
    "1081": {
        "id": 1081,
        "shieldWord": "蒙古鞑子"
    },
    "1082": {
        "id": 1082,
        "shieldWord": "老毛子"
    },
    "1083": {
        "id": 1083,
        "shieldWord": "回民吃猪肉"
    },
    "1084": {
        "id": 1084,
        "shieldWord": "蒙古独立"
    },
    "1085": {
        "id": 1085,
        "shieldWord": "全能神"
    },
    "1086": {
        "id": 1086,
        "shieldWord": "灵灵教"
    },
    "1087": {
        "id": 1087,
        "shieldWord": "被立教"
    },
    "1088": {
        "id": 1088,
        "shieldWord": "犯罪词汇"
    },
    "1089": {
        "id": 1089,
        "shieldWord": "谋杀"
    },
    "1090": {
        "id": 1090,
        "shieldWord": "杀人"
    },
    "1091": {
        "id": 1091,
        "shieldWord": "吸毒"
    },
    "1092": {
        "id": 1092,
        "shieldWord": "贩毒"
    },
    "1093": {
        "id": 1093,
        "shieldWord": "赌博"
    },
    "1094": {
        "id": 1094,
        "shieldWord": "拐卖"
    },
    "1095": {
        "id": 1095,
        "shieldWord": "走私"
    },
    "1096": {
        "id": 1096,
        "shieldWord": "卖淫"
    },
    "1097": {
        "id": 1097,
        "shieldWord": "监狱"
    },
    "1098": {
        "id": 1098,
        "shieldWord": "强奸"
    },
    "1099": {
        "id": 1099,
        "shieldWord": "轮奸"
    },
    "1100": {
        "id": 1100,
        "shieldWord": "抢劫"
    },
    "1101": {
        "id": 1101,
        "shieldWord": "先奸后杀"
    },
    "1102": {
        "id": 1102,
        "shieldWord": "枪支弹药"
    },
    "1103": {
        "id": 1103,
        "shieldWord": "下注"
    },
    "1104": {
        "id": 1104,
        "shieldWord": "押大"
    },
    "1105": {
        "id": 1105,
        "shieldWord": "押小"
    },
    "1106": {
        "id": 1106,
        "shieldWord": "抽头"
    },
    "1107": {
        "id": 1107,
        "shieldWord": "坐庄"
    },
    "1108": {
        "id": 1108,
        "shieldWord": "赌马"
    },
    "1109": {
        "id": 1109,
        "shieldWord": "赌球"
    },
    "1110": {
        "id": 1110,
        "shieldWord": "筹码"
    },
    "1111": {
        "id": 1111,
        "shieldWord": "老虎机"
    },
    "1112": {
        "id": 1112,
        "shieldWord": "轮盘赌"
    },
    "1113": {
        "id": 1113,
        "shieldWord": "安非他命"
    },
    "1114": {
        "id": 1114,
        "shieldWord": "大麻"
    },
    "1115": {
        "id": 1115,
        "shieldWord": "可卡因"
    },
    "1116": {
        "id": 1116,
        "shieldWord": "海洛因"
    },
    "1117": {
        "id": 1117,
        "shieldWord": "冰毒"
    },
    "1118": {
        "id": 1118,
        "shieldWord": "摇头丸"
    },
    "1119": {
        "id": 1119,
        "shieldWord": "杜冷丁"
    },
    "1120": {
        "id": 1120,
        "shieldWord": "鸦片"
    },
    "1121": {
        "id": 1121,
        "shieldWord": "罂粟"
    },
    "1122": {
        "id": 1122,
        "shieldWord": "迷幻药"
    },
    "1123": {
        "id": 1123,
        "shieldWord": "白粉"
    },
    "1124": {
        "id": 1124,
        "shieldWord": "嗑药"
    },
    "1125": {
        "id": 1125,
        "shieldWord": "卖枪支弹药"
    },
    "1126": {
        "id": 1126,
        "shieldWord": "K粉"
    },
    "1127": {
        "id": 1127,
        "shieldWord": "冰粉"
    },
    "1128": {
        "id": 1128,
        "shieldWord": "毒品"
    },
    "1129": {
        "id": 1129,
        "shieldWord": "致幻剂"
    },
    "1130": {
        "id": 1130,
        "shieldWord": "制毒"
    },
    "1131": {
        "id": 1131,
        "shieldWord": "偷窥"
    },
    "1132": {
        "id": 1132,
        "shieldWord": "恐怖组织"
    },
    "1133": {
        "id": 1133,
        "shieldWord": "恐怖分子"
    },
    "1134": {
        "id": 1134,
        "shieldWord": "暴力分子"
    },
    "1135": {
        "id": 1135,
        "shieldWord": "侮辱性语言"
    },
    "1136": {
        "id": 1136,
        "shieldWord": "苍老师"
    },
    "1137": {
        "id": 1137,
        "shieldWord": "玩你"
    },
    "1138": {
        "id": 1138,
        "shieldWord": "二货"
    },
    "1139": {
        "id": 1139,
        "shieldWord": "傻毕"
    },
    "1140": {
        "id": 1140,
        "shieldWord": "啪啪啪"
    },
    "1141": {
        "id": 1141,
        "shieldWord": "黄网"
    },
    "1142": {
        "id": 1142,
        "shieldWord": "屄"
    },
    "1143": {
        "id": 1143,
        "shieldWord": "肏"
    },
    "1144": {
        "id": 1144,
        "shieldWord": "屌"
    },
    "1145": {
        "id": 1145,
        "shieldWord": "马的"
    },
    "1146": {
        "id": 1146,
        "shieldWord": "马白勺"
    },
    "1147": {
        "id": 1147,
        "shieldWord": "妈的"
    },
    "1148": {
        "id": 1148,
        "shieldWord": "妈白勺"
    },
    "1149": {
        "id": 1149,
        "shieldWord": "女马ㄉ"
    },
    "1150": {
        "id": 1150,
        "shieldWord": "女马的"
    },
    "1151": {
        "id": 1151,
        "shieldWord": "女马白勺"
    },
    "1152": {
        "id": 1152,
        "shieldWord": "操你"
    },
    "1153": {
        "id": 1153,
        "shieldWord": "操妳"
    },
    "1154": {
        "id": 1154,
        "shieldWord": "操他"
    },
    "1155": {
        "id": 1155,
        "shieldWord": "操人也"
    },
    "1156": {
        "id": 1156,
        "shieldWord": "操她"
    },
    "1157": {
        "id": 1157,
        "shieldWord": "操女也"
    },
    "1158": {
        "id": 1158,
        "shieldWord": "干你"
    },
    "1159": {
        "id": 1159,
        "shieldWord": "干妳"
    },
    "1160": {
        "id": 1160,
        "shieldWord": "干他"
    },
    "1161": {
        "id": 1161,
        "shieldWord": "干人也"
    },
    "1162": {
        "id": 1162,
        "shieldWord": "干她"
    },
    "1163": {
        "id": 1163,
        "shieldWord": "干女也"
    },
    "1164": {
        "id": 1164,
        "shieldWord": "超你"
    },
    "1165": {
        "id": 1165,
        "shieldWord": "超妳"
    },
    "1166": {
        "id": 1166,
        "shieldWord": "超他"
    },
    "1167": {
        "id": 1167,
        "shieldWord": "超人也"
    },
    "1168": {
        "id": 1168,
        "shieldWord": "超她"
    },
    "1169": {
        "id": 1169,
        "shieldWord": "超女也"
    },
    "1170": {
        "id": 1170,
        "shieldWord": "屌你"
    },
    "1171": {
        "id": 1171,
        "shieldWord": "屌我"
    },
    "1172": {
        "id": 1172,
        "shieldWord": "屌妳"
    },
    "1173": {
        "id": 1173,
        "shieldWord": "屌他"
    },
    "1174": {
        "id": 1174,
        "shieldWord": "屌人也"
    },
    "1175": {
        "id": 1175,
        "shieldWord": "屌她"
    },
    "1176": {
        "id": 1176,
        "shieldWord": "屌女也"
    },
    "1177": {
        "id": 1177,
        "shieldWord": "凸你"
    },
    "1178": {
        "id": 1178,
        "shieldWord": "凸我"
    },
    "1179": {
        "id": 1179,
        "shieldWord": "凸妳"
    },
    "1180": {
        "id": 1180,
        "shieldWord": "凸他"
    },
    "1181": {
        "id": 1181,
        "shieldWord": "凸人也"
    },
    "1182": {
        "id": 1182,
        "shieldWord": "凸她"
    },
    "1183": {
        "id": 1183,
        "shieldWord": "凸女也"
    },
    "1184": {
        "id": 1184,
        "shieldWord": "插你"
    },
    "1185": {
        "id": 1185,
        "shieldWord": "插他"
    },
    "1186": {
        "id": 1186,
        "shieldWord": "插我"
    },
    "1187": {
        "id": 1187,
        "shieldWord": "插她"
    },
    "1188": {
        "id": 1188,
        "shieldWord": "插妳"
    },
    "1189": {
        "id": 1189,
        "shieldWord": "臭你"
    },
    "1190": {
        "id": 1190,
        "shieldWord": "臭妳"
    },
    "1191": {
        "id": 1191,
        "shieldWord": "臭他"
    },
    "1192": {
        "id": 1192,
        "shieldWord": "臭人也"
    },
    "1193": {
        "id": 1193,
        "shieldWord": "臭她"
    },
    "1194": {
        "id": 1194,
        "shieldWord": "臭女也"
    },
    "1195": {
        "id": 1195,
        "shieldWord": "机八"
    },
    "1196": {
        "id": 1196,
        "shieldWord": "鸡八"
    },
    "1197": {
        "id": 1197,
        "shieldWord": "G八"
    },
    "1198": {
        "id": 1198,
        "shieldWord": "Ｇ八"
    },
    "1199": {
        "id": 1199,
        "shieldWord": "机巴"
    },
    "1200": {
        "id": 1200,
        "shieldWord": "鸡巴"
    },
    "1201": {
        "id": 1201,
        "shieldWord": "G巴"
    },
    "1202": {
        "id": 1202,
        "shieldWord": "Ｇ巴"
    },
    "1203": {
        "id": 1203,
        "shieldWord": "机叭"
    },
    "1204": {
        "id": 1204,
        "shieldWord": "鸡叭"
    },
    "1205": {
        "id": 1205,
        "shieldWord": "G叭"
    },
    "1206": {
        "id": 1206,
        "shieldWord": "Ｇ叭"
    },
    "1207": {
        "id": 1207,
        "shieldWord": "机芭"
    },
    "1208": {
        "id": 1208,
        "shieldWord": "鸡芭"
    },
    "1209": {
        "id": 1209,
        "shieldWord": "G芭"
    },
    "1210": {
        "id": 1210,
        "shieldWord": "Ｇ芭"
    },
    "1211": {
        "id": 1211,
        "shieldWord": "机掰"
    },
    "1212": {
        "id": 1212,
        "shieldWord": "鸡掰"
    },
    "1213": {
        "id": 1213,
        "shieldWord": "G掰"
    },
    "1214": {
        "id": 1214,
        "shieldWord": "Ｇ掰"
    },
    "1215": {
        "id": 1215,
        "shieldWord": "机Y"
    },
    "1216": {
        "id": 1216,
        "shieldWord": "机Ｙ"
    },
    "1217": {
        "id": 1217,
        "shieldWord": "鸡Y"
    },
    "1218": {
        "id": 1218,
        "shieldWord": "鸡Ｙ"
    },
    "1219": {
        "id": 1219,
        "shieldWord": "机8"
    },
    "1220": {
        "id": 1220,
        "shieldWord": "鸡８"
    },
    "1221": {
        "id": 1221,
        "shieldWord": "靠爸"
    },
    "1222": {
        "id": 1222,
        "shieldWord": "靠母"
    },
    "1223": {
        "id": 1223,
        "shieldWord": "哭爸"
    },
    "1224": {
        "id": 1224,
        "shieldWord": "哭母"
    },
    "1225": {
        "id": 1225,
        "shieldWord": "靠北"
    },
    "1226": {
        "id": 1226,
        "shieldWord": "老GY"
    },
    "1227": {
        "id": 1227,
        "shieldWord": "老ＧＹ"
    },
    "1228": {
        "id": 1228,
        "shieldWord": "干GY"
    },
    "1229": {
        "id": 1229,
        "shieldWord": "干ＧＹ"
    },
    "1230": {
        "id": 1230,
        "shieldWord": "操GY"
    },
    "1231": {
        "id": 1231,
        "shieldWord": "操ＧＹ"
    },
    "1232": {
        "id": 1232,
        "shieldWord": "超GY"
    },
    "1233": {
        "id": 1233,
        "shieldWord": "超ＧＹ"
    },
    "1234": {
        "id": 1234,
        "shieldWord": "臭GY"
    },
    "1235": {
        "id": 1235,
        "shieldWord": "臭ＧＹ"
    },
    "1236": {
        "id": 1236,
        "shieldWord": "干七八"
    },
    "1237": {
        "id": 1237,
        "shieldWord": "干78"
    },
    "1238": {
        "id": 1238,
        "shieldWord": "干７８"
    },
    "1239": {
        "id": 1239,
        "shieldWord": "操七八"
    },
    "1240": {
        "id": 1240,
        "shieldWord": "操78"
    },
    "1241": {
        "id": 1241,
        "shieldWord": "操７８"
    },
    "1242": {
        "id": 1242,
        "shieldWord": "超七八"
    },
    "1243": {
        "id": 1243,
        "shieldWord": "超78"
    },
    "1244": {
        "id": 1244,
        "shieldWord": "超７８"
    },
    "1245": {
        "id": 1245,
        "shieldWord": "臭七八"
    },
    "1246": {
        "id": 1246,
        "shieldWord": "臭78"
    },
    "1247": {
        "id": 1247,
        "shieldWord": "臭７８"
    },
    "1248": {
        "id": 1248,
        "shieldWord": "懒叫"
    },
    "1249": {
        "id": 1249,
        "shieldWord": "懒教"
    },
    "1250": {
        "id": 1250,
        "shieldWord": "妈B"
    },
    "1251": {
        "id": 1251,
        "shieldWord": "我日"
    },
    "1252": {
        "id": 1252,
        "shieldWord": "婊"
    },
    "1253": {
        "id": 1253,
        "shieldWord": "璩美凤"
    },
    "1254": {
        "id": 1254,
        "shieldWord": "阴茎"
    },
    "1255": {
        "id": 1255,
        "shieldWord": "日你"
    },
    "1256": {
        "id": 1256,
        "shieldWord": "阴道"
    },
    "1257": {
        "id": 1257,
        "shieldWord": "干死"
    },
    "1258": {
        "id": 1258,
        "shieldWord": "你妈"
    },
    "1259": {
        "id": 1259,
        "shieldWord": "TNND"
    },
    "1260": {
        "id": 1260,
        "shieldWord": "幼齿"
    },
    "1261": {
        "id": 1261,
        "shieldWord": "干死你"
    },
    "1262": {
        "id": 1262,
        "shieldWord": "作爱"
    },
    "1263": {
        "id": 1263,
        "shieldWord": "阝月"
    },
    "1264": {
        "id": 1264,
        "shieldWord": "歇逼"
    },
    "1265": {
        "id": 1265,
        "shieldWord": "蛤蟆"
    },
    "1266": {
        "id": 1266,
        "shieldWord": "发骚"
    },
    "1267": {
        "id": 1267,
        "shieldWord": "招妓"
    },
    "1268": {
        "id": 1268,
        "shieldWord": "阴唇"
    },
    "1269": {
        "id": 1269,
        "shieldWord": "操你妈"
    },
    "1270": {
        "id": 1270,
        "shieldWord": "精子"
    },
    "1271": {
        "id": 1271,
        "shieldWord": "奸淫"
    },
    "1272": {
        "id": 1272,
        "shieldWord": "菜逼"
    },
    "1273": {
        "id": 1273,
        "shieldWord": "奶奶的"
    },
    "1274": {
        "id": 1274,
        "shieldWord": "日死你"
    },
    "1275": {
        "id": 1275,
        "shieldWord": "贱人"
    },
    "1276": {
        "id": 1276,
        "shieldWord": "江八点"
    },
    "1277": {
        "id": 1277,
        "shieldWord": "你娘"
    },
    "1278": {
        "id": 1278,
        "shieldWord": "肛交"
    },
    "1279": {
        "id": 1279,
        "shieldWord": "破鞋"
    },
    "1280": {
        "id": 1280,
        "shieldWord": "贱逼"
    },
    "1281": {
        "id": 1281,
        "shieldWord": "娘的"
    },
    "1282": {
        "id": 1282,
        "shieldWord": "狗卵子"
    },
    "1283": {
        "id": 1283,
        "shieldWord": "骚货"
    },
    "1284": {
        "id": 1284,
        "shieldWord": "操蛋"
    },
    "1285": {
        "id": 1285,
        "shieldWord": "大比"
    },
    "1286": {
        "id": 1286,
        "shieldWord": "龟公"
    },
    "1287": {
        "id": 1287,
        "shieldWord": "穷逼"
    },
    "1288": {
        "id": 1288,
        "shieldWord": "欠日"
    },
    "1289": {
        "id": 1289,
        "shieldWord": "狗b"
    },
    "1290": {
        "id": 1290,
        "shieldWord": "牛逼"
    },
    "1291": {
        "id": 1291,
        "shieldWord": "装逼"
    },
    "1292": {
        "id": 1292,
        "shieldWord": "妈批"
    },
    "1293": {
        "id": 1293,
        "shieldWord": "欠操"
    },
    "1294": {
        "id": 1294,
        "shieldWord": "我操你"
    },
    "1295": {
        "id": 1295,
        "shieldWord": "烂逼"
    },
    "1296": {
        "id": 1296,
        "shieldWord": "你爸"
    },
    "1297": {
        "id": 1297,
        "shieldWord": "屁眼"
    },
    "1298": {
        "id": 1298,
        "shieldWord": "密穴"
    },
    "1299": {
        "id": 1299,
        "shieldWord": "鸡奸"
    },
    "1300": {
        "id": 1300,
        "shieldWord": "群奸"
    },
    "1301": {
        "id": 1301,
        "shieldWord": "烂比"
    },
    "1302": {
        "id": 1302,
        "shieldWord": "牛比"
    },
    "1303": {
        "id": 1303,
        "shieldWord": "喷你"
    },
    "1304": {
        "id": 1304,
        "shieldWord": "大b"
    },
    "1305": {
        "id": 1305,
        "shieldWord": "小b"
    },
    "1306": {
        "id": 1306,
        "shieldWord": "性欲"
    },
    "1307": {
        "id": 1307,
        "shieldWord": "你大爷"
    },
    "1308": {
        "id": 1308,
        "shieldWord": "淫荡"
    },
    "1309": {
        "id": 1309,
        "shieldWord": "中国猪"
    },
    "1310": {
        "id": 1310,
        "shieldWord": "狂操"
    },
    "1311": {
        "id": 1311,
        "shieldWord": "婊子"
    },
    "1312": {
        "id": 1312,
        "shieldWord": "我操"
    },
    "1313": {
        "id": 1313,
        "shieldWord": "淫秽"
    },
    "1314": {
        "id": 1314,
        "shieldWord": "江猪媳"
    },
    "1315": {
        "id": 1315,
        "shieldWord": "狗屎"
    },
    "1316": {
        "id": 1316,
        "shieldWord": "十八摸"
    },
    "1317": {
        "id": 1317,
        "shieldWord": "操逼"
    },
    "1318": {
        "id": 1318,
        "shieldWord": "二B"
    },
    "1319": {
        "id": 1319,
        "shieldWord": "猪毛"
    },
    "1320": {
        "id": 1320,
        "shieldWord": "狗操"
    },
    "1321": {
        "id": 1321,
        "shieldWord": "奶子"
    },
    "1322": {
        "id": 1322,
        "shieldWord": "大花逼"
    },
    "1323": {
        "id": 1323,
        "shieldWord": "逼样"
    },
    "1324": {
        "id": 1324,
        "shieldWord": "去你妈的"
    },
    "1325": {
        "id": 1325,
        "shieldWord": "完蛋操"
    },
    "1326": {
        "id": 1326,
        "shieldWord": "下贱"
    },
    "1327": {
        "id": 1327,
        "shieldWord": "淫穴"
    },
    "1328": {
        "id": 1328,
        "shieldWord": "猪操"
    },
    "1329": {
        "id": 1329,
        "shieldWord": "妓女"
    },
    "1330": {
        "id": 1330,
        "shieldWord": "阴水"
    },
    "1331": {
        "id": 1331,
        "shieldWord": "操比"
    },
    "1332": {
        "id": 1332,
        "shieldWord": "精液"
    },
    "1333": {
        "id": 1333,
        "shieldWord": "卖比"
    },
    "1334": {
        "id": 1334,
        "shieldWord": "16dy-图库"
    },
    "1335": {
        "id": 1335,
        "shieldWord": "兽交"
    },
    "1336": {
        "id": 1336,
        "shieldWord": "爱女人"
    },
    "1337": {
        "id": 1337,
        "shieldWord": "拔出来"
    },
    "1338": {
        "id": 1338,
        "shieldWord": "操b"
    },
    "1339": {
        "id": 1339,
        "shieldWord": "插进"
    },
    "1340": {
        "id": 1340,
        "shieldWord": "插穴"
    },
    "1341": {
        "id": 1341,
        "shieldWord": "吃精"
    },
    "1342": {
        "id": 1342,
        "shieldWord": "抽插"
    },
    "1343": {
        "id": 1343,
        "shieldWord": "大乳"
    },
    "1344": {
        "id": 1344,
        "shieldWord": "调教"
    },
    "1345": {
        "id": 1345,
        "shieldWord": "黄色电影"
    },
    "1346": {
        "id": 1346,
        "shieldWord": "激情电影"
    },
    "1347": {
        "id": 1347,
        "shieldWord": "轮暴"
    },
    "1348": {
        "id": 1348,
        "shieldWord": "迷奸"
    },
    "1349": {
        "id": 1349,
        "shieldWord": "乳房"
    },
    "1350": {
        "id": 1350,
        "shieldWord": "色猫"
    },
    "1351": {
        "id": 1351,
        "shieldWord": "色欲"
    },
    "1352": {
        "id": 1352,
        "shieldWord": "性爱图库"
    },
    "1353": {
        "id": 1353,
        "shieldWord": "亚情"
    },
    "1354": {
        "id": 1354,
        "shieldWord": "淫乱"
    },
    "1355": {
        "id": 1355,
        "shieldWord": "淫女"
    },
    "1356": {
        "id": 1356,
        "shieldWord": "淫水"
    },
    "1357": {
        "id": 1357,
        "shieldWord": "淫汁"
    },
    "1358": {
        "id": 1358,
        "shieldWord": "幼图"
    },
    "1359": {
        "id": 1359,
        "shieldWord": "中文搜性网"
    },
    "1360": {
        "id": 1360,
        "shieldWord": "自慰"
    },
    "1361": {
        "id": 1361,
        "shieldWord": "学生妹"
    },
    "1362": {
        "id": 1362,
        "shieldWord": "１８岁淫乱"
    },
    "1363": {
        "id": 1363,
        "shieldWord": "999日本妹"
    },
    "1364": {
        "id": 1364,
        "shieldWord": "干炮"
    },
    "1365": {
        "id": 1365,
        "shieldWord": "摸阴蒂"
    },
    "1366": {
        "id": 1366,
        "shieldWord": "金鳞岂是池中物"
    },
    "1367": {
        "id": 1367,
        "shieldWord": "掰穴皮卡丘"
    },
    "1368": {
        "id": 1368,
        "shieldWord": "白虎少妇"
    },
    "1369": {
        "id": 1369,
        "shieldWord": "白虎阴穴"
    },
    "1370": {
        "id": 1370,
        "shieldWord": "包二奶"
    },
    "1371": {
        "id": 1371,
        "shieldWord": "暴淫"
    },
    "1372": {
        "id": 1372,
        "shieldWord": "逼痒"
    },
    "1373": {
        "id": 1373,
        "shieldWord": "荡妹"
    },
    "1374": {
        "id": 1374,
        "shieldWord": "肥逼"
    },
    "1375": {
        "id": 1375,
        "shieldWord": "粉穴"
    },
    "1376": {
        "id": 1376,
        "shieldWord": "干穴"
    },
    "1377": {
        "id": 1377,
        "shieldWord": "开苞"
    },
    "1378": {
        "id": 1378,
        "shieldWord": "口活"
    },
    "1379": {
        "id": 1379,
        "shieldWord": "狼友"
    },
    "1380": {
        "id": 1380,
        "shieldWord": "春药"
    },
    "1381": {
        "id": 1381,
        "shieldWord": "风艳阁"
    },
    "1382": {
        "id": 1382,
        "shieldWord": "激情小说"
    },
    "1383": {
        "id": 1383,
        "shieldWord": "兽欲"
    },
    "1384": {
        "id": 1384,
        "shieldWord": "全裸"
    },
    "1385": {
        "id": 1385,
        "shieldWord": "秘唇"
    },
    "1386": {
        "id": 1386,
        "shieldWord": "蜜穴"
    },
    "1387": {
        "id": 1387,
        "shieldWord": "玉穴"
    },
    "1388": {
        "id": 1388,
        "shieldWord": "应召"
    },
    "1389": {
        "id": 1389,
        "shieldWord": "菊花蕾"
    },
    "1390": {
        "id": 1390,
        "shieldWord": "大力抽送"
    },
    "1391": {
        "id": 1391,
        "shieldWord": "干的爽"
    },
    "1392": {
        "id": 1392,
        "shieldWord": "肉蒲团"
    },
    "1393": {
        "id": 1393,
        "shieldWord": "后庭"
    },
    "1394": {
        "id": 1394,
        "shieldWord": "淫叫"
    },
    "1395": {
        "id": 1395,
        "shieldWord": "男女交欢"
    },
    "1396": {
        "id": 1396,
        "shieldWord": "极品波霸"
    },
    "1397": {
        "id": 1397,
        "shieldWord": "兽奸"
    },
    "1398": {
        "id": 1398,
        "shieldWord": "流淫"
    },
    "1399": {
        "id": 1399,
        "shieldWord": "销魂洞"
    },
    "1400": {
        "id": 1400,
        "shieldWord": "操烂"
    },
    "1401": {
        "id": 1401,
        "shieldWord": "成人网站"
    },
    "1402": {
        "id": 1402,
        "shieldWord": "淫色"
    },
    "1403": {
        "id": 1403,
        "shieldWord": "一夜欢"
    },
    "1404": {
        "id": 1404,
        "shieldWord": "给你爽"
    },
    "1405": {
        "id": 1405,
        "shieldWord": "偷窥图片"
    },
    "1406": {
        "id": 1406,
        "shieldWord": "性奴"
    },
    "1407": {
        "id": 1407,
        "shieldWord": "大奶头"
    },
    "1408": {
        "id": 1408,
        "shieldWord": "奸幼"
    },
    "1409": {
        "id": 1409,
        "shieldWord": "中年美妇"
    },
    "1410": {
        "id": 1410,
        "shieldWord": "豪乳"
    },
    "1411": {
        "id": 1411,
        "shieldWord": "喷精"
    },
    "1412": {
        "id": 1412,
        "shieldWord": "逼奸"
    },
    "1413": {
        "id": 1413,
        "shieldWord": "脱内裤"
    },
    "1414": {
        "id": 1414,
        "shieldWord": "发浪"
    },
    "1415": {
        "id": 1415,
        "shieldWord": "浪叫"
    },
    "1416": {
        "id": 1416,
        "shieldWord": "肉茎"
    },
    "1417": {
        "id": 1417,
        "shieldWord": "菊花洞"
    },
    "1418": {
        "id": 1418,
        "shieldWord": "成人自拍"
    },
    "1419": {
        "id": 1419,
        "shieldWord": "自拍美穴"
    },
    "1420": {
        "id": 1420,
        "shieldWord": "抠穴"
    },
    "1421": {
        "id": 1421,
        "shieldWord": "颜射"
    },
    "1422": {
        "id": 1422,
        "shieldWord": "肉棍"
    },
    "1423": {
        "id": 1423,
        "shieldWord": "淫水爱液"
    },
    "1424": {
        "id": 1424,
        "shieldWord": "阴核"
    },
    "1425": {
        "id": 1425,
        "shieldWord": "露B"
    },
    "1426": {
        "id": 1426,
        "shieldWord": "母子奸情"
    },
    "1427": {
        "id": 1427,
        "shieldWord": "人妻熟女"
    },
    "1428": {
        "id": 1428,
        "shieldWord": "色界"
    },
    "1429": {
        "id": 1429,
        "shieldWord": "丁香社区"
    },
    "1430": {
        "id": 1430,
        "shieldWord": "爱图公园"
    },
    "1431": {
        "id": 1431,
        "shieldWord": "色色五月天"
    },
    "1432": {
        "id": 1432,
        "shieldWord": "鹿城娱乐"
    },
    "1433": {
        "id": 1433,
        "shieldWord": "色色"
    },
    "1434": {
        "id": 1434,
        "shieldWord": "幼香阁"
    },
    "1435": {
        "id": 1435,
        "shieldWord": "隐窝窝"
    },
    "1436": {
        "id": 1436,
        "shieldWord": "乱伦熟女网"
    },
    "1437": {
        "id": 1437,
        "shieldWord": "插阴"
    },
    "1438": {
        "id": 1438,
        "shieldWord": "露阴照"
    },
    "1439": {
        "id": 1439,
        "shieldWord": "美幼"
    },
    "1440": {
        "id": 1440,
        "shieldWord": "97sese"
    },
    "1441": {
        "id": 1441,
        "shieldWord": "嫩鲍鱼"
    },
    "1442": {
        "id": 1442,
        "shieldWord": "日本AV女优"
    },
    "1443": {
        "id": 1443,
        "shieldWord": "美女走光"
    },
    "1444": {
        "id": 1444,
        "shieldWord": "33bbb走光"
    },
    "1445": {
        "id": 1445,
        "shieldWord": "激情贴图"
    },
    "1446": {
        "id": 1446,
        "shieldWord": "成人论坛"
    },
    "1447": {
        "id": 1447,
        "shieldWord": "就去诱惑"
    },
    "1448": {
        "id": 1448,
        "shieldWord": "浴室自拍"
    },
    "1449": {
        "id": 1449,
        "shieldWord": "BlowJobs"
    },
    "1450": {
        "id": 1450,
        "shieldWord": "激情裸体"
    },
    "1451": {
        "id": 1451,
        "shieldWord": "丽春苑"
    },
    "1452": {
        "id": 1452,
        "shieldWord": "窝窝客"
    },
    "1453": {
        "id": 1453,
        "shieldWord": "银民吧"
    },
    "1454": {
        "id": 1454,
        "shieldWord": "亚洲色"
    },
    "1455": {
        "id": 1455,
        "shieldWord": "碧香亭"
    },
    "1456": {
        "id": 1456,
        "shieldWord": "爱色cc"
    },
    "1457": {
        "id": 1457,
        "shieldWord": "妹妹骚图"
    },
    "1458": {
        "id": 1458,
        "shieldWord": "宾馆女郎"
    },
    "1459": {
        "id": 1459,
        "shieldWord": "美腿丝足"
    },
    "1460": {
        "id": 1460,
        "shieldWord": "好色cc"
    },
    "1461": {
        "id": 1461,
        "shieldWord": "无码长片"
    },
    "1462": {
        "id": 1462,
        "shieldWord": "淫水涟涟"
    },
    "1463": {
        "id": 1463,
        "shieldWord": "放荡少妇"
    },
    "1464": {
        "id": 1464,
        "shieldWord": "成人图片"
    },
    "1465": {
        "id": 1465,
        "shieldWord": "黄金圣水"
    },
    "1466": {
        "id": 1466,
        "shieldWord": "脚交"
    },
    "1467": {
        "id": 1467,
        "shieldWord": "勾魂少妇"
    },
    "1468": {
        "id": 1468,
        "shieldWord": "女尻"
    },
    "1469": {
        "id": 1469,
        "shieldWord": "我要性交"
    },
    "1470": {
        "id": 1470,
        "shieldWord": "SM女王"
    },
    "1471": {
        "id": 1471,
        "shieldWord": "乳此丝袜"
    },
    "1472": {
        "id": 1472,
        "shieldWord": "日本灌肠"
    },
    "1473": {
        "id": 1473,
        "shieldWord": "集体性爱"
    },
    "1474": {
        "id": 1474,
        "shieldWord": "国产骚货"
    },
    "1475": {
        "id": 1475,
        "shieldWord": "操B指南"
    },
    "1476": {
        "id": 1476,
        "shieldWord": "亚洲淫娃"
    },
    "1477": {
        "id": 1477,
        "shieldWord": "熟女乱伦"
    },
    "1478": {
        "id": 1478,
        "shieldWord": "SM舔穴"
    },
    "1479": {
        "id": 1479,
        "shieldWord": "无码H漫"
    },
    "1480": {
        "id": 1480,
        "shieldWord": "大胆少女"
    },
    "1481": {
        "id": 1481,
        "shieldWord": "乳此丰满"
    },
    "1482": {
        "id": 1482,
        "shieldWord": "屄屄特写"
    },
    "1483": {
        "id": 1483,
        "shieldWord": "熟女颜射"
    },
    "1484": {
        "id": 1484,
        "shieldWord": "要色色"
    },
    "1485": {
        "id": 1485,
        "shieldWord": "耻辱轮奸"
    },
    "1486": {
        "id": 1486,
        "shieldWord": "巨乳素人"
    },
    "1487": {
        "id": 1487,
        "shieldWord": "妩媚挑逗"
    },
    "1488": {
        "id": 1488,
        "shieldWord": "骚姨妈"
    },
    "1489": {
        "id": 1489,
        "shieldWord": "裸体少妇"
    },
    "1490": {
        "id": 1490,
        "shieldWord": "美少妇"
    },
    "1491": {
        "id": 1491,
        "shieldWord": "射奶"
    },
    "1492": {
        "id": 1492,
        "shieldWord": "杨思敏"
    },
    "1493": {
        "id": 1493,
        "shieldWord": "野外性交"
    },
    "1494": {
        "id": 1494,
        "shieldWord": "风骚淫荡"
    },
    "1495": {
        "id": 1495,
        "shieldWord": "白虎嫩B"
    },
    "1496": {
        "id": 1496,
        "shieldWord": "明星淫图"
    },
    "1497": {
        "id": 1497,
        "shieldWord": "淫乱熟女"
    },
    "1498": {
        "id": 1498,
        "shieldWord": "高清性爱"
    },
    "1499": {
        "id": 1499,
        "shieldWord": "高潮集锦"
    },
    "1500": {
        "id": 1500,
        "shieldWord": "淫兽学园"
    },
    "1501": {
        "id": 1501,
        "shieldWord": "俏臀摄魄"
    },
    "1502": {
        "id": 1502,
        "shieldWord": "有容奶大"
    },
    "1503": {
        "id": 1503,
        "shieldWord": "无套内射"
    },
    "1504": {
        "id": 1504,
        "shieldWord": "毛鲍"
    },
    "1505": {
        "id": 1505,
        "shieldWord": "3P炮图"
    },
    "1506": {
        "id": 1506,
        "shieldWord": "性交课"
    },
    "1507": {
        "id": 1507,
        "shieldWord": "激凸走光"
    },
    "1508": {
        "id": 1508,
        "shieldWord": "性感妖娆"
    },
    "1509": {
        "id": 1509,
        "shieldWord": "人妻交换"
    },
    "1510": {
        "id": 1510,
        "shieldWord": "监禁陵辱"
    },
    "1511": {
        "id": 1511,
        "shieldWord": "生徒胸触"
    },
    "1512": {
        "id": 1512,
        "shieldWord": "东洋屄"
    },
    "1513": {
        "id": 1513,
        "shieldWord": "翘臀嫩穴"
    },
    "1514": {
        "id": 1514,
        "shieldWord": "春光外泻"
    },
    "1515": {
        "id": 1515,
        "shieldWord": "淫妇自慰"
    },
    "1516": {
        "id": 1516,
        "shieldWord": "本土无码"
    },
    "1517": {
        "id": 1517,
        "shieldWord": "淫妻交换"
    },
    "1518": {
        "id": 1518,
        "shieldWord": "日屄"
    },
    "1519": {
        "id": 1519,
        "shieldWord": "近亲相奸"
    },
    "1520": {
        "id": 1520,
        "shieldWord": "艳乳"
    },
    "1521": {
        "id": 1521,
        "shieldWord": "白虎小穴"
    },
    "1522": {
        "id": 1522,
        "shieldWord": "肛门喷水"
    },
    "1523": {
        "id": 1523,
        "shieldWord": "淫荡贵妇"
    },
    "1524": {
        "id": 1524,
        "shieldWord": "鬼畜轮奸"
    },
    "1525": {
        "id": 1525,
        "shieldWord": "浴室乱伦"
    },
    "1526": {
        "id": 1526,
        "shieldWord": "生奸内射"
    },
    "1527": {
        "id": 1527,
        "shieldWord": "国产嫖娼"
    },
    "1528": {
        "id": 1528,
        "shieldWord": "白液四溅"
    },
    "1529": {
        "id": 1529,
        "shieldWord": "带套肛交"
    },
    "1530": {
        "id": 1530,
        "shieldWord": "大乱交"
    },
    "1531": {
        "id": 1531,
        "shieldWord": "精液榨取"
    },
    "1532": {
        "id": 1532,
        "shieldWord": "性感乳娘"
    },
    "1533": {
        "id": 1533,
        "shieldWord": "魅惑巨乳"
    },
    "1534": {
        "id": 1534,
        "shieldWord": "无码炮图"
    },
    "1535": {
        "id": 1535,
        "shieldWord": "群阴会"
    },
    "1536": {
        "id": 1536,
        "shieldWord": "人性本色"
    },
    "1537": {
        "id": 1537,
        "shieldWord": "极品波神"
    },
    "1538": {
        "id": 1538,
        "shieldWord": "淫乱工作"
    },
    "1539": {
        "id": 1539,
        "shieldWord": "白浆四溅"
    },
    "1540": {
        "id": 1540,
        "shieldWord": "街头扒衣"
    },
    "1541": {
        "id": 1541,
        "shieldWord": "口内爆射"
    },
    "1542": {
        "id": 1542,
        "shieldWord": "嫩BB"
    },
    "1543": {
        "id": 1543,
        "shieldWord": "肛门拳交"
    },
    "1544": {
        "id": 1544,
        "shieldWord": "灌满精液"
    },
    "1545": {
        "id": 1545,
        "shieldWord": "莲花逼"
    },
    "1546": {
        "id": 1546,
        "shieldWord": "自慰抠穴"
    },
    "1547": {
        "id": 1547,
        "shieldWord": "人妻榨乳"
    },
    "1548": {
        "id": 1548,
        "shieldWord": "拔屄自拍"
    },
    "1549": {
        "id": 1549,
        "shieldWord": "洗肠射尿"
    },
    "1550": {
        "id": 1550,
        "shieldWord": "人妻色诱"
    },
    "1551": {
        "id": 1551,
        "shieldWord": "淫浆"
    },
    "1552": {
        "id": 1552,
        "shieldWord": "狂乳激揺"
    },
    "1553": {
        "id": 1553,
        "shieldWord": "骚浪"
    },
    "1554": {
        "id": 1554,
        "shieldWord": "射爽"
    },
    "1555": {
        "id": 1555,
        "shieldWord": "藓鲍"
    },
    "1556": {
        "id": 1556,
        "shieldWord": "制服狩"
    },
    "1557": {
        "id": 1557,
        "shieldWord": "无毛穴"
    },
    "1558": {
        "id": 1558,
        "shieldWord": "骚浪美女"
    },
    "1559": {
        "id": 1559,
        "shieldWord": "肏屄"
    },
    "1560": {
        "id": 1560,
        "shieldWord": "舌头穴"
    },
    "1561": {
        "id": 1561,
        "shieldWord": "人妻做爱"
    },
    "1562": {
        "id": 1562,
        "shieldWord": "插逼"
    },
    "1563": {
        "id": 1563,
        "shieldWord": "爆操"
    },
    "1564": {
        "id": 1564,
        "shieldWord": "插穴止痒"
    },
    "1565": {
        "id": 1565,
        "shieldWord": "骚乳"
    },
    "1566": {
        "id": 1566,
        "shieldWord": "食精"
    },
    "1567": {
        "id": 1567,
        "shieldWord": "爆乳娘"
    },
    "1568": {
        "id": 1568,
        "shieldWord": "插阴茎"
    },
    "1569": {
        "id": 1569,
        "shieldWord": "黑毛屄"
    },
    "1570": {
        "id": 1570,
        "shieldWord": "肉便器"
    },
    "1571": {
        "id": 1571,
        "shieldWord": "肉逼"
    },
    "1572": {
        "id": 1572,
        "shieldWord": "淫乱潮吹"
    },
    "1573": {
        "id": 1573,
        "shieldWord": "母奸"
    },
    "1574": {
        "id": 1574,
        "shieldWord": "熟妇人妻"
    },
    "1575": {
        "id": 1575,
        "shieldWord": "発射"
    },
    "1576": {
        "id": 1576,
        "shieldWord": "性佣"
    },
    "1577": {
        "id": 1577,
        "shieldWord": "爽穴"
    },
    "1578": {
        "id": 1578,
        "shieldWord": "插比"
    },
    "1579": {
        "id": 1579,
        "shieldWord": "嫩鲍"
    },
    "1580": {
        "id": 1580,
        "shieldWord": "骚母"
    },
    "1581": {
        "id": 1581,
        "shieldWord": "吃鸡巴"
    },
    "1582": {
        "id": 1582,
        "shieldWord": "金毛穴"
    },
    "1583": {
        "id": 1583,
        "shieldWord": "体奸"
    },
    "1584": {
        "id": 1584,
        "shieldWord": "爆草"
    },
    "1585": {
        "id": 1585,
        "shieldWord": "操妻"
    },
    "1586": {
        "id": 1586,
        "shieldWord": "a4u"
    },
    "1587": {
        "id": 1587,
        "shieldWord": "酥穴"
    },
    "1588": {
        "id": 1588,
        "shieldWord": "屄毛"
    },
    "1589": {
        "id": 1589,
        "shieldWord": "厕所盗摄"
    },
    "1590": {
        "id": 1590,
        "shieldWord": "艳妇淫女"
    },
    "1591": {
        "id": 1591,
        "shieldWord": "掰穴打洞"
    },
    "1592": {
        "id": 1592,
        "shieldWord": "盗撮"
    },
    "1593": {
        "id": 1593,
        "shieldWord": "薄码"
    },
    "1594": {
        "id": 1594,
        "shieldWord": "少修正"
    },
    "1595": {
        "id": 1595,
        "shieldWord": "巧淫奸戏"
    },
    "1596": {
        "id": 1596,
        "shieldWord": "成人片"
    },
    "1597": {
        "id": 1597,
        "shieldWord": "换妻大会"
    },
    "1598": {
        "id": 1598,
        "shieldWord": "破处"
    },
    "1599": {
        "id": 1599,
        "shieldWord": "穴爽"
    },
    "1600": {
        "id": 1600,
        "shieldWord": "g点"
    },
    "1601": {
        "id": 1601,
        "shieldWord": "欢欢娱乐时空"
    },
    "1602": {
        "id": 1602,
        "shieldWord": "裤袜"
    },
    "1603": {
        "id": 1603,
        "shieldWord": "乱伦"
    },
    "1604": {
        "id": 1604,
        "shieldWord": "买春"
    },
    "1605": {
        "id": 1605,
        "shieldWord": "妹妹阴毛"
    },
    "1606": {
        "id": 1606,
        "shieldWord": "免费成人网站"
    },
    "1607": {
        "id": 1607,
        "shieldWord": "免费偷窥网"
    },
    "1608": {
        "id": 1608,
        "shieldWord": "免费A片"
    },
    "1609": {
        "id": 1609,
        "shieldWord": "摩洛客"
    },
    "1610": {
        "id": 1610,
        "shieldWord": "嫩b"
    },
    "1611": {
        "id": 1611,
        "shieldWord": "捏弄"
    },
    "1612": {
        "id": 1612,
        "shieldWord": "女优"
    },
    "1613": {
        "id": 1613,
        "shieldWord": "肉棒"
    },
    "1614": {
        "id": 1614,
        "shieldWord": "骚姐姐"
    },
    "1615": {
        "id": 1615,
        "shieldWord": "色区"
    },
    "1616": {
        "id": 1616,
        "shieldWord": "色书库"
    },
    "1617": {
        "id": 1617,
        "shieldWord": "射颜"
    },
    "1618": {
        "id": 1618,
        "shieldWord": "手淫"
    },
    "1619": {
        "id": 1619,
        "shieldWord": "吸精少女"
    },
    "1620": {
        "id": 1620,
        "shieldWord": "下流地带"
    },
    "1621": {
        "id": 1621,
        "shieldWord": "性虎"
    },
    "1622": {
        "id": 1622,
        "shieldWord": "性饥渴"
    },
    "1623": {
        "id": 1623,
        "shieldWord": "阴部"
    },
    "1624": {
        "id": 1624,
        "shieldWord": "淫妹"
    },
    "1625": {
        "id": 1625,
        "shieldWord": "淫图"
    },
    "1626": {
        "id": 1626,
        "shieldWord": "幼交"
    },
    "1627": {
        "id": 1627,
        "shieldWord": "欲火"
    },
    "1628": {
        "id": 1628,
        "shieldWord": "援交妹"
    },
    "1629": {
        "id": 1629,
        "shieldWord": "嫩屄"
    },
    "1630": {
        "id": 1630,
        "shieldWord": "嫩女"
    },
    "1631": {
        "id": 1631,
        "shieldWord": "情色天崖"
    },
    "1632": {
        "id": 1632,
        "shieldWord": "情色文学"
    },
    "1633": {
        "id": 1633,
        "shieldWord": "群交乱舞"
    },
    "1634": {
        "id": 1634,
        "shieldWord": "日本骚货"
    },
    "1635": {
        "id": 1635,
        "shieldWord": "肉唇"
    },
    "1636": {
        "id": 1636,
        "shieldWord": "肉沟"
    },
    "1637": {
        "id": 1637,
        "shieldWord": "肉棍干骚妇"
    },
    "1638": {
        "id": 1638,
        "shieldWord": "肉壶"
    },
    "1639": {
        "id": 1639,
        "shieldWord": "肉淫器吞精"
    },
    "1640": {
        "id": 1640,
        "shieldWord": "骚妹"
    },
    "1641": {
        "id": 1641,
        "shieldWord": "骚女"
    },
    "1642": {
        "id": 1642,
        "shieldWord": "骚水"
    },
    "1643": {
        "id": 1643,
        "shieldWord": "骚穴"
    },
    "1644": {
        "id": 1644,
        "shieldWord": "色狐狸网址"
    },
    "1645": {
        "id": 1645,
        "shieldWord": "色狼论坛"
    },
    "1646": {
        "id": 1646,
        "shieldWord": "色狼小说"
    },
    "1647": {
        "id": 1647,
        "shieldWord": "湿穴"
    },
    "1648": {
        "id": 1648,
        "shieldWord": "爽死我了"
    },
    "1649": {
        "id": 1649,
        "shieldWord": "舔逼"
    },
    "1650": {
        "id": 1650,
        "shieldWord": "舔屁眼"
    },
    "1651": {
        "id": 1651,
        "shieldWord": "好嫩"
    },
    "1652": {
        "id": 1652,
        "shieldWord": "大波"
    },
    "1653": {
        "id": 1653,
        "shieldWord": "做爱电影"
    },
    "1654": {
        "id": 1654,
        "shieldWord": "色诱"
    },
    "1655": {
        "id": 1655,
        "shieldWord": "秘裂"
    },
    "1656": {
        "id": 1656,
        "shieldWord": "采花堂"
    },
    "1657": {
        "id": 1657,
        "shieldWord": "含屌"
    },
    "1658": {
        "id": 1658,
        "shieldWord": "亚洲性虐"
    },
    "1659": {
        "id": 1659,
        "shieldWord": "夫妻自拍"
    },
    "1660": {
        "id": 1660,
        "shieldWord": "熟女"
    },
    "1661": {
        "id": 1661,
        "shieldWord": "操穴"
    },
    "1662": {
        "id": 1662,
        "shieldWord": "裹本"
    },
    "1663": {
        "id": 1663,
        "shieldWord": "淫妇"
    },
    "1664": {
        "id": 1664,
        "shieldWord": "嫩逼"
    },
    "1665": {
        "id": 1665,
        "shieldWord": "淫贱"
    },
    "1666": {
        "id": 1666,
        "shieldWord": "欢乐性今宵"
    },
    "1667": {
        "id": 1667,
        "shieldWord": "巨乳"
    },
    "1668": {
        "id": 1668,
        "shieldWord": "性爱图片"
    },
    "1669": {
        "id": 1669,
        "shieldWord": "炮友之家"
    },
    "1670": {
        "id": 1670,
        "shieldWord": "花花公子"
    },
    "1671": {
        "id": 1671,
        "shieldWord": "一夜情"
    },
    "1672": {
        "id": 1672,
        "shieldWord": "乳沟"
    },
    "1673": {
        "id": 1673,
        "shieldWord": "淫虫"
    },
    "1674": {
        "id": 1674,
        "shieldWord": "叫床"
    },
    "1675": {
        "id": 1675,
        "shieldWord": "porn"
    },
    "1676": {
        "id": 1676,
        "shieldWord": "小姐打飞机"
    },
    "1677": {
        "id": 1677,
        "shieldWord": "少女被插"
    },
    "1678": {
        "id": 1678,
        "shieldWord": "Ｘ到喷屎尿"
    },
    "1679": {
        "id": 1679,
        "shieldWord": "口淫"
    },
    "1680": {
        "id": 1680,
        "shieldWord": "按摩棒"
    },
    "1681": {
        "id": 1681,
        "shieldWord": "操我"
    },
    "1682": {
        "id": 1682,
        "shieldWord": "奸情"
    },
    "1683": {
        "id": 1683,
        "shieldWord": "被干"
    },
    "1684": {
        "id": 1684,
        "shieldWord": "露逼"
    },
    "1685": {
        "id": 1685,
        "shieldWord": "美女高潮"
    },
    "1686": {
        "id": 1686,
        "shieldWord": "日逼"
    },
    "1687": {
        "id": 1687,
        "shieldWord": "肉洞"
    },
    "1688": {
        "id": 1688,
        "shieldWord": "阴缔"
    },
    "1689": {
        "id": 1689,
        "shieldWord": "插暴"
    },
    "1690": {
        "id": 1690,
        "shieldWord": "人妻"
    },
    "1691": {
        "id": 1691,
        "shieldWord": "内射"
    },
    "1692": {
        "id": 1692,
        "shieldWord": "肉具"
    },
    "1693": {
        "id": 1693,
        "shieldWord": "欲仙欲浪"
    },
    "1694": {
        "id": 1694,
        "shieldWord": "玉乳"
    },
    "1695": {
        "id": 1695,
        "shieldWord": "被插"
    },
    "1696": {
        "id": 1696,
        "shieldWord": "吞精"
    },
    "1697": {
        "id": 1697,
        "shieldWord": "暴乳"
    },
    "1698": {
        "id": 1698,
        "shieldWord": "成人午夜场"
    },
    "1699": {
        "id": 1699,
        "shieldWord": "买春堂"
    },
    "1700": {
        "id": 1700,
        "shieldWord": "性之站"
    },
    "1701": {
        "id": 1701,
        "shieldWord": "成人社区"
    },
    "1702": {
        "id": 1702,
        "shieldWord": "群交"
    },
    "1703": {
        "id": 1703,
        "shieldWord": "激情聊天"
    },
    "1704": {
        "id": 1704,
        "shieldWord": "三八淫"
    },
    "1705": {
        "id": 1705,
        "shieldWord": "做爱自拍"
    },
    "1706": {
        "id": 1706,
        "shieldWord": "淫妻"
    },
    "1707": {
        "id": 1707,
        "shieldWord": "夫妻俱乐部"
    },
    "1708": {
        "id": 1708,
        "shieldWord": "激情交友"
    },
    "1709": {
        "id": 1709,
        "shieldWord": "诱色uu"
    },
    "1710": {
        "id": 1710,
        "shieldWord": "就去色色"
    },
    "1711": {
        "id": 1711,
        "shieldWord": "熟妇"
    },
    "1712": {
        "id": 1712,
        "shieldWord": "mm美图"
    },
    "1713": {
        "id": 1713,
        "shieldWord": "走光偷拍"
    },
    "1714": {
        "id": 1714,
        "shieldWord": "77bbb"
    },
    "1715": {
        "id": 1715,
        "shieldWord": "虎骑"
    },
    "1716": {
        "id": 1716,
        "shieldWord": "咪咪图片"
    },
    "1717": {
        "id": 1717,
        "shieldWord": "成人导航"
    },
    "1718": {
        "id": 1718,
        "shieldWord": "深爱色色"
    },
    "1719": {
        "id": 1719,
        "shieldWord": "厕所偷拍"
    },
    "1720": {
        "id": 1720,
        "shieldWord": "成人A片"
    },
    "1721": {
        "id": 1721,
        "shieldWord": "夫妻多p"
    },
    "1722": {
        "id": 1722,
        "shieldWord": "我就色"
    },
    "1723": {
        "id": 1723,
        "shieldWord": "释欲"
    },
    "1724": {
        "id": 1724,
        "shieldWord": "你色吗"
    },
    "1725": {
        "id": 1725,
        "shieldWord": "裙内偷拍"
    },
    "1726": {
        "id": 1726,
        "shieldWord": "男女蒲典"
    },
    "1727": {
        "id": 1727,
        "shieldWord": "色97爱"
    },
    "1728": {
        "id": 1728,
        "shieldWord": "丝诱"
    },
    "1729": {
        "id": 1729,
        "shieldWord": "人妻自拍"
    },
    "1730": {
        "id": 1730,
        "shieldWord": "色情工厂"
    },
    "1731": {
        "id": 1731,
        "shieldWord": "色色婷婷"
    },
    "1732": {
        "id": 1732,
        "shieldWord": "美体艳姿"
    },
    "1733": {
        "id": 1733,
        "shieldWord": "颜射自拍"
    },
    "1734": {
        "id": 1734,
        "shieldWord": "熟母"
    },
    "1735": {
        "id": 1735,
        "shieldWord": "肉丝裤袜"
    },
    "1736": {
        "id": 1736,
        "shieldWord": "sm调教"
    },
    "1737": {
        "id": 1737,
        "shieldWord": "打野炮"
    },
    "1738": {
        "id": 1738,
        "shieldWord": "赤裸天使"
    },
    "1739": {
        "id": 1739,
        "shieldWord": "淫欲世家"
    },
    "1740": {
        "id": 1740,
        "shieldWord": "就去日"
    },
    "1741": {
        "id": 1741,
        "shieldWord": "爱幼阁"
    },
    "1742": {
        "id": 1742,
        "shieldWord": "巨屌"
    },
    "1743": {
        "id": 1743,
        "shieldWord": "花样性交"
    },
    "1744": {
        "id": 1744,
        "shieldWord": "裸陪"
    },
    "1745": {
        "id": 1745,
        "shieldWord": "夫妻3p"
    },
    "1746": {
        "id": 1746,
        "shieldWord": "大奶骚女"
    },
    "1747": {
        "id": 1747,
        "shieldWord": "性爱插穴"
    },
    "1748": {
        "id": 1748,
        "shieldWord": "日本熟母"
    },
    "1749": {
        "id": 1749,
        "shieldWord": "幼逼"
    },
    "1750": {
        "id": 1750,
        "shieldWord": "淫水四溅"
    },
    "1751": {
        "id": 1751,
        "shieldWord": "大胆出位"
    },
    "1752": {
        "id": 1752,
        "shieldWord": "旅馆自拍"
    },
    "1753": {
        "id": 1753,
        "shieldWord": "无套自拍"
    },
    "1754": {
        "id": 1754,
        "shieldWord": "快乐AV"
    },
    "1755": {
        "id": 1755,
        "shieldWord": "国产无码"
    },
    "1756": {
        "id": 1756,
        "shieldWord": "强制浣肠"
    },
    "1757": {
        "id": 1757,
        "shieldWord": "援交自拍"
    },
    "1758": {
        "id": 1758,
        "shieldWord": "凸肉优"
    },
    "1759": {
        "id": 1759,
        "shieldWord": "撅起大白腚"
    },
    "1760": {
        "id": 1760,
        "shieldWord": "骚妹妹"
    },
    "1761": {
        "id": 1761,
        "shieldWord": "插穴手淫"
    },
    "1762": {
        "id": 1762,
        "shieldWord": "双龙入洞"
    },
    "1763": {
        "id": 1763,
        "shieldWord": "美女吞精"
    },
    "1764": {
        "id": 1764,
        "shieldWord": "处女开包"
    },
    "1765": {
        "id": 1765,
        "shieldWord": "调教虐待"
    },
    "1766": {
        "id": 1766,
        "shieldWord": "淫肉诱惑"
    },
    "1767": {
        "id": 1767,
        "shieldWord": "激情潮喷"
    },
    "1768": {
        "id": 1768,
        "shieldWord": "骚穴怒放"
    },
    "1769": {
        "id": 1769,
        "shieldWord": "馒头屄"
    },
    "1770": {
        "id": 1770,
        "shieldWord": "无码丝袜"
    },
    "1771": {
        "id": 1771,
        "shieldWord": "写真"
    },
    "1772": {
        "id": 1772,
        "shieldWord": "寂寞自摸"
    },
    "1773": {
        "id": 1773,
        "shieldWord": "警奴"
    },
    "1774": {
        "id": 1774,
        "shieldWord": "轮操"
    },
    "1775": {
        "id": 1775,
        "shieldWord": "淫店"
    },
    "1776": {
        "id": 1776,
        "shieldWord": "精液浴"
    },
    "1777": {
        "id": 1777,
        "shieldWord": "淫乱诊所"
    },
    "1778": {
        "id": 1778,
        "shieldWord": "极品奶妹"
    },
    "1779": {
        "id": 1779,
        "shieldWord": "惹火身材"
    },
    "1780": {
        "id": 1780,
        "shieldWord": "暴力虐待"
    },
    "1781": {
        "id": 1781,
        "shieldWord": "巨乳俏女医"
    },
    "1782": {
        "id": 1782,
        "shieldWord": "扉之阴"
    },
    "1783": {
        "id": 1783,
        "shieldWord": "淫の方程式"
    },
    "1784": {
        "id": 1784,
        "shieldWord": "丁字裤翘臀"
    },
    "1785": {
        "id": 1785,
        "shieldWord": "轮奸内射"
    },
    "1786": {
        "id": 1786,
        "shieldWord": "空姐性交"
    },
    "1787": {
        "id": 1787,
        "shieldWord": "美乳斗艳"
    },
    "1788": {
        "id": 1788,
        "shieldWord": "舔鸡巴"
    },
    "1789": {
        "id": 1789,
        "shieldWord": "骚B熟女"
    },
    "1790": {
        "id": 1790,
        "shieldWord": "淫丝荡袜"
    },
    "1791": {
        "id": 1791,
        "shieldWord": "奴隶调教"
    },
    "1792": {
        "id": 1792,
        "shieldWord": "阴阜高耸"
    },
    "1793": {
        "id": 1793,
        "shieldWord": "翘臀嫩逼"
    },
    "1794": {
        "id": 1794,
        "shieldWord": "口交放尿"
    },
    "1795": {
        "id": 1795,
        "shieldWord": "媚药少年"
    },
    "1796": {
        "id": 1796,
        "shieldWord": "暴奸"
    },
    "1797": {
        "id": 1797,
        "shieldWord": "无修正"
    },
    "1798": {
        "id": 1798,
        "shieldWord": "国产AV"
    },
    "1799": {
        "id": 1799,
        "shieldWord": "淫水横流"
    },
    "1800": {
        "id": 1800,
        "shieldWord": "插入内射"
    },
    "1801": {
        "id": 1801,
        "shieldWord": "东热空姐"
    },
    "1802": {
        "id": 1802,
        "shieldWord": "大波粉B"
    },
    "1803": {
        "id": 1803,
        "shieldWord": "互舔淫穴"
    },
    "1804": {
        "id": 1804,
        "shieldWord": "丝袜淫妇"
    },
    "1805": {
        "id": 1805,
        "shieldWord": "乳此动人"
    },
    "1806": {
        "id": 1806,
        "shieldWord": "大波骚妇"
    },
    "1807": {
        "id": 1807,
        "shieldWord": "无码做爱"
    },
    "1808": {
        "id": 1808,
        "shieldWord": "口爆吞精"
    },
    "1809": {
        "id": 1809,
        "shieldWord": "放荡熟女"
    },
    "1810": {
        "id": 1810,
        "shieldWord": "巨炮兵团"
    },
    "1811": {
        "id": 1811,
        "shieldWord": "叔嫂肉欲"
    },
    "1812": {
        "id": 1812,
        "shieldWord": "肉感炮友"
    },
    "1813": {
        "id": 1813,
        "shieldWord": "爱妻淫穴"
    },
    "1814": {
        "id": 1814,
        "shieldWord": "无码精选"
    },
    "1815": {
        "id": 1815,
        "shieldWord": "超毛大鲍"
    },
    "1816": {
        "id": 1816,
        "shieldWord": "熟妇骚器"
    },
    "1817": {
        "id": 1817,
        "shieldWord": "内射美妇"
    },
    "1818": {
        "id": 1818,
        "shieldWord": "毒龙舔脚"
    },
    "1819": {
        "id": 1819,
        "shieldWord": "性爱擂台"
    },
    "1820": {
        "id": 1820,
        "shieldWord": "圣泉学淫"
    },
    "1821": {
        "id": 1821,
        "shieldWord": "性奴会"
    },
    "1822": {
        "id": 1822,
        "shieldWord": "密室淫行"
    },
    "1823": {
        "id": 1823,
        "shieldWord": "亮屄"
    },
    "1824": {
        "id": 1824,
        "shieldWord": "操肿"
    },
    "1825": {
        "id": 1825,
        "shieldWord": "无码淫女"
    },
    "1826": {
        "id": 1826,
        "shieldWord": "玩逼"
    },
    "1827": {
        "id": 1827,
        "shieldWord": "淫虐"
    },
    "1828": {
        "id": 1828,
        "shieldWord": "我就去色"
    },
    "1829": {
        "id": 1829,
        "shieldWord": "淫痴"
    },
    "1830": {
        "id": 1830,
        "shieldWord": "风骚欲女"
    },
    "1831": {
        "id": 1831,
        "shieldWord": "亮穴"
    },
    "1832": {
        "id": 1832,
        "shieldWord": "操穴喷水"
    },
    "1833": {
        "id": 1833,
        "shieldWord": "幼男"
    },
    "1834": {
        "id": 1834,
        "shieldWord": "肉箫"
    },
    "1835": {
        "id": 1835,
        "shieldWord": "巨骚"
    },
    "1836": {
        "id": 1836,
        "shieldWord": "骚妻"
    },
    "1837": {
        "id": 1837,
        "shieldWord": "漏逼"
    },
    "1838": {
        "id": 1838,
        "shieldWord": "骚屄"
    },
    "1839": {
        "id": 1839,
        "shieldWord": "大奶美逼"
    },
    "1840": {
        "id": 1840,
        "shieldWord": "高潮白浆"
    },
    "1841": {
        "id": 1841,
        "shieldWord": "性战擂台"
    },
    "1842": {
        "id": 1842,
        "shieldWord": "淫女炮图"
    },
    "1843": {
        "id": 1843,
        "shieldWord": "小穴"
    },
    "1844": {
        "id": 1844,
        "shieldWord": "淫水横溢"
    },
    "1845": {
        "id": 1845,
        "shieldWord": "性交吞精"
    },
    "1846": {
        "id": 1846,
        "shieldWord": "奸染"
    },
    "1847": {
        "id": 1847,
        "shieldWord": "淫告白"
    },
    "1848": {
        "id": 1848,
        "shieldWord": "乳射"
    },
    "1849": {
        "id": 1849,
        "shieldWord": "操黑"
    },
    "1850": {
        "id": 1850,
        "shieldWord": "朝天穴"
    },
    "1851": {
        "id": 1851,
        "shieldWord": "公媳乱"
    },
    "1852": {
        "id": 1852,
        "shieldWord": "女屄"
    },
    "1853": {
        "id": 1853,
        "shieldWord": "慰春情"
    },
    "1854": {
        "id": 1854,
        "shieldWord": "集体淫"
    },
    "1855": {
        "id": 1855,
        "shieldWord": "淫B"
    },
    "1856": {
        "id": 1856,
        "shieldWord": "屄屄"
    },
    "1857": {
        "id": 1857,
        "shieldWord": "肛屄"
    },
    "1858": {
        "id": 1858,
        "shieldWord": "小嫩鸡"
    },
    "1859": {
        "id": 1859,
        "shieldWord": "舔B"
    },
    "1860": {
        "id": 1860,
        "shieldWord": "嫩奶"
    },
    "1861": {
        "id": 1861,
        "shieldWord": "a4y"
    },
    "1862": {
        "id": 1862,
        "shieldWord": "品穴"
    },
    "1863": {
        "id": 1863,
        "shieldWord": "淫水翻腾"
    },
    "1864": {
        "id": 1864,
        "shieldWord": "一本道"
    },
    "1865": {
        "id": 1865,
        "shieldWord": "乳尻"
    },
    "1866": {
        "id": 1866,
        "shieldWord": "羞耻母"
    },
    "1867": {
        "id": 1867,
        "shieldWord": "艳照"
    },
    "1868": {
        "id": 1868,
        "shieldWord": "三P"
    },
    "1869": {
        "id": 1869,
        "shieldWord": "露毛"
    },
    "1870": {
        "id": 1870,
        "shieldWord": "紧穴"
    },
    "1871": {
        "id": 1871,
        "shieldWord": "露点"
    },
    "1872": {
        "id": 1872,
        "shieldWord": "18禁"
    },
    "1873": {
        "id": 1873,
        "shieldWord": "g片"
    },
    "1874": {
        "id": 1874,
        "shieldWord": "teen"
    },
    "1875": {
        "id": 1875,
        "shieldWord": "无码电影"
    },
    "1876": {
        "id": 1876,
        "shieldWord": "爱液"
    },
    "1877": {
        "id": 1877,
        "shieldWord": "插b"
    },
    "1878": {
        "id": 1878,
        "shieldWord": "赤裸"
    },
    "1879": {
        "id": 1879,
        "shieldWord": "荡妇"
    },
    "1880": {
        "id": 1880,
        "shieldWord": "荡女"
    },
    "1881": {
        "id": 1881,
        "shieldWord": "浪穴"
    },
    "1882": {
        "id": 1882,
        "shieldWord": "露穴"
    },
    "1883": {
        "id": 1883,
        "shieldWord": "美穴"
    },
    "1884": {
        "id": 1884,
        "shieldWord": "猛插"
    },
    "1885": {
        "id": 1885,
        "shieldWord": "迷药"
    },
    "1886": {
        "id": 1886,
        "shieldWord": "嫩穴"
    },
    "1887": {
        "id": 1887,
        "shieldWord": "肉穴"
    },
    "1888": {
        "id": 1888,
        "shieldWord": "乳交"
    },
    "1889": {
        "id": 1889,
        "shieldWord": "乳头"
    },
    "1890": {
        "id": 1890,
        "shieldWord": "无码"
    },
    "1891": {
        "id": 1891,
        "shieldWord": "吸精"
    },
    "1892": {
        "id": 1892,
        "shieldWord": "现代情色小说"
    },
    "1893": {
        "id": 1893,
        "shieldWord": "性交图"
    },
    "1894": {
        "id": 1894,
        "shieldWord": "性息"
    },
    "1895": {
        "id": 1895,
        "shieldWord": "艳情小说"
    },
    "1896": {
        "id": 1896,
        "shieldWord": "阴部特写"
    },
    "1897": {
        "id": 1897,
        "shieldWord": "阴道图片"
    },
    "1898": {
        "id": 1898,
        "shieldWord": "淫书"
    },
    "1899": {
        "id": 1899,
        "shieldWord": "幼女"
    },
    "1900": {
        "id": 1900,
        "shieldWord": "玉蒲团玉女心经"
    },
    "1901": {
        "id": 1901,
        "shieldWord": "援助交易"
    },
    "1902": {
        "id": 1902,
        "shieldWord": "中国成人论坛"
    },
    "1903": {
        "id": 1903,
        "shieldWord": "中国性爱城"
    },
    "1904": {
        "id": 1904,
        "shieldWord": "自拍写真"
    },
    "1905": {
        "id": 1905,
        "shieldWord": "做爱图片"
    },
    "1906": {
        "id": 1906,
        "shieldWord": "掰穴"
    },
    "1907": {
        "id": 1907,
        "shieldWord": "万淫堂"
    },
    "1908": {
        "id": 1908,
        "shieldWord": "穴图"
    },
    "1909": {
        "id": 1909,
        "shieldWord": "穴淫"
    },
    "1910": {
        "id": 1910,
        "shieldWord": "艳舞淫业"
    },
    "1911": {
        "id": 1911,
        "shieldWord": "咬着龟头"
    },
    "1912": {
        "id": 1912,
        "shieldWord": "要射了"
    },
    "1913": {
        "id": 1913,
        "shieldWord": "一夜性网"
    },
    "1914": {
        "id": 1914,
        "shieldWord": "阴茎插小穴"
    },
    "1915": {
        "id": 1915,
        "shieldWord": "阴穴新玩法"
    },
    "1916": {
        "id": 1916,
        "shieldWord": "淫乱军团"
    },
    "1917": {
        "id": 1917,
        "shieldWord": "淫逼"
    },
    "1918": {
        "id": 1918,
        "shieldWord": "淫姐"
    },
    "1919": {
        "id": 1919,
        "shieldWord": "淫浪"
    },
    "1920": {
        "id": 1920,
        "shieldWord": "淫流"
    },
    "1921": {
        "id": 1921,
        "shieldWord": "淫糜"
    },
    "1922": {
        "id": 1922,
        "shieldWord": "淫蜜"
    },
    "1923": {
        "id": 1923,
        "shieldWord": "淫魔"
    },
    "1924": {
        "id": 1924,
        "shieldWord": "淫母"
    },
    "1925": {
        "id": 1925,
        "shieldWord": "淫妞"
    },
    "1926": {
        "id": 1926,
        "shieldWord": "淫奴"
    },
    "1927": {
        "id": 1927,
        "shieldWord": "淫娃"
    },
    "1928": {
        "id": 1928,
        "shieldWord": "淫液"
    },
    "1929": {
        "id": 1929,
        "shieldWord": "钻插"
    },
    "1930": {
        "id": 1930,
        "shieldWord": "H动漫"
    },
    "1931": {
        "id": 1931,
        "shieldWord": "交换夫妻"
    },
    "1932": {
        "id": 1932,
        "shieldWord": "美腿"
    },
    "1933": {
        "id": 1933,
        "shieldWord": "舔脚"
    },
    "1934": {
        "id": 1934,
        "shieldWord": "蜜洞"
    },
    "1935": {
        "id": 1935,
        "shieldWord": "丝袜"
    },
    "1936": {
        "id": 1936,
        "shieldWord": "淫情"
    },
    "1937": {
        "id": 1937,
        "shieldWord": "亚洲情色网"
    },
    "1938": {
        "id": 1938,
        "shieldWord": "强奸处女"
    },
    "1939": {
        "id": 1939,
        "shieldWord": "鸡巴暴胀"
    },
    "1940": {
        "id": 1940,
        "shieldWord": "美乳"
    },
    "1941": {
        "id": 1941,
        "shieldWord": "大众色情成人网"
    },
    "1942": {
        "id": 1942,
        "shieldWord": "火辣图片"
    },
    "1943": {
        "id": 1943,
        "shieldWord": "淫声浪语"
    },
    "1944": {
        "id": 1944,
        "shieldWord": "疯狂抽送"
    },
    "1945": {
        "id": 1945,
        "shieldWord": "淫河"
    },
    "1946": {
        "id": 1946,
        "shieldWord": "强暴"
    },
    "1947": {
        "id": 1947,
        "shieldWord": "多人性爱"
    },
    "1948": {
        "id": 1948,
        "shieldWord": "操屄"
    },
    "1949": {
        "id": 1949,
        "shieldWord": "浪女"
    },
    "1950": {
        "id": 1950,
        "shieldWord": "色情论坛"
    },
    "1951": {
        "id": 1951,
        "shieldWord": "性虎色网"
    },
    "1952": {
        "id": 1952,
        "shieldWord": "淫欲日本"
    },
    "1953": {
        "id": 1953,
        "shieldWord": "操死"
    },
    "1954": {
        "id": 1954,
        "shieldWord": "色迷城"
    },
    "1955": {
        "id": 1955,
        "shieldWord": "petgirl"
    },
    "1956": {
        "id": 1956,
        "shieldWord": "骚女叫春"
    },
    "1957": {
        "id": 1957,
        "shieldWord": "成人百强"
    },
    "1958": {
        "id": 1958,
        "shieldWord": "猖妓"
    },
    "1959": {
        "id": 1959,
        "shieldWord": "天天干贴图"
    },
    "1960": {
        "id": 1960,
        "shieldWord": "密穴贴图"
    },
    "1961": {
        "id": 1961,
        "shieldWord": "凌辱"
    },
    "1962": {
        "id": 1962,
        "shieldWord": "偷欢"
    },
    "1963": {
        "id": 1963,
        "shieldWord": "小逼"
    },
    "1964": {
        "id": 1964,
        "shieldWord": "酥痒"
    },
    "1965": {
        "id": 1965,
        "shieldWord": "品色堂"
    },
    "1966": {
        "id": 1966,
        "shieldWord": "浪妇"
    },
    "1967": {
        "id": 1967,
        "shieldWord": "嫖妓指南"
    },
    "1968": {
        "id": 1968,
        "shieldWord": "肉缝"
    },
    "1969": {
        "id": 1969,
        "shieldWord": "色窝窝"
    },
    "1970": {
        "id": 1970,
        "shieldWord": "被操"
    },
    "1971": {
        "id": 1971,
        "shieldWord": "巨奶"
    },
    "1972": {
        "id": 1972,
        "shieldWord": "骚洞"
    },
    "1973": {
        "id": 1973,
        "shieldWord": "阴精"
    },
    "1974": {
        "id": 1974,
        "shieldWord": "阴阜"
    },
    "1975": {
        "id": 1975,
        "shieldWord": "阴屄"
    },
    "1976": {
        "id": 1976,
        "shieldWord": "群魔色舞"
    },
    "1977": {
        "id": 1977,
        "shieldWord": "扒穴"
    },
    "1978": {
        "id": 1978,
        "shieldWord": "六月联盟"
    },
    "1979": {
        "id": 1979,
        "shieldWord": "55sss偷拍区"
    },
    "1980": {
        "id": 1980,
        "shieldWord": "张筱雨"
    },
    "1981": {
        "id": 1981,
        "shieldWord": "xiao77"
    },
    "1982": {
        "id": 1982,
        "shieldWord": "极品黑丝"
    },
    "1983": {
        "id": 1983,
        "shieldWord": "丝袜写真"
    },
    "1984": {
        "id": 1984,
        "shieldWord": "天天情色"
    },
    "1985": {
        "id": 1985,
        "shieldWord": "成人小说"
    },
    "1986": {
        "id": 1986,
        "shieldWord": "成人文学"
    },
    "1987": {
        "id": 1987,
        "shieldWord": "情色艺术天空"
    },
    "1988": {
        "id": 1988,
        "shieldWord": "222se图片"
    },
    "1989": {
        "id": 1989,
        "shieldWord": "偷拍"
    },
    "1990": {
        "id": 1990,
        "shieldWord": "淫色贴图"
    },
    "1991": {
        "id": 1991,
        "shieldWord": "厕奴"
    },
    "1992": {
        "id": 1992,
        "shieldWord": "美女成人"
    },
    "1993": {
        "id": 1993,
        "shieldWord": "酥胸诱惑"
    },
    "1994": {
        "id": 1994,
        "shieldWord": "五月天"
    },
    "1995": {
        "id": 1995,
        "shieldWord": "人体摄影"
    },
    "1996": {
        "id": 1996,
        "shieldWord": "东北xx网"
    },
    "1997": {
        "id": 1997,
        "shieldWord": "玛雅网"
    },
    "1998": {
        "id": 1998,
        "shieldWord": "成人bt"
    },
    "1999": {
        "id": 1999,
        "shieldWord": "周六性吧"
    },
    "2000": {
        "id": 2000,
        "shieldWord": "爆乳"
    },
    "2001": {
        "id": 2001,
        "shieldWord": "诱惑视频"
    },
    "2002": {
        "id": 2002,
        "shieldWord": "裙下风光"
    },
    "2003": {
        "id": 2003,
        "shieldWord": "嘻游中国"
    },
    "2004": {
        "id": 2004,
        "shieldWord": "操母狗"
    },
    "2005": {
        "id": 2005,
        "shieldWord": "御の二代目"
    },
    "2006": {
        "id": 2006,
        "shieldWord": "丝袜足交"
    },
    "2007": {
        "id": 2007,
        "shieldWord": "肮脏美学"
    },
    "2008": {
        "id": 2008,
        "shieldWord": "亚洲有码"
    },
    "2009": {
        "id": 2009,
        "shieldWord": "欲仙欲死"
    },
    "2010": {
        "id": 2010,
        "shieldWord": "丝袜高跟"
    },
    "2011": {
        "id": 2011,
        "shieldWord": "偷拍美穴"
    },
    "2012": {
        "id": 2012,
        "shieldWord": "原味丝袜"
    },
    "2013": {
        "id": 2013,
        "shieldWord": "裸露自拍"
    },
    "2014": {
        "id": 2014,
        "shieldWord": "针孔偷拍"
    },
    "2015": {
        "id": 2015,
        "shieldWord": "放荡少妇宾馆"
    },
    "2016": {
        "id": 2016,
        "shieldWord": "性感肉丝"
    },
    "2017": {
        "id": 2017,
        "shieldWord": "拳交"
    },
    "2018": {
        "id": 2018,
        "shieldWord": "迫奸"
    },
    "2019": {
        "id": 2019,
        "shieldWord": "品香堂"
    },
    "2020": {
        "id": 2020,
        "shieldWord": "北京xx网"
    },
    "2021": {
        "id": 2021,
        "shieldWord": "虐奴"
    },
    "2022": {
        "id": 2022,
        "shieldWord": "情色导航"
    },
    "2023": {
        "id": 2023,
        "shieldWord": "欧美大乳"
    },
    "2024": {
        "id": 2024,
        "shieldWord": "欧美无套"
    },
    "2025": {
        "id": 2025,
        "shieldWord": "骚妇露逼"
    },
    "2026": {
        "id": 2026,
        "shieldWord": "炮友"
    },
    "2027": {
        "id": 2027,
        "shieldWord": "淫水丝袜"
    },
    "2028": {
        "id": 2028,
        "shieldWord": "母女双飞"
    },
    "2029": {
        "id": 2029,
        "shieldWord": "老少乱伦"
    },
    "2030": {
        "id": 2030,
        "shieldWord": "幼妓"
    },
    "2031": {
        "id": 2031,
        "shieldWord": "素人娘"
    },
    "2032": {
        "id": 2032,
        "shieldWord": "前凸后翘"
    },
    "2033": {
        "id": 2033,
        "shieldWord": "制服诱惑"
    },
    "2034": {
        "id": 2034,
        "shieldWord": "舔屄"
    },
    "2035": {
        "id": 2035,
        "shieldWord": "色色成人"
    },
    "2036": {
        "id": 2036,
        "shieldWord": "迷奸系列"
    },
    "2037": {
        "id": 2037,
        "shieldWord": "性交无码"
    },
    "2038": {
        "id": 2038,
        "shieldWord": "惹火自拍"
    },
    "2039": {
        "id": 2039,
        "shieldWord": "胯下呻吟"
    },
    "2040": {
        "id": 2040,
        "shieldWord": "淫驴屯"
    },
    "2041": {
        "id": 2041,
        "shieldWord": "少妇偷情"
    },
    "2042": {
        "id": 2042,
        "shieldWord": "护士诱惑"
    },
    "2043": {
        "id": 2043,
        "shieldWord": "群奸乱交"
    },
    "2044": {
        "id": 2044,
        "shieldWord": "极品白虎"
    },
    "2045": {
        "id": 2045,
        "shieldWord": "曲线消魂"
    },
    "2046": {
        "id": 2046,
        "shieldWord": "淫腔"
    },
    "2047": {
        "id": 2047,
        "shieldWord": "无码淫漫"
    },
    "2048": {
        "id": 2048,
        "shieldWord": "假阳具插穴"
    },
    "2049": {
        "id": 2049,
        "shieldWord": "蝴蝶逼"
    },
    "2050": {
        "id": 2050,
        "shieldWord": "自插小穴"
    },
    "2051": {
        "id": 2051,
        "shieldWord": "SM援交"
    },
    "2052": {
        "id": 2052,
        "shieldWord": "西洋美女"
    },
    "2053": {
        "id": 2053,
        "shieldWord": "爱液横流"
    },
    "2054": {
        "id": 2054,
        "shieldWord": "无码无套"
    },
    "2055": {
        "id": 2055,
        "shieldWord": "淫战群P"
    },
    "2056": {
        "id": 2056,
        "shieldWord": "口爆"
    },
    "2057": {
        "id": 2057,
        "shieldWord": "酒店援交"
    },
    "2058": {
        "id": 2058,
        "shieldWord": "乳霸"
    },
    "2059": {
        "id": 2059,
        "shieldWord": "湿身诱惑"
    },
    "2060": {
        "id": 2060,
        "shieldWord": "火辣写真"
    },
    "2061": {
        "id": 2061,
        "shieldWord": "动漫色图"
    },
    "2062": {
        "id": 2062,
        "shieldWord": "熟女护士"
    },
    "2063": {
        "id": 2063,
        "shieldWord": "粉红穴"
    },
    "2064": {
        "id": 2064,
        "shieldWord": "经典炮图"
    },
    "2065": {
        "id": 2065,
        "shieldWord": "童颜巨乳"
    },
    "2066": {
        "id": 2066,
        "shieldWord": "性感诱惑"
    },
    "2067": {
        "id": 2067,
        "shieldWord": "援交薄码"
    },
    "2068": {
        "id": 2068,
        "shieldWord": "美乳美穴"
    },
    "2069": {
        "id": 2069,
        "shieldWord": "奇淫宝鉴"
    },
    "2070": {
        "id": 2070,
        "shieldWord": "美骚妇"
    },
    "2071": {
        "id": 2071,
        "shieldWord": "跨下呻吟"
    },
    "2072": {
        "id": 2072,
        "shieldWord": "无毛美少女"
    },
    "2073": {
        "id": 2073,
        "shieldWord": "流蜜汁"
    },
    "2074": {
        "id": 2074,
        "shieldWord": "日本素人"
    },
    "2075": {
        "id": 2075,
        "shieldWord": "爆乳人妻"
    },
    "2076": {
        "id": 2076,
        "shieldWord": "妖媚熟母"
    },
    "2077": {
        "id": 2077,
        "shieldWord": "日本有码"
    },
    "2078": {
        "id": 2078,
        "shieldWord": "激情打炮"
    },
    "2079": {
        "id": 2079,
        "shieldWord": "制服美妇"
    },
    "2080": {
        "id": 2080,
        "shieldWord": "无码彩图"
    },
    "2081": {
        "id": 2081,
        "shieldWord": "放尿"
    },
    "2082": {
        "id": 2082,
        "shieldWord": "入穴一游"
    },
    "2083": {
        "id": 2083,
        "shieldWord": "丰唇艳姬"
    },
    "2084": {
        "id": 2084,
        "shieldWord": "群奸轮射"
    },
    "2085": {
        "id": 2085,
        "shieldWord": "高级逼"
    },
    "2086": {
        "id": 2086,
        "shieldWord": "MM屄"
    },
    "2087": {
        "id": 2087,
        "shieldWord": "美臀嫰穴"
    },
    "2088": {
        "id": 2088,
        "shieldWord": "淫东方"
    },
    "2089": {
        "id": 2089,
        "shieldWord": "国产偷拍"
    },
    "2090": {
        "id": 2090,
        "shieldWord": "清晰内射"
    },
    "2091": {
        "id": 2091,
        "shieldWord": "嫩穴肉缝"
    },
    "2092": {
        "id": 2092,
        "shieldWord": "雪腿玉胯"
    },
    "2093": {
        "id": 2093,
        "shieldWord": "骚妇掰B"
    },
    "2094": {
        "id": 2094,
        "shieldWord": "白嫩骚妇"
    },
    "2095": {
        "id": 2095,
        "shieldWord": "梅花屄"
    },
    "2096": {
        "id": 2096,
        "shieldWord": "猛操狂射"
    },
    "2097": {
        "id": 2097,
        "shieldWord": "潮喷"
    },
    "2098": {
        "id": 2098,
        "shieldWord": "无码体验"
    },
    "2099": {
        "id": 2099,
        "shieldWord": "吞精骚妹"
    },
    "2100": {
        "id": 2100,
        "shieldWord": "紧缚凌辱"
    },
    "2101": {
        "id": 2101,
        "shieldWord": "奸淫电车"
    },
    "2102": {
        "id": 2102,
        "shieldWord": "堕淫"
    },
    "2103": {
        "id": 2103,
        "shieldWord": "颜骑"
    },
    "2104": {
        "id": 2104,
        "shieldWord": "互淫"
    },
    "2105": {
        "id": 2105,
        "shieldWord": "逼毛"
    },
    "2106": {
        "id": 2106,
        "shieldWord": "胸涛乳浪"
    },
    "2107": {
        "id": 2107,
        "shieldWord": "夫妻乱交"
    },
    "2108": {
        "id": 2108,
        "shieldWord": "黑屄"
    },
    "2109": {
        "id": 2109,
        "shieldWord": "奶大屄肥"
    },
    "2110": {
        "id": 2110,
        "shieldWord": "拔屄"
    },
    "2111": {
        "id": 2111,
        "shieldWord": "穴海"
    },
    "2112": {
        "id": 2112,
        "shieldWord": "换妻杂交"
    },
    "2113": {
        "id": 2113,
        "shieldWord": "狂插"
    },
    "2114": {
        "id": 2114,
        "shieldWord": "黑逼"
    },
    "2115": {
        "id": 2115,
        "shieldWord": "粉屄"
    },
    "2116": {
        "id": 2116,
        "shieldWord": "口射"
    },
    "2117": {
        "id": 2117,
        "shieldWord": "多人轮"
    },
    "2118": {
        "id": 2118,
        "shieldWord": "奶挺臀翘"
    },
    "2119": {
        "id": 2119,
        "shieldWord": "扒屄"
    },
    "2120": {
        "id": 2120,
        "shieldWord": "痴乳"
    },
    "2121": {
        "id": 2121,
        "shieldWord": "鬼轮奸"
    },
    "2122": {
        "id": 2122,
        "shieldWord": "乳爆"
    },
    "2123": {
        "id": 2123,
        "shieldWord": "浴尿"
    },
    "2124": {
        "id": 2124,
        "shieldWord": "淫样"
    },
    "2125": {
        "id": 2125,
        "shieldWord": "発妻"
    },
    "2126": {
        "id": 2126,
        "shieldWord": "姫辱"
    },
    "2127": {
        "id": 2127,
        "shieldWord": "插后庭"
    },
    "2128": {
        "id": 2128,
        "shieldWord": "操爽"
    },
    "2129": {
        "id": 2129,
        "shieldWord": "嫩缝"
    },
    "2130": {
        "id": 2130,
        "shieldWord": "操射"
    },
    "2131": {
        "id": 2131,
        "shieldWord": "骚妈"
    },
    "2132": {
        "id": 2132,
        "shieldWord": "激插"
    },
    "2133": {
        "id": 2133,
        "shieldWord": "暴干"
    },
    "2134": {
        "id": 2134,
        "shieldWord": "母子交欢"
    },
    "2135": {
        "id": 2135,
        "shieldWord": "嫐屄"
    },
    "2136": {
        "id": 2136,
        "shieldWord": "足脚交"
    },
    "2137": {
        "id": 2137,
        "shieldWord": "露屄"
    },
    "2138": {
        "id": 2138,
        "shieldWord": "柔阴术"
    },
    "2139": {
        "id": 2139,
        "shieldWord": "相奸"
    },
    "2140": {
        "id": 2140,
        "shieldWord": "淫师荡母"
    },
    "2141": {
        "id": 2141,
        "shieldWord": "欠干"
    },
    "2142": {
        "id": 2142,
        "shieldWord": "桃园蜜洞"
    },
    "2143": {
        "id": 2143,
        "shieldWord": "二穴中出"
    },
    "2144": {
        "id": 2144,
        "shieldWord": "奴畜抄"
    },
    "2145": {
        "id": 2145,
        "shieldWord": "连続失禁"
    },
    "2146": {
        "id": 2146,
        "shieldWord": "大鸡巴"
    },
    "2147": {
        "id": 2147,
        "shieldWord": "玩穴"
    },
    "2148": {
        "id": 2148,
        "shieldWord": "性交自拍"
    },
    "2149": {
        "id": 2149,
        "shieldWord": "叫鸡"
    },
    "2150": {
        "id": 2150,
        "shieldWord": "骚浪人妻"
    },
    "2151": {
        "id": 2151,
        "shieldWord": "三级片"
    },
    "2152": {
        "id": 2152,
        "shieldWord": "东京热"
    },
    "2153": {
        "id": 2153,
        "shieldWord": "做爱"
    },
    "2154": {
        "id": 2154,
        "shieldWord": "操"
    },
    "2155": {
        "id": 2155,
        "shieldWord": "坐台"
    },
    "2156": {
        "id": 2156,
        "shieldWord": "子宫"
    },
    "2157": {
        "id": 2157,
        "shieldWord": "杂种"
    },
    "2158": {
        "id": 2158,
        "shieldWord": "淫"
    },
    "2159": {
        "id": 2159,
        "shieldWord": "阴毛"
    },
    "2160": {
        "id": 2160,
        "shieldWord": "阴户"
    },
    "2161": {
        "id": 2161,
        "shieldWord": "阴蒂"
    },
    "2162": {
        "id": 2162,
        "shieldWord": "爷爷"
    },
    "2163": {
        "id": 2163,
        "shieldWord": "阳具"
    },
    "2164": {
        "id": 2164,
        "shieldWord": "性交"
    },
    "2165": {
        "id": 2165,
        "shieldWord": "性爱"
    },
    "2166": {
        "id": 2166,
        "shieldWord": "小鸡鸡"
    },
    "2167": {
        "id": 2167,
        "shieldWord": "小弟弟"
    },
    "2168": {
        "id": 2168,
        "shieldWord": "小便"
    },
    "2169": {
        "id": 2169,
        "shieldWord": "武藤"
    },
    "2170": {
        "id": 2170,
        "shieldWord": "慰安妇"
    },
    "2171": {
        "id": 2171,
        "shieldWord": "猥亵"
    },
    "2172": {
        "id": 2172,
        "shieldWord": "猥琐"
    },
    "2173": {
        "id": 2173,
        "shieldWord": "生殖"
    },
    "2174": {
        "id": 2174,
        "shieldWord": "煞笔"
    },
    "2175": {
        "id": 2175,
        "shieldWord": "傻逼"
    },
    "2176": {
        "id": 2176,
        "shieldWord": "傻B"
    },
    "2177": {
        "id": 2177,
        "shieldWord": "色情"
    },
    "2178": {
        "id": 2178,
        "shieldWord": "骚逼"
    },
    "2179": {
        "id": 2179,
        "shieldWord": "三陪"
    },
    "2180": {
        "id": 2180,
        "shieldWord": "肉欲"
    },
    "2181": {
        "id": 2181,
        "shieldWord": "肉体"
    },
    "2182": {
        "id": 2182,
        "shieldWord": "情色"
    },
    "2183": {
        "id": 2183,
        "shieldWord": "排泄"
    },
    "2184": {
        "id": 2184,
        "shieldWord": "女干"
    },
    "2185": {
        "id": 2185,
        "shieldWord": "灭族"
    },
    "2186": {
        "id": 2186,
        "shieldWord": "梅毒"
    },
    "2187": {
        "id": 2187,
        "shieldWord": "卵子"
    },
    "2188": {
        "id": 2188,
        "shieldWord": "淋病"
    },
    "2189": {
        "id": 2189,
        "shieldWord": "口交"
    },
    "2190": {
        "id": 2190,
        "shieldWord": "尻"
    },
    "2191": {
        "id": 2191,
        "shieldWord": "贱"
    },
    "2192": {
        "id": 2192,
        "shieldWord": "鸡吧"
    },
    "2193": {
        "id": 2193,
        "shieldWord": "胡瘟"
    },
    "2194": {
        "id": 2194,
        "shieldWord": "龟头"
    },
    "2195": {
        "id": 2195,
        "shieldWord": "狗日"
    },
    "2196": {
        "id": 2196,
        "shieldWord": "狗娘"
    },
    "2197": {
        "id": 2197,
        "shieldWord": "根正苗红"
    },
    "2198": {
        "id": 2198,
        "shieldWord": "睾丸"
    },
    "2199": {
        "id": 2199,
        "shieldWord": "疯狗"
    },
    "2200": {
        "id": 2200,
        "shieldWord": "腚"
    },
    "2201": {
        "id": 2201,
        "shieldWord": "大便"
    },
    "2202": {
        "id": 2202,
        "shieldWord": "打炮"
    },
    "2203": {
        "id": 2203,
        "shieldWord": "打飞机"
    },
    "2204": {
        "id": 2204,
        "shieldWord": "娼"
    },
    "2205": {
        "id": 2205,
        "shieldWord": "瘪三"
    },
    "2206": {
        "id": 2206,
        "shieldWord": "妈逼"
    },
    "2207": {
        "id": 2207,
        "shieldWord": "妈"
    },
    "2208": {
        "id": 2208,
        "shieldWord": "爸"
    },
    "2209": {
        "id": 2209,
        "shieldWord": "爹"
    },
    "2210": {
        "id": 2210,
        "shieldWord": "爷"
    },
    "2211": {
        "id": 2211,
        "shieldWord": "奶"
    },
    "2212": {
        "id": 2212,
        "shieldWord": "儿子"
    },
    "2213": {
        "id": 2213,
        "shieldWord": "sm"
    },
    "2214": {
        "id": 2214,
        "shieldWord": "尼玛"
    },
    "2215": {
        "id": 2215,
        "shieldWord": "装B"
    },
    "2216": {
        "id": 2216,
        "shieldWord": "偷窥视频"
    },
    "2217": {
        "id": 2217,
        "shieldWord": "裸聊"
    },
    "2218": {
        "id": 2218,
        "shieldWord": "兽兽门"
    },
    "2219": {
        "id": 2219,
        "shieldWord": "艾滋"
    },
    "2220": {
        "id": 2220,
        "shieldWord": "艾滋病"
    },
    "2221": {
        "id": 2221,
        "shieldWord": "二逼"
    },
    "2222": {
        "id": 2222,
        "shieldWord": "阳物"
    },
    "2223": {
        "id": 2223,
        "shieldWord": "找小姐"
    },
    "2224": {
        "id": 2224,
        "shieldWord": "开房"
    },
    "2225": {
        "id": 2225,
        "shieldWord": "援交"
    },
    "2226": {
        "id": 2226,
        "shieldWord": "黄色网站"
    },
    "2227": {
        "id": 2227,
        "shieldWord": "大血逼"
    },
    "2228": {
        "id": 2228,
        "shieldWord": "大血比"
    },
    "2229": {
        "id": 2229,
        "shieldWord": "性虐"
    },
    "2230": {
        "id": 2230,
        "shieldWord": "未婚同居"
    },
    "2231": {
        "id": 2231,
        "shieldWord": "黄网"
    },
    "2232": {
        "id": 2232,
        "shieldWord": "小三"
    },
    "2233": {
        "id": 2233,
        "shieldWord": "小3"
    },
    "2234": {
        "id": 2234,
        "shieldWord": "软妹"
    },
    "2235": {
        "id": 2235,
        "shieldWord": "伪娘"
    },
    "2236": {
        "id": 2236,
        "shieldWord": "萝太"
    },
    "2237": {
        "id": 2237,
        "shieldWord": "伪男"
    },
    "2238": {
        "id": 2238,
        "shieldWord": "萌大奶"
    },
    "2239": {
        "id": 2239,
        "shieldWord": "傻毕"
    },
    "2240": {
        "id": 2240,
        "shieldWord": "你妹的"
    },
    "2241": {
        "id": 2241,
        "shieldWord": "被立教"
    },
    "2242": {
        "id": 2242,
        "shieldWord": "啪啪啪"
    },
    "2243": {
        "id": 2243,
        "shieldWord": "法图麦"
    },
    "2244": {
        "id": 2244,
        "shieldWord": "赫蒂彻"
    },
    "2245": {
        "id": 2245,
        "shieldWord": "乳贴"
    },
    "2246": {
        "id": 2246,
        "shieldWord": "萌娘"
    },
    "2247": {
        "id": 2247,
        "shieldWord": "共青团"
    },
    "2248": {
        "id": 2248,
        "shieldWord": "劫持"
    },
    "2249": {
        "id": 2249,
        "shieldWord": "绯闻"
    },
    "2250": {
        "id": 2250,
        "shieldWord": "出轨"
    },
    "2251": {
        "id": 2251,
        "shieldWord": "嫩模"
    },
    "2252": {
        "id": 2252,
        "shieldWord": "未婚同居"
    },
    "2253": {
        "id": 2253,
        "shieldWord": "辱骂"
    },
    "2254": {
        "id": 2254,
        "shieldWord": "250"
    },
    "2255": {
        "id": 2255,
        "shieldWord": "二百五"
    },
    "2256": {
        "id": 2256,
        "shieldWord": "性侵"
    },
    "2257": {
        "id": 2257,
        "shieldWord": "回民是猪"
    },
    "2258": {
        "id": 2258,
        "shieldWord": "黑木耳"
    },
    "2259": {
        "id": 2259,
        "shieldWord": "坑爹"
    },
    "2260": {
        "id": 2260,
        "shieldWord": "东方闪电"
    },
    "2261": {
        "id": 2261,
        "shieldWord": "全能教"
    },
    "2262": {
        "id": 2262,
        "shieldWord": "七灵派"
    },
    "2263": {
        "id": 2263,
        "shieldWord": "女基督派"
    },
    "2264": {
        "id": 2264,
        "shieldWord": "实际神"
    },
    "2265": {
        "id": 2265,
        "shieldWord": "呼喊派"
    },
    "2266": {
        "id": 2266,
        "shieldWord": "喊派"
    },
    "2267": {
        "id": 2267,
        "shieldWord": "常受教"
    },
    "2268": {
        "id": 2268,
        "shieldWord": "被立王"
    },
    "2269": {
        "id": 2269,
        "shieldWord": "常受教"
    },
    "2270": {
        "id": 2270,
        "shieldWord": "观音法门"
    },
    "2271": {
        "id": 2271,
        "shieldWord": "石牌教会"
    },
    "2272": {
        "id": 2272,
        "shieldWord": "门徒会"
    },
    "2273": {
        "id": 2273,
        "shieldWord": "全范围教会"
    },
    "2274": {
        "id": 2274,
        "shieldWord": "三班仆人派"
    },
    "2275": {
        "id": 2275,
        "shieldWord": "灵灵教"
    },
    "2276": {
        "id": 2276,
        "shieldWord": "你奶奶"
    },
    "2277": {
        "id": 2277,
        "shieldWord": "回民都是猪"
    },
    "2278": {
        "id": 2278,
        "shieldWord": "二货"
    },
    "2279": {
        "id": 2279,
        "shieldWord": "红5"
    },
    "2280": {
        "id": 2280,
        "shieldWord": "致幻剂"
    },
    "2281": {
        "id": 2281,
        "shieldWord": "站街女"
    },
    "2282": {
        "id": 2282,
        "shieldWord": "游戏相关屏蔽"
    },
    "2283": {
        "id": 2283,
        "shieldWord": "ADMIN"
    },
    "2284": {
        "id": 2284,
        "shieldWord": "xtl"
    },
    "2285": {
        "id": 2285,
        "shieldWord": "system"
    },
    "2286": {
        "id": 2286,
        "shieldWord": "Administrator"
    },
    "2287": {
        "id": 2287,
        "shieldWord": "管理"
    },
    "2288": {
        "id": 2288,
        "shieldWord": "管里"
    },
    "2289": {
        "id": 2289,
        "shieldWord": "管理员"
    },
    "2290": {
        "id": 2290,
        "shieldWord": "服务管理"
    },
    "2291": {
        "id": 2291,
        "shieldWord": "服务器"
    },
    "2292": {
        "id": 2292,
        "shieldWord": "活动管理员"
    },
    "2293": {
        "id": 2293,
        "shieldWord": "冬季热"
    },
    "2294": {
        "id": 2294,
        "shieldWord": "官方"
    },
    "2295": {
        "id": 2295,
        "shieldWord": "维护"
    },
    "2296": {
        "id": 2296,
        "shieldWord": "系统"
    },
    "2297": {
        "id": 2297,
        "shieldWord": "系统公告"
    },
    "2298": {
        "id": 2298,
        "shieldWord": "审查"
    },
    "2299": {
        "id": 2299,
        "shieldWord": "巡查"
    },
    "2300": {
        "id": 2300,
        "shieldWord": "监督"
    },
    "2301": {
        "id": 2301,
        "shieldWord": "监管"
    },
    "2302": {
        "id": 2302,
        "shieldWord": "game"
    },
    "2303": {
        "id": 2303,
        "shieldWord": "master"
    },
    "2304": {
        "id": 2304,
        "shieldWord": "GAMEMASTER"
    },
    "2305": {
        "id": 2305,
        "shieldWord": "GM"
    },
    "2306": {
        "id": 2306,
        "shieldWord": "游戏管理员"
    },
    "2307": {
        "id": 2307,
        "shieldWord": "Client"
    },
    "2308": {
        "id": 2308,
        "shieldWord": "Server"
    },
    "2309": {
        "id": 2309,
        "shieldWord": "CS"
    },
    "2310": {
        "id": 2310,
        "shieldWord": "KEFU"
    },
    "2311": {
        "id": 2311,
        "shieldWord": "助理"
    },
    "2312": {
        "id": 2312,
        "shieldWord": "客户服务"
    },
    "2313": {
        "id": 2313,
        "shieldWord": "客服"
    },
    "2314": {
        "id": 2314,
        "shieldWord": "服务天使"
    },
    "2315": {
        "id": 2315,
        "shieldWord": "TEsT"
    },
    "2316": {
        "id": 2316,
        "shieldWord": "测试"
    },
    "2317": {
        "id": 2317,
        "shieldWord": "辅助程序"
    },
    "2318": {
        "id": 2318,
        "shieldWord": "运营"
    },
    "2319": {
        "id": 2319,
        "shieldWord": "运营者"
    },
    "2320": {
        "id": 2320,
        "shieldWord": "运营组"
    },
    "2321": {
        "id": 2321,
        "shieldWord": "运营商"
    },
    "2322": {
        "id": 2322,
        "shieldWord": "运营长"
    },
    "2323": {
        "id": 2323,
        "shieldWord": "运营官"
    },
    "2324": {
        "id": 2324,
        "shieldWord": "运营人"
    },
    "2325": {
        "id": 2325,
        "shieldWord": "蔡文胜"
    },
    "2326": {
        "id": 2326,
        "shieldWord": "李兴平"
    },
    "2327": {
        "id": 2327,
        "shieldWord": "汪东风"
    },
    "2328": {
        "id": 2328,
        "shieldWord": "骆海坚"
    },
    "2329": {
        "id": 2329,
        "shieldWord": "曹政"
    },
    "2330": {
        "id": 2330,
        "shieldWord": "sf"
    },
    "2331": {
        "id": 2331,
        "shieldWord": "私服"
    },
    "2332": {
        "id": 2332,
        "shieldWord": "私人服务器"
    },
    "2333": {
        "id": 2333,
        "shieldWord": "wg"
    },
    "2334": {
        "id": 2334,
        "shieldWord": "外挂"
    },
    "2335": {
        "id": 2335,
        "shieldWord": "&"
    },
    "2336": {
        "id": 2336,
        "shieldWord": "生僻字"
    },
    "2337": {
        "id": 2337,
        "shieldWord": "火星文"
    },
    "2338": {
        "id": 2338,
        "shieldWord": "ㄅ"
    },
    "2339": {
        "id": 2339,
        "shieldWord": "ㄆ"
    },
    "2340": {
        "id": 2340,
        "shieldWord": "ㄇ"
    },
    "2341": {
        "id": 2341,
        "shieldWord": "ㄈ"
    },
    "2342": {
        "id": 2342,
        "shieldWord": "ㄉ"
    },
    "2343": {
        "id": 2343,
        "shieldWord": "ㄊ"
    },
    "2344": {
        "id": 2344,
        "shieldWord": "ㄋ"
    },
    "2345": {
        "id": 2345,
        "shieldWord": "ㄌ"
    },
    "2346": {
        "id": 2346,
        "shieldWord": "ㄍ"
    },
    "2347": {
        "id": 2347,
        "shieldWord": "ㄎ"
    },
    "2348": {
        "id": 2348,
        "shieldWord": "ㄏ"
    },
    "2349": {
        "id": 2349,
        "shieldWord": "ㄐ"
    },
    "2350": {
        "id": 2350,
        "shieldWord": "ㄑ"
    },
    "2351": {
        "id": 2351,
        "shieldWord": "ㄒ"
    },
    "2352": {
        "id": 2352,
        "shieldWord": "ㄓ"
    },
    "2353": {
        "id": 2353,
        "shieldWord": "ㄔ"
    },
    "2354": {
        "id": 2354,
        "shieldWord": "ㄕ"
    },
    "2355": {
        "id": 2355,
        "shieldWord": "ㄖ"
    },
    "2356": {
        "id": 2356,
        "shieldWord": "ㄗ"
    },
    "2357": {
        "id": 2357,
        "shieldWord": "ㄘ"
    },
    "2358": {
        "id": 2358,
        "shieldWord": "ㄙ"
    },
    "2359": {
        "id": 2359,
        "shieldWord": "ㄚ"
    },
    "2360": {
        "id": 2360,
        "shieldWord": "ㄛ"
    },
    "2361": {
        "id": 2361,
        "shieldWord": "ㄜ"
    },
    "2362": {
        "id": 2362,
        "shieldWord": "ㄝ"
    },
    "2363": {
        "id": 2363,
        "shieldWord": "ㄞ"
    },
    "2364": {
        "id": 2364,
        "shieldWord": "ㄟ"
    },
    "2365": {
        "id": 2365,
        "shieldWord": "ㄠ"
    },
    "2366": {
        "id": 2366,
        "shieldWord": "ㄡ"
    },
    "2367": {
        "id": 2367,
        "shieldWord": "ㄢ"
    },
    "2368": {
        "id": 2368,
        "shieldWord": "ㄣ"
    },
    "2369": {
        "id": 2369,
        "shieldWord": "ㄤ"
    },
    "2370": {
        "id": 2370,
        "shieldWord": "ㄥ"
    },
    "2371": {
        "id": 2371,
        "shieldWord": "ㄦ"
    },
    "2372": {
        "id": 2372,
        "shieldWord": "ㄧ"
    },
    "2373": {
        "id": 2373,
        "shieldWord": "ㄨ"
    },
    "2374": {
        "id": 2374,
        "shieldWord": "ㄩ"
    },
    "2375": {
        "id": 2375,
        "shieldWord": "鞴"
    },
    "2376": {
        "id": 2376,
        "shieldWord": "鐾"
    },
    "2377": {
        "id": 2377,
        "shieldWord": "瘭"
    },
    "2378": {
        "id": 2378,
        "shieldWord": "镳"
    },
    "2379": {
        "id": 2379,
        "shieldWord": "黪"
    },
    "2380": {
        "id": 2380,
        "shieldWord": "瘥"
    },
    "2381": {
        "id": 2381,
        "shieldWord": "觇"
    },
    "2382": {
        "id": 2382,
        "shieldWord": "孱"
    },
    "2383": {
        "id": 2383,
        "shieldWord": "廛"
    },
    "2384": {
        "id": 2384,
        "shieldWord": "蒇"
    },
    "2385": {
        "id": 2385,
        "shieldWord": "冁"
    },
    "2386": {
        "id": 2386,
        "shieldWord": "羼"
    },
    "2387": {
        "id": 2387,
        "shieldWord": "螭"
    },
    "2388": {
        "id": 2388,
        "shieldWord": "傺"
    },
    "2389": {
        "id": 2389,
        "shieldWord": "瘛"
    },
    "2390": {
        "id": 2390,
        "shieldWord": "舂"
    },
    "2391": {
        "id": 2391,
        "shieldWord": "艟"
    },
    "2392": {
        "id": 2392,
        "shieldWord": "瘳"
    },
    "2393": {
        "id": 2393,
        "shieldWord": "雠"
    },
    "2394": {
        "id": 2394,
        "shieldWord": "搋"
    },
    "2395": {
        "id": 2395,
        "shieldWord": "嘬"
    },
    "2396": {
        "id": 2396,
        "shieldWord": "辏"
    },
    "2397": {
        "id": 2397,
        "shieldWord": "殂"
    },
    "2398": {
        "id": 2398,
        "shieldWord": "汆"
    },
    "2399": {
        "id": 2399,
        "shieldWord": "爨"
    },
    "2400": {
        "id": 2400,
        "shieldWord": "榱"
    },
    "2401": {
        "id": 2401,
        "shieldWord": "毳"
    },
    "2402": {
        "id": 2402,
        "shieldWord": "皴"
    },
    "2403": {
        "id": 2403,
        "shieldWord": "蹉"
    },
    "2404": {
        "id": 2404,
        "shieldWord": "鹾"
    },
    "2405": {
        "id": 2405,
        "shieldWord": "纛"
    },
    "2406": {
        "id": 2406,
        "shieldWord": "髑屙民"
    },
    "2407": {
        "id": 2407,
        "shieldWord": "莪"
    },
    "2408": {
        "id": 2408,
        "shieldWord": "苊"
    },
    "2409": {
        "id": 2409,
        "shieldWord": "鲕"
    },
    "2410": {
        "id": 2410,
        "shieldWord": "鲼"
    },
    "2411": {
        "id": 2411,
        "shieldWord": "瀵"
    },
    "2412": {
        "id": 2412,
        "shieldWord": "酆"
    },
    "2413": {
        "id": 2413,
        "shieldWord": "幞"
    },
    "2414": {
        "id": 2414,
        "shieldWord": "黻"
    },
    "2415": {
        "id": 2415,
        "shieldWord": "呒"
    },
    "2416": {
        "id": 2416,
        "shieldWord": "黼"
    },
    "2417": {
        "id": 2417,
        "shieldWord": "阝"
    },
    "2418": {
        "id": 2418,
        "shieldWord": "彀"
    },
    "2419": {
        "id": 2419,
        "shieldWord": "觏"
    },
    "2420": {
        "id": 2420,
        "shieldWord": "毂"
    },
    "2421": {
        "id": 2421,
        "shieldWord": "汩"
    },
    "2422": {
        "id": 2422,
        "shieldWord": "罟"
    },
    "2423": {
        "id": 2423,
        "shieldWord": "嘏"
    },
    "2424": {
        "id": 2424,
        "shieldWord": "鲴"
    },
    "2425": {
        "id": 2425,
        "shieldWord": "宄"
    },
    "2426": {
        "id": 2426,
        "shieldWord": "庋"
    },
    "2427": {
        "id": 2427,
        "shieldWord": "刿"
    },
    "2428": {
        "id": 2428,
        "shieldWord": "虢"
    },
    "2429": {
        "id": 2429,
        "shieldWord": "馘"
    },
    "2430": {
        "id": 2430,
        "shieldWord": "撖"
    },
    "2431": {
        "id": 2431,
        "shieldWord": "夯"
    },
    "2432": {
        "id": 2432,
        "shieldWord": "薅"
    },
    "2433": {
        "id": 2433,
        "shieldWord": "曷"
    },
    "2434": {
        "id": 2434,
        "shieldWord": "翮"
    },
    "2435": {
        "id": 2435,
        "shieldWord": "觳"
    },
    "2436": {
        "id": 2436,
        "shieldWord": "冱"
    },
    "2437": {
        "id": 2437,
        "shieldWord": "怙"
    },
    "2438": {
        "id": 2438,
        "shieldWord": "戽"
    },
    "2439": {
        "id": 2439,
        "shieldWord": "祜"
    },
    "2440": {
        "id": 2440,
        "shieldWord": "瓠"
    },
    "2441": {
        "id": 2441,
        "shieldWord": "鹱"
    },
    "2442": {
        "id": 2442,
        "shieldWord": "溷"
    },
    "2443": {
        "id": 2443,
        "shieldWord": "耠"
    },
    "2444": {
        "id": 2444,
        "shieldWord": "锪"
    },
    "2445": {
        "id": 2445,
        "shieldWord": "劐"
    },
    "2446": {
        "id": 2446,
        "shieldWord": "蠖"
    },
    "2447": {
        "id": 2447,
        "shieldWord": "丌"
    },
    "2448": {
        "id": 2448,
        "shieldWord": "乩"
    },
    "2449": {
        "id": 2449,
        "shieldWord": "赍"
    },
    "2450": {
        "id": 2450,
        "shieldWord": "殛"
    },
    "2451": {
        "id": 2451,
        "shieldWord": "蕺"
    },
    "2452": {
        "id": 2452,
        "shieldWord": "掎"
    },
    "2453": {
        "id": 2453,
        "shieldWord": "彐"
    },
    "2454": {
        "id": 2454,
        "shieldWord": "芰"
    },
    "2455": {
        "id": 2455,
        "shieldWord": "跽"
    },
    "2456": {
        "id": 2456,
        "shieldWord": "鲚"
    },
    "2457": {
        "id": 2457,
        "shieldWord": "葭"
    },
    "2458": {
        "id": 2458,
        "shieldWord": "恝"
    },
    "2459": {
        "id": 2459,
        "shieldWord": "湔"
    },
    "2460": {
        "id": 2460,
        "shieldWord": "搛"
    },
    "2461": {
        "id": 2461,
        "shieldWord": "鲣"
    },
    "2462": {
        "id": 2462,
        "shieldWord": "鞯"
    },
    "2463": {
        "id": 2463,
        "shieldWord": "囝"
    },
    "2464": {
        "id": 2464,
        "shieldWord": "趼"
    },
    "2465": {
        "id": 2465,
        "shieldWord": "醮"
    },
    "2466": {
        "id": 2466,
        "shieldWord": "疖"
    },
    "2467": {
        "id": 2467,
        "shieldWord": "苣"
    },
    "2468": {
        "id": 2468,
        "shieldWord": "屦"
    },
    "2469": {
        "id": 2469,
        "shieldWord": "醵"
    },
    "2470": {
        "id": 2470,
        "shieldWord": "蠲"
    },
    "2471": {
        "id": 2471,
        "shieldWord": "桊"
    },
    "2472": {
        "id": 2472,
        "shieldWord": "鄄"
    },
    "2473": {
        "id": 2473,
        "shieldWord": "谲"
    },
    "2474": {
        "id": 2474,
        "shieldWord": "爝"
    },
    "2475": {
        "id": 2475,
        "shieldWord": "麇"
    },
    "2476": {
        "id": 2476,
        "shieldWord": "贶"
    },
    "2477": {
        "id": 2477,
        "shieldWord": "悝"
    },
    "2478": {
        "id": 2478,
        "shieldWord": "喟"
    },
    "2479": {
        "id": 2479,
        "shieldWord": "仂"
    },
    "2480": {
        "id": 2480,
        "shieldWord": "泐"
    },
    "2481": {
        "id": 2481,
        "shieldWord": "鳓"
    },
    "2482": {
        "id": 2482,
        "shieldWord": "诔"
    },
    "2483": {
        "id": 2483,
        "shieldWord": "酹"
    },
    "2484": {
        "id": 2484,
        "shieldWord": "嫠"
    },
    "2485": {
        "id": 2485,
        "shieldWord": "黧"
    },
    "2486": {
        "id": 2486,
        "shieldWord": "蠡"
    },
    "2487": {
        "id": 2487,
        "shieldWord": "醴"
    },
    "2488": {
        "id": 2488,
        "shieldWord": "鳢"
    },
    "2489": {
        "id": 2489,
        "shieldWord": "轹"
    },
    "2490": {
        "id": 2490,
        "shieldWord": "詈"
    },
    "2491": {
        "id": 2491,
        "shieldWord": "跞"
    },
    "2492": {
        "id": 2492,
        "shieldWord": "奁"
    },
    "2493": {
        "id": 2493,
        "shieldWord": "臁"
    },
    "2494": {
        "id": 2494,
        "shieldWord": "蚍"
    },
    "2495": {
        "id": 2495,
        "shieldWord": "埤"
    },
    "2496": {
        "id": 2496,
        "shieldWord": "罴"
    },
    "2497": {
        "id": 2497,
        "shieldWord": "鼙"
    },
    "2498": {
        "id": 2498,
        "shieldWord": "庀"
    },
    "2499": {
        "id": 2499,
        "shieldWord": "仳"
    },
    "2500": {
        "id": 2500,
        "shieldWord": "圮綦"
    },
    "2501": {
        "id": 2501,
        "shieldWord": "屺"
    },
    "2502": {
        "id": 2502,
        "shieldWord": "綮"
    },
    "2503": {
        "id": 2503,
        "shieldWord": "汔"
    },
    "2504": {
        "id": 2504,
        "shieldWord": "碛"
    },
    "2505": {
        "id": 2505,
        "shieldWord": "葜"
    },
    "2506": {
        "id": 2506,
        "shieldWord": "佥"
    },
    "2507": {
        "id": 2507,
        "shieldWord": "岍"
    },
    "2508": {
        "id": 2508,
        "shieldWord": "愆"
    },
    "2509": {
        "id": 2509,
        "shieldWord": "搴"
    },
    "2510": {
        "id": 2510,
        "shieldWord": "钤"
    },
    "2511": {
        "id": 2511,
        "shieldWord": "掮"
    },
    "2512": {
        "id": 2512,
        "shieldWord": "凵"
    },
    "2513": {
        "id": 2513,
        "shieldWord": "肷"
    },
    "2514": {
        "id": 2514,
        "shieldWord": "椠"
    },
    "2515": {
        "id": 2515,
        "shieldWord": "戕"
    },
    "2516": {
        "id": 2516,
        "shieldWord": "锖"
    },
    "2517": {
        "id": 2517,
        "shieldWord": "檠"
    },
    "2518": {
        "id": 2518,
        "shieldWord": "苘"
    },
    "2519": {
        "id": 2519,
        "shieldWord": "謦"
    },
    "2520": {
        "id": 2520,
        "shieldWord": "庆红"
    },
    "2521": {
        "id": 2521,
        "shieldWord": "跫"
    },
    "2522": {
        "id": 2522,
        "shieldWord": "銎"
    },
    "2523": {
        "id": 2523,
        "shieldWord": "邛"
    },
    "2524": {
        "id": 2524,
        "shieldWord": "筇"
    },
    "2525": {
        "id": 2525,
        "shieldWord": "蛩鼽"
    },
    "2526": {
        "id": 2526,
        "shieldWord": "诎"
    },
    "2527": {
        "id": 2527,
        "shieldWord": "曲"
    },
    "2528": {
        "id": 2528,
        "shieldWord": "黢"
    },
    "2529": {
        "id": 2529,
        "shieldWord": "劬"
    },
    "2530": {
        "id": 2530,
        "shieldWord": "朐"
    },
    "2531": {
        "id": 2531,
        "shieldWord": "璩"
    },
    "2532": {
        "id": 2532,
        "shieldWord": "蘧"
    },
    "2533": {
        "id": 2533,
        "shieldWord": "衢"
    },
    "2534": {
        "id": 2534,
        "shieldWord": "蠼毵"
    },
    "2535": {
        "id": 2535,
        "shieldWord": "糁"
    },
    "2536": {
        "id": 2536,
        "shieldWord": "其他屏蔽词"
    },
    "2537": {
        "id": 2537,
        "shieldWord": "扫黄打非"
    },
    "2538": {
        "id": 2538,
        "shieldWord": "ISIS"
    },
    "2539": {
        "id": 2539,
        "shieldWord": "真主"
    },
    "2540": {
        "id": 2540,
        "shieldWord": "购买枪支"
    },
    "2541": {
        "id": 2541,
        "shieldWord": "卖防身武器"
    },
    "2542": {
        "id": 2542,
        "shieldWord": "cnm"
    },
    "2543": {
        "id": 2543,
        "shieldWord": "suck"
    },
    "2544": {
        "id": 2544,
        "shieldWord": "灵灵派"
    },
    "2545": {
        "id": 2545,
        "shieldWord": "尖阁列岛"
    },
    "2546": {
        "id": 2546,
        "shieldWord": "臭秃尼"
    },
    "2547": {
        "id": 2547,
        "shieldWord": "同城约炮"
    },
    "2548": {
        "id": 2548,
        "shieldWord": "高潮"
    },
    "2549": {
        "id": 2549,
        "shieldWord": "日本狗"
    },
    "2550": {
        "id": 2550,
        "shieldWord": "安拉"
    },
    "2551": {
        "id": 2551,
        "shieldWord": "释迦摩尼"
    },
    "2552": {
        "id": 2552,
        "shieldWord": "售枪"
    },
    "2553": {
        "id": 2553,
        "shieldWord": "炸药"
    },
    "2554": {
        "id": 2554,
        "shieldWord": "麻黄碱"
    },
    "2555": {
        "id": 2555,
        "shieldWord": "k粉"
    },
    "2556": {
        "id": 2556,
        "shieldWord": "上海帮"
    },
    "2557": {
        "id": 2557,
        "shieldWord": "A片"
    },
    "2558": {
        "id": 2558,
        "shieldWord": "a片"
    },
    "2559": {
        "id": 2559,
        "shieldWord": "狗男女"
    },
    "2560": {
        "id": 2560,
        "shieldWord": "卖枪"
    },
    "2561": {
        "id": 2561,
        "shieldWord": "秃驴"
    },
    "2562": {
        "id": 2562,
        "shieldWord": "制毒"
    },
    "2563": {
        "id": 2563,
        "shieldWord": "烎"
    },
    "2564": {
        "id": 2564,
        "shieldWord": "囧"
    },
    "2565": {
        "id": 2565,
        "shieldWord": "槑"
    },
    "2566": {
        "id": 2566,
        "shieldWord": "玊"
    },
    "2567": {
        "id": 2567,
        "shieldWord": "奣"
    },
    "2568": {
        "id": 2568,
        "shieldWord": "嘦"
    },
    "2569": {
        "id": 2569,
        "shieldWord": "勥"
    },
    "2570": {
        "id": 2570,
        "shieldWord": "巭"
    },
    "2571": {
        "id": 2571,
        "shieldWord": "嫑"
    },
    "2572": {
        "id": 2572,
        "shieldWord": "恏"
    },
    "2573": {
        "id": 2573,
        "shieldWord": "兲"
    },
    "2574": {
        "id": 2574,
        "shieldWord": "氼"
    },
    "2575": {
        "id": 2575,
        "shieldWord": "忈"
    },
    "2576": {
        "id": 2576,
        "shieldWord": "炛"
    },
    "2577": {
        "id": 2577,
        "shieldWord": "偷窥"
    },
    "2578": {
        "id": 2578,
        "shieldWord": "碡"
    },
    "2579": {
        "id": 2579,
        "shieldWord": "籀"
    },
    "2580": {
        "id": 2580,
        "shieldWord": "朱骏"
    },
    "2581": {
        "id": 2581,
        "shieldWord": "朱狨基"
    },
    "2582": {
        "id": 2582,
        "shieldWord": "朱容基"
    },
    "2583": {
        "id": 2583,
        "shieldWord": "朱溶剂"
    },
    "2584": {
        "id": 2584,
        "shieldWord": "朱熔基"
    },
    "2585": {
        "id": 2585,
        "shieldWord": "邾"
    },
    "2586": {
        "id": 2586,
        "shieldWord": "猪聋畸"
    },
    "2587": {
        "id": 2587,
        "shieldWord": "猪毛1"
    },
    "2588": {
        "id": 2588,
        "shieldWord": "舳"
    },
    "2589": {
        "id": 2589,
        "shieldWord": "瘃"
    },
    "2590": {
        "id": 2590,
        "shieldWord": "躅"
    },
    "2591": {
        "id": 2591,
        "shieldWord": "翥"
    },
    "2592": {
        "id": 2592,
        "shieldWord": "颛"
    },
    "2593": {
        "id": 2593,
        "shieldWord": "丬"
    },
    "2594": {
        "id": 2594,
        "shieldWord": "隹"
    },
    "2595": {
        "id": 2595,
        "shieldWord": "窀"
    },
    "2596": {
        "id": 2596,
        "shieldWord": "卓伯源"
    },
    "2597": {
        "id": 2597,
        "shieldWord": "倬"
    },
    "2598": {
        "id": 2598,
        "shieldWord": "斫"
    },
    "2599": {
        "id": 2599,
        "shieldWord": "诼"
    },
    "2600": {
        "id": 2600,
        "shieldWord": "髭"
    },
    "2601": {
        "id": 2601,
        "shieldWord": "鲻"
    },
    "2602": {
        "id": 2602,
        "shieldWord": "秭"
    },
    "2603": {
        "id": 2603,
        "shieldWord": "訾"
    },
    "2604": {
        "id": 2604,
        "shieldWord": "自民党"
    },
    "2605": {
        "id": 2605,
        "shieldWord": "自已的故事"
    },
    "2606": {
        "id": 2606,
        "shieldWord": "自由民主论坛"
    },
    "2607": {
        "id": 2607,
        "shieldWord": "总理"
    },
    "2608": {
        "id": 2608,
        "shieldWord": "偬"
    },
    "2609": {
        "id": 2609,
        "shieldWord": "诹"
    },
    "2610": {
        "id": 2610,
        "shieldWord": "陬"
    },
    "2611": {
        "id": 2611,
        "shieldWord": "鄹"
    },
    "2612": {
        "id": 2612,
        "shieldWord": "鲰"
    },
    "2613": {
        "id": 2613,
        "shieldWord": "躜"
    },
    "2614": {
        "id": 2614,
        "shieldWord": "缵"
    },
    "2615": {
        "id": 2615,
        "shieldWord": "作秀"
    },
    "2616": {
        "id": 2616,
        "shieldWord": "阼"
    },
    "2617": {
        "id": 2617,
        "shieldWord": "祚"
    },
    "2618": {
        "id": 2618,
        "shieldWord": "阿莱娜"
    },
    "2619": {
        "id": 2619,
        "shieldWord": "啊无卵"
    },
    "2620": {
        "id": 2620,
        "shieldWord": "埃里克苏特勤"
    },
    "2621": {
        "id": 2621,
        "shieldWord": "埃斯万"
    },
    "2622": {
        "id": 2622,
        "shieldWord": "艾丽丝"
    },
    "2623": {
        "id": 2623,
        "shieldWord": "爱滋"
    },
    "2624": {
        "id": 2624,
        "shieldWord": "埯"
    },
    "2625": {
        "id": 2625,
        "shieldWord": "暗黑法师"
    },
    "2626": {
        "id": 2626,
        "shieldWord": "岙"
    },
    "2627": {
        "id": 2627,
        "shieldWord": "奥克拉"
    },
    "2628": {
        "id": 2628,
        "shieldWord": "奥拉德"
    },
    "2629": {
        "id": 2629,
        "shieldWord": "奥利弗"
    },
    "2630": {
        "id": 2630,
        "shieldWord": "奥鲁奇"
    },
    "2631": {
        "id": 2631,
        "shieldWord": "奥伦"
    },
    "2632": {
        "id": 2632,
        "shieldWord": "奥特兰"
    },
    "2633": {
        "id": 2633,
        "shieldWord": "㈧"
    },
    "2634": {
        "id": 2634,
        "shieldWord": "巴伦侍从"
    },
    "2635": {
        "id": 2635,
        "shieldWord": "巴伦坦"
    },
    "2636": {
        "id": 2636,
        "shieldWord": "白立朴"
    },
    "2637": {
        "id": 2637,
        "shieldWord": "白梦"
    },
    "2638": {
        "id": 2638,
        "shieldWord": "白皮书"
    },
    "2639": {
        "id": 2639,
        "shieldWord": "宝石商人"
    },
    "2640": {
        "id": 2640,
        "shieldWord": "保钓"
    },
    "2641": {
        "id": 2641,
        "shieldWord": "鲍戈"
    },
    "2642": {
        "id": 2642,
        "shieldWord": "鲍彤"
    },
    "2643": {
        "id": 2643,
        "shieldWord": "鲍伊"
    },
    "2644": {
        "id": 2644,
        "shieldWord": "暴风亡灵"
    },
    "2645": {
        "id": 2645,
        "shieldWord": "暴乱"
    },
    "2646": {
        "id": 2646,
        "shieldWord": "暴热的战士"
    },
    "2647": {
        "id": 2647,
        "shieldWord": "暴躁的城塔野兽"
    },
    "2648": {
        "id": 2648,
        "shieldWord": "暴躁的警卫兵灵魂"
    },
    "2649": {
        "id": 2649,
        "shieldWord": "暴躁的马杜克"
    },
    "2650": {
        "id": 2650,
        "shieldWord": "北大三角地论坛"
    },
    "2651": {
        "id": 2651,
        "shieldWord": "北韩"
    },
    "2652": {
        "id": 2652,
        "shieldWord": "北京当局"
    },
    "2653": {
        "id": 2653,
        "shieldWord": "北美自由论坛"
    },
    "2654": {
        "id": 2654,
        "shieldWord": "贝尤尔"
    },
    "2655": {
        "id": 2655,
        "shieldWord": "比样"
    },
    "2656": {
        "id": 2656,
        "shieldWord": "跸"
    },
    "2657": {
        "id": 2657,
        "shieldWord": "飑"
    },
    "2658": {
        "id": 2658,
        "shieldWord": "婊子养的"
    },
    "2659": {
        "id": 2659,
        "shieldWord": "宾周"
    },
    "2660": {
        "id": 2660,
        "shieldWord": "冰后"
    },
    "2661": {
        "id": 2661,
        "shieldWord": "博讯"
    },
    "2662": {
        "id": 2662,
        "shieldWord": "不灭帝王"
    },
    "2663": {
        "id": 2663,
        "shieldWord": "不爽不要钱"
    },
    "2664": {
        "id": 2664,
        "shieldWord": "蔡崇国"
    },
    "2665": {
        "id": 2665,
        "shieldWord": "蔡启芳"
    },
    "2666": {
        "id": 2666,
        "shieldWord": "操鶏"
    },
    "2667": {
        "id": 2667,
        "shieldWord": "操那吗B"
    },
    "2668": {
        "id": 2668,
        "shieldWord": "操那吗逼"
    },
    "2669": {
        "id": 2669,
        "shieldWord": "操那吗比"
    },
    "2670": {
        "id": 2670,
        "shieldWord": "操你爷爷"
    },
    "2671": {
        "id": 2671,
        "shieldWord": "曹长青"
    },
    "2672": {
        "id": 2672,
        "shieldWord": "草"
    },
    "2673": {
        "id": 2673,
        "shieldWord": "草你妈"
    },
    "2674": {
        "id": 2674,
        "shieldWord": "草拟妈"
    },
    "2675": {
        "id": 2675,
        "shieldWord": "册那娘饿比"
    },
    "2676": {
        "id": 2676,
        "shieldWord": "插那吗B"
    },
    "2677": {
        "id": 2677,
        "shieldWord": "插那吗逼"
    },
    "2678": {
        "id": 2678,
        "shieldWord": "插那吗比"
    },
    "2679": {
        "id": 2679,
        "shieldWord": "插你妈"
    },
    "2680": {
        "id": 2680,
        "shieldWord": "插你爷爷"
    },
    "2681": {
        "id": 2681,
        "shieldWord": "阊"
    },
    "2682": {
        "id": 2682,
        "shieldWord": "长官沙塔特"
    },
    "2683": {
        "id": 2683,
        "shieldWord": "常劲"
    },
    "2684": {
        "id": 2684,
        "shieldWord": "朝鲜"
    },
    "2685": {
        "id": 2685,
        "shieldWord": "车仑"
    },
    "2686": {
        "id": 2686,
        "shieldWord": "车仑女干"
    },
    "2687": {
        "id": 2687,
        "shieldWord": "沉睡图腾"
    },
    "2688": {
        "id": 2688,
        "shieldWord": "陈炳基"
    },
    "2689": {
        "id": 2689,
        "shieldWord": "陈博志"
    },
    "2690": {
        "id": 2690,
        "shieldWord": "陈定南"
    },
    "2691": {
        "id": 2691,
        "shieldWord": "陈建铭"
    },
    "2692": {
        "id": 2692,
        "shieldWord": "陈景俊"
    },
    "2693": {
        "id": 2693,
        "shieldWord": "陈菊"
    },
    "2694": {
        "id": 2694,
        "shieldWord": "陈军"
    },
    "2695": {
        "id": 2695,
        "shieldWord": "陈蒙"
    },
    "2696": {
        "id": 2696,
        "shieldWord": "陈破空"
    },
    "2697": {
        "id": 2697,
        "shieldWord": "陈水扁"
    },
    "2698": {
        "id": 2698,
        "shieldWord": "陈唐山"
    },
    "2699": {
        "id": 2699,
        "shieldWord": "陈希同"
    },
    "2700": {
        "id": 2700,
        "shieldWord": "陈小同"
    },
    "2701": {
        "id": 2701,
        "shieldWord": "陈宣良"
    },
    "2702": {
        "id": 2702,
        "shieldWord": "陈学圣"
    },
    "2703": {
        "id": 2703,
        "shieldWord": "陈一咨"
    },
    "2704": {
        "id": 2704,
        "shieldWord": "陈总统"
    },
    "2705": {
        "id": 2705,
        "shieldWord": "谌"
    },
    "2706": {
        "id": 2706,
        "shieldWord": "龀"
    },
    "2707": {
        "id": 2707,
        "shieldWord": "榇"
    },
    "2708": {
        "id": 2708,
        "shieldWord": "谶"
    },
    "2709": {
        "id": 2709,
        "shieldWord": "程凯"
    },
    "2710": {
        "id": 2710,
        "shieldWord": "程铁军"
    },
    "2711": {
        "id": 2711,
        "shieldWord": "鸱"
    },
    "2712": {
        "id": 2712,
        "shieldWord": "痴鸠"
    },
    "2713": {
        "id": 2713,
        "shieldWord": "痴拈"
    },
    "2714": {
        "id": 2714,
        "shieldWord": "迟钝的图腾"
    },
    "2715": {
        "id": 2715,
        "shieldWord": "持不同政见"
    },
    "2716": {
        "id": 2716,
        "shieldWord": "赤色骑士"
    },
    "2717": {
        "id": 2717,
        "shieldWord": "赤色战士"
    },
    "2718": {
        "id": 2718,
        "shieldWord": "处女膜"
    },
    "2719": {
        "id": 2719,
        "shieldWord": "传染性病"
    },
    "2720": {
        "id": 2720,
        "shieldWord": "吹箫"
    },
    "2721": {
        "id": 2721,
        "shieldWord": "春夏自由论坛"
    },
    "2722": {
        "id": 2722,
        "shieldWord": "戳那吗B"
    },
    "2723": {
        "id": 2723,
        "shieldWord": "戳那吗逼"
    },
    "2724": {
        "id": 2724,
        "shieldWord": "戳那吗比"
    },
    "2725": {
        "id": 2725,
        "shieldWord": "错B"
    },
    "2726": {
        "id": 2726,
        "shieldWord": "错逼"
    },
    "2727": {
        "id": 2727,
        "shieldWord": "错比"
    },
    "2728": {
        "id": 2728,
        "shieldWord": "错那吗B"
    },
    "2729": {
        "id": 2729,
        "shieldWord": "错那吗逼"
    },
    "2730": {
        "id": 2730,
        "shieldWord": "错那吗比"
    },
    "2731": {
        "id": 2731,
        "shieldWord": "达夫警卫兵"
    },
    "2732": {
        "id": 2732,
        "shieldWord": "达夫侍从"
    },
    "2733": {
        "id": 2733,
        "shieldWord": "达癞"
    },
    "2734": {
        "id": 2734,
        "shieldWord": "大东亚"
    },
    "2735": {
        "id": 2735,
        "shieldWord": "大东亚共荣"
    },
    "2736": {
        "id": 2736,
        "shieldWord": "大鶏巴"
    },
    "2737": {
        "id": 2737,
        "shieldWord": "大纪元"
    },
    "2738": {
        "id": 2738,
        "shieldWord": "大纪元新闻网"
    },
    "2739": {
        "id": 2739,
        "shieldWord": "大纪园"
    },
    "2740": {
        "id": 2740,
        "shieldWord": "大家论坛"
    },
    "2741": {
        "id": 2741,
        "shieldWord": "大奶妈"
    },
    "2742": {
        "id": 2742,
        "shieldWord": "大史记"
    },
    "2743": {
        "id": 2743,
        "shieldWord": "大史纪"
    },
    "2744": {
        "id": 2744,
        "shieldWord": "大中国论坛"
    },
    "2745": {
        "id": 2745,
        "shieldWord": "大中华论坛"
    },
    "2746": {
        "id": 2746,
        "shieldWord": "大众真人真事"
    },
    "2747": {
        "id": 2747,
        "shieldWord": "绐"
    },
    "2748": {
        "id": 2748,
        "shieldWord": "戴相龙"
    },
    "2749": {
        "id": 2749,
        "shieldWord": "弹劾"
    },
    "2750": {
        "id": 2750,
        "shieldWord": "凼"
    },
    "2751": {
        "id": 2751,
        "shieldWord": "导师"
    },
    "2752": {
        "id": 2752,
        "shieldWord": "盗窃犯"
    },
    "2753": {
        "id": 2753,
        "shieldWord": "德维尔"
    },
    "2754": {
        "id": 2754,
        "shieldWord": "登辉"
    },
    "2755": {
        "id": 2755,
        "shieldWord": "邓笑贫"
    },
    "2756": {
        "id": 2756,
        "shieldWord": "籴"
    },
    "2757": {
        "id": 2757,
        "shieldWord": "迪里夏提"
    },
    "2758": {
        "id": 2758,
        "shieldWord": "觌"
    },
    "2759": {
        "id": 2759,
        "shieldWord": "地下教会"
    },
    "2760": {
        "id": 2760,
        "shieldWord": "帝国主义"
    },
    "2761": {
        "id": 2761,
        "shieldWord": "电视流氓"
    },
    "2762": {
        "id": 2762,
        "shieldWord": "叼你妈"
    },
    "2763": {
        "id": 2763,
        "shieldWord": "钓鱼岛"
    },
    "2764": {
        "id": 2764,
        "shieldWord": "丁关根"
    },
    "2765": {
        "id": 2765,
        "shieldWord": "东北独立"
    },
    "2766": {
        "id": 2766,
        "shieldWord": "东部地下水路"
    },
    "2767": {
        "id": 2767,
        "shieldWord": "东方红时空"
    },
    "2768": {
        "id": 2768,
        "shieldWord": "东方时空"
    },
    "2769": {
        "id": 2769,
        "shieldWord": "东南西北论谈"
    },
    "2770": {
        "id": 2770,
        "shieldWord": "东社"
    },
    "2771": {
        "id": 2771,
        "shieldWord": "东升"
    },
    "2772": {
        "id": 2772,
        "shieldWord": "东条"
    },
    "2773": {
        "id": 2773,
        "shieldWord": "东突暴动"
    },
    "2774": {
        "id": 2774,
        "shieldWord": "东突独立"
    },
    "2775": {
        "id": 2775,
        "shieldWord": "东土耳其斯坦"
    },
    "2776": {
        "id": 2776,
        "shieldWord": "东西南北论坛"
    },
    "2777": {
        "id": 2777,
        "shieldWord": "东亚"
    },
    "2778": {
        "id": 2778,
        "shieldWord": "东院看守"
    },
    "2779": {
        "id": 2779,
        "shieldWord": "动乱"
    },
    "2780": {
        "id": 2780,
        "shieldWord": "斗士哈夫拉苏"
    },
    "2781": {
        "id": 2781,
        "shieldWord": "斗士霍克"
    },
    "2782": {
        "id": 2782,
        "shieldWord": "独裁"
    },
    "2783": {
        "id": 2783,
        "shieldWord": "独裁政治"
    },
    "2784": {
        "id": 2784,
        "shieldWord": "独夫"
    },
    "2785": {
        "id": 2785,
        "shieldWord": "独立台湾会"
    },
    "2786": {
        "id": 2786,
        "shieldWord": "俄国"
    },
    "2787": {
        "id": 2787,
        "shieldWord": "㈡"
    },
    "2788": {
        "id": 2788,
        "shieldWord": "发楞"
    },
    "2789": {
        "id": 2789,
        "shieldWord": "发抡"
    },
    "2790": {
        "id": 2790,
        "shieldWord": "发抡功"
    },
    "2791": {
        "id": 2791,
        "shieldWord": "发伦"
    },
    "2792": {
        "id": 2792,
        "shieldWord": "发伦功"
    },
    "2793": {
        "id": 2793,
        "shieldWord": "发轮"
    },
    "2794": {
        "id": 2794,
        "shieldWord": "发论"
    },
    "2795": {
        "id": 2795,
        "shieldWord": "发论公"
    },
    "2796": {
        "id": 2796,
        "shieldWord": "发论功"
    },
    "2797": {
        "id": 2797,
        "shieldWord": "发正念"
    },
    "2798": {
        "id": 2798,
        "shieldWord": "法~伦"
    },
    "2799": {
        "id": 2799,
        "shieldWord": "法~沦"
    },
    "2800": {
        "id": 2800,
        "shieldWord": "法~纶"
    },
    "2801": {
        "id": 2801,
        "shieldWord": "法~轮"
    },
    "2802": {
        "id": 2802,
        "shieldWord": "法~论"
    },
    "2803": {
        "id": 2803,
        "shieldWord": "法尔卡"
    },
    "2804": {
        "id": 2804,
        "shieldWord": "法抡"
    },
    "2805": {
        "id": 2805,
        "shieldWord": "法抡功"
    },
    "2806": {
        "id": 2806,
        "shieldWord": "法仑"
    },
    "2807": {
        "id": 2807,
        "shieldWord": "法沦"
    },
    "2808": {
        "id": 2808,
        "shieldWord": "法纶"
    },
    "2809": {
        "id": 2809,
        "shieldWord": "法十轮十功"
    },
    "2810": {
        "id": 2810,
        "shieldWord": "法谪"
    },
    "2811": {
        "id": 2811,
        "shieldWord": "法谪功"
    },
    "2812": {
        "id": 2812,
        "shieldWord": "反封锁"
    },
    "2813": {
        "id": 2813,
        "shieldWord": "反封锁技术"
    },
    "2814": {
        "id": 2814,
        "shieldWord": "反腐败论坛"
    },
    "2815": {
        "id": 2815,
        "shieldWord": "反人类"
    },
    "2816": {
        "id": 2816,
        "shieldWord": "反社会"
    },
    "2817": {
        "id": 2817,
        "shieldWord": "方励之"
    },
    "2818": {
        "id": 2818,
        "shieldWord": "防卫指挥官"
    },
    "2819": {
        "id": 2819,
        "shieldWord": "放荡"
    },
    "2820": {
        "id": 2820,
        "shieldWord": "飞扬论坛"
    },
    "2821": {
        "id": 2821,
        "shieldWord": "废墟守护者"
    },
    "2822": {
        "id": 2822,
        "shieldWord": "费鸿泰"
    },
    "2823": {
        "id": 2823,
        "shieldWord": "费良勇"
    },
    "2824": {
        "id": 2824,
        "shieldWord": "分队长施蒂文"
    },
    "2825": {
        "id": 2825,
        "shieldWord": "粉饰太平"
    },
    "2826": {
        "id": 2826,
        "shieldWord": "粪便"
    },
    "2827": {
        "id": 2827,
        "shieldWord": "丰饶的果实"
    },
    "2828": {
        "id": 2828,
        "shieldWord": "风雨神州"
    },
    "2829": {
        "id": 2829,
        "shieldWord": "风雨神州论坛"
    },
    "2830": {
        "id": 2830,
        "shieldWord": "封从德"
    },
    "2831": {
        "id": 2831,
        "shieldWord": "封杀"
    },
    "2832": {
        "id": 2832,
        "shieldWord": "封印的灵魂骑士"
    },
    "2833": {
        "id": 2833,
        "shieldWord": "冯东海"
    },
    "2834": {
        "id": 2834,
        "shieldWord": "冯素英"
    },
    "2835": {
        "id": 2835,
        "shieldWord": "绂"
    },
    "2836": {
        "id": 2836,
        "shieldWord": "呒"
    },
    "2837": {
        "id": 2837,
        "shieldWord": "傅作义"
    },
    "2838": {
        "id": 2838,
        "shieldWord": "干bi"
    },
    "2839": {
        "id": 2839,
        "shieldWord": "干逼"
    },
    "2840": {
        "id": 2840,
        "shieldWord": "干比"
    },
    "2841": {
        "id": 2841,
        "shieldWord": "干的你"
    },
    "2842": {
        "id": 2842,
        "shieldWord": "干干干"
    },
    "2843": {
        "id": 2843,
        "shieldWord": "干你老比"
    },
    "2844": {
        "id": 2844,
        "shieldWord": "干你老母"
    },
    "2845": {
        "id": 2845,
        "shieldWord": "干你娘"
    },
    "2846": {
        "id": 2846,
        "shieldWord": "干全家"
    },
    "2847": {
        "id": 2847,
        "shieldWord": "干一家"
    },
    "2848": {
        "id": 2848,
        "shieldWord": "赶你娘"
    },
    "2849": {
        "id": 2849,
        "shieldWord": "冈峦"
    },
    "2850": {
        "id": 2850,
        "shieldWord": "刚比"
    },
    "2851": {
        "id": 2851,
        "shieldWord": "刚比样子"
    },
    "2852": {
        "id": 2852,
        "shieldWord": "岗哨士兵"
    },
    "2853": {
        "id": 2853,
        "shieldWord": "肛门"
    },
    "2854": {
        "id": 2854,
        "shieldWord": "高文谦"
    },
    "2855": {
        "id": 2855,
        "shieldWord": "高薪养廉"
    },
    "2856": {
        "id": 2856,
        "shieldWord": "膏药旗"
    },
    "2857": {
        "id": 2857,
        "shieldWord": "戈瑞尔德"
    },
    "2858": {
        "id": 2858,
        "shieldWord": "戈扬"
    },
    "2859": {
        "id": 2859,
        "shieldWord": "鸽派"
    },
    "2860": {
        "id": 2860,
        "shieldWord": "歌功颂德"
    },
    "2861": {
        "id": 2861,
        "shieldWord": "格雷(关卡排名管理者)"
    },
    "2862": {
        "id": 2862,
        "shieldWord": "格鲁"
    },
    "2863": {
        "id": 2863,
        "shieldWord": "格鲁(城镇移动)"
    },
    "2864": {
        "id": 2864,
        "shieldWord": "鲠"
    },
    "2865": {
        "id": 2865,
        "shieldWord": "工自联"
    },
    "2866": {
        "id": 2866,
        "shieldWord": "弓虽"
    },
    "2867": {
        "id": 2867,
        "shieldWord": "共产"
    },
    "2868": {
        "id": 2868,
        "shieldWord": "共产主义"
    },
    "2869": {
        "id": 2869,
        "shieldWord": "共军"
    },
    "2870": {
        "id": 2870,
        "shieldWord": "共荣圈"
    },
    "2871": {
        "id": 2871,
        "shieldWord": "缑"
    },
    "2872": {
        "id": 2872,
        "shieldWord": "狗诚"
    },
    "2873": {
        "id": 2873,
        "shieldWord": "狗狼养的"
    },
    "2874": {
        "id": 2874,
        "shieldWord": "狗娘养的"
    },
    "2875": {
        "id": 2875,
        "shieldWord": "狗养"
    },
    "2876": {
        "id": 2876,
        "shieldWord": "狗杂种"
    },
    "2877": {
        "id": 2877,
        "shieldWord": "古龙祭坛"
    },
    "2878": {
        "id": 2878,
        "shieldWord": "骨狮"
    },
    "2879": {
        "id": 2879,
        "shieldWord": "鸹"
    },
    "2880": {
        "id": 2880,
        "shieldWord": "诖"
    },
    "2881": {
        "id": 2881,
        "shieldWord": "关卓中"
    },
    "2882": {
        "id": 2882,
        "shieldWord": "贯通两极法"
    },
    "2883": {
        "id": 2883,
        "shieldWord": "广闻"
    },
    "2884": {
        "id": 2884,
        "shieldWord": "妫"
    },
    "2885": {
        "id": 2885,
        "shieldWord": "龟儿子"
    },
    "2886": {
        "id": 2886,
        "shieldWord": "龟孙子"
    },
    "2887": {
        "id": 2887,
        "shieldWord": "龟投"
    },
    "2888": {
        "id": 2888,
        "shieldWord": "绲"
    },
    "2889": {
        "id": 2889,
        "shieldWord": "滚那吗"
    },
    "2890": {
        "id": 2890,
        "shieldWord": "滚那吗B"
    },
    "2891": {
        "id": 2891,
        "shieldWord": "滚那吗错比"
    },
    "2892": {
        "id": 2892,
        "shieldWord": "滚那吗老比"
    },
    "2893": {
        "id": 2893,
        "shieldWord": "滚那吗瘟比"
    },
    "2894": {
        "id": 2894,
        "shieldWord": "鲧"
    },
    "2895": {
        "id": 2895,
        "shieldWord": "呙"
    },
    "2896": {
        "id": 2896,
        "shieldWord": "郭俊铭"
    },
    "2897": {
        "id": 2897,
        "shieldWord": "郭罗基"
    },
    "2898": {
        "id": 2898,
        "shieldWord": "郭岩华"
    },
    "2899": {
        "id": 2899,
        "shieldWord": "国家安全"
    },
    "2900": {
        "id": 2900,
        "shieldWord": "国家机密"
    },
    "2901": {
        "id": 2901,
        "shieldWord": "国军"
    },
    "2902": {
        "id": 2902,
        "shieldWord": "国贼"
    },
    "2903": {
        "id": 2903,
        "shieldWord": "哈尔罗尼"
    },
    "2904": {
        "id": 2904,
        "shieldWord": "顸"
    },
    "2905": {
        "id": 2905,
        "shieldWord": "韩东方"
    },
    "2906": {
        "id": 2906,
        "shieldWord": "韩联潮"
    },
    "2907": {
        "id": 2907,
        "shieldWord": "汉奸"
    },
    "2908": {
        "id": 2908,
        "shieldWord": "颢"
    },
    "2909": {
        "id": 2909,
        "shieldWord": "灏"
    },
    "2910": {
        "id": 2910,
        "shieldWord": "黑社会"
    },
    "2911": {
        "id": 2911,
        "shieldWord": "黑手党"
    },
    "2912": {
        "id": 2912,
        "shieldWord": "红灯区"
    },
    "2913": {
        "id": 2913,
        "shieldWord": "红色恐怖"
    },
    "2914": {
        "id": 2914,
        "shieldWord": "红炎猛兽"
    },
    "2915": {
        "id": 2915,
        "shieldWord": "洪传"
    },
    "2916": {
        "id": 2916,
        "shieldWord": "洪兴"
    },
    "2917": {
        "id": 2917,
        "shieldWord": "洪哲胜"
    },
    "2918": {
        "id": 2918,
        "shieldWord": "黉"
    },
    "2919": {
        "id": 2919,
        "shieldWord": "鲎"
    },
    "2920": {
        "id": 2920,
        "shieldWord": "胡紧掏"
    },
    "2921": {
        "id": 2921,
        "shieldWord": "胡锦滔"
    },
    "2922": {
        "id": 2922,
        "shieldWord": "胡锦淘"
    },
    "2923": {
        "id": 2923,
        "shieldWord": "胡景涛"
    },
    "2924": {
        "id": 2924,
        "shieldWord": "胡乔木"
    },
    "2925": {
        "id": 2925,
        "shieldWord": "胡总书记"
    },
    "2926": {
        "id": 2926,
        "shieldWord": "湖岸护卫兵"
    },
    "2927": {
        "id": 2927,
        "shieldWord": "湖岸警卫兵"
    },
    "2928": {
        "id": 2928,
        "shieldWord": "湖岸哨兵队长"
    },
    "2929": {
        "id": 2929,
        "shieldWord": "护法"
    },
    "2930": {
        "id": 2930,
        "shieldWord": "华通时事论坛"
    },
    "2931": {
        "id": 2931,
        "shieldWord": "华夏文摘"
    },
    "2932": {
        "id": 2932,
        "shieldWord": "华语世界论坛"
    },
    "2933": {
        "id": 2933,
        "shieldWord": "华岳时事论坛"
    },
    "2934": {
        "id": 2934,
        "shieldWord": "怀特"
    },
    "2935": {
        "id": 2935,
        "shieldWord": "锾"
    },
    "2936": {
        "id": 2936,
        "shieldWord": "皇军"
    },
    "2937": {
        "id": 2937,
        "shieldWord": "黄伯源"
    },
    "2938": {
        "id": 2938,
        "shieldWord": "黄慈萍"
    },
    "2939": {
        "id": 2939,
        "shieldWord": "黄祸"
    },
    "2940": {
        "id": 2940,
        "shieldWord": "黄剑辉"
    },
    "2941": {
        "id": 2941,
        "shieldWord": "黄金幼龙"
    },
    "2942": {
        "id": 2942,
        "shieldWord": "黄片"
    },
    "2943": {
        "id": 2943,
        "shieldWord": "黄翔"
    },
    "2944": {
        "id": 2944,
        "shieldWord": "黄义交"
    },
    "2945": {
        "id": 2945,
        "shieldWord": "黄仲生"
    },
    "2946": {
        "id": 2946,
        "shieldWord": "回民暴动"
    },
    "2947": {
        "id": 2947,
        "shieldWord": "哕"
    },
    "2948": {
        "id": 2948,
        "shieldWord": "缋"
    },
    "2949": {
        "id": 2949,
        "shieldWord": "毁灭步兵"
    },
    "2950": {
        "id": 2950,
        "shieldWord": "毁灭骑士"
    },
    "2951": {
        "id": 2951,
        "shieldWord": "毁灭射手"
    },
    "2952": {
        "id": 2952,
        "shieldWord": "昏迷图腾"
    },
    "2953": {
        "id": 2953,
        "shieldWord": "混乱的图腾"
    },
    "2954": {
        "id": 2954,
        "shieldWord": "活动"
    },
    "2955": {
        "id": 2955,
        "shieldWord": "击倒图腾"
    },
    "2956": {
        "id": 2956,
        "shieldWord": "击伤的图腾"
    },
    "2957": {
        "id": 2957,
        "shieldWord": "鶏8"
    },
    "2958": {
        "id": 2958,
        "shieldWord": "鶏八"
    },
    "2959": {
        "id": 2959,
        "shieldWord": "鶏巴"
    },
    "2960": {
        "id": 2960,
        "shieldWord": "鶏吧"
    },
    "2961": {
        "id": 2961,
        "shieldWord": "鶏鶏"
    },
    "2962": {
        "id": 2962,
        "shieldWord": "鶏奸"
    },
    "2963": {
        "id": 2963,
        "shieldWord": "鶏毛信文汇"
    },
    "2964": {
        "id": 2964,
        "shieldWord": "鶏女"
    },
    "2965": {
        "id": 2965,
        "shieldWord": "鶏院"
    },
    "2966": {
        "id": 2966,
        "shieldWord": "姬胜德"
    },
    "2967": {
        "id": 2967,
        "shieldWord": "积克馆"
    },
    "2968": {
        "id": 2968,
        "shieldWord": "贾廷安"
    },
    "2969": {
        "id": 2969,
        "shieldWord": "贾育台"
    },
    "2970": {
        "id": 2970,
        "shieldWord": "戋"
    },
    "2971": {
        "id": 2971,
        "shieldWord": "监视塔"
    },
    "2972": {
        "id": 2972,
        "shieldWord": "监视塔哨兵"
    },
    "2973": {
        "id": 2973,
        "shieldWord": "监视塔哨兵队长"
    },
    "2974": {
        "id": 2974,
        "shieldWord": "简肇栋"
    },
    "2975": {
        "id": 2975,
        "shieldWord": "建国党"
    },
    "2976": {
        "id": 2976,
        "shieldWord": "贱B"
    },
    "2977": {
        "id": 2977,
        "shieldWord": "贱bi"
    },
    "2978": {
        "id": 2978,
        "shieldWord": "贱比"
    },
    "2979": {
        "id": 2979,
        "shieldWord": "贱货"
    },
    "2980": {
        "id": 2980,
        "shieldWord": "贱种"
    },
    "2981": {
        "id": 2981,
        "shieldWord": "江罗"
    },
    "2982": {
        "id": 2982,
        "shieldWord": "江绵恒"
    },
    "2983": {
        "id": 2983,
        "shieldWord": "江戏子"
    },
    "2984": {
        "id": 2984,
        "shieldWord": "江则民"
    },
    "2985": {
        "id": 2985,
        "shieldWord": "江泽慧"
    },
    "2986": {
        "id": 2986,
        "shieldWord": "江贼"
    },
    "2987": {
        "id": 2987,
        "shieldWord": "江贼民"
    },
    "2988": {
        "id": 2988,
        "shieldWord": "姜春云"
    },
    "2989": {
        "id": 2989,
        "shieldWord": "将则民"
    },
    "2990": {
        "id": 2990,
        "shieldWord": "僵贼"
    },
    "2991": {
        "id": 2991,
        "shieldWord": "僵贼民"
    },
    "2992": {
        "id": 2992,
        "shieldWord": "讲法"
    },
    "2993": {
        "id": 2993,
        "shieldWord": "降低命中的图腾"
    },
    "2994": {
        "id": 2994,
        "shieldWord": "酱猪媳"
    },
    "2995": {
        "id": 2995,
        "shieldWord": "挢"
    },
    "2996": {
        "id": 2996,
        "shieldWord": "狡猾的达夫"
    },
    "2997": {
        "id": 2997,
        "shieldWord": "矫健的马努尔"
    },
    "2998": {
        "id": 2998,
        "shieldWord": "峤"
    },
    "2999": {
        "id": 2999,
        "shieldWord": "教养院"
    },
    "3000": {
        "id": 3000,
        "shieldWord": "揭批书"
    },
    "3001": {
        "id": 3001,
        "shieldWord": "讦"
    },
    "3002": {
        "id": 3002,
        "shieldWord": "她妈"
    },
    "3003": {
        "id": 3003,
        "shieldWord": "届中央政治局委员"
    },
    "3004": {
        "id": 3004,
        "shieldWord": "金枪不倒"
    },
    "3005": {
        "id": 3005,
        "shieldWord": "金尧如"
    },
    "3006": {
        "id": 3006,
        "shieldWord": "金泽辰"
    },
    "3007": {
        "id": 3007,
        "shieldWord": "卺"
    },
    "3008": {
        "id": 3008,
        "shieldWord": "锦涛"
    },
    "3009": {
        "id": 3009,
        "shieldWord": "经文"
    },
    "3010": {
        "id": 3010,
        "shieldWord": "经血"
    },
    "3011": {
        "id": 3011,
        "shieldWord": "茎候佳阴"
    },
    "3012": {
        "id": 3012,
        "shieldWord": "荆棘护卫兵"
    },
    "3013": {
        "id": 3013,
        "shieldWord": "靖国神社"
    },
    "3014": {
        "id": 3014,
        "shieldWord": "㈨"
    },
    "3015": {
        "id": 3015,
        "shieldWord": "旧斗篷哨兵"
    },
    "3016": {
        "id": 3016,
        "shieldWord": "龃"
    },
    "3017": {
        "id": 3017,
        "shieldWord": "巨槌骑兵"
    },
    "3018": {
        "id": 3018,
        "shieldWord": "巨铁角哈克"
    },
    "3019": {
        "id": 3019,
        "shieldWord": "锯齿通道被遗弃的骷髅"
    },
    "3020": {
        "id": 3020,
        "shieldWord": "锯齿通道骷髅"
    },
    "3021": {
        "id": 3021,
        "shieldWord": "绝望之地"
    },
    "3022": {
        "id": 3022,
        "shieldWord": "军妓"
    },
    "3023": {
        "id": 3023,
        "shieldWord": "开放杂志"
    },
    "3024": {
        "id": 3024,
        "shieldWord": "凯奥勒尼什"
    },
    "3025": {
        "id": 3025,
        "shieldWord": "凯尔本"
    },
    "3026": {
        "id": 3026,
        "shieldWord": "凯尔雷斯"
    },
    "3027": {
        "id": 3027,
        "shieldWord": "凯特切尔"
    },
    "3028": {
        "id": 3028,
        "shieldWord": "砍翻一条街"
    },
    "3029": {
        "id": 3029,
        "shieldWord": "看中国"
    },
    "3030": {
        "id": 3030,
        "shieldWord": "阚"
    },
    "3031": {
        "id": 3031,
        "shieldWord": "靠你妈"
    },
    "3032": {
        "id": 3032,
        "shieldWord": "柯赐海"
    },
    "3033": {
        "id": 3033,
        "shieldWord": "柯建铭"
    },
    "3034": {
        "id": 3034,
        "shieldWord": "科莱尔"
    },
    "3035": {
        "id": 3035,
        "shieldWord": "克莱恩"
    },
    "3036": {
        "id": 3036,
        "shieldWord": "克莱特"
    },
    "3037": {
        "id": 3037,
        "shieldWord": "克劳森"
    },
    "3038": {
        "id": 3038,
        "shieldWord": "缂"
    },
    "3039": {
        "id": 3039,
        "shieldWord": "空气精灵"
    },
    "3040": {
        "id": 3040,
        "shieldWord": "空虚的伊坤"
    },
    "3041": {
        "id": 3041,
        "shieldWord": "空虚之地"
    },
    "3042": {
        "id": 3042,
        "shieldWord": "恐怖主义"
    },
    "3043": {
        "id": 3043,
        "shieldWord": "眍"
    },
    "3044": {
        "id": 3044,
        "shieldWord": "喾"
    },
    "3045": {
        "id": 3045,
        "shieldWord": "邝锦文"
    },
    "3046": {
        "id": 3046,
        "shieldWord": "昆图"
    },
    "3047": {
        "id": 3047,
        "shieldWord": "拉皮条"
    },
    "3048": {
        "id": 3048,
        "shieldWord": "莱特"
    },
    "3049": {
        "id": 3049,
        "shieldWord": "赖士葆"
    },
    "3050": {
        "id": 3050,
        "shieldWord": "兰迪"
    },
    "3051": {
        "id": 3051,
        "shieldWord": "烂B"
    },
    "3052": {
        "id": 3052,
        "shieldWord": "烂袋"
    },
    "3053": {
        "id": 3053,
        "shieldWord": "烂货"
    },
    "3054": {
        "id": 3054,
        "shieldWord": "滥B"
    },
    "3055": {
        "id": 3055,
        "shieldWord": "滥逼"
    },
    "3056": {
        "id": 3056,
        "shieldWord": "滥比"
    },
    "3057": {
        "id": 3057,
        "shieldWord": "滥货"
    },
    "3058": {
        "id": 3058,
        "shieldWord": "滥交"
    },
    "3059": {
        "id": 3059,
        "shieldWord": "劳动教养所"
    },
    "3060": {
        "id": 3060,
        "shieldWord": "劳改"
    },
    "3061": {
        "id": 3061,
        "shieldWord": "劳教"
    },
    "3062": {
        "id": 3062,
        "shieldWord": "雷尼亚"
    },
    "3063": {
        "id": 3063,
        "shieldWord": "李红痔"
    },
    "3064": {
        "id": 3064,
        "shieldWord": "李洪宽"
    },
    "3065": {
        "id": 3065,
        "shieldWord": "李继耐"
    },
    "3066": {
        "id": 3066,
        "shieldWord": "李兰菊"
    },
    "3067": {
        "id": 3067,
        "shieldWord": "李老师"
    },
    "3068": {
        "id": 3068,
        "shieldWord": "李录"
    },
    "3069": {
        "id": 3069,
        "shieldWord": "李禄"
    },
    "3070": {
        "id": 3070,
        "shieldWord": "李庆安"
    },
    "3071": {
        "id": 3071,
        "shieldWord": "李庆华"
    },
    "3072": {
        "id": 3072,
        "shieldWord": "李淑娴"
    },
    "3073": {
        "id": 3073,
        "shieldWord": "李铁映"
    },
    "3074": {
        "id": 3074,
        "shieldWord": "李旺阳"
    },
    "3075": {
        "id": 3075,
        "shieldWord": "李小鹏"
    },
    "3076": {
        "id": 3076,
        "shieldWord": "李月月鸟"
    },
    "3077": {
        "id": 3077,
        "shieldWord": "李志绥"
    },
    "3078": {
        "id": 3078,
        "shieldWord": "李总理"
    },
    "3079": {
        "id": 3079,
        "shieldWord": "李总统"
    },
    "3080": {
        "id": 3080,
        "shieldWord": "里菲斯"
    },
    "3081": {
        "id": 3081,
        "shieldWord": "连方瑀"
    },
    "3082": {
        "id": 3082,
        "shieldWord": "连惠心"
    },
    "3083": {
        "id": 3083,
        "shieldWord": "连胜德"
    },
    "3084": {
        "id": 3084,
        "shieldWord": "连胜文"
    },
    "3085": {
        "id": 3085,
        "shieldWord": "联总"
    },
    "3086": {
        "id": 3086,
        "shieldWord": "廉政大论坛"
    },
    "3087": {
        "id": 3087,
        "shieldWord": "炼功"
    },
    "3088": {
        "id": 3088,
        "shieldWord": "两岸关系"
    },
    "3089": {
        "id": 3089,
        "shieldWord": "两岸三地论坛"
    },
    "3090": {
        "id": 3090,
        "shieldWord": "两会"
    },
    "3091": {
        "id": 3091,
        "shieldWord": "两会报道"
    },
    "3092": {
        "id": 3092,
        "shieldWord": "两会新闻"
    },
    "3093": {
        "id": 3093,
        "shieldWord": "廖锡龙"
    },
    "3094": {
        "id": 3094,
        "shieldWord": "林保华"
    },
    "3095": {
        "id": 3095,
        "shieldWord": "林长盛"
    },
    "3096": {
        "id": 3096,
        "shieldWord": "林佳龙"
    },
    "3097": {
        "id": 3097,
        "shieldWord": "林信义"
    },
    "3098": {
        "id": 3098,
        "shieldWord": "林正胜"
    },
    "3099": {
        "id": 3099,
        "shieldWord": "林重谟"
    },
    "3100": {
        "id": 3100,
        "shieldWord": "躏"
    },
    "3101": {
        "id": 3101,
        "shieldWord": "凌锋"
    },
    "3102": {
        "id": 3102,
        "shieldWord": "刘宾深"
    },
    "3103": {
        "id": 3103,
        "shieldWord": "刘宾雁"
    },
    "3104": {
        "id": 3104,
        "shieldWord": "刘刚"
    },
    "3105": {
        "id": 3105,
        "shieldWord": "刘国凯"
    },
    "3106": {
        "id": 3106,
        "shieldWord": "刘华清"
    },
    "3107": {
        "id": 3107,
        "shieldWord": "刘俊国"
    },
    "3108": {
        "id": 3108,
        "shieldWord": "刘凯中"
    },
    "3109": {
        "id": 3109,
        "shieldWord": "刘千石"
    },
    "3110": {
        "id": 3110,
        "shieldWord": "刘青"
    },
    "3111": {
        "id": 3111,
        "shieldWord": "刘山青"
    },
    "3112": {
        "id": 3112,
        "shieldWord": "刘士贤"
    },
    "3113": {
        "id": 3113,
        "shieldWord": "刘文胜"
    },
    "3114": {
        "id": 3114,
        "shieldWord": "刘文雄"
    },
    "3115": {
        "id": 3115,
        "shieldWord": "刘晓波"
    },
    "3116": {
        "id": 3116,
        "shieldWord": "刘晓竹"
    },
    "3117": {
        "id": 3117,
        "shieldWord": "刘永川"
    },
    "3118": {
        "id": 3118,
        "shieldWord": "㈥"
    },
    "3119": {
        "id": 3119,
        "shieldWord": "鹨"
    },
    "3120": {
        "id": 3120,
        "shieldWord": "龙虎豹"
    },
    "3121": {
        "id": 3121,
        "shieldWord": "龙火之心"
    },
    "3122": {
        "id": 3122,
        "shieldWord": "卢卡"
    },
    "3123": {
        "id": 3123,
        "shieldWord": "卢西德"
    },
    "3124": {
        "id": 3124,
        "shieldWord": "陆委会"
    },
    "3125": {
        "id": 3125,
        "shieldWord": "辂"
    },
    "3126": {
        "id": 3126,
        "shieldWord": "吕京花"
    },
    "3127": {
        "id": 3127,
        "shieldWord": "乱交"
    },
    "3128": {
        "id": 3128,
        "shieldWord": "乱轮"
    },
    "3129": {
        "id": 3129,
        "shieldWord": "锊"
    },
    "3130": {
        "id": 3130,
        "shieldWord": "抡功"
    },
    "3131": {
        "id": 3131,
        "shieldWord": "伦功"
    },
    "3132": {
        "id": 3132,
        "shieldWord": "轮大"
    },
    "3133": {
        "id": 3133,
        "shieldWord": "轮功"
    },
    "3134": {
        "id": 3134,
        "shieldWord": "论坛管理员"
    },
    "3135": {
        "id": 3135,
        "shieldWord": "罗福助"
    },
    "3136": {
        "id": 3136,
        "shieldWord": "罗礼诗"
    },
    "3137": {
        "id": 3137,
        "shieldWord": "罗文嘉"
    },
    "3138": {
        "id": 3138,
        "shieldWord": "罗志明"
    },
    "3139": {
        "id": 3139,
        "shieldWord": "脶"
    },
    "3140": {
        "id": 3140,
        "shieldWord": "泺"
    },
    "3141": {
        "id": 3141,
        "shieldWord": "洛克菲尔特"
    },
    "3142": {
        "id": 3142,
        "shieldWord": "妈比"
    },
    "3143": {
        "id": 3143,
        "shieldWord": "马大维"
    },
    "3144": {
        "id": 3144,
        "shieldWord": "马良骏"
    },
    "3145": {
        "id": 3145,
        "shieldWord": "马三家"
    },
    "3146": {
        "id": 3146,
        "shieldWord": "马时敏"
    },
    "3147": {
        "id": 3147,
        "shieldWord": "马特斯"
    },
    "3148": {
        "id": 3148,
        "shieldWord": "马永成"
    },
    "3149": {
        "id": 3149,
        "shieldWord": "玛丽亚"
    },
    "3150": {
        "id": 3150,
        "shieldWord": "玛雅"
    },
    "3151": {
        "id": 3151,
        "shieldWord": "吗的"
    },
    "3152": {
        "id": 3152,
        "shieldWord": "吗啡"
    },
    "3153": {
        "id": 3153,
        "shieldWord": "劢"
    },
    "3154": {
        "id": 3154,
        "shieldWord": "麦克斯"
    },
    "3155": {
        "id": 3155,
        "shieldWord": "卖逼"
    },
    "3156": {
        "id": 3156,
        "shieldWord": "卖国"
    },
    "3157": {
        "id": 3157,
        "shieldWord": "卖骚"
    },
    "3158": {
        "id": 3158,
        "shieldWord": "瞒报"
    },
    "3159": {
        "id": 3159,
        "shieldWord": "毛厕洞"
    },
    "3160": {
        "id": 3160,
        "shieldWord": "毛贼"
    },
    "3161": {
        "id": 3161,
        "shieldWord": "毛贼东"
    },
    "3162": {
        "id": 3162,
        "shieldWord": "美国"
    },
    "3163": {
        "id": 3163,
        "shieldWord": "美国参考"
    },
    "3164": {
        "id": 3164,
        "shieldWord": "美国佬"
    },
    "3165": {
        "id": 3165,
        "shieldWord": "蒙独"
    },
    "3166": {
        "id": 3166,
        "shieldWord": "蒙古达子"
    },
    "3167": {
        "id": 3167,
        "shieldWord": "蒙古独"
    },
    "3168": {
        "id": 3168,
        "shieldWord": "祢"
    },
    "3169": {
        "id": 3169,
        "shieldWord": "芈"
    },
    "3170": {
        "id": 3170,
        "shieldWord": "绵恒"
    },
    "3171": {
        "id": 3171,
        "shieldWord": "黾"
    },
    "3172": {
        "id": 3172,
        "shieldWord": "民联"
    },
    "3173": {
        "id": 3173,
        "shieldWord": "民意论坛"
    },
    "3174": {
        "id": 3174,
        "shieldWord": "民阵"
    },
    "3175": {
        "id": 3175,
        "shieldWord": "民主墙"
    },
    "3176": {
        "id": 3176,
        "shieldWord": "缗"
    },
    "3177": {
        "id": 3177,
        "shieldWord": "愍"
    },
    "3178": {
        "id": 3178,
        "shieldWord": "鳘"
    },
    "3179": {
        "id": 3179,
        "shieldWord": "摸你鶏巴"
    },
    "3180": {
        "id": 3180,
        "shieldWord": "莫伟强"
    },
    "3181": {
        "id": 3181,
        "shieldWord": "木子论坛"
    },
    "3182": {
        "id": 3182,
        "shieldWord": "内裤"
    },
    "3183": {
        "id": 3183,
        "shieldWord": "内衣"
    },
    "3184": {
        "id": 3184,
        "shieldWord": "那吗B"
    },
    "3185": {
        "id": 3185,
        "shieldWord": "那吗逼"
    },
    "3186": {
        "id": 3186,
        "shieldWord": "那吗错比"
    },
    "3187": {
        "id": 3187,
        "shieldWord": "那吗老比"
    },
    "3188": {
        "id": 3188,
        "shieldWord": "那吗瘟比"
    },
    "3189": {
        "id": 3189,
        "shieldWord": "那娘错比"
    },
    "3190": {
        "id": 3190,
        "shieldWord": "奶头"
    },
    "3191": {
        "id": 3191,
        "shieldWord": "南大自由论坛"
    },
    "3192": {
        "id": 3192,
        "shieldWord": "南蛮子"
    },
    "3193": {
        "id": 3193,
        "shieldWord": "闹事"
    },
    "3194": {
        "id": 3194,
        "shieldWord": "能样"
    },
    "3195": {
        "id": 3195,
        "shieldWord": "尼奥夫"
    },
    "3196": {
        "id": 3196,
        "shieldWord": "倪育贤"
    },
    "3197": {
        "id": 3197,
        "shieldWord": "鲵"
    },
    "3198": {
        "id": 3198,
        "shieldWord": "你妈逼"
    },
    "3199": {
        "id": 3199,
        "shieldWord": "你妈比"
    },
    "3200": {
        "id": 3200,
        "shieldWord": "你妈的"
    },
    "3201": {
        "id": 3201,
        "shieldWord": "你妈了妹"
    },
    "3202": {
        "id": 3202,
        "shieldWord": "你说我说论坛"
    },
    "3203": {
        "id": 3203,
        "shieldWord": "你爷"
    },
    "3204": {
        "id": 3204,
        "shieldWord": "娘饿比"
    },
    "3205": {
        "id": 3205,
        "shieldWord": "捏你鶏巴"
    },
    "3206": {
        "id": 3206,
        "shieldWord": "侬着冈峦"
    },
    "3207": {
        "id": 3207,
        "shieldWord": "侬着卵抛"
    },
    "3208": {
        "id": 3208,
        "shieldWord": "奴隶魔族士兵"
    },
    "3209": {
        "id": 3209,
        "shieldWord": "女主人罗姬马莉"
    },
    "3210": {
        "id": 3210,
        "shieldWord": "傩"
    },
    "3211": {
        "id": 3211,
        "shieldWord": "诺姆"
    },
    "3212": {
        "id": 3212,
        "shieldWord": "潘国平"
    },
    "3213": {
        "id": 3213,
        "shieldWord": "蹒"
    },
    "3214": {
        "id": 3214,
        "shieldWord": "庞建国"
    },
    "3215": {
        "id": 3215,
        "shieldWord": "泡沫经济"
    },
    "3216": {
        "id": 3216,
        "shieldWord": "辔"
    },
    "3217": {
        "id": 3217,
        "shieldWord": "皮条客"
    },
    "3218": {
        "id": 3218,
        "shieldWord": "谝"
    },
    "3219": {
        "id": 3219,
        "shieldWord": "泼妇"
    },
    "3220": {
        "id": 3220,
        "shieldWord": "齐墨"
    },
    "3221": {
        "id": 3221,
        "shieldWord": "齐诺"
    },
    "3222": {
        "id": 3222,
        "shieldWord": "骑你"
    },
    "3223": {
        "id": 3223,
        "shieldWord": "钱达"
    },
    "3224": {
        "id": 3224,
        "shieldWord": "钱国梁"
    },
    "3225": {
        "id": 3225,
        "shieldWord": "钱其琛"
    },
    "3226": {
        "id": 3226,
        "shieldWord": "缲"
    },
    "3227": {
        "id": 3227,
        "shieldWord": "乔石"
    },
    "3228": {
        "id": 3228,
        "shieldWord": "乔伊"
    },
    "3229": {
        "id": 3229,
        "shieldWord": "桥侵袭兵"
    },
    "3230": {
        "id": 3230,
        "shieldWord": "谯"
    },
    "3231": {
        "id": 3231,
        "shieldWord": "鞒"
    },
    "3232": {
        "id": 3232,
        "shieldWord": "箧"
    },
    "3233": {
        "id": 3233,
        "shieldWord": "亲美"
    },
    "3234": {
        "id": 3234,
        "shieldWord": "亲日"
    },
    "3235": {
        "id": 3235,
        "shieldWord": "钦本立"
    },
    "3236": {
        "id": 3236,
        "shieldWord": "禽兽"
    },
    "3237": {
        "id": 3237,
        "shieldWord": "吣"
    },
    "3238": {
        "id": 3238,
        "shieldWord": "轻舟快讯"
    },
    "3239": {
        "id": 3239,
        "shieldWord": "情妇"
    },
    "3240": {
        "id": 3240,
        "shieldWord": "情兽"
    },
    "3241": {
        "id": 3241,
        "shieldWord": "丘垂贞"
    },
    "3242": {
        "id": 3242,
        "shieldWord": "阒"
    },
    "3243": {
        "id": 3243,
        "shieldWord": "全国两会"
    },
    "3244": {
        "id": 3244,
        "shieldWord": "全国人大"
    },
    "3245": {
        "id": 3245,
        "shieldWord": "犬"
    },
    "3246": {
        "id": 3246,
        "shieldWord": "绻"
    },
    "3247": {
        "id": 3247,
        "shieldWord": "悫"
    },
    "3248": {
        "id": 3248,
        "shieldWord": "让你操"
    },
    "3249": {
        "id": 3249,
        "shieldWord": "热比娅"
    },
    "3250": {
        "id": 3250,
        "shieldWord": "热站政论网"
    },
    "3251": {
        "id": 3251,
        "shieldWord": "人民大会堂"
    },
    "3252": {
        "id": 3252,
        "shieldWord": "人民内情真相"
    },
    "3253": {
        "id": 3253,
        "shieldWord": "人民真实"
    },
    "3254": {
        "id": 3254,
        "shieldWord": "人民之声论坛"
    },
    "3255": {
        "id": 3255,
        "shieldWord": "人权"
    },
    "3256": {
        "id": 3256,
        "shieldWord": "日本帝国"
    },
    "3257": {
        "id": 3257,
        "shieldWord": "日军"
    },
    "3258": {
        "id": 3258,
        "shieldWord": "日内瓦金融"
    },
    "3259": {
        "id": 3259,
        "shieldWord": "日你妈"
    },
    "3260": {
        "id": 3260,
        "shieldWord": "日你爷爷"
    },
    "3261": {
        "id": 3261,
        "shieldWord": "日朱骏"
    },
    "3262": {
        "id": 3262,
        "shieldWord": "颥"
    },
    "3263": {
        "id": 3263,
        "shieldWord": "乳晕"
    },
    "3264": {
        "id": 3264,
        "shieldWord": "瑞士金融大学"
    },
    "3265": {
        "id": 3265,
        "shieldWord": "三K党"
    },
    "3266": {
        "id": 3266,
        "shieldWord": "三个代表"
    },
    "3267": {
        "id": 3267,
        "shieldWord": "三去车仑工力"
    },
    "3268": {
        "id": 3268,
        "shieldWord": "㈢"
    },
    "3269": {
        "id": 3269,
        "shieldWord": "毵"
    },
    "3270": {
        "id": 3270,
        "shieldWord": "骚B"
    },
    "3271": {
        "id": 3271,
        "shieldWord": "骚棒"
    },
    "3272": {
        "id": 3272,
        "shieldWord": "骚包"
    },
    "3273": {
        "id": 3273,
        "shieldWord": "骚棍"
    },
    "3274": {
        "id": 3274,
        "shieldWord": "骚鶏"
    },
    "3275": {
        "id": 3275,
        "shieldWord": "骚卵"
    },
    "3276": {
        "id": 3276,
        "shieldWord": "杀你全家"
    },
    "3277": {
        "id": 3277,
        "shieldWord": "杀你一家"
    },
    "3278": {
        "id": 3278,
        "shieldWord": "杀人犯"
    },
    "3279": {
        "id": 3279,
        "shieldWord": "傻鸟"
    },
    "3280": {
        "id": 3280,
        "shieldWord": "山口组"
    },
    "3281": {
        "id": 3281,
        "shieldWord": "善恶有报"
    },
    "3282": {
        "id": 3282,
        "shieldWord": "上访"
    },
    "3283": {
        "id": 3283,
        "shieldWord": "上海孤儿院"
    },
    "3284": {
        "id": 3284,
        "shieldWord": "厍"
    },
    "3285": {
        "id": 3285,
        "shieldWord": "社会主义"
    },
    "3286": {
        "id": 3286,
        "shieldWord": "射了还说要"
    },
    "3287": {
        "id": 3287,
        "shieldWord": "滠"
    },
    "3288": {
        "id": 3288,
        "shieldWord": "诜"
    },
    "3289": {
        "id": 3289,
        "shieldWord": "神经病"
    },
    "3290": {
        "id": 3290,
        "shieldWord": "谂"
    },
    "3291": {
        "id": 3291,
        "shieldWord": "生孩子没屁眼"
    },
    "3292": {
        "id": 3292,
        "shieldWord": "生命分流的图腾"
    },
    "3293": {
        "id": 3293,
        "shieldWord": "渑"
    },
    "3294": {
        "id": 3294,
        "shieldWord": "圣射手"
    },
    "3295": {
        "id": 3295,
        "shieldWord": "盛华仁"
    },
    "3296": {
        "id": 3296,
        "shieldWord": "湿了还说不要"
    },
    "3297": {
        "id": 3297,
        "shieldWord": "湿了还说要"
    },
    "3298": {
        "id": 3298,
        "shieldWord": "酾"
    },
    "3299": {
        "id": 3299,
        "shieldWord": "鲺"
    },
    "3300": {
        "id": 3300,
        "shieldWord": "㈩"
    },
    "3301": {
        "id": 3301,
        "shieldWord": "石化图腾"
    },
    "3302": {
        "id": 3302,
        "shieldWord": "石拳战斗兵"
    },
    "3303": {
        "id": 3303,
        "shieldWord": "时代论坛"
    },
    "3304": {
        "id": 3304,
        "shieldWord": "时事论坛"
    },
    "3305": {
        "id": 3305,
        "shieldWord": "鲥"
    },
    "3306": {
        "id": 3306,
        "shieldWord": "史莱姆"
    },
    "3307": {
        "id": 3307,
        "shieldWord": "史莱姆王"
    },
    "3308": {
        "id": 3308,
        "shieldWord": "士兵管理员瓦尔臣"
    },
    "3309": {
        "id": 3309,
        "shieldWord": "世界经济导报"
    },
    "3310": {
        "id": 3310,
        "shieldWord": "事实独立"
    },
    "3311": {
        "id": 3311,
        "shieldWord": "侍从贝赫尔特"
    },
    "3312": {
        "id": 3312,
        "shieldWord": "侍从伦斯韦"
    },
    "3313": {
        "id": 3313,
        "shieldWord": "贳"
    },
    "3314": {
        "id": 3314,
        "shieldWord": "摅"
    },
    "3315": {
        "id": 3315,
        "shieldWord": "数据中国"
    },
    "3316": {
        "id": 3316,
        "shieldWord": "双十节"
    },
    "3317": {
        "id": 3317,
        "shieldWord": "氵去车仑工力"
    },
    "3318": {
        "id": 3318,
        "shieldWord": "氵去车仑工力?"
    },
    "3319": {
        "id": 3319,
        "shieldWord": "税力"
    },
    "3320": {
        "id": 3320,
        "shieldWord": "司马晋"
    },
    "3321": {
        "id": 3321,
        "shieldWord": "司马璐"
    },
    "3322": {
        "id": 3322,
        "shieldWord": "司徒华"
    },
    "3323": {
        "id": 3323,
        "shieldWord": "私?服"
    },
    "3324": {
        "id": 3324,
        "shieldWord": "私处"
    },
    "3325": {
        "id": 3325,
        "shieldWord": "思科罗"
    },
    "3326": {
        "id": 3326,
        "shieldWord": "斯诺"
    },
    "3327": {
        "id": 3327,
        "shieldWord": "斯皮尔德"
    },
    "3328": {
        "id": 3328,
        "shieldWord": "四川独"
    },
    "3329": {
        "id": 3329,
        "shieldWord": "四川独立"
    },
    "3330": {
        "id": 3330,
        "shieldWord": "㈣"
    },
    "3331": {
        "id": 3331,
        "shieldWord": "宋书元"
    },
    "3332": {
        "id": 3332,
        "shieldWord": "薮"
    },
    "3333": {
        "id": 3333,
        "shieldWord": "苏菲尔"
    },
    "3334": {
        "id": 3334,
        "shieldWord": "苏拉"
    },
    "3335": {
        "id": 3335,
        "shieldWord": "苏南成"
    },
    "3336": {
        "id": 3336,
        "shieldWord": "苏绍智"
    },
    "3337": {
        "id": 3337,
        "shieldWord": "苏特勒守护兵"
    },
    "3338": {
        "id": 3338,
        "shieldWord": "苏特勤"
    },
    "3339": {
        "id": 3339,
        "shieldWord": "苏特勤护卫兵"
    },
    "3340": {
        "id": 3340,
        "shieldWord": "苏特勤魔法师"
    },
    "3341": {
        "id": 3341,
        "shieldWord": "苏晓康"
    },
    "3342": {
        "id": 3342,
        "shieldWord": "苏盈贵"
    },
    "3343": {
        "id": 3343,
        "shieldWord": "苏贞昌"
    },
    "3344": {
        "id": 3344,
        "shieldWord": "谇"
    },
    "3345": {
        "id": 3345,
        "shieldWord": "碎片制造商人马克"
    },
    "3346": {
        "id": 3346,
        "shieldWord": "碎片制造商人苏克"
    },
    "3347": {
        "id": 3347,
        "shieldWord": "孙大千"
    },
    "3348": {
        "id": 3348,
        "shieldWord": "他妈"
    },
    "3349": {
        "id": 3349,
        "shieldWord": "他妈的"
    },
    "3350": {
        "id": 3350,
        "shieldWord": "他吗的"
    },
    "3351": {
        "id": 3351,
        "shieldWord": "他母亲"
    },
    "3352": {
        "id": 3352,
        "shieldWord": "塔内"
    },
    "3353": {
        "id": 3353,
        "shieldWord": "塔乌"
    },
    "3354": {
        "id": 3354,
        "shieldWord": "鳎"
    },
    "3355": {
        "id": 3355,
        "shieldWord": "闼"
    },
    "3356": {
        "id": 3356,
        "shieldWord": "台盟"
    },
    "3357": {
        "id": 3357,
        "shieldWord": "台湾帝国"
    },
    "3358": {
        "id": 3358,
        "shieldWord": "台湾独"
    },
    "3359": {
        "id": 3359,
        "shieldWord": "台湾共产党"
    },
    "3360": {
        "id": 3360,
        "shieldWord": "台湾狗"
    },
    "3361": {
        "id": 3361,
        "shieldWord": "台湾建国运动组织"
    },
    "3362": {
        "id": 3362,
        "shieldWord": "台湾青年独立联盟"
    },
    "3363": {
        "id": 3363,
        "shieldWord": "台湾政论区"
    },
    "3364": {
        "id": 3364,
        "shieldWord": "台湾自由联盟"
    },
    "3365": {
        "id": 3365,
        "shieldWord": "鲐"
    },
    "3366": {
        "id": 3366,
        "shieldWord": "太监"
    },
    "3367": {
        "id": 3367,
        "shieldWord": "泰奴桥警卫兵"
    },
    "3368": {
        "id": 3368,
        "shieldWord": "泰奴桥掠夺者"
    },
    "3369": {
        "id": 3369,
        "shieldWord": "汤光中"
    },
    "3370": {
        "id": 3370,
        "shieldWord": "唐柏桥"
    },
    "3371": {
        "id": 3371,
        "shieldWord": "鼗"
    },
    "3372": {
        "id": 3372,
        "shieldWord": "誊"
    },
    "3373": {
        "id": 3373,
        "shieldWord": "天安门"
    },
    "3374": {
        "id": 3374,
        "shieldWord": "天安门录像带"
    },
    "3375": {
        "id": 3375,
        "shieldWord": "天安门屠杀"
    },
    "3376": {
        "id": 3376,
        "shieldWord": "天安门一代"
    },
    "3377": {
        "id": 3377,
        "shieldWord": "天阉"
    },
    "3378": {
        "id": 3378,
        "shieldWord": "田纪云"
    },
    "3379": {
        "id": 3379,
        "shieldWord": "龆"
    },
    "3380": {
        "id": 3380,
        "shieldWord": "鲦"
    },
    "3381": {
        "id": 3381,
        "shieldWord": "铫"
    },
    "3382": {
        "id": 3382,
        "shieldWord": "庭院警卫兵"
    },
    "3383": {
        "id": 3383,
        "shieldWord": "统独"
    },
    "3384": {
        "id": 3384,
        "shieldWord": "统独论坛"
    },
    "3385": {
        "id": 3385,
        "shieldWord": "统战"
    },
    "3386": {
        "id": 3386,
        "shieldWord": "头领奥马"
    },
    "3387": {
        "id": 3387,
        "shieldWord": "头领坟墓管理员"
    },
    "3388": {
        "id": 3388,
        "shieldWord": "图书管理员卡特"
    },
    "3389": {
        "id": 3389,
        "shieldWord": "团长戈登"
    },
    "3390": {
        "id": 3390,
        "shieldWord": "团员马尔汀"
    },
    "3391": {
        "id": 3391,
        "shieldWord": "抟"
    },
    "3392": {
        "id": 3392,
        "shieldWord": "鼍"
    },
    "3393": {
        "id": 3393,
        "shieldWord": "箨"
    },
    "3394": {
        "id": 3394,
        "shieldWord": "腽"
    },
    "3395": {
        "id": 3395,
        "shieldWord": "外交论坛"
    },
    "3396": {
        "id": 3396,
        "shieldWord": "外交与方略"
    },
    "3397": {
        "id": 3397,
        "shieldWord": "晚年周恩来"
    },
    "3398": {
        "id": 3398,
        "shieldWord": "绾"
    },
    "3399": {
        "id": 3399,
        "shieldWord": "万里"
    },
    "3400": {
        "id": 3400,
        "shieldWord": "万润南"
    },
    "3401": {
        "id": 3401,
        "shieldWord": "万维读者论坛"
    },
    "3402": {
        "id": 3402,
        "shieldWord": "万晓东"
    },
    "3403": {
        "id": 3403,
        "shieldWord": "王宝森"
    },
    "3404": {
        "id": 3404,
        "shieldWord": "王超华"
    },
    "3405": {
        "id": 3405,
        "shieldWord": "王辅臣"
    },
    "3406": {
        "id": 3406,
        "shieldWord": "王涵万"
    },
    "3407": {
        "id": 3407,
        "shieldWord": "王军涛"
    },
    "3408": {
        "id": 3408,
        "shieldWord": "王润生"
    },
    "3409": {
        "id": 3409,
        "shieldWord": "王世坚"
    },
    "3410": {
        "id": 3410,
        "shieldWord": "王世勋"
    },
    "3411": {
        "id": 3411,
        "shieldWord": "王秀丽"
    },
    "3412": {
        "id": 3412,
        "shieldWord": "网禅"
    },
    "3413": {
        "id": 3413,
        "shieldWord": "网特"
    },
    "3414": {
        "id": 3414,
        "shieldWord": "鲔"
    },
    "3415": {
        "id": 3415,
        "shieldWord": "温B"
    },
    "3416": {
        "id": 3416,
        "shieldWord": "温逼"
    },
    "3417": {
        "id": 3417,
        "shieldWord": "温比"
    },
    "3418": {
        "id": 3418,
        "shieldWord": "温元凯"
    },
    "3419": {
        "id": 3419,
        "shieldWord": "阌"
    },
    "3420": {
        "id": 3420,
        "shieldWord": "无界浏览器"
    },
    "3421": {
        "id": 3421,
        "shieldWord": "吴百益"
    },
    "3422": {
        "id": 3422,
        "shieldWord": "吴敦义"
    },
    "3423": {
        "id": 3423,
        "shieldWord": "吴方城"
    },
    "3424": {
        "id": 3424,
        "shieldWord": "吴弘达"
    },
    "3425": {
        "id": 3425,
        "shieldWord": "吴宏达"
    },
    "3426": {
        "id": 3426,
        "shieldWord": "吴仁华"
    },
    "3427": {
        "id": 3427,
        "shieldWord": "吴淑珍"
    },
    "3428": {
        "id": 3428,
        "shieldWord": "吴学灿"
    },
    "3429": {
        "id": 3429,
        "shieldWord": "吴学璨"
    },
    "3430": {
        "id": 3430,
        "shieldWord": "吴育升"
    },
    "3431": {
        "id": 3431,
        "shieldWord": "吴志芳"
    },
    "3432": {
        "id": 3432,
        "shieldWord": "西藏独"
    },
    "3433": {
        "id": 3433,
        "shieldWord": "吸收的图腾"
    },
    "3434": {
        "id": 3434,
        "shieldWord": "吸血兽"
    },
    "3435": {
        "id": 3435,
        "shieldWord": "觋"
    },
    "3436": {
        "id": 3436,
        "shieldWord": "洗脑"
    },
    "3437": {
        "id": 3437,
        "shieldWord": "饩"
    },
    "3438": {
        "id": 3438,
        "shieldWord": "郄"
    },
    "3439": {
        "id": 3439,
        "shieldWord": "下体"
    },
    "3440": {
        "id": 3440,
        "shieldWord": "莶"
    },
    "3441": {
        "id": 3441,
        "shieldWord": "跹"
    },
    "3442": {
        "id": 3442,
        "shieldWord": "鲜族"
    },
    "3443": {
        "id": 3443,
        "shieldWord": "猃"
    },
    "3444": {
        "id": 3444,
        "shieldWord": "蚬"
    },
    "3445": {
        "id": 3445,
        "shieldWord": "岘"
    },
    "3446": {
        "id": 3446,
        "shieldWord": "现金"
    },
    "3447": {
        "id": 3447,
        "shieldWord": "现金交易"
    },
    "3448": {
        "id": 3448,
        "shieldWord": "献祭的图腾"
    },
    "3449": {
        "id": 3449,
        "shieldWord": "鲞"
    },
    "3450": {
        "id": 3450,
        "shieldWord": "项怀诚"
    },
    "3451": {
        "id": 3451,
        "shieldWord": "项小吉"
    },
    "3452": {
        "id": 3452,
        "shieldWord": "哓"
    },
    "3453": {
        "id": 3453,
        "shieldWord": "小B样"
    },
    "3454": {
        "id": 3454,
        "shieldWord": "小比样"
    },
    "3455": {
        "id": 3455,
        "shieldWord": "小鶏鶏"
    },
    "3456": {
        "id": 3456,
        "shieldWord": "小灵通"
    },
    "3457": {
        "id": 3457,
        "shieldWord": "小泉纯一郎"
    },
    "3458": {
        "id": 3458,
        "shieldWord": "谢长廷"
    },
    "3459": {
        "id": 3459,
        "shieldWord": "谢深山"
    },
    "3460": {
        "id": 3460,
        "shieldWord": "谢选骏"
    },
    "3461": {
        "id": 3461,
        "shieldWord": "谢中之"
    },
    "3462": {
        "id": 3462,
        "shieldWord": "辛灏年"
    },
    "3463": {
        "id": 3463,
        "shieldWord": "新观察论坛"
    },
    "3464": {
        "id": 3464,
        "shieldWord": "新华举报"
    },
    "3465": {
        "id": 3465,
        "shieldWord": "新华内情"
    },
    "3466": {
        "id": 3466,
        "shieldWord": "新华通论坛"
    },
    "3467": {
        "id": 3467,
        "shieldWord": "新疆独"
    },
    "3468": {
        "id": 3468,
        "shieldWord": "新生网"
    },
    "3469": {
        "id": 3469,
        "shieldWord": "新手训练营"
    },
    "3470": {
        "id": 3470,
        "shieldWord": "新闻出版总署"
    },
    "3471": {
        "id": 3471,
        "shieldWord": "新闻封锁"
    },
    "3472": {
        "id": 3472,
        "shieldWord": "新义安"
    },
    "3473": {
        "id": 3473,
        "shieldWord": "新语丝"
    },
    "3474": {
        "id": 3474,
        "shieldWord": "信用危机"
    },
    "3475": {
        "id": 3475,
        "shieldWord": "邢铮"
    },
    "3476": {
        "id": 3476,
        "shieldWord": "性无能"
    },
    "3477": {
        "id": 3477,
        "shieldWord": "修炼"
    },
    "3478": {
        "id": 3478,
        "shieldWord": "顼"
    },
    "3479": {
        "id": 3479,
        "shieldWord": "虚弱图腾"
    },
    "3480": {
        "id": 3480,
        "shieldWord": "虚无的饱食者"
    },
    "3481": {
        "id": 3481,
        "shieldWord": "徐国舅"
    },
    "3482": {
        "id": 3482,
        "shieldWord": "许财利"
    },
    "3483": {
        "id": 3483,
        "shieldWord": "许家屯"
    },
    "3484": {
        "id": 3484,
        "shieldWord": "许信良"
    },
    "3485": {
        "id": 3485,
        "shieldWord": "谖"
    },
    "3486": {
        "id": 3486,
        "shieldWord": "薛伟"
    },
    "3487": {
        "id": 3487,
        "shieldWord": "学联"
    },
    "3488": {
        "id": 3488,
        "shieldWord": "学自联"
    },
    "3489": {
        "id": 3489,
        "shieldWord": "泶"
    },
    "3490": {
        "id": 3490,
        "shieldWord": "阉狗"
    },
    "3491": {
        "id": 3491,
        "shieldWord": "讠"
    },
    "3492": {
        "id": 3492,
        "shieldWord": "严家其"
    },
    "3493": {
        "id": 3493,
        "shieldWord": "严家祺"
    },
    "3494": {
        "id": 3494,
        "shieldWord": "阎明复"
    },
    "3495": {
        "id": 3495,
        "shieldWord": "颜清标"
    },
    "3496": {
        "id": 3496,
        "shieldWord": "颜庆章"
    },
    "3497": {
        "id": 3497,
        "shieldWord": "谳"
    },
    "3498": {
        "id": 3498,
        "shieldWord": "央视内部晚会"
    },
    "3499": {
        "id": 3499,
        "shieldWord": "阳痿"
    },
    "3500": {
        "id": 3500,
        "shieldWord": "杨怀安"
    },
    "3501": {
        "id": 3501,
        "shieldWord": "杨建利"
    },
    "3502": {
        "id": 3502,
        "shieldWord": "杨巍"
    },
    "3503": {
        "id": 3503,
        "shieldWord": "杨月清"
    },
    "3504": {
        "id": 3504,
        "shieldWord": "杨周"
    },
    "3505": {
        "id": 3505,
        "shieldWord": "姚罗"
    },
    "3506": {
        "id": 3506,
        "shieldWord": "姚月谦"
    },
    "3507": {
        "id": 3507,
        "shieldWord": "轺"
    },
    "3508": {
        "id": 3508,
        "shieldWord": "药材商人苏耐得"
    },
    "3509": {
        "id": 3509,
        "shieldWord": "药水"
    },
    "3510": {
        "id": 3510,
        "shieldWord": "野鶏"
    },
    "3511": {
        "id": 3511,
        "shieldWord": "叶菊兰"
    },
    "3512": {
        "id": 3512,
        "shieldWord": "夜话紫禁城"
    },
    "3513": {
        "id": 3513,
        "shieldWord": "一陀粪"
    },
    "3514": {
        "id": 3514,
        "shieldWord": "㈠"
    },
    "3515": {
        "id": 3515,
        "shieldWord": "伊莎贝尔"
    },
    "3516": {
        "id": 3516,
        "shieldWord": "伊斯兰亚格林尼斯"
    },
    "3517": {
        "id": 3517,
        "shieldWord": "遗精"
    },
    "3518": {
        "id": 3518,
        "shieldWord": "议长阿茵斯塔"
    },
    "3519": {
        "id": 3519,
        "shieldWord": "议员斯格文德"
    },
    "3520": {
        "id": 3520,
        "shieldWord": "异见人士"
    },
    "3521": {
        "id": 3521,
        "shieldWord": "异型叛军"
    },
    "3522": {
        "id": 3522,
        "shieldWord": "异议人士"
    },
    "3523": {
        "id": 3523,
        "shieldWord": "易丹轩"
    },
    "3524": {
        "id": 3524,
        "shieldWord": "意志不坚的图腾"
    },
    "3525": {
        "id": 3525,
        "shieldWord": "瘗"
    },
    "3526": {
        "id": 3526,
        "shieldWord": "阴门"
    },
    "3527": {
        "id": 3527,
        "shieldWord": "阴囊"
    },
    "3528": {
        "id": 3528,
        "shieldWord": "淫货"
    },
    "3529": {
        "id": 3529,
        "shieldWord": "尹庆民"
    },
    "3530": {
        "id": 3530,
        "shieldWord": "引导"
    },
    "3531": {
        "id": 3531,
        "shieldWord": "隐者之路"
    },
    "3532": {
        "id": 3532,
        "shieldWord": "鹰眼派氏族"
    },
    "3533": {
        "id": 3533,
        "shieldWord": "硬直图腾"
    },
    "3534": {
        "id": 3534,
        "shieldWord": "忧郁的埃拉"
    },
    "3535": {
        "id": 3535,
        "shieldWord": "尤比亚"
    },
    "3536": {
        "id": 3536,
        "shieldWord": "由喜贵"
    },
    "3537": {
        "id": 3537,
        "shieldWord": "游荡的僵尸"
    },
    "3538": {
        "id": 3538,
        "shieldWord": "游荡的士兵"
    },
    "3539": {
        "id": 3539,
        "shieldWord": "游荡爪牙"
    },
    "3540": {
        "id": 3540,
        "shieldWord": "游锡坤"
    },
    "3541": {
        "id": 3541,
        "shieldWord": "友好的鲁德"
    },
    "3542": {
        "id": 3542,
        "shieldWord": "幼龙"
    },
    "3543": {
        "id": 3543,
        "shieldWord": "于幼军"
    },
    "3544": {
        "id": 3544,
        "shieldWord": "余英时"
    },
    "3545": {
        "id": 3545,
        "shieldWord": "渔夫菲斯曼"
    },
    "3546": {
        "id": 3546,
        "shieldWord": "舆论"
    },
    "3547": {
        "id": 3547,
        "shieldWord": "舆论反制"
    },
    "3548": {
        "id": 3548,
        "shieldWord": "伛"
    },
    "3549": {
        "id": 3549,
        "shieldWord": "宇明网"
    },
    "3550": {
        "id": 3550,
        "shieldWord": "龉"
    },
    "3551": {
        "id": 3551,
        "shieldWord": "饫"
    },
    "3552": {
        "id": 3552,
        "shieldWord": "鹆"
    },
    "3553": {
        "id": 3553,
        "shieldWord": "元老兰提(沃德）"
    },
    "3554": {
        "id": 3554,
        "shieldWord": "缘圈圈"
    },
    "3555": {
        "id": 3555,
        "shieldWord": "远志明"
    },
    "3556": {
        "id": 3556,
        "shieldWord": "月经"
    },
    "3557": {
        "id": 3557,
        "shieldWord": "韫"
    },
    "3558": {
        "id": 3558,
        "shieldWord": "錾"
    },
    "3559": {
        "id": 3559,
        "shieldWord": "造爱"
    },
    "3560": {
        "id": 3560,
        "shieldWord": "则民"
    },
    "3561": {
        "id": 3561,
        "shieldWord": "择民"
    },
    "3562": {
        "id": 3562,
        "shieldWord": "泽夫"
    },
    "3563": {
        "id": 3563,
        "shieldWord": "泽民"
    },
    "3564": {
        "id": 3564,
        "shieldWord": "赜"
    },
    "3565": {
        "id": 3565,
        "shieldWord": "贼民"
    },
    "3566": {
        "id": 3566,
        "shieldWord": "谮"
    },
    "3567": {
        "id": 3567,
        "shieldWord": "扎卡维是英雄"
    },
    "3568": {
        "id": 3568,
        "shieldWord": "骣"
    },
    "3569": {
        "id": 3569,
        "shieldWord": "张伯笠"
    },
    "3570": {
        "id": 3570,
        "shieldWord": "张博雅"
    },
    "3571": {
        "id": 3571,
        "shieldWord": "张钢"
    },
    "3572": {
        "id": 3572,
        "shieldWord": "张健"
    },
    "3573": {
        "id": 3573,
        "shieldWord": "张林"
    },
    "3574": {
        "id": 3574,
        "shieldWord": "张清芳"
    },
    "3575": {
        "id": 3575,
        "shieldWord": "张伟国"
    },
    "3576": {
        "id": 3576,
        "shieldWord": "张温鹰"
    },
    "3577": {
        "id": 3577,
        "shieldWord": "张昭富"
    },
    "3578": {
        "id": 3578,
        "shieldWord": "张志清"
    },
    "3579": {
        "id": 3579,
        "shieldWord": "章孝严"
    },
    "3580": {
        "id": 3580,
        "shieldWord": "账号"
    },
    "3581": {
        "id": 3581,
        "shieldWord": "招鶏"
    },
    "3582": {
        "id": 3582,
        "shieldWord": "赵海青"
    },
    "3583": {
        "id": 3583,
        "shieldWord": "赵建铭"
    },
    "3584": {
        "id": 3584,
        "shieldWord": "赵南"
    },
    "3585": {
        "id": 3585,
        "shieldWord": "赵品潞"
    },
    "3586": {
        "id": 3586,
        "shieldWord": "赵晓微"
    },
    "3587": {
        "id": 3587,
        "shieldWord": "贞操"
    },
    "3588": {
        "id": 3588,
        "shieldWord": "争鸣论坛"
    },
    "3589": {
        "id": 3589,
        "shieldWord": "正见网"
    },
    "3590": {
        "id": 3590,
        "shieldWord": "正义党论坛"
    },
    "3591": {
        "id": 3591,
        "shieldWord": "㊣"
    },
    "3592": {
        "id": 3592,
        "shieldWord": "郑宝清"
    },
    "3593": {
        "id": 3593,
        "shieldWord": "郑丽文"
    },
    "3594": {
        "id": 3594,
        "shieldWord": "郑义"
    },
    "3595": {
        "id": 3595,
        "shieldWord": "郑余镇"
    },
    "3596": {
        "id": 3596,
        "shieldWord": "郑源"
    },
    "3597": {
        "id": 3597,
        "shieldWord": "郑运鹏"
    },
    "3598": {
        "id": 3598,
        "shieldWord": "政权"
    },
    "3599": {
        "id": 3599,
        "shieldWord": "絷"
    },
    "3600": {
        "id": 3600,
        "shieldWord": "踯"
    },
    "3601": {
        "id": 3601,
        "shieldWord": "指点江山论坛"
    },
    "3602": {
        "id": 3602,
        "shieldWord": "骘"
    },
    "3603": {
        "id": 3603,
        "shieldWord": "觯"
    },
    "3604": {
        "id": 3604,
        "shieldWord": "踬"
    },
    "3605": {
        "id": 3605,
        "shieldWord": "中毒的图腾"
    },
    "3606": {
        "id": 3606,
        "shieldWord": "中毒图腾"
    },
    "3607": {
        "id": 3607,
        "shieldWord": "中俄边界"
    },
    "3608": {
        "id": 3608,
        "shieldWord": "中国复兴论坛"
    },
    "3609": {
        "id": 3609,
        "shieldWord": "中国共产党"
    },
    "3610": {
        "id": 3610,
        "shieldWord": "中国孤儿院"
    },
    "3611": {
        "id": 3611,
        "shieldWord": "中国和平"
    },
    "3612": {
        "id": 3612,
        "shieldWord": "中国论坛"
    },
    "3613": {
        "id": 3613,
        "shieldWord": "中国社会进步党"
    },
    "3614": {
        "id": 3614,
        "shieldWord": "中国社会论坛"
    },
    "3615": {
        "id": 3615,
        "shieldWord": "中国威胁论"
    },
    "3616": {
        "id": 3616,
        "shieldWord": "中国问题论坛"
    },
    "3617": {
        "id": 3617,
        "shieldWord": "中国移动通信"
    },
    "3618": {
        "id": 3618,
        "shieldWord": "中国真实内容"
    },
    "3619": {
        "id": 3619,
        "shieldWord": "中华大地"
    },
    "3620": {
        "id": 3620,
        "shieldWord": "中华大众"
    },
    "3621": {
        "id": 3621,
        "shieldWord": "中华讲清"
    },
    "3622": {
        "id": 3622,
        "shieldWord": "中华民国"
    },
    "3623": {
        "id": 3623,
        "shieldWord": "中华人民实话实说"
    },
    "3624": {
        "id": 3624,
        "shieldWord": "中华人民正邪"
    },
    "3625": {
        "id": 3625,
        "shieldWord": "中华时事"
    },
    "3626": {
        "id": 3626,
        "shieldWord": "中华养生益智功"
    },
    "3627": {
        "id": 3627,
        "shieldWord": "中华真实报道"
    },
    "3628": {
        "id": 3628,
        "shieldWord": "钟山风雨论坛"
    },
    "3629": {
        "id": 3629,
        "shieldWord": "周锋锁"
    },
    "3630": {
        "id": 3630,
        "shieldWord": "周守训"
    },
    "3631": {
        "id": 3631,
        "shieldWord": "朱凤芝"
    },
    "3632": {
        "id": 3632,
        "shieldWord": "朱立伦"
    },
    "3633": {
        "id": 3633,
        "shieldWord": "㈱"
    },
    "3634": {
        "id": 3634,
        "shieldWord": "主攻指挥官"
    },
    "3635": {
        "id": 3635,
        "shieldWord": "主义"
    },
    "3636": {
        "id": 3636,
        "shieldWord": "助手威尔特"
    },
    "3637": {
        "id": 3637,
        "shieldWord": "转化"
    },
    "3638": {
        "id": 3638,
        "shieldWord": "资本主义"
    },
    "3639": {
        "id": 3639,
        "shieldWord": "鲰"
    },
    "3640": {
        "id": 3640,
        "shieldWord": "胡总书记"
    },
    "3641": {
        "id": 3641,
        "shieldWord": "胡景涛"
    },
    "3642": {
        "id": 3642,
        "shieldWord": "燕玲论坛"
    },
    "3643": {
        "id": 3643,
        "shieldWord": "urban"
    },
    "3644": {
        "id": 3644,
        "shieldWord": "cao"
    },
    "3645": {
        "id": 3645,
        "shieldWord": "urban-rivals"
    },
    "3646": {
        "id": 3646,
        "shieldWord": "rivals"
    },
    "3647": {
        "id": 3647,
        "shieldWord": "UR"
    },
    "3648": {
        "id": 3648,
        "shieldWord": "牛B"
    },
    "3649": {
        "id": 3649,
        "shieldWord": "牛比"
    },
    "3650": {
        "id": 3650,
        "shieldWord": "不玩了"
    },
    "3651": {
        "id": 3651,
        "shieldWord": "删号"
    },
    "3652": {
        "id": 3652,
        "shieldWord": "卖号"
    },
    "3653": {
        "id": 3653,
        "shieldWord": "删号"
    },
    "3654": {
        "id": 3654,
        "shieldWord": "T.M.D"
    },
    "3655": {
        "id": 3655,
        "shieldWord": "出售账号"
    },
    "3656": {
        "id": 3656,
        "shieldWord": "出售此号"
    },
    "3657": {
        "id": 3657,
        "shieldWord": "U/R"
    },
    "3658": {
        "id": 3658,
        "shieldWord": "U-R"
    },
    "3659": {
        "id": 3659,
        "shieldWord": "8仙"
    },
    "3660": {
        "id": 3660,
        "shieldWord": "出售神符"
    },
    "3661": {
        "id": 3661,
        "shieldWord": "黄色"
    },
    "3662": {
        "id": 3662,
        "shieldWord": "NPC"
    },
    "3663": {
        "id": 3663,
        "shieldWord": "*法*轮*功*"
    },
    "3664": {
        "id": 3664,
        "shieldWord": "*李*洪*志*阿扁"
    },
    "3665": {
        "id": 3665,
        "shieldWord": "阿拉"
    },
    "3666": {
        "id": 3666,
        "shieldWord": "挨球"
    },
    "3667": {
        "id": 3667,
        "shieldWord": "安全局"
    },
    "3668": {
        "id": 3668,
        "shieldWord": "澳洲光明网"
    },
    "3669": {
        "id": 3669,
        "shieldWord": "八九"
    },
    "3670": {
        "id": 3670,
        "shieldWord": "八九风波"
    },
    "3671": {
        "id": 3671,
        "shieldWord": "办理文凭"
    },
    "3672": {
        "id": 3672,
        "shieldWord": "办理证件"
    },
    "3673": {
        "id": 3673,
        "shieldWord": "包皮"
    },
    "3674": {
        "id": 3674,
        "shieldWord": "保监会"
    },
    "3675": {
        "id": 3675,
        "shieldWord": "保密局"
    },
    "3676": {
        "id": 3676,
        "shieldWord": "鸨"
    },
    "3677": {
        "id": 3677,
        "shieldWord": "鲍岳桥"
    },
    "3678": {
        "id": 3678,
        "shieldWord": "暴动"
    },
    "3679": {
        "id": 3679,
        "shieldWord": "暴徒"
    },
    "3680": {
        "id": 3680,
        "shieldWord": "北京之春"
    },
    "3681": {
        "id": 3681,
        "shieldWord": "贝肉"
    },
    "3682": {
        "id": 3682,
        "shieldWord": "本?拉登"
    },
    "3683": {
        "id": 3683,
        "shieldWord": "苯比"
    },
    "3684": {
        "id": 3684,
        "shieldWord": "笨屄"
    },
    "3685": {
        "id": 3685,
        "shieldWord": "笨逼"
    },
    "3686": {
        "id": 3686,
        "shieldWord": "逼你老母"
    },
    "3687": {
        "id": 3687,
        "shieldWord": "比毛"
    },
    "3688": {
        "id": 3688,
        "shieldWord": "波霸"
    },
    "3689": {
        "id": 3689,
        "shieldWord": "薄一波"
    },
    "3690": {
        "id": 3690,
        "shieldWord": "布雷尔"
    },
    "3691": {
        "id": 3691,
        "shieldWord": "财政部"
    },
    "3692": {
        "id": 3692,
        "shieldWord": "参事室"
    },
    "3693": {
        "id": 3693,
        "shieldWord": "操GM"
    },
    "3694": {
        "id": 3694,
        "shieldWord": "操XX"
    },
    "3695": {
        "id": 3695,
        "shieldWord": "交媾"
    },
    "3696": {
        "id": 3696,
        "shieldWord": "CAO"
    },
    "3697": {
        "id": 3697,
        "shieldWord": "K粉"
    },
    "3698": {
        "id": 3698,
        "shieldWord": "J8"
    },
    "3699": {
        "id": 3699,
        "shieldWord": "小姐兼职"
    },
    "3700": {
        "id": 3700,
        "shieldWord": "交媾"
    },
    "3701": {
        "id": 3701,
        "shieldWord": "西藏314事件"
    },
    "3702": {
        "id": 3702,
        "shieldWord": "新疆7.5事件"
    },
    "3703": {
        "id": 3703,
        "shieldWord": "乱伦"
    },
    "3704": {
        "id": 3704,
        "shieldWord": "毛片"
    },
    "3705": {
        "id": 3705,
        "shieldWord": "黄片"
    },
    "3706": {
        "id": 3706,
        "shieldWord": "交配"
    },
    "3707": {
        "id": 3707,
        "shieldWord": "群交"
    },
    "3708": {
        "id": 3708,
        "shieldWord": "小姐兼职"
    },
    "3709": {
        "id": 3709,
        "shieldWord": "茉莉花革命"
    },
    "3710": {
        "id": 3710,
        "shieldWord": "操你八辈祖宗"
    },
    "3711": {
        "id": 3711,
        "shieldWord": "操你妈屄"
    },
    "3712": {
        "id": 3712,
        "shieldWord": "草的你妈"
    },
    "3713": {
        "id": 3713,
        "shieldWord": "草妈"
    },
    "3714": {
        "id": 3714,
        "shieldWord": "测绘局"
    },
    "3715": {
        "id": 3715,
        "shieldWord": "插GM"
    },
    "3716": {
        "id": 3716,
        "shieldWord": "插深些"
    },
    "3717": {
        "id": 3717,
        "shieldWord": "产权局"
    },
    "3718": {
        "id": 3718,
        "shieldWord": "车臣"
    },
    "3719": {
        "id": 3719,
        "shieldWord": "陈功"
    },
    "3720": {
        "id": 3720,
        "shieldWord": "陈晓宁"
    },
    "3721": {
        "id": 3721,
        "shieldWord": "成人电影"
    },
    "3722": {
        "id": 3722,
        "shieldWord": "吃大便"
    },
    "3723": {
        "id": 3723,
        "shieldWord": "吃屎"
    },
    "3724": {
        "id": 3724,
        "shieldWord": "迟浩田"
    },
    "3725": {
        "id": 3725,
        "shieldWord": "抽你丫的"
    },
    "3726": {
        "id": 3726,
        "shieldWord": "臭化西"
    },
    "3727": {
        "id": 3727,
        "shieldWord": "出售假币"
    },
    "3728": {
        "id": 3728,
        "shieldWord": "出售枪支"
    },
    "3729": {
        "id": 3729,
        "shieldWord": "出售手枪"
    },
    "3730": {
        "id": 3730,
        "shieldWord": "吹喇叭"
    },
    "3731": {
        "id": 3731,
        "shieldWord": "蠢猪"
    },
    "3732": {
        "id": 3732,
        "shieldWord": "戳你"
    },
    "3733": {
        "id": 3733,
        "shieldWord": "粗制吗啡"
    },
    "3734": {
        "id": 3734,
        "shieldWord": "催情药"
    },
    "3735": {
        "id": 3735,
        "shieldWord": "大逼"
    },
    "3736": {
        "id": 3736,
        "shieldWord": "大波波"
    },
    "3737": {
        "id": 3737,
        "shieldWord": "大麻树脂"
    },
    "3738": {
        "id": 3738,
        "shieldWord": "大麻油"
    },
    "3739": {
        "id": 3739,
        "shieldWord": "大师"
    },
    "3740": {
        "id": 3740,
        "shieldWord": "大学骚乱"
    },
    "3741": {
        "id": 3741,
        "shieldWord": "大血B"
    },
    "3742": {
        "id": 3742,
        "shieldWord": "呆卵"
    },
    "3743": {
        "id": 3743,
        "shieldWord": "戴海静"
    },
    "3744": {
        "id": 3744,
        "shieldWord": "戴红"
    },
    "3745": {
        "id": 3745,
        "shieldWord": "戴晶"
    },
    "3746": {
        "id": 3746,
        "shieldWord": "党主席"
    },
    "3747": {
        "id": 3747,
        "shieldWord": "档案局"
    },
    "3748": {
        "id": 3748,
        "shieldWord": "电监会"
    },
    "3749": {
        "id": 3749,
        "shieldWord": "叼你"
    },
    "3750": {
        "id": 3750,
        "shieldWord": "屌7"
    },
    "3751": {
        "id": 3751,
        "shieldWord": "屌鸠"
    },
    "3752": {
        "id": 3752,
        "shieldWord": "屌毛"
    },
    "3753": {
        "id": 3753,
        "shieldWord": "屌七"
    },
    "3754": {
        "id": 3754,
        "shieldWord": "屌西"
    },
    "3755": {
        "id": 3755,
        "shieldWord": "钓鱼台"
    },
    "3756": {
        "id": 3756,
        "shieldWord": "丁子霖"
    },
    "3757": {
        "id": 3757,
        "shieldWord": "东突暴动和独立"
    },
    "3758": {
        "id": 3758,
        "shieldWord": "东突组织"
    },
    "3759": {
        "id": 3759,
        "shieldWord": "董建华"
    },
    "3760": {
        "id": 3760,
        "shieldWord": "董贱华"
    },
    "3761": {
        "id": 3761,
        "shieldWord": "董文华"
    },
    "3762": {
        "id": 3762,
        "shieldWord": "懂文华"
    },
    "3763": {
        "id": 3763,
        "shieldWord": "独立"
    },
    "3764": {
        "id": 3764,
        "shieldWord": "二屄"
    },
    "3765": {
        "id": 3765,
        "shieldWord": "二乙基酰胺发抡"
    },
    "3766": {
        "id": 3766,
        "shieldWord": "法(轮)功"
    },
    "3767": {
        "id": 3767,
        "shieldWord": "法*轮*功"
    },
    "3768": {
        "id": 3768,
        "shieldWord": "法功"
    },
    "3769": {
        "id": 3769,
        "shieldWord": "法愣"
    },
    "3770": {
        "id": 3770,
        "shieldWord": "法西斯"
    },
    "3771": {
        "id": 3771,
        "shieldWord": "法制办"
    },
    "3772": {
        "id": 3772,
        "shieldWord": "反动"
    },
    "3773": {
        "id": 3773,
        "shieldWord": "反革命"
    },
    "3774": {
        "id": 3774,
        "shieldWord": "发票"
    },
    "3775": {
        "id": 3775,
        "shieldWord": "冰粉"
    },
    "3776": {
        "id": 3776,
        "shieldWord": "性奴"
    },
    "3777": {
        "id": 3777,
        "shieldWord": "反共"
    },
    "3778": {
        "id": 3778,
        "shieldWord": "反华"
    },
    "3779": {
        "id": 3779,
        "shieldWord": "反恐委员会"
    },
    "3780": {
        "id": 3780,
        "shieldWord": "反日"
    },
    "3781": {
        "id": 3781,
        "shieldWord": "反政府"
    },
    "3782": {
        "id": 3782,
        "shieldWord": "分裂祖国"
    },
    "3783": {
        "id": 3783,
        "shieldWord": "佛展千手法"
    },
    "3784": {
        "id": 3784,
        "shieldWord": "斧头镰刀"
    },
    "3785": {
        "id": 3785,
        "shieldWord": "傅鹏"
    },
    "3786": {
        "id": 3786,
        "shieldWord": "干GM"
    },
    "3787": {
        "id": 3787,
        "shieldWord": "干拎娘"
    },
    "3788": {
        "id": 3788,
        "shieldWord": "干妳老母"
    },
    "3789": {
        "id": 3789,
        "shieldWord": "干妳妈"
    },
    "3790": {
        "id": 3790,
        "shieldWord": "干妳娘"
    },
    "3791": {
        "id": 3791,
        "shieldWord": "干你妈"
    },
    "3792": {
        "id": 3792,
        "shieldWord": "干你妈b"
    },
    "3793": {
        "id": 3793,
        "shieldWord": "干你妈逼"
    },
    "3794": {
        "id": 3794,
        "shieldWord": "肛"
    },
    "3795": {
        "id": 3795,
        "shieldWord": "港澳办"
    },
    "3796": {
        "id": 3796,
        "shieldWord": "高俊"
    },
    "3797": {
        "id": 3797,
        "shieldWord": "高校暴乱"
    },
    "3798": {
        "id": 3798,
        "shieldWord": "高校群体事件"
    },
    "3799": {
        "id": 3799,
        "shieldWord": "高校骚乱"
    },
    "3800": {
        "id": 3800,
        "shieldWord": "睾"
    },
    "3801": {
        "id": 3801,
        "shieldWord": "弓虽女干"
    },
    "3802": {
        "id": 3802,
        "shieldWord": "公安"
    },
    "3803": {
        "id": 3803,
        "shieldWord": "公安部"
    },
    "3804": {
        "id": 3804,
        "shieldWord": "公安局"
    },
    "3805": {
        "id": 3805,
        "shieldWord": "共狗"
    },
    "3806": {
        "id": 3806,
        "shieldWord": "狗卵"
    },
    "3807": {
        "id": 3807,
        "shieldWord": "狗屁"
    },
    "3808": {
        "id": 3808,
        "shieldWord": "狗日的"
    },
    "3809": {
        "id": 3809,
        "shieldWord": "官逼民反"
    },
    "3810": {
        "id": 3810,
        "shieldWord": "官商勾结"
    },
    "3811": {
        "id": 3811,
        "shieldWord": "鬼村"
    },
    "3812": {
        "id": 3812,
        "shieldWord": "滚"
    },
    "3813": {
        "id": 3813,
        "shieldWord": "国安局"
    },
    "3814": {
        "id": 3814,
        "shieldWord": "国防部"
    },
    "3815": {
        "id": 3815,
        "shieldWord": "国防科工委"
    },
    "3816": {
        "id": 3816,
        "shieldWord": "国管局"
    },
    "3817": {
        "id": 3817,
        "shieldWord": "国际法院"
    },
    "3818": {
        "id": 3818,
        "shieldWord": "国家民委"
    },
    "3819": {
        "id": 3819,
        "shieldWord": "国家主席"
    },
    "3820": {
        "id": 3820,
        "shieldWord": "国家主要部委"
    },
    "3821": {
        "id": 3821,
        "shieldWord": "国民党"
    },
    "3822": {
        "id": 3822,
        "shieldWord": "国民党万岁"
    },
    "3823": {
        "id": 3823,
        "shieldWord": "海洋局"
    },
    "3824": {
        "id": 3824,
        "shieldWord": "何候华"
    },
    "3825": {
        "id": 3825,
        "shieldWord": "红卫兵"
    },
    "3826": {
        "id": 3826,
        "shieldWord": "洪志"
    },
    "3827": {
        "id": 3827,
        "shieldWord": "胡XX"
    },
    "3828": {
        "id": 3828,
        "shieldWord": "胡紧涛"
    },
    "3829": {
        "id": 3829,
        "shieldWord": "胡紧套"
    },
    "3830": {
        "id": 3830,
        "shieldWord": "花柳"
    },
    "3831": {
        "id": 3831,
        "shieldWord": "换妻"
    },
    "3832": {
        "id": 3832,
        "shieldWord": "黄　菊"
    },
    "3833": {
        "id": 3833,
        "shieldWord": "黄色小电影"
    },
    "3834": {
        "id": 3834,
        "shieldWord": "回族人吃猪肉"
    },
    "3835": {
        "id": 3835,
        "shieldWord": "昏药"
    },
    "3836": {
        "id": 3836,
        "shieldWord": "火棒"
    },
    "3837": {
        "id": 3837,
        "shieldWord": "基督"
    },
    "3838": {
        "id": 3838,
        "shieldWord": "激情小电影"
    },
    "3839": {
        "id": 3839,
        "shieldWord": "鸡"
    },
    "3840": {
        "id": 3840,
        "shieldWord": "计牌软件"
    },
    "3841": {
        "id": 3841,
        "shieldWord": "计生委"
    },
    "3842": {
        "id": 3842,
        "shieldWord": "妓"
    },
    "3843": {
        "id": 3843,
        "shieldWord": "妓院"
    },
    "3844": {
        "id": 3844,
        "shieldWord": "奸"
    },
    "3845": {
        "id": 3845,
        "shieldWord": "奸夫淫妇"
    },
    "3846": {
        "id": 3846,
        "shieldWord": "奸你"
    },
    "3847": {
        "id": 3847,
        "shieldWord": "江Core"
    },
    "3848": {
        "id": 3848,
        "shieldWord": "江八"
    },
    "3849": {
        "id": 3849,
        "shieldWord": "江独裁"
    },
    "3850": {
        "id": 3850,
        "shieldWord": "江核心"
    },
    "3851": {
        "id": 3851,
        "shieldWord": "江择民"
    },
    "3852": {
        "id": 3852,
        "shieldWord": "江折民"
    },
    "3853": {
        "id": 3853,
        "shieldWord": "江猪"
    },
    "3854": {
        "id": 3854,
        "shieldWord": "江主席"
    },
    "3855": {
        "id": 3855,
        "shieldWord": "交通部"
    },
    "3856": {
        "id": 3856,
        "shieldWord": "姣西"
    },
    "3857": {
        "id": 3857,
        "shieldWord": "叫小姐"
    },
    "3858": {
        "id": 3858,
        "shieldWord": "教育部"
    },
    "3859": {
        "id": 3859,
        "shieldWord": "她妈的金日成"
    },
    "3860": {
        "id": 3860,
        "shieldWord": "禁书"
    },
    "3861": {
        "id": 3861,
        "shieldWord": "经济社会理事会"
    },
    "3862": {
        "id": 3862,
        "shieldWord": "经社理事会"
    },
    "3863": {
        "id": 3863,
        "shieldWord": "警匪一家"
    },
    "3864": {
        "id": 3864,
        "shieldWord": "敬国神社"
    },
    "3865": {
        "id": 3865,
        "shieldWord": "静坐"
    },
    "3866": {
        "id": 3866,
        "shieldWord": "纠察员"
    },
    "3867": {
        "id": 3867,
        "shieldWord": "鸠"
    },
    "3868": {
        "id": 3868,
        "shieldWord": "鸠屎"
    },
    "3869": {
        "id": 3869,
        "shieldWord": "军长发威"
    },
    "3870": {
        "id": 3870,
        "shieldWord": "军国主义"
    },
    "3871": {
        "id": 3871,
        "shieldWord": "靠"
    },
    "3872": {
        "id": 3872,
        "shieldWord": "靠腰"
    },
    "3873": {
        "id": 3873,
        "shieldWord": "可待因"
    },
    "3874": {
        "id": 3874,
        "shieldWord": "可卡叶"
    },
    "3875": {
        "id": 3875,
        "shieldWord": "恐怖份子"
    },
    "3876": {
        "id": 3876,
        "shieldWord": "寇晓伟"
    },
    "3877": {
        "id": 3877,
        "shieldWord": "狂操你全家"
    },
    "3878": {
        "id": 3878,
        "shieldWord": "拉登"
    },
    "3879": {
        "id": 3879,
        "shieldWord": "烂屄"
    },
    "3880": {
        "id": 3880,
        "shieldWord": "烂屌"
    },
    "3881": {
        "id": 3881,
        "shieldWord": "劳+教+所"
    },
    "3882": {
        "id": 3882,
        "shieldWord": "劳动保障部"
    },
    "3883": {
        "id": 3883,
        "shieldWord": "老逼"
    },
    "3884": {
        "id": 3884,
        "shieldWord": "老母"
    },
    "3885": {
        "id": 3885,
        "shieldWord": "黎阳评"
    },
    "3886": {
        "id": 3886,
        "shieldWord": "李弘旨"
    },
    "3887": {
        "id": 3887,
        "shieldWord": "李红志"
    },
    "3888": {
        "id": 3888,
        "shieldWord": "李宏旨"
    },
    "3889": {
        "id": 3889,
        "shieldWord": "李宏志"
    },
    "3890": {
        "id": 3890,
        "shieldWord": "李鹏*"
    },
    "3891": {
        "id": 3891,
        "shieldWord": "李山"
    },
    "3892": {
        "id": 3892,
        "shieldWord": "李先念"
    },
    "3893": {
        "id": 3893,
        "shieldWord": "联大"
    },
    "3894": {
        "id": 3894,
        "shieldWord": "联合国"
    },
    "3895": {
        "id": 3895,
        "shieldWord": "联合国大会"
    },
    "3896": {
        "id": 3896,
        "shieldWord": "联易"
    },
    "3897": {
        "id": 3897,
        "shieldWord": "联易互动"
    },
    "3898": {
        "id": 3898,
        "shieldWord": "粮食局"
    },
    "3899": {
        "id": 3899,
        "shieldWord": "两腿之间"
    },
    "3900": {
        "id": 3900,
        "shieldWord": "林业局"
    },
    "3901": {
        "id": 3901,
        "shieldWord": "刘　淇"
    },
    "3902": {
        "id": 3902,
        "shieldWord": "刘军"
    },
    "3903": {
        "id": 3903,
        "shieldWord": "流氓"
    },
    "3904": {
        "id": 3904,
        "shieldWord": "六.四"
    },
    "3905": {
        "id": 3905,
        "shieldWord": "六。四"
    },
    "3906": {
        "id": 3906,
        "shieldWord": "六?四"
    },
    "3907": {
        "id": 3907,
        "shieldWord": "六合彩"
    },
    "3908": {
        "id": 3908,
        "shieldWord": "六-四"
    },
    "3909": {
        "id": 3909,
        "shieldWord": "六四事件"
    },
    "3910": {
        "id": 3910,
        "shieldWord": "六四真相"
    },
    "3911": {
        "id": 3911,
        "shieldWord": "龙新民"
    },
    "3912": {
        "id": 3912,
        "shieldWord": "旅游局"
    },
    "3913": {
        "id": 3913,
        "shieldWord": "卵"
    },
    "3914": {
        "id": 3914,
        "shieldWord": "罗　干"
    },
    "3915": {
        "id": 3915,
        "shieldWord": "骡干"
    },
    "3916": {
        "id": 3916,
        "shieldWord": "妈卖妈屁"
    },
    "3917": {
        "id": 3917,
        "shieldWord": "妈祖"
    },
    "3918": {
        "id": 3918,
        "shieldWord": "麻醉钢枪"
    },
    "3919": {
        "id": 3919,
        "shieldWord": "麻醉枪"
    },
    "3920": {
        "id": 3920,
        "shieldWord": "麻醉药"
    },
    "3921": {
        "id": 3921,
        "shieldWord": "麻醉乙醚"
    },
    "3922": {
        "id": 3922,
        "shieldWord": "马卖马屁"
    },
    "3923": {
        "id": 3923,
        "shieldWord": "吗啡碱"
    },
    "3924": {
        "id": 3924,
        "shieldWord": "吗啡片"
    },
    "3925": {
        "id": 3925,
        "shieldWord": "买财富"
    },
    "3926": {
        "id": 3926,
        "shieldWord": "买卖枪支"
    },
    "3927": {
        "id": 3927,
        "shieldWord": "麦角酸"
    },
    "3928": {
        "id": 3928,
        "shieldWord": "卖.国"
    },
    "3929": {
        "id": 3929,
        "shieldWord": "卖B"
    },
    "3930": {
        "id": 3930,
        "shieldWord": "卖ID"
    },
    "3931": {
        "id": 3931,
        "shieldWord": "卖QQ"
    },
    "3932": {
        "id": 3932,
        "shieldWord": "卖财富"
    },
    "3933": {
        "id": 3933,
        "shieldWord": "卖党求荣"
    },
    "3934": {
        "id": 3934,
        "shieldWord": "卖国求荣"
    },
    "3935": {
        "id": 3935,
        "shieldWord": "卖卡"
    },
    "3936": {
        "id": 3936,
        "shieldWord": "卖软件"
    },
    "3937": {
        "id": 3937,
        "shieldWord": "毛XX"
    },
    "3938": {
        "id": 3938,
        "shieldWord": "毛一鲜"
    },
    "3939": {
        "id": 3939,
        "shieldWord": "梅花网"
    },
    "3940": {
        "id": 3940,
        "shieldWord": "美利坚"
    },
    "3941": {
        "id": 3941,
        "shieldWord": "蒙尘药"
    },
    "3942": {
        "id": 3942,
        "shieldWord": "迷魂药"
    },
    "3943": {
        "id": 3943,
        "shieldWord": "迷奸药"
    },
    "3944": {
        "id": 3944,
        "shieldWord": "迷歼药"
    },
    "3945": {
        "id": 3945,
        "shieldWord": "密洞"
    },
    "3946": {
        "id": 3946,
        "shieldWord": "民航局"
    },
    "3947": {
        "id": 3947,
        "shieldWord": "民政部"
    },
    "3948": {
        "id": 3948,
        "shieldWord": "莫索里尼"
    },
    "3949": {
        "id": 3949,
        "shieldWord": "妳老母的"
    },
    "3950": {
        "id": 3950,
        "shieldWord": "妳妈的"
    },
    "3951": {
        "id": 3951,
        "shieldWord": "妳马的"
    },
    "3952": {
        "id": 3952,
        "shieldWord": "妳娘的"
    },
    "3953": {
        "id": 3953,
        "shieldWord": "南联盟"
    },
    "3954": {
        "id": 3954,
        "shieldWord": "伱妈"
    },
    "3955": {
        "id": 3955,
        "shieldWord": "你二大爷"
    },
    "3956": {
        "id": 3956,
        "shieldWord": "你老母"
    },
    "3957": {
        "id": 3957,
        "shieldWord": "你老味"
    },
    "3958": {
        "id": 3958,
        "shieldWord": "你姥"
    },
    "3959": {
        "id": 3959,
        "shieldWord": "你姥姥的"
    },
    "3960": {
        "id": 3960,
        "shieldWord": "你爷爷的"
    },
    "3961": {
        "id": 3961,
        "shieldWord": "鸟GM"
    },
    "3962": {
        "id": 3962,
        "shieldWord": "鸟你"
    },
    "3963": {
        "id": 3963,
        "shieldWord": "农业部"
    },
    "3964": {
        "id": 3964,
        "shieldWord": "虐待"
    },
    "3965": {
        "id": 3965,
        "shieldWord": "拍肩神药"
    },
    "3966": {
        "id": 3966,
        "shieldWord": "彭真"
    },
    "3967": {
        "id": 3967,
        "shieldWord": "皮条"
    },
    "3968": {
        "id": 3968,
        "shieldWord": "嫖客"
    },
    "3969": {
        "id": 3969,
        "shieldWord": "苹果日报"
    },
    "3970": {
        "id": 3970,
        "shieldWord": "破坏"
    },
    "3971": {
        "id": 3971,
        "shieldWord": "仆街"
    },
    "3972": {
        "id": 3972,
        "shieldWord": "气象局"
    },
    "3973": {
        "id": 3973,
        "shieldWord": "枪决女犯"
    },
    "3974": {
        "id": 3974,
        "shieldWord": "枪决现场"
    },
    "3975": {
        "id": 3975,
        "shieldWord": "强奸犯"
    },
    "3976": {
        "id": 3976,
        "shieldWord": "强卫"
    },
    "3977": {
        "id": 3977,
        "shieldWord": "强效失意药"
    },
    "3978": {
        "id": 3978,
        "shieldWord": "强硬发言"
    },
    "3979": {
        "id": 3979,
        "shieldWord": "侨办"
    },
    "3980": {
        "id": 3980,
        "shieldWord": "切七"
    },
    "3981": {
        "id": 3981,
        "shieldWord": "窃听器"
    },
    "3982": {
        "id": 3982,
        "shieldWord": "窃听器材"
    },
    "3983": {
        "id": 3983,
        "shieldWord": "青天白日"
    },
    "3984": {
        "id": 3984,
        "shieldWord": "去死"
    },
    "3985": {
        "id": 3985,
        "shieldWord": "人大"
    },
    "3986": {
        "id": 3986,
        "shieldWord": "人大代表"
    },
    "3987": {
        "id": 3987,
        "shieldWord": "人代会"
    },
    "3988": {
        "id": 3988,
        "shieldWord": "人弹"
    },
    "3989": {
        "id": 3989,
        "shieldWord": "人民"
    },
    "3990": {
        "id": 3990,
        "shieldWord": "人民广场"
    },
    "3991": {
        "id": 3991,
        "shieldWord": "人民日报"
    },
    "3992": {
        "id": 3992,
        "shieldWord": "人民银行"
    },
    "3993": {
        "id": 3993,
        "shieldWord": "人体炸弹"
    },
    "3994": {
        "id": 3994,
        "shieldWord": "日GM"
    },
    "3995": {
        "id": 3995,
        "shieldWord": "日X妈"
    },
    "3996": {
        "id": 3996,
        "shieldWord": "日本RING"
    },
    "3997": {
        "id": 3997,
        "shieldWord": "日本鬼子"
    },
    "3998": {
        "id": 3998,
        "shieldWord": "日你娘"
    },
    "3999": {
        "id": 3999,
        "shieldWord": "日他娘"
    },
    "4000": {
        "id": 4000,
        "shieldWord": "肉壁"
    },
    "4001": {
        "id": 4001,
        "shieldWord": "肉棍子"
    },
    "4002": {
        "id": 4002,
        "shieldWord": "乳"
    },
    "4003": {
        "id": 4003,
        "shieldWord": "乳波臀浪"
    },
    "4004": {
        "id": 4004,
        "shieldWord": "撒尿"
    },
    "4005": {
        "id": 4005,
        "shieldWord": "塞白"
    },
    "4006": {
        "id": 4006,
        "shieldWord": "塞你爸"
    },
    "4007": {
        "id": 4007,
        "shieldWord": "塞你公"
    },
    "4008": {
        "id": 4008,
        "shieldWord": "塞你老母"
    },
    "4009": {
        "id": 4009,
        "shieldWord": "塞你老师"
    },
    "4010": {
        "id": 4010,
        "shieldWord": "塞你母"
    },
    "4011": {
        "id": 4011,
        "shieldWord": "塞你娘"
    },
    "4012": {
        "id": 4012,
        "shieldWord": "三个呆婊"
    },
    "4013": {
        "id": 4013,
        "shieldWord": "三个代婊"
    },
    "4014": {
        "id": 4014,
        "shieldWord": "三民主义"
    },
    "4015": {
        "id": 4015,
        "shieldWord": "三陪女"
    },
    "4016": {
        "id": 4016,
        "shieldWord": "三去车仑"
    },
    "4017": {
        "id": 4017,
        "shieldWord": "三唑仑"
    },
    "4018": {
        "id": 4018,
        "shieldWord": "骚"
    },
    "4019": {
        "id": 4019,
        "shieldWord": "色情电影"
    },
    "4020": {
        "id": 4020,
        "shieldWord": "色情服务"
    },
    "4021": {
        "id": 4021,
        "shieldWord": "色情小电影"
    },
    "4022": {
        "id": 4022,
        "shieldWord": "傻屄"
    },
    "4023": {
        "id": 4023,
        "shieldWord": "傻比"
    },
    "4024": {
        "id": 4024,
        "shieldWord": "傻吊"
    },
    "4025": {
        "id": 4025,
        "shieldWord": "傻卵"
    },
    "4026": {
        "id": 4026,
        "shieldWord": "傻子"
    },
    "4027": {
        "id": 4027,
        "shieldWord": "煞逼"
    },
    "4028": {
        "id": 4028,
        "shieldWord": "商务部"
    },
    "4029": {
        "id": 4029,
        "shieldWord": "上妳"
    },
    "4030": {
        "id": 4030,
        "shieldWord": "上你"
    },
    "4031": {
        "id": 4031,
        "shieldWord": "社科院"
    },
    "4032": {
        "id": 4032,
        "shieldWord": "射精"
    },
    "4033": {
        "id": 4033,
        "shieldWord": "身份生成器"
    },
    "4034": {
        "id": 4034,
        "shieldWord": "神通加持法"
    },
    "4035": {
        "id": 4035,
        "shieldWord": "生鸦片"
    },
    "4036": {
        "id": 4036,
        "shieldWord": "圣女峰"
    },
    "4037": {
        "id": 4037,
        "shieldWord": "十年动乱石进"
    },
    "4038": {
        "id": 4038,
        "shieldWord": "食捻屎"
    },
    "4039": {
        "id": 4039,
        "shieldWord": "食屎"
    },
    "4040": {
        "id": 4040,
        "shieldWord": "驶你爸"
    },
    "4041": {
        "id": 4041,
        "shieldWord": "驶你公"
    },
    "4042": {
        "id": 4042,
        "shieldWord": "驶你老母"
    },
    "4043": {
        "id": 4043,
        "shieldWord": "驶你老师"
    },
    "4044": {
        "id": 4044,
        "shieldWord": "驶你母"
    },
    "4045": {
        "id": 4045,
        "shieldWord": "驶你娘"
    },
    "4046": {
        "id": 4046,
        "shieldWord": "是鸡"
    },
    "4047": {
        "id": 4047,
        "shieldWord": "受虐狂"
    },
    "4048": {
        "id": 4048,
        "shieldWord": "售ID"
    },
    "4049": {
        "id": 4049,
        "shieldWord": "售号"
    },
    "4050": {
        "id": 4050,
        "shieldWord": "售软件"
    },
    "4051": {
        "id": 4051,
        "shieldWord": "双峰微颤"
    },
    "4052": {
        "id": 4052,
        "shieldWord": "氵去"
    },
    "4053": {
        "id": 4053,
        "shieldWord": "水利部"
    },
    "4054": {
        "id": 4054,
        "shieldWord": "水去车仑"
    },
    "4055": {
        "id": 4055,
        "shieldWord": "税务总局"
    },
    "4056": {
        "id": 4056,
        "shieldWord": "司法部"
    },
    "4057": {
        "id": 4057,
        "shieldWord": "私/服"
    },
    "4058": {
        "id": 4058,
        "shieldWord": "私\\\\服"
    },
    "4059": {
        "id": 4059,
        "shieldWord": "私-服"
    },
    "4060": {
        "id": 4060,
        "shieldWord": "私—服"
    },
    "4061": {
        "id": 4061,
        "shieldWord": "死gd"
    },
    "4062": {
        "id": 4062,
        "shieldWord": "死gm"
    },
    "4063": {
        "id": 4063,
        "shieldWord": "死全家"
    },
    "4064": {
        "id": 4064,
        "shieldWord": "宋祖英"
    },
    "4065": {
        "id": 4065,
        "shieldWord": "他爹"
    },
    "4066": {
        "id": 4066,
        "shieldWord": "他马的"
    },
    "4067": {
        "id": 4067,
        "shieldWord": "他祖宗"
    },
    "4068": {
        "id": 4068,
        "shieldWord": "台办"
    },
    "4069": {
        "id": 4069,
        "shieldWord": "台湾党"
    },
    "4070": {
        "id": 4070,
        "shieldWord": "台湾共和国"
    },
    "4071": {
        "id": 4071,
        "shieldWord": "天皇陛下"
    },
    "4072": {
        "id": 4072,
        "shieldWord": "舔西"
    },
    "4073": {
        "id": 4073,
        "shieldWord": "投毒杀人"
    },
    "4074": {
        "id": 4074,
        "shieldWord": "透视软件"
    },
    "4075": {
        "id": 4075,
        "shieldWord": "推油"
    },
    "4076": {
        "id": 4076,
        "shieldWord": "外　挂"
    },
    "4077": {
        "id": 4077,
        "shieldWord": "外/挂"
    },
    "4078": {
        "id": 4078,
        "shieldWord": "外\\\\挂"
    },
    "4079": {
        "id": 4079,
        "shieldWord": "外_挂"
    },
    "4080": {
        "id": 4080,
        "shieldWord": "外-挂"
    },
    "4081": {
        "id": 4081,
        "shieldWord": "外—挂"
    },
    "4082": {
        "id": 4082,
        "shieldWord": "外汇局"
    },
    "4083": {
        "id": 4083,
        "shieldWord": "外交部"
    },
    "4084": {
        "id": 4084,
        "shieldWord": "外专局"
    },
    "4085": {
        "id": 4085,
        "shieldWord": "万税"
    },
    "4086": {
        "id": 4086,
        "shieldWord": "王八蛋"
    },
    "4087": {
        "id": 4087,
        "shieldWord": "王昊"
    },
    "4088": {
        "id": 4088,
        "shieldWord": "王太华"
    },
    "4089": {
        "id": 4089,
        "shieldWord": "王震"
    },
    "4090": {
        "id": 4090,
        "shieldWord": "网管"
    },
    "4091": {
        "id": 4091,
        "shieldWord": "威而钢"
    },
    "4092": {
        "id": 4092,
        "shieldWord": "威而柔"
    },
    "4093": {
        "id": 4093,
        "shieldWord": "卫生部"
    },
    "4094": {
        "id": 4094,
        "shieldWord": "温加宝"
    },
    "4095": {
        "id": 4095,
        "shieldWord": "温家保"
    },
    "4096": {
        "id": 4096,
        "shieldWord": "温馨"
    },
    "4097": {
        "id": 4097,
        "shieldWord": "温总理"
    },
    "4098": {
        "id": 4098,
        "shieldWord": "文化部"
    },
    "4099": {
        "id": 4099,
        "shieldWord": "文物局"
    },
    "4100": {
        "id": 4100,
        "shieldWord": "倭国"
    },
    "4101": {
        "id": 4101,
        "shieldWord": "倭寇"
    },
    "4102": {
        "id": 4102,
        "shieldWord": "我干"
    },
    "4103": {
        "id": 4103,
        "shieldWord": "我妳老爸"
    },
    "4104": {
        "id": 4104,
        "shieldWord": "我日你"
    },
    "4105": {
        "id": 4105,
        "shieldWord": "吴　仪"
    },
    "4106": {
        "id": 4106,
        "shieldWord": "五星红旗"
    },
    "4107": {
        "id": 4107,
        "shieldWord": "西藏天葬"
    },
    "4108": {
        "id": 4108,
        "shieldWord": "希望之声"
    },
    "4109": {
        "id": 4109,
        "shieldWord": "洗脑班"
    },
    "4110": {
        "id": 4110,
        "shieldWord": "系统讯息"
    },
    "4111": {
        "id": 4111,
        "shieldWord": "乡巴佬"
    },
    "4112": {
        "id": 4112,
        "shieldWord": "想上你"
    },
    "4113": {
        "id": 4113,
        "shieldWord": "小日本"
    },
    "4114": {
        "id": 4114,
        "shieldWord": "小肉粒"
    },
    "4115": {
        "id": 4115,
        "shieldWord": "小乳头"
    },
    "4116": {
        "id": 4116,
        "shieldWord": "邪教"
    },
    "4117": {
        "id": 4117,
        "shieldWord": "兴奋剂"
    },
    "4118": {
        "id": 4118,
        "shieldWord": "性虐待"
    },
    "4119": {
        "id": 4119,
        "shieldWord": "徐光春"
    },
    "4120": {
        "id": 4120,
        "shieldWord": "血逼"
    },
    "4121": {
        "id": 4121,
        "shieldWord": "血腥图片"
    },
    "4122": {
        "id": 4122,
        "shieldWord": "鸦片液"
    },
    "4123": {
        "id": 4123,
        "shieldWord": "鸦片渣"
    },
    "4124": {
        "id": 4124,
        "shieldWord": "烟草局"
    },
    "4125": {
        "id": 4125,
        "shieldWord": "严方军"
    },
    "4126": {
        "id": 4126,
        "shieldWord": "阳精"
    },
    "4127": {
        "id": 4127,
        "shieldWord": "摇头玩"
    },
    "4128": {
        "id": 4128,
        "shieldWord": "耶苏"
    },
    "4129": {
        "id": 4129,
        "shieldWord": "夜情"
    },
    "4130": {
        "id": 4130,
        "shieldWord": "一党专制"
    },
    "4131": {
        "id": 4131,
        "shieldWord": "一国两制"
    },
    "4132": {
        "id": 4132,
        "shieldWord": "伊拉克"
    },
    "4133": {
        "id": 4133,
        "shieldWord": "伊朗"
    },
    "4134": {
        "id": 4134,
        "shieldWord": "以茎至洞"
    },
    "4135": {
        "id": 4135,
        "shieldWord": "抑制剂"
    },
    "4136": {
        "id": 4136,
        "shieldWord": "阴小撕大"
    },
    "4137": {
        "id": 4137,
        "shieldWord": "淫毛"
    },
    "4138": {
        "id": 4138,
        "shieldWord": "淫靡"
    },
    "4139": {
        "id": 4139,
        "shieldWord": "淫语连连"
    },
    "4140": {
        "id": 4140,
        "shieldWord": "淫欲"
    },
    "4141": {
        "id": 4141,
        "shieldWord": "英雄纪念碑"
    },
    "4142": {
        "id": 4142,
        "shieldWord": "硬挺"
    },
    "4143": {
        "id": 4143,
        "shieldWord": "邮政局"
    },
    "4144": {
        "id": 4144,
        "shieldWord": "游戏发奖员"
    },
    "4145": {
        "id": 4145,
        "shieldWord": "游戏宫理员"
    },
    "4146": {
        "id": 4146,
        "shieldWord": "舆论钳制"
    },
    "4147": {
        "id": 4147,
        "shieldWord": "玉杵"
    },
    "4148": {
        "id": 4148,
        "shieldWord": "欲火焚身"
    },
    "4149": {
        "id": 4149,
        "shieldWord": "原子能机构"
    },
    "4150": {
        "id": 4150,
        "shieldWord": "远程偷拍"
    },
    "4151": {
        "id": 4151,
        "shieldWord": "曰GM"
    },
    "4152": {
        "id": 4152,
        "shieldWord": "曰你"
    },
    "4153": {
        "id": 4153,
        "shieldWord": "月经不调"
    },
    "4154": {
        "id": 4154,
        "shieldWord": "扎卡维"
    },
    "4155": {
        "id": 4155,
        "shieldWord": "张朝阳"
    },
    "4156": {
        "id": 4156,
        "shieldWord": "张潮阳"
    },
    "4157": {
        "id": 4157,
        "shieldWord": "张磊"
    },
    "4158": {
        "id": 4158,
        "shieldWord": "张立昌"
    },
    "4159": {
        "id": 4159,
        "shieldWord": "张小平"
    },
    "4160": {
        "id": 4160,
        "shieldWord": "侦探设备"
    },
    "4161": {
        "id": 4161,
        "shieldWord": "中国恐怖组织"
    },
    "4162": {
        "id": 4162,
        "shieldWord": "中南海"
    },
    "4163": {
        "id": 4163,
        "shieldWord": "中宣部"
    },
    "4164": {
        "id": 4164,
        "shieldWord": "周总理"
    },
    "4165": {
        "id": 4165,
        "shieldWord": "朱容鸡"
    },
    "4166": {
        "id": 4166,
        "shieldWord": "朱总理"
    },
    "4167": {
        "id": 4167,
        "shieldWord": "猪容基"
    },
    "4168": {
        "id": 4168,
        "shieldWord": "主席"
    },
    "4169": {
        "id": 4169,
        "shieldWord": "装屄"
    },
    "4170": {
        "id": 4170,
        "shieldWord": "追查国际"
    },
    "4171": {
        "id": 4171,
        "shieldWord": "子女任职名单"
    },
    "4172": {
        "id": 4172,
        "shieldWord": "自杀手册"
    },
    "4173": {
        "id": 4173,
        "shieldWord": "自杀指南"
    },
    "4174": {
        "id": 4174,
        "shieldWord": "自制手枪"
    },
    "4175": {
        "id": 4175,
        "shieldWord": "自治机关"
    },
    "4176": {
        "id": 4176,
        "shieldWord": "总局"
    },
    "4177": {
        "id": 4177,
        "shieldWord": "坐台的"
    },
    "4178": {
        "id": 4178,
        "shieldWord": "操逼毛"
    },
    "4179": {
        "id": 4179,
        "shieldWord": "ur"
    },
    "4180": {
        "id": 4180,
        "shieldWord": "taobao"
    },
    "4181": {
        "id": 4181,
        "shieldWord": "webgame.com.cn"
    },
    "4182": {
        "id": 4182,
        "shieldWord": "牛B"
    },
    "4183": {
        "id": 4183,
        "shieldWord": "垃圾游戏"
    },
    "4184": {
        "id": 4184,
        "shieldWord": "烂游戏"
    },
    "4185": {
        "id": 4185,
        "shieldWord": "淘宝"
    },
    "4186": {
        "id": 4186,
        "shieldWord": "cao"
    },
    "4187": {
        "id": 4187,
        "shieldWord": "h站"
    },
    "4188": {
        "id": 4188,
        "shieldWord": "龙虎"
    },
    "4189": {
        "id": 4189,
        "shieldWord": "虎门"
    },
    "4190": {
        "id": 4190,
        "shieldWord": "WEB牌战"
    },
    "4191": {
        "id": 4191,
        "shieldWord": "WEB战牌"
    },
    "4192": {
        "id": 4192,
        "shieldWord": "战牌"
    },
    "4193": {
        "id": 4193,
        "shieldWord": "8仙"
    },
    "4194": {
        "id": 4194,
        "shieldWord": "ＵＲ"
    },
    "4195": {
        "id": 4195,
        "shieldWord": "街头对抗"
    },
    "4196": {
        "id": 4196,
        "shieldWord": "混沌决"
    },
    "4197": {
        "id": 4197,
        "shieldWord": "草泥马"
    },
    "4198": {
        "id": 4198,
        "shieldWord": "我艹"
    },
    "4199": {
        "id": 4199,
        "shieldWord": "日你妹"
    },
    "4200": {
        "id": 4200,
        "shieldWord": "繁体字"
    },
    "4201": {
        "id": 4201,
        "shieldWord": "政治敏感人物國內政要人物"
    },
    "4202": {
        "id": 4202,
        "shieldWord": "毛澤東"
    },
    "4203": {
        "id": 4203,
        "shieldWord": "周恩來"
    },
    "4204": {
        "id": 4204,
        "shieldWord": "劉少奇"
    },
    "4205": {
        "id": 4205,
        "shieldWord": "彭德懷"
    },
    "4206": {
        "id": 4206,
        "shieldWord": "劉伯承"
    },
    "4207": {
        "id": 4207,
        "shieldWord": "陳毅"
    },
    "4208": {
        "id": 4208,
        "shieldWord": "賀龍"
    },
    "4209": {
        "id": 4209,
        "shieldWord": "聶榮臻"
    },
    "4210": {
        "id": 4210,
        "shieldWord": "羅榮桓"
    },
    "4211": {
        "id": 4211,
        "shieldWord": "葉劍英"
    },
    "4212": {
        "id": 4212,
        "shieldWord": "李大釗"
    },
    "4213": {
        "id": 4213,
        "shieldWord": "陳獨秀"
    },
    "4214": {
        "id": 4214,
        "shieldWord": "孫中山"
    },
    "4215": {
        "id": 4215,
        "shieldWord": "孫文"
    },
    "4216": {
        "id": 4216,
        "shieldWord": "孫逸仙"
    },
    "4217": {
        "id": 4217,
        "shieldWord": "鄧小平"
    },
    "4218": {
        "id": 4218,
        "shieldWord": "陳雲"
    },
    "4219": {
        "id": 4219,
        "shieldWord": "江澤民"
    },
    "4220": {
        "id": 4220,
        "shieldWord": "李鵬"
    },
    "4221": {
        "id": 4221,
        "shieldWord": "朱鎔基"
    },
    "4222": {
        "id": 4222,
        "shieldWord": "李瑞環"
    },
    "4223": {
        "id": 4223,
        "shieldWord": "李嵐清"
    },
    "4224": {
        "id": 4224,
        "shieldWord": "胡錦濤"
    },
    "4225": {
        "id": 4225,
        "shieldWord": "羅幹"
    },
    "4226": {
        "id": 4226,
        "shieldWord": "溫家寶"
    },
    "4227": {
        "id": 4227,
        "shieldWord": "吳邦國"
    },
    "4228": {
        "id": 4228,
        "shieldWord": "曾慶紅"
    },
    "4229": {
        "id": 4229,
        "shieldWord": "賈慶林"
    },
    "4230": {
        "id": 4230,
        "shieldWord": "黃菊"
    },
    "4231": {
        "id": 4231,
        "shieldWord": "吳官正"
    },
    "4232": {
        "id": 4232,
        "shieldWord": "李長春"
    },
    "4233": {
        "id": 4233,
        "shieldWord": "吳儀"
    },
    "4234": {
        "id": 4234,
        "shieldWord": "曹剛川"
    },
    "4235": {
        "id": 4235,
        "shieldWord": "唐家璿"
    },
    "4236": {
        "id": 4236,
        "shieldWord": "華建敏"
    },
    "4237": {
        "id": 4237,
        "shieldWord": "陳至立"
    },
    "4238": {
        "id": 4238,
        "shieldWord": "張德江"
    },
    "4239": {
        "id": 4239,
        "shieldWord": "俞正聲"
    },
    "4240": {
        "id": 4240,
        "shieldWord": "王樂泉"
    },
    "4241": {
        "id": 4241,
        "shieldWord": "劉雲山"
    },
    "4242": {
        "id": 4242,
        "shieldWord": "王剛"
    },
    "4243": {
        "id": 4243,
        "shieldWord": "王兆國"
    },
    "4244": {
        "id": 4244,
        "shieldWord": "劉淇"
    },
    "4245": {
        "id": 4245,
        "shieldWord": "賀國強"
    },
    "4246": {
        "id": 4246,
        "shieldWord": "習近平"
    },
    "4247": {
        "id": 4247,
        "shieldWord": "李克強"
    },
    "4248": {
        "id": 4248,
        "shieldWord": "張高麗"
    },
    "4249": {
        "id": 4249,
        "shieldWord": "劉延東"
    },
    "4250": {
        "id": 4250,
        "shieldWord": "彭麗媛"
    },
    "4251": {
        "id": 4251,
        "shieldWord": "華國鋒"
    },
    "4252": {
        "id": 4252,
        "shieldWord": "劉奇葆"
    },
    "4253": {
        "id": 4253,
        "shieldWord": "習大大"
    },
    "4254": {
        "id": 4254,
        "shieldWord": "吳幫國"
    },
    "4255": {
        "id": 4255,
        "shieldWord": "無幫國"
    },
    "4256": {
        "id": 4256,
        "shieldWord": "無邦國"
    },
    "4257": {
        "id": 4257,
        "shieldWord": "無幫過"
    },
    "4258": {
        "id": 4258,
        "shieldWord": "瘟家寶"
    },
    "4259": {
        "id": 4259,
        "shieldWord": "假慶林"
    },
    "4260": {
        "id": 4260,
        "shieldWord": "甲慶林"
    },
    "4261": {
        "id": 4261,
        "shieldWord": "離長春"
    },
    "4262": {
        "id": 4262,
        "shieldWord": "習遠平"
    },
    "4263": {
        "id": 4263,
        "shieldWord": "襲近平"
    },
    "4264": {
        "id": 4264,
        "shieldWord": "李磕牆"
    },
    "4265": {
        "id": 4265,
        "shieldWord": "賀過牆"
    },
    "4266": {
        "id": 4266,
        "shieldWord": "和鍋槍"
    },
    "4267": {
        "id": 4267,
        "shieldWord": "習主席"
    },
    "4268": {
        "id": 4268,
        "shieldWord": "馬凱"
    },
    "4269": {
        "id": 4269,
        "shieldWord": "王滬甯"
    },
    "4270": {
        "id": 4270,
        "shieldWord": "許其亮"
    },
    "4271": {
        "id": 4271,
        "shieldWord": "孫春蘭"
    },
    "4272": {
        "id": 4272,
        "shieldWord": "孫政才"
    },
    "4273": {
        "id": 4273,
        "shieldWord": "李建國"
    },
    "4274": {
        "id": 4274,
        "shieldWord": "張春賢"
    },
    "4275": {
        "id": 4275,
        "shieldWord": "范長龍"
    },
    "4276": {
        "id": 4276,
        "shieldWord": "趙樂際"
    },
    "4277": {
        "id": 4277,
        "shieldWord": "胡春華"
    },
    "4278": {
        "id": 4278,
        "shieldWord": "栗戰書"
    },
    "4279": {
        "id": 4279,
        "shieldWord": "郭金龍"
    },
    "4280": {
        "id": 4280,
        "shieldWord": "韓正"
    },
    "4281": {
        "id": 4281,
        "shieldWord": "國外政要人物"
    },
    "4282": {
        "id": 4282,
        "shieldWord": "布希"
    },
    "4283": {
        "id": 4283,
        "shieldWord": "布雷爾"
    },
    "4284": {
        "id": 4284,
        "shieldWord": "純一郎"
    },
    "4285": {
        "id": 4285,
        "shieldWord": "薩馬蘭奇"
    },
    "4286": {
        "id": 4286,
        "shieldWord": "默克爾"
    },
    "4287": {
        "id": 4287,
        "shieldWord": "克林頓"
    },
    "4288": {
        "id": 4288,
        "shieldWord": "雷根"
    },
    "4289": {
        "id": 4289,
        "shieldWord": "尼克森"
    },
    "4290": {
        "id": 4290,
        "shieldWord": "杜魯門"
    },
    "4291": {
        "id": 4291,
        "shieldWord": "赫魯雪夫"
    },
    "4292": {
        "id": 4292,
        "shieldWord": "列寧"
    },
    "4293": {
        "id": 4293,
        "shieldWord": "史達林"
    },
    "4294": {
        "id": 4294,
        "shieldWord": "馬克思"
    },
    "4295": {
        "id": 4295,
        "shieldWord": "薩達姆"
    },
    "4296": {
        "id": 4296,
        "shieldWord": "柴契爾"
    },
    "4297": {
        "id": 4297,
        "shieldWord": "阿羅約"
    },
    "4298": {
        "id": 4298,
        "shieldWord": "卡斯楚"
    },
    "4299": {
        "id": 4299,
        "shieldWord": "佛蘭克林"
    },
    "4300": {
        "id": 4300,
        "shieldWord": "華盛頓"
    },
    "4301": {
        "id": 4301,
        "shieldWord": "艾森豪威爾"
    },
    "4302": {
        "id": 4302,
        "shieldWord": "拿破崙"
    },
    "4303": {
        "id": 4303,
        "shieldWord": "亞歷山大"
    },
    "4304": {
        "id": 4304,
        "shieldWord": "拉姆斯菲爾德"
    },
    "4305": {
        "id": 4305,
        "shieldWord": "蘿拉"
    },
    "4306": {
        "id": 4306,
        "shieldWord": "鮑威爾"
    },
    "4307": {
        "id": 4307,
        "shieldWord": "奧巴馬"
    },
    "4308": {
        "id": 4308,
        "shieldWord": "梅德韋傑夫"
    },
    "4309": {
        "id": 4309,
        "shieldWord": "安倍晉三"
    },
    "4310": {
        "id": 4310,
        "shieldWord": "唐納德·特朗普"
    },
    "4311": {
        "id": 4311,
        "shieldWord": "特朗普"
    },
    "4312": {
        "id": 4312,
        "shieldWord": "希拉蕊"
    },
    "4313": {
        "id": 4313,
        "shieldWord": "希拉蕊·克林頓"
    },
    "4314": {
        "id": 4314,
        "shieldWord": "敏感人物名稱或代號"
    },
    "4315": {
        "id": 4315,
        "shieldWord": "奧馬爾"
    },
    "4316": {
        "id": 4316,
        "shieldWord": "達賴"
    },
    "4317": {
        "id": 4317,
        "shieldWord": "達賴喇嘛"
    },
    "4318": {
        "id": 4318,
        "shieldWord": "張春橋"
    },
    "4319": {
        "id": 4319,
        "shieldWord": "東條英機"
    },
    "4320": {
        "id": 4320,
        "shieldWord": "岡村秀樹"
    },
    "4321": {
        "id": 4321,
        "shieldWord": "岡村寧次"
    },
    "4322": {
        "id": 4322,
        "shieldWord": "高麗朴"
    },
    "4323": {
        "id": 4323,
        "shieldWord": "趙紫陽"
    },
    "4324": {
        "id": 4324,
        "shieldWord": "沃爾開西"
    },
    "4325": {
        "id": 4325,
        "shieldWord": "李大師"
    },
    "4326": {
        "id": 4326,
        "shieldWord": "賴昌星"
    },
    "4327": {
        "id": 4327,
        "shieldWord": "馬加爵"
    },
    "4328": {
        "id": 4328,
        "shieldWord": "班禪"
    },
    "4329": {
        "id": 4329,
        "shieldWord": "額爾德尼"
    },
    "4330": {
        "id": 4330,
        "shieldWord": "阿扁萬歲"
    },
    "4331": {
        "id": 4331,
        "shieldWord": "熱那亞"
    },
    "4332": {
        "id": 4332,
        "shieldWord": "薄熙來"
    },
    "4333": {
        "id": 4333,
        "shieldWord": "王立軍"
    },
    "4334": {
        "id": 4334,
        "shieldWord": "令計畫"
    },
    "4335": {
        "id": 4335,
        "shieldWord": "軸永康"
    },
    "4336": {
        "id": 4336,
        "shieldWord": "陳良宇"
    },
    "4337": {
        "id": 4337,
        "shieldWord": "李登輝"
    },
    "4338": {
        "id": 4338,
        "shieldWord": "連戰"
    },
    "4339": {
        "id": 4339,
        "shieldWord": "呂秀蓮"
    },
    "4340": {
        "id": 4340,
        "shieldWord": "鬱慕明"
    },
    "4341": {
        "id": 4341,
        "shieldWord": "蔣介石"
    },
    "4342": {
        "id": 4342,
        "shieldWord": "蔣中正"
    },
    "4343": {
        "id": 4343,
        "shieldWord": "蔣經國"
    },
    "4344": {
        "id": 4344,
        "shieldWord": "馬英九"
    },
    "4345": {
        "id": 4345,
        "shieldWord": "政治敏感詞彙"
    },
    "4346": {
        "id": 4346,
        "shieldWord": "共產黨"
    },
    "4347": {
        "id": 4347,
        "shieldWord": "中組部"
    },
    "4348": {
        "id": 4348,
        "shieldWord": "統戰部"
    },
    "4349": {
        "id": 4349,
        "shieldWord": "中聯部"
    },
    "4350": {
        "id": 4350,
        "shieldWord": "國台辦"
    },
    "4351": {
        "id": 4351,
        "shieldWord": "國務院"
    },
    "4352": {
        "id": 4352,
        "shieldWord": "發改委"
    },
    "4353": {
        "id": 4353,
        "shieldWord": "中紀委"
    },
    "4354": {
        "id": 4354,
        "shieldWord": "共青團"
    },
    "4355": {
        "id": 4355,
        "shieldWord": "中央電視臺"
    },
    "4356": {
        "id": 4356,
        "shieldWord": "掃黃打非"
    },
    "4357": {
        "id": 4357,
        "shieldWord": "涉嫌反動"
    },
    "4358": {
        "id": 4358,
        "shieldWord": "恐怖主義敏感詞彙"
    },
    "4359": {
        "id": 4359,
        "shieldWord": "六四運動"
    },
    "4360": {
        "id": 4360,
        "shieldWord": "美國之音"
    },
    "4361": {
        "id": 4361,
        "shieldWord": "民國"
    },
    "4362": {
        "id": 4362,
        "shieldWord": "民進黨"
    },
    "4363": {
        "id": 4363,
        "shieldWord": "民運"
    },
    "4364": {
        "id": 4364,
        "shieldWord": "摩門教"
    },
    "4365": {
        "id": 4365,
        "shieldWord": "納粹"
    },
    "4366": {
        "id": 4366,
        "shieldWord": "南華早報"
    },
    "4367": {
        "id": 4367,
        "shieldWord": "南蠻"
    },
    "4368": {
        "id": 4368,
        "shieldWord": "明慧網"
    },
    "4369": {
        "id": 4369,
        "shieldWord": "起義"
    },
    "4370": {
        "id": 4370,
        "shieldWord": "親民黨"
    },
    "4371": {
        "id": 4371,
        "shieldWord": "瘸腿幫"
    },
    "4372": {
        "id": 4372,
        "shieldWord": "人民報"
    },
    "4373": {
        "id": 4373,
        "shieldWord": "法輪功"
    },
    "4374": {
        "id": 4374,
        "shieldWord": "法輪大法"
    },
    "4375": {
        "id": 4375,
        "shieldWord": "打倒共產黨"
    },
    "4376": {
        "id": 4376,
        "shieldWord": "台獨萬歲"
    },
    "4377": {
        "id": 4377,
        "shieldWord": "聖戰"
    },
    "4378": {
        "id": 4378,
        "shieldWord": "台獨"
    },
    "4379": {
        "id": 4379,
        "shieldWord": "台獨分子"
    },
    "4380": {
        "id": 4380,
        "shieldWord": "台聯"
    },
    "4381": {
        "id": 4381,
        "shieldWord": "臺灣民國"
    },
    "4382": {
        "id": 4382,
        "shieldWord": "臺灣島國"
    },
    "4383": {
        "id": 4383,
        "shieldWord": "臺灣國"
    },
    "4384": {
        "id": 4384,
        "shieldWord": "臺灣獨立"
    },
    "4385": {
        "id": 4385,
        "shieldWord": "天安門事件"
    },
    "4386": {
        "id": 4386,
        "shieldWord": "屠殺"
    },
    "4387": {
        "id": 4387,
        "shieldWord": "新黨"
    },
    "4388": {
        "id": 4388,
        "shieldWord": "新疆獨立"
    },
    "4389": {
        "id": 4389,
        "shieldWord": "新疆國"
    },
    "4390": {
        "id": 4390,
        "shieldWord": "疆獨"
    },
    "4391": {
        "id": 4391,
        "shieldWord": "西藏獨立"
    },
    "4392": {
        "id": 4392,
        "shieldWord": "西藏國"
    },
    "4393": {
        "id": 4393,
        "shieldWord": "藏獨"
    },
    "4394": {
        "id": 4394,
        "shieldWord": "藏青會"
    },
    "4395": {
        "id": 4395,
        "shieldWord": "藏婦會"
    },
    "4396": {
        "id": 4396,
        "shieldWord": "學潮"
    },
    "4397": {
        "id": 4397,
        "shieldWord": "學運"
    },
    "4398": {
        "id": 4398,
        "shieldWord": "一黨專政"
    },
    "4399": {
        "id": 4399,
        "shieldWord": "兩個中國"
    },
    "4400": {
        "id": 4400,
        "shieldWord": "一貫道"
    },
    "4401": {
        "id": 4401,
        "shieldWord": "遊行"
    },
    "4402": {
        "id": 4402,
        "shieldWord": "圓滿"
    },
    "4403": {
        "id": 4403,
        "shieldWord": "鎮壓"
    },
    "4404": {
        "id": 4404,
        "shieldWord": "政變"
    },
    "4405": {
        "id": 4405,
        "shieldWord": "政治反對派"
    },
    "4406": {
        "id": 4406,
        "shieldWord": "反黨"
    },
    "4407": {
        "id": 4407,
        "shieldWord": "民主黨"
    },
    "4408": {
        "id": 4408,
        "shieldWord": "中國之春"
    },
    "4409": {
        "id": 4409,
        "shieldWord": "轉法輪"
    },
    "4410": {
        "id": 4410,
        "shieldWord": "共黨"
    },
    "4411": {
        "id": 4411,
        "shieldWord": "蘇家屯"
    },
    "4412": {
        "id": 4412,
        "shieldWord": "基地組織"
    },
    "4413": {
        "id": 4413,
        "shieldWord": "東亞病夫"
    },
    "4414": {
        "id": 4414,
        "shieldWord": "高治聯"
    },
    "4415": {
        "id": 4415,
        "shieldWord": "高自聯"
    },
    "4416": {
        "id": 4416,
        "shieldWord": "專政"
    },
    "4417": {
        "id": 4417,
        "shieldWord": "專制"
    },
    "4418": {
        "id": 4418,
        "shieldWord": "四人幫"
    },
    "4419": {
        "id": 4419,
        "shieldWord": "新聞管制"
    },
    "4420": {
        "id": 4420,
        "shieldWord": "核工業基地"
    },
    "4421": {
        "id": 4421,
        "shieldWord": "鈾"
    },
    "4422": {
        "id": 4422,
        "shieldWord": "原子彈"
    },
    "4423": {
        "id": 4423,
        "shieldWord": "氫彈"
    },
    "4424": {
        "id": 4424,
        "shieldWord": "導彈"
    },
    "4425": {
        "id": 4425,
        "shieldWord": "核潛艇"
    },
    "4426": {
        "id": 4426,
        "shieldWord": "大參考"
    },
    "4427": {
        "id": 4427,
        "shieldWord": "小參考"
    },
    "4428": {
        "id": 4428,
        "shieldWord": "國內動態清樣"
    },
    "4429": {
        "id": 4429,
        "shieldWord": "東突"
    },
    "4430": {
        "id": 4430,
        "shieldWord": "雪山獅子旗"
    },
    "4431": {
        "id": 4431,
        "shieldWord": "佔領中環"
    },
    "4432": {
        "id": 4432,
        "shieldWord": "兩國論"
    },
    "4433": {
        "id": 4433,
        "shieldWord": "一邊一國"
    },
    "4434": {
        "id": 4434,
        "shieldWord": "香港國"
    },
    "4435": {
        "id": 4435,
        "shieldWord": "賣槍"
    },
    "4436": {
        "id": 4436,
        "shieldWord": "港獨"
    },
    "4437": {
        "id": 4437,
        "shieldWord": "中華大陸執事站"
    },
    "4438": {
        "id": 4438,
        "shieldWord": "阿努納恰爾邦"
    },
    "4439": {
        "id": 4439,
        "shieldWord": "釣魚臺列島"
    },
    "4440": {
        "id": 4440,
        "shieldWord": "阿克塞欽"
    },
    "4441": {
        "id": 4441,
        "shieldWord": "間島"
    },
    "4442": {
        "id": 4442,
        "shieldWord": "薩哈林島"
    },
    "4443": {
        "id": 4443,
        "shieldWord": "宗教"
    },
    "4444": {
        "id": 4444,
        "shieldWord": "迷信"
    },
    "4445": {
        "id": 4445,
        "shieldWord": "多維"
    },
    "4446": {
        "id": 4446,
        "shieldWord": "釋迦牟尼"
    },
    "4447": {
        "id": 4447,
        "shieldWord": "如來"
    },
    "4448": {
        "id": 4448,
        "shieldWord": "阿彌陀佛"
    },
    "4449": {
        "id": 4449,
        "shieldWord": "觀世音"
    },
    "4450": {
        "id": 4450,
        "shieldWord": "普賢"
    },
    "4451": {
        "id": 4451,
        "shieldWord": "河殤"
    },
    "4452": {
        "id": 4452,
        "shieldWord": "聖母"
    },
    "4453": {
        "id": 4453,
        "shieldWord": "耶和華"
    },
    "4454": {
        "id": 4454,
        "shieldWord": "耶穌"
    },
    "4455": {
        "id": 4455,
        "shieldWord": "伊斯蘭"
    },
    "4456": {
        "id": 4456,
        "shieldWord": "白蓮教"
    },
    "4457": {
        "id": 4457,
        "shieldWord": "東正教"
    },
    "4458": {
        "id": 4458,
        "shieldWord": "釋迦摩尼大法"
    },
    "4459": {
        "id": 4459,
        "shieldWord": "法輪"
    },
    "4460": {
        "id": 4460,
        "shieldWord": "走向圓滿"
    },
    "4461": {
        "id": 4461,
        "shieldWord": "黃大仙"
    },
    "4462": {
        "id": 4462,
        "shieldWord": "風水"
    },
    "4463": {
        "id": 4463,
        "shieldWord": "神漢"
    },
    "4464": {
        "id": 4464,
        "shieldWord": "大衛教"
    },
    "4465": {
        "id": 4465,
        "shieldWord": "閻王"
    },
    "4466": {
        "id": 4466,
        "shieldWord": "黑白無常"
    },
    "4467": {
        "id": 4467,
        "shieldWord": "牛頭馬面藏獨"
    },
    "4468": {
        "id": 4468,
        "shieldWord": "高麗棒子"
    },
    "4469": {
        "id": 4469,
        "shieldWord": "蒙古韃子"
    },
    "4470": {
        "id": 4470,
        "shieldWord": "回民吃豬肉"
    },
    "4471": {
        "id": 4471,
        "shieldWord": "蒙古獨立"
    },
    "4472": {
        "id": 4472,
        "shieldWord": "靈靈教"
    },
    "4473": {
        "id": 4473,
        "shieldWord": "犯罪詞彙"
    },
    "4474": {
        "id": 4474,
        "shieldWord": "謀殺"
    },
    "4475": {
        "id": 4475,
        "shieldWord": "殺人"
    },
    "4476": {
        "id": 4476,
        "shieldWord": "販毒"
    },
    "4477": {
        "id": 4477,
        "shieldWord": "賭博"
    },
    "4478": {
        "id": 4478,
        "shieldWord": "拐賣"
    },
    "4479": {
        "id": 4479,
        "shieldWord": "賣淫"
    },
    "4480": {
        "id": 4480,
        "shieldWord": "監獄"
    },
    "4481": {
        "id": 4481,
        "shieldWord": "強姦"
    },
    "4482": {
        "id": 4482,
        "shieldWord": "輪奸"
    },
    "4483": {
        "id": 4483,
        "shieldWord": "搶劫"
    },
    "4484": {
        "id": 4484,
        "shieldWord": "先奸後殺"
    },
    "4485": {
        "id": 4485,
        "shieldWord": "槍支彈藥"
    },
    "4486": {
        "id": 4486,
        "shieldWord": "抽頭"
    },
    "4487": {
        "id": 4487,
        "shieldWord": "坐莊"
    },
    "4488": {
        "id": 4488,
        "shieldWord": "賭馬"
    },
    "4489": {
        "id": 4489,
        "shieldWord": "賭球"
    },
    "4490": {
        "id": 4490,
        "shieldWord": "籌碼"
    },
    "4491": {
        "id": 4491,
        "shieldWord": "老虎機"
    },
    "4492": {
        "id": 4492,
        "shieldWord": "輪盤賭"
    },
    "4493": {
        "id": 4493,
        "shieldWord": "搖頭丸"
    },
    "4494": {
        "id": 4494,
        "shieldWord": "鴉片"
    },
    "4495": {
        "id": 4495,
        "shieldWord": "罌粟"
    },
    "4496": {
        "id": 4496,
        "shieldWord": "迷幻藥"
    },
    "4497": {
        "id": 4497,
        "shieldWord": "嗑藥"
    },
    "4498": {
        "id": 4498,
        "shieldWord": "賣槍支彈藥"
    },
    "4499": {
        "id": 4499,
        "shieldWord": "致幻劑"
    },
    "4500": {
        "id": 4500,
        "shieldWord": "偷窺"
    },
    "4501": {
        "id": 4501,
        "shieldWord": "侮辱性語言"
    },
    "4502": {
        "id": 4502,
        "shieldWord": "二貨"
    },
    "4503": {
        "id": 4503,
        "shieldWord": "傻畢"
    },
    "4504": {
        "id": 4504,
        "shieldWord": "黃網"
    },
    "4505": {
        "id": 4505,
        "shieldWord": "馬的"
    },
    "4506": {
        "id": 4506,
        "shieldWord": "馬白勺"
    },
    "4507": {
        "id": 4507,
        "shieldWord": "媽的"
    },
    "4508": {
        "id": 4508,
        "shieldWord": "媽白勺"
    },
    "4509": {
        "id": 4509,
        "shieldWord": "女馬ㄉ"
    },
    "4510": {
        "id": 4510,
        "shieldWord": "女馬的"
    },
    "4511": {
        "id": 4511,
        "shieldWord": "女馬白勺"
    },
    "4512": {
        "id": 4512,
        "shieldWord": "幹你"
    },
    "4513": {
        "id": 4513,
        "shieldWord": "幹妳"
    },
    "4514": {
        "id": 4514,
        "shieldWord": "幹他"
    },
    "4515": {
        "id": 4515,
        "shieldWord": "幹人也"
    },
    "4516": {
        "id": 4516,
        "shieldWord": "幹她"
    },
    "4517": {
        "id": 4517,
        "shieldWord": "幹女也"
    },
    "4518": {
        "id": 4518,
        "shieldWord": "機八"
    },
    "4519": {
        "id": 4519,
        "shieldWord": "雞八"
    },
    "4520": {
        "id": 4520,
        "shieldWord": "機巴"
    },
    "4521": {
        "id": 4521,
        "shieldWord": "雞巴"
    },
    "4522": {
        "id": 4522,
        "shieldWord": "機叭"
    },
    "4523": {
        "id": 4523,
        "shieldWord": "雞叭"
    },
    "4524": {
        "id": 4524,
        "shieldWord": "機芭"
    },
    "4525": {
        "id": 4525,
        "shieldWord": "雞芭"
    },
    "4526": {
        "id": 4526,
        "shieldWord": "機掰"
    },
    "4527": {
        "id": 4527,
        "shieldWord": "雞掰"
    },
    "4528": {
        "id": 4528,
        "shieldWord": "機Y"
    },
    "4529": {
        "id": 4529,
        "shieldWord": "機Ｙ"
    },
    "4530": {
        "id": 4530,
        "shieldWord": "雞Y"
    },
    "4531": {
        "id": 4531,
        "shieldWord": "雞Ｙ"
    },
    "4532": {
        "id": 4532,
        "shieldWord": "機8"
    },
    "4533": {
        "id": 4533,
        "shieldWord": "雞８"
    },
    "4534": {
        "id": 4534,
        "shieldWord": "幹GY"
    },
    "4535": {
        "id": 4535,
        "shieldWord": "幹ＧＹ"
    },
    "4536": {
        "id": 4536,
        "shieldWord": "幹七八"
    },
    "4537": {
        "id": 4537,
        "shieldWord": "幹78"
    },
    "4538": {
        "id": 4538,
        "shieldWord": "幹７８"
    },
    "4539": {
        "id": 4539,
        "shieldWord": "懶叫"
    },
    "4540": {
        "id": 4540,
        "shieldWord": "懶教"
    },
    "4541": {
        "id": 4541,
        "shieldWord": "媽B"
    },
    "4542": {
        "id": 4542,
        "shieldWord": "璩美鳳"
    },
    "4543": {
        "id": 4543,
        "shieldWord": "陰莖"
    },
    "4544": {
        "id": 4544,
        "shieldWord": "陰道"
    },
    "4545": {
        "id": 4545,
        "shieldWord": "幹死"
    },
    "4546": {
        "id": 4546,
        "shieldWord": "你媽"
    },
    "4547": {
        "id": 4547,
        "shieldWord": "幼齒"
    },
    "4548": {
        "id": 4548,
        "shieldWord": "幹死你"
    },
    "4549": {
        "id": 4549,
        "shieldWord": "作愛"
    },
    "4550": {
        "id": 4550,
        "shieldWord": "發騷"
    },
    "4551": {
        "id": 4551,
        "shieldWord": "陰唇"
    },
    "4552": {
        "id": 4552,
        "shieldWord": "操你媽"
    },
    "4553": {
        "id": 4553,
        "shieldWord": "姦淫"
    },
    "4554": {
        "id": 4554,
        "shieldWord": "賤人"
    },
    "4555": {
        "id": 4555,
        "shieldWord": "江八點"
    },
    "4556": {
        "id": 4556,
        "shieldWord": "賤逼"
    },
    "4557": {
        "id": 4557,
        "shieldWord": "騷貨"
    },
    "4558": {
        "id": 4558,
        "shieldWord": "龜公"
    },
    "4559": {
        "id": 4559,
        "shieldWord": "窮逼"
    },
    "4560": {
        "id": 4560,
        "shieldWord": "裝逼"
    },
    "4561": {
        "id": 4561,
        "shieldWord": "媽批"
    },
    "4562": {
        "id": 4562,
        "shieldWord": "爛逼"
    },
    "4563": {
        "id": 4563,
        "shieldWord": "雞奸"
    },
    "4564": {
        "id": 4564,
        "shieldWord": "爛比"
    },
    "4565": {
        "id": 4565,
        "shieldWord": "噴你"
    },
    "4566": {
        "id": 4566,
        "shieldWord": "你大爺"
    },
    "4567": {
        "id": 4567,
        "shieldWord": "淫蕩"
    },
    "4568": {
        "id": 4568,
        "shieldWord": "中國豬"
    },
    "4569": {
        "id": 4569,
        "shieldWord": "淫穢"
    },
    "4570": {
        "id": 4570,
        "shieldWord": "江豬媳"
    },
    "4571": {
        "id": 4571,
        "shieldWord": "豬毛"
    },
    "4572": {
        "id": 4572,
        "shieldWord": "逼樣"
    },
    "4573": {
        "id": 4573,
        "shieldWord": "去你媽的"
    },
    "4574": {
        "id": 4574,
        "shieldWord": "下賤"
    },
    "4575": {
        "id": 4575,
        "shieldWord": "豬操"
    },
    "4576": {
        "id": 4576,
        "shieldWord": "陰水"
    },
    "4577": {
        "id": 4577,
        "shieldWord": "賣比"
    },
    "4578": {
        "id": 4578,
        "shieldWord": "16dy-圖庫"
    },
    "4579": {
        "id": 4579,
        "shieldWord": "獸交"
    },
    "4580": {
        "id": 4580,
        "shieldWord": "愛女人"
    },
    "4581": {
        "id": 4581,
        "shieldWord": "拔出來"
    },
    "4582": {
        "id": 4582,
        "shieldWord": "插進"
    },
    "4583": {
        "id": 4583,
        "shieldWord": "調教"
    },
    "4584": {
        "id": 4584,
        "shieldWord": "黃色電影"
    },
    "4585": {
        "id": 4585,
        "shieldWord": "激情電影"
    },
    "4586": {
        "id": 4586,
        "shieldWord": "輪暴"
    },
    "4587": {
        "id": 4587,
        "shieldWord": "色貓"
    },
    "4588": {
        "id": 4588,
        "shieldWord": "性愛圖庫"
    },
    "4589": {
        "id": 4589,
        "shieldWord": "亞情"
    },
    "4590": {
        "id": 4590,
        "shieldWord": "淫亂"
    },
    "4591": {
        "id": 4591,
        "shieldWord": "幼圖"
    },
    "4592": {
        "id": 4592,
        "shieldWord": "中文搜性網"
    },
    "4593": {
        "id": 4593,
        "shieldWord": "學生妹"
    },
    "4594": {
        "id": 4594,
        "shieldWord": "１８歲淫亂"
    },
    "4595": {
        "id": 4595,
        "shieldWord": "幹炮"
    },
    "4596": {
        "id": 4596,
        "shieldWord": "摸陰蒂"
    },
    "4597": {
        "id": 4597,
        "shieldWord": "金鱗豈是池中物"
    },
    "4598": {
        "id": 4598,
        "shieldWord": "白虎少婦"
    },
    "4599": {
        "id": 4599,
        "shieldWord": "白虎陰穴"
    },
    "4600": {
        "id": 4600,
        "shieldWord": "逼癢"
    },
    "4601": {
        "id": 4601,
        "shieldWord": "蕩妹"
    },
    "4602": {
        "id": 4602,
        "shieldWord": "幹穴"
    },
    "4603": {
        "id": 4603,
        "shieldWord": "開苞"
    },
    "4604": {
        "id": 4604,
        "shieldWord": "春藥"
    },
    "4605": {
        "id": 4605,
        "shieldWord": "風豔閣"
    },
    "4606": {
        "id": 4606,
        "shieldWord": "激情小說"
    },
    "4607": {
        "id": 4607,
        "shieldWord": "獸欲"
    },
    "4608": {
        "id": 4608,
        "shieldWord": "應召"
    },
    "4609": {
        "id": 4609,
        "shieldWord": "幹的爽"
    },
    "4610": {
        "id": 4610,
        "shieldWord": "肉蒲團"
    },
    "4611": {
        "id": 4611,
        "shieldWord": "後庭"
    },
    "4612": {
        "id": 4612,
        "shieldWord": "男女交歡"
    },
    "4613": {
        "id": 4613,
        "shieldWord": "極品波霸"
    },
    "4614": {
        "id": 4614,
        "shieldWord": "獸奸"
    },
    "4615": {
        "id": 4615,
        "shieldWord": "銷魂洞"
    },
    "4616": {
        "id": 4616,
        "shieldWord": "操爛"
    },
    "4617": {
        "id": 4617,
        "shieldWord": "成人網站"
    },
    "4618": {
        "id": 4618,
        "shieldWord": "一夜歡"
    },
    "4619": {
        "id": 4619,
        "shieldWord": "給你爽"
    },
    "4620": {
        "id": 4620,
        "shieldWord": "偷窺圖片"
    },
    "4621": {
        "id": 4621,
        "shieldWord": "大乳頭"
    },
    "4622": {
        "id": 4622,
        "shieldWord": "中年美婦"
    },
    "4623": {
        "id": 4623,
        "shieldWord": "噴精"
    },
    "4624": {
        "id": 4624,
        "shieldWord": "脫內褲"
    },
    "4625": {
        "id": 4625,
        "shieldWord": "發浪"
    },
    "4626": {
        "id": 4626,
        "shieldWord": "肉莖"
    },
    "4627": {
        "id": 4627,
        "shieldWord": "摳穴"
    },
    "4628": {
        "id": 4628,
        "shieldWord": "顏射"
    },
    "4629": {
        "id": 4629,
        "shieldWord": "淫水愛液"
    },
    "4630": {
        "id": 4630,
        "shieldWord": "陰核"
    },
    "4631": {
        "id": 4631,
        "shieldWord": "母子姦情"
    },
    "4632": {
        "id": 4632,
        "shieldWord": "丁香社區"
    },
    "4633": {
        "id": 4633,
        "shieldWord": "愛圖公園"
    },
    "4634": {
        "id": 4634,
        "shieldWord": "鹿城娛樂"
    },
    "4635": {
        "id": 4635,
        "shieldWord": "幼香閣"
    },
    "4636": {
        "id": 4636,
        "shieldWord": "隱窩窩"
    },
    "4637": {
        "id": 4637,
        "shieldWord": "亂倫熟女網"
    },
    "4638": {
        "id": 4638,
        "shieldWord": "插陰"
    },
    "4639": {
        "id": 4639,
        "shieldWord": "露陰照"
    },
    "4640": {
        "id": 4640,
        "shieldWord": "嫩鮑魚"
    },
    "4641": {
        "id": 4641,
        "shieldWord": "日本AV女優"
    },
    "4642": {
        "id": 4642,
        "shieldWord": "激情貼圖"
    },
    "4643": {
        "id": 4643,
        "shieldWord": "成人論壇"
    },
    "4644": {
        "id": 4644,
        "shieldWord": "就去誘惑"
    },
    "4645": {
        "id": 4645,
        "shieldWord": "激情裸體"
    },
    "4646": {
        "id": 4646,
        "shieldWord": "麗春苑"
    },
    "4647": {
        "id": 4647,
        "shieldWord": "窩窩客"
    },
    "4648": {
        "id": 4648,
        "shieldWord": "銀民吧"
    },
    "4649": {
        "id": 4649,
        "shieldWord": "亞洲色"
    },
    "4650": {
        "id": 4650,
        "shieldWord": "愛色cc"
    },
    "4651": {
        "id": 4651,
        "shieldWord": "妹妹騷圖"
    },
    "4652": {
        "id": 4652,
        "shieldWord": "賓館女郎"
    },
    "4653": {
        "id": 4653,
        "shieldWord": "美腿絲足"
    },
    "4654": {
        "id": 4654,
        "shieldWord": "無碼長片"
    },
    "4655": {
        "id": 4655,
        "shieldWord": "淫水漣漣"
    },
    "4656": {
        "id": 4656,
        "shieldWord": "放蕩少婦"
    },
    "4657": {
        "id": 4657,
        "shieldWord": "成人圖片"
    },
    "4658": {
        "id": 4658,
        "shieldWord": "黃金聖水"
    },
    "4659": {
        "id": 4659,
        "shieldWord": "腳交"
    },
    "4660": {
        "id": 4660,
        "shieldWord": "勾魂少婦"
    },
    "4661": {
        "id": 4661,
        "shieldWord": "乳此絲襪"
    },
    "4662": {
        "id": 4662,
        "shieldWord": "日本灌腸"
    },
    "4663": {
        "id": 4663,
        "shieldWord": "集體性愛"
    },
    "4664": {
        "id": 4664,
        "shieldWord": "國產騷貨"
    },
    "4665": {
        "id": 4665,
        "shieldWord": "亞洲淫娃"
    },
    "4666": {
        "id": 4666,
        "shieldWord": "熟女亂倫"
    },
    "4667": {
        "id": 4667,
        "shieldWord": "無碼H漫"
    },
    "4668": {
        "id": 4668,
        "shieldWord": "大膽少女"
    },
    "4669": {
        "id": 4669,
        "shieldWord": "乳此豐滿"
    },
    "4670": {
        "id": 4670,
        "shieldWord": "屄屄特寫"
    },
    "4671": {
        "id": 4671,
        "shieldWord": "熟女顏射"
    },
    "4672": {
        "id": 4672,
        "shieldWord": "恥辱輪奸"
    },
    "4673": {
        "id": 4673,
        "shieldWord": "嫵媚挑逗"
    },
    "4674": {
        "id": 4674,
        "shieldWord": "騷姨媽"
    },
    "4675": {
        "id": 4675,
        "shieldWord": "裸體少婦"
    },
    "4676": {
        "id": 4676,
        "shieldWord": "美少婦"
    },
    "4677": {
        "id": 4677,
        "shieldWord": "楊思敏"
    },
    "4678": {
        "id": 4678,
        "shieldWord": "風騷淫蕩"
    },
    "4679": {
        "id": 4679,
        "shieldWord": "明星淫圖"
    },
    "4680": {
        "id": 4680,
        "shieldWord": "淫亂熟女"
    },
    "4681": {
        "id": 4681,
        "shieldWord": "高清性愛"
    },
    "4682": {
        "id": 4682,
        "shieldWord": "高潮集錦"
    },
    "4683": {
        "id": 4683,
        "shieldWord": "淫獸學園"
    },
    "4684": {
        "id": 4684,
        "shieldWord": "俏臀攝魄"
    },
    "4685": {
        "id": 4685,
        "shieldWord": "無套內射"
    },
    "4686": {
        "id": 4686,
        "shieldWord": "毛鮑"
    },
    "4687": {
        "id": 4687,
        "shieldWord": "3P炮圖"
    },
    "4688": {
        "id": 4688,
        "shieldWord": "性交課"
    },
    "4689": {
        "id": 4689,
        "shieldWord": "性感妖嬈"
    },
    "4690": {
        "id": 4690,
        "shieldWord": "人妻交換"
    },
    "4691": {
        "id": 4691,
        "shieldWord": "監禁陵辱"
    },
    "4692": {
        "id": 4692,
        "shieldWord": "生徒胸觸"
    },
    "4693": {
        "id": 4693,
        "shieldWord": "東洋屄"
    },
    "4694": {
        "id": 4694,
        "shieldWord": "翹臀嫩穴"
    },
    "4695": {
        "id": 4695,
        "shieldWord": "春光外瀉"
    },
    "4696": {
        "id": 4696,
        "shieldWord": "淫婦自慰"
    },
    "4697": {
        "id": 4697,
        "shieldWord": "本土無碼"
    },
    "4698": {
        "id": 4698,
        "shieldWord": "淫妻交換"
    },
    "4699": {
        "id": 4699,
        "shieldWord": "近親相奸"
    },
    "4700": {
        "id": 4700,
        "shieldWord": "豔乳"
    },
    "4701": {
        "id": 4701,
        "shieldWord": "肛門噴水"
    },
    "4702": {
        "id": 4702,
        "shieldWord": "淫蕩貴婦"
    },
    "4703": {
        "id": 4703,
        "shieldWord": "鬼畜輪奸"
    },
    "4704": {
        "id": 4704,
        "shieldWord": "浴室亂倫"
    },
    "4705": {
        "id": 4705,
        "shieldWord": "生奸內射"
    },
    "4706": {
        "id": 4706,
        "shieldWord": "國產嫖娼"
    },
    "4707": {
        "id": 4707,
        "shieldWord": "白液四濺"
    },
    "4708": {
        "id": 4708,
        "shieldWord": "帶套肛交"
    },
    "4709": {
        "id": 4709,
        "shieldWord": "大亂交"
    },
    "4710": {
        "id": 4710,
        "shieldWord": "無碼炮圖"
    },
    "4711": {
        "id": 4711,
        "shieldWord": "群陰會"
    },
    "4712": {
        "id": 4712,
        "shieldWord": "極品波神"
    },
    "4713": {
        "id": 4713,
        "shieldWord": "淫亂工作"
    },
    "4714": {
        "id": 4714,
        "shieldWord": "白漿四濺"
    },
    "4715": {
        "id": 4715,
        "shieldWord": "街頭扒衣"
    },
    "4716": {
        "id": 4716,
        "shieldWord": "口內爆射"
    },
    "4717": {
        "id": 4717,
        "shieldWord": "肛門拳交"
    },
    "4718": {
        "id": 4718,
        "shieldWord": "灌滿精液"
    },
    "4719": {
        "id": 4719,
        "shieldWord": "蓮花逼"
    },
    "4720": {
        "id": 4720,
        "shieldWord": "自慰摳穴"
    },
    "4721": {
        "id": 4721,
        "shieldWord": "洗腸射尿"
    },
    "4722": {
        "id": 4722,
        "shieldWord": "人妻色誘"
    },
    "4723": {
        "id": 4723,
        "shieldWord": "淫漿"
    },
    "4724": {
        "id": 4724,
        "shieldWord": "騷浪"
    },
    "4725": {
        "id": 4725,
        "shieldWord": "蘚鮑"
    },
    "4726": {
        "id": 4726,
        "shieldWord": "無毛穴"
    },
    "4727": {
        "id": 4727,
        "shieldWord": "騷浪美女"
    },
    "4728": {
        "id": 4728,
        "shieldWord": "舌頭穴"
    },
    "4729": {
        "id": 4729,
        "shieldWord": "人妻做愛"
    },
    "4730": {
        "id": 4730,
        "shieldWord": "插穴止癢"
    },
    "4731": {
        "id": 4731,
        "shieldWord": "騷乳"
    },
    "4732": {
        "id": 4732,
        "shieldWord": "插陰莖"
    },
    "4733": {
        "id": 4733,
        "shieldWord": "淫亂潮吹"
    },
    "4734": {
        "id": 4734,
        "shieldWord": "熟婦人妻"
    },
    "4735": {
        "id": 4735,
        "shieldWord": "性傭"
    },
    "4736": {
        "id": 4736,
        "shieldWord": "嫩鮑"
    },
    "4737": {
        "id": 4737,
        "shieldWord": "騷母"
    },
    "4738": {
        "id": 4738,
        "shieldWord": "吃雞巴"
    },
    "4739": {
        "id": 4739,
        "shieldWord": "體奸"
    },
    "4740": {
        "id": 4740,
        "shieldWord": "廁所盜攝"
    },
    "4741": {
        "id": 4741,
        "shieldWord": "豔婦淫女"
    },
    "4742": {
        "id": 4742,
        "shieldWord": "盜撮"
    },
    "4743": {
        "id": 4743,
        "shieldWord": "薄碼"
    },
    "4744": {
        "id": 4744,
        "shieldWord": "巧淫奸戲"
    },
    "4745": {
        "id": 4745,
        "shieldWord": "換妻大會"
    },
    "4746": {
        "id": 4746,
        "shieldWord": "破處"
    },
    "4747": {
        "id": 4747,
        "shieldWord": "g點"
    },
    "4748": {
        "id": 4748,
        "shieldWord": "歡歡娛樂時空"
    },
    "4749": {
        "id": 4749,
        "shieldWord": "褲襪"
    },
    "4750": {
        "id": 4750,
        "shieldWord": "亂倫"
    },
    "4751": {
        "id": 4751,
        "shieldWord": "買春"
    },
    "4752": {
        "id": 4752,
        "shieldWord": "妹妹陰毛"
    },
    "4753": {
        "id": 4753,
        "shieldWord": "免費成人網站"
    },
    "4754": {
        "id": 4754,
        "shieldWord": "免費偷窺網"
    },
    "4755": {
        "id": 4755,
        "shieldWord": "免費A片"
    },
    "4756": {
        "id": 4756,
        "shieldWord": "女優"
    },
    "4757": {
        "id": 4757,
        "shieldWord": "騷姐姐"
    },
    "4758": {
        "id": 4758,
        "shieldWord": "色區"
    },
    "4759": {
        "id": 4759,
        "shieldWord": "色書庫"
    },
    "4760": {
        "id": 4760,
        "shieldWord": "射顏"
    },
    "4761": {
        "id": 4761,
        "shieldWord": "下流地帶"
    },
    "4762": {
        "id": 4762,
        "shieldWord": "性饑渴"
    },
    "4763": {
        "id": 4763,
        "shieldWord": "陰部"
    },
    "4764": {
        "id": 4764,
        "shieldWord": "淫圖"
    },
    "4765": {
        "id": 4765,
        "shieldWord": "情色文學"
    },
    "4766": {
        "id": 4766,
        "shieldWord": "群交亂舞"
    },
    "4767": {
        "id": 4767,
        "shieldWord": "日本騷貨"
    },
    "4768": {
        "id": 4768,
        "shieldWord": "肉溝"
    },
    "4769": {
        "id": 4769,
        "shieldWord": "肉棍幹騷婦"
    },
    "4770": {
        "id": 4770,
        "shieldWord": "肉壺"
    },
    "4771": {
        "id": 4771,
        "shieldWord": "騷妹"
    },
    "4772": {
        "id": 4772,
        "shieldWord": "騷女"
    },
    "4773": {
        "id": 4773,
        "shieldWord": "騷水"
    },
    "4774": {
        "id": 4774,
        "shieldWord": "騷穴"
    },
    "4775": {
        "id": 4775,
        "shieldWord": "色狐狸網址"
    },
    "4776": {
        "id": 4776,
        "shieldWord": "色狼論壇"
    },
    "4777": {
        "id": 4777,
        "shieldWord": "色狼小說"
    },
    "4778": {
        "id": 4778,
        "shieldWord": "濕穴"
    },
    "4779": {
        "id": 4779,
        "shieldWord": "做愛電影"
    },
    "4780": {
        "id": 4780,
        "shieldWord": "色誘"
    },
    "4781": {
        "id": 4781,
        "shieldWord": "採花堂"
    },
    "4782": {
        "id": 4782,
        "shieldWord": "亞洲性虐"
    },
    "4783": {
        "id": 4783,
        "shieldWord": "淫婦"
    },
    "4784": {
        "id": 4784,
        "shieldWord": "淫賤"
    },
    "4785": {
        "id": 4785,
        "shieldWord": "歡樂性今宵"
    },
    "4786": {
        "id": 4786,
        "shieldWord": "性愛圖片"
    },
    "4787": {
        "id": 4787,
        "shieldWord": "乳溝"
    },
    "4788": {
        "id": 4788,
        "shieldWord": "淫蟲"
    },
    "4789": {
        "id": 4789,
        "shieldWord": "小姐打飛機"
    },
    "4790": {
        "id": 4790,
        "shieldWord": "Ｘ到噴屎尿"
    },
    "4791": {
        "id": 4791,
        "shieldWord": "姦情"
    },
    "4792": {
        "id": 4792,
        "shieldWord": "被幹"
    },
    "4793": {
        "id": 4793,
        "shieldWord": "陰締"
    },
    "4794": {
        "id": 4794,
        "shieldWord": "內射"
    },
    "4795": {
        "id": 4795,
        "shieldWord": "成人午夜場"
    },
    "4796": {
        "id": 4796,
        "shieldWord": "買春堂"
    },
    "4797": {
        "id": 4797,
        "shieldWord": "成人社區"
    },
    "4798": {
        "id": 4798,
        "shieldWord": "做愛自拍"
    },
    "4799": {
        "id": 4799,
        "shieldWord": "夫妻俱樂部"
    },
    "4800": {
        "id": 4800,
        "shieldWord": "誘色uu"
    },
    "4801": {
        "id": 4801,
        "shieldWord": "熟婦"
    },
    "4802": {
        "id": 4802,
        "shieldWord": "mm美圖"
    },
    "4803": {
        "id": 4803,
        "shieldWord": "虎騎"
    },
    "4804": {
        "id": 4804,
        "shieldWord": "咪咪圖片"
    },
    "4805": {
        "id": 4805,
        "shieldWord": "成人導航"
    },
    "4806": {
        "id": 4806,
        "shieldWord": "深愛色色"
    },
    "4807": {
        "id": 4807,
        "shieldWord": "廁所偷拍"
    },
    "4808": {
        "id": 4808,
        "shieldWord": "釋欲"
    },
    "4809": {
        "id": 4809,
        "shieldWord": "你色嗎"
    },
    "4810": {
        "id": 4810,
        "shieldWord": "裙內偷拍"
    },
    "4811": {
        "id": 4811,
        "shieldWord": "色97愛"
    },
    "4812": {
        "id": 4812,
        "shieldWord": "絲誘"
    },
    "4813": {
        "id": 4813,
        "shieldWord": "色情工廠"
    },
    "4814": {
        "id": 4814,
        "shieldWord": "美體豔姿"
    },
    "4815": {
        "id": 4815,
        "shieldWord": "顏射自拍"
    },
    "4816": {
        "id": 4816,
        "shieldWord": "肉絲褲襪"
    },
    "4817": {
        "id": 4817,
        "shieldWord": "sm調教"
    },
    "4818": {
        "id": 4818,
        "shieldWord": "愛幼閣"
    },
    "4819": {
        "id": 4819,
        "shieldWord": "花樣性交"
    },
    "4820": {
        "id": 4820,
        "shieldWord": "大奶騷女"
    },
    "4821": {
        "id": 4821,
        "shieldWord": "性愛插穴"
    },
    "4822": {
        "id": 4822,
        "shieldWord": "淫水四濺"
    },
    "4823": {
        "id": 4823,
        "shieldWord": "大膽出位"
    },
    "4824": {
        "id": 4824,
        "shieldWord": "旅館自拍"
    },
    "4825": {
        "id": 4825,
        "shieldWord": "無套自拍"
    },
    "4826": {
        "id": 4826,
        "shieldWord": "快樂AV"
    },
    "4827": {
        "id": 4827,
        "shieldWord": "國產無碼"
    },
    "4828": {
        "id": 4828,
        "shieldWord": "強制浣腸"
    },
    "4829": {
        "id": 4829,
        "shieldWord": "凸肉優"
    },
    "4830": {
        "id": 4830,
        "shieldWord": "騷妹妹"
    },
    "4831": {
        "id": 4831,
        "shieldWord": "雙龍入洞"
    },
    "4832": {
        "id": 4832,
        "shieldWord": "處女開包"
    },
    "4833": {
        "id": 4833,
        "shieldWord": "調教虐待"
    },
    "4834": {
        "id": 4834,
        "shieldWord": "淫肉誘惑"
    },
    "4835": {
        "id": 4835,
        "shieldWord": "激情潮噴"
    },
    "4836": {
        "id": 4836,
        "shieldWord": "騷穴怒放"
    },
    "4837": {
        "id": 4837,
        "shieldWord": "饅頭屄"
    },
    "4838": {
        "id": 4838,
        "shieldWord": "無碼絲襪"
    },
    "4839": {
        "id": 4839,
        "shieldWord": "寫真"
    },
    "4840": {
        "id": 4840,
        "shieldWord": "輪操"
    },
    "4841": {
        "id": 4841,
        "shieldWord": "淫亂診所"
    },
    "4842": {
        "id": 4842,
        "shieldWord": "極品奶妹"
    },
    "4843": {
        "id": 4843,
        "shieldWord": "巨乳俏女醫"
    },
    "4844": {
        "id": 4844,
        "shieldWord": "扉之陰"
    },
    "4845": {
        "id": 4845,
        "shieldWord": "丁字褲翹臀"
    },
    "4846": {
        "id": 4846,
        "shieldWord": "輪奸內射"
    },
    "4847": {
        "id": 4847,
        "shieldWord": "美乳鬥豔"
    },
    "4848": {
        "id": 4848,
        "shieldWord": "舔雞巴"
    },
    "4849": {
        "id": 4849,
        "shieldWord": "騷B熟女"
    },
    "4850": {
        "id": 4850,
        "shieldWord": "淫絲蕩襪"
    },
    "4851": {
        "id": 4851,
        "shieldWord": "奴隸調教"
    },
    "4852": {
        "id": 4852,
        "shieldWord": "陰阜高聳"
    },
    "4853": {
        "id": 4853,
        "shieldWord": "翹臀嫩逼"
    },
    "4854": {
        "id": 4854,
        "shieldWord": "媚藥少年"
    },
    "4855": {
        "id": 4855,
        "shieldWord": "無修正"
    },
    "4856": {
        "id": 4856,
        "shieldWord": "國產AV"
    },
    "4857": {
        "id": 4857,
        "shieldWord": "淫水橫流"
    },
    "4858": {
        "id": 4858,
        "shieldWord": "插入內射"
    },
    "4859": {
        "id": 4859,
        "shieldWord": "東熱空姐"
    },
    "4860": {
        "id": 4860,
        "shieldWord": "絲襪淫婦"
    },
    "4861": {
        "id": 4861,
        "shieldWord": "乳此動人"
    },
    "4862": {
        "id": 4862,
        "shieldWord": "大波騷婦"
    },
    "4863": {
        "id": 4863,
        "shieldWord": "無碼做愛"
    },
    "4864": {
        "id": 4864,
        "shieldWord": "放蕩熟女"
    },
    "4865": {
        "id": 4865,
        "shieldWord": "巨炮兵團"
    },
    "4866": {
        "id": 4866,
        "shieldWord": "愛妻淫穴"
    },
    "4867": {
        "id": 4867,
        "shieldWord": "無碼精選"
    },
    "4868": {
        "id": 4868,
        "shieldWord": "超毛大鮑"
    },
    "4869": {
        "id": 4869,
        "shieldWord": "熟婦騷器"
    },
    "4870": {
        "id": 4870,
        "shieldWord": "內射美婦"
    },
    "4871": {
        "id": 4871,
        "shieldWord": "毒龍舔腳"
    },
    "4872": {
        "id": 4872,
        "shieldWord": "性愛擂臺"
    },
    "4873": {
        "id": 4873,
        "shieldWord": "聖泉學淫"
    },
    "4874": {
        "id": 4874,
        "shieldWord": "性奴會"
    },
    "4875": {
        "id": 4875,
        "shieldWord": "操腫"
    },
    "4876": {
        "id": 4876,
        "shieldWord": "無碼淫女"
    },
    "4877": {
        "id": 4877,
        "shieldWord": "淫癡"
    },
    "4878": {
        "id": 4878,
        "shieldWord": "風騷欲女"
    },
    "4879": {
        "id": 4879,
        "shieldWord": "操穴噴水"
    },
    "4880": {
        "id": 4880,
        "shieldWord": "肉簫"
    },
    "4881": {
        "id": 4881,
        "shieldWord": "巨騷"
    },
    "4882": {
        "id": 4882,
        "shieldWord": "騷妻"
    },
    "4883": {
        "id": 4883,
        "shieldWord": "騷屄"
    },
    "4884": {
        "id": 4884,
        "shieldWord": "高潮白漿"
    },
    "4885": {
        "id": 4885,
        "shieldWord": "性戰擂臺"
    },
    "4886": {
        "id": 4886,
        "shieldWord": "淫女炮圖"
    },
    "4887": {
        "id": 4887,
        "shieldWord": "淫水橫溢"
    },
    "4888": {
        "id": 4888,
        "shieldWord": "公媳亂"
    },
    "4889": {
        "id": 4889,
        "shieldWord": "集體淫"
    },
    "4890": {
        "id": 4890,
        "shieldWord": "小嫩雞"
    },
    "4891": {
        "id": 4891,
        "shieldWord": "淫水翻騰"
    },
    "4892": {
        "id": 4892,
        "shieldWord": "羞恥母"
    },
    "4893": {
        "id": 4893,
        "shieldWord": "豔照"
    },
    "4894": {
        "id": 4894,
        "shieldWord": "緊穴"
    },
    "4895": {
        "id": 4895,
        "shieldWord": "露點"
    },
    "4896": {
        "id": 4896,
        "shieldWord": "無碼電影"
    },
    "4897": {
        "id": 4897,
        "shieldWord": "愛液"
    },
    "4898": {
        "id": 4898,
        "shieldWord": "蕩婦"
    },
    "4899": {
        "id": 4899,
        "shieldWord": "蕩女"
    },
    "4900": {
        "id": 4900,
        "shieldWord": "迷藥"
    },
    "4901": {
        "id": 4901,
        "shieldWord": "乳頭"
    },
    "4902": {
        "id": 4902,
        "shieldWord": "無碼"
    },
    "4903": {
        "id": 4903,
        "shieldWord": "現代情色小說"
    },
    "4904": {
        "id": 4904,
        "shieldWord": "性交圖"
    },
    "4905": {
        "id": 4905,
        "shieldWord": "豔情小說"
    },
    "4906": {
        "id": 4906,
        "shieldWord": "陰部特寫"
    },
    "4907": {
        "id": 4907,
        "shieldWord": "陰道圖片"
    },
    "4908": {
        "id": 4908,
        "shieldWord": "淫書"
    },
    "4909": {
        "id": 4909,
        "shieldWord": "玉蒲團玉女心經"
    },
    "4910": {
        "id": 4910,
        "shieldWord": "中國成人論壇"
    },
    "4911": {
        "id": 4911,
        "shieldWord": "中國性愛城"
    },
    "4912": {
        "id": 4912,
        "shieldWord": "自拍寫真"
    },
    "4913": {
        "id": 4913,
        "shieldWord": "做愛圖片"
    },
    "4914": {
        "id": 4914,
        "shieldWord": "萬淫堂"
    },
    "4915": {
        "id": 4915,
        "shieldWord": "穴圖"
    },
    "4916": {
        "id": 4916,
        "shieldWord": "豔舞淫業"
    },
    "4917": {
        "id": 4917,
        "shieldWord": "咬著龜頭"
    },
    "4918": {
        "id": 4918,
        "shieldWord": "一夜性網"
    },
    "4919": {
        "id": 4919,
        "shieldWord": "陰莖插小穴"
    },
    "4920": {
        "id": 4920,
        "shieldWord": "陰穴新玩法"
    },
    "4921": {
        "id": 4921,
        "shieldWord": "淫亂軍團"
    },
    "4922": {
        "id": 4922,
        "shieldWord": "鑽插"
    },
    "4923": {
        "id": 4923,
        "shieldWord": "H動漫"
    },
    "4924": {
        "id": 4924,
        "shieldWord": "交換夫妻"
    },
    "4925": {
        "id": 4925,
        "shieldWord": "舔腳"
    },
    "4926": {
        "id": 4926,
        "shieldWord": "絲襪"
    },
    "4927": {
        "id": 4927,
        "shieldWord": "亞洲情色網"
    },
    "4928": {
        "id": 4928,
        "shieldWord": "強姦處女"
    },
    "4929": {
        "id": 4929,
        "shieldWord": "雞巴暴脹"
    },
    "4930": {
        "id": 4930,
        "shieldWord": "大眾色情成人網"
    },
    "4931": {
        "id": 4931,
        "shieldWord": "火辣圖片"
    },
    "4932": {
        "id": 4932,
        "shieldWord": "淫聲浪語"
    },
    "4933": {
        "id": 4933,
        "shieldWord": "瘋狂抽送"
    },
    "4934": {
        "id": 4934,
        "shieldWord": "強暴"
    },
    "4935": {
        "id": 4935,
        "shieldWord": "多人性愛"
    },
    "4936": {
        "id": 4936,
        "shieldWord": "色情論壇"
    },
    "4937": {
        "id": 4937,
        "shieldWord": "性虎色網"
    },
    "4938": {
        "id": 4938,
        "shieldWord": "騷女叫春"
    },
    "4939": {
        "id": 4939,
        "shieldWord": "成人百強"
    },
    "4940": {
        "id": 4940,
        "shieldWord": "天天干貼圖"
    },
    "4941": {
        "id": 4941,
        "shieldWord": "密穴貼圖"
    },
    "4942": {
        "id": 4942,
        "shieldWord": "淩辱"
    },
    "4943": {
        "id": 4943,
        "shieldWord": "偷歡"
    },
    "4944": {
        "id": 4944,
        "shieldWord": "酥癢"
    },
    "4945": {
        "id": 4945,
        "shieldWord": "浪婦"
    },
    "4946": {
        "id": 4946,
        "shieldWord": "肉縫"
    },
    "4947": {
        "id": 4947,
        "shieldWord": "色窩窩"
    },
    "4948": {
        "id": 4948,
        "shieldWord": "騷洞"
    },
    "4949": {
        "id": 4949,
        "shieldWord": "陰精"
    },
    "4950": {
        "id": 4950,
        "shieldWord": "陰阜"
    },
    "4951": {
        "id": 4951,
        "shieldWord": "陰屄"
    },
    "4952": {
        "id": 4952,
        "shieldWord": "六月聯盟"
    },
    "4953": {
        "id": 4953,
        "shieldWord": "55sss偷拍區"
    },
    "4954": {
        "id": 4954,
        "shieldWord": "張筱雨"
    },
    "4955": {
        "id": 4955,
        "shieldWord": "極品黑絲"
    },
    "4956": {
        "id": 4956,
        "shieldWord": "絲襪寫真"
    },
    "4957": {
        "id": 4957,
        "shieldWord": "成人小說"
    },
    "4958": {
        "id": 4958,
        "shieldWord": "成人文學"
    },
    "4959": {
        "id": 4959,
        "shieldWord": "情色藝術天空"
    },
    "4960": {
        "id": 4960,
        "shieldWord": "222se圖片"
    },
    "4961": {
        "id": 4961,
        "shieldWord": "淫色貼圖"
    },
    "4962": {
        "id": 4962,
        "shieldWord": "廁奴"
    },
    "4963": {
        "id": 4963,
        "shieldWord": "酥胸誘惑"
    },
    "4964": {
        "id": 4964,
        "shieldWord": "人體攝影"
    },
    "4965": {
        "id": 4965,
        "shieldWord": "東北xx網"
    },
    "4966": {
        "id": 4966,
        "shieldWord": "瑪雅網"
    },
    "4967": {
        "id": 4967,
        "shieldWord": "週六性吧"
    },
    "4968": {
        "id": 4968,
        "shieldWord": "誘惑視頻"
    },
    "4969": {
        "id": 4969,
        "shieldWord": "裙下風光"
    },
    "4970": {
        "id": 4970,
        "shieldWord": "嘻遊中國"
    },
    "4971": {
        "id": 4971,
        "shieldWord": "禦の二代目"
    },
    "4972": {
        "id": 4972,
        "shieldWord": "絲襪足交"
    },
    "4973": {
        "id": 4973,
        "shieldWord": "骯髒美學"
    },
    "4974": {
        "id": 4974,
        "shieldWord": "亞洲有碼"
    },
    "4975": {
        "id": 4975,
        "shieldWord": "絲襪高跟"
    },
    "4976": {
        "id": 4976,
        "shieldWord": "原味絲襪"
    },
    "4977": {
        "id": 4977,
        "shieldWord": "針孔偷拍"
    },
    "4978": {
        "id": 4978,
        "shieldWord": "放蕩少婦賓館"
    },
    "4979": {
        "id": 4979,
        "shieldWord": "性感肉絲"
    },
    "4980": {
        "id": 4980,
        "shieldWord": "北京xx網"
    },
    "4981": {
        "id": 4981,
        "shieldWord": "情色導航"
    },
    "4982": {
        "id": 4982,
        "shieldWord": "歐美大乳"
    },
    "4983": {
        "id": 4983,
        "shieldWord": "歐美無套"
    },
    "4984": {
        "id": 4984,
        "shieldWord": "騷婦露逼"
    },
    "4985": {
        "id": 4985,
        "shieldWord": "淫水絲襪"
    },
    "4986": {
        "id": 4986,
        "shieldWord": "母女雙飛"
    },
    "4987": {
        "id": 4987,
        "shieldWord": "老少亂倫"
    },
    "4988": {
        "id": 4988,
        "shieldWord": "前凸後翹"
    },
    "4989": {
        "id": 4989,
        "shieldWord": "制服誘惑"
    },
    "4990": {
        "id": 4990,
        "shieldWord": "性交無碼"
    },
    "4991": {
        "id": 4991,
        "shieldWord": "淫驢屯"
    },
    "4992": {
        "id": 4992,
        "shieldWord": "少婦偷情"
    },
    "4993": {
        "id": 4993,
        "shieldWord": "護士誘惑"
    },
    "4994": {
        "id": 4994,
        "shieldWord": "群奸亂交"
    },
    "4995": {
        "id": 4995,
        "shieldWord": "極品白虎"
    },
    "4996": {
        "id": 4996,
        "shieldWord": "曲線消魂"
    },
    "4997": {
        "id": 4997,
        "shieldWord": "無碼淫漫"
    },
    "4998": {
        "id": 4998,
        "shieldWord": "假陽具插穴"
    },
    "4999": {
        "id": 4999,
        "shieldWord": "愛液橫流"
    },
    "5000": {
        "id": 5000,
        "shieldWord": "無碼無套"
    },
    "5001": {
        "id": 5001,
        "shieldWord": "淫戰群P"
    },
    "5002": {
        "id": 5002,
        "shieldWord": "濕身誘惑"
    },
    "5003": {
        "id": 5003,
        "shieldWord": "火辣寫真"
    },
    "5004": {
        "id": 5004,
        "shieldWord": "動漫色圖"
    },
    "5005": {
        "id": 5005,
        "shieldWord": "熟女護士"
    },
    "5006": {
        "id": 5006,
        "shieldWord": "粉紅穴"
    },
    "5007": {
        "id": 5007,
        "shieldWord": "經典炮圖"
    },
    "5008": {
        "id": 5008,
        "shieldWord": "童顏巨乳"
    },
    "5009": {
        "id": 5009,
        "shieldWord": "性感誘惑"
    },
    "5010": {
        "id": 5010,
        "shieldWord": "援交薄碼"
    },
    "5011": {
        "id": 5011,
        "shieldWord": "奇淫寶鑒"
    },
    "5012": {
        "id": 5012,
        "shieldWord": "美騷婦"
    },
    "5013": {
        "id": 5013,
        "shieldWord": "無毛美少女"
    },
    "5014": {
        "id": 5014,
        "shieldWord": "日本有碼"
    },
    "5015": {
        "id": 5015,
        "shieldWord": "制服美婦"
    },
    "5016": {
        "id": 5016,
        "shieldWord": "無碼彩圖"
    },
    "5017": {
        "id": 5017,
        "shieldWord": "豐唇豔姬"
    },
    "5018": {
        "id": 5018,
        "shieldWord": "群奸輪射"
    },
    "5019": {
        "id": 5019,
        "shieldWord": "高級逼"
    },
    "5020": {
        "id": 5020,
        "shieldWord": "淫東方"
    },
    "5021": {
        "id": 5021,
        "shieldWord": "國產偷拍"
    },
    "5022": {
        "id": 5022,
        "shieldWord": "清晰內射"
    },
    "5023": {
        "id": 5023,
        "shieldWord": "嫩穴肉縫"
    },
    "5024": {
        "id": 5024,
        "shieldWord": "騷婦掰B"
    },
    "5025": {
        "id": 5025,
        "shieldWord": "白嫩騷婦"
    },
    "5026": {
        "id": 5026,
        "shieldWord": "潮噴"
    },
    "5027": {
        "id": 5027,
        "shieldWord": "無碼體驗"
    },
    "5028": {
        "id": 5028,
        "shieldWord": "吞精騷妹"
    },
    "5029": {
        "id": 5029,
        "shieldWord": "緊縛淩辱"
    },
    "5030": {
        "id": 5030,
        "shieldWord": "姦淫電車"
    },
    "5031": {
        "id": 5031,
        "shieldWord": "墮淫"
    },
    "5032": {
        "id": 5032,
        "shieldWord": "顏騎"
    },
    "5033": {
        "id": 5033,
        "shieldWord": "胸濤乳浪"
    },
    "5034": {
        "id": 5034,
        "shieldWord": "夫妻亂交"
    },
    "5035": {
        "id": 5035,
        "shieldWord": "換妻雜交"
    },
    "5036": {
        "id": 5036,
        "shieldWord": "多人輪"
    },
    "5037": {
        "id": 5037,
        "shieldWord": "奶挺臀翹"
    },
    "5038": {
        "id": 5038,
        "shieldWord": "癡乳"
    },
    "5039": {
        "id": 5039,
        "shieldWord": "鬼輪奸"
    },
    "5040": {
        "id": 5040,
        "shieldWord": "淫樣"
    },
    "5041": {
        "id": 5041,
        "shieldWord": "插後庭"
    },
    "5042": {
        "id": 5042,
        "shieldWord": "嫩縫"
    },
    "5043": {
        "id": 5043,
        "shieldWord": "騷媽"
    },
    "5044": {
        "id": 5044,
        "shieldWord": "暴幹"
    },
    "5045": {
        "id": 5045,
        "shieldWord": "母子交歡"
    },
    "5046": {
        "id": 5046,
        "shieldWord": "足腳交"
    },
    "5047": {
        "id": 5047,
        "shieldWord": "柔陰術"
    },
    "5048": {
        "id": 5048,
        "shieldWord": "淫師蕩母"
    },
    "5049": {
        "id": 5049,
        "shieldWord": "欠幹"
    },
    "5050": {
        "id": 5050,
        "shieldWord": "桃園蜜洞"
    },
    "5051": {
        "id": 5051,
        "shieldWord": "連続失禁"
    },
    "5052": {
        "id": 5052,
        "shieldWord": "大雞巴"
    },
    "5053": {
        "id": 5053,
        "shieldWord": "叫雞"
    },
    "5054": {
        "id": 5054,
        "shieldWord": "騷浪人妻"
    },
    "5055": {
        "id": 5055,
        "shieldWord": "三級片"
    },
    "5056": {
        "id": 5056,
        "shieldWord": "東京熱"
    },
    "5057": {
        "id": 5057,
        "shieldWord": "做愛"
    },
    "5058": {
        "id": 5058,
        "shieldWord": "子宮"
    },
    "5059": {
        "id": 5059,
        "shieldWord": "雜種"
    },
    "5060": {
        "id": 5060,
        "shieldWord": "陰毛"
    },
    "5061": {
        "id": 5061,
        "shieldWord": "陰戶"
    },
    "5062": {
        "id": 5062,
        "shieldWord": "陰蒂"
    },
    "5063": {
        "id": 5063,
        "shieldWord": "爺爺"
    },
    "5064": {
        "id": 5064,
        "shieldWord": "陽具"
    },
    "5065": {
        "id": 5065,
        "shieldWord": "性愛"
    },
    "5066": {
        "id": 5066,
        "shieldWord": "小雞雞"
    },
    "5067": {
        "id": 5067,
        "shieldWord": "慰安婦"
    },
    "5068": {
        "id": 5068,
        "shieldWord": "猥褻"
    },
    "5069": {
        "id": 5069,
        "shieldWord": "猥瑣"
    },
    "5070": {
        "id": 5070,
        "shieldWord": "煞筆"
    },
    "5071": {
        "id": 5071,
        "shieldWord": "騷逼"
    },
    "5072": {
        "id": 5072,
        "shieldWord": "肉體"
    },
    "5073": {
        "id": 5073,
        "shieldWord": "女幹"
    },
    "5074": {
        "id": 5074,
        "shieldWord": "滅族"
    },
    "5075": {
        "id": 5075,
        "shieldWord": "賤"
    },
    "5076": {
        "id": 5076,
        "shieldWord": "雞吧"
    },
    "5077": {
        "id": 5077,
        "shieldWord": "龜頭"
    },
    "5078": {
        "id": 5078,
        "shieldWord": "根正苗紅"
    },
    "5079": {
        "id": 5079,
        "shieldWord": "瘋狗"
    },
    "5080": {
        "id": 5080,
        "shieldWord": "打飛機"
    },
    "5081": {
        "id": 5081,
        "shieldWord": "癟三"
    },
    "5082": {
        "id": 5082,
        "shieldWord": "媽逼"
    },
    "5083": {
        "id": 5083,
        "shieldWord": "媽"
    },
    "5084": {
        "id": 5084,
        "shieldWord": "爺"
    },
    "5085": {
        "id": 5085,
        "shieldWord": "兒子"
    },
    "5086": {
        "id": 5086,
        "shieldWord": "尼瑪"
    },
    "5087": {
        "id": 5087,
        "shieldWord": "裝B"
    },
    "5088": {
        "id": 5088,
        "shieldWord": "偷窺視頻"
    },
    "5089": {
        "id": 5089,
        "shieldWord": "獸獸門"
    },
    "5090": {
        "id": 5090,
        "shieldWord": "愛滋病"
    },
    "5091": {
        "id": 5091,
        "shieldWord": "陽物"
    },
    "5092": {
        "id": 5092,
        "shieldWord": "開房"
    },
    "5093": {
        "id": 5093,
        "shieldWord": "黃色網站"
    },
    "5094": {
        "id": 5094,
        "shieldWord": "遊戲相關屏蔽词"
    },
    "5095": {
        "id": 5095,
        "shieldWord": "管裡"
    },
    "5096": {
        "id": 5096,
        "shieldWord": "管理員"
    },
    "5097": {
        "id": 5097,
        "shieldWord": "服務管理"
    },
    "5098": {
        "id": 5098,
        "shieldWord": "伺服器"
    },
    "5099": {
        "id": 5099,
        "shieldWord": "活動管理員"
    },
    "5100": {
        "id": 5100,
        "shieldWord": "冬季熱"
    },
    "5101": {
        "id": 5101,
        "shieldWord": "維護"
    },
    "5102": {
        "id": 5102,
        "shieldWord": "系統"
    },
    "5103": {
        "id": 5103,
        "shieldWord": "系統公告"
    },
    "5104": {
        "id": 5104,
        "shieldWord": "審查"
    },
    "5105": {
        "id": 5105,
        "shieldWord": "監督"
    },
    "5106": {
        "id": 5106,
        "shieldWord": "監管"
    },
    "5107": {
        "id": 5107,
        "shieldWord": "遊戲管理員"
    },
    "5108": {
        "id": 5108,
        "shieldWord": "客戶服務"
    },
    "5109": {
        "id": 5109,
        "shieldWord": "服務天使"
    },
    "5110": {
        "id": 5110,
        "shieldWord": "測試"
    },
    "5111": {
        "id": 5111,
        "shieldWord": "輔助程式"
    },
    "5112": {
        "id": 5112,
        "shieldWord": "運營"
    },
    "5113": {
        "id": 5113,
        "shieldWord": "運營者"
    },
    "5114": {
        "id": 5114,
        "shieldWord": "運營組"
    },
    "5115": {
        "id": 5115,
        "shieldWord": "運營商"
    },
    "5116": {
        "id": 5116,
        "shieldWord": "運營長"
    },
    "5117": {
        "id": 5117,
        "shieldWord": "運營官"
    },
    "5118": {
        "id": 5118,
        "shieldWord": "運營人"
    },
    "5119": {
        "id": 5119,
        "shieldWord": "蔡文勝"
    },
    "5120": {
        "id": 5120,
        "shieldWord": "李興平"
    },
    "5121": {
        "id": 5121,
        "shieldWord": "汪東風"
    },
    "5122": {
        "id": 5122,
        "shieldWord": "駱海堅"
    },
    "5123": {
        "id": 5123,
        "shieldWord": "私人伺服器"
    },
    "5124": {
        "id": 5124,
        "shieldWord": "外掛"
    },
    "5125": {
        "id": 5125,
        "shieldWord": "生僻字"
    },
    "5126": {
        "id": 5126,
        "shieldWord": "火星文"
    },
    "5127": {
        "id": 5127,
        "shieldWord": "韝"
    },
    "5128": {
        "id": 5128,
        "shieldWord": "鑣"
    },
    "5129": {
        "id": 5129,
        "shieldWord": "黲"
    },
    "5130": {
        "id": 5130,
        "shieldWord": "覘"
    },
    "5131": {
        "id": 5131,
        "shieldWord": "蕆"
    },
    "5132": {
        "id": 5132,
        "shieldWord": "囅"
    },
    "5133": {
        "id": 5133,
        "shieldWord": "讎"
    },
    "5134": {
        "id": 5134,
        "shieldWord": "輳"
    },
    "5135": {
        "id": 5135,
        "shieldWord": "鹺"
    },
    "5136": {
        "id": 5136,
        "shieldWord": "鮞"
    },
    "5137": {
        "id": 5137,
        "shieldWord": "鱝"
    },
    "5138": {
        "id": 5138,
        "shieldWord": "襆"
    },
    "5139": {
        "id": 5139,
        "shieldWord": "嘸"
    },
    "5140": {
        "id": 5140,
        "shieldWord": "覯"
    },
    "5141": {
        "id": 5141,
        "shieldWord": "轂"
    },
    "5142": {
        "id": 5142,
        "shieldWord": "鯝"
    },
    "5143": {
        "id": 5143,
        "shieldWord": "劌"
    },
    "5144": {
        "id": 5144,
        "shieldWord": "鸌"
    },
    "5145": {
        "id": 5145,
        "shieldWord": "鍃"
    },
    "5146": {
        "id": 5146,
        "shieldWord": "齎"
    },
    "5147": {
        "id": 5147,
        "shieldWord": "鱭"
    },
    "5148": {
        "id": 5148,
        "shieldWord": "鰹"
    },
    "5149": {
        "id": 5149,
        "shieldWord": "韉"
    },
    "5150": {
        "id": 5150,
        "shieldWord": "癤"
    },
    "5151": {
        "id": 5151,
        "shieldWord": "屨"
    },
    "5152": {
        "id": 5152,
        "shieldWord": "棬"
    },
    "5153": {
        "id": 5153,
        "shieldWord": "譎"
    },
    "5154": {
        "id": 5154,
        "shieldWord": "貺"
    },
    "5155": {
        "id": 5155,
        "shieldWord": "鰳"
    },
    "5156": {
        "id": 5156,
        "shieldWord": "誄"
    },
    "5157": {
        "id": 5157,
        "shieldWord": "鱧"
    },
    "5158": {
        "id": 5158,
        "shieldWord": "轢"
    },
    "5159": {
        "id": 5159,
        "shieldWord": "躒"
    },
    "5160": {
        "id": 5160,
        "shieldWord": "奩"
    },
    "5161": {
        "id": 5161,
        "shieldWord": "羆"
    },
    "5162": {
        "id": 5162,
        "shieldWord": "磧"
    },
    "5163": {
        "id": 5163,
        "shieldWord": "僉"
    },
    "5164": {
        "id": 5164,
        "shieldWord": "鈐"
    },
    "5165": {
        "id": 5165,
        "shieldWord": "膁"
    },
    "5166": {
        "id": 5166,
        "shieldWord": "槧"
    },
    "5167": {
        "id": 5167,
        "shieldWord": "錆"
    },
    "5168": {
        "id": 5168,
        "shieldWord": "檾"
    },
    "5169": {
        "id": 5169,
        "shieldWord": "慶紅"
    },
    "5170": {
        "id": 5170,
        "shieldWord": "詘"
    },
    "5171": {
        "id": 5171,
        "shieldWord": "蠼毿"
    },
    "5172": {
        "id": 5172,
        "shieldWord": "糝"
    },
    "5173": {
        "id": 5173,
        "shieldWord": "其他屏蔽词"
    },
    "5174": {
        "id": 5174,
        "shieldWord": "朱駿"
    },
    "5175": {
        "id": 5175,
        "shieldWord": "朱溶劑"
    },
    "5176": {
        "id": 5176,
        "shieldWord": "豬聾畸"
    },
    "5177": {
        "id": 5177,
        "shieldWord": "豬毛1"
    },
    "5178": {
        "id": 5178,
        "shieldWord": "顓"
    },
    "5179": {
        "id": 5179,
        "shieldWord": "爿"
    },
    "5180": {
        "id": 5180,
        "shieldWord": "諑"
    },
    "5181": {
        "id": 5181,
        "shieldWord": "鯔"
    },
    "5182": {
        "id": 5182,
        "shieldWord": "自民黨"
    },
    "5183": {
        "id": 5183,
        "shieldWord": "自由民主論壇"
    },
    "5184": {
        "id": 5184,
        "shieldWord": "總理"
    },
    "5185": {
        "id": 5185,
        "shieldWord": "傯"
    },
    "5186": {
        "id": 5186,
        "shieldWord": "諏"
    },
    "5187": {
        "id": 5187,
        "shieldWord": "鯫"
    },
    "5188": {
        "id": 5188,
        "shieldWord": "躦"
    },
    "5189": {
        "id": 5189,
        "shieldWord": "纘"
    },
    "5190": {
        "id": 5190,
        "shieldWord": "阿萊娜"
    },
    "5191": {
        "id": 5191,
        "shieldWord": "啊無卵"
    },
    "5192": {
        "id": 5192,
        "shieldWord": "埃裡克蘇特勤"
    },
    "5193": {
        "id": 5193,
        "shieldWord": "埃斯萬"
    },
    "5194": {
        "id": 5194,
        "shieldWord": "艾麗絲"
    },
    "5195": {
        "id": 5195,
        "shieldWord": "愛滋"
    },
    "5196": {
        "id": 5196,
        "shieldWord": "垵"
    },
    "5197": {
        "id": 5197,
        "shieldWord": "暗黑法師"
    },
    "5198": {
        "id": 5198,
        "shieldWord": "嶴"
    },
    "5199": {
        "id": 5199,
        "shieldWord": "奧克拉"
    },
    "5200": {
        "id": 5200,
        "shieldWord": "奧拉德"
    },
    "5201": {
        "id": 5201,
        "shieldWord": "奧利弗"
    },
    "5202": {
        "id": 5202,
        "shieldWord": "奧魯奇"
    },
    "5203": {
        "id": 5203,
        "shieldWord": "奧倫"
    },
    "5204": {
        "id": 5204,
        "shieldWord": "奧特蘭"
    },
    "5205": {
        "id": 5205,
        "shieldWord": "巴倫侍從"
    },
    "5206": {
        "id": 5206,
        "shieldWord": "巴倫坦"
    },
    "5207": {
        "id": 5207,
        "shieldWord": "白夢"
    },
    "5208": {
        "id": 5208,
        "shieldWord": "白皮書"
    },
    "5209": {
        "id": 5209,
        "shieldWord": "寶石商人"
    },
    "5210": {
        "id": 5210,
        "shieldWord": "保釣"
    },
    "5211": {
        "id": 5211,
        "shieldWord": "鮑戈"
    },
    "5212": {
        "id": 5212,
        "shieldWord": "鮑彤"
    },
    "5213": {
        "id": 5213,
        "shieldWord": "鮑伊"
    },
    "5214": {
        "id": 5214,
        "shieldWord": "暴風亡靈"
    },
    "5215": {
        "id": 5215,
        "shieldWord": "暴亂"
    },
    "5216": {
        "id": 5216,
        "shieldWord": "暴熱的戰士"
    },
    "5217": {
        "id": 5217,
        "shieldWord": "暴躁的城塔野獸"
    },
    "5218": {
        "id": 5218,
        "shieldWord": "暴躁的警衛兵靈魂"
    },
    "5219": {
        "id": 5219,
        "shieldWord": "暴躁的馬杜克"
    },
    "5220": {
        "id": 5220,
        "shieldWord": "北大三角地論壇"
    },
    "5221": {
        "id": 5221,
        "shieldWord": "北韓"
    },
    "5222": {
        "id": 5222,
        "shieldWord": "北京當局"
    },
    "5223": {
        "id": 5223,
        "shieldWord": "北美自由論壇"
    },
    "5224": {
        "id": 5224,
        "shieldWord": "貝尤爾"
    },
    "5225": {
        "id": 5225,
        "shieldWord": "比樣"
    },
    "5226": {
        "id": 5226,
        "shieldWord": "蹕"
    },
    "5227": {
        "id": 5227,
        "shieldWord": "颮"
    },
    "5228": {
        "id": 5228,
        "shieldWord": "婊子養的"
    },
    "5229": {
        "id": 5229,
        "shieldWord": "賓周"
    },
    "5230": {
        "id": 5230,
        "shieldWord": "冰後"
    },
    "5231": {
        "id": 5231,
        "shieldWord": "博訊"
    },
    "5232": {
        "id": 5232,
        "shieldWord": "不滅帝王"
    },
    "5233": {
        "id": 5233,
        "shieldWord": "不爽不要錢"
    },
    "5234": {
        "id": 5234,
        "shieldWord": "蔡崇國"
    },
    "5235": {
        "id": 5235,
        "shieldWord": "蔡啟芳"
    },
    "5236": {
        "id": 5236,
        "shieldWord": "操那嗎B"
    },
    "5237": {
        "id": 5237,
        "shieldWord": "操那嗎逼"
    },
    "5238": {
        "id": 5238,
        "shieldWord": "操那嗎比"
    },
    "5239": {
        "id": 5239,
        "shieldWord": "操你爺爺"
    },
    "5240": {
        "id": 5240,
        "shieldWord": "曹長青"
    },
    "5241": {
        "id": 5241,
        "shieldWord": "草你媽"
    },
    "5242": {
        "id": 5242,
        "shieldWord": "草擬媽"
    },
    "5243": {
        "id": 5243,
        "shieldWord": "冊那娘餓比"
    },
    "5244": {
        "id": 5244,
        "shieldWord": "插那嗎B"
    },
    "5245": {
        "id": 5245,
        "shieldWord": "插那嗎逼"
    },
    "5246": {
        "id": 5246,
        "shieldWord": "插那嗎比"
    },
    "5247": {
        "id": 5247,
        "shieldWord": "插你媽"
    },
    "5248": {
        "id": 5248,
        "shieldWord": "插你爺爺"
    },
    "5249": {
        "id": 5249,
        "shieldWord": "閶"
    },
    "5250": {
        "id": 5250,
        "shieldWord": "長官沙塔特"
    },
    "5251": {
        "id": 5251,
        "shieldWord": "常勁"
    },
    "5252": {
        "id": 5252,
        "shieldWord": "朝鮮"
    },
    "5253": {
        "id": 5253,
        "shieldWord": "車侖"
    },
    "5254": {
        "id": 5254,
        "shieldWord": "車侖女幹"
    },
    "5255": {
        "id": 5255,
        "shieldWord": "沉睡圖騰"
    },
    "5256": {
        "id": 5256,
        "shieldWord": "陳炳基"
    },
    "5257": {
        "id": 5257,
        "shieldWord": "陳博志"
    },
    "5258": {
        "id": 5258,
        "shieldWord": "陳定南"
    },
    "5259": {
        "id": 5259,
        "shieldWord": "陳建銘"
    },
    "5260": {
        "id": 5260,
        "shieldWord": "陳景俊"
    },
    "5261": {
        "id": 5261,
        "shieldWord": "陳菊"
    },
    "5262": {
        "id": 5262,
        "shieldWord": "陳軍"
    },
    "5263": {
        "id": 5263,
        "shieldWord": "陳蒙"
    },
    "5264": {
        "id": 5264,
        "shieldWord": "陳破空"
    },
    "5265": {
        "id": 5265,
        "shieldWord": "陳水扁"
    },
    "5266": {
        "id": 5266,
        "shieldWord": "陳唐山"
    },
    "5267": {
        "id": 5267,
        "shieldWord": "陳希同"
    },
    "5268": {
        "id": 5268,
        "shieldWord": "陳小同"
    },
    "5269": {
        "id": 5269,
        "shieldWord": "陳宣良"
    },
    "5270": {
        "id": 5270,
        "shieldWord": "陳學聖"
    },
    "5271": {
        "id": 5271,
        "shieldWord": "陳一諮"
    },
    "5272": {
        "id": 5272,
        "shieldWord": "陳總統"
    },
    "5273": {
        "id": 5273,
        "shieldWord": "諶"
    },
    "5274": {
        "id": 5274,
        "shieldWord": "齔"
    },
    "5275": {
        "id": 5275,
        "shieldWord": "櫬"
    },
    "5276": {
        "id": 5276,
        "shieldWord": "讖"
    },
    "5277": {
        "id": 5277,
        "shieldWord": "程凱"
    },
    "5278": {
        "id": 5278,
        "shieldWord": "程鐵軍"
    },
    "5279": {
        "id": 5279,
        "shieldWord": "鴟"
    },
    "5280": {
        "id": 5280,
        "shieldWord": "癡鳩"
    },
    "5281": {
        "id": 5281,
        "shieldWord": "癡拈"
    },
    "5282": {
        "id": 5282,
        "shieldWord": "遲鈍的圖騰"
    },
    "5283": {
        "id": 5283,
        "shieldWord": "持不同政見"
    },
    "5284": {
        "id": 5284,
        "shieldWord": "赤色騎士"
    },
    "5285": {
        "id": 5285,
        "shieldWord": "赤色戰士"
    },
    "5286": {
        "id": 5286,
        "shieldWord": "處女膜"
    },
    "5287": {
        "id": 5287,
        "shieldWord": "傳染性病"
    },
    "5288": {
        "id": 5288,
        "shieldWord": "吹簫"
    },
    "5289": {
        "id": 5289,
        "shieldWord": "春夏自由論壇"
    },
    "5290": {
        "id": 5290,
        "shieldWord": "戳那嗎B"
    },
    "5291": {
        "id": 5291,
        "shieldWord": "戳那嗎逼"
    },
    "5292": {
        "id": 5292,
        "shieldWord": "戳那嗎比"
    },
    "5293": {
        "id": 5293,
        "shieldWord": "錯B"
    },
    "5294": {
        "id": 5294,
        "shieldWord": "錯逼"
    },
    "5295": {
        "id": 5295,
        "shieldWord": "錯比"
    },
    "5296": {
        "id": 5296,
        "shieldWord": "錯那嗎B"
    },
    "5297": {
        "id": 5297,
        "shieldWord": "錯那嗎逼"
    },
    "5298": {
        "id": 5298,
        "shieldWord": "錯那嗎比"
    },
    "5299": {
        "id": 5299,
        "shieldWord": "達夫警衛兵"
    },
    "5300": {
        "id": 5300,
        "shieldWord": "達夫侍從"
    },
    "5301": {
        "id": 5301,
        "shieldWord": "達癩"
    },
    "5302": {
        "id": 5302,
        "shieldWord": "大東亞"
    },
    "5303": {
        "id": 5303,
        "shieldWord": "大東亞共榮"
    },
    "5304": {
        "id": 5304,
        "shieldWord": "大紀元"
    },
    "5305": {
        "id": 5305,
        "shieldWord": "大紀元新聞網"
    },
    "5306": {
        "id": 5306,
        "shieldWord": "大紀園"
    },
    "5307": {
        "id": 5307,
        "shieldWord": "大家論壇"
    },
    "5308": {
        "id": 5308,
        "shieldWord": "大奶媽"
    },
    "5309": {
        "id": 5309,
        "shieldWord": "大史記"
    },
    "5310": {
        "id": 5310,
        "shieldWord": "大史紀"
    },
    "5311": {
        "id": 5311,
        "shieldWord": "大中國論壇"
    },
    "5312": {
        "id": 5312,
        "shieldWord": "大中華論壇"
    },
    "5313": {
        "id": 5313,
        "shieldWord": "大眾真人真事"
    },
    "5314": {
        "id": 5314,
        "shieldWord": "紿"
    },
    "5315": {
        "id": 5315,
        "shieldWord": "戴相龍"
    },
    "5316": {
        "id": 5316,
        "shieldWord": "彈劾"
    },
    "5317": {
        "id": 5317,
        "shieldWord": "氹"
    },
    "5318": {
        "id": 5318,
        "shieldWord": "導師"
    },
    "5319": {
        "id": 5319,
        "shieldWord": "盜竊犯"
    },
    "5320": {
        "id": 5320,
        "shieldWord": "德維爾"
    },
    "5321": {
        "id": 5321,
        "shieldWord": "登輝"
    },
    "5322": {
        "id": 5322,
        "shieldWord": "鄧笑貧"
    },
    "5323": {
        "id": 5323,
        "shieldWord": "糴"
    },
    "5324": {
        "id": 5324,
        "shieldWord": "迪裡夏提"
    },
    "5325": {
        "id": 5325,
        "shieldWord": "覿"
    },
    "5326": {
        "id": 5326,
        "shieldWord": "地下教會"
    },
    "5327": {
        "id": 5327,
        "shieldWord": "帝國主義"
    },
    "5328": {
        "id": 5328,
        "shieldWord": "電視流氓"
    },
    "5329": {
        "id": 5329,
        "shieldWord": "叼你媽"
    },
    "5330": {
        "id": 5330,
        "shieldWord": "釣魚島"
    },
    "5331": {
        "id": 5331,
        "shieldWord": "丁關根"
    },
    "5332": {
        "id": 5332,
        "shieldWord": "東北獨立"
    },
    "5333": {
        "id": 5333,
        "shieldWord": "東部地下水路"
    },
    "5334": {
        "id": 5334,
        "shieldWord": "東方紅時空"
    },
    "5335": {
        "id": 5335,
        "shieldWord": "東方時空"
    },
    "5336": {
        "id": 5336,
        "shieldWord": "東南西北論談"
    },
    "5337": {
        "id": 5337,
        "shieldWord": "東社"
    },
    "5338": {
        "id": 5338,
        "shieldWord": "東升"
    },
    "5339": {
        "id": 5339,
        "shieldWord": "東條"
    },
    "5340": {
        "id": 5340,
        "shieldWord": "東突暴動"
    },
    "5341": {
        "id": 5341,
        "shieldWord": "東突獨立"
    },
    "5342": {
        "id": 5342,
        "shieldWord": "東土耳其斯坦"
    },
    "5343": {
        "id": 5343,
        "shieldWord": "東西南北論壇"
    },
    "5344": {
        "id": 5344,
        "shieldWord": "東亞"
    },
    "5345": {
        "id": 5345,
        "shieldWord": "東院看守"
    },
    "5346": {
        "id": 5346,
        "shieldWord": "動亂"
    },
    "5347": {
        "id": 5347,
        "shieldWord": "鬥士哈夫拉蘇"
    },
    "5348": {
        "id": 5348,
        "shieldWord": "鬥士霍克"
    },
    "5349": {
        "id": 5349,
        "shieldWord": "獨裁"
    },
    "5350": {
        "id": 5350,
        "shieldWord": "獨裁政治"
    },
    "5351": {
        "id": 5351,
        "shieldWord": "獨夫"
    },
    "5352": {
        "id": 5352,
        "shieldWord": "獨立臺灣會"
    },
    "5353": {
        "id": 5353,
        "shieldWord": "俄國"
    },
    "5354": {
        "id": 5354,
        "shieldWord": "發楞"
    },
    "5355": {
        "id": 5355,
        "shieldWord": "發掄"
    },
    "5356": {
        "id": 5356,
        "shieldWord": "發掄功"
    },
    "5357": {
        "id": 5357,
        "shieldWord": "發倫"
    },
    "5358": {
        "id": 5358,
        "shieldWord": "發倫功"
    },
    "5359": {
        "id": 5359,
        "shieldWord": "發輪"
    },
    "5360": {
        "id": 5360,
        "shieldWord": "發論"
    },
    "5361": {
        "id": 5361,
        "shieldWord": "發論公"
    },
    "5362": {
        "id": 5362,
        "shieldWord": "發論功"
    },
    "5363": {
        "id": 5363,
        "shieldWord": "發正念"
    },
    "5364": {
        "id": 5364,
        "shieldWord": "法~倫"
    },
    "5365": {
        "id": 5365,
        "shieldWord": "法~淪"
    },
    "5366": {
        "id": 5366,
        "shieldWord": "法~綸"
    },
    "5367": {
        "id": 5367,
        "shieldWord": "法~輪"
    },
    "5368": {
        "id": 5368,
        "shieldWord": "法~論"
    },
    "5369": {
        "id": 5369,
        "shieldWord": "法爾卡"
    },
    "5370": {
        "id": 5370,
        "shieldWord": "法掄"
    },
    "5371": {
        "id": 5371,
        "shieldWord": "法掄功"
    },
    "5372": {
        "id": 5372,
        "shieldWord": "法侖"
    },
    "5373": {
        "id": 5373,
        "shieldWord": "法淪"
    },
    "5374": {
        "id": 5374,
        "shieldWord": "法綸"
    },
    "5375": {
        "id": 5375,
        "shieldWord": "法十輪十功"
    },
    "5376": {
        "id": 5376,
        "shieldWord": "法謫"
    },
    "5377": {
        "id": 5377,
        "shieldWord": "法謫功"
    },
    "5378": {
        "id": 5378,
        "shieldWord": "反封鎖"
    },
    "5379": {
        "id": 5379,
        "shieldWord": "反封鎖技術"
    },
    "5380": {
        "id": 5380,
        "shieldWord": "反腐敗論壇"
    },
    "5381": {
        "id": 5381,
        "shieldWord": "反人類"
    },
    "5382": {
        "id": 5382,
        "shieldWord": "反社會"
    },
    "5383": {
        "id": 5383,
        "shieldWord": "方勵之"
    },
    "5384": {
        "id": 5384,
        "shieldWord": "防衛指揮官"
    },
    "5385": {
        "id": 5385,
        "shieldWord": "放蕩"
    },
    "5386": {
        "id": 5386,
        "shieldWord": "飛揚論壇"
    },
    "5387": {
        "id": 5387,
        "shieldWord": "廢墟守護者"
    },
    "5388": {
        "id": 5388,
        "shieldWord": "費鴻泰"
    },
    "5389": {
        "id": 5389,
        "shieldWord": "費良勇"
    },
    "5390": {
        "id": 5390,
        "shieldWord": "分隊長施蒂文"
    },
    "5391": {
        "id": 5391,
        "shieldWord": "粉飾太平"
    },
    "5392": {
        "id": 5392,
        "shieldWord": "糞便"
    },
    "5393": {
        "id": 5393,
        "shieldWord": "豐饒的果實"
    },
    "5394": {
        "id": 5394,
        "shieldWord": "風雨神州"
    },
    "5395": {
        "id": 5395,
        "shieldWord": "風雨神州論壇"
    },
    "5396": {
        "id": 5396,
        "shieldWord": "封從德"
    },
    "5397": {
        "id": 5397,
        "shieldWord": "封殺"
    },
    "5398": {
        "id": 5398,
        "shieldWord": "封印的靈魂騎士"
    },
    "5399": {
        "id": 5399,
        "shieldWord": "馮東海"
    },
    "5400": {
        "id": 5400,
        "shieldWord": "馮素英"
    },
    "5401": {
        "id": 5401,
        "shieldWord": "紱"
    },
    "5402": {
        "id": 5402,
        "shieldWord": "嘸"
    },
    "5403": {
        "id": 5403,
        "shieldWord": "傅作義"
    },
    "5404": {
        "id": 5404,
        "shieldWord": "幹bi"
    },
    "5405": {
        "id": 5405,
        "shieldWord": "幹逼"
    },
    "5406": {
        "id": 5406,
        "shieldWord": "幹比"
    },
    "5407": {
        "id": 5407,
        "shieldWord": "幹的你"
    },
    "5408": {
        "id": 5408,
        "shieldWord": "幹幹幹"
    },
    "5409": {
        "id": 5409,
        "shieldWord": "幹你老比"
    },
    "5410": {
        "id": 5410,
        "shieldWord": "幹你老母"
    },
    "5411": {
        "id": 5411,
        "shieldWord": "幹你娘"
    },
    "5412": {
        "id": 5412,
        "shieldWord": "幹全家"
    },
    "5413": {
        "id": 5413,
        "shieldWord": "幹一家"
    },
    "5414": {
        "id": 5414,
        "shieldWord": "趕你娘"
    },
    "5415": {
        "id": 5415,
        "shieldWord": "岡巒"
    },
    "5416": {
        "id": 5416,
        "shieldWord": "剛比"
    },
    "5417": {
        "id": 5417,
        "shieldWord": "剛比樣子"
    },
    "5418": {
        "id": 5418,
        "shieldWord": "崗哨士兵"
    },
    "5419": {
        "id": 5419,
        "shieldWord": "肛門"
    },
    "5420": {
        "id": 5420,
        "shieldWord": "高文謙"
    },
    "5421": {
        "id": 5421,
        "shieldWord": "高薪養廉"
    },
    "5422": {
        "id": 5422,
        "shieldWord": "膏藥旗"
    },
    "5423": {
        "id": 5423,
        "shieldWord": "戈瑞爾德"
    },
    "5424": {
        "id": 5424,
        "shieldWord": "戈揚"
    },
    "5425": {
        "id": 5425,
        "shieldWord": "鴿派"
    },
    "5426": {
        "id": 5426,
        "shieldWord": "歌功頌德"
    },
    "5427": {
        "id": 5427,
        "shieldWord": "格雷(關卡排名管理者)"
    },
    "5428": {
        "id": 5428,
        "shieldWord": "格魯"
    },
    "5429": {
        "id": 5429,
        "shieldWord": "格魯(城鎮移動)"
    },
    "5430": {
        "id": 5430,
        "shieldWord": "鯁"
    },
    "5431": {
        "id": 5431,
        "shieldWord": "工自聯"
    },
    "5432": {
        "id": 5432,
        "shieldWord": "弓雖"
    },
    "5433": {
        "id": 5433,
        "shieldWord": "共產"
    },
    "5434": {
        "id": 5434,
        "shieldWord": "共產主義"
    },
    "5435": {
        "id": 5435,
        "shieldWord": "共軍"
    },
    "5436": {
        "id": 5436,
        "shieldWord": "共榮圈"
    },
    "5437": {
        "id": 5437,
        "shieldWord": "緱"
    },
    "5438": {
        "id": 5438,
        "shieldWord": "狗誠"
    },
    "5439": {
        "id": 5439,
        "shieldWord": "狗狼養的"
    },
    "5440": {
        "id": 5440,
        "shieldWord": "狗娘養的"
    },
    "5441": {
        "id": 5441,
        "shieldWord": "狗養"
    },
    "5442": {
        "id": 5442,
        "shieldWord": "狗雜種"
    },
    "5443": {
        "id": 5443,
        "shieldWord": "古龍祭壇"
    },
    "5444": {
        "id": 5444,
        "shieldWord": "骨獅"
    },
    "5445": {
        "id": 5445,
        "shieldWord": "鴰"
    },
    "5446": {
        "id": 5446,
        "shieldWord": "詿"
    },
    "5447": {
        "id": 5447,
        "shieldWord": "關卓中"
    },
    "5448": {
        "id": 5448,
        "shieldWord": "貫通兩極法"
    },
    "5449": {
        "id": 5449,
        "shieldWord": "廣聞"
    },
    "5450": {
        "id": 5450,
        "shieldWord": "媯"
    },
    "5451": {
        "id": 5451,
        "shieldWord": "龜兒子"
    },
    "5452": {
        "id": 5452,
        "shieldWord": "龜孫子"
    },
    "5453": {
        "id": 5453,
        "shieldWord": "龜投"
    },
    "5454": {
        "id": 5454,
        "shieldWord": "緄"
    },
    "5455": {
        "id": 5455,
        "shieldWord": "滾那嗎"
    },
    "5456": {
        "id": 5456,
        "shieldWord": "滾那嗎B"
    },
    "5457": {
        "id": 5457,
        "shieldWord": "滾那嗎錯比"
    },
    "5458": {
        "id": 5458,
        "shieldWord": "滾那嗎老比"
    },
    "5459": {
        "id": 5459,
        "shieldWord": "滾那嗎瘟比"
    },
    "5460": {
        "id": 5460,
        "shieldWord": "鯀"
    },
    "5461": {
        "id": 5461,
        "shieldWord": "咼"
    },
    "5462": {
        "id": 5462,
        "shieldWord": "郭俊銘"
    },
    "5463": {
        "id": 5463,
        "shieldWord": "郭羅基"
    },
    "5464": {
        "id": 5464,
        "shieldWord": "郭岩華"
    },
    "5465": {
        "id": 5465,
        "shieldWord": "國家安全"
    },
    "5466": {
        "id": 5466,
        "shieldWord": "國家機密"
    },
    "5467": {
        "id": 5467,
        "shieldWord": "國軍"
    },
    "5468": {
        "id": 5468,
        "shieldWord": "國賊"
    },
    "5469": {
        "id": 5469,
        "shieldWord": "哈爾羅尼"
    },
    "5470": {
        "id": 5470,
        "shieldWord": "頇"
    },
    "5471": {
        "id": 5471,
        "shieldWord": "韓東方"
    },
    "5472": {
        "id": 5472,
        "shieldWord": "韓聯潮"
    },
    "5473": {
        "id": 5473,
        "shieldWord": "漢奸"
    },
    "5474": {
        "id": 5474,
        "shieldWord": "顥"
    },
    "5475": {
        "id": 5475,
        "shieldWord": "灝"
    },
    "5476": {
        "id": 5476,
        "shieldWord": "黑社會"
    },
    "5477": {
        "id": 5477,
        "shieldWord": "黑手黨"
    },
    "5478": {
        "id": 5478,
        "shieldWord": "紅燈區"
    },
    "5479": {
        "id": 5479,
        "shieldWord": "紅色恐怖"
    },
    "5480": {
        "id": 5480,
        "shieldWord": "紅炎猛獸"
    },
    "5481": {
        "id": 5481,
        "shieldWord": "洪傳"
    },
    "5482": {
        "id": 5482,
        "shieldWord": "洪興"
    },
    "5483": {
        "id": 5483,
        "shieldWord": "洪哲勝"
    },
    "5484": {
        "id": 5484,
        "shieldWord": "黌"
    },
    "5485": {
        "id": 5485,
        "shieldWord": "鱟"
    },
    "5486": {
        "id": 5486,
        "shieldWord": "胡緊掏"
    },
    "5487": {
        "id": 5487,
        "shieldWord": "胡錦滔"
    },
    "5488": {
        "id": 5488,
        "shieldWord": "胡錦淘"
    },
    "5489": {
        "id": 5489,
        "shieldWord": "胡景濤"
    },
    "5490": {
        "id": 5490,
        "shieldWord": "胡喬木"
    },
    "5491": {
        "id": 5491,
        "shieldWord": "胡總書記"
    },
    "5492": {
        "id": 5492,
        "shieldWord": "湖岸護衛兵"
    },
    "5493": {
        "id": 5493,
        "shieldWord": "湖岸警衛兵"
    },
    "5494": {
        "id": 5494,
        "shieldWord": "湖岸哨兵隊長"
    },
    "5495": {
        "id": 5495,
        "shieldWord": "護法"
    },
    "5496": {
        "id": 5496,
        "shieldWord": "華通時事論壇"
    },
    "5497": {
        "id": 5497,
        "shieldWord": "華夏文摘"
    },
    "5498": {
        "id": 5498,
        "shieldWord": "華語世界論壇"
    },
    "5499": {
        "id": 5499,
        "shieldWord": "華嶽時事論壇"
    },
    "5500": {
        "id": 5500,
        "shieldWord": "懷特"
    },
    "5501": {
        "id": 5501,
        "shieldWord": "鍰"
    },
    "5502": {
        "id": 5502,
        "shieldWord": "皇軍"
    },
    "5503": {
        "id": 5503,
        "shieldWord": "黃伯源"
    },
    "5504": {
        "id": 5504,
        "shieldWord": "黃慈萍"
    },
    "5505": {
        "id": 5505,
        "shieldWord": "黃禍"
    },
    "5506": {
        "id": 5506,
        "shieldWord": "黃劍輝"
    },
    "5507": {
        "id": 5507,
        "shieldWord": "黃金幼龍"
    },
    "5508": {
        "id": 5508,
        "shieldWord": "黃片"
    },
    "5509": {
        "id": 5509,
        "shieldWord": "黃翔"
    },
    "5510": {
        "id": 5510,
        "shieldWord": "黃義交"
    },
    "5511": {
        "id": 5511,
        "shieldWord": "黃仲生"
    },
    "5512": {
        "id": 5512,
        "shieldWord": "回民暴動"
    },
    "5513": {
        "id": 5513,
        "shieldWord": "噦"
    },
    "5514": {
        "id": 5514,
        "shieldWord": "繢"
    },
    "5515": {
        "id": 5515,
        "shieldWord": "毀滅步兵"
    },
    "5516": {
        "id": 5516,
        "shieldWord": "毀滅騎士"
    },
    "5517": {
        "id": 5517,
        "shieldWord": "毀滅射手"
    },
    "5518": {
        "id": 5518,
        "shieldWord": "昏迷圖騰"
    },
    "5519": {
        "id": 5519,
        "shieldWord": "混亂的圖騰"
    },
    "5520": {
        "id": 5520,
        "shieldWord": "活動"
    },
    "5521": {
        "id": 5521,
        "shieldWord": "擊倒圖騰"
    },
    "5522": {
        "id": 5522,
        "shieldWord": "擊傷的圖騰"
    },
    "5523": {
        "id": 5523,
        "shieldWord": "鶏毛信文匯"
    },
    "5524": {
        "id": 5524,
        "shieldWord": "姬勝德"
    },
    "5525": {
        "id": 5525,
        "shieldWord": "積克館"
    },
    "5526": {
        "id": 5526,
        "shieldWord": "賈廷安"
    },
    "5527": {
        "id": 5527,
        "shieldWord": "賈育台"
    },
    "5528": {
        "id": 5528,
        "shieldWord": "戔"
    },
    "5529": {
        "id": 5529,
        "shieldWord": "監視塔"
    },
    "5530": {
        "id": 5530,
        "shieldWord": "監視塔哨兵"
    },
    "5531": {
        "id": 5531,
        "shieldWord": "監視塔哨兵隊長"
    },
    "5532": {
        "id": 5532,
        "shieldWord": "簡肇棟"
    },
    "5533": {
        "id": 5533,
        "shieldWord": "建國黨"
    },
    "5534": {
        "id": 5534,
        "shieldWord": "賤B"
    },
    "5535": {
        "id": 5535,
        "shieldWord": "賤bi"
    },
    "5536": {
        "id": 5536,
        "shieldWord": "賤比"
    },
    "5537": {
        "id": 5537,
        "shieldWord": "賤貨"
    },
    "5538": {
        "id": 5538,
        "shieldWord": "賤種"
    },
    "5539": {
        "id": 5539,
        "shieldWord": "江羅"
    },
    "5540": {
        "id": 5540,
        "shieldWord": "江綿恒"
    },
    "5541": {
        "id": 5541,
        "shieldWord": "江戲子"
    },
    "5542": {
        "id": 5542,
        "shieldWord": "江則民"
    },
    "5543": {
        "id": 5543,
        "shieldWord": "江澤慧"
    },
    "5544": {
        "id": 5544,
        "shieldWord": "江賊"
    },
    "5545": {
        "id": 5545,
        "shieldWord": "江賊民"
    },
    "5546": {
        "id": 5546,
        "shieldWord": "薑春雲"
    },
    "5547": {
        "id": 5547,
        "shieldWord": "將則民"
    },
    "5548": {
        "id": 5548,
        "shieldWord": "僵賊"
    },
    "5549": {
        "id": 5549,
        "shieldWord": "僵賊民"
    },
    "5550": {
        "id": 5550,
        "shieldWord": "講法"
    },
    "5551": {
        "id": 5551,
        "shieldWord": "降低命中的圖騰"
    },
    "5552": {
        "id": 5552,
        "shieldWord": "醬豬媳"
    },
    "5553": {
        "id": 5553,
        "shieldWord": "撟"
    },
    "5554": {
        "id": 5554,
        "shieldWord": "狡猾的達夫"
    },
    "5555": {
        "id": 5555,
        "shieldWord": "矯健的馬努爾"
    },
    "5556": {
        "id": 5556,
        "shieldWord": "嶠"
    },
    "5557": {
        "id": 5557,
        "shieldWord": "教養院"
    },
    "5558": {
        "id": 5558,
        "shieldWord": "揭批書"
    },
    "5559": {
        "id": 5559,
        "shieldWord": "訐"
    },
    "5560": {
        "id": 5560,
        "shieldWord": "她媽"
    },
    "5561": {
        "id": 5561,
        "shieldWord": "屆中央政治局委員"
    },
    "5562": {
        "id": 5562,
        "shieldWord": "金槍不倒"
    },
    "5563": {
        "id": 5563,
        "shieldWord": "金堯如"
    },
    "5564": {
        "id": 5564,
        "shieldWord": "金澤辰"
    },
    "5565": {
        "id": 5565,
        "shieldWord": "巹"
    },
    "5566": {
        "id": 5566,
        "shieldWord": "錦濤"
    },
    "5567": {
        "id": 5567,
        "shieldWord": "經文"
    },
    "5568": {
        "id": 5568,
        "shieldWord": "經血"
    },
    "5569": {
        "id": 5569,
        "shieldWord": "莖候佳陰"
    },
    "5570": {
        "id": 5570,
        "shieldWord": "荊棘護衛兵"
    },
    "5571": {
        "id": 5571,
        "shieldWord": "靖國神社"
    },
    "5572": {
        "id": 5572,
        "shieldWord": "舊斗篷哨兵"
    },
    "5573": {
        "id": 5573,
        "shieldWord": "齟"
    },
    "5574": {
        "id": 5574,
        "shieldWord": "巨槌騎兵"
    },
    "5575": {
        "id": 5575,
        "shieldWord": "巨鐵角哈克"
    },
    "5576": {
        "id": 5576,
        "shieldWord": "鋸齒通道被遺棄的骷髏"
    },
    "5577": {
        "id": 5577,
        "shieldWord": "鋸齒通道骷髏"
    },
    "5578": {
        "id": 5578,
        "shieldWord": "絕望之地"
    },
    "5579": {
        "id": 5579,
        "shieldWord": "軍妓"
    },
    "5580": {
        "id": 5580,
        "shieldWord": "開放雜誌"
    },
    "5581": {
        "id": 5581,
        "shieldWord": "凱奧勒尼什"
    },
    "5582": {
        "id": 5582,
        "shieldWord": "凱爾本"
    },
    "5583": {
        "id": 5583,
        "shieldWord": "凱爾雷斯"
    },
    "5584": {
        "id": 5584,
        "shieldWord": "凱特切爾"
    },
    "5585": {
        "id": 5585,
        "shieldWord": "砍翻一條街"
    },
    "5586": {
        "id": 5586,
        "shieldWord": "看中國"
    },
    "5587": {
        "id": 5587,
        "shieldWord": "闞"
    },
    "5588": {
        "id": 5588,
        "shieldWord": "靠你媽"
    },
    "5589": {
        "id": 5589,
        "shieldWord": "柯賜海"
    },
    "5590": {
        "id": 5590,
        "shieldWord": "柯建銘"
    },
    "5591": {
        "id": 5591,
        "shieldWord": "科賴爾"
    },
    "5592": {
        "id": 5592,
        "shieldWord": "克萊恩"
    },
    "5593": {
        "id": 5593,
        "shieldWord": "克萊特"
    },
    "5594": {
        "id": 5594,
        "shieldWord": "克勞森"
    },
    "5595": {
        "id": 5595,
        "shieldWord": "緙"
    },
    "5596": {
        "id": 5596,
        "shieldWord": "空氣精靈"
    },
    "5597": {
        "id": 5597,
        "shieldWord": "空虛的伊坤"
    },
    "5598": {
        "id": 5598,
        "shieldWord": "空虛之地"
    },
    "5599": {
        "id": 5599,
        "shieldWord": "恐怖主義"
    },
    "5600": {
        "id": 5600,
        "shieldWord": "瞘"
    },
    "5601": {
        "id": 5601,
        "shieldWord": "嚳"
    },
    "5602": {
        "id": 5602,
        "shieldWord": "鄺錦文"
    },
    "5603": {
        "id": 5603,
        "shieldWord": "昆圖"
    },
    "5604": {
        "id": 5604,
        "shieldWord": "拉皮條"
    },
    "5605": {
        "id": 5605,
        "shieldWord": "萊特"
    },
    "5606": {
        "id": 5606,
        "shieldWord": "賴士葆"
    },
    "5607": {
        "id": 5607,
        "shieldWord": "蘭迪"
    },
    "5608": {
        "id": 5608,
        "shieldWord": "爛B"
    },
    "5609": {
        "id": 5609,
        "shieldWord": "爛袋"
    },
    "5610": {
        "id": 5610,
        "shieldWord": "爛貨"
    },
    "5611": {
        "id": 5611,
        "shieldWord": "濫B"
    },
    "5612": {
        "id": 5612,
        "shieldWord": "濫逼"
    },
    "5613": {
        "id": 5613,
        "shieldWord": "濫比"
    },
    "5614": {
        "id": 5614,
        "shieldWord": "濫貨"
    },
    "5615": {
        "id": 5615,
        "shieldWord": "濫交"
    },
    "5616": {
        "id": 5616,
        "shieldWord": "勞動教養所"
    },
    "5617": {
        "id": 5617,
        "shieldWord": "勞改"
    },
    "5618": {
        "id": 5618,
        "shieldWord": "勞教"
    },
    "5619": {
        "id": 5619,
        "shieldWord": "雷尼亞"
    },
    "5620": {
        "id": 5620,
        "shieldWord": "李紅痔"
    },
    "5621": {
        "id": 5621,
        "shieldWord": "李洪寬"
    },
    "5622": {
        "id": 5622,
        "shieldWord": "李繼耐"
    },
    "5623": {
        "id": 5623,
        "shieldWord": "李蘭菊"
    },
    "5624": {
        "id": 5624,
        "shieldWord": "李老師"
    },
    "5625": {
        "id": 5625,
        "shieldWord": "李錄"
    },
    "5626": {
        "id": 5626,
        "shieldWord": "李祿"
    },
    "5627": {
        "id": 5627,
        "shieldWord": "李慶安"
    },
    "5628": {
        "id": 5628,
        "shieldWord": "李慶華"
    },
    "5629": {
        "id": 5629,
        "shieldWord": "李淑嫻"
    },
    "5630": {
        "id": 5630,
        "shieldWord": "李鐵映"
    },
    "5631": {
        "id": 5631,
        "shieldWord": "李旺陽"
    },
    "5632": {
        "id": 5632,
        "shieldWord": "李小鵬"
    },
    "5633": {
        "id": 5633,
        "shieldWord": "李月月鳥"
    },
    "5634": {
        "id": 5634,
        "shieldWord": "李志綏"
    },
    "5635": {
        "id": 5635,
        "shieldWord": "李總理"
    },
    "5636": {
        "id": 5636,
        "shieldWord": "李總統"
    },
    "5637": {
        "id": 5637,
        "shieldWord": "裡菲斯"
    },
    "5638": {
        "id": 5638,
        "shieldWord": "連方瑀"
    },
    "5639": {
        "id": 5639,
        "shieldWord": "連惠心"
    },
    "5640": {
        "id": 5640,
        "shieldWord": "連勝德"
    },
    "5641": {
        "id": 5641,
        "shieldWord": "連勝文"
    },
    "5642": {
        "id": 5642,
        "shieldWord": "聯總"
    },
    "5643": {
        "id": 5643,
        "shieldWord": "廉政大論壇"
    },
    "5644": {
        "id": 5644,
        "shieldWord": "煉功"
    },
    "5645": {
        "id": 5645,
        "shieldWord": "兩岸關係"
    },
    "5646": {
        "id": 5646,
        "shieldWord": "兩岸三地論壇"
    },
    "5647": {
        "id": 5647,
        "shieldWord": "兩會"
    },
    "5648": {
        "id": 5648,
        "shieldWord": "兩會報導"
    },
    "5649": {
        "id": 5649,
        "shieldWord": "兩會新聞"
    },
    "5650": {
        "id": 5650,
        "shieldWord": "廖錫龍"
    },
    "5651": {
        "id": 5651,
        "shieldWord": "林保華"
    },
    "5652": {
        "id": 5652,
        "shieldWord": "林長盛"
    },
    "5653": {
        "id": 5653,
        "shieldWord": "林佳龍"
    },
    "5654": {
        "id": 5654,
        "shieldWord": "林信義"
    },
    "5655": {
        "id": 5655,
        "shieldWord": "林正勝"
    },
    "5656": {
        "id": 5656,
        "shieldWord": "林重謨"
    },
    "5657": {
        "id": 5657,
        "shieldWord": "躪"
    },
    "5658": {
        "id": 5658,
        "shieldWord": "淩鋒"
    },
    "5659": {
        "id": 5659,
        "shieldWord": "劉賓深"
    },
    "5660": {
        "id": 5660,
        "shieldWord": "劉賓雁"
    },
    "5661": {
        "id": 5661,
        "shieldWord": "劉剛"
    },
    "5662": {
        "id": 5662,
        "shieldWord": "劉國凱"
    },
    "5663": {
        "id": 5663,
        "shieldWord": "劉華清"
    },
    "5664": {
        "id": 5664,
        "shieldWord": "劉俊國"
    },
    "5665": {
        "id": 5665,
        "shieldWord": "劉凱中"
    },
    "5666": {
        "id": 5666,
        "shieldWord": "劉千石"
    },
    "5667": {
        "id": 5667,
        "shieldWord": "劉青"
    },
    "5668": {
        "id": 5668,
        "shieldWord": "劉山青"
    },
    "5669": {
        "id": 5669,
        "shieldWord": "劉士賢"
    },
    "5670": {
        "id": 5670,
        "shieldWord": "劉文勝"
    },
    "5671": {
        "id": 5671,
        "shieldWord": "劉文雄"
    },
    "5672": {
        "id": 5672,
        "shieldWord": "劉曉波"
    },
    "5673": {
        "id": 5673,
        "shieldWord": "劉曉竹"
    },
    "5674": {
        "id": 5674,
        "shieldWord": "劉永川"
    },
    "5675": {
        "id": 5675,
        "shieldWord": "鷚"
    },
    "5676": {
        "id": 5676,
        "shieldWord": "龍虎豹"
    },
    "5677": {
        "id": 5677,
        "shieldWord": "龍火之心"
    },
    "5678": {
        "id": 5678,
        "shieldWord": "盧卡"
    },
    "5679": {
        "id": 5679,
        "shieldWord": "盧西德"
    },
    "5680": {
        "id": 5680,
        "shieldWord": "陸委會"
    },
    "5681": {
        "id": 5681,
        "shieldWord": "輅"
    },
    "5682": {
        "id": 5682,
        "shieldWord": "呂京花"
    },
    "5683": {
        "id": 5683,
        "shieldWord": "亂交"
    },
    "5684": {
        "id": 5684,
        "shieldWord": "亂輪"
    },
    "5685": {
        "id": 5685,
        "shieldWord": "鋝"
    },
    "5686": {
        "id": 5686,
        "shieldWord": "掄功"
    },
    "5687": {
        "id": 5687,
        "shieldWord": "倫功"
    },
    "5688": {
        "id": 5688,
        "shieldWord": "輪大"
    },
    "5689": {
        "id": 5689,
        "shieldWord": "輪功"
    },
    "5690": {
        "id": 5690,
        "shieldWord": "論壇管理員"
    },
    "5691": {
        "id": 5691,
        "shieldWord": "羅福助"
    },
    "5692": {
        "id": 5692,
        "shieldWord": "羅禮詩"
    },
    "5693": {
        "id": 5693,
        "shieldWord": "羅文嘉"
    },
    "5694": {
        "id": 5694,
        "shieldWord": "羅志明"
    },
    "5695": {
        "id": 5695,
        "shieldWord": "腡"
    },
    "5696": {
        "id": 5696,
        "shieldWord": "濼"
    },
    "5697": {
        "id": 5697,
        "shieldWord": "洛克菲爾特"
    },
    "5698": {
        "id": 5698,
        "shieldWord": "媽比"
    },
    "5699": {
        "id": 5699,
        "shieldWord": "馬大維"
    },
    "5700": {
        "id": 5700,
        "shieldWord": "馬良駿"
    },
    "5701": {
        "id": 5701,
        "shieldWord": "馬三家"
    },
    "5702": {
        "id": 5702,
        "shieldWord": "馬時敏"
    },
    "5703": {
        "id": 5703,
        "shieldWord": "馬特斯"
    },
    "5704": {
        "id": 5704,
        "shieldWord": "馬永成"
    },
    "5705": {
        "id": 5705,
        "shieldWord": "瑪麗亞"
    },
    "5706": {
        "id": 5706,
        "shieldWord": "瑪雅"
    },
    "5707": {
        "id": 5707,
        "shieldWord": "嗎的"
    },
    "5708": {
        "id": 5708,
        "shieldWord": "嗎啡"
    },
    "5709": {
        "id": 5709,
        "shieldWord": "勱"
    },
    "5710": {
        "id": 5710,
        "shieldWord": "麥克斯"
    },
    "5711": {
        "id": 5711,
        "shieldWord": "賣逼"
    },
    "5712": {
        "id": 5712,
        "shieldWord": "賣國"
    },
    "5713": {
        "id": 5713,
        "shieldWord": "賣騷"
    },
    "5714": {
        "id": 5714,
        "shieldWord": "瞞報"
    },
    "5715": {
        "id": 5715,
        "shieldWord": "毛廁洞"
    },
    "5716": {
        "id": 5716,
        "shieldWord": "毛賊"
    },
    "5717": {
        "id": 5717,
        "shieldWord": "毛賊東"
    },
    "5718": {
        "id": 5718,
        "shieldWord": "美國"
    },
    "5719": {
        "id": 5719,
        "shieldWord": "美國參考"
    },
    "5720": {
        "id": 5720,
        "shieldWord": "美國佬"
    },
    "5721": {
        "id": 5721,
        "shieldWord": "蒙獨"
    },
    "5722": {
        "id": 5722,
        "shieldWord": "蒙古達子"
    },
    "5723": {
        "id": 5723,
        "shieldWord": "蒙古獨"
    },
    "5724": {
        "id": 5724,
        "shieldWord": "禰"
    },
    "5725": {
        "id": 5725,
        "shieldWord": "羋"
    },
    "5726": {
        "id": 5726,
        "shieldWord": "綿恒"
    },
    "5727": {
        "id": 5727,
        "shieldWord": "黽"
    },
    "5728": {
        "id": 5728,
        "shieldWord": "民聯"
    },
    "5729": {
        "id": 5729,
        "shieldWord": "民意論壇"
    },
    "5730": {
        "id": 5730,
        "shieldWord": "民陣"
    },
    "5731": {
        "id": 5731,
        "shieldWord": "民主牆"
    },
    "5732": {
        "id": 5732,
        "shieldWord": "緡"
    },
    "5733": {
        "id": 5733,
        "shieldWord": "湣"
    },
    "5734": {
        "id": 5734,
        "shieldWord": "鰵"
    },
    "5735": {
        "id": 5735,
        "shieldWord": "莫偉強"
    },
    "5736": {
        "id": 5736,
        "shieldWord": "木子論壇"
    },
    "5737": {
        "id": 5737,
        "shieldWord": "內褲"
    },
    "5738": {
        "id": 5738,
        "shieldWord": "內衣"
    },
    "5739": {
        "id": 5739,
        "shieldWord": "那嗎B"
    },
    "5740": {
        "id": 5740,
        "shieldWord": "那嗎逼"
    },
    "5741": {
        "id": 5741,
        "shieldWord": "那嗎錯比"
    },
    "5742": {
        "id": 5742,
        "shieldWord": "那嗎老比"
    },
    "5743": {
        "id": 5743,
        "shieldWord": "那嗎瘟比"
    },
    "5744": {
        "id": 5744,
        "shieldWord": "那娘錯比"
    },
    "5745": {
        "id": 5745,
        "shieldWord": "南大自由論壇"
    },
    "5746": {
        "id": 5746,
        "shieldWord": "南蠻子"
    },
    "5747": {
        "id": 5747,
        "shieldWord": "鬧事"
    },
    "5748": {
        "id": 5748,
        "shieldWord": "能樣"
    },
    "5749": {
        "id": 5749,
        "shieldWord": "尼奧夫"
    },
    "5750": {
        "id": 5750,
        "shieldWord": "倪育賢"
    },
    "5751": {
        "id": 5751,
        "shieldWord": "鯢"
    },
    "5752": {
        "id": 5752,
        "shieldWord": "你媽逼"
    },
    "5753": {
        "id": 5753,
        "shieldWord": "你媽比"
    },
    "5754": {
        "id": 5754,
        "shieldWord": "你媽的"
    },
    "5755": {
        "id": 5755,
        "shieldWord": "你媽了妹"
    },
    "5756": {
        "id": 5756,
        "shieldWord": "你說我說論壇"
    },
    "5757": {
        "id": 5757,
        "shieldWord": "你爺"
    },
    "5758": {
        "id": 5758,
        "shieldWord": "娘餓比"
    },
    "5759": {
        "id": 5759,
        "shieldWord": "儂著岡巒"
    },
    "5760": {
        "id": 5760,
        "shieldWord": "儂著卵拋"
    },
    "5761": {
        "id": 5761,
        "shieldWord": "奴隸魔族士兵"
    },
    "5762": {
        "id": 5762,
        "shieldWord": "女主人羅姬馬莉"
    },
    "5763": {
        "id": 5763,
        "shieldWord": "儺"
    },
    "5764": {
        "id": 5764,
        "shieldWord": "諾姆"
    },
    "5765": {
        "id": 5765,
        "shieldWord": "潘國平"
    },
    "5766": {
        "id": 5766,
        "shieldWord": "蹣"
    },
    "5767": {
        "id": 5767,
        "shieldWord": "龐建國"
    },
    "5768": {
        "id": 5768,
        "shieldWord": "泡沫經濟"
    },
    "5769": {
        "id": 5769,
        "shieldWord": "轡"
    },
    "5770": {
        "id": 5770,
        "shieldWord": "皮條客"
    },
    "5771": {
        "id": 5771,
        "shieldWord": "諞"
    },
    "5772": {
        "id": 5772,
        "shieldWord": "潑婦"
    },
    "5773": {
        "id": 5773,
        "shieldWord": "齊墨"
    },
    "5774": {
        "id": 5774,
        "shieldWord": "齊諾"
    },
    "5775": {
        "id": 5775,
        "shieldWord": "騎你"
    },
    "5776": {
        "id": 5776,
        "shieldWord": "錢達"
    },
    "5777": {
        "id": 5777,
        "shieldWord": "錢國梁"
    },
    "5778": {
        "id": 5778,
        "shieldWord": "錢其琛"
    },
    "5779": {
        "id": 5779,
        "shieldWord": "繰"
    },
    "5780": {
        "id": 5780,
        "shieldWord": "喬石"
    },
    "5781": {
        "id": 5781,
        "shieldWord": "喬伊"
    },
    "5782": {
        "id": 5782,
        "shieldWord": "橋侵襲兵"
    },
    "5783": {
        "id": 5783,
        "shieldWord": "譙"
    },
    "5784": {
        "id": 5784,
        "shieldWord": "鞽"
    },
    "5785": {
        "id": 5785,
        "shieldWord": "篋"
    },
    "5786": {
        "id": 5786,
        "shieldWord": "親美"
    },
    "5787": {
        "id": 5787,
        "shieldWord": "親日"
    },
    "5788": {
        "id": 5788,
        "shieldWord": "欽本立"
    },
    "5789": {
        "id": 5789,
        "shieldWord": "禽獸"
    },
    "5790": {
        "id": 5790,
        "shieldWord": "唚"
    },
    "5791": {
        "id": 5791,
        "shieldWord": "輕舟快訊"
    },
    "5792": {
        "id": 5792,
        "shieldWord": "情婦"
    },
    "5793": {
        "id": 5793,
        "shieldWord": "情獸"
    },
    "5794": {
        "id": 5794,
        "shieldWord": "丘垂貞"
    },
    "5795": {
        "id": 5795,
        "shieldWord": "闃"
    },
    "5796": {
        "id": 5796,
        "shieldWord": "全國兩會"
    },
    "5797": {
        "id": 5797,
        "shieldWord": "全國人大"
    },
    "5798": {
        "id": 5798,
        "shieldWord": "綣"
    },
    "5799": {
        "id": 5799,
        "shieldWord": "愨"
    },
    "5800": {
        "id": 5800,
        "shieldWord": "讓你操"
    },
    "5801": {
        "id": 5801,
        "shieldWord": "熱比婭"
    },
    "5802": {
        "id": 5802,
        "shieldWord": "熱站政論網"
    },
    "5803": {
        "id": 5803,
        "shieldWord": "人民大會堂"
    },
    "5804": {
        "id": 5804,
        "shieldWord": "人民內情真相"
    },
    "5805": {
        "id": 5805,
        "shieldWord": "人民真實"
    },
    "5806": {
        "id": 5806,
        "shieldWord": "人民之聲論壇"
    },
    "5807": {
        "id": 5807,
        "shieldWord": "人權"
    },
    "5808": {
        "id": 5808,
        "shieldWord": "日本帝國"
    },
    "5809": {
        "id": 5809,
        "shieldWord": "日軍"
    },
    "5810": {
        "id": 5810,
        "shieldWord": "日內瓦金融"
    },
    "5811": {
        "id": 5811,
        "shieldWord": "日你媽"
    },
    "5812": {
        "id": 5812,
        "shieldWord": "日你爺爺"
    },
    "5813": {
        "id": 5813,
        "shieldWord": "日朱駿"
    },
    "5814": {
        "id": 5814,
        "shieldWord": "顬"
    },
    "5815": {
        "id": 5815,
        "shieldWord": "乳暈"
    },
    "5816": {
        "id": 5816,
        "shieldWord": "瑞士金融大學"
    },
    "5817": {
        "id": 5817,
        "shieldWord": "三K黨"
    },
    "5818": {
        "id": 5818,
        "shieldWord": "三個代表"
    },
    "5819": {
        "id": 5819,
        "shieldWord": "三去車侖工力"
    },
    "5820": {
        "id": 5820,
        "shieldWord": "毿"
    },
    "5821": {
        "id": 5821,
        "shieldWord": "騷B"
    },
    "5822": {
        "id": 5822,
        "shieldWord": "騷棒"
    },
    "5823": {
        "id": 5823,
        "shieldWord": "騷包"
    },
    "5824": {
        "id": 5824,
        "shieldWord": "騷棍"
    },
    "5825": {
        "id": 5825,
        "shieldWord": "騷鶏"
    },
    "5826": {
        "id": 5826,
        "shieldWord": "騷卵"
    },
    "5827": {
        "id": 5827,
        "shieldWord": "殺你全家"
    },
    "5828": {
        "id": 5828,
        "shieldWord": "殺你一家"
    },
    "5829": {
        "id": 5829,
        "shieldWord": "殺人犯"
    },
    "5830": {
        "id": 5830,
        "shieldWord": "傻鳥"
    },
    "5831": {
        "id": 5831,
        "shieldWord": "山口組"
    },
    "5832": {
        "id": 5832,
        "shieldWord": "善惡有報"
    },
    "5833": {
        "id": 5833,
        "shieldWord": "上訪"
    },
    "5834": {
        "id": 5834,
        "shieldWord": "上海孤兒院"
    },
    "5835": {
        "id": 5835,
        "shieldWord": "厙"
    },
    "5836": {
        "id": 5836,
        "shieldWord": "社會主義"
    },
    "5837": {
        "id": 5837,
        "shieldWord": "射了還說要"
    },
    "5838": {
        "id": 5838,
        "shieldWord": "灄"
    },
    "5839": {
        "id": 5839,
        "shieldWord": "詵"
    },
    "5840": {
        "id": 5840,
        "shieldWord": "神經病"
    },
    "5841": {
        "id": 5841,
        "shieldWord": "諗"
    },
    "5842": {
        "id": 5842,
        "shieldWord": "生孩子沒屁眼"
    },
    "5843": {
        "id": 5843,
        "shieldWord": "生命分流的圖騰"
    },
    "5844": {
        "id": 5844,
        "shieldWord": "澠"
    },
    "5845": {
        "id": 5845,
        "shieldWord": "聖射手"
    },
    "5846": {
        "id": 5846,
        "shieldWord": "盛華仁"
    },
    "5847": {
        "id": 5847,
        "shieldWord": "濕了還說不要"
    },
    "5848": {
        "id": 5848,
        "shieldWord": "濕了還說要"
    },
    "5849": {
        "id": 5849,
        "shieldWord": "釃"
    },
    "5850": {
        "id": 5850,
        "shieldWord": "鯴"
    },
    "5851": {
        "id": 5851,
        "shieldWord": "石化圖騰"
    },
    "5852": {
        "id": 5852,
        "shieldWord": "石拳戰鬥兵"
    },
    "5853": {
        "id": 5853,
        "shieldWord": "時代論壇"
    },
    "5854": {
        "id": 5854,
        "shieldWord": "時事論壇"
    },
    "5855": {
        "id": 5855,
        "shieldWord": "鰣"
    },
    "5856": {
        "id": 5856,
        "shieldWord": "史萊姆"
    },
    "5857": {
        "id": 5857,
        "shieldWord": "史萊姆王"
    },
    "5858": {
        "id": 5858,
        "shieldWord": "士兵管理員瓦爾臣"
    },
    "5859": {
        "id": 5859,
        "shieldWord": "世界經濟導報"
    },
    "5860": {
        "id": 5860,
        "shieldWord": "事實獨立"
    },
    "5861": {
        "id": 5861,
        "shieldWord": "侍從貝赫爾特"
    },
    "5862": {
        "id": 5862,
        "shieldWord": "侍從倫斯韋"
    },
    "5863": {
        "id": 5863,
        "shieldWord": "貰"
    },
    "5864": {
        "id": 5864,
        "shieldWord": "攄"
    },
    "5865": {
        "id": 5865,
        "shieldWord": "資料中國"
    },
    "5866": {
        "id": 5866,
        "shieldWord": "雙十節"
    },
    "5867": {
        "id": 5867,
        "shieldWord": "氵去車侖工力"
    },
    "5868": {
        "id": 5868,
        "shieldWord": "氵去車侖工力?"
    },
    "5869": {
        "id": 5869,
        "shieldWord": "稅力"
    },
    "5870": {
        "id": 5870,
        "shieldWord": "司馬晉"
    },
    "5871": {
        "id": 5871,
        "shieldWord": "司馬璐"
    },
    "5872": {
        "id": 5872,
        "shieldWord": "司徒華"
    },
    "5873": {
        "id": 5873,
        "shieldWord": "私處"
    },
    "5874": {
        "id": 5874,
        "shieldWord": "思柯洛"
    },
    "5875": {
        "id": 5875,
        "shieldWord": "斯諾"
    },
    "5876": {
        "id": 5876,
        "shieldWord": "斯皮爾德"
    },
    "5877": {
        "id": 5877,
        "shieldWord": "四川獨"
    },
    "5878": {
        "id": 5878,
        "shieldWord": "四川獨立"
    },
    "5879": {
        "id": 5879,
        "shieldWord": "宋書元"
    },
    "5880": {
        "id": 5880,
        "shieldWord": "藪"
    },
    "5881": {
        "id": 5881,
        "shieldWord": "蘇菲爾"
    },
    "5882": {
        "id": 5882,
        "shieldWord": "蘇拉"
    },
    "5883": {
        "id": 5883,
        "shieldWord": "蘇南成"
    },
    "5884": {
        "id": 5884,
        "shieldWord": "蘇紹智"
    },
    "5885": {
        "id": 5885,
        "shieldWord": "蘇特勒守護兵"
    },
    "5886": {
        "id": 5886,
        "shieldWord": "蘇特勤"
    },
    "5887": {
        "id": 5887,
        "shieldWord": "蘇特勤護衛兵"
    },
    "5888": {
        "id": 5888,
        "shieldWord": "蘇特勤魔法師"
    },
    "5889": {
        "id": 5889,
        "shieldWord": "蘇曉康"
    },
    "5890": {
        "id": 5890,
        "shieldWord": "蘇盈貴"
    },
    "5891": {
        "id": 5891,
        "shieldWord": "蘇貞昌"
    },
    "5892": {
        "id": 5892,
        "shieldWord": "誶"
    },
    "5893": {
        "id": 5893,
        "shieldWord": "碎片製造商人馬克"
    },
    "5894": {
        "id": 5894,
        "shieldWord": "碎片製造商人蘇克"
    },
    "5895": {
        "id": 5895,
        "shieldWord": "孫大千"
    },
    "5896": {
        "id": 5896,
        "shieldWord": "他媽"
    },
    "5897": {
        "id": 5897,
        "shieldWord": "他媽的"
    },
    "5898": {
        "id": 5898,
        "shieldWord": "他嗎的"
    },
    "5899": {
        "id": 5899,
        "shieldWord": "他母親"
    },
    "5900": {
        "id": 5900,
        "shieldWord": "塔內"
    },
    "5901": {
        "id": 5901,
        "shieldWord": "塔烏"
    },
    "5902": {
        "id": 5902,
        "shieldWord": "鰨"
    },
    "5903": {
        "id": 5903,
        "shieldWord": "闥"
    },
    "5904": {
        "id": 5904,
        "shieldWord": "臺盟"
    },
    "5905": {
        "id": 5905,
        "shieldWord": "臺灣帝國"
    },
    "5906": {
        "id": 5906,
        "shieldWord": "臺灣獨"
    },
    "5907": {
        "id": 5907,
        "shieldWord": "臺灣共產黨"
    },
    "5908": {
        "id": 5908,
        "shieldWord": "臺灣狗"
    },
    "5909": {
        "id": 5909,
        "shieldWord": "臺灣建國運動組織"
    },
    "5910": {
        "id": 5910,
        "shieldWord": "臺灣青年獨立聯盟"
    },
    "5911": {
        "id": 5911,
        "shieldWord": "臺灣政論區"
    },
    "5912": {
        "id": 5912,
        "shieldWord": "臺灣自由聯盟"
    },
    "5913": {
        "id": 5913,
        "shieldWord": "鮐"
    },
    "5914": {
        "id": 5914,
        "shieldWord": "太監"
    },
    "5915": {
        "id": 5915,
        "shieldWord": "泰奴橋警衛兵"
    },
    "5916": {
        "id": 5916,
        "shieldWord": "泰奴橋掠奪者"
    },
    "5917": {
        "id": 5917,
        "shieldWord": "湯光中"
    },
    "5918": {
        "id": 5918,
        "shieldWord": "唐柏橋"
    },
    "5919": {
        "id": 5919,
        "shieldWord": "鞀"
    },
    "5920": {
        "id": 5920,
        "shieldWord": "謄"
    },
    "5921": {
        "id": 5921,
        "shieldWord": "天安門"
    },
    "5922": {
        "id": 5922,
        "shieldWord": "天安門錄影帶"
    },
    "5923": {
        "id": 5923,
        "shieldWord": "天安門屠殺"
    },
    "5924": {
        "id": 5924,
        "shieldWord": "天安門一代"
    },
    "5925": {
        "id": 5925,
        "shieldWord": "天閹"
    },
    "5926": {
        "id": 5926,
        "shieldWord": "田紀雲"
    },
    "5927": {
        "id": 5927,
        "shieldWord": "齠"
    },
    "5928": {
        "id": 5928,
        "shieldWord": "鰷"
    },
    "5929": {
        "id": 5929,
        "shieldWord": "銚"
    },
    "5930": {
        "id": 5930,
        "shieldWord": "庭院警衛兵"
    },
    "5931": {
        "id": 5931,
        "shieldWord": "統獨"
    },
    "5932": {
        "id": 5932,
        "shieldWord": "統獨論壇"
    },
    "5933": {
        "id": 5933,
        "shieldWord": "統戰"
    },
    "5934": {
        "id": 5934,
        "shieldWord": "頭領奧馬"
    },
    "5935": {
        "id": 5935,
        "shieldWord": "頭領墳墓管理員"
    },
    "5936": {
        "id": 5936,
        "shieldWord": "圖書管理員卡特"
    },
    "5937": {
        "id": 5937,
        "shieldWord": "團長戈登"
    },
    "5938": {
        "id": 5938,
        "shieldWord": "團員瑪律汀"
    },
    "5939": {
        "id": 5939,
        "shieldWord": "摶"
    },
    "5940": {
        "id": 5940,
        "shieldWord": "鼉"
    },
    "5941": {
        "id": 5941,
        "shieldWord": "籜"
    },
    "5942": {
        "id": 5942,
        "shieldWord": "膃"
    },
    "5943": {
        "id": 5943,
        "shieldWord": "外交論壇"
    },
    "5944": {
        "id": 5944,
        "shieldWord": "外交與方略"
    },
    "5945": {
        "id": 5945,
        "shieldWord": "晚年周恩來"
    },
    "5946": {
        "id": 5946,
        "shieldWord": "綰"
    },
    "5947": {
        "id": 5947,
        "shieldWord": "萬里"
    },
    "5948": {
        "id": 5948,
        "shieldWord": "萬潤南"
    },
    "5949": {
        "id": 5949,
        "shieldWord": "萬維讀者論壇"
    },
    "5950": {
        "id": 5950,
        "shieldWord": "萬曉東"
    },
    "5951": {
        "id": 5951,
        "shieldWord": "王寶森"
    },
    "5952": {
        "id": 5952,
        "shieldWord": "王超華"
    },
    "5953": {
        "id": 5953,
        "shieldWord": "王輔臣"
    },
    "5954": {
        "id": 5954,
        "shieldWord": "王涵萬"
    },
    "5955": {
        "id": 5955,
        "shieldWord": "王軍濤"
    },
    "5956": {
        "id": 5956,
        "shieldWord": "王潤生"
    },
    "5957": {
        "id": 5957,
        "shieldWord": "王世堅"
    },
    "5958": {
        "id": 5958,
        "shieldWord": "王世勳"
    },
    "5959": {
        "id": 5959,
        "shieldWord": "王秀麗"
    },
    "5960": {
        "id": 5960,
        "shieldWord": "網禪"
    },
    "5961": {
        "id": 5961,
        "shieldWord": "網特"
    },
    "5962": {
        "id": 5962,
        "shieldWord": "鮪"
    },
    "5963": {
        "id": 5963,
        "shieldWord": "溫B"
    },
    "5964": {
        "id": 5964,
        "shieldWord": "溫逼"
    },
    "5965": {
        "id": 5965,
        "shieldWord": "溫比"
    },
    "5966": {
        "id": 5966,
        "shieldWord": "溫元凱"
    },
    "5967": {
        "id": 5967,
        "shieldWord": "閿"
    },
    "5968": {
        "id": 5968,
        "shieldWord": "無界流覽器"
    },
    "5969": {
        "id": 5969,
        "shieldWord": "吳百益"
    },
    "5970": {
        "id": 5970,
        "shieldWord": "吳敦義"
    },
    "5971": {
        "id": 5971,
        "shieldWord": "吳方城"
    },
    "5972": {
        "id": 5972,
        "shieldWord": "吳弘達"
    },
    "5973": {
        "id": 5973,
        "shieldWord": "吳宏達"
    },
    "5974": {
        "id": 5974,
        "shieldWord": "吳仁華"
    },
    "5975": {
        "id": 5975,
        "shieldWord": "吳淑珍"
    },
    "5976": {
        "id": 5976,
        "shieldWord": "吳學燦"
    },
    "5977": {
        "id": 5977,
        "shieldWord": "吳學璨"
    },
    "5978": {
        "id": 5978,
        "shieldWord": "吳育升"
    },
    "5979": {
        "id": 5979,
        "shieldWord": "吳志芳"
    },
    "5980": {
        "id": 5980,
        "shieldWord": "西藏獨"
    },
    "5981": {
        "id": 5981,
        "shieldWord": "吸收的圖騰"
    },
    "5982": {
        "id": 5982,
        "shieldWord": "吸血獸"
    },
    "5983": {
        "id": 5983,
        "shieldWord": "覡"
    },
    "5984": {
        "id": 5984,
        "shieldWord": "洗腦"
    },
    "5985": {
        "id": 5985,
        "shieldWord": "餼"
    },
    "5986": {
        "id": 5986,
        "shieldWord": "郤"
    },
    "5987": {
        "id": 5987,
        "shieldWord": "下體"
    },
    "5988": {
        "id": 5988,
        "shieldWord": "薟"
    },
    "5989": {
        "id": 5989,
        "shieldWord": "躚"
    },
    "5990": {
        "id": 5990,
        "shieldWord": "鮮族"
    },
    "5991": {
        "id": 5991,
        "shieldWord": "獫"
    },
    "5992": {
        "id": 5992,
        "shieldWord": "蜆"
    },
    "5993": {
        "id": 5993,
        "shieldWord": "峴"
    },
    "5994": {
        "id": 5994,
        "shieldWord": "現金"
    },
    "5995": {
        "id": 5995,
        "shieldWord": "現金交易"
    },
    "5996": {
        "id": 5996,
        "shieldWord": "獻祭的圖騰"
    },
    "5997": {
        "id": 5997,
        "shieldWord": "鯗"
    },
    "5998": {
        "id": 5998,
        "shieldWord": "項懷誠"
    },
    "5999": {
        "id": 5999,
        "shieldWord": "項小吉"
    },
    "6000": {
        "id": 6000,
        "shieldWord": "嘵"
    },
    "6001": {
        "id": 6001,
        "shieldWord": "小B樣"
    },
    "6002": {
        "id": 6002,
        "shieldWord": "小比樣"
    },
    "6003": {
        "id": 6003,
        "shieldWord": "小靈通"
    },
    "6004": {
        "id": 6004,
        "shieldWord": "小泉純一郎"
    },
    "6005": {
        "id": 6005,
        "shieldWord": "謝長廷"
    },
    "6006": {
        "id": 6006,
        "shieldWord": "謝深山"
    },
    "6007": {
        "id": 6007,
        "shieldWord": "謝選駿"
    },
    "6008": {
        "id": 6008,
        "shieldWord": "謝中之"
    },
    "6009": {
        "id": 6009,
        "shieldWord": "辛灝年"
    },
    "6010": {
        "id": 6010,
        "shieldWord": "新觀察論壇"
    },
    "6011": {
        "id": 6011,
        "shieldWord": "新華舉報"
    },
    "6012": {
        "id": 6012,
        "shieldWord": "新華內情"
    },
    "6013": {
        "id": 6013,
        "shieldWord": "新華通論壇"
    },
    "6014": {
        "id": 6014,
        "shieldWord": "新疆獨"
    },
    "6015": {
        "id": 6015,
        "shieldWord": "新生網"
    },
    "6016": {
        "id": 6016,
        "shieldWord": "新手訓練營"
    },
    "6017": {
        "id": 6017,
        "shieldWord": "新聞出版總署"
    },
    "6018": {
        "id": 6018,
        "shieldWord": "新聞封鎖"
    },
    "6019": {
        "id": 6019,
        "shieldWord": "新義安"
    },
    "6020": {
        "id": 6020,
        "shieldWord": "新語絲"
    },
    "6021": {
        "id": 6021,
        "shieldWord": "信用危機"
    },
    "6022": {
        "id": 6022,
        "shieldWord": "邢錚"
    },
    "6023": {
        "id": 6023,
        "shieldWord": "性無能"
    },
    "6024": {
        "id": 6024,
        "shieldWord": "修煉"
    },
    "6025": {
        "id": 6025,
        "shieldWord": "頊"
    },
    "6026": {
        "id": 6026,
        "shieldWord": "虛弱圖騰"
    },
    "6027": {
        "id": 6027,
        "shieldWord": "虛無的飽食者"
    },
    "6028": {
        "id": 6028,
        "shieldWord": "徐國舅"
    },
    "6029": {
        "id": 6029,
        "shieldWord": "許財利"
    },
    "6030": {
        "id": 6030,
        "shieldWord": "許家屯"
    },
    "6031": {
        "id": 6031,
        "shieldWord": "許信良"
    },
    "6032": {
        "id": 6032,
        "shieldWord": "諼"
    },
    "6033": {
        "id": 6033,
        "shieldWord": "薛偉"
    },
    "6034": {
        "id": 6034,
        "shieldWord": "學聯"
    },
    "6035": {
        "id": 6035,
        "shieldWord": "學自聯"
    },
    "6036": {
        "id": 6036,
        "shieldWord": "澩"
    },
    "6037": {
        "id": 6037,
        "shieldWord": "閹狗"
    },
    "6038": {
        "id": 6038,
        "shieldWord": "訁"
    },
    "6039": {
        "id": 6039,
        "shieldWord": "嚴家其"
    },
    "6040": {
        "id": 6040,
        "shieldWord": "嚴家祺"
    },
    "6041": {
        "id": 6041,
        "shieldWord": "閻明複"
    },
    "6042": {
        "id": 6042,
        "shieldWord": "顏清標"
    },
    "6043": {
        "id": 6043,
        "shieldWord": "顏慶章"
    },
    "6044": {
        "id": 6044,
        "shieldWord": "讞"
    },
    "6045": {
        "id": 6045,
        "shieldWord": "央視內部晚會"
    },
    "6046": {
        "id": 6046,
        "shieldWord": "陽痿"
    },
    "6047": {
        "id": 6047,
        "shieldWord": "楊懷安"
    },
    "6048": {
        "id": 6048,
        "shieldWord": "楊建利"
    },
    "6049": {
        "id": 6049,
        "shieldWord": "楊巍"
    },
    "6050": {
        "id": 6050,
        "shieldWord": "楊月清"
    },
    "6051": {
        "id": 6051,
        "shieldWord": "楊周"
    },
    "6052": {
        "id": 6052,
        "shieldWord": "姚羅"
    },
    "6053": {
        "id": 6053,
        "shieldWord": "姚月謙"
    },
    "6054": {
        "id": 6054,
        "shieldWord": "軺"
    },
    "6055": {
        "id": 6055,
        "shieldWord": "藥材商人蘇耐得"
    },
    "6056": {
        "id": 6056,
        "shieldWord": "藥水"
    },
    "6057": {
        "id": 6057,
        "shieldWord": "葉菊蘭"
    },
    "6058": {
        "id": 6058,
        "shieldWord": "夜話紫禁城"
    },
    "6059": {
        "id": 6059,
        "shieldWord": "一陀糞"
    },
    "6060": {
        "id": 6060,
        "shieldWord": "伊莎貝爾"
    },
    "6061": {
        "id": 6061,
        "shieldWord": "伊斯蘭亞格林尼斯"
    },
    "6062": {
        "id": 6062,
        "shieldWord": "遺精"
    },
    "6063": {
        "id": 6063,
        "shieldWord": "議長阿茵斯塔"
    },
    "6064": {
        "id": 6064,
        "shieldWord": "議員斯格文德"
    },
    "6065": {
        "id": 6065,
        "shieldWord": "異見人士"
    },
    "6066": {
        "id": 6066,
        "shieldWord": "異型叛軍"
    },
    "6067": {
        "id": 6067,
        "shieldWord": "異議人士"
    },
    "6068": {
        "id": 6068,
        "shieldWord": "易丹軒"
    },
    "6069": {
        "id": 6069,
        "shieldWord": "意志不堅的圖騰"
    },
    "6070": {
        "id": 6070,
        "shieldWord": "瘞"
    },
    "6071": {
        "id": 6071,
        "shieldWord": "陰門"
    },
    "6072": {
        "id": 6072,
        "shieldWord": "陰囊"
    },
    "6073": {
        "id": 6073,
        "shieldWord": "淫貨"
    },
    "6074": {
        "id": 6074,
        "shieldWord": "尹慶民"
    },
    "6075": {
        "id": 6075,
        "shieldWord": "引導"
    },
    "6076": {
        "id": 6076,
        "shieldWord": "隱者之路"
    },
    "6077": {
        "id": 6077,
        "shieldWord": "鷹眼派氏族"
    },
    "6078": {
        "id": 6078,
        "shieldWord": "硬直圖騰"
    },
    "6079": {
        "id": 6079,
        "shieldWord": "憂鬱的艾拉"
    },
    "6080": {
        "id": 6080,
        "shieldWord": "尤比亞"
    },
    "6081": {
        "id": 6081,
        "shieldWord": "由喜貴"
    },
    "6082": {
        "id": 6082,
        "shieldWord": "遊蕩的僵屍"
    },
    "6083": {
        "id": 6083,
        "shieldWord": "遊蕩的士兵"
    },
    "6084": {
        "id": 6084,
        "shieldWord": "遊蕩爪牙"
    },
    "6085": {
        "id": 6085,
        "shieldWord": "游錫坤"
    },
    "6086": {
        "id": 6086,
        "shieldWord": "友好的魯德"
    },
    "6087": {
        "id": 6087,
        "shieldWord": "幼龍"
    },
    "6088": {
        "id": 6088,
        "shieldWord": "於幼軍"
    },
    "6089": {
        "id": 6089,
        "shieldWord": "余英時"
    },
    "6090": {
        "id": 6090,
        "shieldWord": "漁夫菲斯曼"
    },
    "6091": {
        "id": 6091,
        "shieldWord": "輿論"
    },
    "6092": {
        "id": 6092,
        "shieldWord": "輿論反制"
    },
    "6093": {
        "id": 6093,
        "shieldWord": "傴"
    },
    "6094": {
        "id": 6094,
        "shieldWord": "宇明網"
    },
    "6095": {
        "id": 6095,
        "shieldWord": "齬"
    },
    "6096": {
        "id": 6096,
        "shieldWord": "飫"
    },
    "6097": {
        "id": 6097,
        "shieldWord": "鵒"
    },
    "6098": {
        "id": 6098,
        "shieldWord": "元老蘭提(沃德）"
    },
    "6099": {
        "id": 6099,
        "shieldWord": "緣圈圈"
    },
    "6100": {
        "id": 6100,
        "shieldWord": "遠志明"
    },
    "6101": {
        "id": 6101,
        "shieldWord": "月經"
    },
    "6102": {
        "id": 6102,
        "shieldWord": "韞"
    },
    "6103": {
        "id": 6103,
        "shieldWord": "鏨"
    },
    "6104": {
        "id": 6104,
        "shieldWord": "造愛"
    },
    "6105": {
        "id": 6105,
        "shieldWord": "則民"
    },
    "6106": {
        "id": 6106,
        "shieldWord": "擇民"
    },
    "6107": {
        "id": 6107,
        "shieldWord": "澤夫"
    },
    "6108": {
        "id": 6108,
        "shieldWord": "澤民"
    },
    "6109": {
        "id": 6109,
        "shieldWord": "賾"
    },
    "6110": {
        "id": 6110,
        "shieldWord": "賊民"
    },
    "6111": {
        "id": 6111,
        "shieldWord": "譖"
    },
    "6112": {
        "id": 6112,
        "shieldWord": "紮卡維是英雄"
    },
    "6113": {
        "id": 6113,
        "shieldWord": "驏"
    },
    "6114": {
        "id": 6114,
        "shieldWord": "張伯笠"
    },
    "6115": {
        "id": 6115,
        "shieldWord": "張博雅"
    },
    "6116": {
        "id": 6116,
        "shieldWord": "張鋼"
    },
    "6117": {
        "id": 6117,
        "shieldWord": "張健"
    },
    "6118": {
        "id": 6118,
        "shieldWord": "張林"
    },
    "6119": {
        "id": 6119,
        "shieldWord": "張清芳"
    },
    "6120": {
        "id": 6120,
        "shieldWord": "張偉國"
    },
    "6121": {
        "id": 6121,
        "shieldWord": "張溫鷹"
    },
    "6122": {
        "id": 6122,
        "shieldWord": "張昭富"
    },
    "6123": {
        "id": 6123,
        "shieldWord": "張志清"
    },
    "6124": {
        "id": 6124,
        "shieldWord": "章孝嚴"
    },
    "6125": {
        "id": 6125,
        "shieldWord": "帳號"
    },
    "6126": {
        "id": 6126,
        "shieldWord": "趙海青"
    },
    "6127": {
        "id": 6127,
        "shieldWord": "趙建銘"
    },
    "6128": {
        "id": 6128,
        "shieldWord": "趙南"
    },
    "6129": {
        "id": 6129,
        "shieldWord": "趙品潞"
    },
    "6130": {
        "id": 6130,
        "shieldWord": "趙曉微"
    },
    "6131": {
        "id": 6131,
        "shieldWord": "貞操"
    },
    "6132": {
        "id": 6132,
        "shieldWord": "爭鳴論壇"
    },
    "6133": {
        "id": 6133,
        "shieldWord": "正見網"
    },
    "6134": {
        "id": 6134,
        "shieldWord": "正義黨論壇"
    },
    "6135": {
        "id": 6135,
        "shieldWord": "鄭寶清"
    },
    "6136": {
        "id": 6136,
        "shieldWord": "鄭麗文"
    },
    "6137": {
        "id": 6137,
        "shieldWord": "鄭義"
    },
    "6138": {
        "id": 6138,
        "shieldWord": "鄭余鎮"
    },
    "6139": {
        "id": 6139,
        "shieldWord": "鄭源"
    },
    "6140": {
        "id": 6140,
        "shieldWord": "鄭運鵬"
    },
    "6141": {
        "id": 6141,
        "shieldWord": "政權"
    },
    "6142": {
        "id": 6142,
        "shieldWord": "縶"
    },
    "6143": {
        "id": 6143,
        "shieldWord": "躑"
    },
    "6144": {
        "id": 6144,
        "shieldWord": "指點江山論壇"
    },
    "6145": {
        "id": 6145,
        "shieldWord": "騭"
    },
    "6146": {
        "id": 6146,
        "shieldWord": "觶"
    },
    "6147": {
        "id": 6147,
        "shieldWord": "躓"
    },
    "6148": {
        "id": 6148,
        "shieldWord": "中毒的圖騰"
    },
    "6149": {
        "id": 6149,
        "shieldWord": "中毒圖騰"
    },
    "6150": {
        "id": 6150,
        "shieldWord": "中俄邊界"
    },
    "6151": {
        "id": 6151,
        "shieldWord": "中國復興論壇"
    },
    "6152": {
        "id": 6152,
        "shieldWord": "中國共產黨"
    },
    "6153": {
        "id": 6153,
        "shieldWord": "中國孤兒院"
    },
    "6154": {
        "id": 6154,
        "shieldWord": "中國和平"
    },
    "6155": {
        "id": 6155,
        "shieldWord": "中國論壇"
    },
    "6156": {
        "id": 6156,
        "shieldWord": "中國社會進步黨"
    },
    "6157": {
        "id": 6157,
        "shieldWord": "中國社會論壇"
    },
    "6158": {
        "id": 6158,
        "shieldWord": "中國威脅論"
    },
    "6159": {
        "id": 6159,
        "shieldWord": "中國問題論壇"
    },
    "6160": {
        "id": 6160,
        "shieldWord": "中國移動通信"
    },
    "6161": {
        "id": 6161,
        "shieldWord": "中國真實內容"
    },
    "6162": {
        "id": 6162,
        "shieldWord": "中華大地"
    },
    "6163": {
        "id": 6163,
        "shieldWord": "中華大眾"
    },
    "6164": {
        "id": 6164,
        "shieldWord": "中華講清"
    },
    "6165": {
        "id": 6165,
        "shieldWord": "中華民國"
    },
    "6166": {
        "id": 6166,
        "shieldWord": "中華人民實話實說"
    },
    "6167": {
        "id": 6167,
        "shieldWord": "中華人民正邪"
    },
    "6168": {
        "id": 6168,
        "shieldWord": "中華時事"
    },
    "6169": {
        "id": 6169,
        "shieldWord": "中華養生益智功"
    },
    "6170": {
        "id": 6170,
        "shieldWord": "中華真實報導"
    },
    "6171": {
        "id": 6171,
        "shieldWord": "鐘山風雨論壇"
    },
    "6172": {
        "id": 6172,
        "shieldWord": "周鋒鎖"
    },
    "6173": {
        "id": 6173,
        "shieldWord": "周守訓"
    },
    "6174": {
        "id": 6174,
        "shieldWord": "朱鳳芝"
    },
    "6175": {
        "id": 6175,
        "shieldWord": "朱立倫"
    },
    "6176": {
        "id": 6176,
        "shieldWord": "主攻指揮官"
    },
    "6177": {
        "id": 6177,
        "shieldWord": "主義"
    },
    "6178": {
        "id": 6178,
        "shieldWord": "助手威爾特"
    },
    "6179": {
        "id": 6179,
        "shieldWord": "轉化"
    },
    "6180": {
        "id": 6180,
        "shieldWord": "資本主義"
    },
    "6181": {
        "id": 6181,
        "shieldWord": "鯫"
    },
    "6182": {
        "id": 6182,
        "shieldWord": "胡總書記"
    },
    "6183": {
        "id": 6183,
        "shieldWord": "胡景濤"
    },
    "6184": {
        "id": 6184,
        "shieldWord": "燕玲論壇"
    },
    "6185": {
        "id": 6185,
        "shieldWord": "刪號"
    },
    "6186": {
        "id": 6186,
        "shieldWord": "賣號"
    },
    "6187": {
        "id": 6187,
        "shieldWord": "刪號"
    },
    "6188": {
        "id": 6188,
        "shieldWord": "出售帳號"
    },
    "6189": {
        "id": 6189,
        "shieldWord": "出售此號"
    },
    "6190": {
        "id": 6190,
        "shieldWord": "黃色"
    },
    "6191": {
        "id": 6191,
        "shieldWord": "*法*輪*功*"
    },
    "6192": {
        "id": 6192,
        "shieldWord": "澳洲光明網"
    },
    "6193": {
        "id": 6193,
        "shieldWord": "八九風波"
    },
    "6194": {
        "id": 6194,
        "shieldWord": "辦理文憑"
    },
    "6195": {
        "id": 6195,
        "shieldWord": "辦理證件"
    },
    "6196": {
        "id": 6196,
        "shieldWord": "保監會"
    },
    "6197": {
        "id": 6197,
        "shieldWord": "鴇"
    },
    "6198": {
        "id": 6198,
        "shieldWord": "鮑嶽橋"
    },
    "6199": {
        "id": 6199,
        "shieldWord": "暴動"
    },
    "6200": {
        "id": 6200,
        "shieldWord": "貝肉"
    },
    "6201": {
        "id": 6201,
        "shieldWord": "佈雷爾"
    },
    "6202": {
        "id": 6202,
        "shieldWord": "財政部"
    },
    "6203": {
        "id": 6203,
        "shieldWord": "參事室"
    },
    "6204": {
        "id": 6204,
        "shieldWord": "交媾"
    },
    "6205": {
        "id": 6205,
        "shieldWord": "CAO"
    },
    "6206": {
        "id": 6206,
        "shieldWord": "K粉"
    },
    "6207": {
        "id": 6207,
        "shieldWord": "J8"
    },
    "6208": {
        "id": 6208,
        "shieldWord": "小姐兼職"
    },
    "6209": {
        "id": 6209,
        "shieldWord": "交媾"
    },
    "6210": {
        "id": 6210,
        "shieldWord": "西藏314事件"
    },
    "6211": {
        "id": 6211,
        "shieldWord": "新疆7.5事件"
    },
    "6212": {
        "id": 6212,
        "shieldWord": "亂倫"
    },
    "6213": {
        "id": 6213,
        "shieldWord": "毛片"
    },
    "6214": {
        "id": 6214,
        "shieldWord": "黃片"
    },
    "6215": {
        "id": 6215,
        "shieldWord": "交配"
    },
    "6216": {
        "id": 6216,
        "shieldWord": "群交"
    },
    "6217": {
        "id": 6217,
        "shieldWord": "小姐兼職"
    },
    "6218": {
        "id": 6218,
        "shieldWord": "茉莉花革命"
    },
    "6219": {
        "id": 6219,
        "shieldWord": "操你八輩祖宗"
    },
    "6220": {
        "id": 6220,
        "shieldWord": "操你媽屄"
    },
    "6221": {
        "id": 6221,
        "shieldWord": "草的你媽"
    },
    "6222": {
        "id": 6222,
        "shieldWord": "草媽"
    },
    "6223": {
        "id": 6223,
        "shieldWord": "測繪局"
    },
    "6224": {
        "id": 6224,
        "shieldWord": "產權局"
    },
    "6225": {
        "id": 6225,
        "shieldWord": "車臣"
    },
    "6226": {
        "id": 6226,
        "shieldWord": "陳功"
    },
    "6227": {
        "id": 6227,
        "shieldWord": "陳曉甯"
    },
    "6228": {
        "id": 6228,
        "shieldWord": "成人電影"
    },
    "6229": {
        "id": 6229,
        "shieldWord": "遲浩田"
    },
    "6230": {
        "id": 6230,
        "shieldWord": "出售假幣"
    },
    "6231": {
        "id": 6231,
        "shieldWord": "出售槍支"
    },
    "6232": {
        "id": 6232,
        "shieldWord": "出售手槍"
    },
    "6233": {
        "id": 6233,
        "shieldWord": "蠢豬"
    },
    "6234": {
        "id": 6234,
        "shieldWord": "粗制嗎啡"
    },
    "6235": {
        "id": 6235,
        "shieldWord": "催情藥"
    },
    "6236": {
        "id": 6236,
        "shieldWord": "大麻樹脂"
    },
    "6237": {
        "id": 6237,
        "shieldWord": "大師"
    },
    "6238": {
        "id": 6238,
        "shieldWord": "大學騷亂"
    },
    "6239": {
        "id": 6239,
        "shieldWord": "戴海靜"
    },
    "6240": {
        "id": 6240,
        "shieldWord": "戴紅"
    },
    "6241": {
        "id": 6241,
        "shieldWord": "黨主席"
    },
    "6242": {
        "id": 6242,
        "shieldWord": "檔案局"
    },
    "6243": {
        "id": 6243,
        "shieldWord": "電監會"
    },
    "6244": {
        "id": 6244,
        "shieldWord": "屌鳩"
    },
    "6245": {
        "id": 6245,
        "shieldWord": "釣魚臺"
    },
    "6246": {
        "id": 6246,
        "shieldWord": "東突暴動和獨立"
    },
    "6247": {
        "id": 6247,
        "shieldWord": "東突組織"
    },
    "6248": {
        "id": 6248,
        "shieldWord": "董建華"
    },
    "6249": {
        "id": 6249,
        "shieldWord": "董賤華"
    },
    "6250": {
        "id": 6250,
        "shieldWord": "董文華"
    },
    "6251": {
        "id": 6251,
        "shieldWord": "懂文華"
    },
    "6252": {
        "id": 6252,
        "shieldWord": "獨立"
    },
    "6253": {
        "id": 6253,
        "shieldWord": "二乙基醯胺發掄"
    },
    "6254": {
        "id": 6254,
        "shieldWord": "法(輪)功"
    },
    "6255": {
        "id": 6255,
        "shieldWord": "法*輪*功"
    },
    "6256": {
        "id": 6256,
        "shieldWord": "法制辦"
    },
    "6257": {
        "id": 6257,
        "shieldWord": "反動"
    },
    "6258": {
        "id": 6258,
        "shieldWord": "發票"
    },
    "6259": {
        "id": 6259,
        "shieldWord": "冰粉"
    },
    "6260": {
        "id": 6260,
        "shieldWord": "性奴"
    },
    "6261": {
        "id": 6261,
        "shieldWord": "反共"
    },
    "6262": {
        "id": 6262,
        "shieldWord": "反華"
    },
    "6263": {
        "id": 6263,
        "shieldWord": "反恐委員會"
    },
    "6264": {
        "id": 6264,
        "shieldWord": "分裂祖國"
    },
    "6265": {
        "id": 6265,
        "shieldWord": "斧頭鐮刀"
    },
    "6266": {
        "id": 6266,
        "shieldWord": "傅鵬"
    },
    "6267": {
        "id": 6267,
        "shieldWord": "幹GM"
    },
    "6268": {
        "id": 6268,
        "shieldWord": "幹拎娘"
    },
    "6269": {
        "id": 6269,
        "shieldWord": "幹妳老母"
    },
    "6270": {
        "id": 6270,
        "shieldWord": "幹妳媽"
    },
    "6271": {
        "id": 6271,
        "shieldWord": "幹妳娘"
    },
    "6272": {
        "id": 6272,
        "shieldWord": "幹你媽"
    },
    "6273": {
        "id": 6273,
        "shieldWord": "幹你媽b"
    },
    "6274": {
        "id": 6274,
        "shieldWord": "幹你媽逼"
    },
    "6275": {
        "id": 6275,
        "shieldWord": "港澳辦"
    },
    "6276": {
        "id": 6276,
        "shieldWord": "高校暴亂"
    },
    "6277": {
        "id": 6277,
        "shieldWord": "高校群體事件"
    },
    "6278": {
        "id": 6278,
        "shieldWord": "高校騷亂"
    },
    "6279": {
        "id": 6279,
        "shieldWord": "弓雖女幹"
    },
    "6280": {
        "id": 6280,
        "shieldWord": "官商勾結"
    },
    "6281": {
        "id": 6281,
        "shieldWord": "滾"
    },
    "6282": {
        "id": 6282,
        "shieldWord": "國安局"
    },
    "6283": {
        "id": 6283,
        "shieldWord": "國防部"
    },
    "6284": {
        "id": 6284,
        "shieldWord": "國防科工委"
    },
    "6285": {
        "id": 6285,
        "shieldWord": "國管局"
    },
    "6286": {
        "id": 6286,
        "shieldWord": "國際法院"
    },
    "6287": {
        "id": 6287,
        "shieldWord": "國家民委"
    },
    "6288": {
        "id": 6288,
        "shieldWord": "國家主席"
    },
    "6289": {
        "id": 6289,
        "shieldWord": "國家主要部委"
    },
    "6290": {
        "id": 6290,
        "shieldWord": "國民黨"
    },
    "6291": {
        "id": 6291,
        "shieldWord": "國民黨萬歲"
    },
    "6292": {
        "id": 6292,
        "shieldWord": "何候華"
    },
    "6293": {
        "id": 6293,
        "shieldWord": "紅衛兵"
    },
    "6294": {
        "id": 6294,
        "shieldWord": "胡緊濤"
    },
    "6295": {
        "id": 6295,
        "shieldWord": "胡緊套"
    },
    "6296": {
        "id": 6296,
        "shieldWord": "換妻"
    },
    "6297": {
        "id": 6297,
        "shieldWord": "黃　菊"
    },
    "6298": {
        "id": 6298,
        "shieldWord": "黃色小電影"
    },
    "6299": {
        "id": 6299,
        "shieldWord": "回族人吃豬肉"
    },
    "6300": {
        "id": 6300,
        "shieldWord": "昏藥"
    },
    "6301": {
        "id": 6301,
        "shieldWord": "激情小電影"
    },
    "6302": {
        "id": 6302,
        "shieldWord": "雞"
    },
    "6303": {
        "id": 6303,
        "shieldWord": "計牌軟體"
    },
    "6304": {
        "id": 6304,
        "shieldWord": "計生委"
    },
    "6305": {
        "id": 6305,
        "shieldWord": "姦夫淫婦"
    },
    "6306": {
        "id": 6306,
        "shieldWord": "江獨裁"
    },
    "6307": {
        "id": 6307,
        "shieldWord": "江擇民"
    },
    "6308": {
        "id": 6308,
        "shieldWord": "江豬"
    },
    "6309": {
        "id": 6309,
        "shieldWord": "她媽的金日成"
    },
    "6310": {
        "id": 6310,
        "shieldWord": "禁書"
    },
    "6311": {
        "id": 6311,
        "shieldWord": "經濟社會理事會"
    },
    "6312": {
        "id": 6312,
        "shieldWord": "經社理事會"
    },
    "6313": {
        "id": 6313,
        "shieldWord": "敬國神社"
    },
    "6314": {
        "id": 6314,
        "shieldWord": "靜坐"
    },
    "6315": {
        "id": 6315,
        "shieldWord": "糾察員"
    },
    "6316": {
        "id": 6316,
        "shieldWord": "鳩"
    },
    "6317": {
        "id": 6317,
        "shieldWord": "鳩屎"
    },
    "6318": {
        "id": 6318,
        "shieldWord": "軍長髮威"
    },
    "6319": {
        "id": 6319,
        "shieldWord": "軍國主義"
    },
    "6320": {
        "id": 6320,
        "shieldWord": "可卡葉"
    },
    "6321": {
        "id": 6321,
        "shieldWord": "寇曉偉"
    },
    "6322": {
        "id": 6322,
        "shieldWord": "爛屄"
    },
    "6323": {
        "id": 6323,
        "shieldWord": "爛屌"
    },
    "6324": {
        "id": 6324,
        "shieldWord": "勞+教+所"
    },
    "6325": {
        "id": 6325,
        "shieldWord": "勞動保障部"
    },
    "6326": {
        "id": 6326,
        "shieldWord": "黎陽評"
    },
    "6327": {
        "id": 6327,
        "shieldWord": "李紅志"
    },
    "6328": {
        "id": 6328,
        "shieldWord": "李巨集旨"
    },
    "6329": {
        "id": 6329,
        "shieldWord": "李巨集志"
    },
    "6330": {
        "id": 6330,
        "shieldWord": "李鵬*"
    },
    "6331": {
        "id": 6331,
        "shieldWord": "聯大"
    },
    "6332": {
        "id": 6332,
        "shieldWord": "聯合國"
    },
    "6333": {
        "id": 6333,
        "shieldWord": "聯合國大會"
    },
    "6334": {
        "id": 6334,
        "shieldWord": "聯易"
    },
    "6335": {
        "id": 6335,
        "shieldWord": "聯易互動"
    },
    "6336": {
        "id": 6336,
        "shieldWord": "糧食局"
    },
    "6337": {
        "id": 6337,
        "shieldWord": "兩腿之間"
    },
    "6338": {
        "id": 6338,
        "shieldWord": "林業局"
    },
    "6339": {
        "id": 6339,
        "shieldWord": "劉　淇"
    },
    "6340": {
        "id": 6340,
        "shieldWord": "劉軍"
    },
    "6341": {
        "id": 6341,
        "shieldWord": "龍新民"
    },
    "6342": {
        "id": 6342,
        "shieldWord": "旅遊局"
    },
    "6343": {
        "id": 6343,
        "shieldWord": "羅　幹"
    },
    "6344": {
        "id": 6344,
        "shieldWord": "騾幹"
    },
    "6345": {
        "id": 6345,
        "shieldWord": "媽賣媽屁"
    },
    "6346": {
        "id": 6346,
        "shieldWord": "媽祖"
    },
    "6347": {
        "id": 6347,
        "shieldWord": "麻醉鋼槍"
    },
    "6348": {
        "id": 6348,
        "shieldWord": "麻醉槍"
    },
    "6349": {
        "id": 6349,
        "shieldWord": "麻醉藥"
    },
    "6350": {
        "id": 6350,
        "shieldWord": "馬賣馬屁"
    },
    "6351": {
        "id": 6351,
        "shieldWord": "嗎啡堿"
    },
    "6352": {
        "id": 6352,
        "shieldWord": "嗎啡片"
    },
    "6353": {
        "id": 6353,
        "shieldWord": "買財富"
    },
    "6354": {
        "id": 6354,
        "shieldWord": "買賣槍支"
    },
    "6355": {
        "id": 6355,
        "shieldWord": "麥角酸"
    },
    "6356": {
        "id": 6356,
        "shieldWord": "賣.國"
    },
    "6357": {
        "id": 6357,
        "shieldWord": "賣B"
    },
    "6358": {
        "id": 6358,
        "shieldWord": "賣ID"
    },
    "6359": {
        "id": 6359,
        "shieldWord": "賣QQ"
    },
    "6360": {
        "id": 6360,
        "shieldWord": "賣財富"
    },
    "6361": {
        "id": 6361,
        "shieldWord": "賣党求榮"
    },
    "6362": {
        "id": 6362,
        "shieldWord": "賣國求榮"
    },
    "6363": {
        "id": 6363,
        "shieldWord": "賣卡"
    },
    "6364": {
        "id": 6364,
        "shieldWord": "賣軟體"
    },
    "6365": {
        "id": 6365,
        "shieldWord": "毛一鮮"
    },
    "6366": {
        "id": 6366,
        "shieldWord": "梅花網"
    },
    "6367": {
        "id": 6367,
        "shieldWord": "美利堅"
    },
    "6368": {
        "id": 6368,
        "shieldWord": "蒙塵藥"
    },
    "6369": {
        "id": 6369,
        "shieldWord": "迷魂藥"
    },
    "6370": {
        "id": 6370,
        "shieldWord": "迷奸藥"
    },
    "6371": {
        "id": 6371,
        "shieldWord": "迷殲藥"
    },
    "6372": {
        "id": 6372,
        "shieldWord": "莫索裡尼"
    },
    "6373": {
        "id": 6373,
        "shieldWord": "妳媽的"
    },
    "6374": {
        "id": 6374,
        "shieldWord": "妳馬的"
    },
    "6375": {
        "id": 6375,
        "shieldWord": "南聯盟"
    },
    "6376": {
        "id": 6376,
        "shieldWord": "伱媽"
    },
    "6377": {
        "id": 6377,
        "shieldWord": "你二大爺"
    },
    "6378": {
        "id": 6378,
        "shieldWord": "你爺爺的"
    },
    "6379": {
        "id": 6379,
        "shieldWord": "鳥GM"
    },
    "6380": {
        "id": 6380,
        "shieldWord": "鳥你"
    },
    "6381": {
        "id": 6381,
        "shieldWord": "農業部"
    },
    "6382": {
        "id": 6382,
        "shieldWord": "拍肩神藥"
    },
    "6383": {
        "id": 6383,
        "shieldWord": "皮條"
    },
    "6384": {
        "id": 6384,
        "shieldWord": "蘋果日報"
    },
    "6385": {
        "id": 6385,
        "shieldWord": "破壞"
    },
    "6386": {
        "id": 6386,
        "shieldWord": "僕街"
    },
    "6387": {
        "id": 6387,
        "shieldWord": "氣象局"
    },
    "6388": {
        "id": 6388,
        "shieldWord": "槍決女犯"
    },
    "6389": {
        "id": 6389,
        "shieldWord": "槍決現場"
    },
    "6390": {
        "id": 6390,
        "shieldWord": "強姦犯"
    },
    "6391": {
        "id": 6391,
        "shieldWord": "強衛"
    },
    "6392": {
        "id": 6392,
        "shieldWord": "強效失意藥"
    },
    "6393": {
        "id": 6393,
        "shieldWord": "強硬發言"
    },
    "6394": {
        "id": 6394,
        "shieldWord": "僑辦"
    },
    "6395": {
        "id": 6395,
        "shieldWord": "竊聽器"
    },
    "6396": {
        "id": 6396,
        "shieldWord": "竊聽器材"
    },
    "6397": {
        "id": 6397,
        "shieldWord": "人代會"
    },
    "6398": {
        "id": 6398,
        "shieldWord": "人彈"
    },
    "6399": {
        "id": 6399,
        "shieldWord": "人民廣場"
    },
    "6400": {
        "id": 6400,
        "shieldWord": "人民日報"
    },
    "6401": {
        "id": 6401,
        "shieldWord": "人民銀行"
    },
    "6402": {
        "id": 6402,
        "shieldWord": "人體炸彈"
    },
    "6403": {
        "id": 6403,
        "shieldWord": "日X媽"
    },
    "6404": {
        "id": 6404,
        "shieldWord": "塞你老師"
    },
    "6405": {
        "id": 6405,
        "shieldWord": "三個呆婊"
    },
    "6406": {
        "id": 6406,
        "shieldWord": "三個代婊"
    },
    "6407": {
        "id": 6407,
        "shieldWord": "三民主義"
    },
    "6408": {
        "id": 6408,
        "shieldWord": "三去車侖"
    },
    "6409": {
        "id": 6409,
        "shieldWord": "三唑侖"
    },
    "6410": {
        "id": 6410,
        "shieldWord": "騷"
    },
    "6411": {
        "id": 6411,
        "shieldWord": "色情電影"
    },
    "6412": {
        "id": 6412,
        "shieldWord": "色情服務"
    },
    "6413": {
        "id": 6413,
        "shieldWord": "色情小電影"
    },
    "6414": {
        "id": 6414,
        "shieldWord": "商務部"
    },
    "6415": {
        "id": 6415,
        "shieldWord": "生鴉片"
    },
    "6416": {
        "id": 6416,
        "shieldWord": "聖女峰"
    },
    "6417": {
        "id": 6417,
        "shieldWord": "十年動亂石進"
    },
    "6418": {
        "id": 6418,
        "shieldWord": "食撚屎"
    },
    "6419": {
        "id": 6419,
        "shieldWord": "駛你爸"
    },
    "6420": {
        "id": 6420,
        "shieldWord": "駛你公"
    },
    "6421": {
        "id": 6421,
        "shieldWord": "駛你老母"
    },
    "6422": {
        "id": 6422,
        "shieldWord": "駛你老師"
    },
    "6423": {
        "id": 6423,
        "shieldWord": "駛你母"
    },
    "6424": {
        "id": 6424,
        "shieldWord": "駛你娘"
    },
    "6425": {
        "id": 6425,
        "shieldWord": "是雞"
    },
    "6426": {
        "id": 6426,
        "shieldWord": "售號"
    },
    "6427": {
        "id": 6427,
        "shieldWord": "售軟體"
    },
    "6428": {
        "id": 6428,
        "shieldWord": "雙峰微顫"
    },
    "6429": {
        "id": 6429,
        "shieldWord": "水去車侖"
    },
    "6430": {
        "id": 6430,
        "shieldWord": "稅務總局"
    },
    "6431": {
        "id": 6431,
        "shieldWord": "他馬的"
    },
    "6432": {
        "id": 6432,
        "shieldWord": "台辦"
    },
    "6433": {
        "id": 6433,
        "shieldWord": "臺灣黨"
    },
    "6434": {
        "id": 6434,
        "shieldWord": "臺灣共和國"
    },
    "6435": {
        "id": 6435,
        "shieldWord": "投毒殺人"
    },
    "6436": {
        "id": 6436,
        "shieldWord": "透視軟體"
    },
    "6437": {
        "id": 6437,
        "shieldWord": "外　掛"
    },
    "6438": {
        "id": 6438,
        "shieldWord": "外/掛"
    },
    "6439": {
        "id": 6439,
        "shieldWord": "外\\\\掛"
    },
    "6440": {
        "id": 6440,
        "shieldWord": "外_掛"
    },
    "6441": {
        "id": 6441,
        "shieldWord": "外-掛"
    },
    "6442": {
        "id": 6442,
        "shieldWord": "外—掛"
    },
    "6443": {
        "id": 6443,
        "shieldWord": "外匯局"
    },
    "6444": {
        "id": 6444,
        "shieldWord": "外專局"
    },
    "6445": {
        "id": 6445,
        "shieldWord": "萬稅"
    },
    "6446": {
        "id": 6446,
        "shieldWord": "王太華"
    },
    "6447": {
        "id": 6447,
        "shieldWord": "網管"
    },
    "6448": {
        "id": 6448,
        "shieldWord": "威而鋼"
    },
    "6449": {
        "id": 6449,
        "shieldWord": "衛生部"
    },
    "6450": {
        "id": 6450,
        "shieldWord": "溫加寶"
    },
    "6451": {
        "id": 6451,
        "shieldWord": "溫家保"
    },
    "6452": {
        "id": 6452,
        "shieldWord": "溫馨"
    },
    "6453": {
        "id": 6453,
        "shieldWord": "溫總理"
    },
    "6454": {
        "id": 6454,
        "shieldWord": "倭國"
    },
    "6455": {
        "id": 6455,
        "shieldWord": "我幹"
    },
    "6456": {
        "id": 6456,
        "shieldWord": "吳　儀"
    },
    "6457": {
        "id": 6457,
        "shieldWord": "五星紅旗"
    },
    "6458": {
        "id": 6458,
        "shieldWord": "希望之聲"
    },
    "6459": {
        "id": 6459,
        "shieldWord": "洗腦班"
    },
    "6460": {
        "id": 6460,
        "shieldWord": "系統訊息"
    },
    "6461": {
        "id": 6461,
        "shieldWord": "鄉巴佬"
    },
    "6462": {
        "id": 6462,
        "shieldWord": "小乳頭"
    },
    "6463": {
        "id": 6463,
        "shieldWord": "興奮劑"
    },
    "6464": {
        "id": 6464,
        "shieldWord": "血腥圖片"
    },
    "6465": {
        "id": 6465,
        "shieldWord": "鴉片液"
    },
    "6466": {
        "id": 6466,
        "shieldWord": "鴉片渣"
    },
    "6467": {
        "id": 6467,
        "shieldWord": "煙草局"
    },
    "6468": {
        "id": 6468,
        "shieldWord": "嚴方軍"
    },
    "6469": {
        "id": 6469,
        "shieldWord": "陽精"
    },
    "6470": {
        "id": 6470,
        "shieldWord": "搖頭玩"
    },
    "6471": {
        "id": 6471,
        "shieldWord": "耶蘇"
    },
    "6472": {
        "id": 6472,
        "shieldWord": "一黨專制"
    },
    "6473": {
        "id": 6473,
        "shieldWord": "一國兩制"
    },
    "6474": {
        "id": 6474,
        "shieldWord": "以莖至洞"
    },
    "6475": {
        "id": 6475,
        "shieldWord": "抑制劑"
    },
    "6476": {
        "id": 6476,
        "shieldWord": "陰小撕大"
    },
    "6477": {
        "id": 6477,
        "shieldWord": "淫語連連"
    },
    "6478": {
        "id": 6478,
        "shieldWord": "英雄紀念碑"
    },
    "6479": {
        "id": 6479,
        "shieldWord": "郵政局"
    },
    "6480": {
        "id": 6480,
        "shieldWord": "遊戲發獎員"
    },
    "6481": {
        "id": 6481,
        "shieldWord": "遊戲宮理員"
    },
    "6482": {
        "id": 6482,
        "shieldWord": "輿論鉗制"
    },
    "6483": {
        "id": 6483,
        "shieldWord": "原子能機構"
    },
    "6484": {
        "id": 6484,
        "shieldWord": "遠程偷拍"
    },
    "6485": {
        "id": 6485,
        "shieldWord": "月經不調"
    },
    "6486": {
        "id": 6486,
        "shieldWord": "紮卡維"
    },
    "6487": {
        "id": 6487,
        "shieldWord": "張朝陽"
    },
    "6488": {
        "id": 6488,
        "shieldWord": "張潮陽"
    },
    "6489": {
        "id": 6489,
        "shieldWord": "張磊"
    },
    "6490": {
        "id": 6490,
        "shieldWord": "張立昌"
    },
    "6491": {
        "id": 6491,
        "shieldWord": "張小平"
    },
    "6492": {
        "id": 6492,
        "shieldWord": "偵探設備"
    },
    "6493": {
        "id": 6493,
        "shieldWord": "中國恐怖組織"
    },
    "6494": {
        "id": 6494,
        "shieldWord": "周總理"
    },
    "6495": {
        "id": 6495,
        "shieldWord": "朱容雞"
    },
    "6496": {
        "id": 6496,
        "shieldWord": "朱總理"
    },
    "6497": {
        "id": 6497,
        "shieldWord": "豬容基"
    },
    "6498": {
        "id": 6498,
        "shieldWord": "裝屄"
    },
    "6499": {
        "id": 6499,
        "shieldWord": "追查國際"
    },
    "6500": {
        "id": 6500,
        "shieldWord": "子女任職名單"
    },
    "6501": {
        "id": 6501,
        "shieldWord": "自殺手冊"
    },
    "6502": {
        "id": 6502,
        "shieldWord": "自殺指南"
    },
    "6503": {
        "id": 6503,
        "shieldWord": "自製手槍"
    },
    "6504": {
        "id": 6504,
        "shieldWord": "自治機關"
    },
    "6505": {
        "id": 6505,
        "shieldWord": "總局"
    },
    "6506": {
        "id": 6506,
        "shieldWord": "垃圾遊戲"
    },
    "6507": {
        "id": 6507,
        "shieldWord": "爛遊戲"
    },
    "6508": {
        "id": 6508,
        "shieldWord": "淘寶"
    },
    "6509": {
        "id": 6509,
        "shieldWord": "龍虎"
    },
    "6510": {
        "id": 6510,
        "shieldWord": "虎門"
    },
    "6511": {
        "id": 6511,
        "shieldWord": "WEB牌戰"
    },
    "6512": {
        "id": 6512,
        "shieldWord": "WEB戰牌"
    },
    "6513": {
        "id": 6513,
        "shieldWord": "戰牌"
    },
    "6514": {
        "id": 6514,
        "shieldWord": "街頭對抗"
    },
    "6515": {
        "id": 6515,
        "shieldWord": "混沌決"
    },
    "6516": {
        "id": 6516,
        "shieldWord": "英文字母"
    },
    "6517": {
        "id": 6517,
        "shieldWord": "拼音"
    },
    "6518": {
        "id": 6518,
        "shieldWord": "xijinping"
    },
    "6519": {
        "id": 6519,
        "shieldWord": "likeqiang"
    },
    "6520": {
        "id": 6520,
        "shieldWord": "zhangdejiang"
    },
    "6521": {
        "id": 6521,
        "shieldWord": "yuzhengsheng"
    },
    "6522": {
        "id": 6522,
        "shieldWord": "liuyunshan"
    },
    "6523": {
        "id": 6523,
        "shieldWord": "wangqishan"
    },
    "6524": {
        "id": 6524,
        "shieldWord": "zhanggaoli"
    },
    "6525": {
        "id": 6525,
        "shieldWord": "dishun"
    },
    "6526": {
        "id": 6526,
        "shieldWord": "Dishun"
    },
    "6527": {
        "id": 6527,
        "shieldWord": "hujintao"
    },
    "6528": {
        "id": 6528,
        "shieldWord": "jiangzemin"
    },
    "6529": {
        "id": 6529,
        "shieldWord": "likeqiang"
    },
    "6530": {
        "id": 6530,
        "shieldWord": "zhangdejiang"
    },
    "6531": {
        "id": 6531,
        "shieldWord": "wangqishan"
    },
    "6532": {
        "id": 6532,
        "shieldWord": "liuyunshan"
    },
    "6533": {
        "id": 6533,
        "shieldWord": "pengliyuan"
    },
    "6534": {
        "id": 6534,
        "shieldWord": "quannengshenjiao"
    },
    "6535": {
        "id": 6535,
        "shieldWord": "liruihuan"
    },
    "6536": {
        "id": 6536,
        "shieldWord": "wenjiabao"
    },
    "6537": {
        "id": 6537,
        "shieldWord": "lipeng"
    },
    "6538": {
        "id": 6538,
        "shieldWord": "lichangchun"
    },
    "6539": {
        "id": 6539,
        "shieldWord": "wubangguo"
    },
    "6540": {
        "id": 6540,
        "shieldWord": "zhurongji"
    },
    "6541": {
        "id": 6541,
        "shieldWord": "zhouyongkang"
    },
    "6542": {
        "id": 6542,
        "shieldWord": "maozedong"
    },
    "6543": {
        "id": 6543,
        "shieldWord": "zhouenlai"
    },
    "6544": {
        "id": 6544,
        "shieldWord": "lihongzhi"
    },
    "6545": {
        "id": 6545,
        "shieldWord": "boxilai"
    },
    "6546": {
        "id": 6546,
        "shieldWord": "liulijun"
    },
    "6547": {
        "id": 6547,
        "shieldWord": "xinjiangduli"
    },
    "6548": {
        "id": 6548,
        "shieldWord": "xizangduli"
    },
    "6549": {
        "id": 6549,
        "shieldWord": "xinwenguanzhi"
    },
    "6550": {
        "id": 6550,
        "shieldWord": "lianggezhongguo"
    },
    "6551": {
        "id": 6551,
        "shieldWord": "taiwanduli"
    },
    "6552": {
        "id": 6552,
        "shieldWord": "dalailama"
    },
    "6553": {
        "id": 6553,
        "shieldWord": "sex"
    },
    "6554": {
        "id": 6554,
        "shieldWord": "fuck"
    },
    "6555": {
        "id": 6555,
        "shieldWord": "bitch"
    },
    "6556": {
        "id": 6556,
        "shieldWord": "lilanqing"
    },
    "6557": {
        "id": 6557,
        "shieldWord": "jiaqinglin"
    },
    "6558": {
        "id": 6558,
        "shieldWord": "falungong"
    },
    "6559": {
        "id": 6559,
        "shieldWord": "falundafahao"
    },
    "6560": {
        "id": 6560,
        "shieldWord": "xiejiao"
    },
    "6561": {
        "id": 6561,
        "shieldWord": "gongchandang"
    },
    "6562": {
        "id": 6562,
        "shieldWord": "zhonghuaminguo"
    },
    "6563": {
        "id": 6563,
        "shieldWord": "yidangzhuanzheng"
    },
    "6564": {
        "id": 6564,
        "shieldWord": "liushaoqi"
    },
    "6565": {
        "id": 6565,
        "shieldWord": "xucaihou"
    },
    "6566": {
        "id": 6566,
        "shieldWord": "zhaoziyang"
    },
    "6567": {
        "id": 6567,
        "shieldWord": "dengxiaoping"
    },
    "6568": {
        "id": 6568,
        "shieldWord": "jiangjieshi"
    },
    "6569": {
        "id": 6569,
        "shieldWord": "jiangjingguo"
    },
    "6570": {
        "id": 6570,
        "shieldWord": "chenshuibian"
    },
    "6571": {
        "id": 6571,
        "shieldWord": "huimin"
    },
    "6572": {
        "id": 6572,
        "shieldWord": "yisilan"
    },
    "6573": {
        "id": 6573,
        "shieldWord": "zhenzhu"
    },
    "6574": {
        "id": 6574,
        "shieldWord": "shijiamouni"
    },
    "6575": {
        "id": 6575,
        "shieldWord": "taidu"
    },
    "6576": {
        "id": 6576,
        "shieldWord": "liusi"
    },
    "6577": {
        "id": 6577,
        "shieldWord": "zengqinghong"
    },
    "6578": {
        "id": 6578,
        "shieldWord": "tiananmen"
    },
    "6579": {
        "id": 6579,
        "shieldWord": "renmindahuitang"
    },
    "6580": {
        "id": 6580,
        "shieldWord": "dang"
    },
    "6581": {
        "id": 6581,
        "shieldWord": "guojia"
    },
    "6582": {
        "id": 6582,
        "shieldWord": "lingjihua"
    },
    "6583": {
        "id": 6583,
        "shieldWord": "zhude"
    },
    "6584": {
        "id": 6584,
        "shieldWord": "pengdehuai"
    },
    "6585": {
        "id": 6585,
        "shieldWord": "linbiao"
    },
    "6586": {
        "id": 6586,
        "shieldWord": "liubocheng"
    },
    "6587": {
        "id": 6587,
        "shieldWord": "chenyi"
    },
    "6588": {
        "id": 6588,
        "shieldWord": "helong"
    },
    "6589": {
        "id": 6589,
        "shieldWord": "nierongzhen"
    },
    "6590": {
        "id": 6590,
        "shieldWord": "xuxiangqian"
    },
    "6591": {
        "id": 6591,
        "shieldWord": "luoronghuan"
    },
    "6592": {
        "id": 6592,
        "shieldWord": "yejianying"
    },
    "6593": {
        "id": 6593,
        "shieldWord": "lidazhao"
    },
    "6594": {
        "id": 6594,
        "shieldWord": "chenduxiu"
    },
    "6595": {
        "id": 6595,
        "shieldWord": "sunzhongshan"
    },
    "6596": {
        "id": 6596,
        "shieldWord": "sunwen"
    },
    "6597": {
        "id": 6597,
        "shieldWord": "sunyixian"
    },
    "6598": {
        "id": 6598,
        "shieldWord": "chenyun"
    },
    "6599": {
        "id": 6599,
        "shieldWord": "liruihuan"
    },
    "6600": {
        "id": 6600,
        "shieldWord": "weijianxing"
    },
    "6601": {
        "id": 6601,
        "shieldWord": "luogan"
    },
    "6602": {
        "id": 6602,
        "shieldWord": "zengqinghong"
    },
    "6603": {
        "id": 6603,
        "shieldWord": "huangju"
    },
    "6604": {
        "id": 6604,
        "shieldWord": "wuguanzheng"
    },
    "6605": {
        "id": 6605,
        "shieldWord": "lichangchun"
    },
    "6606": {
        "id": 6606,
        "shieldWord": "wuyi"
    },
    "6607": {
        "id": 6607,
        "shieldWord": "huiliangyu"
    },
    "6608": {
        "id": 6608,
        "shieldWord": "zengpeiyan"
    },
    "6609": {
        "id": 6609,
        "shieldWord": "caogangchuan"
    },
    "6610": {
        "id": 6610,
        "shieldWord": "tangjiaxuan"
    },
    "6611": {
        "id": 6611,
        "shieldWord": "huajianmin"
    },
    "6612": {
        "id": 6612,
        "shieldWord": "chenzhili"
    },
    "6613": {
        "id": 6613,
        "shieldWord": "wanglequan"
    },
    "6614": {
        "id": 6614,
        "shieldWord": "wanggang"
    },
    "6615": {
        "id": 6615,
        "shieldWord": "wangzhaoguo"
    },
    "6616": {
        "id": 6616,
        "shieldWord": "liuqi"
    },
    "6617": {
        "id": 6617,
        "shieldWord": "heguoqiang"
    },
    "6618": {
        "id": 6618,
        "shieldWord": "guobaxiong"
    },
    "6619": {
        "id": 6619,
        "shieldWord": "huyaobang"
    },
    "6620": {
        "id": 6620,
        "shieldWord": "bushi"
    },
    "6621": {
        "id": 6621,
        "shieldWord": "bulaier"
    },
    "6622": {
        "id": 6622,
        "shieldWord": "xiaoquan"
    },
    "6623": {
        "id": 6623,
        "shieldWord": "chunyilang"
    },
    "6624": {
        "id": 6624,
        "shieldWord": "samalanqi"
    },
    "6625": {
        "id": 6625,
        "shieldWord": "annan"
    },
    "6626": {
        "id": 6626,
        "shieldWord": "Alafate"
    },
    "6627": {
        "id": 6627,
        "shieldWord": "pujing"
    },
    "6628": {
        "id": 6628,
        "shieldWord": "mokeer"
    },
    "6629": {
        "id": 6629,
        "shieldWord": "kelindun"
    },
    "6630": {
        "id": 6630,
        "shieldWord": "ligen"
    },
    "6631": {
        "id": 6631,
        "shieldWord": "nikesong"
    },
    "6632": {
        "id": 6632,
        "shieldWord": "linken"
    },
    "6633": {
        "id": 6633,
        "shieldWord": "dulumen"
    },
    "6634": {
        "id": 6634,
        "shieldWord": "heluxiaofu"
    },
    "6635": {
        "id": 6635,
        "shieldWord": "liening"
    },
    "6636": {
        "id": 6636,
        "shieldWord": "sidalin"
    },
    "6637": {
        "id": 6637,
        "shieldWord": "makesi"
    },
    "6638": {
        "id": 6638,
        "shieldWord": "engesi"
    },
    "6639": {
        "id": 6639,
        "shieldWord": "jinzhengri"
    },
    "6640": {
        "id": 6640,
        "shieldWord": "jinricheng"
    },
    "6641": {
        "id": 6641,
        "shieldWord": "sadamu"
    },
    "6642": {
        "id": 6642,
        "shieldWord": "huzhiming"
    },
    "6643": {
        "id": 6643,
        "shieldWord": "xihanuke"
    },
    "6644": {
        "id": 6644,
        "shieldWord": "xilake"
    },
    "6645": {
        "id": 6645,
        "shieldWord": "saqieer"
    },
    "6646": {
        "id": 6646,
        "shieldWord": "Aluoyue"
    },
    "6647": {
        "id": 6647,
        "shieldWord": "mandela"
    },
    "6648": {
        "id": 6648,
        "shieldWord": "kasiteluo"
    },
    "6649": {
        "id": 6649,
        "shieldWord": "fulankelin"
    },
    "6650": {
        "id": 6650,
        "shieldWord": "huashengdun"
    },
    "6651": {
        "id": 6651,
        "shieldWord": "aisenhaoweier"
    },
    "6652": {
        "id": 6652,
        "shieldWord": "napolun"
    },
    "6653": {
        "id": 6653,
        "shieldWord": "yalishanda"
    },
    "6654": {
        "id": 6654,
        "shieldWord": "luyi"
    },
    "6655": {
        "id": 6655,
        "shieldWord": "lamusifeierde"
    },
    "6656": {
        "id": 6656,
        "shieldWord": "laola"
    },
    "6657": {
        "id": 6657,
        "shieldWord": "baoweier"
    },
    "6658": {
        "id": 6658,
        "shieldWord": "aobama"
    },
    "6659": {
        "id": 6659,
        "shieldWord": "meideweijiefu"
    },
    "6660": {
        "id": 6660,
        "shieldWord": "jinzhengen"
    },
    "6661": {
        "id": 6661,
        "shieldWord": "anbeijinsan"
    },
    "6662": {
        "id": 6662,
        "shieldWord": "benladeng"
    },
    "6663": {
        "id": 6663,
        "shieldWord": "aomaer"
    },
    "6664": {
        "id": 6664,
        "shieldWord": "chailing"
    },
    "6665": {
        "id": 6665,
        "shieldWord": "dalai"
    },
    "6666": {
        "id": 6666,
        "shieldWord": "jiangqing"
    },
    "6667": {
        "id": 6667,
        "shieldWord": "zhangchunqiao"
    },
    "6668": {
        "id": 6668,
        "shieldWord": "yaowenyuan"
    },
    "6669": {
        "id": 6669,
        "shieldWord": "wanghongwen"
    },
    "6670": {
        "id": 6670,
        "shieldWord": "dongtiaoyingji"
    },
    "6671": {
        "id": 6671,
        "shieldWord": "xitele"
    },
    "6672": {
        "id": 6672,
        "shieldWord": "mosuolini"
    },
    "6673": {
        "id": 6673,
        "shieldWord": "gangcunxiushu"
    },
    "6674": {
        "id": 6674,
        "shieldWord": "gangcunningci"
    },
    "6675": {
        "id": 6675,
        "shieldWord": "gaolipiao"
    },
    "6676": {
        "id": 6676,
        "shieldWord": "wangdan"
    },
    "6677": {
        "id": 6677,
        "shieldWord": "woerkaixi"
    },
    "6678": {
        "id": 6678,
        "shieldWord": "lihongzhi"
    },
    "6679": {
        "id": 6679,
        "shieldWord": "lidashi"
    },
    "6680": {
        "id": 6680,
        "shieldWord": "laichangxing"
    },
    "6681": {
        "id": 6681,
        "shieldWord": "majiajue"
    },
    "6682": {
        "id": 6682,
        "shieldWord": "banchan"
    },
    "6683": {
        "id": 6683,
        "shieldWord": "eerdeni"
    },
    "6684": {
        "id": 6684,
        "shieldWord": "shanbenwushiliu"
    },
    "6685": {
        "id": 6685,
        "shieldWord": "Abian"
    },
    "6686": {
        "id": 6686,
        "shieldWord": "Abianwansui"
    },
    "6687": {
        "id": 6687,
        "shieldWord": "renaya"
    },
    "6688": {
        "id": 6688,
        "shieldWord": "wanglijun"
    },
    "6689": {
        "id": 6689,
        "shieldWord": "lingjihua"
    },
    "6690": {
        "id": 6690,
        "shieldWord": "mohanmode"
    },
    "6691": {
        "id": 6691,
        "shieldWord": "yuyongkang"
    },
    "6692": {
        "id": 6692,
        "shieldWord": "zhoujiankang"
    },
    "6693": {
        "id": 6693,
        "shieldWord": "yujiankang"
    },
    "6694": {
        "id": 6694,
        "shieldWord": "zhouxiaokang"
    },
    "6695": {
        "id": 6695,
        "shieldWord": "chenliangyu"
    },
    "6696": {
        "id": 6696,
        "shieldWord": "lidenghui"
    },
    "6697": {
        "id": 6697,
        "shieldWord": "lianzhan"
    },
    "6698": {
        "id": 6698,
        "shieldWord": "songchuyu"
    },
    "6699": {
        "id": 6699,
        "shieldWord": "luxiulian"
    },
    "6700": {
        "id": 6700,
        "shieldWord": "yumuming"
    },
    "6701": {
        "id": 6701,
        "shieldWord": "jiangzhongzheng"
    },
    "6702": {
        "id": 6702,
        "shieldWord": "mayingjiu"
    },
    "6703": {
        "id": 6703,
        "shieldWord": "6-4tianwang"
    },
    "6704": {
        "id": 6704,
        "shieldWord": "89-64cdjp"
    },
    "6705": {
        "id": 6705,
        "shieldWord": "AIDS"
    },
    "6706": {
        "id": 6706,
        "shieldWord": "Aiort墓地"
    },
    "6707": {
        "id": 6707,
        "shieldWord": "ai滋"
    },
    "6708": {
        "id": 6708,
        "shieldWord": "Arqus会议场"
    },
    "6709": {
        "id": 6709,
        "shieldWord": "asshole"
    },
    "6710": {
        "id": 6710,
        "shieldWord": "Atan的移动石"
    },
    "6711": {
        "id": 6711,
        "shieldWord": "Baichi"
    },
    "6712": {
        "id": 6712,
        "shieldWord": "Baopi"
    },
    "6713": {
        "id": 6713,
        "shieldWord": "Bao皮"
    },
    "6714": {
        "id": 6714,
        "shieldWord": "bastard"
    },
    "6715": {
        "id": 6715,
        "shieldWord": "Bc"
    },
    "6716": {
        "id": 6716,
        "shieldWord": "biaozi"
    },
    "6717": {
        "id": 6717,
        "shieldWord": "Biao子"
    },
    "6718": {
        "id": 6718,
        "shieldWord": "bignews"
    },
    "6719": {
        "id": 6719,
        "shieldWord": "bitch"
    },
    "6720": {
        "id": 6720,
        "shieldWord": "Bi样"
    },
    "6721": {
        "id": 6721,
        "shieldWord": "BLOWJOB"
    },
    "6722": {
        "id": 6722,
        "shieldWord": "boxun"
    },
    "6723": {
        "id": 6723,
        "shieldWord": "B样"
    },
    "6724": {
        "id": 6724,
        "shieldWord": "caoB"
    },
    "6725": {
        "id": 6725,
        "shieldWord": "caobi"
    },
    "6726": {
        "id": 6726,
        "shieldWord": "cao你"
    },
    "6727": {
        "id": 6727,
        "shieldWord": "cao你妈"
    },
    "6728": {
        "id": 6728,
        "shieldWord": "cao你大爷"
    },
    "6729": {
        "id": 6729,
        "shieldWord": "cha你"
    },
    "6730": {
        "id": 6730,
        "shieldWord": "chinaliberal"
    },
    "6731": {
        "id": 6731,
        "shieldWord": "chinamz"
    },
    "6732": {
        "id": 6732,
        "shieldWord": "chinesenewsnet"
    },
    "6733": {
        "id": 6733,
        "shieldWord": "Clockgemstone"
    },
    "6734": {
        "id": 6734,
        "shieldWord": "cnd"
    },
    "6735": {
        "id": 6735,
        "shieldWord": "creaders"
    },
    "6736": {
        "id": 6736,
        "shieldWord": "Crestbone"
    },
    "6737": {
        "id": 6737,
        "shieldWord": "dafa"
    },
    "6738": {
        "id": 6738,
        "shieldWord": "dajiyuan"
    },
    "6739": {
        "id": 6739,
        "shieldWord": "damn"
    },
    "6740": {
        "id": 6740,
        "shieldWord": "dfdz"
    },
    "6741": {
        "id": 6741,
        "shieldWord": "DICK"
    },
    "6742": {
        "id": 6742,
        "shieldWord": "dpp"
    },
    "6743": {
        "id": 6743,
        "shieldWord": "EVENT"
    },
    "6744": {
        "id": 6744,
        "shieldWord": "falu"
    },
    "6745": {
        "id": 6745,
        "shieldWord": "falun"
    },
    "6746": {
        "id": 6746,
        "shieldWord": "falundafa"
    },
    "6747": {
        "id": 6747,
        "shieldWord": "fa轮"
    },
    "6748": {
        "id": 6748,
        "shieldWord": "Feelmistone"
    },
    "6749": {
        "id": 6749,
        "shieldWord": "Fku"
    },
    "6750": {
        "id": 6750,
        "shieldWord": "FLG"
    },
    "6751": {
        "id": 6751,
        "shieldWord": "freechina"
    },
    "6752": {
        "id": 6752,
        "shieldWord": "freedom"
    },
    "6753": {
        "id": 6753,
        "shieldWord": "freenet"
    },
    "6754": {
        "id": 6754,
        "shieldWord": "gan你"
    },
    "6755": {
        "id": 6755,
        "shieldWord": "GCD"
    },
    "6756": {
        "id": 6756,
        "shieldWord": "Gruepin"
    },
    "6757": {
        "id": 6757,
        "shieldWord": "HACKING"
    },
    "6758": {
        "id": 6758,
        "shieldWord": "hongzhi"
    },
    "6759": {
        "id": 6759,
        "shieldWord": "hrichina"
    },
    "6760": {
        "id": 6760,
        "shieldWord": "http"
    },
    "6761": {
        "id": 6761,
        "shieldWord": "huanet"
    },
    "6762": {
        "id": 6762,
        "shieldWord": "hypermart.net"
    },
    "6763": {
        "id": 6763,
        "shieldWord": "incest"
    },
    "6764": {
        "id": 6764,
        "shieldWord": "item"
    },
    "6765": {
        "id": 6765,
        "shieldWord": "J8"
    },
    "6766": {
        "id": 6766,
        "shieldWord": "JB"
    },
    "6767": {
        "id": 6767,
        "shieldWord": "jiangdongriji"
    },
    "6768": {
        "id": 6768,
        "shieldWord": "jian你"
    },
    "6769": {
        "id": 6769,
        "shieldWord": "jiaochuang"
    },
    "6770": {
        "id": 6770,
        "shieldWord": "jiaochun"
    },
    "6771": {
        "id": 6771,
        "shieldWord": "jiba"
    },
    "6772": {
        "id": 6772,
        "shieldWord": "jinv"
    },
    "6773": {
        "id": 6773,
        "shieldWord": "Ji女"
    },
    "6774": {
        "id": 6774,
        "shieldWord": "Kao"
    },
    "6775": {
        "id": 6775,
        "shieldWord": "KISSMYASS"
    },
    "6776": {
        "id": 6776,
        "shieldWord": "Mai骚"
    },
    "6777": {
        "id": 6777,
        "shieldWord": "making"
    },
    "6778": {
        "id": 6778,
        "shieldWord": "minghui"
    },
    "6779": {
        "id": 6779,
        "shieldWord": "minghuinews"
    },
    "6780": {
        "id": 6780,
        "shieldWord": "nacb"
    },
    "6781": {
        "id": 6781,
        "shieldWord": "naive"
    },
    "6782": {
        "id": 6782,
        "shieldWord": "Neckromancer"
    },
    "6783": {
        "id": 6783,
        "shieldWord": "nmis"
    },
    "6784": {
        "id": 6784,
        "shieldWord": "paper64"
    },
    "6785": {
        "id": 6785,
        "shieldWord": "peacehall"
    },
    "6786": {
        "id": 6786,
        "shieldWord": "PENIS"
    },
    "6787": {
        "id": 6787,
        "shieldWord": "playboy"
    },
    "6788": {
        "id": 6788,
        "shieldWord": "pussy"
    },
    "6789": {
        "id": 6789,
        "shieldWord": "qiangjian"
    },
    "6790": {
        "id": 6790,
        "shieldWord": "Rape"
    },
    "6791": {
        "id": 6791,
        "shieldWord": "renminbao"
    },
    "6792": {
        "id": 6792,
        "shieldWord": "renmingbao"
    },
    "6793": {
        "id": 6793,
        "shieldWord": "rfa"
    },
    "6794": {
        "id": 6794,
        "shieldWord": "safeweb"
    },
    "6795": {
        "id": 6795,
        "shieldWord": "saobi"
    },
    "6796": {
        "id": 6796,
        "shieldWord": "sb"
    },
    "6797": {
        "id": 6797,
        "shieldWord": "SHIT"
    },
    "6798": {
        "id": 6798,
        "shieldWord": "simple"
    },
    "6799": {
        "id": 6799,
        "shieldWord": "sucker"
    },
    "6800": {
        "id": 6800,
        "shieldWord": "svdc"
    },
    "6801": {
        "id": 6801,
        "shieldWord": "taip"
    },
    "6802": {
        "id": 6802,
        "shieldWord": "The9"
    },
    "6803": {
        "id": 6803,
        "shieldWord": "The9City"
    },
    "6804": {
        "id": 6804,
        "shieldWord": "tibetalk"
    },
    "6805": {
        "id": 6805,
        "shieldWord": "TMD"
    },
    "6806": {
        "id": 6806,
        "shieldWord": "triangle"
    },
    "6807": {
        "id": 6807,
        "shieldWord": "triangleboy"
    },
    "6808": {
        "id": 6808,
        "shieldWord": "Tringel"
    },
    "6809": {
        "id": 6809,
        "shieldWord": "UltraSurf"
    },
    "6810": {
        "id": 6810,
        "shieldWord": "unixbox"
    },
    "6811": {
        "id": 6811,
        "shieldWord": "ustibet"
    },
    "6812": {
        "id": 6812,
        "shieldWord": "voa"
    },
    "6813": {
        "id": 6813,
        "shieldWord": "voachinese"
    },
    "6814": {
        "id": 6814,
        "shieldWord": "wangce"
    },
    "6815": {
        "id": 6815,
        "shieldWord": "WEBZEN"
    },
    "6816": {
        "id": 6816,
        "shieldWord": "wstaiji"
    },
    "6817": {
        "id": 6817,
        "shieldWord": "xinsheng"
    },
    "6818": {
        "id": 6818,
        "shieldWord": "yuming"
    },
    "6819": {
        "id": 6819,
        "shieldWord": "zhengjian"
    },
    "6820": {
        "id": 6820,
        "shieldWord": "zhengjianwang"
    },
    "6821": {
        "id": 6821,
        "shieldWord": "zhenshanren"
    },
    "6822": {
        "id": 6822,
        "shieldWord": "zhuanfalunADMIN"
    },
    "6823": {
        "id": 6823,
        "shieldWord": "CC小雪"
    },
    "6824": {
        "id": 6824,
        "shieldWord": "㎏"
    },
    "6825": {
        "id": 6825,
        "shieldWord": "㎎"
    },
    "6826": {
        "id": 6826,
        "shieldWord": "㎜"
    },
    "6827": {
        "id": 6827,
        "shieldWord": "WWW"
    },
    "6828": {
        "id": 6828,
        "shieldWord": "WWW."
    },
    "6829": {
        "id": 6829,
        "shieldWord": "ZHUANFALUN"
    },
    "6830": {
        "id": 6830,
        "shieldWord": "ice"
    },
    "6831": {
        "id": 6831,
        "shieldWord": "narcotics"
    },
    "6832": {
        "id": 6832,
        "shieldWord": "屏蔽网页"
    },
    "6833": {
        "id": 6833,
        "shieldWord": "bcd.s.59764.com"
    },
    "6834": {
        "id": 6834,
        "shieldWord": "kkk.xaoh.cn"
    },
    "6835": {
        "id": 6835,
        "shieldWord": "www.xaoh.cn"
    },
    "6836": {
        "id": 6836,
        "shieldWord": "zzz.xaoh.cn"
    },
    "6837": {
        "id": 6837,
        "shieldWord": "aa.yazhousetu.hi.9705.net.cn"
    },
    "6838": {
        "id": 6838,
        "shieldWord": "eee.xaoh.cn"
    },
    "6839": {
        "id": 6839,
        "shieldWord": "lll.xaoh.cn"
    },
    "6840": {
        "id": 6840,
        "shieldWord": "jj.pangfangwuyuetian.hi.9705.net.cn"
    },
    "6841": {
        "id": 6841,
        "shieldWord": "rrr.xaoh.cn"
    },
    "6842": {
        "id": 6842,
        "shieldWord": "ooo.xaoh.cn"
    },
    "6843": {
        "id": 6843,
        "shieldWord": "www.zy528.com"
    },
    "6844": {
        "id": 6844,
        "shieldWord": "aaad.s.59764.com"
    },
    "6845": {
        "id": 6845,
        "shieldWord": "www.dy6789.cn"
    },
    "6846": {
        "id": 6846,
        "shieldWord": "aaac.s.51524.com"
    },
    "6847": {
        "id": 6847,
        "shieldWord": "208.43.198.56"
    },
    "6848": {
        "id": 6848,
        "shieldWord": "166578.cn"
    },
    "6849": {
        "id": 6849,
        "shieldWord": "www.wang567.com"
    },
    "6850": {
        "id": 6850,
        "shieldWord": "www.bin5.cn"
    },
    "6851": {
        "id": 6851,
        "shieldWord": "www.sanjidianying.com.cn"
    },
    "6852": {
        "id": 6852,
        "shieldWord": "www.anule.cn"
    },
    "6853": {
        "id": 6853,
        "shieldWord": "www.976543.com"
    },
    "6854": {
        "id": 6854,
        "shieldWord": "www.50spcombaidu1828adyou97sace.co.cc"
    },
    "6855": {
        "id": 6855,
        "shieldWord": "chengrenmanhua.1242.net.cn"
    },
    "6856": {
        "id": 6856,
        "shieldWord": "qingsewuyuetian.1174.net.cn"
    },
    "6857": {
        "id": 6857,
        "shieldWord": "lunlidianyingxiazai.1174.net.cn"
    },
    "6858": {
        "id": 6858,
        "shieldWord": "siwameitui.1274.net.cn"
    },
    "6859": {
        "id": 6859,
        "shieldWord": "niuniujidi.1174.net.cn"
    },
    "6860": {
        "id": 6860,
        "shieldWord": "xiao77.1243.net.cn"
    },
    "6861": {
        "id": 6861,
        "shieldWord": "woyinwose.1243.net.cn"
    },
    "6862": {
        "id": 6862,
        "shieldWord": "dingxiang.1249.net"
    },
    "6863": {
        "id": 6863,
        "shieldWord": "cnaicheng.1174.net.cn"
    },
    "6864": {
        "id": 6864,
        "shieldWord": "1234chengren.1249.net.cn"
    },
    "6865": {
        "id": 6865,
        "shieldWord": "sewuyuetian.1174.net.cn"
    },
    "6866": {
        "id": 6866,
        "shieldWord": "huangsexiaoshuo.1242.net.cn"
    },
    "6867": {
        "id": 6867,
        "shieldWord": "lunlidianying.1274.net.cn"
    },
    "6868": {
        "id": 6868,
        "shieldWord": "xingqingzhongren.1174.net.cn"
    },
    "6869": {
        "id": 6869,
        "shieldWord": "chengrenwangzhi.1242.net.cn"
    },
    "6870": {
        "id": 6870,
        "shieldWord": "xiao77luntan.1249.net.cn"
    },
    "6871": {
        "id": 6871,
        "shieldWord": "dingxiang.1243.net.cn"
    },
    "6872": {
        "id": 6872,
        "shieldWord": "11xp.1243.net.cn"
    },
    "6873": {
        "id": 6873,
        "shieldWord": "baijie.1249.net.cn"
    },
    "6874": {
        "id": 6874,
        "shieldWord": "sewuyuetian.1274.net.cn"
    },
    "6875": {
        "id": 6875,
        "shieldWord": "meiguiqingren.1274.net.cn"
    },
    "6876": {
        "id": 6876,
        "shieldWord": "tb.hi.4024.net.cn"
    },
    "6877": {
        "id": 6877,
        "shieldWord": "www.91wangyou.com"
    },
    "6878": {
        "id": 6878,
        "shieldWord": "www.wow366.cn"
    },
    "6879": {
        "id": 6879,
        "shieldWord": "www.yxnpc.com"
    },
    "6880": {
        "id": 6880,
        "shieldWord": "www.365jw.com"
    },
    "6881": {
        "id": 6881,
        "shieldWord": "58.253.67.74"
    },
    "6882": {
        "id": 6882,
        "shieldWord": "www.978808.com"
    },
    "6883": {
        "id": 6883,
        "shieldWord": "www.sexwyt.com"
    },
    "6884": {
        "id": 6884,
        "shieldWord": "7GG"
    },
    "6885": {
        "id": 6885,
        "shieldWord": "www.567yx.com"
    },
    "6886": {
        "id": 6886,
        "shieldWord": "131.com"
    },
    "6887": {
        "id": 6887,
        "shieldWord": "bbs.7gg.cn"
    },
    "6888": {
        "id": 6888,
        "shieldWord": "www.99game.net"
    },
    "6889": {
        "id": 6889,
        "shieldWord": "ppt.cc"
    },
    "6890": {
        "id": 6890,
        "shieldWord": "www.zsyxhd.cn"
    },
    "6891": {
        "id": 6891,
        "shieldWord": "www.foyeye.com"
    },
    "6892": {
        "id": 6892,
        "shieldWord": "www.23nice.com.cn"
    },
    "6893": {
        "id": 6893,
        "shieldWord": "www.maituan.com"
    },
    "6894": {
        "id": 6894,
        "shieldWord": "www.ylteam.cn"
    },
    "6895": {
        "id": 6895,
        "shieldWord": "www.yhzt.org"
    },
    "6896": {
        "id": 6896,
        "shieldWord": "vip886.com"
    },
    "6897": {
        "id": 6897,
        "shieldWord": "www.neicehao.cn"
    },
    "6898": {
        "id": 6898,
        "shieldWord": "bbs.butcn.com"
    },
    "6899": {
        "id": 6899,
        "shieldWord": "www.gamelifeclub.cn"
    },
    "6900": {
        "id": 6900,
        "shieldWord": "consignment5173"
    },
    "6901": {
        "id": 6901,
        "shieldWord": "www.70yx.com"
    },
    "6902": {
        "id": 6902,
        "shieldWord": "www.legu.com"
    },
    "6903": {
        "id": 6903,
        "shieldWord": "ko180"
    },
    "6904": {
        "id": 6904,
        "shieldWord": "bbs.pkmmo"
    },
    "6905": {
        "id": 6905,
        "shieldWord": "whoyo.com"
    },
    "6906": {
        "id": 6906,
        "shieldWord": "www.2q5q.com"
    },
    "6907": {
        "id": 6907,
        "shieldWord": "www.zxkaku.cn"
    },
    "6908": {
        "id": 6908,
        "shieldWord": "www.gw17173.cn"
    },
    "6909": {
        "id": 6909,
        "shieldWord": "www.315ts.net"
    },
    "6910": {
        "id": 6910,
        "shieldWord": "qgqm.org"
    },
    "6911": {
        "id": 6911,
        "shieldWord": "17173dl.net"
    },
    "6912": {
        "id": 6912,
        "shieldWord": "i9game.com"
    },
    "6913": {
        "id": 6913,
        "shieldWord": "365gn"
    },
    "6914": {
        "id": 6914,
        "shieldWord": "158le.com"
    },
    "6915": {
        "id": 6915,
        "shieldWord": "1100y.com"
    },
    "6916": {
        "id": 6916,
        "shieldWord": "bulaoge.com"
    },
    "6917": {
        "id": 6917,
        "shieldWord": "17youle.com"
    },
    "6918": {
        "id": 6918,
        "shieldWord": "reddidi.com.cn"
    },
    "6919": {
        "id": 6919,
        "shieldWord": "icpcn.com"
    },
    "6920": {
        "id": 6920,
        "shieldWord": "ul86.com"
    },
    "6921": {
        "id": 6921,
        "shieldWord": "showka8.com"
    },
    "6922": {
        "id": 6922,
        "shieldWord": "szlmgh.cn"
    },
    "6923": {
        "id": 6923,
        "shieldWord": "bbs.766.com"
    },
    "6924": {
        "id": 6924,
        "shieldWord": "www.766.com"
    },
    "6925": {
        "id": 6925,
        "shieldWord": "91bysd.cn"
    },
    "6926": {
        "id": 6926,
        "shieldWord": "jiayyou.cn"
    },
    "6927": {
        "id": 6927,
        "shieldWord": "gigabyte.cn"
    },
    "6928": {
        "id": 6928,
        "shieldWord": "duowan"
    },
    "6929": {
        "id": 6929,
        "shieldWord": "wgxiaowu.com"
    },
    "6930": {
        "id": 6930,
        "shieldWord": "youxiji888.cn"
    },
    "6931": {
        "id": 6931,
        "shieldWord": "yz55.cn"
    },
    "6932": {
        "id": 6932,
        "shieldWord": "Carrefour"
    },
    "6933": {
        "id": 6933,
        "shieldWord": "51jiafen.cn"
    },
    "6934": {
        "id": 6934,
        "shieldWord": "597ft.com"
    },
    "6935": {
        "id": 6935,
        "shieldWord": "itnongzhuang.com2y7v.cnhwxvote.cn"
    },
    "6936": {
        "id": 6936,
        "shieldWord": "92klgh.cn"
    },
    "6937": {
        "id": 6937,
        "shieldWord": "xiaoqinzaixian.cn"
    },
    "6938": {
        "id": 6938,
        "shieldWord": "661661.com"
    },
    "6939": {
        "id": 6939,
        "shieldWord": "haosilu.com"
    },
    "6940": {
        "id": 6940,
        "shieldWord": "dl.com"
    },
    "6941": {
        "id": 6941,
        "shieldWord": "xl517.com"
    },
    "6942": {
        "id": 6942,
        "shieldWord": "sjlike.com"
    },
    "6943": {
        "id": 6943,
        "shieldWord": "tont.cn"
    },
    "6944": {
        "id": 6944,
        "shieldWord": "xq-wl.cn"
    },
    "6945": {
        "id": 6945,
        "shieldWord": "feitengdl.com"
    },
    "6946": {
        "id": 6946,
        "shieldWord": "bz176.com"
    },
    "6947": {
        "id": 6947,
        "shieldWord": "dadati.com"
    },
    "6948": {
        "id": 6948,
        "shieldWord": "asgardcn.com"
    },
    "6949": {
        "id": 6949,
        "shieldWord": "dolbbs.com"
    },
    "6950": {
        "id": 6950,
        "shieldWord": "okaygood.cn"
    },
    "6951": {
        "id": 6951,
        "shieldWord": "1t1t.com"
    },
    "6952": {
        "id": 6952,
        "shieldWord": "jinpaopao.com"
    },
    "6953": {
        "id": 6953,
        "shieldWord": "blacksee.com.cn"
    },
    "6954": {
        "id": 6954,
        "shieldWord": "1qmsj.com"
    },
    "6955": {
        "id": 6955,
        "shieldWord": "202333.com"
    },
    "6956": {
        "id": 6956,
        "shieldWord": "luoxialu.cn"
    },
    "6957": {
        "id": 6957,
        "shieldWord": "37447.cn"
    },
    "6958": {
        "id": 6958,
        "shieldWord": "567567aa.cn"
    },
    "6959": {
        "id": 6959,
        "shieldWord": "09city.com"
    },
    "6960": {
        "id": 6960,
        "shieldWord": "71ka.com"
    },
    "6961": {
        "id": 6961,
        "shieldWord": "fy371.com"
    },
    "6962": {
        "id": 6962,
        "shieldWord": "365tttyx.com"
    },
    "6963": {
        "id": 6963,
        "shieldWord": "host800.com"
    },
    "6964": {
        "id": 6964,
        "shieldWord": "lybbs.info"
    },
    "6965": {
        "id": 6965,
        "shieldWord": "ys168.com"
    },
    "6966": {
        "id": 6966,
        "shieldWord": "88mysf.com"
    },
    "6967": {
        "id": 6967,
        "shieldWord": "5d6d.com"
    },
    "6968": {
        "id": 6968,
        "shieldWord": "id666.uqc.cn"
    },
    "6969": {
        "id": 6969,
        "shieldWord": "stlmbbs.cn"
    },
    "6970": {
        "id": 6970,
        "shieldWord": "pcikchina.com"
    },
    "6971": {
        "id": 6971,
        "shieldWord": "lxsm888.com"
    },
    "6972": {
        "id": 6972,
        "shieldWord": "wangyoudl.com"
    },
    "6973": {
        "id": 6973,
        "shieldWord": "chinavfx.net"
    },
    "6974": {
        "id": 6974,
        "shieldWord": "zxsj188.com"
    },
    "6975": {
        "id": 6975,
        "shieldWord": "wg7766.cn"
    },
    "6976": {
        "id": 6976,
        "shieldWord": "e7sw.cn"
    },
    "6977": {
        "id": 6977,
        "shieldWord": "jooplay.com"
    },
    "6978": {
        "id": 6978,
        "shieldWord": "gssmtt.com"
    },
    "6979": {
        "id": 6979,
        "shieldWord": "likeko.com"
    },
    "6980": {
        "id": 6980,
        "shieldWord": "lyx-game.cn"
    },
    "6981": {
        "id": 6981,
        "shieldWord": "wy33.com"
    },
    "6982": {
        "id": 6982,
        "shieldWord": "zy666.net"
    },
    "6983": {
        "id": 6983,
        "shieldWord": "newsmth.net"
    },
    "6984": {
        "id": 6984,
        "shieldWord": "l2jsom.cn"
    },
    "6985": {
        "id": 6985,
        "shieldWord": "13888wg.com"
    },
    "6986": {
        "id": 6986,
        "shieldWord": "qtoy.com"
    },
    "6987": {
        "id": 6987,
        "shieldWord": "1000scarf.com"
    },
    "6988": {
        "id": 6988,
        "shieldWord": "digitallongking.com"
    },
    "6989": {
        "id": 6989,
        "shieldWord": "zaixu.net"
    },
    "6990": {
        "id": 6990,
        "shieldWord": "ncyh.cn"
    },
    "6991": {
        "id": 6991,
        "shieldWord": "888895.com"
    },
    "6992": {
        "id": 6992,
        "shieldWord": "ising99.com"
    },
    "6993": {
        "id": 6993,
        "shieldWord": "cikcatv.2om"
    },
    "6994": {
        "id": 6994,
        "shieldWord": "parke888.com"
    },
    "6995": {
        "id": 6995,
        "shieldWord": "01gh.com"
    },
    "6996": {
        "id": 6996,
        "shieldWord": "gogo.net"
    },
    "6997": {
        "id": 6997,
        "shieldWord": "uu1001.com"
    },
    "6998": {
        "id": 6998,
        "shieldWord": "wy724.com"
    },
    "6999": {
        "id": 6999,
        "shieldWord": "prettyirene.net"
    },
    "7000": {
        "id": 7000,
        "shieldWord": "yaokong7.com"
    },
    "7001": {
        "id": 7001,
        "shieldWord": "zzmysf.com"
    },
    "7002": {
        "id": 7002,
        "shieldWord": "52sxhy.cn"
    },
    "7003": {
        "id": 7003,
        "shieldWord": "92wydl.com"
    },
    "7004": {
        "id": 7004,
        "shieldWord": "g365.net"
    },
    "7005": {
        "id": 7005,
        "shieldWord": "pkmmo.com"
    },
    "7006": {
        "id": 7006,
        "shieldWord": "52ppsa.cn"
    },
    "7007": {
        "id": 7007,
        "shieldWord": "bl62.com"
    },
    "7008": {
        "id": 7008,
        "shieldWord": "canyaa.com"
    },
    "7009": {
        "id": 7009,
        "shieldWord": "lordren.com"
    },
    "7010": {
        "id": 7010,
        "shieldWord": "xya3.cn"
    },
    "7011": {
        "id": 7011,
        "shieldWord": "5m5m5m.com"
    },
    "7012": {
        "id": 7012,
        "shieldWord": "www.gardcn.com"
    },
    "7013": {
        "id": 7013,
        "shieldWord": "www.sf766.com.cn"
    },
    "7014": {
        "id": 7014,
        "shieldWord": "ent365.com"
    },
    "7015": {
        "id": 7015,
        "shieldWord": "18900.com"
    },
    "7016": {
        "id": 7016,
        "shieldWord": "7mmo.com"
    },
    "7017": {
        "id": 7017,
        "shieldWord": "cdream.com"
    },
    "7018": {
        "id": 7018,
        "shieldWord": "wy3868.com"
    },
    "7019": {
        "id": 7019,
        "shieldWord": "nbfib.cn"
    },
    "7020": {
        "id": 7020,
        "shieldWord": "17173yxdl.cn"
    },
    "7021": {
        "id": 7021,
        "shieldWord": "osisa.cn"
    },
    "7022": {
        "id": 7022,
        "shieldWord": "haouse.cn"
    },
    "7023": {
        "id": 7023,
        "shieldWord": "54hero.com"
    },
    "7024": {
        "id": 7024,
        "shieldWord": "ieboy.cn"
    },
    "7025": {
        "id": 7025,
        "shieldWord": "geocities.com"
    },
    "7026": {
        "id": 7026,
        "shieldWord": "xiuau.cn"
    },
    "7027": {
        "id": 7027,
        "shieldWord": "cvceo.com"
    },
    "7028": {
        "id": 7028,
        "shieldWord": "fxjsqc.com"
    },
    "7029": {
        "id": 7029,
        "shieldWord": "thec.cn"
    },
    "7030": {
        "id": 7030,
        "shieldWord": "c5c8.cn"
    },
    "7031": {
        "id": 7031,
        "shieldWord": "a33.com"
    },
    "7032": {
        "id": 7032,
        "shieldWord": "qqsg.org"
    },
    "7033": {
        "id": 7033,
        "shieldWord": "my3q.com"
    },
    "7034": {
        "id": 7034,
        "shieldWord": "51juezhan.com"
    },
    "7035": {
        "id": 7035,
        "shieldWord": "kartt.cn"
    },
    "7036": {
        "id": 7036,
        "shieldWord": "hexun.com"
    },
    "7037": {
        "id": 7037,
        "shieldWord": "15wy.com"
    },
    "7038": {
        "id": 7038,
        "shieldWord": "13ml.net"
    },
    "7039": {
        "id": 7039,
        "shieldWord": "homexf.cn"
    },
    "7040": {
        "id": 7040,
        "shieldWord": "xyxgh.com"
    },
    "7041": {
        "id": 7041,
        "shieldWord": "jdyou.com"
    },
    "7042": {
        "id": 7042,
        "shieldWord": "langyou.info"
    },
    "7043": {
        "id": 7043,
        "shieldWord": "duowan.com"
    },
    "7044": {
        "id": 7044,
        "shieldWord": "8188mu.com"
    },
    "7045": {
        "id": 7045,
        "shieldWord": "tianlong4f.cn"
    },
    "7046": {
        "id": 7046,
        "shieldWord": "yeswm.com"
    },
    "7047": {
        "id": 7047,
        "shieldWord": "wgbobo.cn"
    },
    "7048": {
        "id": 7048,
        "shieldWord": "haog8.cn"
    },
    "7049": {
        "id": 7049,
        "shieldWord": "47513.cn"
    },
    "7050": {
        "id": 7050,
        "shieldWord": "92ey.com"
    },
    "7051": {
        "id": 7051,
        "shieldWord": "hao1788.co"
    },
    "7052": {
        "id": 7052,
        "shieldWord": "mgjzybj.com"
    },
    "7053": {
        "id": 7053,
        "shieldWord": "xdns.eu"
    },
    "7054": {
        "id": 7054,
        "shieldWord": "shenycs.co"
    },
    "7055": {
        "id": 7055,
        "shieldWord": "mpceggs.cn"
    },
    "7056": {
        "id": 7056,
        "shieldWord": "kod920.cn"
    },
    "7057": {
        "id": 7057,
        "shieldWord": "njgamecollege.org"
    },
    "7058": {
        "id": 7058,
        "shieldWord": "51hdw.com"
    },
    "7059": {
        "id": 7059,
        "shieldWord": "025game.cn"
    },
    "7060": {
        "id": 7060,
        "shieldWord": "bibidu.com"
    },
    "7061": {
        "id": 7061,
        "shieldWord": "bwowd.com"
    },
    "7062": {
        "id": 7062,
        "shieldWord": "3kwow.com"
    },
    "7063": {
        "id": 7063,
        "shieldWord": "zx002.com"
    },
    "7064": {
        "id": 7064,
        "shieldWord": "bazhuwg.cn"
    },
    "7065": {
        "id": 7065,
        "shieldWord": "991game.com"
    },
    "7066": {
        "id": 7066,
        "shieldWord": "zuanshi1000.cn"
    },
    "7067": {
        "id": 7067,
        "shieldWord": "10mb.cn"
    },
    "7068": {
        "id": 7068,
        "shieldWord": "Huihuangtx.com"
    },
    "7069": {
        "id": 7069,
        "shieldWord": "chongxianmu.cn"
    },
    "7070": {
        "id": 7070,
        "shieldWord": "any2000.com"
    },
    "7071": {
        "id": 7071,
        "shieldWord": "99sa.com"
    },
    "7072": {
        "id": 7072,
        "shieldWord": "zhidian8.com"
    },
    "7073": {
        "id": 7073,
        "shieldWord": "t9wg.cn"
    },
    "7074": {
        "id": 7074,
        "shieldWord": "bobaoping"
    },
    "7075": {
        "id": 7075,
        "shieldWord": "qixingnet.com"
    },
    "7076": {
        "id": 7076,
        "shieldWord": "88kx.com"
    },
    "7077": {
        "id": 7077,
        "shieldWord": "00sm.cn"
    },
    "7078": {
        "id": 7078,
        "shieldWord": "moyi520.cn"
    },
    "7079": {
        "id": 7079,
        "shieldWord": "d666.com"
    },
    "7080": {
        "id": 7080,
        "shieldWord": "fisonet.com"
    },
    "7081": {
        "id": 7081,
        "shieldWord": "0571qq.com"
    },
    "7082": {
        "id": 7082,
        "shieldWord": "173at.com"
    },
    "7083": {
        "id": 7083,
        "shieldWord": "pk200.com"
    },
    "7084": {
        "id": 7084,
        "shieldWord": "2feiche.cn"
    },
    "7085": {
        "id": 7085,
        "shieldWord": "jjdlw.com"
    },
    "7086": {
        "id": 7086,
        "shieldWord": "xyq2sf.com"
    },
    "7087": {
        "id": 7087,
        "shieldWord": "69nb.com"
    },
    "7088": {
        "id": 7088,
        "shieldWord": "txwsWind"
    },
    "7089": {
        "id": 7089,
        "shieldWord": "jiayyou.com"
    }
});
    }
}