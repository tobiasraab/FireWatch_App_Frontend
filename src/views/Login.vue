<template>
  <div id="loginId">
    <div id="loginForm">
      <img src="./../assets/logo.svg" id="loginLogo">
      <div id="inputFields">
        <input type="email" class="textInput" id="eMailInput" placeholder="E-Mail Adresse"
          v-model="email"
        >
        <input type="password" class="textInput" id="passwordInput" placeholder="Passwort"
          v-model="password"
          v-on:click="changeVisibility()"
        >
        <button type="submit" class="button" id="loginButton"
          v-on:click="loginUser()"
        >Login</button>
      </div>
    </div>
    <router-link :to="{name: 'Register'}">
      <button class="button" id="registerButton">Registrieren</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import { router } from "./../router"

let wrongPassword = false

export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    if(this.$store.state.user){
      const uri = process.env.SERVER_ADDRESS + process.env.USER_SERVICE_PORT + '/api/closeSession'
      let data = {
        token: this.$store.state.user.token,
        email: this.$store.state.user.email
      }
      axios.post(uri, data)
        .catch(err => {
          console.log("ERR_CLOSESESSION_API_ERROR")
          console.log(err);
        })
    }

    this.$store.commit('userAuthenticated', false)
    let userUpdate = undefined
    this.$store.commit('userLogin', userUpdate)
  },
  methods: {
    changeVisibility(){
      const passwordInput = document.getElementById('passwordInput')
      if(wrongPassword === true){
        passwordInput.value = ""
        wrongPassword = false
      }
      passwordInput.type = "password"
    },
    loginUser: function () {
      const passwordInput = document.getElementById('passwordInput')
      const emailInput = document.getElementById('eMailInput')

      const userData = {
        email: this.email,
        password: this.password
      }
      const uri = process.env.SERVER_ADDRESS + process.env.USER_SERVICE_PORT + '/api/login'
      axios.post(uri, userData)
        .then((response) => {
          if(response.data.success === true){
            console.log("Login successfull")
            let userUpdate = response.data.user
            userUpdate.token = response.data.token

            this.$store.commit('userAuthenticated', true)
            this.$store.commit('userLogin', userUpdate)
            router.push({ path: '/dashboard'})
          }
          else if(response.data.success === false){
            wrongPassword = true
            emailInput.style.border = "2px solid #DA1E28"
            passwordInput.style.border = "2px solid #DA1E28"
          }
        })
        .catch(function (err) {
          console.log("LOGIN_API_ERROR")
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  #loginId{
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #393939;
  }
  #loginForm{
    position: relative;
    margin: auto;
    width: 341px;
    top:16vh
  }
  #loginLogo{
    margin-bottom: 48px;
  }
  #inputFields{
    position: relative;
    margin: auto;
    width: 288px;
  }
  .textInput {
    display: block;
    position: relative;
    height: 40px;
    width: 288px;
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
    display: inline-block;
    position: relative;
    height: 40px;
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
  #loginButton{
    width: 112px;
    left: 176px;
  }
  #registerButton{
    position: absolute;
    width: 158px;
    right: 56px;
    bottom: 64px;
  }
</style>