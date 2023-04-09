<template>
  <div class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from 'leaflet';
import { onMounted } from 'vue';
export default {
  name: 'HomeView',
  components: {},
  setup() {
    let map;
    onMounted(() => {
      // initialize map
      map = leaflet.map('map').setView([51.505, -0.09], 13);

      // add tile layer leaflet
      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
    })


    
  }
}
</script>
