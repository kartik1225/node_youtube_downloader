<template>
  <v-app class='green accent-2' style='height:100%;'>
  <div>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      overflow
    >

   
      <v-list dense class="pt-0">
              <v-list-tile v-for="item in items" :key="item.title" href :to='item.href' @click="">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title  }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar fixed class="elevation-1 blue-grey darken-3"  app clipped-left dark>
      <v-toolbar-side-icon class='white--text' @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title role='button' class='white--text' @click='$router.push("/")'><strong>w3</strong>saver</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-slide-x-transition>
       <router-view></router-view>
      </v-slide-x-transition>
    </main>
  </div>
</v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'w3saver', icon: 'home', href:'/' },
          { title: 'Contact Us', icon: 'email', href:'/contact' },
          { title:'bug report', icon: 'bug_report', href:'/bug' }
        ],
        right: null
      }
    }
  }
</script>