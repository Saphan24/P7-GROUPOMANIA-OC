<template>
  <div class="home">
    <div class="header">
      <NavBar />
    </div>
    <div class="modifProfile">
      <div class="contain row justify-content-center mt-5">
        <b-card class="profile col-md-6 col-md-pull-6">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click.prevent="annule()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h1 class="text-center">Modification de profil</h1>

          <b-form>
            <b-form-group>
              <label for="username">Username</label>
              <b-form-input
                type="text"
                class="form-control"
                id="username"
                name="username"
                v-model="profile.username"
                placeholder="Username"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label for="email">Email</label>
              <b-form-input
                type="email"
                class="form-control"
                id="email"
                name="email"
                v-model="profile.email"
                placeholder="name@example.com"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label>Description</label>
              <textarea
                type="text"
                class="form-control"
                id="description"
                name="description"
                v-model="profile.description"
                rows="4"
                placeholder="Description"
              ></textarea>
            </b-form-group>

            <div class="modal-footer">
              <button class="btn btn-primary" @click.prevent="modif()">OK</button>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import axios from "axios"

export default {
  name: 'modifprofile',

  components: {
    NavBar,
  },
  data() {
    return {
      userId: localStorage.getItem('userId'),
      profile: {},
    }
  },
  mounted() {
    axios.get("http://localhost:3000/api/user/myprofile/" + this.userId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response.data)
        this.profile = response.data;
      })
      .catch(error => console.log({ error }));
  },

  methods: {
    annule() {
      this.$router.push('/myprofile')
    },
    modif() {
      axios.put("http://localhost:3000/api/user/myprofile/" + this.userId, this.profile, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(() => {
          console.log("Profile modifié");
          this.$router.push('/myprofile')
        })
        .catch(error => console.log({ error }));
    }
  }

}
</script>