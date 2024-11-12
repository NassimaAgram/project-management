"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { FADE_IN_VARIANTS } from "@/constants";
import Link from "next/link";

// Simulated OTP verification (replace with your backend API later)
const verifyOTP = (otpCode: string): boolean => {
  return otpCode === "123456"; // Simulate valid OTP
};

const VerifyOTPForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join(""); // Combine OTP array into a string

    // Basic validation
    if (otpCode.length < 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate OTP verification request
      setTimeout(() => {
        if (verifyOTP(otpCode)) {
          toast.success("OTP verified successfully!");
          router.push("/dashboard"); // Redirect after successful OTP verification
        } else {
          toast.error("Invalid OTP, please try again.");
        }
      }, 1500);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md py-4">
        <Link href="/">
          <h2 className="flex justify-center text-2xl font-semibold pb-6 border-b border-border">
            Proje<span className="text-transparent font-bold bg-gradient-to-br from-purple-700 to-blue-400 bg-clip-text">X</span>pert
          </h2>
        </Link>
        <p className="text-sm text-gray-400 py-3 text-center">Please enter the OTP sent to your email/phone.</p>
        <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
          <form onSubmit={handleVerifyOTP} className="w-full space-y-4">
            {/* OTP Input Group */}
            <InputOTPGroup className="justify-center">
              {otp.map((digit, index) => (
                <InputOTPSlot key={index} index={index} className="w-12 h-12">
                  <input
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    maxLength={1}
                    className="w-full h-full text-center border border-gray-300 rounded-md"
                  />
                </InputOTPSlot>
              ))}
              <InputOTPSeparator />
            </InputOTPGroup>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Verify OTP"}
            </Button>
          </form>

          {/* Resend OTP Link */}
          <div className="text-center py-2 mt-4">
            <span className="text-sm">Didn't receive the OTP?</span>
            <Link href="/auth/resend-otp" className="text-sm font-medium text-blue-400 hover:text-blue-600">
              Resend it.
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTPForm;
