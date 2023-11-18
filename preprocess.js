const htmlContent = document.body.innerHTML; 
const parser = new DOMParser();
const doc = parser.parseFromString(htmlContent, 'text/html');
const txt = doc.body.innerHTML;

function preprocess(txt){
  var t = txt.replaceAll(/\s{2,}/g, ' ');
  var t = t.replaceAll('\n', '');
  var t = t.replaceAll('\t', '');
  var t = t.split(separator);
  return t;
};

const separator = '\u{C012}';
const replacedTxt = txt.replace(/<[^>]*>/gm, separator);
const t = preprocess(replacedTxt);

//console.log(extractedData);

        