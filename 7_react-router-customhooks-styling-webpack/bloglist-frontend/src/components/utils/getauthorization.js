const getAuthorization = async () => {
  const user = await JSON.parse(window.localStorage.getItem('loggedUser'))
  if (user) return { headers: { Authorization: `bearer ${user.token}` } }
  return null
}

export default getAuthorization
