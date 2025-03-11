# client
---
平台SDK接入流程
登录
1：静默登录，填写hd_module/config/AppConfig里面的信息,将代码拷贝到项目工程目录下任意位置,代码将自动执行静默登录
2：授权登录,调用HD_MODULE.getPlatform().getUserInfo(success),将自动获取用户信息，如果用户没授权，则自动弹出授权窗

onShow和onHide
1：SDK附带事件派发，路径为sdk/mgr/EventManager,
2：onShow：通过导入EventManager，调用EventManager.on('game-onshow', callBack, this); 可以监听onShow事件
3：onHide：EventManager.on('game-onhide')可监听平台onHide事件
4：获取onShow时的参数，可以通过HD_MODULE.getPlatform().getOnShowRes()获取

分享
1：通过事件派发拉起分享EventManager.emit('open-share', shareData);
2：通过配置后台素材，然后调用HD_MODULE.getPlatform().openShareByShareTemplateRand(type)将随机获取type类型里面的随机素材，并拉起分享
3：诱导分享控制，通过调用HD_MODULE.getPlatform().showBtnArrayByPlatformt(btnList: {wx: Array<cc.Node | cc.Button>, tt: Array<cc.Node | cc.Button>}, allHide: boolean = false);
其中btnList里面的wx数组，如果将按钮放在wx，则微信平台时显示wx里面的所有按钮，并隐藏tt(头条)平台的所有按钮，allHide为强制隐藏所有按钮，用户诱导分享
4：初始化右上角分享，调用HD_MODULE.getPlatform().setShareAppMsg(shareData);

交叉推广接入
1：在场景中拖入按钮，挂上Button_DSP脚本，脚本路径在hd_module/sdk/component/Button_DSP.ts,然后编辑器上选择按钮类型和平台，并且在微信包里的game.json文件添加跳转列表navigateToMiniProgramAppIdList字段

服务器请求
1：脚本路径hd_module/net/protocol/baseprotocol.ts，填写该脚本里面的serverUrlConfig,requestConfig即可调用hd_module/net/net.ts里面的Api
例如HD_MODULE.getNet().getServerTime();

客服
1：调用HD_MODULE.getPlatform().openCustomerServiceConversation(data);拉起进入客服

其他详细信息直接查看接口
网络模块：hd_module/net/net.ts  通过HD_MODULE.getNet()获取。
平台模块：hd_module/sdk/platform/platform.ts    通过HD_MODULE.getPlatform()获取。
其余不暴露