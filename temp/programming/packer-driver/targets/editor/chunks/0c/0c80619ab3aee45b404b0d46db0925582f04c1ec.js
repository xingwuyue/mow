System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, Prefab, instantiate, EnemyManager, Bullet, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, PlayerCombat;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEnemyManager(extras) {
    _reporterNs.report("EnemyManager", "./EnemyManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBullet(extras) {
    _reporterNs.report("Bullet", "./Bullet", _context.meta, extras);
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
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      EnemyManager = _unresolved_2.EnemyManager;
    }, function (_unresolved_3) {
      Bullet = _unresolved_3.Bullet;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a3a2bMJt79EDYJh2GVd/flE", "PlayerCombat", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerCombat", PlayerCombat = (_dec = ccclass('PlayerCombat'), _dec2 = property({
        tooltip: '血量'
      }), _dec3 = property({
        tooltip: '攻击范围'
      }), _dec4 = property({
        tooltip: '子弹射击间隔'
      }), _dec5 = property({
        tooltip: '单轮子弹数量'
      }), _dec6 = property({
        tooltip: '射击CD'
      }), _dec7 = property({
        type: [Prefab],
        tooltip: '敌人预制体'
      }), _dec8 = property({
        type: Prefab,
        tooltip: '子弹预制体'
      }), _dec9 = property({
        tooltip: '检测敌人间隔'
      }), _dec(_class = (_class2 = class PlayerCombat extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "health", _descriptor, this);

          _initializerDefineProperty(this, "attackRange", _descriptor2, this);

          _initializerDefineProperty(this, "shootInterval", _descriptor3, this);

          _initializerDefineProperty(this, "bulletsPerRound", _descriptor4, this);

          _initializerDefineProperty(this, "shootCooldown", _descriptor5, this);

          _initializerDefineProperty(this, "enemyPrefabs", _descriptor6, this);

          _initializerDefineProperty(this, "bulletPrefab", _descriptor7, this);

          this._isShooting = false;
          this._isInCooldown = false;
          this._currentBullets = 0;
          this._currentTarget = null;

          // 当前目标敌人
          _initializerDefineProperty(this, "checkInterval", _descriptor8, this);
        }

        // 添加受伤方法
        takeDamage(damage) {
          this.health = Math.max(0, this.health - damage);
          console.log(`玩家受伤，当前血量：${this.health}`); // 如果需要，可以在这里添加死亡判断

          if (this.health <= 0) {
            this.node.destroy();
          }
        }

        // 删除这个属性
        // @property({ type: Prefab, tooltip: '血条预制体' })
        // public healthBarPrefab: Prefab;
        onLoad() {
          // 只保留检查敌人的代码
          this.schedule(this._updateNearestEnemy, this.checkInterval); // 删除创建血条的代码
          // const healthBar = instantiate(this.healthBarPrefab);
          // healthBar.parent = this.node;
          // healthBar.setPosition(0, -70, 0);
          // healthBar.addComponent(PlayerHealthBar);
        }

        onDestroy() {
          this.unschedule(this._updateNearestEnemy);
        }

        _updateNearestEnemy() {
          var _this$_currentTarget;

          const nearestEnemy = this._findNearestEnemy(); // 如果当前目标无效或找到更近的目标，则更新目标


          if (!((_this$_currentTarget = this._currentTarget) != null && _this$_currentTarget.isValid) || nearestEnemy && this._isCloserEnemy(nearestEnemy)) {
            this._currentTarget = nearestEnemy;
          } // 有目标且未在射击状态时开始射击


          if (this._currentTarget && !this._isShooting) {
            this.startShooting();
          }
        }

        _isCloserEnemy(newEnemy) {
          const currentPos = this.node.getWorldPosition();
          const currentTargetDist = this._currentTarget ? Vec3.distance(currentPos, this._currentTarget.getWorldPosition()) : Infinity;
          const newEnemyDist = Vec3.distance(currentPos, newEnemy.getWorldPosition());
          return newEnemyDist < currentTargetDist;
        } // 寻找范围内最近的敌人


        _findNearestEnemy() {
          const enemies = (_crd && EnemyManager === void 0 ? (_reportPossibleCrUseOfEnemyManager({
            error: Error()
          }), EnemyManager) : EnemyManager).instance.getEnemies();
          if (!enemies || enemies.length === 0) return null;
          const currentPos = this.node.getWorldPosition();
          let nearestEnemy = null;
          let minDistance = this.attackRange;

          for (const enemy of enemies) {
            if (!enemy.isValid) continue;
            const enemyPos = enemy.getWorldPosition();
            const distance = Vec3.distance(currentPos, enemyPos);

            if (distance <= this.attackRange && (nearestEnemy === null || distance < minDistance)) {
              nearestEnemy = enemy;
              minDistance = distance;
            }
          }

          return nearestEnemy;
        } // 获取当前目标敌人（供其他组件使用）


        getNearestEnemy() {
          var _this$_currentTarget2;

          return (_this$_currentTarget2 = this._currentTarget) != null && _this$_currentTarget2.isValid ? this._currentTarget : null;
        }

        canShoot() {
          var _this$_currentTarget3;

          return !this._isInCooldown && ((_this$_currentTarget3 = this._currentTarget) == null ? void 0 : _this$_currentTarget3.isValid);
        }

        _shootBullet() {
          var _this$_currentTarget4;

          if (this._currentBullets >= this.bulletsPerRound) {
            this._isShooting = false;

            this._startCooldown();

            return;
          }

          if (!((_this$_currentTarget4 = this._currentTarget) != null && _this$_currentTarget4.isValid)) {
            this._isShooting = false;
            return;
          } // 创建子弹


          const bullet = instantiate(this.bulletPrefab);
          bullet.parent = this.node.parent.parent; // 设置为 GameCanvas
          // 设置子弹初始位置和方向

          const currentPos = this.node.getWorldPosition();
          bullet.setWorldPosition(currentPos); // 计算射击方向

          const targetPos = this._currentTarget.getWorldPosition();

          const direction = new Vec3(targetPos.x - currentPos.x, targetPos.y - currentPos.y, 0).normalize(); // 设置子弹旋转

          const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI - 90;
          bullet.angle = angle; // 初始化子弹

          const bulletComp = bullet.getComponent(_crd && Bullet === void 0 ? (_reportPossibleCrUseOfBullet({
            error: Error()
          }), Bullet) : Bullet);

          if (bulletComp) {
            bulletComp.init(direction);
          }

          this._currentBullets++;
          this.scheduleOnce(() => this._shootBullet(), this.shootInterval);
        }

        _checkAndShoot() {
          const enemy = this.getNearestEnemy();

          if (enemy && !this._isShooting) {
            this.startShooting();
          }
        }

        startShooting() {
          if (!this.canShoot()) return;
          this._isShooting = true;
          this._currentBullets = 0;

          this._shootBullet();
        }

        _startCooldown() {
          this._isInCooldown = true;
          this.scheduleOnce(() => this._isInCooldown = false, this.shootCooldown);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "health", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 300;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "attackRange", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 360;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "shootInterval", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.13;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bulletsPerRound", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "shootCooldown", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.6;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "enemyPrefabs", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bulletPrefab", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "checkInterval", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0c80619ab3aee45b404b0d46db0925582f04c1ec.js.map