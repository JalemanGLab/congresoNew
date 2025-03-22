import RegisterInfo from "./RegisterInfo";
import RegisterForm from "./RegisterForm";

const Register = () => {
	return (
		<div className="fixed inset-0 bg-black/50 z-40 overflow-y-auto p-8 ">
			<div className="flex min-h-full items-center justify-center">
				<div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
					<div className="w-full lg:w-5/12 bg-[#00391c]">
						<RegisterInfo />
					</div>
					<div className="w-full lg:w-7/12 max-h-[90vh] lg:max-h-none overflow-y-auto">
						<RegisterForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
