"use client";

import styles from "../styles/feedback.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2 className={styles.hashtag}>#RAYSYOURGLASS</h2>
        <p>
        You'll find us perched up on the rooftop of the Linton Apartments located on Linton 
        <br/>
        Street, Kangaroo Point  – {" "}
          <strong>Access through reception.</strong>
        </p>
        
        <p>95 Linton Street, Kangaroo Point 4169</p>
        <p>hello@sunsets.space</p>

        <p className={styles.hoursTitle}>Opening Hours</p>
        <p>Thursday ~ Saturday | 12pm ~ 10pm</p>
        <p>Sunday | 12pm ~ 8:30pm</p>
      </div>
    </footer>
  );
}

