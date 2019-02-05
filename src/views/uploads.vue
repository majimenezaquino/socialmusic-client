<template>

     <LayoutDashboard> 
		 <div slot="content" id="content_outer_wrapper">
        <section id="content_wrapper">
          <div class="header_wrapper">
           
                  <h1>Uplads Music</h1>
     
          </div>
          <div class="content-body">
            <div class="row">
               <div class="col-xs-12">
                  <div class="winza-header">                     
                     <WizanItem  
                     :key="btn_address.title" 
                     :content="btn_address" 
                     :active="btn_address.active"
                     :method="btn_address.action"
                     />
                  </div>
               </div>
               <div class="row">
                 <div class="col-xs-12">
                    <FormUser v-if="show_vies.user_info" />
                    <FormAddress v-if="show_vies.address"/>
                    <UploadMusic v-if="show_vies.upload"/>
                    <UploadPending v-if="show_vies.pending"/>
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
    import WizanItem from "@/components/forms/wizan-btns.vue";
    import UploadMusic from "@/components/forms/uploadmusic.vue";
    import UploadPending from "@/components/forms/information-musics.vue";
    import { setTimeout } from 'timers';
    export default {
        name: "upload-music",
        data(){
          return{
            user_data: undefined,
            show_vies:{
               user_info: false,
               upload: false,
               address: false,
               pending: false,
            },

             allower_upload: false,
              btn_address:  {
                active: false,
                title: 'Dirección',
                disabled: false,
                icon_class: 'fa fa-map-marker',
                action: this.toggleAddress
              },
            winzan: [
              {
                active: false,
                title: 'Mi información',
                icon_class: 'fa fa-address-card',
                disabled: false,
                action: this.toggleUser
              },

               {
                active: false,
                title: 'Dirección',
                disabled: false,
                icon_class: 'fa fa-map-marker',
                action: this.toggleAddress
              },
              {
                active: false,
                title: 'Subir',
                disabled: !this.allower_upload,
                icon_class: 'fa fa-cloud-upload',
                action: this.toggleUpload
              },
              {
                active: false,
                title: 'Publicar',
                disabled: true,
                icon_class: 'fa fa-floppy-o',
                action: this.togglePending
              }
            ] 
          }
        },
        components:{
          WizanItem,
          LayoutDashboard,
          FormUser,
          FormAddress,
          UploadMusic,
          UploadPending
        },
        methods: {
          
        redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
           this.user_data  =dbLocal.getDataLocalStorageOBject();
         },
        //==========================================================================
        //METHOD TO SET WIZAN
        //==========================================================================
        handlClick(ev){
          console.log("ffff",ev)
        },
         getMusicUploadIncompleteBYUser(){
        axios.get(`${SERVER_URI}/api/musicspending?token=${this.user_data.token}`)
        
             .then(function (req) {
             let music_penging =req.data.musics;
                console.log(music_penging)
                 if(music_penging.length>0){
                    _this.allower_upload =true;
                 }
            
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });
    },
        clearVies(){
              this.show_vies={
               user_info: false,
               upload: false,
               address: false,
               pending: false,
            }
        },
      toggleUser(ev){
        this.clearVies()
        this.show_vies.user_info=true;
      },
       toggleAddress(ev){
        this.clearVies()
        this.show_vies.address=true;
      },
       toggleUpload(ev){
        this.clearVies()
        this.show_vies.upload=true;
      }
      ,
      togglePending(ev){
        this.clearVies()
        this.show_vies.pending=true;
      }
        },
 
        mounted(){
          this.redirectUserLogin();
          // this.checkUserUploadMusics();
           this.getMusicUploadIncompleteBYUser();
          //  this.changeTab();
          
          
        }
    
	}
	

</script>
<style>
  @import url("uploads.css");
</style>
