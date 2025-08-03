import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function StudentNetwork() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
      <div className="animate-fade-in-left">
        <Card className="p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <CardContent className="p-0">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Student Network</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Connect with current students and alumni from all batches. Build your professional network
              and get mentorship from experienced graduates.
            </p>
            <ul className="space-y-2">
              {['Alumni directory', 'Mentorship programs', 'Career guidance'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="animate-fade-in-right">
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-3xl">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Connected Students</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { year: '23', label: 'Batch 2023', colors: 'from-blue-400 to-blue-600' },
              { year: '22', label: 'Batch 2022', colors: 'from-purple-400 to-purple-600' },
              { year: '21', label: 'Alumni', colors: 'from-pink-400 to-pink-600' },
            ].map(({ year, label, colors }, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${colors} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                  <span className="text-white font-bold">{year}</span>
                </div>
                <div className="text-xs text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}