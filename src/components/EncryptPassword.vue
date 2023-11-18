<script setup lang="ts">
import Button from "./Button.vue";
import Toast from "./Toast.vue";
</script>

<template>
  <h2 class="text-xl font-bold">Encrypt with Bcrypt</h2>
  <span class="text-xs">
    Uses salt rounds of 10
  </span>

  <div class="relative">
    <label for="password" class="sr-only"> Password </label>

    <fieldset class="flex flex-col gap-7">
      <div>
        <label
            for="rawPassword"
            class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span class="text-xs font-medium text-gray-700"> Password </span>

          <input
              type="text"
              v-model="rawPassword"
              id="rawPassword"
              v-on:keyup.enter="encryptPassword"
              placeholder="Your secure password"
              class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
      </div>

      <div class="relative">
        <label for="password" class="sr-only"> Password </label>

        <input
            type="text"
            v-model="encryptedPassword"
            id="password"
            placeholder="A secure password"
            class="mt-1 w-11/12 border pt-3 pb-3 pl-4 rounded-lg focus:border-indigo-400 focus:outline-none focus:ring-0 sm:text-sm"
        />

        <span class="absolute inset-y-7 end-0 grid w-10 place-content-center">
          <button type="button" class="text-gray-600 hover:text-gray-700" @click="copyPassword">
            <span class="sr-only">Copy</span>
              <img src="../assets/copy-icon.svg" class="w-6/12 ml-4" alt="Copy icon" />
          </button>
        </span>
      </div>
    </fieldset>
  </div>

  <div class="flex justify-center mt-7">
    <Button text="Encrypt" @click="encryptPassword" />
  </div>

  <Toast
      message="Password copied to clipboard"
      class="fixed right-5 top-5"
      @closeToast="closeToast"
      :class="[isToastActive ? 'block' : 'hidden']"
  />

</template>

<script lang="ts">
// @ts-ignore
import bcrypt from "bcryptjs";

export default {
  data() {
    return {
      encryptedPassword: "",
      rawPassword: "",
      isToastActive: false,
    };
  },
  methods: {
    encryptPassword() {
      if (this.rawPassword.trim().length === 0) {
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      this.encryptedPassword = bcrypt.hashSync(this.rawPassword.trim(), salt);
    },

    async copyPassword() {
      if (this.encryptedPassword.length === 0) return;

      await navigator.clipboard.writeText(this.encryptedPassword);

      if (this.isToastActive) return;

      this.isToastActive = true;

      setTimeout(() => {
        this.isToastActive = false;
      }, 2000);
    },

    closeToast() {
      this.isToastActive = false;
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
