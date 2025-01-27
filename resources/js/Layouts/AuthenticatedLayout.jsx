import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/Pages/Private/Partials/dashboard-sidebar';
import { usePage } from '@inertiajs/react';
import { Separator } from '@radix-ui/react-select';

export default function AuthenticatedLayout({ children, breadcrumbs = [] }) {
    const user = usePage().props.auth.user;

    return (
        <SidebarProvider>
            <DashboardSidebar user={user} className={'bg-primary'} admin={user.is_admin} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
                    <div className="flex flex-row items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <BreadcrumbSeparator className="block" />
                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbLink href={breadcrumb.link}>
                                                {breadcrumb.name}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </div>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 dashboard">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
