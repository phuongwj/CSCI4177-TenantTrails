import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { stars } from "../data/mockData";
import TopNav from "../components/TopNav";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

export default function Profile() {
  const navigate = useNavigate();
  const { apartments, reviews, comments, editReview, deleteReview } = useData();
  const { user } = useAuth();

  const [editReviewObj, setEditReviewObj] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const myReviews = reviews.filter(r => r.userId === user.id);
  const myComments = comments.filter(c => c.userId === user.id);

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
                  <div><div className="profile-stat-num">{myComments.length}</div><div className="profile-stat-lbl">Comments</div></div>
                </div>
              </div>
              <div className="profile-reviews">
                <h3>Your Reviews</h3>
                {myReviews.length ? myReviews.map(r => {
                  const apt = apartments.find(a => a.id === r.aptId);
                  return (
                    <div className="profile-review-card" key={r.id}>
                      <div>
                        <h4>{apt ? apt.name : "Unknown"}</h4>
                        <div className="stars">{stars(r.rating)}</div>
                        <div className="excerpt">{r.body.slice(0, 120)}{r.body.length > 120 ? "..." : ""}</div>
                      </div>
                      <div className="actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/apartment/${r.aptId}`)}>View</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditReviewObj(r)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(r.id)}>Delete</button>
                      </div>
                    </div>
                  );
                }) : <p style={{ color: "var(--gray-400)", padding: "24px 0" }}>You haven't written any reviews yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal open={!!editReviewObj} review={editReviewObj} onClose={() => setEditReviewObj(null)}
        onSave={(rid, rating, body) => { editReview(rid, rating, body); setEditReviewObj(null); }} />
      <DeleteModal open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => { deleteReview(deleteId); setDeleteId(null); }} />
    </div>
  );
}
