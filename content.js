// 예를 들어, "hate speech"와 "offensive term"을 감지하는 코드
const offensiveWords = ["hate speech", "offensive term"];
const regex = new RegExp(offensiveWords.join("|"), "gi"); // 대소문자 무시, 전체 매치

const text = document.body.textContent;
if (regex.test(text)) {
  // 혐오 표현을 발견하면 대체 작업을 수행
}

const emoticons = ["😃", "😊", "😄", "😁", "😆", "😅"];
function getRandomEmoticon() {
  const randomIndex = Math.floor(Math.random() * emoticons.length);
  return emoticons[randomIndex];
}

if (regex.test(text)) {
    const replacedText = text.replace(regex, getRandomEmoticon());
    document.body.textContent = replacedText;
  }
  
