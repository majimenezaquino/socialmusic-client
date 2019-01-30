<template>
<div class="container__music">
    <div class="col-music">
         <div class="zone_drop">
                <div class="form-contro ">
                     <label for="btn-upload" class="btn-upload">
                         <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                     </label>
                <input type="file" name="" id="btn-upload" style="display:none">
                </div>
                <div class="upload-error">
                    <h3>{{message_upload}}</h3>
                </div>
         </div>
    </div>
     <div class="col-music">
      
    </div>
</div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
    const {EventBus} =require('@/eventbus');
  import { setInterval, setImmediate } from 'timers';

export default {
    name: 'avatar',
    data(){
        return{
            isDraging:false,
            message_upload:''
        }
    },
    methods:{
        file_allower(file){
        let extension =file.name.split('.');
        extension=  extension[extension.length-1];
        if(extension=='mp3' || extension=='wpw' || extension=='ogg' || extension=='mp3' ){
        return true;
        }else{
        return false;
        }
        }
    },
    mounted(){
        //set drag en drop
        let zoneDrop =document.querySelectorAll(".zone_drop") || [];
        let _this=this;
        if(zoneDrop.length>0){
            for(let i in zoneDrop){
                zoneDrop[i].ondragover=function(ev){
                    ev.target.classList.add("active_drop")
                    let file =ev.dataTransfer.files[0];
                    console.log(ev.dataTransfer)
                    if(_this.file_allower(file)){
                        _this.message_upload='File allower';
                    }
                    return false;
                };
                zoneDrop[i].ondragleave=function(ev){
                    ev.target.classList.remove("active_drop")
                    return false;
                };
            }
        }
    }
}
</script>
<style>
@import url("./styles.css");

</style>
