<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

/* =====================
   Props（工程化接口）
===================== */
const props = defineProps({
  density: {
    type: String,
    default: 'normal', // light | normal | strong
  },
  theme: {
    type: String,
    default: 'steel', // steel | blue
  },
  scrollReact: {
    type: Boolean,
    default: false,
  },
})

/* =====================
   Canvas refs
===================== */
const canvasRef = ref(null)
let ctx, w, h, rafId

/* =====================
   Scroll factor
===================== */
let scrollFactor = 0
const onScroll = () => {
  scrollFactor = Math.min(window.scrollY / 600, 1)
}

/* =====================
   Density presets
===================== */
const PRESET = computed(() => {
  switch (props.density) {
    case 'light':
      return { beams: 8, flows: 14, speed: 0.6 }
    case 'strong':
      return { beams: 20, flows: 36, speed: 1.15 }
    default:
      return { beams: 14, flows: 24, speed: 0.9 }
  }
})

/* =====================
   Objects
===================== */
const gridSize = 60
let beams = []
let flows = []

/* ===== Vertical Beams ===== */
class Beam {
  constructor() {
    this.reset()
  }
  reset() {
    this.x = Math.random() * w
    this.y = h + Math.random() * 300
    this.len = 160 + Math.random() * 220
    this.speed = (0.6 + Math.random() * 0.9) * PRESET.value.speed
    this.alpha = 0.06 + Math.random() * 0.08
    this.width = 1 + Math.random()
  }
  update() {
    this.y -= this.speed * (1 - scrollFactor * 0.4)
    if (this.y + this.len < 0) this.reset()
  }
  draw() {
    const g = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.len)
    g.addColorStop(0, `rgba(190,220,255,${this.alpha})`)
    g.addColorStop(1, 'rgba(190,220,255,0)')
    ctx.strokeStyle = g
    ctx.lineWidth = this.width
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y + this.len)
    ctx.stroke()
  }
}

/* ===== Horizontal / Vertical Micro Flow ===== */
class Flow {
  constructor() {
    this.reset()
  }
  reset() {
    this.cx = Math.floor(Math.random() * (w / gridSize))
    this.cy = Math.floor(Math.random() * (h / gridSize))
    this.dir = Math.random() > 0.5
    this.t = Math.random()

    // ✅ ✅ ✅ 最佳平衡版速度（慢、稳、可感知）
    this.speed = 0.003 + Math.random() * 0.006
  }
  update() {
    // ✅ 阻尼型推进，不“跑”
    this.t += this.speed * (0.7 - scrollFactor * 0.4)
    if (this.t > 1) this.reset()
  }
  draw() {
    const x = this.cx * gridSize
    const y = this.cy * gridSize
    ctx.fillStyle = 'rgba(120,180,255,0.45)'

    ctx.fillRect(
      this.dir ? x + this.t * gridSize : x - 1,
      this.dir ? y - 1 : y + this.t * gridSize,
      2,
      2
    )
  }
}

/* =====================
   Draw helpers
===================== */
const drawBackground = () => {
  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, '#0b1220')
  g.addColorStop(1, '#020617')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

const drawGrid = () => {
  ctx.strokeStyle = 'rgba(148,163,184,0.035)'
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }
}

/* ===== Optical Cut-off Mask ===== */
const drawCutoff = () => {
  const g = ctx.createLinearGradient(0, 0, 0, h * 0.35)
  g.addColorStop(0, 'rgba(0,0,0,0.65)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h * 0.35)
}

/* =====================
   Loop
===================== */
const loop = () => {
  drawBackground()
  drawGrid()

  flows.forEach(f => {
    f.update()
    f.draw()
  })

  beams.forEach(b => {
    b.update()
    b.draw()
  })

  drawCutoff()
  rafId = requestAnimationFrame(loop)
}

/* =====================
   Mount
===================== */
onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  const resize = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', resize)
  if (props.scrollReact) window.addEventListener('scroll', onScroll)

  beams = Array.from({ length: PRESET.value.beams }, () => new Beam())
  flows = Array.from({ length: PRESET.value.flows }, () => new Flow())

  loop()

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('scroll', onScroll)
  })
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none"
  />
</template>
