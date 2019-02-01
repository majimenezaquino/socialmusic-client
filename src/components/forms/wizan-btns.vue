<template>
<div :class="'item-header '+clss">
<span class="line-progress"></span>
<router-link 
class="botton"
:to="content.action"
v-on:click.prevent="handlClick"
v-on:mouseover="handlHover"
v-on:mouseleave="handlLeave"

>
    <i :class="content.icon_class"></i>
</router-link>
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
            active: Boolean,
            hover: Boolean,
            title: String,
            icon_class: String,
        }
    },
    methods:{
        handlClick(){
            this.content.active=!this.content.active;
             this.clss='';
            if(this.content.hover){
                this.clss='active';
                this.$router.push("./"+content.action)
            }
            
        },
         handlHover(){
            this.content.hover=!this.content.hover;
            
            if(!this.content.active){
                 this.clss='';
            
            if(this.content.hover){
                this.clss='hover';
            }
            }
        },
         handlLeave(){
            if(!this.content.active){
             this.clss='';
            }
        }
    }
}
</script>
