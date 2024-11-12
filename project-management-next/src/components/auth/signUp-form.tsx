"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { SignUpSchema, SignUpSchemaType } from "@/schema";
import { FADE_IN_VARIANTS } from "@/constants";

const SignUpForm = () => {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");

    const [formData, setFormData] = useState<SignUpSchemaType>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleChange = (field: keyof SignUpSchemaType, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data using Zod
        const result = SignUpSchema.safeParse(formData);

        if (!result.success) {
            // Display validation errors using toast
            result.error.errors.forEach((error) => toast.error(error.message));
            return;
        }

        setIsLoading(true);

        try {
            // Simulate successful sign-up
            setTimeout(() => {
                toast.success("Sign-up successful!");
                router.push("/dashboard"); // Redirect after successful sign-up
            }, 1500);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md lg:max-w-lg py-4">
                <Link href="/">
                    <h2 className="flex justify-center text-2xl font-semibold pb-6 border-b border-border">
                        Proje<span className="text-transparent font-bold bg-gradient-to-br from-purple-700 to-blue-400 bg-clip-text">X</span>pert
                    </h2>
                </Link>
                <p className="text-sm text-gray-400 py-5 text-center">Create an Account to start using ProjeXpert</p>
                <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
                    <form onSubmit={handleSignUp} className="w-full space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Enter your full name"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="Enter your email"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-1 right-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                    placeholder="Confirm your password"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-1 right-1"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full mt-2">
                            {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Sign up with email"}
                        </Button>
                    </form>

                    <div className="text-center py-2 px-10">
                        <span className="text-sm"> Already have an account? </span>
                        <Link href="/auth/sign-in" className="text-sm font-medium text-blue-500 hover:text-blue-700">
                            Sign in here
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUpForm;
