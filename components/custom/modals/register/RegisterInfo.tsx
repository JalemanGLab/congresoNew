const RegisterInfo = () => {
	return (

		<div className="w-full p-6 sm:p-6 lg:p-8 text-white rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg flex flex-col gap-4 ">
			<div className="mb-4 md:mb-6 hidden md:block">
				<button className="bg-green-400 text-black font-bold py-1 px-4 text-sm rounded">REGISTRO</button>
			</div>

			{/* titulos adaptados para diferentes tamaños */}
			<h1 className="text-2xl md:text-3xl font-bold mb-4 hidden md:block">Formulario de registro para el Congreso MAGNO 3.0</h1>
			<h1 className="text-xl sm:text-2xl font-semibold block md:hidden text-center">Registro para el Congreso MAGNO 3.0</h1>

			<p className="text-gray-300 text-sm md:text-base hidden md:block">
				Complete el formulario para registrarse y acceder a nuestros servicios exclusivos.{" "}
				<span className="hidden md:inline">El evento odontológico más importante del año en Colombia.</span>
			</p>
			<div className="mt-6 md:mt-auto hidden lg:block">
				<h2 className="text-xl font-semibold mb-4">Información del evento</h2>

				<div className="flex items-center mb-4">
					<div className="w-10 h-10 rounded-full bg-[#00ff7b]/10 flex items-center justify-center mr-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-green-400"
						>
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
							<line x1="16" y1="2" x2="16" y2="6"></line>
							<line x1="8" y1="2" x2="8" y2="6"></line>
							<line x1="3" y1="10" x2="21" y2="10"></line>
						</svg>
					</div>
					<div>
						<p className="font-bold">15 de Julio, 2025</p>
						<p className="text-sm text-gray-300">Fecha del evento</p>
					</div>
				</div>

				<div className="flex items-center">
					<div className="w-10 h-10 rounded-full bg-[#00ff7b]/10 flex items-center justify-center mr-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-green-400"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
					</div>
					<div>
						<p className="font-bold">8:00 am - 6:00 pm</p>
						<p className="text-sm text-gray-300">Horario del evento</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterInfo
