const { parentPort } = require('node:worker_threads');
// const fs = require('node:fs');
// const readline = require('node:readline');


const generateOHLCV = require('./Calculation');
let companyList = [
    {
        companyId : 'AAPL',
        price : 100,
        volume : 1000,
        count : -1,
        mu : 0.0002,
        sigma:0.01,
        muV : 0.0001,
        sigmaV : 0.01
    }
]

const distributeData = (data)=>{
    parentPort.postMessage(data);
}

for(let i=0;i<companyList.length;i++){
    setInterval(()=>{
        const result = generateOHLCV(companyList[i].price,companyList[i].volume,companyList[i].mu,companyList[i].sigma,companyList[i].muV,companyList[i].sigmaV,6000);
        const data = [
            // companyId : companyList[i].companyId,
            // timeStamp : Date.now(),
            // timeFrame: companyList[i].count,
             result.open,
             result.high,
             result.low,
             result.close,
            // volume : result.volume
        ];
        distributeData(data);
        companyList[i].count+=1;
        companyList[i].price = result.close;
    },1000)
}




















// const stream = fs.createReadStream('AAPL_1min_sample.csv');

// const readHandler = readline.createInterface({
//   input: stream,
//   crlfDelay: Infinity
// });

// const formatData =(line)=>{
//   let l = line.split(',');
//   return [parseFloat(l[1]),parseFloat(l[2]),parseFloat(l[3]),parseFloat(l[4])];
// }

// let list = [];

// readHandler.on('line', (line)=>{
//   list.push(formatData(line));
// });

// readHandler.on('close',()=>{
//   let size = list.length;
//   let curr = list.length;
//   const interval = setInterval(()=>{
//     if(curr == 0){
//       clearInterval(interval);
//       return;
//     }
//     parentPort.postMessage(list[size-curr]);
//     curr--;
//   },1000); 
// })

