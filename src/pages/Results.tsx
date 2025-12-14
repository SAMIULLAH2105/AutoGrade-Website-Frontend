import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Share2, ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertCircle, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

interface QuestionResult {
  questionNumber: string;
  maxMarks: number;
  achievedMarks: number;
  feedback: string;
  status: "correct" | "partial" | "incorrect";
}

// Mock data - In production, this would come from the Django API
const mockResults = {
  paperTitle: "Mathematics Paper 1 - O Level",
  subject: "Mathematics",
  totalMarks: 100,
  achievedMarks: 78,
  percentage: 78,
  grade: "A",
  submittedAt: "2024-01-15T10:30:00",
  questions: [
    {
      questionNumber: "1(a)",
      maxMarks: 4,
      achievedMarks: 4,
      feedback: "Excellent work! All steps shown correctly with proper working.",
      status: "correct" as const,
    },
    {
      questionNumber: "1(b)",
      maxMarks: 6,
      achievedMarks: 4,
      feedback: "Good attempt, but missing the final simplification step. Remember to always simplify your final answer.",
      status: "partial" as const,
    },
    {
      questionNumber: "2",
      maxMarks: 8,
      achievedMarks: 8,
      feedback: "Perfect solution with clear methodology and correct units.",
      status: "correct" as const,
    },
    {
      questionNumber: "3(a)",
      maxMarks: 5,
      achievedMarks: 2,
      feedback: "Correct approach but calculation error in step 3. Check your arithmetic.",
      status: "partial" as const,
    },
    {
      questionNumber: "3(b)",
      maxMarks: 7,
      achievedMarks: 7,
      feedback: "Excellent! All working clearly shown with correct final answer.",
      status: "correct" as const,
    },
    {
      questionNumber: "4",
      maxMarks: 10,
      achievedMarks: 6,
      feedback: "Good understanding of the concept. Part (i) correct, but part (ii) needs more detailed working. Show all intermediate steps.",
      status: "partial" as const,
    },
    {
      questionNumber: "5",
      maxMarks: 12,
      achievedMarks: 12,
      feedback: "Outstanding work! Complex problem solved with excellent methodology.",
      status: "correct" as const,
    },
    {
      questionNumber: "6(a)",
      maxMarks: 4,
      achievedMarks: 0,
      feedback: "Incorrect approach. Review the formula for calculating compound interest.",
      status: "incorrect" as const,
    },
    {
      questionNumber: "6(b)",
      maxMarks: 6,
      achievedMarks: 5,
      feedback: "Almost perfect! Small rounding error in the final step.",
      status: "partial" as const,
    },
  ] as QuestionResult[],
};

export default function ResultsPage() {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestion = (questionNumber: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionNumber)
        ? prev.filter((q) => q !== questionNumber)
        : [...prev, questionNumber]
    );
  };

  const getStatusIcon = (status: QuestionResult["status"]) => {
    switch (status) {
      case "correct":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "partial":
        return <AlertCircle className="w-5 h-5 text-accent" />;
      case "incorrect":
        return <XCircle className="w-5 h-5 text-destructive" />;
    }
  };

  const getStatusColor = (status: QuestionResult["status"]) => {
    switch (status) {
      case "correct":
        return "bg-success/10 border-success/20";
      case "partial":
        return "bg-accent/10 border-accent/20";
      case "incorrect":
        return "bg-destructive/10 border-destructive/20";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
      case "A*":
        return "text-success";
      case "B":
        return "text-primary";
      case "C":
        return "text-accent";
      default:
        return "text-destructive";
    }
  };

  return (
    <Layout>
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link to="/upload" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Upload another paper
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Results</span>
            </h1>
            <p className="text-muted-foreground">
              {mockResults.paperTitle}
            </p>
          </div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 mb-8"
          >
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {/* Score */}
              <div>
                <div className="font-display text-5xl font-bold gradient-text mb-2">
                  {mockResults.achievedMarks}/{mockResults.totalMarks}
                </div>
                <p className="text-muted-foreground">Total Score</p>
              </div>

              {/* Percentage */}
              <div>
                <div className="font-display text-5xl font-bold text-foreground mb-2">
                  {mockResults.percentage}%
                </div>
                <p className="text-muted-foreground">Percentage</p>
              </div>

              {/* Grade */}
              <div>
                <div className={`font-display text-5xl font-bold mb-2 ${getGradeColor(mockResults.grade)}`}>
                  {mockResults.grade}
                </div>
                <p className="text-muted-foreground">Grade</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockResults.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full gradient-bg rounded-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="gradient">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Correct", count: mockResults.questions.filter(q => q.status === "correct").length, color: "bg-success/10 text-success" },
              { label: "Partial", count: mockResults.questions.filter(q => q.status === "partial").length, color: "bg-accent/10 text-accent" },
              { label: "Incorrect", count: mockResults.questions.filter(q => q.status === "incorrect").length, color: "bg-destructive/10 text-destructive" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass-card p-4 text-center"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.color} mb-2`}>
                  {stat.count}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">Detailed Breakdown</h2>
            
            <div className="space-y-3">
              {mockResults.questions.map((question, index) => (
                <motion.div
                  key={question.questionNumber}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${getStatusColor(question.status)}`}
                >
                  <button
                    onClick={() => toggleQuestion(question.questionNumber)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(question.status)}
                      <span className="font-display font-semibold">Question {question.questionNumber}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">
                        {question.achievedMarks}/{question.maxMarks} marks
                      </span>
                      {expandedQuestions.includes(question.questionNumber) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {expandedQuestions.includes(question.questionNumber) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <div className="p-4 rounded-xl bg-background/50">
                        <h4 className="font-semibold text-sm mb-2">Feedback</h4>
                        <p className="text-muted-foreground text-sm">{question.feedback}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link to="/upload">
              <Button variant="hero" size="xl">
                <FileText className="w-5 h-5" />
                Check Another Paper
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
