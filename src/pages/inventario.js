import { inventario as dataInventario } from '../data/datos.js';
import { icons } from '../icons.js';
import { showToast } from '../main.js';

let inventario = [...dataInventario];

const categorias = ['Lubricantes', 'Filtros', 'Frenos', 'Eléctricos', 'Motor', 'Suspensión', 'Carrocería', 'Otros'];

export function renderInventario() {
  const bajos = inventario.filter(i => i.stock <= i.minimo).length;
  const totalItems = inventario.length;
  const valorTotal = inventario.reduce((acc, i) => acc + (i.stock * i.precio), 0);

  return `
    <div class="page-header">
      <div>
        <h2>Inventario</h2>
        <p>Control de repuestos y materiales</p>
      </div>
      <button class="btn btn-primary" id="btn-nuevo-item">${icons.plus} Agregar item</button>
    </div>

    <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px;">
      <div class="stat-card">
        <div class="stat-icon" style="background:#E6EEF8;">${icons.box.replace('currentColor','#1A5FAB')}</div>
        <div class="stat-info"><p>Total productos</p><h2>${totalItems}</h2></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#FDECEA;">${icons.alert.replace('currentColor','#C0392B')}</div>
        <div class="stat-info"><p>Stock crítico</p><h2>${bajos}</h2><small style="color:var(--danger)">requieren pedido</small></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#E8F7EF;">${icons.check.replace('currentColor','#1A7A4A')}</div>
        <div class="stat-info"><p>Valor en inventario</p><h2 style="font-size:18px;">$${Math.round(valorTotal/1000)}K</h2></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:20px;">
      <div class="card-body" style="padding:14px 20px;">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
          <div class="search-bar">${icons.search}<input type="text" id="search-inv" placeholder="Buscar producto, código..."></div>
          <select class="form-control" id="filtro-cat" style="width:auto;min-width:160px;">
            <option value="">Todas las categorías</option>
            ${categorias.map(c=>`<option>${c}</option>`).join('')}
          </select>
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
            <input type="checkbox" id="solo-bajos"> Solo stock bajo
          </label>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Código</th><th>Producto</th><th>Categoría</th>
            <th style="text-align:center">Stock</th>
            <th style="text-align:center">Mínimo</th>
            <th style="text-align:right">Precio unit.</th>
            <th>Proveedor</th>
            <th style="text-align:center">Acciones</th>
          </tr></thead>
          <tbody id="tabla-inventario">
            ${renderFilas(inventario)}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal-overlay" id="modal-inv" style="display:none;">
      <div class="modal">
        <div class="modal-header">
          <h3 id="modal-inv-title">Agregar producto</h3>
          <button class="btn btn-outline" id="close-modal-inv" style="padding:4px 8px;">${icons.close}</button>
        </div>
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Código *</label>
              <input class="form-control" id="i-codigo" placeholder="ACE-001" style="text-transform:uppercase">
            </div>
            <div class="form-group">
              <label class="form-label">Categoría</label>
              <select class="form-control" id="i-cat">
                ${categorias.map(c=>`<option>${c}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Nombre del producto *</label>
            <input class="form-control" id="i-nombre" placeholder="Nombre descriptivo">
          </div>
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">Stock inicial</label>
              <input class="form-control" id="i-stock" type="number" placeholder="0" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">Mínimo</label>
              <input class="form-control" id="i-minimo" type="number" placeholder="5" min="0">
            </div>
            <div class="form-group">
              <label class="form-label">Precio unitario</label>
              <input class="form-control" id="i-precio" type="number" placeholder="0" min="0">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Proveedor</label>
            <input class="form-control" id="i-proveedor" placeholder="Nombre del proveedor">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="cancel-modal-inv">Cancelar</button>
          <button class="btn btn-primary" id="guardar-inv">${icons.check} Guardar</button>
        </div>
      </div>
    </div>
  `;
}

function renderFilas(lista) {
  if (!lista.length) return `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted)">No se encontraron productos</td></tr>`;
  return lista.map(i => {
    const bajo = i.stock <= i.minimo;
    return `
      <tr>
        <td><code style="font-size:12px;background:var(--bg);padding:3px 8px;border-radius:4px;">${i.codigo}</code></td>
        <td style="font-weight:500">${i.nombre}</td>
        <td><span class="badge badge-neutral" style="font-size:11px;">${i.categoria}</span></td>
        <td style="text-align:center">
          <span class="${bajo ? 'stock-low' : 'stock-ok'}" style="font-size:15px;">${i.stock}</span>
          ${bajo ? `<br><span style="font-size:10px;color:var(--danger)">STOCK BAJO</span>` : ''}
        </td>
        <td style="text-align:center;color:var(--text-muted)">${i.minimo}</td>
        <td style="text-align:right;font-weight:500">$${i.precio.toLocaleString('es-CO')}</td>
        <td style="font-size:13px;color:var(--text-muted)">${i.proveedor}</td>
        <td style="text-align:center">
          <div style="display:flex;gap:6px;justify-content:center;">
            <button class="btn btn-outline ajustar-stock" data-id="${i.id}" data-dir="1" style="padding:4px 8px;font-size:12px;" title="Aumentar">+</button>
            <button class="btn btn-outline ajustar-stock" data-id="${i.id}" data-dir="-1" style="padding:4px 8px;font-size:12px;" title="Reducir">−</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

export function initInventario() {
  const modal = document.getElementById('modal-inv');
  document.getElementById('btn-nuevo-item')?.addEventListener('click', () => modal.style.display = 'flex');
  document.getElementById('close-modal-inv')?.addEventListener('click', () => modal.style.display = 'none');
  document.getElementById('cancel-modal-inv')?.addEventListener('click', () => modal.style.display = 'none');

  const actualizarFiltro = () => {
    let lista = [...inventario];
    const q = document.getElementById('search-inv').value.toLowerCase();
    const cat = document.getElementById('filtro-cat').value;
    const bajos = document.getElementById('solo-bajos').checked;
    if (q) lista = lista.filter(i => i.nombre.toLowerCase().includes(q) || i.codigo.toLowerCase().includes(q));
    if (cat) lista = lista.filter(i => i.categoria === cat);
    if (bajos) lista = lista.filter(i => i.stock <= i.minimo);
    document.getElementById('tabla-inventario').innerHTML = renderFilas(lista);
    bindAjustes();
  };

  document.getElementById('search-inv')?.addEventListener('input', actualizarFiltro);
  document.getElementById('filtro-cat')?.addEventListener('change', actualizarFiltro);
  document.getElementById('solo-bajos')?.addEventListener('change', actualizarFiltro);

  document.getElementById('guardar-inv')?.addEventListener('click', () => {
    const codigo = document.getElementById('i-codigo').value.trim().toUpperCase();
    const nombre = document.getElementById('i-nombre').value.trim();
    if (!codigo || !nombre) { showToast('Complete los campos requeridos', 'error'); return; }
    const nuevo = {
      id: inventario.length + 1,
      codigo,
      nombre,
      categoria: document.getElementById('i-cat').value,
      stock: parseInt(document.getElementById('i-stock').value) || 0,
      minimo: parseInt(document.getElementById('i-minimo').value) || 5,
      precio: parseInt(document.getElementById('i-precio').value) || 0,
      proveedor: document.getElementById('i-proveedor').value || 'Sin especificar',
    };
    inventario.push(nuevo);
    document.getElementById('tabla-inventario').innerHTML = renderFilas(inventario);
    bindAjustes();
    modal.style.display = 'none';
    showToast(`${nombre} agregado al inventario`, 'success');
  });

  bindAjustes();
}

function bindAjustes() {
  document.querySelectorAll('.ajustar-stock').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const dir = parseInt(btn.dataset.dir);
      const item = inventario.find(x => x.id === id);
      if (!item) return;
      item.stock = Math.max(0, item.stock + dir);
      document.getElementById('tabla-inventario').innerHTML = renderFilas(inventario);
      bindAjustes();
    });
  });
}
