<template>
  <div
    class="absolute z-[2] flex w-full gap-4 bg-transparent px-6 py-8 md:left-[60px] md:top-[40px] md:w-auto md:px-0 md:py-0"
  >
    <!-- Search -->
    <div class="relative flex-1 md:min-w[350px]">
      <input
       class="w-full py-3 pr-4 text-sm rounded-md shadow-md pl-9 focus:outline-none"
        type="text"
        placeholder="Search your address"
      />
      <!-- Search Icon -->
      <div class="absolute top-0 left-[8px] h-full flex items-center">
        <i class="fas fa-search"></i>
      </div>

      <!-- Search Results -->
      <div class="absolute w-full mt-2">
        <!-- Results -->
        <div class="h-[200px] overflow-scrool bg-white rounded-md">
            <div class="flex px-4 py-2 cursor-pointer gap-x-2 hover:bg-slate-600 hover:text-white">
                <i class="fas fa-map-marker-alt"></i>
                <p class="text-xs">Testing Results</p>
            </div>
        </div>
      </div>
    </div>

    <!-- Geolocation -->
    <div
      class="flex min-h-[30px] items-center rounded-md px-3 py-3 shadow-md"
      :class="{ 'bg-slate-500': coords }"
      @click="$emit('getGeolocation')"
    >
      <i
        class="fas fa-location-arrow text-state-500 text-[18px]"
        :class="{ 'text-white': coords, 'animate-pulse': fetchCoords }"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['coords', 'fetchCoords'],
}
</script>
