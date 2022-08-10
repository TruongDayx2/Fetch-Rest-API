
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
    document.querySelector('#update').style.display = 'none';
    document.querySelector('#cancel').style.display = 'none';

    var htmls = courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4 class="course-name-${course.id}">${course.name}</h4>
                <p class="course-des-${course.id}">${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xoá</button>
                <button onclick="openUpdateForm(${course.id})">Sửa</button>
            </li>
        `
    })
    listCourses.innerHTML = htmls.join('');
}

// Update 
function openUpdateForm(id){

    document.querySelector('#create').style.display = 'none';
    document.querySelector('#update').style.display = 'block';
    document.querySelector('#cancel').style.display = 'block';

    // Gán giá trị cho cá thẻ input

    var courseName = document.querySelector('.course-name-' + id);
    document.querySelector('input[name="name"]').value = `${courseName.textContent}`;
    var courseDes = document.querySelector('.course-des-' + id);
    document.querySelector('input[name="description"]').value = `${courseDes.textContent}`;


    // cancel update course
    document.querySelector('#cancel').onclick = function(){
        document.querySelector('#create').style.display = 'block';
        document.querySelector('#update').style.display = 'none';
        document.querySelector('#cancel').style.display = 'none';
        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="description"]').value = '';
    }

    // click delete
    document.querySelector('#update').onclick = function(){
        handleUpdateForm(id);
    }


    
}

function updateCourse(data,id){
    var option = {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(linkCourse + '/' + id ,option)
        .then(function(response){
            response.json();
        })
        .then(function(){
            getCourses(renderCourses);
        });
}

function handleUpdateForm(id){
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var dataForm = {
        name : name,
        description : description
    }
    updateCourse(dataForm,id);
    document.querySelector('#create').style.display = 'block';
    document.querySelector('#update').style.display = 'none';
    document.querySelector('#cancel').style.display = 'none';
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="description"]').value = '';
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
            document.querySelector('#update').style.display = 'none';
            document.querySelector('#cancel').style.display = 'none';
            document.querySelector('#create').style.display = 'block';

        });
}
