import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Group,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'

export interface CoreOptions {
  mobile: boolean
  /** Called once, right after the first frame has been rendered. */
  onReady?: () => void
}

// Ashima / Stefan Gustavson 3D simplex noise (MIT).
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;      // mouse on z=0 plane, world units
uniform float uSize;
uniform float uDpr;
uniform float uNoise;     // displacement amount
uniform float uRepel;     // repulsion amount
attribute float aRand;
varying float vMix;
varying float vRand;
${SIMPLEX}
void main(){
  vec3 p = position;
  vec3 n = normalize(p);
  float d = snoise(p * 1.2 + uTime * 0.12);
  p += n * d * uNoise;

  vec4 world = modelMatrix * vec4(p, 1.0);
  vec2 diff = world.xy - uMouse;
  float dist = length(diff);
  float push = (1.0 - smoothstep(0.0, 0.7, dist)) * uRepel;
  world.xy += (dist > 0.0001 ? diff / dist : vec2(0.0)) * push;
  world.z += push * 0.5;

  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uDpr * (1.0 / -mv.z) * (0.6 + aRand);

  vMix = clamp(n.y * 0.5 + 0.5 + d * 0.25, 0.0, 1.0);
  vRand = aRand;
}
`

const FRAG = /* glsl */ `
uniform vec3 uA1;
uniform vec3 uA2;
uniform vec3 uA3;
uniform float uOpacity;
varying float vMix;
varying float vRand;
void main(){
  float a = 1.0 - smoothstep(0.0, 0.5, length(gl_PointCoord - 0.5));
  if (a < 0.01) discard;
  vec3 c = vMix < 0.5 ? mix(uA3, uA1, vMix * 2.0) : mix(uA1, uA2, (vMix - 0.5) * 2.0);
  gl_FragColor = vec4(c, a * uOpacity * (0.55 + vRand * 0.45));
}
`

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function readColor(name: string, fallback: string): [number, number, number] {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return /^#[0-9a-f]{6}$/i.test(v) ? hex(v) : hex(fallback)
}

function makeMaterial(size: number, noise: number, repel: number, opacity: number, dpr: number) {
  const a1 = readColor('--a1', '#7C8CFF')
  const a2 = readColor('--a2', '#B48CFF')
  const a3 = readColor('--a3', '#5EE6D0')
  return new ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new Vector2(99, 99) },
      uSize: { value: size },
      uDpr: { value: dpr },
      uNoise: { value: noise },
      uRepel: { value: repel },
      uOpacity: { value: opacity },
      uA1: { value: a1 },
      uA2: { value: a2 },
      uA3: { value: a3 },
    },
  })
}

function sphereGeometry(count: number, radius: number) {
  const pos = new Float32Array(count * 3)
  const rnd = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    const jitter = radius * (0.97 + Math.random() * 0.06)
    pos[i * 3] = Math.cos(t) * r * jitter
    pos[i * 3 + 1] = y * jitter
    pos[i * 3 + 2] = Math.sin(t) * r * jitter
    rnd[i] = Math.random()
  }
  const g = new BufferGeometry()
  g.setAttribute('position', new BufferAttribute(pos, 3))
  g.setAttribute('aRand', new BufferAttribute(rnd, 1))
  return g
}

function ringGeometry(count: number, radius: number, tube: number) {
  const pos = new Float32Array(count * 3)
  const rnd = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2
    const v = Math.random() * Math.PI * 2
    const r = radius + Math.cos(v) * tube
    pos[i * 3] = Math.cos(u) * r
    pos[i * 3 + 1] = Math.sin(v) * tube
    pos[i * 3 + 2] = Math.sin(u) * r
    rnd[i] = Math.random()
  }
  const g = new BufferGeometry()
  g.setAttribute('position', new BufferAttribute(pos, 3))
  g.setAttribute('aRand', new BufferAttribute(rnd, 1))
  return g
}

export function mountCore(canvas: HTMLCanvasElement, opts: CoreOptions): () => void {
  const host = canvas.parentElement ?? canvas
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75)

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'default' })
  renderer.setPixelRatio(dpr)
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(35, 1, 0.1, 50)
  camera.position.set(0, 0, 6)

  const group = new Group()
  scene.add(group)

  const coreGeo = sphereGeometry(opts.mobile ? 6000 : 14000, 1.6)
  const coreMat = makeMaterial(opts.mobile ? 34 : 28, 0.18, 0.45, 1, dpr)
  const core = new Points(coreGeo, coreMat)
  group.add(core)

  const ringGeo = ringGeometry(1500, 2.4, 0.04)
  const ringMat = makeMaterial(22, 0.05, 0.25, 0.35, dpr)
  const ring = new Points(ringGeo, ringMat)
  ring.rotation.x = (72 * Math.PI) / 180
  ring.rotation.z = 0.25
  group.add(ring)

  // --- input -------------------------------------------------------------
  const target = new Vector2(99, 99) // world-space mouse target on z=0
  const tilt = { x: 0, y: 0, tx: 0, ty: 0 }
  let rect = canvas.getBoundingClientRect()

  const halfHeightAtZ0 = () => Math.tan(((camera.fov / 2) * Math.PI) / 180) * camera.position.z

  const onPointer = (e: PointerEvent) => {
    rect = canvas.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    const hh = halfHeightAtZ0()
    target.set(nx * hh * camera.aspect, ny * hh)
    tilt.ty = Math.max(-1, Math.min(1, nx)) * 0.15
    tilt.tx = -Math.max(-1, Math.min(1, ny)) * 0.15
  }
  const onLeave = () => {
    target.set(99, 99)
    tilt.tx = 0
    tilt.ty = 0
  }
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('blur', onLeave)
  document.documentElement.addEventListener('pointerleave', onLeave)

  // --- sizing ------------------------------------------------------------
  const resize = () => {
    const w = Math.max(1, canvas.clientWidth)
    const h = Math.max(1, canvas.clientHeight)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    rect = canvas.getBoundingClientRect()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  // --- loop --------------------------------------------------------------
  let raf = 0
  let running = false
  let visible = true
  let last = performance.now()
  let time = 0
  let readyFired = false
  const mouse = coreMat.uniforms.uMouse.value as Vector2

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    time += dt

    mouse.lerp(target, 0.08)
    ;(ringMat.uniforms.uMouse.value as Vector2).copy(mouse)

    tilt.x += (tilt.tx - tilt.x) * 0.04
    tilt.y += (tilt.ty - tilt.y) * 0.04
    group.rotation.x = tilt.x
    group.rotation.y += 0.05 * dt
    core.rotation.y = tilt.y
    ring.rotation.y += 0.03 * dt

    const hostH = host.clientHeight || window.innerHeight
    const scroll = Math.max(0, Math.min(1, window.scrollY / hostH))
    const s = 1 - 0.15 * scroll
    group.scale.setScalar(s)
    coreMat.uniforms.uOpacity.value = 1 - scroll
    ringMat.uniforms.uOpacity.value = 0.35 * (1 - scroll)

    coreMat.uniforms.uTime.value = time
    ringMat.uniforms.uTime.value = time

    renderer.render(scene, camera)
    if (!readyFired) {
      readyFired = true
      opts.onReady?.()
    }
  }

  const start = () => {
    if (running) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const sync = () => (visible && !document.hidden ? start() : stop())

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  io.observe(canvas)
  document.addEventListener('visibilitychange', sync)
  sync()

  return () => {
    stop()
    io.disconnect()
    ro.disconnect()
    document.removeEventListener('visibilitychange', sync)
    window.removeEventListener('pointermove', onPointer)
    window.removeEventListener('blur', onLeave)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    coreGeo.dispose()
    coreMat.dispose()
    ringGeo.dispose()
    ringMat.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
  }
}
