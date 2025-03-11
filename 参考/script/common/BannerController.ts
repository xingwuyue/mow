import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { WXSDK } from "../sdk/WXSDK";
import { GameVoManager } from "../manager/GameVoManager";
import { ZiJieSDK } from "../sdk/ZIJIESDK";

/*
 * desc
 */
export class BannerController extends MVC.BaseController {
    public constructor() {
        super("BannerController");
        this.changeListener(true);
    }

    _panel: string = "";
    _showBoxNum: number = 0;
    _showResultNum: number = 0;

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.ShowBanner, this.showBanner, this);
        Notifier.changeListener(enable, ListenID.HideBanner, this.hideBanner, this);
        Notifier.changeListener(enable, ListenID.ClickBanner, this.clickFunc, this);
    }

    private _showNum: number = 0;

    public showBanner(type: number, panel: string = "", refresh: boolean = false) {

    }

    public hideBanner() {

    }

    // 显示次数
    private showNum() {
        if (this._panel == "result") {
            if (GameVoManager.getInstance.myUserVo.resultBannerClick) {
                this._showResultNum++;
            }
        } else if (this._panel == "box") {
            if (GameVoManager.getInstance.myUserVo.boxBannerClick) {
                this._showBoxNum++;
            }
        }
    }

    // 超过次数处理
    private showNum2() {
        if (this._panel == "result") {
            if (this._showResultNum >= 2) {
                this._showResultNum = 0;
                GameVoManager.getInstance.myUserVo.resultBannerClick = false;
            }
        } else if (this._panel == "box") {
            if (this._showBoxNum >= 2) {
                this._showBoxNum = 0;
                GameVoManager.getInstance.myUserVo.boxBannerClick = false;
            }
        }
    }

    private clickFunc() {
        if (this._panel == "result") {
            if (!GameVoManager.getInstance.myUserVo.resultBannerClick) {
                GameVoManager.getInstance.myUserVo.resultBannerClick = true;
            }
        } else if (this._panel == "box") {
            if (!GameVoManager.getInstance.myUserVo.boxBannerClick) {
                GameVoManager.getInstance.myUserVo.boxBannerClick = true;
            }
        }
    }
//weixin ： vip-v66666
}
