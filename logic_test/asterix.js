const loopString = (words) => {
  let str = "";
  let lastWord = "";
  for (let i = 0; i < words.length; i++) {
    str += lastWord + words[i] + "\n";
    lastWord += words[i];
  }
  return str;
};
let words = "beever";

console.log(loopString(words));
// Buatlah skema logika untuk memuat kata diatas menjadi berbentuk seperti berikut :
// b
// be
// bee
// beev
// beeve
// beever
