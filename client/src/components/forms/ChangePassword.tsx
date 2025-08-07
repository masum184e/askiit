import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ChangePassword = () => {
  return (
    <form className="max-w-md p-6 bg-gray-50 shadow-lg rounded-xl space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Chagne Password</h2>

      {/* Current Password */}
      <div className="space-y-2">
        <Label htmlFor="currentPassword" className="text-gray-700">
          Current Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Enter your current password"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-gray-700">
          New Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Create a new password"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* Confirm New Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700">
          Confirm New Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter new password"
          className="text-gray-700 border border-gray-300"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Update Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
