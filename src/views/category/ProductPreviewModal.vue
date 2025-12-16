<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

/* =====================
   锁 body 滚动
===================== */
const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}
const unlockScroll = () => {
  document.body.style.overflow = ''
}

watch(
  () => props.modelValue,
  (v) => {
    v ? lockScroll() : unlockScroll()
  }
)

/* =====================
   ESC 关闭
===================== */
const onKeydown = (e) => {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  unlockScroll()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <!-- 遮罩（简单） -->
        <div
          class="absolute inset-0 bg-black/40"
          @click="close"
        />

        <!-- Modal -->
        <div
          class="relative z-10
                 w-[92vw] max-w-5xl
                 max-h-[90vh]
                 bg-white text-slate-800
                 rounded-2xl
                 shadow-xl
                 overflow-hidden
                 flex flex-col"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between
                   px-6 py-4
                   border-b border-slate-200"
          >
            <slot name="title">
              <h3 class="text-sm font-semibold tracking-wide text-slate-900">
                Product Preview
              </h3>
            </slot>

            <button
              @click="close"
              class="text-slate-400 hover:text-slate-900 transition"
            >
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
