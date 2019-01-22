<template>
<div class="contatiner-upload">
        <div class="container-upload-music">
            <div class="col-xs-12 col-sm-6">
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
                       <input type="file" id="btn-upload" v-on:change="uploadFilesForm" />
                   </div>
              </div>
        </div>
</div>
         <div class="col-xs-12 col-sm-6">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Informacion de la cancion</h2>
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
                        <input type="text" class="form-control" v-model="music.title">
                      </div>
                    </div>
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"></span>
                        <label class="control-label">Descripcion.</label>
                        <input type="email" class="form-control" v-model="music.description">
                      </div>
                    </div>
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"></span>
                        <label class="control-label">Etiquetas</label>
                        <input type="text" class="form-control"  v-model="music.tags">
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-right">
                    <button class="btn btn-info btn-flat">Cancel</button>
                    <button class="btn btn-info">Submit</button>
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
            music: {
                title: undefined,
                description: undefined,
                tags: undefined,
                genre: undefined
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
            this.music.genre =event.target.value;
        },
      
redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
   
    uploadFilesForm(event){
        let self=this;
        let formData = new FormData();
        let music =event.target.files[0];
        console.log(music)
        formData.append('music',music );
            axios.post(`${SERVER_URI}/api/upload/music?token=${this.user_data.token}`,formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
             .then(function (response) {
            //handle success
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
                    EventBus.$emit("send_music",true);
                    console.log("coo")
                 }
            
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
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
