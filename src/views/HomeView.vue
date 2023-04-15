<template>
  <div class="relative h-screen">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from 'leaflet';
import { onMounted, ref } from 'vue';
export default {
  name: 'HomeView',
  components: {},
  setup() {
    let map;
    onMounted(() => {
      // initialize map
      map = leaflet.map('map').setView([51.505, -0.09], 13);

      // add tile layer mapbox
      leaflet.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`, {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/streets-v12',
        accessToken: process.env.VUE_APP_API_KEY,
      }).addTo(map);

      // intialize geoLocation
      getGeolocation()
    })

    // intialize reactivity in vue using ref
    const coords = ref(null)
    const fetchCoords = ref(null)
    const geoMaker = ref(null)

    // function getGeolocation
    const getGeolocation = () => {
      fetchCoords.value = true
      navigator.geolocation.getCurrentPosition(setCoords, getLocError)
    }

    const setCoords = (pos) => {
      console.log(pos)
    }

    const getLocError = (error) => {
      console.log(error)
    }

    return { coords, geoMaker, getGeolocation }
  }
}
</script>
