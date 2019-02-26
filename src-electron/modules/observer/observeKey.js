import _ from 'lodash'
import logger from '../logger'
import Settings from '../settings'

const log = logger.create('ObserveKey')
const indexContractAddress = Settings.indexContractAddress
const functionSignature = Settings.functionSignature

class ObserveKey {
  /**
   * Call this method when incoming new block.
   */
  updateKeys (blockHeader) {
    this.keys = global.db.keys
    this.web3 = global.web3

    if (blockHeader.number && blockHeader.number >= 45) {
      // find out waitting confirmed transactions from db
      this.web3.eth
        .getBlock(blockHeader.number)
        .then(block => {
          if (block.transactions.length > 0) {
            block.transactions.forEach(txHash => {
              this._updateKey(txHash, block)
            })
          }
        })
        .catch(err => {
          log.error('Get block occur error.', err)
        })
    }
  }

  _updateKey (txHash, block) {
    let transaction
    this.web3.eth
      .getTransaction(txHash)
      .then(t => {
        transaction = t
        if (!transaction || transaction.to.toLowerCase() !== indexContractAddress || transaction.input.indexOf(functionSignature) === -1) return

        let data = transaction.input

        data = data.replace(functionSignature, '')

        let params = this.web3.eth.abi.decodeParameters(['string', 'string'], data)

        let _id = params[0]

        let _key = JSON.parse(params[1])

        let key = this.keys.by('_id', _id)

        if (key != null) {
          this.keys.update(_.assign(key, _key))
        } else {
          key = {}
          key.timestamp = block.timestamp
          key.author = transaction.from
          key._id = _id
          this.keys.insert(_.assign(key, _key))
        }
        syncKey()
      })
      .catch(err => {
        log.error('Get transaction occur error.', err)
      })
  }
}

// flush transaction list of UI
const syncKey = _.debounce(() => {
  global.stateManager.emit('sync', 'key')
}, 1000)

export default new ObserveKey()
