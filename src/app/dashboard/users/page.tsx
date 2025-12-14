"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Search, UserPlus, Eye } from "lucide-react";

// Mock data
const MOCK_USERS = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Student",
        enrolledCourses: 3,
        joinedAt: "2024-01-15",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Instructor",
        enrolledCourses: 0,
        joinedAt: "2024-02-20",
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Student",
        enrolledCourses: 5,
        joinedAt: "2024-03-10",
    },
    {
        id: "4",
        name: "Alice Williams",
        email: "alice@example.com",
        role: "Admin",
        enrolledCourses: 0,
        joinedAt: "2024-01-01",
    },
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [users] = useState(MOCK_USERS);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage all platform users
                    </p>
                </div>
                <Button className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add User
                </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>
                        {filteredUsers.length} user(s) found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium">Name</th>
                                    <th className="text-left py-3 px-4 font-medium">Email</th>
                                    <th className="text-left py-3 px-4 font-medium">Role</th>
                                    <th className="text-left py-3 px-4 font-medium">Courses</th>
                                    <th className="text-left py-3 px-4 font-medium">Joined</th>
                                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="py-3 px-4 font-medium">{user.name}</td>
                                        <td className="py-3 px-4 text-muted-foreground">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "Admin"
                                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                                                    : user.role === "Instructor"
                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">{user.enrolledCourses}</td>
                                        <td className="py-3 px-4 text-muted-foreground">
                                            {new Date(user.joinedAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/dashboard/users/${user.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View
                                                    </Button>
                                                </Link>
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
