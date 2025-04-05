import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const CampersCatalogPage = lazy(() =>
  import("../../pages/CampersCatalogPage/CampersCatalogPage")
);
const CamperDetailsPage = lazy(() =>
 import("../../pages/CamperDetailsPage/CamperDetailsPage")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));
const CamperFeatures = lazy(() =>
  import("../../components/CamperFeatures/CamperFeatures")
);
const CamperReviews = lazy(() =>
  import("../CamperReviews/CamperReviews")
);

const CamperBookingForm = lazy(() => import("../CamperBookingForm/CamperBookingForm"));

const App = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CampersCatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />}>
            <Route path="features" element={<CamperFeatures />} />
            <Route path="reviews" element={<CamperReviews />} />
            <Route path="reviews" element={<CamperBookingForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
