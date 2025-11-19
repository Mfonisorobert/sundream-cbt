const Question = ({ questionObj, questionIndex, selectedOption, handleOptionSelect }) => {
    return (
      <div className="bg-white shadow-md p-6 rounded-2xl mb-4">
        <h2 className="text-xl font-semibold mb-4">


{/* This portion is only for questions that have instructions attached to it  */}

          {questionObj.instruction && (
  <p className="text-sm font-medium text-gray-600 mb-2 italic">
    {questionObj.instruction}
  </p>
)}

{/* It instructional questions ends here */}


{/* This portion underlines the words */}

<span
  dangerouslySetInnerHTML={{
    __html: `${questionIndex + 1}. ${questionObj.question}`,
  }}
/>

{/* The underlining stops here */}

          {/* {questionIndex + 1}. {questionObj.question} */}

          {/* This section is just for image */}

          {questionObj.image && (
  <div className="flex justify-center my-4">
    <img
      src={questionObj.image}
      alt="question illustration"
      className="max-w-xs rounded-lg shadow-md"
    />
  </div>
)}

{/* The image section ends here */}

        </h2>
        <div className="space-y-3">
          {questionObj.options.map((option, idx) => (
            <label
              key={idx}
              className={`block border p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedOption === option
                  ? "bg-blue-100 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default Question;
  