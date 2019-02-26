<template>
  <div>
    <q-item :to="to">
      <q-item-side>
        <ident-icon :value="account.address.toLowerCase()" />
      </q-item-side>
      <q-item-main>
        <q-item-tile>
          <strong>{{account.name}}</strong>
        </q-item-tile>
        <q-item-tile class="address">{{account.address}}
          <div class="qr_code copy_address" @click.stop="copyAddress(account.address)"></div> <div class="qr_code" style="margin-left: 5px" @click.stop="qrcode(account.address)"></div></q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-item-tile>{{ $t('account.balance') }}</q-item-tile>
        <q-item-tile>
          <ani-number :value="account.ether" /> </q-item-tile>
      </q-item-side>
    </q-item>
    <q-modal v-model="showVerifyModal">
      <div class="q-pa-md">
        <p class="q-headline">{{ $t('account.copy.alert') }}</p>
        <p class="text-1">{{ $t('account.copy.content') }}</p>
        <q-btn :label="$t('button.ok')"
               color="primary"
               class="float-right q-my-md"
               @click="submit" />
      </div>
    </q-modal>

    <q-modal class="qr-modal" v-model="showQrModal">
      <div class="q-pa-md">
        <img v-bind:src="qrdata" class="img-circle" ref="qrcodeImage" width="100%" height="100%"/>
      </div>
    </q-modal>
  </div>
</template>
<style lang="stylus">
div.qr_code
    display inline-block
    vertical-align middle
    width 16px
    height 16px
    background url("../assets/qr@1x.png") no-repeat center !important
    background-size cover
div.copy_address
    background url("../assets/copy@1x.png") no-repeat center !important
</style>
<script>
import copy from 'clipboard-copy'
const qrCode = require('qrcode')
export default {
  name: 'AccountItem',
  data () {
    return {
      showVerifyModal: false,
      showQrModal: false,
      copy_Address: '',
      qrdata: ''
    }
  },
  props: {
    account: {
      required: true
    },
    to: {
      type: String
    }
  },
  methods: {
    copyAddress (address) {
      this.showVerifyModal = true
      this.copy_Address = address
    },
    submit () {
      copy(this.copy_Address).then(() => {
        this.showVerifyModal = false
        this.$q.notify({ message: this.$t('account.copy.success'), color: 'primary', timeout: 1000 })
      })
    },
    qrcode (address) {
      this.showQrModal = true
      qrCode.toDataURL(address, {version: 5}).then(url => {
        console.log(url)
        this.qrdata = url
      })
    }
  }
}
</script>
