<template>
    <div class="post contain row justify-content-center mt-5">
      <b-card class="col-md-6">
        <div class="publication-informations">
          <p class="user">{{ user.username }}</p>
          <p>le {{ user.createdAt | formatDate }}</p>
        </div>
        <h3>{{title}}</h3>
        <br/>
      </b-card>

    <!--<div class="row justify-content-center mt-5">
      <b-card class="post col-md-6">
		  	<h2>Fil d'actualité</h2>
		  	<Post
		  		v-for="item in posts"
		  		:title="item.title"
		  		:content="item.content"
		  		:image="item.image"
		  		:createdAt="item.createdAt"
		  		:key="item.title"
		  	/>
      </b-card>
    </div>-->

        <!--<div class="user-bloc">
            <div class="publication-informations">
                <p class="user">{{ post.User.username }}</p>
                <p>le {{ post.createdAt | formatDate }}</p>
            </div>
        </div>
        <p>{{ post.content }}</p>-->
    </div>
</template>

<script>
import axios from 'axios'
//import Post from '../component/Post'

export default {
  name: 'Post',
  components: {
    //Post
  },
  props: ["title", "content", "image", "createdAt"],
  data() {
    return {
      id: localStorage.getItem('id'),
      user: {}
    }
  },
  mounted() {
    axios.get("http://localhost:3000/api/post/" + this.id , {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response.data)
        this.user = response.data;
      })
      .catch(error => console.log({ error }));
  
  },
}
</script>