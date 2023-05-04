import { initializeApp } from "firebase/app";
import { ref, onUnmounted } from 'vue'

const firebaseConfig = {

  apiKey: "AIzaSyDgIXeRPbnpJAX30yMJ3SvwytzXVE25Llo",
  authDomain: "eansform.firebaseapp.com",
  databaseURL: "https://eansform-default-rtdb.firebaseio.com",
  projectId: "eansform",
  storageBucket: "eansform.appspot.com",
  messagingSenderId: "900213460303",
  appId: "1:900213460303:web:8faf9c28069debea5b093a",
  measurementId: "G-W6FKLTD5VJ"

};


const firebaseApp = initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}