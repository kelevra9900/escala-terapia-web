import {Meta} from "@/types"
import {BlogNote} from "@/types/blog"
import {simplifyUUID} from "@/utils";
import {AlignType,Table} from "@/components/atoms/Table";
import {Badge} from "@/components/atoms";


type Props = {
	notes: BlogNote[],
	meta: Meta,
	isLoading: boolean;
	onNoteClick: (id: string) => void;
}

const BlogTable = ({
	notes,
	meta,
	isLoading,
	onNoteClick
}: Props) => {
    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            width: 100,
            align: 'center' as AlignType,
            render: (id: string) => (
                <span className="text-gray-600">{simplifyUUID(id)}</span>
            ),
            title: 'ID',
        },
        {
            dataIndex: 'title',
            key: 'title',
            width: 250,
            align: 'left' as AlignType,
            render: (title: string) => (
                <span className="font-medium text-gray-800 dark:text-white">{title}</span>
            ),
            title: 'Título',
        },
        {
            title: 'Categoría',
            dataIndex: ['category','name'],
            key: 'category',
            width: 160,
            align: 'center' as AlignType,
            render: (name: string) => (
                <span className="text-gray-700">{name}</span>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            align: 'center' as AlignType,
            render: (status: string) => (
                <Badge
                    color={status === 'PUBLISHED' ? 'bg-lime-100 !text-lime-500' : status === 'ARCHIVED' ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'}
                    text={status}
                />
            ),
        },
        {
            title: 'Publicado',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            width: 150,
            align: 'center' as AlignType,
            render: (date: string | null) => (
                <span className="text-gray-600 text-[13px]">
                    {date ? new Date(date).toLocaleDateString() : '—'}
                </span>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            width: 140,
            align: 'center' as AlignType,
            render: (_: string,record: BlogNote) => (
                <button
                    onClick={() => onNoteClick(record.id)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Ver nota"
                >
                    Ver
                </button>
            ),
        },
    ]
    return (
        <div className="mb-6 overflow-hidden rounded shadow bg-white dark:bg-dark-1000 max-w-full">
            <Table
                columns={columns}
                data={notes}
                rowKey="id"
                scroll={{x: 1000}}
                className="th"
                emptyText={() => (
                    <div className="flex flex-col items-center py-7">
                        <div className="mb-1 pt-6 text-base font-semibold text-heading">
                            No hay notas de blog
                        </div>
                        <p className="text-[13px] text-gray-500 text-center max-w-xs">
                            Crea una nueva nota para verla aquí.
                        </p>
                    </div>
                )}
            />
        </div>
    )
}

export default BlogTable;
