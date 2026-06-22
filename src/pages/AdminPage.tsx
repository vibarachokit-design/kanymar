import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus, X, Check, Star, ArrowLeft, RotateCcw, Download, FileUp, Upload } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { getProductos, saveProductos, resetProductos, lineaColors } from '@/data/productos';
import type { Producto } from '@/types';

const lineas = ['Lavanda', 'Cafe Vainilla', 'Algas Marinas', 'Romero'] as const;
const emptyProduct: Partial<Producto> = {
  linea: 'Lavanda', categoria: 'Jabon', price: 4990, weight: '100g',
  destacado: false, description: '', ingredients: '', benefits: '', image: '',
};

function isProducto(value: unknown): value is Producto {
  if (!value || typeof value !== 'object') return false;
  const product = value as Partial<Producto>;
  return typeof product.id === 'number' && typeof product.slug === 'string' &&
    typeof product.name === 'string' && typeof product.linea === 'string' &&
    typeof product.categoria === 'string' && typeof product.price === 'number' &&
    typeof product.weight === 'string' && typeof product.description === 'string' &&
    typeof product.ingredients === 'string' && typeof product.benefits === 'string' &&
    typeof product.image === 'string' && typeof product.destacado === 'boolean';
}

export default function AdminPage() {
  const { isAdmin, isLoading, login, logout } = useAdmin();
  const [productos, setProductos] = useState<Producto[]>(getProductos());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Producto>>({});
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<Partial<Producto>>(emptyProduct);
  const [notice, setNotice] = useState('');
  const backupInputRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <div className="min-h-screen bg-crema flex items-center justify-center"><div className="w-8 h-8 border-2 border-turquesa border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <LoginScreen login={login} />;

  function notify(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2800);
  }

  function persistProducts(updated: Producto[], successMessage: string) {
    try {
      saveProductos(updated);
      setProductos(updated);
      notify(successMessage);
      return true;
    } catch {
      notify('No hay espacio suficiente en el navegador. Usa una imagen mas liviana.');
      return false;
    }
  }

  function formError(form: Partial<Producto>, currentId?: number) {
    if (!form.name?.trim() || !form.slug?.trim() || !form.categoria?.trim()) return 'Completa nombre, slug y categoria.';
    if (!form.weight?.trim() || !form.image?.trim()) return 'Completa peso e imagen.';
    if (!Number.isFinite(form.price) || Number(form.price) < 0) return 'Ingresa un precio valido.';
    const repeated = productos.some(p => p.slug === form.slug?.trim() && p.id !== currentId);
    return repeated ? 'El slug ya esta siendo usado por otro producto.' : '';
  }

  function startEdit(p: Producto) { setEditingId(p.id); setEditForm({ ...p }); }
  function saveEdit(id: number) {
    const error = formError(editForm, id);
    if (error) { notify(error); return; }
    const updated = productos.map(p => p.id === id ? { ...p, ...editForm, slug: editForm.slug?.trim(), name: editForm.name?.trim() } as Producto : p);
    if (persistProducts(updated, 'Producto actualizado.')) setEditingId(null);
  }
  function del(id: number) { persistProducts(productos.filter(p => p.id !== id), 'Producto eliminado.'); }
  function create() {
    const error = formError(createForm);
    if (error) { notify(error); return; }
    const nextId = Math.max(...productos.map(p => p.id), 0) + 1;
    const p = { ...emptyProduct, ...createForm, id: nextId, slug: createForm.slug?.trim(), name: createForm.name?.trim() } as Producto;
    const updated = [...productos, p];
    if (persistProducts(updated, 'Producto creado.')) { setShowCreate(false); setCreateForm(emptyProduct); }
  }
  function reset() {
    if (!window.confirm('Restaurar el catalogo original? Se perderan los cambios guardados en este navegador.')) return;
    resetProductos(); setProductos(getProductos()); setEditingId(null); notify('Catalogo original restaurado.');
  }

  function loadImage(file: File | undefined, target: 'create' | 'edit') {
    if (!file) return;
    if (!file.type.startsWith('image/')) { notify('Selecciona un archivo de imagen valido.'); return; }
    if (file.size > 1_500_000) { notify('La imagen debe pesar menos de 1,5 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      if (target === 'create') setCreateForm(current => ({ ...current, image: reader.result as string }));
      else setEditForm(current => ({ ...current, image: reader.result as string }));
      notify('Imagen cargada.');
    };
    reader.readAsDataURL(file);
  }

  function exportBackup() {
    const payload = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), productos }, null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url; link.download = `respaldo-kanymar-${new Date().toISOString().slice(0, 10)}.json`; link.click();
    URL.revokeObjectURL(url); notify('Respaldo exportado.');
  }

  function importBackup(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as unknown;
        const values = Array.isArray(parsed) ? parsed : parsed && typeof parsed === 'object' ? (parsed as { productos?: unknown }).productos : undefined;
        if (!Array.isArray(values) || values.length === 0 || !values.every(isProducto)) throw new Error();
        const slugs = new Set(values.map(product => product.slug));
        if (slugs.size !== values.length) throw new Error();
        if (persistProducts(values, 'Respaldo importado.')) setEditingId(null);
      } catch { notify('El archivo no contiene un respaldo valido de Kanymar.'); }
    };
    reader.readAsText(file);
  }

  return (
    <div className="min-h-screen bg-crema pt-[72px]">
      <div className="bg-cafe text-blancoRoto">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div><h1 className="font-playfair text-2xl sm:text-3xl font-semibold">Panel de Administracion</h1></div>
            <div className="flex gap-3">
              <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-blancoRoto/10 rounded-full text-sm hover:bg-blancoRoto/20"><ArrowLeft size={16} /> Ver Tienda</Link>
              <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-blancoRoto/10 rounded-full text-sm hover:bg-red-500/20">Salir</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {notice && <div role="status" className="fixed right-4 top-24 z-[60] max-w-sm rounded-lg bg-cafe px-5 py-3 text-sm text-blancoRoto shadow-lg">{notice}</div>}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm"><p className="text-sm text-grisCalido">Total Productos</p><p className="font-playfair text-2xl font-semibold text-cafe">{productos.length}</p></div>
          <div className="bg-white rounded-lg p-4 shadow-sm"><p className="text-sm text-grisCalido">Destacados</p><p className="font-playfair text-2xl font-semibold text-turquesa">{productos.filter(p => p.destacado).length}</p></div>
          <div className="bg-white rounded-lg p-4 shadow-sm"><p className="text-sm text-grisCalido">Lineas</p><p className="font-playfair text-2xl font-semibold text-lavanda">4</p></div>
          <div className="bg-white rounded-lg p-4 shadow-sm"><p className="text-sm text-grisCalido">Categorias</p><p className="font-playfair text-2xl font-semibold text-romero">{new Set(productos.map(p => p.categoria)).size}</p></div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h2 className="font-playfair text-xl font-semibold text-cafe">Productos</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportBackup} className="flex items-center gap-2 px-4 py-2 border border-arena/30 text-grisCalido rounded-full text-sm hover:border-cafe hover:text-cafe"><Download size={14} /> Respaldar</button>
            <button onClick={() => backupInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 border border-arena/30 text-grisCalido rounded-full text-sm hover:border-cafe hover:text-cafe"><FileUp size={14} /> Importar</button>
            <input ref={backupInputRef} type="file" accept=".json,application/json" className="hidden" onChange={event => { importBackup(event.target.files?.[0]); event.target.value = ''; }} />
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 border border-arena/30 text-grisCalido rounded-full text-sm hover:border-cafe hover:text-cafe"><RotateCcw size={14} /> Restaurar</button>
            <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 px-4 py-2 bg-turquesa text-white rounded-full text-sm hover:bg-turquesa/90">{showCreate ? <X size={16} /> : <Plus size={16} />} {showCreate ? 'Cancelar' : 'Nuevo'}</button>
          </div>
        </div>

        {showCreate && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-arena/20">
            <h3 className="font-playfair text-lg font-semibold text-cafe mb-4">Crear Producto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[{k:'slug',l:'Slug',t:'text',p:'lav-jabon'},{k:'name',l:'Nombre',t:'text',p:'Jabon de Lavanda'},{k:'categoria',l:'Categoria',t:'text',p:'Jabon'},{k:'price',l:'Precio CLP',t:'number',p:'4990'},{k:'weight',l:'Peso',t:'text',p:'100g'},{k:'image',l:'URL Imagen',t:'text',p:'./assets/prod.jpg'}].map(f => (
                <div key={f.k}><label className="block text-sm font-medium text-cafe mb-1">{f.l}</label><input type={f.t} value={(createForm[f.k as keyof Producto] as string|number)||''} onChange={e => setCreateForm({...createForm,[f.k]:f.t==='number'?Number(e.target.value):e.target.value})} placeholder={f.p} className="w-full px-3 py-2 border border-arena/30 rounded-lg text-sm focus:border-turquesa outline-none" /></div>
              ))}
              <div><label className="block text-sm font-medium text-cafe mb-1">Linea</label><select value={createForm.linea} onChange={e => setCreateForm({...createForm,linea:e.target.value as typeof lineas[number]})} className="w-full px-3 py-2 border border-arena/30 rounded-lg text-sm focus:border-turquesa outline-none">{lineas.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-turquesa/60 px-3 py-2 text-sm font-medium text-turquesa hover:bg-turquesa/5">
                <Upload size={16} /> Cargar imagen
                <input type="file" accept="image/*" className="hidden" onChange={event => { loadImage(event.target.files?.[0], 'create'); event.target.value = ''; }} />
              </label>
              <div className="flex items-center gap-2 pt-6"><input type="checkbox" id="d" checked={!!createForm.destacado} onChange={e => setCreateForm({...createForm,destacado:e.target.checked})} className="rounded" /><label htmlFor="d" className="text-sm text-cafe">Destacado</label></div>
              {createForm.image && <div><span className="block text-sm font-medium text-cafe mb-1">Vista previa</span><img src={createForm.image} alt="Vista previa" className="h-20 w-20 rounded object-cover" /></div>}
              <div className="sm:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-cafe mb-1">Descripcion</label><textarea value={createForm.description||''} onChange={e => setCreateForm({...createForm,description:e.target.value})} rows={2} className="w-full px-3 py-2 border border-arena/30 rounded-lg text-sm focus:border-turquesa outline-none resize-none" /></div>
              <div className="sm:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-cafe mb-1">Ingredientes</label><textarea value={createForm.ingredients||''} onChange={e => setCreateForm({...createForm,ingredients:e.target.value})} rows={2} className="w-full px-3 py-2 border border-arena/30 rounded-lg text-sm focus:border-turquesa outline-none resize-none" /></div>
              <div className="sm:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-cafe mb-1">Beneficios (separados por coma)</label><input value={createForm.benefits||''} onChange={e => setCreateForm({...createForm,benefits:e.target.value})} placeholder="Beneficio 1,Beneficio 2" className="w-full px-3 py-2 border border-arena/30 rounded-lg text-sm focus:border-turquesa outline-none" /></div>
            </div>
            <button onClick={create} className="mt-4 px-6 py-2 bg-turquesa text-white rounded-full text-sm font-medium hover:bg-turquesa/90">Crear Producto</button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-cafe/5"><tr><th className="px-4 py-3 text-xs font-medium text-grisCalido uppercase">Producto</th><th className="px-4 py-3 text-xs font-medium text-grisCalido uppercase">Linea</th><th className="px-4 py-3 text-xs font-medium text-grisCalido uppercase">Precio</th><th className="px-4 py-3 text-xs font-medium text-grisCalido uppercase">Peso</th><th className="px-4 py-3 text-xs font-medium text-grisCalido uppercase">Dest.</th><th className="px-4 py-3 text-xs font-medium text-grisCalido uppercase">Acciones</th></tr></thead>
              <tbody className="divide-y divide-arena/10">
                {productos.map(p => (
                  <tr key={p.id} className="hover:bg-crema/50">
                    {editingId === p.id ? (
                      <td colSpan={6} className="px-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {[{k:'name',l:'Nombre'},{k:'slug',l:'Slug'},{k:'price',l:'Precio',t:'number'},{k:'weight',l:'Peso'},{k:'categoria',l:'Categoria'},{k:'image',l:'URL Imagen'}].map(f => (
                            <div key={f.k}><label className="text-xs text-grisCalido">{f.l}</label><input type={f.t||'text'} value={(editForm[f.k as keyof Producto] as string|number)||''} onChange={e => setEditForm({...editForm,[f.k]:f.t==='number'?Number(e.target.value):e.target.value})} className="w-full px-3 py-1.5 border border-arena/30 rounded text-sm focus:border-turquesa outline-none" /></div>
                          ))}
                          <div><label className="text-xs text-grisCalido">Linea</label><select value={editForm.linea} onChange={e => setEditForm({...editForm,linea:e.target.value})} className="w-full px-3 py-1.5 border border-arena/30 rounded text-sm focus:border-turquesa outline-none">{lineas.map(linea => <option key={linea} value={linea}>{linea}</option>)}</select></div>
                          <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-turquesa/60 px-3 py-1.5 text-sm text-turquesa hover:bg-turquesa/5"><Upload size={15} /> Cargar imagen<input type="file" accept="image/*" className="hidden" onChange={event => { loadImage(event.target.files?.[0], 'edit'); event.target.value = ''; }} /></label>
                          <label className="flex items-center gap-2 text-sm text-cafe"><input type="checkbox" checked={!!editForm.destacado} onChange={e => setEditForm({...editForm,destacado:e.target.checked})} /> Producto destacado</label>
                          <div className="sm:col-span-2"><label className="text-xs text-grisCalido">Descripcion</label><textarea value={editForm.description||''} onChange={e => setEditForm({...editForm,description:e.target.value})} rows={2} className="w-full px-3 py-1.5 border border-arena/30 rounded text-sm focus:border-turquesa outline-none resize-none" /></div>
                          <div className="sm:col-span-2"><label className="text-xs text-grisCalido">Ingredientes</label><textarea value={editForm.ingredients||''} onChange={e => setEditForm({...editForm,ingredients:e.target.value})} rows={2} className="w-full px-3 py-1.5 border border-arena/30 rounded text-sm focus:border-turquesa outline-none resize-none" /></div>
                          <div className="sm:col-span-2"><label className="text-xs text-grisCalido">Beneficios</label><input value={editForm.benefits||''} onChange={e => setEditForm({...editForm,benefits:e.target.value})} className="w-full px-3 py-1.5 border border-arena/30 rounded text-sm focus:border-turquesa outline-none" /></div>
                          <div className="flex items-end gap-2">
                            <button onClick={() => saveEdit(p.id)} className="px-4 py-1.5 bg-turquesa text-white rounded-full text-sm flex items-center gap-1"><Check size={14} /> Guardar</button>
                            <button onClick={() => setEditingId(null)} className="px-4 py-1.5 border text-grisCalido rounded-full text-sm flex items-center gap-1"><X size={14} /> Cancelar</button>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" /><div><p className="font-medium text-cafe text-sm">{p.name}</p><p className="text-xs text-grisCalido">{p.slug}</p></div></div></td>
                        <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-[11px] font-medium text-white" style={{backgroundColor:lineaColors[p.linea]||'#6B4C3B'}}>{p.linea}</span></td>
                        <td className="px-4 py-3 text-sm font-medium text-cafe">${p.price.toLocaleString('es-CL')}</td>
                        <td className="px-4 py-3 text-sm text-grisCalido">{p.weight}</td>
                        <td className="px-4 py-3">{p.destacado ? <Star size={16} className="text-arena fill-arena" /> : <Star size={16} className="text-grisCalido/30" />}</td>
                        <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => startEdit(p)} className="p-1.5 text-cafe hover:text-turquesa"><Pencil size={15} /></button><button onClick={() => {if(confirm(`Eliminar "${p.name}"?`)) del(p.id);}} className="p-1.5 text-cafe hover:text-red-500"><Trash2 size={15} /></button></div></td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ login }: { login: (password: string) => boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  return (
    <div className="min-h-screen bg-crema flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none"><path d="M50 10 C30 25, 10 45, 10 65 C10 82, 25 92, 50 92 C75 92, 90 82, 90 65 C90 45, 70 25, 50 10Z" fill="#2BA8A8" opacity="0.9"/><path d="M50 20 C38 32, 25 48, 25 62 C25 75, 35 82, 50 82 C65 82, 75 75, 75 62 C75 48, 62 32, 50 20Z" fill="#2BA8A8"/></svg>
          <span className="font-playfair text-xl font-semibold text-cafe">KANYMAR Admin</span>
        </div>
        <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(false); }} placeholder="Contrasena de administrador" autoComplete="current-password" autoFocus className="w-full px-4 py-3 border border-arena/30 rounded-lg focus:border-turquesa outline-none text-cafe" onKeyDown={e => { if (e.key === 'Enter') { if (!login(password)) setError(true); } }} />
        {error && <p role="alert" className="text-red-500 text-sm mt-2">Contrasena incorrecta</p>}
        <button onClick={() => { if (!login(password)) setError(true); }} className="w-full mt-4 py-3 bg-turquesa text-white rounded-full font-medium hover:bg-turquesa/90">Ingresar</button>
        <Link to="/" className="mt-4 block text-center text-xs text-grisCalido hover:text-turquesa">Volver a la tienda</Link>
      </div>
    </div>
  );
}
