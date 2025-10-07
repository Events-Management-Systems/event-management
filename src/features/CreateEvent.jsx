import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/common/FormInput";
import SelectInput from "../components/common/SelectInput";
import { events } from "../api/axios";

export default function CreateEvent() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const initialValues = {
        title: "",
        date: "",
        time: "",
        venue: "",
        image: "",
        video: "",
        category: "",
        description1: "",
        description2: "",
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        date: Yup.string().required("Date is required"),
        time: Yup.string().required("Time is required"),
        venue: Yup.string().required("Venue is required"),
        description1: Yup.string().required("Short description is required"),
    });

    async function handleSubmit(values, { resetForm }) {
        setSubmitting(true);
        setError("");
        try {
            const payload = { id: Date.now().toString(), ...values };
            await events.createEvent(payload);
            resetForm();
            // navigate back to events list after successful create
            navigate("/events");
        } catch (err) {
            console.error(err);
            setError("Failed to create event. Make sure the backend server is running.");
        } finally {
            setSubmitting(false);
        }
    }

    const categoryOptions = ["Music", "Festival", "Tech", "Sports", "Food", "Other"];

    return (
        <div className="min-h-screen bg-gray-50 p-6 pt-12 flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <FormInput name="title" label="Event Title" placeholder="Enter event title" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormInput name="date" label="Date" type="date" />
                                <FormInput name="time" label="Time" type="time" />
                                <FormInput name="venue" label="Venue" placeholder="Location or hall" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput name="image" label="Image URL" placeholder="https://..." />
                                <FormInput name="video" label="Video URL (optional)" placeholder="https://..." />
                            </div>

                            <SelectInput name="category" label="Category" options={categoryOptions} />

                            <FormInput name="description1" label="Short Description" placeholder="Short summary" />
                            <FormInput name="description2" label="Detailed Description" placeholder="More details" />

                            {error && <p className="text-red-600 mb-2">{error}</p>}

                            <div className="flex gap-3 justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    disabled={submitting}
                                >
                                    {submitting ? "Creating..." : "Create Event"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
