const Page = () => {
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden">
          CT 1
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden">
          CT 2
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden">
          Final
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden">
          Extra 1
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden">
          Extra 2
        </div>
      </div>
    </div>
  );
};

export default Page;
