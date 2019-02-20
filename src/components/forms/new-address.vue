<template>
<div class="container__music">
    <div class="col-music">
        <!-- <UserAvatar :propImageUrl="user_profile" /> -->
    </div>
     <div class="col-music">
            <div class="form-upload">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Registre su dirección de domicilio. </h2>
                        <div class="container-error">
                         <div class="alert alert-danger" role="alert" v-if="error.error">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong>Oh snap! </strong> {{error.message}}
                        </div>
                         <div class="alert alert-success" role="alert" v-if="success.success">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong></strong> {{success.message}}
                        </div>
                        </div>
                  </header>
                  <div class="card-body dontent-address">
                    <form class="form-horizontal">
                      <div class="form-group is-empty">
                        <label for="name" class="col-md-2 control-label">país <span class="required">*</span></label>
                        <div class="col-md-10">
                            <select class="form-control" v-on:change="handlSelectCountry">
                                    <option :value="country_select.code">{{ country_select.name || 'Selecciones su país'}}</option>
                                    <option v-for="country in countries"  :key="country._id" :value="country.code">
                                        {{country.name}}
                                    </option>
                            </select>
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="inputEmail" class="col-md-2 control-label">ciudad <span class="required">*</span></label>
                        <div class="col-md-10">
                         <select class="form-control" v-on:change="handlSelectSities">
                             <option v-if="city_select">{{ city_select}}</option>
                                    <option v-for="city in cities"  :key="city._id" :value="city._id">
                                        {{city.name}}
                                    </option>
                            </select>
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="inputPassword" class="col-md-2 control-label">Calle <span class="required">*</span></label>
                        <div class="col-md-10">
                          <input type="text" class="form-control"  placeholder="cual es su calle?" v-model="address.street">
                        </div>
                      </div>
                    <div class="form-card-address">
                        <div class="form-group">
                        <label for="inputPassword" class="col-md-2 control-label">numero de casa <span class="required">*</span></label>
                        <div class="col-md-5">
                          <input type="text" class="form-control"  placeholder="#102" v-model="address.house_number">
                        </div>
                      </div>
                      <div class="form-group ">
                        <label for="inputPassword" class="col-md-2 control-label">codigo postal</label>
                        <div class="col-md-5">
                          <input type="text" class="form-control"  placeholder="0000" v-model="address.postcode">
                        </div>
                      </div>
                        
                    </div>
                        <div class="card-footer text-right">
                    <button class="btn btn-primary btn-sm" v-on:click.prevent="sendAdrress">Guardar </button>
                  </div>
                    </form>
                  </div>
                  
         
              </div>
            </div>
    </div>
    <!-- <LimitUpladMusic> </LimitUpladMusic> -->
</div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
    const {EventBus} =require('@/eventbus');
    import LimitUpladMusic from './limit-upload-music.vue';

    import { setInterval, setImmediate, setTimeout } from 'timers';
export default {
    name: 'avatar',
    components:{
        LimitUpladMusic,
        
    },
    data(){
        return{
           
            user_data: undefined,
            country_select: {
                code: undefined,
                name: undefined
            },
        
            city_select: undefined,
            btnDisabled: true,
            countries: [],
            cities: [],
            address:{
                country: undefined,
                city: undefined,
                street: undefined,
                house_number: undefined,
                postcode: undefined,
            },
            
            success: {
                success: false,
                message: undefined,
            },
            btn_upload:true,
            error: {
                error: false,
                message: ''
            },
            user: {},
        }
    },
    methods:{
        
   
  
    handlSelectCountry(ev){
        let code =ev.target.value;
       this.city_select=undefined;
        let country=this.countries.filter(function(country){
            return  country.code ==code;
        });    
        this.getCities(code);
        this.address.country=country[0]._id;
    },
    handlSelectSities(ev){
         let id =ev.target.value;
       this.city_select=undefined;
        let city=this.cities.filter(function(country){
            return  country._id ==id;
        })
        this.address.city=city[0]._id;
        console.log( this.address)
       
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
               self.address.city= self.cities[0]._id;
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
          if(this.address.country==undefined){
              this.error.error=true;
              this.error.message=`Error, debe seleccionar el país  donde vive.`;
              return false;
          }
          if(this.address.city==undefined){
              this.error.error=true;
              this.error.message=`Error, debe seleccionar la ciudad  donde vive. `;
              return false;
          }

          if(this.address.street==undefined || !this.address.street.length>0){
              this.error.error=true;
              this.error.message=`Error, debe ingresar la calle  donde vive.`;
              return false;
          }
           if(this.address.house_number==undefined || !this.address.house_number.length>0){
              this.error.error=true;
              this.error.message=`Error, debe ingresar el número de  casa  donde vive.`;
              return false;
          }

        return true;
        },

        activeBtnbtnDisabled(){
            
            this.btnDisabled=true;
            if(this.address_complete()){
                this.btnDisabled=false;
            }
                
            
        },
       
    
        sendAdrress(){
            if(!this.address_complete()){
                console.log("Error data no completada")
                return ;
            }
         let self=this;
             axios.post(`${SERVER_URI}/api/address?token=${this.user_data.token}`,this.address
            )
             .then(function (req) {
            let address =req.data.address;
                if(!address.error){
                    self.success.success=true;
                    self.success.message=`La dirección fue guardada.`;
                    setTimeout(function(){
                       self.$router.go();
                    },1000);
                    self.setDisabledAll("dontent-address");
                }
              
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });
        },
            setDisabledAll(_class_content){
                let inputs=document.querySelectorAll(`.${_class_content } input`);
                for(let i in inputs){
                    inputs[i].disabled=true;
                }
            },
          getAddressByUserId(){
            let self=this;
             axios.get(`${SERVER_URI}/api/address?token=${this.user_data.token}`)
             .then(function (req) {
                let address =req.data.address;
                if(address.length>0){
                    //update address
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
         this.getContry();
         this.getAddressByUserId();  
        
            
    },

    watch:{
        'address.country':function(newValue){
            this.error.error=false;
        },
        'address.city':function(newValue){
            this.error.error=false;
        },
        'address.street':function(newValue){
            this.error.error=false;
        },
         'address.postcode':function(newValue){
           this.error.error=false;
        },
         'address.house_number':function(newValue){
           this.error.error=false;
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
