import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { stars } from "../data/mockData";
import TopNav from "../components/TopNav";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const API = "http://localhost:5003";

export default function Profile() {
  const navigate = useNavigate();
  const { editReview, deleteReview } = useData();
  const { user } = useAuth();

  const [editReviewObj, setEditReviewObj] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [myReviews, setMyReviews] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetch(`${API}/api/profile`, { credentials: "include" })
      .then(res => res.ok ? res.json() : { userProfileResult: [], userCommentsResult: [{ commentCount: 0 }] })
      .then(data => {
        setMyReviews(data.userProfileResult || []);
        setCommentCount(data.userCommentsResult?.[0]?.commentCount || 0);
      });
  }, []);

  async function handleEdit(rid, rating, body) {
    await editReview(rid, rating, body);
    setMyReviews(prev => prev.map(r => r.id === rid ? { ...r, rating, body } : r));
    setEditReviewObj(null);
  }

  async function handleDelete(id) {
    await deleteReview(id);
    setMyReviews(prev => prev.filter(r => r.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="view active">
      <div className="app-shell">
        <TopNav />
        <div className="content-area">
          <div className="view active">
            <div className="detail-back" onClick={() => navigate("/app")}>← Back to apartments</div>
            <div>
              <div className="profile-header">
                <div className="profile-avatar">{user.initials}</div>
                <div className="profile-info">
                  <h2>{user.name}</h2>
                  <div className="email">{user.email}</div>
                </div>
                <div className="profile-stats">
                  <div><div className="profile-stat-num">{myReviews.length}</div><div className="profile-stat-lbl">Reviews</div></div>
                  <div><div className="profile-stat-num">{commentCount}</div><div className="profile-stat-lbl">Comments</div></div>
                </div>
              </div>
              <div className="profile-reviews">
                <h3>Your Reviews</h3>
                {myReviews.length ? myReviews.map(r => (
                  <div className="profile-review-card" key={r.id}>
                    <div>
                      <h4>{r.aptName || "Unknown"}</h4>
                      <div className="stars">{stars(r.rating)}</div>
                      <div className="excerpt">{r.body.slice(0, 120)}{r.body.length > 120 ? "..." : ""}</div>
                    </div>
                    <div className="actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/apartment/${r.aptId}`)}>View</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditReviewObj(r)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(r.id)}>Delete</button>
                    </div>
                  </div>
                )) : <p style={{ color: "var(--gray-400)", padding: "24px 0" }}>You haven't written any reviews yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal open={!!editReviewObj} review={editReviewObj} onClose={() => setEditReviewObj(null)}
        onSave={handleEdit} />
      <DeleteModal open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)} />
    </div>
  );
}
