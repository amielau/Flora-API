export const badRequest = (res, errors, errorCode) => {
  res.status(400).json({
    name: 'BadRequest',
    errors,
    errorCode
  })
}
