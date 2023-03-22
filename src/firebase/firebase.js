import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const storageRef = storage.ref();

//MUSIC FIRE STORE ACTIONS
export const uploadSong = ({ song, image }) => {
  return storageRef
    .child(`music/${song.name}`)
    .put(song)
    .then((snapshot) =>
      snapshot.ref.getDownloadURL().then((url) => {
        db.collection('music').add({
          link: url,
          name: song.name,
          cover: image,
        });
        return { link: url, name: song.name, cover: image };
      }),
    );
};

export const getMusicUrls = () => {
  return db
    .collection('music')
    .get()
    .then((data) => {
      let music = [];
      data.forEach((item) =>
        music.push({
          ...item.data(),
        }),
      );
      return music;
    });
};
