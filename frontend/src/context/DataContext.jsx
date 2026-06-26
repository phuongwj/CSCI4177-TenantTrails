import { createContext, useContext, useState, useEffect } from "react";

const API = "http://localhost:5003";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [apartments, setApartments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/apartments`, { credentials: "include" })
      .then(res => res.ok ? res.json() : [])
      .then(data => setApartments(data));
  }, []);

  function getAptRating(aptId) {
    const apt = apartments.find(a => a.id === aptId);
    return apt?.rating || 0;
  }

  function getAptReviewCount(aptId) {
    const apt = apartments.find(a => a.id === aptId);
    return apt?.reviews || 0;
  }

  async function fetchApartmentDetail(aptId) {
    const res = await fetch(`${API}/api/apartment/${aptId}`, { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setReviews(data.reviews || []);
      setComments(data.comments || []);
    }
  }

  function invalidateSummary(aptId) {
    setApartments(prev => prev.map(a => a.id === aptId ? { ...a, aiSummary: null, aiIssues: null } : a));
  }

  async function addReview(aptId, userId, rating, body) {
    const res = await fetch(`${API}/api/apartments/${aptId}/review`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, body })
    });
    if (res.ok) {
      await fetchApartmentDetail(aptId);
      const aptRes = await fetch(`${API}/api/apartments`, { credentials: "include" });
      if (aptRes.ok) setApartments(await aptRes.json());
    }
  }

  async function editReview(reviewId, rating, body) {
    const res = await fetch(`${API}/api/profile/review/${reviewId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, body })
    });
    if (res.ok) {
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, rating, body } : r));
    }
  }

  async function deleteReview(reviewId) {
    const res = await fetch(`${API}/api/profile/review/${reviewId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setReviews(prev => prev.filter(r => r.id !== reviewId));
      setComments(prev => prev.filter(c => c.reviewId !== reviewId));
      const aptRes = await fetch(`${API}/api/apartments`, { credentials: "include" });
      if (aptRes.ok) setApartments(await aptRes.json());
    }
  }

  async function addComment(reviewId, userId, body) {
    const res = await fetch(`${API}/api/reviews/${reviewId}/comment`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: body })
    });
    if (res.ok) {
      const review = reviews.find(r => r.id === reviewId);
      if (review) await fetchApartmentDetail(review.aptId);
    }
  }

  function generateAISummary(aptId) {
    const revs = reviews.filter(r => r.aptId === aptId);
    const avgR = getAptRating(aptId).toFixed(1);
    const apt = apartments.find(a => a.id === aptId);
    const themes = [];
    const text = revs.map(r => r.body).join(' ').toLowerCase();
    if (text.includes('pest') || text.includes('cockroach')) themes.push('Pest problems');
    if (text.includes('noise') || text.includes('loud') || text.includes('quiet')) themes.push('Noise levels vary');
    if (text.includes('maintenance') || text.includes('repair') || text.includes('fix')) themes.push('Maintenance responsiveness');
    if (text.includes('location') || text.includes('convenient')) themes.push('Good location');
    if (text.includes('park') || text.includes('parking')) themes.push('Parking concerns');
    if (text.includes('clean') || text.includes('dirty')) themes.push('Cleanliness mixed');
    if (text.includes('security') || text.includes('safe')) themes.push('Security concerns');
    if (text.includes('rent') || text.includes('price') || text.includes('expensive')) themes.push('Pricing noted');
    if (text.includes('deposit')) themes.push('Deposit handling');
    if (text.includes('laundry')) themes.push('Laundry facilities');
    if (!themes.length) themes.push('Mixed feedback', 'Limited data');
    const issues = themes.slice(0, 5);
    const summary = `Based on ${revs.length} tenant reviews, ${apt.name} receives an average rating of ${avgR} out of 5. ${themes.slice(0, 3).join(', ')} are the most frequently mentioned topics. ${revs.length > 2 ? 'Reviewers are divided on the overall experience, with strong opinions on both sides.' : 'More reviews would improve the reliability of this summary.'} This summary was generated from tenant-submitted reviews and should be verified against your own assessment of the property.`;
    setApartments(prev => prev.map(a => a.id === aptId ? { ...a, aiIssues: issues, aiSummary: summary } : a));
  }

  return (
    <DataContext.Provider value={{
      apartments, reviews, comments,
      getAptRating, getAptReviewCount,
      addReview, editReview, deleteReview, addComment, generateAISummary,
      fetchApartmentDetail,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
