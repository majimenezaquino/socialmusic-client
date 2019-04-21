<!-- MyMap -->
<template>
  <div>
    <map-loader 
      :map-config="mapConfig"
      apiKey="AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc">
      <template slot-scope="scopeProps"> <!-- slot-scope -->
        <child-marker 
          v-for="(marker,i) in markers"
          :key="i"
          :position="marker" 
          :google="scopeProps.google"
          :map="scopeProps.map"
        />
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