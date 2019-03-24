<template>
    <div>
        <CorePlayer
        :tracks="trackss"
        :add_track="plylists"
        
        />
    </div>
</template>
<script>
const {EventBus} =require('@/eventbus');
import CorePlayer from './coreplayer.vue';
const {SERVER_URI,DB_MUSICPLAYER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local');
import { setInterval, setTimeout } from 'timers';
const dbLocal= new DBLocal(DB_MUSICPLAYER_NAME);
export default {
    name:'player',
    components:{ 
        CorePlayer
    },
    data(){
        return{
            plylists: {}
        }
    },
    mounted(){
       
     
    },
   
    computed: {
    trackss () {
      return this.$store.state.tracks
    }
    
    }
  
   
}
</script>

