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
                                <h1>Musicas</h1>
                                 <div class="uplod"> 
                                    <a href="" class="button"
                                    data-toggle="modal"
                                   data-target="#register_music_modal"
                                    >
                                       <i class="fa fa-cloud-upload"></i> 
                                    </a>
                                    <span class="hover-uplad">sube tu música aquí</span>
                                 </div>
                              </div>
                      <div class="card-search">
                        <div id="productsTable_wrapper" class="form-group label-floating is-empty">
                          <i class="zmdi zmdi-search search-icon-left"></i>
                          <input type="text" class="form-control filter-input" placeholder="mucic" autocomplete="off">
                          <a href="javascript:void(0)" class="close-search" data-card-search="close" data-toggle="tooltip" data-placement="top" title="Close"><i class="zmdi zmdi-close"></i></a>
                        </div>
                      </div>
                      <ul class="card-actions icons right-top">
                    
                        <li>
                          <a href="javascript:void(0)" data-card-search="open" data-toggle="tooltip" data-placement="top" data-original-title="Filter Products">
                            <i class="zmdi zmdi-search search-icon-left"></i>
                          </a>
                        </li>
                    
                      </ul>
                    </header>
                    <div class="card-body">
                       <div id="container-music-item">
                      <div class="header p-b-20 p-t-0">
                         <h1> Las más populares  </h1>
                        </div>
                     <div class="row">
                          
                          <CardMusic 
                          v-for="_music in musics"
                          :music="_music"
                          :key="_music._id"
                          :music_select_callback="handlerMusicSElect"
                      />
                </div>
                   <div class="header p-b-15 p-t-50">
                         <h1> Nuevos talentos </h1>
                        </div>
                   <div class="row">
                          
                          <CardMusic 
                          v-for="_music in musics"
                          :music="_music"
                          :key="_music._id"
                          :music_select_callback="handlerMusicSElect"
                      />
                </div>
                     
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CardMusicDedicate 
            :music_dedicate="music_select_id"
            />

            <CardMusicAddToList 
            :music_dedicate="music_select_id"
            />
            <CardPlayListCreate />
            <RegisterMusicModal />
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
    import CardMusic from "@/components/musics/CardMusic.vue";
    import CardMusicDedicate from "@/components/musics/CardMusicDedicate.vue";
    import CardMusicAddToList from "@/components/musics/CardMusicAddToList.vue";
     import CardPlayListCreate from "@/components/cards/CardPlaListCreate.vue";
     import RegisterMusicModal from "@/components/modals/RegisterMusicModal.vue";
    import { setTimeout } from 'timers';
    export default {
        name: "upload-music",
        data(){
          return{
            user_data: undefined,
            music_select_id: undefined,
            musics: [],
  
          }
        },
        components:{
          LayoutDashboard,
          CardMusic,
          CardMusicDedicate,
          CardMusicAddToList,
          CardPlayListCreate,
          RegisterMusicModal
      
        },
        methods: {
          
        redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
           this.user_data  =dbLocal.getDataLocalStorageOBject();
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

        getMusics(){
            let _this = this;
            axios.get(`${SERVER_URI}/api/musics?token=${this.user_data.token}`).
            then(function(req){
                _this.musics =req.data.musics
    
                             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
         },
         
         handlerMusicSElect(music_id){
          this.music_select_id=music_id;
         }
       
        },
 
        mounted(){
          this.redirectUserLogin();    
          this.getMusics();
        }
    
	}
	

</script>
<style>
  @import url("uploads.css");



</style>
