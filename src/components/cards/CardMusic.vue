<template>
<div class="col-md-3" v-if="!hidden">
    <section :class="{'card-music': true ,
    'music_active_player':active}">
            <div class="content">
                <div class="thumbnil">
                <a href="" class="close-music" v-on:click.prevent="hanlerHiddenCard">
                    <i class="zmdi zmdi-close"></i>
                </a>
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
                            <button v-on:click.prevent="sendMusicToPlayer"><i class="fa fa-play" aria-hidden="true"></i></button>
                    </div>
                    
                    <div class="op-music container-option-reaction">
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
                            <button
                                class="btn-dedocate"
                                v-on:click.prevent="handlerToglesOption" >
                            <i class="fa fa-sellsy" aria-hidden="true"></i>
                            </button>
                        </div>


                        <div class="component-dedicate">
                            <a href="" 
                                class="btn-dedocate"
                                v-on:click.prevent="handlerToglesOption">
                            <i class="zmdi zmdi-more-vert"></i>
                            </a>
                        </div>
                    </div>
                                <CardMusicOption 
                                :music_id="music._id"
                                v-if="showoption" />
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
 import CardMusicOption from "./cardMusicOption.vue";
 const moment = require('moment');
 const {SERVER_URI}=require('@/config/index')
moment.locale('es')

export default {
    name: 'card-music',
    components:{
        Emotion,
        SondDedocate,
        MoreOption,
        CardUser,
        CardMusicOption
    },
    data(){
        return{
            active: false,
            image: undefined,
            hidden: false,
            showoption: false
            
        }
    },
    props: {
       music: Object,
       playlist: Array,
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
            let music_id =ev;
            
            this.music_select_callback(music_id);
            
        },
        hanlerHiddenCard(){
            this.hidden=true;
        }, 
        hiddenOpction(){
            this.showoption=false;
        },
        handlerToglesOption(){
          this.showoption=!this.showoption;  
        },
         sendMusicToPlayer(){
             this.$store.dispatch("SEND_MUSIC_PLAYER", this.music);
             this.toggleActiveCard();
         },
         toggleActiveCard(){
             let cardSelect= document.querySelectorAll(".card-music");
             if(cardSelect.length>0){
                 for(let i in cardSelect){                  
                         try{
                             cardSelect[i].classList.remove("music_active_player");
                         }catch(ex){
       
                         }

                     }
             }
             this.active= true;
         }
    },
    mounted(){
       
    }
    

    
    
}
</script>
<style>
@import url("./music-style.css");
</style>

