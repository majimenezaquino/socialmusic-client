<template>
        <div class="container-alert-error">
                <div class="content" v-if="!close">
                        <div class="header">
                            <a href="" class="close-alert" v-on:click.prevent="closeAlert">
                                <i class="zmdi zmdi-close"></i>
                                </a>
                                <div class="body">
                                  <slot  name="alert-title" ></slot>
                                </div>
                        </div>
                </div>
        </div>
</template>
<script>
export default {
    name: 'alert',
    data(){
        return {
            close: false,
            description: undefined,
        }
    },
  
    methods:{
        closeAlert(){
            this.close=true;
        }
    },
  
}
</script>
<style>
    .container-alert-error{
        width: 100%;
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: center;
    } 
  .container-alert-error  .content{
      display: flex;
      justify-content: center;
      min-width: 400px;
      position: absolute;
      background: #fff;
      z-index: 10px;
    }
    .container-alert-error  .content::before{
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
       border: transparent solid 10px;
       border-bottom-color: #ef5350;
       border-top: 0px;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
    }
    .header{
        position: relative;
        width: 100%;
    }
    .close-alert{
        display: flex;
        position: absolute;
        width: 16px;
        height: 16px;
        background: #eee;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
         right: -9px;
        top: -9px;
        padding: 10px;
        border: #ccc solid 1px;
        z-index: 10;
    }
    .container-alert-error .body{
        position: absolute;
        left: 0px;
        right: 0px;
        background: transparent;
        padding:0px 10px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        background: #fff;
        border: #ccc solid 1px;
        border-radius: 4px;
        background: #ef5350;
        color: #fff;
        border-top: none;
        
    }
     .container-alert-error .body h1{
         font-weight: 400;
         margin: 0px;
         font-size: 20px;
         padding-top: 5px;
         color: #fff;

     }
      .container-alert-error .body p{
          font-size: 13px;
          line-height: 15px;
          font-weight: 400;
      }
      .description{
          width: 100%;
          display: flex;
          justify-content: center;

      }
</style>


