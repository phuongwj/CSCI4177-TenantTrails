import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { stars, formatDate } from "../data/mockData";
import TopNav from "../components/TopNav";
import ReviewModal from "../components/ReviewModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

export default function ApartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const aptId = Number(id);
  const { apartments, reviews, comments, getAptRating, getAptReviewCount,
    addReview, editReview, deleteReview, addComment, generateAISummary,
    fetchApartmentDetail } = useData();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [aiLoading, setAiLoading] = useState(false);
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [reviewOpen, setReviewOpen] = useState(false);
  const [editReviewObj, setEditReviewObj] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchApartmentDetail(aptId);
  }, [aptId]);

  const apt = apartments.find(a => a.id === aptId);
  if (!apt) return null;

  const rating = getAptRating(apt.id);
  const count = getAptReviewCount(apt.id);
  const revs = reviews.filter(r => r.aptId === apt.id).sort((a, b) => new Date(b.date) - new Date(a.date));

  function handleGenerate() {
    setAiLoading(true);
    setTimeout(() => {
      generateAISummary(apt.id);
      setAiLoading(false);
      showToast("AI summary generated", "success");
    }, 1800);
  }

  function toggleComments(reviewId) {
    setOpenComments(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  }
  function postComment(reviewId) {
    const body = (commentText[reviewId] || "").trim();
    if (!body) return;
    addComment(reviewId, user.id, body);
    setCommentText(prev => ({ ...prev, [reviewId]: "" }));
    showToast("Comment posted", "success");
  }

  return (
    <div className="view active">
      <div className="app-shell">
        <TopNav />
        <div className="content-area">
          <div className="view active">
            <div className="detail-back" onClick={() => navigate("/app")}>← Back to all apartments</div>

            <div className="detail-hero">
              <div>
                <h1>{apt.name}</h1>
                <div className="neighbourhood">📍 {apt.address} · {apt.neighbourhood}</div>
                {apt.description && <p style={{ color: "var(--gray-500)", fontSize: "14px", marginTop: "8px" }}>{apt.description}</p>}
              </div>
              <div className="detail-rating">
                <div className="big-num">{Number(rating || 0).toFixed(1)}</div>
                <div className="stars">{stars(rating)}</div>
                <div className="count">{count} reviews</div>
              </div>
            </div>

            <div className="detail-grid">
              <div>
                <div className="ai-card">
                  {aiLoading ? (
                    <>
                      <div className="ai-label">✨ AI Summary</div>
                      <div className="ai-loading"><div className="spinner"></div>Analysing {count} reviews with Groq...</div>
                    </>
                  ) : apt.aiSummary ? (
                    <>
                      <div className="ai-label">✨ AI-Generated Summary</div>
                      <p>{apt.aiSummary}</p>
                    </>
                  ) : (
                    <>
                      <div className="ai-label">✨ AI Summary</div>
                      <p style={{ color: "var(--gray-400)", fontStyle: "italic", marginBottom: "12px" }}>No summary generated yet. Click below to generate one from existing reviews.</p>
                      <button className="btn btn-secondary btn-sm generate-btn" onClick={handleGenerate}>Generate AI Summary</button>
                    </>
                  )}
                </div>

                {apt.aiIssues && apt.aiIssues.length > 0 && (
                  <div className="key-issues" style={{ display: "block" }}>
                    <h3>Key Issues</h3>
                    <div className="issues-list">
                      {apt.aiIssues.map((i, idx) => <span className="tag" key={idx}>{i}</span>)}
                    </div>
                  </div>
                )}

                <div className="reviews-section">
                  <div className="reviews-header">
                    <h3>Reviews ({revs.length})</h3>
                    <button className="btn btn-secondary btn-sm" onClick={() => setReviewOpen(true)}>+ Write a Review</button>
                  </div>
                  {revs.map(r => {
                    const cs = comments.filter(c => c.reviewId === r.id);
                    const isOwn = user && r.userId === user.id;
                    const show = openComments[r.id] ?? cs.length > 0;
                    return (
                      <div className="review-item" key={r.id}>
                        <div className="review-top">
                          <div className="review-author">
                            <div className="avatar" style={{ background: isOwn ? "var(--blue-100)" : "var(--gray-100)", color: isOwn ? "var(--blue-600)" : "var(--gray-500)" }}>{r.userInitials || "??"}</div>
                            <div className="info">
                              <div className="name">{r.userName || "Anonymous"}{isOwn ? " (you)" : ""}</div>
                              <div className="date">{formatDate(r.date)}</div>
                            </div>
                          </div>
                          <div className="review-stars">{stars(r.rating)}</div>
                        </div>
                        <div className="review-body">{r.body}</div>
                        <div className="review-actions">
                          <button onClick={() => toggleComments(r.id)}>💬 {cs.length} comment{cs.length !== 1 ? "s" : ""}</button>
                          {isOwn && <button onClick={() => setEditReviewObj(r)}>✏️ Edit</button>}
                          {isOwn && <button onClick={() => setDeleteId(r.id)}>🗑️ Delete</button>}
                        </div>
                        {show && (
                          <div className="comments-section" style={{ display: "block" }}>
                            {cs.map(c => (
                              <div className="comment-item" key={c.id}>
                                <span className="comment-author">{c.userName || "Anonymous"}</span>
                                <span className="comment-date">{formatDate(c.date)}</span>
                                <div className="comment-body">{c.body}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {show && (
                          <div className="comment-form" style={{ display: "flex" }}>
                            <input type="text" placeholder="Write a comment..."
                              value={commentText[r.id] || ""}
                              onChange={e => setCommentText(prev => ({ ...prev, [r.id]: e.target.value }))}
                              onKeyDown={e => e.key === "Enter" && postComment(r.id)} />
                            <button onClick={() => postComment(r.id)}>Reply</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="detail-sidebar">
                <div className="sidebar-card">
                  <h4>Property Info</h4>
                  <div className="sidebar-row"><span className="label">Landlord</span><span className="value">{apt.landlord}</span></div>
                  <div className="sidebar-row"><span className="label">Units</span><span className="value">{apt.units}</span></div>
                  <div className="sidebar-row"><span className="label">Year built</span><span className="value">{apt.built}</span></div>
                  <div className="sidebar-row"><span className="label">Neighbourhood</span><span className="value">{apt.neighbourhood}</span></div>
                </div>
                <div className="sidebar-card">
                  <h4>Rating Breakdown</h4>
                  {[5, 4, 3, 2, 1].map(n => {
                    const c = reviews.filter(r => r.aptId === apt.id && r.rating === n).length;
                    const pct = count ? (c / count * 100) : 0;
                    return (
                      <div key={n} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "13px", width: "14px", textAlign: "right", color: "var(--gray-500)" }}>{n}</span>
                        <span style={{ color: "var(--amber-400)", fontSize: "12px" }}>★</span>
                        <div style={{ flex: 1, height: "8px", background: "var(--gray-100)", borderRadius: "4px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: pct + "%", background: "var(--blue-500)", borderRadius: "4px", transition: "width 0.3s" }}></div>
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--gray-400)", width: "20px" }}>{c}</span>
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setReviewOpen(true)}>Write a Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal open={reviewOpen} onClose={() => setReviewOpen(false)}
        onSubmit={(rating, body, media) => { addReview(apt.id, user.id, rating, body, media); setReviewOpen(false); }} />
      <EditModal open={!!editReviewObj} review={editReviewObj} onClose={() => setEditReviewObj(null)}
        onSave={(rid, rating, body) => { editReview(rid, rating, body); setEditReviewObj(null); }} />
      <DeleteModal open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => { deleteReview(deleteId); setDeleteId(null); }} />
    </div>
  );
}
