<template>
        <section class="music-upload-music">
                 <div class="col-xs-12 col-sm-12">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Icon prefixes with floating labels</h2>
                    <ul class="card-actions icons right-top">
                      <li>
                        <a href="javascript:void(0)" data-toggle-view="code">
                          <i class="zmdi zmdi-code"></i>
                        </a>
                      </li>
                    </ul>
                  </header>
                  <div class="card-body">
                        <div class="form-group is-empty">
                        <div class="input-group">
                          <input type="file" class="form-control" placeholder="File Upload..." multiple>
                          <div class="input-group">
                            <input type="text" readonly="" class="form-control" placeholder="Upload one or more files...">
                            <span class="input-group-btn input-group-sm">
                              <button type="button" class="btn btn-primary btn-fab btn-fab-sm">
                                <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>

                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
                        <label class="control-label">Titulo de la cancions</label>
                        <input type="text" class="form-control">
                      </div>
                    </div>
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-email"></i></span>
                        <label class="control-label">Descripcion de la cancion. </label>
                        <input type="email" class="form-control">
                      </div>
                    </div>
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-phone"></i></span>
                        <label class="control-label">Phone Number</label>
                        <input type="text" class="form-control">
                      </div>
                    </div>
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-pin"></i></span>
                        <label class="control-label">Home Address</label>
                        <input type="text" class="form-control">
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-right">
                    <button class="btn btn-info btn-flat">Cancel</button>
                    <button class="btn btn-info">Submit</button>
                  </div>
                </div>
              </div>
        </section>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index');
const {VPersons} =require('@/helpers/validate-persons');
const {DBLocal} =require('@/services/data_local');
const {EventBus} =require('@/eventbus');
import UserAvatar from './userImage.vue';
import { setTimeout } from 'timers';
const dbLocal= new DBLocal(DB_USER_NAME);
const VP= new VPersons();
const axios = require('axios');

export default {
    name: 'user-form',
    data(){
        return{
            user_data: undefined,
            hiddenSave: true,
            user_profile : undefined,
            req_surcess:false,
            surcess_message:'',
            btn_upload:true,
            show_error: {
                error: false,
                message: ''
            },
            user: {
                name: undefined,
               last_name: undefined,
               birth_date: undefined,
               phone: undefined,
               gender: undefined,
            },
            gender:{
                male: false,
                female: false,
            }
        }
    },
    watch: {
    

    },
    components:{
        UserAvatar
    },
    methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
         
    },
    
    mounted(){
        this.redirectUserLogin();
         let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
        
    },
  
}
</script>
<style>
.music-upload-music{
    width: 100%;
    min-height: 400px;
    max-width: 600px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.music-upload-music .thumbnail {
    border: none;
    margin: 0px;
    width: 300px;
    height: auto;
}
.content-form{
    width: 350px;
    background: #eee;
    height: 300px;
}
</style>


