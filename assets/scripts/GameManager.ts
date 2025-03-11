import { _decorator, Component, Node, Prefab, Vec3, CCFloat, instantiate, Sprite, Color } from 'cc';
import { Enemy } from './Enemy';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Node, tooltip: '玩家节点' })
    public player: Node | null = null;

    @property({ type: Prefab, tooltip: '普通敌人预制体' })
    public normalEnemyPrefab: Prefab | null = null;

    @property({ type: Prefab, tooltip: '精英敌人预制体' })
    public eliteEnemyPrefab: Prefab | null = null;

    @property({ type: CCFloat, tooltip: '初始化刷怪数量' })
    public initialSpawnCount: number = 20;

    @property({ type: CCFloat, tooltip: '刷怪最小半径' })
    public minSpawnRadius: number = 200;

    @property({ type: CCFloat, tooltip: '刷怪最大半径' })
    public maxSpawnRadius: number = 500;

    @property({ type: CCFloat, tooltip: '刷怪频率(秒)' })
    public spawnInterval: number = 10;

    @property({ type: CCFloat, tooltip: '刷怪上限' })
    public maxEnemies: number = 100;

    @property({ type: CCFloat, tooltip: '精英怪出现概率(%)' })
    public eliteRate: number = 10;

    private _gameStartTime: number = 0;
    private _lastSpawnTime: number = 0;
    private _spawnedPositions: Vec3[] = [];
    private _activeEnemies: Set<Node> = new Set();

    onLoad() {
        // 获取地图节点
        const mapNode = this.node.parent?.getChildByName('map');
        if (mapNode) {
            // 将地图设置为最底层
            mapNode.setSiblingIndex(0);
            // 设置 z 轴位置确保在最底下
            mapNode.setPosition(mapNode.position.x, mapNode.position.y, -1);
        }
    
        this._gameStartTime = Date.now();
        this._lastSpawnTime = this._gameStartTime;
        this.spawnInitialEnemies();
    }

    update() {
        const now = Date.now();
        if (now - this._lastSpawnTime >= this.spawnInterval * 1000) {
            this.trySpawnEnemies();
            this._lastSpawnTime = now;
        }

        // 清理无效敌人
        this._activeEnemies.forEach(enemy => {
            if (!enemy.isValid) {
                this._activeEnemies.delete(enemy);
            }
        });
    }

    private spawnInitialEnemies() {
        for (let i = 0; i < this.initialSpawnCount; i++) {
            this.spawnSingleEnemy();
        }
    }

    private trySpawnEnemies() {
        if (this._activeEnemies.size >= this.maxEnemies) {
            return;
        }
        this.spawnSingleEnemy();
    }

    private spawnSingleEnemy() {
        if (!this.player || !this.normalEnemyPrefab) return;

        const isElite = Math.random() * 100 < this.eliteRate;
        const prefab = isElite && this.eliteEnemyPrefab ? this.eliteEnemyPrefab : this.normalEnemyPrefab;

        const spawnPos = this.getValidSpawnPosition();
        if (!spawnPos) return;

        const enemy = instantiate(prefab);
        enemy.parent = this.node;
        enemy.setWorldPosition(spawnPos);

        const enemyComp = enemy.getComponent(Enemy);
        if (enemyComp) {
            enemyComp.target = this.player;
            enemyComp.isElite = isElite;
            if (isElite) {
                enemyComp.setElite();
            }
        }

        this._spawnedPositions.push(spawnPos);
        this._activeEnemies.add(enemy);
    }

    private getValidSpawnPosition(): Vec3 | null {
        if (!this.player) return null;

        const playerPos = this.player.worldPosition;
        const maxAttempts = 10;

        for (let i = 0; i < maxAttempts; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (this.maxSpawnRadius - this.minSpawnRadius) + this.minSpawnRadius;
            const x = playerPos.x + Math.cos(angle) * distance;
            const y = playerPos.y + Math.sin(angle) * distance;
            const pos = new Vec3(x, y, 0);

            if (this.isValidSpawnPosition(pos)) {
                return pos;
            }
        }
        return null;
    }

    private isValidSpawnPosition(pos: Vec3): boolean {
        const minDistance = 50;
        for (const spawnedPos of this._spawnedPositions) {
            if (Vec3.distance(pos, spawnedPos) < minDistance) {
                return false;
            }
        }
        return true;
    }

    onDestroy() {
        this._activeEnemies.clear();
        this._spawnedPositions = [];
    }
}