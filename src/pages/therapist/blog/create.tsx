import AppLayout from "@/components/organisms/Layout/AppLayout"
import {useCreatePostMutation} from "@/data/blog";
import {Card,DefaultButton,Description,Input,Textarea,Checkbox,StickyFooterPanel} from "@/components/atoms";
import {Controller,useForm,useWatch} from "react-hook-form";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {CreateBlogNoteInput} from "@/types/blog";



export default function CreateBlogNote() {
	const {mutate,isPending} = useCreatePostMutation()
	const router = useRouter();

	const {register,handleSubmit,control,setValue,formState: {errors}} = useForm<CreateBlogNoteInput>({
		defaultValues: {
			isFeatured: false,
		}
	});

	const title = useWatch({control,name: 'title'});

	useEffect(() => {
		if (!title) return;
		const slug = title
			.toLowerCase()
			.trim()
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu,'')
			.replace(/[^a-z0-9\s-]/g,'')
			.replace(/\s+/g,'-')
			.replace(/-+/g,'-');
		setValue('slug',slug);
	},[title,setValue]);

	const onSubmit = (data: CreateBlogNoteInput) => {
		mutate({data},{
			onSuccess: () => {
				setTimeout(() => router.push('/therapist/blog'),300);
			}
		});
	};
	return (
		<>
			<div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
				<h1 className="text-lg font-semibold text-heading">Crear Nota de Blog</h1>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Portada */}
				<div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
					<Description
						title="Imagen de portada"
						details="Agrega una URL de imagen y su texto alternativo."
						className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
					/>
					<Card className="w-full sm:w-8/12 md:w-2/3">
						<Input
							label="URL de la portada"
							placeholder="https://..."
							{...register('coverImage')}
						/>
						<Input
							label="Texto alternativo"
							placeholder="Descripción de la imagen"
							{...register('coverImageAlt')}
						/>
						<Checkbox className="mt-2" label="Destacar nota" {...register('isFeatured')} />
					</Card>
				</div>

				{/* Información */}
				<div className="flex flex-wrap my-5 sm:my-8">
					<Description
						title="Información de la nota"
						details="Completa los campos del artículo."
						className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
					/>

					<Card className="w-full sm:w-8/12 md:w-2/3">
						<Input
							label="Título"
							placeholder="Título de la nota"
							{...register('title',{required: 'Título requerido'})}
							error={errors.title?.message}
						/>
						<Input
							label="Slug"
							placeholder="titulo-de-la-nota"
							{...register('slug',{required: 'Slug requerido'})}
							error={errors.slug?.message}
						/>
						<Input
							label="ID de categoría"
							placeholder="Ej. cat_123"
							{...register('categoryId',{required: 'Categoría requerida'})}
							error={errors.categoryId?.message}
						/>
						<Textarea
							placeholder="Extracto breve"
							{...register('excerpt')}
						/>
						<label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Contenido</label>
						<Textarea rows={10} placeholder="Contenido del artículo" {...register('content',{required: 'Contenido requerido'})} />
						{errors.content?.message && (
							<span className="text-xs text-red-500 mt-1">{errors.content.message}</span>
						)}
					</Card>
				</div>

				<StickyFooterPanel className="z-0">
					<div className="text-end">
						<DefaultButton type="submit" size="big" disabled={isPending}>
							{isPending ? 'Creando…' : 'Crear Nota'}
						</DefaultButton>
					</div>
				</StickyFooterPanel>
			</form>
		</>
	)
}

CreateBlogNote.Layout = AppLayout;
