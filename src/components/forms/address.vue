<template>
      <div class="card-user user-info-update">
                  <div class="card-body">

                        <div class="container-error">
                         <div class="alert alert-danger" role="alert" v-if="show_error.error">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong>Oh snap! </strong> {{show_error.message}}
                        </div>
                         <div class="alert alert-success" role="alert" v-if="req_surcess">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong></strong> {{surcess_message}}
                        </div>
                        </div>
                
                <div class="col-xs-12 col-sm-12">
                <div class="card p-b-20">
                  <header class="card-heading ">
                    <h2 class="card-title">Informacion de su direccion</h2>
                    <ul class="card-actions icons right-top">
                      <li>
                        <a href="javascript:void(0)" data-toggle-view="code">
                          <i class="zmdi zmdi-code"></i>
                        </a>
                      </li>
                    </ul>
                  </header>
                  <div class="card-body">
                    <form class="form-horizontal">
                      <div class="form-group is-empty">
                        <label for="name" class="col-md-2 control-label">país <span class="required">*</span></label>
                        <div class="col-md-10">
                            <Countries :country="address.country"/>
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="inputEmail" class="col-md-2 control-label">ciudad <span class="required">*</span></label>
                        <div class="col-md-10">
                         <Cities />
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="inputPassword" class="col-md-2 control-label">Calle <span class="required">*</span></label>
                        <div class="col-md-10">
                          <input type="text" class="form-control"  placeholder="cual es su calle?" v-model="address.street">
                        </div>
                      </div>
                    <div class="form-card-address col-md-10">
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
                      <div class="">
                    <button class="btn btn-primary btn-sm" :disabled="btnDisabled" v-on:click.prevent="sendData">Guardar </button>
                  </div>
                    </form>
                  </div>
                </div>
        </div>
                
                  
            </div>
      </div>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index');
const {DBLocal} =require('@/services/data_local');
const {EventBus} =require('@/eventbus');
import Countries from './componentCountries.vue';
import Cities from './componentCities.vue';
import { setTimeout } from 'timers';
const dbLocal= new DBLocal(DB_USER_NAME);
const axios = require('axios');

export default {
    name: 'user-form',
    data(){
        return{
            user_data: undefined,
            btnDisabled: true,
            address:{
                country: undefined,
                city: undefined,
                street: undefined,
                house_number: undefined,
                postcode: undefined,
            },
            user_profile : undefined,
            req_surcess:false,
            surcess_message:'',
            btn_upload:true,
            show_error: {
                error: false,
                message: ''
            },
            user: {},
           
        }
    },
    components:{
        Countries,
        Cities
    },
    methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject());
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
                EventBus.$emit("send_upload",true);
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
                 }
        
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });

        }
 
    },
    watch: {
    // whenever question changes, this function will run
   'address.street': function (newQuestion, oldQuestion) {
    this.activeBtnbtnDisabled();
    },
    'address.country': function (newQuestion, oldQuestion) {
    this.activeBtnbtnDisabled();

    },
    'address.city': function (newQuestion, oldQuestion) {
    this.activeBtnbtnDisabled();
    },
    'address.house_number': function (newQuestion, oldQuestion) {
    this.activeBtnbtnDisabled();
    },
     'address.postcode': function (newQuestion, oldQuestion) {
    this.activeBtnbtnDisabled();
    }
  },
    mounted(){
        this.redirectUserLogin();
         let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
         this.getAddressByUserId();
    
      let self=this;
        EventBus.$on("country_code",function(data){
           self.address.country =data._id
        })

        EventBus.$on("city_id",function(data){
           self.address.city =data
        })
        
    },
    
  
}
</script>
<style>
.card-user{
    max-width: 800px;
    margin: 0px auto;
    background: #fff;
}
    .group-card-user{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
   .group-card-user .form-group{
       flex-grow: 1;
    }
    .gropu-image{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .container-error{
        width: 100%;
        height: 30px;
    }
    .oardio input{
        border: #363636 solid 1px !important;
    }
    .form-card-address{
        display: flex;
        justify-content: space-between;
    }
    .required{
        color: red;
    }
</style>


