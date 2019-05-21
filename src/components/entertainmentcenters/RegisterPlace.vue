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
                        <input type="text" class="form-control" placeholder="Nombre">
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
                        <div class="row">
                            <div class=" col-xs-4">
                                <HourComponent />
                            </div>
                          
                            
                            
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
        registerPlaceEntertinmencenter(){
            
        }
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
</style>
