System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, instantiate, find, PlayerHealth, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, HealthManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerHealth(extras) {
    _reporterNs.report("PlayerHealth", "./PlayerHealth", _context.meta, extras);
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
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      find = _cc.find;
    }, function (_unresolved_2) {
      PlayerHealth = _unresolved_2.PlayerHealth;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5c9e429zjVLbZU3XkDzC4zN", "HealthManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'Canvas', 'find']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HealthManager", HealthManager = (_dec = ccclass('HealthManager'), _dec2 = property({
        type: Prefab,
        tooltip: '血条预制体'
      }), _dec(_class = (_class2 = class HealthManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "healthPrefab", _descriptor, this);
        }

        onLoad() {
          this.initializeHealthBars();
        }

        initializeHealthBars() {
          if (!this.healthPrefab) {
            console.error('Health prefab is not set!');
            return;
          } // 获取 Canvas 节点


          const canvas = find('GameCanvas');

          if (!canvas) {
            console.error('Cannot find GameCanvas node!');
            return;
          } // 遍历所有士兵节点（001-008）


          for (let i = 1; i <= 8; i++) {
            const soldierName = i < 10 ? `00${i}` : `0${i}`;
            const soldier = this.node.getChildByName(soldierName);

            if (soldier) {
              // 创建血条实例
              const healthBar = instantiate(this.healthPrefab);
              canvas.addChild(healthBar); // 初始化血条

              const healthComp = healthBar.getComponent(_crd && PlayerHealth === void 0 ? (_reportPossibleCrUseOfPlayerHealth({
                error: Error()
              }), PlayerHealth) : PlayerHealth);

              if (healthComp) {
                healthComp.init(soldier);
              }
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "healthPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=69a135908bb74624cc8f836f23e639ff92706a9c.js.map