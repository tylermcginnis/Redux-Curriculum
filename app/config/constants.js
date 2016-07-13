import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC9YdZKs8uOXbwvB-_2WihnO4BfBC29x2E",
  authDomain: "would-you-rather-d79ad.firebaseapp.com",
  databaseURL: "https://would-you-rather-d79ad.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth