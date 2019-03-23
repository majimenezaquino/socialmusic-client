<template>
    <div>
        <CorePlayer
        :playList="plylists"
        />
    </div>
</template>
<script>
const {EventBus} =require('@/eventbus');
import CorePlayer from './player2.vue';
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
            useLocalStore: false,
            iconImage: '',
            plylists:[
        {'icon': iconImage, 'title': 'Hitman', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3'},
        {'icon': iconImage, 'title': 'Dreamer', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Dreamer.mp3'},
        {'icon': iconImage, 'title': 'District Four', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/District%20Four.mp3'},
        {'icon': iconImage, 'title': 'Christmas Rap', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Christmas%20Rap.mp3'},
        {'icon': iconImage, 'title': 'Rocket Power', 'file': 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Rocket%20Power.mp3'}
      ]
        }
    },
    
   
  
   
}
</script>

