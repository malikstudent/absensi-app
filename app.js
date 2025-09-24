const absenForm = document.getElementById("absenForm");
const listAbsensi = document.getElementById("listAbsensi");

// Fungsi submit absen
absenForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama").value;

  // Simpan ke Firestore
  await db.collection("absensi").add({
    nama: nama,
    waktu: new Date()
  });

  document.getElementById("nama").value = "";
  loadData();
});

// Fungsi ambil data absensi
async function loadData() {
  listAbsensi.innerHTML = "";
  const snapshot = await db.collection("absensi").orderBy("waktu", "desc").get();

  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.nama} - ${data.waktu.toDate().toLocaleString()}`;
    listAbsensi.appendChild(li);
  });
}

// Load data awal
loadData();
