System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, Camera, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, CameraController;

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
      Vec3 = _cc.Vec3;
      Camera = _cc.Camera;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ddd1akn30JGsIS2RHRecIeK", "CameraController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Camera']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CameraController", CameraController = (_dec = ccclass('CameraController'), _dec2 = property({
        type: Node,
        tooltip: '要跟随的目标'
      }), _dec3 = property({
        type: Node,
        tooltip: '血条节点'
      }), _dec4 = property({
        tooltip: '相机跟随速度'
      }), _dec(_class = (_class2 = class CameraController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "target", _descriptor, this);

          _initializerDefineProperty(this, "healthBar", _descriptor2, this);

          _initializerDefineProperty(this, "followSpeed", _descriptor3, this);

          this._camera = null;
          this._currentPos = new Vec3();
          this._targetPos = new Vec3();
          this._healthBarOffset = new Vec3(0, -70, 0);
        }

        // 血条偏移量
        start() {
          this._camera = this.getComponent(Camera);

          if (this.target) {
            var pos = this.target.worldPosition;

            this._currentPos.set(pos.x, pos.y, 1000);

            this.node.setWorldPosition(this._currentPos);
          }
        }

        lateUpdate(deltaTime) {
          if (!this.target) return; // 获取目标的世界坐标

          var targetWorldPos = this.target.worldPosition;

          this._targetPos.set(targetWorldPos.x, targetWorldPos.y, 1000); // 使用线性插值实现平滑跟随


          Vec3.lerp(this._currentPos, this._currentPos, this._targetPos, this.followSpeed * deltaTime);
          this.node.setWorldPosition(this._currentPos); // 更新血条位置

          if (this.healthBar) {
            var healthBarPos = new Vec3();
            Vec3.add(healthBarPos, targetWorldPos, this._healthBarOffset);
            this.healthBar.setWorldPosition(healthBarPos);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "healthBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "followSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5.0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2c947e136b10ae9a7968d9811275a0eab35ddca4.js.map