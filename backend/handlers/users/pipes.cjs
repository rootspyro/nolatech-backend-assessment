function User(data) {
  const {
    id,
    username,
    email,
    firstname,
    lastname,
    created_at,
    updated_at,
    status,
  } = data

  return {
    userId: id,
    user: username,
    email,
    firstname,
    lastname,
    createdAt: created_at,
    updatedAt: updated_at,
    status,
  }
}

function UpdateUserBodyPipe(body) {

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
  User,
  UpdateUserBodyPipe, 
}
