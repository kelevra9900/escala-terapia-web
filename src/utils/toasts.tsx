import toast from 'react-hot-toast';

export const showSuccess = (message: string) => {
	toast.success(message,{
		id: 'success-toast',
	});
};

export const showError = (message: string) => {
	toast.error(message,{
		id: 'error-toast',
	});
};

export const showLoading = (message: string) => {
	toast.loading(message,{
		id: 'loading-toast',
	});
};

export const dismissToast = () => {
	toast.dismiss();
};
