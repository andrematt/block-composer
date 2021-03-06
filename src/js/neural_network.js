let neuralNetwork;

export function train(data) {
console.log("DATA");
    console.log(data);
  //noCanvas();
    

  let nnOptions = {
    task: 'classification',
    debug: false
  };

  neuralNetwork = ml5.neuralNetwork(nnOptions)

//to work with array
data.forEach(item => {
    const inputs = [
        item[0],
        item[1],
        item[2],
        item[3],
        item[4],
        item[5],
    ];
    const outputs = [
        item[6]
    ];
    console.log(item[6]);
   neuralNetwork.addData(inputs,outputs); 
});
    modelReady();
}

function modelReady() {
  neuralNetwork.normalizeData();
  neuralNetwork.train({ epochs: 50, batch: 8 }, whileTraining, finishedTraining);
}

function whileTraining(epoch, logs) {
  console.log(`Epoch: ${epoch} - loss: ${logs.loss.toFixed(2)}`);
}

function finishedTraining() {
  console.log('Training end!');
}

// TODO: normalize and encode values going into predict?
export async function classify(element_name, element_type, action_type, trigger_type, link_type, negation) {
  let inputs = [element_name, element_type, action_type, trigger_type, link_type, negation];
  console.log(inputs);
  //try { 
  let result = await neuralNetwork.classify(inputs, gotResults).then();
  return result; 
  //}
  //catch (error){
    //throw new Error('error');
    //return "error";
  //}
  
 /* 
  try {
  let result = await neuralNetwork.classify(inputs).then();
  console.log("NN RESUILTS FOR :", element_name);
  console.log(result);
  //TODO error checking
  return result;
  }
  catch (error) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.error(error);
    return("error");
  }
  */
}

async function gotResults(err, results) {
  if (err) {
    throw new Error("Neural network: no results");
  } else {
    return results;
}
}
