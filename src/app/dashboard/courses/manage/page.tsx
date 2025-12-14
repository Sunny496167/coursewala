"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

// Mock data
const MOCK_COURSES = [
    {
        id: "1",
        title: "Complete Web Development Bootcamp",
        category: "Development",
        price: 99.99,
        students: 1234,
        status: "Published",
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        title: "React - The Complete Guide 2024",
        category: "Development",
        price: 89.99,
        students: 850,
        status: "Published",
        createdAt: "2024-02-20",
    },
    {
        id: "3",
        title: "Python for Data Science",
        category: "Data Science",
        price: 129.99,
        students: 2100,
        status: "Published",
        createdAt: "2024-03-10",
    },
    {
        id: "4",
        title: "Advanced TypeScript",
        category: "Development",
        price: 79.99,
        students: 450,
        status: "Draft",
        createdAt: "2024-11-01",
    },
];

export default function ManageCoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courses] = useState(MOCK_COURSES);

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage all your courses
                    </p>
                </div>
                <Link href="/dashboard/courses/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Course
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Courses Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                    <CardDescription>
                        {filteredCourses.length} course(s) found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium">Title</th>
                                    <th className="text-left py-3 px-4 font-medium">Category</th>
                                    <th className="text-left py-3 px-4 font-medium">Price</th>
                                    <th className="text-left py-3 px-4 font-medium">Students</th>
                                    <th className="text-left py-3 px-4 font-medium">Status</th>
                                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="py-3 px-4 font-medium">{course.title}</td>
                                        <td className="py-3 px-4 text-muted-foreground">
                                            {course.category}
                                        </td>
                                        <td className="py-3 px-4">${course.price}</td>
                                        <td className="py-3 px-4">{course.students}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === "Published"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                                    }`}
                                            >
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/courses/${course.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/courses/edit/${course.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
