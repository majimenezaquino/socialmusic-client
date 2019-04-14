<template>
    <section class="content-music-detail">
            <div class="row">
                <div class="col-md-4">
                    <div class="content-music">
                        <div class="thum-music">
                            <img :src="getUrlImage(music.img)" alt="">
                            <div class="content-play">
                                <div class="user-header">
                            <CardUser 
                                :user_id="music.user_published._id"
                                :user_name="music.user_published.name"
                                :user_last_name="music.user_published.last_name"
                                :user_img="getUrlImage(music.user_published.profile_picture)"
                                />
                                    <small><span>{{changeTimeTodate(music.date_create)}}</span></small>
                                </div>
                                <button><i class="fa fa-play"></i></button>
                                <div class="info-footer">
                                <span class="info-views">{{music.played_count}}  Escuchadas</span>
                                <span class="info-views">{{music.dedicated}}  Dedicadas</span>
                                <span class="info-views">{{music.downloaded}}  Descargadas</span>
                            </div>
                            </div>
                        </div>
                     </div>
                </div>
                <div class="col-md-3">
                    <div class="content-music">
                <div class="content-header">
                   


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
                <div class="content-body">
                        <h1>{{music.title}}</h1>
                        <p>{{music.description}}</p>
                        <QualificationStars 
                        :contend_id="music._id"
                        :props_qualification="music.qualification"
                        />
                </div>
                <div class="content-footer">
                    <div class="colaboradores">
                        colaboradores
                    </div>
                    
                </div>
            </div>
                </div>
                <div class="col-md-5">
                    <div class="conta-comment-up">
                        <div class="conet">
                            <CommentMusic  :music_id="music._id" />
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>
<script>
import { setTimeout } from 'timers';
import Emotion from '../reactions/emotion.vue'
 import QualificationStars from "../qualifications/qualifications.vue";
 import SondDedocate from "../reactions/songdedicate.vue";
 import MoreOption from "../reactions/option-music.vue";
  import CardUser from "./CardUser.vue";
  import CommentMusic from "../comment/CommentMusic.vue";
 const moment = require('moment');
 const {SERVER_URI}=require('@/config/index')
moment.locale('es')
export default {
    name: 'music-detail',
    components:{
     QualificationStars,
     Emotion,
        SondDedocate,
        MoreOption ,
        CardUser ,
        CommentMusic
    },
    props:{
        music: Object,
    },
    methods:{
          getUrlImage(image_name){
            if(image_name===undefined){
                  return 'miaga'
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
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
     position: relative;
}
.content-music-detail .content-music{
     width: 100%;
     display: flex;
     justify-content: center;
     position: relative;
      background: #fff;
      flex-wrap: wrap;
}
.content-music-detail .content-music .thum-music{
    display: inline-block;
    position: relative;
    padding: 0px;
    margin: 0px;
}
.content-music-detail .content-music .content-header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 30px;
}

 .content-music-detail .content-music .content-body {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 10px;
}
 .content-music-detail .content-music .content-body h1{
     font-size: 17px;
     font-weight: 900;
     line-height: 17px;
     margin: 0px;
 }
 .content-music-detail .content-music .content-body p{
     color: #ccc;
 }
.content-music-detail .content-music:last-child{
  background: #42a5f5;
}
.content-music-detail .content-play{
    position: absolute;
    top: 0px; bottom: 0px; left: 0px; right: 0px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-music-detail .content-play button{
                 display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    background: #000;
    width: 56px;
    height: 56px;
    color: #fff;
    border-radius: 50%;
}
.content-music-detail .content-play .info-footer{
    position: absolute;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.5);
    left: 0px;
    right: 0px;
    

}
.content-music-detail .content-play  .user-header{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
}
.content-music-detail .container-user-create h1{
    color: #fff;
}
.info-views{
    font-size: 10px;
    font-weight: 100;
    display: inline-block;
    padding: 0px 20px;
    color: #eee;
}
.content-footer{
width: 100%;
position: relative;
bottom: 0px;
left: 0px;;
}
.container-comment{

    background: #fff;
    height: 200px;
}
.conta-comment-up{
    position: relative;
    width: 100%;
    background: #fff;
    height: 150px;
    background: #000;
}

</style>