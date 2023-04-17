<template>
  <div class="relative h-screen">
    <GeoErrorModal
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
      @closeGeoError="closeGeoError"
    />
    <MapFeatures
      @getGeolocation="getGeolocation"
      @plotResult="plotResult"
      @toggleSearchResults="toggleSearchResults"
      @removeResults="removeResults"
      :coords="coords"
      :fetchCoords="fetchCoords"
      :searchResults="searchResults"
    />
    <div id="map" class="z-[1] h-full"></div>
  </div>
</template>

<script>
import GeoErrorModal from "@/components/GeoErrorModal.vue";
import MapFeatures from "@/components/MapFeatures.vue";
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
export default {
  name: "GeocodeView",
  components: { GeoErrorModal, MapFeatures },
  setup() {
    let map;
    onMounted(() => {
      // initialize map
      map = leaflet.map("map").setView([106.77, 6.7], 13);

      // add tile layer mapbox
      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
          {
            attribution:
              '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v12",
            accessToken: process.env.VUE_APP_API_KEY,
          }
        )
        .addTo(map);

        map.on('movedend', () => {
          closeSearchResults();
        })

      // intialize geoLocation
      getGeolocation();
    });

    // intialize reactivity in vue using ref
    const coords = ref(null);
    const fetchCoords = ref(null);
    const geoMaker = ref(null);
    const geoError = ref(null);
    const geoErrorMsg = ref(null);
    const resultMarker = ref(null);
    const searchResults = ref(null)

    // function getGeolocation
    const getGeolocation = () => {
      if(coords.value){
        coords.value = null;
        sessionStorage.removeItem("coords");
        map.removeLayer(geoMaker.value);
        return;
      }

      // check session storage
      if (sessionStorage.getItem("coords")) {
        coords.value = JSON.parse(sessionStorage.getItem("coords"));
        plotGeolocation(coords.value);
        return;
      }

      fetchCoords.value = true;
      navigator.geolocation.getCurrentPosition(setCoords, getLocError);
    };

    const setCoords = (pos) => {
      // stop fecthing coords
      fetchCoords.value = null;

      // set coords in session storage
      const setSessionCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      sessionStorage.setItem("coords", JSON.stringify(setSessionCoords));

      // set ref coords value from sessionStorage
      coords.value = setSessionCoords;

      plotGeolocation(coords.value);
    };

    const getLocError = (error) => {
      fetchCoords.value = null;
      geoError.value = true;
      geoErrorMsg.value = error.message;
    };

    // create function plotGeolocation
    const plotGeolocation = () => {
      // create custom marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-blue.svg"),
        iconSize: [40, 40],
        shadowSize: [50, 64],
      });

      // create new marker with coords and custom icon
      geoMaker.value = leaflet
        .marker([coords.value.lat, coords.value.lng], { icon: customMarker })
        .addTo(map);

      // set map view to current location
      map.setView([coords.value.lat, coords.value.lng], 15);
    };

    // function closeGeoError
    const closeGeoError = () => {
      geoError.value = null;
      geoErrorMsg.value = null;
    };

    const plotResult = (coords) => {
      console.log(coords.value)
      // check to see if resultMarker has value
      if(resultMarker.value) {
        map.removeLayer(resultMarker.value)
      }

      // create custom marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-red.svg"),
        iconSize: [40, 40],
        shadowSize: [50, 64],
      });

      // create new marker with coords and custom icon
      resultMarker.value = leaflet
        .marker([coords.coordinates[1], coords.coordinates[0]], { icon: customMarker })
        .addTo(map);

      // set map view to current location
      map.setView([coords.coordinates[1], coords.coordinates[0]], 14);

      closeSearchResults();
    }

    const toggleSearchResults = () => {
      searchResults.value = !searchResults.value;
    }

    const closeSearchResults = () => {
      searchResults.value = null;
    }

    const removeResults = () => {
      map.removeLayer(resultMarker.value)
    }

    return {
      coords,
      geoMaker,
      getGeolocation,
      closeGeoError,
      geoError,
      fetchCoords,
      geoErrorMsg,
      plotResult,
      searchResults,
      toggleSearchResults,
      closeSearchResults,
      removeResults,
    };
  },
};
</script>
