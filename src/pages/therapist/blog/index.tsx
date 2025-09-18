import {useState} from "react";
import {useRouter} from "next/router";
import {Card,LinkButton,PageHeading,TextLabel} from "@/components/atoms";
import AppLayout from "@/components/organisms/Layout/AppLayout";
import {usePaginatedBlogNotes} from "@/data/blog";
import BlogTable from "@/components/organisms/BlogTable";
import Pagination from "@/components/molecules/Pagination";
import Search from "@/components/molecules/Searchbar";
import {PlusIcon} from "@heroicons/react/24/solid";

export default function TherapistBlog() {
	const [page,setPage] = useState(1);
	const [limit] = useState(10);
	const router = useRouter();

	const {data: posts,isPending} = usePaginatedBlogNotes({
		page,
		limit,
		search: '',
		categoryId: ''
	});

	return (
		<>
			<Card className="mb-8 flex flex-col items-center md:flex-row bg-white dark:bg-dark-1000">
				<div className="mb-4 md:mb-0 md:w-1/4">
					<PageHeading title={'Administración de blog'} />
				</div>

				<div className="flex w-full flex-col items-center space-y-4 space-x-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
					<Search
						onSearch={() => { }}
						placeholderText={'Busca notas con nombre o extracción'}
						variant="outline"
						className="w-full"
					/>
					<LinkButton
						href={'/therapist/blog/create'}
						variant="outline"
						className="w-full md:w-auto"
					>
						<PlusIcon className="me-2 h-5 w-5" />
						<span>Crear</span>
					</LinkButton>
				</div>
			</Card>

			<div className="mt-6">
				<BlogTable
					notes={posts?.data ?? []}
					meta={posts?.meta ?? {totalCount: 0,totalPages: 0,currentPage: page,pageSize: limit}}
					isLoading={isPending}
					onNoteClick={slug => {
						router.push(`/therapist/blog/create?slug=${slug}`);
					}}
				/>

				{!!posts?.meta?.totalCount && posts.meta.totalCount > 0 && (
					<div className="flex items-center justify-end mt-4 px-4 py-3">
						<Pagination
							total={posts.meta.totalCount}
							current={posts.meta.currentPage}
							pageSize={posts.meta.pageSize}
							onChange={(p) => setPage(p)}
						/>
					</div>
				)}
			</div>
		</>
	)
}

TherapistBlog.Layout = AppLayout;
