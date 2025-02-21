import { query, addDoc, getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "./firestore.js";
import dayjs from "dayjs";

/** The properties of the AppointmentDocData object are as follows 
 *  (this object is used in formData):
 * @typedef {Object} AppointmentDocData
 * @property {string} id - the appointment's document id in Firestore
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} pronouns
 * @property {string} school
 * @property {string} contactMethod - client's preferred contact method
 * @property {string} email
 * @property {string} phone
 * @property {string} photoPackageID - Identifier code for selected photo package type 
 * @property {string} photoPackageTitle - Title of selected photo package
 * @property {dayjs} date - date of the appointment
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
    // bundle each doc's firestore ID with field values and date field as dayjs objects
    var bookedApts = querySnapshot.docs.map((apt) => {
      var appointmentDocData = { ...apt.data(), id: apt.id };
      appointmentDocData.date = new dayjs(appointmentDocData.date.toDate());
      return appointmentDocData;
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
 * Posts an Appointment to firestore db.
 * @param {Object} formData - Shoot form data with appointment properties
 */
async function bookAppointment (formData) {
  // Convert date from dayjs -> firestore Timestamp type
    const appointmentData = {...formData,
      date: Timestamp.fromDate(formData.date.toDate())
    };
    addDoc(collection(db, "appointments"), appointmentData);
  }

export { getBookedAppointments, bookAppointment, deleteAllBookedAppointments }