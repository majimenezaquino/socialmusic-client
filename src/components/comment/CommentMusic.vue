<template>
<div class="container-comment">
    <div class="header-comment">
            <p>{{commentCount}} comentarios <a href="" v-on:click.prevent="toggleComment"> {{message_btn}} <i class="fa fa-eye"></i></a></p>
    </div>
    <div class="card-body" v-if="!show_comment">
        <div class="coment-item" v-for=" comment in comments_bisable" :key="comment._id">
    <div class="tum-user">
      <a :href="'/profile/'+comment.user_commented._id"><img :src="getUrlImage(comment.user_commented.profile_picture)" alt=""></a>
    </div>
    <div class="comment-con" >
        <p> <a :href="'/profile/'+comment.user_commented._id">{{comment.user_commented.name}} {{comment.user_commented.last_name}}</a>
    
         <TextMore :text="comment.comment_message" :lengths="80" />
            <small> {{getTime(comment.date_create)}} </small>
                <span class="container-show-btn">
                    <a href="" v-on:click.prevent="commentEdite" :name="comment._id" :data-text_comment="comment.comment_message">Editar</a>
                    <a href="" v-on:click.prevent="deletComment" :name="comment._id">Eliminar</a>
                </span>
          </p>
    </div>
</div>
    </div>
<div class="card-body" v-if="show_comment">
    <div class="coment-item" v-for=" comment in comments" :key="comment._id">
    <div class="tum-user">
      <a :href="'/profile/'+comment.user_commented._id"><img :src="getUrlImage(comment.user_commented.profile_picture)" alt=""></a>
    </div>
    <div class="comment-con" >
        <p> <a :href="'/profile/'+comment.user_commented._id">{{comment.user_commented.name}} {{comment.user_commented.last_name}}</a>
         <TextMore :text="comment.comment_message" :lengths="80" />
            <small> {{getTime(comment.date_create)}} </small>
            <span class="container-show-btn" >
                    <a href="" v-on:click.prevent="commentEdite" :name="comment._id" :data-text_comment="comment.comment_message">Editar</a>
                    <a href="" v-on:click.prevent="deletComment" :name="comment._id" >Eliminar</a>
                </span>
          </p>
    </div>
</div>
</div>
<div class="form-group">
<div class="input-group">
    <span class="input-group-addon"><i class="fa fa-comments-o" aria-hidden="true"></i></span>
    <textarea name="" id="" cols="30" rows="3"  class="form-control" placeholder="comenente aqui" v-model="comment" @keyup.enter="addCommentByMusic"></textarea>
</div>
</div>
</div>
</template>
<script>
import { setTimeout } from 'timers';
  import CardUser from "../cards/CardUser.vue";
  import TextMore from "../forms/ShowMore.vue";
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
 const moment = require('moment');
 moment.locale('es')
const dbLocal= new DBLocal(DB_USER_NAME);
const axios = require('axios');
import io from 'socket.io-client';
const socket = io(SERVER_URI);

export default {
    name: 'comment',
    props:{
        music_id: String,
    },
    data(){
        return {
            user_data: undefined,
            edit_comment: false,
            message_btn: undefined,
            on_sockt_user: undefined,
            comment: undefined,
            comments: [],
            comments_bisable: [],
            show_comment: false,
            commentCount: 0,
            comment_id: undefined
        }
    },
    components:{
        CardUser ,
        TextMore
    },
    methods:{
          redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
        this.on_sockt_user = this.user_data.user.id;
    },
     getTime(date_create){
            
            return moment(date_create,"YYYYMMDD").fromNow();
        },
        toggleComment(){
            this.show_comment=!this.show_comment;
            if(this.show_comment){
                this.message_btn=`Ocultar`;
            }else{
                this.message_btn=`Ver`;
            }
            
        },
        commentEdite(ev){
                this.comment_id=ev.target.name;
                this.comment= ev.target.dataset.text_comment;
                this.edit_comment=true;
        },

        deletComment(ev){
            let _this=this;
            this.comment_id=ev.target.name;
                 axios.delete(`${SERVER_URI}/api/songcomment/${this.comment_id}?token=${this.user_data.token}`).
            then(function(req){
                if(!req.data.error){
                    _this.comment ='';
                  //  _this.comments =req.data.songcomments;
                    _this.getCommentByMusic(_this.music_id);
                    _this.edit_comment=false;
                    _this.comments =_this.comments.filter(function(comment){
                        return comment._id!=req.data.comment._id;
                    });


                    console.log(req.data.comment)
                }
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
        },
        getUrlImage(image_name){
            return `${SERVER_URI}/api/files/image/${image_name}`;
        },
        getCommentByMusic(music_id){
             let _this = this
         axios.get(`${SERVER_URI}/api/songcomment/${music_id}?token=${this.user_data.token}`).
            then(function(req){
              _this.comments =req.data.songcomments;
              _this.commentCount =req.data.commentCount;
              _this.comments_bisable = req.data.songcomments.filter(function(ob,index){
                  return index <1;
              })
               if(_this.commentCount>0 && _this.show_comment){
                   _this.message_btn=`Ocultar`;
               }
               if(_this.commentCount>0 && !_this.show_comment){
                   _this.message_btn=` Ver `;
               }
            
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
        },

        addCommentByMusic(){
             let _this = this

            if(!this.edit_comment){
         axios.post(`${SERVER_URI}/api/songcomment?token=${this.user_data.token}`,{
             comment: this.comment,
             music_id: this.music_id,
         }).
            then(function(req){
                if(!req.data.error){
                    _this.comment ='';
                    _this.comments =req.data.songcomments;
                    _this.getCommentByMusic(_this.music_id);
                }
            }).catch(function(err){
                console.log(`error--->${err}`)
            })

            }

            if(this.edit_comment){

               axios.put(`${SERVER_URI}/api/songcomment/${this.comment_id}?token=${this.user_data.token}`,{
             comment: this.comment,
             music_id: this.music_id,
         }).
            then(function(req){
                if(!req.data.error){
                    _this.comment ='';
                   
                    _this.getCommentByMusic(_this.music_id);
                     for(let i in _this.comments){
                         if(_this.comments[i]._id=req.data.comment._id){
                            _this.comments[i].comment_message =req.data.comment.comment_message;
                            _this.comments= _this.comments;
                            return false;
                         }
                     }
                    
                }
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            }


        }
    },
    mounted(){
        this.redirectUserLogin();
        this.getCommentByMusic(this.music_id);
    }
}
</script>
<style>
.conta-comment-up{
    border: #eee solid 1px;
    position: relative;
}

.container-comment{
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
}


.header-comment{
    display: flex;
    justify-content: center;
    margin: 0px 50px;
    border-bottom: #eee solid 1px;
    color: #365899;
}
.header-comment a{
      color: #365899;
      font-size: 11px;
      display: inline-block;
      padding-top: 10px;
      text-decoration: underline;
}
.container-comment .form-group{
   background: #eee;
    margin: 0px;
}
.container-comment  .input-group .form-control{
margin: 0px;
padding: 0px;
}
.container-comment .card-body{
    overflow-y: scroll;
    background: white;
    z-index: 10;
    margin: 0px;
    padding: 0px;
    max-height: 350px;
}
    .coment-item{
        width: 100%;
        font-size: 12px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;
    }
     .coment-item .tum-user{
         display: block;
         width: 40px;
         height: 40px;
         border: #eee solid 3px;
         border-radius: 50%;
         box-sizing: border-box;
         margin:0px 5px;
         padding: 0px;
    }
    .coment-item .tum-user img{
        width: 100%;
        border-radius: 50%;
    }
    .coment-item .comment-con{
            width: 200px;
            flex-grow: 1;
            margin-top: 15px;
            overflow: hidden;
            border-bottom: #eee solid 1px;
            position: relative;
    }
    
     .coment-item:last-child .comment-con{
         border-bottom: 0px;
     }
    .coment-item p a{
        display: inline-block;
        padding-right: 5px;
        font-weight: 700;
        color: #365899;
    }
    .coment-item p{
        position: relative;
        display: block;
        font-size: 13px;
        line-height: 17px;
        padding-bottom: 5px;
    }
   .coment-item p small{
        display: block;
        position: absolute;
        bottom: -12px;
        left: 0px;
        font-size: 9px;
        color: #ccc;
    }
    .container-show-btn{
        display: flex;
        position: absolute;
        bottom: -10px;
        right: 0px;
        font-size: 10px;
        padding:2px 5px;
        font-weight: 100;
        text-decoration: underline;
    }
</style>