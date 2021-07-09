<template>
  <div class="cards-container">
    <WeatherBox
      id="weatherBoxId"
      :temperature="temperature"
      :humidity="humidity"
    />
    <WindBox
      id="windBoxId"
      :windspeed="windspeed"
      :winddegree="winddegree"
    />
    <RainBox
      id="rainBoxId"
      :rain="rain"
    />
  </div>
</template>

<script>
  import WeatherBox from './WeatherBox.vue'
  import WindBox from './WindBox.vue'
  import RainBox from './RainBox.vue'

  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    name: 'WeatherContainer',
    components: {
      WeatherBox,
      WindBox,
      RainBox
    },
    data() {
      return {
        windspeed: undefined,
        winddegree: undefined,
        humidity : undefined,
        temperature : undefined,
        rain: undefined,
        newWeatherData: undefined
      }
      
    },
    mounted() {
      this.getWeatherData();
      setInterval(()=>{
        this.getWeatherData()
      },1000 * 60 * 60)
    },
    computed: {
      ...mapState(['forest'])
    },
    watch: {
      forest: function () {
        this.getWeatherData()
      },
      newWeatherData: function () {
        this.$emit('weatherData', this.newWeatherData)
      }
    },
    methods: {
      getWeatherData: function () {
        console.log("get weather data")
        const uri = 'http://firewatch_databaseservice.ds.ava.hfg.design:3000/api/weather'
        let data = {
          forestId: this.$store.state.forest._id,
          token: this.$store.state.user.token,
          email: this.$store.state.user.email
        }
        axios.post(uri, data)

          .then((res) => {
            console.log("Wetter: ", res)
            this.windspeed = res.data.weatherData.wind.speed;
            this.winddegree = res.data.weatherData.wind.deg;
            this.temperature = res.data.weatherData.main.temp;
            this.humidity = res.data.weatherData.main.humidity;
            if(res.data.weatherData.main.rain){
              this.rain = res.data.weatherData.main.rain
            }
            this.newWeatherData= {
              windspeed: res.data.weatherData.wind.speed,
              temperature: res.data.weatherData.main.temp,
              humidity: res.data.weatherData.main.humidity
            }
          })
          .catch(err => {
            console.log("WEATHER_API_ERROR")
            console.log(err);
          }) 
      }
    }
  }
</script>

<style scoped>
  .cards-container {
    display: grid;
    grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
    position: relative;
    width: 96%;
  }
  #weatherBoxId{
    /* left:0%;
    width: 30%; */
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  #windBoxId{
   /*  left:30%;
    width: 30%; */
    grid-column-start: 2;
    grid-column-end: 3;
  }
  #rainBoxId{
    /* left:60%;
    width: 30%; */
    grid-column-start: 3;
    grid-column-end: 4;
  }
</style>