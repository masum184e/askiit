"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Publications = () => {
  return (
    <form className="max-w-md p-6 bg-gray-50 shadow-lg rounded-xl space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Publications Information
      </h2>
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-700">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g. Deep Learning for NLP"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* Publisher */}
      <div className="space-y-2">
        <Label htmlFor="publisher" className="text-gray-700">
          Publisher / Journal <span className="text-red-500">*</span>
        </Label>
        <Input
          id="publisher"
          type="text"
          placeholder="e.g. IEEE Transactions"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* Author(s) */}
      <div className="space-y-2">
        <Label htmlFor="authors" className="text-gray-700">
          Author(s) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="authors"
          type="text"
          placeholder="e.g. Masum Billah, Jane Doe"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* DOI / URL */}
      <div className="space-y-2">
        <Label htmlFor="doi" className="text-gray-700">
          DOI or URL <span className="text-red-500">*</span>
        </Label>
        <Input
          id="doi"
          type="url"
          placeholder="https://doi.org/10.xxxx/xxxx"
          className="text-gray-700 border border-gray-300"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Publication
        </Button>
      </div>
    </form>
  );
};

export default Publications;
