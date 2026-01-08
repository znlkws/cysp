<script setup>
import { ref, watch, defineComponent, h, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

// SVG Icons
import HomeIcon from '@/assets/svg/home.svg'
import CategoryIcon from '@/assets/svg/goods.svg'
import InfoIcon from '@/assets/svg/info-circle.svg'
import PhoneIcon from '@/assets/svg/phone.svg'

const mobileMenuOpen = ref(false)
const route = useRoute()

// 关闭菜单：供 overlay、路由变化等调用
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// 路由变化自动收起（你已有）
watch(
  () => route.fullPath,
  () => (mobileMenuOpen.value = false)
)

// 锁 body 滚动（你已有）
watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// ========== 计算 header 高度（用于 panel top） ==========
const headerRef = ref(null)
const headerTop = ref(0) // 顶部偏移，一般是 header 高度

const updateHeaderTop = () => {
  if (!headerRef.value) return
  const rect = headerRef.value.getBoundingClientRect()
  headerTop.value = Math.round(rect.height)
}

onMounted(() => {
  // 等 DOM 完全渲染后读取高度
  nextTick(updateHeaderTop)
  window.addEventListener('resize', updateHeaderTop)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateHeaderTop)
})

/* ✅ 桌面导航组件（保持你原样） */
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

const isOnlyCategory = location.href.indexOf('cn.') > -1

/* ✅ 移动端导航组件（保持你原样） */
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
  <!-- headerRef 用来测量 header 高度 -->
  <header ref="headerRef" class="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-18">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center">
        <img src="@/assets/cysp1.png" class="h-14" alt="Logo" />
      </RouterLink>

      <!-- Desktop -->
      <nav class="hidden md:flex gap-10" v-show="!isOnlyCategory">
        <NavLink to="/" label="Home"><HomeIcon /></NavLink>
        <NavLink to="/category" label="Category"><CategoryIcon /></NavLink>
        <NavLink to="/about" label="About"><InfoIcon /></NavLink>
        <NavLink to="/contact" label="Contact"><PhoneIcon /></NavLink>
      </nav>

      <!-- Mobile Toggle -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        aria-label="Toggle menu"
        v-show="!isOnlyCategory"
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

    <!-- 使用 teleport 把 overlay 挂到 body，避免被父容器约束 -->
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 z-40 md:hidden"
          aria-hidden="true"
        >
          <!-- 点击遮罩任意位置收起 -->
          <div
            class="absolute inset-0 bg-black/30 backdrop-blur-sm"
            @click="closeMobileMenu"
          />

          <!-- 菜单面板：使用 fixed 并根据 headerTop 设 top 值 -->
          <nav
            class="fixed left-0 w-full bg-white border-t shadow-lg"
            :style="{ top: headerTop + 'px' }"
            @click.stop
          >
            <MobileLink to="/" label="Home" @click.native="closeMobileMenu"><HomeIcon /></MobileLink>
            <MobileLink to="/category" label="Category" @click.native="closeMobileMenu"><CategoryIcon /></MobileLink>
            <MobileLink to="/about" label="About" @click.native="closeMobileMenu"><InfoIcon /></MobileLink>
            <MobileLink to="/contact" label="Contact" @click.native="closeMobileMenu"><PhoneIcon /></MobileLink>
          </nav>
        </div>
      </transition>
    </teleport>
  </header>
</template>

<style scoped>
.icon svg {
  width: 20px;
  height: 20px;
}

/* overlay 淡入 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 220ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
