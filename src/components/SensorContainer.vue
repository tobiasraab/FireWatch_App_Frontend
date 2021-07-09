<template>
    <div class="sensor-container">
        <SensorStationBox
            class="box"
            :stationId="name"
            :fireIndex="fireIndex"
            :location="location"
        />
        <LayerBox
            class="box"
            :layerType="firstLayerType"
            :temperature="firstTemperature"
            :moisture="firstMoisture"
        />
        <LayerBox
            class="box"
            :layerType="secondLayerType"
            :temperature="secondTemperature"
            :moisture="secondMoisture"
        />
    </div>
</template>

<script>
    import SensorStationBox from './SensorStationBox.vue'
    import LayerBox from './LayerBox.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'SensorContainer',
        components: {
            SensorStationBox,
            LayerBox
        },
        props: ['oneSensor', 'newWeatherData'],
        data() {
            return {
                name: undefined,
                fireIndex: undefined,
                location: undefined,
                firstLayerType: "Streuschicht",
                secondLayerType: "Humusschicht",
                firstTemperature: undefined,
                secondTemperature: undefined,
                firstMoisture: undefined,
                secondMoisture: undefined
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
        watch: {
            newWeatherData: function() {
                this.calcFireIndex()
            },
            sensor: function() {
                this.calcFireIndex()
            },
            oneSensor: function(){
                // console.log(this.sensor)
                // console.log(this.$store.state.sensor)

                if(this.oneSensor._id == undefined){
                    this.location = undefined
                    this.firstTemperature = undefined
                    this.secondTemperature = undefined
                    this.firstMoisture = undefined
                    this.secondMoisture = undefined
                }
                else {
                    for (let i = 0; i < this.$store.state.sensor.length; i++){
                        if(this.oneSensor._id === this.$store.state.sensor[i]._id){
                            this.location = this.$store.state.sensor[i].position
                            this.firstTemperature = this.$store.state.sensor[i].tempStreu
                            this.secondTemperature = this.$store.state.sensor[i].tempHumus
                            this.firstMoisture = this.$store.state.sensor[i].moistureStreu
                            this.secondMoisture = this.$store.state.sensor[i].moistureHumus
                        }
                    }
                    this.calcFireIndex()
                }    
            }
        },
        computed: {
            ...mapState(['sensor'])
        }
    }
</script>

<style scoped>
    .sensor-container {
        padding: 18px;
        padding-left: 24px;
        padding-bottom: 24px;
        display: grid;
        width: 100%;
        grid-template-rows: calc(94% / 3) calc(94% / 3) calc(94% / 3);
        grid-row-gap: 3%
    }
    .box{
        width: 100%;
    }
</style>