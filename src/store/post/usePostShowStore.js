import { defineStore } from "pinia"
import { ref } from "vue";
import myAxios from "../../api/myAxios";

const usePostShowStore = defineStore('postShowSotre', () => {
  // 1. State
  const post = ref();

  // 2. Getters


  // 3. Actions
  const getPost = async (id) => {
    try {
      const url = `/api/posts/${id}`

      const result = await myAxios.get(url);

      post.value = result.data.data;
    } catch (error) {
      throw error;
    }
  }

  const clearPostShow = () => {
    post.value = null;
  }

  const deletePost = async (postId) => {
  const url = `/api/postDelete/${postId}`;

  const res = await myAxios.delete(url);

  return res.data;
};

const toggleLike = async (postId) => {
  const url = `/api/posts/${postId}/likes`;

  const res = await myAxios.post(url);

  return res.data;
}



  return {
    post,
    getPost,
    clearPostShow,
    deletePost,
    toggleLike
  }
});



export default usePostShowStore;