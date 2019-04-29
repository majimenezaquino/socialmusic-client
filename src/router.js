import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/Dashboard";
import Playlist from "@/views/Playlist.vue";
import Muiscs from "@/views/musics";
import MuiscDetail from "@/views/music-detail.vue";

import PlaylistDetail from "@/views/playlistitem.vue";
import Profiles from "@/views/profiles";
import Page404 from "@/views/pages/Page404.vue";
import PageLogin from "@/views/pages/login.vue";
import PageRegister from "@/views/pages/register.vue";
import Terms from "@/views/pages/terms.vue";
import MusicaFestival from "@/views/music-festival.vue";
import NightClub from "@/views/nightclub.vue";
import Musician from "@/views/musician.vue";
import Config from "@/views/config.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/profile/:id?",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/nightclub",
      name: "nightclub",
      component: NightClub
    },

    {
      path: "/musician",
      name: "musician",
      component: Musician
    },
    
    {
      path: "/playlist",
      name: "playlist",
      component: Playlist
    },

 
    {
      path: "/musics",
      name: "muisc",
      component: Muiscs
    },

    {
      path: "/musics/:id",
      name: "muiscdetail",
      component: MuiscDetail
    },
    
    {
      path: "/config/:type?",
      name: "config",
      component: Config
    },
    


    {
      path: "/playlist/:id",
      name: "playlist-albums",
      component: PlaylistDetail
    },
    
    
    {
      path: "/login",
      name: "page-login",
      component: PageLogin
    },

    {
      path: "/register",
      name: "page-register",
      component: PageRegister
    },

    {
      path: "/",
      name: "musica-festival",
      component: MusicaFestival
    },

    {
      path: "/terms",
      name: "terms",
      component: Terms
    },
   
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "*",
      name: "error404",
      component: Page404
    }
  ]
});
