import { TConfig } from "./TConfig";


export interface RemouldCfg extends IConfig {ID:number;name:string;sameTeam:number;unlockChapters:number;upgradeMax:number;gradePrice:number[];attribute:number[];}



export class RemouldCfgReader extends TConfig<RemouldCfg> {
    protected _name : string = "Remould";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "ID": 1,
        "name": "体质强化Ⅰ",
        "sameTeam": 1,
        "unlockChapters": 0,
        "upgradeMax": 5,
        "gradePrice": [
            [
                4,
                10
            ],
            [
                1,
                100
            ],
            [
                1,
                100
            ],
            [
                1,
                100
            ],
            [
                1,
                100
            ]
        ],
        "attribute": [
            [
                3,
                0
            ],
            [
                3,
                30
            ],
            [
                3,
                60
            ],
            [
                3,
                90
            ],
            [
                3,
                120
            ],
            [
                3,
                150
            ]
        ]
    },
    "2": {
        "ID": 2,
        "name": "枪械改造Ⅰ",
        "sameTeam": 1,
        "unlockChapters": 0,
        "upgradeMax": 5,
        "gradePrice": [
            [
                4,
                50
            ],
            [
                1,
                100
            ],
            [
                1,
                100
            ],
            [
                1,
                100
            ],
            [
                1,
                100
            ]
        ],
        "attribute": [
            [
                1,
                0
            ],
            [
                1,
                2
            ],
            [
                1,
                4
            ],
            [
                1,
                6
            ],
            [
                1,
                8
            ],
            [
                1,
                10
            ]
        ]
    },
    "3": {
        "ID": 3,
        "name": "护甲改造Ⅰ",
        "sameTeam": 2,
        "unlockChapters": 1,
        "upgradeMax": 5,
        "gradePrice": [
            [
                4,
                100
            ],
            [
                1,
                200
            ],
            [
                1,
                200
            ],
            [
                1,
                200
            ],
            [
                1,
                200
            ]
        ],
        "attribute": [
            [
                2,
                0
            ],
            [
                2,
                2
            ],
            [
                2,
                4
            ],
            [
                2,
                6
            ],
            [
                2,
                8
            ],
            [
                2,
                10
            ]
        ]
    },
    "4": {
        "ID": 4,
        "name": "精准训练Ⅰ",
        "sameTeam": 2,
        "unlockChapters": 1,
        "upgradeMax": 5,
        "gradePrice": [
            [
                4,
                200
            ],
            [
                1,
                200
            ],
            [
                1,
                200
            ],
            [
                1,
                200
            ],
            [
                1,
                200
            ]
        ],
        "attribute": [
            [
                4,
                0
            ],
            [
                4,
                1
            ],
            [
                4,
                2
            ],
            [
                4,
                3
            ],
            [
                4,
                4
            ],
            [
                4,
                5
            ]
        ]
    },
    "5": {
        "ID": 5,
        "name": "体质强化Ⅱ",
        "sameTeam": 3,
        "unlockChapters": 2,
        "upgradeMax": 10,
        "gradePrice": [
            [
                4,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ]
        ],
        "attribute": [
            [
                3,
                0
            ],
            [
                3,
                30
            ],
            [
                3,
                60
            ],
            [
                3,
                90
            ],
            [
                3,
                120
            ],
            [
                3,
                150
            ],
            [
                3,
                180
            ],
            [
                3,
                210
            ],
            [
                3,
                240
            ],
            [
                3,
                270
            ],
            [
                3,
                300
            ]
        ]
    },
    "6": {
        "ID": 6,
        "name": "枪械改造Ⅱ",
        "sameTeam": 3,
        "unlockChapters": 2,
        "upgradeMax": 10,
        "gradePrice": [
            [
                4,
                500
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ],
            [
                1,
                300
            ]
        ],
        "attribute": [
            [
                1,
                0
            ],
            [
                1,
                2
            ],
            [
                1,
                4
            ],
            [
                1,
                6
            ],
            [
                1,
                8
            ],
            [
                1,
                10
            ],
            [
                1,
                12
            ],
            [
                1,
                14
            ],
            [
                1,
                16
            ],
            [
                1,
                18
            ],
            [
                1,
                20
            ]
        ]
    },
    "7": {
        "ID": 7,
        "name": "护甲改造Ⅱ",
        "sameTeam": 4,
        "unlockChapters": 3,
        "upgradeMax": 10,
        "gradePrice": [
            [
                4,
                1000
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ]
        ],
        "attribute": [
            [
                2,
                0
            ],
            [
                2,
                2
            ],
            [
                2,
                4
            ],
            [
                2,
                6
            ],
            [
                2,
                8
            ],
            [
                2,
                10
            ],
            [
                2,
                12
            ],
            [
                2,
                14
            ],
            [
                2,
                16
            ],
            [
                2,
                18
            ],
            [
                2,
                20
            ]
        ]
    },
    "8": {
        "ID": 8,
        "name": "精准训练Ⅱ",
        "sameTeam": 4,
        "unlockChapters": 3,
        "upgradeMax": 10,
        "gradePrice": [
            [
                4,
                2000
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ],
            [
                1,
                500
            ]
        ],
        "attribute": [
            [
                4,
                0
            ],
            [
                4,
                1
            ],
            [
                4,
                2
            ],
            [
                4,
                3
            ],
            [
                4,
                4
            ],
            [
                4,
                5
            ],
            [
                4,
                6
            ],
            [
                4,
                7
            ],
            [
                4,
                8
            ],
            [
                4,
                9
            ],
            [
                4,
                10
            ]
        ]
    },
    "9": {
        "ID": 9,
        "name": "体质强化Ⅲ",
        "sameTeam": 5,
        "unlockChapters": 4,
        "upgradeMax": 20,
        "gradePrice": [
            [
                4,
                5000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ]
        ],
        "attribute": [
            [
                3,
                0
            ],
            [
                3,
                30
            ],
            [
                3,
                60
            ],
            [
                3,
                90
            ],
            [
                3,
                120
            ],
            [
                3,
                150
            ],
            [
                3,
                180
            ],
            [
                3,
                210
            ],
            [
                3,
                240
            ],
            [
                3,
                270
            ],
            [
                3,
                300
            ]
        ]
    },
    "10": {
        "ID": 10,
        "name": "枪械改造Ⅲ",
        "sameTeam": 5,
        "unlockChapters": 4,
        "upgradeMax": 20,
        "gradePrice": [
            [
                4,
                10000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ],
            [
                1,
                1000
            ]
        ],
        "attribute": [
            [
                1,
                0
            ],
            [
                1,
                2
            ],
            [
                1,
                4
            ],
            [
                1,
                6
            ],
            [
                1,
                8
            ],
            [
                1,
                10
            ],
            [
                1,
                12
            ],
            [
                1,
                14
            ],
            [
                1,
                16
            ],
            [
                1,
                18
            ],
            [
                1,
                20
            ]
        ]
    },
    "11": {
        "ID": 11,
        "name": "护甲改造Ⅲ",
        "sameTeam": 6,
        "unlockChapters": 5,
        "upgradeMax": 20,
        "gradePrice": [
            [
                4,
                15000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ]
        ],
        "attribute": [
            [
                2,
                0
            ],
            [
                2,
                2
            ],
            [
                2,
                4
            ],
            [
                2,
                6
            ],
            [
                2,
                8
            ],
            [
                2,
                10
            ],
            [
                2,
                12
            ],
            [
                2,
                14
            ],
            [
                2,
                16
            ],
            [
                2,
                18
            ],
            [
                2,
                20
            ]
        ]
    },
    "12": {
        "ID": 12,
        "name": "精准训练Ⅲ",
        "sameTeam": 6,
        "unlockChapters": 5,
        "upgradeMax": 20,
        "gradePrice": [
            [
                4,
                20000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ],
            [
                1,
                2000
            ]
        ],
        "attribute": [
            [
                4,
                0
            ],
            [
                4,
                1
            ],
            [
                4,
                2
            ],
            [
                4,
                3
            ],
            [
                4,
                4
            ],
            [
                4,
                5
            ],
            [
                4,
                6
            ],
            [
                4,
                7
            ],
            [
                4,
                8
            ],
            [
                4,
                9
            ],
            [
                4,
                10
            ]
        ]
    }
});
    }
}