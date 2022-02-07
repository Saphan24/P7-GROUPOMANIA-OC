import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/HomePage.vue";
import Signup from "../views/SignUp.vue";
import Profile from "../views/MyProfile.vue";
import ModifProfile from "../views/ModifProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/myprofile",
    name: "MyProfile",
    component: Profile,
  },
  {
    path: "/modifprofile",
    name: "modifProfile",
    component: ModifProfile,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
