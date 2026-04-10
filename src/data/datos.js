export const mecanicos = [
  { id: 1, nombre: 'Carlos Rodríguez', especialidad: 'Motor y transmisión', telefono: '312 445 7890', activo: true, trabajosHoy: 3, trabajosMes: 28 },
  { id: 2, nombre: 'Andrés Molina', especialidad: 'Electricidad automotriz', telefono: '315 882 3401', activo: true, trabajosHoy: 2, trabajosMes: 22 },
  { id: 3, nombre: 'Fernando Castillo', especialidad: 'Frenos y suspensión', telefono: '320 113 6754', activo: true, trabajosHoy: 4, trabajosMes: 31 },
  { id: 4, nombre: 'Juan Suárez', especialidad: 'Carrocería y pintura', telefono: '317 660 2298', activo: false, trabajosHoy: 0, trabajosMes: 14 },
];

export const vehiculos = [
  { id: 1, placa: 'ABC-123', marca: 'Chevrolet', modelo: 'Spark', anio: 2019, color: 'Blanco', propietario: 'María López', telefono: '310 234 5678', estado: 'En reparación', mecanico: 'Carlos Rodríguez', ingreso: '2025-04-08', descripcion: 'Cambio de aceite y revisión frenos' },
  { id: 2, placa: 'XYZ-789', marca: 'Renault', modelo: 'Sandero', anio: 2021, color: 'Gris', propietario: 'Pedro Gómez', telefono: '314 876 5432', estado: 'Pendiente', mecanico: 'Andrés Molina', ingreso: '2025-04-09', descripcion: 'Falla eléctrica tablero' },
  { id: 3, placa: 'DEF-456', marca: 'Mazda', modelo: '3', anio: 2020, color: 'Rojo', propietario: 'Sandra Ruiz', telefono: '318 543 2109', estado: 'Listo', mecanico: 'Fernando Castillo', ingreso: '2025-04-07', descripcion: 'Cambio pastillas de freno' },
  { id: 4, placa: 'GHI-321', marca: 'Toyota', modelo: 'Corolla', anio: 2018, color: 'Negro', propietario: 'Luis Herrera', telefono: '313 765 4321', estado: 'Entregado', mecanico: 'Carlos Rodríguez', ingreso: '2025-04-05', descripcion: 'Mantenimiento preventivo 30.000 km' },
  { id: 5, placa: 'JKL-654', marca: 'Kia', modelo: 'Picanto', anio: 2022, color: 'Azul', propietario: 'Ana Torres', telefono: '311 987 6543', estado: 'En reparación', mecanico: 'Fernando Castillo', ingreso: '2025-04-09', descripcion: 'Revisión suspensión delantera' },
  { id: 6, placa: 'MNO-987', marca: 'Nissan', modelo: 'March', anio: 2017, color: 'Plateado', propietario: 'Jorge Díaz', telefono: '316 234 5678', estado: 'Pendiente', mecanico: 'Andrés Molina', ingreso: '2025-04-10', descripcion: 'Diagnóstico alarma y scanner' },
];

export const inventario = [
  { id: 1, codigo: 'ACE-001', nombre: 'Aceite 20W-50 (litro)', categoria: 'Lubricantes', stock: 48, minimo: 20, precio: 12500, proveedor: 'Lubricantes del Oriente' },
  { id: 2, codigo: 'FIL-002', nombre: 'Filtro de aceite universal', categoria: 'Filtros', stock: 23, minimo: 15, precio: 18000, proveedor: 'Autopartes Bucaramanga' },
  { id: 3, codigo: 'FRE-003', nombre: 'Pastillas de freno delantera', categoria: 'Frenos', stock: 8, minimo: 10, precio: 65000, proveedor: 'Frenosa Colombia' },
  { id: 4, codigo: 'BAT-004', nombre: 'Batería 60 Ah 12V', categoria: 'Eléctricos', stock: 5, minimo: 3, precio: 280000, proveedor: 'Baterías Mac' },
  { id: 5, codigo: 'BUJ-005', nombre: 'Bujías NGK (set x4)', categoria: 'Motor', stock: 3, minimo: 8, precio: 72000, proveedor: 'Autopartes Bucaramanga' },
  { id: 6, codigo: 'LIQ-006', nombre: 'Líquido de frenos DOT4', categoria: 'Lubricantes', stock: 18, minimo: 10, precio: 22000, proveedor: 'Lubricantes del Oriente' },
  { id: 7, codigo: 'COR-007', nombre: 'Correa de distribución', categoria: 'Motor', stock: 6, minimo: 5, precio: 95000, proveedor: 'Importadora Nacional' },
  { id: 8, codigo: 'AMO-008', nombre: 'Amortiguador delantero', categoria: 'Suspensión', stock: 4, minimo: 4, precio: 185000, proveedor: 'Suspensiones Pro' },
];

export const historialServicios = [
  { id: 1, placa: 'ABC-123', fecha: '2025-04-08', servicio: 'Cambio de aceite y filtro', valor: 95000, mecanico: 'Carlos Rodríguez', estado: 'En proceso' },
  { id: 2, placa: 'ABC-123', fecha: '2025-01-15', servicio: 'Cambio pastillas freno', valor: 130000, mecanico: 'Fernando Castillo', estado: 'Completado' },
  { id: 3, placa: 'ABC-123', fecha: '2024-10-03', servicio: 'Alineación y balanceo', valor: 60000, mecanico: 'Carlos Rodríguez', estado: 'Completado' },
  { id: 4, placa: 'DEF-456', fecha: '2025-04-07', servicio: 'Cambio pastillas de freno', valor: 130000, mecanico: 'Fernando Castillo', estado: 'Completado' },
  { id: 5, placa: 'GHI-321', fecha: '2025-04-05', servicio: 'Mantenimiento 30.000 km', valor: 250000, mecanico: 'Carlos Rodríguez', estado: 'Completado' },
];

export const actividadReciente = [
  { tipo: 'ingreso', texto: 'Nissan March - MNO-987 ingresó al taller', tiempo: 'Hace 30 min', color: '#1A7A4A' },
  { tipo: 'listo', texto: 'Mazda 3 - DEF-456 listo para entrega', tiempo: 'Hace 1 hora', color: '#1A5FAB' },
  { tipo: 'repuesto', texto: 'Stock bajo: Bujías NGK (3 unidades)', tiempo: 'Hace 2 horas', color: '#B8790A' },
  { tipo: 'entrega', texto: 'Toyota Corolla - GHI-321 entregado', tiempo: 'Hace 3 horas', color: '#1A7A4A' },
  { tipo: 'ingreso', texto: 'Kia Picanto - JKL-654 ingresó al taller', tiempo: 'Ayer 16:20', color: '#1A3A5C' },
];
