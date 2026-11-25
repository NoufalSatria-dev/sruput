import menu from '../seed/menu.json';import users from '../seed/users.json';import stock from '../seed/stock.json';import orders from '../seed/orders.json';
const KEY='sruput-v1';
export function load(){const raw=localStorage.getItem(KEY);if(raw!==null){try{const data=JSON.parse(raw); for(const p of data.menu){if(!Object.hasOwn(p,"image"))p.image=menu.find(m=>m.id===p.id)?.image||""} save(data); return data}catch{throw new Error('Data lokal rusak. Cadangkan lalu hapus key sruput-v1 melalui DevTools.')}}const data=structuredClone({menu,users,stock,orders});save(data);return data}
export function save(data){localStorage.setItem(KEY,JSON.stringify(data))}
export const money=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)
export const day=()=>new Date().toLocaleDateString('en-CA')
