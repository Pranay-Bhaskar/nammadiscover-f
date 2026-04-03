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

    // 🔴 VALIDATIONS
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
        subcategory: form.subcategory,

        city: form.city,
        district: form.district,

        // ✅ FIXED
        latitude: lat,
        longitude: lng,

        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

        images: form.images
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),

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

      // RESET
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
      console.error(err);
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
        <input
          placeholder="Name (English)*"
          name="name_en"
          value={form.name_en}
          onChange={handleField}
        />

        <input
          placeholder="Name (Kannada)"
          name="name_kn"
          value={form.name_kn}
          onChange={handleField}
        />

        {/* CATEGORY */}
        <input
          placeholder="Category*"
          name="category"
          value={form.category}
          onChange={handleField}
        />

        <input
          placeholder="Subcategory"
          name="subcategory"
          value={form.subcategory}
          onChange={handleField}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          name="description_en"
          value={form.description_en}
          onChange={handleField}
        />

        {/* LOCATION */}
        <input
          type="number"
          step="any"
          placeholder="Latitude*"
          name="lat"
          value={form.lat}
          onChange={handleField}
        />

        <input
          type="number"
          step="any"
          placeholder="Longitude*"
          name="lng"
          value={form.lng}
          onChange={handleField}
        />

        {/* CITY */}
        <input
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleField}
        />

        <input
          placeholder="District"
          name="district"
          value={form.district}
          onChange={handleField}
        />

        {/* TAGS */}
        <input
          placeholder="Tags (comma separated)"
          name="tags"
          value={form.tags}
          onChange={handleField}
        />

        {/* IMAGES */}
        <input
          placeholder="Image URLs (comma separated)"
          name="images"
          value={form.images}
          onChange={handleField}
        />

        {/* EXTRA */}
        <input
          placeholder="Opening Hours"
          name="openingHours"
          value={form.openingHours}
          onChange={handleField}
        />

        <input
          placeholder="Best Time to Visit"
          name="bestTimeToVisit"
          value={form.bestTimeToVisit}
          onChange={handleField}
        />

        <input
          placeholder="Entry Fee"
          name="entryFee"
          value={form.entryFee}
          onChange={handleField}
        />

        <input
          placeholder="Address"
          name="address"
          value={form.address}
          onChange={handleField}
        />

        <button disabled={loading}>
          {loading ? "Submitting..." : "🚀 Submit Place"}
        </button>
      </form>
    </div>
  );
}
