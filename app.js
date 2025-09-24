import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const namaInput = document.getElementById("nama");
const absenButton = document.getElementById("absenBtn");
const daftarTabel = document.getElementById("daftar");
const absensiRef = collection(db, "absensi");

// Tambah data absensi (Absen Masuk)
absenButton.addEventListener("click", async () => {
  const nama = namaInput.value.trim();
  if (!nama) return alert("Nama harus diisi!");

  const jamMasuk = new Date().toLocaleTimeString("id-ID");

  await addDoc(absensiRef, {
    nama,
    jamMasuk,
    jamPulang: ""
  });

  namaInput.value = "";
});

// Baca data realtime
onSnapshot(absensiRef, (snapshot) => {
  daftarTabel.innerHTML = `
    <tr>
      <th>Nama</th>
      <th>Jam Masuk</th>
      <th>Jam Pulang</th>
      <th>Aksi</th>
    </tr>
  `;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const row = `
      <tr>
        <td>${data.nama}</td>
        <td>${data.jamMasuk}</td>
        <td>${data.jamPulang || "-"}</td>
        <td>
          <button onclick="pulang('${id}')">Pulang</button>
          <button onclick="hapus('${id}')">Hapus</button>
        </td>
      </tr>
    `;
    daftarTabel.innerHTML += row;
  });
});

// Update jam pulang
window.pulang = async (id) => {
  const jamPulang = new Date().toLocaleTimeString("id-ID");
  const docRef = doc(db, "absensi", id);
  await updateDoc(docRef, { jamPulang });
};

// Hapus data
window.hapus = async (id) => {
  const docRef = doc(db, "absensi", id);
  await deleteDoc(docRef);
};
