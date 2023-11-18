<script setup lang="ts">
import Header from './components/Header.vue';
import Button from './components/Button.vue';
import GeneratePassword from './components/GeneratePassword.vue';
import EncryptPassword from './components/EncryptPassword.vue';
import Toast from "./components/Toast.vue";


</script>

<template>
  <Header />

  <div 
    class="mx-auto my-0 mt-6 p-10 border-gray-200 border rounded-l w-4/12 flex flex-col gap-4 shadow-sm">

    <div class="flex w-full mb-5">
      <div class="w-full flex justify-center">
        <button 
          class="pt-2 pb-2 pl-6 pr-6 shadow-md"
          @click="toggleGenerate"
          :class="[isGenerateActive ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600']"  
        > 
          Generate 
        </button>
        <button 
          class="pt-2 pb-2 pl-6 pr-6 shadow-md"
          @click="toggleEncrypt"
          :class="[isEncryptActive ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600']"  
        > 
        Encrypt 
        </button>
      </div>
    </div>

    <GeneratePassword v-if="isGenerateActive" />
    <EncryptPassword v-else />

    <Toast />
  </div>

</template>

<script lang="ts">

export default {
  data() {
    return {
      isEncryptActive: false,
      isGenerateActive: true,
    };
  },
  methods: {
    toggleGenerate() {
      this.isGenerateActive = true;
      this.isEncryptActive = false;
    },

    toggleEncrypt() {
      this.isGenerateActive = false;
      this.isEncryptActive = true;
    },
  },
};

</script>

