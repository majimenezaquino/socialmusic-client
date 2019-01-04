import Vuex from 'vuex'
import Vue from 'vue'
const axios =require('axios')
const {SERVER_URI}=require('@/config/index')
Vue.use(Vuex)


 export default  new Vuex.Store({
         state:{
            playlist_store:{
                tracks: [],
                is_playlist: false,
                index: undefined
            },
            
     },
     mutations:{

     //push music in player
     pushMusicPlayer (state,obj){
        state.playlist_store.tracks= obj.tracks;
        state.playlist_store.index=obj.index
        state.playlist_store.is_playlist=obj.is_playlist
 }

     },
    //  getters:{
   
    //  },
     actions:{

        ADD_PLAYLIST_PLAYER: (conrext,obj)=>{
            console.log(obj)
            conrext.commit('pushMusicPlayer',obj)
        }
     }

 });