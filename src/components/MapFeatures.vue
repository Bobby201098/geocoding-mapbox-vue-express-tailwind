<template>
    <!-- Title -->
    <div class="absolute z-[3] w-full gap-4 bg-slate-300 px-2 py-8 md:top-[3px] md:left-[60px] md:w-auto md:px-0 md:py-0 rounded-md">
        <h1>Geocoding App by romijulianto</h1>
    </div>
  <div
    class="absolute z-[2] flex w-full gap-4 bg-transparent px-6 py-8 md:left-[60px] md:top-[40px] md:w-auto md:px-0 md:py-0 mt-[-13px]"
  >
    <!-- Search -->
    <div class="w-[350px] md:min-w[350px] relative flex-1">
      <input
        class="w-full py-3 pr-4 text-sm rounded-md shadow-md pl-9 focus:outline-none"
        type="text"
        placeholder="Search your address here"
        v-model="searchQueryUser"
        @input="search"
      />
      <!-- Search Icon -->
      <div class="absolute left-[8px] top-0 flex h-full items-center">
        <i class="fas fa-search"></i>
      </div>

      <!-- Search Results -->
      <div class="absolute w-full mt-2">
        <!-- Results -->
        <div v-if="searchQueryUser" class="overflow-scrool h-[500px] rounded-md bg-white">
          <div
            class="flex px-4 py-2 cursor-pointer gap-x-2 hover:bg-slate-600 hover:text-white"
            v-for="(result, index) in searchData"
            :key="index"
          >
            <i class="fas fa-map-marker-alt"></i>
            <p class="text-xs">{{ result.place_name }}</p>
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
import { ref } from "vue";
import axios from "axios";

export default {
  props: ["coords", "fetchCoords"],
  setup(props) {
    const searchQueryUser = ref(null);
    const searchData = ref(null);
    const queryTimeout = ref(null);

    // functioin searchfromUser
    const search = () => {

        // clearTimeOut
        clearTimeout(queryTimeout.value);

      queryTimeout.value = setTimeout(async () => {
        if (searchQueryUser.value !== "") {
          const params = new URLSearchParams({
            fuzzyMatch: true,
            lang: "en",
            limit: 10,
            proximity: props.coords.value
              ? `${props.coords.value.lang},${props.coords.value.lat}`
              : "0,0",
          });
          const getData = await axios.get(
            `http://localhost:3200/api/search/${searchQueryUser.value}?${params}`
          );
          searchData.value = getData.data.features;
          console.log(searchData.value)
        }
      }, 750);
    };

    return { searchData, searchQueryUser, queryTimeout, search };
  },
};
</script>
