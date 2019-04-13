<template>
  <div id="app">
    <router-view/>
    <CorePlayer
        :tracks="trackss"
        :add_track="plylists"
        
        />
  </div>
</template>
<script>
import io from 'socket.io-client';
import { setTimeout } from 'timers';
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  import CorePlayer from '@/components/player/coreplayer.vue';
	const dbLocal= new DBLocal(DB_USER_NAME);
const socket = io(SERVER_URI);
export default {
  name: 'app',

  data(){
    return{
      playlist: [],
      playlist2: [],
    
            plylists: {}
       
    }
  }, 
    components:{ 
        CorePlayer
    },
  beforeDestroy(){
    console.log("detruir el componente 2")
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
   
  // this.User.id='Miguel Jimenez';
  
  },
   computed: {
    trackss () {
      return this.$store.state.tracks
    }}

 
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
