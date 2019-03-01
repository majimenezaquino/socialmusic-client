<template>
<li class="dropdown hidden-xs hidden-sm">
							<a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false" :class="'btn-notification '+active">
								<span>
									<i class="fa fa-bell" aria-hidden="true"></i>
								</span>
							</a>
    <ul class="dropdown-menu dropdown-lg-menu dropdown-menu-right dropdown-alt">
								<li class="dropdown-menu-header">
									<ul class="card-actions icons  left-top">
										<li class="withoutripple">
											<a href="javascript:void(0)" class="withoutripple" >
												<i class="zmdi zmdi-settings"></i>
											</a>
										</li>
									</ul>
									<h5>NOTIFICATIONS</h5>
									<ul class="card-actions icons right-top">
										<li>
											<a href="javascript:void(0)" v-on:click.prevent="checkNotigication">
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
													<span :class="'pull-left boder-img '+ viewed(notif.status)"><img :src="getImage(notif.user_published.profile_picture)" alt="" class="img-circle max-w-40 m-r-10 "></span>
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
    </li>
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
            active: '',
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
    checkNotigication(){
        this.viewedNotification();
    },
   
            viewed(status){
                if(status=='pending'){
                    return 'viewed'
                }
                return '';
            },
        getNotificationByKey(key){
            let _this = this
         axios.get(`${SERVER_URI}/api/notificacion?token=${this.user_data.token}`).
            then(function(req){
             _this.notification=req.data.notificacion;
                if(_this.notification.length>0)
            
                for(let i in _this.notification){
                    if(_this.notification[i].status=='pending'){
                         _this.active='notification_active';
                    }
                }
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        },

        removeNotification(notificacion_id){
           
             let _this = this;
         axios.put(`${SERVER_URI}/api/notificacion/${notificacion_id}?token=${this.user_data.token}`).
            then(function(req){
             
              
            let tmp_notification =_this.notification.filter(function(notification){
                return notification._id != notificacion_id;
            });
             _this.notification=tmp_notification;
                    
            
    
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
        },

             viewedNotification(){
        
           let _this =this;
           let tmp_notification =_this.notification.filter(function(notification){
                return notification.status!='viewed';
            });


           tmp_notification =tmp_notification.map(function(notification){
                return { _id: notification._id}
            });
          
                
         axios.put(`${SERVER_URI}/api/notificacionview?token=${this.user_data.token}`,{notification:tmp_notification}).
            then(function(req){
                let notificacion =req.data.notification;
                if( notificacion.length>0){

                }
                _this.active ='';
            }).catch(function(err){
               
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
<style>
    .btn-notification{
	display: flex !important;
	justify-content: center;
	align-items: center;
	padding: 0px  10px !important;
	position: relative;
	
}
.btn-notification>span{
display: flex;
width: 36px;
height: 36px;
justify-content: center;
align-items: center;
border: #ccc solid 4px;
border-radius: 50%;
}
.btn-notification span i{
font-size: 18px !important;
}
.notification_active span{
	color: #ff1744;
}
.notification_active span i{
 transform-origin: top center;
 animation: example 1s infinite;
}
@keyframes example {
  0%   {transform: rotate(15deg);}
  50%  {transform: rotate(-15deg);} 
}
.boder-img img {
    border: #fff solid 2px;
}
.viewed img {
    border: #ff1744 solid 2px;
}
</style>
