import {Fragment,useRef} from 'react';
import {Dialog,DialogPanel,DialogTitle,Transition,TransitionChild} from '@headlessui/react';
import cn from 'classnames';
import {CloseIcon} from '@/components/atoms/Icons/close-icon';

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	hideCloseButton?: boolean;
	panelClassName?: string;
	overlayClassName?: string;
	centered?: boolean;
	footer?: React.ReactNode;
	size?: ModalSize;
};

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<ModalSize,string> = {
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-2xl',
	xl: 'max-w-4xl',
};

export default function Modal({
	open,
	onClose,
	children,
	title,
	footer,
	hideCloseButton = false,
	panelClassName = '',
	overlayClassName = '',
	centered = false,
	size = 'md',
}: ModalProps) {
	const cancelButtonRef = useRef(null);

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={onClose}
				aria-labelledby={title ? 'modal-title' : undefined}
			>
				<div className={cn('min-h-screen px-4 text-center',centered && 'flex items-center justify-center')}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className={cn('fixed inset-0 bg-black/30 backdrop-blur-sm',overlayClassName)} />
					</TransitionChild>

					<span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<DialogPanel
							className={cn(
								'relative inline-block w-full p-6 my-8 overflow-y-auto max-h-[80vh] text-left align-middle transition-all transform bg-white dark:bg-neutral-900 shadow-xl rounded-lg',
								sizeMap[size ?? 'md'],
								panelClassName
							)}
						>
							{!hideCloseButton && (
								<button
									onClick={onClose}
									aria-label="Cerrar modal"
									ref={cancelButtonRef}
									className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
								>
									<CloseIcon className="w-4 h-4" />
								</button>
							)}

							{title && (
								<DialogTitle id="modal-title" className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
									{title}
								</DialogTitle>
							)}

							{children}

							{footer && <div className="mt-6">{footer}</div>}
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
}

