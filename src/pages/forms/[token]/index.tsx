import {useState} from 'react';
import {useRouter} from 'next/router';
import {useForm,FormProvider} from 'react-hook-form';

import {showError} from '@/utils/toasts';
import GeneralLayout from '@/components/organisms/Layout/General';
import {DefaultButton,DoneForm,Loader} from '@/components/atoms';
import {useGetForm,useSubmitFormResponse} from '@/data/forms';
import {FormQuestionRenderer} from '@/components/molecules';
import {FormQuestion} from '@/types';

export default function FormResponsePage() {
	const router = useRouter();
	const {token} = router.query;
	const [submitted,setSubmitted] = useState(false);
	const {data: form,isLoading: loading} = useGetForm(token as string);
	const submitFormMutation = useSubmitFormResponse();


	const methods = useForm<{responses: {answer: string}[]}>({
		defaultValues: {
			responses: [],
		},
	});

	const onSubmit = (data: {responses: {answer: string}[]}) => {
		if (!form || !token || typeof token !== 'string') {
			showError('Token de formulario no válido.');
			return;
		}

		if (form.isCompleted) {
			showError('Este formulario ya fue completado.');
			return;
		}

		const formattedAnswers = form.formTemplate?.questions.reduce((acc,question,index) => {
			acc[question.id] = data.responses[index]?.answer ?? '';
			return acc;
		},{} as Record<string,string>);

		if (!formattedAnswers) {
			showError('Respuestas inválidas.');
			return;
		}

		submitFormMutation.mutate(
			{token,answers: formattedAnswers},
			{
				onSuccess: () => setSubmitted(true),
			}
		);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader />
			</div>
		);
	}

	if (submitted) {
		return (
			<DoneForm />
		);
	}

	if (!form) {
		return (
			<div className="max-w-xl mx-auto mt-20 text-center">
				<h2 className="text-xl font-bold mb-4">Formulario inválido</h2>
				<p>No hemos podido encontrar este formulario o ya fue completado.</p>
			</div>
		);
	}
	if (form.isCompleted) {
		return (
			<DoneForm />
		);
	}

	return (
		<div className="max-w-2xl mx-auto px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-center mb-2">{form.formTemplate?.title}</h1>
				<p className="text-gray-600 text-center">{form.formTemplate?.description}</p>
			</div>

			<FormProvider {...methods}>
				<form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
					{form.formTemplate?.questions?.map((question: FormQuestion,index: number) => (
						<FormQuestionRenderer
							key={question.id}
							question={question}
							index={index}
						/>
					))}

					<DefaultButton type="submit" className="w-full">
						Enviar respuestas
					</DefaultButton>
				</form>
			</FormProvider>
		</div>
	);
}

FormResponsePage.Layout = GeneralLayout;
