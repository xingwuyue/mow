import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { CallID } from "../../CallID";
import { Cfg } from "../../config/Cfg";
import { GameVoManager } from "../../manager/GameVoManager";

/*
 * desc
 */
export class ShopController extends MVC.BaseController {
    public constructor() {
        super("ShopController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Shop_Open, this.openShopView, this);
        Notifier.changeCall(enable, CallID.Shop_HaveUnLockGoods, this.checkUnLockGoods, this);
        Notifier.changeListener(enable, ListenID.Shop_ShowDetail, this.onOpenDetail, this);
    }

    public openShopView(type: number = 0) {
        UIManager.Open(Common_UIPath.ShopUI, MVC.eTransition.Default, MVC.eUILayer.Tips, type);
    }

    public checkUnLockGoods(): boolean {
        let list = Cfg.Drop.filter({ showPos: 1 });
        let boo = false;
        for (let i = 0; i < list.length; i++) {
            if (!GameVoManager.getInstance.myUserVo.dropList[list[i].id]) {
                if (list[i].unlockWay[0] == 2) {//金币解锁
                    if (list[i].unlockWay[1] <= GameVoManager.getInstance.myUserVo.gold && list[i].showPos != 2) {
                        boo = true;
                        break;
                    }
                } else if (list[i].unlockWay[0] == 4 && GameVoManager.getInstance.gameSwitchVo.shop) {
                    boo = true;
                    break;
                }
            }
        }
        return boo;
    }

    public onOpenDetail(id: number) {
        UIManager.Open(Common_UIPath.ShopPreview, MVC.eTransition.Default, MVC.eUILayer.Tips, id);
    }
}