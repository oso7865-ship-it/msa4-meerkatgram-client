<script setup>
import MyError from '../pages/erroes/MyError.vue';
import { useMyErrorStore } from '../store/error/useMyErrorStore';

const myErrorStore = useMyErrorStore();
</script>

<!-- ------------------------------------구분선------------------------------------ -->

<template>
  <MyError v-if="myErrorStore.isError"></MyError>
  <router-view v-else></router-view>
</template>