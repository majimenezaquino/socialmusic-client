<template>

     <LayoutDashboard> 
		 <div slot="content" id="content_outer_wrapper">
        <section id="content_wrapper">
        
              <div id="content" class="container-fluid">
            <div class="content-body">
              <CardPlayListCreate />
              <CardPlayListEditail 
              :playlist_select="playlist_select_id"
               />
              <div class="row">
                <div class="col-xs-12">
                  <div class="card card-data-tables product-table-wrapper">
                    <header class="card-heading search-option-header">
                              <div class="music-header-search">
                                 <div class="uplod">
                                    <a href="#" class="button" data-toggle="modal" data-target="#modal-create-playlist">
                                       <i class="fa fa-plus-square"></i>
                                    </a>
                                    <span class="hover-uplad">Crear una lista Playlist</span>
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
                      <div class="modal-create-playlis" v-if="show_create_playlist">
                        <a href="" v-on:click.prevent="close_create_playlist" class="btn-close"><i class="fa fa-times"></i></a>
                          <CreatePlayList />
                      </div>
                       <div id="container-music-item">
                      
                     <div class="row">
                          
                          <CardPlaylist 
                      v-for="(_playlist,index) in playlist"
                      :music="_playlist"
                      :key="index"
                      :active="true"
                      :prop_playlist_select="hanlderActivatePlayList"
                      />
                          </div>
                     
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
  </div>
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
    import swal from 'sweetalert';
    import CardPlaylist from "@/components/cards/CardPlaylist.vue";
    import CardPlayListCreate from "@/components/cards/CardPlaListCreate.vue";
    import CardPlayListEditail from "@/components/cards/CardPlayListEditail.vue";
    import { setTimeout } from 'timers';
    export default {
        name: "upload-music",
       
        data(){
          return{
            user_data: undefined,
            playlist_select_id: '',
            musics: [],
            playlist: [],
            show_create_playlist: false
  
          }
        },
        components:{
          LayoutDashboard,
          CardPlaylist,
          CardPlayListEditail,
          CardPlayListCreate
      
        },
        methods: {
          hanlderActivatePlayList(playlist_id){
            this.playlist_select_id=playlist_id;
          },
        redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
           this.user_data  =dbLocal.getDataLocalStorageOBject();
         },
         close_create_playlist(){
           this.playlist_activate=false;
         },
         getMusics(){
            let _this = this;
            axios.get(`${SERVER_URI}/api/musics?token=${this.user_data.token}`).
            then(function(req){
                _this.musics =req.data.musics
        
                             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
         },
         show_create(){
           this.show_create_playlist=true;
         },
            getPlaylist(_id){
            let self = this;
            axios.get(`${SERVER_URI}/api/albumes/?token=${this.user_data.token}`).
            then(function(req){
              self.playlist =req.data.playlist
         
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
        }
       
        },
 
        mounted(){
          this.redirectUserLogin();    
          this.getMusics();
          this. getPlaylist();
        }
    
	}
	

</script>
<style>
  @import url("uploads.css");

.modal-create-playlis{
  position: absolute;
  left: 0px;
  right: 0px;
  top:0px;
  background: #fff;
  z-index: 10;
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  padding-top: 0px;
}
.modal-create-playlis .btn-close{
display: inline-block;
position: absolute;
right: 20px;
top: 20px;
}
</style>
