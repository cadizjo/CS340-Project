var record = {id: 0}    // stores ID of selected entity record

/* 
EDIT ASSIGNMENT POPUP 
*/

function clearEditPopupInputs() {

    var email = document.getElementById('email-input')
    var project_title = document.getElementById('project-title-input-edit')

    email.value = ''
    project_title.value = ''

}

function hideEditPopup() {

    var editPopup = document.getElementById('edit-assignment');
    var popupBackdrop = document.getElementById('popup-backdrop');
    
    editPopup.classList.add('hidden');
    popupBackdrop.classList.add('hidden');

    clearEditPopupInputs();

}

function handleEditPopupSubmit() {

    // get update input field values and assignment_id

    // return err if student email isnt filled (since cant be null)

    // o/w send post request to server with input values and assignment_id as body

    fetch("/updateAssignment", {
        method: "POST",
        body: JSON.stringify(record), 
        headers: {
            "Content-Type": "application/json"
        }
    
    })

    hideEditPopup()
}


/* 
DELETE ASSIGNMENT/PROJECT POPUP
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
    EDIT ASSIGNMENT POPUP 
    */
    var editAssignmentBtns = document.getElementsByClassName('edit-btn');
    if (editAssignmentBtns) {
        for (var i = 0; i < editAssignmentBtns.length; i++) {
            editAssignmentBtns[i].addEventListener('click', function(event) {
                // whenever edit button is clicked, use event obj to locate adjacent/corresponding record ID
                var btnClicked = event.currentTarget
                record.id = btnClicked.parentElement.parentElement.firstElementChild.textContent
            
                var editPopup = document.getElementById('edit-assignment');
                var popupBackdrop = document.getElementById('popup-backdrop');

                editPopup.classList.remove('hidden');
                popupBackdrop.classList.remove('hidden');
            })
        }
    }
  
    var editSubmitBtn = document.getElementById('edit-accept-btn');
    if (editSubmitBtn) {
        editSubmitBtn.addEventListener('click', handleEditPopupSubmit);
    }
  
    var editCancelBtn = document.getElementById('edit-cancel-btn');
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
                record.id = btnClicked.parentElement.parentElement.firstElementChild.textContent
            
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