import { Common_Struct } from "../../common/Common_Struct";
import { UIManager } from "../../framework/UIManager";
import { MVC } from "../../framework/MVC";
import { Common_UIPath, GameFunID } from "../../common/Common_Define";
import { GameVoManager } from "../../manager/GameVoManager";
import { Cfg } from "../../config/Cfg";
import { Util } from "../../utils/Util";

/**
 * 检查玩法功能是否开启
 */
export default class FunOpen {
    private static _instance: FunOpen = null;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new FunOpen();
        }
        return this._instance;
    }

    funOpenValue: number = 0;

    constructor() {
        FunOpen._instance = this;
    }

    showBtnArrayByPlatform(btnList: Common_Struct.platformBtnList, allHide: boolean = false) {

    }

    getFunIsOpen(name: string) {
        let isOpen = true; //默认开启
        let userData = GameVoManager.getInstance.myUserVo;
        let userLv = userData.topLevel;
        let isIOS = false;
        switch (name) {
            // case Common_UIPath.MoreGoldUI: {isOpen = (userLv >= 0); break;}       //更多金币是在非ios平台下开启
            // case Common_UIPath.ServiceUI: {isOpen = !isIOS; break;}         //客服
            case Common_UIPath.InviteUI: { isOpen = !isIOS; break; }          //邀请有礼
            case Common_UIPath.RankUI: { isOpen = userLv >= Cfg.UnlockSystem.get(GameFunID.Rank).unlockLevel; break; }            //排行榜
            case Common_UIPath.RewardTaskView: {
                let chapter = Util.levelToChapterId(userLv);
                isOpen = chapter[0] > Cfg.UnlockSystem.get(GameFunID.RewardTask).unlockLevel;
                break;
            }
            case `DSP`: { isOpen = (!isIOS && GameVoManager.getInstance.gameSwitchVo.dsp); break; }            //DSP
            // case `MainDraw`: { isOpen = userLv >= Cfg.UnlockSystem.get(GameFunID.MainDraw).unlockLevel; break; }            //DSP
            case `MainDraw`: { isOpen = false; break; }            //DSP
            case `Sign`: { isOpen = userLv >= Cfg.UnlockSystem.get(GameFunID.Sign).unlockLevel; break; }            //DSP
            case `Upgrade`: { //装备强化
                this.funOpenValue = Cfg.UnlockSystem.get(GameFunID.EquipUpgrade).unlockLevel;
                isOpen = userLv >= this.funOpenValue;
                break;
            }
            case `Smelt`: { //装备熔炼
                this.funOpenValue = Cfg.UnlockSystem.get(GameFunID.EquipSmelt).unlockLevel;
                isOpen = userLv >= this.funOpenValue;
                break;
            }
            case `Boss`: { //boss
                this.funOpenValue = Cfg.UnlockSystem.get(GameFunID.Boss).unlockLevel;
                // isOpen = userLv >= this.funOpenValue;
                isOpen = false;
                break;
            }
            //DSP
            // case Common_UIPath.mo
        }
        return isOpen;
    }

    getFunIsOpenValue() {
        return this.funOpenValue;
    }
}
