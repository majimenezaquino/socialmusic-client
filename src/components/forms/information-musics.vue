<template>
<div class="contatiner-upload">
        <div class="container-upload-music">
            <div class="col-xs-12 col-sm-6">
              <div class="upload-music">
                   <div class="upload-content">
                       <label for="btn-upload" class="btn-label-upload">
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
                               <h3 style="display:none">Error to upload</h3>
                           </div>
                           </label>
                   </div>
              </div>
        </div>
</div>
         <div class="col-xs-12 col-sm-6">
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
            genres: [],
            btn_disable: false,
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
            .catch(function (response) {
            //handle error
            console.log(response);
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
#btn-upload {
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
