<template>
 
    <select class="form-control country">
        <option v-for="city in cities" :option="city.country" :key="city._id">
            {{city.name}}
        </option>
       
    </select>

</template>
<script>
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
const {EventBus} =require('@/eventbus');
export default {
    name: 'cities',
    data(){
        return{
            user_data: undefined,
            cities: []
        }
    },
        methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },

    getCities(code=''){
        let self=this;
             axios.get(`${SERVER_URI}/api/city/${code}?token=${this.user_data.token}`)
             .then(function (req) {
            //handle success
            self.cities =req.data.cities
            console.log("cities",  self.cities[0]);
             })
            .catch(function (err) {
            //handle error
            console.log("error ====>", err);
        });
    }
 
    },
    
    mounted(){
        this.redirectUserLogin();
         let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
         let self=this;
        EventBus.$on("country_code",function(data){
            self.getCities(data);
        })
        
    },
}
</script>
