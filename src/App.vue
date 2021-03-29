<template>
<v-app>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-app-bar dense color="white">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>준호건설 출퇴근 시스템</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-app-bar-title v-if="$store.state.user">{{ $store.state.user ? $store.state.user.displayName : '사용자' }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.user" @click="signOut" color="#a3a3a3">
        로그아웃
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-card>
</v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    async signOut () {
      const r = await this.$firebase.auth().signOut()
      console.log(r)
    }
  }
}
</script>
