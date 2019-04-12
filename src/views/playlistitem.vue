<template>

     <LayoutDashboard> 
		 <div slot="content" id="content_outer_wrapper">
        <section id="content_wrapper">
        
              <div id="content" class="container-fluid">
            <div class="content-body">
              <div class="row">
                <div class="col-xs-12">
                  <div class="card card-data-tables product-table-wrapper">
                    <header class="card-heading search-option-header">
                              <div class="music-header-search">
                                <h1>Músicas</h1>
                                 <div class="uplod">
                                    <a href="/uploads" class="button">
                                       <i class="fa fa-cloud-upload"></i> 
                                    </a>
                                    <span class="hover-uplad">sube tu música aquí</span>
                                 </div>
                              </div>
                      <div class="card-search">
                        <div id="productsTable_wrapper" class="form-group label-floating is-empty">
                          <i class="zmdi zmdi-search search-icon-left"></i>
                          <input type="text" class="form-control filter-input" placeholder="Filter Products..." autocomplete="off">
                          <a href="javascript:void(0)" class="close-search" data-card-search="close" data-toggle="tooltip" data-placement="top" title="Close"><i class="zmdi zmdi-close"></i></a>
                        </div>
                      </div>
                      <ul class="card-actions icons right-top">
                        <li id="deleteItems" style="display: none;">
                          <span class="label label-info pull-left m-t-5 m-r-10 text-white"></span>
                          <a href="javascript:void(0)" id="confirmDelete" data-toggle="tooltip" data-placement="top" data-original-title="Delete Product(s)">
                            <i class="zmdi zmdi-delete"></i>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" data-card-search="open" data-toggle="tooltip" data-placement="top" data-original-title="Filter Products">
                            <i class="zmdi zmdi-search search-icon-left"></i>
                          </a>
                        </li>
                        <li class="dropdown" data-toggle="tooltip" data-placement="top" data-original-title="Show Entries">
                          <a href="javascript:void(0)" data-toggle="dropdown">
                            <i class="zmdi zmdi-more-vert"></i>
                          </a>
                          <div id="dataTablesLength">
                          </div>
                        </li>
                        <li>
                          <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" data-original-title="Export All">
                            <i class="zmdi zmdi-inbox"></i>
                          </a>
                        </li>
                      </ul>
                    </header>
                    <div class="card-body">
                       <div id="container-music-item">
                      
                     <div class="row">
                          
                     
                            <CardPlaylist  :music="albumes" :active="true" />

                        <div class="col-md-8 p-0 m-0">
                          <ul id="playlist-item" >
                            <CardPlaylistItem 
                              v-for="playlist in playlist_item" :key="playlist._id"
                              :music="playlist.music"
                              :user="playlist.user_published"
                             />
                          </ul>
                        </div>
                          </div>
                     
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
  </div>
  <CardPlayListEditail 
     :playlist_select="playlist_select_id"
               />
      </section>
<!-- modal -->

  </div>
      	
     </LayoutDashboard>

</template>

<script>
  

  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
  const {EventBus} =require('@/eventbus');
    import LayoutDashboard from "@/layouts/LayoutDashboard.vue";
    import FormUser from "@/components/forms/User.vue";
  import CardPlayListEditail from "@/components/cards/CardPlayListEditail.vue";
    import CardPlaylist from "@/components/cards/CardPlaylist.vue";
    import CardPlaylistItem from "@/components/cards/CardPlaylistItem.vue";
    import { setTimeout } from 'timers';
    export default {
        name: "upload-music",
        data(){
          return{
            user_data: undefined,
            albumes: [],
            playlist_item:[],
            musicsRelation: [],
            playlist_select_id: undefined,
            
  
          }
        },
        components:{
          LayoutDashboard,
          CardPlaylist,
          CardPlaylistItem,
          CardPlayListEditail
          
      
        },
        methods: {
          
        redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
           this.user_data  =dbLocal.getDataLocalStorageOBject();
         },
         getMusics(){
           let music_id =this.$route.params.id;
            let _this = this;
            axios.get(`${SERVER_URI}/api/musics/${music_id}?token=${this.user_data.token}`).
            then(function(req){
                _this.musics =req.data.music
              
              
                             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
         },
            getPlaylistById(_id){
            let self = this;
            axios.get(`${SERVER_URI}/api/albumes/${_id}?token=${this.user_data.token}`).
            then(function(req){
             self.albumes =req.data.albumes       
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           
        }
        ,
         getPlaylistItemByPlayList(_id){
            let self = this;
            axios.get(`${SERVER_URI}/api/playlist/${_id}?token=${this.user_data.token}`).
            then(function(req){
             self.playlist_item =req.data.playLists;
                        
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           
        }
      
       
        },
 
        mounted(){
          this.redirectUserLogin();  
          let music_id =this.$route.params.id;  
          this.getPlaylistById(music_id);
          this.getPlaylistItemByPlayList(music_id);
          this.playlist_select_id= this.$route.params.id;
        }
    
	}
	

</script>
<style>
  @import url("uploads.css");

#playlist-item{
padding: 0px;
}

</style>
