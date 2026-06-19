import { useState, useEffect } from "react";
import StarInput from "./StarInput";
import { useToast } from "../context/ToastContext";

export default function EditModal({ open, review, onClose, onSave }) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (review) { setRating(review.rating); setBody(review.body); }
  }, [review]);

  if (!open || !review) return null;

  function save() {
    onSave(review.id, rating, body.trim());
    showToast("Review updated", "success");
  }

  return (
    <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <h3>Edit Review</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-field">
            <label>Your rating</label>
            <StarInput rating={rating} setRating={setRating} />
          </div>
          <div className="form-field">
            <label>Your review</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} />
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{ width: "auto" }} onClick={save}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
