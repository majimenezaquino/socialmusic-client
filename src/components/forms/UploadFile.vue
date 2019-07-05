<template>
  <div id="my-strictly-unique-vue-upload-multiple-image"
   style="display: flex; justify-content: center;">
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      :data-images="images"
      browseText=""
      dragText="Arrastre su imagen aquí"
      primaryText=" "
      maxImage="1"
      multiple="false"
      showPrimary="false"
      idUpload="myIdUpload"
      markIsPrimaryText=""
      
      ></vue-upload-multiple-image>
  </div>
</template>
<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import axios from 'axios'
export default {
  name: 'app',
  watch: {
    things: {
      handler: function (val) {
        console.log('a thing changed' ,val)
      },
      deep: true
    }
  },
  props:{
    callback: Function
  },
  data () {
    return {
      images: []
    }
  },
  components: {
    VueUploadMultipleImage
  },
  methods: {
    uploadImageSuccess(formData, index, fileList) {
      //console.log('data', formData, index, fileList)
      let data ={
            file: formData,
            file_detail: fileList,
            file_index: index
      }
      this.callback(data);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm("remove image")
      if (r == true) {
        this.callback(undefined);
        done()
      } else {
      }
    },
    editImage (formData, index, fileList) {
     // console.log('edit data', formData, index, fileList)
       let data ={
            file: formData,
            file_detail: fileList,
            file_index: index
      }
      this.callback(data);
    }
  }
}
</script> 
 
<style>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
 
h1, h2 {
  font-weight: normal;
}
 
ul {
  list-style-type: none;
  padding: 0;
}
 
li {
  display: inline-block;
  margin: 0 10px;
}
 
a {
  color: #42b983;
}
</style> 
 