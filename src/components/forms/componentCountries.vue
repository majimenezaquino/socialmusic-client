<template>
    <select class="form-control" v-on:change="selecCountry">
        <option value="">Elija su pais</option>
      <option v-for="_country in countries" :value="_country._id" :key="_country.code" :selected="country===_country._id">
          {{_country.name}}
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
    name: 'contry',
    props:{
        country: {
            type: String,
            required: false
        }
    },
    data(){
        return{
            user_data: undefined,
            countries: []
        }
    },
        methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
    selecCountry(event){
        //get the country clicked
        let  country=  this.countries.filter((country)=>{
               return country._id ==event.target.value;
           })[0]
        
        EventBus.$emit("country_code",country)
    }
,
    getContry(){
        let self=this;
             axios.get(`${SERVER_URI}/api/countries/?token=${this.user_data.token}`,
            )
             .then(function (req) {
            //handle success
            self.countries =req.data.countries;
            let city_select = req.data.countries.filter((country)=>{
                return country._id== self.country; 
            })
             //if isset props send data
             if(self.country.length){
                 EventBus.$emit("country_code",city_select[0])
             }
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });
    },
    getSelect(){
       let options= document.querySelectorAll(".component-country")[0] || [];
          if(options!=undefined){
              options.addEventListener("onchange",(event)=>{
                  console.log(options)
              })
          }
    
    }
    },
    
    mounted(){
        this.redirectUserLogin();
         let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
         this.getContry();
         this.getSelect();
         
    

        
    },
}
</script>
<style>
    .component-country{
        width: 100%;
        margin: 0px;
        background: transparent;
        border: none;
        border-bottom: #ccc solid 1px;
    }
    .country{
        display: flex;
    }
</style>
