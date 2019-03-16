<template>
<article 
:class="{ 'user-dedicate': true, 'user_dedicate_select': active }"
v-if="!hiddenUser"
>
    <a href="" class="user-conent" v-on:click.prevent="selectUserDedicate(follower._id)" >
    <div class="thumbnail">
    
        <img v-if="follower.profile_picture!=undefined" 
        :src="getImagePlaylist(follower.profile_picture)"
         :alt="follower.name" >
    </div>
   
    <div class="info">
        <h1>{{follower.name}} {{follower.last_name}}</h1>
    </div>
    </a>
    <a href="" class="close-user" v-on:click.prevent="handlerHiddenUser"><i class="fa fa-times" aria-hidden="true"></i></a>
    </article>
</template>
<script>
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
export default {
name: 'user-dedicate',
props:{
    follower: Object,
toggle: {
    type: Function,
    required: false
}
},
data(){
    return{
        class_active: '',
        active: false,
        user_id: undefined,
        hiddenUser: false,
        
    }
},
methods:{
    selectUserDedicate(ev){
  
        this.active=!this.active;
    
      let  user ={
            id: this.user_id,
            status: this.active,
        }
        this.toggle(user);
    },
    handlerHiddenUser(){
        this.hiddenUser=true;
         this.active=false;
    
      let  user ={
            id: this.user_id,
            status: this.active,
        }
        this.toggle(user);
    },
     getImagePlaylist(image_name){
      
              if(image_name===undefined){
                  return 'miaga'
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
},mounted(){
this.user_id=this.follower._id; //get by props
}
    
}
</script>
<style>
        .user-dedicate{
            display: flex;
                align-items: center;

              border-radius: 5px;
                position: relative;
                border: #eee solid 1px;
                margin-bottom: 10px;
    }
   .user-dedicate    .user-conent{
                display: flex;
                align-items: center;
                
                border-radius: 5px;
     }
     .user-dedicate:hover{
         background: #eee;
     }
     .user-dedicate .thumbnail{
         margin: 5px;
         border: none;
         width: 40px;
         height: 40px;
         padding: 0px;
         position: relative;
         border-radius: 50%;
         background-size: cover;
         border: #eee 3px solid;
         display: flex;
         justify-content: center;
         align-items: center;
         overflow: hidden;
     }
     
      .user-dedicate .close-user{
          display: flex;
          position: absolute;
          justify-content: center;
          align-items: center;
        right: 20px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      .user-dedicate:hover .close-user{
          background: #ccc;
         
      }
      .user-dedicate h1{
          display: inline-block;
          font-size: 15px;
          color: #444;
          padding-bottom: 5px;
     
      }
      .user_dedicate_select{
          background: rgb(33, 150, 243) !important;
          color:#fff;
      }
       .user_dedicate_select h1{
           color:#fff !important;
       }
</style>