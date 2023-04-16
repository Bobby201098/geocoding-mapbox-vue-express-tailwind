<template>
  <div
    class="absolute z-[2] flex w-full gap-4 bg-transparent px-6 py-8 md:left-[60px] md:top-[40px] md:w-auto md:px-0 md:py-0"
  >
    <!-- Geolocation -->
    <div
      class="flex min-h-[45px] items-center rounded-md px-4 shadow-md"
      :class="{ 'bg-slate-600': coords }"
      @click="$emit('getGeolocation')"
    >
      <i class="fas fa-location-arrow text-state-600 text-[18px]" :class="{ 'text-white': coords, 'animate-pulse': fetchCoords }"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coords", "fetchCoords"],
};
</script>
