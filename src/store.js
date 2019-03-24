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

     },
    //  getters:{
   
    //  },
     actions:{

        SEND_MUSIC_PLAYER: (conrext,obj)=>{
            console.log(typeof obj)
            if(typeof obj =='object'){
                conrext.commit('sendMusic',obj)
            }
           
            
        },
        SEND_PLAYLIST_PLAYER: (conrext,obj)=>{
            console.log(typeof obj)
            // if(typeof obj =='object'){
            //     conrext.commit('sendMusic',obj)
            // }
           
            
        }
     }

 });