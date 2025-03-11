import ItemCell, { ItemCellData } from "./ItemCell";
import { ItemData } from "../../common/Common_Define";
import EquipModel from "../../module/equip/EquipModel";
import { Cfg } from "../../config/Cfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemScrollCom extends cc.Component {
    /** 格子预制件 */
    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    /** x间隔 */
    @property(Number)
    spacingX: number = 0;

    /** y间隔 */
    @property(Number)
    spacingY: number = 0;

    /** 
     * 实例化格子个数(要求为列的整数倍！！！！！！！) 
     */
    @property(Number)
    spawnCount: number = 0;

    private _content: cc.Node = null;
    private _items: cc.Node[] = [];
    private _updateTimer: number = 0;
    private _updateInterval: number = 0.05;
    private _lastContentPosY: number = 0;
    private _col: number = 0;
    private _row: number = 0;
    private _itemListData: ItemData[] = [];
    private _lockStateList: { [index: number]: boolean } = {};

    private _clickItemHandler: (itemCell: ItemCell) => any = () => { }

    public onLoad() {
        this._content = this.node.getComponent(cc.ScrollView).content;
        this.initialize();
        this.createCell();
    }
    private showSignState: number = 0;
    public setItemList(itemList: ItemData[], lockStateList?: { [index: number]: boolean }, showTips: number = 0) {
        this._itemListData = itemList;
        this._lockStateList = lockStateList;
        this.showSignState = showTips;
        this.initialize();
        this.hideAllCell();
        for (let i = 0; i < this._items.length; ++i) {
            let itemCellView = this._items[i].getComponent(ItemCell);
            let cellIndex = itemCellView.getIndex();
            let itemInfo = itemList[itemCellView.getIndex()];
            let itemData: ItemCellData = {
                index: cellIndex,
            }
            
            if (itemInfo) {
                itemData = {
                    index: cellIndex,
                    itemID: itemInfo.itemID,
                    itemInstanceID: itemInfo.itemInstanceID,
                    goodsNum: itemInfo.goodsNum,
                    isLock: EquipModel.getInstance.getItemIsLock(itemInfo.itemInstanceID),
                }
                itemCellView.initItem(itemData);
                if (this.showSignState && this.showSignState == 1)
                    itemCellView.checkUpSign();
                else if (this.showSignState && this.showSignState == 2) {
                    itemCellView.checkDownSign();
                }
            } else {
                itemCellView.initItem(itemData);
            }

            // cc.log("***** itemData", itemInfo, i);
            itemCellView.node.active = itemInfo && !!itemInfo.itemID;
        }
    }

    public resetAllSelect() {

    }

    /** 初始化滑动面板 */
    private initialize() {
        let prefabInfo = this.itemPrefab.data;
        let itemCount = this._itemListData.length;
        this._col = Math.floor(this.node.width / (prefabInfo.width + this.spacingX));
        this._row = Math.ceil(itemCount / this._col);
        this._content.height = this._row * (prefabInfo.height + this.spacingY);
    }

    /** 创建格子 */
    private createCell() {
        let prefabInfo = this.itemPrefab.data;
        for (let i = 0; i < this.spawnCount; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            this._content.addChild(item);
            let x = 5 + (-this.node.width * 0.5 + prefabInfo.width * 0.5) + (i % this._col * (prefabInfo.width + this.spacingX));
            let y = - item.height * 0.5 - (Math.floor(i / this._col) * (item.height + this.spacingY));
            item.setPosition(x, y);
            let itemInstance = item.getComponent(ItemCell);
            itemInstance.initItem({
                index: i,
                itemID: 0
            });
            item.active = false;
            this._items.push(item);
        }
    }


    /** 设置点击格子回调 */
    public setClickItemHandler(cb: (itemCell: ItemCell) => any) {
        this._clickItemHandler = cb;
        for (let i = 0; i < this.spawnCount; ++i) {
            this._items[i].getComponent(ItemCell).setClickHandler(this._clickItemHandler.bind(this));
        }
    }

    /** 设置滑动面板高度 */
    public setViewHeight(height: number) {
        this.node.height = height;
        let node = this.node.getChildByName("scrollBg");
        node.height = height;
        cc.find("view", this.node).height = height - 30;
    }

    public setViewBgOpacity(opacity: number) {
        let node = this.node.getChildByName("scrollBg");
        node.opacity = opacity;
    }
    /** 设置格子数据 */
    private setCellData(cellID: number, data: ItemCellData) {
        let cell = this._items[cellID];
        if (cell) {
            let cellInstance = cell.getComponent(ItemCell);
            cellInstance.initItem(data);
            cell.active = true;
        }
    }


    private hideAllCell() {
        this._items.forEach((cell: cc.Node) => {
            cell.active = false;
        });
    }

    /** 刷新格子 */
    public updateCell(cellID: number) {
        let cell = this._items[cellID];
        if (cell) {
            let cellInstance = cell.getComponent(ItemCell);
            cellInstance.onFlush();
        }
    }

    /** 设置格子锁定状态 */
    public setCellLockState(index: number, lockState: boolean) {
        let cell = this.getCellByIndex(index);
        if (cell) {
            cell.initItem({ index: cell.getIndex(), isLock: lockState });
        }
    }

    public setCellSelect(index: number, isselect: boolean) {
        if (this._items[index])
            this._items[index].getComponent(ItemCell).setSelectVisible(isselect);
    }

    private selectList: any = {};
    public setAllSelectState(selectList) {
        this.selectList = selectList;
        for (let i = 0; i < this._items.length; ++i) {
            let itemcell = this._items[i].getComponent(ItemCell)
            itemcell.setSelectVisible(!!this.selectList[itemcell.getItemInstanceID()]);
        }
    }

    /** 根据index获取格子 */
    public getCellByIndex(index: number) {
        let cell: ItemCell = null;
        for (let i = 0; i < this._items.length; ++i) {
            let itemCellView = this._items[i].getComponent(ItemCell);
            if (itemCellView.getIndex() == index) {
                cell = itemCellView;
            }
        }
        return cell;
    }

    /** 获取格子在scrollview里的坐标 */
    private getPositionInView(item: cc.Node) {
        let wPos = item.parent.convertToWorldSpaceAR(item.position);
        let vPos = this.node.convertToNodeSpaceAR(wPos);
        return vPos;
    }

    update(dt: number) {
        this._updateTimer += dt;
        if (this._updateTimer < this._updateInterval) return;
        this._updateTimer = 0;
        let items = this._items;
        let scrollView = this.node.getComponent(cc.ScrollView);
        let isDown = Math.floor(scrollView.content.y) <= this._lastContentPosY;
        let offset = (this.itemPrefab.data.height + this.spacingY) * Math.ceil(this._items.length / this._col);
        for (let i = 0; i < items.length; ++i) {
            let item = items[i];
            let viewPos = this.getPositionInView(item);
            let itemIstance = item.getComponent(ItemCell);
            if (isDown) {
                if (viewPos.y < -this.node.height && item.y + offset <= 0) {
                    item.y = item.y + offset;
                    let cellIndex = itemIstance.getIndex() - items.length;
                    cellIndex = cellIndex <= 0 ? 0 : cellIndex;
                    let itemInfo = this._itemListData[cellIndex];
                    let itemData: ItemCellData = {
                        index: cellIndex,
                    }
                    if (itemInfo) {
                        itemData = {
                            index: cellIndex,
                            itemID: itemInfo.itemID,
                            itemInstanceID: itemInfo.itemInstanceID,
                            goodsNum: itemInfo.goodsNum,
                            isLock: EquipModel.getInstance.getItemIsLock(itemInfo.itemInstanceID),
                        }
                        itemIstance.initItem(itemData);
                        if (this.showSignState && this.showSignState == 1)
                            itemIstance.checkUpSign();
                        else if (this.showSignState && this.showSignState == 2) {
                            itemIstance.checkDownSign();
                            itemIstance.setSelectVisible(!!this.selectList[itemInfo.itemInstanceID]);
                        }
                    } else {
                        itemIstance.initItem(itemData);
                    }

                    item.active = itemInfo && !!itemInfo.itemID;
                }
            } else {
                if (viewPos.y > this.node.height + (0.5 - this.node.anchorY) * this.node.height && item.y - offset >= -scrollView.content.height) {
                    item.y = item.y - offset;
                    let cellIndex = itemIstance.getIndex() + items.length;
                    cellIndex = cellIndex <= 0 ? 0 : cellIndex;
                    let itemInfo = this._itemListData[cellIndex];
                    let itemData: ItemCellData = {
                        index: cellIndex,
                    }
                    if (itemInfo) {
                        itemData = {
                            index: cellIndex,
                            itemID: itemInfo.itemID,
                            itemInstanceID: itemInfo.itemInstanceID,
                            goodsNum: itemInfo.goodsNum,
                            isLock: EquipModel.getInstance.getItemIsLock(itemInfo.itemInstanceID),
                        }
                        itemIstance.initItem(itemData);
                        if (this.showSignState && this.showSignState == 1)
                            itemIstance.checkUpSign();
                        else if (this.showSignState && this.showSignState == 2) {
                            itemIstance.checkDownSign();
                            itemIstance.setSelectVisible(!!this.selectList[itemInfo.itemInstanceID]);
                        }
                    } else {
                        itemIstance.initItem(itemData);
                    }
                    item.active = itemInfo && !!itemInfo.itemID;
                }
            }
        }
        this._lastContentPosY = scrollView.content.y;
    }
}
