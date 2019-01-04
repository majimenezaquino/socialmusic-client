<template>
 <article :class="'card-music '+card_active" :id="'music-card-'+music._id">
     <div :class="'thumb '+background_color_default">
          <a href="">
              <img :src="music.img" :alt="music.title" v-if="music.img!=null">
          </a>
         <div :class="'card-back '+activated_option">
                    <div class="more-option">
                       <button v-on:click.prevent="openOption"><i class="zmdi zmdi-more-vert"></i></button>
                       <div class="more-card">
                           <ul class="menu-dropdow">
                               <button>Save in my favori list</button>
                               <button>Hidden this music</button>
                           </ul>
                       </div>
                    </div>
                <a href="" v-on:click.prevent="sendMusicToPlayer">
                    <i class="fa fa-play" aria-hidden="true"></i></a>
                <div class="played-finfo">
                     <span>Played</span>
                     <span>{{music.played_count}}</span>
                </div>
         </div>
     </div>
     <div class="card-conent">
            <div class="content-qualification"
               
                >
                        <!-- if self user not has qualified -->
                         <QualificationStars
                          :props_qualification="music.qualification"
                           v-if="show_qualified"
                           :contend_id="music._id"
                           />
                          
      
                </div>
         <div class="card-info">
             <h1>{{music.title}}</h1>
             <p> <router-link :to="'/profile/'+music.user_published._id" > {{music.user_published.name}}</router-link></p>
         </div>
         <div class="contaniner-reaction">
             <Reactions
             :music="music"
              />
         </div>
     </div>

 </article>
</template>
<script>

import Reactions from "../reactions/reactions.vue";
import QualificationStars from "../qualifications/qualifications.vue";
const {EventBus} =require('@/eventbus');
export default {
    name: 'music',
    components:{
        QualificationStars,
        Reactions
     
    },
    data(){
        return{
            activated_option: '',
            card_active: '',
            show_qualified: true,
            background_color_default: '',
            //class to draw stars
            stars_class: [],
        }
    },
    methods:{ 
        openOption(event){
            if(this.activated_option!='active'){
                this.activated_option='active';
            }else{
                this.activated_option='';
            }
       
        },
         sendMusicToPlayer(){
             this.setStatusCardMusic();
             EventBus.$emit('ADD_MUSIC_PLAYER', {tracks:[this.music],playlist:false});
         },
         
        setClassStars(nStars=0){
            nStars =nStars.toFixed(1)
          let   parts_index = nStars.split(".");
          let _enter = true;
            //
            for(let i =0; i<5; i++){
                if(i<parts_index[0]){
                this.stars_class[i]='fa fa-star';
                }else if(i<5){
                    if(parseInt(parts_index[1])>0 && _enter){
                        _enter= false;
                        this.stars_class[i]='fa fa-star-half-o';
                    }else{
                        this.stars_class[i]='fa fa-star-o';
                    }
                  

                }
                else{
                    this.stars_class[i]='fa fa-heart-o';
                }
               
           }

        },
        selectStars(event){
            //id this card-music
           let id_element= "#"+ this.$el.id;
            let class_card=  document.querySelectorAll(id_element+' .star-option  a');
            let self =this;
            let clicked =false;
            for(let i=0; i<class_card.length; i++){
                
                class_card[i].addEventListener('mouseover',function(e){
                    e.preventDefault();
                    self. clearStarsSelected(id_element);
                    self. drawStarsSelect(id_element,i);
                })

                 class_card[i].addEventListener('click',function(e){
                    e.preventDefault();
                    clicked=!clicked;
                   
                })
               

                
            }

        },
        drawStarsSelect(id_element,max_stars=0){
            //  
            for(let i=0; i<max_stars+1; i++){
                document.querySelectorAll(id_element+' .star-option a i')[i].className='fa fa-star';
            }
        },
        clearStarsSelected(id_element){
            for(let i=0; i<document.querySelectorAll(id_element+' .star-option a i').length; i++){
                document.querySelectorAll(id_element+' .star-option a i')[i].className='fa fa-star-o';
            }
        }
        
        
        ,
         playMusic(event){
          // this.setStatusCardMusic();
           this.$router.push( '/musics/5555555555' )
        },  
        setStatusCardMusic(){
            //remove all class active of element card-music
            let class_card=  document.querySelectorAll('.card-music');
             for(let i=0; i<class_card.length; i++){
                 class_card[i].classList.remove('active')
             }
             if(this.card_active!='active'){
                this.card_active='active';
            }else{
                this.card_active='';
            }
        }
    },
    props:{
        music: {
            type: Object,
            required: true
        }
    },mounted(){
        if(this.music.img!=null){
            this.background_color_default="background_color_default";
        }
    }
}
</script>

<style>
    .card-music{
        background: #fff;
        width: 260px;
        height: 294px;
        border: #cccccc solid 1px;
        margin-bottom: 20px;
        box-shadow: 2px 2px 5px #999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #eee;
    }

    /**/
   
  .card-music  .thumb{
      display: flex;
      width: 100%;
      height: 150px;
      overflow: hidden;
      position: relative;
      justify-items: center;
      align-items: center;
      background: #fff;
      margin: 0px;
      position: relative;
      background: #4a148c;
    }

 .card-music:nth-child(2n) > .thumb{
     background: #4a148c;
    }

     .card-music:nth-child(2n) > .thumb{
     background: #03a9f4;
    }

   .card-music  .thumb .card-back{
       position: absolute;
       width: 100%;
       height: 100%;
       left: 0px;
       top: 0px;
       display: flex;
       justify-content: center;
       align-items: center;
       z-index: -1;
    }
    .card-music:hover > .thumb .card-back{
     background: rgba(0, 174, 239, 0.7);
     z-index: 2;
    }
     .active:hover > .thumb .card-back{
     background: rgba(0, 0, 0, 0.7);
     z-index: 2;
    }
     .card-music  .thumb .card-back a{
         display: flex;
         width: 64px;
         height: 64px;
         justify-content: center;
         align-items: center;
         font-size: 40px;
         padding-left: 5px;
         border-radius: 50%;
         border: #fff solid 1px;
         color: #fff;

     }
    .card-music  .thumb img{
        max-width: 100%;
      margin: 0px auto;
    }
    .card-conent{
        width: 100%;
        height: 130px;
        margin: 0px;
        display: flex;
        flex-direction: column;
    }
    .card-conent .stars{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .card-conent .stars .content{
    width: 150px;
    height: 30px;
    position: relative;
    }
    .box-stars{
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        align-items: center;
    }
  
    .star-option{
        z-index: -1;
        transition: all 0.3s ease;
         position: absolute;
        width: 260px;
        height: 80px;
        left: 0px;
        bottom:0px;
         display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        background: #fff;
         padding: 0px 30px;
    }

    .star-option .content{
         display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    } 
   .star-option .content .btn-save{
       width: 100%;
       flex-grow: 1;
       display: flex;
       justify-content: center;
       align-items: center;

    }
    .star-option .content .btn-save button{
        border: #ccc solid 1px;
        background: transparent;
        box-shadow: 2px 2px 5px #999;
        border-radius: 2px;
        padding: 5px 30px;
        color: #363636;
        font-size: 15px;
        margin-top: 5px;
        
        line-height: 16px;
    }
    .card-conent .stars .content:hover>.star-option{
       
        transition: all 0.3s ease;
       
        z-index: 100;
       
    }
   .card-conent .stars .stars-info{
       display: flex;
       flex-grow: 1;
       height: 30px;
       justify-content: space-around;
       align-items: center;
       font-size: 13px;
       font-weight: bold;

    }
    .card-conent .stars .stars-info span:last-child{
        font-weight: 200;
    }
    .card-conent .stars a{
    color: #f4c150;
    font-size: 22px;
    }
    .card-conent .stars a:hover > i{
        transform: scale(1.5);
        transition: 0.1s ease all;
    }
    .played-finfo{
        position: absolute;
        bottom: 3px;
        color: #fff;
        font-size: 12px;
        width: 130px;
        display: flex;
        left: 10px;
        justify-content: center;
        background: rgba(0, 0, 0, 0.7);
        line-height: 13px;
        padding:5px 10px;
        box-sizing: border-box;
        border-radius: 5px;
    }
     .played-finfo span:last-child{
         font-size: 10px;
         padding-left: 6px;
         color: #aaa;
         font-weight: 200;
     }
    .card-info {
        padding: 0px 10px;
        font-size: 17px;
        line-height: 18px;
        text-align: center;
    }
    .card-info h1{
        font-size: 15px;
        font-weight: bold;
        margin: 0px;
    }
    .card-info p{
        font-size: 13px;
        line-height: 14px;
    }
     .card-music .option{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around;
      }
      .card-music .option a{
          font-size: 16px;
          font-weight: 100;
          color: #363636;
      }
      .card-music .option a:hover >i {
          transform: scale(1.5);
      }
      .card-music .option a span{
          font-size: 10px;
          font-weight: 100;
          display: inline-block;
          padding: 3px;
      }
      .active >.thumb .card-back{
     background: rgba(0, 0, 0, 0.7);
     z-index: 2;
    }
    .more-option{
        position: absolute;
        right: 5px;
        top: 5px;
        width: 30px;
        height: 10px;
    }
    .more-option button{
        /* background: transparent; */
        background: rgba(0, 0, 0, 0.1);
        border: none;
        color: #fff;
        font-size: 24px;
    }
  .card-music .active .more-card{
        min-width: 150px;
        min-height: 100px;
        position: absolute;
        display: flex;
        justify-content: center;
        z-index: 10;
        color: #000;
        top: 10px;
        right: 30px;
        border-radius: 1px;
        font-size: 15px;
   
    }
  .card-music .active  .menu-dropdow{
        width: 100%;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;
        z-index: 100;
        background: #fff;
        margin: 0px;
        padding:2px 10px;
        box-sizing: border-box;
    
    }
 .card-music .active  .menu-dropdow  button{
         font-size: 12px;
         border-bottom: #ccc solid 1px;
         background: #fff;
         color: #363636;
         padding: 5px;
      }
      .card-music .active  .menu-dropdow  button:last-child{
          border: none;
      }
      .card-music .active  .menu-dropdow  button:hover{

      }
      .background_color_default{
          background: #000 !important;
      }
</style>
