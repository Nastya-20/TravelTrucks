import { Link } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [loading, setLoading] = useState(false); // Створюємо стан для контролю завантаження

  const handleClick = () => {
    setLoading(true); // Встановлюємо стан завантаження в true
    setTimeout(() => setLoading(false), 2000); // Симулюємо затримку завантаження
  };

  return (
    <div className={css.container}>
      <div className={css.titleWraper}>
        <h1 className={css.HeroTitle}>Campers of your dreams</h1>
        <h2 className={css.HeroText}>
          You can find everything you want in our catalog
        </h2>
        <Link to="/catalog">
          <button onClick={handleClick} className={css.HeroBtn}>
            View Now
          </button>
        </Link>
        {loading && <Loader />}{" "}
        {/* Показуємо Loader, якщо завантаження активне */}
      </div>
    </div>
  );
}
