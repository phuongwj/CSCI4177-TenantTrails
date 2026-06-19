import { useToast } from "../context/ToastContext";

export default function DeleteModal({ open, onClose, onConfirm }) {
  const { showToast } = useToast();
  if (!open) return null;

  function confirm() {
    onConfirm();
    showToast("Review deleted");
  }

  return (
    <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: "400px" }}>
        <div className="modal-head">
          <h3>Delete Review</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p style={{ color: "var(--gray-600)" }}>Are you sure you want to delete this review? This action cannot be undone.</p>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={confirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
