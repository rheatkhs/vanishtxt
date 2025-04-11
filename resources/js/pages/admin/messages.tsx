import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart, Hourglass, Inbox } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Messages', href: '/messages' }];

const messageStats = [
    {
        label: 'One-Time Access',
        value: 12,
        icon: <Hourglass className="h-6 w-6 text-white" />,
        bg: 'from-pink-500 to-pink-700',
    },
    {
        label: 'All Messages',
        value: 54,
        icon: <Inbox className="h-6 w-6 text-white" />,
        bg: 'from-green-500 to-green-700',
    },
];

export default function Messages() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages Dashboard" />
            <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
                {/* ✅ Title Header */}
                <div className="text-center sm:text-left">
                    <h1 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-white sm:justify-start sm:text-4xl">
                        <BarChart className="h-7 w-7 text-pink-400" />
                        Message Overview
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">Manage and monitor all your VanishTXT messages from here.</p>
                </div>

                {/* ✅ Stat Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {messageStats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-gradient-to-br ${stat.bg} px-5 py-6 shadow-lg backdrop-blur-md transition-all hover:scale-[1.03]`}
                        >
                            <div className="flex flex-col">
                                <h4 className="text-sm font-medium text-white/80">{stat.label}</h4>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                            </div>
                            <div className="rounded-full bg-white/20 p-2">{stat.icon}</div>
                        </div>
                    ))}
                </div>

                {/* ✅ Placeholder for Message Table/List */}
                <div className="relative min-h-[300px] w-full rounded-xl border border-white/10 bg-white/5 p-6 shadow-inner backdrop-blur-md">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">📬 Recent Messages</h3>
                    <p className="text-sm text-gray-400">Messages will appear here once data is integrated.</p>
                </div>
            </div>
        </AppLayout>
    );
}
