import cn from "classnames";
import DefaultButton from "../Buttons/ButtonDefault";
import {TrashIcon} from "../Icons/trash";

type ConfirmationCardProps = {
	onCancel: () => void;
	onDelete: () => void;
	title?: string;
	icon?: React.ReactNode;
	description?: string;
	cancelBtnClassName?: string;
	deleteBtnClassName?: string;
	cancelBtnText?: string;
	deleteBtnText?: string;
	cancelBtnLoading?: boolean;
	deleteBtnLoading?: boolean;

};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
	onCancel,
	onDelete,
	icon,
	title = 'Eliminar elemento',
	description = 'Confirmas que deseas eliminar este elemento? Esta acción no se puede deshacer.',
	cancelBtnText = 'Cancelar',
	deleteBtnText = 'Eliminar',
	cancelBtnClassName,
	deleteBtnClassName,
	cancelBtnLoading,
	deleteBtnLoading,
}) => {
	return (
		<div className="m-auto w-full max-w-sm rounded-md bg-light p-4 pb-6 sm:w-[24rem] md:rounded-xl">
			<div className="w-full h-full text-center">
				<div className="flex flex-col justify-between h-full">
					{icon ? (
						icon
					) : (
						<TrashIcon className="w-12 h-12 m-auto mt-4 text-accent" />
					)}
					<p className="mt-4 text-xl font-bold text-heading">{title}</p>
					<p className="px-6 py-2 leading-relaxed text-body-dark dark:text-muted">
						{description}
					</p>
					{/* gap */}
					<div className="flex items-center justify-between w-full mt-8 space-x-2">
						<div className="w-1/2">
							<DefaultButton
								onClick={onCancel}
								loading={cancelBtnLoading}
								disabled={cancelBtnLoading}
								variant="custom"
								className={cn(
									// rounded and outline
									'w-full rounded py-2 px-4 text-center text-base font-semibold text-heading shadow-md transition duration-200 ease-in hover:bg-gray-100 focus:bg-accent-100 focus:outline-none',
									cancelBtnClassName,
								)}
							>
								{cancelBtnText}
							</DefaultButton>
						</div>

						<div className="w-1/2">
							<DefaultButton
								onClick={onDelete}
								loading={deleteBtnLoading}
								disabled={deleteBtnLoading}
								variant="custom"
								className={cn(
									'w-full rounded bg-red-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-red-700 focus:bg-red-700 focus:outline-none',
									deleteBtnClassName,
								)}
							>
								{deleteBtnText}
							</DefaultButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationCard;