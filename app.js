document.addEventListener('DOMContentLoaded', () => {
    const semesterFormsContainer = document.getElementById('semester-forms');
    const addSemesterButton = document.getElementById('add-semester');
    const calcCGPAButton = document.getElementById('Cal-Cgpa');
    const ShowCGPAResult = document.getElementById('ShowCGPAResult');
    const printButton = document.getElementById('print');
    const outline = document.getElementById('outline');
    const ShowPrintError = document.getElementById('ShowPrint');

    let semesterCount = 1;
    let semesters = {};

    // Add initial semester
    addSemesterForm(1);

    // Add new semester on button click
    addSemesterButton.addEventListener('click', () => {
        semesterCount++;
        addSemesterForm(semesterCount);
    });

    // Calculate CGPA across all semesters
    calcCGPAButton.addEventListener('click', () => {
        let totalGPA = 0;
        let totalUnits = 0;

        for (let sem in semesters) {
            const { gpa, units } = semesters[sem];
            totalGPA += gpa * units;
            totalUnits += units;
        }

        const cgpa = (totalGPA / totalUnits).toFixed(2);
        ShowCGPAResult.innerHTML = `Your CGPA is: ${cgpa}`;
    });

    

   // Add a new semester form
function addSemesterForm(semesterNumber) {
    const semesterForm = document.createElement('div');
    semesterForm.innerHTML = `
        <h2>Semester ${semesterNumber}</h2>
        <input type="text" id="course${semesterNumber}" placeholder="Course Code">
        <input type="number" id="units${semesterNumber}" placeholder="Units">
        <select id="grade${semesterNumber}">
            <option value="">Select Grade</option>
            <option value="5">A</option>
            <option value="4">B</option>
            <option value="3">C</option>
            <option value="2">D</option>
            <option value="1">E</option>
            <option value="0">F</option>
        </select>
        <button id="addCourse${semesterNumber}">Add Course</button>
        <button class="luf" id="clear${semesterNumber}">Clear Courses</button>
        <table id="outline${semesterNumber}" style="display: none;">  <!-- Changed id to be unique per semester -->
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Units</th>
                    <th>Grade</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="tbody${semesterNumber}"></tbody>
            <tfoot id="tfoot${semesterNumber}"></tfoot>
        </table>
        <button id="calc-gpa${semesterNumber}">Calculate GPA</button>
        <div id="ShowResult${semesterNumber}"></div>
        <div id="error${semesterNumber}" style="color: red;"></div> <!-- Error message -->
    `;
    semesterFormsContainer.appendChild(semesterForm);

    // Add event listeners for each semester
    const courses = [];
    document.getElementById(`addCourse${semesterNumber}`).addEventListener('click', () => {
        const courseCode = document.getElementById(`course${semesterNumber}`).value;
        const units = parseInt(document.getElementById(`units${semesterNumber}`).value);
        const grade = parseInt(document.getElementById(`grade${semesterNumber}`).value);

        if (courseCode && units && grade !== "") {
            // Add the course to the courses array
            courses.push({ code: courseCode, units, grade });

            // Update the table with the new course
            updateTable(semesterNumber, courses);

            // Make the table visible
            const table = document.getElementById(`outline${semesterNumber}`);
            table.style.display = 'table';  // Show the table when a course is added

            // Clear the input fields after adding the course
            document.getElementById(`course${semesterNumber}`).value = '';
            document.getElementById(`units${semesterNumber}`).value = '';
            document.getElementById(`grade${semesterNumber}`).value = '';
            
            // Clear error message
            document.getElementById(`error${semesterNumber}`).innerHTML = '';
        }
    });

    document.getElementById(`calc-gpa${semesterNumber}`).addEventListener('click', () => {
        const totalUnits = courses.reduce((sum, course) => sum + course.units, 0);
        if (totalUnits < 12) {
            document.getElementById(`error${semesterNumber}`).innerHTML = 'Error: Total units must be at least 12';
            return; // Stop the function execution
        }

        const { gpa } = calculateGPA(courses);
        semesters[semesterNumber] = { gpa, units: totalUnits };
        document.getElementById(`tfoot${semesterNumber}`).innerHTML = `<tr><td colspan="2">Total GPA</td><td>${gpa}</td></tr>`;
    });

    document.getElementById(`clear${semesterNumber}`).addEventListener('click', () => {
        courses.length = 0;
        updateTable(semesterNumber, courses);
        document.getElementById(`error${semesterNumber}`).innerHTML = ''; // Clear error message on clear
    });
}

    // Update table for each semester and add delete functionality
    function updateTable(semesterNumber, courses) {
        const tbody = document.getElementById(`tbody${semesterNumber}`);
        tbody.innerHTML = '';
        courses.forEach((course, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.code}</td>
                <td>${course.units}</td>
                <td>${getGradeLetter(course.grade)}</td>
                <td><button class="luf" data-index="${index}">Del</button></td>
            `;
            tbody.appendChild(row);

            // Add delete functionality to the "Del" button
            row.querySelector(`button[data-index="${index}"]`).addEventListener('click', () => {
                courses.splice(index, 1); // Remove the course at the current index
                updateTable(semesterNumber, courses); // Update the table after deletion
            });
        });
    }

    // Calculate GPA for a semester
    function calculateGPA(courses) {
        let totalUnits = 0;
        let totalPoints = 0;

        courses.forEach(course => {
            totalUnits += course.units;
            totalPoints += course.units * course.grade;
        });

        return { gpa: (totalPoints / totalUnits).toFixed(2) };
    }

    function getGradeLetter(grade) {
        switch (grade) {
            case 5: return 'A';
            case 4: return 'B';
            case 3: return 'C';
            case 2: return 'D';
            case 1: return 'E';
            case 0: return 'F';
            default: return '';
        }
    }

    // Print CGPA Result
    printButton.addEventListener('click', () => {
        window.print();
    });
});
