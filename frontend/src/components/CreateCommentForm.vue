<template>
  <div id="commentaires">
    <b-form @submit.prevent="submitComment()">
      <input
        type="text"
        class="form-control"
        rows="1"
        placeholder="Laisser un commentaire..."
        v-model="form.content"
      />
      <div>
        <input ref="file" type="file" @change="onSelectFile()" />
      </div>
      <b-button type="submit">Commenter</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Comments',

  data() {
    return {
      comments: {},
      form: {
        content: '',
        image: null
      }
    }
  },
  props:{
    postId: Number, 
    reload:Function
  },
  methods: {
    onSelectFile() {
      this.form.image = this.$refs.file.files[0];
    },
    submitComment() {
      const formData = new FormData();
      formData.append('content', this.form.content);
      formData.append('image', this.form.image);
      formData.append('postId', this.postId)
      console.log(formData)
      axios.post("http://localhost:3000/api/comment/new", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          console.log("commentaire posté")
          this.reload()
          this.form = ''
          
        })
        .catch(error => console.log({ error }));
    }
  }
}

</script>