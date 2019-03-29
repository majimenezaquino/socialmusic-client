<template>
    <section>
<div class="modal fade" id="create_musician" tabindex="-1" role="dialog" aria-labelledby="create_musician">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="card m-0">
            <header class="card-heading p-b-20">
                <h4 class="card-title">Registrarme como creador de contenido musical. </h4>
                <div class="card-search">
                    <div class="form-group is-empty">
                        <a href="javascript:void(0)" class="close-search" data-card-search="close" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back"> <i class="zmdi zmdi-arrow-left"></i></a>
                        <input type="text" placeholder="Search and press enter..." class="form-control" autocomplete="off">
                        <a href="javascript:void(0)" class="clear-search" data-card-search="clear" data-toggle="tooltip" data-placement="top" title="" data-original-title="Clear search"><i class="zmdi zmdi-close-circle"></i></a>
                    </div>
                </div>
                <ul class="card-actions icons right-top">
                    <li>
                        <a href="javascript:void(0)" data-card-search="open">
                            <i class="zmdi zmdi-search"></i>
                        </a>
                    </li>
                  
                    <li>
                        <a href="javascript:void(0)" data-dismiss="modal" aria-label="Close">
                            <i class="zmdi zmdi-close"></i>
                        </a>
                    </li>
                </ul>
            </header>
        </div>
        <div class="modal-body">
            <div class="container-item-musician">
                <div class="item-musician"
                   
                    v-for=" musc in musician"
                    :key="musc._id"
                    >
                        <button class="musician"
                        :value="musc._id"
                        v-on:click.prevent="toggleSelectMusician"
                        >
                           <span>{{musc.name}}</span>
                            <i :class="musc.icon"></i>
                         </button>
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
 const axios = require('axios');
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
     import swal from 'sweetalert';

export default {
    name :'create-musician',
    data(){
        return {
             user_data: undefined,
             musician: [],
             musician_select: []
        }
    },
    methods:{
         redirectUserLogin(){
            if(dbLocal.checkDataLocalStorageOBject())
            this.user_data  =dbLocal.getDataLocalStorageOBject();
            },
            getMusicians(){
                let _this = this;
                axios.get(`${SERVER_URI}/api/musician?token=${this.user_data.token}`).
                then(function(req){
                    _this.musician =req.data.musicians;
                console.log("musician", req);
                                
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },

            toggleSelectMusician(ev){
                let button =ev.target;
                try {
                   
                        button.classList.toggle("active");
                        let isactice=button.className.split(" ")
                        
                        if(isactice.includes('active')){
                            if(this.musician_select.length<=3){
                                this.musician_select.push(button.name);
                            }else{
                    swal({
                      text: `Por el momento solo puede agregar un máximo de 3 profesiones  `,
                      icon: "success",
                      button: "ok",
                    }).then((value) => {
                      //self.openPlaylist=false;
                    })
                            }
                           
                        }
                    
                } catch (error) {
                    
                }
                
            }

    }
    ,
    mounted(){
        this.redirectUserLogin();
        this.getMusicians();
    }
}
</script>

<style>
    .container-item-musician{
        width:100%;
        display:flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        margin: 10px;
    }
    .item-musician{
        width: 130px;
        height: 130px;
          margin-bottom: 10px;
    }
    .container-item-musician .musician{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: #ccc solid 1px;
        padding: 10px;
      height: 100%;
        width: 100%;
         color: #444;
       
      
    }
     .container-item-musician .musician span{
         font-size: 14px;
        
         line-height: 15px;
         display: flex;
         justify-content: center;
         padding-bottom: 10px;
     }
     .container-item-musician .musician i{
         display: flex;
         justify-content: center;
         font-size: 30px;
        

     }
     .container-item-musician button.active{
         background: rgb(33, 150, 243);
         color: #fff;
     }
</style>