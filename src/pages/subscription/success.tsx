import GeneralLayout from "@/components/organisms/Layout/General";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";


const SubscriptionSuccessPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
			<div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-lg text-center">
				<CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
				<h1 className="text-3xl font-bold text-green-600 mb-3">Subscription Successful!</h1>
				<p className="text-gray-700 mb-6">
					Thank you for subscribing! Your subscription is now <span className="font-medium">active</span>.
				</p>
				<Link
					href="/"
					className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition"
				>
					Return to Home
				</Link>
			</div>
		</div>
	);
}


SubscriptionSuccessPage.Layout = GeneralLayout;

export default SubscriptionSuccessPage;