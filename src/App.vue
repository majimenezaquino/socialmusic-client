<template>
  <div id="app">
    <router-view/>
    <Player />
  </div>
</template>
<script>
import Player from "@/components/player/player2.vue";
export default {
  name: 'app',
  components:{
    Player
  },
  mounted(){
    
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
