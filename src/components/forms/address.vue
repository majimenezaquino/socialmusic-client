

<template>
<div class="container-address">
    <NewAddress v-if="active_add" />
    <UpdateAddress v-if="active_update"/>
</div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
    const {EventBus} =require('@/eventbus');
    import NewAddress from './new-address.vue';
    import UpdateAddress from './update-address.vue';
   

    import { setInterval, setImmediate } from 'timers';
export default {
    name: 'avatar',
    components:{
        NewAddress,
        UpdateAddress   
    },
    data(){
        return{
            user_data: undefined,
            active_add: false,
            active_update: false
        }
    },
    methods:{
        
   
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
  
          getAddressByUserId(){
            let self=this;
             axios.get(`${SERVER_URI}/api/address?token=${this.user_data.token}`)
             .then(function (req) {
                let address =req.data.address;
                if(address.length>0){
                    //update address
                    self.active_update=true;
                }else{
                    //new address
                    self.active_add=true;
                }
                
        
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });

        }
    },
    mounted(){
        this.redirectUserLogin();
         let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
         this.getAddressByUserId();  
        
            
    },

    
}
</script>
