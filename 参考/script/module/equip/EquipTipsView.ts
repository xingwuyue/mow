import EquipTipsCom from "../../component/equiptips/EquipTipsCom";
import { MVC } from "../../framework/MVC";
import { EquipTipsData, EquipTipsType, Guide } from "../../common/Common_Define";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EquipTipsView extends MVC.BaseView {
    /** 通用装备tips预制件 */
    @property(cc.Prefab)
    equipTipsComPrefab: cc.Prefab = null;

    /** 当前装备的装备tips */
    private _curEquipTips: EquipTipsCom = null;
    /** 比较tips */
    private _compareEquipTips: EquipTipsCom = null;

    private _checkGuide: boolean = false;

    changeListener() { }

    onLoad() {
        this._initEquipTipsComView();
    }

    public onOpen(param: EquipTipsData) {
        super.onOpen();
        let tipsType = param.type;
        switch (tipsType){
            case EquipTipsType.Compare: {
                this.initCompareTips(param);
                break;
            }
            case EquipTipsType.Normal: {
                this.initNormalTips(param);
                break;
            }
            default:{
                this.initCompareTips(param);
                break;
            }
        }
        this._checkGuide = param.checkGuide;
    }

    /** 两个tips比较框 */
    public initCompareTips(data: EquipTipsData) {
        let idL = data.itemLeftID;
        let instIDL = data.itemLeftInstanceID;
        let idR = data.itemRightID;
        let instIDR = data.itemRightInstanceID;
        let compareID = idL ? idL : 0;
        if (idL){
            this._curEquipTips.initItemData({ itemID: idL, itemInstanceID: instIDL, isPuted: true });
        }
        if (idR) {
            this._compareEquipTips.initItemData({
                itemID: idR,
                itemInstanceID: instIDR,
                compareID: compareID,
                showButton: true,
                btnEquipHandler: data.btnEquipHandler,
                btnLockHandler: data.btnLockHandler,
            });
        }
        this._curEquipTips.node.position = cc.v2(-163, 498);
        this._compareEquipTips.node.position = cc.v2(163, 498);
        this._curEquipTips.node.active = !!idL;
        this._compareEquipTips.node.active = !!idR;
    }

    openCallBack(){
        // if (this._checkGuide)
            // this._rigisterGuideCheck();
        /** 注册新手引导 */
        this.scheduleOnce(() => {
            this._rigisterGuideCheck();
        }, 0.2);
    }

    /** 正常单个比较框 */
    public initNormalTips(data: EquipTipsData){
        let itemID = 0;
        let insID = 0;
        if (data.itemLeftID){
            itemID = data.itemLeftID;
            insID = data.itemLeftInstanceID;
        }else{
            itemID = data.itemRightID;
            insID = data.itemRightInstanceID;
        }
        let pos = data.pos;
        this._curEquipTips.node.active = !!itemID;
        this._compareEquipTips.node.active = false;
        this._curEquipTips.initItemData({
            itemID: itemID,
            itemInstanceID: insID,
            hideAttachProperty: !!data.isHideAttach,
            compareID: data.compareID
        });

        /** 相对位置 */
        let comparePosNode = data.comparePosNode;
        if (comparePosNode){
            let wPos = comparePosNode.parent.convertToWorldSpaceAR(comparePosNode.position);
            let lPos = this.node.convertToNodeSpaceAR(wPos);
            let x = lPos.x - 210;
            if (lPos.x < 0) {
                x = lPos.x + 210;
            }
            this._curEquipTips.node.position = cc.v2(x, lPos.y + 70);
        }
        if (pos){
            this._curEquipTips.node.position = pos;
        }
    }

    private _initEquipTipsComView() {
        if (!this._curEquipTips) {
            this._curEquipTips = cc.instantiate(this.equipTipsComPrefab).getComponent(EquipTipsCom);
            this.node.addChild(this._curEquipTips.node);
            this._curEquipTips.node.position = cc.v2(-163, 498);
            this._curEquipTips.setImgPutedIsShow(true);
        }
        if (!this._compareEquipTips) {
            this._compareEquipTips = cc.instantiate(this.equipTipsComPrefab).getComponent(EquipTipsCom);
            this.node.addChild(this._compareEquipTips.node);
            this._compareEquipTips.node.position = cc.v2(163, 498);
        }
    }

    private _rigisterGuideCheck(){
        let btnHolds = this._compareEquipTips.getBtnHolds();
        for(let i = 0; i < 4; ++i){
            let guideData: Guide.GuideItemData = {
                node: btnHolds.node,
                tag: 10002 + i * 100,
                tagLayer:this.uiLayer,
                callBack: () => {
                    this._compareEquipTips.onBtnPutClick();
                }
            }
            Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);
        }

        // let btnHolds = this._compareEquipTips.getBtnHolds();
        // for (let i = 0; i < 4; ++i) {
        // let guideData: Guide.GuideItemData = {
        //     node: btnHolds.node,
        //     tag: 10202,
        //     tagLayer: this.uiLayer,
        //     callBack: () => {
        //         this._compareEquipTips.onBtnPutClick();
        //     }
        // }
        // Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);
        
        Notifier.send(ListenID.Guide_Check_Condition);
        // }
    }

    onNormalClose(){
        this.onClose(true);
    }

    onClose(closeGuide: boolean) {
        super.onClose({ closeGuide: closeGuide});
    }
}
