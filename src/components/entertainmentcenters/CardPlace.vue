<template>
    <div class="container-place-card">
        <div class="row">
            <div class="col-md-12">
                <div class="thumbnail-center">
                 <a href=""> 
                    <img :src="imageurl" alt="">
                 </a>
             </div>
            </div>
            <div class="col-md-12">
                <h1 class="text-center">Magia Inflable</h1>
                    <CardStars />          
                
            </div>
            <div class="col-md-12">
                <address class="text-left p-5"> 
                    <a href="">
                    <i class="fa fa-map-marker"></i>
                 Divino para la diversión de</a>  </address>
            </div>
            <div class="col-md-12">
               
                    
                    <span class="text-events">Eventos por mes</span>
                     <ul class="event-calendar">
                         <li><a href="">05</a></li>
                         <li><a href="">05</a></li>
                         <li><a href="">06</a></li>
                     </ul>

            
            </div>
        </div>
    </div>
</template>
<script>
import CardStars from './cardStars.vue'
export default {
    name: '',
    components:{
        CardStars
    },
    data(){
        return {
            imageurl: "https://cdn.theatlantic.com/assets/media/img/mt/2018/01/RTS193GB/lead_720_405.jpg?mod=1533691918",
        }
    }
}
</script>
<style>
    .container-place-card{
        border: #ccc solid 1px;
        border-radius: 5px;
    }
  
    .event-calendar {
        width: 100%;
        display: flex;
        border-top: #ccc solid 1px;
        padding: 10px;
    }
    .event-calendar li a{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        border: #ccc solid 1px;
        border-top:#ccc solid  4px;
        font-size: 9px;
        margin: 1px;
        position: relative;
    }
    .event-calendar li a::after , .event-calendar li a::before{
        content: "";
        position: absolute;
        width: 4px;
        height: 4px;
        background: #ccc;
        top: -6px;

    }
    .event-calendar li a::after {
        left: 2px;
    }
    .event-calendar li a::before{
        right: 2px;
    }
    .text-events{
        display: inline-block;
        padding:0px 10px;
        font-size: 13px;
    }
    .thumbnail-center{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100px;
        background: #f55;
    }
</style>

