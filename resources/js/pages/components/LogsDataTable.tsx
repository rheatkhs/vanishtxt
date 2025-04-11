import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// Define the shape of your log data
type Log = {
    id: number;
    action: string;
    description: string;
    created_at: string;
};

// Sample dummy data
const dummyLogs: Log[] = [
    { id: 1, action: 'created', description: 'Message created', created_at: '2025-04-10 10:12:00' },
    { id: 2, action: 'viewed', description: 'Message viewed by user', created_at: '2025-04-10 10:15:12' },
    // Add more log entries as needed
];

const columns: ColumnDef<Log>[] = [
    {
        accessorKey: 'action',
        header: 'Action',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'created_at',
        header: 'Timestamp',
        cell: (info) => info.getValue(),
    },
];

export default function LogsDataTable() {
    const table = useReactTable({
        data: dummyLogs,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
