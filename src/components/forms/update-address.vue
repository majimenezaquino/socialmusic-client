<template>
<div class="container__music">
          <div id="content" class="container-fluid">
            <div class="content-body">
              <div class="row">
                <div class="col-xs-12">
                  <div class="card card-data-tables">
                    <header class="card-heading m-0">
                      
                      <h2 class="card-title">Zero configuration</h2>
                     
                    </header>
                    <div class="card-body p-0">
                      <div class="table-responsive">
                        <table id="productsTable" class="mdl-data-table m-t-2" cellspacing="0" width="100%">
                          <thead>
                            <tr>
                              <th data-orderable="false" class="col-xs-1">
                                <span class="checkbox">
                                  <label>
                                    <input type="checkbox" value="" id="checkAll">
                                    <span class="checkbox-material"></span>
                                  </label>
                                </span>
                              </th>
                              <th data-orderable="false" class="col-xs-2">País</th>
                              <th class="col-xs-2">Ciudad</th>
                              <th class="col-xs-2">Calle</th>
                              <th class="col-xs-2">Numero de casa</th>

                              <th class="col-xs-1">Código postal </th>
                              <th data-orderable="false" class="col-xs-2">
                                <button class="btn btn-primary btn-fab  animate-fab"><i class="zmdi zmdi-plus"></i></button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(_address ,index)  in address" :key="index">
                              <td>{{_address.country.name}}</td>
                              <td>#394822</td>
                              <td>#394822</td>
                              <td>1,200</td>
                              <td><a href="javascript:void(0)" class="edit-product icon"><i class="zmdi zmdi-edit"></i></a></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
      </div>
</div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
    const {EventBus} =require('@/eventbus');
    

    import { setInterval, setImmediate } from 'timers';
export default {
    name: 'avatar',
    components:{
     
        
    },
    data(){
        return{
            user_data: undefined,
            address:[],
        }
    },
    methods:{
        
   
  
    handlSelectCountry(ev){
        let code =ev.target.value;
       this.city_select=undefined;
        this.getCities(code);
        let country=this.countries.filter(function(country){
            return  country.code ==code;
        })

       this.address_up.country = country[0]._id;       
    },
    handlSelectSities(ev){
         let id =ev.target.value;
       this.city_select=undefined;
        let city=this.cities.filter(function(country){
            return  country._id ==id;
        })
        this.address_up.city=city[0]._id;
       
    },
         getContry(){
        let self=this;
             axios.get(`${SERVER_URI}/api/countries/?token=${this.user_data.token}`,
            )
             .then(function (req) {
                   
                self.countries = req.data.countries;
               
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });
    },
    getCities(code=''){
        let self=this;
             axios.get(`${SERVER_URI}/api/city/${code}?token=${this.user_data.token}`)
             .then(function (req) {
            //handle success
            self.cities =req.data.cities
          
             })
            .catch(function (err) {
            //handle error
            console.log("error ====>", err);
        });
    },
    

   handlSelectGenrens(country_select){
         this.genres_label=false; 
         this.music.genre =ev.target.value;
   },
    
    
    
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
  
  
 

   
      address_complete(){
           if((this.address.city!=undefined && this.address.city!='') &&
               (this.address.country!=undefined && this.address.country!='') &&
               (this.address.street!=undefined && this.address.street!='' && this.address.street.length>4 ) &&
               (this.address.house_number!=undefined && this.address.house_number!='') 
           ){
               return true;
           }
        return false;
        },

        sendData(){
            if(this.address._id!=undefined){
                this.updateAddress();
            }else{
                this.sendAdrress();
            }
            
        },
        updateAddress(){
            let self=this;
             axios.put(`${SERVER_URI}/api/address?token=${this.user_data.token}`,this.address_up)
        
             .then(function (req) {
                 console.log("error",req.data)
            let address =req.data.address;
                self.success.success=true;
                self.success.message=`Su dirección fue guardada`;
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });
        },
        
          getAddressByUserId(){
            let self=this;
             axios.get(`${SERVER_URI}/api/address?token=${this.user_data.token}`)
             .then(function (req) {
                let address =req.data.address;
                if(address.length>0){
                    //update address
                    self.address =address;
                }else{
                    //new address
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

    watch:{
        'address.street':function(newValue){
            this.address_up.street =newValue;
        },
         'address.postcode':function(newValue){
            this.address_up.postcode =newValue;
        },
         'address.house_number':function(newValue){
            this.address_up.house_number =newValue;
        },
         
    }
}
</script>
<style>
@import url("./styles.css");
    .form-card-address{
        display: flex;
        justify-content: space-around;
    }
</style>
