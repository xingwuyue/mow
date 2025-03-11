
export class DecorateItem {

    private decorateNode: cc.Node = null;
    private colliderMap = {};
    public constructor(node: cc.Node) {
        this.resetNode(node);

    }
    
    resetNode(node: cc.Node) {
        this.decorateNode = node;
        let len = this.decorateNode.childrenCount;
        this.colliderMap = {}
        for (let i = 0; i < len; i++) {
            this.decorateNode.children[i].colliderComponent = this;
            this.colliderMap[this.decorateNode.children[i].name] = 0;
        }
    }

    /**
         * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
         * @param  {Collider} other 产生碰撞的另一个碰撞组件
         * @param  {Collider} self  产生碰撞的自身的碰撞组件
         */
    public onCollisionStay(other, self: cc.Collider) {
    }

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionExit(other: cc.Collider, self: cc.Collider) {
        this.colliderMap[self.node.name]--;
        if (this.colliderMap[self.node.name] <= 0) {
            self.node.opacity = 255;
        }
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionEnter(other, self) {
        if (!this.colliderMap[self.node.name]) {
            this.colliderMap[self.node.name] = 0;
        }
        this.colliderMap[self.node.name]++;
        if (this.colliderMap[self.node.name] > 0) {
            self.node.opacity = 125;
        }
    }
}
