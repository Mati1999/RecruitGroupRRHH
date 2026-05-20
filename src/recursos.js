import { create } from "zustand";
import { persist } from "zustand/middleware";
// firestore
import { query, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore/lite";
import { db, storage } from "./firebase/firebaseConfig";
import { listAll } from "firebase/storage";
// storage
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const uploadFile = async (path, file) => {
  if (typeof file === "object" && file !== null) {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }
  return null; // Si no es un archivo, devuelve null
};

const setResourceHelper = async (dbName, object, bolOrCand) => {
  try {
    if (bolOrCand.toLowerCase() === "bolsa") {
      const docRef = await addDoc(collection(db, dbName), object);
      const updateRef = doc(db, dbName, docRef.id);
      await updateDoc(updateRef, { ...object, id: docRef.id });
      return docRef;
    } else {
      // candidatos
      try {
        const idFirestore = object.idFirestore;

        // Subir y obtener URLs de descarga de los archivos
        object.cv = await uploadFile(`${idFirestore}/CV-${idFirestore}`, object.cv);
        object.aptoPsico = await uploadFile(`${idFirestore}/aptoPsico-${idFirestore}`, object.aptoPsico);
        object.foto = await uploadFile(`${idFirestore}/foto-${idFirestore}`, object.foto);

        const docRef = await addDoc(collection(db, dbName), object);
        const updateRef = doc(db, dbName, docRef.id);
        await updateDoc(updateRef, { ...object, id: docRef.id });
        return [docRef, object];
      } catch (e) {
        console.error("Error al procesar candidato:", e);
        throw e; // Re-lanza el error para que el bloque de nivel superior también lo capture
      }
    }
  } catch (e) {
    console.error("Error general en setResourceHelper:", e);
    throw e; // Re-lanza el error para un manejo más robusto
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
    const updateRef = doc(db, dbName, object.id);
    try {
      const updateData = { ...object };
      delete updateData.id;

      if (candidato) {
        if (typeof candidato.cv === "object") {
          if (candidato.cv.type === "application/pdf") {
            const response = candidato.cv;
            const mountainsRef = ref(storage, `${object.id}/CV-${candidato.email}`);
            const snapshot = await uploadBytes(mountainsRef, response);
            const urlDescarga = await getDownloadURL(snapshot.ref);
            candidato.cv = urlDescarga;
          } else {
            console.error("Error: El archivo subido no es un PDF.");
            return { error: "El archivo debe ser un PDF." };
          }
        }
        const candidatosActuales = object.candidatos || []; // Obtener el array actual o un array vacío si no existe
        if (!candidatosActuales.some((cand) => cand.email === candidato.email)) {
          const candidatosActualizados = [...candidatosActuales, candidato]; // Agregar el nuevo candidato
          updateData.candidatos = candidatosActualizados;
        }
        await updateDoc(updateRef, updateData);
        return object;
      } else if (idDeleteCandidato) {
        // eliminar archivo de storage
        if (idDeleteCandidato.cv) {
          const deleteRef = ref(storage, `${object.id}/CV-${idDeleteCandidato.email}`);

          deleteObject(deleteRef)
            .then(() => {})
            .catch((error) => {
              console.error(error);
            });
        }
        await updateDoc(updateRef, { candidatos: filteredBolsaCand[1] });
        object = { ...object, candidatos: filteredBolsaCand[1] };
        return object;
      } else {
        await updateDoc(updateRef, updateData);
        return object;
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  } else {
    //update candidatos
    try {
      const updateRef = doc(db, dbName, object.id);
      const updateData = { ...object };
      delete updateData.id;

      if (
        object.idFirestore &&
        (typeof object.cv === "object" || typeof object.aptoPsico === "object" || typeof object.foto === "object")
      ) {
        let mountainsRef = ref(storage, `${object.idFirestore}/CV-${object.idFirestore}`);
        if (typeof object.cv === "object") {
          const snapshot = await uploadBytes(mountainsRef, object.cv);
          const urlDescarga = await getDownloadURL(snapshot.ref);
          updateData.cv = urlDescarga;
        }
        mountainsRef = ref(storage, `${object.idFirestore}/aptoPsico-${object.idFirestore}`);
        if (typeof object.aptoPsico === "object") {
          const snapshotPsico = await uploadBytes(mountainsRef, object.aptoPsico);
          const urlDescargaPsico = await getDownloadURL(snapshotPsico.ref);
          updateData.aptoPsico = urlDescargaPsico;
        }
        mountainsRef = ref(storage, `${object.idFirestore}/foto-${object.idFirestore}`);
        if (typeof object.foto === "object") {
          const snapshotFoto = await uploadBytes(mountainsRef, object.foto);
          const urlDescargaFoto = await getDownloadURL(snapshotFoto.ref);
          updateData.foto = urlDescargaFoto;
        }
      }
      await updateDoc(updateRef, updateData);
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

        const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
        await Promise.all(deletePromises);
      } catch (error) {
        console.error(`Error al listar o eliminar archivos`, error);
      }

      await deleteDoc(doc(db, "BolsaDeTrabajo", object.id));
    } else {
      if (object.idFirestore) {
        const deleteRef = ref(storage, `${object.idFirestore}/`);
        try {
          const res = await listAll(deleteRef);

          const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
          await Promise.all(deletePromises);
        } catch (error) {
          console.error(`Error al listar o eliminar archivos`, error);
        }
      }

      await deleteDoc(doc(db, "Candidatos", object.id));
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

// Función para ordenar bolsas por nombre
const sortBolsasByName = (array) => {
  const sorted = [...array];
  sorted.sort((a, b) => {
    return (a.nombre || "").localeCompare(b.nombre || "");
  });
  return sorted;
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
        newBolsa.push({ ...doc.data(), id: doc.id });
      });

      // Aplicar sort
      const sortedBolsa = sortBolsasByName(newBolsa);
      set(() => ({ bolsa: sortedBolsa }));
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
    let helperResult;
    try {
      if (candidato) {
        helperResult = await updateResourceHelper("BolsaDeTrabajo", updatedBolsa, candidato, false, "bolsa", "");

        if (helperResult.error) {
          console.error(helperResult.error);
          return helperResult;
        } else {
          let serultBolsa = get().bolsa.map((bol) => (bol.id === helperResult.id ? helperResult : bol));
          set(() => ({ bolsa: serultBolsa }));
        }
      } else if (idDeleteCandidato) {
        const getRef = doc(db, "BolsaDeTrabajo", updatedBolsa.id);
        const bolsaSnap = await getDoc(getRef);

        if (bolsaSnap.exists()) {
          const bolsaData = bolsaSnap.data();
          const candidatosActuales = bolsaData.candidatos || [];

          // 2. Filtrar el array de candidatos
          const filteredCandidatos = candidatosActuales.filter((cand) => cand.email !== idDeleteCandidato.email);

          // 3. Llamar a updateResourceHelper para actualizar Firestore
          helperResult = await updateResourceHelper(
            "BolsaDeTrabajo",
            { id: updatedBolsa.id }, // Solo necesitamos el ID para la actualización
            null, // candidato es null para la eliminación
            idDeleteCandidato,
            "bolsa",
            [bolsaData, filteredCandidatos]
          );

          // 4. Actualizar el estado local (opcional, dependiendo de cómo uses 'get' y 'set')
          let serultBolsa = get().bolsa.map((bol) =>
            bol.id === updatedBolsa.id ? { ...bol, candidatos: filteredCandidatos } : bol
          );
          set(() => ({ bolsa: serultBolsa }));
        } else {
          console.error("No se encontró la bolsa de trabajo con el ID:", updatedBolsa.id);
          return;
        }
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
        newCandidatos.push({ ...doc.data(), id: doc.id });
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

export const useResource = create(
  persist(resource, {
    name: "store",
    partialize: (state) => {
      const persistedState = { ...state }; // Creamos una copia del estado

      if (!state.logedIn) {
        // Si no está logueado, eliminamos los campos sensibles de la bolsa
        if (persistedState.bolsa && Array.isArray(persistedState.bolsa)) {
          persistedState.bolsa = persistedState.bolsa
            .filter((oferta) => oferta.closed === "open")
            .map((oferta) => {
              const { candidatos: _candidatos, ...rest } = oferta;
              return rest;
            });
        }

        // Si no está logueado, eliminamos los campos sensibles de los candidatos
        if (persistedState.candidatos && Array.isArray(persistedState.candidatos)) {
          persistedState.candidatos = persistedState.candidatos.map((candidato) => {
            const { cv: _cv, aptoPsico: _aptoPsico, idFirestore: _idFirestore, ...rest } = candidato;
            return rest;
          });
        }
      }

      return persistedState;
    }
  })
);
