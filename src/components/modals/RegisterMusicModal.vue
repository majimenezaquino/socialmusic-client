<template>
<div class="modal modal-stepper fade" id="register_music_modal" tabindex="-1" role="dialog" aria-labelledby="register_music_modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="show-card-incom" v-if="show_vies.user_info || show_vies.address">
                     <div class="row">
                         <div class="col-xs-12">
                             <FormUser v-if="show_vies.user_info" />
                             <FormAddress v-if="show_vies.address"/>
                             
                         </div>
                     </div>
             </div>
             <LimitUpladMusic /> 
      
        <div class="modal-body p-0">
               <form-wizard 
                        shape="square"
                        stepSize="xs"
                        color="#3498db"
                        title="Centro de Diversión"
                        subtitle="Registras tus centros de diversiones."
                        nextButtonText="Siguiente"
                        backButtonText="Volver atrás"
                         @on-complete="()=>{}"
               >
             <tab-content
                 title="Personal details"
                 icon="ti-music-alt"
                 :before-change="()=>isloaded_music"
                  >
                        <div class="container-upload">
                                            <div class="previes" v-if=" isloaded_music">
                                                <a href="" class="close-music-upload"
                                                 v-on:click.prevent=" handlerCloseLoadMusic"
                                                > <i class="zmdi zmdi-close"></i></a>
                                                    <div class="card-show-music">
                                                        <i class="zmdi zmdi-collection-music"></i>
                                                        <p>{{music.tmp_name}} <br/>
                                                        {{music.size }}
                                                        </p>
                                                    </div>
                                          
                                            </div>
                                            <div class="previes" v-if="! isloaded_music">
                                                <label for="inpu-upload-music" class="btn-upload-music">
                                                    <i class="zmdi zmdi-cloud-upload"></i> 
                                                    </label>
                                                <input type="file" id="inpu-upload-music" accept="audio/*" v-on:change="handlerLoadMusic">
                                                <p class="text-info">Máximo de 10mb</p>
                                            </div>
                                            
                                        </div>
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings"
                  :before-change="handlerBeforeGenres"
                  
                  >
                   <h3 class="text-center p-b-10 p-t-0 m-t-0">Selecciones sus géneros de músicas </h3>
                                    <div class="container-upload">
                                            <div class="container">
                                                <ul class="container-genren">
                                                    <li class="genre-item"
                                                    v-for="gen in genres"
                                                    :key="gen._id"
                                                    >
                                                     <CardButtonGenres 
                                                     :genre="gen"
                                                     :allower="music.genres.length<genres_limit"
                                                     :callback="handlerSelectMusicGenge"
                                                      />
                                                    </li>
                                                
                                                    
                                                </ul>
                                            </div>
                                            
                                        </div>
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       <div class="card">
                               <h3 class="text-center p-b-10 p-t-0 m-t-0">Información de la música </h3>
                  <div class="card-body">
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-microphone"></i></span>
                        <input type="text" class="form-control" placeholder="Titulo" v-model="music.title">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-text-width"></i></span>
                        <input type="email" class="form-control" placeholder="Description" v-model="music.description">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-tags"></i></span>
                        <input type="text" class="form-control" placeholder="Etiquetas separada por ,  Ej. Músicas, Recuerdo y mas..." v-model="music.tags">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                      <div class="col-xs-4">
                        <div class="form-group is-empty">
                          <div class="input-group">
                                <CardAddUser :title="'Colaboradores' " :callback="handlerCallback" />
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-4">
                        <div class="form-group is-empty">
                          <div class="input-group">
                            <label for="select-privacy">Privacidad</label>
                            <select class="form-control form-control-sm" id="select-privacy"
                            v-on:change="handlerSelectPrivacy"
                            >
                                     <option v-for="priv in privacies" :key="priv._id"
                                     :value="priv._id"
                                     >
                                         {{priv.name}}
                                        </option>
                                     
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-4">
                        <div class="form-group is-empty">
                          <div class="input-group">
                            <label for="select-download">Permitir descargar</label>
                                <select class="form-control form-control-sm" id="select-download"
                                     v-on:change="handlerSelectDownloadAllower" >
                                    <option value="false">NO</option>
                                    <option value="true">SI</option>
                                   
                                </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
             
 </div>
     </tab-content>
 </form-wizard>
            
        </div>
        <!-- modal-content -->
    </div>
    <!-- modal-dialog -->
</div>
</div>
</template>
<script>
import FormUser from "@/components/forms/User.vue";
import FormAddress from "@/components/address/address.vue";
import WizanItem from "@/components/forms/wizan-btns.vue";
import UploadMusic from "@/components/forms/uploadmusic.vue";
import UploadPending from "@/components/forms/information-musics.vue";
import LimitUpladMusic from '@/components/forms/limit-upload-music.vue';
import CardAddUser from '@/components/users/CardAddUser.vue'
import CardButtonGenres from './CardButtonGenres.vue'
import swal from 'sweetalert';
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
export default {
    name: 'upload-music',
    components:{
        CardAddUser,
        FormUser,
        FormAddress,
        UploadMusic,
        UploadPending,
        LimitUpladMusic,
        CardButtonGenres
    },
    data(){
        return {
            show_vies:{
               user_info: false,
               upload: false,
               address: false,
               pending: false,
            },
            progress_image_upload: 0,
            extension_allower_music:["mp3","wpw","ogg"],
            extension_allower_imag:["jpg","jpeg"],
            user_data: undefined,
            privacies: [],
            privacy: undefined,
            genres: [],
            genres_limit:5,
            music: {
                file: undefined,
                size: undefined,
                title: undefined,
                genres: [],
                colaborations: [],
                tmp_name: undefined,
                description: undefined,
                privacy: undefined,
                download_allowed: false,
            },
            upload_image: undefined,
            percentCompleted: undefined,
            image: {
                music_id: undefined,
                file: undefined,
                size: undefined,
                title: undefined,
                tmp_name: undefined,
            },
             isloaded_music: false,
             isloaded_image: false,
            music_max_size: 2097152*7, //dos megas
            image_max_size: 2097152*2, //dos megas
        }
    },
    methods:{
        handlerNext(e){
            console.log(e)
        },
 handlerBeforeGenres(ev){
     console.log(this.music.genres.length)
     if(this.music.genres.length>0){
         return true;
     }else{
 return false;
     }
     
    

        },
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
    handlerCallback(user_id){
        this.music.colaborations = user_id;
    },
      getGenres(){
        let self=this;
          axios.get(`${SERVER_URI}/api/genres?token=${this.user_data.token}`)
             .then(function (req) {
             let genres =req.data.genres;
            self.genres =genres; 
             })
            .catch(function (response) {
            //handle error
            console.log("errrr",response);
        });
    },
     getPrivacies(){
          let self=this;
        axios.get(`${SERVER_URI}/api/privacies?token=${this.user_data.token}`)
             .then(function (req) {
             self.privacies =req.data.privacies;  
              self.music.privacy=  self.privacies[0]._id;
                   
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
    },
 handlerSelectDownloadAllower(ev){
    let  allower_d =Boolean(ev.target.value);
    this.music.download_allowed =allower_d;
    },
 handlerLoadMusic(event){
    let _this=this;
    let file =  event.target.files[0];
if(_this.extensionIsAllower(file.name,this.extension_allower_music)){                       
    _this.music.file=file;
    _this.music.tmp_name=file.name;
    _this.music.size =file.size;
    if(Math.round(file.size)<=Math.round(_this.music_max_size)){
    _this. isloaded_music=true; return true;
    }
    return false;
}
    },


     handlerLoadImage(event){
         if(this.image.music_id==undefined || this.image.music_id==null || this.image.music_id==''){
             return false;
         }
    let _this=this;
    let file =  event.target.files[0];
if(_this.extensionIsAllower(file.name,this.extension_allower_imag)){                       
    _this.image.file=file;
    _this.image.tmp_name=file.name;
    _this.image.size =file.size;
    if(Math.round(file.size)<=Math.round(_this.image_max_size)){
        //load file url 
    let reader = new FileReader();
        reader.onload = function(e) {        
       _this.upload_image =e.target.result;    
        }
    reader.readAsDataURL(file);

    _this. isloaded_image=true; 
    return true;
    }
    return false;
}
    },


    extensionIsAllower(file=undefined,extension_array=[]){
        let extension =file.split('.');
            extension=  extension[extension.length-1];
        if(extension_array.length>0){
           if(extension_array.includes( extension)) return  true;
        }
        return false;
        },
         handlerCloseLoadMusic(){
            this.music.file=undefined;
            this.music.tmp_name=undefined;
            this.music.size =undefined;
            this. isloaded_music=false;
        },
         handlerCloseLoadImage(){
            this.image.file=undefined;
            this.image.tmp_name=undefined;
            this.image.size =undefined;
            this. isloaded_image=false;
        },
        handlerSelectMusicGenge(genre){
            
            if(genre.add){
             this.music.genres.push(genre.id);
            }else{
            this.music.genres=this.music.genres.filter(function(id){
                    return id!= genre.id;
               })
            }
        }
        ,handlerSelectPrivacy(ev){
            let priv =ev.target.value;
            this.music.privacy = priv;
        },
        handlerUploadMusic(){
            this.uploadFilesForm();
        },
        getUploadStatus(){
            let _this =this;
        axios.get(`${SERVER_URI}/api/checkuseruploadmusics?token=${this.user_data.token}`)
        
             .then(function (req) {
             let uploadInfo =req.data.upload_info;

                if(!uploadInfo.user_complete){
                _this.show_vies.user_info=true;
                return;
                }

                if(!uploadInfo.address){
                _this.show_vies.address=true;
                return;
                }

              if(!uploadInfo.address){
                _this.show_vies.address=true;
                return;
                }
                if(!_this.music_penging){
                  _this.show_vies.pending=false;
                  _this.show_vies.upload=true;
                return;
                }
                
            
             })
            .catch(function (response) {
            //handle error

        });
      },
      //
         handlerUploadImage(){
        let self=this;
        let formData = new FormData();
        formData.append('image',self.image.file);
        formData.append('music_id',self.image.music_id);
            axios.put(`${SERVER_URI}/api/upload/music?token=${this.user_data.token}`,formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(progressEvent) {
             self.progress_image_upload = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
   
             }
              })
             .then(function (req) {
                 if(!req.data.error){
                      swal({
                      text: "La imagen fue guardada ",
                      icon: "success",
                      button: "ok",
                    }).then((value) => {
            
                    self.handlerCloseLoadMusic();
                     self.handlerCloseLoadImage();
                     self.$router.go();
  
                       })
                    
                 }
                  console.log('respuesta' ,req)
             })
            .catch(function (err) {
                 console.log('erro' ,err.response)
        });
       
    },

      uploadFilesForm(){
             
   const config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
      console.log(percentCompleted)
    }
  }
  
        
        let self=this;
        let formData = new FormData();
        formData.append('music',self.music.file);
        formData.append('title',self.music.title);
        formData.append('description',self.music.description);
        formData.append('tags',self.music.tags);
        formData.append('genres',self.music.genres);
        formData.append('privacy',self.music.privacy);
        formData.append('size',self.music.size);
        formData.append('colaborations',self.music.colaborations);
        formData.append('download_allowed',self.music.download_allowed);
            axios.post(`${SERVER_URI}/api/upload/music?token=${this.user_data.token}`,formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            onUploadProgress: function(progressEvent) {
             self.percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
   
             }
              })
             .then(function (req) {
                 console.log(req)
                 if(!req.data.error){
                    self.image.music_id =req.data.music._id;
                 }
                  
             })
            .catch(function (err) {
                 console.log('respuesta' ,err)
        });
       
    },

    checkInformactio(){
        if(this.music.title==undefined || this.music.title!=null){

        }
    }
        },
        mounted(){
            this.redirectUserLogin();
            this.getGenres();
            this.getPrivacies();
            this.getUploadStatus();
        },
        watch: {
            'percentCompleted':(val)=>{
                console.log("value",val)
            }
        }
}
</script>
<style>
  @import url("./progress.css");
    .container-upload{
        display: flex; 
        justify-content: center;
        align-items: center;
        margin: 0px;

    }
    #inpu-upload-music{
        display: none;
    }
     #register_music_modal .previes {
         min-width: 200px;
         min-height: 200px;
         border: #eee solid 1px;
         display: flex;
         justify-content: center;
         align-items: center;
         border-radius: 25px;
         position: relative;
    }
   #register_music_modal .text-info{
        position: absolute;
        display: flex;
        justify-content: center;
        bottom: 10px;
        font-size: 12px;
        padding: 10px;
        color: #aaa;
        line-height: 13px
    }
   #register_music_modal  .modal-content{
       position: relative;
    }
  #register_music_modal   .show-card-incom{
        position: absolute;
        left: 0px; top:0px;
        right: 0px;
        bottom: -50px;
        background: #fff;
        z-index: 10;
   }
    #register_music_modal .close-music-upload{
        display: flex;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 30px;
        height: 30px;
        justify-content: center;
        align-items: center;
        z-index: 10;
        color: #444;
        font-size: 18px;
    }
    #register_music_modal .close-music-upload:hover{
        transition: all ease 0.5s;
        border: #eee solid 1px;
        border-radius: 50px;
        background: #ccc;
        color:#fff;
    }
  #register_music_modal  .card-show-music {
         display: flex;  
         padding: 5px;
         justify-content: center;
         flex-direction: column;
         align-items: center;
         flex-wrap: wrap;
    }

      #register_music_modal  .card-show-music img {
        border-radius: 20px;
    }
     #register_music_modal  .card-show-music i{
    font-size:  62px;
         color: #444;
     }
    #register_music_modal  .card-show-music p{
        font-size: 13px;
        padding: 10px;
    }
    #register_music_modal .previes:hover{
        background: #eee;
        transition: all ease 0.3s;
    }
   #register_music_modal .btn-upload-music{
        display: flex;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background-color: rgba(32, 148, 242,0.8);
            justify-content: center;
            align-items: center;
            color: #fff;
            border: #eee solid 2px;
            font-size: 25px;
            -webkit-box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
            -moz-box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
            box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
            cursor: pointer;
    }
  
   /*genres*/
   .container-genren{
       width: 100%;
       display: flex;
       justify-content: space-around;
       flex-wrap: wrap;
       margin: 0px;
       padding: 10px 0px;
       max-height: 250px;
       overflow-y: scroll;
   }
      .container-genren::-webkit-scrollbar {
    width: 6px;
    background-color: #eeee;
} 
.container-genren::-webkit-scrollbar-track {
  background: #fff; 
}
  .container-genren::-webkit-scrollbar-thumb {
    background-color: #ccc;
}

   .container-genren .genre-item{
       list-style: none;
   }
   .container-genren .genre-item button{
       display: flex;
       width: 90px;
       height: 90px;
       border: #ccc solid 1px;
       border-radius: 4px;
       margin: 5px;
       justify-content: center;
       align-items: center;
       flex-wrap: wrap;
       padding: 5px;
       overflow: hidden;
    -webkit-box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
    -moz-box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
    box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
   }

   .container-genren .genre-item button i{
       font-size: 25px;
   }
   .container-genren .genre-item button span{
       font-size: 12px;
       line-height: 13px;
       text-align: center;
   }
 .container-genren   li button.active {
       background: rgba(32, 148, 242,0.8);
       color: #fff;
   }

#register_music_modal .form-group {
    padding-bottom: 0;
    margin: 0
}
.load-pross{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left:0px;
    right: 0px;
    bottom: 0px;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 10;
}
.modal.modal-stepper .modal-content {
    /* padding-bottom: 55px; */
    padding-bottom: 0px;
}
.modal.modal-stepper .modal-footer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0px;
    margin: 0px;
}
</style>
