import { query, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firestore.js";

async function getBookedAppointments() {
    const q = query(collection(db, "appointments"));
    var querySnapshot = await getDocs(q)
    // take docs from the query and bundle each doc's auto-generated firestore ID with field values
    var bookedApts = querySnapshot.docs.map((apt) => {return { ...apt.data(), id: apt.id }});
    return bookedApts;
}

async function bookAppointment (formData) {
    const appointmentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      pronouns: formData.pronouns,
      otherPronouns: formData.otherPronouns,
      school: formData.school,
      contactMethod: formData.contactMethod,
      email: formData.email,
      phone: formData.phone,
      photoPackage: formData.photoPackage,
      date: new Date(formData.date),
      locations: Array.from(formData.locations)
    };
    addDoc(collection(db, "appointments"), appointmentData);
  }

export { getBookedAppointments, bookAppointment }