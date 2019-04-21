<!-- ChildMarker.vue -->
<template></template>
<script>
import imghouse from '@/assets/img/icons/home-address-blue.png';
import stattic_image from '@/assets/img/music-no-image.png';
export default {
  inject: ["google", "map"],
  props: {
    position: Object
  },
  data(){
    return { marker: null}
  },
  mounted(){
    let _this=this;
    const { Marker } = this.google.maps
    this.marker = new Marker({
      position: this.position,
      map: this.map,
      title: "Child marker!",
    //   icon: {
    //   url: imghouse
      
    // }
    }).addListener('click', _this.toggleBounce)
  },
  methods:{
    toggleBounce(ev){
      console.log(ev)
    }
  }
}
</script>