System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, CCFloat, UITransform, Rect, instantiate, Prefab, Enemy, HitEffect, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, Bullet;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEnemy(extras) {
    _reporterNs.report("Enemy", "./Enemy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHitEffect(extras) {
    _reporterNs.report("HitEffect", "./HitEffect", _context.meta, extras);
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
      CCFloat = _cc.CCFloat;
      UITransform = _cc.UITransform;
      Rect = _cc.Rect;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      Enemy = _unresolved_2.Enemy;
    }, function (_unresolved_3) {
      HitEffect = _unresolved_3.HitEffect;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "00d47joJpxKBpjVzuEIN+d2", "Bullet", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'CCFloat', 'BoxCollider2D', 'Collider2D', 'Contact2DType', 'IPhysics2DContact', 'UITransform', 'Rect', 'instantiate', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Bullet", Bullet = (_dec = ccclass('Bullet'), _dec2 = property({
        type: CCFloat,
        tooltip: '子弹伤害'
      }), _dec3 = property({
        type: CCFloat,
        tooltip: '子弹飞行速度'
      }), _dec4 = property({
        type: CCFloat,
        tooltip: '子弹销毁时间(秒)'
      }), _dec5 = property({
        type: Prefab,
        tooltip: '击中特效预制体'
      }), _dec(_class = (_class2 = class Bullet extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "damage", _descriptor, this);

          _initializerDefineProperty(this, "speed", _descriptor2, this);

          // 增加速度使子弹更快
          _initializerDefineProperty(this, "lifeTime", _descriptor3, this);

          this._direction = new Vec3();
          this._spawnTime = 0;
          this._transform = null;

          _initializerDefineProperty(this, "hitEffectPrefab", _descriptor4, this);
        }

        // 简化为只接收方向向量
        init(direction) {
          this._direction = direction;
          this._spawnTime = Date.now();
        }

        onLoad() {
          // 获取 UITransform 组件
          this._transform = this.getComponent(UITransform);

          if (!this._transform) {
            this._transform = this.addComponent(UITransform);
          } // 设置子弹的尺寸


          this._transform.setContentSize(20, 20);
        }

        update(deltaTime) {
          if (Date.now() - this._spawnTime > this.lifeTime * 1000) {
            this.node.destroy();
            return;
          } // 增加移动速度


          const moveAmount = this.speed * deltaTime * 2; // 将速度翻倍

          const currentPos = this.node.position;
          const newPos = new Vec3(currentPos.x + this._direction.x * moveAmount, currentPos.y + this._direction.y * moveAmount, 0);
          this.node.setPosition(newPos);
          this.checkCollision();
        }

        checkCollision() {
          var _this$node$parent;

          if (!this._transform) return;
          const bulletPos = this.node.worldPosition;
          const bulletBBox = new Rect(bulletPos.x - 15, bulletPos.y - 15, 30, 30);
          const enemies = ((_this$node$parent = this.node.parent) == null ? void 0 : _this$node$parent.getComponentsInChildren(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
            error: Error()
          }), Enemy) : Enemy)) || [];

          for (const enemy of enemies) {
            if (enemy.isDead()) continue;
            const enemyNode = enemy.node;
            const enemyPos = enemyNode.worldPosition;
            const enemyBBox = new Rect(enemyPos.x - 25, enemyPos.y - 25, 50, 50);

            if (bulletBBox.intersects(enemyBBox)) {
              // 创建击中特效
              if (this.hitEffectPrefab) {
                const effect = instantiate(this.hitEffectPrefab);
                effect.parent = this.node.parent;
                const effectPos = new Vec3(bulletPos.x, bulletPos.y, 0);
                effect.setWorldPosition(effectPos); // 添加特效控制组件

                effect.addComponent(_crd && HitEffect === void 0 ? (_reportPossibleCrUseOfHitEffect({
                  error: Error()
                }), HitEffect) : HitEffect);
              }

              enemy.takeDamage(this.damage);
              this.node.destroy();
              break;
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "damage", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 500;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "hitEffectPrefab", [_dec5], {
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
//# sourceMappingURL=b4631aa424650f2c18a9c42143098807457ae514.js.map