"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SPL2Form() {
  return (
    <form className="p-6 bg-gray-50 shadow-lg rounded-xl space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        SPL-2 Project Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-gray-700">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="projectName"
              type="text"
              placeholder="Enter your project name"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>

          {/* GitHub Link */}
          <div className="space-y-2">
            <Label htmlFor="github" className="text-gray-700">
              GitHub Repo Link <span className="text-red-500">*</span>
            </Label>
            <Input
              id="github"
              type="url"
              placeholder="https://github.com/your-repo"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>
          {/* Mentor Name */}
          <div className="space-y-2">
            <Label htmlFor="mentor" className="text-gray-700">
              Mentor Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="mentor"
              type="text"
              placeholder="Mentor's full name"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Live Link */}
          <div className="space-y-2">
            <Label htmlFor="live" className="text-gray-700">
              Live Link
            </Label>
            <Input
              id="live"
              type="url"
              placeholder="https://yourproject.com"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>

          {/* Banner Upload */}
          <div className="space-y-2">
            <Label htmlFor="bannerUpload" className="text-gray-700">
              Banner Snapshot <span className="text-red-500">*</span>
            </Label>
            <Input
              id="bannerUpload"
              name="banner"
              type="file"
              accept="image/*"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>

          {/* Team Members */}
          <div className="space-y-2">
            <Label htmlFor="teamMembers" className="text-gray-700">
              Team Members Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="teamMembers"
              type="text"
              placeholder="Enter full names separated by comma"
              className="text-gray-700 border border-gray-300"
              required
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          {/* Short Description */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description" className="text-gray-700">
              Short Project Description <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="description"
              placeholder="Brief description"
              className="text-gray-700 border border-gray-300 rounded-md w-full h-32 px-3 py-2 resize-none focus:outline-none bg-transparent"
              required
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
          Submit Project
        </Button>
      </div>
    </form>
  );
}
