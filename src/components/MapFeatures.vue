<template>

  <div
    class="absolute z-[2] mt-[-13px] flex w-full gap-4 bg-transparent px-6 py-8 md:left-[60px] md:top-[40px] md:w-auto md:px-0 md:py-0"
  >
    <!-- Search -->
    <div class="md:min-w[350px] relative w-[350px] flex-1">
      <input
        class="w-full py-3 pr-4 text-sm rounded-md shadow-md pl-9 focus:outline-none"
        type="text"
        placeholder="Search your address here"
        v-model="searchQueryUser"
        @input="search"
        @focus="$emit('toggleSearchResults')"
      />
      <!-- Search Icon -->
      <div class="absolute left-[8px] top-0 flex h-full items-center">
        <i class="fas fa-search"></i>
      </div>

      <!-- Search Results -->
      <div class="absolute w-full mt-2">
        <!-- Results -->
        <div
          v-if="searchQueryUser && searchResults"
          class="h-[350px] overflow-auto scroll-smooth rounded-md bg-white"
        >
          <!-- Loading Spinner-->
          <LoadingSpinner v-if="!searchData" />
          <div v-if="searchData">
            <div
              class="flex px-4 py-2 cursor-pointer gap-x-2 hover:bg-slate-600 hover:text-white"
              v-for="(result, index) in searchData"
              :key="index"
              @click="selectResultPoint(result)"
            >
              <i class="fas fa-map-marker-alt"></i>
              <p class="text-xs">{{ result.place_name }}</p>
            </div>
          </div>
        </div>
        <!-- Selected Search Results -->
        <div v-if="selectedResults" class="px-4 py-3 mt-2 bg-white rounded-md">
          <i
            @click="removeResults"
            class="flex justify-end far fa-times-circle"
          ></i>
          <h1 class="text-lg">{{ selectedResults.text }}</h1>
          <p class="mb-1 text-xs">
            {{ selectedResults.properties.address }},
            {{ selectedResults.city }}, {{ selectedResults.state }}
          </p>
          <p class="text-xs">{{ selectedResults.properties.category }}</p>
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
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  props: ["coords", "fetchCoords", "searchResults"],
  components: { LoadingSpinner },
  setup(props, { emit }) {
    const searchQueryUser = ref(null);
    const searchData = ref(null);
    const queryTimeout = ref(null);
    const selectedResults = ref(null);

    // functioin searchfromUser
    const search = () => {
      // clearTimeOut
      clearTimeout(queryTimeout.value);

      // reset searchData
      searchData.value = null;

      queryTimeout.value = setTimeout(async () => {
        if (searchQueryUser.value !== "") {
          const params = new URLSearchParams({
            fuzzyMatch: true,
            lang: "en",
            limit: 20,
            proximity: props.coords.value
              ? `${props.coords.value.lang},${props.coords.value.lat}`
              : "0,0",
          });
          const getData = await axios.get(
            `https://kr760t-3200.csb.app/api/search/${searchQueryUser.value}?${params}`
          );
          searchData.value = getData.data.features;
          console.log(searchData.value);
        }
      }, 750);
    };

    const selectResultPoint = (result) => {
      selectedResults.value = result;
      emit("plotResult", result.geometry);
    };

    const removeResults = () => {
      selectedResults.value = null;
      emit("removeResults");
    };

    return {
      searchData,
      searchQueryUser,
      queryTimeout,
      search,
      selectResultPoint,
      selectedResults,
      removeResults,
    };
  },
};
</script>
