System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec2, Vec3, input, Input, CCFloat, Graphics, Color, Prefab, instantiate, Camera, Bullet, Enemy, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _crd, ccclass, property, PlayerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBullet(extras) {
    _reporterNs.report("Bullet", "./Bullet", _context.meta, extras);
  }

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
      Node = _cc.Node;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
      input = _cc.input;
      Input = _cc.Input;
      CCFloat = _cc.CCFloat;
      Graphics = _cc.Graphics;
      Color = _cc.Color;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Camera = _cc.Camera;
    }, function (_unresolved_2) {
      Bullet = _unresolved_2.Bullet;
    }, function (_unresolved_3) {
      Enemy = _unresolved_3.Enemy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "86cb6EBToNEZIyCcFGLtXR3", "PlayerController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec2', 'Vec3', 'input', 'Input', 'EventTouch', 'CCFloat', 'Graphics', 'Color', 'Prefab', 'instantiate', 'Camera', 'CCBoolean']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerController", PlayerController = (_dec = ccclass('PlayerController'), _dec2 = property({
        type: CCFloat,
        tooltip: '停止距离阈值'
      }), _dec3 = property({
        type: CCFloat,
        tooltip: '角色移动速度 (单位/秒)'
      }), _dec4 = property({
        type: CCFloat,
        tooltip: '角色旋转速度 (度/秒)'
      }), _dec5 = property({
        type: CCFloat,
        tooltip: '角色血量'
      }), _dec6 = property({
        type: CCFloat,
        tooltip: '攻击范围'
      }), _dec7 = property({
        type: CCFloat,
        tooltip: '射击频率(秒)'
      }), _dec8 = property({
        type: CCFloat,
        tooltip: '弹夹容量'
      }), _dec9 = property({
        type: CCFloat,
        tooltip: '换弹时长(秒)'
      }), _dec10 = property({
        type: Prefab,
        tooltip: '子弹预制体'
      }), _dec11 = property({
        type: CCFloat,
        tooltip: '接触检测范围'
      }), _dec12 = property({
        type: [Prefab],
        tooltip: '敌人预制体列表'
      }), _dec13 = property({
        tooltip: '是否启用调试模式'
      }), _dec14 = property({
        type: Graphics
      }), _dec15 = property({
        type: CCFloat,
        tooltip: '地图边界宽度'
      }), _dec16 = property({
        type: CCFloat,
        tooltip: '地图边界高度'
      }), _dec(_class = (_class2 = class PlayerController extends Component {
        constructor(...args) {
          super(...args);

          // 移动相关属性
          _initializerDefineProperty(this, "stopDistance", _descriptor, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor2, this);

          _initializerDefineProperty(this, "rotationSpeed", _descriptor3, this);

          // 战斗相关属性
          _initializerDefineProperty(this, "health", _descriptor4, this);

          _initializerDefineProperty(this, "attackRange", _descriptor5, this);

          _initializerDefineProperty(this, "shootInterval", _descriptor6, this);

          _initializerDefineProperty(this, "maxAmmo", _descriptor7, this);

          _initializerDefineProperty(this, "reloadTime", _descriptor8, this);

          _initializerDefineProperty(this, "bulletPrefab", _descriptor9, this);

          _initializerDefineProperty(this, "contactRadius", _descriptor10, this);

          _initializerDefineProperty(this, "enemyPrefabs", _descriptor11, this);

          _initializerDefineProperty(this, "debugMode", _descriptor12, this);

          _initializerDefineProperty(this, "_attackRangeGraphics", _descriptor13, this);

          // 私有属性
          this._isReloading = false;
          this._lastShootTime = 0;
          this._currentAmmo = 10;
          this._nearestEnemy = null;
          this._isTouching = false;
          this._touchPos = new Vec2();
          this._targetAngle = 0;
          this._currentAngle = 0;
          this._moveDirection = new Vec3();
          this._debugGraphics = null;

          _initializerDefineProperty(this, "mapWidth", _descriptor14, this);

          _initializerDefineProperty(this, "mapHeight", _descriptor15, this);
        }

        onLoad() {
          try {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
            input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

            if (this.debugMode) {
              this._debugGraphics = this.getComponent(Graphics);

              if (!this._debugGraphics) {
                this._debugGraphics = this.addComponent(Graphics);
              }
            }

            this._attackRangeGraphics = this.getComponent(Graphics);

            if (!this._attackRangeGraphics) {
              const graphicsNode = new Node('AttackRangeGraphics');
              graphicsNode.parent = this.node;
              this._attackRangeGraphics = graphicsNode.addComponent(Graphics);
              this._attackRangeGraphics.strokeColor = new Color(255, 0, 0, 255);
              this._attackRangeGraphics.lineWidth = 2;
            }
          } catch (error) {
            console.error('PlayerController 初始化失败:', error);
          }
        }

        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        update(deltaTime) {
          this.handleMovementAndRotation(deltaTime);
          this.handleCombat(deltaTime);
          this.handleDebugDraw();
          this.drawAttackRange();
        }

        shoot() {
          if (!this._nearestEnemy || !this.bulletPrefab) return;
          const startPos = this.node.worldPosition;
          const targetPos = this._nearestEnemy.worldPosition; // 计算子弹到目标的方向

          const direction = new Vec3(targetPos.x - startPos.x, targetPos.y - startPos.y, 0).normalize(); // 从玩家位置偏移一定距离生成子弹

          const offsetDistance = 50;
          const spawnPos = new Vec3(startPos.x + direction.x * offsetDistance, startPos.y + direction.y * offsetDistance, 0);
          const bullet = instantiate(this.bulletPrefab);
          bullet.parent = this.node.parent;
          bullet.setWorldPosition(spawnPos); // 设置子弹朝向

          const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
          bullet.angle = angle - 90; // -90是因为子弹sprite默认朝上

          const bulletComp = bullet.getComponent(_crd && Bullet === void 0 ? (_reportPossibleCrUseOfBullet({
            error: Error()
          }), Bullet) : Bullet);

          if (bulletComp) {
            bulletComp.init(direction);
          }
        }

        drawAttackRange() {
          if (!this._attackRangeGraphics) return;

          this._attackRangeGraphics.clear();

          this._attackRangeGraphics.circle(0, 0, this.attackRange);

          this._attackRangeGraphics.stroke();
        }

        onTouchStart(event) {
          this._isTouching = true;
          this.updateTouchInfo(event);
        }

        onTouchMove(event) {
          this.updateTouchInfo(event);
        }

        onTouchEnd() {
          this._isTouching = false;

          this._moveDirection.set(Vec3.ZERO);
        }

        updateTouchInfo(event) {
          const camera = this.node.scene.getComponentInChildren(Camera);
          if (!camera) return;
          const touchPos = event.getUILocation();
          const worldPos = new Vec3();
          camera.screenToWorld(new Vec3(touchPos.x, touchPos.y, 0), worldPos);

          this._touchPos.set(worldPos.x, worldPos.y);

          const nodePos = this.node.getWorldPosition();
          const dx = worldPos.x - nodePos.x;
          const dy = worldPos.y - nodePos.y;
          this._targetAngle = Math.atan2(dx, dy) * 180 / Math.PI;

          if (this._targetAngle < 0) {
            this._targetAngle += 360;
          }

          this._moveDirection.x = dx;
          this._moveDirection.y = dy;

          this._moveDirection.normalize();
        }

        handleMovementAndRotation(deltaTime) {
          // 移动需要触控
          if (this._isTouching) {
            this.handleMovement(deltaTime);
          } // 旋转不需要触控条件


          this.handleRotation(deltaTime);
        }

        handleRotation(deltaTime) {
          if (this._nearestEnemy && this.isEnemyInRange(this._nearestEnemy)) {
            const enemyPos = this._nearestEnemy.worldPosition;
            const myPos = this.node.worldPosition;
            const dx = enemyPos.x - myPos.x;
            const dy = enemyPos.y - myPos.y;
            this._targetAngle = Math.atan2(dx, dy) * 180 / Math.PI;
          }

          let angleDiff = this._targetAngle - this._currentAngle;
          if (angleDiff > 180) angleDiff -= 360;else if (angleDiff < -180) angleDiff += 360;
          const rotationAmount = this.rotationSpeed * deltaTime;

          if (Math.abs(angleDiff) > rotationAmount) {
            this._currentAngle += Math.sign(angleDiff) * rotationAmount;
          } else {
            this._currentAngle = this._targetAngle;
          }

          if (this._currentAngle >= 360) {
            this._currentAngle -= 360;
          } else if (this._currentAngle < 0) {
            this._currentAngle += 360;
          }

          this.node.angle = -this._currentAngle;
        }

        handleMovement(deltaTime) {
          const nodePos = this.node.getWorldPosition();
          const distance = Math.sqrt(Math.pow(this._touchPos.x - nodePos.x, 2) + Math.pow(this._touchPos.y - nodePos.y, 2));

          if (distance > this.stopDistance) {
            const moveAmount = this.moveSpeed * deltaTime;
            const newPos = this.node.position.clone();
            const nextX = newPos.x + this._moveDirection.x * moveAmount;
            const nextY = newPos.y + this._moveDirection.y * moveAmount; // 分别处理 X 和 Y 方向的移动，允许单方向移动

            newPos.x = Math.abs(nextX) <= this.mapWidth / 2 ? nextX : newPos.x;
            newPos.y = Math.abs(nextY) <= this.mapHeight / 2 ? nextY : newPos.y;
            this.node.setPosition(newPos);
          }
        }

        handleCombat(deltaTime) {
          const enemies = this.node.scene.children.filter(node => {
            const enemy = node.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
              error: Error()
            }), Enemy) : Enemy);
            return enemy && !enemy.isDead();
          });

          if (enemies) {
            const playerPos = this.node.worldPosition;

            for (const enemy of enemies) {
              const distance = Vec3.distance(playerPos, enemy.worldPosition);

              if (distance <= this.contactRadius) {
                console.log('玩家被敌人接触!');
                this.health -= 10;

                if (this.health <= 0) {
                  console.log('玩家死亡');
                }
              }
            }
          }

          if (this._isReloading) {
            if (Date.now() - this._lastShootTime >= this.reloadTime * 1000) {
              this._isReloading = false;
              this._currentAmmo = this.maxAmmo;
            }

            return;
          }

          this.findNearestEnemy();

          if (this._nearestEnemy && this.isEnemyInRange(this._nearestEnemy)) {
            this.tryShoot();
          }
        }

        findNearestEnemy() {
          const getAllNodes = node => {
            let nodes = [node];
            node.children.forEach(child => {
              nodes = nodes.concat(getAllNodes(child));
            });
            return nodes;
          };

          const allNodes = getAllNodes(this.node.scene);
          const enemies = allNodes.filter(node => {
            const enemy = node.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
              error: Error()
            }), Enemy) : Enemy);
            return enemy && !enemy.isDead();
          });

          if (!enemies || enemies.length === 0) {
            this._nearestEnemy = null;
            return;
          }

          let nearest = enemies[0];
          let minDistance = Vec3.distance(this.node.worldPosition, nearest.worldPosition);

          for (const enemy of enemies) {
            const distance = Vec3.distance(this.node.worldPosition, enemy.worldPosition);

            if (distance < minDistance) {
              minDistance = distance;
              nearest = enemy;
            }
          }

          this._nearestEnemy = nearest;
        }

        isEnemyInRange(enemyNode) {
          if (!enemyNode || !enemyNode.position) {
            return false;
          }

          const enemy = enemyNode.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
            error: Error()
          }), Enemy) : Enemy);

          if (!enemy || enemy.isDead()) {
            return false;
          }

          const distance = Vec3.distance(this.node.position, enemyNode.position);
          return distance <= this.attackRange;
        }

        tryShoot() {
          const now = Date.now();
          if (now - this._lastShootTime < this.shootInterval * 1000) return;

          if (this._currentAmmo <= 0) {
            this._isReloading = true;
            this._lastShootTime = now;
            return;
          }

          this.shoot();
          this._currentAmmo--;
          this._lastShootTime = now;
        }

        handleDebugDraw() {
          if (!this.debugMode || !this._debugGraphics || !this._isTouching) return;

          this._debugGraphics.clear();

          this._debugGraphics.strokeColor = Color.GREEN;
          this._debugGraphics.lineWidth = 2;

          this._debugGraphics.moveTo(0, 0);

          this._debugGraphics.lineTo(this._moveDirection.x * 100, this._moveDirection.y * 100);

          this._debugGraphics.stroke();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "stopDistance", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 200;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rotationSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 360;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "health", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 100;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "attackRange", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 360;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "shootInterval", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "maxAmmo", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "reloadTime", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "bulletPrefab", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "contactRadius", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "enemyPrefabs", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "debugMode", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_attackRangeGraphics", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "mapWidth", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 4444;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "mapHeight", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 6666;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c9c114aa444cd6ba99598a906db478e6771f0fcd.js.map