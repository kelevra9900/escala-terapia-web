import {BlogNote,BlogPayload} from "@/types/blog";
import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import {blogClient} from "./client/blog";
import {PaginatedResponse} from "@/types";
import {AxiosError} from "axios";
import {showError,showSuccess} from "@/utils/toasts";
import {getFormErrors} from "./client/http-client";

export const usePaginatedBlogNotes = ({page = 1,limit,search,categoryId}: BlogPayload) => {
	const queryClient = useQueryClient();

	return useQuery<PaginatedResponse<BlogNote>>({
		queryKey: ['blog',page,limit,search,categoryId],
		queryFn: () => blogClient.getNotes({page,limit,search,categoryId}),
		placeholderData: () => {
			const prev = queryClient.getQueryData<PaginatedResponse<BlogNote>>([
				'formTemplates',
				page! - 1,
				limit,
				search,
			]);
			return prev ?? undefined;
		},
	})
}

export const useGetPost = (id: string) => {
	return useQuery<BlogNote>({
		queryKey: ['blog-note',id],
		queryFn: () => blogClient.getPost(id)
	});
}


export const useUpdatePostMutation = () => {
	const queryClient = useQueryClient();
	return useMutation<BlogNote,AxiosError,{data: BlogNote}>({
		mutationFn: ({data}) => blogClient.updatePost(data),
		onSuccess: (data) => {
			showSuccess('Post actualizado correctamente')
			queryClient.invalidateQueries({queryKey: ['blog']});
			queryClient.setQueryData(['blog-note',data.id],data);
		},
		onError: (err) => {
			const formErrors = getFormErrors(err);
			showError("Error al actualizar la nota")
			return formErrors;
		}
	})
}
