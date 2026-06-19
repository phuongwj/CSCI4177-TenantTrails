import { createContext, useContext, useState } from "react";
import {
  apartments as initialApartments,
  reviews as initialReviews,
  comments as initialComments,
} from "../data/mockData";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [apartments, setApartments] = useState(initialApartments);
  const [reviews, setReviews] = useState(initialReviews);
  const [comments, setComments] = useState(initialComments);

  function getAptRating(aptId) {
    const revs = reviews.filter(r => r.aptId === aptId);
    if (!revs.length) return 0;
    return revs.reduce((s, r) => s + r.rating, 0) / revs.length;
  }
  function getAptReviewCount(aptId) {
    return reviews.filter(r => r.aptId === aptId).length;
  }

  function invalidateSummary(aptId) {
    setApartments(prev => prev.map(a => a.id === aptId ? { ...a, aiSummary: null, aiIssues: null } : a));
  }

  function addReview(aptId, userId, rating, body, media) {
    const review = { id: Date.now(), aptId, userId, rating, body, date: todayStr(), media };
    setReviews(prev => [...prev, review]);
    invalidateSummary(aptId);
  }

  function editReview(reviewId, rating, body) {
    let aptId = null;
    setReviews(prev => prev.map(r => {
      if (r.id === reviewId) { aptId = r.aptId; return { ...r, rating, body, date: todayStr() }; }
      return r;
    }));
    if (aptId) invalidateSummary(aptId);
  }

  function deleteReview(reviewId) {
    const review = reviews.find(r => r.id === reviewId);
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    setComments(prev => prev.filter(c => c.reviewId !== reviewId));
    if (review) invalidateSummary(review.aptId);
  }

  function addComment(reviewId, userId, body) {
    setComments(prev => [...prev, { id: Date.now(), reviewId, userId, body, date: todayStr() }]);
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
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

export function todayStr() {
  return new Date().toISOString().split('T')[0];
}
