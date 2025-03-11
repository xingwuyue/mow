System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, CircleCollider2D, Contact2DType, RigidBody2D, ERigidBody2DType, EnemyManager, PlayerCombat, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, Enemy;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEnemyManager(extras) {
    _reporterNs.report("EnemyManager", "./EnemyManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerCombat(extras) {
    _reporterNs.report("PlayerCombat", "./PlayerCombat", _context.meta, extras);
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
      CircleCollider2D = _cc.CircleCollider2D;
      Contact2DType = _cc.Contact2DType;
      RigidBody2D = _cc.RigidBody2D;
      ERigidBody2DType = _cc.ERigidBody2DType;
    }, function (_unresolved_2) {
      EnemyManager = _unresolved_2.EnemyManager;
    }, function (_unresolved_3) {
      PlayerCombat = _unresolved_3.PlayerCombat;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0c8d1H2b+hOEZstQs+AVZ6R", "Enemy", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'CircleCollider2D', 'Contact2DType', 'Collider2D', 'IPhysics2DContact', 'RigidBody2D', 'Vec2', 'ERigidBody2DType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Enemy", Enemy = (_dec = ccclass('Enemy'), _dec2 = property({
        tooltip: '血量'
      }), _dec3 = property({
        tooltip: '移动速度'
      }), _dec4 = property({
        tooltip: '攻击力'
      }), _dec5 = property({
        tooltip: '攻击间隔(秒)'
      }), _dec6 = property({
        tooltip: '安全距离'
      }), _dec(_class = (_class2 = class Enemy extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "maxHealth", _descriptor, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor2, this);

          _initializerDefineProperty(this, "attackPower", _descriptor3, this);

          _initializerDefineProperty(this, "attackInterval", _descriptor4, this);

          _initializerDefineProperty(this, "_safeDistance", _descriptor5, this);

          this._isAttacking = false;
          this._canAttack = true;
          this._currentDirection = new Vec3();
          this._collider = null;
          this._currentHealth = 0;
          this._isColliding = false;
          this._playerCombat = null;
        }

        onLoad() {
          this._collider = this.getComponent(CircleCollider2D);

          if (this._collider) {
            this._collider.group = 4;
            this._collider.enabled = true;
            this._collider.sensor = true; // 设置为传感器，不参与物理模拟

            this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

            this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);

            this._safeDistance = this._collider.radius * 2;
          } // 设置刚体属性


          var rigidbody = this.getComponent(RigidBody2D);

          if (rigidbody) {
            rigidbody.type = ERigidBody2DType.Dynamic;
            rigidbody.fixedRotation = true; // 防止旋转

            rigidbody.linearDamping = 0; // 没有阻尼

            rigidbody.gravityScale = 0; // 无重力

            rigidbody.enabledContactListener = true;
          } // 添加到 EnemyManager


          (_crd && EnemyManager === void 0 ? (_reportPossibleCrUseOfEnemyManager({
            error: Error()
          }), EnemyManager) : EnemyManager).instance.addEnemy(this.node); // 初始化血量

          this._currentHealth = this.maxHealth; // 获取玩家的 PlayerCombat 组件

          var playerNode = (_crd && EnemyManager === void 0 ? (_reportPossibleCrUseOfEnemyManager({
            error: Error()
          }), EnemyManager) : EnemyManager).instance.getPlayerNode();

          if (playerNode) {
            this._playerCombat = playerNode.getComponent(_crd && PlayerCombat === void 0 ? (_reportPossibleCrUseOfPlayerCombat({
              error: Error()
            }), PlayerCombat) : PlayerCombat);
          }
        }

        onDestroy() {
          if (this._collider) {
            this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

            this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
          } // 从 EnemyManager 移除


          if ((_crd && EnemyManager === void 0 ? (_reportPossibleCrUseOfEnemyManager({
            error: Error()
          }), EnemyManager) : EnemyManager).instance) {
            (_crd && EnemyManager === void 0 ? (_reportPossibleCrUseOfEnemyManager({
              error: Error()
            }), EnemyManager) : EnemyManager).instance.removeEnemy(this.node);
          }
        }

        update(dt) {
          var startTime = performance.now();
          var playerNode = (_crd && EnemyManager === void 0 ? (_reportPossibleCrUseOfEnemyManager({
            error: Error()
          }), EnemyManager) : EnemyManager).instance.getPlayerNode();
          if (!playerNode || this._isColliding) return;
          var currentPos = this.node.getWorldPosition();
          var targetPos = playerNode.worldPosition;
          Vec3.subtract(this._currentDirection, targetPos, currentPos);

          this._currentDirection.normalize(); // 更新旋转


          var angle = Math.atan2(this._currentDirection.y, this._currentDirection.x);
          this.node.angle = angle * 180 / Math.PI + 90 + 180; // 平滑移动

          var moveAmount = this.moveSpeed * dt;
          var newPos = new Vec3(currentPos.x + this._currentDirection.x * moveAmount, currentPos.y + this._currentDirection.y * moveAmount, currentPos.z);
          this.node.setWorldPosition(newPos);
          var endTime = performance.now(); //console.log(`Update time: ${endTime - startTime}ms`);
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          // 检查碰撞对象是否有 PlayerCombat 组件
          var playerCombat = otherCollider.node.getComponent(_crd && PlayerCombat === void 0 ? (_reportPossibleCrUseOfPlayerCombat({
            error: Error()
          }), PlayerCombat) : PlayerCombat);

          if (playerCombat) {
            this._isColliding = true;

            if (this._canAttack) {
              this.attack(playerCombat); // 将 playerCombat 传递给 attack 方法
            }
          }
        }

        onEndContact(selfCollider, otherCollider, contact) {
          if (otherCollider.node.getComponent('PlayerCombat')) {
            this._isColliding = false;
          }
        }

        attack(playerCombat) {
          this._canAttack = false; // 直接对玩家造成伤害

          playerCombat.takeDamage(this.attackPower);
          console.log("Enemy attacked player, damage: " + this.attackPower); // 攻击间隔后重置攻击状态

          this.scheduleOnce(() => {
            this._canAttack = true; // 检查玩家是否仍在碰撞范围内

            if (this._isColliding && playerCombat.node.isValid) {
              this.attack(playerCombat);
            }
          }, this.attackInterval);
        }

        takeDamage(damage) {
          this._currentHealth -= damage;

          if (this._currentHealth <= 0) {
            this.node.destroy();
          }
        } // 获取当前血量百分比（用于血条显示）


        getHealthPercent() {
          return this._currentHealth / this.maxHealth;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "maxHealth", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 250;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "attackPower", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 25;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "attackInterval", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_safeDistance", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fbf2dc89621cc8a17d7096c61e44b1332881100f.js.map