import { create } from "zustand";
import { persist } from "zustand/middleware";
// firestore
import { query, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import { db, storage } from "./firebase/firebaseConfig";
// storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const resource = (set, get) => ({
  bolsa: [],
  candidatos: [],

  getBolsa: async () => {
    try {
      const q = query(collection(db, "BolsaDeTrabajo"));
      const querySnapshot = await getDocs(q);

      let newBolsa = [];
      querySnapshot.forEach((doc) => {
        newBolsa.push({ ...doc.data(), id: doc.id });
      });
      set(() => ({ bolsa: newBolsa }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  setBolsa: async (newBolsa) => {
    try {
      const docRef = await addDoc(collection(db, "BolsaDeTrabajo"), newBolsa);
      set((resource) => ({ bolsa: [...resource.bolsa, newBolsa] }));
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  deteleBolsa: async (idBolsa) => {
    try {
      await deleteDoc(doc(db, "BolsaDeTrabajo", idBolsa));
      let filteredBolsa = get().bolsa.filter((bol) => bol.id !== idBolsa);

      set(() => ({ bolsa: filteredBolsa }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  updateBolsa: async (updatedBolsa, candidato) => {
    /******  Tener en cuenta, updatedBolsa tiene que ser el id de la bolsa que va a venir por el button de submit del form, tengo que hacer find en la bolsa y luego hacer el updated con la bolsa encontrada en el find.  *******/

    try {
      const updateRef = doc(db, "BolsaDeTrabajo", updatedBolsa.id);
      if (candidato) {
        const response = await fetch("/CV-MatiasAguilera-EN.pdf");
        const blob = await response.blob();
        let newCantidato = {
          apellido: "aguiTest",
          cv: "",
          nombre: "matiTest",
          email: "",
          motivo: "",
          telefono: ""
        };

        const mountainsRef = ref(storage, `${updatedBolsa.id}/CV-MatiasAguilera-EN.pdf`);

        const snapshot = await uploadBytes(mountainsRef, blob);
        const urlDescarga = await getDownloadURL(snapshot.ref);
        newCantidato.cv = urlDescarga;
        const candidatosActuales = updatedBolsa.candidatos || []; // Obtener el array actual o un array vacío si no existe

        const candidatosActualizados = [...candidatosActuales, newCantidato]; // Agregar el nuevo candidato
        updatedBolsa.candidatos = candidatosActualizados;
        await updateDoc(updateRef, { ...updatedBolsa, candidatos: candidatosActualizados });
      } else {
        await updateDoc(updateRef, updatedBolsa);
      }
      let filteredBolsa = get().bolsa.map((bol) => (bol.id === updatedBolsa.id ? updatedBolsa : bol));
      set(() => ({ bolsa: filteredBolsa }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  getCandidatos: async () => {
    try {
      const q = query(collection(db, "Candidatos"));
      const querySnapshot = await getDocs(q);

      let newCandidatos = [];
      querySnapshot.forEach((doc) => {
        newCandidatos.push({ ...doc.data(), id: doc.id });
      });
      set(() => ({ candidatos: newCandidatos }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  setCantidatos: async (newCandidato) => {
    try {
      const docRef = await addDoc(collection(db, "Candidatos"), newCandidato);
      set((resource) => ({ candidatos: [...resource.candidatos, newCandidato] }));
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  deteleCandidato: async (idCandidato) => {
    try {
      await deleteDoc(doc(db, "Candidatos", idCandidato));
      let filteredCandidatos = get().candidatos.filter((cand) => cand.id !== idCandidato);

      set(() => ({ candidatos: filteredCandidatos }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  updateCandidatos: async (updatedCandidato) => {
    /******  Tener en cuenta, updatedBolsa va a ser solo el candidato, de ahí saco el id y demas datos que vengan del "front" *******/

    try {
      const updateRef = doc(db, "Candidatos", updatedCandidato.id);

      const response = await fetch("/CV-MatiasAguilera-EN.pdf");
      const blob = await response.blob();

      const mountainsRef = ref(storage, `${updatedCandidato.id}/CV-MatiasAguilera-EN.pdf`);

      const snapshot = await uploadBytes(mountainsRef, blob);
      const urlDescarga = await getDownloadURL(snapshot.ref);
      updatedCandidato.cv = urlDescarga;
      await updateDoc(updateRef, updatedCandidato);

      let filteredCandidatos = get().candidatos.map((cand) =>
        cand.id === updatedCandidato.id ? updatedCandidato : cand
      );
      set(() => ({ candidatos: filteredCandidatos }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }
});

export const useResource = create(persist(resource, { name: "store" }));
