import { MVC } from "../../framework/MVC";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameVoManager } from "../../manager/GameVoManager";
import MemberModel from "./MemberModel";
import { Time } from "../../framework/Time";
import { AlertManager } from "../../alert/AlertManager";
import { Cfg } from "../../config/Cfg";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import MemberView from "./MemberView";

let orderIDList = {};
let isBuy = false;

export default class MemberController extends MVC.BaseController {
    private static _instance: MemberController = null;
    static getInstance() {
        if (!this._instance) {
            this._instance = new MemberController();
        }
        return this._instance;
    }
    static get instance() {
        return this.getInstance();
    }

    private _data: MemberModel = new MemberModel();
    private _menuUIIsShow: boolean = false;
    constructor() {
        super("MemberController");
        MemberController._instance = this;
        this.changeListener(true);

    }

    getData() {
        return this._data;
    }

    changeListener(bool: true) {
        Notifier.changeListener(bool, ListenID.SecondDay, this._onSecondDay, this);
        Notifier.changeListener(bool, ListenID.Menu_Open, this._onOpenMenuCallBack, this);
        Notifier.changeListener(bool, ListenID.checkGun, this.updateWeaponlist, this);
        Notifier.changeListener(bool, ListenID.IAPSuccess, this.onIAPSuccessCallBack, this);
        Notifier.changeListener(bool, ListenID.IAPSuccessAndConfirm, this.iapSucAndConfirm, this);
        Notifier.changeListener(bool, ListenID.VerIAPOrder, this.verOrderIdList, this);
        Notifier.changeListener(bool, ListenID.Login_User, this._onOpenMenuCallBack, this);
        // Notifier.changeListener(bool, ListenID.IAPSuccess, this.onbudan, this);        
    }
    getView(): MemberView {
        let view: MemberView = null;
        let viewNode = UIManager.getNodeByName(Common_UIPath.MemberUI);
        if (viewNode) {
            view = viewNode.getComponent(MemberView);
        }
        return view;
    }

    closeView() {
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Close(Common_UIPath.MemberUI);
    }

    private _onOpenMenuCallBack() {
        this._menuUIIsShow = true;
        this._onCheckMemberReward();
    }

    private _onSecondDay() {
        let userData = GameVoManager.getInstance.myUserVo;
        let memberEndTime = userData.member.memberEndTime;
        Time.getServetTime().then((timeMs: number) => {
            let serverTime = timeMs;
            // let serverTime = Date.now();
            let rewardTime = userData.member.rewardTime;
            let validTime = serverTime > memberEndTime ? memberEndTime : serverTime;
            let timeDt = validTime - rewardTime;
            if (timeDt > 0) {
                let rewardDay = Math.floor(timeDt / 86400 / 1000);
                this._setReward(1 + rewardDay).then(() => {
                    if (this._menuUIIsShow)
                        this._onCheckMemberReward();
                });
            }
        });
    }

    private _onCheckMemberReward() {
        let userData = GameVoManager.getInstance.myUserVo;

        let isMember = GameVoManager.getInstance.getIsMember();
        let diamond = userData.member.diamond;
        let videoDoubleNum = userData.member.video;
        let reliveNoAdventNum = userData.member.relive;
        let memberEndTime = userData.member.memberEndTime;
        let memberStartTime = userData.member.memberStartTime;

        this._data.setIsMember(isMember);
        this._data.setDiamondNum(diamond);
        this._data.setVideoDoubleNum(videoDoubleNum);
        this._data.setReliveNoAdventNum(reliveNoAdventNum);
        this._data.setMemberStartTime(memberStartTime);
        this._data.setMemberEndTime(memberEndTime);
        if (diamond > 0 && false) {
            UIManager.Open(Common_UIPath.MemberRewardView, MVC.eTransition.Scale, MVC.eUILayer.Tips);
        } else {
            UIManager.Close(Common_UIPath.MemberRewardView);
        }
    }

    private _setReward(day: number): Promise<any> {
        return new Promise((resolve) => {
            let gameVO = GameVoManager.getInstance;
            let userData = gameVO.myUserVo;
            let addReward = () => {
                userData.member.diamond += day * 100;
                userData.member.relive = 0;
                userData.member.video = 9999;
            }


            Time.getServetTime().then((timeMs: number) => {
                // userData.member.memberEndTime = isMember ? endTime + monthTime : timeMs + monthTime;
                addReward();
                resolve();
                gameVO.saveData();
            });
        });
    }

    private _addMemberTime(): Promise<any> {
        return new Promise((resolve) => {
            let gameVO = GameVoManager.getInstance;
            let userData = gameVO.myUserVo;
            let isMember = GameVoManager.getInstance.getIsMember();
            let endTime = userData.member.memberEndTime;
            let monthTime = 86400 * 30 * 1000;
            Time.getServetTime().then((timeMs: number) => {
                userData.member.memberEndTime = isMember ? endTime + monthTime : timeMs + monthTime;
                gameVO.saveData();
                resolve();
            });
        })
    }

    public onBuyMemberSuc(): Promise<any> {
        return new Promise((resolve) => {
            let self = this;
            Time.getServetTime().then((timeMs: number) => {
                self._setReward(1).then(() => {
                    GameVoManager.getInstance.myUserVo.member.memberStartTime = timeMs;
                    self._addMemberTime().then(() => {
                        self._onCheckMemberReward();
                        self.updateWeaponlist();
                        let view = self.getView();
                        view && view.onFlush();
                        resolve();
                    });
                    // GameVoManager.getInstance.saveData().then(() => {
                    //     resolve(); 
                    // });
                });
            });
        });
    }

    public getMemberWeapon() {
        let idList: number[] = [];
        Cfg.Weapon.forEach(obj => {
            if (obj.unlockWay[0] == 8) {
                idList.push(obj.id);
            }
        })
        return idList;
    }

    public updateWeaponlist() {
        console.log('updateWaponlist', GameVoManager.getInstance.getIsMember())
        if (!GameVoManager.getInstance.getIsMember()) return;
        let list = this.getMemberWeapon();
        let memberIdArr = [];
        list.forEach(id => {
            if (!GameVoManager.getInstance.myUserVo.weaponList[id]) {
                GameVoManager.getInstance.myUserVo.weaponList[id] = [0, 0, 0];
            }
            memberIdArr.push[id];
        })
        Notifier.send(ListenID.Shop_UnLock, [], memberIdArr);
    }

    public onReward() {
        Time.getServetTime().then((timeMs: number) => {
            let gameVo = GameVoManager.getInstance;
            let userData = gameVo.myUserVo;
            let diamond = this._data.getDiamondNum();
            let serverTime = timeMs;

            GameVoManager.getInstance.setDiamond(diamond);
            AlertManager.showNormalTips("钻石x" + diamond);
            userData.member.diamond = 0;
            userData.member.rewardTime = serverTime;
            gameVo.saveData();
            UIManager.Close(Common_UIPath.MemberRewardView);
        }).catch(() => {
            UIManager.Close(Common_UIPath.MemberRewardView);
            AlertManager.showNormalTips("服务器时间错误,请重启游戏");
        });
    }

    public updateView() {
        let node = UIManager.getNodeByName(Common_UIPath.MemberUI);
        if (node) {
            let view = node.getComponent(MemberView);
            view && view.onFlush();
        }
    }

    //内购成功
    public onIAPSuccessCallBack(data: { orderID: string, success: Function }) {
        // if(!data) return;
        // if(data.id == "com.qnmady.coxo" || data.id == "com.songeo.woagd"){
        let sucFun: any = () => { };
        let orderID = ``;
        // let sucFun = data ? (data.success ? data.success : () => {}) : () => {};
        if (data) {
            if (data.success) {
                sucFun = data.success;
            }
            orderID = data.orderID;
        }
        if (!orderIDList[orderID]) {
            orderIDList[orderID] = orderID;
            this.onBuyMemberSuc().then(() => {
                this.updateView();
                sucFun();
            });
        }
        // }
    }

    onbudan() {
        this.onBuyMemberSuc().then(() => {
            this.updateView();
        });
    }

    public verOrderIdList() {

    }

    public iapSucAndConfirm(data: { id: string }) {
        let userIAPOrderList = GameVoManager.getInstance.getIAPOrderList();
        userIAPOrderList[data.id] = 1;

        // MemberController.getInstance().onBuyMemberSuc().then(() => {

        // });
    }
}
