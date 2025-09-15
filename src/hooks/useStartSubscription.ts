import {HttpClient} from '@/data/client/http-client';
import {useGetMeInfo} from '@/data/user';
import {useMutation} from '@tanstack/react-query';

export const useStartSubscription = () => {
	const {data: meInfo} = useGetMeInfo()

	return useMutation({
		mutationFn: async () => {
			return await HttpClient.post<{url: string}>(
				'/subscriptions/create-checkout-session',
				{
					priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
					userId: meInfo!.sub,
				}
			);
		},
		onSuccess: (data) => {
			if (data?.url) {
				// window.location.href = data.url;
				console.log("Success =>>>",data)
			}
		},
		onError: (err) => {
			console.error('Error al iniciar la suscripción',err);
			alert('Hubo un error al procesar el pago');
		},
	});
};
