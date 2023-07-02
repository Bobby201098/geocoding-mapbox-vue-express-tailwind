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
       <div class="relative p-4">
    <dropdown placement="bottom" text="Selecteaza Judetul">
        <list-group>
    <list-group-item :hover="false">Brasov</list-group-item>
    <list-group-item :hover="false">Teleorman</list-group-item>
    <list-group-item :hover="false">Ilfov</list-group-item>
    <list-group-item :hover="false">Bucuresti</list-group-item>
    <list-group-item :hover="false">Girugiu</list-group-item>
  </list-group>
  </dropdown>
  <form class="flex items-center">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
    </div>
    <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span class="sr-only">Search</span>
    </button>
</form>
  </div>
     <Table>
       <table-head>
         <table-head-cell>Product name</table-head-cell>
         <table-head-cell>Color</table-head-cell>
         <table-head-cell>Category</table-head-cell>
         <table-head-cell>Price</table-head-cell>
         <table-head-cell><span class="sr-only">Edit</span></table-head-cell>
       </table-head>
       <table-body>
         <table-row>
           <table-cell>Apple MacBook Pro 17"</table-cell>
           <table-cell>Sliver</table-cell>
           <table-cell>Laptop</table-cell>
           <table-cell>$2999</table-cell>
           <table-cell>
             <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
           </table-cell>
         </table-row>
         <table-row>
           <table-cell>Microsoft Surface Pro</table-cell>
           <table-cell>White</table-cell>
           <table-cell>Laptop PC</table-cell>
           <table-cell>$1999</table-cell>
           <table-cell>
             <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
           </table-cell>
         </table-row>
         <table-row>
           <table-cell>Magic Mouse 2</table-cell>
           <table-cell>Black</table-cell>
           <table-cell>Accessories</table-cell>
           <table-cell>$99</table-cell>
           <table-cell>
             <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
           </table-cell>
         </table-row>
       </table-body>
     </Table>
   
   
   
   
   </template>

   <script setup>
   import { Table, TableHead, TableBody, TableHeadCell, TableRow, TableCell } from 'flowbite-vue'
   import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink, ListGroup, ListGroupItem, Dropdown} from 'flowbite-vue';
   import LoginBtn from '@/components/LoginBtn.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const {user, isAuthenticated}  = useAuth0();

   </script>