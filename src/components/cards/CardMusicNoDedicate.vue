<template>
<div class="col-md-6">
    <section class="card-music">
            <div class="content">
                <div class="thumbnil">
                    <div class="container-user">
                        <CardUser  
                    :user_id="music.user_published._id"
                    :user_name="music.user_published.name"
                    :user_last_name="music.user_published.last_name"
                    :user_img="ImgPath(music.user_published.profile_picture)"
                    />
                    </div>
                    <a :href="'musics/'+music._id">
                        <img :src="ImgPath(music.img)" :alt="music.title">
                    </a>
                    <a :href="'musics/'+music._id" class="container-controller">
                    <div class="btn-player">
                            <button><i class="fa fa-play" aria-hidden="true"></i></button>
                    </div>
                    
                    <div class="op-music">
                        <Emotion 
                    :music_id="music._id"
                    :reactiones="music.reactions"
                    />


                                    <div class="component-dedicate">
                                     <a href="" 
                                      data-toggle="modal"
                                        class="btn-dedocate"
                                        v-on:click.prevent="setMusicDedicate"
                                        disabled
                                         :name="music._id"
                                         ><i class="fa fa-share-square-o"></i></a>
                                    </div>
                    
                        <MoreOption 
                    :music_id="music._id"
                    :reactiones="music.reactions"
                    />
                    
                    </div>
                    </a>
                 
                </div>
    
                <div class="info">
                    <div class="music-info">
                        <a :href="'musics/'+music._id"><h1> {{music.title}}</h1></a>
                    <p>{{music.description}} Publicado   <small>{{ getTime(music.date_update)}}</small> </p>
                    </div>
                  
                    
                </div>
            </div>

    </section>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import Emotion from '../reactions/emotion.vue'
 import QualificationStars from "../qualifications/qualifications.vue";
 import SondDedocate from "../reactions/songdedicate.vue";
 import MoreOption from "../reactions/option-music.vue";
 import CardUser from "./CardUser.vue";
 const moment = require('moment');
  import stattic_image from '@/assets/img/music-no-image.png'
 const {SERVER_URI}=require('@/config/index')
moment.locale('es')

export default {
    name: 'card-music',
    components:{
        Emotion,
        SondDedocate,
        MoreOption,
        CardUser
    },
    data(){
        return{
            active: '',
            image: undefined,
            
        }
    },
    props: {
       music: Object,
       music_select_callback: Function
    },
    methods:{
        ImgPath(img){
       if(img===undefined || img == null ){
        return stattic_image
    }
  if(img.includes("https://") || img.includes("http://")){
      return img;
  }
  return `${SERVER_URI}/api/files/image/${img}`;
},
        getTime(date_create){
            
            return moment(date_create,"YYYYMMDD").fromNow();
        },
        setMusicDedicate(ev){
           
        }
    },
    mounted(){
       
    }
    

    
    
}
</script>
<style>
@import url("./music-style.css");
</style>

