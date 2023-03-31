<template>
  <div className="upload-preview">
    <!-- <img v-if="imgUrl" :src="imgUrl" :style="{ maxWidth: '100%', float: 'right' }" /> -->
    <label for="imgUpload" class="custom-upload-btn">{{ uploadMsg }}</label>
    <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" class="hidden" />

    <!-- <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" /> -->
  </div>
</template>

<script>
import { uploadService } from '../services/upload.service.js'

export default {
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false
    }
  },
  methods: {
    async uploadImg(ev) {
      this.isUploading = true
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      this.isUploading = false
      this.imgUrl = secure_url
      this.height = height
      this.width = width
      this.$emit('uploaded', this.imgUrl)
    }
  },
  computed: {
    uploadMsg() {
      if (this.imgUrl) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Select from computer '
    }
  }
}
</script>


<style>
.hidden {
  display: none;
}

.custom-upload-btn {
  display: inline-block;
  background-color: #0095f6;
  color: white;
  padding: 4px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
}


/* .custom-upload-btn:hover {
  background-color: #3e8e41;
} */
</style>
