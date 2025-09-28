// ===== LOGIN =====
document.getElementById("loginForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  let user = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();

  if(user && email){
    alert("Selamat datang, " + user);
    window.location.href = "dashboard.html";
  } else {
    alert("Harap isi semua data!");
  }
});

// ===== CEK RESI DUMMY =====
function cekResi(){
  let resi = document.getElementById("resi").value.trim();
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

// ===== LACAK RESI VIA WEB APP =====
async function lacakResi() {
  const resi = document.getElementById("resiInput").value.trim();
  const hasilEl = document.getElementById("hasilResi");

  if (!resi) {
    alert("Masukkan nomor resi dulu!");
    return;
  }

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwYKVBwGkNzz96UgWcTSGgQbFv5jMfaQ2T8zpZQqx_VvL-ZFRKE14rBNIKleIywDG5H/exec";

  hasilEl.innerHTML = "<p>🔎 Mencari data resi...</p>";

  try {
    const resp = await fetch(`${WEB_APP_URL}?resi=${encodeURIComponent(resi)}`);
    const data = await resp.json();

    if (!data || data.error || data.status === "error") {
      const msg = data?.error || data?.message || "Resi tidak ditemukan atau terjadi kesalahan.";
      hasilEl.innerHTML = `<p style="color:red">❌ ${msg}</p>`;
      return;
    }

    let summary = null;
    let manifest = null;

    if (data.data && data.data.summary) {
      summary = data.data.summary;
      manifest = data.data.manifest || [];
    } else {
      summary = {
        status: data.status || data.data?.status || "-",
        courier_name: data.data?.courier || data.courier || "-",
        waybill: data.data?.waybill || data.waybill || resi,
        estimated_delivery: data.data?.estimated_delivery || data.estimated_delivery || data.eta || "-"
      };
      manifest = data.history || data.manifest || data.data?.history || [];
    }

    let out = `
      <div class="card">
        <p><b>Nomor Resi:</b> ${summary.waybill || resi}</p>
        <p><b>Kurir:</b> ${summary.courier_name || "-"}</p>
        <p><b>Status terakhir:</b> ${summary.status || "-"}</p>
        <p><b>Estimasi sampai:</b> ${summary.estimated_delivery || "-"}</p>
        <hr>
        <h4>Riwayat Perjalanan</h4>
    `;

    if (Array.isArray(manifest) && manifest.length) {
      out += `<ul class="manifest">`;
      manifest.forEach(item => {
        const time = item.manifest_date || item.date || item.datetime || item.time || "";
        const desc = item.manifest_description || item.description || item.status || item.desc || JSON.stringify(item);
        out += `<li><strong>${time}</strong> — ${desc}</li>`;
      });
      out += `</ul>`;
    } else {
      out += `<p>Tidak ada riwayat pengiriman.</p>`;
    }

    out += `</div>`;
    hasilEl.innerHTML = out;

  } catch (err) {
    console.error(err);
    hasilEl.innerHTML = `<p style="color:red">⚠️ Gagal mengambil data. Coba lagi nanti.</p>`;
  }
}
