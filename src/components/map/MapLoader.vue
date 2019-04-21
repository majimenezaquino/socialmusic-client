<!-- MapLoader.vue -->
<template>
  <div>
    <div id="map-vue"></div> <!-- point 1 -->
    <template v-if="!!this.google && !!this.map"> <!-- point 2 -->
      <map-provider
        :google="google"
        :map="map"
      >
        <slot/>
      </map-provider>
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import MapProvider from './MapProvider'

export default {
  props:{
    mapConfig: Object,
    apiKey: String
  },
  components: {
    MapProvider
  },
  data(){
    return {
      google: null,
      map: null
    }
  },
  mounted () { // point 3
    GoogleMapsApiLoader({
      apiKey: this.apiKey
    }).then((google) => {
      this.google = google
      this.initializeMap()
    })
  },
  methods: {
    initializeMap (){
      const mapContainer = this.$el.querySelector('#map-vue') // point 1
      const { Map } = this.google.maps
      this.map = new Map(mapContainer, this.mapConfig)
    }
  }
}
</script>

<style scoped>
#map-vue {
  width: 100%;
  height:60vh;
}
</style>