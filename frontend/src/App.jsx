import { useState, useEffect } from 'react';
import { Package, Clipboard, Settings, Search, Trash2, Edit2, Plus, X, Menu, LogOut } from 'lucide-react';

function App() {
  // Données de démonstration
  const initialProducts = [
    { _id: '1', name: 'Écran LCD 24"', description: 'Écran haute résolution pour PC', quantity: '15', price: '450' },
    { _id: '2', name: 'Clavier mécanique', description: 'Clavier gaming rétroéclairé', quantity: '23', price: '180' },
    { _id: '3', name: 'Souris sans fil', description: 'Souris ergonomique', quantity: '7', price: '95' },
    { _id: '4', name: 'Disque SSD 1TB', description: 'Stockage haute vitesse', quantity: '4', price: '350' },
    { _id: '5', name: 'Carte graphique', description: 'GPU pour gaming et design', quantity: '2', price: '1200' }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [form, setForm] = useState({ name: '', description: '', quantity: '', price: '' });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Simuler une mise à jour
      setProducts(products.map(p => p._id === editId ? { ...form, _id: editId } : p));
      setEditId(null);
    } else {
      // Simuler un ajout
      const newId = (Math.max(...products.map(p => parseInt(p._id))) + 1).toString();
      setProducts([...products, { ...form, _id: newId }]);
    }
    setForm({ name: '', description: '', quantity: '', price: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    // Simuler une suppression
    setProducts(products.filter(p => p._id !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setForm({ name: '', description: '', quantity: '', price: '' });
    setEditId(null);
    setShowForm(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">StockManager</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-2 rounded-md font-medium ${
                  activeTab === 'products' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                <div className="flex items-center">
                  <Clipboard className="mr-2 h-5 w-5" />
                  Produits
                </div>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-2 rounded-md font-medium ${
                  activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Paramètres
                </div>
              </button>
              <button className="px-3 py-2 rounded-md font-medium hover:bg-indigo-500">
                <div className="flex items-center">
                  <LogOut className="mr-2 h-5 w-5" />
                  Déconnexion
                </div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-500"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-indigo-700 pb-3 px-4">
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('products');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === 'products' ? 'bg-indigo-800' : 'hover:bg-indigo-600'
                }`}
              >
                <div className="flex items-center">
                  <Clipboard className="mr-2 h-5 w-5" />
                  Produits
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === 'settings' ? 'bg-indigo-800' : 'hover:bg-indigo-600'
                }`}
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Paramètres
                </div>
              </button>
              <button
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-indigo-600"
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-5 w-5" />
                  Déconnexion
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'products' && (
          <>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Gestion du Stock
                </h1>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher un produit..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {showForm ? (
                      <>
                        <X className="mr-2 h-5 w-5" />
                        Annuler
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-5 w-5" />
                        Ajouter
                      </>
                    )}
                  </button>
                </div>
              </div>

              {showForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                  <h2 className="text-lg font-semibold mb-4">
                    {editId ? "Modifier le produit" : "Ajouter un nouveau produit"}
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom du produit
                        </label>
                        <input
                          placeholder="Nom"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          placeholder="Description"
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantité
                        </label>
                        <input
                          type="number"
                          placeholder="Quantité"
                          value={form.quantity}
                          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prix (DT)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Prix"
                          value={form.price}
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={resetForm}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        {editId ? "Mettre à jour" : "Ajouter"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                {filteredProducts.length > 0 ? (
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-medium">Produit</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-medium">Description</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-medium">Quantité</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-medium">Prix</th>
                        <th className="py-3 px-4 text-center text-gray-700 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{product.name}</td>
                          <td className="py-3 px-4 text-gray-600">{product.description}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              parseInt(product.quantity) <= 5 
                                ? 'bg-red-100 text-red-800' 
                                : parseInt(product.quantity) <= 20 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {product.quantity}
                            </span>
                          </td>
                          <td className="py-3 px-4">{product.price} DT</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="p-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
                                title="Modifier"
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="p-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                                title="Supprimer"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucun produit trouvé</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Paramètres</h1>
            <p className="text-gray-600 mb-4">Page de paramètres en construction...</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Informations de l'entreprise</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                    <input 
                      type="text" 
                      placeholder="Votre entreprise" 
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input 
                      type="text" 
                      placeholder="Adresse" 
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input 
                      type="text" 
                      placeholder="Téléphone" 
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Notifications</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Alerte stock faible</span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" className="sr-only" id="toggle-1" />
                      <label htmlFor="toggle-1" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Rapport quotidien</span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" className="sr-only" id="toggle-2" />
                      <label htmlFor="toggle-2" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Notifications par email</span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" className="sr-only" id="toggle-3" />
                      <label htmlFor="toggle-3" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Seuils d'alerte</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seuil de stock faible</label>
                    <input 
                      type="number" 
                      placeholder="5" 
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seuil de réapprovisionnement</label>
                    <input 
                      type="number" 
                      placeholder="10" 
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Options d'affichage</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Produits par page</label>
                    <select className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                    <select className="border border-gray-300 rounded-lg p-2 w-full focus:ring-indigo-500 focus:border-indigo-500">
                      <option>DT (Dinar Tunisien)</option>
                      <option>EUR (Euro)</option>
                      <option>USD (Dollar US)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Enregistrer les paramètres
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Package className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 font-semibold text-gray-800">StockManager</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 StockManager. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;