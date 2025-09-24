// app.js

const absensiList = document.getElementById("absenList");
const form = document.getElementById("absenForm");

// Tambah data absensi (Create)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const tanggal = new Date().toISOString().split("T")[0];
  const jam = new Date().toLocaleTimeString();

  await db.collection("absensi").add({
    nama,
    tanggal,
    masuk: jam,
    pulang: null
  });

  form.reset();
  loadAbsensi();
});

// Ambil semua data (Read)
async function loadAbsensi() {
  absensiList.innerHTML = "";

  const snapshot = await db.collection("absensi")
    .where("tanggal", "==", new Date().toISOString().split("T")[0])
    .get();

  snapshot.forEach(doc => {
    const data = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.nama}</td>
      <td>${data.masuk || "-"}</td>
      <td>${data.pulang || "-"}</td>
      <td>
        <button onclick="absenPulang('${doc.id}')">Pulang</button>
        <button onclick="deleteAbsensi('${doc.id}')">Hapus</button>
      </td>
    `;
    absensiList.appendChild(row);
  });
}

// Update jam pulang (Update)
async function absenPulang(id) {
  const jam = new Date().toLocaleTimeString();
  await db.collection("absensi").doc(id).update({ pulang: jam });
  loadAbsensi();
}

// Hapus data absensi (Delete)
async function deleteAbsensi(id) {
  await db.collection("absensi").doc(id).delete();
  loadAbsensi();
}

// Load pertama kali
loadAbsensi();
