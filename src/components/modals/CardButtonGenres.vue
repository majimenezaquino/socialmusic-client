<template>
    <button
        :class="{'active': toggleActive}"
        v-on:click.prevent="handleSelectMusicGenge" 
        :value="genre._id"
    >
 <span>{{genre.name}}</span>
 </button>
</template>
<script>
import swal from 'sweetalert';
export default {
    name: 'gernes-bt',
    props: {
        allower: {
            type: Boolean,
            default: true
        },
        genre: Object,
        callback: Function
    },
    data(){
     return {
         toggleActive: false,
        }
    },
    methods: {
        handleSelectMusicGenge(){
            if(!this.allower && !this.toggleActive){
                
                swal({
                      text: "Ya alcánzate el límite de géneros para esa música.",
                      icon: "error",
                      button: "ok",
                    });
        
                return false;
                }

            this.toggleActive=!this.toggleActive;
     
            this.callback({id: this.genre._id,add: this.toggleActive});
        }
    }
}
</script>
