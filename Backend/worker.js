const { parentPort } = require('node:worker_threads');
const fs = require('node:fs');
const readline = require('node:readline');

const stream = fs.createReadStream('AAPL_1min_sample.csv');

const readHandler = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});

const formatData =(line)=>{
  let l = line.split(',');
  return [parseFloat(l[1]),parseFloat(l[2]),parseFloat(l[3]),parseFloat(l[4])];
}

let list = [];

readHandler.on('line', (line)=>{
  list.push(formatData(line));
});

readHandler.on('close',()=>{
  let size = list.length;
  let curr = list.length;
  const interval = setInterval(()=>{
    if(curr == 0){
      clearInterval(interval);
      return;
    }
    parentPort.postMessage(list[size-curr]);
    curr--;
  },1000); 
})

