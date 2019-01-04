<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<div class="playlist-body">
                    
                             <h1>Hola como</h1>
                         </div>
                     </section>

		 </div>
     </LayoutDashboard>

</template>

<script>
  

	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const axios =require('axios')
	const {EventBus} =require('@/eventbus');
    import LayoutDashboard from "@/layouts/LayoutDashboard.vue";
    export default {
        name: "playlist_music",
        components:{
            LayoutDashboard
		}
		,data(){
            return {
                playlist: [],
                tracks:[],
                user_data: undefined,
                playList_count:undefined,
                playlist_songs: []
              
            }
        },
        props:{
        playlist_prop:Object,
        index_prop: Number
        },
		methods:{
		 redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
                this.$router.push( '../' )
			}else{
                 this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
            }
            ,
         getPlaylistByUser(_id){
            let self = this;
            axios.get(`${SERVER_URI}/api/albumes/${_id}?token=${this.user_data.token}`).
            then(function(req){
                    self.playlist.push(req.data.albumes); 
                    self.playList_count =req.data.playList_count;           
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.playlist)
        },
             getPlaylisItemtByUser(_id){
            let self = this;
            let url_playlist =`${SERVER_URI}/api/playlist/${_id}?token=${this.user_data.token}`;
            axios.get(url_playlist).
            then(function(req){
                    self.playlist_songs =  req.data.playLists;
                    EventBus.$emit('ADD_PLAYLIST_PLAYER', {tracks:req.data.playLists,playlist:true});
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.playlist)
        },
        playlist_music_select(event){
            console.log(event.target)
            //this.$store.dispatch('ADD_PLAYLIST_PLAYER',{tracks: playlist, index: index,is_playlist: is_playlist});
        }
		},
		mounted(){
            this.redirectUserLogin();
            this.tracks =this.$store.state.playlist_store;
            this.getPlaylistByUser(this.$route.params.id);
            this.getPlaylisItemtByUser(this.$route.params.id)
            
		}
	}
	

</script>


