<template>
   <nav-bar></nav-bar>
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
<fwb-button @click="showModal">
    Adauga membri
  </fwb-button>
  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        Adauga membru
      </div>
    </template>
    <template #body>
      <fwb-table>
        <fwb-table-body>
          <fwb-table-row>
            <fwb-table-head>
      <label class="align-center text-center">Adresa de email</label>
      </fwb-table-head>
      <fwb-table-cell>
      <input type="email" v-model="inviteeEmail" />
    </fwb-table-cell>
    </fwb-table-row>
    <fwb-table-row>
      <fwb-table-head>
      <label>Numar de telefon</label>
    </fwb-table-head>
      <fwb-table-cell>
      <input type="tel" v-model="phoneNumber" />
      </fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
      <fwb-table-head>
      <label>Ce doresti sa transmiti?</label>
    </fwb-table-head>
      <fwb-table-cell>
      <textarea v-model="textMesaj">
        </textarea>
      </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
    </fwb-table>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
         Anuleaza
        </fwb-button>
        <fwb-button @click="sendInvitation()" color="green">
          Trimite invitatie
        </fwb-button>
        <fwb-button @click="sendWhatsAppMessage()" color="green">
          Trimite mesaj WhatsApp
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
  </div>
  <fwb-table>
    <fwb-table-head>
      <fwb-table-head-cell>Imagine Profil</fwb-table-head-cell>
      <fwb-table-head-cell>Nume</fwb-table-head-cell>
      <fwb-table-head-cell>Email</fwb-table-head-cell>
      <fwb-table-head-cell>Numar de telefon</fwb-table-head-cell>
      <fwb-table-head-cell>Judet</fwb-table-head-cell>
      <fwb-table-head-cell>Filiala</fwb-table-head-cell>
      <fwb-table-head-cell>Verificat</fwb-table-head-cell>
      <fwb-table-head-cell>
        <span class="sr-only">Edit</span>
      </fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row v-for="(user, index) in users" :key="index">
        <fwb-table-cell><img :src="user.picture" alt="Profil" class="rounded-full" width="80"></fwb-table-cell>
        <fwb-table-cell>{{ user.name }}</fwb-table-cell>
        <fwb-table-cell>{{ user.email }}</fwb-table-cell>
        <fwb-table-cell>Nu exista</fwb-table-cell>
        <fwb-table-cell>Nu exista</fwb-table-cell>
        <fwb-table-cell>Nu exista</fwb-table-cell>
        <fwb-table-cell><span v-if="user.email_verified" class="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
  <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
  </svg>
  <span class="sr-only">Verificat</span>
</span>
</fwb-table-cell>
        <fwb-table-cell>
          <fwb-a href="#">
            Edit
          </fwb-a>
        </fwb-table-cell>
      </fwb-table-row>
      </fwb-table-body>
      </fwb-table>
      
   
   
   
   
   </template>

   <script setup>
   import {   FwbA,
   FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
FwbButton,
FwbModal } from 'flowbite-vue'
   import {ListGroup, ListGroupItem, Dropdown} from 'flowbite-vue';
  import NavBar from '@/components/NavBar.vue';
import { useAuth0 } from '@auth0/auth0-vue';

  const {user}  = useAuth0();
import { ref, onMounted } from 'vue';

const inviteeEmail = ref('');
const phoneNumber = ref('');
const textMesaj = ref('');

const isShowModal = ref(false)

function closeModal () {
  isShowModal.value = false
}
function showModal () {
  isShowModal.value = true
}

const users = ref(null);
const error = ref(null);
const token  = ref(null);
const fetchToken = async () => {
  try {
    const response = await fetch('https://animus-platformma.eu.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Replace these with your actual credentials
        client_id: 'RByM8v4xymj01kEzxVIwlnTkdCMIvXTM',
        client_secret: 'anERUhkU2022Spm8jLcs75XQFlanmsstVN5vn8aszChWqV_o0SJyuIl68yCrRald',
        audience: 'https://animus-platformma.eu.auth0.com/api/v2/',
        grant_type: 'client_credentials'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const data = await response.json();
    token.value = data.access_token;
    console.log('este token',token.value)
  } catch (err) {
    error.value = err.message;
  }
};
const fetchUsers = async () => {
  try {

    console.log('este token',token.value)
    const response = await fetch('https://animus-platformma.eu.auth0.com/api/v2/users', {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    console.log(data)
    users.value = data;
  } catch (err) {
    error.value = err.message;
  }
};
const sendInvitation = async () => {
  const invitationData = {
  inviter: {
    name: user.value.name
  },
  invitee: {
    email: inviteeEmail.value
  },
  client_id: 'rmTo31MtD9om7YjgaTzjHD15k4blsTAr',
  connection_id: 'con_yGUErXjWalCIv6HB',
  ttl_sec: 0,
  roles: ["rol_Z4NpET8P5WoDiTl1"],
  send_invitation_email: true

};
  try {
    const response = await fetch('https://animus-platformma.eu.auth0.com/api/v2/organizations/org_a814KykImMsxuH7J/invitations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Replace 'your-token' with the actual token
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(invitationData)
    });
console.log(inviteeEmail.value);
   

    if (!response.ok) {
      throw new Error('Failed to send invitation');
    }else{
      console.log('succes')
    closeModal();
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};
const sendWhatsAppMessage = async () => {
  const accountSid = 'AC5bbfd5727e6d83405deac3078d76284e';
  const authToken = 'bab9f9cbce0e40ce0fbbde16bf160fd9';
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken)
    },
    body: new URLSearchParams({
      To: `whatsapp:${phoneNumber.value}`,
      From: 'whatsapp:+14155238886',
      Body: `${textMesaj.value}`
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send WhatsApp message');
  }else{
    console.log('succes');
    closeModal();
  }

  const data = await response.json();
  return data;
};
onMounted(async () => {
  await fetchToken();
  fetchUsers();
});
   </script>