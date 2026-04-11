// FIXED : No popping messages + All white text
window.DEMO_CACHE = {
  'shopify.com': {
    target: 'SHOPIFY.COM',
    company: 'SHOPIFY INC.',
    overall_score: 68,
    categories: {
      tech_stack: { score: 45, findings: ['REACT 18.X + NEXT.JS 14', 'GRAPHQL API PUBLIC'] },
      people_exposure: { score: 82, findings: ['5.2K EMPLOYES LINKEDIN', 'EMAILS DEV@SHOPIFY.COM'] },
      code_credentials: { score: 91, findings: ['AWS KEYS GITHUB', 'SENTRY DSN PUBLIC'] },
      domains_infra: { score: 55, findings: ['127 SUBDOMAINES', 'CERTIFICATS WILDCARD'] },
      data_leaks: { score: 72, findings: ['PASTEBIN DB DUMP', 'HUNTER.IO 12K EMAILS'] }
    },
    attack_scenarios: [
      { title: 'AWS TOKEN IN PUBLIC REPO', mitre_technique: 'TA0003', likelihood: 'HIGH', description: 'IAM KEY WITH S3 ACCESS FOUND IN GITHUB REPO' },
      { title: 'GRAPHQL INTROSPECTION', mitre_technique: 'TA0001', likelihood: 'MEDIUM', description: 'FULL GRAPHQL SCHEMA EXPOSED NO AUTH REQUIRED' }
    ],
    mitigations: [
      { priority: 'CRITICAL', finding: 'AWS ACCESS KEY', action: 'REVOKE IMMEDIATELY + IAM KEY ROTATION' },
      { priority: 'HIGH', finding: 'GRAPHQL EXPOSED', action: 'DISABLE INTROSPECTION + RATE LIMITING' }
    ]
  }
  // ... autres démos
};

// ── Loading FIXED (Just scanner, no text) ─────────────────────────
let interval;
function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('resultsSection').classList.add('hidden');
  
  // ✅ NO TEXT POP - Just eye scanner 17s
  setTimeout(() => hideLoadingAndShowDemo(), 17000);
}

function hideLoadingAndShowDemo() {
  document.getElementById('loading').classList.add('hidden');
  
  const target = document.getElementById('targetInput').value.toLowerCase().trim();
  const demoData = window.DEMO_CACHE[target] || window.DEMO_CACHE['shopify.com'];
  displayResults(demoData);
}

// ── Score Ring (Blanc) ────────────────────────────────────────────
function renderScoreCard(data) {
  const c = getRiskColor(data.overall_score);
  const dashLength = (data.overall_score / 100) * 565;
  
  document.getElementById('scoreCard').innerHTML = `
    <div class="glass rounded-3xl p-16 shadow-3xl text-center backdrop-blur-xl border-emerald-500/30 max-w-5xl mx-auto">
      <svg width="320" height="320" viewBox="0 0 320 320" class="mx-auto mb-12 drop-shadow-2xl">
        <circle cx="160" cy="160" r="120" fill="${c.bg}" stroke="#111" stroke-width="16" opacity="0.9"/>
        <circle cx="160" cy="160" r="120" fill="none" stroke="${c.stroke}"
          stroke-width="20" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="${dashLength} 754" transform="rotate(-90 160 160)"
          class="transition-all duration-2000 ease-out drop-shadow-2xl"/>
        <text x="160" y="170" text-anchor="middle" font-size="72" font-weight="900" fill="${c.stroke}">68</text>
      </svg>
      <div class="space-y-6">
        <div class="text-5xl font-black text-white tracking-widest mono drop-shadow-2xl">${c.label}</div>
        <div class="text-3xl font-bold text-white bg-black/60 backdrop-blur-xl px-12 py-6 rounded-3xl inline-block shadow-2xl border border-emerald-500/50 mono tracking-widest">
          ${data.company}
        </div>
      </div>
    </div>`;
}

// ── Categories (Blanc) ───────────────────────────────────────────
function renderCategories(cats) {
  const html = Object.entries(cats).map(([key, val]) => {
    const c = getRiskColor(val.score);
    const top2 = val.findings.slice(0,2).map(f => 
      `<li class="text-lg text-white/90 flex items-center py-2 mono tracking-wide">
        <i class="fas fa-${c.label.includes('Low') ? 'check-circle text-emerald-500' : 'exclamation-triangle text-red-500'} mr-4 w-5 text-xl"></i>
        ${f}
      </li>`
    ).join('');

    return `
      <div class="card-hover glass rounded-3xl p-10 shadow-2xl border-emerald-500/20">
        <div class="flex items-center justify-between mb-8 pb-6 border-b border-emerald-500/20">
          <div class="font-black text-2xl text-white tracking-wider mono">${CAT_LABELS[key]}</div>
          <div class="text-3xl font-black text-emerald-400">${val.score}</div>
        </div>
        <div class="w-full bg-black/50 rounded-full h-4 mb-8 overflow-hidden backdrop-blur-sm border border-emerald-500/30">
          <div class="h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full w-[${val.score}%] shadow-emerald-500/50 transition-all duration-1500 origin-left"></div>
        </div>
        <ul class="space-y-3">${top2}</ul>
      </div>`;
  }).join('');
  
  document.getElementById('categories').innerHTML = html;
}

// ── Scenarios (Blanc) ────────────────────────────────────────────
function renderScenarios(scenarios) {
  const html = scenarios.map(s => `
    <div class="glass rounded-3xl p-12 shadow-2xl border-l-8 border-emerald-500 card-hover">
      <div class="flex flex-wrap items-start gap-6 mb-8">
        <div class="font-black text-3xl text-white flex-1 tracking-wider mono">${s.title}</div>
        <span class="mono bg-emerald-500/90 text-black px-6 py-3 rounded-2xl text-xl font-bold flex-shrink-0 shadow-lg">
          ${s.mitre_technique}
        </span>
        <span class="px-6 py-3 bg-emerald-500 text-black text-xl font-black rounded-2xl flex-shrink-0 shadow-lg">
          ${s.likelihood}
        </span>
      </div>
      <p class="text-xl text-white/90 leading-relaxed mono tracking-wide">${s.description}</p>
    </div>
  `).join('');
  
  document.getElementById('scenarios').innerHTML = html;
}

// ── Mitigations (Blanc) ──────────────────────────────────────────
function renderMitigations(mitigations) {
  const sorted = [...mitigations].sort((a, b) => {
    const order = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return (order[a.priority] || 4) - (order[b.priority] || 4);
  });

  const html = sorted.map(m => `
    <div class="glass rounded-3xl p-12 shadow-2xl card-hover flex gap-8 items-start border-emerald-500/30">
      <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-2xl ring-4 ring-emerald-500/40">
        ${m.priority?.charAt(0) || 'M'}
      </div>
      <div class="flex-1">
        <div class="font-black text-3xl text-white mb-4 tracking-wider mono">${m.finding}</div>
        <div class="text-xl text-white/90 leading-relaxed mono tracking-wide">${m.action}</div>
      </div>
    </div>
  `).join('');
  
  document.getElementById('mitigations').innerHTML = html;
}

// ── Autres fonctions inchangées (getRiskColor, etc.) ...
function analyzeTarget() {
  const target = document.getElementById('targetInput').value.trim();
  if (!target) return;
  showLoading();
}

function displayResults(data) {
  document.getElementById('resultsSection').classList.remove('hidden');
  setTimeout(() => renderScoreCard(data), 300);
  setTimeout(() => renderCategories(data.categories), 800);
  setTimeout(() => renderScenarios(data.attack_scenarios || []), 1300);
  setTimeout(() => renderMitigations(data.mitigations || []), 1800);
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}