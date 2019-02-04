<template>
<div :class="'item-header '+clss">
<span class="line-progress"></span>
<button class="botton" v-on:click.prevent="fn">
    <i :class="content.icon_class"></i>
</button>
<a href="" class="wizan-label">{{content.title}}</a>
</div>
</template>
<script>
export default {
    name: 'wizan-btn',
    data(){
        return{
             clss: '',
        }
    },
    props:{
        content:{
            title: String,
            icon_class: String,
        },
        active: Boolean,
        method: Function,
    },
    methods:{
        fn(ev){
            this.handlClick();
            this.method(ev);
        },
        handlClick(){
             this.clss='';
            if(this.active){
                this.clss='active';
            }
            
        },
        
    },
    mounted(){
        this.handlClick();

    },
   
}
</script>
