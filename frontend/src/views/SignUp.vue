<template>
  <div class="vue-template row justify-content-center mt-5">
    <b-jumbotron class="col-md-6">
      <h1 class="text-center">Inscription</h1>

      <p class="text-center">
        Tu as déjà un compte ?
        <b-link class="text-center" @click="toLogin()">Se connecter</b-link>
      </p>

      <b-form>
        <b-form-group>
          <label for="username">Username</label>
          <b-form-input
            type="text"
            class="form-control"
            id="username"
            name="username"
            v-model="form.username"
            placeholder="Username"
            :class="{ 'is-invalid': submitted && $v.form.username.$error }">
          </b-form-input>
        </b-form-group>

        <b-form-group>
          <label for="email">Email</label>
          <b-form-input
            type="email"
            class="form-control"
            id="email"
            name="email"
            v-model="form.email"
            placeholder="name@example.com"
            :class="{ 'is-invalid': submitted && $v.form.email.$error }">
          </b-form-input>
          <div
            v-if="submitted && $v.form.email.$error" class="invalid-feedback">
            <span v-if="!$v.form.email.required">
              Veuillez saisir un email
            </span>
            <span v-else-if="!$v.form.email.email">
              Veuillez saisir un email valide
            </span>
          </div>
        </b-form-group>

        <b-form-group>
          <label for="password">Password</label>
          <b-form-input
            type="password"
            class="form-control"
            id="password"
            name="password"
            v-model="form.password"
            placeholder="••••••••••"
            :class="{ 'is-invalid': submitted && $v.form.password.$error }">
          </b-form-input>
          <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">
            <span
              v-if="!$v.form.password.required">
              Veuillez rentrer un mot de passe valide
            </span>
            <span
              v-else-if="!$v.form.password.minLength">
              Le mot de passe doit être au moins de 6 caractères
            </span>
            <span
              v-else-if="!$v.form.password.alphaNumberSpecial">
              Le mot de passe doit au moins avoir une minuscule, une majuscule, un chiffre et un caractère spécial
            </span>
          </div>
        </b-form-group>

        <b-form-group>
          <label for="confirmPassword">Confirm Password</label>
          <b-form-input
            type="password"
            class="form-control"
            id="confirmPassword"
            name="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="••••••••••"
            :class="{ 'is-invalid': submitted && $v.form.confirmPassword.$error }">
          </b-form-input>
          <div v-if="submitted && $v.form.confirmPassword.$error" class="invalid-feedback">
            <span v-if="!$v.form.confirmPassword.required">
              Veuillez confirmer le mot de passe
            </span>
            <span v-else-if="!$v.form.confirmPassword.sameAsPassword">
              le mot de passe doit correspondre
            </span>
          </div>
        </b-form-group>

        <b-form-group>
          <label>Description</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            name="description"
            v-model="form.description"
            rows="4"
            placeholder="Description"
            :class="{ 'is-invalid': submitted && $v.form.username.$error }">
          </textarea>
          <div v-if="submitted && !$v.form.description.required" class="invalid-feedback">
            Veuillez saisir une description de vous
          </div>
        </b-form-group>

        <b-form-group>
          <button 
            class="btn btn-primary btn-lg btn-block" @click.prevent="signup()">
            S'inscrire
          </button>
        </b-form-group>
      </b-form>
    </b-jumbotron>
  </div>
</template>

<script>
import { required, email, minLength, sameAs, helpers } from "vuelidate/lib/validators"
const alphaNumberSpecial = helpers.regex('alpha', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]){6,}/)
import axios from "axios"

export default {
  name: 'signup',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: '',
        isAdmin: false
      },
      submitted: false
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(6),
        alphaNumberSpecial
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      },
      description: {
        required
      }
    }
  },
  methods: {
    toLogin() {
      this.$router.push("/");
    },
    signup() {
      // arrêt si le formulaire est invalide
      this.$v.$touch();
      this.submitted = true;
      console.log(this.form);
      const body = this.form;
      axios.post("http://localhost:3000/api/user/signup", body)
      .then(response => {
        console.log(response)
        this.$router.push("/home");
      })
      .catch(() => {
        alert( "une erreur est survenue dans le formulaire" )
      });
    },
  }
}
</script>

