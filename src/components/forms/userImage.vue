<template>

    
   
    <div class="avatar-upload">
            <div class="imagePreview">
                <img :src="urlImg || propImageUrl" alt="">
            </div>
        <div class="avatar-edit">
            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"  v-on:change="changeUpload"/>
            <label for="imageUpload"><i class="fa fa-pencil" aria-hidden="true"></i></label>
        </div>
           <div class="container-progres" v-if="showproccess">
                <div  id="progress" class="progress-pie-chart" :data-percent="progress">
                <div class="ppc-progress">
                    <div class="ppc-progress-fill"></div>
                </div>
                <div class="ppc-percents">
                     <div class="pcc-percents-wrapper">
                     <span>%</span>
                    </div>
                </div>
            </div>
           </div>

           <div class="continer-save" v-if="active_btn_save">
                    <div class="control">
                        <button 
                        v-on:click.prevent="submitUpload"
                        class="btn btn-primary btn-fab"><i class="fa fa-floppy-o"></i> </button>
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
           }
           

        }
        reader.readAsDataURL(input.files[0]);
    }


        },
        changeUpload(event){
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
    },
    handlDrop(ev){
        console.log("drop===>",ev)
        ev.preventDefault();
    },
    },
    mounted(){
        this.redirectUserLogin();
        
    }
}
</script>
<style>
 @import url('./styles.css');
</style>
