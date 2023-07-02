<template>
  <Navbar class="!bg-slate-300">
      <template #logo>
        <NavbarLogo link="" alt="animus logo" image-url="https://w7.pngwing.com/pngs/854/555/png-transparent-vue-js-hd-logo-thumbnail.png">
          ANIMUS
        </NavbarLogo>
      </template>
      <template #default="{isShowMenu}" v-if="isAuthenticated">
        <NavbarCollapse :isShowMenu="isShowMenu">
          <NavbarLink isActive link="/">Panou Principal</NavbarLink>
          <NavbarLink link="/tabel">Tabel Judete</NavbarLink>
          <NavbarLink link="/membri">Membri</NavbarLink>
          <NavbarLink link="/setariProfil">Setari</NavbarLink>
        </NavbarCollapse>
      </template>
      <template #right-side>
       <p v-if="isAuthenticated">Hello: {{ user?.name || user?.email }}</p>
       <p class="px-4" v-if="!isAuthenticated">Va rog sa va logati ca sa accesati platforma</p>
       <LoginBtn v-if="!isAuthenticated"/>
        <!--<button type="button"  @click="logout" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log out</button>-->
      </template>
    </Navbar>
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
            <tr v-for="oras in orase.slice(0,10)" :key="oras.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 hover:text-white hover:bg-blue-500 whitespace-nowrap dark:text-white">
                  {{ oras.nume }}
                </th>
            </tr>

     
        </tbody>
    </table>
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
<romania-map v-if="map"/>
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
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink} from 'flowbite-vue';
import RomaniaMap from '@/components/romaniaMap.vue';
import MoldovaMap from '@/components/moldovaMap.vue';
import { ref } from 'vue';
import json from '../assets/localitati.json';
import { useAuth0 } from '@auth0/auth0-vue';
import LoginBtn from '@/components/LoginBtn.vue';

const {user, isAuthenticated}  = useAuth0();

const map = ref(true)
const orase = ref(json)
/*async function getCities(){ 
 const response = await fetch('https://roloca.coldfuse.io/orase');
 const jsonData = await response.json();
 orase.value = jsonData
console.log(orase.value)
}

getCities();   */


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