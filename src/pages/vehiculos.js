import { vehiculos as dataVehiculos, mecanicos } from '../data/datos.js';
import { icons } from '../icons.js';
import { showToast } from '../main.js';

let vehiculos = [...dataVehiculos];
let filtro = '';

export function renderVehiculos() {
  return `
    <div class="page-header">
      <div>
        <h2>Ingreso de vehículos</h2>
        <p>Registro y gestión de vehículos en taller</p>
      </div>
      <button class="btn btn-primary" id="btn-nuevo-vehiculo">
        ${icons.plus} Registrar vehículo
      </button>
    </div>

    <div class="card" style="margin-bottom:20px;">
      <div class="card-body" style="padding:14px 20px;">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div class="search-bar">
            ${icons.search}
            <input type="text" id="search-vehiculos" placeholder="Buscar por placa, propietario, marca..." value="${filtro}">
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-outline filtro-btn" data-estado="">Todos</button>
            <button class="btn btn-outline filtro-btn" data-estado="En reparación">En reparación</button>
            <button class="btn btn-outline filtro-btn" data-estado="Pendiente">Pendiente</button>
            <button class="btn btn-outline filtro-btn" data-estado="Listo">Listo</button>
            <button class="btn btn-outline filtro-btn" data-estado="Entregado">Entregado</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Placa</th>
            <th>Vehículo</th>
            <th>Propietario</th>
            <th>Ingreso</th>
            <th>Mecánico</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr></thead>
          <tbody id="tabla-vehiculos">
            ${renderFilas(vehiculos)}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal nuevo vehículo -->
    <div class="modal-overlay" id="modal-vehiculo" style="display:none;">
      <div class="modal">
        <div class="modal-header">
          <h3>Registrar nuevo vehículo</h3>
          <button class="btn btn-outline" id="close-modal-vehiculo" style="padding:4px 8px;">${icons.close}</button>
        </div>
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Placa *</label>
              <input class="form-control" id="v-placa" placeholder="Ej: ABC-123" style="text-transform:uppercase">
            </div>
            <div class="form-group">
              <label class="form-label">Color</label>
              <input class="form-control" id="v-color" placeholder="Ej: Blanco">
            </div>
          </div>
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">Marca *</label>
              <input class="form-control" id="v-marca" placeholder="Ej: Chevrolet">
            </div>
            <div class="form-group">
              <label class="form-label">Modelo *</label>
              <input class="form-control" id="v-modelo" placeholder="Ej: Spark">
            </div>
            <div class="form-group">
              <label class="form-label">Año</label>
              <input class="form-control" id="v-anio" type="number" placeholder="2020">
            </div>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Propietario *</label>
              <input class="form-control" id="v-propietario" placeholder="Nombre completo">
            </div>
            <div class="form-group">
              <label class="form-label">Teléfono</label>
              <input class="form-control" id="v-telefono" placeholder="310 000 0000">
            </div>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Mecánico asignado</label>
              <select class="form-control" id="v-mecanico">
                <option value="">Sin asignar</option>
                ${mecanicos.filter(m=>m.activo).map(m=>`<option>${m.nombre}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Estado inicial</label>
              <select class="form-control" id="v-estado">
                <option>Pendiente</option>
                <option>En reparación</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Descripción del servicio</label>
            <textarea class="form-control" id="v-desc" rows="2" placeholder="Problema reportado o servicio a realizar..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="cancel-modal-vehiculo">Cancelar</button>
          <button class="btn btn-primary" id="guardar-vehiculo">${icons.check} Registrar</button>
        </div>
      </div>
    </div>
  `;
}

function renderFilas(lista) {
  if (!lista.length) return `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">No se encontraron vehículos</td></tr>`;
  return lista.map(v => `
    <tr>
      <td><span class="plate-badge">${v.placa}</span></td>
      <td>
        <div style="font-weight:500">${v.marca} ${v.modelo}</div>
        <div style="font-size:12px;color:var(--text-muted)">${v.anio} · ${v.color}</div>
      </td>
      <td>
        <div>${v.propietario}</div>
        <div style="font-size:12px;color:var(--text-muted)">${v.telefono}</div>
      </td>
      <td style="font-size:13px;color:var(--text-muted)">${formatFecha(v.ingreso)}</td>
      <td style="font-size:13px">${v.mecanico || '<span style="color:var(--text-light)">Sin asignar</span>'}</td>
      <td>${badgeEstado(v.estado)}</td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-outline cambiar-estado" data-id="${v.id}" style="font-size:12px;padding:4px 10px;">Cambiar estado</button>
        </div>
      </td>
    </tr>
  `).join('');
}

export function initVehiculos() {
  const btnNuevo = document.getElementById('btn-nuevo-vehiculo');
  const modal = document.getElementById('modal-vehiculo');
  const closeBtn = document.getElementById('close-modal-vehiculo');
  const cancelBtn = document.getElementById('cancel-modal-vehiculo');
  const guardarBtn = document.getElementById('guardar-vehiculo');
  const searchInput = document.getElementById('search-vehiculos');

  btnNuevo?.addEventListener('click', () => { modal.style.display = 'flex'; });
  closeBtn?.addEventListener('click', () => { modal.style.display = 'none'; });
  cancelBtn?.addEventListener('click', () => { modal.style.display = 'none'; });

  searchInput?.addEventListener('input', (e) => {
    filtro = e.target.value.toLowerCase();
    const filtrados = vehiculos.filter(v =>
      v.placa.toLowerCase().includes(filtro) ||
      v.propietario.toLowerCase().includes(filtro) ||
      v.marca.toLowerCase().includes(filtro) ||
      v.modelo.toLowerCase().includes(filtro)
    );
    document.getElementById('tabla-vehiculos').innerHTML = renderFilas(filtrados);
    bindEstados();
  });

  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const estado = btn.dataset.estado;
      const filtrados = estado ? vehiculos.filter(v => v.estado === estado) : vehiculos;
      document.getElementById('tabla-vehiculos').innerHTML = renderFilas(filtrados);
      bindEstados();
    });
  });

  guardarBtn?.addEventListener('click', () => {
    const placa = document.getElementById('v-placa').value.trim().toUpperCase();
    const marca = document.getElementById('v-marca').value.trim();
    const modelo = document.getElementById('v-modelo').value.trim();
    if (!placa || !marca || !modelo) {
      showToast('Complete los campos obligatorios', 'error');
      return;
    }
    const nuevo = {
      id: vehiculos.length + 1,
      placa,
      marca,
      modelo,
      anio: parseInt(document.getElementById('v-anio').value) || new Date().getFullYear(),
      color: document.getElementById('v-color').value || 'No especificado',
      propietario: document.getElementById('v-propietario').value || 'Sin registrar',
      telefono: document.getElementById('v-telefono').value || '-',
      estado: document.getElementById('v-estado').value,
      mecanico: document.getElementById('v-mecanico').value,
      ingreso: new Date().toISOString().slice(0,10),
      descripcion: document.getElementById('v-desc').value,
    };
    vehiculos.unshift(nuevo);
    document.getElementById('tabla-vehiculos').innerHTML = renderFilas(vehiculos);
    bindEstados();
    modal.style.display = 'none';
    showToast(`Vehículo ${placa} registrado correctamente`, 'success');
  });

  bindEstados();
}

function bindEstados() {
  document.querySelectorAll('.cambiar-estado').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const v = vehiculos.find(x => x.id === id);
      if (!v) return;
      const orden = ['Pendiente', 'En reparación', 'Listo', 'Entregado'];
      const idx = orden.indexOf(v.estado);
      v.estado = orden[(idx + 1) % orden.length];
      document.getElementById('tabla-vehiculos').innerHTML = renderFilas(vehiculos);
      bindEstados();
      showToast(`Estado actualizado: ${v.estado}`, 'success');
    });
  });
}

function badgeEstado(estado) {
  const map = { 'En reparación':'badge-warning','Pendiente':'badge-neutral','Listo':'badge-success','Entregado':'badge-info' };
  return `<span class="badge ${map[estado]||'badge-neutral'}">${estado}</span>`;
}

function formatFecha(fecha) {
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CO', { day:'2-digit', month:'short' });
}
