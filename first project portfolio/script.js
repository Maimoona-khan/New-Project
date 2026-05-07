const input=document.getElementById('input');
const searchbtn=document.getElementById('searchbtn');
const result=document.querySelector('.result');

searchbtn.addEventListener('click', ()=>{
    getwordinfo(input.value);
})

async function getwordinfo(word){
  try {
  
  const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data=await response.json();
    console.log(data);
    let definitions=data[0].meanings[0].definitions[0];

    result.innerHTML=`<h2><strong>Word: </strong> ${data[0].word}</h2>
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p> <strong>Meaning: </strong>${definitions.definition === undefined ? "Not Found": definitions.definition}</p>
     <p> <strong>Example: </strong>${definitions.example === undefined ? "Not Found": definitions.example}</p>
 <p> <strong>Antonyms: </strong>        </p>`


     if (definitions.antonyms.length === 0){
  result.innerHTML += `<span>Not Found</span>`;
}else{
  for(let i=0;i<definitions.antonyms.length;i++){
    result.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
  }
}
  
  } catch (error) {
    result.innerHTML=`<p>Sorry, this word could not found</p>`
  }

}

