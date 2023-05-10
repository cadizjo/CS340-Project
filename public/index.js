window.addEventListener('DOMContentLoaded', function () {

// event listener function could take in the path as a parameter to avoid repeated code but dont know how

    var projects_button = document.getElementById("projects-button")
    if (projects_button) {
        projects_button.addEventListener("click", function () {

            fetch("/projects").then(function(res) {
                if (res.status !== 200) {
                    alert("Could not go to projects")
                }
                else {
                    window.location.href = "/projects"
                }

            })
            
        })
    }

    var students_button = document.getElementById("students-button")
    if (students_button) {
        students_button.addEventListener("click", function () {

            fetch("/students").then(function(res) {
                if (res.status !== 200) {
                    alert("Could not go to students")
                }
                else {
                    window.location.href = "/students"
                }

            })
            
        })
    }

    var assignments_button = document.getElementById("assignments-button")
    if (assignments_button) {
        assignments_button.addEventListener("click", function () {

            fetch("/assignments").then(function(res) {
                if (res.status !== 200) {
                    alert("Could not go to assignments")
                }
                else {
                    window.location.href = "/assignments"
                }

            })
            
        })
    }

    var roles_button = document.getElementById("roles-button")
    if (roles_button) {
        roles_button.addEventListener("click", function () {

            fetch("/roles").then(function(res) {
                if (res.status !== 200) {
                    alert("Could not go to roles")
                }
                else {
                    window.location.href = "/roles"
                }

            })
            
        })
    }

    var tasks_button = document.getElementById("tasks-button")
    if (tasks_button) {
        tasks_button.addEventListener("click", function () {

            fetch("/tasks").then(function(res) {
                if (res.status !== 200) {
                    alert("Could not go to tasks")
                }
                else {
                    window.location.href = "/tasks"
                }

            })
            
        })
    }

    var citations_button = document.getElementById("citations-button")
    if (citations_button) {
        citations_button.addEventListener("click", function () {

            fetch("/citations").then(function(res) {
                if (res.status !== 200) {
                    alert("Could not go to citations")
                }
                else {
                    window.location.href = "/citations"
                }

            })
            
        })
    }
})