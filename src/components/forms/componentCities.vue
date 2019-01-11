<template>
 
    <select class="form-control country" v-on:change="selectCity">
        <option v-for="_city in cities" :value="_city._id" :key="_city._id" :selected="city==_city._id">
            {{_city.name}}
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
    props:{
        city: {
            type: String,
            required: false
        }
    },
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
    ,selectCity(event){
              let city =event.target.value;
              EventBus.$emit("city_id",city);

    }
 
    },
    
    mounted(){
        this.redirectUserLogin();
         let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
         let self=this;
        EventBus.$on("country_code",function(data){
            self.getCities(data.code);
            console.log(data)
        })
        
    },
}
</script>
