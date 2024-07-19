document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = document.querySelector('input[name="userType"]:checked').value;

        fetch(`http://localhost:3000/${userType}s?username=${username}&password=${password}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    localStorage.setItem('role', userType);
                    document.getElementById('login-container').style.display = 'none';
                    if (userType === 'headteacher') {
                        document.getElementById('headteacher-dashboard-container').style.display = 'block';
                    } else if (userType === 'teacher') {
                        document.getElementById('teacher-dashboard-container').style.display = 'block';
                    }
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Back to login from registration
    document.getElementById('back-to-login').addEventListener('click', function() {
        document.getElementById('registration-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    });

    // Register form submission
    document.getElementById('registration-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const userType = document.querySelector('input[name="reg-userType"]:checked').value;

        const newUser = {
            username: username,
            password: password,
            name: name,
            email: email,
            phone: phone
        };

        fetch(`http://localhost:3000/${userType}s`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                alert('Registration successful');
                document.getElementById('registration-container').style.display = 'none';
                document.getElementById('login-container').style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    });

    // Add teacher button
    document.getElementById('add-teacher-button').addEventListener('click', function() {
        document.getElementById('headteacher-dashboard-container').style.display = 'none';
        document.getElementById('add-teacher-container').style.display = 'block';
    });

    // Add teacher form submission
    document.getElementById('add-teacher-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('teacher-name').value;
        const id = document.getElementById('teacher-id').value;
        const phone = document.getElementById('teacher-phone').value;
        const assignedClass = document.getElementById('teacher-class').value;
        const password = generateRandomPassword(8);

        const newTeacher = {
            username: id,
            password: password,
            name: name,
            phone: phone,
            assignedClass: assignedClass
        };

        fetch('http://localhost:3000/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTeacher)
        })
            .then(response => response.json())
            .then(data => {
                alert('Teacher added successfully. Initial password: ' + password);
                document.getElementById('add-teacher-form').reset();
                document.getElementById('add-teacher-container').style.display = 'none';
                document.getElementById('headteacher-dashboard-container').style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    });

    // Back to dashboard from add teacher
    document.getElementById('back-to-dashboard-from-add-teacher').addEventListener('click', function() {
        document.getElementById('add-teacher-container').style.display = 'none';
        document.getElementById('headteacher-dashboard-container').style.display = 'block';
    });

    // Show admission form
    document.getElementById('show-admission-form').addEventListener('click', function() {
        document.getElementById('headteacher-dashboard-container').style.display = 'none';
        document.getElementById('admission-container').style.display = 'block';
    });

    // Admission form submission
    document.getElementById('admission-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const admissionNumber = document.getElementById('learner-admission-number').value;
        const firstName = document.getElementById('learner-firstname').value;
        const middleName = document.getElementById('learner-middlename').value;
        const surname = document.getElementById('learner-surname').value;
        const dob = document.getElementById('learner-dob').value;
        const gender = document.getElementById('learner-gender').value;
        const disability = document.getElementById('learner-disability').value;
        const guardianName = document.getElementById('guardian-name').value;
        const guardianResidence = document.getElementById('guardian-residence').value;
        const guardianID = document.getElementById('guardian-id').value;
        const guardianPhone = document.getElementById('guardian-phone').value;

        const formData = new FormData();
        formData.append('admissionNumber', admissionNumber);
        formData.append('firstName', firstName);
        formData.append('middleName', middleName);
        formData.append('surname', surname);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('disability', disability);
        formData.append('transferLetter', document.getElementById('transfer-letter').files[0]);
        formData.append('birthCertificate', document.getElementById('birth-certificate').files[0]);
        formData.append('learnerPhoto', document.getElementById('learner-photo').files[0]);
        formData.append('guardianName', guardianName);
        formData.append('guardianResidence', guardianResidence);
        formData.append('guardianID', guardianID);
        formData.append('guardianPhone', guardianPhone);

        fetch('http://localhost:3000/learners', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => { 
                alert('Learner admitted successfully');
                document.getElementById('admission-form').reset();
                document.getElementById('admission-container').style.display = 'none';
                document.getElementById('headteacher-dashboard-container').style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    });

    // Back to dashboard from admission
    document.getElementById('back-to-dashboard-from-admission').addEventListener('click', function() {
        document.getElementById('admission-container').style.display = 'none';
        document.getElementById('headteacher-dashboard-container').style.display = 'block';
    });

    // List teachers
    document.getElementById('list-teachers-button').addEventListener('click', function() {
        fetch('http://localhost:3000/teachers')
            .then(response => response.json())
            .then(teachers => {
                const teachersContainer = document.getElementById('teachers-container');
                teachersContainer.innerHTML = '<h2>List of Teachers</h2><ul>';
                teachers.forEach(teacher => {
                    teachersContainer.innerHTML += `<li>${teacher.name} (ID: ${teacher.username}, Phone: ${teacher.phone})</li>`;
                });
                teachersContainer.innerHTML += '</ul>';
                teachersContainer.style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    });

    // List class teachers
    document.getElementById('class-teachers-button').addEventListener('click', function() {
        fetch('http://localhost:3000/teachers?assignedClass_ne=')
            .then(response => response.json())
            .then(teachers => {
                const teachersContainer = document.getElementById('teachers-container');
                teachersContainer.innerHTML = '<h2>Class Teachers</h2><ul>';
                teachers.forEach(teacher => {
                    if (teacher.assignedClass) {
                        teachersContainer.innerHTML += `<li>${teacher.name} (Class: ${teacher.assignedClass})</li>`;
                    }
                });
                teachersContainer.innerHTML += '</ul>';
                teachersContainer.style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    });

    // Logout
    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('role');
        document.getElementById('headteacher-dashboard-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    });

    document.getElementById('logout-button-teacher').addEventListener('click', function() {
        localStorage.removeItem('role');
        document.getElementById('teacher-dashboard-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    });

    // Fetch learners by grade
    // Fetch learners by grade
function fetchLearnersByGrade(grade) {
    fetch(`http://localhost:3000/learners?grade=${grade}`)
        .then(response => response.json())
        .then(learners => {
            const learnersContainer = document.getElementById('learners-container');
            learnersContainer.innerHTML = `<h2>Grade ${grade} Learners</h2><ul>`; // Corrected line
            learners.forEach(learner => {
                learnersContainer.innerHTML += `<li>${learner.firstName} ${learner.surname} (Admission No: ${learner.admissionNumber})</li>`;
            });
            learnersContainer.innerHTML += '</ul>';
            learnersContainer.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}


    // Grade buttons event listeners
    document.querySelectorAll('.grade-btn').forEach(button => {
        button.addEventListener('click', function() {
            const grade = this.getAttribute('data-grade');
            fetchLearnersByGrade(grade);
        });
    });

    // Password generator
    function generateRandomPassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
});
