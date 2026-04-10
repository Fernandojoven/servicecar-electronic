import '../src/styles.css';
import { icons } from './icons.js';
import { renderPanel } from './pages/panel.js';
import { renderVehiculos, initVehiculos } from './pages/vehiculos.js';
import { renderHistorial, initHistorial } from './pages/historial.js';
import { renderMecanicos, initMecanicos } from './pages/mecanicos.js';
import { renderInventario, initInventario } from './pages/inventario.js';

// ===== TOAST SYSTEM =====
export function showToast(msg, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? icons.check : icons.alert} ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===== ROUTING =====
const pages = {
  panel: { label: 'Panel', icon: icons.panel, render: renderPanel, init: null },
  vehiculos: { label: 'Vehículos', icon: icons.vehiculo, render: renderVehiculos, init: initVehiculos },
  historial: { label: 'Historial', icon: icons.historial, render: renderHistorial, init: initHistorial },
  mecanicos: { label: 'Mecánicos', icon: icons.mecanico, render: renderMecanicos, init: initMecanicos },
  inventario: { label: 'Inventario', icon: icons.inventario, render: renderInventario, init: initInventario },
};

let currentPage = 'panel';

function navigate(page) {
  currentPage = page;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  // Update topbar title
  document.querySelector('.topbar-title').textContent = pages[page].label;

  // Render content
  const content = document.querySelector('.main-content');
  content.innerHTML = pages[page].render();

  // Initialize interactivity
  if (pages[page].init) pages[page].init();

  // Update URL hash
  history.replaceState(null, '', `#${page}`);
}

function buildApp() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <h1>Servicecar<br>Electronic</h1>
        <p>Sistema de gestión</p>
      </div>
      <nav class="sidebar-nav">
        ${Object.entries(pages).map(([key, p]) => `
          <button class="nav-item ${key === currentPage ? 'active' : ''}" data-page="${key}">
            <span class="nav-icon">${p.icon}</span>
            ${p.label}
          </button>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar">AP</div>
          <div class="user-info">
            <p>Alan Pire</p>
            <span>Administrador</span>
          </div>
        </div>
      </div>
    </aside>

    <div style="flex:1;display:flex;flex-direction:column;">
      <header class="topbar">
        <button id="menu-toggle" style="display:none;background:none;border:none;cursor:pointer;padding:4px;margin-right:8px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <span class="topbar-title">Panel</span>
        <div class="topbar-actions">
          <span class="badge badge-warning" style="font-size:12px;">${icons.alert.replace('class="nav-icon"','').replace('width="18"','width="12"').replace('height="18"','height="12"')} 3 stock bajos</span>
        </div>
      </header>
      <main class="main-content"></main>
    </div>
  `;

  // Nav events
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      navigate(btn.dataset.page);
      // Close sidebar on mobile
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  if (window.innerWidth <= 640) menuToggle.style.display = 'block';
  menuToggle?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  window.addEventListener('resize', () => {
    menuToggle.style.display = window.innerWidth <= 640 ? 'block' : 'none';
  });

  // Initial page from hash
  const hash = location.hash.replace('#', '');
  navigate(hash && pages[hash] ? hash : 'panel');
}

buildApp();
