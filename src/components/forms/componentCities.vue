<template>
 
    <select class="select form-control country" style="display:none">
        <option v-for="_country in countries" :option="_country.lenguage" :key="_country._id">
            {{_country.name}}
        </option>
       
    </select>

</template>
<script>
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');

export default {
    name: 'cities',
    data(){
        return{
            user_data: undefined,
            countries: []
        }
    },
        methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject());
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },

    getCities(code){
        let self=this;
             axios.get(`${SERVER_URI}/api/city/${code}?token=${this.user_data.token}`,
            )
             .then(function (req) {
            //handle success
            self.countries =req.data.countries
            console.log("cities",  self.countries[0]);
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
         this.getCities();
    
        
    },
}
</script>
