<script setup>
import { useAuthStore } from '../store/auth/useAuthStore';

const authStore = useAuthStore();
</script>

<template>
  <div>

    <div 
    class="container"
    v-if="authStore.isLoggedIn && authStore.userInfo"
    >
    <div class="profile-box">
      <div 
      class="bg-image-circle profile"
      :style="{backgroundImage: `url(${authStore.userInfo.profile})`}"
      
      ></div>
    </div>
    <div class="info-box">
      <div class="nick">{{ authStore.userInfo.nick }}</div>
      <div class="write-count">{{ authStore.userInfo.countPosts }}</div>
      <div class="redirect-box">
        <div 
        class="bg-image-square redirect-icon-posts-index"
        style="background-image: url('/icon/gallery.png')"
        ></div>
        <div 
        class="bg-image-square redirect-icon-posts-create"
        style="background-image: url('/icon/plus-button.png')"
        ></div>
        <div 
        class="bg-image-square redirect-icon-posts-users-info"
        style="background-image: url('/icon/person.png')"
        ></div>
        
      </div>
    </div>
  </div>
  <hr>
</div>
</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5px;
}

.redirect-box{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}


</style>