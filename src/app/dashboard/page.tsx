"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import {
    BookOpen,
    Users,
    DollarSign,
    TrendingUp,
    Plus,
    ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();

    const stats = [
        {
            title: "Total Courses",
            value: "24",
            change: "+2 this month",
            icon: BookOpen,
            color: "text-blue-600",
        },
        {
            title: "Total Students",
            value: "1,234",
            change: "+180 this month",
            icon: Users,
            color: "text-green-600",
        },
        {
            title: "Revenue",
            value: "$12,345",
            change: "+12% from last month",
            icon: DollarSign,
            color: "text-yellow-600",
        },
        {
            title: "Engagement",
            value: "89%",
            change: "+5% from last week",
            icon: TrendingUp,
            color: "text-purple-600",
        },
    ];

    const recentActivity = [
        { action: "New enrollment in React Course", time: "2 hours ago" },
        { action: "Course 'Next.js Mastery' published", time: "5 hours ago" },
        { action: "New user registration", time: "1 day ago" },
        { action: "Payment received: $99.99", time: "2 days ago" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here's what's happening with your courses today.
                    </p>
                </div>
                <Link href="/dashboard/courses/new">
                    <Button size="lg" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Course
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest updates from your platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start justify-between pb-4 last:pb-0 border-b last:border-0"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {activity.action}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks and shortcuts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link href="/dashboard/courses/new">
                            <Button variant="outline" className="w-full justify-between">
                                Create New Course
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard/courses/manage">
                            <Button variant="outline" className="w-full justify-between">
                                Manage Courses
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard/users">
                            <Button variant="outline" className="w-full justify-between">
                                View All Users
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard/settings">
                            <Button variant="outline" className="w-full justify-between">
                                Settings
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
