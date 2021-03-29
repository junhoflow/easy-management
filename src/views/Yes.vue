<template>
  <v-container fluid>
    <v-card>
      <v-subheader>개인 정보</v-subheader>
      <v-card-text>
        <v-text-field v-model="name" label="이름"></v-text-field>
        <v-text-field v-model="phone" label="전화번호"></v-text-field>
        <v-text-field v-model="money" label="계좌번호"></v-text-field>
        <a >정확하게 입력하셔야 원활한 송금이 이루어질 수 있습니다</a>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="userInfoEdit">수정하기</v-btn>
      </v-card-actions>
      <v-card-text>
        {{value}}
      </v-card-text>
    </v-card>
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
      <v-flex xs3>
        <v-btn color="success" @click="post">출근하기</v-btn>
      </v-flex>
    </v-layout>
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
                {{ item.title }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>

                <v-list-item>
                  <v-list-item-content>일한 장소 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.where }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>한 일 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.what }}
                  </v-list-item-content>
                </v-list-item>

              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
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
    value: ''
  }),
  created () {
    this.get()
    this.read()
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
      await this.$firebase.firestore().collection('notes').add({
        title: dateTime, where: this.title, what: this.content
      })
      this.title = ''
      this.content = ''
      await this.get()
    },
    async get () {
      const snapshot = await this.$firebase.firestore().collection('notes').get()
      this.items = []
      snapshot.forEach(v => {
        console.log(v.id)
        this.items.push(v.data())
      })
      console.log(snapshot)
    },
    update () {

    },
    del () {

    },

    userInfoEdit () {
      this.$firebase.database().ref('users/' + this.$store.state.user.uid).set({ 이름: this.name, 전화번호: this.phone, 계좌번호: this.money })
    },
    read () {
      this.$firebase.database().ref('users/' + this.$store.state.user.uid).on('value', d => {
        this.value = d.val()
      })
    }
  }
}
</script>
