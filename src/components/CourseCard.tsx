import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, Clock } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    students: number;
    duration: string;
    image?: string;
}

export function CourseCard({ id, title, description, price, students, duration, image }: CourseCardProps) {
    return (
        <Card className="flex flex-col overflow-hidden h-full transition-all hover:shadow-md">
            <div className="aspect-video bg-muted relative">
                {/* Placeholder for course image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    {image ? <img src={image} alt={title} className="object-cover w-full h-full" /> : "Course Image"}
                </div>
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1 text-lg">
                    <Link href={`/courses/${id}`} className="hover:underline">
                        {title}
                    </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{duration}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t p-4 bg-muted/20">
                <div className="flex w-full items-center justify-between">
                    <span className="font-bold text-lg">${price.toFixed(2)}</span>
                    <Link href={`/courses/${id}`}>
                        <Button size="sm">View Details</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
