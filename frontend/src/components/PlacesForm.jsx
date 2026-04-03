import React, { useState } from "react";
import { createPlace } from "../services/placeService";
import toast from "react-hot-toast";

export default function PlacesForm({ onSuccess }) {
  const [form, setForm] = useState({
    name_en: "",
    name_kn: "",
    description_en: "",
    description_kn: "",
    culturalStory_en: "",
    travelTips_en: "",
    category: "",
    subcategory: "",
    city: "",
    district: "",
    lat: "",
    lng: "",
    tags: "",
    images: "",
    rating: "",
    authenticityScore: "",
    openingHours: "",
    bestTimeToVisit: "",
    entryFee: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name_en.trim()) return toast.error("Name is required");
    if (!form.category) return toast.error("Category is required");
    if (!form.lat || !form.lng) return toast.error("Location required");

    const lat = Number(form.lat);
    const lng = Number(form.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return toast.error("Invalid coordinates");
    }

    try {
      setLoading(true);

      const payload = {
        name: { en: form.name_en, kn: form.name_kn },
        description: { en: form.description_en, kn: form.description_kn },
        culturalStory: { en: form.culturalStory_en },
        travelTips: { en: form.travelTips_en },
        category: form.category,
        subcategory: form.subcategory,
        city: form.city,
        district: form.district,
        latitude: lat,
        longitude: lng,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        images: form.images.split(",").map(i => i.trim()).filter(Boolean),
        rating: Number(form.rating || 0),
        authenticityScore: Number(form.authenticityScore || 0),
        openingHours: form.openingHours,
        bestTimeToVisit: form.bestTimeToVisit,
        entryFee: form.entryFee,
        address: form.address,
      };

      await createPlace(payload);

      toast.success("Place submitted! Awaiting approval.");

      if (onSuccess) onSuccess();

      setForm({
        name_en: "",
        name_kn: "",
        description_en: "",
        description_kn: "",
        culturalStory_en: "",
        travelTips_en: "",
        category: "",
        subcategory: "",
        city: "",
        district: "",
        lat: "",
        lng: "",
        tags: "",
        images: "",
        rating: "",
        authenticityScore: "",
        openingHours: "",
        bestTimeToVisit: "",
        entryFee: "",
        address: "",
      });

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 STYLES
  const styles = {
    card: {
      background: "#fff",
      padding: "24px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      maxWidth: "800px",
      margin: "auto",
    },
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    row: {
      display: "flex",
      gap: "16px",
    },
    group: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      flex: 1,
    },
    input: {
      padding: "10px 12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "14px",
    },
    textarea: {
      padding: "10px 12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "14px",
      minHeight: "80px",
    },
    button: {
      background: "#4f46e5",
      color: "#fff",
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      fontWeight: "600",
      cursor: "pointer",
    },
    disabledBtn: {
      opacity: 0.6,
      cursor: "not-allowed",
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>📍 Add a Place</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* NAME */}
        <div style={styles.group}>
          <label>Name (English)*</label>
          <input style={styles.input} name="name_en" value={form.name_en} onChange={handleField} />
        </div>

        <div style={styles.group}>
          <label>Name (Kannada)</label>
          <input style={styles.input} name="name_kn" value={form.name_kn} onChange={handleField} />
        </div>

        {/* CATEGORY */}
        <div style={styles.row}>
          <div style={styles.group}>
            <label>Category*</label>
            <input style={styles.input} name="category" value={form.category} onChange={handleField} />
          </div>

          <div style={styles.group}>
            <label>Subcategory</label>
            <input style={styles.input} name="subcategory" value={form.subcategory} onChange={handleField} />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div style={styles.group}>
          <label>Description</label>
          <textarea style={styles.textarea} name="description_en" value={form.description_en} onChange={handleField} />
        </div>

        {/* LOCATION */}
        <div style={styles.row}>
          <div style={styles.group}>
            <label>Latitude*</label>
            <input type="number" step="any" style={styles.input} name="lat" value={form.lat} onChange={handleField} />
          </div>

          <div style={styles.group}>
            <label>Longitude*</label>
            <input type="number" step="any" style={styles.input} name="lng" value={form.lng} onChange={handleField} />
          </div>
        </div>

        {/* CITY */}
        <div style={styles.row}>
          <div style={styles.group}>
            <label>City</label>
            <input style={styles.input} name="city" value={form.city} onChange={handleField} />
          </div>

          <div style={styles.group}>
            <label>District</label>
            <input style={styles.input} name="district" value={form.district} onChange={handleField} />
          </div>
        </div>

        {/* TAGS */}
        <div style={styles.group}>
          <label>Tags</label>
          <input style={styles.input} name="tags" value={form.tags} onChange={handleField} />
        </div>

        {/* IMAGES */}
        <div style={styles.group}>
          <label>Image URLs</label>
          <input style={styles.input} name="images" value={form.images} onChange={handleField} />
        </div>

        {/* EXTRA */}
        <div style={styles.group}>
          <label>Opening Hours</label>
          <input style={styles.input} name="openingHours" value={form.openingHours} onChange={handleField} />
        </div>

        <div style={styles.group}>
          <label>Best Time to Visit</label>
          <input style={styles.input} name="bestTimeToVisit" value={form.bestTimeToVisit} onChange={handleField} />
        </div>

        <div style={styles.group}>
          <label>Entry Fee</label>
          <input style={styles.input} name="entryFee" value={form.entryFee} onChange={handleField} />
        </div>

        <div style={styles.group}>
          <label>Address</label>
          <input style={styles.input} name="address" value={form.address} onChange={handleField} />
        </div>

        <button
          style={{
            ...styles.button,
            ...(loading ? styles.disabledBtn : {})
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "🚀 Submit Place"}
        </button>

      </form>
    </div>
  );
}
