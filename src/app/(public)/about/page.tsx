export default function AboutPage() {
    return (
        <div className="container py-16 md:py-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold tracking-tight">About Coursewala</h1>
                <p className="text-xl text-muted-foreground">
                    We are on a mission to make high-quality education accessible to everyone, everywhere.
                </p>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>
                        Coursewala was founded in 2024 with a simple idea: that everyone should have the opportunity to learn from the best. We believe that education is the key to unlocking human potential, and we are committed to providing a platform where learners can connect with experts and achieve their goals.
                    </p>
                    <p>
                        Our platform offers a wide range of courses in technology, business, design, and more. Whether you are looking to start a new career, advance in your current role, or simply learn something new, Coursewala has something for you.
                    </p>
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Quality:</strong> We partner with top instructors to ensure that our courses are of the highest quality.</li>
                        <li><strong>Accessibility:</strong> We strive to make our courses affordable and accessible to learners around the world.</li>
                        <li><strong>Community:</strong> We believe in the power of community and encourage learners to connect and support each other.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
