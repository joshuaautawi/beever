/*
Membeli makan siang dan menabung

Rusli adalah seorang anak sekolah di SD Beever
Setiap harinya, Rusli diberikan uang jajan oleh orang tuanya 
sebesar Rp. 10.000,- rupiah.

Rusli bisa menabung atau membeli makanan di sekolahnya untuk
makan siang. Kita telah diberikan catatan keuangan Rusli
dalam bentuk text biasa, dan kita diminta menghitung
jumlah uang tabungan Rusli per harinya dan total tabungannya.

OUTPUT:
{
    Senin: 2000,
    Selasa: 5500,
    Rabu: 3500,
    Kamis: 7000,
    Jumat: 5500,
    TotalTabungan: 23500
}

*/
const modifiedHargaMakanan = (listHarga) => {
  const lists = {};
  listHarga.forEach((e) => {
    lists[e.nama] = e.harga;
  });
  return lists;
};

function jumlahTabungan(listHarga, history) {
  // Write your code here
  const uangSaku = 10000;
  const days = {
    Senin: uangSaku,
    Selasa: uangSaku,
    Rabu: uangSaku,
    Kamis: uangSaku,
    Jumat: uangSaku,
  };

  const listHargaAfterModified = modifiedHargaMakanan(listHarga);
  const listHistory = history.split(".");

  listHistory.forEach((e) => {
    const data = e.split("-");
    const hari = data[0];
    const jenisMakanan = data[1].split(",");
    jenisMakanan.forEach((n) => {
      days[hari] = days[hari] - listHargaAfterModified[n];
    });
  });

  let totalTabungan = 0;
  for (i in days) {
    totalTabungan += days[i];
  }
  
  return { ...days, totalTabungan };
}

var hargaMakanan = [
  {
    nama: "ayam",
    harga: 5000,
  },
  {
    nama: "nasi",
    harga: 2000,
  },
  {
    nama: "cola",
    harga: 1000,
  },
  {
    nama: "chiki",
    harga: 1500,
  },
  {
    nama: "hotdog",
    harga: 3000,
  },
  {
    nama: "aqua",
    harga: 2000,
  },
];

var historyPembelian = `Senin-ayam,nasi,cola.Selasa-chiki,hotdog.Rabu-ayam,chiki.Kamis-hotdog.Jumat-chiki,cola,nasi`;
console.log(jumlahTabungan(hargaMakanan, historyPembelian));
