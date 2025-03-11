import { EntityType } from "./EntityType";


export class BaseGameEntity {
    //唯一id
    private m_ID: number = 0;
    //实体类型
    private m_Type: EntityType;      //类型

    private m_Tag: boolean = false;          //标记

    static m_NextVaildID: number = 1;//自增id

    public SetID(val: number) {
        // if (val && val <= BaseGameEntity.m_NextVaildID) {
        // console.error("error Entity SetID", val);
        // return;
        // }
        this.m_ID = val;
        // BaseGameEntity.m_NextVaildID = val + 1;
    }

    protected m_Position: cc.Vec2;
    protected m_Scale: cc.Vec2;
    protected _node: cc.Node;
    protected m_BoundingRadius: number; //包围盒半径
    /**血量值 */
    protected _allHp: number = 0;
    protected _curHp: number = 0;

    public constructor(ID: number, Entry: EntityType = EntityType.DefauleEntity) {
        this.SetID(ID);
        this.m_BoundingRadius = 0;
        this.m_Scale = cc.v2(1, 1);
        this.m_Type = Entry;
        this.m_Tag = false;
    }

    public get Id() {
        return this.m_ID;
    }

    public Update(dt) {

    }

    public HandleMessage(msg: any) { return false; }

    public static GetNextVaildID() { return this.m_NextVaildID; }

    public static ResetNextVaildID() { BaseGameEntity.m_NextVaildID = 0; }

    public get Pos() { return this.m_Position; };
    public set Pos(newPos: cc.Vec2) { this.m_Position = newPos; this._node && (this._node.position = newPos); }
    public SetPos(newPos: cc.Vec2) { this.m_Position = newPos; this._node && (this._node.position = newPos); }
    public set PosX(x: number) { this.m_Position.x = x; this._node && (this._node.position = this.m_Position); }
    public set PosY(y: number) { this.m_Position.y = y; this._node && (this._node.position = this.m_Position); }
    public get PosX() { return this.m_Position.x; }
    public get PosY() { return this.m_Position.y; }
    public get BRadius() { return this.m_BoundingRadius; }
    public SetBRadius(r: number) {
        this.m_BoundingRadius = r;
    }

    public get isTagged() { return this.m_Tag };
    public UnTag() { this.m_Tag = false; }
    public Tag() {this.m_Tag = true;}
    public get Scale() { return this.m_Scale; };
    public get ScaleX() { return this.m_Scale.x; }
    public get ScaleY() { return this.m_Scale.y; }
    // public SetScale(val:cc.Vec2){this.m_BoundingRadius *=GameMaxOf(val.x, val.y)/GameMaxOf(this.m_Scale.x, this.m_Scale.y); this.m_Scale = val;}
    public SetScale(val: number) {
        this.m_BoundingRadius *= (val / GameMaxOf(this.m_Scale.x, this.m_Scale.y)); this.m_Scale = cc.v2(val, val); this._node && (this._node.scale = val);

    }

    public get EntityType(): EntityType { return this.m_Type };
    public set EntityType(new_type: EntityType) { this.m_Type = new_type; }

    public get node(): cc.Node { return this._node };
    public set node(node: cc.Node) {
        this._node = node;
        if (node && cc.isValid(node)) {
            this.syncNodeInfo()
        }
    }

    public syncNodeInfo() {
        this.SetBRadius(GameMaxOf(this._node.width, this._node.height));
        this.m_Scale.x = this._node.scaleX;
        this.m_Scale.y = this._node.scaleY;
        this.m_Position = this._node.position;
    }

    public get curHp() { return this._curHp; }
    public get allHp() { return this._allHp; }
}
