<template>
    <div class="container-limit-upload" v-if="limit_upload">
 <div class="content">
			 <h1>
				límite  de subidas de músicas!
			 </h1>
			 
			<p>
				ya excedió el limite mensual de subidas de musicas, para subir mas musica cambie su cuenta  o espere hasta {{date_account}}.
			</p>
        </div>
    </div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
    const {EventBus} =require('@/eventbus');
    import LimitUpladMusic from './limit-upload-music.vue';
    import { setInterval, setImmediate } from 'timers';

export default {
    name: 'limit-og',
    data(){
        return{
            user_data: undefined,
            limit_upload: false,
            date_account: undefined
        }
    },
    methods:{
    redirectUserLogin(){
    if(dbLocal.checkDataLocalStorageOBject())
    this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
    getUploadInformaction(){
          let self=this;
          axios.get(`${SERVER_URI}/api/checkuseruploadmusics?token=${this.user_data.token}`)
             .then(function (req) {
             let upload =req.data;
             self.limit_upload =upload.upload_info.limits.complete;
             let moth_account =upload.upload_info.limits.upload_month;
            let tmp_date= new Date(upload.upload_info.date_account);
            console.log("fecha update",tmp_date)
             tmp_date.setMonth(tmp_date.getMonth() + parseInt(moth_account));
            self.date_account =`${tmp_date.getDay()}/${tmp_date.getMonth()}/${tmp_date.getFullYear()}`;
           
       
             })
            .catch(function (response) {
            //handle error
            console.log("errrr",response.response);
        });
    }
    },
    mounted(){
        this.redirectUserLogin();
        this.getUploadInformaction();
    }
}
</script>
<style>
.container-limit-upload{
     width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
}
    .conetent{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    
    }
     .conetent h1{
         color: #fff;
         font-size: 30px;
         max-width: 80%;
     }
</style>
