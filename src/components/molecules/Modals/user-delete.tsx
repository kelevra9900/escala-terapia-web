import {ConfirmationCard} from "@/components/atoms";
import {useModalAction} from "@/context/ModalContext";
import {useDeleteUserMutation} from "@/data/user";

const UserDelete = ({userId}: {userId?: string}) => {
	const {closeModal} = useModalAction();
	const {mutate,isPending} = useDeleteUserMutation();

	async function handleDelete() {
		closeModal();
		if (!userId) {
			return;
		}
		mutate({id: userId});
	}

	return (
		<ConfirmationCard
			onCancel={closeModal}
			onDelete={handleDelete}
			cancelBtnLoading={false}
			deleteBtnLoading={isPending}
			cancelBtnClassName="rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
			deleteBtnClassName="text-white hover:text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 rounded-md"
		/>
	);
};

export default UserDelete;