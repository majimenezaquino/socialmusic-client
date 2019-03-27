import Vuex from 'vuex'
import Vue from 'vue'
const axios =require('axios')
const {SERVER_URI}=require('@/config/index')
Vue.use(Vuex)


 export default  new Vuex.Store({
         state:{
         tracks:{
                index_play: 0,
                play: true,
                tracks: []
            }
            
     },
     mutations:{

     //push music in player
     sendMusic (state,obj){
        state.tracks.tracks=[obj];
     }
,
     sendPlaylist (state,obj){
        console.log( obj)
         let music =obj.map(function(playlist){
                    return  {
                _id: playlist.music._id,
                date_create: playlist.music.date_create,
                date_update: playlist.music.date_update,
                dedicated: playlist.music.dedicated,
                description: playlist.music.description,
                download_allowed: playlist.music.download_allowed,
                downloaded: playlist.music.downloaded,
                duration: playlist.music.duration,
                genre: playlist.music.genre,
                img: playlist.music.img,
                url: playlist.music.url,
                played_count: playlist.music.played_count,
                privacy: playlist.music.privacy,
                qualification: playlist.music.qualification,
                reactions: playlist.music.reactions,
                title: playlist.music.title,
                user_published: playlist.user_published
            }
         });

        state.tracks.tracks=music;
     }

     },
    //  getters:{
   
    //  },
     actions:{

        SEND_MUSIC_PLAYER: (conrext,obj)=>{
            if(typeof obj =='object'){
                conrext.commit('sendMusic',obj)
            }
           
            
        },
        SEND_PLAYLIST_PLAYER: (conrext,obj)=>{
                conrext.commit('sendPlaylist',obj)    
        }
     }

 });