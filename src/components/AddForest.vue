<template>
  <div>
    <div class="form">
      <input type="text" class="textInput" id="forestCodeRegister" placeholder="Waldcode"
        v-model="forestCode"
        v-on:click="removeFeedback()"
      >
      <button type="submit" class="button" id="forestRegisterButton"
        v-on:click="registerForest()"
      >Wald Registrieren</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { router } from "./../router"

export default {
    name: 'Dashboard',
    components: {
    },
    data () {
      return {
        forestCode: undefined,
        codeFailed: false
      }
    },
    mounted () {
    },
    methods: {
      removeFeedback () {
        if(this.codeFailed == true){
          document.getElementById("forestCodeRegister").value = ""
          this.codeFailed = false
        }
      },
      registerForest(){
        const uri = process.env.SERVER_ADDRESS + process.env.USER_SERVICE_PORT + '/api/registerForest'
        let msgApi = this.$store.state.user
        msgApi.forestCode = this.forestCode

        axios.post(uri, msgApi)
          .then((response) => {
            if(response.data.success === true){
              console.log("Forest registraion succesfull")

              let dataUser = response.data.userData.forest
              this.$store.commit('userForestUpdate', dataUser)

              let index = this.$store.state.user.forest.length - 1
              let dataForest = this.$store.state.user.forest[index]
              this.$store.commit('chooseForest', dataForest)

              router.push({ path: '/dashboard'})
            }
            if(response.data.success === false && response.data.message == "forest does not exist in database") {
              console.warn("Forest registration failed")
              document.getElementById("forestCodeRegister").style.border = "2px solid #DA1E28"
              document.getElementById("forestCodeRegister").value = "Ungültiger Code"
              this.codeFailed = true
            }
            else if(response.data.success === false && response.data.message == "forest already activated in account") {
              console.warn("Forest already registerd")
              document.getElementById("forestCodeRegister").style.border = "2px solid #DA1E28"
              document.getElementById("forestCodeRegister").value = "Bereits Registriert"
              this.codeFailed = true
            }
          })
      }
    }
}
</script>

<style>
  .form{
    position: relative;
    margin: auto;
    top: 25vh;
    width: 288px;
  }
  .textInput {
    display: block;
    position: relative;
    height: 40px;
    width: 288px;
    margin: auto;
    padding-left: 16px;
    font-size: 14px;
    outline: 0;
    border-width: 0 0;
    border-bottom: 1px solid #8D8D8D;
    color: #161616;
    margin-bottom: 8px;
  }
  ::placeholder {
    color: #A8A8A8;
    opacity: 1; /* Firefox */
  }
  .textInput:focus {
    color: #161616;
    border: 2px solid #0F62FE;
  }
  .textInput:active {
    color: #161616;
    border: 2px solid #0F62FE;
  }
  .button{
    left: 80px;
    display: block;
    position: relative;
    height: 40px;
    width: 208px;
    background-color: #0F62FE;
    color: white;
    border: none;
    font-size: 14px;
    padding: 0%;
    text-align: left;
    padding-left: 16px;
    
  }
  .button:hover{
    background-color: #0353E9;
  }
  .button:focus{
    border: none;
    outline: none;
    box-shadow: none;
  }
  .button:active{
    border: none;
    outline: none;
    box-shadow: none;
  }
</style>