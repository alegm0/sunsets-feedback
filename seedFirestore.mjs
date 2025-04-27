// scripts/seedFirestore.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG798w6agqB_bKJDMYlG8-ixsACgx5DYw",
  authDomain: "sunsets-feedback.firebaseapp.com",
  projectId: "sunsets-feedback",
  storageBucket: "sunsets-feedback.firebasestorage.app",
  messagingSenderId: "119088001424",
  appId: "1:119088001424:web:2284f89122f11969910315",
  measurementId: "G-98KZKP7VHQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const experiences = ["amazing", "good", "okay", "bad"];
const services = ["excellent", "friendly", "unaware", "poor"];
const musicOptions = ["perfect", "too_loud", "not_my_taste", "chill"];
const bookings = ["smooth", "miscommunication", "cancellation_fee"];
const recommends = ["yes", "maybe", "no"];
const foodComments = [
  "Steak was overcooked.",
  "Cocktails were amazing!",
  "The sushi was so fresh!",
  "Food was okay, but the view was better.",
  "Loved the pork belly!",
  "Drinks were beautifully presented.",
  "Tacos lacked flavor.",
  "Dessert was the highlight of the night.",
  "Burger was a bit dry.",
  "Nachos were perfect for sharing.",
];
const staffComments = [
  "Patrick was amazing!",
  "Waitress seemed overwhelmed.",
  "Staff was kind and attentive.",
  "Hosts were really welcoming.",
  "Service was a bit slow.",
  "Bartender was a vibe!",
  "Manager checked in, appreciated that.",
  "Felt a bit ignored.",
  "Service was efficient.",
  "Waiters had great menu knowledge.",
];
const otherComments = [
  "",
  "Too noisy for a date night.",
  "Table wasn’t ready on time.",
  "Loved the sunset view!",
  "Please add more vegan options.",
  "Music was too loud to talk.",
  "Will definitely return!",
  "Felt a bit rushed.",
  "Best rooftop in Brisbane.",
  "A bit pricey but worth it.",
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function seedData() {
  for (let i = 0; i < 50; i++) {
    await addDoc(collection(db, "feedbacks"), {
      experience: random(experiences),
      service: random(services),
      music: random(musicOptions),
      booking: random(bookings),
      recommend: random(recommends),
      food: random(foodComments),
      staff: random(staffComments),
      other: random(otherComments),
      timestamp: Timestamp.now(),
    });
  }
  console.log("✅ Seed completo: 50 feedbacks añadidos.");
}

seedData();
