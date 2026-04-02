import React, { useState } from "react";
import axios from "axios";

const PlacesForm = () => {
  const [formData, setFormData] = useState({
    name: { en: "", kn: "" },
    description: { en: "", kn: "" },
    culturalStory: { en: "", kn: "" },
    travelTips: { en: "", kn: "" },

    category: "",
    category_icon: "📍",

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
    contactInfo: "",

    isVerified: false,
    verifiedLocal: false,
    isFamilyRun: false,
  });

  // 🔥 Handle nested + normal fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 🔥 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        lat: Number(formData.lat),
        lng: Number(formData.lng),

        location: {
          type: "Point",
          coordinates: [Number(formData.lng), Number(formData.lat)],
        },

        tags: formData.tags.split(",").map((t) => t.trim()),
        images: formData.images.split(",").map((i) => i.trim()),

        rating: Number(formData.rating),
        authenticityScore: Number(formData.authenticityScore),
      };

      await axios.post("/api/places", payload);

      alert("Place added successfully 🚀");
    } catch (err) {
      console.error(err);
      alert("Error adding place");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Place</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          name="name.en"
          placeholder="Name (English)"
          onChange={handleChange}
          className="input"
        />
        <input
          name="name.kn"
          placeholder="Name (Kannada)"
          onChange={handleChange}
          className="input"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description.en"
          placeholder="Description (EN)"
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="description.kn"
          placeholder="Description (KN)"
          onChange={handleChange}
          className="input"
        />

        {/* CULTURE + TIPS */}
        <textarea
          name="culturalStory.en"
          placeholder="Cultural Story (EN)"
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="travelTips.en"
          placeholder="Travel Tips (EN)"
          onChange={handleChange}
          className="input"
        />

        {/* BASIC INFO */}
        <input name="category" placeholder="Category" onChange={handleChange} className="input" />
        <input name="city" placeholder="City" onChange={handleChange} className="input" />
        <input name="citySlug" placeholder="City Slug" onChange={handleChange} className="input" />

        {/* LOCATION */}
        <input name="lat" placeholder="Latitude" onChange={handleChange} className="input" />
        <input name="lng" placeholder="Longitude" onChange={handleChange} className="input" />

        {/* ARRAYS */}
        <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} className="input" />
        <input name="images" placeholder="Image URLs (comma separated)" onChange={handleChange} className="input" />

        {/* NUMBERS */}
        <input name="rating" placeholder="Rating" onChange={handleChange} className="input" />
        <input name="authenticityScore" placeholder="Authenticity Score" onChange={handleChange} className="input" />

        {/* EXTRA */}
        <input name="openingHours" placeholder="Opening Hours" onChange={handleChange} className="input" />
        <input name="bestTimeToVisit" placeholder="Best Time" onChange={handleChange} className="input" />
        <input name="address" placeholder="Address" onChange={handleChange} className="input" />

        {/* CHECKBOXES */}
        <label>
          <input type="checkbox" name="isVerified" onChange={handleChange} />
          Verified
        </label>

        <label>
          <input type="checkbox" name="verifiedLocal" onChange={handleChange} />
          Verified Local
        </label>

        <label>
          <input type="checkbox" name="isFamilyRun" onChange={handleChange} />
          Family Run
        </label>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PlacesForm;
