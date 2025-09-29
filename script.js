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

const ENDPOINT = "https://script.google.com/macros/s/AKfycbzQV2hLndngk8aLb3lJRcOfYrUmhMHMDjQ-ulv1TLtuvbu53gIPaWKzJjZbIKvTOhPI/exec";

document.getElementById('form-cek-resi').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nomorResi = document.getElementById('input-resi').value.trim();
  const hasilEl = document.getElementById('hasil');

  if (!nomorResi) return;

  hasilEl.innerHTML = `<p class="text-center text-gray-500">🔄 Mengecek...</p>`;

  try {
    const res = await fetch(`${ENDPOINT}?resi=${encodeURIComponent(nomorResi)}`);
    const data = await res.json();
    renderHasil(data);
  } catch (err) {
    hasilEl.innerHTML = `<p class="text-red-600 text-center">❌ Terjadi kesalahan: ${err}</p>`;
  }
});

function renderHasil(data) {
  const hasilEl = document.getElementById('hasil');

  if (data.status === "error" || !data.data) {
    hasilEl.innerHTML = `<p class="text-center text-red-600">❌ ${data.message || "Nomor resi tidak ditemukan"}</p>`;
    return;
  }

  const info = data.data.data || {};
  const history = info.history || [];

  // Status utama
  const statusTerbaru = history.length > 0 ? history[0] : { desc: 'Tidak ada data' };

  let html = `
    <div class="mb-4 text-center">
      <h2 class="text-xl font-bold">${info.courier || '-'}</h2>
      <p class="text-gray-600">${info.no || ''}</p>
      <p class="mt-2 text-lg font-semibold text-green-600">${statusTerbaru.desc}</p>
    </div>
  `;

  // Timeline perjalanan paket
  if (history.length > 0) {
    html += `<div class="border-l-2 border-gray-300 pl-4">`;
    history.forEach(item => {
      html += `
        <div class="mb-4">
          <div class="text-sm text-gray-500">${item.date}</div>
          <div class="font-medium">${item.desc}</div>
          <div class="text-gray-500">${item.location || ''}</div>
        </div>
      `;
    });
    html += `</div>`;
  } else {
    html += `<p class="text-center text-gray-500">Tidak ada riwayat pengiriman</p>`;
  }

  hasilEl.innerHTML = html;
}

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
