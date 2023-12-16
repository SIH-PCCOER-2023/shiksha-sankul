const student = '../img/student-png.png';
const faculty = '../img/teacher-png.png';

const studentGif = '../img/student.gif';
const facultyGif = '../img/teacher.gif';

function changeToGifHandler(event) {
  const value = event.target.alt;

  if (value === 'STUDENT') {
    event.currentTarget.src = studentGif;
  } else {
    event.currentTarget.src = facultyGif;
  }
}

function changeToImageHandler(event) {
  const value = event.target.alt;

  if (value === 'STUDENT') {
    event.currentTarget.src = student;
  } else {
    event.currentTarget.src = faculty;
  }
}
