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
							
                             

                                  <li :class="'card-notification '+viewed(notif.status)" v-for="(notif ,index) in notification" :key="index">
                                    <button class="close-notication" v-on:click.prevent="removeNotification(notif._id)">
                                        <i class="zmdi zmdi-close"></i></button>
                                   <div class="notification-body">
                                         <div :class="'thumbnail '">
                                        <a :href="'/profile/'+notif.user_published._id" class="profile">
                                            <img :src="getImage(notif.user_published.profile_picture)" alt=""/>
                                        </a>
                                     </div>
                                        
                                    
                                    <div class="content-info">
                                       <p> <span class="name"><a :href="'/profile/'+notif.user_published._id" class="profile">{{notif.user_published.name}}</a></span>
        
                                        <a :href="'/music/'+notif.user_published._id" class="profile">
                                          {{notif.title}} {{notif.description}}
                                        </a>
                                        </p>
                                        <div class="info-fotter">
                                            <span class="icon"><i class="fa fa-music"></i></span>
                                            <span> {{ changeTimeTodate(notif.date_create)}}</span>
                                        </div>  
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
 const moment = require('moment');
 moment.locale('es')
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
        changeTimeTodate(time){
         
          return   moment(time,"YYYYMMDD").fromNow();

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
                let tmp_notification;
                if( notificacion.length>0){
                    for(let i in notificacion){
                    tmp_notification =   _this.notification.map(function(notifi){
                        if(notifi._id==notificacion[i]._id){
                             notifi.status=notificacion[i];
                        }
                        return notifi;
                    });
                }
                _this.notification=tmp_notification;
                console.log( _this.notification);
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
.card-notification{
    position: relative;
    width: 100%;
    padding: 0px 5px;
     background: #fff;
     border-bottom: #eee solid 1px;
}
.card-notification .notification-body{
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
   
  
}
.card-notification .profile{
    display: inline !important;
    padding: 0px !important;
    font-size: 13px !important;
    line-height: 14px !important;
    font-weight: 900 !important;

}
.card-notification .thumbnail{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    padding: 0px;
    margin: 0px;
    border: #eee solid 4px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    background: #eee;
}
.card-notification .thumbnail img{
width: 100% !important;
height: 100%;
}
.close-notication{
      position: absolute ;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    top: 5px ;
    right: 10px;
    background: #fff;
    border: none;
    color: #607188;
    background: transparent;
    z-index: 1;
    font-size: 12px;
    font-weight: 100;
 
}
.content-info{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 100px;
    flex-grow: 1;
    padding: 0px 10px;
}
.content-info p{
    font-size: 12px;
    font-weight: 300;
    line-height: 14px;
    margin: 0px;
    padding-top: 10px;

}
.info-fotter{
    width: 100%;
    display: flex;
    justify-content: start;
}
.info-fotter span{
    display: flex;
    justify-items: center;
    font-size: 10px;
    line-height: 11px;
    margin-top: 5px;
}
.info-fotter span:last-child{
margin: 5px;
}
.viewed .thumbnail{
    border: #ff1744 solid 4px;
}
</style>
