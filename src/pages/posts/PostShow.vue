<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import usePostShowStore from '../../store/post/usePostShowStore';
import { useAuthStore } from '../../store/auth/useAuthStore';

const route = useRoute();
const router = useRouter();
const postShowStore = usePostShowStore();
const authStore = useAuthStore();

onBeforeMount( async () => {
  try {
    await postShowStore.getPost(route.params.id)
  } catch (error) {
    const msg = error?.response?.data.data ? error?.response?.data.data : "게시글 획득 실패";
    alert(msg);
    router.replace('/');
  }
});

onBeforeUnmount(postShowStore.clearPostShow);

console.log(route.params.id);
</script>

<template>
<div class="container" v-if="postShowStore.post">
  <div class="post-image" :style="{backgroundImage: `url(${postShowStore.post.image})`}"></div>
  <div class="option-box">
    <div class="delete-box">
      <div 
      class="delete-icon"
      v-if="postShowStore.post.userId === authStore.userInfo.id"
      ></div>
    </div>
    
    <div class="like-box">
      <span>1919</span>
      <div class="like-icon"></div>
    </div>
  </div>
  <p class="post-content">{{ postShowStore.post.content }}</p>
</div>
</template>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post-image {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.delete-icon {
  width: 40px;
  height: 50px;
  
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('/icon/trash-can.png');
}

.option-box {
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.like-box {
  display: flex;
  gap: 10px;
}

.like-icon {
  width: 50px;
  height: 50px;
  
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('/icon/heart-fill.png');
}
.post-content {
  white-space: pre-wrap;
  line-height: 1.6;
  word-break: break-word;
  font-size: 16px;
  font-weight: 700;
}



</style>