<template>
    <div class="detail-music">
        <div class="content">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="content-music">
                <div class="thum-music">
                    <img src="http://los40es00.epimg.net/los40/imagenes/2017/01/17/album/1484675309_894438_1484675936_album_normal.jpg" alt="">
                     <div class="content-play">
                         <button><i class="fa fa-play"></i></button>
                     </div>
                    <div class="info-footer">
                        <span>100.21 escuchada</span>
                    </div>
                </div>
            </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="content-music">
                <div class="content-header">
                    <a href=""><i class="fa fa-play"></i></a>
                    <a href=""><i class="fa fa-play"></i></a>
                    <a href=""><i class="fa fa-play"></i></a>
                </div>
                <div class="content-body">
                        <h1>Titulo de la cansion</h1>
                        <small>hace 3 mes</small>
                        <p>Descripcion de esta cancion</p>
                        <QualificationStars 
                        :contend_id="'5c7a8d787112721bec76bef7'"
                        :props_qualification="5"
                        />
                </div>
                <div class="content-footer">
                        jkgalgalaglalgla
                </div>
            </div>
                </div>
            </div>
                </div>
            </div>
            
        </div>
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
    name: 'music-detail',
    components:{
     QualificationStars   
    },
    props:{
        music: Object,
    }
}
</script>
<style>
    .detail-music .content{
        margin: auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
         border: #eee solid 1px;
        padding: 5px;
        border-radius: 4px;
    }
    .detail-music .content .content-music{
        widows: 100%;
       
       
    }
    .detail-music .content .content-music:last-child{
        flex-grow: 1;
        padding: 0px;
        box-sizing: border-box;

    }
    .detail-music .content .content-music .thum-music{
        display: flex;
         max-height: 400px;
        justify-content: center;
        align-items: center;
        background: #f55;
        position: relative;
    }
    .detail-music .content .content-music .thum-music .info-footer{
        position: absolute;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
        bottom: 0px;
        left: 0px;
    }
     .detail-music .content .content-music .thum-music  img{
         width: auto;
         overflow: hidden;
     }
     .content-play {
         position: absolute;
         left: 0px;
         top: 0px;
         bottom: 0px;
         right: 0px;
         z-index: 10;
         display: flex;
         justify-content: center;
         align-items: center;
           background: rgba(5, 4, 4, 0.2);
     }
   .detail-music .content .content-music  .content-play   button{
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

    .detail-music .content .content-music  .content-header{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            border-bottom: #eee solid 1px;
            padding: 5px;
     }

     .detail-music .content .content-music .content-body{
         width: 100%;
         display: flex;
         box-sizing: border-box;
         justify-content: center;
         flex-wrap: wrap;
         flex-direction: column;
         align-items: center;
         background: #fff;
         padding: 0px;
     }
</style>