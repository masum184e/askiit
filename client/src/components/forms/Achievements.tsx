"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Achievements = () => {
  return (
    <form className="max-w-md p-6 bg-gray-50 shadow-lg rounded-xl space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Achivement Information</h2>
      {/* Competition Name */}
      <div className="space-y-2">
        <Label htmlFor="competition" className="text-gray-700">
          Competition Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="competition"
          type="text"
          placeholder="e.g. IUBAT Programming Contest"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* Position */}
      <div className="space-y-2">
        <Label htmlFor="position" className="text-gray-700">
          Position / Award <span className="text-red-500">*</span>
        </Label>
        <Input
          id="position"
          type="text"
          placeholder="e.g. Champion, 2nd Runner-up"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700">
          Short Description<span className="text-red-500">*</span>
        </Label>
        <Input
          id="description"
          type="text"
          placeholder="Brief summary of the achievement"
          className="text-gray-700 border border-gray-300"
        />
      </div>

      {/* Banner Upload */}
      <div className="space-y-2">
        <Label htmlFor="banner" className="text-gray-700">
          Certificate or Banner <span className="text-red-500">*</span>
        </Label>
        <Input
          id="banner"
          type="file"
          accept="image/*"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Achievement
        </Button>
      </div>
    </form>
  );
};

export default Achievements;
