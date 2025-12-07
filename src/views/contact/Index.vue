<script setup>
import PhoneIcon from '@/assets/svg/phone.svg'
import MailIcon from '@/assets/svg/mail.svg'
import FacebookIcon from '@/assets/svg/facebook.svg'
import WhatsappIcon from '@/assets/svg/whatsapp.svg'
import LocationIcon from '@/assets/svg/location.svg'
</script>

<template>
  <section class="bg-slate-900 text-slate-200 py-16">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- ✅ 左侧：公司信息 -->
      <div>
        <h2 class="text-2xl font-semibold text-white mb-6">
          Contact Us
        </h2>

        <div class="space-y-5 text-sm leading-relaxed">

          <!-- 公司名 -->
          <p class="font-medium text-slate-100">
            Danyang Senlang Auto Parts Co., Ltd.
          </p>

          <!-- 地址 -->
          <div class="flex items-start gap-3">
            <LocationIcon class="w-5 h-5 mt-0.5 icon-muted" />
            <p>
              <span class="font-medium">Address:</span><br />
              Jiezhong Village Industrial Park,<br />
              Jiepai Town, Danyang City,<br />
              Jiangsu Province, China
            </p>
          </div>

          <!-- 电话 -->
          <div class="flex items-center gap-3">
            <PhoneIcon class="w-5 h-5 icon-muted" />
            <p>
              <span class="font-medium">Tel:</span>
              <a
                href="tel:+8615306107111"
                class="text-blue-400 hover:underline ml-1"
              >
                +86-15306107111
              </a>
            </p>
          </div>

          <!-- 邮箱 -->
          <div class="flex items-center gap-3">
            <MailIcon class="w-5 h-5 icon-muted" />
            <p>
              <span class="font-medium">Email:</span>
              <a
                href="mailto:1545249100@qq.com"
                class="text-blue-400 hover:underline ml-1"
              >
                1545249100@qq.com
              </a>
            </p>
          </div>

          <!-- ✅ 社交按钮 -->
          <div class="flex items-center gap-4 pt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61576500899489"
              target="_blank"
              class="flex items-center gap-2 px-5 py-2 rounded-full
                     bg-blue-600 text-white text-xs
                     hover:bg-blue-500 transition"
            >
              <FacebookIcon class="w-4 h-4" />
              Facebook
            </a>

            <a
              href="https://wa.me/8618625286812"
              target="_blank"
              class="flex items-center gap-2 px-5 py-2 rounded-full
                     bg-emerald-500 text-white text-xs
                     hover:bg-emerald-400 transition"
            >
              <WhatsappIcon class="w-4 h-4" style="color: #25D366"/>
              WhatsApp
            </a>
          </div>

        </div>
      </div>

      <!-- ✅ 右侧：二维码 -->
      <div class="grid grid-cols-2 gap-8 place-items-center">

        <!-- 微信二维码 -->
        <div class="text-center">
          <div class="bg-white rounded-xl shadow-md
                   w-[160px] h-[160px]
                   flex items-center justify-center p-4">
            <img
              src="@/assets/img/wechat.png"
              alt="WeChat QR Code"
              class="max-w-full max-h-full object-contain"
            />
          </div>
          <p class="text-xs mt-3 text-slate-300">
            WeChat
          </p>
        </div>

        <!-- WhatsApp 二维码 -->
        <div class="text-center">
          <div class="bg-white rounded-xl shadow-md
                   w-[160px] h-[160px]
                   flex items-center justify-center p-4">
            <img
              src="@/assets/img/whatsapp.png"
              alt="WhatsApp QR Code"
              class="max-w-full max-h-full object-contain"
            />
          </div>
          <p class="text-xs mt-3 text-slate-300">
            WhatsApp
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.icon-muted {
  filter: brightness(0) invert(0.8);
  opacity: 0.85;
}
</style>
