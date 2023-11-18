<script setup lang="ts">
import Button from './Button.vue';
import { ref, onMounted } from 'vue';
import {useToastStore} from "../store/ToastStore.ts";
import {generatePassword} from "../utils/GeneratePassword.ts";

const toastStore = useToastStore();

const hasUppercase = ref(true);
const hasLowercase = ref(true);
const hasNumbers = ref(true);
const hasSpecialCharacters = ref(false);
const passwordLength = ref(12);
const password = ref('');

onMounted(() => {
  getPassword();
});

function getPassword() {
  password.value = generatePassword({
    hasUppercase: hasUppercase.value,
    hasLowercase: hasLowercase.value,
    hasNumbers: hasNumbers.value,
    hasSpecialCharacters: hasSpecialCharacters.value,
    passwordLength: passwordLength.value,
  });
}

async function copyPassword() {
  if (password.value.length === 0) return;

  await navigator.clipboard.writeText(password.value);

  toastStore.show('Copied to clipboard!');
}
</script>

<template>
  <h2 class="text-xl font-bold">Generate a secure password</h2>

  <fieldset>
  <legend class="sr-only">Checkbox variants</legend>

  <div class="flex items-center mb-4">
      <input 
        id="uppercase" 
        type="checkbox" 
        v-model="hasUppercase" 
        value="" 
        class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
      <label 
        for="uppercase" 
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Uppercase
      </label>
  </div>

  <div class="flex items-center mb-4">
      <input 
        id="lowercase" 
        type="checkbox" 
        v-model="hasLowercase" 
        value="" 
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
      <label 
        for="lowercase" 
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Lowercase
      </label>
  </div>

  <div class="flex items-center mb-4">
      <input 
        id="numbers" 
        type="checkbox" 
        v-model="hasNumbers" 
        value="" 
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
      <label 
        for="numbers" 
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Numbers
      </label>
  </div>

  <div class="flex items-center mb-4">
      <input 
        id="specialCharacters" 
        type="checkbox" 
        value="" 
        v-model="hasSpecialCharacters"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
      <label 
        for="specialCharacters" 
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Special Characters
      </label>
  </div>
  </fieldset>

  <div class="flex flex-row">
      <p class="inline-block mt-0.5">Password Length: </p>
      <input
        type="number"
        id="passwordLength"
        v-model="passwordLength"
        class="ml-4 border-1 pb-0.5 pt-0.5 pl-1.5 focus:ring-0 rounded-md border border-gray-200 w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
  </div>

  <div class="relative">
    <label for="password" class="sr-only"> Password </label>

    <input
        type="text"
        v-model="password"
        id="password"
        placeholder="A secure password"
        class="mt-1 w-full border  pt-3 pb-3 pl-4 rounded-lg focus:border-indigo-400 focus:outline-none focus:ring-0 sm:text-sm"
    />

    <span class="absolute inset-y-7 end-0 grid w-10 place-content-center">
      <button type="button" class="text-gray-600 hover:text-gray-700" @click="copyPassword">
        <span class="sr-only">Copy</span>
          <img src="../assets/copy-icon.svg" class="w-6/12" alt="Copy icon" />
      </button>
    </span>
  </div>

  <div class="flex justify-center mt-7">
    <Button text="Generate" @click="getPassword" />
  </div>

</template>
