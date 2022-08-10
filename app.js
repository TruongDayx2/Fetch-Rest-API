
// link 
var linkCourse = 'http://localhost:3000/courses';


function start(){
    getCourses(renderCourses);

    handleCreateForm();
}

start();

// Read API
function getCourses(callback){
    fetch(linkCourse)
        .then(function(response){
            // chuyển đổi json => javascript type
            return response.json();
        })
        // .then(function(courses){
        //     console.log(courses);
        // });
        .then(callback);
}

function renderCourses(courses){
    var listCourses = document.querySelector('#list-course');
    var htmls = courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xoá</button>
            </li>
        `
    })
    listCourses.innerHTML = htmls.join('');
}

// Create API
function createCourse(data){
    var option = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(linkCourse,option)
        .then(function(response){
            response.json();
        })
        .then(function(){
            getCourses(renderCourses);
        });
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var dataForm = {
            name : name,
            description : description
        }
        createCourse(dataForm);
    }
}

// Delete Course
function handleDeleteCourse(id){
    var option = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(linkCourse + '/' + id ,option)
        .then(function(response){
            response.json();
        })
        .then(function(){
            // Xóa khỏi DOM
            var courseItem = document.querySelector('.course-item-' + id);
            if (courseItem){
                courseItem.remove();
            }
        });
}
