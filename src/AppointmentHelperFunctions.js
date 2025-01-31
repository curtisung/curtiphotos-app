import { query, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firestore.js";

async function getBookedAppointments() {
    const q = query(collection(db, "appointments"));
    var querySnapshot = await getDocs(q)
    var bookedApts = querySnapshot.docs.map((apt) => {
      return apt.data();
    });
    //   for (field in apt.data().keys()) {

    //   }
    //   return {
    //     firstName: apt.firstName,
    //     lastName: apt.lastName,
    //     pronouns: apt.pronouns,
    //     otherPronouns: apt.otherPronouns,
    //     school: apt.school,
    //     contactMethod: apt.contactMethod,
    //     email: apt.email,
    //     phone: apt.phone,
    //     photoPackage: apt.photoPackage,
    //     date: apt.date,
    //     locations: apt.locations,
    //   }
    // });
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