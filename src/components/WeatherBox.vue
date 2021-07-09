<template>
    <div class="cardBorder">
    <div class="card">
        <div class="dataTitle">Luft</div>
        <div class="dataBody">
            <div id="temperatureContainer">
                <span class="material-icons icon">
                    thermostat
                </span>
                <p>{{temperature}} °C</p>
            </div>
            <div id="humidityContainer">
                <span class="material-icons icon">
                    invert_colors
                </span>
                <p>{{humidity}} %</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
    name: 'WeatherData',
    props: [
        'temperature',
        'humidity'
    ]
}
</script>

<style scoped>
    .material-icons{
       font-size: 32px;
    }
    #temperatureContainer{
        width: 100%;
        height: 32px;
        display: grid;
        grid-template-columns: 56px calc(100% - 56px);
    }
    #humidityContainer{
        margin-top: 24px;
        width: 100%;
        height: 32px;
        display: grid;
        grid-template-columns: 56px calc(100% - 56px);
    }
    p{
        width: 100%;
        margin: 0;
        line-height: 32px;
        font-size: 24px;
    }
    .card {
        background-color: #4B4B4B;
        display: inline-block;
        width:100%;
        height:100%;
        box-shadow: 0px 4px 4px #16161650;
    }
    .dataTitle {
        font-weight: bold;
        margin: 1rem;
        color: #0AD3ff;
    }
    .dataBody {
        color: white;
        margin: 1rem;
        margin-right: 0;
        margin-left: 36px;
        margin-top: 32px;
    }
    .cardBorder{
        padding-left: 20px;
    }
</style>