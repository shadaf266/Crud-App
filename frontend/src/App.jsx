import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api/product";

const emptyForm = { name: "", price: "", description: "", category: "" };

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setProducts(await getProducts());
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    let ignore = false;
    getProducts()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      price: product.price ?? "",
      description: product.description || "",
      category: product.category || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      if (editingId === id) resetForm();
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Products</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required min="0" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">{editingId ? "Update product" : "Add product"}</button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ₹{p.price} {p.category && `(${p.category})`}{" "}
            <button onClick={() => handleEdit(p)}>Edit</button>{" "}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
