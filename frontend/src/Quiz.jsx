import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "מה הסיכון בשמירת מפתח הצפנה בקוד?",
      options: [
        "אין בעיה אם הקובץ מוסתר",
        "תוקף יכול לחשוף אותו בקלות",
        "המפתח מוצפן עם הקוד",
        "זה משפר ביצועים"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "כיצד ניתן לחסום הדמיית כופר בלומדה זו?",
      options: [
        "למחוק את תמונת ההאקר",
        "לערוך את הקוד",
        "ליצור קובץ בשם block_ransom",
        "לכבות את המחשב"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "מהי המשמעות של חתימה BME1 בתחילת קובץ?",
      options: [
        "שם קובץ מוצפן",
        "גרסה של התוכנה",
        "סימן לקובץ שהוצפן על ידי הכופר",
        "סוג של מערכת הפעלה"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "מהי מטרת דרישת הכופר הגרפית שמוצגת בסיום הסימולציה?",
      options: [
        "לשדר למשתמש שההצפנה הצליחה",
        "לגרום לפאניקה אמיתית אצל הקורבן",
        "לאפשר תשלום ישיר בביטקוין",
        "זה מסך חסימה של מערכת ההפעלה"
      ],
      correct: 0
    },
    {
      id: 5,
      question: "מה קורה אם קובץ block_ransom קיים במערכת בעת ניסיון הפעלה של הכופר?",
      options: [
        "הקבצים יוצפנו בכל מקרה",
        "המשתמש יקבל הודעה על שגיאה",
        "הכופר לא ירוץ כלל",
        "הכופר ינסה לעקוף את החסימה"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "מדוע חשוב לוודא ש־__init__.py קיים בתיקיות הקוד?",
      options: [
        "כדי לוודא שהתיקייה תוצפן",
        "כדי שהתיקייה תזוהה כ־package בפייתון",
        "כדי שהכופר יוכל למחוק קבצים",
        "אין צורך בקובץ הזה בלומדה"
      ],
      correct: 1
    },
    {
      id: 7,
      question: "מה היתרון של פיצול הצפנה לחלק מהקובץ בלבד (CHUNK_SIZE) כמו בקוד?",
      options: [
        "שומר על ביצועים ומדמה כופר אמיתי",
        "מאפשר שחזור קובץ חלקי",
        "חוסך שימוש ב־RSA",
        "זה באג, לא יתרון"
      ],
      correct: 0
    }
  ];

  const handleSelect = (qid, index) => {
    setAnswers({ ...answers, [qid]: index });
  };

  const score = questions.filter(q => answers[q.id] === q.correct).length;

  return (
    <div className="section text-right">
      <h2 className="mb-4">🧠 מבדק קצר</h2>
      {questions.map(q => (
        <div key={q.id} className="mb-6">
          <p className="mb-2 font-bold">{q.question}</p>
          {q.options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(q.id, idx)}
              className={`quiz-option ${answers[q.id] === idx ? 'selected' : ''}`}
            >
              - {opt}
            </div>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button className="btn" onClick={() => setSubmitted(true)}>📊 סיים ובדוק</button>
      ) : (
        <div>
          <p className="mt-4">✅ {score} מתוך {questions.length} תשובות נכונות</p>
          <button className="btn mt-2" onClick={() => navigate("/")}>⬅️ חזרה לתפריט</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
