import { query, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firestore.js";

function getBookedAppointments() {
    const q = query(collection(db, "appointments"));
    var bookedApts = []
    getDocs(q).then((appointments) => {
      appointments.forEach((apt) => {    
        bookedApts.push(apt.data());
      });
    });
    
    return bookedApts;
}

function bookAppointment (formData) {
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