<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/buttons/MyButton.vue';
import myAxios from '../../api/myAxios.js';

const posts = ref([]);
const isLastpage = ref(false);
let crurrentPage = 1;

// 함수
const getPostPagination = async () => {
  // 마지막 페이지가 아닐 경우만 실행
  if(!isLastpage.value){ 
    try {
      
          const url = '/api/posts';
          const params = {
            page: crurrentPage,
          };
      
          const res = await myAxios.get(url, { params});
          const data = res.data.data; 
          isLastpage.value = data.lastPage;
          posts.value.push(...data.posts);
      
    } catch (error) {
      console.error(error);
    }

  }
}


// 라이프 사이클
onBeforeMount(getPostPagination);

</script>

<template>
  <div class="card-container">
    <div 
    class="card"
      v-for="item in posts" 
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
    ></div>
  </div>
  <MyButton 
    v-if="!isLastpage"
    :color="'gray'"
    :size="'big'"
    :content="'show more posts from Kanna_Kamui'" 
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