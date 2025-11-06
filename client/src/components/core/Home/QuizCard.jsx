import { useEffect, useState } from "react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizCard = ({ quiz }) => {
  const [attempted, setAttempted] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setAttempted(user?.attemptedQuizzes?.includes(quiz._id));
  }, [user, quiz._id]);

  return (
    <Link
      to={`/quiz/${quiz._id}`}
      className="
                group relative flex flex-col justify-between
                border border-slate-700 
                bg-gradient-to-br from-slate-800 via-slate-900 to-black 
                hover:from-slate-700 hover:to-slate-800 
                transition-all duration-300 
                p-5 rounded-xl overflow-hidden
                hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]
                hover:-translate-y-1
            "
    >
      {/* Completed Ribbon */}
      {attempted && (
        <span
          className="
                    absolute top-3 right-[-30px] rotate-[35deg]
                    bg-green-600 text-white font-semibold text-xs px-14 py-1
                    shadow-md
                "
        >
          Completed
        </span>
      )}

      {/* Title */}
      <h2
        className="
                text-2xl font-semibold text-green-400 mb-2 
                group-hover:text-green-300 transition-colors duration-300
                line-clamp-2
            "
      >
        {quiz.title}
      </h2>

      {/* Description */}
      <p className="text-slate-300 text-sm mb-3 line-clamp-2">
        {quiz.description}
      </p>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-slate-400 text-xs border-t border-slate-700 pt-3">
        <span className="flex items-center gap-2">
          <span className="text-green-500">@{quiz.createdBy.username}</span>
        </span>
        <span>
          {formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}
        </span>
      </div>
    </Link>
  );
};

export default QuizCard;
