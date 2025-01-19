import React, { forwardRef } from "react"; // Імпорт React та forwardRef для роботи з рефами
import { Formik, Form, Field, ErrorMessage } from "formik"; // Імпорт компонентів з Formik
import * as Yup from "yup"; // Імпорт для валідації
import DatePicker from "react-datepicker"; // Імпорт компонента DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Стилі для DatePicker
import css from "../CamperBookingForm/CamperBookingForm.module.css"; // Локальні стилі

// Створюємо кастомний компонент для поля з датою, який підтримує рефи
const CustomInput = forwardRef(({ value, onClick, placeholder, onChange }, ref) => (
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      onChange={onChange} // Передаємо обробник зміни
      placeholder={placeholder}
      className={css.dateInput} // Стиль для поля дати
    />
  )
);
CustomInput.displayName = "CustomInput";
const CamperBookingForm = () => {
  // Схема валідації для форми
  const validationSchema = Yup.object({
    name: Yup.string().required("*Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("*Email is required"),
    calendar: Yup.date()
      .required("*Booking date is required")
      .min(new Date(), "You must select a future date!"), // Валідація на минулі дати
    message: Yup.string(),
  });

  // Початкові значення форми
  const initialValues = {
    name: "",
    email: "",
    calendar: null, // Поле для дати
    message: "",
  };

  // Функція обробки надсилання форми
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data:", values); // Логування даних у консоль
    alert("Booking request submitted successfully!"); // Сповіщення користувача
    resetForm(); // Скидання форми
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className={css.camperBookingForm}>
          {/* Заголовок форми */}
          <h2 className={css.camperBookingTitle}>Book your campervan now</h2>
          <p className={css.camperBookingText}>
            Stay connected! We are always ready to help you.
          </p>

          {/* Поле для введення імені */}
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage} // Відображення помилки
          />
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="Name*"
            className={touched.name && errors.name ? "error" : ""}
          />

          {/* Поле для введення email */}
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage} // Відображення помилки
          />
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            className={touched.email && errors.email ? "error" : ""}
          />

          {/* Поле для вибору дати */}
          <ErrorMessage
            name="calendar"
            component="div"
            className={css.errorMessage} // Відображення помилки
          />
          <div className={touched.calendar && errors.calendar ? "error" : ""}>
            <DatePicker
              selected={values.calendar} // Вибрана дата
              onChange={(date) => setFieldValue("calendar", date)} // Оновлення дати
              dateFormat="yyyy-MM-dd" // Формат дати
              placeholderText="Booking Date*"
              minDate={new Date()} // Обмеження на вибір дати
              customInput={
                <CustomInput
                  value={values.calendar}
                  onChange={(e) => setFieldValue("calendar", e.target.value)} // Обробка зміни
                  placeholder="Booking Date*"
                />
              } // Кастомний інпут
              popperPlacement="bottom"
              isClearable // Дозволяє очистити поле
            />
          </div>

          {/* Поле для введення повідомлення */}
          <ErrorMessage
            name="message"
            component="div"
            className={css.errorMessage} // Відображення помилки
          />
          <Field
            as="textarea"
            id="message"
            name="message"
            rows="8"
            placeholder="Comment"
            className={touched.message && errors.message ? "error" : ""}
          />

          {/* Кнопка для відправки форми */}
          <button className={css.formBtn} type="submit">
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CamperBookingForm;
