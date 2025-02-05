import { query, addDoc, getDocs, collection, writeBatch } from "firebase/firestore";
import { db } from "./firestore.js";

/** The properties of the AppointmentDocData object are as follows 
 *  (this object is used in formData):
 * @typedef {Object} AppointmentDocData
 * @property {string} id - the appointment's document id in Firestore
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} pronouns
 * @property {string} otherPronouns
 * @property {string} school
 * @property {string} contactMethod - client's preferred contact method
 * @property {string} email
 * @property {string} phone
 * @property {string} photoPackage
 * @property {Date} date - date of the appointment
 * @property {Array<string>} locations - array of shoot locations
 */


/**
 * Queries firestore db for all Appointments and returns the 
 * Appointment data in an array of Object with fields as properties 
 * @returns {[AppointmentDocData]}
 */
async function getBookedAppointments() {
    const q = query(collection(db, "appointments"));
    var querySnapshot = await getDocs(q)
    // bundle each doc's firestore ID with field values
    var bookedApts = querySnapshot.docs.map((apt) => {
      return { ...apt.data(), id: apt.id };
    });
    return bookedApts;
}

/**
 * Deletes all documents from the Appointments collection
 */
async function deleteAllBookedAppointments() {
  const collectionRef = db.collection("appointments");
  try {
    // Get all documents in the collection
    const snapshot = await collectionRef.get();
    
    // Loop through each document and delete it
    snapshot.forEach(async (doc) => {
      doc.ref.delete();
    });
    
  } catch (error) {
    console.error('Error deleting documents: ', error);
  }

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
      date: formData.date,
      locations: formData.locations
    };
    addDoc(collection(db, "appointments"), appointmentData);
  }

export { getBookedAppointments, bookAppointment, deleteAllBookedAppointments }