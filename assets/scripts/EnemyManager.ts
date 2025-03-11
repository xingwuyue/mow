import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property({ type: Node, tooltip: '玩家节点' })
    public playerNode: Node = null;

    public static instance: EnemyManager = null;

    private _enemies: Node[] = [];

    onLoad() {
        EnemyManager.instance = this;
    }

    onDestroy() {
        EnemyManager.instance = null;
    }

    public getPlayerNode(): Node {
        return this.playerNode;
    }

    // 添加获取敌人列表的方法
    public getEnemies(): Node[] {
        // 清理无效的敌人节点
        this._enemies = this._enemies.filter(enemy => enemy && enemy.isValid);
        return this._enemies;
    }

    // 添加敌人到管理器
    public addEnemy(enemy: Node) {
        if (this._enemies.indexOf(enemy) === -1) {
            this._enemies.push(enemy);
        }
    }

    // 从管理器移除敌人
    public removeEnemy(enemy: Node) {
        const index = this._enemies.indexOf(enemy);
        if (index > -1) {
            this._enemies.splice(index, 1);
        }
    }
}