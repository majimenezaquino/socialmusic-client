<template>
<div class="modal modal-stepper fade" id="register_music_modal" tabindex="-1" role="dialog" aria-labelledby="register_music_modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                
                <h4 class="modal-title" id="myModalLabel-2">Sube tu música aquí</h4>
                <ul class="card-actions icons right-top">
                    <li>
                    <a href="javascript:void(0)" data-dismiss="modal" class="text-white" aria-label="Close">
                        <i class="zmdi zmdi-close"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="modal-body p-0">
            <div class="stepper">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active">
                        <a class="persistant-disabled" href="#stepper-step-1" data-toggle="tab" aria-controls="stepper-step-1" role="tab" title="Step 1">
                            <span class="round-tab">1</span>
                        </a>
                    </li>
                    <li role="presentation" class="disabled">
                        <a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2">
                            <span class="round-tab">2</span>
                        </a>
                    </li>
                    <li role="presentation" class="disabled">
                        <a class="persistant-disabled" href="#stepper-step-3" data-toggle="tab" aria-controls="stepper-step-3" role="tab" title="Step 3">
                            <span class="round-tab">3</span>
                        </a>
                    </li>
                    <li role="presentation" class="disabled">
                        <a class="persistant-disabled" href="#stepper-step-4" data-toggle="tab" aria-controls="stepper-step-4" role="tab" title="Complete">
                            <span class="round-tab">4</span>
                        </a>
                    </li>
                </ul>
                <div class="form-wrapper">
                    <form role="form">
                        <div class="tab-content">
                            <div class="tab-pane fade in active" role="tabpanel" id="stepper-step-1">
                                <div class="p-20">
                                    
                                    <section class="stepper-body">
                                        <div class="container-upload">
                                            <div class="previes" v-if="isloaded">
                                                <a href="" class="close-music-upload"
                                                 v-on:click.prevent="handlerCloseLoadFile"
                                                > <i class="zmdi zmdi-close"></i></a>
                                                    <div class="card-show-music">
                                                        <i class="zmdi zmdi-collection-music"></i>
                                                        <p>{{music.tmp_name}} <br/>
                                                        {{music.size }}
                                                        </p>
                                                    </div>
                                            </div>
                                            <div class="previes" v-if="!isloaded">
                                                <label for="inpu-upload-music" class="btn-upload-music">
                                                    <i class="zmdi zmdi-cloud-upload"></i> 
                                                    </label>
                                                <input type="file" id="inpu-upload-music" accept="audio/*" v-on:change="handlerLoadMusic">
                                                <p class="text-info">Máximo de 10mb</p>
                                            </div>
                                            
                                        </div>
                                    </section>
                                </div>
                                
                                <div class="modal-footer">
                                    <ul class="list-inline pull-right">
                                        <li>
                                            <a class="btn btn-primary next-step" :disabled="!isloaded">Guardar </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
                                <div class="p-5">
                                        <h3>Selecciones sus géneros de músicas </h3>
                                    <div class="container-upload">
                                            <div class="container">
                                                <ul class="container-genren">
                                                    <li class="genre-item"
                                                    v-for="gen in genres"
                                                    :key="gen._id"
                                                    >
                                                        <button
                                                        v-on:click.prevent="handlerSelectMusicGenge" 
                                                        :value="gen._id"
                                                        >
                                                            <!-- <i :class="gen.icon"></i> -->
                                                            <span>{{gen.name}}</span>
                                                        </button>
                                                    </li>
                                                
                                                    
                                                </ul>
                                            </div>
                                            
                                        </div>
                                    
                                </div>
                                <div class="modal-footer">
                                    <ul class="list-inline pull-right">
                                        <li>
                                            <a class="btn btn-default prev-step">Volver  atrás</a>
                                        </li>
                                        <li>
                                            <a class="btn btn-primary next-step"
                                             :disabled="!music.genres.length>0"
                                            >Guardar</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
                                <div class="">
                     <section class="stepper-body">
                         <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Inputs with icon prefixes</h2>
                    <ul class="card-actions icons right-top">
                      <li>
                        <a href="javascript:void(0)" data-toggle-view="code">
                          <i class="zmdi zmdi-code"></i>
                        </a>
                      </li>
                    </ul>
                  </header>
                  <div class="card-body">
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
                        <input type="text" class="form-control" placeholder="Titulo" v-model="music.title">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-email"></i></span>
                        <input type="email" class="form-control" placeholder="Description" v-model="music.description">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-phone"></i></span>
                        <input type="text" class="form-control" placeholder="Etiquetas" v-model="music.tags">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                      <div class="col-xs-6">
                        <div class="form-group is-empty">
                          <div class="input-group">
                            <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                            <input type="text" class="form-control datepicker" id="start_date"  placeholder="Start Date...">
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-6">
                        <div class="form-group is-empty">
                          <div class="input-group">
                            <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                            <input type="text" class="form-control datepicker" id="end_date" placeholder="End Date...">
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
             
                </div>
                                    </section>
                                </div>
                                <div class="modal-footer">
                                    <ul class="list-inline pull-right">
                                        <li>
                                            <a class="btn btn-default prev-step">Back</a>
                                        </li>
                                        <li>
                                            <a class="btn btn-default cancel-stepper">Cancel Payment</a>
                                        </li>
                                        <li>
                                            <a class="btn btn-primary next-step">Submit Payment</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane fade" role="tabpanel" id="stepper-step-4">
                                <div class="p-20">
                                    <header>
                                        <h3>4. All done!</h3>
                                    </header>
                                    <section class="stepper-body">
                                        <p>You have successfully completed all steps.</p>
                                    </section>
                                </div>
                                <div class="modal-footer">
                                    <ul class="list-inline pull-right">
                                        <li>
                                            <button type="button" class="btn btn-primary btn-flat" data-dismiss="modal">Close</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- modal-content -->
    </div>
    <!-- modal-dialog -->
</div>
</div>
</template>
<script>
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
  import swal from 'sweetalert';
export default {
    name: 'upload-music',
    data(){
        return {
            extension_allower:["mp3","wpw","ogg"],
            user_data: undefined,
            genres: [],
            genres_limit:5,
            music: {
                file: undefined,
                size: undefined,
                title: undefined,
                genres: [],
                tmp_name: undefined,
                description: undefined,
            },
            isloaded: false,
            size_allower: 2097152*5, //dos megas
        }
    },
    methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
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
 handlerLoadMusic(event){
    let _this=this;
    let file =  event.target.files[0];
if(_this.extensionIsAllower(file.name,this.extension_allower)){                       
    _this.music.file=file;
    _this.music.tmp_name=file.name;
    _this.music.size =file.size;
    if(Math.round(file.size)<=Math.round(_this.size_allower)){
    _this.isloaded=true; return true;
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
        handlerCloseLoadFile(){
            this.music.file=undefined;
            this.music.tmp_name=undefined;
            this.music.size =undefined;
            this.isloaded=false;
        },
        handlerSelectMusicGenge(ev){
           let btn=ev.target;
           let genre_id=ev.target.value;
           if(genre_id==undefined){
               return false;
           }
           if( this.music.genres.length>=this.genres_limit){
                swal({
                      text: "Ya alcánzate el límite de géneros para esa música.",
                      icon: "error",
                      button: "ok",
                    });
               return false;
           }
           if(this.music.genres.includes(genre_id)){
               btn.classList.toggle("active")
               this.music.genres=this.music.genres.filter(function(id){
                    return id!= genre_id;
               })
           }else{
            this.music.genres.push(genre_id);
            console.log(this.music)
            btn.classList.toggle("active")
           }
            
        }
        },
        mounted(){
            this.redirectUserLogin();
            this.getGenres();
        }
}
</script>
<style>
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
</style>
