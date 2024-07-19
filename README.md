# Acarank Learner Management System


Acarank is a single-page application designed for managing school information for both teachers and learners. It uses a db.json database to store and update information within the system. The system features a two-tier login mechanism, allowing users to select their role via a checkbox.
Features
Login System

    Two-Tier Login: Aesthetically presentable login form with a checkbox function to choose between Headteacher and Teacher roles.
    Password/Username Recovery: Option for teachers to reset forgotten credentials.

## User 1: Headteacher

As the super-user/admin, the headteacher has full control over the system.
Key Functionalities:

    Create New Account: Option to create new teacher accounts.

    Learner Admission:
        Collect detailed information including:
            Full name (First, middle, and surname)
            Date of birth
            Gender
            Physical disability status (using a dropdown menu)
            Upload required documents (e.g., transfer letter, birth certificate)
            Parent/Guardian details (Name, area of residence, national ID number, and phone number)
            Upload passport size photo
        Information is collected through a form and displayed in the class profile.

    Class Management:
        Assign/Change Class Teachers: Assign a class teacher to a class. Ensure no two teachers are assigned to the same class. If a conflict arises, an alert will notify the user of the existing class teacher.

    Class Overview: Display classes ranging from Grade 1 to Grade 8. Click on a class button to view detailed information.

    Restricted Access:
        Teachers (not class teachers) will have limited access to student information—view only lists and a summary of male and female students.
        Class teachers and the headteacher have full access to learner information and can view detailed admission data. Only the headteacher can delete information.

## User 2: Teacher

Upon successful login, teachers can:

    View Learner Profiles: Access bio data and profile photos for learners in their class.

    Enter Marks: Input marks for progressive CATs and examinations for each learner. Each term includes 3 CATs and 1 examination.
        Subjects: Mathematics, English, Kiswahili, Science, and Social Studies/C.R.E.
        Maximum Points: Each subject has a cumulative maximum of 100 points, making a total of 500 points.

## File Management

    Folders: Two folders are used for storing profile photos and documents.
    Naming System: Use a distinctive naming convention based on teacher/learner names and class for easy access. These filenames should also be recorded in the database profile.

## Technical Specifications

    Single-Page Application (SPA): The application operates as a single page with dynamic content updates.
    Display Window: Create a display window within a div for entering and showing marks.

