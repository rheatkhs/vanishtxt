import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import LogsDataTable from '../components/LogsDataTable';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Logs', href: '/logs' }];

export default function Logs() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Message Logs" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold text-white">Message Logs</h1>
                <LogsDataTable />
            </div>
        </AppLayout>
    );
}
