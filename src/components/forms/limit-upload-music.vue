<template>
    <div class="container-limit-upload" v-if="limit_upload">
        
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
                console.log("upload",)
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
