<template>
<div class="btn_compoment">
    <button  v-on:click.prevent="sendReactions" class="component-btn">
    <i :class="userReatedChangeClass(user_active)"></i> 
    <span>{{parseInt(reactiones + addreaction)}}</span>
</button>

</div>
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
        this.redirectUserLogin();
        this.getReactionsByUSer(this.music_id);
    },
    methods:{
    userReatedChangeClass(status=false){
        if(!status)
        return  'fa fa-heart-o ';
        else 
        return 'fa fa-heart user-reacted';
    },
sendReactions(){
    if(!this.user_reacted){
        this.addREactionByUser();
    }else{
    this.disabledReactionsbyUser(this.emotion_id);
    console.log("el usuario tiene registro ===> ",this.emotion_id);
    }
    
},
    getReactionsByUSer(music_id){
    let self=this;
    axios.get(`${SERVER_URI}/api/reaction/${music_id}?token=${this.user_data.token}`)
    .then(req=>{
       
        if(req.data.reactions.length>0){
              self.user_reacted =true;
             self.emotion_id =req.data.reactions[0]._id;
         if(req.data.reactions[0].status=='active'){
            self.user_active=true;
            self.addreaction =0; 
             }
        }
    });
    },
addREactionByUser(){
    let self =this;
    let music_id =this.music_id;
    axios.post(`${SERVER_URI}/api/reaction?token=${this.user_data.token}`,{
        music_id,
        type_reaction: 'like'
    }).then(data=>{
        if(!data.data.error){
            console.log("usuario registrado con id =",data.data.reaction._id)
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
            console.log("status field",data.data.reaction.status)
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
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    } 
       
    }
}
</script>
<style>

</style>
