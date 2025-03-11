System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, Collider2D, Contact2DType, Sprite, instantiate, Prefab, Vec2, CircleCollider2D, PhysicsSystem2D, Enemy, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, Bullet;

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
      Vec3 = _cc.Vec3;
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
      Sprite = _cc.Sprite;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      Vec2 = _cc.Vec2;
      CircleCollider2D = _cc.CircleCollider2D;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
    }, function (_unresolved_2) {
      Enemy = _unresolved_2.Enemy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2fb9e0xoihN/a5BiERZnSLu", "Bullet", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Collider2D', 'Contact2DType', 'IPhysics2DContact', 'Sprite', 'instantiate', 'Prefab', 'Vec2', 'physics', 'Rect', 'CircleCollider2D', 'PhysicsSystem2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Bullet", Bullet = (_dec = ccclass('Bullet'), _dec2 = property({
        type: Prefab,
        tooltip: '命中特效预制体'
      }), _dec3 = property({
        tooltip: '子弹速度'
      }), _dec4 = property({
        tooltip: '子弹伤害'
      }), _dec5 = property({
        tooltip: '销毁时间'
      }), _dec(_class = (_class2 = class Bullet extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "hitEffectPrefab", _descriptor, this);

          _initializerDefineProperty(this, "speed", _descriptor2, this);

          _initializerDefineProperty(this, "damage", _descriptor3, this);

          _initializerDefineProperty(this, "lifeTime", _descriptor4, this);

          this._direction = new Vec3();
        }

        init(direction) {
          this._direction.set(direction);
        }

        update(deltaTime) {
          // 每帧更新子弹位置
          const moveAmount = this.speed * deltaTime;
          const currentPos = this.node.getPosition();
          this.node.setPosition(currentPos.x + this._direction.x * moveAmount, currentPos.y + this._direction.y * moveAmount, currentPos.z); // 使用圆形检测敌人

          const collider = this.getComponent(CircleCollider2D);

          if (collider) {
            const point = new Vec2(currentPos.x, currentPos.y);
            const results = PhysicsSystem2D.instance.testPoint(point);

            for (const result of results) {
              if (result.group === 4) {
                const enemy = result.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
                  error: Error()
                }), Enemy) : Enemy);

                if (enemy) {
                  enemy.takeDamage(this.damage); // 创建命中特效

                  if (this.hitEffectPrefab) {
                    var _hitEffect$getCompone;

                    const hitEffect = instantiate(this.hitEffectPrefab);
                    hitEffect.parent = this.node.parent;
                    hitEffect.setWorldPosition(enemy.node.getWorldPosition());
                    (_hitEffect$getCompone = hitEffect.getComponent(Sprite)) == null || _hitEffect$getCompone.scheduleOnce(() => {
                      hitEffect.destroy();
                    }, 2);
                  }

                  this.node.destroy();
                  break;
                }
              }
            }
          }
        }

        start() {
          // 初始化碰撞体
          const collider = this.getComponent(Collider2D);

          if (collider) {
            collider.enabled = true;
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onBeginContact, this);
          } // 确保物理系统已启用


          if (!PhysicsSystem2D.instance.enable) {
            PhysicsSystem2D.instance.enable = true;
          } // 自动销毁


          this.scheduleOnce(() => this.node.destroy(), this.lifeTime);
        }

        onDestroy() {
          const collider = this.getComponent(Collider2D);

          if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.off(Contact2DType.PRE_SOLVE, this.onBeginContact, this);
          }
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          // 只对敌人产生反应
          if (otherCollider.group === 4) {
            const enemy = otherCollider.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
              error: Error()
            }), Enemy) : Enemy);

            if (enemy) {
              // 对敌人造成伤害
              enemy.takeDamage(this.damage); // 创建命中特效

              if (this.hitEffectPrefab) {
                const hitEffect = instantiate(this.hitEffectPrefab);
                hitEffect.parent = this.node.parent;
                hitEffect.setWorldPosition(enemy.node.getWorldPosition()); // 2秒后销毁特效

                hitEffect.getComponent(Sprite).scheduleOnce(() => {
                  hitEffect.destroy();
                }, 0.3);
              }
            } // 销毁子弹


            this.node.destroy();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hitEffectPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 500;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damage", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 100;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7d0040e7a6ab8e92d3682c20b9f7364f19b4ccbf.js.map