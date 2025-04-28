"use client";

import { useEffect, useState } from "react";
import styles from "../../../styles/admin.module.css";
import { db, auth } from "../../../lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth"; 
import Image from "next/image"; // Para usar el icono de imagen
import { Timestamp } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Legend,
} from "recharts";

type Feedback = {
  id: string;
  experience: string;
  service: string;
  music: string;
  booking: string;
  recommend: string;
  food: string;
  staff: string;
  other: string;
  timestamp?: Timestamp;
};

export default function DashboardPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (loading) return;
    const unsubscribe = onSnapshot(
      query(collection(db, "feedbacks"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const feedbackList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Feedback, "id">),
        }));
        setFeedbacks(feedbackList);
      }
    );
    return () => unsubscribe();
  }, [loading]);

  const filteredFeedbacks = feedbacks.filter((f) => {
    return (
      (!selectedExperience || f.experience === selectedExperience) &&
      (!selectedService || f.service === selectedService)
    );
  });

  const totalFeedbacks = filteredFeedbacks.length;
  const recommendYes = filteredFeedbacks.filter(
    (f) => f.recommend === "yes"
  ).length;
  const avgRecommendation = totalFeedbacks
    ? Math.round((recommendYes / totalFeedbacks) * 100)
    : 0;

  

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    if (!a.timestamp || !b.timestamp) return 0;
    const aTime = (a.timestamp?.seconds ?? 0) as number;
    const bTime = (b.timestamp?.seconds ?? 0) as number;
    
    return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
  });

  if (loading)
    return <div className={styles.dashboardContainer}>Loading...</div>;




const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push("/admin"); // Te regresa al login
  } catch (error: unknown) {
    console.error("Error al cerrar sesión:", error);
  }
};

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.logoutButton} onClick={handleLogout}>
  <Image src="/salida.png" alt="Logout" width={32} height={32} />
</div>

      <h1>Admin Dashboard 📊</h1>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>Total Feedbacks</h3>
          <p>{totalFeedbacks}</p>
        </div>
        <div className={styles.statCard}>
        <h3>Happy Clients</h3>
    <p>
      {
        feedbacks.filter(
          (f) => f.experience === "amazing" || f.experience === "good"
        ).length
      }
    </p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
  
          <h2>Recommendations: {avgRecommendation}%</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Yes",
                    value: feedbacks.filter((f) => f.recommend === "yes")
                      .length,
                  },
                  {
                    name: "Maybe",
                    value: feedbacks.filter((f) => f.recommend === "maybe")
                      .length,
                  },
                  {
                    name: "No",
                    value: feedbacks.filter((f) => f.recommend === "no").length,
                  },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {/* 🎨 Aquí agregamos colores por segmento */}
                <Cell fill="#D2B48C" /> {/* Yes - beige */}
                <Cell fill="#695A46" /> {/* Maybe - peach pastel */}
                <Cell fill="#7F6A33" /> {/* No - café claro */}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
          </div>
          <div className={styles.statCard}>
          <h2>Reservation Issues</h2>
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
      { issue: "Smooth", count: feedbacks.filter(f => f.booking === "smooth").length },
      { issue: "Miscommunication", count: feedbacks.filter(f => f.booking === "miscommunication").length },
      { issue: "Cancellation Fee", count: feedbacks.filter(f => f.booking === "cancellation_fee").length },
    ]}>
      <PolarGrid />
      <PolarAngleAxis dataKey="issue" />
      <PolarRadiusAxis />
      <Radar name="Issues" dataKey="count" stroke="#a67c52" fill="#a67c52" fillOpacity={0.6} />
      <Tooltip />
    </RadarChart>
  </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.statsContainer}>
      {/* Service Quality Chart */}
      <div className={styles.statCard}>
        <h2>Service Quality</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              {
                name: "Excellent",
                value: feedbacks.filter((f) => f.service === "excellent")
                  .length,
              },
              {
                name: "Friendly",
                value: feedbacks.filter((f) => f.service === "friendly").length,
              },
              {
                name: "Unaware",
                value: feedbacks.filter((f) => f.service === "unaware").length,
              },
              {
                name: "Poor",
                value: feedbacks.filter((f) => f.service === "poor").length,
              },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#BFBDA0" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall Experience Chart */}
      <div className={styles.statCard}>
        <h2>Overall Experience</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              {
                name: "Amazing",
                value: feedbacks.filter((f) => f.experience === "amazing")
                  .length,
              },
              {
                name: "Good",
                value: feedbacks.filter((f) => f.experience === "good").length,
              },
              {
                name: "Okay",
                value: feedbacks.filter((f) => f.experience === "okay").length,
              },
              {
                name: "Bad",
                value: feedbacks.filter((f) => f.experience === "bad").length,
              },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#826553" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>

      <div className={styles.filters}>
        <label>
          Filter by Experience:
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="">All</option>
            <option value="amazing">Amazing</option>
            <option value="good">Good</option>
            <option value="okay">Just okay</option>
            <option value="bad">Not great</option>
          </select>
        </label>

        <label>
          Filter by Service:
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">All</option>
            <option value="excellent">Excellent</option>
            <option value="friendly">Friendly but slow</option>
            <option value="unaware">Unaware of menu / confused</option>
            <option value="poor">Poor</option>
          </select>
        </label>

        <label>
          Order by Date:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </label>
      </div>

      <div className={styles.feedbackList}>
        <h2>Feedback Details</h2>
        {sortedFeedbacks.map((feedback) => (
          <div key={feedback.id} className={styles.feedbackCard}>
            <p>
              <strong>Experience:</strong> {feedback.experience}
            </p>
            <p>
              <strong>Service:</strong> {feedback.service}
            </p>
            <p>
              <strong>Music:</strong> {feedback.music}
            </p>
            <p>
              <strong>Food Comment:</strong> {feedback.food}
            </p>
            <p>
              <strong>Would Recommend:</strong> {feedback.recommend}
            </p>
            {feedback.staff && (
  <p><strong>Staff Comment:</strong> {feedback.staff}</p>
)}
            {feedback.other && (
              <p>
                <strong>Extra:</strong> {feedback.other}
              </p>
            )}
            {feedback.timestamp?.toDate && (
              <p>
                <strong>Date:</strong>{" "}
                {feedback.timestamp.toDate().toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
