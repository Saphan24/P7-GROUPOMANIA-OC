<template>
  <b-container>
    <CreatePostForm :reload="fetchData" />
    <div class="post row justify-content-center mt-5" v-for="post in posts" :key="post.id">
      <b-card class="container col-md-6">
        <button
          v-if="post.User.id == userId || isAdmin"
          type="button"
          class="close"
          @click.prevent="delPost(post.id)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="user-bloc">
          <p>
            Publiée par
            <strong class="user">{{ post.User.username }}</strong>
            à {{ post.createdAt | formatDate }}
          </p>
        </div>
        <hr />

        <div class="publication">
          <h3 class="text-center">{{ post.title }}</h3>
          <b-img v-if="post.image" :src="post.image" fluid alt="Responsive image"></b-img>
          <br />
          <br />
          <p>{{ post.content }}</p>
          <br />
        </div>

        <div class="commentaires">
          <div v-for="comment in post.Comments" :key="comment.id">
            <br />
            <div>
              <b-card-group class="col-md-12 text-center">
                <b-card border-variant="dark" class="bg-secondary text-light">
                  <button
                    v-if="userId === comment.userId || isAdmin"
                    @click.prevent="DeleteComment(comment.id, comment.userId)"
                    type="button"
                    class="close"
                    alt="supprimer"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <p>
                    <small>
                      <strong>{{ comment.User.username }}</strong>
                      a réagi à {{ comment.createdAt | formatDate }}
                    </small>
                  </p>
                  <b-card-text>
                    <b-img
                      class="p-5"
                      fluid
                      alt="Fluid image"
                      v-if="comment.image"
                      :src="comment.image"
                    ></b-img>
                    <p>{{ comment.content }}</p>
                  </b-card-text>
                </b-card>
              </b-card-group>
            </div>
          </div>
          <br />
          <CreateCommentForm :reload="fetchData" :postId="post.id" />
        </div>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios'
import CreatePostForm from '../components/CreatePostForm'
import CreateCommentForm from '../components/CreateCommentForm.vue'
import jwt from 'jsonwebtoken'

export default {
  name: 'Posts',
  components: {
    CreatePostForm,
    CreateCommentForm
  },
  data() {
    return {
      posts: {},
      comments: [],
      userId: localStorage.getItem('userId'),
      isAdmin: jwt.decode(localStorage.getItem("token")).isAdmin

    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get("http://localhost:3000/api/post/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(response => {
          console.log(response.data)
          this.posts = response.data;
        })
        .catch(error => console.log({ error }));

      axios.get("http://localhost:3000/api/comment/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(response => {
          console.log(response.data)
          this.comments = response.data;
        })
        .catch(error => console.log({ error }));
    },
    delPost(id, userIdOrder) {
      if (
        window.confirm("Voulez vous vraiment supprimer le post?")
      )
        axios
          .delete("http://localhost:3000/api/post/" + id, {
            data: { userIdOrder },
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token")
            },
          })
          .then(() => {
            this.fetchData()
          })
          .catch(error => console.log(error));
    },
    DeleteComment(id, userIdOrder) {
      if (
        window.confirm("Voulez vous vraiment supprimer le commentaire?")
      )
        axios
          .delete("http://localhost:3000/api/comment/" + id, {
            data: { userIdOrder },
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token")
            },
          })
          .then(() => {
            this.fetchData()
          })
          .catch(error => console.log(error));
    },
  },
}
</script>