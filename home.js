import { onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc  , getDocs ,  orderBy,   Timestamp , doc, deleteDoc , updateDoc , query, where} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { auth } from "./confiq.js";
import { db } from "./confiq.js";

let button = document.querySelector('#button')
let num = document.querySelector("#number")
let text = document.querySelector("#text")
let div = document.querySelector("#div")



let array = []
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    deta()
    console.log(uid);
  
  } else {
    window.location = "index.html"
  }
});



button.addEventListener("click" , async ()=>{
  try {
  const docRef = await addDoc(collection(db, "users"), {
    num : num.value,
    text : text.value,
    date: Timestamp.fromDate(new Date()),
    uid : auth.currentUser.uid
  });
  console.log("Document written with ID: ", docRef.id);
  console.log(text.value);
  console.log(num.value);
  console.log("han bhai ye raha" + auth.currentUser.uid);
  array.unshift({
     num : num.value,
    text : text.value,
      date: Timestamp.fromDate(new Date()),
      id: docRef.id
    })
  
} catch (e) {
  console.error("Error adding document: ", e);
}




text.value = "";
num.value = ""

  
})

async function deta(){
  const q = query(collection(db, "users"), where("uid" ,   "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push({...doc.data(), id: doc.id})
  })
  render(array)

}




function render(arr){
  div.innerHTML = ""
  arr.map((item)=>{
  
    div.innerHTML += `<div class = "card">
    <h1>${item.num}</h1>
    <h1>${item.text}</h1>
    <h1>${item.date}</h1>
  
     <button id="delete">Delete</button>
    <button id="edit">edit</button>
    
    </div>`

  })


  
 

      let dlete = document.querySelectorAll("#delete")
      let edit = document.querySelectorAll("#edit")

      dlete.forEach((item, index) => {
        item.addEventListener('click', async () => {
          console.log("btn clicked");
          console.log(array[index]);
          
          await deleteDoc(doc(db, "users", array[index].id));
          console.log('todo deleted...');
          array.splice(index, 1)
          render(array)
        })
      })
      

      edit.forEach((item , index)=>{
        item.addEventListener("click" , async ()=>{
         
           try {
              const docRef = doc(db, "users", array[index].id);
              let newTitle = prompt("enter new value")
              let  newDescription = prompt("enter new value")
              await updateDoc(docRef, {
             num : newTitle,
               text : newDescription,
              });
              render(array)
              console.log(`Document with ID ${array[index].id} updated successfully`);
              array[index].text = newDescription
              array[index].num = newTitle
            render(array)
            } catch (error) {
              console.error("Error updating document: ", error);
            }
          })})
        }

        
  



  


  










let btn = document.querySelector("#sign")


btn.addEventListener("click" , ()=>{
    signOut(auth).then(() => {
      window.location = "index.html"
      
    }).catch((error) => {
      console.log(error);
      
    });
    
    });
    

// deta()

