const Login = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black rounded-lg flex flex-col items-center justify-center px-6 py-8 mx-auto md:p-10 lg:p-10 dark:bg-opacity-50 bg-opacity-50">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Iniciar Sesion
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nombre"
                required=""
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                className="bg-gray-50 uppercase border-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
