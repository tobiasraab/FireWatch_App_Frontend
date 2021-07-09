<template>
    <div class='cardBorder'>
        <div class="card">
            <h3>Sensorstation</h3>
            <div class="dataBody">
                <div id="fireIndexSensorContainer">{{fireIndex}}</div>
                <div
                    class="locationField"
                >
                    <span class="material-icons locationIcon">
                        fmd_good
                    </span>
                    <div class="locationData"
                        v-if="location"
                    >
                        <div>
                            {{location.latitude}}
                        </div>
                        <div>
                            {{location.longitude}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'IndexBox',
    data () {
        return {
        }
    },
    props: ['location', 'fireIndex'],
    mounted(){
        this.$nextTick(()=>{
            console.log(this.fireIndex)
            switch(true) {
                case (this.fireIndex <= 2000):
                    document.getElementById('fireIndexSensorContainer').style.color = '#83B764'
                    document.getElementById('60d1ec6cb8ef250ad42792d8area').style.fillColor = '#83B764'
                    break
                case (this.fireIndex <= 2500):
                    document.getElementById('fireIndexSensorContainer').style.color = '#F9C747'
                    break
                case (this.fireIndex <= 3000):
                    document.getElementById('fireIndexSensorContainer').style.color = '#F98747'
                    break
                case (this.fireIndex > 3000):
                    document.getElementById('fireIndexSensorContainer').style.color = '#FF5E5E'
                    break
            }
        })
    },
    watch: {
        fireIndex: function(){
            switch(true) {
                case (this.fireIndex <= 2000):
                    document.getElementById('fireIndexSensorContainer').style.color = '#83B764'
                    break
                case (this.fireIndex <= 2500):
                    document.getElementById('fireIndexSensorContainer').style.color = '#F9C747'
                    break
                case (this.fireIndex <= 3000):
                    document.getElementById('fireIndexSensorContainer').style.color = '#F98747'
                    break
                case (this.fireIndex > 3000):
                    document.getElementById('fireIndexSensorContainer').style.color = '#FF5E5E'
                    break
            }
        }
    }
}
</script>

<style scoped>
    #fireIndexSensorContainer{
        font-size: 36px;
        text-align: center;
        margin-left: -36px;
        margin-top: -12px;
        margin-bottom: 12px;
    }
    .material-icons{
        margin-top: 8px;
        font-size: 32px;
    }
    .locationField{
        margin-left: -24px;
        display: grid;
        grid-template-columns: 48px calc(100% - 48px);
    }
    .card {
        background-color: #4B4B4B;
        display: inline-block;
        width:100%;
        height:100%;
        box-shadow: 0px 4px 4px #16161650;
    }
    h3{
        font-weight:500;
        font-size: 18px;
        position: relative;
        margin: 1rem;
        color: #F1C21B;
    }
    .dataBody {
        color: white;
        margin: 1rem;
        margin-right: 0;
        margin-left: 36px;
        margin-top: 32px;
    }
    .cardBorder{
        width: 100%;
        padding-right: 20px;
    }
</style>