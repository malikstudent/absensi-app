// app.js
import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

document.getElementById("absensiForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const nim = document.getElementById("nim").value;
  const keterangan = document.getElementById("keterangan").value;
  const lampiranFile = document.getElementById("lampiran").files[0];

    // Reset pesan error setiap submit
  nimError.style.display = "none";
  nimError.textContent = "";

  // Validasi NIM
  const nimRegex = /^[0-9]{10,12}$/;
  if (!nimRegex.test(nim)) {
    nimError.textContent = "NIM minimal memiliki 10–12 digit!";
    nimError.style.display = "block";
    return; // hentikan submit
  }

  try {
    let lampiranURL = "";

    // Upload file jika ada (izin/sakit)
  if (lampiranFile) {
    const storageRef = ref(storage, `lampiran/${Date.now()}_${lampiranFile.name}`);
    const snapshot = await uploadBytes(storageRef, lampiranFile);
    lampiranURL = await getDownloadURL(snapshot.ref);
    }

  try {
    // Tambah data ke Firestore
    await addDoc(collection(db, "absensi"), {
      nama: nama,
      nim: nim,
      keterangan: keterangan,
      lampiran: lampiranURL || null,
      timestamp: new Date()
    });

    console.log("Data absensi berhasil disimpan!");
    alert("Absensi berhasil!");
    document.getElementById("absensiForm").reset();

    // Hapus pesan error setelah reset
    nimError.style.display = "none";

    // Refresh tabel
    loadAbsensi();

  } catch (error) {
    console.error("Error saat menyimpan data:", error);
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
      <td>
        ${data.lampiran 
          ? `<a href="${data.lampiran}" target="_blank">📎 Lihat Lampiran</a>` 
          : "-"}
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Load data awal
loadAbsensi();
