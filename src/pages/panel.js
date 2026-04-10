import { vehiculos, mecanicos, inventario, actividadReciente } from '../data/datos.js';
import { icons } from '../icons.js';

export function renderPanel() {
  const enReparacion = vehiculos.filter(v => v.estado === 'En reparación').length;
  const pendientes = vehiculos.filter(v => v.estado === 'Pendiente').length;
  const listos = vehiculos.filter(v => v.estado === 'Listo').length;
  const mecActivos = mecanicos.filter(m => m.activo).length;
  const stockBajo = inventario.filter(i => i.stock <= i.minimo).length;

  return `
    <div class="page-header">
      <div>
        <h2>Panel de control</h2>
        <p>Hoy, ${new Date().toLocaleDateString('es-CO', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</p>
      </div>
      <button class="btn btn-outline" style="font-size:13px;">${icons.download} Exportar reporte</button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background:#E6EEF8;">${icons.vehiculo.replace('currentColor','#1A5FAB')}</div>
        <div class="stat-info">
          <p>Vehículos activos</p>
          <h2>${vehiculos.filter(v => v.estado !== 'Entregado').length}</h2>
          <small>↑ 2 esta semana</small>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#FEF6E4;">${icons.alert.replace('currentColor','#B8790A')}</div>
        <div class="stat-info">
          <p>En reparación</p>
          <h2>${enReparacion}</h2>
          <small style="color:#B8790A;">${pendientes} pendientes</small>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#E8F7EF;">${icons.mecanico.replace('currentColor','#1A7A4A')}</div>
        <div class="stat-info">
          <p>Mecánicos activos</p>
          <h2>${mecActivos}</h2>
          <small>↑ trabajando hoy</small>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#FDECEA;">${icons.box.replace('currentColor','#C0392B')}</div>
        <div class="stat-info">
          <p>Stock bajo</p>
          <h2>${stockBajo}</h2>
          <small style="color:#C0392B;">repuestos críticos</small>
        </div>
      </div>
    </div>

    <div class="panel-grid">
      <div class="card">
        <div class="card-header">
          <h3>Vehículos en taller</h3>
          <span class="badge badge-info">${vehiculos.filter(v=>v.estado!=='Entregado').length} activos</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Placa</th><th>Vehículo</th><th>Estado</th><th>Mecánico</th>
            </tr></thead>
            <tbody>
              ${vehiculos.filter(v => v.estado !== 'Entregado').map(v => `
                <tr>
                  <td><span class="plate-badge">${v.placa}</span></td>
                  <td><strong>${v.marca}</strong> ${v.modelo}</td>
                  <td>${badgeEstado(v.estado)}</td>
                  <td style="font-size:13px;color:var(--text-muted)">${v.mecanico.split(' ')[0]}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header"><h3>Actividad reciente</h3></div>
          <div class="card-body" style="padding-bottom:8px;">
            ${actividadReciente.map(a => `
              <div class="activity-item">
                <div class="activity-dot" style="background:${a.color}"></div>
                <div class="activity-text">
                  <p>${a.texto}</p>
                  <span>${a.tiempo}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3>Mecánicos hoy</h3></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
            ${mecanicos.filter(m=>m.activo).map(m => `
              <div style="display:flex;align-items:center;gap:12px;">
                <div class="user-avatar" style="background:var(--steel);">${m.nombre.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                <div style="flex:1;">
                  <p style="font-size:14px;font-weight:500;">${m.nombre}</p>
                  <p style="font-size:12px;color:var(--text-muted)">${m.especialidad}</p>
                </div>
                <span class="badge badge-success">${m.trabajosHoy} hoy</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function badgeEstado(estado) {
  const map = {
    'En reparación': 'badge-warning',
    'Pendiente': 'badge-neutral',
    'Listo': 'badge-success',
    'Entregado': 'badge-info',
  };
  return `<span class="badge ${map[estado]||'badge-neutral'}">${estado}</span>`;
}
