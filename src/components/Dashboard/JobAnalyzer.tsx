import { useState } from "react";
import { Upload, Search, RotateCcw } from "lucide-react";

import AnalysisResult from "./AnalysisResult";
import JobDetails from "./JobDetails";
import AIRecommendations from "./AIRecommendations";
import CompanyVerification from "./CompanyVerification";
import SalaryAnalysis from "./SalaryAnalysis";
import CompanyNews from "./CompanyNews";
import ATSResult from "./ATSResult";
import AIExplanation from "./AIExplanation";
import ScamIndicators from "./ScamIndicators";
import DownloadReport from "./DownloadReport";
import AnalyticsChart from "./AnalyticsChart";
import JobSafety from "./JobSafety";

interface AnalysisResultType {
  success?: boolean;
  analysis_id?: number;
  user_id?: number;

  risk_score: string;
  status: string;
  company: string;

  job_title: string;
  company_name: string;
  location: string;
  experience: string;
  salary: string;
  employment_type: string;

  skills: string[];

  email: string;
  website: string;

  news: string[];

  ats_score: number;
  matched_skills: string[];
  missing_skills: string[];

  ai_explanation: string;
  indicators: string[];
}

interface LoggedInUser {
  id: number;
  name: string;
  email: string;
}

interface ErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

const isErrorResponse = (
  value: unknown
): value is ErrorResponse => {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  return true;
};

const isAnalysisResult = (
  value: unknown
): value is AnalysisResultType => {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const data =
    value as Record<string, unknown>;

  return (
    typeof data.risk_score === "string" &&
    typeof data.status === "string" &&
    typeof data.company === "string"
  );
};

export default function JobAnalyzer() {
  const [jobDescription, setJobDescription] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [resumeFile, setResumeFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<AnalysisResultType | null>(null);

  // =====================================================
  // ANALYZE JOB
  // =====================================================

  const analyzeJob = async () => {
    // ---------------------------------------------------
    // Prevent multiple requests
    // ---------------------------------------------------

    if (loading) {
      return;
    }

    // ---------------------------------------------------
    // Validate job input
    // ---------------------------------------------------

    if (
      !jobDescription.trim() &&
      !selectedFile
    ) {
      alert(
        "Please enter a job description or upload a job file."
      );

      return;
    }

    // ---------------------------------------------------
    // Get logged-in user
    // ---------------------------------------------------

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      alert(
        "Please login before analyzing a job."
      );

      return;
    }

    let user: LoggedInUser;

    try {
      user = JSON.parse(
        storedUser
      ) as LoggedInUser;

    } catch (error) {
      console.error(
        "Invalid user data:",
        error
      );

      localStorage.removeItem("user");
      localStorage.removeItem("access_token");

      alert(
        "Your login session is invalid. Please login again."
      );

      return;
    }

    // ---------------------------------------------------
    // Validate user
    // ---------------------------------------------------

    if (
      !user.id ||
      user.id <= 0
    ) {
      alert(
        "User information is missing. Please login again."
      );

      return;
    }

    // ---------------------------------------------------
    // Get JWT access token
    // ---------------------------------------------------

    const accessToken =
      localStorage.getItem(
        "access_token"
      );

    if (!accessToken) {
      alert(
        "Authentication token is missing. Please login again."
      );

      return;
    }

    try {
      setLoading(true);

      // =================================================
      // CREATE FORMDATA
      // =================================================

      const formData =
        new FormData();

      formData.append(
        "description",
        jobDescription
      );

      if (selectedFile) {
        formData.append(
          "file",
          selectedFile
        );
      }

      if (resumeFile) {
        formData.append(
          "resume",
          resumeFile
        );
      }

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "======================================"
      );

      console.log(
        "Sending Analyze Job Request"
      );

      console.log(
        "Authenticated User ID:",
        user.id
      );

      console.log(
        "Token exists:",
        Boolean(accessToken)
      );

      console.log(
        "Token preview:",
        `${accessToken.substring(0, 15)}...`
      );

      for (
        const [key, value] of formData.entries()
      ) {
        if (value instanceof File) {
          console.log(
            "FormData:",
            key,
            value.name
          );
        } else {
          console.log(
            "FormData:",
            key,
            value
          );
        }
      }

      console.log(
        "======================================"
      );

      // =================================================
      // SEND REQUEST
      // =================================================

      const response =
        await fetch("https://scoutwise-ai.onrender.com/analyze-job",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },

            body: formData,
          }
        );

      // =================================================
      // READ RESPONSE
      // =================================================

      let responseData: unknown = null;

      try {
        responseData =
          await response.json();

      } catch (error) {
        console.error(
          "Could not parse backend response:",
          error
        );
      }

      console.log(
        "Backend status:",
        response.status
      );

      console.log(
        "Backend response:",
        responseData
      );

      // =================================================
      // HANDLE UNAUTHORIZED
      // =================================================

      if (
        response.status === 401
      ) {
        alert(
          "Your login session has expired or is invalid. Please login again."
        );

        localStorage.removeItem(
          "access_token"
        );

        localStorage.removeItem(
          "user"
        );

        return;
      }

      // =================================================
      // HANDLE HTTP ERRORS
      // =================================================

      if (!response.ok) {
        let errorMessage =
          "Failed to analyze the job.";

        if (
          isErrorResponse(
            responseData
          )
        ) {
          if (
            typeof responseData.detail ===
            "string"
          ) {
            errorMessage =
              responseData.detail;
          } else if (
            typeof responseData.message ===
            "string"
          ) {
            errorMessage =
              responseData.message;
          } else if (
            typeof responseData.error ===
            "string"
          ) {
            errorMessage =
              responseData.error;
          }
        }

        alert(errorMessage);

        return;
      }

      // =================================================
      // VALIDATE RESPONSE
      // =================================================

      if (
        !isAnalysisResult(
          responseData
        )
      ) {
        console.error(
          "Invalid analysis response:",
          responseData
        );

        alert(
          "Backend returned an incomplete analysis result."
        );

        return;
      }

      // =================================================
      // BACKEND SUCCESS FLAG
      // =================================================

      if (
        responseData.success === false
      ) {
        alert(
          "Job analysis failed."
        );

        return;
      }

      // =================================================
      // STORE RESULT
      // =================================================

      setResult(
        responseData
      );

      // =================================================
      // SCROLL TO RESULTS
      // =================================================

      setTimeout(() => {
        window.scrollTo({
          top:
            document.body.scrollHeight,

          behavior:
            "smooth",
        });
      }, 200);

    } catch (error) {
      console.error(
        "Analyze Job Error:",
        error
      );

      alert(
        "Cannot connect to FastAPI backend. Make sure FastAPI is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLEAR ANALYSIS
  // =====================================================

  const clearAnalysis = () => {
    setJobDescription("");
    setSelectedFile(null);
    setResumeFile(null);
    setResult(null);
  };

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <div className="w-full">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-center gap-3">

        <div
          className="
            rounded-xl
            bg-blue-100
            p-3
            text-blue-600
            dark:bg-blue-950
            dark:text-blue-400
          "
        >
          <Search size={28} />
        </div>

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            AI Job Analyzer
          </h2>

          <p
            className="
              text-gray-600
              dark:text-slate-300
            "
          >
            Detect fake job postings using AI
          </p>

        </div>

      </div>

      {/* =================================================
          JOB DESCRIPTION
      ================================================= */}

      <div className="mt-8">

        <label
          className="
            font-semibold
            text-slate-900
            dark:text-slate-200
          "
        >
          Job Description
        </label>

        <textarea
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
          placeholder="Paste the job description here..."
          className="
            mt-3
            h-40
            w-full
            resize-none
            rounded-xl
            border
            border-gray-300
            bg-white
            p-4
            text-slate-900
            outline-none
            transition-colors
            placeholder:text-gray-400
            focus:border-blue-500
            dark:border-slate-600
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
          "
        />

      </div>

      {/* =================================================
          JOB FILE
      ================================================= */}

      <div className="mt-5">

        <label
          className="
            font-semibold
            text-slate-900
            dark:text-slate-200
          "
        >
          Job Posting File
        </label>

        <label
          className="
            mt-3
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            border
            border-gray-300
            bg-white
            px-6
            py-3
            text-slate-700
            transition
            hover:bg-slate-50
            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-200
            dark:hover:bg-slate-700
          "
        >

          <Upload
            size={20}
            className="
              text-blue-600
              dark:text-blue-400
            "
          />

          <span>
            {selectedFile
              ? selectedFile.name
              : "Upload Job File"}
          </span>

          <input
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            onChange={(e) => {

              if (
                e.target.files &&
                e.target.files.length > 0
              ) {
                setSelectedFile(
                  e.target.files[0]
                );
              }

            }}
          />

        </label>

      </div>

      {/* Selected Job File */}

      {selectedFile && (
        <p
          className="
            mt-3
            text-sm
            text-green-600
            dark:text-green-400
          "
        >
          Selected Job File:{" "}
          {selectedFile.name}
        </p>
      )}

      {/* =================================================
          RESUME
      ================================================= */}

      <div className="mt-6">

        <label
          className="
            font-semibold
            text-slate-900
            dark:text-slate-200
          "
        >
          Resume
        </label>

        <label
          className="
            mt-3
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            border
            border-gray-300
            bg-white
            px-6
            py-3
            text-slate-700
            transition
            hover:bg-slate-50
            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-200
            dark:hover:bg-slate-700
          "
        >

          <Upload
            size={20}
            className="
              text-blue-600
              dark:text-blue-400
            "
          />

          <span>
            {resumeFile
              ? resumeFile.name
              : "Upload Resume"}
          </span>

          <input
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            onChange={(e) => {

              if (
                e.target.files &&
                e.target.files.length > 0
              ) {
                setResumeFile(
                  e.target.files[0]
                );
              }

            }}
          />

        </label>

      </div>

      {/* Selected Resume */}

      {resumeFile && (
        <p
          className="
            mt-3
            text-sm
            text-green-600
            dark:text-green-400
          "
        >
          Selected Resume:{" "}
          {resumeFile.name}
        </p>
      )}

      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="mt-6 flex gap-3">

        <button
          type="button"
          onClick={analyzeJob}
          disabled={loading}
          className="
            flex-1
            rounded-xl
            bg-blue-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Analyzing..."
            : "Analyze Job"}
        </button>

        <button
          type="button"
          onClick={clearAnalysis}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-300
            bg-white
            px-5
            py-3
            font-semibold
            text-slate-700
            transition
            hover:bg-gray-100
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-200
            dark:hover:bg-slate-700
          "
        >
          <RotateCcw size={18} />
          Clear
        </button>

      </div>

      {/* =================================================
          RESULTS
      ================================================= */}

      {result && (
        <div
          className="
            mt-8
            space-y-6
          "
        >

          <AnalysisResult
            riskScore={
              result.risk_score
            }
            status={
              result.status
            }
            company={
              result.company
            }
          />

          <JobDetails
            job_title={
              result.job_title
            }
            company_name={
              result.company_name
            }
            location={
              result.location
            }
            experience={
              result.experience
            }
            salary={
              result.salary
            }
            employment_type={
              result.employment_type
            }
            skills={
              result.skills
            }
            email={
              result.email
            }
            website={
              result.website
            }
          />

          <AIRecommendations
            status={
              result.status
            }
            riskScore={
              result.risk_score
            }
          />

          <CompanyVerification
            company={
              result.company_name
            }
            website={
              result.website
            }
          />

          <SalaryAnalysis
            salary={
              result.salary
            }
          />

          <CompanyNews
            news={
              result.news
            }
          />

          <ATSResult
            score={
              result.ats_score
            }
            matchedSkills={
              result.matched_skills
            }
            missingSkills={
              result.missing_skills
            }
          />

          <AIExplanation
            explanation={
              result.ai_explanation
            }
          />

          <ScamIndicators
            indicators={
              result.indicators
            }
          />

          <DownloadReport
            result={
              result
            }
          />

          <AnalyticsChart
            riskScore={
              result.risk_score
            }
            atsScore={
              result.ats_score
            }
          />

          <JobSafety
            riskScore={
              result.risk_score
            }
          />

        </div>
      )}

    </div>
  );
}

