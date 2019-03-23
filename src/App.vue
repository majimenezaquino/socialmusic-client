<template>
  <div id="app">
    <router-view/>
    <Player 
    :tracks="playlist"
    :add_track="playlist2"
    />
  </div>
</template>
<script>
import Player from "@/components/player/player2.vue";
import io from 'socket.io-client';
import { setTimeout } from 'timers';
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
const socket = io(SERVER_URI);

export default {
  name: 'app',
  components:{
    Player
  },

  data(){
    return{
      playlist: [],
      playlist2: []
    }
  },
  mounted(){
    let self =this;
    if(!dbLocal.checkDataLocalStorageOBject())
    {
      return;
    }
     let on_sockt_user  =dbLocal.getDataLocalStorageOBject().user.id;

  
    socket.on('connect', function(data){
      console.log("connectado")
    });
    
    self.playlist=[
        {'icon': 'urlimage', 'title': 'Hitman', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3'}
      ]

    setTimeout(function(){
      self.playlist2=[
        {'icon': 'urlimage', 'title': 'Hitman', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3'},
        {'icon': 'urlimage', 'title': 'Dreamer', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Dreamer.mp3'},
        {'icon': 'urlimage', 'title': 'District Four', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/District%20Four.mp3'},
        {'icon': 'urlimage', 'title': 'Christmas Rap', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Christmas%20Rap.mp3'},
        {'icon': 'urlimage', 'title': 'Rocket Power', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Rocket%20Power.mp3'}
      ]
    },10000)
  }
 
  }

function getPreciseLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition( (position)=> {
      resolve(position);
    },(error)=>{
      reject(error);
    });
  });
}

getPreciseLocation().then(function(data){
  console.log("cordenada ",data)
}).catch(function(errr){
 console.log("error cordenada ",errr)
})


</script>

<style>
.b{
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background: red;
}
h1{
  font-family: 300px;
}
</style>
