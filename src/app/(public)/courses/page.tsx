"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/CourseCard";
import { Search, SlidersHorizontal } from "lucide-react";

// Mock data
const COURSES = [
    {
        id: "1",
        title: "Complete Web Development Bootcamp",
        description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
        price: 99.99,
        students: 1234,
        duration: "60h",
        category: "Development",
    },
    {
        id: "2",
        title: "React - The Complete Guide 2024",
        description: "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
        price: 89.99,
        students: 850,
        duration: "45h",
        category: "Development",
    },
    {
        id: "3",
        title: "Python for Data Science and Machine Learning Bootcamp",
        description: "Learn how to use NumPy, Pandas, Seaborn , Matplotlib , Plotly , Scikit-Learn , Machine Learning, Tensorflow , and more!",
        price: 129.99,
        students: 2100,
        duration: "55h",
        category: "Data Science",
    },
    {
        id: "4",
        title: "The Ultimate Drawing Course - Beginner to Advanced",
        description: "Join over 450,000 students and learn how to draw with this best-selling course! Create advanced art that will stand up as professional work.",
        price: 19.99,
        students: 5000,
        duration: "12h",
        category: "Design",
    },
    {
        id: "5",
        title: "iOS 17 & Swift 5 - The Complete iOS App Development Bootcamp",
        description: "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!",
        price: 109.99,
        students: 900,
        duration: "50h",
        category: "Development",
    },
    {
        id: "6",
        title: "Docker and Kubernetes: The Complete Guide",
        description: "Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows",
        price: 149.99,
        students: 600,
        duration: "20h",
        category: "DevOps",
    },
];

const CATEGORIES = ["All", "Development", "Data Science", "Design", "DevOps", "Business"];

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredCourses = useMemo(() => {
        return COURSES.filter((course) => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="container py-8 md:py-12">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
                        <p className="text-muted-foreground mt-1">
                            Explore our wide range of courses and start learning today.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80 w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search courses..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <select
                                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} {...course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                            }}
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
