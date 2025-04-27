import styles from "../styles/feedback.module.css";
import FeedbackForm from "./FeedbackForm";
export default function FeedbackSection() {
  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <h1 className={styles.title}>FEEDBACK</h1>
      </div>

      <div className={styles.beigeArea}>
        <p className={styles.intro}>
          <strong>
            <em>We value your opinion:</em>
          </strong>{" "}
          Let us know how your experience was at Sunsets. Your feedback helps us
          improve and provide you with the best service possible.
        </p>

        <FeedbackForm />
      </div>
    </section>
  );
}
