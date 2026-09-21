import { APPLY_STEPS } from "../../data/careerConstants";

export default function StepBar({ current }) {
  return (
    <div className="flex items-center mb-10">
      {APPLY_STEPS.map((step, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div
            key={step}
            className={`flex items-center ${i < APPLY_STEPS.length - 1 ? "flex-1" : ""}`}
          >
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  done
                    ? "bg-[#6366F1] text-white"
                    : active
                    ? "bg-white text-[#0A0A0F]"
                    : "bg-white/8 text-gray-600"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              {/* Label */}
              <div
                className={`text-xs font-semibold mt-1.5 whitespace-nowrap transition-colors ${
                  active ? "text-white" : done ? "text-[#6366F1]" : "text-gray-600"
                }`}
              >
                {step}
              </div>
            </div>

            {/* Connector line */}
            {i < APPLY_STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 mb-5 transition-colors ${
                  done ? "bg-[#6366F1]" : "bg-white/8"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
