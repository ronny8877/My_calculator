/** @format */

import fs from "fs";
import dayjs from "dayjs";

let signs = ["+", "-", "/", "*", "%"];
//controls the max number of lines generated.

let max_n = 10,
  arr = [];

//just to keep tract of time...
let start = Date.now();
let end;

let fileName = "calculator.c";

// a function to write to file
function writeFile(fileName, data) {
  fs.writeFileSync(fileName, data, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function generator() {
  //a loop to iterate through the signs and all the possible outcomes
  // using a array so that we can return the array as an string.
  for (let i = 0; i < signs.length; i++) {
    for (let j = 0; j < max_n + 1; j++) {
      for (let k = 0; k < max_n; k++) {
        let workaround = `${j} ${signs[i]} ${k}`;
        arr.push(
          `\n if((a==${j}) && sign ==${
            "'" + signs[i] + "'"
          }  && (b==${k}))\n {\n printf( "${j} ${signs[i]} ${k} = ${eval(
            workaround
          )} " ); } `
        );
      }
    }
  }

  //returning the array as string

  return arr.join("\n");
}

//creating the code

writeFile(
  fileName,
  `
  #include <stdio.h>
   \n void calc(int a ,int b , char sign); 
      \n int main(){
          \nint a,b;
          \nchar sign;
          \nprintf("enter first value   ");
          \nscanf("%d",&a);
          \nprintf("enter second value   ");
          \nscanf("%d",&b);
          \nprintf("enter the sign    ");
          \nscanf(" %c",&sign);
          \ncalc(a,b,sign);      
           \n 
  \n return 0; }
  \n void calc(int a ,int b , char sign){${generator()} \n \n
if(a > ${max_n} && b > ${max_n}){printf("Currently calculator only support calculations till ${max_n}... We are working on expanding it  ");}
}`
);

end = Date.now();

console.log(
  " took " +
    dayjs(end).diff(start, "ms") +
    "  millisecond execute. generated lines   " +
    arr.length * 4
);

console.log(
  " took " +
    dayjs(end).diff(start, "s") +
    "   second to execute. generated lines " +
    arr.length * 4
);
