<template>
  <div id="app" class="home">
    <NavBar />
    <div class="content">
      <Posts/>
    </div>

    
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Posts from '../components/Posts.vue'

export default {
  
  name: 'Home',
  components:{
    NavBar,
    Posts
},
  data() {
    return {
      userId: localStorage.getItem('userId'),
    }
  }
}
</script>


