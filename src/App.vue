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
    import VueCookies from 'vue-cookies'
    import CorePlayer from '@/components/player/coreplayer.vue';
    const axios = require('axios');
    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const socket = io(SERVER_URI);
    VueCookies.config('7d')
export default {
  name: 'app',

  data(){
    return{
      user_data: undefined,
      location_id: undefined,
      playlist: [],
      playlist2: [],
     plylists: {}
       
    }
  }, 
    components:{ 
        CorePlayer
    },
methods:{
  setCookie(cname, cvalue, exseg) {
  var d = new Date();
  d.setTime(d.getTime() + (exseg*24*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
,
getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

},
  mounted(){
    let self =this;
    if(!dbLocal.checkDataLocalStorageOBject())
    {
      return;
    }
    this.user_data =dbLocal.getDataLocalStorageOBject();
     let on_sockt_user  = this.user_data.user.id
    
    socket.on('connect', function(data){
      console.log("connectado")
    });
   
  getPreciseLocation().then(function(data){
    if(on_sockt_user!=undefined){
      let _coords={
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          accuracy: data.coords.accuracy,
          altitude: data.coords.altitude,
          altitudeAccuracy	: data.coords.altitudeAccuracy	,
          heading: data.coords.heading,
          speed: data.coords.speed,
      }
       if(!self.getCookie("user_location").includes(self.location_id)){
       axios.post(`${SERVER_URI}/api/userlocation?token=${self.user_data.token}`,{coords: _coords}).
            then(function(req){
                 if(!req.data.error){
                   self.location_id=req.data.location._id;
                   self.setCookie("user_location", self.location_id,60*1)
                 }
              
              
            }).catch(function(err){
                console.log("error send playlist", err.response)
            })}
    }
 
}).catch(function(errr){
 console.log("error cordenada ",errr)
})

  
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
//regiter location



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
