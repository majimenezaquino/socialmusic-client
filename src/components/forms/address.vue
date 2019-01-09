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
                        <label for="name" class="col-md-2 control-label">Elija su país</label>
                        <div class="col-md-10">
                            <Countries />
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="inputEmail" class="col-md-2 control-label">Email</label>
                        <div class="col-md-10">
                          <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="inputPassword" class="col-md-2 control-label">Password</label>
                        <div class="col-md-10">
                          <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="disabledinput" class="col-sm-2 control-label">Disabled Input</label>
                        <div class="col-sm-10">
                          <input disabled="" type="text" class="form-control" id="disabledinput" placeholder="Disabled Input">
                        </div>
                      </div>
                      <div class="form-group is-empty">
                        <label for="textArea" class="col-md-2 control-label">Textarea</label>
                        <div class="col-md-10">
                          <textarea class="form-control" rows="3" id="textArea"></textarea>
                          <span class="help-block">A longer block of help text that breaks onto a new line and may extend beyond one line.</span>
                        </div>
                      </div>
                      <div class="card-footer text-center">
                    <button class="btn btn-primary btn-sm" v-on:click.prevent="saveUpdate" :disabled="btn_upload">Guardar </button>
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
import { setTimeout } from 'timers';
const dbLocal= new DBLocal(DB_USER_NAME);
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
            user: {},
           
        }
    },
    components:{
        Countries
    },
    methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject());
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
</style>


