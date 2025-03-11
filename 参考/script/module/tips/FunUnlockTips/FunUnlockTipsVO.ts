import { FunUnlockTipsData } from "../../../common/Common_Define";

export interface FunUnlockData { 
    [key: string]: FunUnlockTipsData
}
export default class FunUnlockTipsVO {
    funOpenTaskTable: FunUnlockData = {};
    funOpenList: FunUnlockTipsData[] = [];
}
