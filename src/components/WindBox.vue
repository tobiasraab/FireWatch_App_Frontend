<template>
    <div class="cardBorder">
    <div class="card">
        <div class="dataTitle">Wind</div>
        <div class="dataBody">
            <div id="windSpeedContainer">
                <span class="material-icons icon">
                    air
                </span>
                <p
                    v-if="windspeed"
                >
                    {{windspeed}} km/h
                </p>
            </div>
            <div id="windDegreeContainer">
                <span class="material-icons icon">
                    explore
                </span>
                <p
                    v-if="winddegree"
                >
                    {{winddegree}}°
                </p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
    name: 'WindBox',
    props: [
        'windspeed',
        'winddegree'
    ],
    mounted () {
    },
    watch: {
    }
}
</script>

<style scoped>
    .material-icons{
       font-size: 32px;
    }
    #windSpeedContainer{
        height: 32px;
        display: grid;
        grid-template-columns: 56px calc(100% - 56px);
    }
    #windDegreeContainer{
        margin-top: 24px;
        height: 32px;
        display: grid;
        grid-template-columns: 56px calc(100% - 56px);
    }
    p{
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