{/*

import React, { useState, useEffect } from "react"; // Added useEffect
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

  // ✨ AUTOMATIC LOCATION FETCHING
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
          }));
          toast.success("Location detected automatically!");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not auto-fetch location. Please enter manually.");
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

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
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        images: form.images.split(",").map((i) => i.trim()).filter(Boolean),
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
      background: "var(--glass)",
      backdropFilter: "blur(14px)",
      padding: "24px",
      borderRadius: "var(--radius)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow)",
      maxWidth: "800px",
      margin: "auto",
      transition: "var(--transition)",
    },

    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "20px",
      fontFamily: "var(--font-head)",
      color: "var(--text)",
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
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      fontSize: "14px",
      background: "var(--glass-2)",
      color: "var(--text)",
      outline: "none",
    },

    textarea: {
      padding: "10px 12px",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      fontSize: "14px",
      minHeight: "80px",
      background: "var(--glass-2)",
      color: "var(--text)",
      outline: "none",
    },

    button: {
      background: "var(--gradient-sunset)",
      color: "#fff",
      padding: "12px",
      border: "none",
      borderRadius: "var(--radius-sm)",
      fontWeight: "600",
      cursor: "pointer",
      transition: "var(--transition)",
      boxShadow: "var(--glow-or)",
    },

    disabledBtn: {
      opacity: 0.6,
      cursor: "not-allowed",
      boxShadow: "none",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>📍 Add a Place</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* NAME *
        <div style={styles.group}>
          <label>Name (English)*</label>
          <input style={styles.input} name="name_en" value={form.name_en} onChange={handleField} />
        </div>

        <div style={styles.group}>
          <label>Name (Kannada)</label>
          <input style={styles.input} name="name_kn" value={form.name_kn} onChange={handleField} />
        </div>

        {/* CATEGORY *
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

        {/* DESCRIPTION *
        <div style={styles.group}>
          <label>Description</label>
          <textarea style={styles.textarea} name="description_en" value={form.description_en} onChange={handleField} />
        </div>

        {/* LOCATION - Now auto-filled by useEffect *
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

        {/* CITY *
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

        {/* TAGS *
        <div style={styles.group}>
          <label>Tags</label>
          <input style={styles.input} name="tags" value={form.tags} onChange={handleField} />
        </div>

        {/* IMAGES *
        <div style={styles.group}>
          <label>Image URLs</label>
          <input style={styles.input} name="images" value={form.images} onChange={handleField} />
        </div>

        {/* EXTRA *
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
            ...(loading ? styles.disabledBtn : {}),
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "🚀 Submit Place"}
        </button>
      </form>
    </div>
  );
}


*/}



//new


import React, { useEffect, useState } from "react";
import { createPlace } from "../services/placeService";
import toast from "react-hot-toast";

const initialForm = {
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
};

export default function PlacesForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          lat: String(position.coords.latitude),
          lng: String(position.coords.longitude),
        }));
        toast.success("Location detected automatically!");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Could not auto-fetch location. Please enter manually.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name_en.trim()) {
      return toast.error("Name is required");
    }

    if (!form.category.trim()) {
      return toast.error("Category is required");
    }

    if (!form.lat || !form.lng) {
      return toast.error("Location is required");
    }

    const lat = Number(form.lat);
    const lng = Number(form.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return toast.error("Invalid coordinates");
    }

    try {
      setLoading(true);

      const payload = {
        name: {
          en: form.name_en.trim(),
          kn: form.name_kn.trim(),
        },
        description: {
          en: form.description_en.trim(),
          kn: form.description_kn.trim(),
        },
        culturalStory: {
          en: form.culturalStory_en.trim(),
        },
        travelTips: {
          en: form.travelTips_en.trim(),
        },
        category: form.category.trim(),
        subcategory: form.subcategory.trim(),
        city: form.city.trim(),
        district: form.district.trim(),

        latitude: lat,
        longitude: lng,

        location: {
          type: "Point",
          coordinates: [lng, lat],
        },

        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

        images: form.images
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),

        rating: form.rating ? Number(form.rating) : 0,
        authenticityScore: form.authenticityScore
          ? Number(form.authenticityScore)
          : 0,

        openingHours: form.openingHours.trim(),
        bestTimeToVisit: form.bestTimeToVisit.trim(),
        entryFee: form.entryFee.trim(),
        address: form.address.trim(),
      };

      await createPlace(payload);

      toast.success("Place submitted! Awaiting approval.");

      if (onSuccess) {
        onSuccess();
      }

      setForm(initialForm);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    card: {
      background: "var(--glass)",
      backdropFilter: "blur(14px)",
      padding: "24px",
      borderRadius: "var(--radius)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow)",
      maxWidth: "800px",
      margin: "auto",
      transition: "var(--transition)",
    },
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "20px",
      fontFamily: "var(--font-head)",
      color: "var(--text)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    row: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
    },
    group: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      flex: 1,
      minWidth: "220px",
    },
    input: {
      padding: "10px 12px",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      fontSize: "14px",
      background: "var(--glass-2)",
      color: "var(--text)",
      outline: "none",
    },
    textarea: {
      padding: "10px 12px",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      fontSize: "14px",
      minHeight: "80px",
      background: "var(--glass-2)",
      color: "var(--text)",
      outline: "none",
      resize: "vertical",
    },
    button: {
      background: "var(--gradient-sunset)",
      color: "#fff",
      padding: "12px",
      border: "none",
      borderRadius: "var(--radius-sm)",
      fontWeight: "600",
      cursor: "pointer",
      transition: "var(--transition)",
      boxShadow: "var(--glow-or)",
    },
    disabledBtn: {
      opacity: 0.6,
      cursor: "not-allowed",
      boxShadow: "none",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>📍 Add a Place</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.group}>
          <label>Name (English)*</label>
          <input
            style={styles.input}
            name="name_en"
            value={form.name_en}
            onChange={handleField}
            placeholder="Enter place name in English"
          />
        </div>

        <div style={styles.group}>
          <label>Name (Kannada)</label>
          <input
            style={styles.input}
            name="name_kn"
            value={form.name_kn}
            onChange={handleField}
            placeholder="Enter place name in Kannada"
          />
        </div>

        <div style={styles.row}>
          <div style={styles.group}>
            <label>Category*</label>
            <input
              style={styles.input}
              name="category"
              value={form.category}
              onChange={handleField}
              placeholder="Food, Temple, Trek..."
            />
          </div>

          <div style={styles.group}>
            <label>Subcategory</label>
            <input
              style={styles.input}
              name="subcategory"
              value={form.subcategory}
              onChange={handleField}
              placeholder="Dosa, Waterfall, Fort..."
            />
          </div>
        </div>

        <div style={styles.group}>
          <label>Description (English)</label>
          <textarea
            style={styles.textarea}
            name="description_en"
            value={form.description_en}
            onChange={handleField}
            placeholder="Write a short description"
          />
        </div>

        <div style={styles.group}>
          <label>Description (Kannada)</label>
          <textarea
            style={styles.textarea}
            name="description_kn"
            value={form.description_kn}
            onChange={handleField}
            placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರ ಬರೆಯಿರಿ"
          />
        </div>

        <div style={styles.group}>
          <label>Cultural Story</label>
          <textarea
            style={styles.textarea}
            name="culturalStory_en"
            value={form.culturalStory_en}
            onChange={handleField}
            placeholder="Historical or cultural background"
          />
        </div>

        <div style={styles.group}>
          <label>Travel Tips</label>
          <textarea
            style={styles.textarea}
            name="travelTips_en"
            value={form.travelTips_en}
            onChange={handleField}
            placeholder="Best route, parking, food nearby..."
          />
        </div>

        <div style={styles.row}>
          <div style={styles.group}>
            <label>Latitude*</label>
            <input
              type="number"
              step="any"
              style={styles.input}
              name="lat"
              value={form.lat}
              onChange={handleField}
              placeholder="12.9716"
            />
          </div>

          <div style={styles.group}>
            <label>Longitude*</label>
            <input
              type="number"
              step="any"
              style={styles.input}
              name="lng"
              value={form.lng}
              onChange={handleField}
              placeholder="77.5946"
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.group}>
            <label>City</label>
            <input
              style={styles.input}
              name="city"
              value={form.city}
              onChange={handleField}
              placeholder="Bengaluru"
            />
          </div>

          <div style={styles.group}>
            <label>District</label>
            <input
              style={styles.input}
              name="district"
              value={form.district}
              onChange={handleField}
              placeholder="Bengaluru Urban"
            />
          </div>
        </div>

        <div style={styles.group}>
          <label>Tags</label>
          <input
            style={styles.input}
            name="tags"
            value={form.tags}
            onChange={handleField}
            placeholder="heritage, sunrise, dosa"
          />
        </div>

        <div style={styles.group}>
          <label>Image URLs</label>
          <input
            style={styles.input}
            name="images"
            value={form.images}
            onChange={handleField}
            placeholder="https://img1..., https://img2..."
          />
        </div>

        <div style={styles.row}>
          <div style={styles.group}>
            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              style={styles.input}
              name="rating"
              value={form.rating}
              onChange={handleField}
              placeholder="4.5"
            />
          </div>

          <div style={styles.group}>
            <label>Authenticity Score</label>
            <input
              type="number"
              step="0.1"
              style={styles.input}
              name="authenticityScore"
              value={form.authenticityScore}
              onChange={handleField}
              placeholder="9.0"
            />
          </div>
        </div>

        <div style={styles.group}>
          <label>Opening Hours</label>
          <input
            style={styles.input}
            name="openingHours"
            value={form.openingHours}
            onChange={handleField}
            placeholder="6 AM - 10 PM"
          />
        </div>

        <div style={styles.group}>
          <label>Best Time to Visit</label>
          <input
            style={styles.input}
            name="bestTimeToVisit"
            value={form.bestTimeToVisit}
            onChange={handleField}
            placeholder="Early morning"
          />
        </div>

        <div style={styles.group}>
          <label>Entry Fee</label>
          <input
            style={styles.input}
            name="entryFee"
            value={form.entryFee}
            onChange={handleField}
            placeholder="Free / ₹20"
          />
        </div>

        <div style={styles.group}>
          <label>Address</label>
          <input
            style={styles.input}
            name="address"
            value={form.address}
            onChange={handleField}
            placeholder="Full address"
          />
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(loading ? styles.disabledBtn : {}),
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "🚀 Submit Place"}
        </button>
      </form>
    </div>
  );
}