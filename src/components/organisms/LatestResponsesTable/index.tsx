import {format} from 'date-fns';
import {
	EyeIcon,
	TrashIcon,
	ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type {FormResponses} from '@/types';

type Props = {
	responses: FormResponses[];
	onViewResponse?: (id: string) => void;
	onDownloadResponse?: (id: string) => void;
	onDeleteResponse?: (id: string) => void;
};

const getBadgeColor = (level?: string | null) => {
	switch (level) {
		case 'SEVERE':
			return 'bg-red-100 text-red-700';
		case 'MODERATE':
			return 'bg-yellow-100 text-yellow-700';
		case 'MILD':
			return 'bg-blue-100 text-blue-700';
		case 'MINIMAL':
			return 'bg-green-100 text-green-700';
		default:
			return 'bg-gray-100 text-gray-600';
	}
};

export const LatestResponsesTable = ({
	responses,
	onViewResponse,
	onDownloadResponse,
	onDeleteResponse,
}: Props) => {
	return (
		<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
			<ul className="divide-y divide-gray-100">
				{responses.map((res) => (
					<li key={res.id} className="flex items-start justify-between gap-4 px-5 py-4">
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-900">{res.client.name}</p>
							<p className="text-xs text-gray-500">{res.client.email}</p>
							<p className="text-sm mt-1 text-gray-700">{res.formTemplate.title}</p>
						</div>

						<div className="flex flex-col items-end justify-between gap-2 min-w-[120px]">
							<span
								className={classNames(
									'text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full uppercase',
									getBadgeColor(res.level)
								)}
							>
								{res.level ?? 'N/A'}
							</span>

							<span className="text-xs text-gray-500">
								{format(new Date(res.filledAt),'dd/MM/yyyy')}
							</span>

							<div className="flex items-center gap-2">
								<button
									onClick={() => onViewResponse?.(res.id)}
									className="hover:text-blue-600 transition"
									aria-label="Ver respuesta"
								>
									<EyeIcon className="w-4 h-4" />
								</button>
								<button
									onClick={() => onDownloadResponse?.(res.id)}
									className="hover:text-green-600 transition"
									aria-label="Descargar respuesta"
								>
									<ArrowDownTrayIcon className="w-4 h-4" />
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
