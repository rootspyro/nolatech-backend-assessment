import { useForm, SubmitHandler } from "react-hook-form"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

function SignUp() {

  const navigate = useNavigate()
  type Inputs = {
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    confirmationPassword: string,
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  let password = watch("password")
  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const body = {
      username: data.username,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password
    } 

    const response = await fetch(import.meta.env.VITE_API_HOST + "/users", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    )

      if (response.status == 403) {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Este usuario ya existe",
        });
        return
      }

      const responseData = await response.json()

      if (!responseData.success) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El usuario no pudo ser creado",
        });
        return
      }

      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        }).then(buttonEvent => {
          if(buttonEvent.isConfirmed) {
            navigate("/login")
          }
        })
  }

  return(
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Registro de usuario</h1>

    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
    </p>

    <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <p className="text-center text-lg font-medium">Crea una cuenta</p>

      <div>
        <label className="sr-only">Username</label>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nombre de usuario"
            {...register("username", { 
              required: { value: true, message: "Este campo es requerido" },
              minLength: {value: 3, message: "Longitud minima de 3 digitos"} 
              })
            }
          />
        </div>
        {errors.username && <span className="text-red-500 text-sm p-2">{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor="" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Ingresa un email"
            {...register("email", {

              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 7, message: "Ingrese una direccion valida" }
            })}
          />
        </div>
        {errors.email && <span className="text-red-500 text-sm p-2">{errors.email.message}</span>}
      </div>

      <div>
        <label className="sr-only">Nombre</label>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Ingrese su nombre"
            {...register("firstname", {

              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 1, message: "Ingrese un nombre" }
            })}
          />
        </div>
        {errors.firstname && <span className="text-red-500 text-sm p-2">{errors.firstname.message}</span>}
      </div>

      <div>
        <label className="sr-only">Apellido</label>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Ingrese su apellido"
            {...register("lastname", {

              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 1, message: "Ingrese un apellido" }
            })}
          />
        </div>
        {errors.lastname && <span className="text-red-500 text-sm p-2">{errors.lastname.message}</span>}
      </div>
      <div>
        <label className="sr-only">Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Ingresar contraseña"
            {...register("password", { 
              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 8, message: "La contraseña debe tener al menos 8 digitos" }
            })}
          />
        </div>
        {errors.password && <span className="text-red-500 text-sm p-2">{errors.password.message}</span>}
      </div>

      <div>
        <label className="sr-only">Password confirmation</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Confirma la contraseña"
            {...register("confirmationPassword", { 
              required: { value: true, message: "Este campo es requerido" },
              validate: value => value === password || "Las contraseñas deben ser iguales"
            })}
          />
        </div>
        {errors.confirmationPassword && <span className="text-red-500 text-sm p-2">{errors.confirmationPassword.message}</span>}
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Crear usuario 
      </button>

      <p className="text-center text-sm text-gray-500">
        Ya posses una cuenta?
        <a className="underline" href="/login">Inicia sesion</a>
      </p>
    </form>
  </div>
</div>
  )
}

export default SignUp
