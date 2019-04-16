<template>
    <section class="content-music-detail">
            <div class="container-fluid">
                <div class="row">
                <div class="col-md-7 col-xs-12">
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
                                <button class="bnt-player"><i class="fa fa-play"></i></button>
                                <div class="footer-card-music">
                                    <div class="op-controller">
                            <Emotion 
                            :music_id="music._id"
                            :reactiones="music.reactions" />

                            <div class="component-dedicate">
                                <a href="" 
                                    data-toggle="modal"
                                    class="btn-dedocate"
                                    v-on:click="setMusicDedicate(music._id)"
                                    data-target="#modal-music-dedicataction"
                                    :name="music._id" >
                                <i class="fa fa-share-square-o"></i>
                                </a>
                            </div>

                            <div class="component-dedicate">
                                <a
                                    :class="{ 
                                        'btn-dedocate ': true,
                                        'block_doload': !music.download_allowed,
                            
                            }"
                                    href="#" v-on:click.prevent="handlerDownload(music.url,music.download_allowed)" >
                                <i :class="{'zmdi zmdi-cloud-download': music.download_allowed ,'zmdi zmdi-block':!music.download_allowed }"></i>
                                </a>
                            </div>


                            <div class="component-dedicate">
                                <a href="" 
                                    class="btn-dedocate"
                                    v-on:click.prevent="handlerToglesOption">
                                <i class="zmdi zmdi-more-vert"></i>
                                </a>
                            </div>

                            <CardMusicOption 
                                    :music_id="music._id"
                                    v-if="showoption" />
                        </div>
                            </div>
                            </div>
                        </div>
                        <div class="container-footer">
                            <h1>Nombre de la cancion</h1>
                            <p>Description de la cansions</p>
                        </div>
                     </div>
                </div>
                <div class="col-md-5 col-xs-12">
                <div class="content-music">
                    <div class="content-header">
                        <div class="container-info">
                            <span>Reproduciones 0</span>
                            <span>En lista de reproducion 0</span>
                        </div>
                            <div class="container-heren">
                                <a href="" class="tags-item">
                                    <i class="fa fa-music" aria-hidden="true"></i>
                                    <span> tag</span>
                                </a>
                                <a href="" class="tags-item">
                                    <i class="fa fa-music" aria-hidden="true"></i>
                                    <span>Nonmbre </span>
                                </a>
                                <a href="" class="tags-item">
                                    <i class="fa fa-music" aria-hidden="true"></i>
                                    <span> tag</span>
                                </a>
                                <a href="" class="tags-item">
                                    <i class="fa fa-music" aria-hidden="true"></i>
                                    <span>Nonmbre </span>
                                </a>
                                <a href="" class="tags-item">
                                    <i class="fa fa-music" aria-hidden="true"></i>
                                    <span>Nonmbre tag</span>
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
                                    <li class="list-group-item">
                                        <img src="https://www.trastornoevitacion.com/images/kim-basinger.jpg" alt="" class="img-circle max-w-40">
                                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                                    </li>
                                    <li class="list-group-item">
                                        <img src="https://significadodenombres.net/wp-content/uploads/2014/07/triana-ramos.jpg" alt="" class="img-circle max-w-40">
                                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                                    </li>
                                    <li class="list-group-item">
                                        <img src="https://miguelangelbravo.files.wordpress.com/2017/06/perfil6_small.jpg?w=200" alt="" class="img-circle max-w-40">
                                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
                <div class="col-md-12">
                    <div class="container-comment">
                        <div class="conet">
                            <!-- <CommentMusic  :music_id="music._id" /> -->
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
  .content-music-detail  .thum-music > img{
      display: inline-block;
      border-radius: 5px;
  }

  .content-music-detail .content-play{
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      right: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      background: rgba(0,0,0,0.5);
      color: #fff;
  }
  .content-music-detail .user-header{
       position: absolute;
       top: 10px;
       left: 10px;
       display: flex;
       align-content: space-between;
       align-items: center;
       width: 100%;
   }
 .content-music-detail  button.bnt-player{
       position: absolute;
       top: 50%;
       left: 50%;
        transform: translate(-50%,-50%);
        border: none;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #000;
            z-index: -1;
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
   .card-colaboradores{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }
   .container-guestes{
       padding-left: 15px;
       display: inline-block;
   }
   .container-heren{
       display: flex;
       flex-wrap: wrap;
       color: #fff;
   }
   .tags-item{
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
   .tags-item:hover{
       transform: scale(1.1);
   }
   .tags-item span{
       display: inline-block;
       margin-left: 5px;
   }
   .container-info{
       display: flex;
      flex-direction: column;
       width: 100%;
      margin: 30px 0px;

   }
   .container-info span {
       display: inline-block;
       font-size: 12px;
       color:#ccc;
       line-height: 17px;
   }
</style>