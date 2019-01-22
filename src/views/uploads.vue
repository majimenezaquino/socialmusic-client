<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<div class="playlist-body">
                    <div class="content-playlist">
                         <div class="header">
                                    <h1>Musicians</h1>
                                </div>
                            <div class=" card-musician">
                                 <div class="container-upload">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="rootwizard">
                    <div class="card-heading">
                        <div class="form-wizard-nav">
                          <div class="progress" style="width: 75%;">
                            <div class="progress-bar" style="width:0%;"></div>
                          </div>
                          <ul class="grop-btn-wirza nav-pills">
                            <li class="">
                              <a href="#formuser" data-toggle="tab" aria-expanded="true" name="user_complete">
                              <span class="step"><i class="fa fa-check" aria-hidden="true"></i></span>
                               <span class="title">perfil</span></a></li>
                            <li class="">
                              <a href="#tab2" data-toggle="tab" aria-expanded="false" name="direccion">
                              <span class="step"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                               <span class="title">Direccion</span></a></li>
                              <li class="">
                                  <a href="#tab3" data-toggle="tab" aria-expanded="false" name="upload">
                              <span class="step"><i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
                               <span class="title">Subir</span></a>
                               </li>
                            <li class="">
                              <a href="#tab4" data-toggle="tab" aria-expanded="false" name="informacion">
                              <span class="step"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                               <span class="title">Informacion</span></a>
                              </li>
                              
                            <li class="">
                              <a href="#tab2" data-toggle="tab" aria-expanded="false" name="confirmation">
                              <span class="step"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                               <span class="title">Confirmation</span></a></li>
                          </ul>
                        </div>
                      </div>
                      <div class="card-body p-0">
                        <div class="form-wizard form-wizard-horizontal">
                          <div class="tab-content clearfix p-30">
                            <div class="tab-pane" id="formuser">
                              <div class="table-responsive border-grey-bottom-1px m-b-20">
                               <FormUser />
                              </div>
                            </div>
                            <!--end #formuser -->
                            <div class="tab-pane" id="tab2">
                              <FormAddress />
                            </div>
                            <!--end #tab2 -->
                            <div class="tab-pane" id="tab3">
                              <UploadMusic />
                            </div>
                            <!--end #tab2 --> 
                            <div class="tab-pane" id="tab4">
                              <Information />
                            </div>
                            <!--end #tab3 -->
                            <div class="tab-pane" id="tab5">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <ul class="pager wizard">
                          <li class="previous disabled"><a class="btn btn-primary btn-round" href="javascript:void(0);">Previous</a></li>
                          <li class="next"><a class="btn btn-primary btn-round" href="javascript:void(0);">Next</a></li>
                          <li class="finish"><button class="btn btn-green btn-round pull-right">Place Order</button></li>
                        </ul>
                     
                    </div>
                  </div>
                </div>
              </div>
        </div>

                           
                       
                         
                                <div class="show-more">
                                    <a href="" v-on:click.prevent="getPlaylistByUser">show more</a>
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
    import FormAddress from "@/components/forms/address.vue";
    import UploadMusic from "@/components/forms/uploadmusic.vue";
    import Information from "@/components/forms/information-musics.vue";
    import { setTimeout } from 'timers';
    export default {
        name: "upload-music",
        data(){
          return{
            user_data: undefined
          }
        },
        components:{
          LayoutDashboard,
          FormUser,
          FormAddress,
          UploadMusic,
          Information
        },
        methods: {
           checkUserUploadMusics(){
             let self=this;
             axios.get(`${SERVER_URI}/api/checkuseruploadmusics?token=${this.user_data.token}`).
            then(function(req){
                let uploadInfo =req.data.upload_info;
                 console.log(uploadInfo)
                if(!uploadInfo.address){
                  self.setBtnsByName("direccion");
                  return;
                }
                if(!uploadInfo.user_complete){
                  self.setBtnsByName("user_complete");
                  return;
                }

        
                  self.setBtnsByName("upload");
                
            
                    console.log("USER ===>> ",uploadInfo)
        
                
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            });
           },
        redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
           this.user_data  =dbLocal.getDataLocalStorageOBject();
         },
         setBtnsByName(name){
            let btns=document.querySelectorAll(".grop-btn-wirza li a");
             for(let i in btns){
               if(name== btns[i].name){
                 btns[i].click();
               }
             }
         },
         changeTab(){
           let self=this;
    
           EventBus.$on("send_upload",(data)=>{
             if(data===true){
          
               self.setBtnsByName("upload");
             }
           });

          
         },
         getMusicUploadIncompleteBYUser(){
           let self =this;
        axios.get(`${SERVER_URI}/api/musicspending?token=${this.user_data.token}`)
             .then(function (req) {
             let music_penging =req.data.musics;
                 if(music_penging.length>0){
                   self.setBtnsByName("informacion");
                 }
            
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
        },
        mounted(){
          this.redirectUserLogin();
          this.checkUserUploadMusics();
          this.getMusicUploadIncompleteBYUser();
            this.changeTab();
          
          
        }
    
	}
	

</script>
<style>
    .card-musician{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 0px auto;
        justify-content: flex-start;
       flex-wrap: wrap;
       background: #eee;
    }
    .container-upload{
      width: 100%;
      margin: auto;
    }
  .container-upload   .form-wizard-nav{
    display: flex;
    align-items: center;
    position: relative;
     }
    .container-upload  .progress{
       position: absolute;
       top:50% !important;
       width: 100%;
        transform: translateY(-50%);
        margin: 0px;
     } 
      .container-upload .nav-pills {
        display: flex;
        width: 100%;
        margin: 0px auto;
        justify-content: space-between;
       
     }
 .container-upload .nav-pills span{
       display: flex !important;
       justify-content: center;
       align-items: center;
     }
</style>
