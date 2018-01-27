<template>
  <v-app class='grey darken-3'>

    <v-card class='lime accent-2' height='250px'>
    <br><br>
      <h1 class="display-2 text-xs-center" style='font-size:6vw;'>CONTACT <strong>US</strong></h1>
      <br>
      <v-layout justify-center>
      <v-icon class="display-2 text-xs-center">keyboard_arrow_down</v-icon>
      </v-layout>
    </v-card>
  <v-layout justify-center style='margin-top: -64px;' wrap>
    <v-flex sm9>
      <v-card class='grey lighten-2 elevation-10'>
        <v-container>
        <p class="headline text-xs-center"> write <strong>email</strong> to us at </p>
        <br>
        <h1 class="text-xs-center" style='font-size:6vw;'><strong class="">wthreesaver</strong>@gmail.com</h1>
        </v-container>

        <p class="caption grey--text text-xs-center"> we will respond you as soon we read your email. feel free to talk with us <br> thank you <strong>- w3saver</strong></p>
        <v-card-actions>
          <v-btn block flat @click='$router.push("/")'>
          <v-icon>keyboard_backspace</v-icon>
            go back to home page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>