<template>
 <div class="component-dedicate">
     <a href=""  data-toggle="modal" data-target="#toolabr_modal"><i class="fa fa-share-square-o"></i></a>
 </div>
</template>
<script>
export default {
    name: 'dedication',
    data(){
        return{
            show: false
        }
    },
    methods:{
        toggleShow(){
            this.show=!this.show;
        }
    }
}
</script>
<style>
    .component-dedicate{
       height:30px; 
       position: relative;
       display: flex;
       justify-content: center;
       align-items: center;
       color: #fff;
    }
     .component-dedicate button{
         border: none;
         font-size: 22px;
         background: transparent;
    }
    .content-hidden{
        position:absolute;
        min-height:40px;
        min-width: 150px;
        background: #fff;
        top: -50px;
        z-index: 10;
        border: #eee solid 1px;
        border-radius: 4px;
    }
    .content-hidden::before{
            content: "";
            position: absolute;
            width: 0px;
            height: 0px;
            border: 10px solid transparent;
            border-top: #eee solid 10px;
            left: 50%;
            transform: translateX(-50%);
            bottom: -20px;

    }

    .show-follower {
        width: 100%;
  
    }
</style>