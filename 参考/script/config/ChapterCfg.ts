import { TConfig } from "./TConfig";


export interface ChapterCfg extends IConfig {chapterID:number;attackCount:number;battleLvMax:number;powerCount:number;startLevel:number;extraSkillCount:number[];unlockSkillList:number[];ecologicAlawardAdd:number;}



export class ChapterCfgReader extends TConfig<ChapterCfg> {
    protected _name : string = "Chapter";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "chapterID": 1,
        "attackCount": 20,
        "battleLvMax": 11,
        "powerCount": 5,
        "startLevel": 0,
        "extraSkillCount": [
            2,
            2
        ],
        "unlockSkillList": [],
        "ecologicAlawardAdd": 10
    },
    "2": {
        "chapterID": 2,
        "attackCount": 30,
        "battleLvMax": 11,
        "powerCount": 5,
        "startLevel": 20,
        "extraSkillCount": [
            3,
            3
        ],
        "unlockSkillList": [],
        "ecologicAlawardAdd": 10
    },
    "3": {
        "chapterID": 3,
        "attackCount": 50,
        "battleLvMax": 11,
        "powerCount": 5,
        "startLevel": 50,
        "extraSkillCount": [
            3,
            3
        ],
        "unlockSkillList": [],
        "ecologicAlawardAdd": 10
    },
    "4": {
        "chapterID": 4,
        "attackCount": 50,
        "battleLvMax": 11,
        "powerCount": 5,
        "startLevel": 100,
        "extraSkillCount": [
            3,
            3
        ],
        "unlockSkillList": [],
        "ecologicAlawardAdd": 10
    },
    "5": {
        "chapterID": 5,
        "attackCount": 50,
        "battleLvMax": 11,
        "powerCount": 5,
        "startLevel": 150,
        "extraSkillCount": [
            3,
            3
        ],
        "unlockSkillList": [],
        "ecologicAlawardAdd": 10
    },
    "6": {
        "chapterID": 6,
        "attackCount": 50,
        "battleLvMax": 11,
        "powerCount": 5,
        "startLevel": 200,
        "extraSkillCount": [
            3,
            3
        ],
        "unlockSkillList": [],
        "ecologicAlawardAdd": 10
    }
});
    }
}