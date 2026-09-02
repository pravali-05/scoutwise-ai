export function analyzeJob(description: string) {
  const text = description.toLowerCase();

  let risk = 10;

  if (text.includes("registration fee")) risk += 25;
  if (text.includes("work from home")) risk += 15;
  if (text.includes("whatsapp")) risk += 20;

  return {
    risk_score: `${risk}%`,
    status: risk >= 60 ? "Fake" : "Genuine",
    company: risk >= 60 ? "Not Verified" : "Verified",
  };
}