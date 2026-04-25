import React from 'react';

const ResultScreen = ({ domain, results, onRestart, onBackToDomains, userInfo }) => {
  const { correct, wrong, unanswered, answers, questions } = results;
  const total = questions.length;
  const percentage = Math.round((correct / total) * 100);
  const isPassed = percentage >= 50;

  return (
    <div className="result-screen-container">
      {userInfo && (
        <div className="result-user-card">
          <div className="result-user-info">
            <h3>👤 {userInfo.name}</h3>
            <p>{userInfo.collegeName}</p>
            <p>{userInfo.branch} • {userInfo.course} • {userInfo.passingYear}</p>
            <p className="user-email">📧 {userInfo.email}</p>
            <p className="user-roll">🆔 Roll: {userInfo.rollNumber}</p>
          </div>
        </div>
      )}

      <div className="result-header">
        <h1>Quiz Complete! 🎉</h1>
        <p className="result-domain">Domain: <span>{domain}</span></p>
      </div>

      <div className="result-stats">
        <div className="stat-box total">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total Questions</div>
        </div>
        <div className="stat-box correct">
          <div className="stat-value">{correct}</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-box wrong">
          <div className="stat-value">{wrong}</div>
          <div className="stat-label">Wrong</div>
        </div>
        <div className="stat-box unanswered">
          <div className="stat-value">{unanswered}</div>
          <div className="stat-label">Unanswered</div>
        </div>
      </div>

      <div className="score-section">
        <div className="percentage-display">
          <div className="percentage-circle">
            <span className="percentage-value">{percentage}%</span>
          </div>
        </div>
        <div className={`status-badge ${isPassed ? 'passed' : 'failed'}`}>
          {isPassed ? '✓ PASSED' : '✗ FAILED'}
        </div>
        <div 
          className="internship-status"
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: correct >= 6 ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
            color: correct >= 6 ? '#2ecc71' : '#e74c3c',
            border: `1px solid ${correct >= 6 ? '#2ecc71' : '#e74c3c'}`,
            fontWeight: '600',
            textAlign: 'center',
            fontSize: '1.1rem'
          }}
        >
          {correct >= 6 
            ? '🎉 Congratulations! Internship is available for you.' 
            : '📝 Keep practicing! Internship is not available for you.'}
        </div>
      </div>

      <div className="review-section">
        <h2>Question Review Summary</h2>
        <div className="review-list">
          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            const isUnanswered = userAnswer === undefined;

            return (
              <div key={index} className={`review-item ${isCorrect ? 'correct-review' : isUnanswered ? 'unanswered-review' : 'wrong-review'}`}>
                <div className="review-header">
                  <span className="review-q-number">Q{index + 1}</span>
                  <span className={`review-status ${isCorrect ? 'status-correct' : isUnanswered ? 'status-unanswered' : 'status-wrong'}`}>
                    {isCorrect ? '✓ Correct' : isUnanswered ? '⊘ Unanswered' : '✗ Wrong'}
                  </span>
                </div>
                <p className="review-question">{q.question}</p>
                {!isUnanswered && (
                  <div className="review-answers">
                    <div className="user-answer">
                      <strong>Your Answer:</strong> {q.options[userAnswer]}
                    </div>
                    {!isCorrect && (
                      <div className="correct-answer">
                        <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-primary" onClick={onRestart}>
          Restart Quiz
        </button>
        <button className="btn-secondary" onClick={onBackToDomains}>
          Back to Domains
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
