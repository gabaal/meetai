'use client'

import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardUserButton } from "./dashboard-user-button"

const firstSections = [
    {
        icon: VideoIcon,
        label: 'Meetings',
        href: '/meetings'
    },
    {
        icon: BotIcon,
        label: 'Agents',
        href: '/agents'
    },]


const secondSections = [
    {
        icon: StarIcon,
        label: 'Upgrade',
        href: '/upgrade'
    },
]


export const DashboardSidebar = () => {

const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href='/' className="flex items-center gap-2 px-2 pt-2">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={36}
                        height={36}
                    />
                    <p className="font-semibold text-2xl">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5d6b68]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="text-[#5d6b68]">
                            {firstSections.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn('h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                                        pathname === item.href && 'bg-linear-to-r/oklch border border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                                    )}
                                    isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span></Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
<div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5d6b68]" />
            </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="text-[#5d6b68]">
                            {secondSections.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn('h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                                        pathname === item.href && 'bg-linear-to-r/oklch border border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                                    )}
                                    isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span></Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}