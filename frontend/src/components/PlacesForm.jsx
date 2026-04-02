import React, { useState } from "react";
import axios from "axios";

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <textarea
      {...props}
      rows={3}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-2xl p-5 space-y-4">
    <h3 className="text-lg font-bold border-b pb-2">{title}</h3>
    {children}
  </div>
);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      await axios.post("/api/places", payload);
      alert("✅ Place added");
    } catch (err) {
      console.error(err);
      alert("❌ Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Add New Place</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <Section title="Name">
            <Input name="name.en" label="English Name" onChange={handleChange} />
            <Input name="name.kn" label="Kannada Name" onChange={handleChange} />
          </Section>

          {/* DESCRIPTION */}
          <Section title="Description">
            <TextArea name="description.en" label="English Description" onChange={handleChange} />
            <TextArea name="description.kn" label="Kannada Description" onChange={handleChange} />
          </Section>

          {/* CULTURE */}
          <Section title="Cultural Info">
            <TextArea name="culturalStory.en" label="Cultural Story (EN)" onChange={handleChange} />
            <TextArea name="travelTips.en" label="Travel Tips (EN)" onChange={handleChange} />
          </Section>

          {/* BASIC */}
          <Section title="Basic Info">
            <Input name="category" label="Category" onChange={handleChange} />
            <Input name="city" label="City" onChange={handleChange} />
            <Input name="citySlug" label="City Slug" onChange={handleChange} />
          </Section>

          {/* LOCATION */}
          <Section title="Location">
            <div className="grid grid-cols-2 gap-4">
              <Input name="lat" label="Latitude" onChange={handleChange} />
              <Input name="lng" label="Longitude" onChange={handleChange} />
            </div>
          </Section>

          {/* MEDIA */}
          <Section title="Media">
            <Input name="images" label="Image URLs (comma separated)" onChange={handleChange} />
            <Input name="tags" label="Tags (comma separated)" onChange={handleChange} />
          </Section>

          {/* META */}
          <Section title="Meta">
            <Input name="rating" label="Rating" onChange={handleChange} />
            <Input name="authenticityScore" label="Authenticity Score" onChange={handleChange} />
          </Section>

          {/* EXTRA */}
          <Section title="Extra Info">
            <Input name="openingHours" label="Opening Hours" onChange={handleChange} />
            <Input name="bestTimeToVisit" label="Best Time to Visit" onChange={handleChange} />
            <Input name="address" label="Address" onChange={handleChange} />
          </Section>

          {/* FLAGS */}
          <Section title="Flags">
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="isVerified" onChange={handleChange} />
                Verified
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="verifiedLocal" onChange={handleChange} />
                Verified Local
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="isFamilyRun" onChange={handleChange} />
                Family Run
              </label>
            </div>
          </Section>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Submit Place
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlacesForm;
