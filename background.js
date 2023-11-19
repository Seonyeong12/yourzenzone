import * as tf from './node_modules/@tensorflow/tfjs';

// Load the model
async function loadModel() {
  const model = await tf.loadLayersModel('model.json');
  // Use the loaded model for predictions or further processing
  return model;
}

loadModel().then(model => {
  console.log(model[0][0]);
});
