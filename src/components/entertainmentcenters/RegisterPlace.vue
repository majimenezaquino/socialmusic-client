<template>
    <section>
<div class="modal fade" id="modal_register_place" tabindex="-1" role="dialog" aria-labelledby="modal_register_place">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="card m-0">
            <header class="card-heading p-b-20">
                <h2 class="card-title">crear centro de diversión </h2>
           
            </header>
        </div>
        <div class="modal-body">
                <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-text-width"></i></span>
                        <input 
                        type="text" class="form-control" placeholder="Nombre"
                         v-validate="'required|alpha'" name="email"
                        >
                        <span>{{ errors.first('email') }}</span>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-microphone"></i></span>
                        <input type="text" class="form-control" placeholder="Dirrecion">
                      </div>
                    </div>
                      <div class="col-xs-12">
                                    <div class="content-location">
                                         <span>Obtener ubicación</span>
                                        <button class="btn-get-location" 
                                        v-on:click.prevent="getIpLocation"> 
                                            <i class="fa fa-map-marker"></i>
                                        </button>
                                    </div>
                            </div>
                        <div class="container-fluid">
                            
                          
<!-- <select class="custom-select" id="inputGroupSelect01">
<option v-for=" day in days" :key="day._id">
{{day.name}}
</option>

</select> -->                       <span>Lunes</span> 
                                    <HourComponent :callback="handleHuorStart" /> -
                                    <HourComponent :callback="handleHuorEnd" />
                                    <input type="checkbox" name="" id="">
                              
                        </div>
                    
                  
                   

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary">Ok</button>
            </div>
        </div>
        <!-- modal-content -->
    </div>
    <!-- modal-dialog -->
</div>
		
    </section>
</template>
<script>

import swal from 'sweetalert';
const moment = require('moment');
const axios = require('axios');
import HourComponent from "./CardHourFrom.vue"
const {SERVER_URI,DB_USER_NAME}=require('@/config/index');
const {DBLocal} =require('@/services/data_local')
const dbLocal= new DBLocal(DB_USER_NAME);
    moment.locale('es')

export default {
    name: 'place-entertainmentcenters',
    data(){
        return {
            user_data: undefined,
            days: undefined,
            place: {
                name: undefined,
                address: undefined,
                longitud: undefined,
                latitud: undefined
            }
        }
    },
    components:{
        HourComponent
    },
    methods: {
        getIpLocation(){
               axios.get(`http://www.geoplugin.net/json.gp`).
            then(function(req){
              
                 let  geoplugin_status = req.data.geoplugin_status || undefined;
                 if(geoplugin_status!=200){
                     return ;
                 }


                console.log("ubicacion", req.data)
            }).catch(function(err){
                console.log(`error--->${err}`)
            });
        }, 
        redirectUserLogin(){
          if(dbLocal.checkDataLocalStorageOBject())
           this.user_data  =dbLocal.getDataLocalStorageOBject();
         },
         getEntertainmentCent(){
        let self=this;
             axios.get(`${SERVER_URI}/api/entertainmentcentersday/es?token=${this.user_data.token}`,
            )
             .then(function (req) {
            //handle success
            
             self.days=req.data.schedules || [];
             console.log(" day now",self.days)
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });
    },
        handleHuorStart(data){
            console.log(data)

        },
         handleHuorEnd(data){
            console.log(data)

        },
        registerPlaceEntertinmencenter(){
            
        }
    },
    mounted(){
        this.redirectUserLogin();
        this.getEntertainmentCent();
    }
}
</script>

<style>
.content-location{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
    .btn-get-location{

    display: flex;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: rgba(32, 148, 242,0.8);
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #fff;
    border: #eee solid 2px;
    font-size: 25px;
    -webkit-box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
    box-shadow: 1px -4px 11px 7px rgba(194,184,194,0.44);
    cursor: pointer;
    }
    .container-set-hours{
        display: flex;
        justify-content: start;
        margin: 0px auto;
    }
</style>
