const fetchLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((lessonsData) => displayLessons(lessonsData.data));
};
const displayLessons = (lessons) => {
  const lessonsLevelContainer = document.getElementById(
    "lessons-level-container"
  );
  lessonsLevelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const lessonButton = document.createElement("button");
    lessonButton.innerHTML = `
    <button class="btn bg-white text-[#422AD5] hover:text-white hover:bg-[#422AD5] btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
    `;
    lessonsLevelContainer.append(lessonButton);
  });
};
fetchLevels();
