<template>
<li class="playlist-item-music-inline">
        <div class="btn-like">
          <Emotion 
                :music_id="music._id"
                :reactiones="music.reactions"
             />
        </div>
        <div class="thumb-music"
        v-bind:style="{ 'background-image': 'url('+getImagePlaylist(music.img)+')' }"
        >
        <div class="lamina-hidden">
            <a href="" ><i class="fa fa-play"></i></a>
        </div>
        </div>
        <div class="content-info">
            <a href=""><h1>{{music.title}}</h1></a>
            <p><a :href="'/profile/'+user._id">{{user.name}} {{user.last_name}}</a> en colaboración de  </p>
        </div>
        <div class="option-info">
            <span>{{(music.duration/60).toFixed(2)}}</span>
            <a href="" v-on:click.prevent="toggleOption"><i class="zmdi zmdi-more-vert"></i></a>
                <ul class="list-content-musi"
                v-if="show_option"
                >
                    <li><a href=""><i class="zmdi zmdi-delete"></i> Eliminar de esta playlist </a></li>
                    <li><a href="">Eliminar</a></li>
                </ul>
        </div>
    </li>
</template>
<script>
import { setTimeout } from 'timers';
import Emotion from '../reactions/emotion-no-info.vue'

 const moment = require('moment');
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
moment.locale('es')
export default {
    name: 'card-music-item',
    props:{
music: Object,
user: Object,
    },
    components:{
        Emotion
    },
    data(){
        return {
            show_option: false
        }
    },
    methods:{
           toggleOption(){
               this.show_option=!this.show_option;
           },
         getImagePlaylist(image_name){
      
              if(image_name===undefined || image_name==='' || image_name===null){
                  return undefined;
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
    }
}
</script>
<style>
.playlist-item-music-inline{
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 0px;
border-bottom: #eee solid 1px;

}
.playlist-item-music-inline:hover{
    background: #ccc;
}
    .playlist-item-music-inline .thumb-music{
  height: 40px;
  width: 40px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  border-radius: 4px;
  position: relative;
  border-radius: 4px !important;
}
.playlist-item-music-inline .thumb-music .lamina-hidden{
    position: absolute;
    right: 5px; left: 5px; top: 5px; bottom: 5px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    z-index: 1;

}
.playlist-item-music-inline .thumb-music .lamina-hidden a{
color: transparent;
}
.playlist-item-music-inline .thumb-music .lamina-hidden:hover{
   transform: scale(1);
    border-radius: 50%;
    background: rgba(0, 0, 0, 1);

}
.playlist-item-music-inline .thumb-music .lamina-hidden:hover a{
    color: #FFF;
}
 .playlist-item-music-inline  .btn-like{
   width: 40px;
   display: flex;
   justify-content: center;
 } 
.playlist-item-music-inline .content-info{
   display: flex;
   align-items: center;
   flex-wrap: wrap;
   flex-grow: 1;
   color:#444;
 }
.playlist-item-music-inline .content-info h1{
   font-size: 15px;
   font-weight: bold;
   margin: 0px;
  margin-bottom: 5px;
 }
 .playlist-item-music-inline .content-info >p{
    width: 100%; 
    font-size: 14px;
    padding: 0px;
    line-height: 14px;
    color:#ccc;
  }
  .playlist-item-music-inline .option-info{
display: flex;
justify-content: space-around;
align-items: center;
min-width: 80px;
position: relative;
   }
   .playlist-item-music-inline .btn_compoment a {
color:#444 !important;
   }
      .playlist-item-music-inline .btn_compoment  .active {
         color: #f00; 
      }
      .list-content-musi{
          position: absolute;
          top: 100%;
          right: 0px;
          width: 200px;
          background: #fff;
          z-index: 100;
          padding: 0px;
          border: #eee solid 1px;
          border-radius: 4px;
      }
       .list-content-musi li{
           width: 100%;
           padding: 0px;
           padding: 0px 5px;
           border-bottom: #eee solid 1px;
           font-size: 13px;
       }
</style>