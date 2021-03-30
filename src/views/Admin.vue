<template>
<v-container>
    <div>현재 인증코드 : {{VerifyCode}}</div>
    <v-layout>
    <v-col
    cols="9"
    sm="6"
    md="4">
    <v-text-field v-model="code" label="인증코드" outlined dense></v-text-field>
    </v-col>
    <v-btn color="primary" @click="changeCode">변경</v-btn>
</v-layout>
</v-container>

</template>

<script>
export default {
  data: () => ({
    code: '',
    VerifyCode: ''
  }),
  created () {
    this.get()
  },
  methods: {
    changeCode () {
      this.$firebase.database().ref('code').set(this.code)
    },
    get () {
      this.$firebase.database().ref('code').on('value', d => {
        this.VerifyCode = d.val()
      })
    }
  }
}
</script>
