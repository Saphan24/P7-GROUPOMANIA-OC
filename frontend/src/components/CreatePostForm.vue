<template>
  <main>
    <!--Nouvelle publication row-->
    <div class="contain row justify-content-center mt-5">
      <b-card class="col-md-6">
        <div id="post-row" class="new row">
          <div class="col-md-12">
            <h3>Publication</h3>
            <b-form @submit.prevent="createNewPost()">
              <input
                type="text"
                class="form-control"
                v-model="form.title"
                placeholder="Titre"
                required
              />
              <input
                type="text"
                class="form-control"
                v-model="form.content"
                placeholder="Laisser un commentaire"
                required
              />
              <div>
                <input ref="file" type="file" @change="onSelectFile()" />
              </div>
              <b-button type="submit">Publier</b-button>
            </b-form>
          </div>
        </div>
      </b-card>
    </div>
    <!-- fin publication row -->
  </main>
</template>


<script>
import axios from 'axios'

export default {
  name: 'CreatePostForm',
  data() {
    return {
      form: {
        title: '',
        content: '',
        image: null
      }
    }
  },
  props:{reload:Function},
  methods: {
    onSelectFile(){
      this.form.image = this.$refs.file.files[0];
    },
    createNewPost() {
      const formData = new FormData();
      formData.append('title', this.form.title);
      formData.append('content', this.form.content);
      formData.append('image', this.form.image);
      console.log(formData)
      axios
        .post('http://localhost:3000/api/post/new', formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          'Content-Type': 'multipart/form-data' 
        }
      })
        .then(() => {
          console.log("message posté");
          this.reload()
          this.form = ''
        })
        .catch(error => alert(error))
    }
  }
}   
</script>

