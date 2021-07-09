<template>
  <div id="header">
    <img src="./../assets/logo2.svg" id="headerLogo" alt="logo2">
      <router-link class="header-link"
        :to="{name: 'Dashboard'}"
        v-for="forest in $store.state.user.forest" :key="forest.forestCode"
        v-on:click="chooseForest(forest)"
        v-bind:id="forest._id + 'ForestId'"
      >
        <div class="forestLink">
          {{forest.name}}
        </div>
      </router-link>
    
     <router-link :to="{name: 'AddForest'}"
      id="routerAddForest"
     >
        <button
          id="addForestButton"
        >
          <span id="addForestIcon" class="material-icons">
            add
          </span>
        </button>
      </router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Header',
    mounted(){
      if(this.$store.state.user.forest){
        let data = this.$store.state.user.forest[0]
        this.$store.commit('chooseForest', data)
      }
    },
    computed: {
      ...mapState(['forest'])
    },
    watch: {
      forest: function() {
        this.$nextTick(()=>{
        for(let i = 0; i < this.$store.state.user.forest.length; i++){
          document.getElementById(((this.$store.state.user.forest[i]._id).toString() + "ForestId").toString()).style.color = "#C6C6C6"
        }
        document.getElementById(((this.$store.state.forest._id).toString() + "ForestId").toString()).style.color = "#6ACA48"
        })
      }
    },
    methods: {
      chooseForest(data){
        this.$store.commit('chooseForest', data)
      }
    },
  }
</script>

<style scoped>
  .forestLink:hover{
    color: #68a353;
  }
  .header-link:hover{
    text-decoration: none;
  }
  #header {
    position: relative;
    display: block;

    margin: 0;
    margin-bottom: 1rem;
    width: 100%;
    height: 48px;

    background-color: #161616;
  }
  #addForestButton{
    display: inline-block;
    position: absolute;
    
    height: 32px;
    width: 32px;
    background-color: #1f1f1f;
    color: white;
    border: none;
    padding: 0%;

    top:50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  #addForestButton:focus{
    outline: none;
  }
  #addForestIcon{
    padding: 0;
    margin: 0%;
    position: absolute;
    height: 100%;
    width: 32px;
    top:60%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 0;
  }
  #headerLogo{
    position: relative;
    display: inline-block;

    height: 100%;
    margin-left: 16px;
  }
  
  .header-link {
    position: relative;
    display: inline-block;

    height: 100%;
    margin: 0;
    margin-left: 1rem;
    margin-right: 1rem;

    text-align: center;
    vertical-align: middle;
    line-height: 48px;
    font-size: 14px;
    font-weight: 400;

    background-color: #161616;
    border: none
  }
  .header-icons {
    color: #f5f5f5;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
    display: inline-block;
    padding: 0.5rem;
    margin: auto;
    text-align: center;
  }
</style>