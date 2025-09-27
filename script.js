document.getElementById("registerForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  let nama = document.getElementById("nama").value;
  let wa = document.getElementById("wa").value;
  let alamat = document.getElementById("alamat").value;
  let ecommerce = document.getElementById("ecommerce").value;

  if(nama && wa && alamat && ecommerce){
    alert("Pendaftaran berhasil!\nSelamat datang, " + nama);
    window.location.href = "dashboard.html";
  } else {
    alert("Harap isi semua data!");
  }
});