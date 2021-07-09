<template>
  <div id="registerId">
    <div id="registerForm">
      <img src="./../assets/logo.svg" id="registerLogo">
      <div id="inputFields">
        <input type="text" class="textInput" id="userNameRegister" placeholder="Benutzername"
          v-model="username"
        >
        <input type="email" class="textInput" id="eMailRegister" placeholder="E-Mail Adresse"
          v-model="email"
        >

        <input type="password" class="textInput" id="passwordRegister" placeholder="Passwort"
          v-model="password"
          v-on:click="hidePassword()"
        >
        <input type="password" class="textInput" id="passwordRegisterRepeat" placeholder="Passwort wiederholen"
          v-model="passwordRepeat"
        >
        <button type="submit" class="button" id="passwordGenerationButton"
          v-on:click="generatePwd()"
        >Passwort generieren</button>
        

        <button type="submit" class="button" id="registerButton"
          v-on:click="register()"
        >Registrierung abschließen</button>
      </div>
    </div>
    <router-link :to="{name: 'Login'}">
      <button class="button" id="loginButton">Login</button>
    </router-link>
  </div>
</template>

<script>
import { rword } from 'rword';
import axios from 'axios'
import { router } from "./../router"


export default {
  name: 'Register',
  data () {
      return {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
      }
  },
  mounted(){
    if(this.$store.state.user){
      const uri = process.env.SERVER_ADDRESS.toString() + process.env.USER_SERVICE_PORT.toString() + '/api/closeSession'
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

    let userUpdate = undefined
    this.$store.commit('userAuthenticated', false)
    this.$store.commit('userLogin', userUpdate)
  },
  methods: {
      hidePassword(){
        const passwordRegister = document.getElementById('passwordRegister')
        const passwordRegisterRepeat = document.getElementById('passwordRegisterRepeat')

        passwordRegister.type = "password"
        passwordRegisterRepeat.type = "password"

        passwordRegister.value = ""

        this.password = undefined
      },
      generatePwd() {
        const pwd = rword.generate(3)
        const passwordRegister = document.getElementById('passwordRegister')
        const passwordRegisterRepeat = document.getElementById('passwordRegisterRepeat')

        passwordRegister.type = "text"
        passwordRegisterRepeat.type = "text"

        passwordRegister.value = pwd
        passwordRegisterRepeat.value = pwd
      },
      register(){
        const eMailRegister = document.getElementById("eMailRegister")
        const userNameRegister = document.getElementById("userNameRegister")
        const passwordRegister = document.getElementById("passwordRegister")
        const passwordRegisterRepeat = document.getElementById("passwordRegisterRepeat")

        // check whether form is complete
        let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
        if(!document.querySelector("#eMailRegister").value.match(regExp)){
          eMailRegister.style.border = "2px solid #DA1E28"
        }
        else{
          eMailRegister.style.border = "none"
          eMailRegister.style.borderBottom = "1px solid #8D8D8D"
        }
        if(this.username === ""){
          userNameRegister.style.border = "2px solid #DA1E28"
        }
        else{
          userNameRegister.style.border = "none"
          userNameRegister.style.borderBottom = "1px solid #8D8D8D"
        }
        if(this.password === ""){
          passwordRegister.style.border = "2px solid #DA1E28"
        }
        else {
          passwordRegister.style.border = "none"
          passwordRegister.style.borderBottom = "1px solid #8D8D8D"
        }

        if(this.password === this.passwordRepeat && this.password != ""){
          passwordRegisterRepeat.style.border = "2px solid #24A148"
          const userData = {
            username: this.username,
            email: this.email,
            password: this.password
          }
          if(this.email != "" && this.password != "" && this.username != "" && document.querySelector("#eMailRegister").value.match(regExp)){
            const uri = process.env.SERVER_ADDRESS.toString() + process.env.USER_SERVICE_PORT.toString() + '/api/register'
            axios.post(uri, userData)
              .then((response) => {
                console.log(response)
                if(response.data.success === true){
                  console.log("Registration successfull")
                  let userUpdate = response.data.user
                  userUpdate.token = response.data.token
                  this.$store.commit('userAuthenticated', true)
                  this.$store.commit('userLogin', userUpdate)
                  router.push({ path: '/dashboard'})
                }
                if(response.data.success === false && !response.data.message == "email address already in use"){
                  console.warn("Registration failed")
                  alert("Fehler bei der Registrierung. Bitte versuchen Sie es erneut")
                }
                if(response.data.success === false && response.data.message == "email address already in use"){
                  console.warn("E-Mail Address already in use")
                  //wäre das ne seitensprung website wär´s jetzt doof gelaufen
                  eMailRegister.value = "E-Mail Address already in use"
                  eMailRegister.style.border = "2px solid #DA1E28"
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        }
        else{
          passwordRegister.style.border = "2px solid #DA1E28"
          passwordRegisterRepeat.style.border = "2px solid #DA1E28"

          passwordRegisterRepeat.value = ""
          this.passwordRepeat = undefined
        }
      }
  }
}
</script>

<style scoped>
  #registerId{
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #393939;
  }
  #registerForm{
    position: relative;
    margin: auto;
    width: 341px;
    top:16vh
  }
  #registerLogo{
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
  #registerButton{
    width: 248px;
    height: 40px;
    left: 40px;
    margin-top: 80px;
  }
  #loginButton {
    position: absolute;
    width: 158px;
    right: 56px;
    bottom: 64px;
  }
  #passwordGenerationButton {
      width: 212px;
      height: 32px;
  }
  #passwordRegister {
      margin-top: 36px;
  }
</style>