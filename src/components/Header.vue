  <!-- src="@/assets/cysp.png" -->
<script setup>
import { ref } from 'vue'

// 导入本地 SVG
import HomeIcon from '@/assets/svg/home.svg'
import CategoryIcon from '@/assets/svg/goods.svg'
import InfoIcon from '@/assets/svg/info-circle.svg'
import PhoneIcon from '@/assets/svg/phone.svg'

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="#/">
          <img class="h-20 w-auto" src="@/assets/cysp1.png" alt="Logo" />
        </a>
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="flex md:hidden">
        <button @click="mobileMenuOpen = !mobileMenuOpen" type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 桌面菜单 -->
      <nav class="hidden md:flex space-x-10">
        <a href="#/" class="flex items-center text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200">
          <HomeIcon class="h-5 w-5 mr-2" />
          Home
        </a>
        <a href="#/category" class="flex items-center text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200">
          <CategoryIcon class="h-5 w-5 mr-2" />
          Category
        </a>
        <a href="#/about" class="flex items-center text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200">
          <InfoIcon class="h-5 w-5 mr-2" />
          About
        </a>
        <a href="#/contact" class="flex items-center text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200">
          <PhoneIcon class="h-5 w-5 mr-2" />
          Contact Us
        </a>
      </nav>
    </div>

    <!-- 移动端折叠菜单 -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
      <nav class="px-2 pt-2 pb-4 space-y-2">
        <a href="#/" class="flex items-center px-4 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors">
          <HomeIcon class="h-5 w-5 mr-2" />
          Home
        </a>
        <a href="#/category" class="flex items-center px-4 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors">
          <CategoryIcon class="h-5 w-5 mr-2" />
          Category
        </a>
        <a href="#/about" class="flex items-center px-4 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors">
          <InfoIcon class="h-5 w-5 mr-2" />
          About
        </a>
        <a href="#/contact" class="flex items-center px-4 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors">
          <PhoneIcon class="h-5 w-5 mr-2" />
          Contact Us
        </a>
      </nav>
    </div>
  </header>
</template>



<style scoped>
/* 可选：header 固定高度 shadow */
</style>
