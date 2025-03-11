System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, Vec3, CCFloat, instantiate, Enemy, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEnemy(extras) {
    _reporterNs.report("Enemy", "./Enemy", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Vec3 = _cc.Vec3;
      CCFloat = _cc.CCFloat;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      Enemy = _unresolved_2.Enemy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "124a3TvJmBKS7USNOfxi5lF", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'Vec3', 'CCFloat', 'instantiate', 'Sprite', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property({
        type: Node,
        tooltip: '玩家节点'
      }), _dec3 = property({
        type: Prefab,
        tooltip: '普通敌人预制体'
      }), _dec4 = property({
        type: Prefab,
        tooltip: '精英敌人预制体'
      }), _dec5 = property({
        type: CCFloat,
        tooltip: '初始化刷怪数量'
      }), _dec6 = property({
        type: CCFloat,
        tooltip: '刷怪最小半径'
      }), _dec7 = property({
        type: CCFloat,
        tooltip: '刷怪最大半径'
      }), _dec8 = property({
        type: CCFloat,
        tooltip: '刷怪频率(秒)'
      }), _dec9 = property({
        type: CCFloat,
        tooltip: '刷怪上限'
      }), _dec10 = property({
        type: CCFloat,
        tooltip: '精英怪出现概率(%)'
      }), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "player", _descriptor, this);

          _initializerDefineProperty(this, "normalEnemyPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "eliteEnemyPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "initialSpawnCount", _descriptor4, this);

          _initializerDefineProperty(this, "minSpawnRadius", _descriptor5, this);

          _initializerDefineProperty(this, "maxSpawnRadius", _descriptor6, this);

          _initializerDefineProperty(this, "spawnInterval", _descriptor7, this);

          _initializerDefineProperty(this, "maxEnemies", _descriptor8, this);

          _initializerDefineProperty(this, "eliteRate", _descriptor9, this);

          this._gameStartTime = 0;
          this._lastSpawnTime = 0;
          this._spawnedPositions = [];
          this._activeEnemies = new Set();
        }

        onLoad() {
          var _this$node$parent;

          // 获取地图节点
          var mapNode = (_this$node$parent = this.node.parent) == null ? void 0 : _this$node$parent.getChildByName('map');

          if (mapNode) {
            // 将地图设置为最底层
            mapNode.setSiblingIndex(0); // 设置 z 轴位置确保在最底下

            mapNode.setPosition(mapNode.position.x, mapNode.position.y, -1);
          }

          this._gameStartTime = Date.now();
          this._lastSpawnTime = this._gameStartTime;
          this.spawnInitialEnemies();
        }

        update() {
          var now = Date.now();

          if (now - this._lastSpawnTime >= this.spawnInterval * 1000) {
            this.trySpawnEnemies();
            this._lastSpawnTime = now;
          } // 清理无效敌人


          this._activeEnemies.forEach(enemy => {
            if (!enemy.isValid) {
              this._activeEnemies.delete(enemy);
            }
          });
        }

        spawnInitialEnemies() {
          for (var i = 0; i < this.initialSpawnCount; i++) {
            this.spawnSingleEnemy();
          }
        }

        trySpawnEnemies() {
          if (this._activeEnemies.size >= this.maxEnemies) {
            return;
          }

          this.spawnSingleEnemy();
        }

        spawnSingleEnemy() {
          if (!this.player || !this.normalEnemyPrefab) return;
          var isElite = Math.random() * 100 < this.eliteRate;
          var prefab = isElite && this.eliteEnemyPrefab ? this.eliteEnemyPrefab : this.normalEnemyPrefab;
          var spawnPos = this.getValidSpawnPosition();
          if (!spawnPos) return;
          var enemy = instantiate(prefab);
          enemy.parent = this.node;
          enemy.setWorldPosition(spawnPos);
          var enemyComp = enemy.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
            error: Error()
          }), Enemy) : Enemy);

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

        getValidSpawnPosition() {
          if (!this.player) return null;
          var playerPos = this.player.worldPosition;
          var maxAttempts = 10;

          for (var i = 0; i < maxAttempts; i++) {
            var angle = Math.random() * Math.PI * 2;
            var distance = Math.random() * (this.maxSpawnRadius - this.minSpawnRadius) + this.minSpawnRadius;
            var x = playerPos.x + Math.cos(angle) * distance;
            var y = playerPos.y + Math.sin(angle) * distance;
            var pos = new Vec3(x, y, 0);

            if (this.isValidSpawnPosition(pos)) {
              return pos;
            }
          }

          return null;
        }

        isValidSpawnPosition(pos) {
          var minDistance = 50;

          for (var spawnedPos of this._spawnedPositions) {
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "normalEnemyPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "eliteEnemyPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "initialSpawnCount", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "minSpawnRadius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "maxSpawnRadius", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spawnInterval", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maxEnemies", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "eliteRate", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=298fb58f15c0c62e5ae8feef2d1cc8c91b4bd98f.js.map