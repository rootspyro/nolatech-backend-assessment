import { useForm, SubmitHandler } from "react-hook-form"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

function SignIn() {

  const navigate = useNavigate()

  type Inputs = {
    user: string,
    password: string,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const body = {
      user: data.user,
      password: data.password
    } 
    
    const response = await fetch(import.meta.env.VITE_API_HOST + "/auth/login", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    )

    const responseData = await response.json()

    if (response.status == 404 || response.status == 401) {
      Swal.fire({
        icon: "error",
        title: "Usuario no encontrado",
        text: "usuario o contraseña es incorrecta",
      });
      return
    }


    if (!responseData.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "error al iniciar sesión",
      });
      return
    }

    localStorage.setItem("token", responseData.data.token)
    navigate("/")
    
  }

  return(
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
      <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Inicio de sesión</h1>

    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
    </p>

    <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">

      <div>
        <label className="sr-only">Username</label>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Usuario"
            {...register("user", { 
              required: { value: true, message: "Este campo es requerido" },
              minLength: {value: 3, message: "Longitud minima de 3 digitos"} 
              })
            }
          />
        </div>
        {errors.user && <span className="text-red-500 text-sm p-2">{errors.user.message}</span>}
      </div>

      <div>
        <label className="sr-only">Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Contraseña"
            {...register("password", { 
              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 8, message: "La contraseña debe tener al menos 8 digitos" }
            })}
          />
        </div>
        {errors.password && <span className="text-red-500 text-sm p-2">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
      iniciar sesión
      </button>

      <p className="text-center text-sm text-gray-500">
        No posees una cuenta?
        <a className="underline" href="/signup"> Regístrate</a>
      </p>
    </form>
  </div>
</div>
  )
}

export default SignIn
