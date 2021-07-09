<template>
    <div class="cardBorder">
        <div class="card">
            <div class="dataTitle">Regen</div>
            <div class="dataBody">
                <div 
                    v-if="rain"
                    id="rainContainer"
                >
                    <span
                        class="material-icons icon"
                    >
                        water_drop
                    </span>
                    <p>
                        {{rain}} mm
                    </p>
                </div>
                <p
                    v-else
                >
                Kein Regen</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'WindBox',
    props: [
        'rain'
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
    #rainContainer{
        height: 32px;
        display: grid;
        grid-template-columns: 56px calc(100% - 56px);
    }
    p{
        margin: 0;
        line-height: 32px;
        font-size: 24px;
    }
</style>