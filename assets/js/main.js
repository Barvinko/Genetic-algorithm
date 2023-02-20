let dataJson = `{"corrections": [1, 12, 7, 3, 4,5 ,1, 8, 11, 2, 1, 2, 1, 7, 9, 6, 1, 12, 4, 1, 7, 2, 3, 2, 1], "cells": [2, 4, 4, 6, 2, 6, 8, 10, 2, 4, 2, 10, 8, 4, 6, 2, 8, 2, 4, 2, 2, 6, 4, 2, 6, 10, 10, 10, 4, 6]}`
//let dataJson = `{"corrections": [1, 12, 7, 3, 4,5 ,1, 8, 11, 2, 1, 2, 1, 7, 9, 6, 1], "cells": [2, 4, 4, 6, 2, 6, 8, 10, 2, 4, 2, 10, 8, 4, 6, 2, 8, 2, 4, 2, 2, 6, 4, 2, 6, 10, 10, 10, 4, 6]}`
//let dataJson = `{"corrections": [1, 12, 7, 1], "cells": [8, 4, 6, 2, 2]}`
dataJson = JSON.parse(dataJson);
console.log(dataJson);
let population = [];
let cells = [...dataJson.cells];
let numbersPopulation, numbersGenerations;

numbersPopulation = dataJson.cells.length * 40 + dataJson.corrections.length * 40;
numbersGenerations = dataJson.cells.length * 80 + dataJson.corrections.length * 80;
console.log("Population: ", numbersPopulation," Generations: ", numbersGenerations)

//standardization "cells" for creation of chromosomes
for (let j = 0; j < (dataJson.corrections.length*2) - dataJson.cells.length; j++) {
    cells.push(0);
}    

//Create population chromosomes from random genes
//in cycle "for" you can set numbers of population
for (let i = 0; i < numbersPopulation; i++) {
    let cellsTemp = [...cells];
    population[i] = [];
    for (let j = 0; j < cells.length; j++) {
        let randomPopul = Math.floor(Math.random() * (cellsTemp.length-1));
            population[i][j] = cellsTemp[randomPopul];
            cellsTemp.splice(randomPopul,1);
    }
    //LAST 0 IS FOR FINAL NUMBERS OF "SPEED BOOST" ALONG ALL WAY//
    population[i].push(0);
}
console.log(cells);


// population = [
//     [8,4,6,2,2,0,0,0,0],  //0
//     [8,4,6,2,2,0,0,0,0],  //1
//     [8,4,6,2,2,0,0,0,0],  //2
//     [8,4,6,2,2,0,0,0,0],  //3
//     [8,4,6,2,2,0,0,0,0],  //4
//     [8,4,6,2,2,0,0,0,0],  //5
//     [8,4,6,2,2,0,0,0,0],  //6
//     [8,4,6,2,2,0,0,0,0],  //7
//     [8,4,6,2,2,0,0,0,0],  //8
//     [8,4,6,2,2,0,0,0,0],  //9
// ]


// let population = [
//     [0,0,6,0,2,4,2,8,0],  //0
//     [0,8,4,6,2,0,2,0,0],  //1
//     [0,4,0,2,2,6,8,0,0],  //2
//     [0,2,6,0,2,4,8,0,0],  //3
//     [0,8,4,2,2,6,0,0,0],  //4
//     [0,0,6,2,2,4,8,0,0],  //5
//     [0,4,6,0,2,8,2,0,0],  //6
//     [0,4,0,2,2,6,8,0,0],  //7
//     [0,4,0,2,2,6,8,0,0],  //8
//     [0,4,0,2,2,6,8,0,0],  //9
// ]

//in cycle "for" you can set numbers of generations which population will go through;
for (let index = 0; index < numbersGenerations; index++) {

    //tetsing population
    for (let i = 0; i < population.length; i++) {
        //clear value of in which keep max speed boost chromosome(way)
        population[i][population[i].length-1] = 0;
        //We -1 from population[i].length, because last element is counter of speed boost
        for (let j = 0; j < (population[i].length-1)/2; j++) {
            //Get speed boost in this step from both engines of this chromosomes
            let acceleration = population[i][j + (population[i].length-1)/2]/2+population[i][j];
            if (acceleration <= dataJson.corrections[j] && acceleration != 0) {             
                population[i][population[i].length - 1] += acceleration;
            }else{
                break;
            }
        }
    }

    //sorting of population. In beginning of array are best ways
    population.sort((a,b) =>{
        return a[a.length-1] > b[b.length-1] ? -1 : 1;
    });

    //create new generation
    //First parent is best chromosom = population[0]. Second parent is all others in turn
    let valueMutans = new Array();
    for (let i = 1; i < population.length; i++) {
        valueMutans[i] = [];
        for (let j = 0; j < population[0].length-1; j++) {
            //Compare elements, if this element no at best chromosomes(way), it is removed
            if (population[0][j] == population[i][j]) {
                population[i][j] = population[0][j];
            }else{
            //"valueMutans" is array remote element 
                valueMutans[i].push(population[i][j]);
                population[i][j] = undefined;
            }
        }
        //random gane of chromosomes of child moves to another random gane
        //for (let j = 0; j < 1; j++) {
            
            let ganeA = Math.floor(Math.random() * (population[i].length-1));
            let ganeB;
            do {
                ganeB = Math.floor(Math.random() * (population[i].length-1)); 
            } while (ganeB == ganeA);
            //console.log(ganeA,ganeB);

            let temp;
            temp = population[i][ganeA];
            population[i][ganeA] = population[i][ganeB];
            population[i][ganeB] = temp;
        //}

        //filling from deleted elements in array randomly from "valueMutans" is array remote elements
        for (let j = 0; j < population[i].length-1; j++) {
            if (population[i][j] == undefined) {
                let randomMutans = Math.floor(Math.random() * (valueMutans[i].length-1));
                if (valueMutans[i].length == 2) {
                    randomMutans = valueMutans[i].length-1;
                }
                population[i][j] = valueMutans[i][randomMutans];
                // element which was add to child to remove from "valueMutans"(array remote elements)
                //so as not to throw it in array again 
                valueMutans[i].splice(randomMutans,1);
            }
        }
    }
    console.log(index,population[0][population[0].length-1]);
}
console.log(population);

//featback
let featback = {"main_truster":population[0].splice(0,(population[0].length-1)/2),"sec_thruster":population[0].splice(0,(population[0].length-1))}
let delta_velocity = population[0].splice(0,1);
featback.delta_velocity = delta_velocity[0];
console.log(featback)
featback = JSON.stringify(featback);
console.log(featback);


