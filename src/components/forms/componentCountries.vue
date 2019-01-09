<template>
 
    <select class="select form-control country" style="display:none">
        <option v-for="_country in countries" :option="_country.lenguage" :key="_country._id">
            {{_country.mane}}
        </option>
       
    </select>

</template>
<script>
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');

export default {
    name: 'contry',
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

    getContry(){
        let self=this;
             axios.get(`${SERVER_URI}/api/countries?token=${this.user_data.token}`,
            )
             .then(function (req) {
            //handle success
            self.countries =req.data.countries
            console.log("country",  self.countries[0]);
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
         this.getContry();
    
        
    },
}
</script>
