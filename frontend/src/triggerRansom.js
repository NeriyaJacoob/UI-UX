import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const triggerRansom  = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/test-ransom", {
      method: "POST"
    });
    const data = await res.json();
    alert(data.status || data.error);
  } catch {
    alert("❌ שגיאה בהרצת תוכנת הכופר");
  }
}; 