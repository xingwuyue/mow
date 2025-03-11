System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ProgressBar, Camera, view, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, PlayerHealth;

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
      ProgressBar = _cc.ProgressBar;
      Camera = _cc.Camera;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ff3a9y9wDpAv6PH4k5KiiL9", "PlayerHealth", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'ProgressBar', 'Vec3', 'Camera', 'UITransform', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerHealth", PlayerHealth = (_dec = ccclass('PlayerHealth'), _dec2 = property({
        tooltip: '最大血量'
      }), _dec3 = property(ProgressBar), _dec4 = property({
        tooltip: '血条偏移Y轴距离'
      }), _dec(_class = (_class2 = class PlayerHealth extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "maxHp", _descriptor, this);

          _initializerDefineProperty(this, "hpBar", _descriptor2, this);

          _initializerDefineProperty(this, "offsetY", _descriptor3, this);

          this._currentHp = 0;
          this._targetNode = null;
        }

        onLoad() {
          this._currentHp = this.maxHp;

          if (this.hpBar) {
            this.hpBar.progress = 1;
          }
        }

        init(targetNode) {
          this._targetNode = targetNode; // 初始化位置

          this.updatePosition();
        }

        updatePosition() {
          if (!this._targetNode) return; // 获取目标节点的世界坐标

          var worldPos = this._targetNode.worldPosition; // 获取主相机

          var mainCamera = this.node.scene.getComponentInChildren(Camera);
          if (!mainCamera) return; // 获取屏幕尺寸

          var visibleSize = view.getVisibleSize(); // 将世界坐标转换为屏幕坐标

          var screenPos = mainCamera.convertToUINode(worldPos, this.node.parent); // 设置血条位置

          this.node.setPosition(screenPos.x, screenPos.y + this.offsetY, 0);
        }

        takeDamage(damage) {
          this._currentHp = Math.max(0, this._currentHp - damage);

          if (this.hpBar) {
            this.hpBar.progress = this._currentHp / this.maxHp;
          }

          if (this._currentHp <= 0) {
            this.die();
          }
        }

        die() {
          this.node.destroy();

          if (this._targetNode) {
            this._targetNode.destroy();
          }
        }

        lateUpdate() {
          this.updatePosition();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "maxHp", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "hpBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "offsetY", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -70;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=12d684e4cdc262875e72ce81e087737ba7aacaaa.js.map