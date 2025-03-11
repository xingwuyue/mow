import { Notifier } from "../framework/Notifier";
import { NotifyID } from "../framework/NotifyID";
import { WXSDK } from "./WXSDK";


const wx = window["wx"];

//分享场景值
export class EChannelPrefix {
    static regular = "regular";                  // 常规 右上角。。。菜单的分享
    static challenge = "challenge";              // 挑战好友
    static step = "step";                        // 炫耀段位
    static result = "result";                    // 分享回放    
    static box = "box";                          // 宝箱加速
    static grouprank = "grouprank";              // 群排行
    static newyear = "newyear";
};

const kWidth = 720;
const kHeight = 1280;

export class ZiJieSDK {
    public static isZiJie(): boolean {
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    }

    // private static _videoAd = null;
    // private static _videoId: string = "";
    private static _bannerY: number = -360;

    private static _bannerId: string = "";
    private static _bannderAd = null;
    private static _bannerisShow: boolean = false;
    private static _bannerIsLoad: boolean = false;
    // private static targetBannerAdWidth = 200;
    /**
     * 
     * @param adId 
     * @param refresh 是否强制刷新
     */
    public static showBanner(adId: string, refresh: boolean = false) {
        if (!ZiJieSDK.isZiJie()) return;
        if (adId == ZiJieSDK._bannerId && ZiJieSDK._bannderAd && this._bannerIsLoad && !refresh) {
            ZiJieSDK._bannderAd.show();
            ZiJieSDK._bannerisShow = true;
            Notifier.send(NotifyID.SDK_Banner_Resize);
            return;
        }
        if (ZiJieSDK._bannderAd) {
            ZiJieSDK._bannerIsLoad = false;
            ZiJieSDK._bannderAd.destroy();
        }
        var targetBannerAdWidth:number = 200;
        let info = tt.getSystemInfoSync();
        if (!tt.createBannerAd) {
            tt.showToast({
                title: "版本过低，无法创建广告banner",
                icon: "none",
                image: "",
                duration: 0,
            });
            setTimeout(() => tt.hideToast(), 3000);
            ZiJieSDK._bannerIsLoad = false;
            ZiJieSDK._bannerisShow = false;
            Notifier.send(NotifyID.SDK_Banner_Resize);
        } else {
            let offsety = 0;
            if (info.model.indexOf('iPhone X') != -1 || info.model.indexOf("iPhone11") != -1) {
                offsety = 20;
            }
            ZiJieSDK._bannerId = adId;
            ZiJieSDK._bannderAd = tt.createBannerAd({
                adUnitId: adId,
                style: {
                    top: info.windowHeight - (targetBannerAdWidth / 16 * 9) - offsety,
                    width: info.screenWidth,
                    left:(info.windowWidth - targetBannerAdWidth) * 0.5,
                    height: 90
                }
            })

            ZiJieSDK._bannderAd.onError(err => {
                console.error('bannerAdonError', err)
                ZiJieSDK._bannerY = -360;
                WXSDK._bannerY = -360;
                Notifier.send(NotifyID.SDK_Banner_Resize);
            })

            ZiJieSDK._bannderAd.onResize((data) => {
                if (targetBannerAdWidth != data.width) {
                    targetBannerAdWidth = data.width;
                    ZiJieSDK._bannderAd.style.top = info.windowHeight - (data.width / 16 * 9) - offsety;
                    ZiJieSDK._bannderAd.style.left = (info.windowWidth - data.width) / 2;
                }
                let system = ZiJieSDK.SystemInfo;
                let radio = system.screenHeight / system.screenWidth;
                let Size = cc.director.getWinSize();
                let height = Size.height;
                height = kWidth * radio;
                let realheight = height;//改成fixheight
                let y = (realheight - ZiJieSDK._bannderAd.style.top / (system.screenHeight / realheight));
                y = (y - realheight / 2.0);
                ZiJieSDK._bannerY = y;
                WXSDK._bannerY = y;
                Notifier.send(NotifyID.SDK_Banner_Resize, ZiJieSDK._bannderAd.style);
            });

            ZiJieSDK._bannderAd.onLoad(function () {
                ZiJieSDK._bannerIsLoad = true;
                ZiJieSDK._bannderAd.show()
                    .then(() => {
                        ZiJieSDK._bannerisShow = true;
                        ZiJieSDK._bannerY = -360;
                        WXSDK._bannerY = -360;
                        Notifier.send(NotifyID.SDK_Banner_Resize);
                    })
                    .catch(err => {
                        Notifier.send(NotifyID.SDK_Banner_Resize);
                    })
            })
        }
    }

    public static getOffset(): number {
        let systemSize = tt.getSystemInfoSync();
        let designAspect = 720 / 1280;
        let designHeight = systemSize.windowWidth / designAspect;
        //高度黑边
        let offset = (systemSize.windowHeight - designHeight) * 0.5;
        return offset
    }

    public static hideBanner(cleanUp: boolean = false) {
        if (ZiJieSDK._bannderAd) {
            if (cleanUp) {
                ZiJieSDK._bannderAd.destroy();
                ZiJieSDK._bannerId = "";
                ZiJieSDK._bannderAd = null;
                ZiJieSDK._bannerIsLoad = false;
            } else {
                ZiJieSDK._bannderAd.hide();
            }
            ZiJieSDK._bannerisShow = false;
        }
    }

    public static get isBannerShow(): boolean {
        return ZiJieSDK._bannerisShow;
    }

    /**
     * @description banner广告高度值
     * @readonly
     * @static
     * @type {number}
     * @memberof ZiJieSDK
     */
    public static get bannerY(): number {
        return ZiJieSDK._bannerY + 20;
    }

    public static showToast(text: string, mask: boolean = false, icon: string = "loading") {
        if (ZiJieSDK.isZiJie()) {
            tt.showToast({
                title: text,
                mask: mask,
                icon: icon,
            })
        }
    }
    public static hideToast() {
        if (ZiJieSDK.isZiJie()) {
            tt.hideToast();
        }
    }

    private static _wxSystemInfo: any;
    public static get SystemInfo(): any {
        if (!ZiJieSDK._wxSystemInfo) {
            ZiJieSDK._wxSystemInfo = tt.getSystemInfoSync();
        }
        return ZiJieSDK._wxSystemInfo;
    }

    public static vibrateShort() {
        tt.vibrateShort();
    }
}
