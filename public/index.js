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
                    else if (res.status == 200)
                        window.location.href = "/assignments"
                })
            
                clearAddAssignmentInputs()
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
            
                var editPopup = document.getElementById('edit-assignment');
                var popupBackdrop = document.getElementById('popup-backdrop');

                editPopup.classList.remove('hidden');
                popupBackdrop.classList.remove('hidden');
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
                        clearEditPopupInputs()
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
            
                var deletePopup = document.getElementById('delete-popup');
                var popupBackdrop = document.getElementById('popup-backdrop');

                deletePopup.classList.remove('hidden');
                popupBackdrop.classList.remove('hidden');
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
})