function UpdateUserPipe(body) {

  let bodyPiped = {}

  const {
    username,
    email,
    firstname,
    lastname
  } = body

  if (username != undefined) {
    bodyPiped.username = username
  }

  if (email != undefined) {
    bodyPiped.email = email 
  }

  if (firstname != undefined) {
    bodyPiped.firstname = firstname 
  }

  if (lastname != undefined) {
    bodyPiped.lastname = lastname
  }

  return bodyPiped
}

module.exports = {
  UpdateUserPipe, 
}
