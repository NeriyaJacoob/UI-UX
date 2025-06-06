import { useNavigate } from "react-router-dom";
import MatrixBackground from "../components/MatrixBackground";

export default function Simulations() {
  const navigate = useNavigate();

  const simulations = [
    { icon: "🛡️", label: "הצפנה", path: "/simulation/encrypt" },
    { icon: "💣", label: "כופר", path: "/simulation/ransom" },
    { icon: "🧬", label: "הדבקה", path: "/simulation/infection" }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen text-white">
          <MatrixBackground />


      {/* תוכן קדמי */}
      <div className="relative z-20 text-white flex flex-col items-center justify-center px-6 py-16 min-h-screen text-center">
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
