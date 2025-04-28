"use client";

import { useState } from "react";
import styles from "../styles/feedback.module.css";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    experience: "",
    service: "",
    music: "",
    booking: "",
    food: "",
    staff: "",
    recommend: "",
    other: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.experience) newErrors.experience = "Required";
    if (!formData.service) newErrors.service = "Required";
    if (!formData.music) newErrors.music = "Required";
    if (!formData.booking) newErrors.booking = "Required";
    if (!formData.recommend) newErrors.recommend = "Required";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        ...formData,
        timestamp: Timestamp.now(),
      });
      setSuccessMessage("Feedback sent successfully");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setSuccessMessage("");
      }, 3000);

      setFormData({
        experience: "",
        service: "",
        music: "",
        booking: "",
        food: "",
        staff: "",
        recommend: "",
        other: "",
      });
    } catch (error) {
      alert("Error sending feedback 😢");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>We’d love your feedback</h2>

      {showPopup && (
        <div className={styles.popupBackdrop}>
          <div className={styles.popupBox}>
            <div className={styles.popupIcon}>✓</div>
            <p className={styles.popupText}>{successMessage}</p>
          </div>
        </div>
      )}

      {[
        { label: "Overall Experience:", name: "experience" },
        { label: "How was the service?", name: "service" },
        {
          label: "What did you think about the music and atmosphere?",
          name: "music",
        },
        { label: "Any issues with your reservation?", name: "booking" },
        { label: "Would you recommend Sunsets?", name: "recommend" },
      ].map(({ label, name }) => (
        <div key={name} className={styles.fieldGroup}>
          <label className={styles.label}>{label}</label>
          <select
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select</option>
            {name === "experience" && (
              <>
                <option value="amazing">Amazing 🌟</option>
                <option value="good">Good 😊</option>
                <option value="okay">Just okay 😐</option>
                <option value="bad">Not great 😞</option>
              </>
            )}
            {name === "service" && (
              <>
                <option value="excellent">Excellent</option>
                <option value="friendly">Friendly but slow</option>
                <option value="unaware">Unaware of menu / confused</option>
                <option value="poor">Poor</option>
              </>
            )}
            {name === "music" && (
              <>
                <option value="perfect">Perfect vibe</option>
                <option value="too_loud">Too loud</option>
                <option value="not_my_taste">Not my style</option>
                <option value="chill">Relaxed & nice</option>
              </>
            )}
            {name === "booking" && (
              <>
                <option value="smooth">Smooth & easy</option>
                <option value="miscommunication">
                  Miscommunication / No table
                </option>
                <option value="cancellation_fee">
                  Unclear cancellation policy
                </option>
              </>
            )}
            {name === "recommend" && (
              <>
                <option value="yes">Absolutely!</option>
                <option value="maybe">Maybe</option>
                <option value="no">Not really</option>
              </>
            )}
          </select>
          {errors[name] && <span className={styles.error}>{errors[name]}</span>}
        </div>
      ))}

      <div className={styles.fieldGroup}>
        <label className={styles.label}>How was the food and drinks?</label>
        <textarea
          placeholder="Tell us what you loved or what could be better..."
          name="food"
          value={formData.food}
          onChange={handleChange}
          className={styles.textarea}
          rows={3}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Any standout staff or service moments?
        </label>
        <textarea
          placeholder="Let us know!"
          name="staff"
          value={formData.staff}
          onChange={handleChange}
          className={styles.textarea}
          rows={2}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Anything else you’d like to share?
        </label>
        <textarea
          placeholder="We’re all ears "
          name="other"
          value={formData.other}
          onChange={handleChange}
          className={styles.textarea}
          rows={2}
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Feedback"}
      </button>
    </form>
  );
}
