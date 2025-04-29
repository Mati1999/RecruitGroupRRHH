import { create } from "zustand";
import { persist } from "zustand/middleware";
// firestore
import { query, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import { db, storage } from "./firebase/firebaseConfig";
import { listAll } from "firebase/storage";
// storage
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const setResourceHelper = async (dbName, object, bolOrCand) => {
  try {
    if (bolOrCand.toLowerCase() === "bolsa") {
      const docRef = await addDoc(collection(db, dbName), object);
      const updateRef = doc(db, dbName, docRef.id);
      await updateDoc(updateRef, { ...object, id: docRef.id });
      return docRef;
    } else {
      //candidatos
      try {
        let mountainsRef = ref(storage, `${object.idFirestore}/CV-${object.idFirestore}`);
        // CUANDO PUEDAS OPTIMIZAR LO DE ABAJO PARA HACER UNA FUNCIÓN QUE EJECUTE LAS SUBIDAS A LA DB
        if (typeof object.cv === "object") {
          const snapshotCv = await uploadBytes(mountainsRef, object.cv);
          const urlDescargaCV = await getDownloadURL(snapshotCv.ref);
          object.cv = urlDescargaCV;
        }
        if (typeof object.aptoPsico === "object") {
          mountainsRef = ref(storage, `${object.idFirestore}/aptoPsico-${object.idFirestore}`);
          const snapshotPsico = await uploadBytes(mountainsRef, object.aptoPsico);
          const urlDescargaPsico = await getDownloadURL(snapshotPsico.ref);
          object.aptoPsico = urlDescargaPsico;
        }
        if (typeof object.foto === "object") {
          mountainsRef = ref(storage, `${object.idFirestore}/foto-${object.idFirestore}`);
          const snapshotFoto = await uploadBytes(mountainsRef, object.foto);
          const urlDescargaFoto = await getDownloadURL(snapshotFoto.ref);
          object.foto = urlDescargaFoto;
        }

        const docRef = await addDoc(collection(db, dbName), object);
        const updateRef = doc(db, dbName, docRef.id);
        await updateDoc(updateRef, { ...object, id: docRef.id });
        return [docRef, object];
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }
  } catch (e) {
    console.error("Error fetching data:", e);
  }
};

/**
 *
 * @param {*} dbName nombre de la base de datos
 * @param {*} object objeto a actualizar
 * @param {*} candidato booleano "true" si se agrega un candidato a la bolsa, "false" si se va a eliminar el candidato
 * @param {*} idDeleteCandidato id del candidato a eliminar
 * @param {*} bolOrCand "bolsa" o "candidato" si se va a realizar un update de uno u otro
 * @param {*} filteredBolsaCand array que contiene el objeto de la bolsa y el array de candidatos filtrados
 * @returns
 */

// helperResult = await updateResourceHelper("BolsaDeTrabajo", updatedBolsa, candidato, false, "bolsa", "");
const updateResourceHelper = async (dbName, object, candidato, idDeleteCandidato, bolOrCand, filteredBolsaCand) => {
  if (bolOrCand.toLowerCase() === "bolsa") {
    console.log(dbName);
    console.log(object.id);

    const updateRef = doc(db, dbName, object.id);
    try {
      if (candidato) {
        if (typeof candidato.cv === "object") {
          const response = candidato.cv;
          const mountainsRef = ref(storage, `${object.id}/CV-${candidato.email}`);
          const snapshot = await uploadBytes(mountainsRef, response);
          const urlDescarga = await getDownloadURL(snapshot.ref);
          candidato.cv = urlDescarga;
        }
        const candidatosActuales = object.candidatos || []; // Obtener el array actual o un array vacío si no existe
        if (!candidatosActuales.some((cand) => cand.email === candidato.email)) {
          const candidatosActualizados = [...candidatosActuales, candidato]; // Agregar el nuevo candidato
          object.candidatos = candidatosActualizados;
        }
        await updateDoc(updateRef, object);
        return object;
      } else if (idDeleteCandidato) {
        //eliminar archivo de storage
        if (idDeleteCandidato.cv) {
          const deleteRef = ref(storage, `${object.id}/CV-${idDeleteCandidato.email}`);

          deleteObject(deleteRef)
            .then(() => {
              console.log("eliminado con éxito");
            })
            .catch((error) => {
              console.error(error);
            });
        }
        await updateDoc(updateRef, { ...filteredBolsaCand[0], candidatos: filteredBolsaCand[1] });
        object = { ...object, candidatos: filteredBolsaCand[1] };
        return object;
      } else {
        console.log("object", object);

        await updateDoc(updateRef, object);
        return object;
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  } else {
    //update candidatos
    try {
      const updateRef = doc(db, dbName, object.id);

      if (
        object.idFirestore &&
        (typeof object.cv === "object" || typeof object.aptoPsico === "object" || typeof object.foto === "object")
      ) {
        let mountainsRef = ref(storage, `${object.idFirestore}/CV-${object.idFirestore}`);
        if (typeof object.cv === "object") {
          const snapshot = await uploadBytes(mountainsRef, object.cv);
          const urlDescarga = await getDownloadURL(snapshot.ref);
          object.cv = urlDescarga;
        }
        mountainsRef = ref(storage, `${object.idFirestore}/aptoPsico-${object.idFirestore}`);
        if (typeof object.aptoPsico === "object") {
          const snapshotPsico = await uploadBytes(mountainsRef, object.aptoPsico);
          const urlDescargaPsico = await getDownloadURL(snapshotPsico.ref);
          object.aptoPsico = urlDescargaPsico;
        }
        mountainsRef = ref(storage, `${object.idFirestore}/foto-${object.idFirestore}`);
        if (typeof object.foto === "object") {
          const snapshotFoto = await uploadBytes(mountainsRef, object.foto);
          const urlDescargaFoto = await getDownloadURL(snapshotFoto.ref);
          object.foto = urlDescargaFoto;
        }
      }
      await updateDoc(updateRef, object);
      return object;
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }
};

const deleteResourceHelper = async (isBolsa, object) => {
  try {
    if (isBolsa) {
      // eliminar archivo de storage
      const deleteRef = ref(storage, `${object.id}/`);
      try {
        const res = await listAll(deleteRef);
        console.log(res);

        const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
        await Promise.all(deletePromises);
        console.log(`Todos los archivos fueron eliminados con éxito.`);
      } catch (error) {
        console.error(`Error al listar o eliminar archivos`, error);
      }

      await deleteDoc(doc(db, "BolsaDeTrabajo", object.id));
    } else {
      if (object.idFirestore) {
        const deleteRef = ref(storage, `${object.idFirestore}/`);
        try {
          const res = await listAll(deleteRef);
          console.log(res);

          // const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
          // await Promise.all(deletePromises);
          console.log(`Todos los archivos fueron eliminados con éxito.`);
        } catch (error) {
          console.error(`Error al listar o eliminar archivos`, error);
        }
      }

      // await deleteDoc(doc(db, "Candidatos", object.id));
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

const resource = (set, get) => ({
  bolsa: [],
  candidatos: [],
  logedIn: false,
  setLogedIn: (loged) => set(() => ({ logedIn: loged })),

  getBolsa: async () => {
    try {
      const q = query(collection(db, "BolsaDeTrabajo"));
      const querySnapshot = await getDocs(q);

      let newBolsa = [];
      querySnapshot.forEach((doc) => {
        newBolsa.push({ ...doc.data() });
      });
      set(() => ({ bolsa: newBolsa }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  /**
   *
   * @param {*} newBolsa: recibe un objeto con los datos de la bolsa
   */
  setBolsa: async (newBolsa) => {
    try {
      let docRef = await setResourceHelper("BolsaDeTrabajo", newBolsa, "bolsa");
      set((resource) => ({ bolsa: [...resource.bolsa, { ...newBolsa, id: docRef.id }] }));
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  /**
   *
   * @param {*} idBolsa: recibe el id de la bolsa
   */
  deteleBolsa: async (idBolsa) => {
    try {
      await deleteResourceHelper(true, idBolsa);
      let filteredBolsa = get().bolsa.filter((bol) => bol.id !== idBolsa.id);

      set(() => ({ bolsa: filteredBolsa }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },

  /**
   *
   * @param {*} updatedBolsa: recibe un objeto con los datos de la bols
   * @param {*} candidato: recibe un objeto con los datos del candidato
   * @param {*} idDeleteCandidato: recibe el id del candidato
   */
  updateBolsa: async (updatedBolsa, candidato, idDeleteCandidato) => {
    /****** IMPORTANTE!!!  Tener en cuenta, updatedBolsa tiene que ser el id de la bolsa que va a venir por el button de submit del form, tengo que hacer find en la bolsa y luego hacer el updated con la bolsa encontrada en el find.  *******/
    let helperResult;
    try {
      if (candidato) {
        // IMPORTANTE, cuando haga el cambio del parámetro a un id, tengo que hacer el find o filter correspondiente y mandarlo a la función helper

        // IMPORTANTE, "candidato" es el objeto del candidato a agregar en la bolsa
        helperResult = await updateResourceHelper("BolsaDeTrabajo", updatedBolsa, candidato, false, "bolsa", "");
      } else if (idDeleteCandidato) {
        let filteredBolsa = get().bolsa.find((bol) => bol.id === updatedBolsa.id);
        let filteredCandidatos = filteredBolsa.candidatos.filter((cand) => cand.email !== idDeleteCandidato.email);
        helperResult = await updateResourceHelper(
          "BolsaDeTrabajo",
          updatedBolsa,
          candidato,
          idDeleteCandidato,
          "bolsa",
          [filteredBolsa, filteredCandidatos]
        );
      } else {
        helperResult = await updateResourceHelper("BolsaDeTrabajo", updatedBolsa, false, false, "bolsa", "");
      }
      let serultBolsa = get().bolsa.map((bol) => (bol.id === helperResult.id ? helperResult : bol));
      set(() => ({ bolsa: serultBolsa }));
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
        console.log({ ...doc.data() });

        newCandidatos.push({ ...doc.data() });
      });
      set(() => ({ candidatos: newCandidatos }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  setCantidatos: async (newCandidato) => {
    try {
      if (newCandidato.cv || newCandidato.aptoPsico || newCandidato.foto) {
        const newId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
        newCandidato.idFirestore = newId;
      }
      let docRef = await setResourceHelper("Candidatos", newCandidato, "candidato");
      set((resource) => ({ candidatos: [...resource.candidatos, { ...docRef[1], id: docRef[0].id }] }));
      console.log("Document written with ID: ", docRef[0].id);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  deteleCandidato: async (candidato) => {
    // candidato tiene que ser un objeto con id y el email para eliminar el archivo de storage
    try {
      await deleteResourceHelper(false, candidato);
      let filteredCandidatos = get().candidatos.filter((cand) => cand.id !== candidato.id);

      set(() => ({ candidatos: filteredCandidatos }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },
  updateCandidatos: async (updatedCandidato) => {
    /******  Tener en cuenta, updatedBolsa va a ser solo el candidato, de ahí saco el id y demas datos que vengan del "front" *******/
    let helperResult;
    try {
      if (!updatedCandidato.idFirestore) {
        const newId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
        updatedCandidato.idFirestore = newId;
      }

      helperResult = await updateResourceHelper("Candidatos", updatedCandidato, false, false, "candidato", "");

      let filteredCandidatos = get().candidatos.map((cand) => (cand.id === helperResult.id ? helperResult : cand));

      set(() => ({ candidatos: filteredCandidatos }));
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }
});

export const useResource = create(persist(resource, { name: "store" }));
