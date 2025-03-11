import { MVC } from "./MVC"
import { Const } from "../config/Const";
import FunOpen from "../module/funopen/FunOpen";
import { AlertManager, AlertType } from "../alert/AlertManager";
import { Notifier } from "./Notifier";
import { ListenID } from "../ListenID";
type Node = cc.Node
type Canvas = cc.Canvas
type Vector2 = cc.Vec2

declare interface AssetsMap {
    [key: string]: any;
}

const kWidth = 720;
const kHeight = 1280;

let _instance: UIManager;

/*
* UI控制类 简易化，真是不需要太多东西
*/
export class UIManager {
    private static _chainListObject: Array<{
        viewName: string,
        chain: number,
        transition: MVC.eTransition,
        uiLayer: MVC.eUILayer,
        args: any,
        isclean: boolean
    }> = [];
    private static _curChainViewName: string = null;
    //----------------- 外部接口 --------------------------
    public static Init(): void {
        _instance = new UIManager();
        _instance.initRoot();
    }

    public static get canvas(): Canvas {
        return _instance._canvas;
    }

    // private static m_func2viewTypes: FuncTypeMap = {};
    public static RegisterViewType(funcId: number, viewType: string): void {
        // let existType = UIManager.m_func2viewTypes[funcId];
        // if (existType != null) {
        //     cc.warn("UIManager.RegisterViewType repeated funcId:" + funcId + " " + existType + "->" + viewType);
        // }
        // UIManager.m_func2viewTypes[funcId] = viewType;
    }

    public static Open(
        type: string,
        transition: MVC.eTransition = MVC.eTransition.Default,
        uiLayer: MVC.eUILayer =
            MVC.eUILayer.Panel,
        args: any = null,
        isclean: boolean = true,
        chainNum: number = null): void {
        //cc.error("UIManager.Open:" + type);
        // let viewType = UIManager.m_func2viewTypes[type];
        // if (viewType == null) {
        //     cc.error("UIManager.Open unregistered funcId:" + type);
        //     return;
        // }

        let funIsOpen = FunOpen.getInstance().getFunIsOpen(type);

        console.log("-------- uiLayer name = ")
        console.log(type)

        if (funIsOpen) {
            if (chainNum) {
                this._chainListObject.push({ viewName: type, chain: chainNum, transition: transition, uiLayer: uiLayer, args: args, isclean: isclean });
                // this._chainListObject.push({viewName: "ui/setting/SettingView_IOS", chain: 2, transition: transition, uiLayer: uiLayer,args:args,isclean: isclean});
                // this._chainListObject.push({viewName: "ui/shop/ShopView_IOS", chain: 5, transition: transition, uiLayer: uiLayer,args:args,isclean: isclean});
                // this._chainListObject.push({viewName: "ui/common/GetFreeGold_IOS", chain: 4, transition: transition, uiLayer: uiLayer,args:args,isclean: isclean});
                this._chainListObject.sort((a, b) => {
                    return b.chain - a.chain;
                });
                setTimeout(() => {
                    this.chainOpen();
                }, 1);
            } else {
                _instance.open(type, transition, uiLayer, args, isclean);
            }
        }
    }

    public static chainOpen() {
        if (!this._curChainViewName) {
            if (this._chainListObject.length > 0) {
                let info = this._chainListObject.pop();
                _instance.open(info.viewName, info.transition, info.uiLayer, info.args, info.isclean);
                this._curChainViewName = info.viewName;
            }
        }
    }

    public static Close(type: string): void {
        //cc.error("UIManager.Close:" + type);
        // let viewType = UIManager.m_func2viewTypes[type];
        _instance.close(type);

        // if (viewType == null) {
        //     cc.error("UIManager.Close unregistered funcId:" + type);
        //     return;
        // }
        // _instance.close(viewType);
    }

    public static PreLoadView(assets: string, success?: Function, fail?: Function) {
        _instance.preloadView(assets, success, fail);
    }

    public static CloseQueues(): void {
        _instance.closeQueues();
    }

    public static layerRoots(uiLayer: MVC.eUILayer = MVC.eUILayer.Panel): cc.Node {
        return _instance.getLayerRoots(uiLayer);
    }

    public static getNodeByName(name: string): cc.Node {
        return _instance.getNodeByName(name);
    }
    // public static ChangeParent(parent : cc.Node, index : number = 999) : void {
    //     if (parent == null) {
    //         parent = cc.director.getScene();
    //     }
    //     _instance._root.parent = parent;
    //     _instance._root.position = cc.v2(kWidth / 2, kHeight / 2);
    //     _instance._root.setSiblingIndex(index);
    // }

    //----------------- 内部实现 --------------------------

    private _root: Node;
    private _canvas: Canvas;
    private _camera: cc.Camera;
    private _layerRoots: Node[];
    private _viewNode: any = cc.js.createMap();
    private _views: AssetsMap;
    // private _viewQueues: cc.Node[][];
    private _uiLayer: MVC.eUILayer;
    private _assets: string = "";
    private _assetList: string[];
    private _transition: MVC.eTransition;
    private _counter: number = 0;
    private _countcall: number = 0;
    private constructor() {
        this._views = {};
        // this._viewQueues = [];
        // for (let i = 0; i < MVC.eUIQueue.None; i++) {
        // this._viewQueues[i] = new Array<cc.Node>();
        // }

        MVC.ViewHandler.initUIEvent(this.onOpen.bind(this), this.onClose.bind(this));
    }

    private initRoot(): void {
        this._root = new cc.Node("_UIRoot");
        this._root.parent = cc.director.getScene();
        this._root.width = kWidth;
        this._root.height = kHeight;
        this._root.position = cc.v2(kWidth / 2, kHeight / 2);
        cc.game.addPersistRootNode(this._root);
        this._layerRoots = new Array<Node>();
        for (let i = MVC.eUILayer.Scene; i < MVC.eUILayer.Max; i++) {
            this._layerRoots[i] = this.addSubCanvas(MVC.eUILayer[i]);
        }
    }

    private addSubCanvas(name: string): Node {
        let node = new cc.Node(name + "_Root");
        node.group = "UI";
        node.parent = this._root;
        node.width = kWidth;
        node.height = kHeight;
        node.position = cc.Vec2.ZERO;
        node.rotation = 0;
        node.scale = 1;

        return node;
    }

    private preloadView(asset: string, success?: Function, fail?: Function) {
        if (this._views[asset] == null) { //每次只存在唯一一个同样的视图
            let names = asset.split(`/`);
            MVC.ViewHandler.loadAssetHandler(names[names.length - 1], asset, cc.Prefab, this.onPreLoadCallBack, this, { suc: success, fai: fail });
        }
    }

    private onPreLoadCallBack(name: string, asset: object, assetspath: string, args: any) {
        let prefab: Node = asset as Node;
        if (prefab == null) {
            console.error(".loadCallback GameObject null:" + name);
            this._views[assetspath] = null;
            // let names = assetspath.split(`/`);
            if (args && args.fai) args.fai();
            return;
        }
        let node: Node = cc.instantiate<Node>(prefab);
        this._viewNode[assetspath] = node;
        if (args && args.suc) args.suc();
    }

    private open(asset: string, transition: MVC.eTransition = MVC.eTransition.Default, uiLayer: MVC.eUILayer = MVC.eUILayer.Panel, args: any = null, clean: boolean = true): void {
        let names = asset.split(`/`);
        if (this._views[asset] == null) { //每次只存在唯一一个同样的视图
            this._views[asset] = { asset: asset, args: args, uiLayer: uiLayer, transition: transition, cleanView: clean };
            let name = names[names.length - 1];
            if (this._viewNode[asset] && cc.isValid(this._viewNode[asset])) {
                try {
                    let node = this._viewNode[asset];
                    node.getComponent(name).init(uiLayer, transition, asset, clean);
                    node.setParent(this._layerRoots[uiLayer]);
                    node.group = Const.GroupUI;
                    this._views[asset].node = node;
                    node.getComponent(name).open(this._views[asset].args);
                } catch (error) {
                    AlertManager.showAlert(AlertType.COMMON, { desc: `打开UI ${name}错误` + error, errorcb: args });
                    console.error("error=", error);
                }

                return;
            }
            this._assets = asset;
            this._uiLayer = uiLayer;
            this._transition = transition;
            MVC.ViewHandler.loadAssetHandler(name, asset, cc.Prefab, this.onLoadCallback, this, args);
        } else {
            if (this._views[asset].node) {
                // if (this._views[asset].uiLayer != uiLayer) {
                //     this._views[asset].node.removeFromParent(false);
                //     this._views[asset].node.setParent(this._layerRoots[uiLayer]);
                //     this._views[asset].node.getComponent(names[names.length - 1]).uiLayer = uiLayer;
                // }
                this._views[asset].node.getComponent(names[names.length - 1]).open(args);
            }
            // cc.warn(`assets ${asset} is loading or opened`);
        }
    }

    public getLayerRoots(uiLayer: MVC.eUILayer): cc.Node {
        return this._layerRoots[uiLayer];
    }

    private onLoadCallback(name: string, asset: object, assetspath: string, args: any) {
        let prefab: Node = asset as Node;
        if (prefab == null) {
            console.error(".loadCallback GameObject null:" + name);
            // HD_MODULE.NET.postGameEvent({ event_name: 'LoadViewError', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "LoadViewError" });

            this._views[assetspath] = null;
            let names = assetspath.split(`/`);
            this._countcall++;
            if (this._countcall <= 3)//打开失败连续打开3次
                MVC.ViewHandler.loadAssetHandler(names[names.length - 1], assetspath, cc.Prefab, this.onLoadCallback, this, args);
            return;
        }
        let data = this._views[assetspath];
        let node: Node = cc.instantiate<Node>(prefab);
        try {
            node.getComponent(name).init(data.uiLayer, data.transition, assetspath, data.cleanView);
            node.setParent(this._layerRoots[data.uiLayer]);
            node.group = Const.GroupUI;
            this._views[assetspath].node = node;
            node.getComponent(name).open(this._views[assetspath].args);
        } catch (error) {
            AlertManager.showAlert(AlertType.COMMON, { desc: `打开UI ${name}错误` + error, errorcb: args });
            console.error("error=", error);
        }
        this._countcall = 1;
    }

    private onOpen(view: MVC.BaseView): void {
        // if (view.uiQueue == MVC.eUIQueue.None) {
        //     return;
        // }

        // let viewQueue = this._viewQueues[view.uiQueue];
        // if (viewQueue.length > 0) {
        //     //隐藏队列中的最后一个
        //     let lastView = viewQueue[viewQueue.length - 1];
        //     lastView.hide();
        // }
        // viewQueue.push(view);
    }

    private close(type: string): void {
        let viewinfo = this._views[type];

        if (viewinfo == null) {
            // cc.warn("UIManager.close:" + type + " null");
            return;
        }

        if (viewinfo.node && cc.isValid(viewinfo.node)) {
            viewinfo.node.getComponent(viewinfo.node.name).close();
        }
    }

    private onClose(view: MVC.BaseView, assetpath: string, isclean: boolean): void {
        if (isclean)
            this._views[assetpath] = null;
        // if (view.uiQueue == MVC.eUIQueue.None) {
        //     return;
        // }

        // let viewQueue = this._viewQueues[view.uiQueue];
        // if (viewQueue.length <= 0) {
        //     cc.log("UIManager.onClose:" + view.assetPath + " viewQueue:" + view.uiQueue + " Count < 0");
        //     //closeQueues 会清空队列
        //     return;
        // }
        // let lastView = viewQueue[viewQueue.length - 1];
        // if (lastView != view) {
        //     let suss = viewQueue.remove(view);
        //     if (!suss) {
        //         cc.warn("UIManager.onClose:" + view.assetPath + " can't find, last:" + lastView.assetPath);
        //     }
        //     return;
        // }
        // viewQueue.pop();

        // //恢复上一个界面显示
        // if (viewQueue.length > 0) {
        //     lastView = viewQueue[viewQueue.length - 1];
        //     lastView.show();
        // }
        // cc.log("***** oooooo ******");
        if (assetpath == UIManager._curChainViewName) {
            UIManager._curChainViewName = null;
            UIManager.chainOpen();
        }
    }

    private closeQueues(): void {
        // for (let i = 0; i < this._viewQueues.length; i++) {
        //     if (this._viewQueues[i].length <= 0) {
        //         continue;
        //     }
        //     //需要拷贝出来
        //     let viewQueue = copy(this._viewQueues[i]);
        //     this._viewQueues[i] = new Array<MVC.BaseView>();
        //     for (let j = 0; j < viewQueue.length; j++) {
        //         viewQueue[j].close();
        //     }
        // }
    }

    private getNodeByName(name: string): Node {
        if (this._views[name] && this._views[name].node) {
            return this._views[name].node as Node
        }
    }
}