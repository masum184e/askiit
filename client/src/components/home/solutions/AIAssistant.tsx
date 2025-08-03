import { BotIcon, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AIAssistant() {
  return (
    <section className="animate-fade-in-up">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white p-8 lg:p-12 border-0 shadow-xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Column */}
          <div>
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <BotIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">AI-Powered Assistant</h3>
            <p className="text-xl mb-6 text-indigo-100">
              Get instant answers to your queries about question papers, projects, and student information 
              with our intelligent chatbot powered by advanced AI.
            </p>

            <ul className="space-y-3">
              {[
                "24/7 instant support",
                "Smart search assistance",
                "Personalized recommendations"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <Circle className="w-2 h-2 text-white mr-3 fill-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (Chat Preview) */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <CardContent className="bg-white/20 rounded-xl p-4 mb-4 text-white">
              <div className="text-sm text-indigo-200 mb-2">You:</div>
              Show me Data Structures question papers from 2022
            </CardContent>
            <CardContent className="bg-indigo-600/50 rounded-xl p-4 text-white">
              <div className="text-sm text-indigo-200 mb-2">AI Assistant:</div>
              I found 5 Data Structures question papers from 2022. Here are the most relevant ones...
            </CardContent>
          </div>
          
        </div>
      </Card>
    </section>
  );
}