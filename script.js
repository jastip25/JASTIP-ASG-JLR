// Login
document.getElementById("loginForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  let user = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  if(user && email){
    alert("Selamat datang, " + user);
    window.location.href = "dashboard.html";
  } else {
    alert("Harap isi semua data!");
  }
});

// Cek Resi (Dummy)
function cekResi(){
  let resi = document.getElementById("resi").value;
  let hasil = document.getElementById("hasil");
  if(resi === ""){
    hasil.innerHTML = "⚠️ Nomor resi belum diisi!";
  } else {
    hasil.innerHTML = `
      <ul>
        <li>Status: Barang sedang diproses ✅</li>
        <li>Ekspedisi: JNE</li>
        <li>Waktu: 28 September 2025</li>
      </ul>`;
  }
}