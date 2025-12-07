<template>
  <div>
    <!-- Hero 主视觉 -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        <!-- 左 -->
        <div>
          <h1 class="text-4xl md:text-5xl font-bold leading-tight">
            让光更亮 · 让路更远
          </h1>
          <p class="mt-6 text-white/80 text-lg leading-relaxed">
            驰誉尚品工业级改装大灯<br />
            高亮远射 · 稳定可靠 · 智造光明之路
          </p>

          <div class="mt-10 flex gap-4">
            <RouterLink
              to="/category"
              class="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold"
            >
              查看产品
            </RouterLink>
            <a
              href="#"
              class="border border-white/40 px-6 py-3 rounded-xl"
            >
              图册下载
            </a>
          </div>
        </div>

        <!-- 右：主图 -->
        <div class="relative">
          <LazyImage
            :src="img('daf.png')"
            class="rounded-3xl shadow-2xl"
            alt="大灯展示"
          />
        </div>
      </div>
    </section>

    <!-- 核心优势 -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
        <Feature title="高亮远射" desc="工程级透镜光学方案" />
        <Feature title="稳定可靠" desc="严苛环境测试验证" />
        <Feature title="精准切线" desc="夜间安全驾驶保障" />
        <Feature title="车型覆盖广" desc="多车型无损安装" />
      </div>
    </section>

    <!-- 产品预览 -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold mb-10">热门产品</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <ProductCard
            v-for="i in 3"
            :key="i"
            title="FH / FH16 LED 双透镜大灯"
            desc="适配 FH3 / FH4 / FH5"
            :img="img('/products/demo.jpg')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const img = (path) => import.meta.env.VITE_IMG_BASE_URL + path

const Feature = {
  props: ['title', 'desc'],
  template: `
    <div class="bg-white rounded-2xl p-8 shadow-sm">
      <h3 class="font-semibold text-lg">{{ title }}</h3>
      <p class="text-gray-500 mt-2 text-sm">{{ desc }}</p>
    </div>
  `,
}

const ProductCard = {
  props: ['title', 'desc', 'img'],
  template: `
    <div class="rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition">
      <img :src="img" class="aspect-[4/3] object-cover" />
      <div class="p-5">
        <h3 class="font-semibold text-lg">{{ title }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ desc }}</p>
        <div class="mt-4 text-blue-600 font-semibold text-sm">查看详情</div>
      </div>
    </div>
  `,
}
</script>
