System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, EnemyManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "20e76k9FpJKCrU/ZXr3ewBH", "EnemyManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("EnemyManager", EnemyManager = (_dec = ccclass('EnemyManager'), _dec2 = property({
        type: Node,
        tooltip: '玩家节点'
      }), _dec(_class = (_class2 = (_class3 = class EnemyManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "playerNode", _descriptor, this);

          this._enemies = [];
        }

        onLoad() {
          EnemyManager.instance = this;
        }

        onDestroy() {
          EnemyManager.instance = null;
        }

        getPlayerNode() {
          return this.playerNode;
        } // 添加获取敌人列表的方法


        getEnemies() {
          // 清理无效的敌人节点
          this._enemies = this._enemies.filter(enemy => enemy && enemy.isValid);
          return this._enemies;
        } // 添加敌人到管理器


        addEnemy(enemy) {
          if (this._enemies.indexOf(enemy) === -1) {
            this._enemies.push(enemy);
          }
        } // 从管理器移除敌人


        removeEnemy(enemy) {
          var index = this._enemies.indexOf(enemy);

          if (index > -1) {
            this._enemies.splice(index, 1);
          }
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5a4d7f57da77d824c84dc27bd05b3ad289bd87b6.js.map