function collapseDuplicateThemes(themeList, setsList) {
  if (!Array.isArray(themeList)) return themeList || [];

  // defensive: ensure setsList is array
  setsList = Array.isArray(setsList) ? setsList : [];

  // 1) Count sets per theme_id (use string keys)
  const countByTheme = {};
  setsList.forEach(s => {
    const tid = String(s.theme_id === undefined || s.theme_id === null ? "" : s.theme_id).trim();
    if (!tid) return;
    countByTheme[tid] = (countByTheme[tid] || 0) + 1;
  });

  // 2) Group themes by normalized name
  const groups = {}; // nameNorm -> [theme, ...]
  themeList.forEach(t => {
    const name = (t && t.name) ? String(t.name).trim().toLowerCase() : "";
    if (!groups[name]) groups[name] = [];
    groups[name].push(t);
  });

  // 3) For each name group, pick the theme with highest set count (tie-break by numeric id)
  const result = [];
  Object.keys(groups).forEach(nameNorm => {
    const group = groups[nameNorm];

    if (group.length === 1) {
      result.push(group[0]);
      return;
    }

    let best = group[0];
    let bestCount = countByTheme[String(best.id)] || 0;
    for (let i = 1; i < group.length; i++) {
      const cand = group[i];
      const candCount = countByTheme[String(cand.id)] || 0;
      if (candCount > bestCount) {
        best = cand;
        bestCount = candCount;
      } else if (candCount === bestCount) {
        // tie-break: prefer larger numeric id (or lexicographically larger string)
        // convert to number if possible
        const a = Number(String(best.id));
        const b = Number(String(cand.id));
        if (!isNaN(a) && !isNaN(b)) {
          if (b > a) best = cand;
        } else {
          if (String(cand.id) > String(best.id)) best = cand;
        }
      }
    }

    result.push(best);
  });

  // Debug: if duplicate names existed, print a summary to console
  const originalCount = themeList.length;
  const finalCount = result.length;
  if (originalCount !== finalCount) {
    console.log(`[collapseDuplicateThemes] collapsed ${originalCount - finalCount} duplicates -> ${finalCount} themes`);
  } else {
    // you can comment this out if verbose
    console.log(`[collapseDuplicateThemes] no duplicates collapsed (${originalCount} themes)`);
  }

  return result;
}
