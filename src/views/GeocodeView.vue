<template>
 <nav-bar></nav-bar>
    <section class="bg-white dark:bg-gray-900" v-if="!isAuthenticated">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Platforma este accesibila numai membrilor</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Va rog sa va autentificati ca sa puteti avea acces la platforma.</p>
            <LoginBtn v-if="!isAuthenticated"/>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Forbidden_Symbol_Transparent.svg/640px-Forbidden_Symbol_Transparent.svg.png" alt="mockup">
        </div>                
    </div>
</section>
  <div class="relative top-20 h-full" v-if="isAuthenticated">

  <div class="container">
    <div class="left ml-24">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ORASE
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="oras in selectedCity.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)" :key="oras.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th @click="showModal(oras.id)" scope="row" class="px-6 py-4 font-medium text-gray-900 hover:text-white hover:bg-blue-500 whitespace-nowrap dark:text-white">
                  {{ oras.nume }} - {{ oras.populatie.toLocaleString('en-US') }}
                </th>
                <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
    <b> {{ selectedOras.nume }} </b>
      </div>
    </template>
    <template #body>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      <b> Despre {{ selectedOras.nume }}</b>
      </p>
         <ul class="gap-4">
          <li>Judet: <b>{{ selectedOras.judet }}</b></li>
          <li>Cod postal: <b>{{ selectedOras.zip }}</b></li>
          <li>Populatie: <b>{{ selectedOras.populatie.toLocaleString('en-US') }}</b></li>
          <li>Placuta auto: <b>{{ selectedOras.auto }}</b></li>
          <li>Filiale: </li>
          <li>Membri: </li>
         </ul>

         <MapboxMap
    style="height:400px"
    access-token="pk.eyJ1IjoiYm9iYnkyMCIsImEiOiJjbGk1bjBqMDAwanh2M2VrYmNvNXBwaTdhIn0.6cPGUCvNzQvylhbQeRw_lQ"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="[selectedOras.lng, selectedOras.lat]"
    :zoom="10" >
    <MapboxMarker :lng-lat="[selectedOras.lng, selectedOras.lat]" />
    </MapboxMap>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
          Inchide
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
            </tr>

     
        </tbody>
    </table>
    <div class="content-center items-center text-center space-x-10">
    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    <span class="content-center">Page {{ currentPage }}</span>
    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="changePage(currentPage + 1)" :disabled="currentPage * rowsPerPage >= selectedCity?.length">Next</button>
  </div>
    </div>
    </div>
    <div class="middle">
      <ul class="flex flex-wrap text-sm font-medium text-center justify-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
    <li class="mr-2">
        <button  @click="map = true" aria
        LoginBtn-current="page" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">HARTA ROMANIA</button>
    </li>
    <li class="mr-2">
        <button @click="map=false" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">HARTA REPUBLICA MOLDOVA</button>
    </li>
    <li class="mr-2">
        <button class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">HARTA DIASPORA</button>
    </li>

</ul>
<romania-map v-if="map" @path-selected="onPathSelected"/>
<MoldovaMap v-if="!map"/>
</div>
<div class="right">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    FILIALE
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
               
                </th>
            </tr>

     
        </tbody>
    </table>
</div>
</div>
</div>
</div>


</template>

<script setup>
// import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink} from 'flowbite-vue';
import RomaniaMap from '@/components/romaniaMap.vue';
import MoldovaMap from '@/components/moldovaMap.vue';
import { ref } from 'vue';
import json from '../assets/localitati.json';
import { useAuth0 } from '@auth0/auth0-vue';
// import LoginBtn from '@/components/LoginBtn.vue';
import { FwbButton, FwbModal } from 'flowbite-vue'
import NavBar from '@/components/NavBar.vue';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';

const {isAuthenticated}  = useAuth0();


const map = ref(true)
const orase = ref(json)
const selectedCity = ref([]);
const selectedOras = ref(null);
// const selectedPathTitle = ref(null);
/*async function getCities(){ 
 const response = await fetch('https://roloca.coldfuse.io/orase');
 const jsonData = await response.json();
 orase.value = jsonData
console.log(orase.value)
}

getCities();   */
const isShowModal = ref(false)

function closeModal () {
  isShowModal.value = false
}
function showModal (id) {
  selectedOras.value = selectedCity.value.find(oras => oras.id === id)
  isShowModal.value = true
}
const currentPage = ref(1);
const rowsPerPage = ref(10);
const onPathSelected = (title) => {
  // Handle the path-selected event
  console.log('From parent',title);
  const cities = orase.value.filter(city => city.judet === title);
  selectedCity.value = cities;
  console.log('Sat', selectedCity.value);
};
const changePage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex; /* In vuetify you have class that's sets it: "d-flex" */
}

.left {
  width: 30%;

}

.middle {
  width: 70%;

}

.right {
  width: 600px;

}
</style>