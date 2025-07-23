import * as rawAnimationData from "./done.json";
import {useLottie} from "lottie-react";

const DoneForm = () => {
	const defaultOptions = {
		animationData: JSON.parse(JSON.stringify(rawAnimationData)),
		loop: false,
	};

	const {View} = useLottie(defaultOptions);

	return (
		<>
			<div className="flex justify-center items-center min-h-[50px]">
				{View}
			</div>
			<div className="text-center mt-4 mb-10 gap-6 flex flex-col items-center">
				<h1 className="text-2xl font-bold">¡Formulario enviado!</h1>
				<p className="text-gray-600">Gracias por completar el formulario.</p>
				{/* El terapeuta */}
				<p className="text-gray-600">Tu terapeuta revisará tus respuestas y se pondrá en contacto contigo.</p>
			</div>
		</>
	);
};

export default DoneForm;
