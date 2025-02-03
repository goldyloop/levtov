import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // עדכון ל-useNavigate

const IdleTimer = () => {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const navigate = useNavigate(); // עדכון ל-useNavigate

  // פונקציה שתבצע את ההפניה לדף הבית
  const redirectToHome = () => {
    navigate('/'); // הפנייה לדף הבית
  };

  // הפונקציה לעדכון הזמן של פעילות המשתמש
  const resetIdleTimer = () => {
    setLastActivityTime(Date.now());
  };

  useEffect(() => {
    // בודק אם עברו 2 דקות מאז הפעילות האחרונה
    const checkIdleTimeout = setInterval(() => {
      const idleTime = Date.now() - lastActivityTime;
      if (idleTime > 120000) { // 2 דקות
        redirectToHome();
      }
    }, 1000); // בודק כל שניה

    // להפסיק את הבדיקה כשמשתמש יוצא מהרכיב
    return () => clearInterval(checkIdleTimeout);
  }, [lastActivityTime]);

  useEffect(() => {
    // מאזינים לפעולות משתמש (הקלדה, הזזת עכבר, גלילה וכו')
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    // מנקים את המאזינים כשיש סיום של הרכיב
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, []);

  return null; // לא מציגים שום דבר ב-UI
};

export default IdleTimer;
