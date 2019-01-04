<template>
    <section id="wrap_player">
            <div class="content">
                 <div class="content-controll">
                      <div id="audio_hedding">
                          <audio :src="getMusicUrl(changePlaylistToMusics(music,playlist).url)" id="audio"></audio>
                      </div>
                     <button><i class="fa fa-random"></i></button>
                     <button v-on:click.prevent="setPreviousPlayList" :disabled="btn_previous_disable"><i class="fa fa-step-backward"></i></button>
                     <button id="btn_player" v-on:click.prevent="togglePlayer" ><i :class="icons.player"></i></button>
                     <button v-on:click.prevent="setNextPlayList" :disabled="btn_next_disable"><i class="fa fa-step-forward"></i></button>
                     <button><i class="fa fa-repeat"></i></button>
                 </div>
                 <div class="conent-current-time">
                     <span>
                         <small>{{currentTime}}</small>
                     </span>
                     <div id="curren-time">
                         <span id="current-tieme-fillter" v-on:click.prevent="setCurrentTime">
                              <div class="current-bar" id="progress"></div>
                         </span>
                         <span id="current-tieme-point"></span>
                     </div>
                     <span>
                         <small v-if="duration>0">{{duration}}</small>
                     </span>
                 </div>

                   <div class="conent-info">
                     <div class="thumbnail">
                         <img :src="music.img" :alt="music.title">
                     </div>
                     <div class="group">
                         <span>{{changePlaylistToMusics(music,playlist).title}}</span>
                         <p v-if="music.user_published!=undefined">{{music.user_published.name}}</p>
                     </div>
                 </div>
                 <div class="content-controll">
                    <router-link to="playlist" class="btn_playlist">
                        <span v-if="playlist">{{musics.length}}</span>
                        <a href=""><i class="zmdi zmdi-playlist-audio"></i></a>
                        </router-link>
                    <div class="coent-volumen">
                        <button v-on:click.prevent="toggleMuted"><i :class="icons.volumen"></i></button>
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
    const {EventBus} =require('@/eventbus');
    import { setInterval } from 'timers';
   	const {SERVER_URI,DB_MUSICPLAYER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_MUSICPLAYER_NAME);
    //declare var global
 
export default {
    name: "player-core",
   
    data(){
        return{
            duration: 0,
            musics: [],
            currentTime: 0,
            have_data: false,
            polling: null,
            playlist_index: 0,
            tracks_index:0,
            playlist: false,
            btn_next_disable: true,
            btn_previous_disable: true,
            useLocalStore: false,
            list_end: false,
            music: {},
            icons:{
                    player: 'zmdi zmdi-play',
                    volumen: 'zmdi zmdi-volume-up'
                 }
        }
    },
   
 
    mounted(){
        //get data  
         let audio =document.getElementById('audio');
        let self=this;
       
         //this.setBtnPlayer();
       //add music to player
        EventBus.$on('ADD_MUSIC_PLAYER',function(data){
            self.musics=data.tracks;
             if(self.musics.length>0){
             self.playlist =data.playlist;
             self.music =self.getNextMusic(self.musics).music ;   
             self.init();
            }
        });
       

        //add playlist to player
        EventBus.$on('ADD_PLAYLIST_PLAYER',function(data){
            self.musics=data.tracks;
             if(self.musics.length>0)
             self.playlist =data.playlist;
             self.music =self.getNextMusic(self.musics).music ; 
             self.setBtnPlayer();  
             self.init();
        });
        
        
           
    }
    ,
    methods:{
        init(){
            let self =this;
            let audio =document.getElementById('audio');
            //save data in locar store
            audio.addEventListener("playing",function() {
            if(!audio.paused && !audio.ended)
                self.saveMusicToLocalStore();
             
            });

            audio.onloadedmetadata = function() {
            self.duration =(audio.duration/60).toFixed(2);
            self.togglePlayer();
            
            };
        
            audio.ondurationchange  = function() {
                self.duration =(audio.duration/60).toFixed(2);
                
            };
            audio.ontimeupdate = function() {
                self.currentTime =(audio.currentTime/60).toFixed(2);
                self.updatedVolume();
                self.setProgress();
            };
            //event progerss
                audio.onended = function() {
                    if(!self.list_end)
                    self.setNextPlayList();
            };
        
            //evente
             

        },
        saveMusicToLocalStore(time=300){
             let audio =document.getElementById('audio');
             let  self=this;
             setInterval(function(){
                   if(!audio.paused && !audio.ended){
                 dbLocal.seveDataLocalStorageJson(self.getMetadataMusicPlayed());
                   }

                }, time);
        },
        setBtnPlayer(){
            if(this.musics.length>0){
                this.init();
        
       
        //setup is playlist
        if(this.playlist){
            this.btn_next_disable=false;
           
        }
        }
        },
        togglePlayer(){
        let audio =document.getElementById('audio');
              let data =this.getMetadataMusicPlayed(true);
         if(audio.paused){
             audio.play();
       
         }else{
             audio.pause();
              data =this.getMetadataMusicPlayed(false);
               
         }
         dbLocal.seveDataLocalStorageJson(data);
        this.changeIcons();
        },
        getMusicUrl(music_id='',token=''){
           let url =null;
            if(music_id.length>0){
                 url =`${SERVER_URI}/api/files/music/${music_id}?token=${token}`;
            }
            
            return url;
        },
        //methor progress
        setProgress(){
            let bar_progress = document.getElementById("curren-time").offsetWidth;
            let progress =parseInt( this.currentTime * bar_progress/this.duration);
            document.getElementById("progress").style.width=progress+"px";
            document.getElementById("current-tieme-point").style.left=progress+"px";
        },
         setCurrentTime(event){
            
            let audio =document.getElementById('audio');
            let barCurrentTime=document.getElementById('current-tieme-fillter');
             let progress =barCurrentTime.getBoundingClientRect();
             let position  =   parseInt(event.pageX-progress.left)
             audio.currentTime = ( position*this.duration/barCurrentTime.offsetWidth)*60 ;
        },
        //volumen
        toggleMuted(){
            let audio =document.getElementById('audio');
            audio.muted=!audio.muted;
            if(audio.muted){
                this.icons.volumen ="zmdi zmdi-volume-off";
            }else{
                this.icons.volumen ="zmdi zmdi-volume-up";
                
            }
    },
    setVolumen(event){
        let audio =document.getElementById('audio');
        let elem =document.getElementById("volument");
        let progress =elem.getBoundingClientRect();
        let position  =   parseInt(event.pageX-progress.left)
        audio.volume=(position/100).toFixed(2);  
        this.updatedVolume();
        },
        changeIcons(){
            let audio =document.getElementById('audio');
            if(audio.paused){
                this.icons.player = 'zmdi zmdi-play';
            }else{
                
                this.icons.player = 'zmdi zmdi-pause';
            }

        },
        updatedVolume(){
             let audio =document.getElementById('audio');
            if(audio.volume*100>1){
                let tmp_volume =parseInt(audio.volume*100);
             document.getElementById("voluement-bar").style.width=tmp_volume+'%';
             document.getElementById("voluement-point").style.left=tmp_volume+'%';
             
            }
    },   
     getNextMusic(musics,index=0){
            let _end= false;
            if(!Array.isArray(musics) ||  (!musics.length>0)){
                return {};
            }
            
            if(musics.length>this.playlist_index){
               ++ this.playlist_index;
            }
            if(musics.length==this.playlist_index){
                _end= true;
            }
            return {music: musics[this.playlist_index-1],end:_end};
           
        },
   getPrevious(musics,index=0){
            let _end= false;
            if(!Array.isArray(musics) ||  (!musics.length>0)){
                return {};
            }

            if(this.playlist_index>=1){
                 this.playlist_index--;
            }
            if(this.playlist_index==1){
                    _end= true;
                }
            return {music: musics[this.playlist_index-1],end:_end};
           
        },
        //chage music 
        setNextPlayList(){
            this.btn_next_disable=true;
            this.btn_previous_disable=false;
            let music_tmep =this.getNextMusic(this.musics);
            this.music =music_tmep.music;
            document.getElementById('audio').load();
             if(!music_tmep.end){
                 this.btn_next_disable=false;
                 this.list_end=true;
             }
        },
        changePlaylistToMusics(music,isList=false){
             if(isList){
                 return music.music;
             }
             return music;
        },
        setPreviousPlayList(){
            this.btn_next_disable=false;
            this.btn_previous_disable=true;
            let mc= this.getPrevious(this.musics);
            this.music=mc.music;
            document.getElementById('audio').load();
            if(!mc.end){
                this.btn_previous_disable=false;
            }
             
        },

    getMetadataMusicPlayed(status=true){
            let audio =document.getElementById('audio');
            let  music_played={
                    playing: status,
                    tracks_index:this.playlist_index,
                    volumen: parseInt(audio.volume*100),
                    currentTime: (audio.currentTime/60).toFixed(2),
                    tracks: this.musics
                }

            return music_played;
        },
        sendMusicActive(music_id,status){
            EventBus.$emit("MUSIC_ACTIVED",{music: music_id,status})
        }
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
    button:disabled {
  color: #ccc;
}
#btn_player{
    border:#363636 solid 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;
}
#btn_player i{
    display: inline-block;
    font-size: 24px;
}
</style>
