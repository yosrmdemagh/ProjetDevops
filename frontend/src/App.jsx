import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', quantity: '', price: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/products', form);
    }
    setForm({ name: '', description: '', quantity: '', price: '' });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestion du Stock</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="border p-2 w-full" />
        <input type="number" placeholder="Quantité" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="border p-2 w-full" />
        <input type="number" placeholder="Prix" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editId ? 'Modifier le produit' : 'Ajouter un produit'}
        </button>
      </form>

      <ul className="space-y-3">
        {products.map(product => (
          <li key={product._id} className="border p-4 rounded shadow-sm flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">{product.name}</h2>
              <p>{product.description}</p>
              <p>Quantité: {product.quantity} | Prix: {product.price} DT</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-3 py-1 rounded">Modifier</button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;