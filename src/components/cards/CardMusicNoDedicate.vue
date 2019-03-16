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
                    :user_img="getImageMusic(music.user_published.profile_picture)"
                    />
                    </div>
                    <a :href="'musics/'+music._id">
                        <img :src="getImageMusic(music.img)" :alt="music.title">
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
        getImageMusic(image_name){
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
        ,
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
.card-music .content .thumbnil .container-controller{
position: absolute;
top:0px;
bottom: 0px;
left: 0px;
right: 0px;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
box-sizing: border-box;
transition: all ease 2s;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
background: rgba(0, 0, 0, 0.1);

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
    z-index: 10;
}
.card-music .content .info .user-music {
  display: flex;
  align-items: center;
}
.card-music .content .info  .music-info{
border-bottom: #eee solid 1px;
padding: 5px;
}



.card-music .content .thumbnil .container-controller .btn-player button{
    display:none;
    justify-content: center;
    align-items: center;
    border:none;
    background: #000;
    width: 56px;
    height: 56px;
    color: #fff;
    border-radius: 50%;
    z-index: -1;

}
.card-music .content .thumbnil .container-controller:hover{
    background: rgba(0, 0, 0, 0.6);
}
.card-music .content .thumbnil .container-controller:hover .btn-player button{
    transition: all ease 0.3s;
    display: flex;
}

.container-user{
    position: absolute;
    left: 0px;
    top: 0px;
}
.container-user h1{
    color: #ccc;
    font-weight: 100;
}
.btn-dedocate{
    display: inline-block;
    font-size: 22px;
    color: #fff !important;
    justify-content: center;
    align-items: center;
    margin:0px  20px; 
    z-index: 10;
}
</style>

