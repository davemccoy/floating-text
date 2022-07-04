// const planeVertex = `precision mediump float;
//
//   vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
//   vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
//
//   float snoise(vec3 v){
//     const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
//     const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
//
//   // First corner
//     vec3 i  = floor(v + dot(v, C.yyy) );
//     vec3 x0 =   v - i + dot(i, C.xxx) ;
//
//   // Other corners
//     vec3 g = step(x0.yzx, x0.xyz);
//     vec3 l = 1.0 - g;
//     vec3 i1 = min( g.xyz, l.zxy );
//     vec3 i2 = max( g.xyz, l.zxy );
//
//     //  x0 = x0 - 0. + 0.0 * C
//     vec3 x1 = x0 - i1 + 1.0 * C.xxx;
//     vec3 x2 = x0 - i2 + 2.0 * C.xxx;
//     vec3 x3 = x0 - 1. + 3.0 * C.xxx;
//
//   // Permutations
//     i = mod(i, 289.0 );
//     vec4 p = permute( permute( permute(
//                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
//              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
//
//   // Gradients
//   // ( N*N points uniformly over a square, mapped onto an octahedron.)
//     float n_ = 1.0/7.0; // N=7
//     vec3  ns = n_ * D.wyz - D.xzx;
//
//     vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
//
//     vec4 x_ = floor(j * ns.z);
//     vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
//
//     vec4 x = x_ *ns.x + ns.yyyy;
//     vec4 y = y_ *ns.x + ns.yyyy;
//     vec4 h = 1.0 - abs(x) - abs(y);
//
//     vec4 b0 = vec4( x.xy, y.xy );
//     vec4 b1 = vec4( x.zw, y.zw );
//
//     vec4 s0 = floor(b0)*2.0 + 1.0;
//     vec4 s1 = floor(b1)*2.0 + 1.0;
//     vec4 sh = -step(h, vec4(0.0));
//
//     vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//     vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
//
//     vec3 p0 = vec3(a0.xy,h.x);
//     vec3 p1 = vec3(a0.zw,h.y);
//     vec3 p2 = vec3(a1.xy,h.z);
//     vec3 p3 = vec3(a1.zw,h.w);
//
//   //Normalise gradients
//     vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//     p0 *= norm.x;
//     p1 *= norm.y;
//     p2 *= norm.z;
//     p3 *= norm.w;
//
//   // Mix final noise value
//     vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//     m = m * m;
//     return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
//                                   dot(p2,x2), dot(p3,x3) ) );
//   }
//
//   uniform float uTime;
//   uniform vec2 uMouse;
//   uniform vec2 uResolution;
//
//   varying vec2 vUv;
//   varying float vDisplacement;
//
//   void main() {
//     vUv = uv;
//
//     vec2 uv\t= vUv;
//   \tuv *= 1.95;
// \t
// \t  float displacement = 1.0 + snoise( vec3( uv.x - uTime * 0.001, uv.x * -uv.y + uTime * 0.008, uTime * 0.05 ) ) * 0.5;
//
//     vDisplacement = displacement;
//
//     vec3 animatedPosition = position + normal * (10.0 * displacement);
//     gl_Position = projectionMatrix * modelViewMatrix * vec4( animatedPosition, 1.0 );
//   }`;
// const planeFragment = `
// precision mediump float;
//
//   uniform float uTime;
//   uniform vec3 uColor;
//   uniform sampler2D uTexture;
//
//   varying vec2 vUv;
//   varying float vDisplacement;
//
//   void main() {
//     vec4 texture = texture2D( uTexture, vUv );
//     texture.a -= pow(vDisplacement * 0.5, 2.0);
//     texture.rgb += uColor;
//     gl_FragColor = texture;
//     //gl_FragColor = vec4(uColor, vDisplacement);
//   }
// `;
//
// const shader1Script = document.createElement('script');
// shader1Script.setAttribute('id', 'planeVertex');
// shader1Script.setAttribute('type', 'x-shader/vertex-shader');
// shader1Script.textContent = planeVertex;
// document.body.appendChild(shader1Script);
//
// const shader2Script = document.createElement('script');
// shader2Script.setAttribute('id', 'planeFragment');
// shader2Script.setAttribute('type', 'x-shader/fragment-shader');
// shader2Script.textContent = planeFragment;
// document.body.appendChild(shader2Script);


const Window = { w: window.innerWidth, h: window.innerHeight }

const map = ( num, min1, max1, min2, max2 ) => {
    let num1 = ( num - min1 ) / ( max1 - min1 )
    let num2 = ( num1 * ( max2 - min2 ) ) + min2
    return num2
}

class Plane extends THREE.Group {
    constructor (image, color) {
        super()

        if (!color) {
            color = 0x000000;
        }
        let clearColor = color;
        console.log(clearColor)
        const geometry = new THREE.PlaneGeometry( 50, 25, 32, 32 )
        this.uniforms = {
            uTime: { value: 0 },
            uTexture: { value: new THREE.TextureLoader().load(image ) },
            uColor: { value: new THREE.Color( clearColor ) },
        }
        const material = new THREE.ShaderMaterial( {
            uniforms: this.uniforms,
            fragmentShader: document.querySelector( '#planeFragment' ).textContent,
            vertexShader: document.querySelector( '#planeVertex' ).textContent,
            side: THREE.DoubleSide,
            transparent: true
        } )
        this.mesh = new THREE.Mesh( geometry, material )
        this.add( this.mesh )

        this.update = this.update.bind( this )
    }
    update ( d ) {
        this.uniforms.uTime.value += d * 0.01
    }
    resize ( w, h ) {
    }
}

class Xp {
    constructor (image, el, color) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 20, Window.w / Window.h, 1, 1000 )
        this.camera.position.z = 100
        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
        this.renderer.setSize( Window.w, Window.h )
        // this.renderer.setClearColor(0xffffff)
        document.querySelector( el ).appendChild( this.renderer.domElement )

        this.DELTA_TIME = 0
        this.LAST_TIME = Date.now()

        this.mouse = new THREE.Vector2()

        this.bind()
        this.initMeshes(image, color)
        this.resize()
    }
    bind () {
        [ 'update', 'resize' ]
            .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )
    }
    initMeshes (image, color) {
        this.plane = new Plane(image, color)
        this.scene.add( this.plane )
    }
    update () {
        this.DELTA_TIME = Date.now() - this.LAST_TIME
        this.LAST_TIME = Date.now()
        this.plane.update( this.DELTA_TIME )
        this.renderer.render( this.scene, this.camera )
    }
    resize () {
        this.renderer.setSize( Window.w, Window.h )
    }
}

class App {
    constructor (image, el, color) {
        this.bind()
        this.addListeners()
        this.xp = new Xp(image, el, color)
    }
    bind () {
        [ 'onResize', 'update' ]
            .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )
    }
    addListeners () {
        window.addEventListener('resize', () => {
            this.onResize
        })
    }
    init () {
        this.update()
    }
    onResize () {
        Window.w = window.innerWidth
        Window.h = window.innerHeight
        this.xp.resize()
    }
    update () {
        this.xp.update()
        requestAnimationFrame( this.update )
    }
}



