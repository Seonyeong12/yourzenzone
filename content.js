const body = document.querySelector('body');
// const CheckboxStatus = chrome.storage.sync.get("checkboxStatus");
// const keywords = chrome.storage.sync.get("keywords");
// console.log(CheckboxStatus, keywords.keywords);

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
    if (!TagList.includes(element.parentElement.tagName)) {
      var t = preprocess(element.textContent);
      if (!t.match(pattern)) {
        nodeList.push(element); // element를 직접 저장
        contentList.push(t);
      }
    }
  } else if (element.nodeType === Node.ELEMENT_NODE) {
    for (const child of element.childNodes) {
      getNodeList(child);
    }
  }
}


function ChangeTo(keyword) {
  nodeList.forEach(element => {
    const originalText = element.textContent;
    const regex = new RegExp(keyword, "gi"); // 키워드를 정규 표현식으로 변환
    const newText = originalText.replace(regex, getRandomEmoticon());
    element.textContent = newText; // 교체된 텍스트로 업데이트
  });
};



chrome.storage.sync.get(["keywords"], function(result){
  getNodeList(body);
  console.log(nodeList);
  console.log(result.keywords);
  //chrome.storage.local.set({content:contentList})
  result.keywords.forEach(keyword => {
    console.log(keyword);
    ChangeTo(keyword);
  })
})
