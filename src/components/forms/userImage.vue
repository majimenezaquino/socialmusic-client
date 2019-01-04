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
    }
    },
    mounted(){
        this.redirectUserLogin();
        
    }
}
</script>
<style>
.avatar-upload{
    width: 200px;
    height: 200px;
    position: relative;
    border: #eee solid 3px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.imagePreview{
    width: 170px;
    height: 170px;
    overflow: hidden;
     border-radius: 50%;
    box-sizing: border-box;
    z-index: 10;
}
.imagePreview img{
    min-width: 100% !important;
    min-height: 100% !important;
}
#imageUpload {
    display: none;
    
}
.avatar-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
     border: #ccc solid 1px;
     background: #42a5f5;
    top: 50px;
    right: -15px;
    z-index: 10;
}
.avatar-edit  label{
  color: #fff;
}
/* progress*/
.container-progres{
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
    justify-content: center;
    align-items: center;
}
.container-progres .progress-pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #E5E5E5;
  position: relative;
  margin: 0px !important;
}
.progress-pie-chart.gt-50 {
  background-color: rgba(67, 209, 62, 0.6);
  z-index: 10;
}

.ppc-progress {
  content: "";
  position: absolute;
  border-radius: 50%;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  width: 200px;
  height: 200px;
  clip: rect(0, 200px, 200px, 100px);
}
.ppc-progress .ppc-progress-fill {
  content: "";
  position: absolute;
  border-radius: 50%;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  width: 200px;
  height: 200px;
  clip: rect(0, 100px, 200px, 0);
  background: #81CE97;
  transform: rotate(0deg);
}
.gt-50 .ppc-progress {
  clip: rect(0, 100px, 200px, 0);
}
.gt-50 .ppc-progress .ppc-progress-fill {
  clip: rect(0, 200px, 200px, 100px);
  background: #E5E5E5;
}

.ppc-percents {
  content: "";
  position: absolute;
  border-radius: 50%;
  left: calc(50% - 173.9130434783px/2);
  top: calc(50% - 173.9130434783px/2);
  width: 173.9130434783px;
  height: 173.9130434783px;
  background: transparent;
  text-align: center;
  display: table;
  z-index: -1;
}
.ppc-percents span {
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: #363636;
  z-index: 10;
}

.pcc-percents-wrapper {
  display: table-cell;
  vertical-align: middle;
}

body {
  font-family: Arial;
  background: #f7f7f7;
}

.progress-pie-chart {
  margin: 50px auto 0;
}
.continer-save{
    position:absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.continer-save .control{
    display: flex;
    z-index: 10;
    margin-bottom: 10px;
}

</style>
