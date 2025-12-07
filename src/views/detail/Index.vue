<script setup>
import { useRoute } from 'vue-router'
import { products } from '@/data/products'
import { imgUrl } from '@/utils/index'

const route = useRoute()
const product = products.find(p => p.id === route.params.id)
</script>

<template>
  <div v-if="product" class="max-w-6xl mx-auto p-8">
    <h1 class="text-2xl font-bold mb-6">{{ product.name }}</h1>

    <!-- 图片 -->
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      <LazyImage
        v-for="src in product.images"
        :key="src"
        :src="imgUrl(src)"
        class="rounded-xl"
      />
    </div>

    <!-- 特点 -->
    <div class="mb-6">
      <h2 class="font-semibold mb-2">产品特点</h2>
      <ul class="list-disc ml-6 text-gray-600">
        <li v-for="f in product.features" :key="f">
          {{ f }}
        </li>
      </ul>
    </div>

    <!-- 参数 -->
    <div>
      <h2 class="font-semibold mb-2">技术参数</h2>
      <table class="w-full text-sm border">
        <tr
          v-for="(v, k) in product.specs"
          :key="k"
        >
          <td class="border px-3 py-2 bg-gray-50">
            {{ k }}
          </td>
          <td class="border px-3 py-2">
            {{ v }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
