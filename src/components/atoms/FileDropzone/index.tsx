import React,{useCallback,useState} from 'react';
import cn from 'classnames';
import {useDropzone,Accept,DropEvent,FileRejection} from 'react-dropzone';

import {UploadIcon} from '@/components/atoms/Icons/upload-icon';

type FileDropzoneProps = {
	label?: string;
	description?: string;
	value?: File | null;
	onChange?: (file: File | null,meta?: {event: DropEvent;rejections: FileRejection[]}) => void;
	onRemove?: () => void;
	className?: string;
	accept?: Accept;
	multiple?: boolean;
	maxSize?: number;
	error?: string;
	disabled?: boolean;
};

const formatBytes = (bytes: number) => {
	if (!bytes) return '0 B';
	const units = ['B','KB','MB','GB'];
	const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)),units.length - 1);
	const value = bytes / Math.pow(1024,exponent);
	return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
};

const FileDropzone: React.FC<FileDropzoneProps> = ({
	label,
	description = 'Arrastra y suelta el archivo, o haz clic para seleccionar',
	value,
	onChange,
	onRemove,
	className,
	accept,
	multiple = false,
	maxSize,
	error,
	disabled = false,
}) => {
	const [rejectionMessage,setRejectionMessage] = useState<string | null>(null);

	const handleDrop = useCallback(
		(acceptedFiles: File[],fileRejections: FileRejection[],event: DropEvent) => {
			setRejectionMessage(null);
			if (fileRejections.length > 0) {
				const [{errors}] = fileRejections;
				const [firstError] = errors;
				setRejectionMessage(firstError?.message ?? 'Archivo no permitido');
			}
			const nextFile = multiple ? acceptedFiles[0] ?? null : acceptedFiles[0] ?? null;
			onChange?.(nextFile,{event,rejections: fileRejections});
		},
		[multiple,onChange]
	);

	const {getRootProps,getInputProps,isDragActive} = useDropzone({
		onDrop: handleDrop,
		accept,
		multiple,
		maxSize,
		disabled,
	});

	return (
		<div className={cn('mb-4',className)}>
			{label && <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>}
			<div
				{...getRootProps({
					className: cn(
						'group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border-base bg-white px-6 py-10 text-center transition',
						isDragActive && 'border-primary-400 bg-primary-50',
						disabled && 'cursor-not-allowed opacity-60'
					),
				})}
			>
				<input {...getInputProps()} />
				<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-500">
					<UploadIcon width="28" height="20" />
				</div>
				<p className="mt-4 text-sm font-medium text-heading">
					{value ? 'Archivo seleccionado' : 'Sube tu archivo'}
				</p>
				<p className="mt-1 text-xs text-gray-500">{description}</p>
				{value && (
					<p className="mt-2 text-xs text-gray-500">
						{value.name} · {formatBytes(value.size)}
					</p>
				)}
			</div>
			<div className="mt-3 flex items-center justify-between text-xs text-gray-500">
				{(error || rejectionMessage) && (
					<span className="text-red-500">{error ?? rejectionMessage}</span>
				)}
				{value && onRemove && !disabled && (
					<button
						type="button"
						onClick={onRemove}
						className="ml-auto text-sm font-medium text-primary-500 hover:underline"
					>
						Quitar archivo
					</button>
				)}
			</div>
		</div>
	);
};

export default FileDropzone;
