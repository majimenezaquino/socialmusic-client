<template>

     <LayoutDashboard> 
		 <div slot="content" id="content_outer_wrapper">
        <section id="content_wrapper">
          <div id="header_wrapper">
              <div class="container-fluid">
                  <h1>Uplads Music</h1>
              </div>
          </div>
          <div class="content-body">
            <div class="row">
               <div class="col-xs-12">
                  <div class="winza-header">                     
                     <WizanItem v-for="wiz 
                     in winzan" 
                     :key="wiz.title" 
                     :content="wiz" 
                     v-on:click.prevent="handlClick"
                     />
                  </div>
               </div>
               <div class="row">
                 <div class="col-xs-12">
                    <FormUser v-if="componentsRender.user_info" />
                    <FormAddress v-if="componentsRender.address"/>
                    <UploadMusic v-if="componentsRender.upload"/>
                    <UploadPending v-if="componentsRender.pending"/>
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
            componentsRender:{
               user_info: false,
               upload: false,
               address: false,
               pending: false,
            },
            winzan: [
              {
                active: false,
                hover: false,
                title: 'perfil',
                icon_class: 'fa fa-cloud-upload',
                action: 'user'
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
        }
     
        },
        beforeMount(){
          if(this.$route.params.component=='user'){
            this.componentsRender.user_info=true;
          }

          if(this.$route.params.component=='upload'){
            this.componentsRender.upload=true;
          }

          if(this.$route.params.component=='address'){
            this.componentsRender.address=true;
          }

           if(this.$route.params.component=='pending'){
            this.componentsRender.pending=true;
          }
        },
        mounted(){
          this.redirectUserLogin();
          // this.checkUserUploadMusics();
          // this.getMusicUploadIncompleteBYUser();
          //  this.changeTab();
          
          
        }
    
	}
	

</script>
<style>
  @import url("uploads.css");
</style>
