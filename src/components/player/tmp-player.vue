<template>
    <section id="wrap_player">
            <div class="content">
                 <div class="content-controll">
                      <div id="audio_hedding">
                          <audio :src="music_url" id="audio"></audio>
                      </div>
                     <button><i class="fa fa-random" aria-hidden="true"></i></button>
                     <button v-on:click.prevent="controlPreviousMusic"><i class="fa fa-step-backward" aria-hidden="true"></i></button>
                     <button id="btn_player" v-on:click.prevent="togglePlayer"><i :class="btns.player_icon" aria-hidden="true"></i></button>
                     <button v-on:click.prevent=" controlNextMusic" :disabled="btn_next_disable"><i class="fa fa-step-forward" aria-hidden="true"></i></button>
                     <button><i class="fa fa-repeat" aria-hidden="true"></i></button>
                 </div>
                 <div class="conent-current-time">
                     <span>{{music_current_time}}</span>
                     <div id="curren-time">
                         <span id="current-tieme-fillter" v-on:click.prevent="setCurrentTime">
                              <div class="current-bar" id="progress"></div>
                         </span>
                         <span id="current-tieme-point"></span>
                     </div>
                     <span>{{music_duration}}</span>
                 </div>

                   <div class="conent-info">
                     <div class="thumbnail">
                         <img :src="music_select.img" alt="">
                     </div>
                     <div class="group">
                         <span>{{music_select.user_name}}</span>
                         <p>{{music_select.description}}</p>
                     </div>
                 </div>
                 <div class="content-controll">
                    <router-link to="playlist" class="btn_playlist">
                        <span v-if="tracks.is_playlist && tracks.tracks.length>0">{{tracks.tracks.length}}</span>
                        <a href=""><i class="zmdi zmdi-playlist-audio"></i></a>
                        </router-link>
                    <div class="coent-volumen">
                        <button v-on:click.prevent="toggleMuted"><i :class="btns.btn_volumen"></i></button>
                        <div id="volument" v-on:click.prevent="setVolumen">
                            <span id="voluement-bar">
                                 <span></span>
                            </span>
                            <span id="voluement-point"></span>
                        </div>
                    </div>
                 </div>
            </div>
    </section>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const {EventBus} =require('@/eventbus');
    const dbLocal= new DBLocal(DB_USER_NAME);
    const axios =require('axios')
export default {
    name: "player",
    data(){
        return {
            music_url: undefined,
            user_data :[],
            music_select:{
                img: undefined,
                user_name: undefined,
                description: undefined,
            },
            btn_next_disable: false,
            btn_previous_disable: false,
            audio: null,
            music_duration: 0,
            music_current_time: 0,
            track_index: 0,
            tracks: [],
            //user icons in button
            btns:{
                    player_icon: 'fa fa-play-circle-o',
                    btn_volumen: 'zmdi zmdi-volume-up'
                 }
        }
    },
    mounted(){
        this. redirectUserLogin();
        this.audio=document.getElementById('audio');
        this.progressbar=document.getElementById('current-tieme-fillter'); 
        
        this.tracks =this.$store.state.playlist_store;
         if(!isNaN(this.tracks.index)){
                this.track_index =this.tracks.index;
        }

        
        
    },
    updated(){
        this.updatedVolume();
        //when send music
        let self =this;
        EventBus.$on('EVENTBUS_SEND_MUSIC', function (data) {
            self.tracks =data;
            console.log("data send",data)

        });
    },
    methods:{
        setup(music_active){
        //set var to info music
            this.music_select.img= music_active.music.img || null;
            this.music_select.user_name= music_active.music.author.substr(0,60)  || undefined;
            this.music_select.description= music_active.music.description.substr(0,60) || undefined;
            let tmp_url =`${SERVER_URI}/api/files/music/${music_active.music.url}?token=${this.user_data.token}`;
            this.music_url =tmp_url;
        },
        controlNextMusic(){
           let music_active =this.get_next_or_previous(this.tracks.tracks,'next');
          
            if(!music_active.end){
             this.setup(music_active.list_musics);
             this.audio.load();
             let self =this;
             this.audio.onloadstart = function() {
                 //self.audio.load();
                 self.audio.play();
                 self.payerSetStatus();
                };
            }else{
                this.btn_next_disable=true;
                this.btn_previous_disable=false;
            }
        },
          controlPreviousMusic(){
            let music_active =this.get_next_or_previous(this.tracks.tracks,'previous');
         
            if(!music_active.start){
             this.setup(music_active.list_musics);
              let self =this;
             this.audio.onloadstart = function() {
                // self.audio.load();
                 self.audio.play();
                 self.payerSetStatus();
                };
            }else{
                this.btn_previous_disable=true;
                this.btn_next_disable=false;
            }

           console.log(music_active.start)
        },
         redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
                this.$router.push( '../' )
		}else{
                 this.user_data  =dbLocal.getDataLocalStorageOBject();
                }
            },
       get_next_or_previous(list_musics,next_or_previous='next'){
           let _end =false;
           let _start=true;
            if(!Array.isArray(list_musics) ||  (!list_musics.length>0)){
                console.log(`list_musics it, is not a rray`);
                return undefined;
            }

             if(list_musics.length==this.track_index){
                  _end=true;
                  _start=true;
                  }else{
                  _end=false;
                  }
            
            if(next_or_previous==='next'){
               if(list_musics.length>this.track_index) this.track_index++;
            }
            

             if(next_or_previous==='previous'){
                 if(this.track_index>1){
                    this.track_index--;
                 }
                 if(this.track_index>list_musics.length){
                      _start=true;
                 }else{
                      _start=false;
                 }
                     
            }
            
            return { end:_end,start:_start,list_musics: list_musics[this.track_index-1]};
        }
        
        ,nextMusic(){
            // if(this.tracks.is_playlist){
            //      this. setup();
            //     let self= this;
            //      this.audio.onloadeddata = function() {
            //    self.togglePlayer();
            // };
            // }
        }
        ,
        togglePlayer(){
            if(this.audio.paused){
                this.audio.play();
            }else{
                this.audio.pause()
            }
            let self =this;
            this.payerSetStatus();
            this.audio.onended = function() {
            self.nextMusic();
            };
        },
        payerSetStatus(){
            
             if(this.audio.paused){
                this.btns.player_icon= 'fa fa-play-circle-o';
            }else{
                //if audion is running
                this.audio.ontimeupdate=()=>{
                    this.setProgress();
                    this.updatedVolume();
                }
               this.btns.player_icon= 'fa fa-pause-circle-o'; 
               let  tmp =this;
               this.audio.onplaying=()=>{
                    this.music_duration =(this.audio.duration/60).toFixed(2);
                    setInterval(function(){
                        if(tmp.music_current_time<=tmp.audio.currentTime)
                        tmp.music_current_time =(tmp.audio.currentTime/60).toFixed(2);
                        
                    },30)
                }


                this.audio.onended=()=>{
                        this.btns.player_icon= 'fa fa-play-circle-o';
                }
              
            }
        },

        setProgress(){
            let progress_width = this.progressbar.offsetWidth;
            let progress_time =parseInt( this.music_current_time* progress_width/this.music_duration);
            document.getElementById("progress").style.width=progress_time+"px";
            document.getElementById("current-tieme-point").style.left=progress_time+"px";

        },
        setCurrentTime(event){
            //let progress_click = this.offsetLeft //;
             let progress =this.progressbar.getBoundingClientRect();
             let position  =   parseInt(event.pageX-progress.left)
             let currentTime =( position*this.music_duration/this.progressbar.offsetWidth);
             this.audio.currentTime = currentTime*60 ;
        },
        toggleMuted(){
            this.audio.muted=!this.audio.muted;
            if(this.audio.muted){
                this.btns.btn_volumen ="zmdi zmdi-volume-off";
            }else{
                this.btns.btn_volumen ="zmdi zmdi-volume-up";
                
            }
        },
        setVolumen(event){
            let elem =document.getElementById("volument");
            let progress =elem.getBoundingClientRect();
             let position  =   parseInt(event.pageX-progress.left)
             this.audio.volume=(position/100).toFixed(2);  
             this.updatedVolume();
        },
        updatedVolume(){
            if(this.audio.volume*100>1){
                let tmp_volume =parseInt(this.audio.volume*100);
             document.getElementById("voluement-bar").style.width=tmp_volume+'%';
             document.getElementById("voluement-point").style.left=tmp_volume+'%';
             
            }
           
            
        }
        //mothod to play
        

    }
}
</script>
<style>
    .btn_playlist{
        display: flex;
        position: relative;
        height: 32px;
        width: 32px;
        font-size: 32px;
        color: #363636;
    }
    .btn_playlist span{
        display: flex;
        position: absolute;
        font-size: 8px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        bottom: 14px;
        background: #76ff03;
        z-index: 10;
        left: -9px;
        justify-content: center;
        align-items: center;
         color: #363636;
         font-weight: 100;
    }
    .btn_playlist  a{
        color: #363636;
    }
</style>
