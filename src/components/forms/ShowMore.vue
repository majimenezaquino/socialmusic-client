<template>
    <p>{{text_leng}} <a href="" v-if="show" v-on:click.prevent="toggleShow" class="show-more">... Ver todo</a> </p>
</template>
<script>
export default {
    name: 'show-more',
    data(){
        return {
            text_leng: undefined,
            init: 0,
            aument:0,
            show: false
        }
    },
    props:{
       text: String, 
       lengths: {
           type: Number,
           default: 100
       }, 
    },
    methods:{
       showmore(n=1){
           if(this.text.length<=this.lengths){
               this.text_leng=this.text;
               this.show=false;
           }else{
               let text =this.text, text_spli;
             text_spli=  text.substr(this.init,this.lengths*n);
             this.show=true;
             text_spli=text_spli;
            this.text_leng= text_spli;
            
           }
       } ,
       toggleShow(){
            let n =this.text.length;
            this.showmore(n);
            this.show=false;
       }
    },
    mounted(){
        this.showmore();
    },
    watch: { 
      	text: function(text) { // watch it
          let n =this.text.length;
            this.showmore(n);
            console.log("prop chane" ,text)
        }
        }
}
</script>
<style>
    .show-more{
        font-size:10px;
        text-align: left;
        padding:0px;
        display: block;
        padding: 5px;
        font-weight: 100;
    
        width: 100%;
       

    }
</style>