<template>
    <section class="content-music-detail">
            <div class="row">
                <div class="col-md-12">
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
                                    <small><span>Hace 5 hora</span></small>
                                </div>
                                <button><i class="fa fa-play"></i></button>
                                <div class="info-footer">
                                <span class="info-views">100  Escuchadas</span>
                                <span class="info-views">100  Dedicadas</span>
                                <span class="info-views">100  Descargadas</span>
                            </div>
                            </div>
                        </div>
                     </div>
                </div>
                <div class="col-md-12">
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
                        <h1>Titulo de la cansion</h1>
                        <p>Descripcion de esta cancion</p>
                        <QualificationStars 
                        :contend_id="music._id"
                        :props_qualification="5"
                        />
                </div>
                <div class="content-footer">
                    <div class="colaboradores">
                        colaboradores
                    </div>
                    
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
        CardUser 
    },
    props:{
        music: Object,
    },
    methods:{
          getUrlImage(image_name){
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
    }
}
</script>
<style>
.content-music-detail{
     
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
    min-height: 60px;
}
.container-comment{
    
    background: #fff;
}
</style>