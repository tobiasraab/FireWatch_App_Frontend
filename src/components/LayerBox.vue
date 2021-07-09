<template>
    <div class="cardBorder">
        <div class="card">
            <h3>{{layerType}}</h3>
            <div class="dataBody">
                <div id="temperatureContainer">
                    <span class="material-icons icon">
                        thermostat
                    </span>
                    <p>{{temperature}} °C</p>
                </div>
                <div id="humidityContainer">
                    <span class="material-icons">
                        invert_colors
                    </span>
                    <p>{{moisture}} %</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LayerBox',
    props: [
        'temperature',
        'moisture',
        'layerType'
    ]
}
</script>

<style scoped>
    .card {
        background-color: #4B4B4B;
        display: inline-block;
        margin-right:3%;
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
    .material-icons{
       font-size: 32px;
    }
    p{
        margin: 0;
        line-height: 32px;
        font-size: 24px;
    }
    .cardBorder{
        padding-right: 20px;
        padding-left: 0;
    }
    #temperatureContainer{
        height: 32px;
        display: grid;
        grid-template-columns: 56px calc(100% - 56px);
    }
    #humidityContainer{
        margin-top: 24px;
        height: 32px;
        display: grid;
        grid-template-columns: 56px calc(100% - 56px);
    }
</style>