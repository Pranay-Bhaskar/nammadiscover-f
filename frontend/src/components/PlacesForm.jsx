import React, { useState } from "react";
import { createPlace } from '../services/placeService';
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
    city: "",
    citySlug: "",

    lat: "",
    lng: "",

    tags: "",
    images: "",

    rating: "",
    authenticityScore: "",

    openingHours: "",
    bestTimeToVisit: "",
    address: "",

    isFamilyRun: false,
  });

  const [loading, setLoading] = useState(false);

  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name_en.trim()) return toast.error("Name is required");
    if (!form.category) return toast.error("Category is required");
    if (!form.lat || !form.lng) return toast.error("Location required");

    try {
      setLoading(true);

      const payload = {
        name: {
          en: form.name_en,
          kn: form.name_kn,
        },
        description: {
          en: form.description_en,
          kn: form.description_kn,
        },
        culturalStory: {
          en: form.culturalStory_en,
        },
        travelTips: {
          en: form.travelTips_en,
        },

        category: form.category,
        city: form.city,
        citySlug: form.citySlug,

        lat: Number(form.lat),
        lng: Number(form.lng),

        location: {
          type: "Point",
          coordinates: [Number(form.lng), Number(form.lat)],
        },

        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        images: form.images.split(",").map((i) => i.trim()).filter(Boolean),

        rating: Number(form.rating || 0),
        authenticityScore: Number(form.authenticityScore || 0),

        openingHours: form.openingHours,
        bestTimeToVisit: form.bestTimeToVisit,
        address: form.address,

        isFamilyRun: form.isFamilyRun,
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
        city: "",
        citySlug: "",
        lat: "",
        lng: "",
        tags: "",
        images: "",
        rating: "",
        authenticityScore: "",
        openingHours: "",
        bestTimeToVisit: "",
        address: "",
        isFamilyRun: false,
      });

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vu-card">
      <h2 className="vu-card-title">📍 Add a Place</h2>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <div className="vu-form-group">
          <label className="vu-label">Name (English)*</label>
          <input className="vu-input" name="name_en" value={form.name_en} onChange={handleField} />
        </div>

        <div className="vu-form-group">
          <label className="vu-label">Name (Kannada)</label>
          <input className="vu-input" name="name_kn" value={form.name_kn} onChange={handleField} />
        </div>

        {/* CATEGORY */}
        <div className="vu-form-group">
          <label className="vu-label">Category*</label>
          <input className="vu-input" name="category" value={form.category} onChange={handleField} />
        </div>

        {/* DESCRIPTION */}
        <div className="vu-form-group">
          <label className="vu-label">Description</label>
          <textarea className="vu-input" name="description_en" value={form.description_en} onChange={handleField} />
        </div>

        {/* LOCATION */}
        <div className="vu-form-row">
          <div className="vu-form-group">
            <label className="vu-label">Latitude*</label>
            <input type="number" step="any" className="vu-input" name="lat" value={form.lat} onChange={handleField} />
          </div>

          <div className="vu-form-group">
            <label className="vu-label">Longitude*</label>
            <input type="number" step="any" className="vu-input" name="lng" value={form.lng} onChange={handleField} />
          </div>
        </div>

        {/* TAGS */}
        <div className="vu-form-group">
          <label className="vu-label">Tags</label>
          <input className="vu-input" name="tags" value={form.tags} onChange={handleField} />
        </div>

        {/* IMAGES */}
        <div className="vu-form-group">
          <label className="vu-label">Image URLs</label>
          <input className="vu-input" name="images" value={form.images} onChange={handleField} />
        </div>

        {/* CHECK */}
        <div className="vu-form-group">
          <label className="vu-label">
            <input type="checkbox" name="isFamilyRun" onChange={handleField} />
            Family Run
          </label>
        </div>

        <button className="vu-btn-primary" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Submitting..." : "🚀 Submit Place"}
        </button>
      </form>
    </div>
  );
}
