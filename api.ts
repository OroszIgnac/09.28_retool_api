import { createInterface, Readline} from "readline/promises";
import type { Datatypes, Datatypes_S } from './types.ts';
import * as fs from "readline";
import {stdin, stdout} from "process";
const API_URL = "https://retoolapi.dev/Vv4f9a/data";


 using rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function Datacall() {
    const response  =  await fetch(API_URL);
    if(!response.ok)
    {
        throw new Error("Gond van a lekérdezésel!")
    }
    let list = await response.json() as Datatypes[]
    return list;
}

async function GetDataListed()
{
    let teacherList : Datatypes[] = await Datacall();
    for(const teach of teacherList)
    {
        console.log(`${teach.id}. Tanár:\nNév: ${teach.nev}, Óraszám: ${teach.ora}, Munkanap: ${teach.nap}`)
    }

}

function NewData()
{
    const rl = fs.createInterface({
        input: stdin,
        output: stdout
    })

    let inputData : Datatypes_S = {
        
        nev: "",
        ora: 0,
        nap: ""
    };
    rl.question("Tanárnév: ", (anwser) => {
        if(anwser === "")
        {
            throw new Error("Nem lehet üres a név!")
            
        }else{
            inputData.nev = anwser;
        }
    })
    rl.question("Óraszám: ", (anwser) => {
        const forditas = parseInt(anwser)
        if(forditas < 0 || forditas > 7)
        {
            throw new Error("Az óraszám csak 1 és 7 közzöt lehet!")
            
        }else{
            inputData.ora = forditas
        }
    })

    rl.question("Munkanap: ", (anwser) => {
    if(anwser === "")
    {
        throw new Error("Nem lehet üres a munkanap!")
        
    }else{
        inputData.nap = anwser
    }
    })

    UploadNewData(inputData)
    
    
}

async function UploadNewData(teacher : Datatypes_S)
{
    await fetch(API_URL, )
}
