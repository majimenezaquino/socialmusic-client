<template>
<div class="col-md-3">
    <section class="card-music">
            <div class="content">
                <div class="thumbnil">
                    <a :href="'musics/'+id">
                        <img :src="image" alt="">
                    </a>
                 <div class="controller">
                    <div class="op-music">
                        <Emotion 
                    :music_id="id"
                    :reactiones="0"
                    />
                    <button><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button><i class="zmdi zmdi-more-vert"></i></button>
                    </div>
                </div>
                </div>
    
                <div class="info">
                    <h1>{{user_name}} - {{title}}</h1>
                    <p>{{description}} Publicado  hace {{ getTime(date_create)}} </p>
                </div>
            </div>

    </section>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import Emotion from '../reactions/emotion.vue'
 import QualificationStars from "../qualifications/qualifications.vue";
 const moment = require('moment');
 const {SERVER_URI}=require('@/config/index')
moment.locale('es')

export default {
    name: 'card-music',
    components:{
        Emotion
    },
    data(){
        return{
            active: '',
            image: undefined,
            
        }
    },
    props: {
        id: String,
        title: String,
        img: String,
        user_name: String,
        description: String,
        date_create: String,
    
        
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
        this.image=this.getImageMusic(this.img);
    }
    

    
    
}
</script>
<style>

.card-music{
    width: 100%;
    margin-bottom: 5px;
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
    border-radius: 5px;

}
.card-music .content .thumbnil a{
   
}
.card-music .content .thumbnil img{
 min-width: 100%;
}

  .card-music .content p{
    font-size: 12px;
    line-height: 14px;
     margin:0px 3px;
   
}
.card-music .content h1{
  font-size: 13px;
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

}
.card-music .content .thumbnil:hover .controller{
    transition: all ease 2s;
    display: flex;
    border-radius: 5px;
    background: rgba(0, 174, 239, 0.7);
}

.op-music{
    position: absolute;
    display: flex;
    justify-content: space-between;
    bottom: 0px;
}
</style>

