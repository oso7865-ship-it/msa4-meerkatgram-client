import { defineStore } from "pinia"
import { ref } from "vue";
import myAxios from "../../api/myAxios";

const useFileStore = defineStore('fileSotre', () => {
  // 1. State

  // 2. Getters

  // 3. Actions
  const uploadProfile = async (file) => {
    try {
      const url = `/api/files/profiles`

      const data = new FormData();
      data.append('file', file);

      // Content-type 변경
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);

      return res.data.data.fileUri
    } catch (error) {
      throw error;
      return null;
    }
  }



  return {
    uploadProfile,
  }
});



export default useFileStore;