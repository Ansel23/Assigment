//Name:Ansel Low Tze Chun
//Class:DIT/FT/1B/01
//Admin No:2323514




const readline = require("readline-sync");
const fetch = require("node-fetch");


let dataAll;
let universities




function loadAllData(){
    return new Promise((resolve, reject)=>{
        fetch('http://localhost:8081/all')
        .then(response=> response.json())
        .then(function(data){
            resolve(data)
        }
        )

    })
}

function getuniversities(){
    return new Promise((resolve, reject)=>{
        fetch('http://localhost:8081/university')
        .then(response=> response.json())
        .then(function(data){
           
            resolve(data)
        }
    )
})
};



async function getAllData() {
dataAll = await loadAllData();
}

async function getuniversity(){
    universities = await getuniversities();
}





//function to display overall employment rate

async function displayoverallemplyrate() {
    await getAllData();
    await getuniversity();
    console.log("Please enter the number for the University chosen");
 var select=0;
 displayOption="";
    for (var i = 0; i < universities.length; i++) {
        displayOption += (i + 1) + ". " + universities[i].code +" "+ universities[i].name+ "\n";
    }
    displayOption += "Enter 0 to exit.";
    do {
      //display displayOption and filter data to get selected university
        select = readline.questionInt(displayOption);
        if (select != 0 && select <= universities.length ) {
        let   selecteduniversity= universities[select - 1].name
            const filtereduniversitydata = dataAll.filter(data=> data.university == selecteduniversity)


   if(select>= 1 && select <=universities.length){
    displayOption=""
    let agerangearray=[];
    for (var i = 0; i < filtereduniversitydata.length; i++) {
      let datayear = (filtereduniversitydata[i].year)
    
     
     if (agerangearray.indexOf(datayear) === -1) {
        
      agerangearray.push(datayear);
   

    }

    }
   //display diaplayOption and get year and validation
    displayOption+=("Please select year: \n")
          let agerange= agerangearray.map((year, index) => `${index + 1}. ${year}`);
          
          displayOption+=(agerange.join('\n')+'\n')
          displayOption+=("Enter 0 to exit.")
       
        
          let  selectedyearNo = readline.questionInt(displayOption);

            if (selectedyearNo < 0 || selectedyearNo > agerangearray.length) {
                console.log("Invalid number. ");
                return;
            }
      
          

    

         let selectedyear=agerangearray[selectedyearNo - 1]
         if(selectedyearNo>= 1 && selectedyearNo <=agerangearray.length){
          //filter data and display school degree and empolyment rate overall
            const filtereduniversityYeardata = filtereduniversitydata.filter(data=> data.year == selectedyear)
            console.log("Overall employment rate of "+ selecteduniversity+ " in " +  selectedyear + ":");
            filtereduniversityYeardata.forEach((entry) => {
                const school = entry.school 
                const degree = entry.degree  
                const emprate_overall = entry.employment_rate_overall
                
              
               
                console.log(`- ${school} (${degree}): ${emprate_overall}  `)
                    return;
                
                ;})
            
         }

   }
       
}
    } while (select != 0);
}

//display top salary degrees
async function displaytopsalarydegrees(){
    await getAllData();
    await getuniversity();

//prompt user for year and filter data
    let agerangearray=[];
    for (var i = 0; i < dataAll.length; i++) {
      let datayear = (dataAll[i].year)
    
     
     if (agerangearray.indexOf(datayear) === -1) {
        
      agerangearray.push(datayear);
   

    }

    }

    let alldegreesarray=[]
    for(let i=0; i<dataAll.length;i++){
        let dataAlldegrees =dataAll[i].degree
    
        if (alldegreesarray.indexOf(dataAlldegrees) === -1) {
            
            alldegreesarray.push(dataAlldegrees);
         
      
          }
          
    }
    

displayOption=""
    displayOption+=("Please select year: \n")
          let agerange= agerangearray.map((year, index) => `${index + 1}. ${year}`);
          
          displayOption+=(agerange.join('\n')+'\n')
          displayOption+=("Enter 0 to exit.\n")
let selectedyearNo=readline.questionInt(displayOption)
         let selectedyear=agerangearray[selectedyearNo - 1]
        let filteredDatabyYear = dataAll.filter(data=> data.year == selectedyear)
 //map filtered data in university school ,degree and mediansalary
        let salaryInfo = filteredDatabyYear.map(item => {
            return {
                university: item.university,
                school: item.school,
                degree: item.degree,
                medianSalary: parseFloat(item.basic_monthly_median)
            };
        });
       
        
        salaryInfo.sort((a, b) => b.medianSalary - a.medianSalary);
    //display data
       if(selectedyearNo<agerangearray.length && selectedyearNo>0){
        console.log('\nTop 10 Degrees with Highest Median Salary:');
        for (let i = 0; i < Math.min(10, salaryInfo.length); i++) {
            console.log(`\n${i + 1}. University: ${salaryInfo[i].university}`);
            console.log(`   School: ${salaryInfo[i].school}`);
            console.log(`   Degree: ${salaryInfo[i].degree}`);
            console.log(`   Median Salary: S$${salaryInfo[i].medianSalary}`);
            return;
        }
       
      }


}



//displaay school with lowest average "gross_monthly_median"
async function displayschoolwithlowestaverage() {
    await getAllData();
    await getuniversity();
    //prompt user to select university and filter data
 console.log("Please enter the number for the University chosen");
var select=0;
displayOption="";
   
   for (var i = 0; i < universities.length; i++) {
       displayOption += (i + 1) + ". " + universities[i].code +" "+ universities[i].name+ "\n";
   }
   displayOption += "Enter 0 to exit.";
   do {
       select = readline.questionInt(displayOption);
       if (select != 0 && select <= universities.length ) {
       if (select != 0) {
       let   selecteduniversity=universities[select - 1].name
           
           const filtereduniversitydata = dataAll.filter(data=> data.university == selecteduniversity)


  if(select>= 1 && select <=universities.length){
   displayOption=""
   let agerangearray=[];
   for (var i = 0; i < filtereduniversitydata.length; i++) {
     let datayear = (filtereduniversitydata[i].year)
   
    
    if (agerangearray.indexOf(datayear) === -1) {
       
     agerangearray.push(datayear);
  

   }

   }
   //prompt user to select year and filter data
   displayOption+=("Please select year: \n")
         let agerange= agerangearray.map((year, index) => `${index + 1}. ${year}`);
         
         displayOption+=(agerange.join('\n')+'\n')
         displayOption+=("Enter 0 to exit.")
         let selectedyearNo=readline.questionInt(displayOption)
         if(selectedyearNo>agerangearray.length){
          console.log("Invalid number")
          return;
         }
        let selectedyear=agerangearray[selectedyearNo - 1]
        if(selectedyearNo>= 1 && selectedyearNo <=agerangearray.length){
           const filtereduniversityYeardata = filtereduniversitydata.filter(data=> data.year == selectedyear)
  
           //use object to get each school and median value and get sum and count properties to calculate average 
           let a = Infinity;  
           let b = null;   
           const schoolData = {};

           filtereduniversityYeardata.forEach((entry, index) => {
             const school = entry.school;
             const median = entry.gross_monthly_median;
           
             if (!schoolData[school]) {
               schoolData[school] = { sum: 0, count: 0 };
             }
           
             schoolData[school].sum += median;
             schoolData[school].count += 1;
           
             if(index==0){
                a = schoolData[school].sum / schoolData[school].count;
                b = school;
                
             }else{
         
             const average = schoolData[school].sum / schoolData[school].count;
             if (schoolData[school].count > 0 && average < a) {
               a = average;
               b = school;
             }
            }
           });
           
           //display data
           console.log(`School with the lowest average gross monthly median: ${b}, Average"gross_monthly_median": ${a}\n`);
           return;
        }
  }
}
}
   } while (select != 0);
}


//display summary of Full time employment rate
async function displaysummaryofFTemprate() {
    await getAllData();
    await getuniversity();
    //promt user to select university
 console.log("Please enter the number for the University chosen");
var select=0;
displayOption="";
  
   for (var i = 0; i < universities.length; i++) {
       displayOption += (i + 1) + ". " + universities[i].code +" "+ universities[i].name+ "\n";
   }
   displayOption += "Enter 0 to exit.";
   do {
       select = readline.questionInt(displayOption);
       if (select != 0 && select <= universities.length ) {
       if (select != 0) {
       let   selecteduniversity=universities[select - 1].name
           const filtereduniversitydata = dataAll.filter(data=> data.university == selecteduniversity)
           const summary = {};

          //use object to get year school degree and empolyment rate ft perm values while creating objects and properties
           filtereduniversitydata.forEach(entry => {
             const { year, school, degree, employment_rate_ft_perm } = entry;
           
          
             if (!summary[school]) {
               summary[school] = {};
             }
           
          
             if (!summary[school][degree]) {
               summary[school][degree] = [];
             }
           
           
             summary[school][degree].push({
               year,
               employment_rate_ft_perm,
             });
           });
//print data
           for (const school in summary) {
            console.log(`School: ${school}`);
            for (const degree in summary[school]) {
              console.log(`  Degree: ${degree}`);
              summary[school][degree].forEach(entry => {
                console.log(`    Year: ${entry.year}, Full Time Employment Rate: ${entry.employment_rate_ft_perm}`);
                return;

       });
    }
   }
       }
      }
    } while (select != 0);
}


//filter gross monthly salary by percentile
async function filterofgrossmonthlysalary(){
    await getAllData();
    await getuniversity();
displayOption="";
console.log("Please select filter")
displayOption+="1. Gross Monthly Salary -25th Percentile (S$)\n"
displayOption+="2. Gross Monthly Salary -75th Percentile (S$)\n"
var select=0;
displayOption += "Enter 0 to exit.";
do {
  //prompt user to choose filter 
    select = readline.questionInt(displayOption);
    if (select ==1 ) {
        displayOption=""
        let agerangearray=[];
        for (var i = 0; i < dataAll.length; i++) {
          let datayear = (dataAll[i].year)
        
         
         if (agerangearray.indexOf(datayear) === -1) {
            
          agerangearray.push(datayear);
       
     
        }
     
        }
        //prompt user to select year
        displayOption+=("Please select year: \n")
              let agerange= agerangearray.map((year, index) => `${index + 1}. ${year}`);
              
              displayOption+=(agerange.join('\n')+'\n')
              displayOption+=("Enter 0 to exit.")
              let selectedyearNo=readline.questionInt(displayOption)
              if (selectedyearNo < 0 || selectedyearNo > agerangearray.length) {
                console.log("Invalid number. ");
                return;
            }
             let selectedyear=agerangearray[selectedyearNo - 1]
             if(selectedyearNo>= 1 && selectedyearNo <=agerangearray.length){
                displayOption=""
                displayOption+="Please Choose to view:\n"
                displayOption+="1. The university, school and degree having the highest 3 and lowest 3 Gross Monthly Salary - 25 percentile\n"
                displayOption+="2. The average (Gross Monthly Salary - 25 percentile) for each university\n"
                displayOption+="Enter 0 to exit"
                var select2=0
                //prompt user to select within the 2 viewing styles
                select2=readline.questionInt(displayOption)
                if(select2<0||select2 >2){
                  console.log("Enter valid number")
                  return;
                }
                if(select2==0){
                  return;
                }
                //show data in first viewing choice
                if(select2==1){
                const filteredYeardata = dataAll.filter(data=> data.year == selectedyear)
                filteredYeardata.sort((a, b) => b.gross_mthly_25_percentile - a.gross_mthly_25_percentile);
                const highest3values = filteredYeardata.slice(0, 3);
                const lowest3values = filteredYeardata.slice(-3);
                console.log("Top 3 highest values:");
                highest3values.forEach(entry => {
                console.log(`University: ${entry.university}, School: ${entry.school}, Degree: ${entry.degree}, Gross Monthly Salary - 25 percentile: ${entry.gross_mthly_25_percentile}`);
});

                console.log("\nBottom 3 lowest values:");
                lowest3values.forEach(entry => {
                console.log(`University: ${entry.university}, School: ${entry.school}, Degree: ${entry.degree}, Gross Monthly Salary - 25 percentile: ${entry.gross_mthly_25_percentile}`);
                return;
                
});
             }
            
             if(select2==2){
                const filteredYeardata = dataAll.filter(data=> data.year == selectedyear)
                const universityDataObj = {};
               //filter data and store them in variables
                filteredYeardata.forEach(entry => {
                  const university = entry.university;
                  const grossMthly25Percentile = entry.gross_mthly_25_percentile;
                  //use object to store sum and count properties
                
                  universityDataObj[university] = universityDataObj[university] || { sum: 0, count: 0 };
                  universityDataObj[university].sum += grossMthly25Percentile;
                  universityDataObj[university].count += 1;
                 
                });
                //calculate average "gross monthly" data
               
                const averageGrossMthly25PercentileObj = {};
                
                for (const university in universityDataObj) {
                  if (university in universityDataObj) {
                    const value = universityDataObj[university];
                    averageGrossMthly25PercentileObj[university] = Math.round(value.sum / value.count);
                  }
                }
                //sort data 
                
                const sortedResult = [];
                
                for (const university in averageGrossMthly25PercentileObj) {
                  if (university in averageGrossMthly25PercentileObj) {
                    sortedResult.push([university, averageGrossMthly25PercentileObj[university]]);
                  }
                }
                
                sortedResult.sort((a, b) => b[1] - a[1]);
                 //show data in second viewing choice
            let finalresult = sortedResult.join('\n')
                console.log(finalresult);
                return;


    }
}
}

//same thing as select ==1 

    if(select ==2 ){
        displayOption=""
        let agerangearray=[];
        for (var i = 0; i < dataAll.length; i++) {
          let datayear = (dataAll[i].year)
        
         
         if (agerangearray.indexOf(datayear) === -1) {
            
          agerangearray.push(datayear);
       
     
        }
     
        }
        //prompt user to select year and get filter data
        displayOption+=("Please select year: \n")
              let agerange= agerangearray.map((year, index) => `${index + 1}. ${year}`);
              
              displayOption+=(agerange.join('\n')+'\n')
              displayOption+=("Enter 0 to exit.")
              let selectedyearNo=readline.questionInt(displayOption)
              if (selectedyearNo < 0 || selectedyearNo > agerangearray.length) {
                console.log("Invalid number. ");
                return;
            }
            
             let selectedyear=agerangearray[selectedyearNo - 1]
             if(selectedyearNo>= 1 && selectedyearNo <=agerangearray.length){
                displayOption=""
                displayOption+="Please Choose to view:\n"
                displayOption+="1. The university, school and degree having the highest 3 and lowest 3 Gross Monthly Salary - 75 percentile\n"
                displayOption+="2. The average (Gross Monthly Salary - 75 percentile) for each university\n"
                displayOption+="Enter 0 to exit"
                var select2=0
                //prompt user to choose viewing styles
                select2=readline.questionInt(displayOption)
                if(select2<0||select2 >2){
                  console.log("Enter valid number")
                  return;
                }
                if(select2==0){
                  return;
                }
                if(select2==1){
                  //filter data and calculate highest and lowest 3 values and print it
                const filteredYeardata = dataAll.filter(data=> data.year == selectedyear)
                filteredYeardata.sort((a, b) => b.gross_mthly_75_percentile - a.gross_mthly_75_percentile);
                const highest3values = filteredYeardata.slice(0, 3);
                const lowest3values = filteredYeardata.slice(-3);
                console.log("Top 3 highest values:");
                highest3values.forEach(entry => {
                console.log(`University: ${entry.university}, School: ${entry.school}, Degree: ${entry.degree}, Gross Monthly Salary - 75 percentile: ${entry.gross_mthly_75_percentile}`);
});

                console.log("\nBottom 3 lowest values:");
                lowest3values.forEach(entry => {
                console.log(`University: ${entry.university}, School: ${entry.school}, Degree: ${entry.degree}, Gross Monthly Salary - 75 percentile: ${entry.gross_mthly_75_percentile}`);
                return;
});
             }
             if(select2==2){
              //filter data and create object to calculate average "gross monthly " data
                const filteredYeardata = dataAll.filter(data=> data.year == selectedyear)
                const universityDataObj = {};
// store data in var and put data in obj
                filteredYeardata.forEach(entry => {
                  const university = entry.university;
                  const grossMthly75Percentile = entry.gross_mthly_75_percentile;
                
                  universityDataObj[university] = universityDataObj[university] || { sum: 0, count: 0 };
                  universityDataObj[university].sum += grossMthly75Percentile;
                  universityDataObj[university].count += 1;
                 
                });
                
               //calculate data  
                const averageGrossMthly75PercentileObj = {};
                
                for (const university in universityDataObj) {
                  if (university in universityDataObj) {
                    const value = universityDataObj[university];
                    averageGrossMthly75PercentileObj[university] = Math.round(value.sum / value.count);
                  }
                }
                
                //sort data
                const sortedResult = [];
                
                for (const university in averageGrossMthly75PercentileObj) {
                  if (university in averageGrossMthly75PercentileObj) {
                    sortedResult.push([university, averageGrossMthly75PercentileObj[university]]);
                  }
                }
                
                sortedResult.sort((a, b) => b[1] - a[1]);
                //display data
            let finalresult = sortedResult.join('\n')
                console.log(finalresult);
                return;

             }
            }

    }
}while(select!=0)
}

//display top 10 degrees
async function displaytop10degrees(){
    await getAllData();
    await getuniversity();
    displayOption=""
    let agerangearray=[];
    for (var i = 0; i < dataAll.length; i++) {
      let datayear = (dataAll[i].year)
    
     
     if (agerangearray.indexOf(datayear) === -1) {
        
      agerangearray.push(datayear);
   
 
    }
 
    }
    //prompt user for year and filter data with data of previous year as well
    displayOption+=("Please select year: \n")
          let agerange= agerangearray.map((year, index) => `${index + 1}. ${year}`);
          
          displayOption+=(agerange.join('\n')+'\n')
          displayOption+=("Enter 0 to exit.")
          let selectedyearNo=readline.questionInt(displayOption)
          if (selectedyearNo < 0 || selectedyearNo > agerangearray.length) {
            console.log("Invalid number. ");
            return;
        }
         let selectedyear=agerangearray[selectedyearNo - 1]
         let comparingyear=agerangearray[selectedyearNo - 2]
         if(comparingyear==undefined){
            console.log("No data from previous year")
            return;
         }
         if(selectedyearNo>= 1 && selectedyearNo <=agerangearray.length){
            const filteredYeardata = dataAll.filter(data=> data.year == selectedyear)
            const filteredComparingYeardata = dataAll.filter(data => data.year == comparingyear);
          
            //map data to find same data from previous year of the same degree 
const salaryDifferences = filteredYeardata.map(selectedData => {
    const previousData = filteredComparingYeardata.find(data => data.degree === selectedData.degree);
   if(previousData){

   

   //do calculation to get salary difference
    const previousYearSalary = previousData.basic_monthly_median;
    
    
    const salaryDifference = selectedData.basic_monthly_median - previousData.basic_monthly_median;
    
//map out data in form of university, school, degree, selectedyearsalary, previousyearsalary and salary difference
    return {
        university: selectedData.university,
        school: selectedData.school,
        degree: selectedData.degree,
        selectedYearSalary: selectedData.basic_monthly_median,
        previousYearSalary: previousYearSalary,
        difference: salaryDifference
    };
}
else{
   
    return ;

}
});
////sort data and display data
         
const sortedDegrees = salaryDifferences.sort((a, b) => b.difference - a.difference);

console.log("\nTop 10 Degrees with Highest Salary Increment:\n");
        for (let i = 0; i <10; i++) {
            console.log(`${i+1}. University: ${sortedDegrees[i].university}`);
            console.log(`School: ${sortedDegrees[i].school}`);
            console.log(`Degree: ${sortedDegrees[i].degree}`);
            console.log(`Selected Year Salary: ${sortedDegrees[i].selectedYearSalary}`);
            console.log(`Previous Year Salary: ${sortedDegrees[i].previousYearSalary}`);
            console.log(`Difference: ${sortedDegrees[i].difference}`);
            console.log("\n");
        }
    }
   
  }
    


userOption()



//main user menu 
async function userOption(){

    var option=0;
    var displayOption = "";

    console.log("Please select an option (1 to 7):");
    displayOption+="1. Overall employment rate of university of year \n"
    displayOption+="2. Top 10 degrees having the highest 'Basic Monthly Salary - Median' of year \n"
    displayOption+="3. School with the lowest average of 'gross monthly median' of year \n"
    displayOption+="4. summary of 'Full-Time Permanent Employment Rate' over the years of an university(sorted by schools followed by degree) \n"
    displayOption+="5. Filter between (25th or 75th Percentile) of 'Gross Monthly Salary' \n"
    displayOption+="6. Top 10 degrees with the highest increment in terms of 'Basic Monthly Salary -Median' compared to previous year \n"
    displayOption+="7. Exit \n"

    do{
        option =readline.questionInt(displayOption)



if(option==1){
   await displayoverallemplyrate()
}

if(option==2){
  await displaytopsalarydegrees()
   
}

if(option==3){
    await displayschoolwithlowestaverage()
}


if(option==4){
    await displaysummaryofFTemprate()
}

if(option==5){
   await filterofgrossmonthlysalary()
}

if(option==6){
await displaytop10degrees()
}


    }



    while(option != 7);
    console.log("end of program")
}
