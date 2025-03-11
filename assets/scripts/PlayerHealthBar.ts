import { _decorator, Component, Node, ProgressBar, Vec3 } from 'cc';
import { PlayerCombat } from './PlayerCombat';
const { ccclass, property } = _decorator;

@ccclass('PlayerHealthBar')
export class PlayerHealthBar extends Component {
    private _progressBar: ProgressBar;
    private _playerCombat: PlayerCombat;
    private _maxHealth: number;

    start() {
        this._progressBar = this.getComponentInChildren(ProgressBar);
        
        // 获取父节点（Player）上的 PlayerCombat 组件
        const playerNode = this.node.parent;
        if (playerNode) {
            // 获取带有 PlayerCombat 组件的子节点
            const combatNodes = playerNode.children.filter(child => child.getComponent(PlayerCombat));
            if (combatNodes.length > 0) {
                this._playerCombat = combatNodes[0].getComponent(PlayerCombat);
                this._maxHealth = this._playerCombat.health;
                
                // 设置血条位置，与 PlayerCombat 节点保持相同的 Y 轴偏移
                const yOffset = -70;
                this.node.setPosition(0, yOffset, 0);
            }
        }
    }

    update() {
        if (this._playerCombat && this._progressBar) {
            const currentHealth = this._playerCombat.health;
            this._progressBar.progress = currentHealth / this._maxHealth;
        }
    }
}