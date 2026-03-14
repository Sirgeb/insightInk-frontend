export default function TodoList() {
  return (
    <div className="mt-10 max-w-3xl mx-auto w-full">
      <h3 className="text-lg text-gray-300 mb-4">Upcoming Tasks</h3>

      <div className="space-y-4">
        {/* Task 1 */}
        <div className="flex justify-between items-center border border-white/10 rounded-xl p-4 bg-[#0b0f0f]">
          <span className="text-gray-200">Review Q2 Budget Report</span>

          <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">
            Due 3PM Today
          </span>
        </div>

        {/* Task 2 */}
        <div className="flex justify-between items-center border border-emerald-400/30 rounded-xl p-4 bg-emerald-900/20">
          <div className="flex items-center gap-3">
            <span className="text-gray-200">Buy organic coffee beans</span>

            <span className="text-xs bg-emerald-700 px-2 py-1 rounded-full">
              SHOPPING
            </span>
          </div>

          <span className="text-xs text-gray-400">March 15</span>
        </div>
      </div>
    </div>
  );
}
