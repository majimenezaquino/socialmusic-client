<template>
     <article class="comment-item">
        <CardUserListSmoll
            :user="comment.user_commented"
            
            />
        <div class="message-comment">
            <div class="content">
                <p>{{comment.comment_message}}</p>
            </div>
            <small>{{comment.date_create}}</small>
        </div>
</article>
</template>
<script>
import CardUserListSmoll from "./CardUserListSmoll.vue";
export default {
    name: "comment",
    props:{
        comment:{
            type: Object,
            required: true
        }
    },
    components:{
        CardUserListSmoll,
    }
}
</script>

<style>
    .comment-item{
        display: inline-block;
        margin: 0px;
        margin-bottom: 20px;
        display: flex;
        justify-items: center;
        overflow: hidden;
      
    }
     .comment-item  .comment-thumbnail{
         width: 50px;
         height: 50px;
         border-radius: 50%;
         overflow: hidden;
         margin: 5px;
         overflow: hidden;
         box-sizing: border-box;
     }
     .comment-item   .message-comment{
          flex-grow: 1;
          width: 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin: 0px;
      }
      .comment-item   .message-comment small{
          display: flex;
          width: 100%;
          font-size: 10px;
          line-height: 10px;
          font-weight: 100;
          background: #eee;
          padding: 10px;
          padding-bottom: 5px;
      }
   .message-comment    .content{
           word-break: break-all;
           align-items: flex-start;
           font-size: 15px;
           padding: 0px 5px;
           margin: 0px;
           line-height: 14px;
           text-align: left;
           height: auto;

           
       }
       .message-comment   .content p{
           flex-grow: 1;
           line-height: 12px;
       }
</style>