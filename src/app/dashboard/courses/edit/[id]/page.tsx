"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CourseFormData {
    title: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    level: string;
}

export default async function EditCoursePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const router = useRouter();

    // Mock existing course data
    const existingCourse = {
        title: "Complete Web Development Bootcamp",
        description: "Become a full-stack web developer with just one course.",
        price: 99.99,
        category: "Development",
        duration: "60h",
        level: "Beginner",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CourseFormData>({
        defaultValues: existingCourse,
    });

    const onSubmit = (data: CourseFormData) => {
        console.log("Updated course data:", data);
        // Handle course update
        router.push("/dashboard/courses/manage");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/courses/manage">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Course</h1>
                    <p className="text-muted-foreground mt-1">
                        Update your course information
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Information</CardTitle>
                        <CardDescription>
                            Update the details of your course
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">
                                Course Title *
                            </label>
                            <Input
                                id="title"
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && (
                                <span className="text-sm text-destructive">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                            {errors.description && (
                                <span className="text-sm text-destructive">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-medium">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    {...register("category", { required: true })}
                                >
                                    <option value="Development">Development</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="level" className="text-sm font-medium">
                                    Level *
                                </label>
                                <select
                                    id="level"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    {...register("level", { required: true })}
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-sm font-medium">
                                    Price ($) *
                                </label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: 0,
                                    })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="duration" className="text-sm font-medium">
                                    Duration *
                                </label>
                                <Input
                                    id="duration"
                                    {...register("duration", { required: true })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button type="submit">Save Changes</Button>
                    <Link href="/dashboard/courses/manage">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
