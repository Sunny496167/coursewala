import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle, Clock, Globe, PlayCircle, Star, Users, Award } from "lucide-react";
import Link from "next/link";

// Mock data
const COURSE = {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
    longDescription: "This is the only course you need to learn web development. We will cover everything from the basics of HTML and CSS to advanced topics like React, Node.js, and MongoDB. By the end of this course, you will be able to build full-stack web applications from scratch.",
    price: 99.99,
    rating: 4.8,
    students: 1234,
    duration: "60h",
    lastUpdated: "December 2024",
    language: "English",
    instructor: {
        name: "John Doe",
        bio: "John is a full-stack developer with over 10 years of experience. He has taught over 100,000 students online and is passionate about helping others learn to code.",
        avatar: "https://github.com/shadcn.png",
    },
    curriculum: [
        {
            title: "Introduction to Web Development",
            lessons: [
                { title: "How the Internet Works", duration: "10m" },
                { title: "Setting up your Environment", duration: "15m" },
            ],
        },
        {
            title: "HTML 5",
            lessons: [
                { title: "HTML Basics", duration: "20m" },
                { title: "HTML Forms", duration: "25m" },
            ],
        },
        {
            title: "CSS 3",
            lessons: [
                { title: "CSS Selectors", duration: "30m" },
                { title: "Flexbox", duration: "40m" },
                { title: "Grid", duration: "45m" },
            ],
        },
    ],
    features: [
        "Full lifetime access",
        "Access on mobile and TV",
        "Certificate of completion",
        "30-day money-back guarantee",
    ],
};

export default async function CourseDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // In a real app, fetch course data based on id
    // const course = await getCourse(id);

    return (
        <div className="min-h-screen pb-16">
            {/* Course Header */}
            <div className="bg-muted/30 py-12 md:py-16">
                <div className="container grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {COURSE.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {COURSE.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-medium">{COURSE.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{COURSE.students} students</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{COURSE.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Globe className="h-4 w-4" />
                                <span>{COURSE.language}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Created by <span className="font-medium text-foreground">{COURSE.instructor.name}</span></span>
                            <span>•</span>
                            <span>Last updated {COURSE.lastUpdated}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container grid grid-cols-1 gap-8 lg:grid-cols-3 mt-8">
                <div className="lg:col-span-2 space-y-12">
                    {/* What you'll learn */}
                    <section className="border rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {COURSE.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Course Content */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                        <div className="space-y-4">
                            {COURSE.curriculum.map((section, index) => (
                                <Card key={index}>
                                    <CardHeader className="py-4 bg-muted/20">
                                        <CardTitle className="text-base font-medium flex justify-between items-center">
                                            {section.title}
                                            <span className="text-sm text-muted-foreground font-normal">
                                                {section.lessons.length} lectures
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <ul className="space-y-3">
                                            {section.lessons.map((lesson, lessonIndex) => (
                                                <li key={lessonIndex} className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <PlayCircle className="h-4 w-4 text-muted-foreground" />
                                                        <span>{lesson.title}</span>
                                                    </div>
                                                    <span className="text-muted-foreground">{lesson.duration}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Instructor */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Instructor</h2>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="h-24 w-24 rounded-full bg-muted overflow-hidden shrink-0">
                                {/* Avatar placeholder */}
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-2xl font-bold">
                                    {COURSE.instructor.name[0]}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">{COURSE.instructor.name}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {COURSE.instructor.bio}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <Card className="overflow-hidden">
                            <div className="aspect-video bg-muted relative">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    Course Preview
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-3xl font-bold">${COURSE.price}</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button size="lg" className="w-full">Add to Cart</Button>
                                    <Button variant="outline" size="lg" className="w-full">Buy Now</Button>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <h4 className="font-medium text-sm">This course includes:</h4>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-3">
                                            <PlayCircle className="h-4 w-4" />
                                            <span>{COURSE.duration} on-demand video</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Globe className="h-4 w-4" />
                                            <span>Full lifetime access</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Users className="h-4 w-4" />
                                            <span>Access on mobile and TV</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Award className="h-4 w-4" />
                                            <span>Certificate of completion</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
