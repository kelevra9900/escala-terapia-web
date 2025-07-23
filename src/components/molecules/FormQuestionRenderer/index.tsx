import React from 'react';
import {Controller,useFormContext} from 'react-hook-form';

import {RadioGroup} from '@/components/molecules';
import {FormQuestion} from '@/types';
import {TextLabel} from '@/components/atoms';

export type FormQuestionRendererProps = {
	question: FormQuestion;
	index: number;
};

export const FormQuestionRenderer = ({
	question,
	index,
}: FormQuestionRendererProps) => {
	const {control,formState: {errors}} = useFormContext();

	const renderQuestion = () => {
		switch (question.type) {
			case 'MULTIPLE_CHOICE':
				return (
					<Controller
						name={`responses.${index}.answer`}
						control={control}
						rules={{required: 'Este campo es obligatorio'}}
						render={({field}) => (
							<RadioGroup
								options={question.options.map((opt) => ({label: opt,value: opt}))}
								{...field}
							/>
						)}
					/>
				);
			default:
				return <div>Tipo de pregunta no soportado</div>;
		}
	};

	return (
		<div className="mb-6">
			<TextLabel className="mb-2 block font-semibold text-gray-700">
				{`${index + 1}. ${question.text}`}
			</TextLabel>
			{renderQuestion()}
			{Array.isArray(errors?.responses) && errors.responses[index]?.answer && (
				<p className="text-sm text-red-500 mt-1">
					{errors.responses[index]?.answer?.message}
				</p>
			)}
		</div>
	);
};

export default FormQuestionRenderer;