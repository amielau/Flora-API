export const cleanModel = (model) => {
  if (!model) {
    return model
  }
  if (model._id) {
    const { _id, ...rest } = model
    return { ...rest, id: _id.toString() }
  }
  return model
}
