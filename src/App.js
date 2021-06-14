
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [onName, setOnName] = useState(null);
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(1);
  const [question, setQuestion]= useState(1);
  const [questionData, setQuestionData] = useState(null);
  const [score, setScore] = useState(0);
  const [afterAnswer, setAfterAnswer] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [correct, setCorrect] = useState(false);

  useEffect(() =>{
    fetchQuest()
    //eslint-disable-next-line
  },[])

  const settingName = (e) =>{
    e.preventDefault();
    if(!onName){
      return;
    }
    setName(onName);
  }

  const fetchQuest = async () => {
    
    const req = await fetch(`https://quiz-s-backend.herokuapp.com/index.php/question${number}`)
    const data = await req.json()
    setQuestionData([data])
}

  const onAnswer = (choice,answer) =>{

    setCurrentAnswer(answer)
    if(choice === answer){
      setScore(score+1)
      setCorrect(true)
    }
    setAfterAnswer(true) 
    setNumber(number+1)
   }

  const nextQuestion = async () => {
    fetchQuest()
    setCorrect(false)
    setQuestion(question+1)
    setAfterAnswer(false)
  }

  const reset =  () => {

     setNumber(1)
     setQuestion(1)
     setAfterAnswer(false)
     setScore(0)
 
     fetch('https://quiz-s-backend.herokuapp.com/index.php/question1').then((data) =>data.json()).then((data) =>setQuestionData([data]))
    }

  

  return (
    <div className="App">

  {name?
<React.Fragment>
 
 <h4 style={{marginLeft:'80%'}}>hello {name}</h4>
 <p>Score: {score}/5</p>
 <p>Question: {question}</p>
 
 <div>{
   questionData?
   questionData.map(data=>
    <div key={data.question}>
    <p style={{fontSize:'20px'}}>{data.question}</p>
  {afterAnswer? null
    : <React.Fragment>
    <span onClick={()=>onAnswer(data.choices[0],data.answer)} className="choices">{data.choices[0]}</span>
    <span onClick={()=>onAnswer(data.choices[1],data.answer)} className="choices">{data.choices[1]}</span>
    <span  onClick={()=>onAnswer(data.choices[2],data.answer)} className="choices">{data.choices[2]}</span>
    <span onClick={()=>onAnswer(data.choices[3],data.answer)} className="choices">{data.choices[3]}</span>
    </React.Fragment>
  }
      </div>
    )
   :null}
   
   {afterAnswer?
   <div className="afterAnswer">
    {correct
    ?<span>✔️</span>
    :<span>❌</span>
    }
   <span style={{marginBottom:'10px'}}>The anwser was {currentAnswer}</span>
   {question<5 ?
   <button style={{width:'130px'}} onClick={nextQuestion}>Next Question</button>
:null}
   {question === 5 ?
  <button onClick={reset}>Reset</button>
  :null}
   </div>
  :null}
</div>   

</React.Fragment>

 :<div style={{marginTop:'20%'}}>
  <form onSubmit={settingName}>
 <input  placeholder="enter name" onChange ={(e) => {setOnName(e.target.value)}}/>
    <button type={'submit'}>Set Name</button>
    </form>
  </div>

  }
    </div>

  );
}

export default App;
