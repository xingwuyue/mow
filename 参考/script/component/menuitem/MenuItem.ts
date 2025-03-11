const {ccclass, property} = cc._decorator;

interface ItemListData {
    [index: number]: ItemData
}

interface ItemData {
    index: number,
    spFrame: cc.SpriteFrame
}

let ITEM_HEIGHT = 80;//每个菜单高度

/**
 * 通用菜单栏
 */
@ccclass
export default class MenuItem extends cc.Component {
    /** 菜单底框 */
    @property(cc.Sprite)
    imgBG: cc.Sprite = null;

    /** 选择底框 */
    @property(cc.Sprite)
    imgChoose: cc.Sprite = null;

    /** 菜单栏数据 */
    private _itemListData: ItemListData = {};
    /** 菜单标题 */
    private _spIndexTable: { [key: number]: cc.Sprite} = {};
    /** 点击回调 */
    private _clickHandler: (clickIndex: number) => any = (clickIndex: number) => {};
    /** 当前选择index */
    private _curSelIndex: number = 0;

    public start(){
        this.onFlush();
    }

    /** 增加菜单 */
    public addMenuItem(data: ItemData) {
        if (!data) return;
        this._itemListData[data.index] = data;
        this._updateMenuItem(data.index);
    }

    /** 设置菜单位置 */
    public setMenuPosition(pos: cc.Vec2){
        this.imgBG.node.position = pos;
    }

    /** 设置点击回调 */
    public setClickCallBack(cb: (clickIndex: number) => any){
        this._clickHandler = cb;
    }

    /** 设置点击Idex */
    public setClickIndex(index: number){
        this._curSelIndex = index;
        this._clickHandler(index);
        this.onFlush(`click`);
    }

    public onClickCallBack(e: cc.Touch){
        let touchPos = e.getLocation();
        let localInMenuPos = this.imgBG.node.convertToNodeSpaceAR(touchPos);
        let clickIndex = Math.floor(Math.abs(localInMenuPos.y / ITEM_HEIGHT));
        if (this._curSelIndex == clickIndex) return;
        this.setClickIndex(clickIndex);
    }

    public onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this.updateImgChoose();
                break;
            }
            case `click`: {
                this.updateImgChoose();
                break;
            }
        }
    }

    /** 更新菜单 */
    private _updateMenuItem(index: number) {
        let lenght = Object.keys(this._itemListData).length;
        let itemInfo = this._itemListData[index];
        if (!itemInfo) return;
        this.imgBG.node.height = lenght * ITEM_HEIGHT;
        let sprite = this._spIndexTable[index];
        if (!sprite) {
            sprite = (new cc.Node()).addComponent(cc.Sprite);
            this._spIndexTable[index] = sprite;
            sprite.node.parent = this.imgBG.node;
            sprite.node.y = - ITEM_HEIGHT / 2 - index * ITEM_HEIGHT;
        }
        sprite.spriteFrame = itemInfo.spFrame;
    }

    public updateImgChoose(){
        if(this.imgChoose){
            this.imgChoose.node.active = this._curSelIndex >= 0;
            this.imgChoose.node.y = -this._curSelIndex * ITEM_HEIGHT;
        }
    }

    public showView(){
        this.node.active = true;
    }

    public hideView(){
        this.onClose();
    }

    /** 关闭界面回调 */
    public onClose(): void {
        this.node.active = false;
    }
}
