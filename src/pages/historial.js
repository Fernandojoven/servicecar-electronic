import { vehiculos, historialServicios } from '../data/datos.js';
import { icons } from '../icons.js';

export function renderHistorial() {
  return `
    <div class="page-header">
      <div>
        <h2>Historial por placa</h2>
        <p>Consulta el historial completo de servicios de cualquier vehículo</p>
      </div>
    </div>

    <div class="card" style="margin-bottom:20px;">
      <div class="card-body">
        <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;">
            <label class="form-label">Buscar por placa</label>
            <input class="form-control" id="input-placa-buscar" placeholder="Ej: ABC-123" style="text-transform:uppercase;font-size:16px;font-weight:600;letter-spacing:1px;">
          </div>
          <button class="btn btn-primary" id="btn-buscar-placa" style="height:40px;">
            ${icons.search} Consultar
          </button>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;" id="sugerencias-placas">
          ${vehiculos.map(v => `
            <button class="btn btn-outline placa-sugerida" data-placa="${v.placa}" style="font-size:12px;padding:4px 10px;">
              ${v.placa}
            </button>
          `).join('')}
        </div>
      </div>
    </div>

    <div id="resultado-historial">
      <div class="empty-state">
        ${icons.historial}
        <p>Ingresa una placa para consultar el historial de servicios</p>
      </div>
    </div>
  `;
}

export function initHistorial() {
  const input = document.getElementById('input-placa-buscar');
  const btn = document.getElementById('btn-buscar-placa');

  btn?.addEventListener('click', buscar);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') buscar(); });

  document.querySelectorAll('.placa-sugerida').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.placa;
      buscar();
    });
  });
}

function buscar() {
  const placa = document.getElementById('input-placa-buscar').value.trim().toUpperCase();
  const resultado = document.getElementById('resultado-historial');

  const vehiculo = vehiculos.find(v => v.placa === placa);
  const servicios = historialServicios.filter(s => s.placa === placa);

  if (!vehiculo) {
    resultado.innerHTML = `
      <div class="empty-state">
        ${icons.alert}
        <p>No se encontró ningún vehículo con la placa <strong>${placa}</strong></p>
      </div>
    `;
    return;
  }

  const totalServicios = servicios.length;
  const totalGastado = servicios.reduce((acc, s) => acc + s.valor, 0);

  resultado.innerHTML = `
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <div style="display:flex;align-items:center;gap:14px;">
          <span class="plate-badge" style="font-size:20px;padding:6px 18px;">${vehiculo.placa}</span>
          <div>
            <h3 style="font-size:18px;">${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio}</h3>
            <p style="font-size:14px;color:var(--text-muted);margin-top:2px;">${vehiculo.color} · ${badgeEstado(vehiculo.estado)}</p>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">
          <div>
            <p style="font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Propietario</p>
            <p style="font-weight:500;">${vehiculo.propietario}</p>
            <p style="font-size:13px;color:var(--text-muted)">${vehiculo.telefono}</p>
          </div>
          <div>
            <p style="font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Mecánico actual</p>
            <p style="font-weight:500;">${vehiculo.mecanico || 'Sin asignar'}</p>
          </div>
          <div>
            <p style="font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Total servicios</p>
            <p style="font-size:22px;font-weight:700;">${totalServicios}</p>
          </div>
          <div>
            <p style="font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Total facturado</p>
            <p style="font-size:22px;font-weight:700;">$${totalGastado.toLocaleString('es-CO')}</p>
          </div>
        </div>
        ${vehiculo.descripcion ? `
          <div style="margin-top:16px;padding:12px 16px;background:var(--bg);border-radius:var(--radius-sm);border-left:3px solid var(--amber);">
            <p style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:4px;">SERVICIO ACTUAL</p>
            <p style="font-size:14px;">${vehiculo.descripcion}</p>
          </div>
        ` : ''}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3>Historial de servicios</h3>
        <span class="badge badge-neutral">${totalServicios} registro${totalServicios !== 1 ? 's' : ''}</span>
      </div>
      ${servicios.length > 0 ? `
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Fecha</th><th>Servicio</th><th>Mecánico</th><th>Estado</th><th style="text-align:right">Valor</th>
            </tr></thead>
            <tbody>
              ${servicios.map(s => `
                <tr>
                  <td style="font-size:13px;color:var(--text-muted)">${formatFecha(s.fecha)}</td>
                  <td style="font-weight:500">${s.servicio}</td>
                  <td style="font-size:13px">${s.mecanico}</td>
                  <td>${badgeServicio(s.estado)}</td>
                  <td style="text-align:right;font-weight:600;">$${s.valor.toLocaleString('es-CO')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="card-body">
          <p style="color:var(--text-muted);text-align:center;padding:20px 0">No hay servicios registrados para este vehículo</p>
        </div>
      `}
    </div>
  `;
}

function badgeEstado(estado) {
  const map = { 'En reparación':'badge-warning','Pendiente':'badge-neutral','Listo':'badge-success','Entregado':'badge-info' };
  return `<span class="badge ${map[estado]||'badge-neutral'}">${estado}</span>`;
}
function badgeServicio(estado) {
  return estado === 'Completado'
    ? `<span class="badge badge-success">${estado}</span>`
    : `<span class="badge badge-warning">${estado}</span>`;
}
function formatFecha(fecha) {
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CO', { day:'2-digit', month:'long', year:'numeric' });
}
