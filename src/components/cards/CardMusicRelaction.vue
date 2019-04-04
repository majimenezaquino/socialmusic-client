<template>
<div class="col-md-4">
    <section class="card-music music_active">
            <div class="content">
                <div class="thumbnil">
                    <a :href="'../musics/'+music._id">
                        <img :src="getImageMusic(music.img)" :alt="music.title">
                    </a>
                    <a :href="'../musics/'+music._id" class="controller">
                    <div class="btn-player">
                            <button><i class="fa fa-play" aria-hidden="true"></i></button>
                    </div>
                    
                    <div class="op-music">
                        <Emotion 
                    :music_id="music._id"
                    :reactiones="music.reactions"
                    />


                        <SondDedocate 
                    :music_id="music._id"
                    :reactiones="music.reactions"
                    />
                    
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
                  
                    <CardUser 
                    :user_id="music.user_published._id"
                    :user_name="music.user_published.name"
                    :user_last_name="music.user_published.last_name"
                    :user_img="getImageMusic(music.user_published.profile_picture)"
                    />
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
       music: Object

     
    
        
    },
    methods:{
        getImageMusic(image_name){
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
        ,
        getTime(date_create){
            
            return moment(date_create,"YYYYMMDD").fromNow();
        }
    },
    mounted(){
       
    }
    

    
    
}
</script>
<style>



</style>

