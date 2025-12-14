"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

// Mock data
const MOCK_USER = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    joinedAt: "2024-01-15",
    enrolledCourses: [
        { id: "1", title: "Complete Web Development Bootcamp", progress: 75 },
        { id: "2", title: "React - The Complete Guide 2024", progress: 45 },
        { id: "3", title: "Python for Data Science", progress: 20 },
    ],
};

export default async function UserDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/users">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                    <p className="text-muted-foreground mt-1">
                        View user information and activity
                    </p>
                </div>
            </div>

            {/* User Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Name</p>
                            <p className="text-base font-medium">{MOCK_USER.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p className="text-base font-medium">{MOCK_USER.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Role</p>
                            <p className="text-base font-medium">{MOCK_USER.role}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Joined</p>
                            <p className="text-base font-medium">
                                {new Date(MOCK_USER.joinedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enrolled Courses */}
            <Card>
                <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                    <CardDescription>
                        {MOCK_USER.enrolledCourses.length} course(s) enrolled
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {MOCK_USER.enrolledCourses.map((course) => (
                        <div
                            key={course.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">{course.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Progress: {course.progress}%
                                    </p>
                                </div>
                            </div>
                            <Link href={`/courses/${course.id}`}>
                                <Button variant="outline" size="sm">
                                    View Course
                                </Button>
                            </Link>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
