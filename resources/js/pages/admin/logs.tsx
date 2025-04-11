import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import LogsDataTable from '../components/LogsDataTable';

export default function Logs() {
    return (
        <AppLayout>
            <Head title="Message Logs" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold text-white">Message Logs</h1>
                <LogsDataTable />
            </div>
        </AppLayout>
    );
}
