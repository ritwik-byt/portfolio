// Capabilities 3D Medallion Lakehouse Architecture
// Orbiting Three.js visualization that highlights the 4 systems of a production data platform
import * as THREE from 'three';

const VIEWS = {
  compute: { az: -1.2, el: 0.35, r: 8.5, t: [0, 1.2, 0] },
  storage: { az: 0.8, el: 0.45, r: 8.0, t: [0, -0.4, 0] },
  modeling: { az: 2.1, el: 0.55, r: 8.8, t: [0, 0.2, 0] },
  analytics: { az: -0.2, el: 0.25, r: 8.2, t: [0, 1.8, 0] }
};

const ANCHORS_3D = {
  compute: [0, 1.4, 0],
  storage: [0, -0.5, 0],
  modeling: [0.6, 0.3, 0.4],
  analytics: [0, 2.2, 0]
};

const lerp = (a, b, t) => a + (b - a) * t;

export function initLakehouse3D(setup) {
  const section = document.getElementById('capabilities');
  const stage = document.getElementById('xrStage');
  const canvas = document.getElementById('xrCanvas');
  const leader = document.getElementById('xrLeader');
  const pin = document.getElementById('xrPin');
  const pinRing = document.getElementById('xrPinRing');
  const cards = [...document.querySelectorAll('.xr-card')];
  const steps = [...document.querySelectorAll('#xrSteps li')];
  if (!section || !stage || !canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

  // 1. Grid Base (Lakehouse Foundation)
  const grid = new THREE.GridHelper(16, 32, 0x3f3f46, 0x18181b);
  grid.position.y = -2;
  grid.material.transparent = true;
  grid.material.opacity = 0.4;
  scene.add(grid);

  // 2. Medallion Tiers (3D Disks / Rings)
  // Layer 2: Storage (S3 Bronze/Silver/Gold Disks)
  const storageGroup = new THREE.Group();
  const diskGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.22, 48);
  const bronzeMat = new THREE.MeshBasicMaterial({ color: 0xea580c, wireframe: true, transparent: true, opacity: 0.5 });
  const silverMat = new THREE.MeshBasicMaterial({ color: 0xd4d4d8, wireframe: true, transparent: true, opacity: 0.6 });
  const goldMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, wireframe: true, transparent: true, opacity: 0.75 });

  const disk1 = new THREE.Mesh(diskGeo, bronzeMat);
  disk1.position.y = -1.2;
  const disk2 = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.22, 48), silverMat);
  disk2.position.y = -0.7;
  const disk3 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.22, 48), goldMat);
  disk3.position.y = -0.2;
  storageGroup.add(disk1, disk2, disk3);
  scene.add(storageGroup);

  // Layer 3: Data Modeling (Star Schema isometric crystal core)
  const modelingGroup = new THREE.Group();
  const cubeGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
  const cubeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.85 });
  const centralFact = new THREE.Mesh(cubeGeo, cubeMat);
  centralFact.position.y = 0.4;
  modelingGroup.add(centralFact);

  // 4 Satellite Dimension cubes
  const dimCubes = [];
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const dimMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.7 }));
    dimMesh.position.set(Math.cos(angle) * 1.5, 0.4, Math.sin(angle) * 1.5);
    modelingGroup.add(dimMesh);
    dimCubes.push(dimMesh);

    // Schema Connector line
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.4, 0), dimMesh.position]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x71717a, transparent: true, opacity: 0.5 });
    modelingGroup.add(new THREE.Line(lineGeo, lineMat));
  }
  scene.add(modelingGroup);

  // Layer 1: Compute (PySpark Distributed Torus Rings)
  const computeGroup = new THREE.Group();
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.04, 16, 80), new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.8 }));
  ring1.rotation.x = Math.PI / 2;
  ring1.position.y = 1.3;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.035, 16, 80), new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.8 }));
  ring2.rotation.x = Math.PI / 2.3;
  ring2.position.y = 1.4;
  computeGroup.add(ring1, ring2);
  scene.add(computeGroup);

  // Layer 4: Analytics / Serving (Emerald Query Beam & Streamlit Nodes)
  const analyticsGroup = new THREE.Group();
  const beamGeo = new THREE.CylinderGeometry(0.08, 0.6, 2.4, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.65 });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.position.y = 2.4;
  analyticsGroup.add(beam);

  // Orbiting query particles
  const particleCount = 80;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 3;
    pPos[i * 3 + 1] = Math.random() * 4 - 1.5;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.06, color: 0x34d399, transparent: true, opacity: 0.8 });
  const particles = new THREE.Points(pGeo, pMat);
  analyticsGroup.add(particles);
  scene.add(analyticsGroup);

  section.classList.add('ready');

  let activeIdx = 0;
  let targetAz = VIEWS.compute.az;
  let targetEl = VIEWS.compute.el;
  let targetR = VIEWS.compute.r;
  let targetT = new THREE.Vector3(...VIEWS.compute.t);

  let curAz = targetAz;
  let curEl = targetEl;
  let curR = targetR;
  let curT = targetT.clone();

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', resize);
  resize();

  function updateActiveCard(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;
    const part = setup[idx].part;
    const v = VIEWS[part] || VIEWS.compute;
    targetAz = v.az;
    targetEl = v.el;
    targetR = v.r;
    targetT.set(...v.t);

    cards.forEach((c, i) => c.classList.toggle('on', i === idx));
    steps.forEach((s, i) => s.classList.toggle('on', i === idx));

    // Highlight active layer
    computeGroup.visible = true;
    storageGroup.visible = true;
    modelingGroup.visible = true;
    analyticsGroup.visible = true;
  }

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const totalDist = section.offsetHeight - window.innerHeight;
    if (totalDist <= 0) return;
    const progress = Math.max(0, Math.min(1, -rect.top / totalDist));
    const step = Math.min(setup.length - 1, Math.floor(progress * setup.length));
    updateActiveCard(step);
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  function updateLeaderLine() {
    if (!leader || !pin) return;
    const part = setup[activeIdx].part;
    const anchorPos = new THREE.Vector3(...(ANCHORS_3D[part] || [0, 0, 0]));
    anchorPos.project(camera);

    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const sx = (anchorPos.x * 0.5 + 0.5) * w;
    const sy = (-anchorPos.y * 0.5 + 0.5) * h;

    pin.setAttribute('cx', sx.toFixed(1));
    pin.setAttribute('cy', sy.toFixed(1));
    if (pinRing) {
      pinRing.setAttribute('cx', sx.toFixed(1));
      pinRing.setAttribute('cy', sy.toFixed(1));
    }

    const card = cards[activeIdx];
    if (card) {
      const cr = card.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      const cardX = cr.left - sr.left + cr.width;
      const cardY = cr.top - sr.top + 60;
      leader.setAttribute('points', `${cardX},${cardY} ${(cardX + sx) / 2},${cardY} ${sx},${sy}`);
      stage.style.setProperty('--lead', '1');
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    // Continuous rotation of systems
    storageGroup.rotation.y += 0.003;
    modelingGroup.rotation.y -= 0.006;
    computeGroup.rotation.z += 0.008;
    ring2.rotation.y += 0.01;
    beam.rotation.y += 0.007;

    // Smooth camera lerp
    curAz = lerp(curAz, targetAz, 0.04);
    curEl = lerp(curEl, targetEl, 0.04);
    curR = lerp(curR, targetR, 0.04);
    curT.lerp(targetT, 0.04);

    camera.position.x = curT.x + curR * Math.cos(curEl) * Math.sin(curAz);
    camera.position.y = curT.y + curR * Math.sin(curEl);
    camera.position.z = curT.z + curR * Math.cos(curEl) * Math.cos(curAz);
    camera.lookAt(curT);

    renderer.render(scene, camera);
    updateLeaderLine();
  }
  animate();
}
