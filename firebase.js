const firebaseConfig = {
  apiKey: "AIzaSyDm5joBc7dicQrPvrmtH_v-RMhkQrIPcxY",
  authDomain: "nexalum-1.firebaseapp.com",
  databaseURL: "https://nexalum-1-default-rtdb.firebaseio.com",
  projectId: "nexalum-1",
  storageBucket: "nexalum-1.appspot.com",
  messagingSenderId: "418037039727",
  appId: "1:418037039727:web:8f0d8ed7c00cdf613f039a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let userId = localStorage.getItem('userId');
if (!userId) {
  userId = 'user_' + Date.now();
  localStorage.setItem('userId', userId);
}

function getBalance() {
  db.ref('users/' + userId + '/balance').once('value').then(snapshot => {
    const balance = snapshot.val() || 0;
    document.getElementById('balance').innerText = balance.toFixed(2);
  });
}

function updateBalance(amount) {
  db.ref('users/' + userId + '/balance').transaction(current => {
    return (current || 0) + amount;
  }).then(() => {
    getBalance();
  });
}

getBalance();
