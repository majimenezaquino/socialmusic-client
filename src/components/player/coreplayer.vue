<template>
<div class="app_player" id="app_player">
          <div class="playlist-hidden" v-if="isPlaylistActive">

               <div class="col-md-12 p-0 m-0">
                          <ul id="playlist-item">
                              <li class="item-music-in-player">
                                <div class="item-header">
                                  <button v-on:click.prevent="toggleRandom" :class="{'active':active_random}">
                                    <i class="zmdi zmdi-shuffle"></i>
                                    </button>
                                <span  v-if="!playlist.length>0">No hay música para reproducir</span>
                                 <span  v-else>Músicas en cola </span>
                                  <button v-on:click.prevent="togglePlaylist">
                                    <i class="zmdi zmdi-chevron-down">
                                      </i></button>
                                </div>
                                </li>
                              
                            
                        <li   v-for="(_playlist,index) in playlist"  :key="index"
                        
                        :class="[
                        {'item-music-in-player': true},
                         {'active': _playlist._id==music_run}]">
                                       
                              <div class="tumbnil-music"
                                v-bind:style="{ 'background-image': 'url('+ ImgPath(_playlist.img)+' )' }"
                                >
                                <button class="btn-player"
                                v-on:click.prevent="changeMusic(index)"
                                >
                                  <i :class="{
                                    'zmdi zmdi-play': true, 
                                    'spinner spinner-bounce-bottom': !audio.paused &&  _playlist._id==music_run
                                    }"></i>
                                    
                                    </button>
                            </div>
                            <div class="content-musi">
                                <h1>{{_playlist.title}}</h1>
                                <p><a href="">{{_playlist.user_published.name}} {{_playlist.user_published.last_name}}</a></p>
                            </div>
                            <div class="content-controll">
                              <Emotion 
                                        :music_id="_playlist._id"
                                        :reactiones="_playlist.reactions"
                                        />
                            
                            <div class="info">
                                <a href=""><i class="zmdi zmdi-more"></i></a>
                                <span>{{(_playlist.duration/60).toFixed(2)}}</span>
                            </div>
                            </div>
                </li>
                            
                          </ul>
                        </div>
          </div>
  <div class="audio-heddin">
     <audio id="audio"></audio>
  </div>
  <div class="app_player__inner">
      <div class="app_player__item app_player__item--playback">
        <button class="app_player__controls app_player__controls--prev"
        :disabled="(currentSong==0)"
        v-on:click.prevent="prevSong">
          <i class="zmdi zmdi-skip-previous"></i>
        </button> 
        <button class="app_player__controls app_player__controls--toggle is-playing"
          v-on:click.prevent="playAudio"
          
        >
          <i 
          :class="{ 
          'zmdi zmdi-play': !isPlaying,
          'zmdi zmdi-pause':isPlaying
                }"></i>
        </button>
        <button class="app_player__controls app_player__controls--next"
        :disabled="(currentSong==musicPlaylist.length-1)"
        v-on:click.prevent="nextSong"
        >
          <i class="zmdi zmdi-skip-next"></i>
        </button>
      </div>
      <div class="app_player__item app_player__item--track">
        <div class="app_player__track_profile">
          <div class="tuh">
            <img  class="app_player__icon_profile" 
           v-if="musicPlaylist.length"
            @load="onImageLoaded()" :src="musicPlaylist[currentSong].image || ''" :key="currentSong" ondragstart="return false;" id="playerAlbumArt"
            >
          </div>
        </div>
        <div class="track">
          <div class="track__title" v-if="musicPlaylist.length" >{{ musicPlaylist[currentSong].title }}</div>
          <div class="track__title" v-if="!musicPlaylist.length" >No hay música para reproducir </div>
          <div class="track__time">
            <span class="track__time--current">{{ currentTime | fancyTimeFormat }}</span>
            <span> / </span>
            <span class="track__time--duration">{{ trackDuration | fancyTimeFormat }}</span>
          </div>

          <div class="progress-container"
           v-on:mousedown="setBarProgress"
           v-on:mousemove="setBarProgress"
          
          >
            <div class="progress">
              <div class="progress__bar" :style="{ width: currentProgressBar + '%' }"></div>
              <div class="progress__preload" :style="{ width: currentBofferProgressBar + '%' }"></div>
            </div>
          </div>

        </div>
      </div>
      <div class="app_player__item app_player__item--settings">
        <div class="app_player__controls volume-container">
          <button 
          :class="{ 
          'volume-btn': true,
          'has-muted':audioMuted
                }"
            v-on:click.prevent="volumeToggle">
            <svg class="icon-volume-on" version="1.1"  fill="#333" width="24" height="24" viewBox="0 0 24 24">
              <path d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q2.484 1.219 2.484 4.031zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"></path>
            </svg>
            <svg class="icon-volume-off" version="1.1"  fill="#333" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.734 1.359-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.25-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q2.484 1.219 2.484 4.031z"></path>
            </svg>
          </button>
          <div class="volume"
           v-on:mousedown="setVolume"
           v-on:mousemove="setVolume"
            
          >
            <div class="volume__track">
              <div class="volume__bar" 
              :style="{ height: volumeBar + '%' }"
               
              ></div>
            </div>
          </div>
        </div>
        <button :class="{'app_player__controls app_player__controls--repeat': true, 'active':isRepeactActive}"
        v-on:click.prevent="toggleRepeatcAudio"
        >
          <i class="zmdi zmdi-repeat"></i>
        </button>
        <button :class="{'app_player__controls app_player__controls--playlist': true, 'active': isPlaylistActive}"
          v-on:click.prevent="togglePlaylist"
        >
          <i class="zmdi zmdi-playlist-audio"></i>
        </button>
      </div>
  </div>
  
</div>
  
</template>
<script>
 import stattic_image from '@/assets/img/music-no-image.png'
    const {EventBus} =require('@/eventbus');
    const {mousePositionElement} =require('@/services/mouseposition.js')
    import Emotion from '../reactions/emotion.vue';
    import { setTimeout } from 'timers';
    import CardUser from "../cards/CardUser.vue";
    import TextMore from "../forms/ShowMore.vue";
    import io from 'socket.io-client';
    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const moment = require('moment');
    const dbLocal= new DBLocal(DB_USER_NAME);
    const axios = require('axios');
    const socket = io(SERVER_URI);
    moment.locale('es')
export default {
  name: "playler",
  components:{
      Emotion
  },
 data() {
      return {
        played:{
              current_time: this.currentTime,
              _id: undefined,
              music_id: undefined,
              location_id: this.getCookie("user_location") || null,
          },
        user_data: undefined,
      playlist: undefined,
      playlist_rando: false,
      playlist_item: [],

      openPlaylistStore: false,
      music_run: undefined,
       audio: "",
       isPlaying: false,
    active_random: false,
		imgLoaded: false,
		currentlyPlaying: false,
		currentlyStopped: false,
		currentTime: 0,
		checkingCurrentPositionInTrack: "",
		trackDuration: 0,
		currentProgressBar: 0,
		currentBofferProgressBar: 0,
		isPlaylistActive: false,
		isRepeactActive: false,
		currentSong: 0,
    debug: false,
    volumeBar: 0,
    audioMuted: false,

   
		musicPlaylist: [
		 
        {
          id: undefined,
          artist: undefined,
          image: undefined,
          title: undefined, 
         url: undefined}

		],
		audioFile: ""
     
      }
    },

    props:{
      tracks: {
        type: Object,
        required: false,
      },
       add_track: {
        type: Object,
        required: false
      }
  
    },

   watch: {
  

     'add_track': {
      handler: function (tracks) {
        
        let _playlist=this.playlist;
        
        tracks.forEach(function(item) {
        _playlist.push(item);
      });
     
      this.playlist =_playlist;
      },
      deep: true
    },
    'tracks': {
      handler: function (data) {
        let playlist ;
        let self=this ;
      
        if(data.tracks.length>0){
         
          playlist=data.tracks.map(function(track){
            return {
                id: track._id,
                artist: track.user_published.name,
                image: self.ImgPath(track.img),
                title: track.title, 
                duration: track.duration, 
                reactions: track.reactions,
                url: self.getFileUrMusic(track.url)
            }
          });
       
          console.log(data)
          let _stop =false;
          this.musicPlaylist = playlist;
          if(playlist[data.index_play].id ==this.music_run && playlist.length<2){
             this.playAudio();
          }else{
          this.changeSong(parseInt(data.index_play));
           this.isPlaylistActive=true;
           this.playlist=data.tracks;
          
            if(this.audio.paused){
            this.playAudio();
          }
          }
        }
        
        
      },
      deep: true
    },
    'currentTime': function() {
      this.currentTime = Math.round(this.currentTime);
      this.saveMusicPlayed();
     
		}
    },
updated(){
 if(!this.musicPlaylist.length>0){
          return false;
      }
},
  mounted(){
      this.redirectUserLogin();
      if(!this.musicPlaylist.length>0){
          return false;
      }
   this.changeSong();
		this.audio.loop = false;
   

  },
created(){


// window.addEventListener('beforeunload', (event) => {
 
//     event.returnValue = 'There is pending work. Sure you want to leave?';
  
// });


},
 
methods: {
     redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
		togglePlaylist: function() {
			this.isPlaylistActive = !this.isPlaylistActive;
		},
		nextSong: function() {
    
			if (this.currentSong < this.musicPlaylist.length - 1)
				this.changeSong(this.currentSong + 1);
    },
   
		prevSong: function() {
			if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
		},
		changeSong: function(index) {

     
			var wasPlaying = this.currentlyPlaying;
			this.imageLoaded = false;
			if (index !== undefined) {
				this.stopAudio();
				this.currentSong = index;
      }
      let content_id =this.musicPlaylist[this.currentSong].id ;
  
     

      this.audioFile = this.musicPlaylist[this.currentSong].url;
      this.audio = new Audio(this.audioFile);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function() {
      localThis.trackDuration = Math.round(this.duration);
      localThis.volumeBar = Math.round(this.volume*100);   
			});
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playAudio();
      }
      
      this.music_run = content_id;
      this.activeCardMusic(this.music_run);
      console.log("terminar la cancion.")
    },
   shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
},
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		},
		getCurrentSong: function(currentSong) {
			return this.musicPlaylist[currentSong].url;
		},
		playAudio: function() {
             if(!this.musicPlaylist.length>0){
                     return false;
                }
                
			if (
				this.currentlyStopped == true &&
				this.currentSong + 1 == this.musicPlaylist.length
			) {
				this.currentSong = 0;
				this.changeSong();
			}
			if (!this.currentlyPlaying) {
				this.getCurrentTimeEverySecond(true);
				this.currentlyPlaying = true;
				this.audio.play();
			} else {
				this.stopAudio();
			}
      this.currentlyStopped = false;
      if(!this.audio.paused && !this.audio.ended){
        this.isPlaying=true;
      }else{
        this.isPlaying=false;
      }
      this.activeCardMusic(this.music_run);
		},
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			this.pausedMusic();
    },
    
		handleEnded: function() {
			if (this.currentSong + 1 == this.musicPlaylist.length) {
				this.stopAudio();
				this.currentlyPlaying = false;
				this.currentlyStopped = true;
			} else {
				this.currentlyPlaying = false;
				this.currentSong++;
				this.changeSong();
				this.playAudio();
      }
      
		},
		onImageLoaded: function() {
			this.imgLoaded = true;
		},
		getCurrentTimeEverySecond: function(startStop) {
			var localThis = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
			 localThis.currentTime = localThis.audio.currentTime;
          localThis.currentProgressBar = localThis.audio.currentTime / localThis.trackDuration * 100;
          
        //	localThis.currentBofferProgressBar = localThis.audio.currentTime / localThis.trackDuration * 100;
        localThis.audio.onprogress = function(){
               localThis.currentBofferProgressBar = Math.round(100 * localThis.audio.buffered.end(0) / localThis.audio.duration) || 0;
             }
         
					localThis.getCurrentTimeEverySecond(true);
				}.bind(this),
				1000
			);
		},
		pausedMusic: function() {
			clearTimeout(this.checkingCurrentPositionInTrack);
    },
    volumeToggle() {
        if(!this.musicPlaylist.length>0){
          return false;
      }
          this.audio.muted=!this.audio.muted;

         if(this.audio.muted){
           this.audioMuted=true;
           this.volumeBar = 0;
         }else{
           this.audioMuted=false;
           this.volumeBar = this.audio.volume * 100; 
         }
         
      },
 
  


setVolume(ev){
     if(!this.musicPlaylist.length>0){
          return false;
      }

   if(ev.type=='mousemove' && ev.which!=1){
    return false;
  }
  let barVolume=mousePositionElement(ev).y;
  let lement =document.querySelector(".volume");
  let volume =parseInt(lement.offsetHeight-barVolume);
  this.volumeBar=volume;
  if(volume/100<0){
    volume=0;
  }

  if(volume/100>1){
    volume=100;
  }
  this.audio.volume=volume/100;

  	
},
setBarProgress(ev){
   if(!this.musicPlaylist.length>0){
          return false;
      }
  if(ev.type=='mousemove' && ev.which!=1){
    return false;
  }
 
  let barProgress=mousePositionElement(ev).x;
  let lement =document.querySelector(".progress-container");
  let barSize =parseInt(barProgress *100/lement.offsetWidth);
 // 
  //this.currentTime = Math.floor((this.trackDuration * barSize/100)*60);
 this.audio.currentTime = (this.trackDuration * barSize/100);
 this.currentProgressBar= barSize;
 //this.audio.currentTime=20;

},

 getFileUrMusic(image_name){
            return `${SERVER_URI}/api/files/music/${image_name}`;
        },

clearCardMusicActive(){
      let  unactive=document.querySelectorAll(`.card-music`);
      let  bntsPlayer=document.querySelectorAll(`.card-music button.btn-player`);
      for(let i in unactive){
              try{
                unactive[i].classList.remove("active_card_music");                       
                bntsPlayer[i].innerHTML=`<i class="zmdi zmdi-play"></i>`;                     
              }catch(e){
              }
          }
},
        activeCardMusic(name_class){
          this.clearCardMusicActive();
         let _this=this;

         let  card_active=document.querySelectorAll(`.card_${name_class}`);
         let  bntsPlayer=document.querySelectorAll(`.card_${name_class} button.btn-player`);
         for(let i in card_active){
           try {
        
             card_active[i].classList.add("active_card_music");
             if(!this.audio.paused && !this.audio.ended){
               bntsPlayer[i].innerHTML=`<i class="spinner spinner-bounce-bottom"></i>`;
                
             }else{
               bntsPlayer[i].innerHTML=`<i class="zmdi zmdi-play"></i>`;
               console.log("change status pause")
             }
           } catch (error) {
             
           }
         }
    
        
       
        },
        changeMusic(index){
          let music_select =this.musicPlaylist[index].id || undefined
          if(this.music_run ==music_select){
            this.playAudio();
          }else{
            this.changeSong(index);
            try {
              this.audio.play()
            } catch (error) {
              
            }
          }
          //
        },
        ImgPath(img){
       if(img===undefined || img == null ){
        return stattic_image
    }
  if(img.includes("https://") || img.includes("http://")){
      return img;
  }
  return `${SERVER_URI}/api/files/image/${img}`;
},

        saveMusicPlayed(){
          let self =this;
          
          if(this.isPlaying){
           if(!this.getCookie('played').includes(self.music_run)){
            this.played.music_id= this.music_run;
            this.played.current_time= this.currentTime;
            self.setCookie('played',this.music_run , 10)
              axios.post(`${SERVER_URI}/api/played?token=${this.user_data.token}`,this.played).
            then(function(req){
              self.played._id=req.data.played._id;
            }).catch(function(err){
                console.log(`error--->`,err.response)
            })
           }
           
            

          }
          
        },
  setCookie(cname, cvalue, exseg) {
  var d = new Date();
  d.setTime(d.getTime() + (exseg * 1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
,
   getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
},
        toggleRandom(){
          this.active_random=!this.active_random;
          let index =undefined;
              if(this.active_random){
                this.musicPlaylist = this.shuffle( this.musicPlaylist);
              index=Math.floor(Math.random() * this.musicPlaylist.length);
              this.changeSong(index)
             }
     
          
        },
        toggleRepeatcAudio(){
          this.isRepeactActive=! this.isRepeactActive
        }
},
  filters: {
		fancyTimeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}
  },
  beforeDestroy: function() {
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.handleEnded);
    clearTimeout(this.checkingCurrentPositionInTrack);
     console.log("detruir el componente")
    
  },
  updated(){
    let cla =document.getElementsByClassName("active_card_music");
    let card_music =document.getElementsByClassName("card-music");
    if(!cla.length>0 && this.music_run && card_music.length>0){
      this.activeCardMusic(this.music_run);
    }
   
  }

    
}
</script>

<style>
    @import "./player.css";
    .isDisabled {
			background: #ccc;
    }
    
</style>

