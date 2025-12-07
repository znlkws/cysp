<script setup>
defineProps({
  categories: Array,
  modelValue: String,
  vertical: Boolean,
  horizontal: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div
    :class="[
      horizontal
        ? 'flex gap-2 overflow-x-auto px-3 py-2'
        : 'space-y-1',
    ]"
  >
    <button
      v-for="c in categories"
      :key="c.id"
      @click="$emit('update:modelValue', c.id)"
      :class="[
        'px-4 py-2 text-sm rounded-lg transition whitespace-nowrap',
        modelValue === c.id
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 hover:bg-gray-200',
      ]"
    >
      {{ c.name }}
    </button>
  </div>
</template>

<style scoped>
/* 隐藏横向滚动条（保留滑动能力） */
::-webkit-scrollbar {
  display: none;
}
</style>
