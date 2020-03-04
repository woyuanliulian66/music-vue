import * as types from './mutation-types'

// eslint-disable-next-line no-unused-vars
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations