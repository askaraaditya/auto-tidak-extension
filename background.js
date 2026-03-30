chrome.action.onClicked.addListener((tab) => {
  // Mencegah error jika ekstensi diklik di halaman pengaturan Chrome atau tab kosong
  if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
    return;
  }

  // Menyuntikkan script ke halaman utama DAN semua iframe di dalamnya
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true }, 
    function: jalankanScriptKamu
  }).then(() => console.log("Script berhasil disuntikkan"));
});

function jalankanScriptKamu() {
  let jumlahDiklik = 0;

  // 1. Memilih opsi "Tidak" (Saya tambahkan huruf besar TIDAK untuk jaga-jaga)
  document.querySelectorAll('input[type="radio"][value*="Tidak"], input[type="radio"][value*="tidak"], input[type="radio"][value*="TIDAK"]').forEach(input => {
      input.click();
      jumlahDiklik++;
  });

  // 2. Kode untuk memilih opsi terakhir di setiap grup pertanyaan
  document.querySelectorAll('div[role="radiogroup"]').forEach(group => {
      const options = group.querySelectorAll('input[type="radio"]');
      if(options.length > 0) {
          options[options.length - 1].click(); // Klik opsi paling bawah
          jumlahDiklik++;
      }
  });
  
  // Memberikan laporan di Console F12
  console.log("Ekstensi Autofill Berjalan! Total tombol yang diklik: " + jumlahDiklik);
}
