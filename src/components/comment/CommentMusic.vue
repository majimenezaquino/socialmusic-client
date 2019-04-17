<template>
    <div class="col-md-12 comment-wrapper">
  <div class="comment-border">
    <div class="comment-box">
      <textarea class="form-control comment-input" placeholder="Escribe un comentario" id="comment-box" v-model="comment"
      rows="" v-on:keyup.enter="addCommentByMusic"></textarea>
      <button class="btn pull-right" v-on:click.prevent="addCommentByMusic">
          <i class="fa fa-paper-plane"></i>
      </button>
    </div>
  </div>
  <div class="comment-body-box">
      
    <div class="comment-post-box"
    v-for=" comment in comments" :key="comment._id"
    >
      <div class="comment-post">
        <div class="comment-post-header">
           <div class="conten-u">
                <a href=""><img :src="getUrlImage(comment.user_commented.profile_picture)" class="img-circle" /></a>
          <h5>
                <a href="">{{comment.user_commented.name}}</a>
                <small>{{getTime(comment.date_create)}}</small>
              </h5>
           </div>
              <span class="container-show-btn" v-if="self_user_comment== comment.user_commented._id" >
                    <a href="" v-on:click.prevent="commentEdite" :name="comment._id" :data-text_comment="comment.comment_message">Editar</a>
                    <a href="" v-on:click.prevent="deletComment" :name="comment._id" >Eliminar</a>
             </span>
        </div>
        <div class="panel-body comment-post-body">
          <div class="comment-post-content">
            <p>
                {{comment.comment_message}}
            </p>
            
          </div>
        </div>
      </div>
    </div>


    <a class="btn  more show hidden" id="see-more">
      <small>Ver más comentarios </small>
      <i class="fa fa-caret-down"></i>
    </a>
    <a class="btn  more show hidden" id="see-less">
      <small>Ver menos comentarios </small>
      <i class="fa fa-caret-up"></i>
    </a>
  </div>
</div>
</template>
<script>
import io from 'socket.io-client';
import { setTimeout } from 'timers';
import CardUser from "../cards/CardUser.vue";
import TextMore from "../forms/ShowMore.vue";
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
const moment = require('moment');
moment.locale('es')
const dbLocal= new DBLocal(DB_USER_NAME);
const axios = require('axios');
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
            comment_id: undefined,
            comment_content: undefined,

            self_user_comment: undefined,
        }
    },
    components:{
        CardUser ,
        TextMore
    },
    mounted(){
        
         this.redirectUserLogin();
        this.getCommentByMusic(this.music_id);
        this.setConfigComment();
    },
    methods:{
      setConfigComment(){
         $(".comment-body-box").each(function(index) {
         $(this).children(".comment-post-box").slice(-3).show();
        });

        $("#see-more").removeClass('hidden');

        $("#see-more").click(function(e) { // click event for load more
        e.preventDefault();
        $(this).siblings(".comment-post-box:hidden").slice(-3).show(); // select next 5 hidden divs and show them
        if ($(this).siblings(".comment-post-box:hidden").length == 0) { // check if any hidden divs
            $("#see-less").removeClass('hidden');
            $("#see-more").addClass('hidden')
        }
        });

        $("#see-less").click(function(e) {
        e.preventDefault();
        $(this).siblings(".comment-post-box").slice(3).hide();
        $("#see-less").addClass('hidden');
        $("#see-more").removeClass('hidden')
        });

            },
              redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
        this.on_sockt_user = this.user_data.user.id;
        this.self_user_comment =this.user_data.user.id;
    },
     getTime(date_create){
            
            return moment(date_create,"YYYYMMDD").fromNow();
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
                        console.log("get data")
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
             if(image_name===undefined){
                  return 'miaga'
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        },
        getCommentByMusic(music_id){
             let _this = this
         axios.get(`${SERVER_URI}/api/songcomment/${music_id}?token=${this.user_data.token}`).
            then(function(req){
               
              _this.comments =req.data.songcomments;
            
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
            }}
    }
}
</script>
<style>
   .comment-wrapper{
       background-color: #EEF5F9;
   }
   .comment-body-box{
      height: 300px;
      width: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
   }
    .comment-body-box::-webkit-scrollbar {
    width: 6px;
    background-color: #eeee;
} 
.comment-body-box::-webkit-scrollbar-track {
  background: #fff; 
}
   .comment-body-box::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
.no-padding {
  padding-right: 0;
  padding-left: 0;
}
 .comment-wrapper .panel-body{
    padding: 0px;
}
.comment-wrapper .comment-border {
  margin: 10px 5px 0 5px;
  border-top: 1px solid #eee;
  background: #fff;
}
.comment-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container-show-btn{
    display: flex;
    font-size: 10px;
}
.container-show-btn a{
    display: inline-block;
    padding: 0px 5px;
    text-decoration: underline;
}
.comment-wrapper .comment-border .comment-box .form-control {
  margin: 20px 0 10px;
  padding: 0px 10px;
  font-size: 1em;
  border: none;
  border-radius: 0;
}
.comment-wrapper .comment-border .comment-box .btn {
  padding: 5px;
  font-size: 1.3em;
  background: transparent;
 color: #3B3E44;
}
.comment-wrapper .comment-border .comment-box .btn:hover {
  text-decoration: none;
}
.comment-wrapper .comment-post-box {
  padding: 5px;
  border-bottom: 2px solid #eee;

}
.comment-wrapper .comment-post-box .comment-post {
  border-radius: 0;
}
.comment-wrapper .comment-post-box .comment-post .comment-post-header {
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-wrapper .comment-post-box .comment-post .comment-post-header img {
  display: inline-block;
  height: 30px;
  width: 30px;
}
.comment-wrapper .comment-post-box .comment-post .comment-post-header h5 {
  display: inline-block;
  margin: 0;
  padding-left: 6px;
}
.comment-wrapper .comment-post-box .comment-post .comment-post-header h5 a {
  color: #000;
}
.comment-wrapper .comment-post-box .comment-post .comment-post-header h5 small {
  margin-top: 5px;
  padding: 8px;
}
.comment-wrapper .comment-post-box .comment-post .comment-post-header .fa {
  color: #8A8B8F;
}
@media screen and (max-width: 768px) {
  .comment-wrapper .comment-post-box .comment-post .comment-post-box {
    margin-top: 70px;
  }
}
.comment-wrapper .show {
  border-radius: 5px;
}
.comment-wrapper .comment-post-box {
  display: none;
}
.recent-wrapper .center {
  text-align: center;
}
.recent-wrapper .recent-act {
  color: #3B3E44;
  border-top: 1px solid #ccc;
  padding: 35px 0;
  text-transform: uppercase;
  background-color: #F4F4F1;
}
.recent-wrapper .recent-act .glyphicon {
  font-size: 4em;
}
.recent-wrapper .recent-act .title {
  padding: 20px 0;
  font-weight: 400;
}
.comment-post-content{
    color: #aaa;
    font-size: 13px;
}
.comment-post-content p{
    padding-top: 10px;
    overflow-wrap: break-word;

}
.recent-wrapper .recent-act .notif-list {
  height: 300px;
  overflow: scroll;
}
.recent-wrapper .recent-act .per-notif {
  margin: 0 36px 0 36px;
  padding: 13px;
  font-size: 0.9em;
}
.recent-wrapper .recent-act .per-notif img {
  max-width: 30px;
  max-heigth: 30px;
}
.recent-wrapper .recent-act .per-notif .glyphicon {
  font-size: 30px;
  color: #3B3E44;
}
.recent-wrapper .recent-act .per-notif .per-notif-body {
  text-align: justify;
  text-justify: inter-word;
}

</style>