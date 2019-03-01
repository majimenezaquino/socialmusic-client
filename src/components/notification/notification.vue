<template>
    <ul class="dropdown-menu dropdown-lg-menu dropdown-menu-right dropdown-alt">
								<li class="dropdown-menu-header">
									<ul class="card-actions icons  left-top">
										<li class="withoutripple">
											<a href="javascript:void(0)" class="withoutripple">
												<i class="zmdi zmdi-settings"></i>
											</a>
										</li>
									</ul>
									<h5>NOTIFICATIONS</h5>
									<ul class="card-actions icons right-top">
										<li>
											<a href="javascript:void(0)">
												<i class="zmdi zmdi-check-all"></i>
											</a>
										</li>
									</ul>
								</li>
								<li v-for="(notif ,index) in notification" :key="index">
									<div class="card">
										<button class="pull-right dismiss btn"  data-dismiss="close" v-on:click.prevent="removeNotification(notif._id)">
											<i class="zmdi zmdi-close"  ></i>
										</button>
										<div class="card-body">
											<ul class="list-group ">
												<li class="list-group-item ">
													<span class="pull-left"><img :src="getImage(notif.user_published.profile_picture)" alt="" class="img-circle max-w-40 m-r-10 "></span>
													<div class="list-group-item-body">
														<div class="list-group-item-heading">{{notif.title}}</div>
														<div class="list-group-item-text">{{notif.description}}</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</li>

							
								<li class="dropdown-menu-footer">
									<a href="javascript:void(0)">
										All notifications
									</a>
								</li>
	</ul>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
const dbLocal= new DBLocal(DB_USER_NAME);
const axios = require('axios');
import io from 'socket.io-client';
const socket = io(SERVER_URI);
export default {
    name: 'notification',
    data(){
        return {
            user_data : undefined,
            notification_key: '',
            notification: [],
            on_sockt_user: undefined,
        }
    },
    methods:{
        redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
        this.on_sockt_user = this.user_data.user.id;
    },
        getNotificationByKey(key){
            let _this = this
         axios.get(`${SERVER_URI}/api/notificacion?token=${this.user_data.token}`).
            then(function(req){
             _this.notification=req.data.notificacion;
                
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        },

        removeNotification(notificacion_id){
           
             let _this = this;
         axios.put(`${SERVER_URI}/api/notificacion/${notificacion_id}?token=${this.user_data.token}`).
            then(function(req){

           _this.getNotificationByKey();
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
        },
        getImage(name){
            return `${SERVER_URI}/api/files/image/${name}`; 
        }
    },
    mounted(){
        
        this.redirectUserLogin();
            this.getNotificationByKey();
    let _this =this;
         socket.on('connect', function(data){
     
    });

  
//
    socket.on(this.user_data.user.id, function(data){
        _this.getNotificationByKey();
    });

    }
}
</script>