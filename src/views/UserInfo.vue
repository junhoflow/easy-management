<template>
  <v-container fluid>

      <v-card-text>
        <h3>이름 : {{value['이름']}}</h3>
        <h3>전화 : {{value['전화번호']}}</h3>
        <h3>계좌 : {{value['계좌번호']}}</h3>
        <h3>구분 : {{value['직위']}}</h3>
      </v-card-text>
      <a >이 중 맞지 않거나 작성되지 않는 정보가 있다면 제대로 입력해주세요 </a>
    <v-row>
      <v-col cols="4">
        <v-subheader>이름</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field  v-model="name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>전화번호</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field v-model="phone"
          label="예시) 01012341234"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>계좌번호</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field v-model="money"
          label="예시) 0000000000 신한"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>구분</v-subheader>
      </v-col>
      <v-col cols="8">
          <v-select v-model="job" :items="['일용직', '정규직']" required></v-select>
      </v-col>
    </v-row>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="gotoHome" color="orange" dark>홈으로 돌아가기</v-btn>
        <v-btn @click="userInfoEdit" color="success">수정하기</v-btn>
      </v-card-actions>
  </v-container>
</template>
<script>

export default {
  data: () => ({
    itemsPerPage: 30,
    items: [],
    name: '',
    phone: '',
    money: '',
    job: '',
    value: ''
  }),
  created () {
    this.read()
  },
  methods: {
    gotoHome () {
      this.$router.push('/usermain')
    },

    userInfoEdit () {
      this.$firebase.database().ref('users/' + this.$store.state.user.uid).set({
        이름: this.name,
        전화번호: this.phone,
        계좌번호: this.money,
        직위: this.job
      })
      this.read()
    },
    read () {
      this.$firebase.database().ref('users/' + this.$store.state.user.uid).on('value', d => {
        this.value = d.val()
      })
    }
  }
}
</script>
