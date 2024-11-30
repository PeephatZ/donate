import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQsswH0CP_9SzxpElrQ2EfoGGHfZhitPQ",
    authDomain: "donation-system-995fc.firebaseapp.com",
    projectId: "donation-system-995fc",
    storageBucket: "donation-system-995fc.firebasestorage.app",
    messagingSenderId: "837045403340",
    appId: "1:837045403340:web:2934ed4705a9d64dda0c69",
    measurementId: "G-5BNEFBWM7C"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Handle form submission
const form = document.getElementById('donationForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Save to Firebase
    const donationRef = ref(db, 'donations');
    push(donationRef, { name, message }).then(() => {
        alert('ข้อความของคุณถูกส่งเรียบร้อยแล้ว!');
        form.reset();
    });
});

import { onValue } from 'firebase/database';

const messagesRef = ref(db, 'donations');
onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const display = document.getElementById('messageDisplay');
    display.innerHTML = ''; // ล้างข้อความเก่า

    if (messages) {
        Object.values(messages).forEach((msg) => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `${msg.name}: ${msg.message}`;
            display.appendChild(messageDiv);
        });
    }
});

