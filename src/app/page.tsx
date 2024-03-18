"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";

const CorsiBlockTappingTest: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [spatialSpan, setSpatialSpan] = useState<number>(2); // Starting spatial span
  const [sequenceCounter, setSequenceCounter] = useState<number>(); // Counter for constant sequence every 3rd time
  const [selectedRandomGrid, setSelectedRandomGrid] = useState<number>(0);
  const [countIncorrectSequence, setCountIncorrectSequence] =
    useState<number>(0);
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [counterToUpdateSpan, setCounterToUpdateSpan] = useState<number>(0);
  // const [fixedThirdSequence, setFixedThirdSequence] = useState<number[]>([]);
  const [subjectSpatialSpan, setSubjectSpatialSpan] = useState<number | null>(
    null
  ); // Spatial span of the subject
  const [finalCounter, setFinalCounter] = useState<number>(0); // Counter for the final sequence
  const [final24ResponseArray, setFinal24ResponseArray] = useState<number[]>(
    []
  );
  const [countCorrectSequence, setCountCorrectSequence] = useState<number>(0);
  const [timeDifferences, setTimeDifferences] = useState<number[]>([]);
  const [clickTime, setClickTime] = useState<number[]>([]);
  const [canCalculateTimeDifference, setCanCalculateTimeDifference] =
    useState<number>(0); // 0 1 2

  const block0 = useRef<HTMLDivElement>(null);
  const block1 = useRef<HTMLDivElement>(null);
  const block2 = useRef<HTMLDivElement>(null);
  const block3 = useRef<HTMLDivElement>(null);
  const block4 = useRef<HTMLDivElement>(null);
  const block5 = useRef<HTMLDivElement>(null);
  const block6 = useRef<HTMLDivElement>(null);
  const block7 = useRef<HTMLDivElement>(null);
  const block8 = useRef<HTMLDivElement>(null);
  const refArray = [
    block0,
    block1,
    block2,
    block3,
    block4,
    block5,
    block6,
    block7,
    block8,
  ];

  useEffect(() => {
    if (countIncorrectSequence < 2) {
      startTest();
    }
    if (subjectSpatialSpan !== null) {
      startTest();
    }
  }, [currentStep]);

  // useEffect(() => {
  //   startTest();
  //   // selectRandomGrid();
  //   // changeColor();
  // }, []);
  useEffect(() => {
    changeColor();
  }, [sequence]);

  // Function to generate a random sequence of blocks
  const generateSequence = () => {
    const newSequence = [];
    const availableNumbers = Array.from({ length: 9 }, (_, i) => i); // Array of numbers from 0 to 8
    let maxIndex = availableNumbers.length;

    for (let i = 0; i < spatialSpan; i++) {
      const randomIndex = Math.floor(Math.random() * maxIndex);
      const selectedNumber = availableNumbers[randomIndex];
      newSequence.push(selectedNumber);
      availableNumbers.splice(randomIndex, 1); // Remove the selected number from the available numbers
      maxIndex--; // Reduce the maximum index for the next iteration
    }

    setSequence(newSequence);
    // changeColor();
  };

  // function to change color of generate sequence with interval of 1 second
  const changeColor = () => {
    let i = 0;

    const intervalId = setInterval(() => {
      if (i >= sequence.length) {
        if (i !== 0) {
          setIsPlaying(true);
        }
        clearInterval(intervalId);
      } else {
        refArray[sequence[i]].current?.classList.remove("bg-purple-600");
        refArray[sequence[i]].current?.classList.add("bg-orange-500");
        const index = i; // Save the current value of i because it will change before the setTimeout runs
        setTimeout(() => {
          refArray[sequence[index]].current?.classList.remove("bg-orange-500");
          refArray[sequence[index]].current?.classList.add("bg-purple-600");
        }, 1000);
        i++;
      }
    }, 2000); // Adjust interval to 2000ms (1 second for add, 1 second for remove)
  };

  // Function to position the blocks randomly

  // Function to start the test
  const startTest = () => {
    generateSequence();
  };

  // // Function to handle user's click on a block
  // const handleClick = (blockIndex: number) => {
  //   if (isPlaying) {
  //     const currentTime = Date.now(); // Get current time

  //     const updatedUserSequence = [...userSequence, blockIndex];
  //     setUserSequence(updatedUserSequence);
  //     if (userSequence.length > 0) {
  //       const lastClickTime =
  //         timeDifferences.length > 0
  //           ? timeDifferences[timeDifferences.length - 1]
  //           : 0;
  //       const timeDifference = currentTime - lastClickTime;
  //       setTimeDifferences([...timeDifferences, timeDifference]);
  //     }
  //     if (updatedUserSequence.length === sequence.length) {
  //       // setIsPlaying(false);
  //       // checkSequence();
  //     }
  //   }
  //   const index: number = blockIndex; // Update the type of 'index' to be a number
  //   if (clickedIndexes.includes(index)) {
  //     setClickedIndexes(clickedIndexes.filter((i) => i !== index));
  //     setUserSequence(userSequence.filter((i) => i !== index));
  //   } else {
  //     setClickedIndexes([...clickedIndexes, index]);
  //   }
  // };

  // Function to handle user's click on a block
  // Function to handle user's click on a block
  const handleClick = (blockIndex: number) => {
    if (isPlaying) {
      const currentTime = Date.now(); // Get current time
      setClickTime([...clickTime, currentTime]);
      // Update userSequence
      const updatedUserSequence = [...userSequence, blockIndex];
      setUserSequence(updatedUserSequence);

      // Calculate time difference only if there's a previous click
      if (clickTime.length > 0 && canCalculateTimeDifference >= 1) {
        const lastClickTime = clickTime[clickTime.length - 1];
        const timeDifference = currentTime - lastClickTime;
        setTimeDifferences([...timeDifferences, timeDifference]);
      }

      setCanCalculateTimeDifference((prev) => prev + 1);

      // Check if the user sequence is complete
      if (updatedUserSequence.length === sequence.length) {
        // Call your completion logic here
      }
    }

    // Toggle clickedIndexes
    if (clickedIndexes.includes(blockIndex)) {
      setClickedIndexes(clickedIndexes.filter((i) => i !== blockIndex));
      setUserSequence(userSequence.filter((i) => i !== blockIndex));
    } else {
      setClickedIndexes([...clickedIndexes, blockIndex]);
    }

    // Update clickTimes
    // setTimeDifferences([...timeDifferences, Date.now()]);
  };

  // Function to check if the user's sequence matches the generated sequence
  const checkSequence = () => {
    setIsPlaying(false);
    setCanCalculateTimeDifference(0);
    const isCorrect = userSequence.every((value, index): boolean => {
      console.log(
        "value: ",
        value,
        "index: ",
        index,
        "sequence: ",
        sequence[index]
      );
      return value === sequence[index];
    });
    console.log(isCorrect);
    if (subjectSpatialSpan === null) {
      if (isCorrect && userSequence.length === sequence.length) {
        setCountCorrectSequence(countCorrectSequence + 1);
        setCounterToUpdateSpan(counterToUpdateSpan + 1);
        if (counterToUpdateSpan === 1) {
          setSpatialSpan(spatialSpan + 1);
          setCounterToUpdateSpan(0);
        }
        setCountIncorrectSequence(0);
        setFeedback("Correct!");
      } else {
        setCountIncorrectSequence(countIncorrectSequence + 1);
        setFeedback("Incorrect.");
      }
      if (countIncorrectSequence === 2) {
        setFeedback("Test Complete");
        setSubjectSpatialSpan(spatialSpan - 1);
      }
    } else {
      setFinalCounter(finalCounter + 1);
      setFinal24ResponseArray([...final24ResponseArray, isCorrect ? 1 : 0]);
    }
    // alert("feedback: " + feedback);
    console.log(feedback);
    setTimeout(() => {
      setFeedback("");
      setUserSequence([]);
      setClickedIndexes([]);
      setCurrentStep(currentStep + 1);
      setSequenceCounter(
        sequenceCounter !== undefined ? sequenceCounter + 1 : 0
      );
      // generateSequence();
      selectRandomGrid();
    }, 1000);
  };

  const selectRandomGrid = () => {
    setSelectedRandomGrid(Math.floor(Math.random() * (randomGrids.length - 1)));
    // setSelectedRandomGrid(0);
  };
  return (
    <div>
      <div className="  absolute left-0 text-white">{selectedRandomGrid}</div>
      {finalCounter < 24 && countIncorrectSequence < 2 ? (
        <div className="flex h-screen flex-col items-center justify-center bg-black">
          {/* <h1 className="mb-4 text-2xl font-bold">Corsi Block-Tapping Test</h1> */}
          <div
            className={` mb-[5%] flex h-[calc(100svh_-_15%)]   w-[calc(100svw_-_10%)]   flex-wrap rounded-md ${
              !isPlaying && "border-4"
            }  `}
          >
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                ref={refArray[index]}
                className={`m-1 block h-12 w-12 cursor-pointer bg-purple-600  md:h-16 md:w-16 
        ${!isPlaying && "pointer-events-none"}`}
                style={{
                  position: "absolute",
                  top: `${randomGrids[selectedRandomGrid][index].top - 8}%`,
                  left: `${randomGrids[selectedRandomGrid][index].left}%`,
                }}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {clickedIndexes.includes(index) && (
                  <img src="/assets/images/right.png" alt="selected" />
                )}
                {/* {index} */}
              </div>
            ))}
          </div>
          {countIncorrectSequence > 2 ? (
            <div className="absolute right-0 top-0 bg-black text-white">
              {" "}
              <p className="mt-4 text-lg">Test Complete</p>
            </div>
          ) : (
            <div className="absolute bottom-0 left-1/2   -translate-x-1/2 bg-black text-white">
              <p className="mt-4 text-lg ">{feedback}</p>
              {/* <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={startTest}
      >
        Start Test
      </button> */}
              {/* <div className="grid  grid-cols-2">
                <div>
                  {timeDifferences.map((difference, index) => (
                    <div key={index}>
                      Time between clicks : {difference} milliseconds
                    </div>
                  ))}
                </div>
                <div className="px-4">
                  {clickTime.map((time, index) => (
                    <div key={index}>
                      Click {index + 1} time: {time}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4">Spatial Span: {spatialSpan}</p>
              <p>{feedback}</p> */}
              <Button
                className="text-xl"
                size={"lg"}
                disabled={!isPlaying}
                onClick={checkSequence}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-black text-white">
          <h1 className="text-3xl">Yeah! You did it </h1>
          <h2 className="text-xl ">
            Your Spatial span is : {spatialSpan - 1} times
          </h2>
          <div>
            {timeDifferences.map((difference, index) => (
              <div key={index}>
                Time between clicks : {difference} milliseconds
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorsiBlockTappingTest;
const randomGrids = [
  [
    { top: 58, left: 21 },
    { top: 51, left: 64 },
    { top: 73, left: 78 },
    { top: 24, left: 67 },
    { top: 77, left: 58 },
    { top: 33, left: 23 },
    { top: 80, left: 25 },
    { top: 40, left: 43 },
    { top: 61, left: 45 },
  ],
  [
    { top: 69, left: 19 },
    { top: 42, left: 57 },
    { top: 49, left: 31 },
    { top: 45, left: 79 },
    { top: 28, left: 33 },
    { top: 69, left: 74 },
    { top: 20, left: 56 },
    { top: 61, left: 50 },
    { top: 80, left: 39 },
  ],
  [
    { top: 61, left: 44 },
    { top: 36, left: 74 },
    { top: 32, left: 19 },
    { top: 23, left: 53 },
    { top: 64, left: 85 },
    { top: 80, left: 16 },
    { top: 57, left: 20 },
    { top: 44, left: 55 },
    { top: 79, left: 70 },
  ],
  [
    { top: 67, left: 65 },
    { top: 47, left: 21 },
    { top: 21, left: 40 },
    { top: 52, left: 43 },
    { top: 80, left: 40 },
    { top: 28, left: 68 },
    { top: 79, left: 19 },
    { top: 51, left: 85 },
    { top: 26, left: 18 },
  ],
  [
    { top: 51, left: 33 },
    { top: 67, left: 15 },
    { top: 55, left: 84 },
    { top: 35, left: 21 },
    { top: 67, left: 51 },
    { top: 40, left: 66 },
    { top: 20, left: 60 },
    { top: 23, left: 38 },
    { top: 80, left: 34 },
  ],
  [
    { top: 80, left: 39 },
    { top: 60, left: 58 },
    { top: 32, left: 41 },
    { top: 73, left: 16 },
    { top: 25, left: 64 },
    { top: 78, left: 70 },
    { top: 44, left: 71 },
    { top: 53, left: 22 },
    { top: 22, left: 19 },
  ],
  [
    { top: 33, left: 18 },
    { top: 26, left: 51 },
    { top: 55, left: 20 },
    { top: 68, left: 59 },
    { top: 45, left: 78 },
    { top: 49, left: 47 },
    { top: 72, left: 34 },
    { top: 76, left: 84 },
    { top: 23, left: 77 },
  ],
  [
    { top: 35, left: 17 },
    { top: 52, left: 38 },
    { top: 37, left: 67 },
    { top: 76, left: 42 },
    { top: 61, left: 58 },
    { top: 64, left: 82 },
    { top: 72, left: 17 },
    { top: 20, left: 83 },
    { top: 28, left: 36 },
  ],
  [
    { top: 53, left: 67 },
    { top: 64, left: 16 },
    { top: 78, left: 72 },
    { top: 24, left: 85 },
    { top: 21, left: 17 },
    { top: 20, left: 43 },
    { top: 41, left: 20 },
    { top: 72, left: 52 },
    { top: 46, left: 44 },
  ],
  [
    { top: 23, left: 37 },
    { top: 59, left: 31 },
    { top: 22, left: 68 },
    { top: 65, left: 54 },
    { top: 45, left: 49 },
    { top: 50, left: 71 },
    { top: 30, left: 15 },
    { top: 66, left: 83 },
    { top: 79, left: 37 },
  ],
  [
    { top: 30, left: 49 },
    { top: 41, left: 27 },
    { top: 46, left: 61 },
    { top: 25, left: 72 },
    { top: 64, left: 70 },
    { top: 75, left: 36 },
    { top: 21, left: 24 },
    { top: 75, left: 15 },
    { top: 79, left: 85 },
  ],
  [
    { top: 39, left: 35 },
    { top: 32, left: 84 },
    { top: 20, left: 16 },
    { top: 75, left: 46 },
    { top: 24, left: 65 },
    { top: 60, left: 80 },
    { top: 78, left: 67 },
    { top: 50, left: 16 },
    { top: 58, left: 58 },
  ],
  [
    { top: 61, left: 20 },
    { top: 80, left: 84 },
    { top: 36, left: 46 },
    { top: 33, left: 19 },
    { top: 34, left: 80 },
    { top: 51, left: 62 },
    { top: 71, left: 63 },
    { top: 72, left: 41 },
    { top: 22, left: 63 },
  ],
  [
    { top: 72, left: 30 },
    { top: 20, left: 18 },
    { top: 33, left: 43 },
    { top: 52, left: 84 },
    { top: 28, left: 77 },
    { top: 76, left: 58 },
    { top: 47, left: 26 },
    { top: 51, left: 56 },
    { top: 72, left: 83 },
  ],
  [
    { top: 65, left: 46 },
    { top: 40, left: 85 },
    { top: 63, left: 72 },
    { top: 50, left: 21 },
    { top: 29, left: 40 },
    { top: 20, left: 77 },
    { top: 24, left: 15 },
    { top: 76, left: 15 },
    { top: 39, left: 64 },
  ],
  [
    { top: 33, left: 72 },
    { top: 73, left: 77 },
    { top: 61, left: 43 },
    { top: 54, left: 62 },
    { top: 21, left: 30 },
    { top: 80, left: 31 },
    { top: 20, left: 52 },
    { top: 41, left: 17 },
    { top: 40, left: 46 },
  ],
  [
    { top: 49, left: 74 },
    { top: 22, left: 36 },
    { top: 41, left: 49 },
    { top: 78, left: 60 },
    { top: 76, left: 31 },
    { top: 49, left: 24 },
    { top: 79, left: 84 },
    { top: 27, left: 76 },
    { top: 25, left: 15 },
  ],
  [
    { top: 36, left: 25 },
    { top: 74, left: 79 },
    { top: 30, left: 57 },
    { top: 22, left: 84 },
    { top: 67, left: 60 },
    { top: 49, left: 49 },
    { top: 49, left: 85 },
    { top: 60, left: 20 },
    { top: 80, left: 28 },
  ],
  [
    { top: 41, left: 82 },
    { top: 62, left: 36 },
    { top: 41, left: 57 },
    { top: 67, left: 65 },
    { top: 25, left: 43 },
    { top: 24, left: 16 },
    { top: 44, left: 17 },
    { top: 65, left: 85 },
    { top: 79, left: 25 },
  ],
  [
    { top: 39, left: 28 },
    { top: 37, left: 54 },
    { top: 79, left: 40 },
    { top: 28, left: 76 },
    { top: 55, left: 16 },
    { top: 57, left: 72 },
    { top: 80, left: 84 },
    { top: 20, left: 43 },
    { top: 75, left: 19 },
  ],
  [
    { top: 26, left: 63 },
    { top: 71, left: 63 },
    { top: 31, left: 85 },
    { top: 45, left: 28 },
    { top: 73, left: 40 },
    { top: 75, left: 84 },
    { top: 48, left: 52 },
    { top: 20, left: 39 },
    { top: 62, left: 17 },
  ],
  [
    { top: 66, left: 73 },
    { top: 40, left: 31 },
    { top: 60, left: 53 },
    { top: 33, left: 57 },
    { top: 59, left: 23 },
    { top: 24, left: 16 },
    { top: 74, left: 38 },
    { top: 38, left: 77 },
    { top: 20, left: 39 },
  ],
  [
    { top: 54, left: 66 },
    { top: 45, left: 28 },
    { top: 28, left: 46 },
    { top: 70, left: 38 },
    { top: 26, left: 16 },
    { top: 74, left: 77 },
    { top: 35, left: 78 },
    { top: 79, left: 16 },
    { top: 80, left: 57 },
  ],
  [
    { top: 52, left: 40 },
    { top: 24, left: 77 },
    { top: 44, left: 19 },
    { top: 73, left: 17 },
    { top: 33, left: 53 },
    { top: 73, left: 38 },
    { top: 75, left: 81 },
    { top: 54, left: 74 },
    { top: 80, left: 59 },
  ],
  [
    { top: 41, left: 17 },
    { top: 20, left: 52 },
    { top: 56, left: 84 },
    { top: 30, left: 71 },
    { top: 73, left: 22 },
    { top: 41, left: 53 },
    { top: 78, left: 73 },
    { top: 80, left: 43 },
    { top: 22, left: 29 },
  ],
  [
    { top: 22, left: 52 },
    { top: 55, left: 32 },
    { top: 54, left: 74 },
    { top: 78, left: 77 },
    { top: 23, left: 26 },
    { top: 50, left: 54 },
    { top: 74, left: 51 },
    { top: 29, left: 78 },
    { top: 68, left: 15 },
  ],
  [
    { top: 59, left: 76 },
    { top: 74, left: 44 },
    { top: 42, left: 46 },
    { top: 51, left: 26 },
    { top: 22, left: 23 },
    { top: 25, left: 81 },
    { top: 79, left: 85 },
    { top: 78, left: 19 },
    { top: 21, left: 53 },
  ],
  [
    { top: 58, left: 49 },
    { top: 80, left: 22 },
    { top: 35, left: 28 },
    { top: 41, left: 76 },
    { top: 80, left: 68 },
    { top: 80, left: 47 },
    { top: 23, left: 55 },
    { top: 54, left: 20 },
    { top: 22, left: 84 },
  ],
  [
    { top: 26, left: 15 },
    { top: 39, left: 38 },
    { top: 74, left: 26 },
    { top: 77, left: 82 },
    { top: 54, left: 66 },
    { top: 40, left: 82 },
    { top: 27, left: 60 },
    { top: 71, left: 49 },
    { top: 51, left: 21 },
  ],
  [
    { top: 65, left: 68 },
    { top: 73, left: 40 },
    { top: 25, left: 18 },
    { top: 25, left: 84 },
    { top: 28, left: 48 },
    { top: 41, left: 69 },
    { top: 45, left: 30 },
    { top: 77, left: 18 },
    { top: 54, left: 50 },
  ],
  [
    { top: 48, left: 61 },
    { top: 31, left: 37 },
    { top: 78, left: 16 },
    { top: 80, left: 44 },
    { top: 53, left: 22 },
    { top: 20, left: 81 },
    { top: 80, left: 77 },
    { top: 20, left: 18 },
    { top: 56, left: 42 },
  ],
  [
    { top: 38, left: 25 },
    { top: 50, left: 77 },
    { top: 68, left: 26 },
    { top: 25, left: 55 },
    { top: 71, left: 53 },
    { top: 51, left: 53 },
    { top: 70, left: 84 },
    { top: 20, left: 15 },
    { top: 25, left: 75 },
  ],
  [
    { top: 32, left: 25 },
    { top: 69, left: 77 },
    { top: 57, left: 24 },
    { top: 77, left: 15 },
    { top: 54, left: 49 },
    { top: 47, left: 77 },
    { top: 75, left: 52 },
    { top: 33, left: 46 },
    { top: 22, left: 70 },
  ],
  [
    { top: 52, left: 65 },
    { top: 30, left: 22 },
    { top: 61, left: 17 },
    { top: 23, left: 44 },
    { top: 31, left: 72 },
    { top: 76, left: 62 },
    { top: 73, left: 38 },
    { top: 43, left: 38 },
    { top: 79, left: 82 },
  ],
  [
    { top: 40, left: 72 },
    { top: 70, left: 18 },
    { top: 20, left: 59 },
    { top: 34, left: 36 },
    { top: 72, left: 70 },
    { top: 55, left: 51 },
    { top: 21, left: 17 },
    { top: 79, left: 51 },
    { top: 45, left: 15 },
  ],
  [
    { top: 77, left: 31 },
    { top: 48, left: 49 },
    { top: 60, left: 67 },
    { top: 43, left: 80 },
    { top: 22, left: 81 },
    { top: 41, left: 21 },
    { top: 21, left: 59 },
    { top: 61, left: 15 },
    { top: 79, left: 51 },
  ],
  [
    { top: 21, left: 67 },
    { top: 75, left: 71 },
    { top: 43, left: 17 },
    { top: 58, left: 42 },
    { top: 79, left: 29 },
    { top: 44, left: 70 },
    { top: 20, left: 16 },
    { top: 38, left: 49 },
    { top: 20, left: 40 },
  ],
  [
    { top: 26, left: 18 },
    { top: 42, left: 80 },
    { top: 45, left: 47 },
    { top: 77, left: 78 },
    { top: 74, left: 16 },
    { top: 26, left: 65 },
    { top: 71, left: 46 },
    { top: 48, left: 19 },
    { top: 24, left: 40 },
  ],
  [
    { top: 37, left: 56 },
    { top: 73, left: 31 },
    { top: 55, left: 15 },
    { top: 26, left: 18 },
    { top: 75, left: 74 },
    { top: 22, left: 75 },
    { top: 43, left: 33 },
    { top: 57, left: 55 },
    { top: 52, left: 81 },
  ],
  [
    { top: 37, left: 36 },
    { top: 40, left: 82 },
    { top: 62, left: 69 },
    { top: 71, left: 41 },
    { top: 28, left: 15 },
    { top: 35, left: 58 },
    { top: 76, left: 19 },
    { top: 53, left: 21 },
    { top: 80, left: 59 },
  ],
  [
    { top: 69, left: 85 },
    { top: 45, left: 27 },
    { top: 67, left: 52 },
    { top: 42, left: 62 },
    { top: 80, left: 24 },
    { top: 22, left: 55 },
    { top: 26, left: 80 },
    { top: 25, left: 22 },
    { top: 48, left: 83 },
  ],
  [
    { top: 42, left: 74 },
    { top: 25, left: 51 },
    { top: 47, left: 20 },
    { top: 79, left: 80 },
    { top: 67, left: 44 },
    { top: 21, left: 20 },
    { top: 43, left: 42 },
    { top: 66, left: 64 },
    { top: 59, left: 85 },
  ],
  [
    { top: 33, left: 32 },
    { top: 45, left: 15 },
    { top: 61, left: 67 },
    { top: 69, left: 37 },
    { top: 24, left: 59 },
    { top: 36, left: 84 },
    { top: 74, left: 83 },
    { top: 44, left: 56 },
    { top: 78, left: 16 },
  ],
  [
    { top: 58, left: 18 },
    { top: 45, left: 43 },
    { top: 52, left: 74 },
    { top: 24, left: 23 },
    { top: 78, left: 51 },
    { top: 23, left: 54 },
    { top: 77, left: 78 },
    { top: 32, left: 78 },
    { top: 75, left: 30 },
  ],
  [
    { top: 49, left: 30 },
    { top: 27, left: 27 },
    { top: 72, left: 54 },
    { top: 21, left: 49 },
    { top: 48, left: 77 },
    { top: 24, left: 80 },
    { top: 73, left: 34 },
    { top: 46, left: 54 },
    { top: 71, left: 84 },
  ],
  [
    { top: 48, left: 62 },
    { top: 68, left: 22 },
    { top: 80, left: 65 },
    { top: 35, left: 84 },
    { top: 63, left: 77 },
    { top: 39, left: 35 },
    { top: 28, left: 53 },
    { top: 32, left: 16 },
    { top: 60, left: 41 },
  ],
  [
    { top: 41, left: 15 },
    { top: 30, left: 83 },
    { top: 60, left: 55 },
    { top: 73, left: 31 },
    { top: 29, left: 50 },
    { top: 75, left: 79 },
    { top: 49, left: 36 },
    { top: 52, left: 81 },
    { top: 21, left: 24 },
  ],
  [
    { top: 47, left: 68 },
    { top: 44, left: 31 },
    { top: 79, left: 44 },
    { top: 71, left: 71 },
    { top: 77, left: 19 },
    { top: 27, left: 74 },
    { top: 56, left: 48 },
    { top: 22, left: 41 },
    { top: 28, left: 16 },
  ],
  [
    { top: 75, left: 53 },
    { top: 70, left: 85 },
    { top: 54, left: 22 },
    { top: 45, left: 60 },
    { top: 31, left: 42 },
    { top: 20, left: 79 },
    { top: 75, left: 16 },
    { top: 50, left: 84 },
    { top: 24, left: 17 },
  ],
  [
    { top: 70, left: 20 },
    { top: 42, left: 18 },
    { top: 79, left: 47 },
    { top: 72, left: 67 },
    { top: 34, left: 40 },
    { top: 43, left: 64 },
    { top: 27, left: 79 },
    { top: 58, left: 85 },
    { top: 57, left: 41 },
  ],
  [
    { top: 57, left: 50 },
    { top: 73, left: 21 },
    { top: 63, left: 80 },
    { top: 28, left: 44 },
    { top: 39, left: 24 },
    { top: 40, left: 67 },
    { top: 25, left: 84 },
    { top: 80, left: 48 },
    { top: 21, left: 15 },
  ],
  [
    { top: 69, left: 72 },
    { top: 76, left: 34 },
    { top: 33, left: 69 },
    { top: 54, left: 36 },
    { top: 36, left: 16 },
    { top: 65, left: 16 },
    { top: 34, left: 39 },
    { top: 51, left: 59 },
    { top: 50, left: 85 },
  ],
  [
    { top: 58, left: 69 },
    { top: 20, left: 80 },
    { top: 64, left: 27 },
    { top: 28, left: 38 },
    { top: 78, left: 77 },
    { top: 37, left: 62 },
    { top: 42, left: 20 },
    { top: 76, left: 44 },
    { top: 53, left: 49 },
  ],
  [
    { top: 27, left: 52 },
    { top: 20, left: 19 },
    { top: 56, left: 45 },
    { top: 64, left: 74 },
    { top: 78, left: 23 },
    { top: 78, left: 50 },
    { top: 47, left: 27 },
    { top: 29, left: 83 },
    { top: 43, left: 64 },
  ],
  [
    { top: 62, left: 43 },
    { top: 76, left: 81 },
    { top: 41, left: 22 },
    { top: 20, left: 35 },
    { top: 52, left: 70 },
    { top: 32, left: 82 },
    { top: 34, left: 58 },
    { top: 79, left: 26 },
    { top: 61, left: 16 },
  ],
  [
    { top: 67, left: 85 },
    { top: 48, left: 66 },
    { top: 28, left: 60 },
    { top: 69, left: 27 },
    { top: 72, left: 47 },
    { top: 29, left: 30 },
    { top: 77, left: 67 },
    { top: 20, left: 82 },
    { top: 49, left: 44 },
  ],
  [
    { top: 53, left: 42 },
    { top: 79, left: 54 },
    { top: 75, left: 30 },
    { top: 31, left: 35 },
    { top: 49, left: 84 },
    { top: 24, left: 79 },
    { top: 71, left: 79 },
    { top: 41, left: 58 },
    { top: 52, left: 20 },
  ],
  [
    { top: 25, left: 79 },
    { top: 54, left: 53 },
    { top: 68, left: 79 },
    { top: 41, left: 32 },
    { top: 22, left: 52 },
    { top: 24, left: 18 },
    { top: 76, left: 43 },
    { top: 54, left: 16 },
    { top: 77, left: 16 },
  ],
  [
    { top: 43, left: 33 },
    { top: 79, left: 50 },
    { top: 64, left: 83 },
    { top: 28, left: 56 },
    { top: 60, left: 19 },
    { top: 42, left: 80 },
    { top: 21, left: 17 },
    { top: 62, left: 62 },
    { top: 80, left: 24 },
  ],
  [
    { top: 41, left: 81 },
    { top: 41, left: 37 },
    { top: 78, left: 32 },
    { top: 74, left: 63 },
    { top: 52, left: 17 },
    { top: 55, left: 55 },
    { top: 31, left: 55 },
    { top: 80, left: 85 },
    { top: 21, left: 85 },
  ],
  [
    { top: 28, left: 83 },
    { top: 25, left: 43 },
    { top: 67, left: 83 },
    { top: 45, left: 30 },
    { top: 61, left: 53 },
    { top: 65, left: 17 },
    { top: 20, left: 63 },
    { top: 21, left: 22 },
    { top: 40, left: 66 },
  ],
  [
    { top: 78, left: 63 },
    { top: 41, left: 32 },
    { top: 58, left: 83 },
    { top: 68, left: 25 },
    { top: 39, left: 71 },
    { top: 20, left: 50 },
    { top: 20, left: 23 },
    { top: 64, left: 47 },
    { top: 20, left: 83 },
  ],
  [
    { top: 58, left: 40 },
    { top: 22, left: 23 },
    { top: 45, left: 57 },
    { top: 77, left: 29 },
    { top: 77, left: 69 },
    { top: 53, left: 77 },
    { top: 23, left: 65 },
    { top: 43, left: 19 },
    { top: 23, left: 85 },
  ],
  [
    { top: 68, left: 24 },
    { top: 28, left: 41 },
    { top: 79, left: 83 },
    { top: 52, left: 70 },
    { top: 21, left: 72 },
    { top: 47, left: 28 },
    { top: 62, left: 45 },
    { top: 21, left: 22 },
    { top: 80, left: 58 },
  ],
  [
    { top: 51, left: 47 },
    { top: 39, left: 27 },
    { top: 71, left: 75 },
    { top: 21, left: 65 },
    { top: 20, left: 85 },
    { top: 47, left: 85 },
    { top: 77, left: 38 },
    { top: 58, left: 20 },
    { top: 20, left: 34 },
  ],
  [
    { top: 34, left: 84 },
    { top: 62, left: 59 },
    { top: 47, left: 37 },
    { top: 75, left: 85 },
    { top: 29, left: 24 },
    { top: 71, left: 27 },
    { top: 27, left: 64 },
    { top: 20, left: 45 },
    { top: 51, left: 15 },
  ],
  [
    { top: 37, left: 37 },
    { top: 50, left: 66 },
    { top: 57, left: 42 },
    { top: 55, left: 16 },
    { top: 26, left: 68 },
    { top: 72, left: 56 },
    { top: 78, left: 80 },
    { top: 73, left: 28 },
    { top: 25, left: 18 },
  ],
  [
    { top: 22, left: 79 },
    { top: 71, left: 66 },
    { top: 34, left: 26 },
    { top: 44, left: 75 },
    { top: 53, left: 36 },
    { top: 31, left: 56 },
    { top: 75, left: 41 },
    { top: 78, left: 20 },
    { top: 56, left: 15 },
  ],
  [
    { top: 30, left: 18 },
    { top: 52, left: 81 },
    { top: 73, left: 35 },
    { top: 54, left: 52 },
    { top: 77, left: 73 },
    { top: 31, left: 41 },
    { top: 58, left: 16 },
    { top: 33, left: 70 },
    { top: 78, left: 15 },
  ],
  [
    { top: 75, left: 77 },
    { top: 20, left: 41 },
    { top: 72, left: 17 },
    { top: 62, left: 45 },
    { top: 21, left: 65 },
    { top: 48, left: 20 },
    { top: 40, left: 45 },
    { top: 41, left: 81 },
    { top: 57, left: 66 },
  ],
  [
    { top: 60, left: 25 },
    { top: 79, left: 46 },
    { top: 42, left: 51 },
    { top: 38, left: 25 },
    { top: 23, left: 85 },
    { top: 54, left: 83 },
    { top: 20, left: 48 },
    { top: 59, left: 63 },
    { top: 80, left: 81 },
  ],
  [
    { top: 55, left: 43 },
    { top: 35, left: 60 },
    { top: 35, left: 82 },
    { top: 79, left: 36 },
    { top: 68, left: 65 },
    { top: 33, left: 31 },
    { top: 56, left: 84 },
    { top: 60, left: 23 },
    { top: 78, left: 83 },
  ],
  [
    { top: 61, left: 44 },
    { top: 24, left: 36 },
    { top: 66, left: 22 },
    { top: 65, left: 69 },
    { top: 40, left: 24 },
    { top: 25, left: 79 },
    { top: 20, left: 56 },
    { top: 48, left: 82 },
    { top: 42, left: 57 },
  ],
  [
    { top: 58, left: 50 },
    { top: 72, left: 15 },
    { top: 20, left: 54 },
    { top: 32, left: 31 },
    { top: 53, left: 77 },
    { top: 75, left: 37 },
    { top: 20, left: 80 },
    { top: 52, left: 30 },
    { top: 79, left: 65 },
  ],
  [
    { top: 63, left: 46 },
    { top: 34, left: 41 },
    { top: 53, left: 28 },
    { top: 80, left: 32 },
    { top: 27, left: 19 },
    { top: 68, left: 79 },
    { top: 25, left: 75 },
    { top: 45, left: 75 },
    { top: 80, left: 62 },
  ],
  [
    { top: 53, left: 63 },
    { top: 44, left: 15 },
    { top: 21, left: 80 },
    { top: 20, left: 44 },
    { top: 47, left: 37 },
    { top: 71, left: 22 },
    { top: 70, left: 76 },
    { top: 74, left: 50 },
    { top: 52, left: 85 },
  ],
  [
    { top: 29, left: 38 },
    { top: 32, left: 58 },
    { top: 63, left: 60 },
    { top: 75, left: 36 },
    { top: 33, left: 17 },
    { top: 51, left: 44 },
    { top: 61, left: 83 },
    { top: 79, left: 74 },
    { top: 60, left: 20 },
  ],
  [
    { top: 68, left: 56 },
    { top: 40, left: 45 },
    { top: 63, left: 31 },
    { top: 20, left: 16 },
    { top: 78, left: 83 },
    { top: 55, left: 74 },
    { top: 20, left: 57 },
    { top: 43, left: 18 },
    { top: 33, left: 73 },
  ],
  [
    { top: 64, left: 40 },
    { top: 52, left: 85 },
    { top: 24, left: 36 },
    { top: 37, left: 71 },
    { top: 72, left: 68 },
    { top: 44, left: 17 },
    { top: 71, left: 21 },
    { top: 40, left: 48 },
    { top: 20, left: 59 },
  ],
  [
    { top: 57, left: 47 },
    { top: 80, left: 67 },
    { top: 30, left: 51 },
    { top: 49, left: 27 },
    { top: 52, left: 74 },
    { top: 26, left: 23 },
    { top: 20, left: 74 },
    { top: 73, left: 34 },
    { top: 66, left: 15 },
  ],
  [
    { top: 65, left: 69 },
    { top: 77, left: 53 },
    { top: 44, left: 41 },
    { top: 71, left: 28 },
    { top: 49, left: 17 },
    { top: 28, left: 76 },
    { top: 47, left: 85 },
    { top: 24, left: 30 },
    { top: 26, left: 55 },
  ],
  [
    { top: 61, left: 37 },
    { top: 24, left: 70 },
    { top: 67, left: 85 },
    { top: 58, left: 15 },
    { top: 51, left: 58 },
    { top: 37, left: 20 },
    { top: 77, left: 51 },
    { top: 44, left: 79 },
    { top: 36, left: 40 },
  ],
  [
    { top: 24, left: 76 },
    { top: 56, left: 29 },
    { top: 64, left: 59 },
    { top: 74, left: 20 },
    { top: 22, left: 29 },
    { top: 51, left: 85 },
    { top: 78, left: 83 },
    { top: 40, left: 49 },
    { top: 79, left: 40 },
  ],
  [
    { top: 76, left: 38 },
    { top: 65, left: 15 },
    { top: 24, left: 43 },
    { top: 26, left: 76 },
    { top: 54, left: 62 },
    { top: 55, left: 35 },
    { top: 68, left: 78 },
    { top: 31, left: 23 },
    { top: 74, left: 58 },
  ],
  [
    { top: 58, left: 79 },
    { top: 36, left: 68 },
    { top: 64, left: 53 },
    { top: 40, left: 31 },
    { top: 72, left: 29 },
    { top: 78, left: 71 },
    { top: 20, left: 36 },
    { top: 20, left: 80 },
    { top: 20, left: 16 },
  ],
  [
    { top: 35, left: 81 },
    { top: 45, left: 59 },
    { top: 50, left: 21 },
    { top: 23, left: 16 },
    { top: 21, left: 59 },
    { top: 80, left: 47 },
    { top: 64, left: 80 },
    { top: 34, left: 36 },
    { top: 77, left: 16 },
  ],
  [
    { top: 78, left: 20 },
    { top: 59, left: 79 },
    { top: 53, left: 28 },
    { top: 22, left: 57 },
    { top: 59, left: 49 },
    { top: 24, left: 83 },
    { top: 28, left: 34 },
    { top: 43, left: 63 },
    { top: 79, left: 81 },
  ],
  [
    { top: 23, left: 27 },
    { top: 22, left: 61 },
    { top: 62, left: 30 },
    { top: 47, left: 63 },
    { top: 75, left: 62 },
    { top: 21, left: 81 },
    { top: 80, left: 39 },
    { top: 56, left: 84 },
    { top: 46, left: 15 },
  ],
  [
    { top: 31, left: 60 },
    { top: 55, left: 38 },
    { top: 77, left: 40 },
    { top: 52, left: 85 },
    { top: 54, left: 18 },
    { top: 64, left: 64 },
    { top: 25, left: 29 },
    { top: 78, left: 18 },
    { top: 73, left: 85 },
  ],
  [
    { top: 42, left: 54 },
    { top: 69, left: 71 },
    { top: 59, left: 36 },
    { top: 30, left: 73 },
    { top: 79, left: 33 },
    { top: 22, left: 46 },
    { top: 24, left: 22 },
    { top: 67, left: 17 },
    { top: 52, left: 83 },
  ],
  [
    { top: 43, left: 61 },
    { top: 31, left: 19 },
    { top: 34, left: 39 },
    { top: 62, left: 27 },
    { top: 55, left: 78 },
    { top: 24, left: 76 },
    { top: 76, left: 83 },
    { top: 63, left: 57 },
    { top: 20, left: 56 },
  ],
];
