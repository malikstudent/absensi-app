// app.js
import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.getElementById("absensiForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const nim = document.getElementById("nim").value;
  const keterangan = document.getElementById("keterangan").value;

  try {
    // Tambah data ke Firestore
    await addDoc(collection(db, "absensi"), {
      nama: nama,
      nim: nim,
      keterangan: keterangan,
      timestamp: new Date()
    });

    console.log("✅ Data absensi berhasil disimpan!");
    alert("Absensi berhasil!");
    document.getElementById("absensiForm").reset();

    // Refresh tabel
    loadAbsensi();

  } catch (error) {
    console.error("❌ Error saat menyimpan data:", error);
    alert("Gagal menyimpan data, cek console!");
  }
});

async function loadAbsensi() {
  const querySnapshot = await getDocs(collection(db, "absensi"));
  const tbody = document.querySelector("#absensiTable tbody");
  tbody.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = `<tr>
      <td>${data.nama}</td>
      <td>${data.nim}</td>
      <td>${data.keterangan}</td>
      <td>${data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : ""}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Load data awal
loadAbsensi();
