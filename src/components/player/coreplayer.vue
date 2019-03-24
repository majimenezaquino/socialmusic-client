<template>
<div class="app_player" id="app_player">
          <div class="playlist-hidden" v-if="isPlaylistActive">

               <div class="col-md-12 p-0 m-0">
                          <ul id="playlist-item">
                              <li class="item-music-in-player">
                                <span  v-if="!playlist.length>0">No hay música para reproducir</span>
                                  <a href=""><i class="zmdi zmdi-chevron-down"></i></a>
                                </li>
                              
                            
                        <li   v-for="_playlist in playlist"  :key="_playlist._id"
                        :class="{
                            'item-music-in-player':true  }">
                            <a href="" v-on:click.prevent="toggleActive">
                                  <Emotion 
                                        :music_id="_playlist._id"
                                        :reactiones="_playlist.reactions"
                                        />
                                <div class="tumbnil-music"
                                v-bind:style="{ 'background-image': 'url('+ getFileUrlmg(_playlist.img)+' )' }"
                                >
                                <button><i class="zmdi zmdi-play"></i></button>
                            </div>
                            <div class="content-musi">
                                <h1>{{_playlist.title}}</h1>
                                <p><a href="">{{_playlist.user_published.name}} {{_playlist.user_published.last_name}}</a></p>
                            </div>
                            <div class="info">
                                <a href=""><i class="zmdi zmdi-more"></i></a>
                                <span>{{(_playlist.duration/60).toFixed(2)}}</span>
                            </div>
                            </a>
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
        <button class="app_player__controls app_player__controls--repeat">
          <svg version="1.1"  fill="#333" width="24" height="24" viewBox="0 0 24 24">
            <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031h-1.969v-6h12v-3l3.984 3.984-3.984 3.984v-3h-10.031z"></path>
          </svg>
        </button>
        <button class="app_player__controls app_player__controls--playlist"
          v-on:click.prevent="togglePlaylist"
        >
          <svg version="1.1"  fill="#333" width="24" height="24" viewBox="0 0 24 24">
            <path d="M17.016 12.984l4.969 3-4.969 3v-6zM2.016 15v-2.016h12.984v2.016h-12.984zM18.984 5.016v1.969h-16.969v-1.969h16.969zM18.984 9v2.016h-16.969v-2.016h16.969z"></path>
          </svg>
        </button>
      </div>
  </div>
  
</div>
  
</template>
<script>
const {EventBus} =require('@/eventbus');
const {SERVER_URI,DB_MUSICPLAYER_NAME}=require('@/config/index')

 const {mousePositionElement} =require('@/services/mouseposition.js')

import Emotion from '../reactions/emotion-no-info.vue';
import { setTimeout } from 'timers';
export default {
  name: "playler",
  components:{
      Emotion
  },
 data() {
      return {
      playlist: undefined,
      playlist_item: [],
      openPlaylistStore: false,
       audio: "",
       isPlaying: false,
		imgLoaded: false,
		currentlyPlaying: false,
		currentlyStopped: false,
		currentTime: 0,
		checkingCurrentPositionInTrack: "",
		trackDuration: 0,
		currentProgressBar: 0,
		currentBofferProgressBar: 0,
		isPlaylistActive: false,
		currentSong: 0,
    debug: false,
    volumeBar: 0,
    audioMuted: false,

   
		musicPlaylist: [
		 
        {
          artist: 'Miguel Jimenez',
          image: 'https://source.unsplash.com/crs2vlkSe98',
          title: 'Hitman', 
         url: 'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3'}

		],
		audioFile: ""
     
      }
    },

    props:{
      tracks: {
        type: Object,
        required: true
      },
       add_track: {
        type: Object,
        required: false
      }
  
    },

   watch: {
    // 'tracks': {
    //   handler: function (tracks) {
    //     this.playlist=tracks;
    //     console.log("track init")
    //   },
    //   deep: true
    // },

     'add_track': {
      handler: function (tracks) {
        let _playlist=this.playlist;
        
        tracks.forEach(function(item) {
        _playlist.push(item);
      });
      this.playlist =_playlist;
          console.log('props change',_playlist)
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
                image: self.getFileUrlmg(track.img),
                title: track.title, 
                url: self.getFileUrMusic(track.url)
            }
          });

          this.musicPlaylist = playlist;
          this.playlist=data.tracks;

          this.changeSong(data.index_play);
        
          this.isPlaylistActive=!this.isPlaylistActive;
            if(this.audio.paused){
            this.playAudio();
          }
          ;
          console.log("addd", this.playlist)
        }
        
      },
      deep: true
    },
    'currentTime': function() {
      this.currentTime = Math.round(this.currentTime);
     
		}
    },
updated(){
 if(!this.musicPlaylist.length>0){
          return false;
      }
},
  mounted(){
      if(!this.musicPlaylist.length>0){
          return false;
      }
   this.changeSong();
		this.audio.loop = false;
        
      
     
    
  },
methods: {
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
console.log( this.audio.currentTime)
},
getFileUrlmg(image_name){

              if(image_name===undefined){
                  return 'miaga'
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        },
 getFileUrMusic(image_name){
            return `${SERVER_URI}/api/files/music/${image_name}`;
        },
        /** change music */
        activeCardMusic(card_active_id){
         let allCards=  document.querySelectorAll(".music_active_player");
         if(allCards.length>0){
           for(let i in allCards){
             allCards[i].classList.remove("music_active_player")
           }
         }

        let card_active= document.querySelectorAll("."+card_active_id);
        if(card_active.length>0){
          for( let i in card_active){
            card_active[i].classList.add("music_active_player")
          }
        }
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
	}
}
</script>

<style>
    @import "./player.css";
    .isDisabled {
			background: #ccc;
		}
</style>

