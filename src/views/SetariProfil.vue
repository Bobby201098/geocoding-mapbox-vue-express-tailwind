<template>
    
    <Navbar class="!bg-slate-300">
         <template #logo>
           <NavbarLogo link="https://www.google.com/" alt="Flowbite logo" image-url="https://w7.pngwing.com/pngs/854/555/png-transparent-vue-js-hd-logo-thumbnail.png">
           </NavbarLogo>
         </template>
         <template #default="{isShowMenu}">
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
         </template>
       </Navbar>
<div class="flex justify-center">
    <HeaderCard class="items-center" pageName="Dashboard" />
  </div>
    <div class="flex items-center justify-center text-center pt-36">
      <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
        <div class="mt-1 lg:hidden">
          <div class="flex items-center">
            <div class="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full" aria-hidden="true">
              <img class="h-full w-full rounded-full" alt="imagine" />
            </div>
            <div class="ml-5 rounded-md shadow-sm">
              <div class="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                <label for="mobile-user-photo" class="pointer-events-none relative text-sm font-medium leading-4 text-white">
                  <span>Change</span>
                  <span class="sr-only"> user photo</span>
                </label>
                <input id="mobile-user-photo" name="user-photo" type="file" class="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
              </div>
            </div>
          </div>
        </div>

        <div class="relative hidden overflow-hidden rounded-full lg:block">
          <img class="relative h-40 w-40 rounded-full"  alt="imagine" />
          <label for="desktop-user-photo" class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
            <span>Change</span>
            <span class="sr-only"> user photo</span>
            <input type="file" id="desktop-user-photo" name="user-photo" class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
          </label>
        </div>
      </div>
    </div>
    <!-- Start Main Content -->
  <main class="relative pt-2">
    <div class="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
      <div class="overflow-hidden rounded-lg bg-green-900 shadow">
        <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <aside class="py-6 lg:col-span-3">
            <nav class="space-y-1">

            </nav>
          </aside>

          <form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST" >
            <!-- Profile section -->
            <div class="py-6 px-4 sm:p-6 lg:pb-8">
              <div>
                <h2 class="text-lg font-medium leading-6 text-gray-100">Profile</h2>
                <p class="mt-1 text-sm text-gray-400">This information will be displayed publicly so be careful what you share.</p>
              </div>

              <div class="mt-6 flex flex-col lg:flex-row">
                <div class="flex-grow space-y-6">
                  <div>
                    <label for="username" class="block text-sm font-medium text-white">Username</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input type="text" name="username" id="username" autocomplete="username" class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm text-black"  />
                    </div>
                  </div>

                  <div>
                    <label for="about" class="block text-sm font-medium text-white">About</label>
                    <div class="mt-1">
                      <textarea id="about" name="about" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm text-black" />
                    </div>
                    <p class="mt-2 text-sm text-gray-400">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-6">
                  <label for="first-name" class="block text-sm font-medium text-white">First name</label>
                  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black" v-model="givenName" />
                </div>

                <div class="col-span-12 sm:col-span-6">
                  <label for="last-name" class="block text-sm font-medium text-white">Last name</label>
                  <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black"  v-model="familyName" />
                </div>
<!-- 
                <div class="col-span-12">
                  <label for="url" class="block text-sm font-medium text-white">URL</label>
                  <input type="text" name="url" id="url" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black" />
                </div>

                <div class="col-span-12 sm:col-span-6">
                  <label for="company" class="block text-sm font-medium text-white">Company</label>
                  <input type="text" name="company" id="company" autocomplete="organization" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black" />
                </div> -->
              </div>
            </div>

            <!-- Privacy section -->
            <div class="divide-y divide-gray-200 pt-6">
              <div class="px-4 sm:px-6">
                <div>
                  <h2 class="text-lg font-medium leading-6 text-gray-100">Privacy</h2>
                  <p class="mt-1 text-sm text-gray-400">Ornare eu a volutpat eget vulputate. Fringilla commodo amet.</p>
                </div>
                <ul role="list" class="mt-2 divide-y divide-gray-200">
                  <SwitchGroup as="li" class="flex items-center justify-between py-4">
                    <div class="flex flex-col">
                      <SwitchLabel as="p" class="text-sm font-medium text-gray-100" passive>Available to hire</SwitchLabel>
                      <SwitchDescription class="text-sm text-gray-400">Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.</SwitchDescription>
                    </div>
                
                  </SwitchGroup>
                  <SwitchGroup as="li" class="flex items-center justify-between py-4">
                    <div class="flex flex-col">
                      <SwitchLabel as="p" class="text-sm font-medium text-gray-100" passive>Make account private</SwitchLabel>
                      <SwitchDescription class="text-sm text-gray-400">Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.</SwitchDescription>
                    </div>
                  
                  </SwitchGroup>
                  <SwitchGroup as="li" class="flex items-center justify-between py-4">
                    <div class="flex flex-col">
                      <SwitchLabel as="p" class="text-sm font-medium text-gray-100" passive>Allow commenting</SwitchLabel>
                      <SwitchDescription class="text-sm text-gray-400">Integer amet, nunc hendrerit adipiscing nam. Elementum ame</SwitchDescription>
                    </div>
                  
                  </SwitchGroup>
                  <SwitchGroup as="li" class="flex items-center justify-between py-4">
                    <div class="flex flex-col">
                      <SwitchLabel as="p" class="text-sm font-medium text-gray-100" passive>Allow mentions</SwitchLabel>
                      <SwitchDescription class="text-sm text-gray-400">Adipiscing est venenatis enim molestie commodo eu gravid</SwitchDescription>
                    </div>
                   
                  </SwitchGroup>
                </ul>
              </div>
              <div class="mt-4 flex justify-end py-4 px-4 sm:px-6">

                <button type="submit" class="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  </template>
  <script setup>
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink} from 'flowbite-vue';
import LoginBtn from '@/components/LoginBtn.vue';
import { useAuth0 } from '@auth0/auth0-vue';
const {user, isAuthenticated}  = useAuth0();
  </script>
  