export const calculateScore = (user, creator) => {
  let score = 0;

  // 1. Smoking (20)
  if (user.smoking === creator.smoking) score += 20;

  // 2. Drinking (15)
  if (user.drinking === creator.drinking) score += 15;

  // 3. Sleep Time (20)
  const getHour = (t) => (t ? parseInt(t.split(":")[0]) : 0);
  const sleepDiff = Math.abs(
    getHour(user.sleepTime) - getHour(creator.sleepTime),
  );

  if (sleepDiff <= 1) score += 20;
  else if (sleepDiff <= 2) score += 15;
  else if (sleepDiff <= 4) score += 5;

  // 4. Wake Time (10)
  const wakeDiff = Math.abs(getHour(user.wakeTime) - getHour(creator.wakeTime));

  if (wakeDiff <= 1) score += 10;
  else if (wakeDiff <= 2) score += 7;

  // 5. Food Preference (15)
  if (user.foodPreference === creator.foodPreference) score += 15;

  // 6. Cleanliness (15)
  const map = {
    Messy: 1,
    Average: 2,
    "Very Clean": 3,
  };

  const diff = Math.abs(
    (map[user.cleanlinessLevel] || 0) - (map[creator.cleanlinessLevel] || 0),
  );

  if (diff === 0) score += 15;
  else if (diff === 1) score += 8;

  // 7. Personality (5)
  if (user.personality === creator.personality) score += 5;

  return Math.min(100, score);
};
