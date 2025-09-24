const namaInput = document.getElementById("nama");
const absenButton = document.getElementById("absenBtn");
const daftarTabel = document.getElementById("daftar");

// Tambah data absensi (Absen Masuk)
absenButton.addEventListener("click", () => {
  const nama = namaInput.value.trim();
  if (!nama) return alert("Nama harus diisi!");

  const jamMasuk = new Date().toLocaleTimeString("id-ID");

  firebase.database().ref("absensi").push({
    nama,
    jamMasuk,
    jamPulang: ""
  });

  namaInput.value = "";
});

// Tampilkan data realtime
firebase.database().ref("absensi").on("value", (snapshot) => {
  daftarTabel.innerHTML = `
    <tr>
      <th>Nama</th>
      <th>Jam Masuk</th>
      <th>Jam Pulang</th>
      <th>Aksi</th>
    </tr>
  `;

  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const id = childSnapshot.key;

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
function pulang(id) {
  const jamPulang = new Date().toLocaleTimeString("id-ID");
  firebase.database().ref("absensi/" + id).update({
    jamPulang
  });
}

// Hapus data
function hapus(id) {
  firebase.database().ref("absensi/" + id).remove();
}
