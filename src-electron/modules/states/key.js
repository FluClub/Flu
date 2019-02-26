import { EventEmitter } from 'events'

import { Types } from '../ipc/types'
import logger from '../logger'

const log = logger.create('KeyState')
// import demos from './demo'
class KeyState extends EventEmitter {
  constructor () {
    super()
    this.on('sync', this._sync)
  }

  _sync () {
    log.info('load keys from db')
    const db = global.db
    /* demos.forEach(demo => {
      try {
        db.keys.insert(demo)
      } catch (err) {
      }
    }) */
    let keys = db.keys
      .chain()
      .simplesort('timestamp', true)
      .data()
    global.windows.broadcast(Types.SYNC_KEY, { keys })
  }
}

export default new KeyState()
