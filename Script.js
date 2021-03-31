#!/usr/bin/env node // shebang line to link globally
let fs = require("fs"); 
let cmd = process.argv.slice(2);
(function ()
{
    let options = [];
    let files = [];
    let str = "";
    for(let x in cmd)
    {
        if(cmd[x].startsWith("-")&& cmd[x].length==2)
        {
            options.push(cmd[x]);
        }
        else 
        {
            files.push(cmd[x]);
            if(!fs.existsSync(cmd[x]))
            {
                console.log(cmd[x] + " does not exits");
                return;
            }
        }
    }
    for(let x in files)
    {
        str+=fs.readFileSync(files[x]).toString();
    }
    
    str = str.split("\n");

    if(options.includes("-s"))
    {
        str = removelargespace(str);
    }
    if(options.includes("-n") && options.includes("-b"))
    {
        // both options are given by users
       if(options.indexOf("-b")>options.indexOf("-n"))
       {
         // execute -n;
         str = addnum(str);

       }
       else
       {
          // execute -b;
          str = addnonemptynum(str);
       }
    }
    else 
    {
      // one option or no option given by user
      if(options.includes("-b"))
      {
         //execute b;
         str = addnonemptynum(str);
      }
      else if(options.includes("-n"))
      {
          // execute n;
         str = addnum(str);
      }
    }
    str = str.join("\n");
    console.log(str);
})();

function removelargespace(arr)
{
    let ans = [];
    for(let i=0;i<arr.length;i++)
    {
        let prev = arr[i];
        let curr = arr[i+1];
        if((prev==""&& curr=="")|| (prev =="\r"&& curr == "\r"))
        {

        }
        else 
        {
            ans.push(arr[i]);
        }
    }
    return ans;
}

function addnum(arr)
{
    // number to all elements with including space one's also.
    let nArr = [];
    for(x in arr)
    {
        nArr[x] = (x) + " " + arr[x];
    }
    return nArr;
}

function addnonemptynum(arr)
{
    // add number to non empty lines of array because split gives numberling to each 
    // and every element.
    let linenumber = 0;
    let nArr = [];
    for(x in arr)
    {
        //nArr[x]=="\r"?arr[x]:linenumber + " "+ arr[x];
        if(arr[x]== "\r"|| arr[x] == "")
        {
          nArr[x] = arr[x];
        }
        else 
        {
            nArr[x] = linenumber + " " + arr[x];
            linenumber++;
        }
    }
    return nArr;
}
