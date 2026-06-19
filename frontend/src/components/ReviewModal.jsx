import { useState } from "react";
import StarInput from "./StarInput";
import { useToast } from "../context/ToastContext";

const uploadNames = ['kitchen.jpg', 'bathroom.jpg', 'hallway.jpg', 'entrance.mp4', 'bedroom.jpg'];

export default function ReviewModal({ open, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [bodyErr, setBodyErr] = useState(false);
  const [uploads, setUploads] = useState([]);
  const { showToast } = useToast();

  if (!open) return null;

  function reset() {
    setRating(0); setBody(""); setBodyErr(false); setUploads([]);
  }
  function close() { reset(); onClose(); }

  function simulateUpload() {
    setUploads(prev => [...prev, uploadNames[prev.length % uploadNames.length]]);
    showToast("File attached (demo)");
  }
  function removeUpload(i) {
    setUploads(prev => prev.filter((_, j) => j !== i));
  }

  function submit() {
    if (!rating) { showToast("Please select a rating", "error"); return; }
    if (!body.trim()) { setBodyErr(true); return; }
    const media = uploads.map(f => f.endsWith(".mp4") ? "video" : "photo");
    onSubmit(rating, body.trim(), media);
    reset();
    showToast("Review submitted!", "success");
  }

  return (
    <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && close()}>
      <div className="modal">
        <div className="modal-head">
          <h3>Write a Review</h3>
          <button className="modal-close" onClick={close}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-field">
            <label>Your rating</label>
            <StarInput rating={rating} setRating={setRating} />
          </div>
          <div className={"form-field" + (bodyErr ? " error" : "")}>
            <label>Your review</label>
            <textarea value={body} onChange={e => { setBody(e.target.value); setBodyErr(false); }}
              placeholder="What was your experience living here? Cover maintenance, responsiveness, noise, pests, deposit handling, and anything future tenants should know." />
            <div className="error-text">Review cannot be empty</div>
          </div>
          <div className="form-field">
            <label>Attach photos or videos (optional)</label>
            <div className="upload-zone" onClick={simulateUpload}>
              <div className="icon">📎</div>
              <h4>Click to upload</h4>
              <p>JPG, PNG, MP4 up to 10MB</p>
            </div>
            <div className="uploaded-files">
              {uploads.map((f, i) => (
                <span className="uploaded-file" key={i}>📎 {f} <span className="remove" onClick={() => removeUpload(i)}>✕</span></span>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn btn-primary" style={{ width: "auto" }} onClick={submit}>Submit Review</button>
        </div>
      </div>
    </div>
  );
}
