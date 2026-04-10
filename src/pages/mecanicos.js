import { mecanicos as dataMecanicos } from '../data/datos.js';
import { icons } from '../icons.js';
import { showToast } from '../main.js';

let mecanicos = [...dataMecanicos];

export function renderMecanicos() {
  return `
    <div class="page-header">
      <div>
        <h2>Mecánicos</h2>
        <p>Gestión del equipo de trabajo</p>
      </div>
      <button class="btn btn-primary" id="btn-nuevo-mec">${icons.plus} Agregar mecánico</button>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;" id="grid-mecanicos">
      ${renderCards(mecanicos)}
    </div>

    <!-- Modal -->
    <div class="modal-overlay" id="modal-mec" style="display:none;">
      <div class="modal">
        <div class="modal-header">
          <h3>Agregar mecánico</h3>
          <button class="btn btn-outline" id="close-modal-mec" style="padding:4px 8px;">${icons.close}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Nombre completo *</label>
            <input class="form-control" id="m-nombre" placeholder="Nombre del mecánico">
          </div>
          <div class="form-group">
            <label class="form-label">Especialidad *</label>
            <input class="form-control" id="m-especialidad" placeholder="Ej: Motor y transmisión">
          </div>
          <div class="form-group">
            <label class="form-label">Teléfono</label>
            <input class="form-control" id="m-telefono" placeholder="310 000 0000">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="cancel-modal-mec">Cancelar</button>
          <button class="btn btn-primary" id="guardar-mec">${icons.check} Guardar</button>
        </div>
      </div>
    </div>
  `;
}

function renderCards(lista) {
  return lista.map(m => `
    <div class="card" style="padding:20px;">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
        <div class="user-avatar" style="width:50px;height:50px;font-size:16px;background:${m.activo ? 'var(--steel)' : '#B0B8C8'};">
          ${m.nombre.split(' ').map(n=>n[0]).join('').slice(0,2)}
        </div>
        <div style="flex:1;">
          <h3 style="font-size:15px;font-weight:600;">${m.nombre}</h3>
          <p style="font-size:13px;color:var(--text-muted)">${m.especialidad}</p>
        </div>
        <span class="badge ${m.activo ? 'badge-success' : 'badge-neutral'}">${m.activo ? 'Activo' : 'Inactivo'}</span>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
        <div style="background:var(--bg);border-radius:var(--radius-sm);padding:10px;text-align:center;">
          <p style="font-size:22px;font-weight:700;color:var(--navy)">${m.trabajosHoy}</p>
          <p style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.4px;">Hoy</p>
        </div>
        <div style="background:var(--bg);border-radius:var(--radius-sm);padding:10px;text-align:center;">
          <p style="font-size:22px;font-weight:700;color:var(--navy)">${m.trabajosMes}</p>
          <p style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.4px;">Este mes</p>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
        <svg style="width:14px;height:14px;color:var(--text-muted)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14 19.79 19.79 0 0 1 1.59 5.5a2 2 0 0 1 1.37-2.16l2.93-1.17a2 2 0 0 1 2.57.96l1.24 3.05a2 2 0 0 1-.45 2.28L7.6 9.91a16 16 0 0 0 6.29 6.29l1.45-1.65a2 2 0 0 1 2.28-.45l3.05 1.24a2 2 0 0 1 .96 2.58z"/></svg>
        <span style="font-size:13px;color:var(--text-muted)">${m.telefono}</span>
      </div>

      <div style="display:flex;gap:8px;">
        <button class="btn btn-outline toggle-estado" data-id="${m.id}" style="flex:1;font-size:13px;">
          ${m.activo ? 'Desactivar' : 'Activar'}
        </button>
      </div>
    </div>
  `).join('');
}

export function initMecanicos() {
  const modal = document.getElementById('modal-mec');
  document.getElementById('btn-nuevo-mec')?.addEventListener('click', () => modal.style.display = 'flex');
  document.getElementById('close-modal-mec')?.addEventListener('click', () => modal.style.display = 'none');
  document.getElementById('cancel-modal-mec')?.addEventListener('click', () => modal.style.display = 'none');

  document.getElementById('guardar-mec')?.addEventListener('click', () => {
    const nombre = document.getElementById('m-nombre').value.trim();
    const especialidad = document.getElementById('m-especialidad').value.trim();
    if (!nombre || !especialidad) { showToast('Complete los campos requeridos', 'error'); return; }
    const nuevo = {
      id: mecanicos.length + 1,
      nombre,
      especialidad,
      telefono: document.getElementById('m-telefono').value || '-',
      activo: true,
      trabajosHoy: 0,
      trabajosMes: 0,
    };
    mecanicos.push(nuevo);
    document.getElementById('grid-mecanicos').innerHTML = renderCards(mecanicos);
    bindToggle();
    modal.style.display = 'none';
    showToast(`${nombre} agregado al equipo`, 'success');
  });

  bindToggle();
}

function bindToggle() {
  document.querySelectorAll('.toggle-estado').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const m = mecanicos.find(x => x.id === id);
      if (!m) return;
      m.activo = !m.activo;
      document.getElementById('grid-mecanicos').innerHTML = renderCards(mecanicos);
      bindToggle();
      showToast(`${m.nombre}: ${m.activo ? 'activado' : 'desactivado'}`, 'success');
    });
  });
}
