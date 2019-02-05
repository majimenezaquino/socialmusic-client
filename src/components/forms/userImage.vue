<template>
          <div class="zone_drop uploadzone" id="update-upload-info" v-on:drop.prevent="handlerDrop">
                <div class="thumb-previes user-preven" v-if="urlImg || propImageUrl">
                    <a href="" class="btn btn-danger btn-fab btn-fab-sm"
                    v-on:click.prevent="handlClosePrevies"
                    >
                        <i class="fa fa-times" aria-hidden="true"></i></a>
                    <img :src="urlImg || propImageUrl" alt="" class="thumb-prevent">
                    <button class="btn btn-primary save-image" v-if="btn_save">
                        <i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                </div>
                <div class="form-contro ">
                     <label for="btn-upload" class="btn-upload">
                         <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                     </label>
                <input type="file"  id="btn-upload" style="display:none" name="pic" accept="image/*"
                 v-on:change="loadFile" />
                </div>
                <div class="upload-error">
                    <h3>{{message_upload}}</h3>
                </div>
                <div class="upload-info">
                    <p>{{upload.file_name}}</p>
                    <small v-if="upload.size>0">{{(upload.size/1024/1024).toFixed(1)}} MB</small>
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
             message_upload:'selecciones una imagen.',
            extension:["png","jpg","jpeg"],
            upload: {
                file: undefined,
                file_name: undefined,
                size: 0,
            },
            urlImg: undefined,
            filename: undefined,
            user_found: false,
            progress: 0,
            showproccess: false,
            active_btn_save: false,
            btn_save:false

        }
    },
    methods:{
        file_allower(file,extension_array){
        let extension =file.split('.');
            extension=  extension[extension.length-1];
        if(extension_array.length>0){
            for(let i in extension_array){
                if(extension_array[i]==extension){
                    return true;
                }             
            }
        }
        return false;
        },
     handlClosePrevies(){
        this.upload_image='';
        this.urlImg= undefined,
        this.propImageUrl= undefined,
        this.upload.file=undefined;
        this.upload.file_name=undefined;
        this.upload_image='';
        this.upload.size =0;
        this.btn_save=false;
   },
   handlerDrop(event){
       console.log("drop", drop)
       return false;
   },

loadFile(event){
    let _this=this;
    let file =  event.target.files[0];
if(_this.file_allower(file.name,_this.extension)){                       
        _this.upload.file=file;
        _this.upload.file_name=file.name;
        _this.upload.size =file.size;
        _this.btn_save=true;
//load file url 
    let reader = new FileReader();
        reader.onload = function(e) {        
       _this.urlImg =e.target.result;   
       console.log( _this.urlImg) 
        }
    reader.readAsDataURL(file);
           

     let zoneDrop =document.getElementById("update-music-info");
    zoneDrop.classList.remove("active_drop");
    zoneDrop.classList.remove("active_error");
    _this.message_upload=''
}else{
    _this.message_upload='Este archivo no es una musica.';
    zoneDrop.classList.add("active_error");
    _this.upload.file=undefined;
    _this.upload.file_name=undefined;
    _this.upload_image='';
    _this.upload.size_tmp =0;
    _this.btn_save=false;

}
   }
   ,
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

redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
    },
    mounted(){
        this.redirectUserLogin();
        //this.loadSetUp();
     
        
    }
}
</script>
<style>
 @import url('./styles.css');
</style>
