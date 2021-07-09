<template>
  <div>
    <template
      v-if="$store.state.user.forest && $store.state.forest"
    >
      <div
        id= "gridParent"
      >
        <AverageContainer
          id="averageContainerId"
          :newWeatherData="newWeatherData"
        />
        <WeatherContainer
          id="weatherContainerId"
          @weatherData="pushWeatherData"
        />
        <MapContainer
          id="mapContainerId"
          :newWeatherData="newWeatherData"
        />
      </div>
    </template>
    <template
      v-else
    >
      <router-link :to="{name: 'AddForest'}">
        <button
          v-on:click="addForest"
          id="addForestButton"
        >
          <span id="addForestIcon" class="material-icons">
            add
          </span>
        </button>
      </router-link>
    </template>
  </div>
</template>

<script>
import MapContainer from './../components/MapContainer.vue'
import AverageContainer from './../components/AverageContainer.vue'
import WeatherContainer from './../components/WeatherContainer.vue'
import axios from'axios'
import { mapState } from 'vuex'

export default {
    name: 'Dashboard',
    components: {
      MapContainer,
      AverageContainer,
      WeatherContainer
    },
    data () {
      return {
        newWeatherData: undefined
      }
    },
    mounted () {
      this.getAllSensorData()
      setInterval(()=>{
        this.getAllSensorData()
      },1000 * 60 * 60)

    },
    computed: {
      ...mapState(['forest'])
    },
    watch: {
      forest: function() {
        this.getAllSensorData()
      }
    },
    methods: {
      pushWeatherData(e) {
        this.newWeatherData = e
      },
      getAllSensorData() {
        if(this.$store.state.user.forest){
          const uri ='https://firewatch_databaseservice.ds.ava.hfg.design:3000/api/sensorData'
          let data = {
            forestId: this.$store.state.forest._id,
            token: this.$store.state.user.token,
            email: this.$store.state.user.email
          }
          axios.post(uri, data)
            .then(res => {
              this.$store.commit("getSensorData", res.data.sensorData)
              // console.log(this.$store.state.sensor)
            })
            .catch(err => {
              console.log("ERR_SENSOR_API_ERROR (Dashboard)")
              console.log(err);
            }) 
          }
      }
    }
}
</script>

<style scoped>
body {
  background-color: #393939;
}
#addForestButton{
    display: block;
    top: 25vh;
    position: relative;
    margin: auto;
    height: 48px;
    width: 48px;
    background-color: #0F62FE;
    color: white;
    border: none;
    padding: 0%;
  }
  #addForestButton:focus{
    outline: none;
  }
  #addForestIcon{
    margin: 0%;
    position: relative;
    height: 100%;
    top: 74%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  #gridParent{
    width:100vw;
    height:calc(100vh - 80px);
    padding: 1%;
    display: grid;
    grid-template-rows: 25% 75%;
    grid-template-columns: 50% 50%;
  }
  #mapContainerId {
    grid-row-start: 2;
    grid-row-end: 3;

    grid-column-start: 1;
    grid-column-end: 3;
  }
  #averageContainerId { 
    margin-bottom:20px;
    grid-row-start: 1;
    grid-row-end: 2;

    grid-column-start: 1;
    grid-column-end: 2;
  }
  #weatherContainerId {
    margin-bottom:20px;
    left: 4%;
    grid-row-start: 1;
    grid-row-end: 2;

    grid-column-start: 2;
    grid-column-end: 3;
  }
</style>