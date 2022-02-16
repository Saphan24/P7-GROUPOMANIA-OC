<template>
  <div class="home">
    <NavBar />
    <div class="addProfile">
      <div class="contain row justify-content-center mt-5">
        <b-card class="profile col-md-6 col-md-pull-6">
          <h1 class="text-center">
            <strong>
              <p class="center" v-if="profile.isAdmin">
                <b-avatar variant="dark" size="100px"></b-avatar >
              </p>
            </strong>
          </h1>

          <h1 class="text-center">
            <strong>
              <p class="center" v-if="!profile.isAdmin">
                <b-avatar variant="primary" size="100px"></b-avatar>
              </p>
            </strong>
          </h1>

          <b-form>
            <b-form-group>
              <label>Username</label>
              <b-card>{{ profile.username }}</b-card>
            </b-form-group>

            <b-form-group>
              <label>Email</label>
              <b-card>{{ profile.email }}</b-card>
            </b-form-group>

            <b-form-group>
              <label>Description</label>
              <b-card>{{ profile.description }}</b-card>
            </b-form-group>

            <p class="text-center">Vous êtes inscrit depuis à:{{ profile.createdAt | formatDate }}</p>
          </b-form>

          <div class="modal-footer">
            <b-button
              class="btn btn-warning btn-lg"
              v-b-modal.modal-1
              @click.prevent="modif()"
            >Modifier</b-button>

            <b-button
              variant="danger"
              class="btn btn-lg"
              v-b-modal.modal-2
              @click.prevent="onConfirm()"
            >Supprimer</b-button>
          </div>
          <div class="row justify-content-center">
            <b-modal id="modal-1" title="Modification utilisateur">
              <p class="my-4">Êtes-vous certain de vouloir modifier l'utilisateur ?</p>
            </b-modal>
          </div>
          <br />
          <div class="row justify-content-center">
            <b-modal id="modal-2" title="Suppression utilisateur">
              <p class="my-4">Êtes-vous certain de vouloir supprimer l'utilisateur ?</p>
            </b-modal>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import axios from "axios"

export default {
  name: 'myprofile',

  components: {
    NavBar,
  },
  data() {
    return {
      userId: localStorage.getItem('userId'),
      profile: {}
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
    modif() {
      this.$router.push('/modifprofile');
      axios.put("http://localhost:3000/api/user/myprofile/" + this.userId, this.profile, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => console.log({ error }));
    },
    onConfirm() {
      axios.delete("http://localhost:3000/api/user/myprofile/" + this.userId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(() => {
          console.log("Profile supprimé");
          localStorage.clear();
          this.$router.push('/Signup');
        })
    },
    Logout() {
      console.log("Suppression du localStorage");
      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>
