<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let ctx
let animationId
let phase = 0

onMounted(() => {
  const c = canvas.value
  ctx = c.getContext('2d')

  const resize = () => {
    c.width = c.offsetWidth
    c.height = c.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height)

    const centerY = c.height * 0.55
    phase += 0.008

    // ===== GRID (engineering, layered) =====
    const step = 80

    for (let x = 0; x < c.width; x += step) {
      ctx.strokeStyle =
        x % (step * 4) === 0
          ? 'rgba(148,163,184,0.06)'
          : 'rgba(148,163,184,0.025)'
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, c.height)
      ctx.stroke()
    }

    for (let y = 0; y < c.height; y += step) {
      ctx.strokeStyle =
        y % (step * 4) === 0
          ? 'rgba(148,163,184,0.06)'
          : 'rgba(148,163,184,0.025)'
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(c.width, y)
      ctx.stroke()
    }

    // ===== OPTICAL ENERGY BAND =====
    const bandOffset = Math.sin(phase) * 18
    const bandY = centerY + bandOffset

    const bandGradient = ctx.createLinearGradient(
      0,
      bandY - 120,
      0,
      bandY + 120
    )
    bandGradient.addColorStop(0, 'rgba(59,130,246,0)')
    bandGradient.addColorStop(0.45, 'rgba(59,130,246,0.05)')
    bandGradient.addColorStop(0.5, 'rgba(59,130,246,0.16)')
    bandGradient.addColorStop(0.55, 'rgba(59,130,246,0.05)')
    bandGradient.addColorStop(1, 'rgba(59,130,246,0)')

    ctx.fillStyle = bandGradient
    ctx.fillRect(0, bandY - 120, c.width, 240)

    animationId = requestAnimationFrame(draw)
  }

  draw()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>
