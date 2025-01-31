import { query, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firestore.js";

/**
 * Queries firestore db for all Appointments and returns the 
 * Appointment data in an array of Object with fields as properties 
 * @returns [ {id : ..., field1 : ..., field2...} ] - array of Objects
 * each containing an appointment's fields and firestore ID as properties 
 */
async function getBookedAppointments() {
    const q = query(collection(db, "appointments"));
    var querySnapshot = await getDocs(q)
    // bundle each doc's firestore ID with field values
    var bookedApts = querySnapshot.docs.map((apt) => {return { ...apt.data(), id: apt.id }});
    return bookedApts;
}

/**
 * Posts an Appointment to firestore db
 * @param {Object} formData - Shoot form data with appointment properties
 */
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