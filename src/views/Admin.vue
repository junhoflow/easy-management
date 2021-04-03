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
        <v-toolbar-title>구역 관리</v-toolbar-title>
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              구역 추가
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="구역 이름"
                    ></v-text-field>
                  </v-col>
                    <v-text-field
                      v-model="editedItem.todo"
                      outlined
                      label="내용"
                    ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                취소
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                저장
              </v-btn>
            </v-card-actions>
          </v-card>
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
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="white"
        @click="getinfo"
      >
        구역을 추가하세요
      </v-btn>
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
        text: '구역 이름',
        align: 'start',
        value: '위치'
      },
      { text: '내용', value: '내용', sortable: false },
      { text: '오늘 투입된 사람 수', value: '하루직원수' },
      { text: '하루 인건비', value: '하루인건비' },
      { text: '총 인건비', value: '총인건비' },
      { text: '삭제하기', value: 'actions', sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      위치: '',
      내용: '',
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

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '구역 추가' : '수정하기'
    }
  },

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
    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      this.tmpitem = item
    },

    deleteItemConfirm () {
      this.$firebase.database().ref('area/' + this.tmpitem['위치']).remove()
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
      this.getinfo()
      location.reload()
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

    async save () {
      const m = new Date()
      const dateTime = m.getFullYear() + '-' +
      ('0' + (m.getMonth() + 1)).slice(-2) + '-' +
      ('0' + m.getDate()).slice(-2)
      this.items.push(this.editedItem)
      this.$firebase.database().ref('area/' + this.editedItem.name).update({
        위치: this.editedItem.name, 내용: this.editedItem.todo, 카운트: 0
      })
      this.$firebase.database().ref('area/' + this.editedItem.name + '/카운트').update({
        총인건비: 0
      })
      this.$firebase.database().ref('area/' + this.editedItem.name + '/카운트/하루인건비/' + dateTime).set(0)
      this.$firebase.database().ref('area/' + this.editedItem.name + '/카운트/하루직원수/' + dateTime).set(0)

      this.close()
      location.reload()
    },
    handleClick (value) {
      console.log(value)
      // 구역 이름 클릭할때의 이벤트 추가
    },

    async getinfo () {
      this.$firebase.database().ref('code').on('value', d => {
        this.VerifyCode = d.val()
      })
      const m = new Date()
      const dateTime = m.getFullYear() + '-' +
      ('0' + (m.getMonth() + 1)).slice(-2) + '-' +
      ('0' + m.getDate()).slice(-2)

      this.$firebase.database().ref('area').on('value', d => {
        for (const areaName in d.val()) {
          this.$firebase.database().ref('area').on('value', d => {
            this.items = []
            let tmp = []
            let tmp2 = []
            tmp = Object.values(d.val())
            this.$firebase.database().ref('area/' + areaName + '/카운트/하루직원수/' + dateTime).on('value', d => {
              let tmp = 0
              tmp = d.val()
              if (tmp === null) tmp = 0
              this.todayWorkers = tmp
            })
            this.$firebase.database().ref('area/' + areaName + '/카운트/하루인건비/' + dateTime).on('value', d => {
              let tmp = 0
              tmp = d.val()
              if (tmp === null) tmp = 0
              this.todayfee = tmp
            })
            this.$firebase.database().ref('area/' + areaName + '/카운트/총인건비').on('value', d => {
              let tmp = 0
              tmp = d.val()
              if (tmp === null) tmp = 0
              this.totalfee = tmp
            })
            tmp2 = tmp[this.count]
            tmp2.하루직원수 = this.todayWorkers
            tmp2.하루인건비 = this.todayfee
            tmp2.총인건비 = this.totalfee
            this.yes.push(tmp2)
          })
          this.count++
        }
        this.items = this.yes
        console.log(this.items)
      })
      this.count = 0
      this.yes = []
    }
  }
}
</script>
