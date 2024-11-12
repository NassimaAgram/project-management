"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import Icons from "../global/icons";
import LoadingIcon from "../ui/loading-icon";
import { FADE_IN_VARIANTS } from "@/constants";

const SignUpForm = () => {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");

    const [name, setName] = useState("");  // New name state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleOAuth = async () => {
        setIsGoogleLoading(true);
        try {
            // Placeholder for OAuth redirection
            toast.loading("Redirecting to Google...");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        try {
            setTimeout(() => {
                toast.success("Sign-up successful!");
                router.push("/dashboard");  // Redirect after successful sign-up
            }, 1500);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md lg:max-w-lg p-8">
                <h2 className="flex justify-center text-2xl font-semibold pb-8 items-center ">
                    Sign up to Proje<span className="text-transparent font-bold bg-gradient-to-br from-purple-700 to-blue-400 bg-clip-text">X</span>pert
                </h2>
                <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
                    <div className="w-full flex flex-col gap-y-3">
                        <Button
                            onClick={handleOAuth}
                            disabled={isGoogleLoading || isLoading}
                            className="w-full"
                            variant="tertiary"
                        >
                            {isGoogleLoading ? (
                                <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" />
                            ) : (
                                <Icons.google className="w-4 h-4 absolute left-4" />
                            )}
                            Continue with Google
                        </Button>
                        <p className="text-center text-muted-foreground">or</p>
                        <form onSubmit={handleSignUp} className="w-full space-y-4">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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

                        {/* Sign In Link */}
                        <div className="text-center py-2 px-6">
                            <span className="text-sm"> Already have an account? </span>
                            <a
                                href="/auth/sign-in"
                                className="text-sm font-medium text-blue-500 hover:text-blue-700"
                            >
                                Sign in here
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUpForm;
