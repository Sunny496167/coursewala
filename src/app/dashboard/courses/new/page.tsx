"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

interface CourseFormData {
    title: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    level: string;
}

export default function NewCoursePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [curriculum, setCurriculum] = useState<Array<{ title: string; lessons: string[] }>>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CourseFormData>();

    const onSubmit = (data: CourseFormData) => {
        console.log("Course data:", data);
        console.log("Curriculum:", curriculum);
        // Handle course creation
        router.push("/dashboard/courses/manage");
    };

    const addSection = () => {
        setCurriculum([...curriculum, { title: "", lessons: [] }]);
    };

    const addLesson = (sectionIndex: number) => {
        const newCurriculum = [...curriculum];
        newCurriculum[sectionIndex].lessons.push("");
        setCurriculum(newCurriculum);
    };

    const removeSection = (index: number) => {
        setCurriculum(curriculum.filter((_, i) => i !== index));
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
                    <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
                    <p className="text-muted-foreground mt-1">
                        Fill in the details to create your course
                    </p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-muted-foreground text-muted-foreground"
                                }`}
                        >
                            {step}
                        </div>
                        {step < 3 && (
                            <div
                                className={`w-16 h-0.5 ${currentStep > step ? "bg-primary" : "bg-muted-foreground"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Enter the basic details about your course
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium">
                                    Course Title *
                                </label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Complete Web Development Bootcamp"
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
                                    placeholder="Describe what students will learn..."
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
                                        <option value="">Select category</option>
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
                                        <option value="">Select level</option>
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
                                        placeholder="99.99"
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
                                        placeholder="e.g., 40h"
                                        {...register("duration", { required: true })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Curriculum */}
                {currentStep === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Curriculum</CardTitle>
                            <CardDescription>
                                Add sections and lessons to your course
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {curriculum.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder="Section title"
                                            value={section.title}
                                            onChange={(e) => {
                                                const newCurriculum = [...curriculum];
                                                newCurriculum[sectionIndex].title = e.target.value;
                                                setCurriculum(newCurriculum);
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeSection(sectionIndex)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="pl-4 space-y-2">
                                        {section.lessons.map((lesson, lessonIndex) => (
                                            <Input
                                                key={lessonIndex}
                                                placeholder="Lesson title"
                                                value={lesson}
                                                onChange={(e) => {
                                                    const newCurriculum = [...curriculum];
                                                    newCurriculum[sectionIndex].lessons[lessonIndex] =
                                                        e.target.value;
                                                    setCurriculum(newCurriculum);
                                                }}
                                            />
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addLesson(sectionIndex)}
                                            className="w-full"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Lesson
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={addSection}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Section
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Review & Publish</CardTitle>
                            <CardDescription>
                                Review your course details before publishing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-center text-muted-foreground">
                                    Review all the information and click "Create Course" to publish.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                    >
                        Previous
                    </Button>

                    {currentStep < 3 ? (
                        <Button
                            type="button"
                            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button type="submit">Create Course</Button>
                    )}
                </div>
            </form>
        </div>
    );
}
