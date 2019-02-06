<template>
<div :class="'item-header '+clss">
<span class="line-progress"></span>
<button class="botton" v-on:click.prevent="fn" :disabled="status">
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
            status: Boolean,
        },

        status: Boolean,
        active: Boolean,
        method: Function,
    },
    methods:{
        fn(ev){
            this.handlClick();
            if(!this.status){
            this.method(ev);
            }
        },
        handlClick(){
             this.clss='';
            if(this.active){
                this.clss='active';
            }

            if(this.status){
            this.clss="btn-disable";
        }
            
        },
        
    },
    mounted(){
        this.handlClick();
        

    },
    watch:{
        'status':function(value){
             this.handlClick();
             if(this.status){
            this.clss="btn-disable";
             }
        }
    }
   
}
</script>
<style>
.btn-disable:hover button{
    background: #eee !important;
    color: rgb(51, 51, 51);
}

.btn-disable:hover .line-progress{
    background: #eee !important;
}

.btn-disable button{
    background: #eee !important;
    color: rgb(51, 51, 51) !important;;

}

.btn-disable .line-progress{
    background: #eee !important;
}

</style>

