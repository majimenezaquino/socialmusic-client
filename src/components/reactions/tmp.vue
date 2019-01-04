<template>
<button  v-on:click.prevent="sendReactions">
    <i :class="userReacted(user_active)"></i> 
    <span>{{parseInt(music.reactiones +addreaction)}}</span>
</button>

</template>
<script>
    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const {EventBus} =require('@/eventbus');
    const axios =require('axios')

export default {
    name: 'emotion',
    props:{
        music_id: {
            type: String,
            required: true,
        }
        ,
         reactiones: {
            type: Number,
            required: true,
        }
    },
    data(){
        return{
            user_data:[],
            addreaction:0,
            reaction_id: undefined,
            emotion_id: undefined,
            showcontent: false,
            user_reacted: false,
            user_active: false
        }
    },
    mounted(){
       // this.redirectUserLogin();
       // this.getReactionsByUSer(music_id);
    },
    methods:{
        sendReactions(){
            if(!this.user_reacted){
                this.addREactionByUser();
                 self.addreaction =1; 
                 self.user_active =true;
            }else{
            this.disabledReactionsbyUser(this.emotion_id);
            console.log("el usuario tiene registro ===> ",this.emotion_id)
            }
            
        },
        addREactionByUser(){
            let self =this;
            let music_id =music_id;
           axios.post(`${SERVER_URI}/api/reaction?token=${this.user_data.token}`,{
               music_id,
               type_reaction: 'like'
            }).then(data=>{
                if(!data.data.error){
                    self.user_active=true;
                    self.user_reacted=true;
                    self.addreaction =1; 
                    self.emotion_id =data.data.reaction._id;
                }
                
            }).catch(err=>{
             console.log("reactions err ",err)
            }) ;
        },
          disabledReactionsbyUser(id){
            let self =this;
            let music_id =music_id;
           axios.put(`${SERVER_URI}/api/reaction/${id}?token=${this.user_data.token}`)
           .then(data=>{
                if(!data.data.error){
                    if(data.data.reaction.status=='active'){
                       self.addreaction ++; 
                       self.user_active =true; 
                    }else{
                     self.user_active =false; 
                       self.addreaction --;  
                    }
                
                    
                }
                
            }).catch(err=>{
             console.log("reactions err ",err)
            }) ;
        },
       getReactionsByUSer(music_id){
           let self=this;
            axios.get(`${SERVER_URI}/api/reaction/${music_id}?token=${this.user_data.token}`).then(req=>{
                if(req.data.reactions.length){
                    self.user_reacted =true;
                    self.user_active=true;
                    self.emotion_id =req.data.reactions[0]._id;
                }
                
            })
             
        },
        userReacted(status=false){
            if(!status)
            return  'fa fa-heart-o ';
            else 
            return 'fa fa-heart user-reacted';
        },
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    } 
    }
}
</script>

<style>
 .card-reaction{
     margin: 0px;
     width: 100%;
     margin: 0px;
     position: relative;
 }
.card-reaction .content  {
          display: flex;
          justify-content: space-around;
 }
 .card-reaction .content button{
     border: none;
     background: transparent;
     display: flex;
     justify-content: space-around;
     align-items: center;
     width: 35px;
     height: 30px;
    font-size: 20px;
    color: #363636;
    padding: 0px;
 }
  .card-reaction .content button i{
      display: block;
  }
  .card-reaction .content button span{
      font-size: 9px;
      display: block;
     font-weight: 100;
     color: #363636;
  }
  .card-reaction .content button:hover i{
      transform: scale(1.2);
  }
  .option-content{
      position: absolute;
      width: 100%;
      background: #587;
      z-index: 10;
      bottom: 30px;
      min-height: 200px;
  }
  .user-reacted{
      color: red !important;
  }
</style>
