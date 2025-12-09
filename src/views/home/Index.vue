<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { imgUrl } from '@/utils/index'

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

/* 简单轮播（不依赖库，稳定） */
const slides = [
  {
    title: 'Ultra-Long Beam Distance',
    desc: 'Designed for night highways and heavy-duty operation',
    img: '/hero/slide1.jpg',
  },
  {
    title: 'Precision Projector Optics',
    desc: 'Sharp cut-off, stable output, OEM-grade structure',
    img: '/hero/slide2.jpg',
  },
  {
    title: 'Plug & Play Installation',
    desc: 'No vehicle modification required',
    img: '/hero/slide3.jpg',
  },
]

const currentSlide = ref(0)

onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 4000)
})
</script>

<template>
  <main class="w-full bg-slate-900 text-slate-100">

    <!-- ================= HERO WITH CANVAS ================= -->
  <section class="relative min-h-[100svh] flex items-center overflow-hidden select-none">

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
    <section class="py-20 bg-slate-950">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div class="text-center">
            <div class="text-blue-500 text-2xl font-semibold">OEM</div>
            <p class="mt-3 text-sm text-slate-400">
              OEM-grade engineering and manufacturing
            </p>
          </div>
          <div class="text-center">
            <div class="text-blue-500 text-2xl font-semibold">Beam</div>
            <p class="mt-3 text-sm text-slate-400">
              Precise beam pattern & sharp cut-off
            </p>
          </div>
          <div class="text-center">
            <div class="text-blue-500 text-2xl font-semibold">24V/12V</div>
            <p class="mt-3 text-sm text-slate-400">
              Designed for heavy-duty 24V/12V truck systems
            </p>
          </div>
          <div class="text-center">
            <div class="text-blue-500 text-2xl font-semibold">Fit</div>
            <p class="mt-3 text-sm text-slate-400">
              Plug & play, no vehicle modification required
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= VEHICLE COVERAGE ================= -->
    <section class="py-20 bg-slate-900">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-semibold text-white text-center mb-12">
          Vehicle Coverage
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center text-center text-slate-400 text-sm">
          <div>Volvo FH</div>
          <div>MAN TGX</div>
          <div>Scania</div>
          <div>Actros</div>
          <div>Isuzu</div>
          <div>Hino</div>
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
          <a href="#/category" class="text-sm text-blue-400 hover:underline">
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
    text-shadow: 0 0 12px rgba(0,0,0,0.7);
  }
}
</style>
