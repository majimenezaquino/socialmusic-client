<template>
<div class="container__music">
    <div class="col-music">
         <div class="zone_drop file_load" id="upload-music">
                <div class="form-contro ">
                     <label for="btn-upload" class="btn-upload">
                         <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                     </label>
                <input type="file" name="" id="btn-upload" style="display:none" accept="audio/*"
                 v-on:change="loadFile" />
                </div>
                <div class="upload-error">
                    <h3>{{message_upload}}</h3>
                </div>
                <div class="upload-info">
                    <p>{{music.file_name}}</p>
                    <small v-if="music.size>0">{{(music.size/1024/1024).toFixed(1)}} MB</small>
                </div>
         </div>
    </div>
     <div class="col-music">
            <div class="form-upload">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Informacion de la cancion</h2>
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
                      <div class="input-group">
                          <span class="input-group-addon"> </span>
                          <select class="form-control" id="value-content" v-on:change="handlSelectGenrens">
                            <option v-if="genres_label">seleciones su genero musical</option>
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
                      <div class="body-tags">
                          <span class="label label-primary m-2" v-for="(t ,i) in tags" :key="i">{{t}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-right">
                    <button class="btn btn-info btn-flat">Cancel</button>
                    <button class="btn btn-info" v-on:click.prevent="uploadFilesForm">Guardar</button>
                  </div>
         
              </div>
            </div>
    </div>
    <LimitUpladMusic> </LimitUpladMusic>
</div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
    const {EventBus} =require('@/eventbus');
    import LimitUpladMusic from './limit-upload-music.vue';
    import AlertError from './AlertError.vue';
    import AlertSuccess from './AlertSuccess.vue';
  import { setInterval, setImmediate } from 'timers';

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
            user_data: {},
            message_upload:'Suba su cancion',
            extension:["mp3","wpw","ogg"],
            genres_label: true,
            tags: undefined,
            genres: [],
               music: {
                title: undefined,
                description: undefined,
                tags: undefined,
                genre: undefined,
                file: undefined,
                size: 0,
                description:undefined,
                file_name: undefined,
                type: undefined, 
                tags: undefined,

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
     let zoneDrop =document.getElementById("upload-music");
    let file =  event.target.files[0];
if(_this.file_allower(file.name,_this.extension)){                       
        _this.music.file=file;
        _this.music.file_name=file.name;
        _this.music.size =file.size;
    zoneDrop.classList.remove("active_drop");
    zoneDrop.classList.remove("active_error");
    _this.message_upload=''
}else{
    _this.message_upload='Este archivo no es una musica.';
    zoneDrop.classList.add("active_error");
    _this.music.file=undefined;
    _this.music.file_name=undefined;
    _this.music.size =0;

}
   },
   handlSelectGenrens(ev){
         this.genres_label=false; 
         this.music.genre =ev.target.value;
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
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
      checkInfoMusic(){
        this.error.error=false;
        this.success.success=false;
          if(this.music.file_name== undefined || this.music.file_name== ''){
            this.error.error=true;
            this.error.message=`Debe subir un archivo con una de las siguientes extencion MP3 , OGG y WAV `;
           return false;
        }

        if(this.music.genre == undefined || this.music.genre== ''){
            this.error.error=true;
            this.error.message=`Debe selecionar un  genero musical.`;
           return false;
        }

        if(this.music.title== undefined || this.music.title== ''){
            this.error.error=true;
            this.error.message=`El campo titulo es requerido`;
           return false;
        }

       


        if(this.music.description== undefined || this.music.description== ''){
            this.error.error=true;
            this.error.message=`El campo descripcion es requerido`;
         return false;
        }

        if(this.music.tags== undefined || this.music.tags== ''){
            this.error.error=true;
            this.error.message=`El campo etiqueta es requerido`;
           return false;
        }
        return true;
    },
     uploadFilesForm(){
        if(this.checkInfoMusic()){
        
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
            }
             
                    setTimeout(function(){
                       self.$router.go();
                    },1000);
                

             })
            .catch(function (err) {
            //handle error
            
            if(err.response.data.error){
                self.error.error=true;
                self.error.message = err.response.data.message;
            }
        });
        }
    }
    },
    mounted(){
        this.redirectUserLogin();
         this.getGenres();
         this.title("titleffff")
         //===================================================================
        //set drag en drop
        //====================================================================
        let zoneDrop =document.querySelectorAll(".zone_drop");;
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
                    }else{
                        _this.message_upload='Este archivo no es una musica.';
                        ev.target.classList.add("active_error");
                        _this.music.file=undefined;
                        _this.music.file_name=undefined;
                        _this.music.size =0;

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
         'music.tags':function(tags){
             this.tags=tags.split(",")
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
.body-tags{
min-height: 40px;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
}

</style>
