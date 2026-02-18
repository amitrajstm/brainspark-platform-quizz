import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { questionEndpoints } from "../services/APIs";
import Button from "../components/Button";
import CreateQuestionModal from "../components/core/createQuiz/CreateQuestionModal";
import BulkQuestionModal from "../components/core/createQuiz/BulkQuestionModal";
import QuestionCard from "../components/core/createQuiz/QuestionCard";
import { deleteQuestion } from "../services/operations/questionAPIs";
import { setQuiz, setEdit } from "../slices/QuizSlice";

const CreateQuestions = () => {
  const { quiz, edit } = useSelector((state) => state.quiz);
  const { token } = useSelector((state) => state.auth);

  const [questions, setQuestions] = useState([]);
  const [createQuestionModalData, setCreateQuestionModalData] = useState(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Finish handler
  const finishHandler = () => {
    navigate("/dashboard/create-quiz");
    dispatch(setQuiz(null));
    dispatch(setEdit(false));
  };

  // Delete question
  const deleteQuestionHandler = async (question) => {
    try {
      const response = await deleteQuestion(question._id, token);
      if (response) {
        setQuestions((prev) => prev.filter((q) => q._id !== question._id));
      }
    } catch (error) {
      console.log("ERROR DELETING QUESTION:", error);
    }
  };

  // Fetch questions (Edit mode)
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "GET",
        `${questionEndpoints.GET_QUIZ_QUESTIONS}/${id}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
      );

      if (response?.data?.success) {
        setQuestions(response.data.data);
      }
    } catch (error) {
      console.log("ERROR FETCHING QUESTIONS:", error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if quiz not available
  useEffect(() => {
    if (!quiz) {
      navigate("/dashboard/create-quiz");
    }
  }, [quiz, navigate]);

  // Load questions in edit mode
  useEffect(() => {
    if (edit && id) {
      fetchQuestions();
    }
  }, [edit, id]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 py-10">
        {/* Title */}
        <h3 className="text-3xl underline text-center">Add Questions</h3>

        {/* Quiz Info + Buttons */}
        <section className="flex w-full flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{quiz?.title}</h2>
            <p className="text-gray-500">{quiz?.description}</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setCreateQuestionModalData({ ...quiz })}
              active
            >
              Create Question
            </Button>

            <Button onClick={() => setShowBulkModal(true)} active>
              Upload JSON
            </Button>
          </div>
        </section>

        {/* Questions List */}
        <div className="w-full flex flex-col gap-5 min-h-[50vh]">
          {!loading && questions.length === 0 && (
            <div className="flex justify-center items-center text-lg min-h-[50vh]">
              No questions found
            </div>
          )}

          {!loading &&
            questions.length > 0 &&
            questions.map((ques) => (
              <QuestionCard
                key={ques._id}
                question={ques}
                quiz={quiz}
                deleteQuestionHandler={deleteQuestionHandler}
                setCreateQuestionModalData={setCreateQuestionModalData}
                setQuestions={setQuestions}
              />
            ))}

          {loading && (
            <div className="flex justify-center items-center text-lg">
              Loading...
            </div>
          )}
        </div>

        {/* Finish Button */}
        <div className="self-end w-full ">
          <Button onClick={finishHandler} active>
            Finish
          </Button>
        </div>
      </div>

      {/* Single Question Modal */}
      {createQuestionModalData && (
        <CreateQuestionModal
          quiz={createQuestionModalData}
          setCreateQuestionModalData={setCreateQuestionModalData}
          setQuestions={setQuestions}
        />
      )}

      {/* Bulk Question Modal */}
      {showBulkModal && (
        <BulkQuestionModal
          quiz={quiz}
          setQuestions={setQuestions}
          setShowBulkModal={setShowBulkModal}
        />
      )}
    </>
  );
};

export default CreateQuestions;













// import axios from 'axios';
// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom';
// import { apiConnector } from '../services/apiConnector';
// import { questionEndpoints } from '../services/APIs';
// import Button from '../components/Button';
// import CreateQuestionModal from '../components/core/createQuiz/CreateQuestionModal';
// import QuestionCard from "../components/core/createQuiz/QuestionCard"
// import { deleteQuestion } from '../services/operations/questionAPIs';
// import { setQuiz, setEdit } from '../slices/QuizSlice';

// const CreateQuestions = () => {

//     const { quiz, edit } = useSelector(state => state.quiz);
//     const { token } = useSelector(state => state.auth);

//     const [questions, setQuestions] = useState([]);
//     const [createQuestionModalData, setCreateQuestionModalData] = useState(null);
//     const [laoding, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { id } = useParams();

//     const finishHandler = () => {
//         navigate("/dashboard/create-quiz")
//         dispatch(setQuiz(null))
//         dispatch(setEdit(false))
//     }

//     const deleteQuestionHandler = async (question) => {

//         try {
//             const response = await deleteQuestion(question._id, token)
//             if (response) {
//                 setQuestions(prevQuestions => prevQuestions.filter(q => q._id !== question._id))
//             }
//         } catch (e) {
//             console.log("ERRO DELETING QUESTION : ", e);
//         }
//     }

//     const fetchQuestions = async () => {
//         setLoading(true)
//         try {
//             const response = await apiConnector("GET", `${questionEndpoints.GET_QUIZ_QUESTIONS}/${id}`, null, {
//                 Authorization: `Bearer ${token}`
//             })
//             // console.log("response : ", response)
//             if (response) {
//                 setQuestions(response?.data?.data);
//             }
//         } catch (error) {
//             console.log("ERROR FETCHING QUIZ QUESTIONS : ", error);
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         if (quiz === null) {
//             navigate("/dashboard/create-quiz")
//         }
//     }, [])

//     useEffect(() => {
//         if (edit) {
//             fetchQuestions();
//         }
//     }, [quiz, edit, id]);

//     return (
//         <>
//             <div className=' relative flex justify-start flex-col items-center gap-5 py-10'>
//                 <div>
//                     <h3 className='text-3xl underline text-center '>Add Questions</h3>
//                 </div>

//                 <section className='flex gap-y-3 w-full flex-col md:flex-row justify-between items-center'>
//                     <div className='flex flex-col items-center md:items-start'>
//                         <span className='flex gap-1 flex-col items-center md:items-start'>
//                             <h2 className='text-2xl'>
//                                 {quiz?.title}
//                             </h2>
//                             <p>{quiz?.description}</p>
//                         </span>
//                     </div>
//                     <Button
//                         onClick={() => setCreateQuestionModalData({ ...quiz })}
//                         className='w-max h-max'
//                         active
//                     >Create Question</Button>
//                 </section>
//                 <div className='w-full flex flex-col gap-5 rounded-lg min-h-[50vh]'>
//                     {
//                         !laoding && questions.length === 0 && (
//                             <div className='w-full flex flex-col justify-center items-center text-lg gap-5 rounded-lg min-h-[50vh]'>No questions found</div>
//                         )
//                     }
//                     {
//                         !laoding && questions.length > 0 && (
//                             questions.map((ques) => (
//                                 <QuestionCard
//                                     deleteQuestionHandler={deleteQuestionHandler}
//                                     key={ques?._id}
//                                     question={ques}
//                                     quiz={quiz}
//                                     setCreateQuestionModalData={setCreateQuestionModalData}
//                                     setQuestions={setQuestions}
//                                 />
//                             ))
//                         )
//                     }
//                 </div>
//                 <div className='self-end w-full md:w-max' onClick={finishHandler}>
//                     <Button active>Finish</Button>
//                 </div>
//             </div>
//             {
//                 createQuestionModalData && (
//                     <CreateQuestionModal
//                         quiz={createQuestionModalData}
//                         setCreateQuestionModalData={setCreateQuestionModalData}
//                         setQuestions={setQuestions}
//                     />
//                 )
//             }
//         </>
//     )
// }

// export default CreateQuestions
