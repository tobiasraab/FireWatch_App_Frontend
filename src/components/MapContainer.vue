<template>
  <div class="map-container">
    <SensorContainer
      :oneSensor="sensor"
      :newWeatherData="newWeatherData"
    />
    <Map
      v-on:showSensor="parseSensor"
      :newWeatherData="newWeatherData"
    />
  </div>

</template>

<script>
  import Map from './Map.vue'
  import SensorContainer from './SensorContainer.vue'

  export default {
    name: 'MapContainer',
    components: {
      Map,
      SensorContainer
    },
    props: [
      'newWeatherData'
    ],
    data () {
      return {
        sensor: undefined
      }
    },
    methods: {
      parseSensor(data){
        this.sensor = data
      }
    }
  }
</script>


<style scoped>
  .map-container {
    position: relative;
    display: grid;
    grid-template-columns: 20% 80%;
    width: 100%;
    height: 100%;
    background-color: #575757;
  }
</style>