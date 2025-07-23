import {FC} from 'react';
import {FormResponseAnswer,AnxietyLevel} from '@/types';

type Props = {
	responses: FormResponseAnswer[];
	score?: number | null;
	level?: AnxietyLevel | null;
};

const FormResponseList: FC<Props> = ({responses,score,level}) => {
	return (
		<>
			<div className="space-y-6">
				{responses.map((res) => (
					<div
						key={res.questionId}
						className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
					>
						<p className="text-gray-800 font-medium mb-2">{res.questionText}</p>
						<p className="text-indigo-600 font-semibold">{res.answer}</p>
					</div>
				))}
			</div>

			{score != null && level && (
				<div className="mt-10 p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded">
					<p className="font-semibold">Resultados:</p>
					<p>
						Puntaje total: <span className="font-bold">{score}</span>
					</p>
					<p>
						Nivel de ansiedad: <span className="font-bold capitalize">{level.toLowerCase()}</span>
					</p>
				</div>
			)}
		</>
	);
};

export default FormResponseList;
