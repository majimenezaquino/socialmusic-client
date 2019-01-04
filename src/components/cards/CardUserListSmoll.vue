<template>
        <div class="collaborator-item">
        <div class="thumbnail">
        <a :href="'/profile/'+user._id"><img :src="user.profile_picture" :alt="user.name"></a>
        </div>
        <a :href="'/profile/'+user._id"><h3>{{user.name}}</h3></a>
    </div>
</template>
<script>
export default {
    name: 'user-list',
    props:{
        user:{
            type: Object,
            required: true
        }
    },
    mounted(){
        console.log(this.user)
    }
}
</script>
<style>
.collaborator-item{
    width: 80px;
    margin:10px 0px;
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
    .collaborator-item .thumbnail{
        width: 50px;
        height: 50px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        border-radius: 50%;
        padding: 0px;
        margin: 0px;
    }
    .collaborator-item .thumbnail img{
        width: 100%;
        height: auto;
    }
    .collaborator-item h3{
        font-size: 13px !important;
        max-width: 100%;
        font-weight: bold;
        margin: 2px;
        text-align: center;
    }
</style>

