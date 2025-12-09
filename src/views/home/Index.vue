<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { imgUrl } from '@/utils/index'
import VolvoIcon from '@/assets/svg/vehicles/volvo.svg'
import ManIcon from '@/assets/svg/vehicles/man.svg'
import ScaniaIcon from '@/assets/svg/vehicles/scania.svg'
import BenzIcon from '@/assets/svg/vehicles/benz.svg'
import IsuzuIcon from '@/assets/svg/vehicles/isuzu.svg'

const vehicles = [
  { name: 'VOLVO', icon: VolvoIcon },
  { name: 'SCANIA', icon: ScaniaIcon },
  { name: 'MAN', icon: ManIcon },
  { name: 'BENZ', icon: BenzIcon },
  { name: 'ISUZU', icon: IsuzuIcon },
  { name: 'HINO', type: 'text' },
]

const canvasRef = ref(null)
let ctx
let w, h
let beams = []
let particles = []
let animationFrame

/* =====================
   动态光束（Beam）对象
===================== */
class Beam {
  constructor() {
    this.reset()
  }
  reset() {
    this.x = Math.random() * w
    this.y = h + Math.random() * 200
    this.speed = 1.2 + Math.random() * 1.8
    this.length = 80 + Math.random() * 160
    this.opacity = 0.15 + Math.random() * 0.15
  }
  update() {
    this.y -= this.speed
    if (this.y + this.length < 0) this.reset()
  }
  draw() {
    const g = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length)
    g.addColorStop(0, `rgba(96,165,250, ${this.opacity})`)
    g.addColorStop(1, `rgba(96,165,250, 0)`)

    ctx.beginPath()
    ctx.strokeStyle = g
    ctx.lineWidth = 2
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y + this.length)
    ctx.stroke()
  }
}

/* =====================
   粒子光点（Sparkles）
===================== */
class Particle {
  constructor() {
    this.reset()
  }
  reset() {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = 1 + Math.random() * 2
    this.opacity = 0.05 + Math.random() * 0.15
    this.speed = 0.15 + Math.random() * 0.4
  }
  update() {
    this.y -= this.speed
    if (this.y < 0) {
      this.y = h
      this.x = Math.random() * w
    }
  }
  draw() {
    ctx.fillStyle = `rgba(147,197,253, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

/* =====================
   初始化动画
===================== */
onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // 创建光束与粒子
  beams = Array.from({ length: 28 }, () => new Beam())
  particles = Array.from({ length: 40 }, () => new Particle())

  // 动画循环
  const loop = () => {
    ctx.clearRect(0, 0, w, h)

    // 背景渐层
    const bg = ctx.createLinearGradient(0, 0, 0, h)
    bg.addColorStop(0, 'rgba(15,23,42,1)')
    bg.addColorStop(1, 'rgba(2,6,23,1)')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    beams.forEach((b) => {
      b.update()
      b.draw()
    })

    particles.forEach((p) => {
      p.update()
      p.draw()
    })

    animationFrame = requestAnimationFrame(loop)
  }

  loop()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame)
    window.removeEventListener('resize', resize)
  })
})

/* Hero CTA */
const goProducts = () => {
  location.hash = '#/category'
}
const goContact = () => {
  location.hash = '#/contact'
}

</script>

<template>
  <main class="w-full bg-slate-900 text-slate-100">

    <!-- ================= HERO WITH CANVAS ================= -->
    <section class="
      relative
      flex items-center
      overflow-hidden
      select-none

      min-h-[72vh]
      md:min-h-[68vh]
      lg:min-h-[640px]
    ">

      <!-- Canvas 动态背景 -->
      <canvas
        ref="canvasRef"
        class="absolute inset-0 w-full h-full block"
      ></canvas>

      <!-- 顶部黑色渐层遮罩（保持文字可读） -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>

      <!-- 内容层 -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <!-- 文案 -->
        <div>
          <h1 class="text-4xl md:text-5xl font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Precision LED Headlights<br />
            for Heavy-Duty Trucks
          </h1>

          <p class="mt-6 text-lg text-slate-300 max-w-xl">
            High-performance projector systems for European & Japanese trucks.
            Designed for long-distance safety and 24V/12V commercial use.
          </p>

          <div class="mt-10 flex gap-4 flex-wrap">
            <a
              href="#/category"
              class="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition"
            >
              View Products
            </a>

            <a
              href="#/contact"
              class="px-6 py-3 rounded-full border border-slate-500 text-white text-sm hover:border-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        <!-- 右侧静态大灯图（可换成你的产品图） -->
        <div class="relative">
          <img
            :src="imgUrl('tgx.png')"
            class="w-full rounded-3xl shadow-2xl border border-white/10 object-cover"
            alt="Truck Headlamp"
          />
        </div>
      </div>
    </section>

    <!-- ================= ADVANTAGES ================= -->
    <section class="py-24 bg-slate-950">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div class="relative rounded-2xl border border-slate-800
               bg-gradient-to-b from-slate-900 to-slate-950
               p-6 text-center
               hover:border-blue-500/60
               transition">
            <div class="text-blue-500 text-3xl font-semibold">OEM</div>
            <p class="mt-4 text-sm text-slate-400 leading-relaxed">
              OEM-grade engineering and manufacturing
            </p>
          </div>

          <div class="relative rounded-2xl border border-slate-800
               bg-gradient-to-b from-slate-900 to-slate-950
               p-6 text-center
               hover:border-blue-500/60
               transition">
            <div class="text-blue-500 text-3xl font-semibold">Beam</div>
            <p class="mt-4 text-sm text-slate-400 leading-relaxed">
              Precise beam pattern & sharp cut-off
            </p>
          </div>

          <div class="relative rounded-2xl border border-slate-800
               bg-gradient-to-b from-slate-900 to-slate-950
               p-6 text-center
               hover:border-blue-500/60
               transition">
            <div class="text-blue-500 text-3xl font-semibold">24V / 12V</div>
            <p class="mt-4 text-sm text-slate-400 leading-relaxed">
              Designed for heavy-duty 24V / 12V truck systems
            </p>
          </div>

          <div class="relative rounded-2xl border border-slate-800
               bg-gradient-to-b from-slate-900 to-slate-950
               p-6 text-center
               hover:border-blue-500/60
               transition">
            <div class="text-blue-500 text-3xl font-semibold">Fit</div>
            <p class="mt-4 text-sm text-slate-400 leading-relaxed">
              Plug & play, no vehicle modification required
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= VEHICLE COVERAGE ================= -->
    <section class="py-24 bg-slate-900 relative overflow-hidden">
      <!-- subtle background glow -->
      <div class="absolute inset-0 pointer-events-none
           bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_60%)]" />

      <div class="relative max-w-7xl mx-auto px-6">
        <!-- Title -->
        <h2 class="text-2xl font-semibold text-white text-center mb-14 tracking-wide">
          Vehicle Coverage
        </h2>

        <!-- Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6
             gap-x-10 gap-y-14 text-center">
          <!-- Item -->
          <div
            v-for="item in vehicles"
            :key="item.name"
            class="group relative flex flex-col items-center"
          >
            <!-- Icon container -->
            <div class="relative flex items-center justify-center
                 h-14 w-14 rounded-xl
                 bg-slate-800/40 border border-slate-700/60
                 transition-all duration-300
                 group-hover:border-blue-500/40
                 group-hover:bg-slate-800/70">
              <!-- ✅ SVG Icon -->
              <component
                v-if="item.type !== 'text'"
                :is="item.icon"
                class="h-8 w-8 text-slate-400
                   transition-colors duration-300
                   group-hover:text-blue-400"
              />

              <!-- ✅ HINO Text Logo -->
              <span
                v-else
                class="font-black tracking-[0.15em]
                   text-[12px]
                   text-slate-400
                   transition-colors duration-300
                   group-hover:text-blue-400"
              >
                HINO
              </span>

              <!-- Cut-off light line -->
              <span class="absolute -bottom-1 left-1/2 -translate-x-1/2
                   w-6 h-[2px]
                   bg-blue-500/70 opacity-0
                   blur-[1px]
                   transition-all duration-300
                   group-hover:opacity-100
                   group-hover:w-8" />
            </div>

            <!-- Name -->
            <span class="mt-4 text-sm font-medium tracking-wide
                 text-slate-400
                 transition-colors duration-300
                 group-hover:text-slate-200">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FEATURED PRODUCTS ================= -->
    <section class="py-24 bg-slate-950">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 class="text-2xl font-semibold text-white">
            Featured Products
          </h2>
          <a
            href="#/category"
            class="text-sm text-blue-400 hover:underline"
          >
            View all →
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-blue-500 transition"
          >
            <div class="aspect-[4/3] bg-slate-800" />
            <div class="p-4">
              <h3 class="text-sm font-medium text-white">
                LED Projector Headlamp
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                For European Trucks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="py-20 bg-blue-600">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-semibold text-white">
          Looking for Reliable Truck Headlamp Solutions?
        </h2>
        <p class="text-blue-100 mt-3 text-sm">
          Contact us for product details, pricing, and cooperation.
        </p>

        <div class="mt-8 flex justify-center gap-4 flex-wrap">
          <a
            href="#/contact"
            class="px-6 py-3 rounded-full bg-white text-blue-600 text-sm font-medium hover:bg-blue-50 transition"
          >
            Contact Us
          </a>
          <a
            href="https://wa.me/8618625286812"
            target="_blank"
            class="px-6 py-3 rounded-full border border-white text-white text-sm hover:bg-white/10 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 600ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Canvas 区域不要 pointer hit */
canvas {
  pointer-events: none;
}

/* Text Shadow on mobile */
@media (max-width: 768px) {
  h1 {
    text-shadow: 0 0 12px rgba(0, 0, 0, 0.7);
  }
}
</style>
