<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import MyButton from '../../components/buttons/MyButton.vue';
import usePostIndexStore from '../../store/post/usePostIndexStore.js';
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

const posts = ref([]);
const isLastPage = ref(false);
let currentPage = 0;

const router = useRouter();
const postIndexStore = usePostIndexStore();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
try {
  await postIndexStore.getPostPagination(page);
} catch (error) {
  myErrorStore.setErrorInfo(error);
  router.replace('/error')
}
}

// 다음 페이지 불러오기
const getNextPage = async () => {
  await getPagination(postIndexStore.getNextPageNumber);
}

const redirectShow = (id) => {
  router.push(`/posts/${id}`)
}


// 라이프 사이클
onBeforeMount(getPagination);
onBeforeUnmount(postIndexStore.clearPostIndex);

</script>

<template>
  <div class="card-container">
    <div 
    class="card"
      v-for="item in postIndexStore.items" 
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
      @click="redirectShow(item.id)"
    ></div>
  </div>
  <MyButton 
    v-if="!postIndexStore.isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'show more posts from Kanna_Kamui'" 
    @click="getNextPage"
  />
</template>

<style scoped>

.card-container {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}
.card{
  aspect-ratio: 1 / 1; /*정사각형 유지*/
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>