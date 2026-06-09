<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import usePostShowStore from '../../store/post/usePostShowStore';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';

const route = useRoute();
const router = useRouter();
const postShowStore = usePostShowStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const handleDeletePost = async () => {
  if (!confirm('게시글을 삭제하시겠습니까?')) {
    return;
  }

  try {
    await postShowStore.deletePost(route.params.id);
    router.replace('/posts');
  } catch (error) {
    const code = error?.response?.data?.code;

    if (code === 'E06') {
      alert(error?.response?.data?.data || '삭제 권한이 없습니다.');
      return;
    }

    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
};

const handleToggleLike = async () => {
  try {
    const isLiked = await postShowStore.toggleLike(route.params.id);
     console.log('isLiked:', isLiked);

    postShowStore.post.liked = isLiked;

    if (isLiked) {
      postShowStore.post.likeCount++;
    } else {
      postShowStore.post.likeCount = Math.max(0, postShowStore.post.likeCount - 1);
    }
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
};

onBeforeMount( async () => {
  try {
    await postShowStore.getPost(route.params.id)
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error')
  }
});

onBeforeUnmount(postShowStore.clearPostShow);

</script>

<template>
<div class="container" v-if="postShowStore.post">
  <div class="post-image" :style="{backgroundImage: `url(${postShowStore.post.image})`}"></div>
  <div class="option-box">
    <div class="delete-box">
      <div 
      class="delete-icon"
      v-if="postShowStore.post.userId === authStore.userInfo.id"
      @click="handleDeletePost"
      ></div>
    </div>
    
    <div 
      class="like-box">
      <span>{{ postShowStore.post.likeCount }}</span>
      <div
      v-if="postShowStore.post.liked"
      class="like-icon like-fill"
      @click="handleToggleLike"
    ></div>
    <div
      v-else
      class="like-icon like-empty"
      @click="handleToggleLike"
    ></div>
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
  cursor: pointer;
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
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.like-fill {
  background-image: url('/icon/heart-fill.png');
}
.like-empty {
  background-image: url('/icon/heart-empty.png');
}
.post-content {
  white-space: pre-wrap;
  line-height: 1.6;
  word-break: break-word;
  font-size: 16px;
  font-weight: 700;
}



</style>