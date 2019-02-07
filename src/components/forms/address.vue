<template>
<div class="container__music">
    <div class="col-music">
        <!-- <UserAvatar :propImageUrl="user_profile" /> -->
    </div>
     <div class="col-music">
            <div class="form-upload">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Informacion de la cancion</h2>
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
                  <div class="card-body">
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
                    <div class="form-card-address col-md-12">
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
                    <button class="btn btn-primary btn-sm" v-on:click.prevent="updateAddress">Guardar </button>
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

    import { setInterval, setImmediate } from 'timers';
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
            user_profile : undefined,
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
  
    handlSelectCountry(ev){
        let code =ev.target.value;
       this.city_select=undefined;
        this.getCities(code);
        let country=this.countries.filter(function(country){
            return  country.code ==code;
        })

       this.address.country = country[0];
    },
    handlSelectSities(ev){
         let id =ev.target.value;
       this.city_select=undefined;
       
        let city=this.cities.filter(function(country){
            return  country._id ==id;
        })
        console.log("country ",this.address)
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
    
  getSelect(ev){
      console.log(ev) 
    
    },
   handlSelectGenrens(country_select){
         this.genres_label=false; 
         this.music.genre =ev.target.value;
   },
    
       async   getUserPublicById(userId){
            let self = this
           await axios.get(`${SERVER_URI}/api/public/user/${userId}`).
            then(function(req){
                let _user =req.data.user;
                if(_user.length>0){
                    self.user =_user[0];
                    self.user_profile =`${SERVER_URI}/api/files/image/${_user[0].profile_picture}`; //image 
                  //  self.user.birth_date = self.changeDate(self.user.birth_date);
                    if(String(self.user.gender).toLowerCase()==='male'){
                        self.gender.male=true;
                    }
                     if(String(self.user.gender).toLowerCase()==='female'){
                        self.gender.female=true;
                    }
                }
                
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        },
    
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
     updateMusicUpload(){
  
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

        activeBtnbtnDisabled(){
            
            this.btnDisabled=true;
            if(this.address_complete()){
                this.btnDisabled=false;
            }
                
            
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
             axios.put(`${SERVER_URI}/api/address?token=${this.user_data.token}`,this.address
            )
             .then(function (req) {
            let address =req.data.address;
                self.success.success=true;
                self.success.message=`Su dirección fue guardada`;
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });
        },
        sendAdrress(){
         let self=this;
             axios.post(`${SERVER_URI}/api/address?token=${this.user_data.token}`,this.address
            )
             .then(function (req) {
            let address =req.data.address;
            
              
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
                 if(req.data.address!=undefined){
                     self.address =req.data.address;
                     self.city_select =  self.address.city.name;
                     self.country_select.name=  self.address.country.name;
                     self.country_select.code=  self.address.country.code;
                     self.getCities(self.address.country.code);
                     console.log("cadress", self.city_select)
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
          this.getContry();
            
    },

    watch:{
        'music.title':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.tags':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.genre':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.file':function(){
        this.error.error=false;
        this.success.success=false;
        },
        'music.description':function(){
        this.error.error=false;
        this.success.success=false;
        },
        'music.file_name':function(){
        this.error.error=false;
        this.success.success=false;
        }
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
