import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { BookOpen, Users, Award } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
                <div className="container relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Unlock Your Potential with <span className="text-primary">Coursewala</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                        Master new skills from industry experts. Join thousands of learners achieving their goals today.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Link href="/courses">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Explore Courses
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                Join for Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-3 rounded-full bg-primary/10 mb-4">
                            <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Expert-Led Courses</h3>
                        <p className="text-muted-foreground">Learn from the best in the industry with our curated curriculum.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-3 rounded-full bg-primary/10 mb-4">
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                        <p className="text-muted-foreground">Connect with fellow learners and grow your network.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-3 rounded-full bg-primary/10 mb-4">
                            <Award className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Certified Learning</h3>
                        <p className="text-muted-foreground">Earn certificates to showcase your achievements to employers.</p>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section (Mock Data) */}
            <section className="container">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
                    <Link href="/courses">
                        <Button variant="ghost">View All</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="flex flex-col overflow-hidden">
                            <div className="aspect-video bg-muted relative">
                                {/* Placeholder for course image */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    Course Image
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="line-clamp-1">Complete Web Development Bootcamp</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>1.2k students</span>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t p-4 bg-muted/20">
                                <div className="flex w-full items-center justify-between">
                                    <span className="font-bold text-lg">$99.99</span>
                                    <Button size="sm">Enroll Now</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container pb-16">
                <div className="rounded-3xl bg-primary px-6 py-16 md:px-16 md:py-24 text-center text-primary-foreground">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                        Ready to start your learning journey?
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-primary-foreground/80 mb-8">
                        Join thousands of students and start learning today.
                    </p>
                    <Link href="/signup">
                        <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
