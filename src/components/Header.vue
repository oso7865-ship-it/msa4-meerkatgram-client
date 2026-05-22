<script setup>
import { ref } from 'vue';
import MyButton from './buttons/MyButton.vue';

// Todo: 로그인 여부에 따라 버튼이 달라져야 함
const isloggedIn = ref(true);
</script>

<template>
<div class="header">
  <div class="title-box">
    <h1 class="title">Meerkatgram</h1>
  </div>
  <div class="btn-box">
    <MyButton 
    v-if="!isloggedIn"
    :content="'Sign In'" 
    :color="'gray'"
    :size="'small'"
    />
    <MyButton 
    v-if="!isloggedIn"
    :content="'Sign Up'" 
    :color="'white'"
    :size="'small'"
    />
    <MyButton 
    v-if="isloggedIn"
    :content="'Logout'" 
    :color="'black'"
    :size="'small'"
    />
  </div>
</div>
</template>

<style scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  
}
.title-box {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
}
.btn-box {
  display: flex;
  gap: 10px;
}
</style>