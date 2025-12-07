<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: String,
  alt: String,
  ratio: {
    type: String,
    default: '4/3',
  },
})

const el = ref(null)
const loaded = ref(false)
const error = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        load()
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer && observer.disconnect()
})

function load() {
  const img = new Image()
  img.src = props.src
  img.onload = () => (loaded.value = true)
  img.onerror = () => (error.value = true)
}
</script>

<template>
  <div
  ref="el"
  class="relative overflow-hidden bg-slate-100"
  :style="{ aspectRatio: ratio }"
>
  <!-- ✅ 骨架屏（冷白 + 蓝调，更高级） -->
  <div
    v-if="!loaded && !error"
    class="absolute inset-0 animate-pulse
           bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100"
  />

  <!-- ✅ 图片（真正居中） -->
  <img
    v-if="loaded"
    :src="src"
    :alt="alt"
    class="absolute inset-0 w-full h-full object-contain
           transition-opacity duration-500"
  />

  <!-- ✅ 加载失败（官网级风格） -->
  <div
    v-if="error"
    class="absolute inset-0 flex flex-col items-center justify-center
           bg-gradient-to-br from-slate-50 to-slate-200
           text-slate-500"
  >
    <!-- 图标 -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-9 h-9 mb-3 text-slate-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <!-- 文案 -->
    <span class="text-xs tracking-widest uppercase">
      Image Coming Soon
    </span>
  </div>
</div>

</template>
