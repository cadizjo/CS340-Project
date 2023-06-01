/*
    HELPER FUNCTION FOR ADD PROJECT FORM
*/
function clearAddProjectInputs() {
    var addProjectInputs = [
        document.getElementById('add-project-title-input'),
        document.getElementById('add-project-description-input'),
        document.getElementById('add-project-start-date-input'),
        document.getElementById('add-project-end-date-input'),
    ]

    addProjectInputs.forEach(function(elem) {
        elem.value = ''
    })

    var isActive = document.getElementById('add-project-is-active-input')
    var isCollab = document.getElementById('add-project-is-collaborative-input')

    isActive.checked = false
    isCollab.checked = false
}


/*
    HELPER FUNCTION FOR ADD STUDENT FORM
*/
function clearAddStudentInputs() {
    var addStudentInputs = [
        document.getElementById('add-student-fname-input'),
        document.getElementById('add-student-lname-input'),
        document.getElementById('add-student-email-input'),
        document.getElementById('add-student-phone-input'),
    ]

    addStudentInputs.forEach(function(elem) {
        elem.value = ''
    })
}


/*
    HELPER FUNCTION FOR ADD ASSIGNMENT FORM
*/
function clearAddAssignmentInputs() {
    var email = document.getElementById('add-assignment-email-input')
    var project = document.getElementById('add-assignment-project-input')
    
    email.value = ''
    project.value = ''
}


/* 
    HELPER FUNCTIONS FOR EDIT ASSIGNMENT FORM 
*/
var record = {id: 0}    // stores ID of selected entity record

function clearEditPopupInputs() {
    var email = document.getElementById('edit-assignment-email-input')
    var project = document.getElementById('edit-assignment-project-input')

    email.value = ''
    project.value = ''
}

function hideEditPopup() {
    var editPopup = document.getElementById('edit-assignment');
    var popupBackdrop = document.getElementById('popup-backdrop');
    
    editPopup.classList.add('hidden');
    popupBackdrop.classList.add('hidden');

    clearEditPopupInputs();
}


/* 
    HELPER FUNCTION FOR DELETE ASSIGNMENT/PROJECT POPUP
*/
function hideDeletePopup() {
    var deletePopup = document.getElementById('delete-popup');
    var popupBackdrop = document.getElementById('popup-backdrop');
    
    deletePopup.classList.add('hidden');
    popupBackdrop.classList.add('hidden');
}


/*
    HELPER FUNCTIONS FOR ADD ROLE/ASSIGNED ROLE FORM
*/
function clearAddRoleInputs() {
    var roleTitle = document.getElementById('add-role-title-input')
    roleTitle.value = ''
}

function clearAddAssignedRoleInputs() {
    var assignment = document.getElementById('add-role-assignment-assignment-input')
    var role = document.getElementById('add-role-assignment-role-title-input')

    assignment.value = ''
    role.value = ''
}


/*
    HELPER FUNCTION FOR ADD TASK FORM
*/
function clearAddTaskInputs() {
    var addTaskInputs = [
        document.getElementById('add-task-assignment-id-input'),
        document.getElementById('add-task-title-input'),
        document.getElementById('add-task-description-input'),
        document.getElementById('add-task-due-date-input')
    ]

    addTaskInputs.forEach(function(elem) {
        elem.value = ''
    })

    var isComplete = document.getElementById('add-task-is-complete-input')
    var hasCitations = document.getElementById('add-task-has-citations-input')

    isComplete.checked = false
    hasCitations.checked = false
}


/*
    HELPER FUNCTIONS FOR ADD CITATION/TASK CITATION FORM
*/
function clearAddCitationInputs() {
    var addCitationInputs = [
        document.getElementById('add-citation-title-input'),
        document.getElementById('add-citation-source-input'),
        document.getElementById('add-citation-author-input'),
        document.getElementById('add-citation-url-input'),
    ]

    addCitationInputs.forEach(function(elem) {
        elem.value = ''
    })
}

function clearAddTaskCitationInputs() {
    var task = document.getElementById('add-citation-task-task-input')
    var citation = document.getElementById('add-citation-task-citation-input')

    task.value = ''
    citation.value = ''
}


window.addEventListener('DOMContentLoaded', function () {

// event listener function could take in the path as a parameter to avoid repeated code but not sure how

    /*
        NAVBAR (VIEW PAGES)
    */
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

    /*
        ADD PROJECT FORM
    */
    var addProjectAccept = document.getElementById('add-project-accept')
    if (addProjectAccept) {
        addProjectAccept.addEventListener('click', function(event) {
            event.preventDefault()

            var title = document.getElementById('add-project-title-input').value.trim()
            var desc = document.getElementById('add-project-description-input').value.trim()
            var startDate = document.getElementById('add-project-start-date-input').value
            var endDate = document.getElementById('add-project-end-date-input').value
            var isActive = document.getElementById('add-project-is-active-input').checked
            var isCollab = document.getElementById('add-project-is-collaborative-input').checked

            if (!title) {
                alert("Please enter a title")
            }
            else {
                fetch("/addProject", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        desc: desc,
                        startDate: startDate,
                        endDate: endDate,
                        isActive: isActive,
                        isCollab: isCollab
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 409)
                        alert("Please enter a different project title")
                    else if (res.status == 200) {
                        clearAddProjectInputs()
                        window.location.href = "/projects"
                    }
                })
            }
        })
    }

    var addProjectCancel = document.getElementById('add-project-cancel')
    if (addProjectCancel) {
        addProjectCancel.addEventListener('click', clearAddProjectInputs)
    }


    /*
        ADD STUDENT FORM
    */
    var addStudentAccept = document.getElementById('add-student-accept')
    if (addStudentAccept) {
        addStudentAccept.addEventListener('click', function(event) {
            event.preventDefault()

            var fname = document.getElementById('add-student-fname-input').value.trim()
            var lname = document.getElementById('add-student-lname-input').value.trim()
            var email = document.getElementById('add-student-email-input').value.trim()
            var phone = document.getElementById('add-student-phone-input').value.trim()

            if (!fname || !lname || !email) {
                alert("Please enter a full name and email")
            }
            else {
                fetch("/addStudent", {
                    method: "POST",
                    body: JSON.stringify({
                        fname: fname,
                        lname: lname,
                        email: email,
                        phone: phone
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 409)
                        alert("Please enter a different email")
                    else if (res.status == 200) {
                        clearAddStudentInputs()
                        window.location.href = "/students"
                    }
                })
            }
        })
    }

    var addStudentCancel = document.getElementById('add-student-cancel')
    if (addStudentCancel) {
        addStudentCancel.addEventListener('click', clearAddStudentInputs)
    }


    /*
        ADD ASSIGNMENT FORM
    */
    var addAssignmentAccept = document.getElementById('add-assignment-accept')
    if (addAssignmentAccept) {
        addAssignmentAccept.addEventListener('click', function(event) {
            event.preventDefault()

            var email = document.getElementById('add-assignment-email-input').value.trim()
            var project = document.getElementById('add-assignment-project-input').value

            if (!email || !project) {
                alert("Please fill in all fields")
            }
            else {
                fetch("/addAssignment", {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        project: project
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 409)
                        alert("Email not found. Please enter a valid email")
                    else if (res.status == 410)
                        alert("Assignment already exists. Please enter a different assignment")
                    else if (res.status == 200) {
                        window.location.href = "/assignments"
                        clearAddAssignmentInputs()
                    }
                })
            }
        })
    }

    var addAssignmentCancel = document.getElementById('add-assignment-cancel')
    if (addAssignmentCancel) {
        addAssignmentCancel.addEventListener('click', clearAddAssignmentInputs)
    }


    /* 
        EDIT ASSIGNMENT POPUP 
    */
    var editAssignmentBtns = document.getElementsByClassName('edit-btn');
    if (editAssignmentBtns) {
        for (var i = 0; i < editAssignmentBtns.length; i++) {
            editAssignmentBtns[i].addEventListener('click', function(event) {
                // whenever edit button is clicked, use event obj to locate adjacent/corresponding record ID
                var btnClicked = event.currentTarget
                record.id = btnClicked.parentElement.parentElement.getAttribute("data-value")

                // get data about selected assignment using post request
                fetch("/assignmentData", {
                    method: "POST",
                    body: JSON.stringify(record), 
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    // show popup
                    var editPopup = document.getElementById('edit-assignment');
                    var popupBackdrop = document.getElementById('popup-backdrop');

                    editPopup.classList.remove('hidden');
                    popupBackdrop.classList.remove('hidden');

                    // pre-fill edit-form input fields with selected assignment data
                    var editEmailInput = document.getElementById('edit-assignment-email-input')
                    var editProjectInput = document.getElementById('edit-assignment-project-input')

                    editEmailInput.value = data[0].email

                    if (data[0].project_id == null)
                        editProjectInput.selectedIndex = 0
                    else {
                        for(var i, j = 0; i = editProjectInput.options[j]; j++) {
                            if (i.value == data[0].project_id) {
                                editProjectInput.selectedIndex = j;
                                break;
                            }
                        }
                    }
                })
            })
        }
    }
  
    var editSubmitBtn = document.getElementById('edit-assignment-accept');
    if (editSubmitBtn) {
        editSubmitBtn.addEventListener('click', function(event) {
            event.preventDefault()

            var email = document.getElementById('edit-assignment-email-input').value.trim()
            var project = document.getElementById('edit-assignment-project-input').value

            if (!email || !project) {
                alert("Please fill in all fields")
            }
            else {
                fetch("/updateAssignment", {
                    method: "POST",
                    body: JSON.stringify({
                        id: record.id,
                        email: email,
                        project: project
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 409) {
                        alert("Email not found. Please enter a valid email")
                    }
                    else if (res.status == 410) {
                        alert("Assignment already exists. Please enter different assignment")
                    }
                    else if (res.status == 200) {
                        hideEditPopup()
                        window.location.href = "/assignments"
                    }
                })

            // get update input field values and assignment_id

            // return err if student email isnt filled (since cant be null)

            // o/w send post request to server with input values and assignment_id as body
            }
        })
    }
  
    var editCancelBtn = document.getElementById('edit-assignment-cancel');
    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', hideEditPopup);
    }


    /* 
        DELETE ASSIGNMENT/PROJECT POPUP
    */
    var deleteBtns = document.getElementsByClassName('delete-btn');
    if (deleteBtns) {
        for (var i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', function(event) {
                // whenever delete button is clicked, use event obj to locate adjacent/corresponding record ID
                var btnClicked = event.currentTarget
                record.id = btnClicked.parentElement.parentElement.getAttribute("data-value")

                // check if record is an assignment or project
                var pageTitle = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.textContent

                if (pageTitle == "Assignments") {
                    // send post request to server with assignment_id as body
                    fetch("/singleAssignmentData", {
                        method: "POST",
                        body: JSON.stringify(record), 
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        // show popup
                        var deletePopup = document.getElementById('delete-popup');
                        var popupBackdrop = document.getElementById('popup-backdrop');

                        deletePopup.classList.remove('hidden');
                        popupBackdrop.classList.remove('hidden');

                        // pre-fill delete popup with selected assignment record data
                        var deleteRecordDetails = document.getElementById("delete-popup-record-details")

                        if (data[0].title == null) data[0].title = "NULL"

                        deleteRecordDetails.textContent = data[0].name + " - " + data[0].email + " - " + data[0].title
                    })
                }
    
                else {
                    // send post request to server with project_id as body
                    fetch("/singleProjectData", {
                        method: "POST",
                        body: JSON.stringify(record), 
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        // show popup
                        var deletePopup = document.getElementById('delete-popup');
                        var popupBackdrop = document.getElementById('popup-backdrop');

                        deletePopup.classList.remove('hidden');
                        popupBackdrop.classList.remove('hidden');

                        // pre-fill delete popup with selected project record data
                        var deleteRecordDetails = document.getElementById("delete-popup-record-details")

                        deleteRecordDetails.textContent = data[0].title
                    })
                } 
            })
        }
    }
  
    var deleteAcceptBtn = document.getElementById('delete-accept-btn');
    if (deleteAcceptBtn) {
        deleteAcceptBtn.addEventListener('click', function(event) {

            var pageTitle = event.currentTarget.parentElement.parentElement.parentElement.firstElementChild.textContent

            if (pageTitle == "Assignments") {
                // send post request to server with assignment_id as body
                fetch("/deleteAssignment", {
                    method: "POST",
                    body: JSON.stringify(record), 
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(res) {
                    if (res.status == 400)
                        alert("Could not delete record")
                    else if (res.status == 200)
                        window.location.href = "/assignments" 
                })
            }

            else {
                // send post request to server with project_id as body
                fetch("/deleteProject", {
                    method: "POST",
                    body: JSON.stringify(record), 
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(res) {
                    if (res.status == 400)
                        alert("Could not delete record")
                    else if (res.status == 200)
                        window.location.href = "/projects" 
                })
            }
            
            hideDeletePopup()
        });
    }
  
    var deleteCancelBtn = document.getElementById('delete-cancel-btn');
    if (deleteCancelBtn) {
        deleteCancelBtn.addEventListener('click', hideDeletePopup);
    }


    /*
        ADD ROLE/ASSIGNED ROLE FORM
    */
    var addRoleAccept = document.getElementById('add-role-accept')
    if (addRoleAccept) {
        addRoleAccept.addEventListener('click', function(event) {
            event.preventDefault()

            var role = document.getElementById('add-role-title-input').value.trim()

            if (!role) {
                alert("Please enter a role title")
            }
            else {
                fetch("/addRole", {
                    method: "POST",
                    body: JSON.stringify({
                        role: role
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 409)
                        alert("Role exists. Please enter a different role title.")
                    else if (res.status == 200) {
                        window.location.href = "/roles"
                        clearAddRoleInputs()
                    }
                })
            }
        })
    }

    var addRoleCancel = document.getElementById('add-role-cancel')
    if (addRoleCancel) {
        addRoleCancel.addEventListener('click', clearAddRoleInputs)
    }

    var addAssignedRoleAccept = document.getElementById('add-role-assignment-accept')
    if (addAssignedRoleAccept) {
        addAssignedRoleAccept.addEventListener('click', function(event) {
            event.preventDefault()

            var assignment = document.getElementById('add-role-assignment-assignment-input').value
            var role = document.getElementById('add-role-assignment-role-title-input').value

            if (!assignment || !role) {
                alert("Please fill in all fields")
            }
            else {
                fetch("/addAssignedRole", {
                    method: "POST",
                    body: JSON.stringify({
                        assignment: assignment,
                        role: role
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 410)
                        alert("Assignment with that role already exists. Please enter a different role")
                    else if (res.status == 200) {
                        window.location.href = "/roles"
                        clearAddAssignedRoleInputs()
                    }
                })
            }
        })
    }

    var addAssignedRoleCancel = document.getElementById('add-role-assignment-cancel')
    if (addAssignedRoleCancel) {
        addAssignedRoleCancel.addEventListener('click', clearAddAssignedRoleInputs)
    }


    /*
        ADD TASK FORM
    */
    // set event listener for add task button

    // get user inputs from html form

    // alert if no assignment id or task title entered

    // o/w send fetch req to 'addTask' (insert into tasks or alert if task with same assignment id and task title exists)


    /*
        ADD CITATION/TASK CITATION FORM
    */
    var addCitationAccept = document.getElementById('add-citation-accept')
    if (addCitationAccept) {
        addCitationAccept.addEventListener('click', function(event) {
            event.preventDefault()

            var title = document.getElementById('add-citation-title-input').value.trim()
            var source = document.getElementById('add-citation-source-input').value.trim()
            var author = document.getElementById('add-citation-author-input').value.trim()
            var url = document.getElementById('add-citation-url-input').value.trim()

            if (!title || !source || !author) {
                alert("Please enter a title, source, and author")
            }
            else {
                fetch("/addCitation", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        source: source,
                        author: author,
                        url: url
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 410)
                        alert("Citation with that title and author already exists. Please enter a new citation.")
                    else if (res.status == 200) {
                        window.location.href = "/citations"
                        clearAddCitationInputs()
                    }
                })
            }
        })
    }

    var addCitationCancel = document.getElementById('add-citation-cancel')
    if (addCitationCancel) {
        addCitationCancel.addEventListener('click', clearAddCitationInputs)
    }

    var addTaskCitationAccept = document.getElementById('add-citation-task-accept')
    if (addTaskCitationAccept) {
        addTaskCitationAccept.addEventListener('click', function(event) {
            event.preventDefault()

            var task = document.getElementById('add-citation-task-task-input').value
            var citation = document.getElementById('add-citation-task-citation-input').value

            if (!task || !citation) {
                alert("Please fill in all fields")
            }
            else {
                fetch("/addTaskCitation", {
                    method: "POST",
                    body: JSON.stringify({
                        task: task,
                        citation: citation
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(function(res) {
                    if (res.status == 410)
                        alert("Task with that citation already exists. Please enter a different citation")
                    else if (res.status == 200) {
                        window.location.href = "/citations"
                        clearAddTaskCitationInputs()
                    }
                })
            }
        })
    }

    var addTaskCitationCancel = document.getElementById('add-citation-task-cancel')
    if (addTaskCitationCancel) {
        addTaskCitationCancel.addEventListener('click', clearAddTaskCitationInputs)
    }

})