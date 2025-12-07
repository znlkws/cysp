<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <Header class="flex-shrink-0" />
    <div class="flex flex-1 overflow-hidden ">
      <router-view class="min-h-full w-full" />
    </div>
  </div>
</template>

<style scoped>
</style>
