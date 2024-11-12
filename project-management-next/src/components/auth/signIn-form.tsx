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

const SignInForm = () => {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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

    const handleSignIn = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("All fields are required!");
            return;
        }

        setIsLoading(true);

        try {
            setTimeout(() => {
                toast.success("Sign-in successful!");
                router.push("/dashboard");
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
                <h2 className="flex justify-center text-2xl font-semibold pb-8">
                    Sign in to Proje<span className="text-transparent font-bold bg-gradient-to-br from-purple-700 to-blue-400 bg-clip-text">X</span>pert
                </h2>
                <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
                    <div className="w-full flex flex-col gap-y-4">
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
                        <form onSubmit={handleSignIn} className="w-full space-y-4">
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

                            {/* Forgot Password Link */}
                            <div className="text-center py-2 mt-4">
                                <a
                                    href="/auth/forgot-password"
                                    className="text-sm text-blue-400 hover:text-blue-600"
                                >
                                    Forgot your password?
                                </a>
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Sign in with email"}
                            </Button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="text-center py-2  px-4">
                            <span className="text-sm">Don't have an account? </span>
                            <a
                                href="/auth/sign-up"
                                className="text-sm font-medium text-blue-400 hover:text-blue-600"
                            >
                                Sign up here
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignInForm;
