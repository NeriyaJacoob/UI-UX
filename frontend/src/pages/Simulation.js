import { useNavigate } from "react-router-dom";

export default function Simulations() {
  const navigate = useNavigate();

  const simulations = [
    { icon: "🛡️", label: "הצפנה", path: "/simulation/encrypt" },
    { icon: "💣", label: "כופר", path: "/simulation/ransom" },
    { icon: "🧬", label: "הדבקה", path: "/simulation/infection" }
  ];

return (
  <div className="relative min-h-screen bg-purple-900 text-white flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
    {/* שכבת רקע טקסטורה */}
<div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10 z-0"></div>

    {/* תוכן קדמי */}
    <div className="relative z-10 text-center">
      <h1 className="text-4xl font-bold mb-10 tracking-wide">🔬 עמוד הסימולציות</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {simulations.map((sim, i) => (
          <button
            key={i}
            onClick={() => navigate(sim.path)}
            className="bg-purple-700 hover:bg-purple-600 text-white font-semibold text-xl rounded-full px-10 py-6 shadow-lg transition duration-200 transform hover:scale-105"
          >
            {sim.icon} {sim.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

}
