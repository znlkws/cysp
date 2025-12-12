<script setup>
import PhoneIcon from '@/assets/svg/phone.svg'
import MailIcon from '@/assets/svg/mail.svg'
import FacebookIcon from '@/assets/svg/facebook.svg'
import WhatsappIcon from '@/assets/svg/whatsapp.svg'
import LocationIcon from '@/assets/svg/location.svg'
</script>

<template>
  <section class="bg-[#0E1626] text-slate-300 py-20">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14">

      <!-- 左侧 -->
      <div>
        <h2 class="text-xl font-medium tracking-wide text-slate-100 mb-8">
          Contact Us
        </h2>

        <div class="space-y-6 text-sm leading-relaxed text-slate-400">

          <p class="font-medium text-slate-200">
            Danyang SenLang Auto Lighting Co., Ltd.
          </p>

          <div class="flex items-start gap-3">
            <LocationIcon class="w-5 h-5 mt-0.5 icon-muted" />
            <p>
              <span class="font-medium text-slate-300">Address:</span><br />
              No. 10 Fengshou Road,<br />
              Jiepai Town, Danyang City,<br />
              Jiangsu Province, China
            </p>
          </div>

          <div class="flex items-center gap-3">
            <PhoneIcon class="w-5 h-5 icon-muted" />
            <p>
              <span class="font-medium text-slate-300">Tel:</span>
              <a
                href="tel:+8615306107111"
                class="text-sky-400 hover:underline ml-1"
              >
                +86-15306107111
              </a>
            </p>
          </div>

          <div class="flex items-center gap-3">
            <MailIcon class="w-5 h-5 icon-muted" />
            <p>
              <span class="font-medium text-slate-300">Email:</span>
              <a
                href="mailto:1545249100@qq.com"
                class="text-sky-400 hover:underline ml-1"
              >
                1545249100@qq.com
              </a>
            </p>
          </div>

          <div class="flex items-center gap-4 pt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61576500899489"
              target="_blank"
              class="flex items-center gap-2 px-5 py-2 rounded-lg
                   border border-blue-500/40 text-blue-400 text-xs
                   hover:bg-blue-500/10 transition"
            >
              <FacebookIcon class="w-4 h-4" />
              Facebook
            </a>

            <a
              href="https://wa.me/8618625286812"
              target="_blank"
              class="flex items-center gap-2 px-5 py-2 rounded-lg
                   border border-emerald-400/40 text-emerald-400 text-xs
                   hover:bg-emerald-400/10 transition"
            >
              <WhatsappIcon class="w-4 h-4" />
              WhatsApp
            </a>
          </div>

        </div>
      </div>

      <!-- 右侧二维码 -->
      <div class="grid grid-cols-2 gap-10 place-items-center">
        <div class="text-center">
          <div class="bg-slate-100/95 rounded-2xl
                    shadow-[0_12px_40px_-20px_rgba(15,23,42,0.6)]
                    w-[160px] h-[160px] flex items-center justify-center p-4">
            <img
              src="@/assets/img/wechat.png"
              class="object-contain"
            />
          </div>
          <p class="text-xs mt-3 text-slate-400">WeChat</p>
        </div>

        <div class="text-center">
          <div class="bg-slate-100/95 rounded-2xl
                    shadow-[0_12px_40px_-20px_rgba(15,23,42,0.6)]
                    w-[160px] h-[160px] flex items-center justify-center p-4">
            <img
              src="@/assets/img/whatsapp.png"
              class="object-contain"
            />
          </div>
          <p class="text-xs mt-3 text-slate-400">WhatsApp</p>
        </div>
      </div>

    </div>
  </section>

</template>

<style scoped>
.icon-muted {
  filter: brightness(0) invert(0.7);
  opacity: 0.75;
}
</style>
