export const get = state => hash => {
  return state.list.find(key => key._id === hash)
}
