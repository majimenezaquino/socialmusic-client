<template>

     <LayoutDashboard> 
		 <div slot="content" id="content_outer_wrapper">
        <section id="content_wrapper">
        
              <div id="content" class="container-fluid">
            <div class="content-body">
              <div class="row">
                <div class="col-xs-12">
                  <div class="card card-data-tables product-table-wrapper">
                    <header class="card-heading">
                              <div class="music-header-search">
                                <h1>Musicas</h1>
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
                      <CardMusic 
                      v-for="(_music,index) in musics"
                      :id="_music._id"
                      :title="_music.title"
                      :img="_music.img"
                      :user_name="_music.user_published.name"
                      :key="index"
                      />
                     
                     
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
  </div>
      </section>
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
  
    import CardMusic from "@/components/cards/CardMusic.vue";
    import { setTimeout } from 'timers';
    export default {
        name: "upload-music",
        data(){
          return{
            user_data: undefined,
            musics: [],
  
          }
        },
        components:{
          LayoutDashboard,
          CardMusic
      
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
              console.log( _this.musics);
                             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
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
  #container-music-item{
    display: flex;
    overflow: hidden;
    height: auto;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
  }



</style>
