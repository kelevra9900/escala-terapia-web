import AppLayout from "@/components/organisms/Layout/AppLayout"
import {useCreatePostMutation,useGetCategories} from "@/data/blog";
import {Card,DefaultButton,Description,Input,Textarea,Checkbox,StickyFooterPanel,Select} from "@/components/atoms";
import {EditorContent,useEditor} from "@tiptap/react";
import {BubbleMenu} from '@tiptap/react/menus'

import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";

import {Controller,useForm,useWatch} from "react-hook-form";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {CreateBlogNoteInput} from "@/types/blog";



type CategoryOption = {
	value: string;
	label: string;
};

type RichTextEditorProps = {
	value: string;
	onChange: (value: string) => void;
	onBlur: () => void;
	error?: string;
};

function RichTextEditor({value,onChange,onBlur,error}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit,Highlight,Document,Paragraph,Text,BulletList],
		content: value,
		onUpdate: ({editor}) => {
			onChange(editor.getHTML());
		},
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: `tiptap min-h-[200px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none ${error ? 'border-red-500 focus:border-red-500' : 'focus:border-gray-400'}`,
			},
		},
	});

	useEffect(() => {
		if (!editor) return;
		if (!value) {
			if (!editor.isEmpty) {
				editor.commands.clearContent(false);
			}
			return;
		}
		const currentHTML = editor.getHTML();
		if (value !== currentHTML) {
			editor.commands.setContent(value);
		}
	},[editor,value]);

	if (!editor) {
		return null;
	}

	const bubbleButtonClass = (active?: boolean) => `bubble-menu__button${active ? ' is-active' : ''}`;

	return (
		<div className="relative space-y-2">
			<BubbleMenu
				editor={editor}
				className="bubble-menu flex gap-2 rounded-lg border border-border-base bg-white/95 p-2 shadow-lg ring-1 ring-black/5 backdrop-blur"
				shouldShow={({state}) => {
					const {from,to} = state.selection;
					if (from === to) return false;
					return !editor.isEmpty;
				}}
			>
				<button
					type="button"
					onMouseDown={event => {
						event.preventDefault();
						editor.chain().focus().toggleBold().run();
					}}
					className={bubbleButtonClass(editor.isActive('bold'))}
					aria-label="Negritas"
				>
					<strong>B</strong>
				</button>
				<button
					type="button"
					onMouseDown={event => {
						event.preventDefault();
						editor.chain().focus().toggleItalic().run();
					}}
					className={bubbleButtonClass(editor.isActive('italic'))}
					aria-label="Cursiva"
				>
					<em>I</em>
				</button>
				<button
					type="button"
					onMouseDown={event => {
						event.preventDefault();
						editor.chain().focus().toggleStrike().run();
					}}
					className={bubbleButtonClass(editor.isActive('strike'))}
					aria-label="Tachado"
				>
					<span className="line-through">S</span>
				</button>
				<button
					type="button"
					onMouseDown={event => {
						event.preventDefault();
						editor.chain().focus().toggleBulletList().run();
					}}
					className={bubbleButtonClass(editor.isActive('bulletList'))}
					aria-label="Lista con viñetas"
				>
					•
				</button>
				<button
					type="button"
					onMouseDown={event => {
						event.preventDefault();
						editor.chain().focus().toggleHighlight().run();
					}}
					className={bubbleButtonClass(editor.isActive('highlight'))}
					aria-label="Resaltar"
				>
					<span className="underline decoration-wavy">H</span>
				</button>
			</BubbleMenu>
			<EditorContent editor={editor} onBlur={onBlur} />
		</div>
	);
}

export default function CreateBlogNote() {
	const {mutate,isPending} = useCreatePostMutation()
	const {data: categories,isPending: loadingCat} = useGetCategories({
		page: 1,
		limit: 10
	})


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
	const categoryOptions: CategoryOption[] = categories?.data.map(category => ({
		value: category.id,
		label: category.name
	})) ?? [];

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
							disabled
						/>
						<p className="-mt-3 mb-4 text-xs text-gray-500">
							El slug es la versión amigable para URLs del título y se genera automáticamente para identificar la nota.
						</p>
						<Controller
							name="categoryId"
							control={control}
							rules={{required: 'Categoría requerida'}}
							render={({field}) => {
								const selectedOption = categoryOptions.find(option => option.value === field.value) ?? null;
								return (
									<Select
										label="Categoría"
										placeholder={loadingCat ? 'Cargando categorías...' : 'Selecciona una categoría'}
										options={categoryOptions}
										isLoading={loadingCat}
										isDisabled={loadingCat}
										value={selectedOption}
										onBlur={field.onBlur}
										onChange={option => {
											const nextValue = (option as CategoryOption | null)?.value ?? '';
											field.onChange(nextValue);
										}}
									/>
								);
							}}
						/>
						{errors.categoryId?.message && (
							<span className="text-xs text-red-500 mt-1 block">{errors.categoryId.message}</span>
						)}
						<Textarea
							placeholder="Extracto breve"
							{...register('excerpt')}
							className="mt-10"
						/>
						<label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Contenido</label>
						<Controller
							name="content"
							control={control}
							rules={{
								validate: value => {
									const text = value?.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').trim();
									return text ? true : 'Contenido requerido';
								},
							}}
							render={({field}) => (
								<RichTextEditor
									value={field.value ?? ''}
									onChange={field.onChange}
									onBlur={field.onBlur}
									error={errors.content?.message}
								/>
							)}
						/>
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
