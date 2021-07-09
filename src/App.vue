<template>
  <div id="app">
    <Header
      v-if="this.$store.state.user != undefined"
    />
    <router-view
    />
  </div>
</template>

<script>
  import Header from './components/Header.vue'

  import axios from 'axios'
  import { mapState } from 'vuex'

 /*  import store from './store/store' */

  export default {
    name: 'App',
    components: {
      Header
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {
      user: function(){
        this.callPresence()
      }
    },
    mounted() {
      setInterval(()=>{
        this.callPresence()
      },1000*60)
    },
    methods: {
      callPresence(){
        if(this.$store.state.user != undefined){
          const uri = 'http://firewatch_userservice.ds.ava.hfg.design:3000/api/callPresence'
          let data = {
            token: this.$store.state.user.token,
            email: this.$store.state.user.email
          }
          axios.post(uri, data)
            .catch(err => {
              console.log("ERR_CALLPRESENCE_API_ERROR")
              console.log(err);
            }) 
        }
      }
    }
  }
</script>

<style>
  #app {
    margin: 0;
    font-family: 'IBM Plex Sans'
  }
  body {
    background-color: #393939;
  }
</style>