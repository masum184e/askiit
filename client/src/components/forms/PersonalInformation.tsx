"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

const PersonalInfoForm = () => {
  const [session, setSession] = useState("");

  const sessions = Array.from({ length: 8 }, (_, i) => {
    const start = 2017 + i;
    const end = start + 1;
    return `${start}-${end}`;
  });
  return (
    <form className="p-6 bg-gray-50 shadow-lg rounded-xl space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>

          {/* Student ID */}
          <div className="space-y-2">
            <Label htmlFor="studentId" className="text-gray-700">
              Student ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="studentId"
              type="text"
              placeholder="e.g. ASH2125033M"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-gray-700">
              Mobile Number
            </Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="e.g. 01XXXXXXXXX"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Session */}
          <div className="space-y-2">
            <Label htmlFor="session" className="text-gray-700">
              Session <span className="text-red-500">*</span>
            </Label>
            <Select value={session} onValueChange={setSession}>
              <SelectTrigger className="w-full border border-gray-300 outline-none !text-gray-700">
                <SelectValue
                  className="!text-gray-700"
                  placeholder="Select session"
                />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                {sessions.map((s) => (
                  <SelectItem key={s} value={s} className="text-gray-700">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Your current address"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubAccount" className="text-gray-700">
              GitHub Account <span className="text-red-500">*</span>
            </Label>
            <Input
              id="githubAccount"
              type="text"
              placeholder="e.g. johndoe"
              className="text-gray-700 border border-gray-300"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-700">
              Profile Image
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          {/* Codeforces Handle */}
          <div className="space-y-2">
            <Label htmlFor="codeforces" className="text-gray-700">
              Codeforces Handle
            </Label>
            <Input
              id="codeforces"
              type="text"
              placeholder="e.g. johndoe123"
              className="text-gray-700 border border-gray-300"
            />
          </div>

          {/* LeetCode Handle */}
          <div className="space-y-2">
            <Label htmlFor="leetcode" className="text-gray-700">
              LeetCode Handle
            </Label>
            <Input
              id="leetcode"
              type="text"
              placeholder="e.g. john_leetcode"
              className="text-gray-700 border border-gray-300"
            />
          </div>

          {/* Internship Company */}
          <div className="space-y-2">
            <Label htmlFor="internCompany" className="text-gray-700">
              Internship Company
            </Label>
            <Input
              id="internCompany"
              type="text"
              placeholder="Company name"
              className="text-gray-700 border border-gray-300"
            />
          </div>

          {/* Internship Tech */}
          <div className="space-y-2">
            <Label htmlFor="internTech" className="text-gray-700">
              Internship Tech Stack
            </Label>
            <Input
              id="internTech"
              type="text"
              placeholder="e.g. React, Node.js"
              className="text-gray-700 border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Personal Info
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
