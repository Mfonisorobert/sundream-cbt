import { useEffect, useState } from "react";
import questionsData from "./data/questions.json";
import Question from "./components/Question";
import Timer from "./components/Timer";
import { shuffleArray } from "./utils/shuffle";


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
// modified
const [studentName, setStudentName] = useState("");
const [hasStarted, setHasStarted] = useState(false);




// This is for shuffling of questions
// Use this when you want to shuffle the questions
// useEffect(() => {
//   const randomized = shuffleArray(questionsData).map((q) => ({
//     ...q,
//     options: shuffleArray(q.options),
//   }));
//   setQuestions(randomized);
// }, []);

// Shuffling of questions ends here


  // useEffect(() => {
  //   setQuestions(questionsData);
  // }, []);

  
  // Use this when you don't want to randomized the questions and options
  useEffect(() => {
    setQuestions(questionsData);
  
    const savedAnswers = localStorage.getItem("cbt-answers");
    const savedIndex = localStorage.getItem("cbt-current-index");
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedIndex) setCurrentQIndex(Number(savedIndex));
  }, []);

  // modified ends


// Use this for instructional questions where the questions needs to be chosen from a particular number to another number
useEffect(() => {
  const flattenedQuestions = [];

  questionsData.forEach((group) => {
    const instruction = group.instruction;
    group.questions.forEach((question) => {
      flattenedQuestions.push({
        ...question,
        instruction,
        options: question.options, // Keep options in original order

        // To shuffle the options use this
        // options: shuffleArray(question.options), 
        // shuffle options ends here

      });
    });
  });

  setQuestions(flattenedQuestions); // Keep questions in original order
}, []);


// instructional questions ends here

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentQIndex]: option });
  };

  // modified 
  useEffect(() => {
    localStorage.setItem("cbt-answers", JSON.stringify(answers));
  }, [answers]);
  
  useEffect(() => {
    localStorage.setItem("cbt-current-index", currentQIndex);
  }, [currentQIndex]);
  // modified ends


  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  // const handleSubmit = () => {
  //   let totalScore = 0;
  //   questions.forEach((q, index) => {
  //     if (answers[index] === q.answer) {
  //       totalScore += 1;
  //     }
  //   });
  //   setScore(totalScore);
  //   setShowScore(true);
  // };

// modified
const handleSubmit = () => {
  const confirmSubmit = confirm("Are you sure you want to submit your answers?");
  if (!confirmSubmit) return;

  let totalScore = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.answer) {
      totalScore += 1;
    }
  });
  setScore(totalScore);
  setShowScore(true);

  // Clear localStorage
  localStorage.removeItem("cbt-answers");
  localStorage.removeItem("cbt-current-index");
};


// modified ends

  const handleTimeUp = () => {
    alert("Time's up!");
    handleSubmit();
  };


  // modified

  const handleStart = () => {
    if (studentName.trim() === "") {
      alert("Please enter your name to begin.");
      return;
    }
  
    setHasStarted(true);
  };
 

  // modified ends

// For the Login Page

if (!hasStarted) {
  return (
    <div className="relative py-4"
  style={{
    backgroundImage: "url('/bg-img.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  }}
>
    <div className="min-h-screen flex items-center  justify-center">
      {/* <img src="/cbt-bg.jpg" className="absolute">
      </img> */}
      <div className="bg-white p-8 rounded-2xl opacity-90 shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-poppins font-bold mb-6">Welcome to CBT Exam</h1>
        <input
          type="text"
          placeholder="Enter your full name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />
        <button
          onClick={handleStart}
          className="bg-blue-800 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Start Exam
        </button>
      </div>
    </div>
    </div>
  );
}


// It ends here


// This shows their names as they write the exams

// It ends here

  return (
    <div className="relative py-4"
  style={{
    backgroundImage: "url('/bg-img.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  }}
>

  {/* Question Navigation Panel */}
<div className="flex flex-wrap justify-center gap-2 mb-4">
  {questions.map((_, idx) => {
    const isAnswered = answers[idx] !== undefined;

    return (
      <button
        key={idx}
        onClick={() => setCurrentQIndex(idx)}
        className={`w-8 h-8 square-full font-bold ${
          isAnswered ? 'bg-green-900 text-white' : 'bg-red-800 text-white'
        } ${currentQIndex === idx ? 'ring-2 ring-yellow-400' : ''}`}
      >
        {idx + 1}
      </button>
    );
  })}
</div>

  {/* Your CBT content here */}


     <div className="max-w-2xl mx-auto mt-4 p-6 bg-gray-50 opacity-90 rounded-2xl shadow-xl">

     {!showScore && (
      <h1 className="text-3xl font-bold text-center text-blue-950 mb-2">SUN DREAM INT'L SCHOOL</h1>
    )}
      <h3 className="text-2xl font-bold text-center text-blue-950 mb-2">
      {/* <h2 className="text-2xl font-bold text-center text-blue-950 mb-2">THIRD TERM EXAM</h2> */}
      {/* {showScore ? studentName : "HOW WELL DO YOU KNOW SUN DREAM?"} */}
      {showScore ? studentName : "YEAR 11 - ENGLISH"}
      </h3>

      
  



      {!showScore && (
        <>
        <p className="text-1xl text-green-800 -mb-2  text-center"><span className="font-medium">{studentName}</span></p>
          
          <Timer duration={1500} onTimeUp={handleTimeUp} /> {/* 5 minutes timer */}
          {questions.length > 0 && (
            <Question
              questionObj={questions[currentQIndex]}
              questionIndex={currentQIndex}
              selectedOption={answers[currentQIndex]}
              handleOptionSelect={handleOptionSelect}
            />
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              disabled={currentQIndex === 0}
              className="bg-gray-300 hover:bg-red-600 hover:text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            {currentQIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}

      {showScore && (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-semibold">Your Score is:</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {score} / {questions.length}
          </p>
        </div>
      )}

{/* This portion shows the result after submission */}

{showScore && (
  <div className="text-center mt-6">
    <h3 className="text-xl font-semibold mt-6 mb-2">Review:</h3>
    <div className="space-y-4 text-left mt-4">
      {questions.map((q, idx) => {
        const isCorrect = answers[idx] === q.answer;
        return (
          <div key={idx} className={`p-4 rounded-xl shadow ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
            <p className="font-semibold">{idx + 1}. {q.question}</p>
            <p>Your Answer: <span className="font-medium">{answers[idx] || "No Answer"}</span></p>
            {!isCorrect && (
              <p className="text-sm text-gray-700">Correct Answer: <span className="font-medium">{q.answer}</span></p>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}


</div>
    </div>
  );
}

export default App;
