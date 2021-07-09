<template>
    <div class="cards-container">
        <ForestIndex
            id="forestIndexId"
            :avgFireIndex="fireIndex"
        />
        <LayerBox
            :layerType="firstLayerType"
            :temperature="firstTemperature"
            :moisture="firstMoisture"
        />
        <LayerBox
            :layerType="secondLayerType"
            :temperature="secondTemperature"
            :moisture="secondMoisture"
        />
    </div>
</template>

<script>
    import LayerBox from './LayerBox.vue'
    import ForestIndex from './ForestIndex.vue'

    import { mapState } from 'vuex'

    export default {
        name: 'AverageContainer',
        components: {
            LayerBox,
            ForestIndex
        },
        props: [
            'newWeatherData'
        ],
         data() {
            return {
                firstLayerType: 'Streuschicht',
                secondLayerType: 'Humusschicht',
                firstTemperature: 0,
                secondTemperature: 0,
                firstMoisture: 0,
                secondMoisture: 0,
                fireIndex: undefined
            }
        },
        mounted() {
            this.calcFireIndex()
        },
        methods: {
            calcFireIndex() {
                this.$nextTick(()=>{
                    if(this.newWeatherData && this.$store.state.sensor) {
                        this.fireIndex = Math.round((((this.firstTemperature / this.firstMoisture) + (this.secondTemperature / this.secondMoisture) * (this.newWeatherData.windspeed / (this.newWeatherData.temperature / this.newWeatherData.humidity)))) * 100)
                        console.log(this.fireIndex)
                    }
                })
            }
        },
        computed: {
            ...mapState(['sensor'])
        },
        watch: {
            sensor: function () {
                let fTemperature = 0
                let sTemperature = 0
                let fMoisture = 0
                let sMoisture = 0
                for(let i = 0; i < this.$store.state.sensor.length; i++){
                    fTemperature = fTemperature + this.$store.state.sensor[i].tempStreu
                    sTemperature = sTemperature + this.$store.state.sensor[i].tempHumus
                    fMoisture = fMoisture + this.$store.state.sensor[i].moistureStreu
                    sMoisture = sMoisture + this.$store.state.sensor[i].moistureHumus
                }
                this.firstTemperature = Math.round(fTemperature / this.$store.state.sensor.length *100) /100
                this.secondTemperature = Math.round(sTemperature / this.$store.state.sensor.length *100) /100
                this.firstMoisture = Math.round(fMoisture / this.$store.state.sensor.length *100) /100
                this.secondMoisture = Math.round(sMoisture / this.$store.state.sensor.length *100) /100
                this.calcFireIndex()
            }
        }
    }
</script>

<style scoped>
  .cards-container {
    display: grid;
    grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
    position: relative;
    width: 100%;
  }
  #forestIndexId{
    grid-column-start: 1;
    grid-column-end: 2;
  }
</style>