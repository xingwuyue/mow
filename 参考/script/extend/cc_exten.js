cc.CollisionManager.prototype._doCollide = function (collisionType, contact) {
    let contactFunc;
    switch (collisionType) {
        case 1:
            contactFunc = 'onCollisionEnter';
            break;
        case 2:
            contactFunc = 'onCollisionStay';
            break;
        case 3:
            contactFunc = 'onCollisionExit';
            break;
    }

    let collider1 = contact.collider1;
    let collider2 = contact.collider2;

    let comps1 = collider1.node.colliderComponent;
    let comps2 = collider2.node.colliderComponent;

    let i, l, comp;
    if (comps1 && comps1[contactFunc]) {
        comps1[contactFunc](collider2, collider1);
    }
    // for (i = 0, l = comps1.length; i < l; i++) {
    //     comp = comps1[i];
    //     if (comp[contactFunc]) {
    //         comp[contactFunc](collider2, collider1);
    //     }
    // }
    if (comps2 && comps2[contactFunc]) {
        comps2[contactFunc](collider1, collider2);
    }
    // for (i = 0, l = comps2.length; i < l; i++) {
    //     comp = comps2[i];
    //     if (comp[contactFunc]) {
    //         comp[contactFunc](collider1, collider2);
    //     }
    // }
}