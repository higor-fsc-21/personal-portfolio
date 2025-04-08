import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <h1>Higor Felype S. Carvalho</h1>
          <h2>Frontend Developer | React, React Native, Next.js</h2>
          <p>Building scalable, high-performance web and mobile applications</p>
        </div>
      </section>
    </main>
  );
}
