// 10-Second Cinematic Medallion Refinery Intro Module
// Ritwik Ala — Data Engineer & Cloud Lakehouse Architect

const SEEN_KEY = 'ritwikIntroSeen';
let running = false;
let animFrameId = null;

export function playIntro() {
  if (running) return;
  running = true;

  const root = document.documentElement;
  const overlay = document.getElementById('intro-overlay');
  const canvas = document.getElementById('refinery-canvas');
  if (!overlay || !canvas) {
    running = false;
    return;
  }

  const ctx = canvas.getContext('2d');
  const skipBtn = document.getElementById('skipIntro');
  const stagePill = document.getElementById('stage-pill');
  const gantryHeader = document.getElementById('gantry-header');
  const formatLabel = document.getElementById('format-label');
  const laserScan = document.getElementById('laser-scan');
  const recordsVal = document.getElementById('records-val');
  const compressionVal = document.getElementById('compression-val');
  const compressionBar = document.getElementById('compression-bar');
  const terminalLines = document.getElementById('terminal-lines');

  overlay.style.display = 'flex';
  overlay.classList.remove('launch-exit');
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';

  // Reset lights
  const lightIds = ['l1-a','l1-b','l2-a','l2-b','l3-a','l3-b','l4-a','l4-b'];
  lightIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.className = 'w-5 h-5 rounded-full border-2 border-zinc-700 bg-zinc-950 gate-light';
  });

  if (gantryHeader) {
    gantryHeader.textContent = 'MEDALLION REFINERY GANTRY · CLUSTER SYNCHRONIZATION';
    gantryHeader.className = 'mono text-[10px] tracking-[0.28em] text-zinc-400 uppercase';
  }
  if (stagePill) {
    stagePill.textContent = 'STAGE 01 · INGESTING 560K+ UNSTRUCTURED RAW PAYLOADS';
    stagePill.className = 'inline-flex items-center gap-2 mono text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 mb-4 shadow-lg';
  }
  if (formatLabel) formatLabel.textContent = 'RAW CSV / JSON';
  if (terminalLines) {
    terminalLines.innerHTML = '<div class="text-orange-400">&gt; boto3.s3.ingest("s3://raw-bronze/transactions/*")</div>';
  }

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  const onResize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  let mouseX = 0, mouseY = 0, boost = 1;
  const onMouseMove = (e) => {
    mouseX = (e.clientX / w - 0.5) * 140;
    mouseY = (e.clientY / h - 0.5) * 90;
  };
  const onMouseDown = () => { boost = 2.2; };
  const onMouseUp = () => { boost = 1; };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);

  const rawTokens = ['{null}', 'NaN', '0x4F', 'raw_csv', 'err:500', 'dup_id', '{"ts":0}'];
  const particles = Array.from({ length: 240 }, (_, i) => ({
    x: (Math.random() - 0.5) * 1800,
    y: (Math.random() - 0.5) * 1100,
    z: Math.random() * 1200 + 40,
    size: Math.random() * 6 + 4,
    laneX: ((i % 6) - 2.5) * 210,
    laneY: ((Math.floor(i / 6) % 4) - 1.5) * 140,
    token: rawTokens[i % rawTokens.length],
    isCorrupt: i % 5 === 0
  }));

  const gates = Array.from({ length: 6 }, (_, i) => ({ z: (i + 1) * 200 }));

  let phase = 0;
  let baseSpeed = 7;
  let records = 0;
  let compression = 0;
  let finished = false;

  function addLog(text, colorClass = 'text-zinc-300') {
    if (!terminalLines) return;
    const line = document.createElement('div');
    line.className = colorClass;
    line.textContent = text;
    terminalLines.appendChild(line);
    if (terminalLines.children.length > 3) terminalLines.removeChild(terminalLines.firstChild);
  }

  const timers = [];
  const later = (fn, ms) => {
    timers.push(setTimeout(fn, ms));
  };

  // 0.25s: Stage 1 (Bronze Ingest)
  later(() => {
    const l1a = document.getElementById('l1-a');
    const l1b = document.getElementById('l1-b');
    if (l1a) l1a.classList.add('on-bronze');
    if (l1b) l1b.classList.add('on-bronze');
    addLog('> boto3.s3.ingest(560000, tier="BRONZE")', 'text-orange-400');
  }, 250);

  // 3.0s: Stage 2 (Silver Laser Schema Validation & Deduplication)
  later(() => {
    phase = 1;
    baseSpeed = 16;
    const l2a = document.getElementById('l2-a');
    const l2b = document.getElementById('l2-b');
    if (l2a) l2a.classList.add('on-silver');
    if (l2b) l2b.classList.add('on-silver');
    if (stagePill) {
      stagePill.textContent = 'STAGE 02 · PYSPARK SCHEMA ENFORCEMENT & DEDUPLICATION';
      stagePill.className = 'inline-flex items-center gap-2 mono text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-zinc-200/10 border border-zinc-300/40 text-zinc-200 mb-4';
    }
    if (formatLabel) formatLabel.textContent = 'CLEANSED SPARK DATAFRAME';
    addLog('> spark.dropDuplicates().filter("corrupt IS NULL")', 'text-cyan-300');

    if (laserScan) {
      laserScan.style.opacity = '1';
      laserScan.animate([{ top: '10%' }, { top: '90%' }, { top: '10%' }], { duration: 1800, easing: 'ease-in-out' });
      later(() => { if (laserScan) laserScan.style.opacity = '0'; }, 1800);
    }
  }, 3000);

  // 6.0s: Stage 3 (Gold Parquet 79% Compression)
  later(() => {
    phase = 2;
    baseSpeed = 28;
    const l3a = document.getElementById('l3-a');
    const l3b = document.getElementById('l3-b');
    if (l3a) l3a.classList.add('on-gold');
    if (l3b) l3b.classList.add('on-gold');
    overlay.classList.add('rumble');
    if (stagePill) {
      stagePill.textContent = 'STAGE 03 · GOLD MEDALLION PARQUET COMPRESSION (79% SAVED)';
      stagePill.className = 'inline-flex items-center gap-2 mono text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 mb-4';
    }
    if (formatLabel) formatLabel.textContent = 'SNAPPY PARQUET (GOLD TIER)';
    addLog('> df.write.parquet("s3://gold-lake/", compression="snappy")', 'text-amber-400');
  }, 6000);

  // 8.5s: Stage 4 (ALL GREEN LIGHTS OUT · ATHENA SERVE LAUNCH!)
  later(() => {
    phase = 3;
    baseSpeed = 75;
    overlay.classList.remove('rumble');
    lightIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.className = 'w-5 h-5 rounded-full border-2 gate-light on-serve';
    });
    if (gantryHeader) {
      gantryHeader.textContent = 'LIGHTS OUT · PIPELINE LIVE ON AMAZON ATHENA & STREAMLIT!';
      gantryHeader.className = 'mono text-[10px] tracking-[0.28em] text-emerald-400 uppercase font-semibold';
    }
    if (stagePill) {
      stagePill.textContent = 'STAGE 04 · ZERO-LATENCY LAKEHOUSE LIVE';
      stagePill.className = 'inline-flex items-center gap-2 mono text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 mb-4';
    }
    addLog('> STATUS: 560,000+ RECORDS SERVED · 79% COMPRESSED', 'text-emerald-400');
  }, 8500);

  function finish() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    if (skipBtn) skipBtn.removeEventListener('click', finish);

    if (animFrameId) cancelAnimationFrame(animFrameId);

    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) {}

    overlay.classList.remove('rumble');
    overlay.classList.add('launch-exit');
    root.classList.remove('intro-on');
    document.body.classList.add('arrive');

    setTimeout(() => {
      overlay.style.display = 'none';
      running = false;
    }, 750);
  }

  function onKey(e) {
    if (e.key === 'Escape') finish();
  }
  window.addEventListener('keydown', onKey);
  if (skipBtn) skipBtn.addEventListener('click', finish);

  // 10.0s: Open Blast Doors into Portfolio exactly at 10s
  later(finish, 10000);

  function drawOctagon(cx, cy, radius, color, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 + Math.PI / 8;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawGoldCube(x, y, s, isServe) {
    ctx.fillStyle = isServe ? '#34d399' : '#facc15';
    ctx.strokeStyle = isServe ? '#059669' : '#b45309';
    ctx.lineWidth = 1;
    ctx.fillRect(x - s / 2, y - s / 2, s, s);
    ctx.strokeRect(x - s / 2, y - s / 2, s, s);
    ctx.fillStyle = isServe ? '#a7f3d0' : '#fef08a';
    ctx.beginPath();
    ctx.moveTo(x - s / 2, y - s / 2);
    ctx.lineTo(x - s / 4, y - s * 0.8);
    ctx.lineTo(x + s * 0.75, y - s * 0.8);
    ctx.lineTo(x + s / 2, y - s / 2);
    ctx.closePath();
    ctx.fill();
  }

  function render() {
    if (finished) return;
    const speed = baseSpeed * boost;
    ctx.fillStyle = phase >= 2 ? 'rgba(7, 7, 9, 0.22)' : 'rgba(7, 7, 9, 0.42)';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2 + mouseX;
    const cy = h / 2 + mouseY;

    // 1. Draw 3D Octagonal Refinery Gantry Rings flying past camera
    gates.forEach((g) => {
      g.z -= speed * 0.85;
      if (g.z <= 15) g.z = 1200;
      const scale = 450 / g.z;
      const r = 320 * scale;
      const alpha = Math.min(0.65, (1200 - g.z) / 1000);
      const gateColor =
        phase === 0 ? `rgba(234,88,12,${alpha * 0.5})`
        : phase === 1 ? `rgba(228,228,231,${alpha * 0.6})`
        : phase === 2 ? `rgba(250,204,21,${alpha * 0.8})`
        : `rgba(52,211,153,${alpha})`;
      drawOctagon(cx, cy, r, gateColor, Math.max(1, 2.5 * scale));
    });

    // 2. Update & Draw 3D Data Stream Particles
    particles.forEach((p) => {
      p.z -= speed;
      if (p.z <= 12) {
        p.z = 1200;
        if (phase === 0) {
          p.x = (Math.random() - 0.5) * 1800;
          p.y = (Math.random() - 0.5) * 1100;
        }
      }

      if (phase >= 1 && p.isCorrupt) return;

      if (phase >= 1) {
        p.x += (p.laneX - p.x) * 0.1;
        p.y += (p.laneY - p.y) * 0.1;
      }

      const scale = 450 / p.z;
      const sx = cx + p.x * scale;
      const sy = cy + p.y * scale;
      const sSize = p.size * scale;

      if (phase === 0) {
        ctx.fillStyle = p.isCorrupt ? '#ef4444' : '#f97316';
        if (p.z < 550 && sSize > 6) {
          ctx.font = `${Math.min(14, Math.floor(sSize * 1.4))}px "JetBrains Mono"`;
          ctx.fillText(p.token, sx, sy);
        } else {
          ctx.fillRect(sx, sy, sSize, sSize);
        }
      } else if (phase === 1) {
        const prevScale = 450 / (p.z + speed * 1.4);
        ctx.strokeStyle = '#e4e4e7';
        ctx.lineWidth = Math.max(1.5, sSize * 0.55);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(cx + p.x * prevScale, cy + p.y * prevScale);
        ctx.stroke();
      } else {
        const prevScale = 450 / (p.z + speed * 2.1);
        ctx.strokeStyle = phase === 3 ? 'rgba(52, 211, 153, 0.55)' : 'rgba(250, 204, 21, 0.55)';
        ctx.lineWidth = Math.max(1.5, sSize * 0.5);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(cx + p.x * prevScale, cy + p.y * prevScale);
        ctx.stroke();

        drawGoldCube(sx, sy, Math.max(4, sSize * 1.35), phase === 3);
      }
    });

    // 3. Update Telemetry Numbers
    if (records < 560000) {
      records = Math.min(560000, records + Math.floor(speed * 390));
      if (recordsVal) recordsVal.textContent = records.toLocaleString() + (records === 560000 ? '+' : '');
    }
    const targetComp = phase === 0 ? 12 : phase === 1 ? 45 : 79;
    compression += (targetComp - compression) * 0.08;
    if (compressionVal) compressionVal.textContent = Math.round(compression) + '%';
    if (compressionBar) compressionBar.style.width = Math.round(compression) + '%';

    animFrameId = requestAnimationFrame(render);
  }

  animFrameId = requestAnimationFrame(render);
}
