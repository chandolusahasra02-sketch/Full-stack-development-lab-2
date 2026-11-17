// Experiment 8: To implement CRUD operations on a Student array

// --- CREATE ---
// Initial students array
const students = [
  { id: 1, name: "Ravi", age: 20 },
  { id: 2, name: "Vani", age: 24 }
];

// Add a student to the end (push)
const newStudent = { id: 3, name: "Anil", age: 22 };
students.push(newStudent);

// Add a student to the beginning (unshift)
students.unshift({ id: 4, name: "Kiran", age: 21 });

console.log("All Students:", students);

// --- READ ---
const searchId = 2;
const student = students.find((stud) => stud.id === searchId);

if (student) {
  console.log(`Student with ID ${searchId}:`, student);
} else {
  console.log(`Student with ID ${searchId}: not found`);
}

// --- UPDATE ---
// Update a student by ID
const studentUpdateId = 3;
const updateStudentData = { id: 3, name: "Kumari", age: 20 };

const studentUpdateIndex = students.findIndex(
  (stu) => stu.id === studentUpdateId
);

if (studentUpdateIndex !== -1) {
  // Overriding object properties using the spread operator
  students[studentUpdateIndex] = {
    ...students[studentUpdateIndex],
    ...updateStudentData
  };
  console.log("Updated student:", students[studentUpdateIndex]);
} else {
  console.log(`Student with ID ${studentUpdateId}: not found`);
}

// --- DELETE ---
// Delete a student by ID
const studentDeleteId = 2;
const studentDeleteIndex = students.findIndex(
  (stu) => stu.id === studentDeleteId
);

if (studentDeleteIndex !== -1) {
  // splice removes elements: splice(startIndex, deleteCount)
  const deletedStudent = students.splice(studentDeleteIndex, 1);
  console.log("Student deleted:", deletedStudent[0]);
} else {
  console.log(`Student with ID ${studentDeleteId}: not found`);
}

// Final array state after CRUD operations
console.log("Students after CRUD:", students);