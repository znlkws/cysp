<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { imgUrl } from '@/utils/index'
import CategoryList from './CategoryList.vue'

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
  <div
    class="min-h-full w-full"
    style="padding: 10px 0;"
  >
    <!-- 外层：与 Header 保持一致的居中容器 -->
    <div
      class="flex justify-center bg-gray-50 min-h-full"
      style="margin: 0 auto"
    >
      <div class="w-full max-w-7xl">

        <!-- ===== 手机端：顶部横向分类（放在最外层，避免布局受内部影响） ===== -->
        <!-- <div class="md:hidden sticky top-0 z-20 bg-white border-b"> -->
        <div class="md:hidden sticky top-0 z-20 bg-white mobile-cat-shadow">
          <CategoryList
            v-model="current"
            :categories="categories"
            horizontal
          />
        </div>

        <!-- 主体：左栏 + 内容 -->
        <div class="flex min-h-full pb-3">

          <!-- ===== 左侧分类：PC 可见，移动隐藏 ===== -->
          <aside class="hidden md:block bg-white border-r p-4 w-56 shrink-0">
            <div
              v-for="c in categories"
              :key="c.id"
              @click="current = c.id"
              :class="[
                'px-4 py-2 mb-1 rounded-lg cursor-pointer transition',
                current === c.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100',
              ]"
            >
              {{ c.name }}
            </div>
          </aside>

          <!-- ===== 产品区容器 ===== -->
          <div class="flex-1 px-4 sm:px-6 lg:px-8 pt-4">
            <!-- 空状态（当没有产品时显示） -->
            <div
              v-if="list.length === 0 && current !== 'other'"
              class="flex items-center justify-center min-h-[320px] w-full rounded-xl border border-dashed border-slate-300 bg-white/60 text-slate-400"
            >
              <div class="text-center">
                <div class="text-sm font-medium tracking-wide">No products in this category</div>
                <div class="text-xs mt-1">Please select another category</div>
              </div>
            </div>

            <!-- ===== Other 分类专属入口 ===== -->
            <div
              v-if="current === 'other'"
              class="mb-8 flex justify-center"
            >
              <a
                :href="imgUrl('cy2024.pdf')"
                target="_blank"
                class="group inline-flex items-center gap-3
                  px-8 py-4 rounded-2xl
                  bg-gradient-to-r from-blue-600 to-blue-500
                  text-white font-medium tracking-wide
                  shadow-lg shadow-blue-500/30
                  transition-all duration-300
                  hover:translate-y-[-1px]
                  hover:shadow-xl hover:shadow-blue-500/40"
              >
                <span>View Full Product Catalog (PDF)</span>
                <span class="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <!-- 有数据时使用 TransitionGroup 渲染 Grid -->
            <TransitionGroup
              v-else
              name="fade-move"
              tag="div"
              class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 items-start justify-items-start content-start auto-rows-min min-w-0"
            >
              <template
                v-for="p in displayList"
                :key="p.id"
              >
                <!-- 正常产品卡（实际渲染） -->
                <div
                  v-if="!p.__placeholder"
                  class="group w-full bg-white rounded-3xl overflow-hidden border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:border-blue-300"
                >
                  <!-- 图片 -->
                  <div class="relative">
                    <!-- {{imgUrl(p.cover)}} -->
                    <LazyImage
                      :src="imgUrl(p.cover)"
                      class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <!-- 信息区 -->
                  <div class="p-3 pl-4 bg-slate-50 border-t border-slate-200">
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold text-[15px] transition-colors group-hover:text-blue-600">
                        {{ p.name }}
                      </h3>
                      <span
                        class="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        v-show="p.LED !== false"
                      >
                        LED
                      </span>
                    </div>

                    <div class="mt-0 flex items-center justify-between">
                      <span class="text-xs text-slate-500">{{p.type}}</span>
                      <span class="text-xs font-medium text-blue-600 opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        View →
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 占位元素（不可见，但参与布局以稳定 Grid） -->
                <div
                  v-else
                  class="invisible pointer-events-none"
                />
              </template>
            </TransitionGroup>
          </div>
        </div>
        <!-- end 主体 -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 动画 */
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

/* 隐藏横向滚动条（CategoryList 的样式如果需要也可放到组件内） */
@media (max-width: 767px) {
  ::-webkit-scrollbar {
    display: none;
  }
}
.mobile-cat-shadow {
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.04),
    0 6px 12px -6px rgba(15, 23, 42, 0.12);
}
</style>
