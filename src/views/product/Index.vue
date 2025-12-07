<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { imgUrl } from '@/utils/index'

const current = ref(categories[0].id)

const list = computed(() =>
  products.filter((p) => p.category === current.value)
)

const displayList = ref([])

watch(
  list,
  async (newList) => {
    displayList.value = []

    const arr = [...newList]
    setTimeout(() => {
      displayList.value = arr
    }, 300)
  },
  { immediate: true }
)

</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- ✅ 分类 -->
    <aside class="w-64 bg-white border-r p-4">
      <div
        v-for="c in categories"
        :key="c.id"
        @click="current = c.id"
        :class="[
          'px-4 py-2 mb-1 rounded-lg cursor-pointer transition',
          current === c.id
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-100',
        ]"
      >
        {{ c.name }}
      </div>
    </aside>

    <!-- ✅ 产品（动画核心） -->
    <TransitionGroup
      name="fade-move"
      tag="main"
      class="flex-1 p-8 grid md:grid-cols-3 gap-8 items-start"
    >
      <template
        v-for="p in displayList"
        :key="p.id"
      >
        <!-- ✅ 正常产品卡 -->
        <div
          v-if="!p.__placeholder"
          class="
        group bg-white rounded-3xl overflow-hidden
        border border-slate-200
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-2xl hover:border-blue-300
      "
        >
          <!-- 图片 -->
          <div class="relative">
            <LazyImage
              :src="imgUrl(p.cover)"
              class="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.04]"
            />

            <div class="
            pointer-events-none absolute inset-0
            bg-gradient-to-t from-blue-500/10 via-transparent to-transparent
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          " />
          </div>

          <!-- 信息区 -->
          <div class="p-5 pt-4 bg-slate-50 border-t border-slate-200">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-[15px] transition-colors group-hover:text-blue-600">
                {{ p.name }}
              </h3>

              <span class="text-[10px] px-2 py-0.5 rounded-full
                   bg-blue-50 text-blue-600
                   opacity-0 transition-opacity duration-300
                   group-hover:opacity-100">
                LED
              </span>
            </div>

            <div class="mt-3 flex items-center justify-between">
              <span class="text-xs text-slate-500">
                Truck Headlamp
              </span>

              <span class="text-xs font-medium text-blue-600
                   opacity-0 translate-x-1
                   transition-all duration-300
                   group-hover:opacity-100 group-hover:translate-x-0">
                View →
              </span>
            </div>
          </div>
        </div>

        <!-- ✅ 占位节点（参与 Grid & 动画，但完全不可见） -->
        <div
          v-else
          class="invisible pointer-events-none"
        />
      </template>
    </TransitionGroup>

  </div>
</template>

<style scoped>
/* 分类切换动画（官网级） */
.fade-move-enter-active,
.fade-move-leave-active {
  transition: all 300ms ease;
}

.fade-move-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.98);
}

.fade-move-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

/* 保证 Grid 重排平滑并优化性能 */
.fade-move-move {
  transition: transform 300ms cubic-bezier(0.2, 0.9, 0.2, 1);
  will-change: transform;
}
</style>
