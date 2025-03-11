System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, HitEffect;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "315318+e2xIEL3WCohe++Np", "HitEffect", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HitEffect", HitEffect = (_dec = ccclass('HitEffect'), _dec(_class = class HitEffect extends Component {
        start() {
          // 0.1秒后销毁节点
          setTimeout(() => {
            if (this.node && this.node.isValid) {
              this.node.destroy();
            }
          }, 100);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8404d59074a47f1511ab0095aeff5f29c769f60b.js.map