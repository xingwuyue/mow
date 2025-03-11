System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, PlayerCombat, PlayerMovement, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, PlayerRotation;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerCombat(extras) {
    _reporterNs.report("PlayerCombat", "./PlayerCombat", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerMovement(extras) {
    _reporterNs.report("PlayerMovement", "./PlayerMovement", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      PlayerCombat = _unresolved_2.PlayerCombat;
    }, function (_unresolved_3) {
      PlayerMovement = _unresolved_3.PlayerMovement;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "af03bNvxx5Gq4pf6jMnfXVp", "PlayerRotation", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerRotation", PlayerRotation = (_dec = ccclass('PlayerRotation'), _dec2 = property({
        tooltip: '转向速度'
      }), _dec(_class = (_class2 = class PlayerRotation extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "rotationSpeed", _descriptor, this);

          this._combat = null;
          this._movement = null;
        }

        start() {
          this._combat = this.node.getComponent(_crd && PlayerCombat === void 0 ? (_reportPossibleCrUseOfPlayerCombat({
            error: Error()
          }), PlayerCombat) : PlayerCombat);
          this._movement = this.node.parent.getComponent(_crd && PlayerMovement === void 0 ? (_reportPossibleCrUseOfPlayerMovement({
            error: Error()
          }), PlayerMovement) : PlayerMovement);
        }

        update(deltaTime) {
          const nearestEnemy = this._combat.getNearestEnemy();

          if (nearestEnemy) {
            this._rotateTowards(nearestEnemy.worldPosition);
          } else if (this._movement.isMoving()) {
            this._rotateTowardsMovement();
          }
        }

        _rotateTowardsMovement() {
          const moveDir = this._movement.getMoveDirection();

          if (!moveDir) return; // 计算移动方向的角度

          const angle = Math.atan2(moveDir.y, moveDir.x) * 180 / Math.PI - 90; // 设置节点旋转

          this.node.angle = angle;
        }

        _rotateTowards(targetPos) {
          const currentPos = this.node.getWorldPosition();
          const direction = new Vec3(targetPos.x - currentPos.x, targetPos.y - currentPos.y, 0); // 计算目标角度

          const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI - 90; // 设置节点旋转

          this.node.angle = angle;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rotationSpeed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1000;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2912cc4bc46501a32d50f53cb26900aac7c62070.js.map