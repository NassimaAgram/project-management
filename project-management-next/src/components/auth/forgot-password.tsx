"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { FADE_IN_VARIANTS } from "@/constants";
import { z } from "zod";
import Link from "next/link";

// Define validation schema for the forgot password form using Zod
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
});

const ForgotPasswordForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Validate email using Zod
        const validation = forgotPasswordSchema.safeParse({ email });

        if (!validation.success) {
            // If validation fails, show toast error messages for each issue
            validation.error.errors.forEach((error) => {
                toast.error(error.message);
            });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate the password reset process
            setTimeout(() => {
                toast.success("If that email exists, you will receive a password reset link shortly.");
                router.push("/auth/sign-in"); // Redirect back to sign-in after success
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
                <p className="text-sm text-gray-400 py-5 text-center">Enter your email address to receive a password reset link</p>
                <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
                    <div className="w-full flex flex-col gap-y-4">
                        <form onSubmit={handleForgotPassword} className="w-full space-y-4">
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

                            <Button type="submit" disabled={isLoading} className="w-full mt-2">
                                {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                            </Button>
                        </form>

                        {/* Back to Sign In Link */}
                        <div className="text-center py-2 px-10">
                            <span className="text-sm">Remember your password? </span>
                            <Link
                                href="/auth/sign-in"
                                className="text-sm font-medium text-blue-400 hover:text-blue-600"
                            >
                                Sign in here
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
