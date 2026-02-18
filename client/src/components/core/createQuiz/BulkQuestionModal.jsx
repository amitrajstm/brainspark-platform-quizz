import React, { useState } from "react";
import Button from "../../Button";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiConnector";
import { questionEndpoints } from "../../../services/APIs";

const BulkQuestionModal = ({ quiz, setQuestions, setShowBulkModal }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const submitHandler = async () => {
    if (!jsonInput.trim()) {
      toast.error("JSON cannot be empty");
      return;
    }

    let parsedData;

    try {
      parsedData = JSON.parse(jsonInput);
    } catch {
      toast.error("Invalid JSON format");
      return;
    }

    if (!Array.isArray(parsedData)) {
      toast.error("JSON must be an array");
      return;
    }

    const formattedQuestions = parsedData.map((q) => ({
      quizId: quiz._id,
      questionText: q.questionText,
      options: q.options,
    }));

    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        questionEndpoints.CREATE_BULK_QUESTIONS,
        { questions: formattedQuestions },
        {
          Authorization: `Bearer ${token}`,
        },
      );

      if (response?.data?.success) {
        setQuestions((prev) => [...prev, ...response.data.data]);
        toast.success("Bulk Questions Uploaded ✅");
        setShowBulkModal(false);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("BULK ERROR:", error.response?.data || error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-[50%] translate-y-[-50%] inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="max-w-[600px] w-full p-6 bg-slate-800 shadow-lg shadow-slate-600 rounded-lg border border-slate-600 flex flex-col gap-6">
        <h3 className="text-3xl text-center text-white">
          Upload Bulk Questions
        </h3>

        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`Paste JSON array here...Like 👎🏻:
 [
  {
    "questionText": "What is Node.js?",
    "options": [
      { "text": "JavaScript Runtime", "isCorrect": true },
      { "text": "Database", "isCorrect": false }
    ]
  }
]`}
          className="w-full min-h-[250px] p-3 rounded-lg placeholder:text-black text-slate-950  px-3  bg-slate-300 outline-none"
        />

        <div className="flex justify-end gap-3">
          <Button onClick={() => setShowBulkModal(false)} active={false}>
            Cancel
          </Button>

          <Button onClick={submitHandler} disabled={loading} active>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkQuestionModal;
