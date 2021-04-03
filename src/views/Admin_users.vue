<template>
<v-container>
  <v-row>
    <v-col>
    <div>현재 인증코드 : {{VerifyCode}}</div>
    <v-layout>
      <v-text-field v-model="code" label="인증코드" outlined dense></v-text-field>
    <v-btn color="success" @click="changeCode">변경</v-btn>
    </v-layout>
    </v-col>
  </v-row>
  <template>
    <v-btn @click="areaPage">구역 관리</v-btn>
    <v-btn @click="usersPage">직원 관리</v-btn>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="총인건비"
    class="elevation-1"
    @click:row="handleClick"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>직원 관리</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        </v-dialog>
        <v-dialog v-model="dialogDelete" width="70%" max-width="500">
          <v-card>
            <v-card-title class="headline">데이터가 완전히 삭제됩니다</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">삭제</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
</v-container>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    todayPeople: 0,
    todayPay: 0,
    totalPay: 0,
    headers: [
      {
        text: '이름',
        align: 'start',
        value: '이름'
      },
      { text: '구분', value: '직위', sortable: false },
      { text: '전화번호', value: '전화번호' },
      { text: '계좌번호', value: '계좌번호' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      이름: '',
      구분: '',
      todayPeople: 0,
      todayPay: 0,
      totalPay: 0,
      todo: ''
    },
    defaultItem: {
      name: '',
      todayPeople: 0,
      todayPay: 0,
      totalPay: 0,
      todo: ''
    },
    code: '',
    VerifyCode: '',
    tmpitem: [],
    todayWorkers: 0,
    todayfee: 0,
    totalfee: 0,
    yes: [],
    count: 0
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.getinfo()
  },
  methods: {
    changeCode () {
      this.$firebase.database().ref('code').set(this.code)
    },
    areaPage () {
      this.$router.push('/admin')
    },
    usersPage () {
      this.$router.push('/admin_users')
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    handleClick (value) {
      console.log(value)
      // 구역 이름 클릭할때의 이벤트 추가
    },

    async getinfo () {
      this.$firebase.database().ref('code').on('value', d => {
        this.VerifyCode = d.val()
      })
      const query = this.$firebase.database().ref('users').orderByKey()
      query.once('value')
        .then(snapshot => {
          snapshot.forEach(childSnapshot => {
            // childData will be the actual contents of the child
            const childData = childSnapshot.val()
            this.items.push(childData)
          })
        })
    }
  }
}
</script>
