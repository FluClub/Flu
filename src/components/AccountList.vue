<template>
  <div>
    <h1>{{ $t('account.account_list') }}
      <em class="text-warning float-right"> {{ $t('account.total_balance') }}：<ani-number :value="total"/> {{$unit}}</em>
    </h1>
    <q-list highlight
            sparse
            inset-separator
            no-border>

      <account-item v-for="account of accounts"
                    :account="account"
                    :key="account.address"
                    :to="'/wallet/account/' + account.address" />
    </q-list>
    <br>

    <q-btn size="lg"
           color="secondary"
           icon="add"
           flat
           :label="$t('account.btn.add')"
           @click="showNewAccountModal = true" />

    <q-btn size="lg" style="margin-left: 10px"
           color="secondary"
           flat
           icon="playlist_add"
           :label="$t('account.btn.importAccount')"
           @click="importAccount()" />

    <!-- Create Account Modal -->
    <q-modal v-model="showNewAccountModal"
             @hide="reset">
      <div class="q-pa-md">
        <p class="q-headline">{{ $t('account.create.title') }}</p>
        <p class="text-warning">{{ $t('account.create.text2') }}</p>
        <q-field :helper="$t('account.create.password_tip1')"
                 v-show="showPasswordField">
          <q-input :float-label="$t('account.create.password_msg1')"
                   :autofocus="showNewAccountModal"
                   type="password"
                   v-model="form.password"
                   @blur="$v.form.password.$touch"
                   :error="$v.form.password.$error" />
        </q-field>

        <q-field :error-label="$t('account.create.password_tip2')"
                 v-show="showPasswordField">
          <q-input :float-label="$t('account.create.password_msg2')"
                   :autofocus="!showPasswordField"
                   type="password"
                   v-model="form.repeatPassword"
                   @blur="$v.form.repeatPassword.$touch"
                   :error="$v.form.repeatPassword.$error" />
        </q-field>

        <q-btn :label="$t('button.ok')"
               color="primary"
               class="float-right q-my-md"
               @click="submit" />
      </div>
    </q-modal>
    <!-- Create Account Modal end -->
  </div>
</template>
<style lang="stylus">

</style>
<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

import BigNumber from 'bignumber.js'
import { Types } from '../../src-electron/modules/ipc/types'
import { shell } from 'electron'
import path from 'path'

const ipc = window.ipc
const web3 = window.web3

export default {
  name: 'AccountList',
  data () {
    return {
      showNewAccountModal: false,
      showPasswordField: true,
      form: {
        password: '',
        repeatPassword: ''
      }
    }
  },
  computed: {
    accounts () {
      return this.$store.state.account.list
    },
    total () {
      let total = this.$store.state.account.list.reduce((prev, curr) => {
        return prev.plus(curr.balance)
      }, new BigNumber(0))
      return new BigNumber(web3.utils.fromWei(total.toFixed())).toFixed(3, 1)
    }
  },
  methods: {
    submit () {
      this.$v.form.password.$touch()
      if (!this.$v.form.password.$error) {
        this.$v.form.repeatPassword.$touch()
        if (this.$v.form.repeatPassword.$error) {
          return
        }
      } else {
        return
      }
      this.createAccount()
      this.reset()
    },
    reset () {
      // 清空表单
      this.$v.$reset()
      this.form.password = ''
      this.form.repeatPassword = ''

      this.showNewAccountModal = false
      this.showPasswordField = true
    },
    createAccount () {
      // console.log('call createAccount()')
      // let $vm = this
      web3.eth.personal
        .newAccount(this.form.password)
        .then(() => {
          // $vm.refreshAccountList()
          ipc.send(Types.SYNC_ACCOUNT)
        })
        .catch(console.log)
    },
    importAccount () {
      let keystore = path.join(this.$settings.chainDataPath, 'keystore')
      shell.showItemInFolder(keystore)
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  created () {
    // this.refreshAccountList()
  }
}
</script>
