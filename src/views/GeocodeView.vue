<template>
  <div class="relative h-screen">
    <div id="map" class="z-[1] h-full"></div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
export default {
  name: "GeocodeView",
  components: {},
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

      // intialize geoLocation
      getGeolocation();
    });

    // intialize reactivity in vue using ref
    const coords = ref(null);
    const fetchCoords = ref(null);
    const geoMaker = ref(null);

    // function getGeolocation
    const getGeolocation = () => {
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
      console.log(error);
    };

    // create function plotGeolocation
    const plotGeolocation = () => {
      // create custom marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-blue.svg"),
        iconSize: [35, 25],
        shadowSize: [50, 64]
      });

      // create new marker with coords and custom icon
      geoMaker.value = leaflet
        .marker([coords.value.lat, coords.value.lng], { icon: customMarker })
        .addTo(map);

      // set map view to current location
      map.setView([coords.value.lat, coords.value.lng], 10)
    };

    return { coords, geoMaker, getGeolocation };
  },
};
</script>
