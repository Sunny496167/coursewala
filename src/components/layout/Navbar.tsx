"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Coursewala
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/courses"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Courses
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Contact
                    </Link>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="hidden md:flex"
                    >
                        {theme === "light" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>

                    {/* Shopping Cart */}
                    <Button variant="ghost" size="icon" className="hidden md:flex relative">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                            0
                        </span>
                    </Button>

                    {/* Auth Buttons / User Menu */}
                    {isAuthenticated && user ? (
                        <div className="relative hidden md:block">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2"
                            >
                                <User className="h-4 w-4" />
                                <span>{user.name}</span>
                            </Button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-1">
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/dashboard/settings"
                                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setUserMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2 text-destructive"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <div className="container py-4 space-y-3">
                        <Link
                            href="/courses"
                            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Courses
                        </Link>
                        <Link
                            href="/about"
                            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        <div className="pt-3 border-t space-y-2">
                            {isAuthenticated && user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Button variant="outline" size="sm" className="w-full">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => {
                                            logout();
                                            setMobileMenuOpen(false);
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Button variant="outline" size="sm" className="w-full">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Button size="sm" className="w-full">
                                            Sign up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="pt-3 border-t flex items-center justify-between">
                            <span className="text-sm font-medium">Theme</span>
                            <Button variant="outline" size="sm" onClick={toggleTheme}>
                                {theme === "light" ? (
                                    <>
                                        <Moon className="h-4 w-4 mr-2" />
                                        Dark
                                    </>
                                ) : (
                                    <>
                                        <Sun className="h-4 w-4 mr-2" />
                                        Light
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
