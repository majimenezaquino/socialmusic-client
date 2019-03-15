<template>
<div class="container__music">
    <div class="col-music">
         <div class="zone_drop" id="update-music-info" >
                <div class="thumb-previes" v-if="upload_image.length>0">
                    <a href="" class="btn btn-danger btn-fab btn-fab-sm"
                    v-on:click.prevent="handlClosePrevies"
                    >
                        <i class="fa fa-times" aria-hidden="true"></i></a>
                    <img :src="upload_image" alt="">
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
                    <p>{{(music.file_name || '').substr(0,50)}}</p>
                    <small v-if="music.size_tmp>0">{{(music.size_tmp/1024/1024).toFixed(1)}} MB</small>
                </div>
         </div>
    </div>
     <div class="col-music">
            <div class="form-upload">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Crear lista de reproducción</h2>
                     <div class="container-error">
                            <AlertError v-if="error.error">
                                <p slot="alert-title" class="description">{{error.message}}</p>
                            </AlertError>
                            <AlertSuccess v-if="success.success">
                                <p slot="alert-title" class="description">{{success.message}}</p>
                            </AlertSuccess>
                    </div>
                  </header>
                  <div class="card-body">
                       <div class="form-group is-empty">
                        <label for="name" class="col-md-4 control-label">Nombre de la lista de reproducción </label>
                        <div class="col-md-8">
                       
                          <input type="text" v-model="music.title"  class="form-control disabled" />
                        </div>
                      </div>

                      <div class="form-group is-empty">
                        <label for="name" class="col-md-4 control-label">Quien puede ver esta lista de reproducción? </label>
                        <div class="col-md-8">
                       
                          <select class="form-control" v-on:change="changePrivacy" id="value-content">
                            <option v-for="privacy in privacies" :key="privacy._id" :value="privacy._id">{{privacy.name}}</option>
                          </select>
                        </div>
                      </div>
                      

                       <div class="form-group is-empty">
                        <label for="name" class="col-md-4 control-label">
                           </label>
                        <div class="col-md-8">
                        
                        </div>
                      </div>
                      
                  </div>
                  <div class="card-footer text-right">
                    <button class="btn btn-info btn-flat">Cancel</button>
                    <button class="btn btn-info" v-on:click.prevent="updateMusicUpload">Guardar</button>
                  </div>
         
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
    const {EventBus} =require('@/eventbus');
    import LimitUpladMusic from './limit-upload-music.vue';
  import { setInterval, setImmediate } from 'timers';
          import AlertError from './AlertError.vue';
        import AlertSuccess from './AlertSuccess.vue';
  import io from 'socket.io-client';
  const socket = io(SERVER_URI);

export default {
    name: 'avatar',
    components:{
        LimitUpladMusic,
        AlertError,
        AlertSuccess
    },
    data(){
        return{
            isDraging:false,
            upload_image: '',
            user_data: {},
            privacies: undefined,
            message_upload:'Selecciones una imagen',
            extension:["png","jpg","jpeg"],
            genres_label: true,
            privacy: undefined,
            download_allowed:false,
            genres: [],
               music: {
                title: undefined,
                description: undefined,
                tags: undefined,
                genre: undefined,
                privacy: null,
                file: undefined,
                size_tmp: 0,
                description:undefined,
                file_name: undefined,
                type: undefined, 
                tags: undefined,
                download_allowed: false

            },
            error:{
                error:false,
                message: undefined
            },
            success:{
                success:false,
                message:undefined
            }
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
        //============================================================
        //LOADF MUSIC
        //============================================================
loadFile(event){
    let _this=this;
     let zoneDrop =document.getElementById("update-music-info");
    let file =  event.target.files[0];
if(_this.file_allower(file.name,_this.extension)){                       
        _this.music.file=file;
        _this.music.file_name=file.name;
        _this.music.size_tmp =file.size;
//load file url 
    let reader = new FileReader();
        reader.onload = function(e) {        
       _this.upload_image =e.target.result;    
        }
    reader.readAsDataURL(file);
           


    zoneDrop.classList.remove("active_drop");
    zoneDrop.classList.remove("active_error");
    _this.message_upload=''
}else{
    _this.message_upload='Este archivo no es una musica.';
    zoneDrop.classList.add("active_error");
    _this.music.file=undefined;
    _this.music.file_name=undefined;
    _this.upload_image='';
    _this.music.size_tmp =0;

}
   },
   handlSelectGenrens(ev){
         this.genres_label=false; 
         this.music.genre =ev.target.value;
   },
   handlClosePrevies(){
        this.upload_image='';
        this.music.file=undefined;
        this.music.file_name=undefined;
        this.upload_image='';
        this.music.size_tmp=0;
        this.music.size =0;
       
   },
      getPrivacies(){
          let self=this;
        axios.get(`${SERVER_URI}/api/privacies?token=${this.user_data.token}`)
             .then(function (req) {
             self.privacies =req.data.privacies;  
              self.privacy=  self.privacies[0]._id;    
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
    }, 
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
   
     updateMusicUpload(){

        let self=this;
        let formData = new FormData();
        formData.append('image',this.music.file);
        formData.append('id',this.music._id);
        formData.append('title',this.music.title);
        formData.append('privacy', this.privacy);
        formData.append('download_allowed',this.download_allowed);
   
            axios.post(`${SERVER_URI}/api/upload/playlist?token=${this.user_data.token}`,formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
             .then(function (req) {
            //handle success
            //socket
                 
        
            
            if(!req.data.error){
               
                let  notification={
                user_id: self.user_data.user.id,
                notification_key: req.data.notification_key
                }
                                console.log("envinado",req)
                socket.emit('notification_key',notification);
                     
                setTimeout(function(){
                       self.$router.push('/musics/'+req.data.music._id);
                    },1000);
                    

                    self.success.success=true;
                self.success.message=`Música Publicidad`;
                self.btn_disable=true;
                
            }
             })
            .catch(function (err) {
            //handle error
            console.log("error",err);
        });
    },
   
    changePrivacy(event){
            this.privacy =event.target.value;
        },
         changeAllowerChange(event){
            this.changeAllowerChange =event.target.value;
        },
     getMusicUploadIncompleteBYUser(){
      let self=this;
        axios.get(`${SERVER_URI}/api/musicspending?token=${this.user_data.token}`)
             .then(function (req) {
             let music_penging =req.data.musics;
             
                 if(music_penging.length>0){
                   self.music =music_penging[0];
                   self.music.size_tmp=0;
                 
                 }
            
             })
            .catch(function (error) {
            //handle error
            console.log("error",error.response);
        });
    }, 

    },
    mounted(){
        this.redirectUserLogin();
         this.getPrivacies();
         this.getMusicUploadIncompleteBYUser();
         //===================================================================
        //set drag en drop
        //====================================================================
        let zoneDrop =document.querySelectorAll(".zone_drop") || [];
        let _this=this;
        if(zoneDrop.length>0){
            for(let i in zoneDrop){
                zoneDrop[0].ondragover=function(ev){
                    ev.target.classList.add("active_drop")
                    return false;
                };
                zoneDrop[0].ondragleave=function(ev){
                    ev.target.classList.remove("active_drop");
                     ev.target.classList.remove("active_error");
                    return false;
                };

                zoneDrop[0].ondrop=function(ev){
                    ev.preventDefault();
                    let file =ev.dataTransfer.files[0];
                    ev.target.classList.remove("active_drop");
                    if(_this.file_allower(file.name,_this.extension)){                       
                            _this.music.file=file;
                            _this.music.file_name=file.name;
                            _this.music.size =file.size;
                     ev.target.classList.remove("active_drop");
                     ev.target.classList.remove("active_error");
                      _this.message_upload=''

                    let reader = new FileReader();
                    reader.onload = function(e) {        
                    _this.upload_image =e.target.result;   
                    }
                    reader.readAsDataURL(file);
                    }else{
                        _this.message_upload='Este archivo no es una musica.';
                        ev.target.classList.add("active_error");
                        _this.music.file=undefined;
                        _this.music.file_name=undefined;
                        _this.music.size =0;
                        _this.upload_image='';

                    }
                    return false;
                };
            }
        }
        //END DRAG AND DROP

       
    },
    watch:{
        'music.title':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.tags':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.genre':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.file':function(){
        this.error.error=false;
        this.success.success=false;
        },
        'music.description':function(){
        this.error.error=false;
        this.success.success=false;
        },
        'music.file_name':function(){
        this.error.error=false;
        this.success.success=false;
        }
    }
}
</script>
<style>
@import url("./styles.css");

</style>
