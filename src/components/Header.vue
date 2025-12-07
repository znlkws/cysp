<script setup>
import { ref, watch, defineComponent, h } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

// SVG Icons
import HomeIcon from '@/assets/svg/home.svg'
import CategoryIcon from '@/assets/svg/goods.svg'
import InfoIcon from '@/assets/svg/info-circle.svg'
import PhoneIcon from '@/assets/svg/phone.svg'

const mobileMenuOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => (mobileMenuOpen.value = false)
)

watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

/* ✅ 桌面导航组件 */
const NavLink = defineComponent({
  props: {
    to: String,
    label: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        RouterLink,
        {
          to: props.to,
          class:
            'group flex items-center gap-2 font-semibold text-base text-slate-700 hover:text-blue-600 transition',
          activeClass: 'text-blue-600',
        },
        {
          default: () => [
            h('span', { class: 'icon' }, slots.default?.()),
            h(
              'span',
              { class: 'relative' },
              [
                props.label,
                h('span', {
                  class:
                    'absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full',
                }),
              ]
            ),
          ],
        }
      )
  },
})

/* ✅ 移动端导航组件 */
const MobileLink = defineComponent({
  props: {
    to: String,
    label: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        RouterLink,
        {
          to: props.to,
          class:
            'flex items-center gap-3 px-5 py-4 text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition',
          activeClass: 'text-blue-600 bg-blue-50',
        },
        {
          default: () => [
            h('span', { class: 'icon' }, slots.default?.()),
            props.label,
          ],
        }
      )
  },
})
</script>

<template>
  <header class="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-18">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center">
        <img src="@/assets/cysp1.png" class="h-14" alt="Logo" />
      </RouterLink>

      <!-- Desktop -->
      <nav class="hidden md:flex gap-10">
        <NavLink to="/" label="Home"><HomeIcon /></NavLink>
        <NavLink to="/category" label="Category"><CategoryIcon /></NavLink>
        <NavLink to="/about" label="About"><InfoIcon /></NavLink>
        <NavLink to="/contact" label="Contact"><PhoneIcon /></NavLink>
      </nav>

      <!-- Mobile Toggle -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!mobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <nav v-if="mobileMenuOpen" class="md:hidden border-t bg-white">
        <MobileLink to="/" label="Home"><HomeIcon /></MobileLink>
        <MobileLink to="/category" label="Category"><CategoryIcon /></MobileLink>
        <MobileLink to="/about" label="About"><InfoIcon /></MobileLink>
        <MobileLink to="/contact" label="Contact"><PhoneIcon /></MobileLink>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.icon svg {
  width: 20px;
  height: 20px;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 260ms ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
