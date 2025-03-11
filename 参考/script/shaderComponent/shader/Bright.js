// const renderEngine = cc.renderer.renderEngine;
// const renderer = renderEngine.renderer;
// let CustomMaterial = require('CustomMaterial');

// const shader = {    
//     name: 'Bright',
//     params: [
//         { name: 'time', type: renderer.PARAM_FLOAT, defaultValue: 0 },
//     ],

//     start() {
//         this.time = 0;
//         this.sin = 0;
//     },

//     update(sprite, material, dt) {
//        this.time += dt;
//        this.sin = Math.sin(this.time)*20;
//        if(this.time >= 3){
//            this.sin = 0;
//            this.time = 0;
//        }
//         material.setParamValue('time', this.time);
//     },

//     defines:[],

//     vert: `
//         uniform mat4 viewProj;
//         attribute vec3 a_position;
//         attribute vec2 a_uv0;
//         varying vec2 uv0;
//         void main () {
//             vec4 pos = viewProj * vec4(a_position, 1);
//             gl_Position = pos;
//             uv0 = a_uv0;
//         }`,

//     frag:
//         `
//         uniform sampler2D texture;
// uniform vec4 color;
// uniform float time;
// varying vec2 uv0;

// void main()
// {
//     vec4 src_color = texture2D(texture, uv0).rgba;
//     float width = 0.1;
//     float start = 1.0-time;
//     float strength = 0.01;
//     float offset = -0.5;
//     vec2 v_texCoord = uv0;
//     if(uv0.x < (start - offset*uv0.y) && uv0.x > (start-offset*uv0.y-width))
//     {
//         float center_l =  width;
//         float l = abs((start - offset * v_texCoord.y) - center_l/2.0 - v_texCoord.x);
//         float a = 5.0 * (center_l/2.0-l)/(center_l/2.0); // tony 流光中心强度（只有调整这个值才会生效，*前面的数值）
//         float strength = 0.005 * a;
//         if (strength < 0.00392) strength = 0.00392;
//         vec3 improve = strength * vec3(255, 255, 255); //颜色
//         //tony 保证不变黑
//         if (improve.x < 1.0) improve.x = 1.0;
//         if (improve.y < 1.0) improve.y = 1.0;
//         if (improve.z < 1.0) improve.z = 1.0;
//         vec3 result = improve * vec3( src_color.r, src_color.g, src_color.b);
//         gl_FragColor = vec4(result, src_color.a);
//     }else
//     {
//         gl_FragColor = src_color;
//     }
    
// }`,
// };

// CustomMaterial.addShader(shader);
// module.exports = shader;