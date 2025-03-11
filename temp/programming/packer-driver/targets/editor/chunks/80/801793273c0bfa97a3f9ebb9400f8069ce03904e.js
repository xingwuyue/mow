System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec2, Vec3, Input, input, CircleCollider2D, RigidBody2D, ERigidBody2DType, Contact2DType, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, PlayerMovement;

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
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
      Input = _cc.Input;
      input = _cc.input;
      CircleCollider2D = _cc.CircleCollider2D;
      RigidBody2D = _cc.RigidBody2D;
      ERigidBody2DType = _cc.ERigidBody2DType;
      Contact2DType = _cc.Contact2DType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "09e4dUPbBNH/IF1akoJ79el", "PlayerMovement", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec2', 'Vec3', 'EventTouch', 'Input', 'input', 'CircleCollider2D', 'RigidBody2D', 'ERigidBody2DType', 'Contact2DType', 'Collider2D', 'IPhysics2DContact']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerMovement", PlayerMovement = (_dec = ccclass('PlayerMovement'), _dec2 = property({
        tooltip: '移动速度'
      }), _dec3 = property({
        tooltip: '触控停止范围区间'
      }), _dec(_class = (_class2 = class PlayerMovement extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "moveSpeed", _descriptor, this);

          _initializerDefineProperty(this, "stopDistance", _descriptor2, this);

          this.MAP_BOUNDS = {
            minX: -1666.5,
            maxX: 1666.5,
            minY: -2222,
            maxY: 2222
          };
          this._moveDirection = new Vec3();
          this._isMoving = false;
          this._collider = null;
          this._blockedDirections = [];
        }

        onEnable() {
          input.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        }

        onDisable() {
          input.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
          input.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        }

        _onTouchStart(event) {
          const touchPos = event.getUILocation();

          this._moveDirection.set(0, 0, 0);

          this._isMoving = false;
        }

        _onTouchMove(event) {
          const touchPos = event.getUILocation();
          const delta = new Vec2(touchPos.x - event.getStartLocation().x, touchPos.y - event.getStartLocation().y);
          const distance = delta.length();

          if (distance <= this.stopDistance) {
            this._isMoving = false;
            return;
          }

          delta.normalize();

          this._moveDirection.set(delta.x, delta.y, 0);

          this._isMoving = true;
        }

        _onTouchEnd() {
          this._isMoving = false;
        }

        update(deltaTime) {
          if (!this._isMoving) return;
          const currentPos = this.node.getWorldPosition();
          const moveStep = this.moveSpeed * deltaTime; // 检查是否被阻挡，如果被阻挡则计算可移动的分量

          const moveVec = new Vec2(this._moveDirection.x, this._moveDirection.y);

          for (const blockedDir of this._blockedDirections) {
            const dot = Vec2.dot(moveVec, blockedDir);

            if (dot > 0.7) {
              // 调整阈值，使碰撞更自然
              // 计算平行于碰撞面的移动分量
              const parallel = new Vec2(-blockedDir.y, blockedDir.x);
              const parallelDot = Vec2.dot(moveVec, parallel); // 更新移动方向为平行分量

              this._moveDirection.x = parallel.x * parallelDot;
              this._moveDirection.y = parallel.y * parallelDot;

              this._moveDirection.normalize();

              break; // 只处理最主要的碰撞
            }
          } // 计算新位置并限制边界


          const newPos = new Vec3(Math.max(this.MAP_BOUNDS.minX, Math.min(this.MAP_BOUNDS.maxX, currentPos.x + this._moveDirection.x * moveStep)), Math.max(this.MAP_BOUNDS.minY, Math.min(this.MAP_BOUNDS.maxY, currentPos.y + this._moveDirection.y * moveStep)), currentPos.z);
          this.node.setWorldPosition(newPos);
        }

        onLoad() {
          // 获取子节点的碰撞体组件
          this._collider = this.node.getComponentInChildren(CircleCollider2D);

          if (this._collider) {
            this._collider.group = 2;
            this._collider.sensor = false;
            this._collider.enabled = true;
            this._collider.radius = 30; // 减小碰撞半径

            this._collider.friction = 0; // 减少摩擦力

            this._collider.restitution = 0; // 没有弹性

            this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

            this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          } // 获取刚体组件


          const rigidbody = this.getComponent(RigidBody2D);

          if (rigidbody) {
            rigidbody.enabledContactListener = true;
            rigidbody.fixedRotation = true;
            rigidbody.type = ERigidBody2DType.Dynamic;
            rigidbody.gravityScale = 0;
            rigidbody.linearDamping = 0;
          }
        }

        onDestroy() {
          if (this._collider) {
            this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

            this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
          }
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          if (otherCollider.node.getComponent('Enemy')) {
            const currentPos = this.node.getWorldPosition();
            const enemyPos = otherCollider.node.getWorldPosition(); // 计算碰撞方向

            const direction = new Vec2(enemyPos.x - currentPos.x, enemyPos.y - currentPos.y).normalize();

            this._blockedDirections.push(direction);
          }
        }

        onEndContact(selfCollider, otherCollider, contact) {
          if (otherCollider.node.getComponent('Enemy')) {
            this._blockedDirections = [];
          }
        }

        isMoving() {
          return this._isMoving;
        }

        getMoveDirection() {
          return this._moveDirection;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 300;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stopDistance", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=801793273c0bfa97a3f9ebb9400f8069ce03904e.js.map