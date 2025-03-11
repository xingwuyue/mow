System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, CCFloat, BoxCollider2D, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, Enemy;

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
      Vec3 = _cc.Vec3;
      CCFloat = _cc.CCFloat;
      BoxCollider2D = _cc.BoxCollider2D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8c1dbzIRUtA14Y6LXvEswQf", "Enemy", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'CCFloat', 'BoxCollider2D', 'Contact2DType', 'Collider2D', 'IPhysics2DContact']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Enemy", Enemy = (_dec = ccclass('Enemy'), _dec2 = property({
        type: CCFloat,
        tooltip: '碰撞半径'
      }), _dec3 = property({
        type: CCFloat,
        tooltip: '敌人血量'
      }), _dec4 = property({
        type: CCFloat,
        tooltip: '敌人移动速度'
      }), _dec5 = property({
        type: CCFloat,
        tooltip: '敌人攻击力'
      }), _dec6 = property({
        type: CCFloat,
        tooltip: '敌人攻击范围'
      }), _dec7 = property({
        type: CCFloat,
        tooltip: '敌人攻击角度(度)'
      }), _dec8 = property({
        type: CCFloat,
        tooltip: '敌人攻击间隔(秒)'
      }), _dec9 = property({
        type: CCFloat,
        tooltip: '避障检测半径'
      }), _dec10 = property({
        type: CCFloat,
        tooltip: '避障力度'
      }), _dec(_class = (_class2 = class Enemy extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "collisionRadius", _descriptor, this);

          _initializerDefineProperty(this, "health", _descriptor2, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor3, this);

          _initializerDefineProperty(this, "attackPower", _descriptor4, this);

          _initializerDefineProperty(this, "attackRange", _descriptor5, this);

          _initializerDefineProperty(this, "attackAngle", _descriptor6, this);

          _initializerDefineProperty(this, "attackInterval", _descriptor7, this);

          this.target = null;
          this.isElite = false;
          this._lastAttackTime = 0;
          this._isDead = false;
          this._deathTime = 0;

          _initializerDefineProperty(this, "avoidanceRadius", _descriptor8, this);

          _initializerDefineProperty(this, "avoidanceForce", _descriptor9, this);
        }

        update(deltaTime) {
          if (this._isDead) {
            this.node.destroy();
            return;
          }

          if (!this.target) return;
          var targetPos = this.target.worldPosition;
          var myPos = this.node.worldPosition; // 计算朝向目标的基础方向

          var baseDirection = Vec3.subtract(new Vec3(), targetPos, myPos).normalize(); // 获取避障力并大幅降低其影响

          var avoidanceForce = this.calculateAvoidanceForce();
          avoidanceForce.multiplyScalar(0.1); // 将避障力降低到很小
          // 增加基础方向的权重

          baseDirection.multiplyScalar(2.0); // 加强追踪力度
          // 合并方向，确保基础方向占主导

          var direction = Vec3.add(new Vec3(), baseDirection, avoidanceForce).normalize();
          var distance = Vec3.distance(targetPos, myPos);
          var angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
          this.node.angle = angle - 90; // 只要不在攻击范围内就持续移动

          if (distance > this.attackRange) {
            var moveAmount = this.moveSpeed * deltaTime;
            var newPos = new Vec3(myPos.x + direction.x * moveAmount, myPos.y + direction.y * moveAmount, 0);
            this.node.setWorldPosition(newPos);
          } else {
            // 在攻击范围内时尝试攻击
            this.tryAttack();
          }
        }

        calculateAvoidanceForce() {
          var _this$node$parent;

          var avoidanceForce = new Vec3();
          var myPos = this.node.worldPosition;
          var enemies = ((_this$node$parent = this.node.parent) == null ? void 0 : _this$node$parent.getComponentsInChildren(Enemy)) || [];

          for (var enemy of enemies) {
            if (enemy === this || enemy.isDead()) continue;
            var enemyPos = enemy.node.worldPosition;
            var distance = Vec3.distance(myPos, enemyPos);

            if (distance < this.avoidanceRadius && distance > 0) {
              var away = Vec3.subtract(new Vec3(), myPos, enemyPos).normalize();
              var force = (this.avoidanceRadius - distance) / this.avoidanceRadius;
              away.multiplyScalar(force * this.avoidanceForce);
              avoidanceForce.add(away);
            }
          }

          return avoidanceForce;
        }

        tryAttack() {
          var now = Date.now();

          if (now - this._lastAttackTime >= this.attackInterval * 1000) {
            this.attack();
            this._lastAttackTime = now;
          }
        }

        attack() {
          if (!this.target) return;
          var targetPos = this.target.worldPosition;
          var myPos = this.node.worldPosition;
          var direction = Vec3.subtract(new Vec3(), targetPos, myPos);
          var angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI; // 检查目标是否在攻击角度范围内

          var halfAngle = this.attackAngle / 2;
          var currentAngle = (angle + 360) % 360;
          var forwardAngle = (this.node.angle + 360) % 360;
          var angleDiff = Math.abs(currentAngle - forwardAngle);

          if (angleDiff <= halfAngle || angleDiff >= 360 - halfAngle) {
            // 在攻击角度内，造成伤害
            console.log('Enemy attacking!'); // TODO: 调用玩家受伤方法
          }
        }

        takeDamage(damage) {
          if (this._isDead) return;
          this.health -= damage;

          if (this.health <= 0) {
            this._isDead = true;
            this._deathTime = Date.now(); // 可以在这里添加死亡动画或效果
          }
        } // 精英怪设置


        setElite() {
          if (this.isElite) {
            this.health *= 2;
            this.attackPower *= 1.5;
            this.moveSpeed *= 0.8; // TODO: 可以在这里设置精英怪的外观
          }
        }

        isDead() {
          return this._isDead;
        }

        onLoad() {
          var _this$node$parent2;

          console.log('Enemy onLoad - 节点信息:', {
            name: this.node.name,
            position: this.node.position,
            parent: (_this$node$parent2 = this.node.parent) == null ? void 0 : _this$node$parent2.name,
            active: this.node.active
          });
          var collider = this.getComponent(BoxCollider2D);

          if (collider) {
            collider.enabled = true; // 设置敌人的碰撞组为3（ENEMY组）
            //collider.group = 3;

            collider.sensor = false;
          }
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          console.log('Enemy collision detected with:', otherCollider.node.name);
        }

        onDeath() {
          // 立即销毁敌人节点
          this.node.destroy();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "collisionRadius", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "health", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "attackPower", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "attackRange", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "attackAngle", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "attackInterval", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.8;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "avoidanceRadius", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 40;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "avoidanceForce", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=65afc9f92a92678e68467d2acf62ac580bc4e508.js.map