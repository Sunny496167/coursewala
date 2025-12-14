"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

interface ProfileFormData {
    name: string;
    email: string;
}

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function SettingsPage() {
    const { user } = useAuth();

    const profileForm = useForm<ProfileFormData>({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    });

    const passwordForm = useForm<PasswordFormData>();

    const onProfileSubmit = (data: ProfileFormData) => {
        console.log("Profile update:", data);
        // Handle profile update
    };

    const onPasswordSubmit = (data: PasswordFormData) => {
        console.log("Password update:", data);
        // Handle password update
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                        Update your personal information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name
                            </label>
                            <Input
                                id="name"
                                {...profileForm.register("name", { required: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                {...profileForm.register("email", { required: true })}
                            />
                        </div>

                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Password Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="currentPassword" className="text-sm font-medium">
                                Current Password
                            </label>
                            <Input
                                id="currentPassword"
                                type="password"
                                {...passwordForm.register("currentPassword", { required: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="text-sm font-medium">
                                New Password
                            </label>
                            <Input
                                id="newPassword"
                                type="password"
                                {...passwordForm.register("newPassword", {
                                    required: true,
                                    minLength: 8,
                                })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm New Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...passwordForm.register("confirmPassword", { required: true })}
                            />
                        </div>

                        <Button type="submit">Update Password</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                        Choose what notifications you want to receive
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates about your courses
                            </p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Course Updates</p>
                            <p className="text-sm text-muted-foreground">
                                Get notified when courses are updated
                            </p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Marketing Emails</p>
                            <p className="text-sm text-muted-foreground">
                                Receive promotional content and offers
                            </p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" />
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible actions for your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                </CardContent>
            </Card>
        </div>
    );
}
