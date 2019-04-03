<template>
<div class="card type--profile">
        <header class="card-heading">
.                <img :src="userPublic.profile_picture" alt="" class="img-circle"/>
                <ul class="card-actions icons right-top">
                    <li class="dropdown">
                        <a href="javascript:void(0)" data-toggle="dropdown">
                            <i class="zmdi zmdi-more-vert"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right btn-primary">
                            <li>
                                <a href="javascript:void(0)">Editar perfil</a>
                            </li>
                        </ul>
                    </li>
                </ul>
        </header>
            <div class="card-body">
                <h5 class="name"><span>{{userPublic.name}}</span> <span>{{userPublic.last_name}}</span></h5>
                <button type="button" class="btn btn-round">Contactar</button>
            </div>
            <footer class="card-footer border-top">
                    <div class="row row p-t-10 p-b-10">
                    <div class="col-xs-4"><span class="count">{{userPublic.songs || 0}}</span><span>Musics</span></div>
                    <div class="col-xs-4"><span class="count">{{userPublic.followers_count}}</span><span>Followers</span></div>
                    <div class="col-xs-4"><span class="count">{{userPublic.followee_count}}</span><span>Following</span></div>
                </div>
            </footer>
    </div>
</template>
<script>
	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
    const axios = require('axios');
    
export default {
    name: 'profile',
    props:{
        user_id: {
            type: String,
            required: false,
        }
    },
    data(){
        return{
            user_data: undefined,
            userPublic: []
        }
    },
    mounted(){
   
        this.redirectUserLogin();
       //  let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
         this.getUserPublicById(this.user_id);
    },
    methods:{
     redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
     
    },
      async   getUserPublicById(userId){
            let self = this
           await axios.get(`${SERVER_URI}/api/public/user/${userId}`).
            then(function(req){
                let _user =req.data.user;
                if(_user.length>0){
                    self.userPublic =_user[0];
                    console.log("USER ===>> ",_user[0])
                }
                
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        },
    }
}

</script>

