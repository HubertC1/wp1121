// import axios from axios
/* global axios */
const itemTemplate = document.querySelector("#diary-template");
const diaryList = document.querySelector("#diaries");
let inspecting = -1;

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// const instance = {
//   "diaries": [
//      {
//         "id": "01",
//         "language": "Java",
//         "edition": "third",
//         "author": "Herbert Schildt"
//      },

//      {
//         "id": "07",
//         "language": "C++",
//         "edition": "second",
//         "author": "E.Balagurusamy"
//      }

//   ]
// }

async function main() {
  setupEventListeners();  
  try {
    const diaries = await getDiaries();
    diaries.forEach((diary) => renderDiary(diary));
  } catch (error) {
    alert("Failed to load diaries!");
  }
}

function setupEventListeners() {
  const addDiaryButton = document.querySelector("#add-diary");
  const closeDiaryButton = document.querySelector("#close-edit");
  const cancelButton = document.querySelector("#cancel-edit");
  const diaryInput = document.querySelector("#diary-input");
  const moodInput = document.querySelector("#mood");
  const topicInput = document.querySelector("#topic");
  const diaryDate = document.querySelector("#diary-date");
  const editWindow = document.querySelector("#edit-window");
  addDiaryButton.addEventListener("click", async () => {
    inspecting = -1;
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth();
    let date = myDate.getDate();
    if (month<10){
      month = "0" + month;
    }
    if (date<10){
      date = "0" + date;
    }
    let fullDate = year + "-" + month + "-" + date;
    diaryDate.value = fullDate;
    // console.log(year);
    diaryInput.value = "";
    moodInput.value = "unselected";
    topicInput.value = "unselected";
    editWindow.show();
  });
  closeDiaryButton.addEventListener("click", async() =>{
    // alert(diaryInput.value);
    const content = diaryInput.value;
    // const date = new Date();
    // console.log(diaryDate.value);
    let date;
    let topic;
    let mood; 
    date = document.querySelector("#diary-date").value;
    // console.log(date);
    topic = document.querySelector("#topic").value;
    if (topic === "unselected"){
      alert("What's your diary about?");
      return;
    }
    mood = document.querySelector("#mood").value;
    if (mood === "unselected"){
      alert("You have feelings right? Fill them in~~");
      return;
    }
    if (!content){
      alert("You must be thinking of something, write it down~");
      return;
    }
    if (inspecting === -1){
      try{
        const diary = await createDiary({date,topic,mood,content});
        renderDiary(diary);
      }catch (error){
        alert("Failed to create diary!");
        return;
      }
    }else{
      try{
        const diary = {date,topic,mood,content};
        console.log(date);
        await updateDiaryStatus(inspecting.id, diary);
        location.reload();
        // try {
        //   const diaries = await getDiaries();
        //   diaries.forEach((diary) => renderDiary(diary));
        // } catch (error) {
        //   alert("Failed to load diaries!");
        // }
      }catch(error){
        alert("Failed to update diary!");
        return;
      }
    }

    diaryInput.value = "";
    document.querySelector("#topic").value = "unselected";
    document.querySelector("#mood").value = "unselected";
    
    editWindow.close();
  });
  cancelButton.addEventListener("click", async()=>{
    editWindow.close();
  })
}

function renderDiary(diary) {
  const item = createDiaryElement(diary);
  diaryList.appendChild(item);
}

function createDiaryElement(diary) {
  const item = itemTemplate.content.cloneNode(true);
  const inspect_window = document.querySelector("#inspect-window");
  const inspect_date = document.querySelector("#inspect-date");
  const inspect_topic = document.querySelector("#inspect-topic");
  const inspect_mood = document.querySelector("#inspect-mood");
  const inspect_content = document.querySelector("#inspect-content");
  const container = item.querySelector(".diary-item");
  container.id = diary.id;
  console.log(diary);
  const date = item.querySelector("p.diary-date");
  date.innerText = diary.date;
  const topic = item.querySelector("p.topic");
  topic.innerText = diary.topic;
  const mood = item.querySelector("p.mood");
  mood.innerText = diary.mood;
  const outline = item.querySelector("p.outline");
  outline.innerText = diary.content;
  const deleteButton = item.querySelector("button.delete-diary");
  const inspectButton = item.querySelector("button.inspect-diary");
  const inspectCloseButton = document.querySelector("#inspect-close");
  const inspectEditButton = document.querySelector("#inspect-edit");
  deleteButton.dataset.id = diary.id;
  inspectButton.dataset.id = diary.id;
  deleteButton.addEventListener("click", () => {
    deleteDiaryElement(diary.id);
  });
  inspectButton.addEventListener("click", ()=>{
    inspect_date.innerText = diary.date;
    inspect_topic.innerText = diary.topic;
    inspect_mood.innerText = diary.mood;
    inspect_content.innerText = diary.content;
    inspecting = diary;
    inspect_window.show();

  })
  inspectCloseButton.addEventListener("click", ()=>{
    inspect_window.close();
  })
  inspectEditButton.addEventListener("click", ()=>{
    const editWindow = document.querySelector("#edit-window");
    inspect_window.close();
    document.querySelector("#diary-date").value = inspecting.date;
    document.querySelector("#topic").value = inspecting.topic;
    document.querySelector("#mood").value = inspecting.mood;
    document.querySelector("#diary-input").value = inspecting.content;

    editWindow.show();
  })
  return item;
}

async function deleteDiaryElement(id) {
  try {
    await deleteDiaryById(id);
  } catch (error) {
    alert("Failed to delete diary!");
  } finally {
    const diary = document.getElementById(id);
    diary.remove();
  }
}

async function getDiaries() {
  const response = await instance.get("/diaries");
  return response.data;
}

async function createDiary(diary) {
  const response = await instance.post("/diaries", diary);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateDiaryStatus(id, diary) {
  const response = await instance.put(`/diaries/${id}`, diary);
  return response.data;
}

async function deleteDiaryById(id) {
  const response = await instance.delete(`/diaries/${id}`);
  return response.data;
}

main();
