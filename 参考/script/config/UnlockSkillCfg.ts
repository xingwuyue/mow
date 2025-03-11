import { TConfig } from "./TConfig";


export interface UnlockSkillCfg extends IConfig {
	chapterID:number;
	unlockSkill:number[];
}



export class UnlockSkillCfgReader extends TConfig<UnlockSkillCfg> {
    protected _name : string = "UnlockSkill";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "chapterID": 1,
        "unlockSkill": []
    },
    "2": {
        "chapterID": 2,
        "unlockSkill": [
            1,
            2,
            3,
            4
        ]
    },
    "3": {
        "chapterID": 3,
        "unlockSkill": [
            4,
            5,
            6,
            7
        ]
    },
    "4": {
        "chapterID": 4,
        "unlockSkill": []
    },
    "5": {
        "chapterID": 5,
        "unlockSkill": [
            8,
            9,
            10,
            11
        ]
    }
});
    }
}