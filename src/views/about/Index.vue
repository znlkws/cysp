<script setup>
import AboutBackgroundCanvas from './AboutBackgroundCanvas.vue'
</script>

<template>
  <main class="bg-slate-950 text-slate-200">

    <!-- HERO -->
    <section class="relative overflow-hidden">
      <!-- Canvas background -->
      <AboutBackgroundCanvas />

      <!-- 原有光晕 -->
      <div class="absolute inset-0 pointer-events-none
           bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.12),transparent_60%)]" />

      <div class="relative max-w-5xl mx-auto px-6 py-32 text-center">
        <h1 class="text-3xl md:text-4xl font-semibold text-white tracking-wide">
          About Us
        </h1>
        <p class="mt-8 text-base md:text-lg text-slate-400 leading-relaxed">
          We specialize in heavy-duty truck headlamp modification and lighting
          solutions for European and Japanese trucks.
        </p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-24">
      <div class="max-w-6xl mx-auto px-6 space-y-24">

        <!-- What We Do -->
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <h2 class="text-xl font-semibold text-white tracking-wide">
            What We Do
          </h2>
          <p class="text-slate-400 leading-relaxed">
            We develop and manufacture heavy-duty truck headlamp upgrade solutions,
            focusing on LED and projector-based systems with OEM-grade beam patterns.
            Our products are designed to integrate seamlessly with 24V and 12V
            electrical systems and support model-specific plug & play installation.
          </p>
        </div>

        <!-- Quality -->
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <h2 class="text-xl font-semibold text-white tracking-wide">
            Quality & Engineering
          </h2>
          <p class="text-slate-400 leading-relaxed">
            Product development is driven by real operating conditions, with
            emphasis on structural reliability, thermal stability, and consistent
            light output. Each unit is inspected before shipment to ensure stable
            performance for long-term use.
          </p>
        </div>

        <!-- Location -->
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <h2 class="text-xl font-semibold text-white tracking-wide">
            Location & Logistics
          </h2>
          <p class="text-slate-400 leading-relaxed">
            Located in Jiepai Town, Danyang City — one of China’s leading manufacturing
            bases for automotive body and lighting components — our facility benefits
            from a mature industrial environment and efficient logistics network.
            Convenient access to major transportation hubs supports reliable
            production scheduling and global delivery.
          </p>
        </div>

        <!-- Philosophy -->
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <h2 class="text-xl font-semibold text-white tracking-wide">
            Our Philosophy
          </h2>
          <p class="text-slate-400 leading-relaxed">
            We believe truck lighting upgrades should be functional, dependable,
            and engineered for real-world application. Our focus is long-term value,
            consistent quality, and stable cooperation with professional customers.
          </p>
        </div>

      </div>
    </section>

  </main>
</template>
