// 2GO Travel Email Automation Engine Simulator
// Simulates marketing automation flows (welcome, lead recovery, cart abandonment) and logs dispatches to localStorage.

export function logEmailDispatch(email, triggerName, subject, details = {}) {
  if (typeof window === 'undefined') return;

  const logs = JSON.parse(localStorage.getItem('email_automation_logs') || '[]');
  
  const newDispatch = {
    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
    email,
    trigger: triggerName,
    subject,
    timestamp: new Date().toISOString(),
    ...details
  };

  logs.push(newDispatch);
  
  // Cap logs at 50 to avoid bloating localStorage
  if (logs.length > 50) {
    logs.shift();
  }

  localStorage.setItem('email_automation_logs', JSON.stringify(logs));

  if (process.env.NODE_ENV === 'development') {
    console.log(`%c[Email Sent] To: ${email} | Trigger: ${triggerName} | Subject: ${subject}`, 'color: #0D9488; font-weight: bold;', details);
  }
}

export function triggerWelcomeEmail(email, name = 'Viajante') {
  logEmailDispatch(
    email,
    'welcome',
    'Bem-vindo à 2GO Travel! ✈️ Seu planejamento inteligente começa aqui.',
    { name }
  );
}

export function triggerLeadRecovery(email, documentName) {
  logEmailDispatch(
    email,
    'lead_recovery',
    `Seu download está pronto: ${documentName} 📋`,
    { documentName }
  );
}

export function triggerAbandonedItinerary(email, itinerarySlug) {
  logEmailDispatch(
    email,
    'abandoned_itinerary',
    'Falta pouco! Conclua o desbloqueio do seu roteiro 🗺️',
    { itinerarySlug }
  );
}

export function triggerPremiumUpgrade(email, planName) {
  logEmailDispatch(
    email,
    'premium_upgrade',
    `Upgrade de Consultoria Confirmado: Plano ${planName} 💎`,
    { planName }
  );
}

export function getEmailAutomationLogs() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('email_automation_logs') || '[]');
}

export function clearEmailLogs() {
  if (typeof window === 'undefined') return;
  localStorage.setItem('email_automation_logs', '[]');
}
