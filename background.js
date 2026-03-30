// Mendengarkan event ketika ikon ekstensi diklik
chrome.action.onClicked.addListener((tab) => {
  // Menyuntikkan dan menjalankan fungsi di tab yang sedang aktif
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: jalankanScriptKamu
  });
});

// Ini adalah kode asli milikmu yang dibungkus dalam sebuah fungsi
function jalankanScriptKamu() {
  // Memilih opsi "Tidak" atau opsi terakhir pada setiap pertanyaan
  document.querySelectorAll('input[type="radio"][value*="Tidak"], input[type="radio"][value*="tidak"]').forEach(input => input.click());

  // Kode ini akan memilih opsi terakhir di setiap grup pertanyaan
  document.querySelectorAll('div[role="radiogroup"]').forEach(group => {
      const options = group.querySelectorAll('input[type="radio"]');
      if(options.length > 0) {
          options[options.length - 1].click(); // Klik opsi paling bawah
      }
  });
  
  // (Opsional) Memberikan feedback visual di console bahwa script berjalan
  console.log("Ekstensi berhasil dijalankan: Opsi telah dipilih.");
}
