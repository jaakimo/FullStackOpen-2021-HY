const checkUpdateAuthorization = (request, response, next) => {
  const { user, params } = request

  // logged user is user to be changed
  if (user && user._id.toString() === params.id) {
    return next()
  }

  // loggeduser is owner of blogid
  if (user && user.blogs.find((blogId) => blogId.toString() === params.id)) {
    return next()
  }
  return response
    .status(401)
    .json({ error: 'not authorized to change that resource' })
}
module.exports = checkUpdateAuthorization
