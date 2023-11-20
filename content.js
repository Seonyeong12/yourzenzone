const body = document.querySelector('body');
const CheckboxStatus = chrome.storage.sync.get("checkboxStatus");
const keywords = chrome.storage.sync.get("keywords");
console.log(CheckboxStatus, keywords.keywords);

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});


const emoticons = ["😃", "😊", "😄", "😁", "😆", "😅"];
function getRandomEmoticon() {
  const randomIndex = Math.floor(Math.random() * emoticons.length);
  return emoticons[randomIndex];
}

function preprocess(txt){
  var t = txt.replaceAll(/\s{2,}/g, ' ');
  var t = t.replaceAll('\n', '');
  var t = t.replaceAll('\t', '');
  return t;
}

const TagList = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'BODY','FORM'];
const pattern = /^[^ㄱ-ㅎ가-힣a-zA-Z]*$/;
let nodeList = [];
let contentList = [];
function getNodeList(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    if (TagList.includes(element.parentElement.tagName)) {
      ;
    } else {
      var t = preprocess(element.textContent);
      if (t.match(pattern)){
        ;
      }
      else{
        nodeList.push(element.parentElement);
        contentList.push([t])
      }
    }
    // If the current node is a text node, replace text content
  } else if (element.nodeType === Node.ELEMENT_NODE) {
    // If the current node is an element, recursively process its children
    for (const child of element.childNodes) {
      getNodeList(child);
    }
  }
  return nodeList, contentList;
}

function ChangeTo(keyword){
nodeList.forEach(element => {
  if (element[0].tagName === 'STRONG'){
    element[0].textContent = keyword;
  }
});
};


chrome.storage.sync.get(["keywords"], function(result){
  getNodeList(body);
  console.log(nodeList);
  chrome.storage.local.set({content:contentList})
  //ChangeTo(result.keywords);
})