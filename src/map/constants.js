const CATEGORIES = [
  { id: "food", label: "Food", labelKn: "ಆಹಾರ", icon: "🍛", color: "#E07B39" },
  { id: "stay", label: "Stay", labelKn: "ವಸತಿ", icon: "🏨", color: "#5B8DB8" },
  {
    id: "shop",
    label: "Shops",
    labelKn: "ಅಂಗಡಿಗಳು",
    icon: "🛍",
    color: "#9B59B6",
  },
  {
    id: "hidden_gem",
    label: "Hidden Gems",
    labelKn: "ಗುಪ್ತ ರತ್ನಗಳು",
    icon: "💎",
    color: "#27AE60",
  },
  {
    id: "local_pick",
    label: "Local Picks",
    labelKn: "ಸ್ಥಳೀಯ ಆಯ್ಕೆ",
    icon: "🧺",
    color: "#F39C12",
  },
  {
    id: "nature",
    label: "Nature",
    labelKn: "ಪ್ರಕೃತಿ",
    icon: "🌿",
    color: "#2980B9",
  },
  {
    id: "temple",
    label: "Temples",
    labelKn: "ದೇವಾಲಯಗಳು",
    icon: "🛕",
    color: "#E74C3C",
  },
  {
    id: "heritage",
    label: "Heritage",
    labelKn: "ಪರಂಪರಾ",
    icon: "🏛",
    color: "#8E6B3E",
  },
  {
    id: "photo_spot",
    label: "Photo Spots",
    labelKn: "ಫೋಟೋ ತಾಣ",
    icon: "📸",
    color: "#EC407A",
  },
];

const CITIES = [
  { name: "Bengaluru", coords: [12.9716, 77.5946], namekn: "ಬೆಂಗಳೂರು" },
  { name: "Mysuru", coords: [12.2958, 76.6394], namekn: "ಮೈಸೂರು" },
  { name: "Coorg", coords: [12.3375, 75.8069], namekn: "ಕೊಡಗು" },
  { name: "Chikmagalur", coords: [13.3161, 75.772], namekn: "ಚಿಕ್ಕಮಗಳೂರು" },
  { name: "Hampi", coords: [15.335, 76.46], namekn: "ಹಂಪಿ" },
  { name: "Udupi", coords: [13.3409, 74.7517], namekn: "ಉಡುಪಿ" },
  { name: "Gokarna", coords: [14.5479, 74.3188], namekn: "ಗೋಕರ್ಣ" },
  { name: "Mangalore", coords: [12.9141, 74.856], namekn: "ಮಂಗಳೂರು" },
];

export { CATEGORIES, CITIES };