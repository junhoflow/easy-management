<template>
    <v-card>
        <v-card-title>
            로그인
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signInWithGoogle">
                <v-icon>mdi-google</v-icon>
                구글로그인
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    async signInWithGoogle () {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase.auth().languageCode = 'ko'
      const r = await this.$firebase.auth().signInWithPopup(provider)
      console.log(r)
    }
  }
}
