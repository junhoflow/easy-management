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
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="todayPeople"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>관리</v-toolbar-title>
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
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
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
    headers: [
      {
        text: '구역 이름',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: '오늘 투입된 사람 수', value: 'todayPeople' },
      { text: '하루 인건비', value: 'todayPay' },
      { text: '총 인건비', value: 'totalPay' },
      { text: '수정/삭제', value: 'actions', sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      todayPeople: 0,
      todayPay: 0,
      totalPay: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      todayPeople: 0,
      todayPay: 0,
      totalPay: 0,
      protein: 0
    },
    code: '',
    VerifyCode: ''
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '구역 추가' : 'Edit Item'
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
    this.initialize()
    this.get()
  },
  methods: {
    initialize () {
      this.items = [
        {
          name: 'Frozen Yogurt',
          todayPeople: 159,
          todayPay: 6.0,
          totalPay: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          todayPeople: 237,
          todayPay: 9.0,
          totalPay: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          todayPeople: 262,
          todayPay: 16.0,
          totalPay: 23,
          protein: 6.0
        }
      ]
    },
    changeCode () {
      this.$firebase.database().ref('code').set(this.code)
    },
    get () {
      this.$firebase.database().ref('code').on('value', d => {
        this.VerifyCode = d.val()
      })
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
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

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
