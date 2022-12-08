/* Returns a random DNA base */
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

/* Returns a random single stand of DNA containing 15 bases */
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/* Factory function "pAequorFactory()" */
function pAequorFactory(specimenNum, dna) {
  return {
    initialData: {
      specimenNum,
      dna,
    },

    mutate: function () {
      const mutateArrayOut = dna;
      //console.log("mutateArrayOut: ", mutateArrayOut)
      const bases = ["A", "C", "T", "G"];

      /* Mutates a single random base. */
      const randomSlot = Math.round(Math.random() * 15);
      //console.log("randomSlot: ", randomSlot)
      let proceed = false;
      while (proceed === false) {
        let randomBase = Math.round(Math.random() * 3);
        //console.log("randomBase: ", randomBase)
        //console.log("mutateArrayOut[randomSlot]: ", mutateArrayOut[randomSlot])
        //console.log("bases[randomBase]: ", bases[randomBase])
        if (mutateArrayOut[randomSlot] != bases[randomBase]) {
          mutateArrayOut[randomSlot] = bases[randomBase];
          proceed = true;
        }
      }

      //console.log(mutateArrayOut)
      return mutateArrayOut;
    },

    compareDNA: function (inObject) {
      const subject1DNA = this.initialData.dna;
      //console.log("subject1DNA: ", subject1DNA)
      const subject2DNA = inObject.initialData.dna;
      //console.log("subject2DNA: ", subject2DNA)
      const subject1Num = this.initialData.specimenNum;
      const subject2Num = inObject.initialData.specimenNum;
      const commonBases = [];

      for (let i = 0; i < subject1DNA.length; i++) {
        if (subject1DNA[i] === subject2DNA[i]) {
          commonBases.push(subject1DNA[i]);
        }
      }
      //console.log("commonBases: ", commonBases)

      const commonPercentage = (
        (commonBases.length / subject1DNA.length) *
        100
      ).toFixed(1);

      return `specimen ${subject1Num} and specimen ${subject2Num} have ${commonPercentage}% DNA in common.`;
    },

    willLikelySurvive: function () {
      function cBWLS(inCBWLSstring) {
        if (inCBWLSstring === "C" || inCBWLSstring === "G") {
          return true;
        }
      }

      const dnaLength = this.initialData.dna.length;
      //console.log(dnaLength)
      const desiredBases = this.initialData.dna.filter(cBWLS);
      //console.log(desiredBases)
      const desiredBasesPC = ((desiredBases.length / dnaLength) * 100).toFixed(
        1
      );
      //console.log(desiredBasesPC)

      if (desiredBasesPC >= 60) {
        return true;
      } else {
        return false;
      }
    },

    complementStrand: function () {
      const complementStrandArray = [];
      for (let i = 0; i < this.initialData.dna.length; i++) {
        dnaLetter = this.initialData.dna[i];
        //console.log(dnaLetter)
        switch (dnaLetter) {
          case "A":
            complementStrandArray.push("T");
            break;
          case "C":
            complementStrandArray.push("G");
            break;
          case "G":
            complementStrandArray.push("C");
            break;
          case "T":
            complementStrandArray.push("A");
        }
      }
      return complementStrandArray;
    },
  };
}

/* Some tests I ran.
const mockUpDna1 = mockUpStrand();
//console.log("mockUpDna1: ", mockUpDna1)
const mockUpDna2 = mockUpStrand();
//console.log("mockUpDna2: ", mockUpDna2)
const compareSubject = pAequorFactory(00002, mockUpDna2);
//console.log("compareSubject: ", compareSubject)
//console.log(pAequorFactory(00001, mockUpDna1).mutate())
//console.log(pAequorFactory(00001, mockUpDna1).compareDNA(compareSubject))
//console.log(pAequorFactory(00001, mockUpDna1).willLikelySurvive())
*/

/* 30 instances of pAequor (studyMeArray)*/
const studyMeArray = [];
let pAequorNumber = 1;
while (studyMeArray.length < 30) {
  pAequorInstance = pAequorFactory(pAequorNumber, mockUpStrand());
  pAequorSurvival = pAequorInstance.willLikelySurvive();
  //console.log("pAequorNumber: ", pAequorNumber)
  //console.log("pAequorSurvival: ", pAequorSurvival)
  if (pAequorSurvival === true) {
    studyMeArray.push(pAequorInstance);
  }
  pAequorNumber++;
}

//console.log(studyMeArray)
//console.log(studyMeArray[4].initialData.specimenNum)
//console.log(studyMeArray[4].initialData.dna)
//console.log(studyMeArray[4].willLikelySurvive())
//console.log(studyMeArray[4].complementStrand())

/* Finding the two most related instances of pAequor in studyMeArray*/
function mostRelated(inArray) {
  let mostRelatedValue = 0;
  let mostRelatedNum1 = 0;
  let mostRelatedNum2 = 0;

  for (let i = 0; i < inArray.length; i++) {
    for (let j = 0; j < inArray.length; j++) {
      /* An object doesn't compare with itself. */
      if (i != j) {
        individualNum1 = inArray[i].initialData.specimenNum;
        //console.log("individualNum1: ", individualNum1)
        individualDna1 = inArray[i].initialData.dna;
        //console.log("individualDna1: ", individualDna1)
        individualNum2 = inArray[j].initialData.specimenNum;
        //console.log("individualNum2: ", individualNum2)
        individual2 = inArray[j];
        //console.log("individual2:", individual2)
        comparisonString = pAequorFactory(
          individualNum1,
          individualDna1
        ).compareDNA(individual2);
        //console.log("comparisonString: ", comparisonString)

        /* Extracts the comparison percentage ("comparisonPercentage") from "compareDNA"'s output string. */
        let comparisonArray = comparisonString.split("");
        //console.log("comparisonArray: ", comparisonArray)
        let eIndex = comparisonArray.lastIndexOf("e");
        //console.log("eIndex: ", eIndex)
        let pcIndex = comparisonArray.lastIndexOf("%");
        //console.log("pcIndex: ", pcIndex)
        let comparisonPercentageString = comparisonString.substring(
          eIndex + 1,
          pcIndex
        );
        //console.log("comparisonPercentageString: ", comparisonPercentageString)
        let comparisonPercentage = Number(comparisonPercentageString);
        //console.log("comparisonPercentage: ", comparisonPercentage)

        if (comparisonPercentage > mostRelatedValue) {
          mostRelatedValue = comparisonPercentage;
          mostRelatedNum1 = individualNum1;
          mostRelatedNum2 = individualNum2;
        }
      }
    }
  }

  return (
    `${mostRelatedNum1} and ${mostRelatedNum2} are the instances of pAequor` +
    ` with the greatest DNA match value (${mostRelatedValue}%).`
  );
}

console.log(mostRelated(studyMeArray));
