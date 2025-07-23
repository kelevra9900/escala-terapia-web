import {Avatar,Badge} from "@/components/atoms";
import {EditIcon} from "@/components/atoms/Icons/edit";
import {AlignType,Table} from "@/components/atoms/Table";
import Pagination from "@/components/molecules/Pagination";
import {Meta,SubscriptionStatus,UserListItem} from "@/types";
import {getRole,simplifyUUID,formatSubscriptionStatus} from "@/utils";
import {formatDate} from "@/utils/manage-dates";
import {TrashIcon} from '@/components/atoms/Icons/trash';

type Props = {
	users: UserListItem[];
	meta: Meta;
	isLoading: boolean;
	onUserClick: (userId: string) => void;
	onUserDelete: (userId: string) => void;
	onPagination: (page: number,pageSize?: number) => void;
};

const UserTable = ({
	users = [],
	meta = {totalCount: 0,totalPages: 0,currentPage: 1,pageSize: 10},
	onUserClick = () => { },
	onUserDelete = () => { },
	onPagination = () => { }
}: Props) => {
	const columns = [{
		dataIndex: 'id',
		key: 'id',
		width: 100,
		align: 'center' as AlignType,
		render: (id: number) => (
			<span className="text-gray-600">{simplifyUUID(id)}</span>
		),
		title: 'ID',
	},{
		title: 'Nombre',
		dataIndex: 'name',
		key: 'name',
		width: 150,
		render: (name: string,record: UserListItem) => {
			const {email,avatar} = record;
			return (
				<div className="flex items-center space-x-2">
					<Avatar src={avatar} />
					<div className="flex flex-col whitespace-nowrap font-medium ms-2">
						{name}
						<span className="text-[13px] font-normal text-gray-500/80">
							{email}
						</span>
					</div>
				</div>
			)
		}
	},{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		width: 200,
		align: 'center' as AlignType,
		render: (text: string) => <span className="text-gray-600">{text}</span>,
	},{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
		align: 'center' as AlignType,
		width: 100,
		render: (text: string) => (
			<Badge
				variant={text === 'THERAPIST' ? 'solid' : 'outline'}
				text={getRole(text)}
				textColor="text-brand-moss"
				className={text === 'THERAPIST' ? 'bg-brand-moss/10' : ''}
			/>
		),
	},{
		// Subscription Status
		title: 'Subscripción',
		dataIndex: 'subscriptionStatus',
		key: 'subscriptionStatus',
		align: 'center' as AlignType,
		width: 150,
		render: (text: string) => (
			<Badge
				color={text === 'ACTIVE' ? 'bg-lime-100 !text-lime-500' : 'bg-red-100 text-red-500'}
				text={formatSubscriptionStatus(text as SubscriptionStatus)}
			/>
		),
	},{
		title: 'Creado',
		dataIndex: 'createdAt',
		key: 'createdAt',
		align: 'center' as AlignType,
		width: 150,
		render: (text: string) => {
			return (
				<span className="text-gray-600 text-[13px]">
					{formatDate(text)}
				</span>
			)
		}
	},{
		title: 'Actions',
		dataIndex: 'actions',
		key: 'actions',
		align: 'center' as AlignType,
		width: 120,
		render: (_text: string,record: UserListItem) => (
			<div className="flex items-center space-x-2 justify-center">
				<button
					onClick={() => onUserClick(record.id)}
					className="text-accent transition duration-200 hover:text-accent focus:outline-none cursor-pointer"
					title={'Editar'}
				>
					<EditIcon width={18} />
				</button>
				<button
					onClick={() => onUserDelete(record.id)}
					title={'Eliminar'}
					className="text-red-500 transition duration-200 hover:text-red-700 focus:outline-none cursor-pointer"
				>
					<TrashIcon width={18} />
				</button>
			</div>
		),
	}]

	return (
		<div className="mb-6 overflow-hidden rounded shadow bg-white dark:bg-dark-1000 max-w-full">
			<Table
				columns={columns}
				emptyText={() => (
					<div className="flex flex-col items-center py-7">
						{/* <NoDataFound className="w-52" /> */}
						<div className="mb-1 pt-6 text-base font-semibold text-heading">
							No Data Found
						</div>
						<p className="text-[13px]">
							There are no users to display. Please add some users to see them here.
						</p>
					</div>
				)}
				data={users}
				rowKey="id"
				scroll={{x: 1000}}
				className="th"
			/>

			{!!meta?.totalCount && meta.totalCount > 0 && (
				<div className="flex items-center justify-end mt-10 px-4 py-3">
					<Pagination
						total={meta.totalCount}
						current={meta.currentPage}
						pageSize={meta.pageSize}
						onChange={onPagination}
					/>
				</div>
			)}
		</div>
	)
}

export default UserTable;