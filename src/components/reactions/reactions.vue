<template>
    <div class="card-reaction">
         <div class="option-content" v-if="showcontent">
              <h1>555555</h1>
         </div>
        <div class="content">
            <Emotion 
            :music_id="music._id"
            :reactiones="music.reactions"
             />
            <button><i class="fa fa-comment-o"></i> <span>{{music.commentes_count }}</span></button>
            <SongDedicate
            :music_id="music._id"
            :count_dedicate="music.reactions"
             />
            <button><i class="zmdi zmdi-playlist-plus"></i> <span>{{music.inplaylist}}</span></button>
            <button><i class="fa fa-cloud-download"></i> <span>{{music.downloaded}}</span></button>
        </div>
    </div>
</template>
<script>
    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const {EventBus} =require('@/eventbus');
    const axios =require('axios');
    import Emotion from './emotion.vue';
    import SongDedicate from './songdedicate.vue';

export default {
    name: 'reactions',
    props:{
        music: {
            type: Object,
            required: false,
        }
    },
    components:{
        Emotion,
        SongDedicate
    },
    data(){
        return{
            user_data:[],
            addreaction:0,
            reaction_id: undefined,
            emotion_id: undefined,
            showcontent: false,
            user_reacted: false,
            user_active: false
        }
    },
    mounted(){
        this.redirectUserLogin();

    },
    methods:{
   
 
     
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    } 
    }
}
</script>

<style>
 .card-reaction{
     margin: 0px;
     width: 100%;
     margin: 0px;
     position: relative;
 }
.card-reaction .content  {
          display: flex;
          justify-content: space-around;
 }
 .card-reaction .content button{
     border: none;
     background: transparent;
     display: flex;
     justify-content: space-around;
     align-items: center;
     width: 35px;
     height: 30px;
    font-size: 20px;
    color: #363636;
    padding: 0px;
 }
  .card-reaction .content button i{
      display: block;
  }
  .card-reaction .content button span{
      font-size: 9px;
      display: block;
     font-weight: 100;
     color: #363636;
  }
  .card-reaction .content button:hover i{
      transform: scale(1.2);
  }
  .option-content{
      position: absolute;
      width: 100%;
      background: #587;
      z-index: 10;
      bottom: 30px;
      min-height: 200px;
  }
  .user-reacted{
      color: red !important;
  }
</style>
