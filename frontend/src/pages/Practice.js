// עמוד תרגול מעשי - React עם ממשק מותאם אישית (רשימת משימות וחלונית הסבר)
import { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:5000";

const TASKS = [
  {
    id: 'infection',
    label: '🧬 חסימת הדבקה',
    description:
      'הווירוס מזריק קוד לקבצי Python או Bash בתיקיית המטרה. מטרתך לזהות תהליך שמנסה להפעיל trigger_ransom.py מתוך קובץ אחר ולהגיב בהתאם.',
    tools: [
      'הקובץ trigger_ransom.py ממוקם ב־/tmp/data',
      'האנטי וירוס שלך רץ ברקע כל הזמן',
      'זיהוי מוצלח כותב BLOCKED לקובץ /tmp/block_ransom'
    ]
  },
  {
    id: 'encrypt',
    label: '🔐 מניעת הצפנה',
    description:
      'הכופרה מצפינה את תחילת הקובץ (10KB) עם מפתח AES. מטרתך למנוע את פעולת ההצפנה לפני שמתרחש שינוי בפועל לקובץ.',
    tools: [
      'הצפנה מתבצעת גם היא על קבצים ב־/tmp/data',
      'אם זיהית ניסיון הצפנה – עצור את התהליך וכתוב קובץ חסימה'
    ]
  },
  {
    id: 'decrypt',
    label: '🗝️ פענוח קבצים',
    description:
      'יש קבצים שהוצפנו מראש. המשימה שלך היא לזהות אותם לפי חתימה ("BME1") ולבצע את תהליך הפענוח בעזרת מפתח ידוע מראש.',
    tools: [
      'הקבצים המוצפנים מתחילים במחרוזת BME1',
      'השתמש במפתח שסופק כדי לפענח ולהחזיר את הקובץ המקורי'
    ]
  }
];

export default function PracticeExercise() {
  const [studentCode, setStudentCode] = useState('');
  const [output, setOutput] = useState('');
  const [showToolbox, setShowToolbox] = useState(false);
  const [detected, setDetected] = useState(null);
  const [blocked, setBlocked] = useState(null);
  const [currentTask, setCurrentTask] = useState('infection');

  const currentTaskData = TASKS.find(task => task.id === currentTask);

  const submitCode = async () => {
    try {
      await axios.post(`${API_BASE}/save-antivirus`, { code: studentCode });
      const res = await axios.post(`${API_BASE}/simulate`, { task: currentTask });
      setOutput(res.data.stdout || res.data.stderr || '');
      setDetected(res.data.detected);
      setBlocked(res.data.blocked);
    } catch {
      setOutput('❌ שגיאה בהרצה');
      setDetected(null);
      setBlocked(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🔒 תרגול משימות אנטי וירוס</h1>
        <button
          onClick={() => setShowToolbox(!showToolbox)}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded shadow"
        >
          🧰 סביבת עבודה / כלים זמינים
        </button>
      </div>

      {/* בחירת משימה */}
      <div className="flex gap-4 flex-wrap">
        {TASKS.map(task => (
          <button
            key={task.id}
            onClick={() => {
              setCurrentTask(task.id);
              setOutput('');
              setDetected(null);
              setBlocked(null);
            }}
            className={`px-4 py-2 rounded shadow text-white ${currentTask === task.id ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            {task.label}
          </button>
        ))}
      </div>

      {/* תיאור המשימה הנבחרת */}
      <div className="bg-slate-800 rounded p-4 text-sm">
        <p><span className="font-bold">🧠 משימה:</span> {currentTaskData.description}</p>
      </div>

      {showToolbox && (
        <div className="bg-slate-800 rounded p-4 text-sm space-y-2">
          <p className="font-bold">🧰 ארגז כלים</p>
          <ul className="list-disc pr-5 space-y-1">
            {currentTaskData.tools.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
          <p>
            🧪 ניתן להשתמש ב־<code>os</code>, <code>subprocess</code>,
            <code>open</code>, <code>remove</code>, <code>chmod</code>
          </p>
        </div>
      )}

      <textarea
          value={studentCode}
          onChange={e => setStudentCode(e.target.value)}
          className="w-full bg-black text-green-400 font-mono p-4 rounded border border-slate-700"
          rows={12}
          placeholder="כתוב כאן את קוד האנטי וירוס שלך"
          dir="ltr"
        />


      <button
        onClick={submitCode}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg shadow"
      >
        ▶️ הרץ אנטי וירוס
      </button>

      {output && (
        <div className="bg-slate-900 rounded p-4 space-y-3">
          <h2 className="text-lg font-semibold">📄 תוצאת הסימולציה:</h2>
          <pre className="bg-black p-4 rounded overflow-auto max-h-60 text-green-300 text-sm whitespace-pre-wrap">
            {output}
          </pre>
          {detected !== null && (
            <div className="space-y-1 text-xl">
              <p>{detected ? '✅ זיהוי הצליח' : '❌ זיהוי נכשל'}</p>
              {detected && (
                <p>{blocked ? '🔒 חסימה הצליחה' : '🔓 חסימה נכשלה'}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}