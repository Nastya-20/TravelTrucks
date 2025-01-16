import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from '../CamperBookingForm/CamperBookingForm.module.css';

const CamperBookingForm = () => {
  // Схема валідації
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    calendar: Yup.date().required("Booking date is required"),
    message: Yup.string(),
  });

  // Ініціалізація форми
  const initialValues = {
    name: "",
    email: "",
    calendar: "",
    message: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data:", values);
    alert("Booking request submitted successfully!");
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.camperBookingForm}>
          <h2 className={css.camperBookingTitle}>Book your campervan now</h2>
          <p className={css.camperBookingText}>
            Stay connected! We are always ready to help you.
          </p>
          <label className={css.nameForm} htmlFor="name">
            Name*
          </label>
          <Field
            type="text"
            id="name"
            name="name"
            className={touched.name && errors.name ? "error" : ""}
          />
          <ErrorMessage
            name="name"
            component="div"
            className={css.erroMessage}
          />

          <label className={css.nameForm} htmlFor="email">
            Email*
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            className={touched.email && errors.email ? "error" : ""}
          />
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />

          <label className={css.nameForm} htmlFor="calendar">
            Booking Date*
          </label>
          <Field
            type="date"
            id="calendar"
            name="calendar"
            className={touched.calendar && errors.calendar ? "error" : ""}
          />
          <ErrorMessage
            name="calendar"
            component="div"
            className={css.erroMessage}
          />

          <label htmlFor="message">Comment</label>
          <Field
            as="textarea"
            id="message"
            name="message"
            rows="8"
            className={touched.message && errors.message ? "error" : ""}
          />
          <ErrorMessage
            name="message"
            component="div"
            className={css.erroMessage}
          />

          <button className={css.formBtn} type="submit">
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CamperBookingForm;
