# import firebase_admin
# from firebase_admin import db
# import safetensors.torch as st
# from transformers import TextClassificationPipeline, ElectraForSequenceClassification, AutoTokenizer

# cred_obj = firebase_admin.credentials.Certificate('service_account.json')
# default_app = firebase_admin.initialize_app(cred_obj, {
# 	'databaseURL': "https://yourzenzone-c6531-default-rtdb.asia-southeast1.firebasedatabase.app/"
# 	})

# def getData(path):
#     ref = db.reference(path)
#     data = ref.get()
#     return data

# content = getData('localcontent')['content']
# print(content)

# model_name = st.load_file('model.safetensors')
# model = ElectraForSequenceClassification.from_pretrained(model_name)
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# print('model_loaded!')

# pipe = TextClassificationPipeline(
#     model = model,
#     tokenizer = tokenizer,
#     device=0,
#     return_all_scores=True,
#     function_to_apply='sigmoid'
#     )

# for result in pipe("이래서 여자는 게임을 하면 안된다")[0]:
#     print(result)

import tensorflow as tf
import tfjs_graph_converter.api as tfjs
tfjs.graph_model_to_saved_model(
               "model.json",
               "realsavedmodel"
            )


# Convert the model
converter = tf.lite.TFLiteConverter.from_saved_model("realsavedmodel") # path to the SavedModel directory
tflite_model = converter.convert()

# Save the model.
with open('model.tflite', 'wb') as f:
  f.write(tflite_model)