<!-- MyMap.vue -->
<template>
  <div>
    <map-loader 
      :map-config="mapConfig"
      apiKey="AIzaSyDM_Kj71JDk3ip_NlHuKUDcKLzlclGXrPA"
    >
      <template v-for="(marker, index) in markers">
        <child-marker :position="marker" :key="index" />
      </template>
    </map-loader>
  </div>
</template>

<script>
import MapLoader from "./MapLoader.vue"
import ChildMarker from './ChildMarker'

export default {
  props: {
    markers: Array
  },
  data(){
    return {
      mapConfig: {
        zoom: 12,
        center: this.markers[0]
      }
    }
  },
  components: {
    MapLoader,
    ChildMarker
  }
}
</script>