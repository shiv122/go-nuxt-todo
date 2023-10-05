<template>
  <div class="flex items-center justify-center w-screen min-h-screen bg-gray-100 font-medium">
    <div class="flex flex-grow justify-center text-gray-600 mb-10 mt-10">
      <div class="p-8 bg-white rounded-lg shadow-lg lg:w-3/4 w-96 md:w-11/12 max-w-[70rem]">
        <div class="flex items-center mb-6">
          <svg class="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h4 class="font-semibold ml-3 text-lg">
            {{ user?.first_name }}'s Todo List
          </h4>
        </div>
        <TodoList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useUserStore());

definePageMeta({
  middleware: "auth",
});
</script>