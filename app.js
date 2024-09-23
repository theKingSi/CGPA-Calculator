document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add');
    const addSecond = document.getElementById('addSecond');
    const calcButton = document.getElementById('calc-gp');
    const calcButtonSecond = document.getElementById('calc-gpSecond2');
    const clearButton = document.getElementById('clear');
    const clearButtonSecond = document.getElementById('clear2');
    const tbody = document.getElementById('tbody');
    const tfoot = document.getElementById('tfoot');
    const tbody2 = document.getElementById('tbody2');
    const tfoot2 = document.getElementById('tfoot2');
    const showSemester2Button = document.getElementById('show-semester2');
    const hideSemester2Button = document.getElementById('hide-semester2');
    const semester2Section = document.getElementById('semester2-section');
    const ShowResult = document.getElementById('ShowResult')
    const ShowResult2 = document.getElementById('ShowResult2')
    
    let courses = [];
    let coursesSemester2 = [];
    let gpa1 = 0, gpa2 = 0;

    addButton.addEventListener('click', () => {
        const courseCode = document.getElementById('course').value;
        const units = document.getElementById('units').value;
        const grade = document.getElementById('grade').value;
         

        if (courseCode && units && grade !== "") {
            courses.push({
                code: courseCode,
                units: parseInt(units),
                grade: parseInt(grade)
            });



            updateTable();
            clearInputs();
        } else {
            ShowResult.innerHTML = `Please fill all the fields.`;
        }
    });

   
    calcButton.addEventListener('click', () => {
        const unit = courses.map((course)=>{
            return course.units
        
        })   

        let dummyunit = 0
        unit.forEach((el) => dummyunit += el)
        
        console.log(dummyunit);
        
        if (courses.length === 0 || dummyunit < 12) {
            ShowResult.innerHTML = `Units should not be less than 12.`;
            return;
        }

        let totalUnits = 0;
        let totalPoints = 0;

        courses.forEach(course => {
            totalUnits += course.units;
            totalPoints += course.units * course.grade;
        });

        const gpa = (totalPoints / totalUnits).toFixed(2);

        tfoot.innerHTML = `
            <tr>
                <td colspan="2">Total CGPA</td>
                <td>${gpa}</td>
            </tr>
        `;
    });

    clearButton.addEventListener('click', () => {
        courses = [];
        updateTable();
        tfoot.innerHTML = '';
    });

    addSecond.addEventListener('click', () => {
        const courseCode = document.getElementById('course2').value;
        const units = document.getElementById('units2').value;
        const grade = document.getElementById('grade2').value;
         

        if (courseCode && units && grade !== "") {
            coursesSemester2.push({
                code: courseCode,
                units: parseInt(units),
                grade: parseInt(grade)
            });

           
            

            updateTable2();
            clearInputs2();
        } else {
            ShowResult2.innerHTML = `Please fill all the fields.`;
        }
    });


    calcButtonSecond.addEventListener('click', () => {
        const unit = courses.map((course)=>{
            return course.units
        
        }) 

        let dummyunit2 = 0
        unit.forEach((el) => dummyunit2 += el)
        
        console.log(dummyunit2);

        if (coursesSemester2.length === 0 || dummyunit2 < 12) {
            ShowResult2.innerHTML = `Units should not be less than 12.`;
            return;
        }

        let totalUnits2 = 0;
        let totalPoints2 = 0;

        coursesSemester2.forEach(course => {
            totalUnits2 += course.units;
            totalPoints2 += course.units * course.grade;
        });

        const gpa2 = (totalPoints2 / totalUnits2).toFixed(2);

        tfoot2.innerHTML = `
            <tr>
                <td colspan="2">Total CGPA</td>
                <td>${gpa2}</td>
            </tr>
        `;
    });

    clearButtonSecond.addEventListener('click', () => {
        coursesSemester2 = [];
        updateTable2();
        tfoot2.innerHTML = '';
    });


    function updateTable() {
        tbody.innerHTML = '';
        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.code}</td>
                <td>${course.units}</td>
                <td>${getGradeLetter(course.grade)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function updateTable2() {
        tbody2.innerHTML = '';
        coursesSemester2.forEach(course2 => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course2.code}</td>
                <td>${course2.units}</td>
                <td>${getGradeLetter(course2.grade)}</td>
            `;
            tbody2.appendChild(row);
        });
    }

    function clearInputs() {
        document.getElementById('course').value = '';
        document.getElementById('units').value = '';
        document.getElementById('grade').value = '';
    }

    function clearInputs2() {
        document.getElementById('course2').value = '';
        document.getElementById('units2').value = '';
        document.getElementById('grade2').value = '';
    }

const button = true
  

    showSemester2Button.addEventListener('click', () => {

        
        
        semester2Section.style.display = 'block';
        showSemester2Button.style.display = 'none';
        hideSemester2Button.style.display = 'block';
        
        
        
    });
    
    
    
    hideSemester2Button.addEventListener('click', () => {
         showSemester2Button.style.display = 'block';
         semester2Section.style.display = 'none';
        //  hideSemester2Button.style.display = 'block';
        });


      



    

    

    function getGradeLetter(grade) {
        switch (grade) {
            case 5: return 'A';
            case 4: return 'B';
            case 3: return 'C';
            case 2: return 'D';
            case 1: return 'E';
            case 0: return 'F';
        }
    }
});

