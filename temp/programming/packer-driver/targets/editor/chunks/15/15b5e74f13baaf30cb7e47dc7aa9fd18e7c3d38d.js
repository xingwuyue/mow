System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ProgressBar, PlayerCombat, _dec, _class, _crd, ccclass, property, PlayerHealthBar;

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
      ProgressBar = _cc.ProgressBar;
    }, function (_unresolved_2) {
      PlayerCombat = _unresolved_2.PlayerCombat;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3cab8FxGkdATJlfcSDF69Du", "PlayerHealthBar", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'ProgressBar', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerHealthBar", PlayerHealthBar = (_dec = ccclass('PlayerHealthBar'), _dec(_class = class PlayerHealthBar extends Component {
        constructor(...args) {
          super(...args);
          this._progressBar = void 0;
          this._playerCombat = void 0;
          this._maxHealth = void 0;
        }

        start() {
          this._progressBar = this.getComponentInChildren(ProgressBar); // 获取父节点（Player）上的 PlayerCombat 组件

          const playerNode = this.node.parent;

          if (playerNode) {
            // 获取带有 PlayerCombat 组件的子节点
            const combatNodes = playerNode.children.filter(child => child.getComponent(_crd && PlayerCombat === void 0 ? (_reportPossibleCrUseOfPlayerCombat({
              error: Error()
            }), PlayerCombat) : PlayerCombat));

            if (combatNodes.length > 0) {
              this._playerCombat = combatNodes[0].getComponent(_crd && PlayerCombat === void 0 ? (_reportPossibleCrUseOfPlayerCombat({
                error: Error()
              }), PlayerCombat) : PlayerCombat);
              this._maxHealth = this._playerCombat.health; // 设置血条位置，与 PlayerCombat 节点保持相同的 Y 轴偏移

              const yOffset = -70;
              this.node.setPosition(0, yOffset, 0);
            }
          }
        }

        update() {
          if (this._playerCombat && this._progressBar) {
            const currentHealth = this._playerCombat.health;
            this._progressBar.progress = currentHealth / this._maxHealth;
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=15b5e74f13baaf30cb7e47dc7aa9fd18e7c3d38d.js.map