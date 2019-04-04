<template>
<div class="container-user-create">
    <div class="thum-user">
        <a :href="'/profile/'+user_id"> <img :src="user_img" alt=""/> </a>
    </div>
    <a :href="'/profile/'+user_id"><h1>{{user_name}} {{user_last_name}}</h1></a>
</div>
</template>
<script>
export default {
    name: 'user-create',
    props:{
        user_id: String,
        user_img: String,
        user_name: String,
        user_last_name: String
    }
}
</script>
<style>
.container-user-create {
    display: flex;
    padding: 10px;
    align-items: center;
}
.container-user-create h1{
    display: inline;
    font-size: 13px !important;
    line-height: 14px;
    font-weight: 400 !important;
    color: #fff !important;

}
   .container-user-create .thum-user{
width: 36px;
height: 36px;
overflow: hidden;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
border: #eee solid 2px;
background: #fff;
margin-right: 5px;
    }
    .container-user-create .thum-user img{
        width: 100%;
    }
</style>