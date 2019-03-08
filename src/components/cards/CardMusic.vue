<template>
<div class="col-md-3">
    <section class="card-music music_active">
            <div class="content">
                <div class="thumbnil">
                    <a :href="'musics/'+music._id">
                        <img :src="getImageMusic(music.img)" :alt="music.title">
                    </a>
                    <a :href="'musics/'+music._id" class="controller">
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
                    <div class="user-music">
                        <div class="thum-user">
                            <a :href="'/profile/'+music.user_published._id"> <img :src=" getImageMusic(music.user_published.profile_picture)" alt=""> </a>
                        </div>
                        <a :href="'/profile/'+music.user_published._id"><h1>{{music.user_published.name}} {{music.user_published.last_name}}</h1></a>
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
 const moment = require('moment');
 const {SERVER_URI}=require('@/config/index')
moment.locale('es')

export default {
    name: 'card-music',
    components:{
        Emotion,
        SondDedocate,
        MoreOption
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

.card-music{
    width: 100%;
    margin-bottom: 10px;
    border: #eee solid 1px;
    border-radius: 5px;
}
.card-music .content {
    position: relative;
}
.card-music .content .thumbnil{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

}

.card-music .content .thumbnil img{
 min-width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

  .card-music .content p{
    font-size: 12px;
    line-height: 14px;
     margin:0px 3px;
     color: #ccc;
   
}
.card-music .content p small{
    font-size: 8px;
    display: inline;
}
.card-music .content h1{
  font-size: 11px;
  font-weight: bold;
   margin:0px 3px;
   margin-top: 3px;
   margin-bottom: 1px;
}
.card-music .content .thumbnil .controller{
position: absolute;
top:0px;
bottom: 0px;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
box-sizing: border-box;
display: none;
transition: all ease 2s;
border-top-left-radius: 5px;
  border-top-right-radius: 5px;

}
.card-music .content .thumbnil:hover .controller{
    transition: all ease 2s;
    display: flex;
    background: rgba(0, 0, 0, 0.7);
    /* background: rgba(0, 174, 239, 0.7); */
}
.card-music .content .info{
    border-top: #eee solid 1px;
    box-sizing: border-box;
}
.op-music{
    position: absolute;
    display: flex;
    justify-content: space-between;
    bottom: 0px;
}
.card-music .content .info .user-music {
  display: flex;
  align-items: center;
}
.card-music .content .info  .music-info{
border-bottom: #eee solid 1px;
padding: 5px;
}
.card-music .content .info .user-music .thum-user{
width: 36px;
height: 36px;
overflow: hidden;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
border: #eee solid 2px;
background: #fff;
}
.card-music .content .info .user-music .thum-user img{
    width: 100%;
}
.music_active  .content .thumbnil .controller{
    transition: all ease 2s;
    display: flex;
  background: rgba(0, 174, 239, 0.5);
}
.btn-player button{
    display: flex;
    justify-content: center;
    align-items: center;
    border:none;
    background: #000;
    width: 56px;
    height: 56px;
    color: #fff;
    border-radius: 50%;

}


</style>

