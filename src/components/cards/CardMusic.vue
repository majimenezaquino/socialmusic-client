<template>
    <section class="card-music">
            <div class="content">
                <div class="thumbnil">
                    <a :href="'musics/'+id">
                        <img :src="image" alt="">
                    </a>
                 <div class="controller">
                    <button><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button><i class="zmdi zmdi-more-vert"></i></button>
                </div>
                </div>
    
                <div class="info">
                    <h1>{{title}}</h1>
                    <p>{{user_name}} </p>
                </div>
            </div>

    </section>
</template>
<script>
import { setTimeout } from 'timers';
 const {SERVER_URI}=require('@/config/index')
export default {
    name: 'card-music',
    data(){
        return{
            active: '',
            image: undefined
        }
    },
    props: {
        id: String,
        title: String,
        img: String,
        user_name: String,
        
    },
    methods:{
        getImageMusic(image_name){
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
    },
    mounted(){
        this.image=this.getImageMusic(this.img);
    }
    

    
    
}
</script>
<style>

.card-music{
    width: 250px;
    height: 300px;
    margin-bottom: 5px;
    background: #eee;
}
.card-music .content {
    position: relative;
}
.card-music .content .thumbnil{
    width: 250px;
    height: 250px;
    display: flex;
    position: relative;
    border-bottom: #ccc solid 1px;

}
.card-music .content .thumbnil img{
height: 100%;
 min-width: 100%;
 max-width: 100%;
 border-radius: 5px;
 padding-bottom: 2px;
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
}
.card-music .content .thumbnil .controller  button{
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    margin: 0px 5px;
}
.card-music .content .thumbnil .controller  button i{
    display: inline-block;
    color: #fff;
}
</style>

