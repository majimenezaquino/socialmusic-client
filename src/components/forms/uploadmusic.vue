<template>
        <div class="container-upload-music">
              <div class="upload-music">
                   <div class="upload-content">
                       <label for="btn-upload" class="btn-label-upload">
                           <div class="header-title">
                               <h1>Suba su musica</h1>
                           </div>
                           <span>
                               <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                           </span>
                           <div class="footer-title">
                               <h3>Error to upload</h3>
                           </div>
                           </label>
                       <input type="file" id="btn-upload" v-on:change="changeUpload" >
                       <div class="hidd">
                           <audio :src="urlAudio" id="player_validate"></audio>
                       </div>
                   </div>
              </div>
        </div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
  import { setInterval, setImmediate } from 'timers';

export default {
    name: 'avatar',
    props:{
        propImageUrl: {
            type: String,
            required: false
        },

    },
    data(){
        return {
            urlImg: undefined,
            filename: undefined,
            user_found: false,
            urlAudio: undefined,
            progress: 0,
            showproccess: false,
            active_btn_save: false,

        }
    },
    methods:{
        uploadFiles(input){
           let self=this;
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
           let  sizekiloBytes = parseInt(input.files[0].size / 1024);
           if(sizekiloBytes<=1024){
                self.urlImg =e.target.result;
                let img_tmp =e.target.result;
                self.filename=input.files[0];
                self.active_btn_save =true; //activar btn save
                self.urlAudio = e.target.result;
           }
           

        }
        reader.readAsDataURL(input.files[0]);
    }


        },
        changeUpload(event){
            console.log(event)
            this.uploadFiles(event.target);
        },
redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
    submitUpload(){
        this.uploadFilesForm(this.filename)
    },
    uploadFilesForm(bodyFormData){
      let contador =0;
      if(bodyFormData===undefined)  {
          throw new Error('erro file not found')
          return;
      }
      this.showproccess=true;
       let self=this;
        let  config = {
                onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
             let barElement = document.getElementById('progress'),
                percent = parseInt(percentCompleted),
                deg = 360*percent/100;
                if(barElement!=null && barElement!=undefined){
              if (percent > 50) barElement.classList.add('gt-50');
 
               document.querySelector('.ppc-progress-fill').style.transform=`rotate(${deg}deg)`;
              document.querySelector('.ppc-percents span').innerHTML=percent+'%';
                    self.active_btn_save=false;
                    setTimeout(function(){
                        self.showproccess=false;
                    },1000)
             
                     }}
            };

        let formData = new FormData();
      formData.append('image', bodyFormData);

            axios.post(`${SERVER_URI}/api/upload/image?token=${this.user_data.token}`,
                 formData,config
            )
             .then(function (response) {
            //handle success
            console.log(response);
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
    },
    watch: {
        'urlAudio':function(oldUrl, newUrl){
            let audio =document.querySelector(".container-upload-music audio");
            audio.oncanplay = function() {
            alert("Can start playing video");
                  }
        }
    },
    mounted(){
        this.redirectUserLogin();
        
    }
}
</script>
<style>
.container-upload-music{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container-upload-music .upload-music {
    width: 360px;
    height: 360px;
   
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
#btn-upload {
    width: 0px;
    height: 0px;
}
.hidd{
    width: 0px;
    height: 0px;
    overflow: hidden;
}
.upload-content{
    width: 100%;
    position: absolute;
    top:0px;
    left: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
     
}
.btn-label-upload{
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
justify-content: center;
align-items: center;
   border: #42a5f5 dotted;
   flex-wrap: wrap;
}
.header-title ,.footer-title {
    display: flex;
    flex-grow: 1;
    width: 100%;
    position: absolute;
    top: 20px;
    justify-content: center;
    padding: 10px;
}
.footer-title {
bottom: 0px;
top:auto;

}
.footer-title  h3{
color: red;
}
.btn-label-upload span{
display: flex;
width: 80px;
height: 80px;
background: #42a5f5;
font-size: 30px;
color: #fff;
justify-content: center;
align-items: center;
border-radius: 50%;
}
</style>
