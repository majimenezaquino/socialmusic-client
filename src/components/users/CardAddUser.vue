<template>
      <div class="form-group">
                <label for="eventColor" class="col-md-12 control-label">{{title}} {{user_select.length}}</label>
                <div class="col-md-2">
                  <div class="form-group m-t-5">
                    <ul class="list-group user-group p-l-10">
                      <!-- <li class="list-group-item"
                         v-for="ut in users_temp" :key="ut._id">
                        <img :src="getImageURL(ut.profile_picture)" alt="" class="img-circle max-w-40">
                        <a class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></a>
                      </li> -->
                     
                      <li class="list-group-item card-guests">
                        <a href="javascript:void(0)" class="btn btn-add-gray btn-fab btn-fab-sm m-l-5" v-on:click.prevent="openToggle">
                        <i class="zmdi zmdi-plus"></i>
                    </a> 
                    </li>
                     <div id="popover-guests" v-if="openSearch">
                      <div class="head">
                        <p>Buscar usuarios </p>
                        <a href=""  v-on:click.prevent="openToggle"><i class="zmdi zmdi-close"></i></a>
                      </div>
                      <div class="content">
                        <div class="form-group is-empty m-10 m-b-0">
                          <div class="input-group">
                            <input type="text" class="form-control" id="filter_cal_input" placeholder="Filter Members" v-model="word_seach">
                            <span class="input-group-addon"><i class="zmdi zmdi-search"></i></span>
                          </div>
                        </div>
                        <ul class="list-group filter_cal_list container-guests">  

                          <li class="list-group-item"
                          v-for="u in users" :key="u._id"
                          >
                            <a href=""
                             :class="{'btn-guests': true,'active': isActivet(u._id)}"
                             :name="u._id"
                             v-on:click.prevent="toggleSelectUser"
                            >
                            <img :src="getImageURL(u.profile_picture)" alt="" :name="u._id" class="img-circle max-w-40">
                            <small :name="u._id" >{{u.name}} {{u.last_name}}</small>
                            </a>
                          </li>
                         
                          
                          
                        </ul>
                         <li class="list-group-item"> 
                              <a class="btn btn-default btn-xs" v-on:click.prevent="openToggle">Salir</a>
                              <a class="btn btn-primary  btn-xs" v-on:click.prevent="handlerSaveGuestes" :disabled="!user_select.length">Guardar</a>
                          </li>
                      </div>
                    </div>
                   
                      
                    </ul>
                   
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
    import swal from 'sweetalert';
export default {
    name: 'add-event',
    data(){
        return {
            openSearch: false,
            user_data: undefined,
            word_seach: undefined,
            users: [],
            user_select: [],
            users_temp: []
          
        }
    },
    watch:{
        'word_seach': function(v){
            console.log('tag', v)
            this.handlerGetSearch(v)
        }
    },
    props:{
            title: String,
            limit_user_selec: {
                type: Number,
                default: 10
            },
            callback: Function,
    },
    methods:{
        handlerSaveGuestes(){
            this.callback(this.user_select);
            this.openSearch =!this.openSearch;
        },
        isActivet(id){
            if(this.user_select.includes(id)){
                return true;
            }
            return false;
        },
        openToggle(){
            this.openSearch =!this.openSearch;
        }
        ,handlerColor(ev){
          this.events.color =ev.target.value;
        },
        toggleSelectUser(ev){
            let element =ev.target;
            element.classList.toggle("active")
            if(element.name===undefined ){
              return false; 
            }
            console.log('element.name',element.name)
              if(this.user_select.includes(element.name)){
                  this.user_select=this.user_select.filter(function(id){
                      return id!== element.name;
                  });
                  return false;
              }

            if(this.user_select.length<this.limit_user_selec){
                this.user_select.push(element.name) 
              let _user = this.users.filter(function(user){
                  if(user._id== element.name)
                    return user;
                })[0]
               
                 this.users_temp.push(_user);
                 if(this.users_temp.length>3){
                    this.users_temp =this.users_temp.filter(function(user,index){
                        return index<3

                    }) 
                 }
                
            }else{
                 swal({
                      text: "Ya alcánzate el límite de colaboradores para esa música.",
                      icon: "error",
                      button: "ok",
                    });
               return false;
            }
            console.log(this.user_select)
        },
          redirectUserLogin(){
            if(dbLocal.checkDataLocalStorageOBject())
            this.user_data  =dbLocal.getDataLocalStorageOBject();
            },
            getFallowerByUser(){
                let _this = this;
                axios.get(`${SERVER_URI}/api/followers?token=${this.user_data.token}`).
                then(function(req){
                 _this.users  =  req.data.followers.map(function(u){
                     return u.user_follower
                 });
                            
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },
            handlerGetSearch(){
                this.searchUser(this.word_seach)
            },
            searchUser(word){
                let _this = this;
                axios.get(`${SERVER_URI}/api/search/${word}?token=${this.user_data.token}`).
                then(function(req){
                 _this.users= req.data.users;  
                //_this.user_select =[];
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },
              getImageURL(image_name){
              if(image_name===undefined){
                  return undefined;
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        },

    },
    mounted(){
        this.redirectUserLogin();
        this. getFallowerByUser();
    },
    updated(){
      console.log(this.events)
    }
}
</script>
<style>
    .card-guests{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
   #popover-guests{
    position: absolute;
    z-index: 10!important;
    bottom: 50%;
    transform: translateY(50%);
    left: 100%;
    width:260px;
    border-radius: 5px;
    max-width: 300px;
    box-shadow: 0 5px 10px rgba(175,188,206,.6);
    border: 1px solid rgba(175,188,206,.3);
    background: #fff;
    margin-left: 65px;
}


     

   
    #popover-guests .head{
      background: #EEF5F9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color:#444 !important;
      z-index: 10;
      position: relative;
      padding: 0 10px;
    }
     #popover-guests .head a{
             color: #ec407a !important;
             display: flex;
             justify-content: center;
             align-items: center;
             z-index: 100;
     }
    #popover-guests::after{
        content: "";
         position: absolute;
         left: -20px;
         border: transparent solid 10px;
         top: 50%;
         transform: translateY(-50%);
         border-right: #ccc solid 10px;
    }
  #popover-guests  .list-group-item{
      padding: 5px 20px;
      margin: 3px;
      display: flex;
      align-items: center;
      background: #EEF5F9;
      color: #444;

    }
    .btn-guests{
        color: #444 !important;
        display: flex;
        width: 100%;
        align-items: center;
    }
    .list-group-item a.active{
        background: rgb(32, 148, 242);
        color: #fff !important;
    }
    .btn-guests small{
        display: inline-block;
        padding: 0px 5px;
    }
    .user-group .list-group-item:not(.dropdown):hover img{
        transform: scale(1.1);
    }
    .container-guests{
        max-height: 200px;
        overflow-y: scroll;
        margin: 0px;
    }

    

        .container-guests::-webkit-scrollbar {
    width: 6px;
    background-color: #eeee;
} 
    .container-guests::-webkit-scrollbar-track {
  background: #fff; 
}
 .container-guests::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
</style>