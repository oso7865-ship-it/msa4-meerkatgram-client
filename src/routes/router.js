import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/erroes/MyError.vue";

const routes = [
  {
    path: '/',
    component: PostIndex,
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex, 
  },
  // 에러 관련
  {
    path:'/errors',
    component: MyError,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;