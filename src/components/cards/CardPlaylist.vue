<template >
<div class="col-md-3" v-if="show_card">
    <section class="card-playlist">
                <div class="thumbnil"
                    v-bind:style="{ 'background-image': 'url(' + getImagePlaylist(music.img) + ')' }">
                     <div class="playlist-info">
                        <div class="info-user">
                            <CardUser 
                            :user_id="music.user_published._id"
                            :user_name="music.user_published.name"
                            :user_last_name="music.user_published.last_name"
                            :user_img="getImagePlaylist(music.user_published.profile_picture)"
                            />
                        </div>
                        <div class="info-playlist">
                            <h1> {{music.name}}</h1>
                            <p> Creado   <small>{{ getTime(music.date_update)}}</small> </p>
                        </div>
                  </div>

                    <a :href="'musics/'+music._id" class="controller">
                    <div class="btn-player">
                            <button><i class="fa fa-play" aria-hidden="true"></i></button>
                    </div>
                    
                    <div class="card-footer-playlist">
                   

                     <div class="card-playlist-info" v-if="music.musics_cout>0 ">
                         <span>{{music.musics_cout}}</span>
                         Canciones
                     </div>
                     <div class="card-playlist-info" v-else>
                        <small> No tiene canciones </small>
                       
                     </div>

                     <div class="card-playlist-info" v-if="self_user_comment===music.user_published._id">
                         <a href="" class="control" :name="music._id" 
                            data-toggle="modal" data-target="#modal-editail-playlist"
                            v-on:click="editailPlaylist"
                       >Editar</a>
                         <a href="" class="control" v-on:click.prevent="deletePlayList" :name="music._id">Eliminar</a>
                 
                     </div>

                    
                    </div>
                    </a>
                 
                </div>

    </section>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import swal from 'sweetalert';
import QualificationStars from "../qualifications/qualifications.vue";
import CardUser from "./CardUser.vue";
const moment = require('moment');
const axios = require('axios');
const {SERVER_URI,DB_USER_NAME}=require('@/config/index');
const {DBLocal} =require('@/services/data_local')
const dbLocal= new DBLocal(DB_USER_NAME);
    moment.locale('es')

export default {
    name: 'card-playlist',
    components:{
 
        CardUser
    },
    data(){
        return{
           
            image: undefined,
            self_user_comment: undefined,
            user_data : undefined,
            show_card: true
            
        }
    },
    props: {
       music: Object,
        active: Boolean,
        prop_playlist_select: {
            type: Function,
            required: false
        }
    },
    methods:{
        editailPlaylist(ev){
            let playlist_id =ev.target.name;
            this.prop_playlist_select(playlist_id)
        },
deletePlayList(ev){
swal({
  text: "¿Está seguro de querer eliminar esta lista de reproducción?",
   buttons: ["No eliminar", "Eliminar"],
})
.then((willDelete) => {
  if (willDelete) {
      // ELIMINAR PLAYLIST
       let self = this;
       let playlist_id =ev.target.name;
            axios.delete(`${SERVER_URI}/api/albumes/${playlist_id}?token=${this.user_data.token}`).
            then(function(req){
              
                  console.log("playlist delete",req.data)   
                  
                  if(req.data.albumes._id!=undefined){
                      self.show_card=false;
                  }
            }).catch(function(err){
                console.log(`error--->${err}`)
            });

    swal("Lista de reproducción eliminada", {
      icon: "success",
    });
  } 
});  
},

          getImagePlaylist(image_name){
              console.log("imagent" ,image_name)
              if(image_name===undefined){
                  return 'miaga'
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
        ,
        getTime(date_create){
            
            return moment(date_create,"YYYYMMDD").fromNow();
        }
        ,
          redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
        this.self_user_comment =this.user_data.user.id;
    }
    },
    mounted(){
        this.redirectUserLogin();
        this.prop_playlist_select('');
     
    }
    

    
    
}
</script>
<style>

.card-playlist{
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    position: relative;
}

.card-playlist  .thumbnil{
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        min-height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        background-repeat:no-repeat;
        background-size:contain;
        background-size:cover;
        border-radius: 4px;
        

}


.card-playlist  .thumbnil .controller{
position: absolute;
top:0px;
bottom: 0px;
left: 0px;
right: 0px;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
box-sizing: border-box;
display: none;
transition: all ease 2s;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
}
.card-playlist  .thumbnil:hover .controller{
    transition: all ease 2s;
    display: flex;
    background: rgba(0, 0, 0, 0.7);
   
}


.card-playlist  .info .user-music {
  display: flex;
  align-items: center;
}
.card-playlist  .info  .music-info{
border-bottom: #eee solid 1px;
padding: 5px;
}

.card-playlist  .info .user-music .thum-user img{
    width: 100%;
}
.music_active   .thumbnil .controller{
    transition: all ease 2s;
    display: flex;
  background: rgba(0, 174, 239, 0.1);
}
.btn-player button{
    display: none;
    justify-content: center;
    align-items: center;
    border:none;
    background: #000;
    width: 56px;
    height: 56px;
    color: #fff;
    border-radius: 50%;
    z-index: 100;


}
.music_active   .thumbnil:hover .btn-player button{
display: flex;
}
.playlist-info{
    position: absolute;
    z-index: 10;
    top: 10px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
}
 .playlist-info .info-user{
     width: 100% !important;
     flex-grow: 1;
     padding: 0px;
    margin: 0px;
 }

 .playlist-info .info-user h1{
     font-size: 12px !important;
     color: #eee;
     padding: 0px;
 }
.card-playlist-info{
    color: #fff !important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0px;
}
 .card-playlist-info .control{
     display: inline-block;
     padding:2px; 
     font-size: 10px;
     text-decoration: underline;
 }
.card-playlist-info span{
    display: flex;
    width: 35px;
    height: 35px;
    background: #eee;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-weight: 100;
    font-size: 12px;
    color:#444;
}
.card-footer-playlist{
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
}

.info-playlist{
    width: 100%;
    color: #fff !important;
}
.info-playlist h1{
    color: #fff !important;
    padding: 0px;
    margin: 0px;
    text-align: center;
    font-size: 16px;
    text-transform: uppercase;
}
.info-playlist p{
    color: #ccc;
    font-size: 12px;
}
.music_active   .thumbnil:hover .info-playlist h1{
    color: #ccc !important;
}
</style>

