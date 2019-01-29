<template>
<div class="contatiner-upload">
        <div class="container-upload-music">
            <div class="col-xs-12 col-sm-6">
              <div class="upload-music">
                   <div class="upload-content">
                       <label for="btn-upload" class="btn-label-upload"
                        id="uploads-image"
                        >
                           <div class="header-title">
                              <h2>suba una imagen para esta canción</h2>
                               <div class="info">
                                   <small v-if="music.file_name!=undefined">{{music.file_name}}</small>
                                   <small v-if="music.size!=undefined">{{music.size}}</small>
                                   <small v-if="music.type!=undefined">{{music.type}}</small>
                               </div>
                           </div>
                           <span class="btn-upload">
                               <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                           </span>
                           <div class="footer-title">
                               <h3 style="display">{{error_label}}</h3>
                           </div>
                           <div class="thumb-previes" v-if="urlImg.length>0">
                               <button class="btn-close"
                               v-on:click.prevent="closeImage"
                               >
                                   <i class="fa fa-times" aria-hidden="true"></i>
                                   </button>
                               <img :src="urlImg" alt="">
                           </div>
                           </label>
                           <input type="file" name="upload-image" id="upload-image" accept="mage/*" class="btn-upload" />
                   </div>
              </div>
        </div>
</div>
         <div class="col-xs-12 col-sm-6">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">publicar la canción</h2>
                        <div class="container-error">
                         <div class="alert alert-danger" role="alert" v-if="error.error">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong>Oh snap! </strong> {{error.message}}
                        </div>
                         <div class="alert alert-success" role="alert" v-if="success.success">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong></strong> {{success.message}}
                        </div>
                        </div>
                  </header>
                  <div class="card-body">
                       <div class="form-group is-empty">
                        <label for="name" class="col-md-4 control-label">Título de la canción </label>
                        <div class="col-md-8">
                       
                          <input type="text" v-model="music.title" disabled="true" class="form-control" />
                        </div>
                      </div>

                      <div class="form-group is-empty">
                        <label for="name" class="col-md-4 control-label">Quien puede ver esta canción? </label>
                        <div class="col-md-8">
                       
                          <select class="form-control" v-on:change="changePrivacy" id="value-content">
                            <option v-for="privacy in privacies" :key="privacy._id" :value="privacy._id">{{privacy.name}}</option>
                          </select>
                        </div>
                      </div>
                        
                        <div class="form-group is-empty">
                        <label for="name" class="col-md-4 control-label">Quiere que los usuarios puedan descargar esta canción.? </label>
                        <div class="col-md-8">
                       
                          <select class="form-control" v-on:change="changeAllowerChange" id="value-content">
                            <option :value="true">NO</option>
                            <option :value="false">SI</option>
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
                    <button class="btn btn-info" v-on:click.prevent="uploadFilesForm" :disabled="btn_disable">Guardar</button>
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
            urlImg: "",
            privacies: [],
            btn_disable: false,
            error_label: '',
            music: {
                title: undefined,
                file_name: undefined,
                file: undefined,
                privacy: undefined,
                download_allowed: false,
                

            },
            success:{
                success: false,
                message: undefined
            },
            error:{
                message: undefined,
                error: false
            },
            filename: undefined,
            user_found: false,
            progress: 0,
            showproccess: false,
            active_btn_save: false,
            showLavel: true

        }
    },
    methods:{
        changePrivacy(event){
            this.music.privacy =event.target.value;
            console.log(this.music.privacy)
        },
        closeImage(){
            this.urlImg ='';
            this.music={};
        },
          changeAllowerChange(event){
            this.music.download_allowed =event.target.value;
        },
    
    drag(event){
        event.prevenDefault();
        console.log("evento",event.dataTransfer)
    },
      elementInto(e){
          console.log("evento",e)
      },
redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
   loadFile(event){
     this.music.file=  event.target.files[0];
    this.music.file_name=(event.target.files[0].name).substr(0,30)+'...';
    this.music.size=`${(event.target.files[0].size /1024/1024).toFixed(1)} MB`;
       this.error.error=false;
   },
    uploadFilesForm(){
        this.infoComplete()
        let self=this;
        let formData = new FormData();
        formData.append('image',self.music.file);
        formData.append('id',self.music._id);
        formData.append('title',self.music.title);
        formData.append('privacy',self.music.privacy);
        formData.append('download_allowed',self.music.download_allowed);
            axios.put(`${SERVER_URI}/api/upload/music?token=${this.user_data.token}`,formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
             .then(function (response) {
            //handle success
            if(!response.data.error){
                self.success.success=true;
                self.success.message=`Musica subida`;
                self.btn_disable=true;
                EventBus.$emit("music_upload",true);
            }
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
    },
    getMusicUploadIncompleteBYUser(){
      let self=this;
        axios.get(`${SERVER_URI}/api/musicspending?token=${this.user_data.token}`)
             .then(function (req) {
             let music_penging =req.data.musics;
             
                 if(music_penging.length>0){
                   self.music =music_penging[0];
                 }else{
                   EventBus.$emit("music_upload",true);
                 }
            
             })
            .catch(function (error) {
            //handle error
            console.log("error",error.response);
        });
    }, 


        getPrivacies(){
          let self=this;
        axios.get(`${SERVER_URI}/api/privacies?token=${this.user_data.token}`)
             .then(function (req) {
             self.privacies =req.data.privacies;
          
                console.log("privacies ",self.privacies)
            
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
    }, 
    infoComplete(){
        this.error.error=false;
          if(this.music.file_name== undefined || this.music.file_name== ''){
            this.error.error=true;
            this.error.message=`Debe subir un archivo con una de las siguientes extencion MP3 , OGG y WAV `;
           return new Error(this.error.message)
        }

        if(this.music.title== undefined || this.music.title== ''){
            this.error.error=true;
            this.error.message=`El campo titulo es requerido`;
           return new Error(this.error.message)
        }

        if(this.music.description== undefined || this.music.description== ''){
            this.error.error=true;
            this.error.message=`El campo descripcion es requerido`;
         return  new Error(this.error.message)
        }

        if(this.music.tags== undefined || this.music.tags== ''){
            this.error.error=true;
            this.error.message=`El campo etiqueta es requerido`;
            return new Error(this.error.message)
        }
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
            console.log(response);
        });
    },
    loadImage(file){
        let fromData =new fromData();
    },
    },
  
    mounted(){
        this.redirectUserLogin();
        this.getMusicUploadIncompleteBYUser();
        this.getGenres();
        this.getPrivacies();
    let self=this;
        document.addEventListener("DOMContentLoaded",function(){
       let zonedrag =document.getElementById("uploads-image");
       zonedrag.ondragover =function(ev){
           ev.target.classList.add('md-bg-green-A700');
           return false;
       }

        zonedrag.ondragleave =function(ev){
           ev.target.classList.remove('md-bg-green-A700');
           return false;
       }

       zonedrag.ondrop =function(ev){
           ev.preventDefault();
           let file =ev.dataTransfer.files[0];
           
           //check estenxion of file 
           let extension =file.name.split('.');
          extension=  extension[extension.length-1];
           if(extension=='jpg' || extension=='png' || extension=='gif'){
               self.error_label = "";
           }else{
             self.error_label = "Este formato no es una imagen";
             ev.target.classList.remove('md-bg-green-A700');
               return new Error("Este formato no es una imagen");
           }
           self.music.file_name = file.name;
           self.music.file = file;

           //data
            let reader = new FileReader();
        reader.onload = function(e) {
           
                self.urlImg =e.target.result;
           
           

        }
        reader.readAsDataURL(file);
           

          self.music.size = (file.size/1204/1024).toFixed(1);
           ev.target.classList.remove('md-bg-green-A700');
           return false;
       }
});
        
    },
    watch:{
        'music.title':function(value,oldv){
            this.error.error=false;
        },
        'music.description':function(value,oldv){
           this.error.error=false;
        },
        'music.tags':function(value,oldv){
           this.error.error=false;
        }
    }
}
</script>
<style>

.contatiner-upload{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background: #42a5f5;
}
.container-upload-music .upload-music {
    width: 360px;
    height: 360px;
   
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #fff;
    padding: 20px;
   
}
.btn-upload {
    width: 0px;
    height: 0px;
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
    background-repeat: no-repeat;
    background-size:100%  100%;
    z-index: 10;
}
.thumb-previes{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 10;
    background: #fff;
    
}
.btn-close{
    display: flex;
    justify-content: center;
    position: absolute;
    padding: 10px;
    background: transparent;
    border-radius: 50%;
    font-size: 22px;
    background: #fff;
        border: #ccc solid 1px;

}
.header-title ,.footer-title {
    display: flex;
    flex-grow: 1;
    width: 100%;
    position: absolute;
    top: 20px;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px;
}
.header-title .info{
    width: 100%;
    display: flex;
    flex-direction: column;
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
