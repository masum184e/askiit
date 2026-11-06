"use client";

import { useState } from "react";

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

import {
  UserRound,
  GraduationCap,
  Code2,
  BriefcaseBusiness,
  Camera,
  Save,
  Github,
} from "lucide-react";

const PersonalInfoForm = () => {
  const [session, setSession] = useState("");

  const sessions = Array.from({ length: 8 }, (_, i) => {
    const start = 2017 + i;
    return `${start}-${start + 1}`;
  });

  const inputClass =
    "h-11 border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 rounded-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500";

  const labelClass = "text-sm font-semibold text-slate-700";

  return (
    <form className="space-y-8">
      {/* Personal Details */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-slate-900">
            <UserRound size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-800">Personal Details</h3>
            <p className="text-xs text-slate-500">
              Your basic personal and contact information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="fullName" className={labelClass}>
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId" className={labelClass}>
              Student ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="studentId"
              type="text"
              placeholder="e.g. ASH2125033M"
              className={inputClass}
              required
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={inputClass}
              required
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className={labelClass}>
              Mobile Number
            </Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="e.g. 01XXXXXXXXX"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className={labelClass}>
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="Your current address"
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session" className={labelClass}>
              Academic Session <span className="text-red-500">*</span>
            </Label>

            <Select value={session} onValueChange={setSession}>
              <SelectTrigger className={inputClass}>
                <SelectValue placeholder="Select session" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {sessions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Online Profiles */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-slate-900">
            <Code2 size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-800">Developer Profiles</h3>
            <p className="text-xs text-slate-500">
              Your coding profiles and professional presence
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="githubAccount" className={labelClass}>
              GitHub Account <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Github
                size={17}
                className="absolute left-3 top-3 text-slate-400"
              />
              <Input
                id="githubAccount"
                type="text"
                placeholder="e.g. johndoe"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="codeforces" className={labelClass}>
              Codeforces Handle
            </Label>
            <Input
              id="codeforces"
              type="text"
              placeholder="e.g. johndoe123"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leetcode" className={labelClass}>
              LeetCode Handle
            </Label>
            <Input
              id="leetcode"
              type="text"
              placeholder="e.g. john_leetcode"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Professional Information */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-slate-900">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-800">
              Professional Experience
            </h3>
            <p className="text-xs text-slate-500">
              Your internship and technical experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="internCompany" className={labelClass}>
              Internship Company
            </Label>
            <Input
              id="internCompany"
              type="text"
              placeholder="Company name"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="internTech" className={labelClass}>
              Internship Tech Stack
            </Label>
            <Input
              id="internTech"
              type="text"
              placeholder="e.g. React, Node.js"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Profile Image */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-slate-900">
            <Camera size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-800">Profile Photograph</h3>
            <p className="text-xs text-slate-500">
              Upload a professional profile picture
            </p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/30">
          <Label
            htmlFor="image"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-slate-900">
              <Camera size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700">
                Click to upload your profile image
              </p>
              <p className="mt-1 text-xs text-slate-400">PNG, JPG or JPEG</p>
            </div>

            <Input
              id="image"
              type="file"
              accept="image/png,image/jpeg"
              className="h-auto max-w-sm cursor-pointer border-slate-200 bg-white text-xs hidden"
              required
            />
          </Label>
        </div>
      </section>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-400">
          Fields marked with <span className="text-red-500">*</span> are
          required.
        </p>

        <Button
          type="submit"
          className="h-11 gap-2 rounded-lg bg-blue-600 px-7 font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
        >
          <Save size={17} />
          Save Personal Information
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
