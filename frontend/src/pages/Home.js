import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center text-white space-y-10 mt-20 px-4">
      <h2 className="text-5xl font-extrabold text-red-500 tracking-tight">
        ברוכים הבאים ללומדת ByteMe
      </h2>

      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        הלומדה תאפשר לך להבין כיצד תוכנת כופר פועלת – משלב החדירה ועד להצפנת הקבצים.
        תעבור בין תיאוריה, סימולציות, תרגול מעשי, כלים וסיכום – באמצעות הכפתורים בתפריט העליון.
      </p>
    </div>
  );
}

