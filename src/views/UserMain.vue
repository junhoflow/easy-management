<template>
<v-card :style="backGroundColor">
  <v-container fluid>
    <v-layout margin>
      <v-spacer></v-spacer>
      <v-btn color="primary" width="50%" min-width="200" @click="infoPage">내 정보 입력하기(필수)</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
    <h1 v-if="InWork" style="color: black">-출근중-</h1>
    <v-spacer></v-spacer>
    </v-layout>
    <v-card>
    <v-layout>
      <v-text-field
          v-model="title"
          label="일할 장소"
          prepend-icon="mdi-map-marker"
        ></v-text-field>
        <v-text-field
        v-model="content"
          label="할 일"
        ></v-text-field>
    </v-layout>
    <v-layout>
    <v-spacer></v-spacer>
    <v-btn color="success" width="45%" height="40" @click="post">출근하기</v-btn>
    <v-spacer></v-spacer>
    <v-btn color="red" width="45%" height="40" dark @click="OutWork">퇴근하기</v-btn>
    <v-spacer></v-spacer>
    </v-layout>
    </v-card>
    <v-spacer></v-spacer>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item['날짜'] }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>

                <v-list-item>
                  <v-list-item-content>일한 장소 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item["장소"] }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>한 일 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item["내용"] }}
                  </v-list-item-content>
                </v-list-item>

              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</v-card>
</template>

<script>
export default {
  data: () => ({
    itemsPerPage: 30,
    items: [],
    title: '',
    content: '',
    where: '',
    what: '',
    name: '',
    phone: '',
    money: '',
    value: '',
    backGroundColor: {
      backgroundColor: 'white'
    },
    InWork: false
  }),
  created () {
    this.get()
  },
  methods: {
    async post () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      // this.items.push({
      //   title: dateTime, where: this.title, what: this.content
      // })
      await this.$firebase.database().ref('users/' + this.$store.state.user.uid + '/출근기록/' + dateTime).set({
        날짜: dateTime, 장소: this.title, 내용: this.content
      })
      this.title = ''
      this.content = ''
      this.backGroundColor.backgroundColor = '#9cd6ff'
      this.InWork = true
      await this.get()
    },
    async get () {
      await this.$firebase.database().ref('users/' + this.$store.state.user.uid + '/출근기록/').on('value', d => {
        this.items = []
        Object.values(d.val())
        this.items = Object.values(d.val())
      })
    },
    update () {

    },
    del () {

    },
    infoPage () {
      this.$router.push('/userInfo')
    },
    OutWork () {
      this.InWork = false
      this.backGroundColor.backgroundColor = 'white'
    }
  }
}
</script>
