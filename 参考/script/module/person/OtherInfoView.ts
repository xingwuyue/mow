import { MVC } from "../../framework/MVC";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { Util } from "../../utils/Util";
import PersonModel from "./PersonModel";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import NetAdapter from "../../adpapter/NetAdapter";
import { Manager } from "../../manager/Manager";
import ItemCell from "../../component/itemscroll/ItemCell";
import { UIRole, UIRoleManager } from "../../component/UIRole";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OtherInfoView extends MVC.BaseView {

    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    toplevel: cc.Label = null;

    @property(cc.Label)
    battleNum: cc.Label = null;

    @property(cc.Prefab)
    itemCell: cc.Prefab = null;

    @property(cc.Node)
    roleDisplay: cc.Node = null;

    /** 装备格子 */
    private _equipCellList: ItemCell[] = [];
    /** 角色展示 */
    private _roleDisplay: UIRole = null;

    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

    private _userVo: any = {};
    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this._userVo = args;
        this.initEquipCell();
        this.initRoleDisplay();
        this.initRoleInfo();
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        UIRoleManager.recycleUIRole(this._roleDisplay);
        Manager.audio.playAudio(501);
    }

    /** 初始化人物装备格子 */
    public initEquipCell() {
        if (this._equipCellList.length == 0) {
            let cellPos = PersonModel.cellPos;
            for (let i = 0; i < 4; ++i) {
                let cell = cc.instantiate(this.itemCell);
                cell.parent = this.node;
                cell.position = cellPos[i];
                Util.adapterNodeY(cell);
                let cellInstance = cell.getComponent(ItemCell);
                cellInstance.setClickHandler((itemCell: ItemCell) => {
                    Manager.audio.playAudio(501);
                    Notifier.send(ListenID.Equip_OpenTipsView, { itemLeftID: itemCell.getItemID() });
                });
                this._equipCellList[i] = cellInstance;
                this.updateEquipCell(i);
            }
        }
    }

    /** 刷新人物装备格子 */
    public updateEquipCell(index: number) {
        let cellInstance = this._equipCellList[index];
        if (cellInstance) {
            let equipID = this._userVo.equipPart[index] || 0;
            let equipLv = this._userVo.equipPartLevel[index] || 0;
            cellInstance.initItem({
                index: index,
                itemID: equipID,
                level: equipLv,
                showItemBG: true,
            });
        }
    }

    /** 初始化角色展示 */
    public initRoleDisplay() {
        UIRoleManager.getUIRole((node) => {
            if (this.roleDisplay && cc.isValid(this.roleDisplay)) {
                this._roleDisplay = new UIRole();
                this._roleDisplay.init(node);
                node.scale = 0.8;
                this.roleDisplay.addChild(node);
                this._roleDisplay.node.y = -10;
            }
        })
    }

    public initRoleInfo() {
        this.nickName.string = this._userVo.nickName || "匿名";
        let chapter = Util.levelToChapterId(this._userVo.topLevel || 1);
        this.toplevel.string = `${chapter[0]}章${chapter[1]}波`;
        this.battleNum.string = this._userVo.battle || 100;
    }
}   
