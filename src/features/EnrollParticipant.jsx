
import {Formik, Form, FieldArray} from "formik";
import * as Yup from "yup";
import FormInput from "../components/common/FormInput";
import SelectInput from "../components/common/SelectInput";
import { useParams, useNavigate } from "react-router-dom";
import { events as EventsApi } from "../api/axios";
import { useEffect, useState } from "react";


const ParticipantSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "Invalid age")
    .max(120, "Invalid age"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  gender: Yup.string().required("Gender is required"),
  photo: Yup.string().required("Photo is required"),
});

const FormSchema = Yup.object().shape({
  participants: Yup.array().of(ParticipantSchema).min(1, "At least one participant is required"),
});

export default function EnrollParticipant({ onRegister }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existingParticipants, setExistingParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    EventsApi.getEventById(id)
      .then((res) => {
        setExistingParticipants(res.data.participants || []);
      })
      .catch(() => {
        setExistingParticipants([]);
      });
  }, [id]);

  return (
    <Formik
      initialValues={{
        participants: [
          { name: "", age: "", phone: "", gender: "", photo: "" },
        ],
      }}
      validationSchema={FormSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          setLoading(true);
          // Combine existing participants with newly registered ones
          const combined = [...(existingParticipants || []), ...values.participants];

          // PATCH the event to update participants key
          await EventsApi.updateEvent(id, { participants: combined });

          if (onRegister) onRegister(values.participants);
          alert("Registration successful!");
          resetForm();
          // navigate back to event info or home
          navigate("/events");
        } catch (err) {
          console.error(err);
          alert("Failed to register participant. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ values }) => (
        <Form className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-center">Register Participant</h2>

          <FieldArray name="participants">
            {({ push, remove }) => (
              <>
                {values.participants.map((_, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
                    <FormInput name={`participants[${index}].name`} label="Full Name" placeholder="Enter full name" />
                    <FormInput name={`participants[${index}].age`} type="number" label="Age" placeholder="Enter age" />
                    <FormInput name={`participants[${index}].phone`} type="tel" label="Phone" placeholder="Enter 10-digit phone" />
                    <SelectInput
                      name={`participants[${index}].gender`}
                      label="Gender"
                      options={["Male", "Female", "Other"]}
                    />
                    <FormInput name={`participants[${index}].photo`} label="Photo URL" placeholder="Enter image URL" />

                    {values.participants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove Participant
                      </button>
                    )}
                  </div>
                ))}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      push({ name: "", age: "", phone: "", gender: "", photo: "" })
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Participant
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    {loading ? "Registering..." : "Submit"}
                  </button>
                </div>
              </>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
}
