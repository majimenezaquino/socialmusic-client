<template>
    <section class="container-load-files" :id="container_id">
            <div class="thumbnail-previes"
            v-if="fileLoad!=undefined"
            v-bind:style="{ 'background-image': 'url(' + fileLoad + ')' }"
            >
                <span class="info-previes">Peso del archivo  {{file_size}} bytes</span>
                <a href="" class="close-previes">
                   <i class="zmdi zmdi-close"></i>
                </a>
            </div>
            
            <div class="content-upload">
                <p>Suba su archivo o arrate y suelte dentro del recuadro </p>
                <label :for="input_id_for" class="btn-load-file">
                    <i class="zmdi zmdi-cloud-upload"></i>
                    </label>
                <input type="file" name="file" 
                :id="input_id_for" class="inpup-uload" 
                v-on:change="handlerChangeLoad" 
                />
            </div>
    </section>
</template>
<script>
export default {
    name: 'load-files',
    data(){
        return {
            file_size: 0,
            input_id_for: new Date().getTime(), //Create a different identification for each instance
            container_id:`container_${new Date().getTime()}`, //Create a different identification for each instance
            extension:["png","jpg","jpeg"], //extension allower default
            fileLoad: undefined,
        }
    },
    methods:{
        handlerChangeLoad(event){
    let _this=this;
    let file =  event.target.files[0];
    if(_this.checkFileExtensionAllower(file.name,_this.extension)){                       
        _this.file_size =(file.size/1024).toFixed(2);
        let reader = new FileReader();
        reader.onload = function(e) {        
        _this.fileLoad =e.target.result;    
         }
    reader.readAsDataURL(file);
    }
    }
,
checkFileExtensionAllower(file,extension_array){
      
        if(extension_array.length>0){
            let extension =this. getFileExtenxion(file)
            if(extension_array.includes(extension)) return true;
        }
        return false;
        },
     getFileExtenxion(file){
            if(!file.length>0 || file===undefined){
                return undefined;
            }
            let extension =file.split('.');
            extension=  extension[extension.length-1];
            return extension;
        }
},
mounted(){
    let _this=this;
    if(this.container_id===undefined){
        return new Error('La página no ha cardado correctamente, por favor refresque su navegador  ');
    }
    let zonaDrop =document.getElementById(this.container_id);
    console.log(this.container_id)

zonaDrop.ondragover=function(ev){
            ev.target.classList.add("active_drop")
             let file =ev.dataTransfer;
            return false;
        };

      zonaDrop.ondragleave=function(ev){ 
            ev.target.classList.remove("active_drop");
           
            return false;
        };
     zonaDrop.ondrop=function(ev){
            ev.preventDefault();
            ev.target.classList.remove("active_drop");
            let file =  ev.target.files[0];
             let _this=this;
    
    if(_this.checkFileExtensionAllower(file.name,_this.extension)){                       
        _this.file_size =(file.size/1024).toFixed(2);
        let reader = new FileReader();
        reader.onload = function(e) {        
        _this.fileLoad =e.target.result;    
         }
    reader.readAsDataURL(file);
    }
            return false;
        };
      

},
watch:{
    'fileLoad':function(name){
       console.log(name) 
    }
}

}
</script>

<style>
    .container-load-files{
       width:100%;
        height:90vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .container-load-files .inpup-uload{
        display: none;
    }
    .container-load-files  .content-upload {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        flex-wrap: wrap;
        color: #ccc ;
    }
    .container-load-files  .content-upload p{
        align-self: flex-start;
        width:100%;
    }
     .container-load-files  .content-upload .btn-load-file{
         font-size: 22px;
         background: #42a5f5;
         color: #fff;
         border-radius: 50%;
      
         height: 40px;
         width:40px;
         display: flex;
         justify-content: center;
         align-items: center;
    }
   .container-load-files  .thumbnail-previes{
       width: 300px;
       height: 300px;
       background-size: cover;
       border-radius: 4px;
       position: relative;

    }
    .container-load-files  .thumbnail-previes .close-previes {
        position: absolute;
        right: 10px;
        top: 10px;
        width:25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 50%;
    }
     .container-load-files  .thumbnail-previes .info-previes{
            position: absolute;
        left: 10px;
        top: 10px;
    
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 50%;
        font-size: 12px;
     }
    .container-load-files  .thumbnail-previes:hover .close-previes{
         right: -10px;
        top: -10px;
        background: #fff;
        color: #444;
        border:#eee solid 1px;
        padding: 0px;
    }
    /**::before.*/
    .active_drop{
        z-index: 10;
        background: rgba(66, 165, 245,0.5);
    }
</style>