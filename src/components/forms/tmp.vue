<template>
<div class="container__music">
        <div class="container-upload-music">
            
              <div class="upload-music">
                   <div class="upload-content"> 
                       <label for="btn-upload" class="btn-label-upload zonedrop">
                           <div class="header-title">
                               <h1>Suba su musica</h1>
                               <div class="info">
                                   <small v-if="music.file_name!=undefined">{{music.file_name}}</small>
                                   <small v-if="music.size!=undefined">{{music.size}}</small>
                                   <small v-if="music.type!=undefined">{{music.type}}</small>
                               </div>
                           </div>
                           <span>
                               <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                           </span>
                           <div class="footer-title">
                               <h3 >{{error_label}}</h3>
                           </div>
                           </label>
                       <input type="file" id="btn-upload" v-on:change="loadFile" accept="audio/*" />
                   </div>

        </div>
</div>
     
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Informacion de la cancion</h2>
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
                      <div class="input-group">
                          <span class="input-group-addon"> </span>
                          <select class="form-control" v-on:change="hiddenLabelGenres" id="value-content">
                            <option v-if="showLavel">seleciones su genero musical</option>
                            <option v-for="gen in genres" :key="gen._id" :value="gen._id">{{gen.name}}</option>
                          </select>
                        </div>
                      </div>
                     <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"></span>
                        <label class="control-label">Titulo</label>
                        <input type="text" class="form-control" v-model="music.title" required>
                      </div>
                    </div>
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"></span>
                        <label class="control-label">Descripcion.</label>
                        <input type="email" class="form-control" v-model="music.description" required>
                      </div>
                    </div>
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"></span>
                        <label class="control-label">Etiquetas</label>
                        <input type="text" class="form-control"  v-model="music.tags" required>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-right">
                    <button class="btn btn-info btn-flat">Cancel</button>
                    <button class="btn btn-info" v-on:click.prevent="uploadFilesForm" :disabled="btn_disable">Guardar</button>
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
            urlImg: undefined,
            draging: false,
            genres: [],
            btn_disable: false,
            error_label: '',
            music: {
                title: undefined,
                description: undefined,
                tags: undefined,
                genre: undefined,
                file: undefined,
                size: undefined,
                file_name: undefined,
                type: undefined,
                

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
        hiddenLabelGenres(event){
            this.showLavel=false;
            this.error.error=false;
            this.music.genre =event.target.value;
        },
    
    handlDrop(event){
        console.log(event)
        return false;
    },
    handlDropEnter(ev){
        return false;
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
        formData.append('music',self.music.file);
        formData.append('title',self.music.title);
        formData.append('description',self.music.description);
        formData.append('tags',self.music.tags);
        formData.append('genre',self.music.genre);
            axios.post(`${SERVER_URI}/api/upload/music?token=${this.user_data.token}`,formData,
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
            console.log(response);
             })
            .catch(function (err) {
            //handle error
            
            if(err.response.data.error){
                self.error.error=true;
                self.error.message = err.response.data.message;
            }
        });
    },
    getMusicUploadIncompleteBYUser(){
        axios.get(`${SERVER_URI}/api/musicspending?token=${this.user_data.token}`)
             .then(function (req) {
             let music_penging =req.data.musics;
          
                 if(music_penging.length>0){
                    EventBus.$emit("music_upload",true);
                 }
            
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
    }
    },
    mounted(){
        this.redirectUserLogin();
        this.getMusicUploadIncompleteBYUser();
        this.getGenres();
    let _this=this;
        //    //drap en drop 
        let zonedrop =document.querySelectorAll(".zonedrop") || [];
        if(zonedrop.length>0){
            for(let i in zonedrop){

                zonedrop[i].ondragover=function(ev){
                    ev.preventDefault();
                    _this.draging=true;
                    return false;
                };

                 zonedrop[i].ondragleave=function(ev){
                    ev.preventDefault();
                    _this.draging=false;
                    return false;
                };

                zonedrop[i].ondrop=function(ev){
            ev.preventDefault();
            _this.draging=false;
            let file =ev.dataTransfer.files[0];
            _this.music.file=file;
            let extension =file.name.split('.');
            extension=  extension[extension.length-1];

           if(extension=='mp3' || extension=='wpw' || extension=='ogg' || extension=='mp3' ){
                _this.error_label = "";
                _this.music.file_name=(file.name).substr(0,30)+'...';
                _this.music.size=`${(file.size /1024/1024).toFixed(1)} MB`;
           }else{
            _this.error_label = "Este formato no es una musica";
            ev.target.classList.remove('md-bg-green-A700');
            return new Error("Este formato no es una imagen");
           }

                    return false;
                };
            }
        }

        
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
@import url("./styles.css");

</style>
