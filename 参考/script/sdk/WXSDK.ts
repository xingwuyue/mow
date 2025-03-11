import { Notifier } from "../framework/Notifier";
import { NotifyID } from "../framework/NotifyID";


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

export class WXSDK {
    public static isWeChat(): boolean {
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    }

    // private static _videoAd = null;
    // private static _videoId: string = "";
    public static _bannerY: number = -360;

    private static _bannerId: string = "";
    private static _bannderAd = null;
    private static _bannerisShow: boolean = false;
    /**
     * 
     * @param adId 
     * @param refresh 是否强制刷新
     */
    public static showBanner(adId: string, refresh: boolean = false) {
        if (!WXSDK.isWeChat()) { Notifier.send(NotifyID.SDK_Banner_Resize); return; }
        if (adId == WXSDK._bannerId && WXSDK._bannderAd && !refresh) {
            WXSDK._bannderAd.show();
            WXSDK._bannerisShow = true;
            Notifier.send(NotifyID.SDK_Banner_Resize);
            return;
        }
        if (WXSDK._bannderAd)
            WXSDK._bannderAd.destroy();

        let info = wx.getSystemInfoSync();
        if (info.SDKVersion < '2.0.4') {
            wx.showToast({
                title: "微信版本过低，无法创建广告banner",
                icon: "none",
                image: "",
                duration: 0,
            });
            setTimeout(() => wx.hideToast(), 3000);

        } else {
            let offsety = 0;
            if (info.model.indexOf('iPhone X') != -1 || info.model.indexOf("iPhone11") != -1) {
                offsety = 20;
            }
            WXSDK._bannerId = adId;
            WXSDK._bannderAd = wx.createBannerAd({
                adUnitId: adId,
                // adIntervals: 30,
                style: {
                    left: 0,
                    top: info.screenHeight - 90,
                    width: info.screenWidth,
                    height: 90
                }
            })

            WXSDK._bannderAd.onError(err => {
                console.error('bannerAdonError', err)
                WXSDK._bannerY = -360;
                Notifier.send(NotifyID.SDK_Banner_Resize);
            })

            WXSDK._bannderAd.onResize((data) => {

                if (WXSDK._bannderAd && WXSDK._bannderAd.style)
                    WXSDK._bannderAd.style.top = info.screenHeight - data.height - offsety;

                WXSDK._bannderAd.style.left = (info.screenWidth - data.width) / 2;
                let system = WXSDK.SystemInfo;
                let radio = system.screenHeight / system.screenWidth;
                let Size = cc.director.getWinSize();
                let height = Size.height;
                height = kWidth * radio;
                let realheight = height;//改成fixheight
                let y = (realheight - WXSDK._bannderAd.style.top / (system.screenHeight / realheight));
                y = (y - realheight / 2.0);
                WXSDK._bannerY = y;
                // console.log("======onResize==========", WXSDK._bannerY)
                Notifier.send(NotifyID.SDK_Banner_Resize, WXSDK._bannderAd.style);
            });

            WXSDK._bannderAd.show().catch(err => {
                WXSDK._bannerY = -360;
                Notifier.send(NotifyID.SDK_Banner_Resize);
            });
            WXSDK._bannerisShow = true;
        }
    }

    public static getOffset(): number {
        let systemSize = wx.getSystemInfoSync();
        let designAspect = 720 / 1280;
        let designHeight = systemSize.windowWidth / designAspect;
        //高度黑边
        let offset = (systemSize.windowHeight - designHeight) * 0.5;
        return offset
    }

    public static hideBanner(cleanUp: boolean = false) {
        if (WXSDK._bannderAd) {
            if (cleanUp) {
                WXSDK._bannderAd.destroy();
                WXSDK._bannerId = "";
                WXSDK._bannderAd = null;
            } else {
                WXSDK._bannderAd.hide();
            }
            WXSDK._bannerisShow = false;
        }
    }

    public static get isBannerShow(): boolean {
        return WXSDK._bannerisShow;
    }

    /**
     * @description banner广告高度值
     * @readonly
     * @static
     * @type {number}
     * @memberof WXSDK
     */
    public static get bannerY(): number {
        return WXSDK._bannerY + 20;
    }

    public static showToast(text: string, mask: boolean = false, icon: string = "loading") {
        if (WXSDK.isWeChat()) {
            wx.showToast({
                title: text,
                mask: mask,
                icon: icon,
            })
        }
    }
    public static hideToast() {
        if (WXSDK.isWeChat()) {
            wx.hideToast();
        }
    }

    private static _wxSystemInfo: any;
    public static get SystemInfo(): any {
        if (!WXSDK._wxSystemInfo) {
            WXSDK._wxSystemInfo = wx.getSystemInfoSync();
        }
        return WXSDK._wxSystemInfo;
    }

    public static vibrateShort() {
        wx.vibrateShort();
    }
}
