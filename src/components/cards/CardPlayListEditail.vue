<template>
    <section>
<div class="modal fade modal-editail-playlist" id="modal-editail-playlist" tabindex="-1" role="dialog" aria-labelledby="modal-editail-playlist">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="card m-0">
            <header class="card-heading p-b-20">
                <h2 class="card-title">Editar lista de reproducción </h2>
          
                <ul class="card-actions icons right-top">
                    <li>
                        <a href="javascript:void(0)" data-dismiss="modal" aria-label="Close">
                            <i class="zmdi zmdi-close"></i>
                        </a>
                    </li>
                </ul>
            </header>
        </div>
        <div class="modal-body">
                  <div class="col-sm-12">
                <div class="card-playlist-create">
         
                  <div class="card-body ">
                     
                  <div class="body-upload">
                    <div class="thumbnil">
                      <header>
                        <h2 class="card-title">Agregue una imagen “opcional” a la lista de reproducción</h2>
                      </header>
                      <label for="input-upload-edit-playlist" id="btn-upload"><i class="fa fa-cloud-upload"></i></label>
                        <input type="file" id="input-upload-edit-playlist" name="pio" accept="image/*" v-on:change="loadFile">
                      <div class="preview-hiddi" 
                      v-if="filename!=undefined"
                       v-bind:style="{ 'background-image': 'url(' + filename + ')' }"
                       >
                        <a href="" class="btn-closer" v-on:click.prevent="clearUploadFile"><i class="zmdi zmdi-close"></i></a>
                        <!-- <img :src="filename" v-if="filename!=undefined" /> -->
                      </div>
                      <div class="conent-drap" id="playlistdrap">
                        <p>Arrate su imagen hasta aquí </p>
                      </div>
                    </div>
                  </div>
                 
             
                  
                      <div class="form-group is-empty">
                        <label for="name" class="col-md-2 control-label" >Titulo</label>
                        <div class="col-md-10">
                          <input type="text" class="form-control" id="name" v-model="playlist.name" required>
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="inputEmail" class="col-md-2 control-label">Privacidad </label>
                        <div class="col-md-10">
                          <select type="email" class="form-control" id="inputEmail" v-on:change="handlSelectPrivacy">
                              <option  v-for="privicy in privacies"
                               :key="privicy._id"
                                :value="privicy._id"
                                :selected="privicy._id==privacy_select"
                                >{{privicy.name}}</option>
                          </select>
                        </div>
                      </div>
                      
              
        
                  </div>
                
                </div>
          </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" v-on:click.prevent="creatPlaylist">Guardar</button>
            </div>
        </div>
        <!-- modal-content -->
    </div>
    <!-- modal-dialog -->
</div>
		
    </section>
</template>
<script>

  import CardUser from "./CardUser.vue";
  import swal from 'sweetalert';
    const moment = require('moment');
    const axios = require('axios');
    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
  moment.locale('es')

  export default {
      name: 'playlist-editail',
      props:{
        playlist_select: String
      },
      data(){
        return {
            user_data: undefined,
            show_upload_img: false,
            privacy_select: undefined,
            playlist_id: undefined,
            privacies: [],
            extension_allower:["png","jpg","jpeg"],
            filename: undefined,
            playlist:{
              name:  undefined,
              privacy:  undefined,
               file: undefined,
            }
        }
      },
      methods:{
        handlSelectPrivacy(ev){
            this.playlist.privacy =ev.target.value;
        },
          redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
          this.user_data  =dbLocal.getDataLocalStorageOBject();
      },
          getPrivacies(){
            let self=this;
          axios.get(`${SERVER_URI}/api/privacies?token=${this.user_data.token}`)
              .then(function (req) {
              self.privacies =req.data.privacies;  
               if(self.privacies.length>0)
               self.playlist.privacy =req.data.privacies[0]._id;
              console.log("req.data.privacies",req.data.privacies);
            
              })
              .catch(function (response) {
              //handle error
              console.log(response);
          });
      },
      getPlaylistById(playlist_id){
          let _this =this;
          axios.get(`${SERVER_URI}/api/albumes/${playlist_id}?token=${this.user_data.token}`,this.playlist)
              .then(function (req) {
                  //set data default
                  if(!req.data.error){
                      let albums= req.data.albumes;
                      _this.playlist.name =albums.name;
                      _this.playlist.privacy_select =albums.privacy;
                      _this.filename = _this.getImagePlaylist(albums.img);
                  }
              })
              .catch(function (response) {});
             
      },
      creatPlaylist(){
          let self=this;
          if(this.playlist.name===undefined){
            return;
          }
          if(this.filename===undefined || this.filename.includes("http")){
              
          axios.put(`${SERVER_URI}/api/albumes/${self.playlist_id}?token=${this.user_data.token}`,this.playlist)
              .then(function (req) {
                  if(!req.data.error){
                    swal({
                      text: "Lista de reproducción actualizada",
                      icon: "success",
                      button: "ok",
                    }).then((value) => {
                        if(value) self.$router.go();
                       })
                    $("#modal-editail-playlist").modal("hide");
                    
                  }
                  
         
            
              })
              .catch(function (response) {
              //handle error
              console.log(response);
          });}else{
            //senuplad with image
            let self=this;
        let formData = new FormData();
              formData.append('image',this.playlist.file);
              formData.append('name',this.playlist.name);
              formData.append('privacy', this.playlist.privacy);
            axios.put(`${SERVER_URI}/api/upload/playlist/${self.playlist_id}?token=${this.user_data.token}`,formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
             .then(function (req) {
            //handle success
              if(!req.data.error){
                    swal({
                      text: "Lista de reproducción actualizada",
                      icon: "success",
                      button: "ok",
                    }).then((value) => {
                        if(value) self.$router.go();
                       })
                    $("#modal-editail-playlist").modal("hide");
                     
                  }
            
            if(!req.data.error){
               
              console.log(req.data)
                
            }
             })
            .catch(function (err) {
            //handle error
            console.log("error",err);
        });

          }
      },
   
      loadFile(event){
    let _this=this;
  console.log( "_this.filename")   
    let file =  event.target.files[0];
if(this.file_allower(file.name,this.extension_allower)){                       

    let reader = new FileReader();
        reader.onload = function(e) { 
          _this.filename= e.target.result;  
             
        }
    reader.readAsDataURL(file);
    this.playlist.file=file;
           


}else{


}
   },
    file_allower(file,extension_array){
        console.log("file",extension_array)
        let extension =file.split('.');
            extension=  extension[extension.length-1];
        if(extension_array.includes(extension)){
          return true;
        }
        return false;
        },
        clearUploadFile(){
          this.filename=undefined;
          document.getElementById("input-upload-edit-playlist").value='';
          console.log("close")
        },
          getImagePlaylist(image_name){
             
              if(image_name===undefined){
                  return undefined;
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
      },
      mounted(){
        this.redirectUserLogin()
        this.getPrivacies();

           //===================================================================
        //set drag en drop
        //====================================================================
        let zoneDrop =document.querySelectorAll(".modal-editail-playlist") || [];
        let _this=this;
        if(zoneDrop.length>0){
            for(let i in zoneDrop){
                zoneDrop[0].ondragover=function(ev){
                    ev.target.classList.add("active_drop")
                    console.log("ondrop======>")
                    return false;
                };
                zoneDrop[0].ondragleave=function(ev){
                    ev.target.classList.remove("active_drop");
                     ev.target.classList.remove("active_error");
                     console.log("ondrop")
                    return false;
                };

         document.getElementById("playlistdrap").ondragenter=function(ev){
                    ev.target.classList.remove("active_drop");
                     ev.target.classList.remove("active_error");
                     console.log("ondrop")
                    return false;
                };

                zoneDrop[0].ondrop=function(ev){
                  console.log("ondrop")
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
          'playlist_select':function(value){
              this.getPlaylistById(value)
              this.playlist_id=value;
          }
      }
  }
</script>
<style>
  #modal-editail-playlist .body-upload{
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
   
  }
  #modal-editail-playlist .body-upload .thumbnil{
    display: flex;
    position: relative;
     justify-content: center;
    align-items: center;
    background-image:  url("../../assets/img/fileupload/fileupload.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 4px;
    width: 300px;
    height: 300px;
    border: #eee solid 1px;

   
  }
   #modal-editail-playlist .body-upload .thumbnil header{
     position: absolute;
     top: 0px;
     left: 0px;
   }
   #modal-editail-playlist .body-upload .thumbnil header h2{
     font-size: 13px;
     padding: 10px;
     color: #ccc;
   }
  #modal-editail-playlist .card-body{
border: none !important;
  }
  #modal-editail-playlist #btn-upload{
        display: flex !important;
    background: rgb(33, 150, 243);
    color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
  }
  #input-upload-edit-playlist{
    display: none;
  }
  .preview-hiddi{
      position: absolute;
      right: 0px;
      left:  0px;
      top: 0px;
      bottom: 0px;
      z-index: 10;
      background-repeat:no-repeat;
      background-size:contain;
      background-size:cover;
      border-radius: 4px;
  }
  .preview-hiddi .btn-closer{
    position: absolute;
    display: flex;
    right: 20px;
    top: 20px;
    width: 28px;
    height: 28px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: #eee solid 1px;
    font-size: 15px;
    line-height: 17px;
    color: #eee;
    
  }
  .preview-hiddi:hover .btn-closer{
    right:-10px;
    top: -10px;
    background: #fff;
    color: #444;
  
    
  }
  /**/
 .conent-drap{
   position: absolute;
   right: -5px;
   left:  -5px;
   top: -5px;
   bottom: -5px;
      
      display: flex;
      justify-content: center;
      align-items: center;
      
 background: rgb(33, 150, 243);
color: #fff;
z-index: -1;
 }
 .active_drop .conent-drap{
z-index: 10;
 }
</style>