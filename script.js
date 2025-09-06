// Fetch the levels (buttons) to line 6
const fetchLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((lessonsData) => displayLessons(lessonsData.data));
};
// catch the level no's as a parameter "lessonNo", here "lesson no = level no"
const loadLessonWords = (lessonNo) => {
  // fetch the words dynamically according to the levels
  const url = `https://openapi.programming-hero.com/api/level/${lessonNo}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // get the active button inside button container
      const previousActive = document.querySelector(
        "#lessons-level-container .active"
      );
      // remove the active button if there is
      if (previousActive) {
        previousActive.classList.remove("active");
      }
      // get the dynamic active button
      const getActiveButton = document.getElementById(
        `active-button-${lessonNo}`
      );
      // add 'active' class to that button
      getActiveButton.classList.add("active");
      displayLessonWords(data.data);
    });
};
// Get words details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(url);
  const wordDetails = await response.json();
  displayWordsDetails(wordDetails.data);
};
// Display words details
const displayWordsDetails = (details) => {
  console.log(details);
  let synonymsHTML = "";
  if (details.synonyms && details.synonyms.length > 0) {
    synonymsHTML = details.synonyms
      .map(
        (synonym) =>
          `<p class="text-base font-normal bg-[#EDF7FF] px-5 py-2 rounded-md">${synonym}</p>`
      )
      .join("");
  } else {
    synonymsHTML = `<p class="text-base font-normal bg-[#EDF7FF] px-5 py-2 rounded-md">
      No synonyms found!
    </p>`;
  }

  const wordsDetailsContainer = document.getElementById(
    "words-details-container"
  );
  wordsDetailsContainer.innerHTML = `
 <div class="border border-[#EDF7FF] p-5 rounded-xl">
            <h2 class="font-semibold text-3xl">
              ${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})
            </h2>
            <div class="my-6">
              <p class="font-semibold text-xl mb-2">Meaning</p>
              <p class="font-medium hind-siliguri text-xl">${details.meaning}</p>
            </div>

            <div>
              <p class="font-semibold text-xl mb-2">Example</p>
              <p class="text-xl">${details.sentence}</p>
            </div>
            <p class="font-medium hind-siliguri text-xl mt-6 mb-3">
              Synonyms
            </p>
            <div class="flex gap-2 flex-wrap">
                ${synonymsHTML}             
            </div>
          </div>
 `;
  document.getElementById("modal").showModal();
};
// display all the words
const displayLessonWords = (words) => {
  // data = words
  const lessonWordsContainer = document.getElementById(
    "lesson-words-container"
  );
  lessonWordsContainer.innerHTML = "";
  // if any level is empty, solve the error, show the below card/error message
  if (words.length == 0) {
    lessonWordsContainer.innerHTML = `
  <div class="text-center col-span-3 my-8">
        <img class="m-auto mb-3" src="assets/alert-error.png" alt="">
        <p class="hind-siliguri text-[#79716B] text-sm mb-3">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-medium hind-siliguri text-[#292524] text-3xl">
          নেক্সট Lesson এ যান
        </h2>
      </div>
  `;
    return; // must return
  }
  // if there are words, then show the below card
  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="word-cards bg-white rounded-xl text-center p-10 flex flex-col h-full">
        <h3 class="word inter font-bold text-3xl mb-4">${
          word.word ? word.word : "No word found!"
        }</h3>
        <p class="inter font-medium text-xl mb-4">Meaning/Pronunciation</p>
        <p
          class="hind-siliguri text-[rgba(24,24,27,0.8)] font-semibold text-2xl mb-10"
        >
          ${word.meaning ? word.meaning : "meaning not found!"}/${
      word.pronunciation ? word.pronunciation : "no pronunciation found!"
    }
        </p>
        <div class="flex justify-between items-center mt-auto">
          <button onclick = "loadWordDetails(${word.id})"
            class="bg-[rgba(26,144,255,0.1)] px-4 py-3 text-[#374957] rounded-lg cursor-pointer hover:text-black hover:bg-[rgba(26,144,255,0.2)]"
          >
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button
            class="bg-[rgba(26,144,255,0.1)] px-4 py-3 text-[#374957] rounded-lg cursor-pointer hover:text-black hover:bg-[rgba(26,144,255,0.2)]"
          >
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    lessonWordsContainer.append(wordCard);
  });
};
// display the lesson buttons
const displayLessons = (lessons) => {
  const lessonsLevelContainer = document.getElementById(
    "lessons-level-container"
  );
  lessonsLevelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const lessonButton = document.createElement("button");
    // create a button, add event listener by calling "loadLessonWords" function sending level no's dynamically as arguments
    lessonButton.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}`;
    lessonButton.id = `active-button-${lesson.level_no}`;
    lessonButton.onclick = () => loadLessonWords(lesson.level_no);
    lessonButton.className =
      "btn bg-white text-[#422AD5] hover:text-white hover:bg-[#422AD5] btn-primary";
    lessonsLevelContainer.append(lessonButton);
  });
};
// Call fetchLevel function
fetchLevels();
