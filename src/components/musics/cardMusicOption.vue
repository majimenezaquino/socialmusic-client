<template>
<!-- <div class="music-option-hidden" >
    <div class="content"> -->
        
        <!-- <ul class="list-group-option">
        
            <li class="list-group-option-item" >
                <a href="" v-on:click.prevent="handlerOpenPlaylist"> Agregar a lista de playlist 
                    <i :class="{ 
                        'color-green': true,
                        'fa fa-angle-right': !openPlaylist,
                         'fa fa-angle-down': openPlaylist 
                         }">
                        </i> </a>
                <ul class="list-group-in" v-if="openPlaylist">
                 <li class="list-group-item" v-for="playlist in playlists" :key="playlist._id">
                    <a href=""
                    v-on:click.prevent="addMusicPlayList(playlist._id)"><i class="fa fa-plus-square"></i> {{playlist.name}} </a>
                </li>
                <li class="list-group-item __create_playlist_btn">
                    <a href=""  data-toggle="modal" data-target="#modal-create-playlist"><i class="zmdi zmdi-playlist-plus"></i> <span>Crear una playlist</span>  </a>
                </li>
        
             </ul>
            </li>
            
            <li class="list-group-option-item"><a href=""><i class="fa fa-trash-o"></i> No volver a ver esta canción </a></li>
            <li class="list-group-option-item"><a href="">Reportar esta canción </a></li>
            
    </ul> -->
<div class="btn-group  dropup drop-customize">
    <a href="#" class=" dropdown-toggle btn-dedocate" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="zmdi zmdi-more-vert"></i>
    </a>
    <ul class="dropdown-menu dropleft dropdown-customize" aria-labelledby="dropdownMenu1">
        
               <li class="list-group-option-item" >
                <a href="" v-on:click.prevent="handlerOpenPlaylist"> Agregar a lista de playlist 
                    <i :class="{ 
                        'color-green': true,
                        'fa fa-angle-right': !openPlaylist,
                         'fa fa-angle-down': openPlaylist 
                         }">
                        </i> </a>
                <ul class="list-group-in" v-if="openPlaylist">
                 <li class="list-group-item" v-for="playlist in playlists" :key="playlist._id">
                    <a href=""
                    v-on:click.prevent="addMusicPlayList(playlist._id)"><i class="fa fa-plus-square"></i> {{playlist.name}} </a>
                </li>
                <li class="list-group-item __create_playlist_btn">
                    <a href=""  data-toggle="modal" data-target="#modal-create-playlist"><i class="zmdi zmdi-playlist-plus"></i> <span>Crear una playlist</span>  </a>
                </li>
        
             </ul>
            </li>
               
             <li class="list-group-option-item"><a href=""><i class="fa fa-trash-o"></i> No volver a ver esta canción </a></li>
                
            <li role="separator" class="divider"></li>
            <li class="list-group-option-item"><a href="">Reportar esta canción </a></li>
    </ul>
</div>
    <!-- </div>
</div> -->
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
 import swal from 'sweetalert';


export default {
    name: 'component-music-opction',
    data(){
            return{
                user_data: undefined,
                openPlaylist: false,
                playlists: [],
            }
    },
    props:{
            music_id: String
    },
    methods:{
         redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
           this.user_data  =dbLocal.getDataLocalStorageOBject();
         },
           getPlaylistByUser(){
            let self = this;
            axios.get(`${SERVER_URI}/api/albumesbyuser/?token=${this.user_data.token}`).
            then(function(req){
              self.playlists =req.data.playlist
                  console.log("playlist by user",req.data.playlist)        
            }).catch(function(err){
                console.log("error send playlist", err.response)
            })
            
           // console.log(this.playlist)
        },

           addMusicPlayList(playlist){
               let playlistFilter=this.playlists.filter(function(list){
                   return list._id==playlist
               });
               
            let self = this;
            let playlist_send={
                music_id: this.music_id,
                playlist_id: playlist 
            }
            axios.post(`${SERVER_URI}/api/playlist?token=${this.user_data.token}`,playlist_send).
            then(function(req){
           
                  if(!req.data.error){
                    swal({
                      text: `La canción fue agregada a la lista de reproducción,  ${playlistFilter[0].name} `,
                      icon: "success",
                      button: "ok",
                    }).then((value) => {
                      self.openPlaylist=false;
                    }) 
                  }else{
                     swal({
                      text: `Esta canción ya está en la  lista de reproducción, ${playlistFilter[0].name} `,
                      icon: "warning",
                      button: "ok",
                    }).then((value) => {
                       // if(value) self.$router.go();
                       self.openPlaylist=false;
                    })  
                  }       
            }).catch(function(err){
                console.log("error send playlist", err.response)
            })
            
           // console.log(this.playlist)
        },
        handlerOpenPlaylist(){
            this.openPlaylist=!this.openPlaylist;
        }
    },
    mounted(){
        this.redirectUserLogin();
        this.getPlaylistByUser();
    }
}
</script>
<style>
.drop-customize{
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
     height: 40px;
    width: 100%;
    bottom: -10px;
    color:#444;
 
   
}
        .dropdown-customize{
            position: absolute;
            width: 100%;
            left: 0px;
            background: #fff;
            padding: 20px 0px;
            box-sizing: border-box;
        }
</style>
<style>
    .music-option-hidden{
    display: flex;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 45px;
    z-index: 10;
   padding: 0px 0.5px;
    border: #eee solid 1px;
    background: #fff;
 
    
}
.music-option-hidden .list-group-option{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0px;
 background: #fff;

}



.music-option-hidden a{
color:#444 !important;
}
.music-option-hidden .list-group-option .list-group-option-item{

    flex-grow: 1;
    width: 100% !important;
    padding: 5px 10px;
    position: relative;
    border-bottom: #ccc solid 1px;
}
.list-group-option-item{
    pad: 0px;
}
.list-group-in {
position: absolute;
top: 100%;
right: 0px;
max-height: 200px;
z-index: 10;
display: inline-block;
border-top: 0px;
padding: 0px;
overflow-y: scroll;
background: #fff;
margin-top: 2px;
}

.list-group-in::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
.list-group-in::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5;
}
.list-group-in .list-group-item{
padding: 0px;
width: 100%;
flex-grow: 1;
border-radius: 0px !important;
font-size: 12px;
z-index: 100;
color: #444;
margin: 0px;
}


.list-group-in .list-group-item:hover{
 color: #444 !important;
 background: #eee;
}
.list-group-in .list-group-item i{
    color: green ;
    display:inline-block;
    padding-right: 10px;
    font-size: 15px;

}

.__create_playlist_btn a{
    display: flex;
    align-items: center;
    z-index: 10;
    padding: 0px;
    margin: 0px;
}
.__create_playlist_btn i{
    color: #444 !important;
    display: inline-block;
    font-size: 17px;
}
</style>