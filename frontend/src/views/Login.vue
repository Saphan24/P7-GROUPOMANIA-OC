<template>
  <div class="row justify-content-center mt-5">
    <b-jumbotron class="col-xl-4 col-lg-5 col-md-6">
      <h1 class="text-center">Connexion</h1>

      <p class="text-center">
        Tu n'as pas encore de compte ?
        <b-link class="text-center" @click="createAccount()">Créer un compte</b-link>
      </p>
      
      <b-form>
        <div
          class="alert alert-icon alert-danger justify-content-center"
          v-show="pwAlert"
          style="display: none;"
        >Incorrect username or password</div>
        <b-form-group>
          <label for="email">Email</label>
          <b-form-input
            type="email"
            class="form-control"
            id="email"
            name="email"
            v-model="email"
            placeholder="name@example.com"
            :class="{ 'is-invalid': submitted && $v.email.$error }">
          </b-form-input>
          <div
            v-if="submitted && !$v.email.required"
            class="invalid-feedback"
          >Veuillez saisir votre email</div>
        </b-form-group>
        <b-form-group>
          <label for="password">Password</label>
          <b-form-input
            type="password"
            class="form-control"
            id="password"
            name="password"
            v-model="password"
            placeholder="••••••••••"
            :class="{ 'is-invalid': submitted && $v.password.$error }"
          ></b-form-input>
          <div
            v-if="submitted && $v.password.$error"
            class="invalid-feedback"
          >Veuillez saisir votre mot de passe</div>
        </b-form-group>
        <b-form-group>
          <button
            class="btn btn-primary btn-lg btn-block" @click.prevent="login()">
            Se connecter
          </button>
        </b-form-group>
      </b-form>
    </b-jumbotron>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators"
import axios from "axios"

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      pwAlert: false,
      loading: false
    }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    },
  methods: {
    createAccount() {
      this.$router.push("/signup");
    },
    login() {
      this.submitted = true;
      this.$v.$touch();
      console.log({email: this.email, password: this.password});
      axios.post("http://localhost:3000/api/user/login", {
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log(response)
        if(response.error){
            alert(response.error)
        }else{
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          this.$router.push("/home")
        }
      })
      .catch(() => {
        alert("Veuillez saisir votre email et/ou votre mot de passe correctement");
      })
    },
  },
};
</script>

<style scoped lang="scss">
  span.invalid-feedback{
    display: block;
    color: red;
}

</style>
