<template>
    <section class="content-music-detail">
            <div class="container-fluid">
                <div class="row">
                <div class="col-md-7 col-xs-12">
                    <div class="content-music">
                         <CardMusicNoInfo 
                          :music="music"
                          :music_select_callback="handlerMusicSElect"
                      />
                        <div class="container-footer">
                            <h1>{{music.title}}</h1>
                            <p>{{music.description}}</p>
                        </div>
                     </div>
                </div>
                <div class="col-md-5 col-xs-12">
                <div class="content-music">
                    <div class="content-header">
                        <div class="container-info">
                            <span>Reproduciones {{music.played_count}}</span>
                            <span>En lista de reproducion {{music.inplaylist}}</span>
                        </div>
                            <div class="container-heren">
                                <a href="" class="tags-item" v-for="genre in music.genres" :key="genre._id">
                                    <i class="fa fa-music"></i>
                                    <span> {{genre.name}}</span>
                                </a>
                               
                            </div>
                            
                            <QualificationStars 
                            :contend_id="music._id"
                            :props_qualification="music.qualification"
                            />
                    </div>
                    <div class="content-footer">
                        <div class="card-colaboradores">
                            <small>Colaboradores</small>
                        <div class="container-guestes">
                                <div class="form-group m-t-0">
                                <ul class="list-group user-group">
                                    <li class="list-group-item"  v-for="colab in music.colaborations" :key="colab._id">
                                        <router-link  :to="'/profile/'+colab._id">
                                            <img :src="ImgPath(colab.profile_picture)" alt="" class="img-circle max-w-40">
                                        </router-link>
                                    </li>
                                   
                                </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
                <div class="col-md-12">
                         <CommentMusic  :music_id="music._id" />
                </div>
            </div>
            </div>
            <CardMusicDedicate 
            :music_dedicate="music_select_id"
            />
    </section>
</template>
<script>
import stattic_image from '@/assets/img/music-no-image.png'
import { setTimeout } from 'timers';
import Emotion from '../reactions/emotion.vue'
 import QualificationStars from "../qualifications/qualifications.vue";
 import SondDedocate from "../reactions/songdedicate.vue";
 import MoreOption from "../reactions/option-music.vue";
  import CardUser from "./CardUser.vue";
  import CardMusicNoInfo from "./CardMusicNoInfo.vue";
  import CommentMusic from "../comment/CommentMusic.vue";
  import CardMusicDedicate from "@/components/cards/CardMusicDedicate.vue";
 const moment = require('moment');
 const {SERVER_URI}=require('@/config/index')
moment.locale('es')
export default {
    name: 'music-detail',
    components:{
     QualificationStars,
     CardMusicNoInfo,
     Emotion,
        SondDedocate,
        MoreOption ,
        CardUser ,
        CommentMusic,
        CardMusicDedicate
    },
    props:{
        music: Object,
    },
    data(){
        return {
            music_select_id: undefined,
        }
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
        
         handlerMusicSElect(music_id){
             console.log(music_id)
          this.music_select_id=music_id;
         },
         changeTimeTodate(time){
         
          return   moment(time,"YYYYMMDD").fromNow();

        },
        showmore(text='', leng=0){
            if(text.length>leng){

            }
        }
    }
}
</script>
<style>

  .content-music-detail{
      background: rgb(32, 148, 242);
      /* background-color: #EEF5F9; */
      color: #eee;
  }
     .content-music-detail  .thum-music{
      border-radius: 4px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 10px 0px;
      overflow: hidden;
      
  }
 

    .content-music-detail .content-play:hover{
        background: rgba(0,0,0,0.8);
    }

    .content-music-detail .content-play:hover button.bnt-player{
        z-index: 1;
    }

 .content-music-detail  .footer-card-music{
       position: absolute;
       bottom: 0px;
       width: 100%;
       flex-grow: 1;
       left: 0px;
   }
  .content-music-detail .op-controller{
       display: flex;
       justify-content: space-around;
       width: 100%;
       color: #fff;
       font-size: 22px;
       padding-bottom: 10px;
   }
  .content-music-detail .list-group-item{
       width: 40px;
       height: 40px;
       display: flex;
   }
  .content-music-detail .card-colaboradores{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }
  .content-music-detail .container-guestes{
       padding-left: 15px;
       display: inline-block;
   }
  .content-music-detail .container-heren{
       display: flex;
       flex-wrap: wrap;
       color: #fff;
   }
  .content-music-detail .tags-item{
       display: inline-block;
       font-size: 12px;
       padding: 3px;
       border: #eee solid 1px;
       line-height: 13px;
       border-radius: 4px;
       background: #eee;
       color: #444;
      margin: 3px;
    
   }
 .content-music-detail  .tags-item:hover{
       transform: scale(1.1);
   }
  .content-music-detail .tags-item span{
       display: inline-block;
       margin-left: 5px;
   }
 .content-music-detail  .container-info{
       display: flex;
      flex-direction: column;
       width: 100%;
      margin: 30px 0px;

   }
 .content-music-detail  .container-info span {
       display: inline-block;
       font-size: 12px;
       color:#ccc;
       line-height: 17px;
   }
  .content-music-detail .container-footer{
       color:#fff;
   }
 .content-music-detail  .container-footer h1{
       color: #fff;
   }
  .content-music-detail  .container-footer p{
        color:#ccc;
    }
  .content-music-detail  .col-md-12{
        padding: 0px;
    }
    .btn_option_music{
        display: flex;
        position: relative;
        width: 32px;
        margin: 0px;
        font-size: 22px;
        color: #fff !important;
    }

</style>