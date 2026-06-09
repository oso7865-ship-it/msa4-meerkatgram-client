<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useFileStore from '../../store/file/useFileStore';
import MyButton from '../../components/buttons/MyButton.vue';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

const myErrorStore = useMyErrorStore();
const router = useRouter();
const fileStore = useFileStore();

const content = ref('');
const preview = ref(null);
const selectedFile = ref(null);

const handleChangePostImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('이미지 파일만 업로드할 수 있습니다.');
    return;
  }

  if (preview.value) {
    URL.revokeObjectURL(preview.value);
  }

  selectedFile.value = file;
  preview.value = URL.createObjectURL(file);
};

const handleCreatePost = async () => {
  if (!content.value.trim()) {
    alert('게시글 내용을 입력해주세요.');
    return;
  }

  if (!selectedFile.value) {
    alert('이미지를 첨부해주세요.');
    return;
  }

try {
  await fileStore.createPost(content.value, selectedFile.value);
  router.replace('/posts');
} catch (error) {
  const code = error?.response?.data?.code;

  if (code === 'E05') {
    alert(error?.response?.data?.data || '게시글 내용을 확인해주세요.');
    return;
  }

  myErrorStore.setErrorInfo(error);
  router.replace('/error');
}

};
</script>

<template>
<form class="container" @submit.prevent="handleCreatePost">

  <textarea 
  v-model="content"
  name="post-create"
  id="post-create"
  class="post-text-area"
  ></textarea>
  
  <input 
  type="file"
  class="file-box"
  accept="image/*"
  @change="handleChangePostImage"
  >
    <div
  class="preview"
  v-if="preview"
  :style="{backgroundImage: `url(${preview})`}"
  ></div>
  <MyButton
  :btn-type="'submit'"
  :color="'gray'"
  :size="'middle'"
  :content="'Write'"
  ></MyButton>
</form>  
</template>

<style scoped>
.container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}
.post-text-area {
  width: 100%;
  max-width: 650px;
  min-height: 350px;
  font-size: 24px;
  border-radius: 10px;
  border: 2px solid gray;
}
.file-box {
  font-size: 24px;
}
.preview {
  width: 100%;
  max-width: 650px;
  aspect-ratio: 16 / 9;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border-radius: 10px;
  background-color: black;
}
</style>