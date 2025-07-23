import {FC} from 'react';
import {FormInvitationWithResponses} from '@/types';
import {FormResponseList} from '@/components/molecules';

type Props = {
	data: FormInvitationWithResponses;
};

export const FormResponseSummary: FC<Props> = ({data}) => {
	return (
		<div className="max-w-3xl mx-auto px-4 py-10">
			<div className="mb-8 text-center">
				<h1 className="text-2xl font-bold mb-2">{data.formTemplate.title}</h1>
				<p className="text-gray-600">{data.formTemplate.description}</p>
				<p className="text-sm text-gray-400 mt-2">
					Respondido por: <span className="font-medium">{data.client.name}</span> el{' '}
					{new Date(data.filledAt).toLocaleDateString()}
				</p>
			</div>

			<FormResponseList
				responses={data.responses}
				score={data.score}
				level={data.level}
			/>
		</div>
	);
};
