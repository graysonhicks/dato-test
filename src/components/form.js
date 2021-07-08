import React from "react";
import { useForm } from "react-hook-form";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`/api/form`, {
      method: `POST`,
      body: JSON.stringify(data),
      headers: {
        "content-type": `application/json`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        alert(
          `Successful response from API: ${body.firstName} ${body.lastName}`
        );
      });
  };

  console.log(errors);
  return (
    <div className="form">
      <h2>Form Demo</h2>
      <p>
        Data from this form gets passed to the serverless function in
        src/api/form.js. Brought to you by Gatsby Functions!
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first-name">First Name</label>
        <input
          aria-label="first name"
          id="first-name"
          type="text"
          {...register("firstName", { required: true, maxLength: 80 })}
        />
        <label htmlFor="last-name">Last Name</label>
        <input
          aria-label="last name"
          id="last-name"
          type="text"
          {...register("lastName", { required: true, maxLength: 80 })}
        />
        <button type="submit">
          Submit{" "}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
          </svg>
        </button>
      </form>
      <p>
        You should now be able to see the form values in the Function logs in
        Gatsby Cloud!
      </p>
    </div>
  );
};

export default Form;
