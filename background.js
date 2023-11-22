// try {
//   self.importScripts("node_modules/firebase/firebase-compat.js");
//   const firebaseConfig = {
//     apiKey: "AIzaSyCr1AmUdqt6j2Y01bEHbzbYqF_GwmKKAjs",
//     authDomain: "yourzenzone-c6531.firebaseapp.com",
//     projectId: "yourzenzone-c6531",
//     storageBucket: "yourzenzone-c6531.appspot.com",
//     messagingSenderId: "830464043484",
//     appId: "1:830464043484:web:e678a7bba42e2cbfe4c719",
//     measurementId: "G-6S6312M496",
//     databaseURL: "https://yourzenzone-c6531-default-rtdb.asia-southeast1.firebasedatabase.app/"
//   };


// const app = firebase.initializeApp(firebaseConfig);
// console.log("Initialized Firebase!", app);
// const database = firebase.database();


chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'content'){
      //console.log(newValue);
    }
  }
});

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ella0106/yourzenzone",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

const label = {'여성/가족': 0,
 '남성': 1,
 '성소수자': 2,
 '인종/국적': 3,
 '연령': 4,
 '지역': 5,
 '종교': 6,
 '기타 혐오': 7,
 '악플/욕설': 8,
 'clean': 9}

 chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message === 'savedContent') {
    chrome.storage.local.get(['content'], function(result){
      const content = result.content;
      console.log(content);
      query(content).then((response) => {
        //console.log(response);
        labels = []
        for (let i of response) {
          labels.push(label[i[0]['label']]);
        }
        console.log(labels)
        sendResponse({labels : labels});
    })
    });
    
  }});


  // } catch (e) {
  //   console.error(e);
  // }