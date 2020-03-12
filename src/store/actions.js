import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/util'
import * as types from './mutation-types'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function(context, {list, index}) {
  context.commit(types.SET_SEQUENCELIST, list)
  if (context.state.mode === playMode.random) {
    let randomlist = shuffle(list)
    context.commit(types.SET_PLAYLIST, randomlist)
    index = findIndex(randomlist, list[index])
  } else {
    context.commit(types.SET_PLAYLIST, list)
  }
  context.commit(types.SET_PLAYLIST, list)
  context.commit(types.SET_CURRENT_INDEX, index)
  context.commit(types.SET_FULLSCREEN, true)
  context.commit(types.SET_PLAYING, true)
}

export const randomPlay = function (context, {list}) {
  context.commit(types.SET_PLAY_MODE, playMode.random)
  context.commit(types.SET_SEQUENCELIST, list)
  let randomlist = shuffle(list)
  context.commit(types.SET_PLAYLIST, randomlist)
  context.commit(types.SET_CURRENT_INDEX, 0)
  context.commit(types.SET_FULLSCREEN, true)
  context.commit(types.SET_PLAYING, true)
}