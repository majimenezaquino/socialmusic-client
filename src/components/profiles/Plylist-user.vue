<template>
   <div class="container-fluid">
       
      <div class="row">
          <CardPlaylist 
                      v-for="(_playlist,index) in playLists"
                      :music="_playlist"
                      :key="index"
                      :active="true"
                      :prop_playlist_select="hanlderActivatePlayList"
                      />
                
      </div>
   </div>
</template>
<script>
	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
	const axios = require('axios')
import CardPlaylist from "@/components/playlist/CardPlaylistProfile.vue";

export default {
    name: "music-profiles",
    components:{
        CardPlaylist
    },
    data(){
        return{
            musics: [],
                user_data: undefined,
                user_id: this.$route.params.id || 0,
                playLists: [],
        }
    },
    	methods:{
             hanlderActivatePlayList(playlist_id){
            this.playlist_select_id=playlist_id;
          },
           getPlaylistItemByPlayList(_id){
            let self = this;
            axios.get(`${SERVER_URI}/api/albumes?token=${this.user_data.token}`)
            .then(function(req){
                console.log(req)
                self.playLists=req.data.playlist
            }).catch(function(err){
                console.log("Error playlit profile".err.response)
            })
          

        },
		 redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
				this.$router.push( './login' )
			}else{
                //set data by user
                this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
            },
        getmusicsByUser(){
            let self = this
            axios.get(`${SERVER_URI}/api/musicsbyuser/${this.user_id}?token=${this.user_data.token}`).
            then(function(req){

                if(req.data.musics.length>0){
                    self.musics= req.data.musics;
                }
                console.log("req",req)
             
            }).catch(function(err){
                console.log(`error`,err.response)
            })
            
           // console.log(this.musics)
        }
		},
		
        created(){
           this.redirectUserLogin();
           let user_id =this.user_data.user.id;
            this.getPlaylistItemByPlayList(user_id);
        
            
        }
}
</script>
<style>
    /* .conttainet-user-profiles {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 70vh;
    } */
</style>

